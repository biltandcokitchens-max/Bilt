/* ------------------------------------------------------------------
   planview.js  ·  2D wall elevation + room plan

   The 3D view is for confidence. These two are for precision — they
   are to scale, dimensioned, and clickable.
   ------------------------------------------------------------------ */

import { productById, MATERIALS, FINISHES, APPLIANCES, BENCHTOPS } from './data.js';
import { roomWalls, wallSegments, wallSegment, roomPolygon, layout, wallLength, remaining, benchtopRuns, gaps, overhang, itemHeight } from './room.js';
import { drawerFrontHeights, doorWidths } from './cutlist.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const RENDER_W = 820;

function ctx(vbW) {
  const px = vbW / RENDER_W;
  return { px, fs: 12 * px, fsSm: 10 * px, sw: 1.2 * px, thin: 0.7 * px };
}

function dimLine(k, x1, x2, y, label) {
  return `<g class="dim">
    <line x1="${x1}" y1="${y - k.sw * 5}" x2="${x1}" y2="${y + k.sw * 5}" stroke-width="${k.thin}"/>
    <line x1="${x2}" y1="${y - k.sw * 5}" x2="${x2}" y2="${y + k.sw * 5}" stroke-width="${k.thin}"/>
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke-width="${k.thin}" marker-start="url(#pvar)" marker-end="url(#pvar)"/>
    <text x="${(x1 + x2) / 2}" y="${y - k.fs * 0.4}" font-size="${k.fs}" text-anchor="middle">${esc(label)}</text>
  </g>`;
}

const DEFS = (k) => `<defs>
  <marker id="pvar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M0 1 L10 5 L0 9 z" fill="currentColor"/>
  </marker>
  <pattern id="gaphatch" width="${14 * k.px}" height="${14 * k.px}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="100%" height="100%" fill="var(--surface-2)"/>
    <line x1="0" y1="0" x2="0" y2="${14 * k.px}" stroke="var(--line-2)" stroke-width="${2 * k.px}"/>
  </pattern>
</defs>
<style>
  .dim{stroke:var(--dim);color:var(--dim);fill:var(--dim);font-family:var(--mono)}
  .lbl{fill:var(--ink-3);font-family:var(--mono)}
  .pv-item{cursor:pointer}
  .pv-item:hover .pv-body{stroke:var(--accent);stroke-width:${2.4 * k.px}}
  .pv-sel .pv-body{stroke:var(--accent);stroke-width:${3 * k.px}}
</style>`;

/* ==================================================================
   WALL ELEVATION
   ================================================================== */
export function wallElevation(room, k, selUid) {
  const L = wallLength(room, k);
  const H = room.h;
  const pad = Math.max(L, H) * 0.11;
  const vbW = L + pad * 2;
  const c = ctx(vbW);
  let s = '';

  /* wall + floor */
  s += `<rect x="0" y="0" width="${L}" height="${H}" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="${c.sw}"/>`;
  s += `<line x1="${-pad * 0.3}" y1="${H}" x2="${L + pad * 0.3}" y2="${H}" stroke="var(--ink)" stroke-width="${c.sw * 2}"/>`;

  const drawItem = ({ it, x, w, y: oy }, level) => {
    const sel = it.uid === selUid ? ' pv-sel' : '';
    let top, h, fill, stroke = 'var(--ink)', label, sub;

    if (it.type === 'appl') {
      const a = APPLIANCES[it.ak];
      if (a.empty) {
        return `<g class="pv-item${sel}" data-uid="${it.uid}">
          <rect class="pv-body" x="${x}" y="${H - (oy || 0) - 720}" width="${w}" height="720" fill="url(#gaphatch)" stroke="var(--line-2)" stroke-width="${c.thin}" stroke-dasharray="${10 * c.px} ${7 * c.px}"/>
          <text x="${x + w / 2}" y="${H - (oy || 0) - 360}" class="lbl" font-size="${c.fsSm}" text-anchor="middle">OPEN ${w}</text></g>`;
      }
      h = a.h;
      top = H - (oy || 0) - h;
      fill = a.colour; label = a.name; sub = `${w}`;
      return `<g class="pv-item${sel}" data-uid="${it.uid}">
        <rect class="pv-body" x="${x}" y="${top}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${c.sw}" rx="${6 * c.px}"/>
        <text x="${x + w / 2}" y="${top + h / 2 - c.fs * .3}" font-size="${c.fsSm}" text-anchor="middle" fill="#fff" font-family="var(--mono)">${esc(label)}</text>
        <text x="${x + w / 2}" y="${top + h / 2 + c.fs}" font-size="${c.fsSm}" text-anchor="middle" fill="rgba(255,255,255,.75)" font-family="var(--mono)">${sub}</text>
      </g>`;
    }

    const cfg = it.cfg;
    const p = it.type === 'filler' ? null : productById(it.pid);
    const kick = cfg.includeKick ? cfg.kick : 0;
    h = cfg.h + kick;
    top = H - (oy || 0) - h;
    const carc = MATERIALS[cfg.material]?.swatch || '#eee';
    const fin = FINISHES[cfg.finish]?.swatch || '#eee';

    let inner = '';
    if (it.type === 'filler') {
      inner = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${fin}" stroke="${stroke}" stroke-width="${c.sw}"/>
        <text x="${x + w / 2}" y="${top + h / 2}" class="lbl" font-size="${c.fsSm}" text-anchor="middle" transform="rotate(-90 ${x + w / 2} ${top + h / 2})">FILLER ${w}</text>`;
    } else {
      const bodyTop = top;
      inner += `<rect x="${x}" y="${bodyTop}" width="${w}" height="${cfg.h}" fill="${carc}" stroke="${stroke}" stroke-width="${c.sw}"/>`;
      /* fronts */
      const g = 3;
      const face = (fx, fy, fw, fh) =>
        `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="${fin}" stroke="${stroke}" stroke-width="${c.thin}"/>`;
      if (p && p.front === 'drawer') {
        const hs = drawerFrontHeights(cfg.h, cfg.drawers, g);
        let y = bodyTop + g / 2;
        hs.forEach((fh) => { inner += face(x + g / 2, y, w - g, fh); y += fh + g; });
      } else if (p && p.front === 'mixed') {
        const hs = drawerFrontHeights(cfg.h, cfg.drawers + 1, g);
        let y = bodyTop + g / 2;
        hs.slice(0, cfg.drawers).forEach((fh) => { inner += face(x + g / 2, y, w - g, fh); y += fh + g; });
        const dh = bodyTop + cfg.h - y - g / 2;
        doorWidths(w, p.doors, g).forEach((dw, i) => {
          inner += face(x + g / 2 + i * (dw + g), y, dw, dh);
        });
      } else if (p && p.front === 'door') {
        const usable = p.blind ? w - p.blind : w;
        let dx = x + (p.blind || 0) + g / 2;
        doorWidths(usable, p.doors, g).forEach((dw) => { inner += face(dx, bodyTop + g / 2, dw, cfg.h - g); dx += dw + g; });
      }
      /* the kick sits under this cabinet's own carcass, wherever it stands */
      if (kick) inner += `<rect x="${x + 10}" y="${bodyTop + cfg.h}" width="${w - 20}" height="${kick}" fill="var(--ink)" opacity=".18"/>`;
    }

    return `<g class="pv-item${sel}" data-uid="${it.uid}">${inner}
      <rect class="pv-body" x="${x}" y="${top}" width="${w}" height="${h}" fill="none" stroke="transparent" stroke-width="${c.sw}"/>
      <text x="${x + w / 2}" y="${top - c.fs * 0.35}" class="lbl" font-size="${c.fsSm}" text-anchor="middle">${w}</text>
    </g>`;
  };

  /* upper run first so base overlaps it visually if they collide */
  for (const o of layout(room, k, 'upper')) s += drawItem(o, 'upper');

  /* benchtop */
  const bt = benchtopRuns(room).find((r) => r.wall === k);
  if (bt) {
    const th = BENCHTOPS[room.bt.material].thick;
    s += `<rect x="${bt.x}" y="${H - 870 - th}" width="${bt.length}" height="${th}" fill="${BENCHTOPS[room.bt.material].swatch}" stroke="var(--ink)" stroke-width="${c.sw}"/>`;
  }

  for (const o of layout(room, k, 'base')) s += drawItem(o, 'base');

  /* every clear span on the base run, hatched and dimensioned */
  for (const g of gaps(room, k, 'base')) {
    if (g.w < 4) continue;
    s += `<rect x="${g.x}" y="${H - 870}" width="${g.w}" height="870" fill="url(#gaphatch)" stroke="var(--line-2)" stroke-dasharray="${10 * c.px} ${7 * c.px}" stroke-width="${c.thin}"/>`;
    if (g.w > 90) s += `<text x="${g.x + g.w / 2}" y="${H - 435}" class="lbl" font-size="${c.fsSm}" text-anchor="middle">${Math.round(g.w)}</text>`;
  }

  s += dimLine(c, 0, L, H + pad * 0.55, `${Math.round(L)} — ${wallSegment(room, k)?.name || 'Wall ' + k}`);

  return `<svg viewBox="${-pad} ${-pad * 0.45} ${vbW} ${H + pad * 1.15}" class="pv" xmlns="http://www.w3.org/2000/svg">${DEFS(c)}${s}</svg>`;
}

/* ==================================================================
   ROOM PLAN
   ================================================================== */
export function roomPlan(room, activeWall) {
  const poly = roomPolygon(room);
  const W = Math.max(...poly.map((p) => p.x));
  const D = Math.max(...poly.map((p) => p.z));
  const pad = Math.max(W, D) * 0.16;
  const vbW = W + pad * 2;
  const c = ctx(vbW);
  let s = '';

  /* the room outline itself */
  const path = poly.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.z}`).join(' ') + ' Z';
  s += `<path d="${path}" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="${c.sw * 2}" stroke-linejoin="round"/>`;

  /* every cabinet drawn as a band on its own wall segment */
  for (const seg of wallSegments(room)) {
    const active = seg.k === activeWall;
    const band = (x, w, depth, dashed, fill, uid) => {
      /* corners: along the wall from x, then inward by the depth */
      const ax = seg.p0.x + seg.ux * x, az = seg.p0.z + seg.uz * x;
      const bx = ax + seg.ux * w, bz = az + seg.uz * w;
      const cx = bx + seg.nx * depth, cz = bz + seg.nz * depth;
      const dx = ax + seg.nx * depth, dz = az + seg.nz * depth;
      const d = `M${ax} ${az} L${bx} ${bz} L${cx} ${cz} L${dx} ${dz} Z`;
      return dashed
        ? `<path d="${d}" fill="none" stroke="var(--dim)" stroke-dasharray="${9 * c.px} ${6 * c.px}" stroke-width="${c.thin}" opacity="${active ? .9 : .35}"/>`
        : `<g class="pv-item" data-uid="${uid}"><path class="pv-body" d="${d}" fill="${fill}" stroke="var(--ink)" stroke-width="${c.thin}" opacity="${active ? 1 : 0.45}"/></g>`;
    };

    for (const { it, x, w } of layout(room, seg.k, 'base')) {
      if (it.type === 'appl' && APPLIANCES[it.ak].empty) continue;
      const depth = it.type === 'appl' ? APPLIANCES[it.ak].d : (it.cfg.d || 16);
      const fill = it.type === 'appl' ? APPLIANCES[it.ak].colour
        : it.type === 'filler' ? (FINISHES[it.cfg.finish]?.swatch || '#ddd')
        : (MATERIALS[it.cfg.material]?.swatch || '#ddd');
      s += band(x, w, depth, false, fill, it.uid);
    }
    for (const { it, x, w } of layout(room, seg.k, 'upper')) {
      const depth = it.type === 'appl' ? APPLIANCES[it.ak].d : (it.cfg.d || 16);
      s += band(x, w, depth, true);
    }

    /* wall letter, sat just outside the middle of the segment */
    const mx = (seg.p0.x + seg.p1.x) / 2 - seg.nx * pad * 0.28;
    const mz = (seg.p0.z + seg.p1.z) / 2 - seg.nz * pad * 0.28;
    s += `<text x="${mx}" y="${mz}" class="lbl" font-size="${c.fs}" text-anchor="middle" dominant-baseline="middle" fill="${active ? 'var(--accent)' : 'var(--dim)'}" font-weight="600">${seg.k}</text>`;
  }

  s += dimLine(c, 0, W, D + pad * 0.75, `${Math.round(W)}`);

  return `<svg viewBox="${-pad} ${-pad * 0.55} ${vbW} ${D + pad * 1.35}" class="pv pv-plan" xmlns="http://www.w3.org/2000/svg">${DEFS(c)}${s}</svg>`;
}
