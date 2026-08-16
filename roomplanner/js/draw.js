/* ------------------------------------------------------------------
   draw.js  ·  live parametric technical drawings

   Every dimension the customer changes redraws a real elevation and
   plan view with dimension lines — the thing photo-based catalogues
   cannot do. Everything is plain SVG in millimetre user units.
   ------------------------------------------------------------------ */

import { SETTINGS, MATERIALS, FINISHES } from './data.js';
import { doorWidths, drawerFrontHeights } from './cutlist.js';

const RENDER_W = 560;                      // nominal on-screen width (px)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function ctx(vbW) {
  const px = vbW / RENDER_W;               // user-units per rendered pixel
  return {
    px,
    fs: 11.5 * px,
    fsSm: 9.5 * px,
    sw: 1.15 * px,
    swThin: 0.7 * px,
  };
}

/* ---------- dimension line helpers ---------- */
function dimH(k, x1, x2, y, label, { flip = false } = {}) {
  const a = k.sw * 4;
  return `
  <g class="dim">
    <line x1="${x1}" y1="${y - (flip ? -a : a) * 1.2}" x2="${x1}" y2="${y + (flip ? -a : a) * 1.2}" stroke-width="${k.swThin}"/>
    <line x1="${x2}" y1="${y - (flip ? -a : a) * 1.2}" x2="${x2}" y2="${y + (flip ? -a : a) * 1.2}" stroke-width="${k.swThin}"/>
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke-width="${k.swThin}" marker-start="url(#ar)" marker-end="url(#ar)"/>
    <text x="${(x1 + x2) / 2}" y="${y - k.fs * 0.45}" font-size="${k.fs}" text-anchor="middle">${esc(label)}</text>
  </g>`;
}

function dimV(k, y1, y2, x, label, { side = 'right' } = {}) {
  const mid = (y1 + y2) / 2;
  const off = side === 'right' ? k.fs * 0.5 : -k.fs * 0.5;
  const anchor = side === 'right' ? 'start' : 'end';
  return `
  <g class="dim">
    <line x1="${x - k.sw * 5}" y1="${y1}" x2="${x + k.sw * 5}" y2="${y1}" stroke-width="${k.swThin}"/>
    <line x1="${x - k.sw * 5}" y1="${y2}" x2="${x + k.sw * 5}" y2="${y2}" stroke-width="${k.swThin}"/>
    <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke-width="${k.swThin}" marker-start="url(#ar)" marker-end="url(#ar)"/>
    <text x="${x + off}" y="${mid}" font-size="${k.fsSm}" text-anchor="${anchor}" dominant-baseline="middle">${esc(label)}</text>
  </g>`;
}

function defs(k, matKey, finKey) {
  const m = MATERIALS[matKey] || MATERIALS['mel-white'];
  const f = FINISHES[finKey] || FINISHES['match'];
  const grain = m.grain
    ? `<pattern id="grain" width="${6 * k.px * 4}" height="${6 * k.px * 4}" patternUnits="userSpaceOnUse">
         <rect width="100%" height="100%" fill="${m.swatch}"/>
         <path d="M0 ${3 * k.px * 4} H${6 * k.px * 4}" stroke="rgba(0,0,0,.07)" stroke-width="${k.px * 1.4}"/>
       </pattern>`
    : '';
  return `<defs>
    <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 1 L10 5 L0 9 z" fill="currentColor"/>
    </marker>
    ${grain}
    <linearGradient id="frontsheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="rgba(255,255,255,.30)"/>
      <stop offset="1" stop-color="rgba(0,0,0,.06)"/>
    </linearGradient>
  </defs>
  <style>
    .dim{stroke:var(--dim);color:var(--dim);fill:var(--dim);font-family:var(--mono);letter-spacing:.02em}
    .body{stroke:var(--ink);fill:none;stroke-linejoin:round}
    .hidden{stroke:var(--dim);stroke-dasharray:${8 * k.px} ${6 * k.px};fill:none}
    .lbl{fill:var(--dim);font-family:var(--mono)}
  </style>
  <!-- board:${m.swatch} front:${f.swatch} -->`;
}

const boardFill = (matKey) => {
  const m = MATERIALS[matKey] || MATERIALS['mel-white'];
  return m.grain ? 'url(#grain)' : m.swatch;
};

function handleDoor(k, x, y, w, h, side, cat) {
  // vertical bar, 60mm in from the opening edge
  const hx = side === 'left' ? x + w - 55 : x + 55;
  const len = Math.min(160, h * 0.4);
  const hy = cat === 'wall' ? y + h - len - 70 : y + 70;
  return `<rect x="${hx - 7}" y="${hy}" width="14" height="${len}" rx="7" fill="var(--ink)" opacity=".78"/>`;
}

function handleDrawer(k, x, y, w, h) {
  const len = Math.min(180, w * 0.45);
  return `<rect x="${x + (w - len) / 2}" y="${y + h / 2 - 7}" width="${len}" height="14" rx="7" fill="var(--ink)" opacity=".78"/>`;
}

/* ==================================================================
   ELEVATION — front view with dimensions
   ================================================================== */
export function elevation(p, c) {
  const S = SETTINGS;
  const gap = S.gap;
  const kick = p.cat === 'base' || p.cat === 'tall' ? (c.includeKick ? c.kick : 0) : 0;
  const W = c.w;
  const H = c.h;
  const totalH = H + kick;

  /* padding has to clear the dimension text on both sides, so it is
     driven by the largest dimension, not the width alone */
  const pad = Math.max(W, totalH) * 0.26;
  const vbW = W + pad * 2;
  const k = ctx(vbW);
  let s = '';

  /* flat panel products draw as a single sheet */
  if (p.flat) {
    const fw = c.w, fh = c.h;
    const pad2 = Math.max(fw, fh) * 0.2;
    const vb2 = fw + pad2 * 2;
    const k2 = ctx(vb2);
    return `<svg viewBox="${-pad2} ${-pad2} ${vb2} ${fh + pad2 * 2}" class="dwg" xmlns="http://www.w3.org/2000/svg">
      ${defs(k2, c.material, c.finish)}
      <rect x="0" y="0" width="${fw}" height="${fh}" fill="${boardFill(c.material)}" class="body" stroke-width="${k2.sw}"/>
      <rect x="0" y="0" width="${fw}" height="${Math.min(18, fh * .12)}" fill="var(--ink)" opacity=".55"/>
      <text x="${fw / 2}" y="${fh / 2}" class="lbl" font-size="${k2.fsSm}" text-anchor="middle" dominant-baseline="middle">EDGED EDGE ▲</text>
      ${dimH(k2, 0, fw, fh + pad2 * 0.55, `${fw}`)}
      ${dimV(k2, 0, fh, fw + pad2 * 0.5, `${fh}`)}
    </svg>`;
  }

  /* carcass box */
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${boardFill(c.material)}" class="body" stroke-width="${k.sw}"/>`;

  /* hidden shelves */
  if (c.shelves > 0) {
    for (let i = 1; i <= c.shelves; i++) {
      const y = (H / (c.shelves + 1)) * i;
      s += `<line x1="${SETTINGS.thickness}" y1="${y}" x2="${W - SETTINGS.thickness}" y2="${y}" class="hidden" stroke-width="${k.swThin}"/>`;
    }
  }

  const frontFill = FINISHES[c.finish]?.swatch || '#eee';
  const frontRects = [];

  const addFront = (x, y, w, h, kind, side) => {
    frontRects.push({ x, y, w, h, kind, side });
    let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${2}" fill="${frontFill}" stroke="var(--ink)" stroke-width="${k.sw}"/>`;
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${2}" fill="url(#frontsheen)" stroke="none"/>`;
    if (c.finish === 'shaker') {
      const inset = 70;
      g += `<rect x="${x + inset}" y="${y + inset}" width="${Math.max(0, w - inset * 2)}" height="${Math.max(0, h - inset * 2)}" fill="rgba(0,0,0,.05)" stroke="var(--ink)" stroke-width="${k.swThin}"/>`;
    }
    if (c.handle !== 'none') {
      g += kind === 'door' ? handleDoor(k, x, y, w, h, side, p.cat) : handleDrawer(k, x, y, w, h);
    }
    s += g;
  };

  const leftDims = [];

  if (p.front === 'drawer') {
    const hs = drawerFrontHeights(H, c.drawers, gap);
    let y = gap / 2;
    hs.forEach((h, i) => {
      addFront(gap / 2, y, W - gap, h, 'drawer');
      leftDims.push([y, y + h, `${Math.round(h)}`]);
      y += h + gap;
    });
  } else if (p.front === 'mixed') {
    const hs = drawerFrontHeights(H, c.drawers + 1, gap);
    let y = gap / 2;
    hs.slice(0, c.drawers).forEach((h) => {
      addFront(gap / 2, y, W - gap, h, 'drawer');
      leftDims.push([y, y + h, `${Math.round(h)}`]);
      y += h + gap;
    });
    const doorH = H - y - gap / 2;
    const ws = doorWidths(W, p.doors, gap);
    let x = gap / 2;
    ws.forEach((dw, i) => {
      addFront(x, y, dw, doorH, 'door', i === 0 ? 'left' : 'right');
      x += dw + gap;
    });
    leftDims.push([y, y + doorH, `${Math.round(doorH)}`]);
  } else if (p.front === 'door') {
    if (p.lift) {
      addFront(gap / 2, gap / 2, W - gap, H - gap, 'drawer');
      leftDims.push([gap / 2, H - gap / 2, `${Math.round(H - gap)}`]);
    } else {
      const usableW = p.blind ? W - p.blind : W;
      const ws = doorWidths(usableW, p.doors, gap);
      let x = p.blind ? p.blind + gap / 2 : gap / 2;
      ws.forEach((dw, i) => {
        addFront(x, gap / 2, dw, H - gap, 'door', p.doors === 1 ? 'left' : i === 0 ? 'left' : 'right');
        x += dw + gap;
      });
      if (p.blind) {
        s += `<rect x="0" y="0" width="${p.blind}" height="${H}" fill="rgba(0,0,0,.07)" stroke="none"/>`;
        s += `<text x="${p.blind / 2}" y="${H / 2}" class="lbl" font-size="${k.fsSm}" text-anchor="middle" dominant-baseline="middle">BLIND</text>`;
      }
      leftDims.push([gap / 2, H - gap / 2, `${Math.round(H - gap)}`]);
    }
  } else {
    s += `<text x="${W / 2}" y="${H / 2}" class="lbl" font-size="${k.fsSm}" text-anchor="middle" dominant-baseline="middle">OPEN</text>`;
  }

  /* kickboard */
  if (kick > 0) {
    s += `<rect x="${20}" y="${H}" width="${W - 40}" height="${kick}" fill="var(--ink)" opacity=".14" stroke="var(--ink)" stroke-width="${k.swThin}"/>`;
    s += `<text x="${W / 2}" y="${H + kick / 2}" class="lbl" font-size="${k.fsSm}" text-anchor="middle" dominant-baseline="middle">KICK ${kick}</text>`;
  }

  /* dimensions */
  s += dimH(k, 0, W, totalH + pad * 0.5, `${W}`);
  s += dimV(k, 0, H, W + pad * 0.3, `${H}`);
  if (kick > 0) s += dimV(k, 0, totalH, W + pad * 0.72, `${totalH}`);
  leftDims.forEach(([y1, y2, lbl]) => { s += dimV(k, y1, y2, -pad * 0.35, lbl, { side: 'left' }); });

  return `<svg viewBox="${-pad} ${-pad * 0.5} ${vbW} ${totalH + pad * 1.2}" class="dwg" xmlns="http://www.w3.org/2000/svg">
    ${defs(k, c.material, c.finish)}${s}
  </svg>`;
}

/* ==================================================================
   PLAN — top view showing depth and construction
   ================================================================== */
export function plan(p, c) {
  if (p.flat) return '';
  const t = SETTINGS.thickness;
  const W = c.w, D = c.d;
  const backT = c.back === 'ply6' ? 6 : c.back === 'none' ? 0 : t;
  const pad = Math.max(W, D) * 0.22;
  const vbW = W + pad * 2;
  const k = ctx(vbW);
  const fill = boardFill(c.material);
  let s = '';

  s += `<rect x="0" y="0" width="${W}" height="${D}" fill="none" class="hidden" stroke-width="${k.swThin}"/>`;
  // sides
  s += `<rect x="0" y="0" width="${t}" height="${D}" fill="${fill}" class="body" stroke-width="${k.sw}"/>`;
  s += `<rect x="${W - t}" y="0" width="${t}" height="${D}" fill="${fill}" class="body" stroke-width="${k.sw}"/>`;
  // back
  if (backT) s += `<rect x="${t}" y="${D - backT}" width="${W - 2 * t}" height="${backT}" fill="${fill}" class="body" stroke-width="${k.sw}"/>`;
  // fronts
  if (p.front !== 'none') {
    const ff = FINISHES[c.finish]?.swatch || '#eee';
    s += `<rect x="0" y="${-18}" width="${W}" height="18" fill="${ff}" class="body" stroke-width="${k.sw}"/>`;
    s += `<text x="${W / 2}" y="${-26}" class="lbl" font-size="${k.fsSm}" text-anchor="middle">FRONT</text>`;
  }
  s += dimH(k, 0, W, D + pad * 0.5, `${W}`);
  s += dimV(k, 0, D, W + pad * 0.4, `${D} deep`);
  s += `<text x="${t / 2}" y="${D / 2}" class="lbl" font-size="${k.fsSm}" text-anchor="middle" dominant-baseline="middle" transform="rotate(-90 ${t / 2} ${D / 2})">${t}mm</text>`;

  return `<svg viewBox="${-pad} ${-pad * 0.6} ${vbW} ${D + pad * 1.2}" class="dwg" xmlns="http://www.w3.org/2000/svg">
    ${defs(k, c.material, c.finish)}${s}
  </svg>`;
}

/* ==================================================================
   Small catalogue thumbnail (schematic, no dimensions)
   ================================================================== */
export function thumb(p) {
  const c = { ...p.def, material: 'mel-white', finish: 'match', handle: 'bar', back: 'inset16', includeKick: true };
  const W = 200, H = 150;
  const kick = p.cat === 'base' || p.cat === 'tall' ? 14 : 0;
  const boxH = H - kick - 8;
  const boxW = Math.min(W - 16, boxH * (p.def.w / p.def.h));
  const x = (W - boxW) / 2, y = 4;
  const g = SETTINGS.gap * 0.35;
  let s = `<rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="2" fill="var(--thumb-box)" stroke="var(--thumb-line)" stroke-width="1.2"/>`;

  const face = (fx, fy, fw, fh) =>
    `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="1.5" fill="var(--thumb-face)" stroke="var(--thumb-line)" stroke-width="1"/>`;

  if (p.front === 'drawer') {
    const hs = drawerFrontHeights(boxH, p.def.drawers, g);
    let yy = y + g / 2;
    hs.forEach((h) => { s += face(x + g / 2, yy, boxW - g, h); yy += h + g; });
  } else if (p.front === 'mixed') {
    const hs = drawerFrontHeights(boxH, p.def.drawers + 1, g);
    let yy = y + g / 2;
    hs.slice(0, p.def.drawers).forEach((h) => { s += face(x + g / 2, yy, boxW - g, h); yy += h + g; });
    const dh = y + boxH - yy - g / 2;
    const ws = doorWidths(boxW, p.doors, g);
    let xx = x + g / 2;
    ws.forEach((w) => { s += face(xx, yy, w, dh); xx += w + g; });
  } else if (p.front === 'door') {
    const ws = doorWidths(boxW, p.doors, g);
    let xx = x + g / 2;
    ws.forEach((w) => { s += face(xx, y + g / 2, w, boxH - g); xx += w + g; });
  } else if (!p.flat) {
    const n = Math.max(1, p.def.shelves);
    for (let i = 1; i <= n; i++) {
      const yy = y + (boxH / (n + 1)) * i;
      s += `<line x1="${x + 3}" y1="${yy}" x2="${x + boxW - 3}" y2="${yy}" stroke="var(--thumb-line)" stroke-width="1.2"/>`;
    }
  }

  if (p.flat) {
    s = `<rect x="${x}" y="${y + boxH * .3}" width="${boxW}" height="${boxH * .4}" rx="2" fill="var(--thumb-face)" stroke="var(--thumb-line)" stroke-width="1.2"/>`;
  }
  if (kick) s += `<rect x="${x + 6}" y="${y + boxH}" width="${boxW - 12}" height="${kick}" fill="var(--thumb-line)" opacity=".35"/>`;

  return `<svg viewBox="0 0 ${W} ${H}" class="thumb" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s}</svg>`;
}
