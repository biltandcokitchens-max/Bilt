/* ------------------------------------------------------------------
   cutlist.js  ·  parametric part generation

   Given a product + a configuration, produce the exact list of panels
   a CNC would cut, with edge banding and drilling operations.

   Part shape:
     { key, name, qty, l, w, mat, eL, eW, ops:{...}, note }
       l   long dimension / grain direction (mm)
       w   short dimension (mm)
       eL  how many of the two LENGTH edges are banded (0-2)
       eW  how many of the two WIDTH edges are banded (0-2)
   ------------------------------------------------------------------ */

import { SETTINGS } from './data.js';

const r = (n) => Math.round(n * 10) / 10;

/* hinges scale with door height, the way a real supplier quotes them */
export function hingesFor(h) {
  if (h <= 900) return 2;
  if (h <= 1600) return 3;
  if (h <= 2000) return 4;
  return 5;
}

/* graduated drawer fronts: small on top, deeper below — what most
   kitchens actually get, instead of naive equal division */
export function drawerFrontHeights(total, n, gap) {
  const usable = total - gap * (n + 1) + gap; // gaps between + top/bottom reveal
  if (n === 1) return [r(usable)];
  if (n === 2) return [r(usable * 0.36), r(usable * 0.64)];
  if (n === 3) return [r(usable * 0.24), r(usable * 0.38), r(usable * 0.38)];
  if (n === 4) return [r(usable * 0.16), r(usable * 0.22), r(usable * 0.31), r(usable * 0.31)];
  return Array.from({ length: n }, () => r(usable / n));
}

export function doorWidths(w, n, gap) {
  const each = (w - gap * (n - 1) - gap) / n;
  return Array.from({ length: n }, () => r(each));
}

export function buildParts(p, c) {
  const S = SETTINGS;
  const t = S.thickness;
  const gap = S.gap;                 // door gap
  const dgap = S.drawerGap ?? S.gap; // drawer gap
  const parts = [];
  const add = (o) => parts.push({ eL: 0, eW: 0, ops: {}, mat: 'carcass', ...o });

  /* ---- flat panel products: one part, done ---- */
  if (p.flat) {
    const edged =
      p.id === 'panel-kick' ? { eL: 1, eW: 0 } :
      p.id === 'panel-shelf' ? { eL: 1, eW: 0 } :
      { eL: 2, eW: 2 };
    add({
      key: 'panel', name: p.name, qty: 1,
      l: Math.max(c.w, c.h), w: Math.min(c.w, c.h),
      mat: c.panelAsFront ? 'front' : 'carcass',
      ...edged,
      note: p.id === 'panel-end' ? 'Edged all round' : 'Edged one long edge',
    });
    return parts;
  }

  const iw = c.w - 2 * t;            // internal width
  const isBase = p.cat === 'base';
  const isTall = p.cat === 'tall';
  const backT = c.back === 'ply6' ? 6 : c.back === 'none' ? 0 : t;
  const carcassDepth = c.d;          // side panel depth
  const innerDepth = carcassDepth - backT;

  /* ---- sides ---- */
  /* one drilling operation PER SIDE PANEL — summarise() multiplies these
     by the part's qty (2 sides), so a 2 here would bill four side panels */
  const sideOps = {};
  if (c.shelves > 0) sideOps.shelfHoles = 1;
  if (p.doors > 0) sideOps.hingePlate = 1;
  if (c.drawers > 0) sideOps.runnerHoles = 1;
  add({
    key: 'side', name: 'Side panel', qty: 2,
    l: c.h, w: carcassDepth, eL: 1, ops: sideOps,
    note: 'Front edge banded',
  });

  /* ---- bottom / top ---- */
  add({
    key: 'bottom', name: 'Bottom', qty: 1,
    l: iw, w: innerDepth, eL: 1, note: 'Front edge banded',
  });

  if (isBase) {
    add({ key: 'rail', name: 'Top rail', qty: 2, l: iw, w: 100, eL: 1, note: 'Front + back rail' });
  } else {
    add({ key: 'top', name: 'Top', qty: 1, l: iw, w: innerDepth, eL: 1, note: 'Front edge banded' });
  }

  if (isTall) {
    add({ key: 'midrail', name: 'Mid rail', qty: 2, l: iw, w: 100, eL: 1, note: 'Racking brace' });
  }

  /* ---- back ---- */
  if (c.back !== 'none') {
    add({
      key: 'back', name: c.back === 'ply6' ? 'Back (6mm ply)' : 'Back panel', qty: 1,
      l: c.h, w: iw, mat: c.back === 'ply6' ? 'back6' : 'carcass',
      note: c.back === 'ply6' ? 'Set into rebate' : 'Full 16mm back',
    });
  }

  /* ---- shelves ---- */
  if (c.shelves > 0) {
    add({
      key: 'shelf', name: 'Adjustable shelf', qty: c.shelves,
      l: iw - S.shelfClearance, w: innerDepth - S.shelfSetback, eL: 1,
      note: `${S.shelfClearance}mm clearance, held back ${S.shelfSetback}mm`,
    });
  }

  /* ---- blind corner return ---- */
  if (p.blind) {
    add({
      key: 'blind', name: 'Blind return panel', qty: 1,
      l: c.h - 2 * t, w: p.blind, eL: 1, note: 'Closes the blind corner',
    });
  }

  /* ---- oven cut-out shelves ---- */
  if (p.oven) {
    add({ key: 'ovenshelf', name: 'Oven support shelf', qty: 2, l: iw, w: innerDepth, eL: 1, note: 'Fixed, carries the oven' });
  }

  /* ---- fronts ---------------------------------------------------- */
  const frontOps = (n) => ({ hingeBore: n, handleDrill: c.handle !== 'none' ? 1 : 0 });

  if (p.front === 'door' || p.front === 'mixed') {
    // how much height the doors get
    let doorH = c.h - gap;
    let drawerZone = 0;

    if (p.front === 'mixed') {
      const heights = drawerFrontHeights(c.h, c.drawers + 1, dgap);
      drawerZone = heights.slice(0, c.drawers).reduce((a, b) => a + b, 0) + gap * c.drawers;
      doorH = r(c.h - drawerZone - gap);
      heights.slice(0, c.drawers).forEach((h, i) => {
        add({
          key: `drwfront${i}`, name: `Drawer front ${i + 1}`, qty: 1,
          l: r(c.w - dgap), w: h, mat: 'front', eL: 2, eW: 2,
          ops: { handleDrill: c.handle !== 'none' ? 1 : 0, runnerHoles: 0 },
          note: 'Edged all round',
        });
      });
    }

    if (p.lift) {
      add({
        key: 'door', name: 'Lift-up front', qty: 1,
        l: r(c.w - gap), w: r(doorH), mat: 'front', eL: 2, eW: 2,
        ops: { hingeBore: 2, handleDrill: c.handle !== 'none' ? 1 : 0 },
        note: 'Horizontal · lift mechanism',
      });
    } else {
      const nd = p.doors;
      const ws = doorWidths(p.blind ? c.w - p.blind : c.w, nd, gap);
      const hg = hingesFor(doorH);
      ws.forEach((dw, i) => {
        add({
          key: `door${i}`, name: nd > 1 ? `Door ${i + 1}` : 'Door', qty: 1,
          l: r(doorH), w: dw, mat: 'front', eL: 2, eW: 2,
          ops: frontOps(hg), note: `${hg} hinges · edged all round`,
        });
      });
    }
  }

  if (p.front === 'drawer') {
    const heights = drawerFrontHeights(c.h, c.drawers, dgap);
    heights.forEach((h, i) => {
      add({
        key: `drwfront${i}`, name: `Drawer front ${i + 1}`, qty: 1,
        l: r(c.w - dgap), w: h, mat: 'front', eL: 2, eW: 2,
        ops: { handleDrill: c.handle !== 'none' ? 1 : 0 },
        note: 'Edged all round',
      });
    });
  }

  /* ---- kickboard ---- */
  if (c.kick > 0 && c.includeKick) {
    add({
      key: 'kick', name: 'Kickboard', qty: 1,
      l: c.w, w: c.kick, mat: c.kickMatchesFront ? 'front' : 'carcass',
      eL: 1, note: 'Top edge banded',
    });
  }

  /* ---- drawer boxes ---- */
  if (c.drawers > 0 && c.drawerBoxes && c.runner !== 'blum') {
    const clear = c.runner === 'under' ? 21 : 13;
    const boxW = iw - clear * 2;
    const boxD = Math.min(500, innerDepth - 40);
    const boxH = 120;
    add({ key: 'boxside', name: 'Drawer box side', qty: c.drawers * 2, l: boxD, w: boxH, eL: 1, note: '16mm · top edge banded' });
    add({ key: 'boxfb', name: 'Drawer box front/back', qty: c.drawers * 2, l: boxW - 2 * t, w: boxH, eL: 1, note: 'Between sides' });
    add({ key: 'boxbase', name: 'Drawer box base', qty: c.drawers, l: boxW, w: boxD, note: 'Under-fixed' });
  }

  return parts;
}

/* ---- aggregates used by pricing, the cut list table and nesting ---- */
export function summarise(parts) {
  let areaCarcass = 0, areaFront = 0, areaBack = 0, edgeLm = 0, panelCount = 0;
  let edgeLmCarc = 0, edgeLmFront = 0, edgedCarc = 0, edgedFront = 0;
  const ops = { hingeBore: 0, shelfHoles: 0, runnerHoles: 0, handleDrill: 0 };

  for (const p of parts) {
    const a = (p.l * p.w) / 1e6 * p.qty;
    if (p.mat === 'front') areaFront += a;
    else if (p.mat === 'back6') areaBack += a;
    else areaCarcass += a;

    const lm = ((p.eL * p.l + p.eW * p.w) / 1000) * p.qty;
    edgeLm += lm;
    if (p.mat === 'front') { edgeLmFront += lm; if (p.eL || p.eW) edgedFront += p.qty; }
    else { edgeLmCarc += lm; if (p.eL || p.eW) edgedCarc += p.qty; }
    panelCount += p.qty;

    for (const k in ops) if (p.ops[k]) ops[k] += p.ops[k] * p.qty;
  }
  /* NOT rounded — these feed pricing. Rounding board area to 1dp here
     moved a 900mm base cabinet by over a dollar. Round for display only. */
  return {
    areaCarcass, areaFront, areaBack,
    edgeLm, edgeLmCarc, edgeLmFront, edgedCarc, edgedFront, panelCount,
    edgedParts: parts.filter((p) => p.eL || p.eW).reduce((a, p) => a + p.qty, 0),
    ops,
  };
}
