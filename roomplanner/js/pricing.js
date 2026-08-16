/* ------------------------------------------------------------------
   pricing.js  ·  transparent, cost-based quoting

   The single biggest complaint about incumbent cut-to-size portals is
   that a number appears and nobody knows why. Everything here returns
   a LINE for each cost driver so the UI can show its working.
   ------------------------------------------------------------------ */

import { SETTINGS, MATERIALS, FINISHES, EDGES, HARDWARE, RATES } from './data.js';
import { summarise, hingesFor } from './cutlist.js';

const r2 = (n) => Math.round(n * 100) / 100;

export function priceCabinet(product, cfg, parts, opts = {}) {
  const S = SETTINGS;
  const s = summarise(parts);
  const mat = MATERIALS[cfg.material];
  const fin = FINISHES[cfg.finish];
  const edge = EDGES[cfg.edge];
  const lines = [];

  const push = (group, label, detail, amount) =>
    lines.push({ group, label, detail, amount: r2(amount) });

  /* --- board --- */
  if (s.areaCarcass > 0)
    push('Board', mat.name, `${s.areaCarcass.toFixed(2)} m² @ $${mat.rate}/m²`, s.areaCarcass * mat.rate);
  if (s.areaBack > 0)
    push('Board', '6mm ply back', `${s.areaBack.toFixed(2)} m² @ $28/m²`, s.areaBack * 28);
  if (s.areaFront > 0) {
    push('Board', fin.name, `${s.areaFront.toFixed(2)} m² @ $${fin.rate}/m²`, s.areaFront * fin.rate);
    push('Board', 'Front manufacture',
      `${s.areaFront.toFixed(2)} m² @ $${RATES.frontMakeM2}/m²`, s.areaFront * RATES.frontMakeM2);
  }

  /* --- edging ---
     Carcass and exterior band at different rates, and each banded part
     carries an application charge on top of the metres. That split is
     Flatpax's own model, not an invention. */
  if (s.edgeLmCarc > 0) {
    push('Edging', `Carcass edging · ${edge.name}`,
      `${s.edgeLmCarc.toFixed(1)} lm @ $${RATES.edgeLmCarc}/m`, s.edgeLmCarc * RATES.edgeLmCarc);
    push('Edging', 'Carcass edge application',
      `${s.edgedCarc} parts @ $${RATES.edgeApplyCarc}`, s.edgedCarc * RATES.edgeApplyCarc);
  }
  if (s.edgeLmFront > 0) {
    push('Edging', `Front edging · ${edge.name}`,
      `${s.edgeLmFront.toFixed(1)} lm @ $${RATES.edgeLmExt}/m`, s.edgeLmFront * RATES.edgeLmExt);
    push('Edging', 'Front edge application',
      `${s.edgedFront} parts @ $${RATES.edgeApplyExt}`, s.edgedFront * RATES.edgeApplyExt);
  }

  /* --- machining --- */
  push('Machining', 'Handling', `${s.panelCount} parts @ $${RATES.cutPerPart}`, s.panelCount * RATES.cutPerPart);
  const holes = (s.ops.hingeBore || 0) * 5 + (s.ops.shelfHoles || 0) * 16
    + (s.ops.runnerHoles || 0) * 6 + (s.ops.handleDrill || 0) * 2;
  if (holes)
    push('Machining', 'Drilling', `${holes} holes @ $${RATES.drillPerHole}`, holes * RATES.drillPerHole);

  /* --- hardware --- */
  const hingeCount = s.ops.hingeBore;
  if (hingeCount) {
    const h = HARDWARE.hinge[cfg.hinge];
    push('Hardware', h.name, `${hingeCount} @ $${h.rate}`, hingeCount * h.rate);
  }
  if (cfg.drawers > 0) {
    const run = HARDWARE.runner[cfg.runner];
    push('Hardware', run.name, `${cfg.drawers} pairs @ $${run.rate}`, cfg.drawers * run.rate);
  }
  const frontCount = parts.filter((p) => p.mat === 'front' && /door|drwfront/.test(p.key))
    .reduce((a, p) => a + p.qty, 0);
  if (cfg.handle !== 'none' && frontCount) {
    const hd = HARDWARE.handle[cfg.handle];
    push('Hardware', hd.name, `${frontCount} @ $${hd.rate}`, frontCount * hd.rate);
  }
  if (cfg.shelves > 0)
    push('Hardware', 'Shelf pins', `${cfg.shelves * 4} @ $${RATES.shelfPin}`, cfg.shelves * 4 * RATES.shelfPin);
  if (product.cat === 'base' && cfg.includeKick)
    push('Hardware', 'Adjustable legs', '1 set of 4', RATES.legSet);

  /* --- assembly: charged by area, the way Flatpax does it --- */
  if (cfg.assembled) {
    const amt = s.areaCarcass * RATES.asmCarcM2 + s.areaFront * RATES.asmExtM2;
    if (amt > 0) {
      push('Assembly', 'Assembled & squared',
        `${(s.areaCarcass + s.areaFront).toFixed(2)} m² @ $${RATES.asmCarcM2}–${RATES.asmExtM2}/m²`, amt);
    }
  }

  const listEach = r2(lines.reduce((a, l) => a + l.amount, 0));
  const qty = cfg.qty || 1;
  const discount = opts.trade ? listEach * SETTINGS.tradeDiscount : 0;
  const netEach = r2(listEach - discount);

  return {
    lines, summary: s,
    listEach, discountEach: r2(discount), netEach,
    qty, total: r2(netEach * qty),
    leadDays: Math.max(5, fin.lead),
  };
}

/* ---- job level totals ----
   `extra` / `extraList` carry non-cabinet money (benchtops) so the
   discount, delivery threshold and GST all see the true job value. */
export function priceJob(items, opts = {}) {
  const sub = items.reduce((a, i) => a + i.price.total, 0) + (opts.extra || 0);
  const list = items.reduce((a, i) => a + i.price.listEach * i.price.qty, 0) + (opts.extraList || 0);
  const saved = list - sub;
  const delivery = sub === 0 ? 0 : sub >= SETTINGS.freeDeliveryOver ? 0 : SETTINGS.deliveryMetro;
  const exGst = sub + delivery;
  const gst = exGst * SETTINGS.gst;
  return {
    list: r2(list), sub: r2(sub), saved: r2(saved),
    delivery: r2(delivery), exGst: r2(exGst), gst: r2(gst), incGst: r2(exGst + gst),
    freeDeliveryGap: r2(Math.max(0, SETTINGS.freeDeliveryOver - sub)),
    leadDays: items.reduce((a, i) => Math.max(a, i.price.leadDays), 0),
  };
}

export const money = (n) =>
  '$' + n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const money0 = (n) =>
  '$' + Math.round(n).toLocaleString('en-AU');

export { hingesFor };
