/* ------------------------------------------------------------------
   nest.js  ·  sheet optimisation preview

   A guillotine "shelf" first-fit-decreasing pack. Not a production
   optimiser, but close enough to show the customer how many sheets
   their job consumes, what the yield is, and where a 30mm change in
   a cabinet width would save a whole sheet.

   Grained boards are locked to the sheet length; plain boards may
   rotate.
   ------------------------------------------------------------------ */

import { SETTINGS, MATERIALS, FINISHES } from './data.js';

export function nestJob(items) {
  const groups = new Map();          // boardKey -> rects[]

  for (const it of items) {
    for (const part of it.parts) {
      const boardKey =
        part.mat === 'front' ? `front:${it.cfg.finish}` :
        part.mat === 'back6' ? 'back6:ply' :
        `carcass:${it.cfg.material}`;

      if (!groups.has(boardKey)) groups.set(boardKey, []);
      const bucket = groups.get(boardKey);
      for (let q = 0; q < part.qty * (it.cfg.qty || 1); q++) {
        bucket.push({ l: part.l, w: part.w, name: part.name, from: it.label });
      }
    }
  }

  const out = [];
  for (const [boardKey, rects] of groups) {
    const [kind, id] = boardKey.split(':');
    const grain =
      kind === 'front' ? !!FINISHES[id]?.grain :
      kind === 'carcass' ? !!MATERIALS[id]?.grain : false;
    const label =
      kind === 'front' ? (FINISHES[id]?.name || id) :
      kind === 'back6' ? '6mm Ply backing' :
      (MATERIALS[id]?.name || id);
    out.push({ boardKey, label, grain, ...pack(rects, grain) });
  }
  out.sort((a, b) => b.sheets.length - a.sheets.length);
  return out;
}

function pack(rects, grain) {
  const S = SETTINGS;
  const UL = S.sheet.l - S.trim * 2;
  const UW = S.sheet.w - S.trim * 2;
  const k = S.kerf;

  // normalise orientation, then sort tallest-first
  const list = rects.map((r0) => {
    let { l, w } = r0;
    if (!grain && w > l) [l, w] = [w, l];
    return { ...r0, l, w, over: l > UL || w > UW };
  });
  const oversize = list.filter((r0) => r0.over);
  const fit = list.filter((r0) => !r0.over)
    .sort((a, b) => b.w - a.w || b.l - a.l);

  const sheets = [];
  const newSheet = () => { const s = { shelves: [], used: 0, area: 0 }; sheets.push(s); return s; };

  for (const rect of fit) {
    let placed = false;

    /* best fit: the shelf that wastes the least height, trying both
       orientations when the board has no grain direction */
    let best = null;
    const orients = grain ? [[rect.l, rect.w]] : [[rect.l, rect.w], [rect.w, rect.l]];
    for (const sheet of sheets) {
      for (const sh of sheet.shelves) {
        for (const [ol, ow] of orients) {
          if (ol > UL || ow > UW) continue;
          if (ow <= sh.h && sh.x + ol + k <= UL) {
            const waste = sh.h - ow;
            if (!best || waste < best.waste) best = { sheet, sh, ol, ow, waste };
          }
        }
      }
    }
    if (best) {
      best.sh.parts.push({ ...rect, l: best.ol, w: best.ow, x: best.sh.x, y: best.sh.y });
      best.sh.x += best.ol + k;
      best.sheet.area += best.ol * best.ow;
      continue;
    }

    for (const sheet of sheets) {
      if (sheet.used + rect.w + k <= UW) {
        const sh = { y: sheet.used, h: rect.w, x: 0, parts: [] };
        sh.parts.push({ ...rect, x: 0, y: sh.y });
        sh.x = rect.l + k;
        sheet.shelves.push(sh);
        sheet.used += rect.w + k;
        sheet.area += rect.l * rect.w;
        placed = true; break;
      }
    }
    if (!placed) {
      const sheet = newSheet();
      const sh = { y: 0, h: rect.w, x: rect.l + k, parts: [{ ...rect, x: 0, y: 0 }] };
      sheet.shelves.push(sh);
      sheet.used = rect.w + k;
      sheet.area = rect.l * rect.w;
    }
  }

  const sheetArea = S.sheet.l * S.sheet.w;
  const totalUsed = sheets.reduce((a, s) => a + s.area, 0);
  return {
    sheets,
    oversize,
    yield: sheets.length ? totalUsed / (sheets.length * sheetArea) : 0,
    usedM2: Math.round((totalUsed / 1e6) * 100) / 100,
  };
}

/* ---------- render one sheet as SVG ---------- */
export function drawSheet(sheet, index) {
  const S = SETTINGS;
  const L = S.sheet.l, W = S.sheet.w;
  const px = L / 640;
  let s = `<rect x="0" y="0" width="${L}" height="${W}" fill="var(--nest-bg)" stroke="var(--line-2)" stroke-width="${2 * px}"/>`;
  s += `<rect x="${S.trim}" y="${S.trim}" width="${L - S.trim * 2}" height="${W - S.trim * 2}" fill="none" stroke="var(--dim)" stroke-dasharray="${10 * px} ${8 * px}" stroke-width="${1 * px}"/>`;

  const hues = [12, 200, 150, 40, 280, 340, 90];
  let i = 0;
  for (const sh of sheet.shelves) {
    for (const p of sh.parts) {
      const hue = hues[i++ % hues.length];
      const x = S.trim + p.x, y = S.trim + p.y;
      s += `<rect x="${x}" y="${y}" width="${p.l}" height="${p.w}" fill="hsl(${hue} 70% 55% / .22)" stroke="hsl(${hue} 60% 45%)" stroke-width="${1.4 * px}"/>`;
      if (p.l > 260 && p.w > 110) {
        s += `<text x="${x + p.l / 2}" y="${y + p.w / 2 - 8 * px}" font-size="${11 * px}" text-anchor="middle" fill="var(--ink-3)" font-family="var(--mono)">${p.l}×${p.w}</text>`;
        s += `<text x="${x + p.l / 2}" y="${y + p.w / 2 + 14 * px}" font-size="${9.5 * px}" text-anchor="middle" fill="var(--dim)" font-family="var(--mono)">${p.name.slice(0, 22)}</text>`;
      }
    }
  }
  return `<svg viewBox="0 0 ${L} ${W}" class="sheet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sheet ${index + 1} nesting layout">${s}</svg>`;
}
