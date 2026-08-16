/* ------------------------------------------------------------------
   app.js  ·  state, routing and rendering
   ------------------------------------------------------------------ */

import {
  SETTINGS, MATERIALS, FINISHES, EDGES, HARDWARE, RATES,
  PRODUCTS, CATEGORIES, productById,
  APPLIANCES, BENCHTOPS, BT_EDGES, BT_CUTOUTS,
} from './data.js';
import { buildParts, summarise, hingesFor } from './cutlist.js';
import { priceCabinet, priceJob, money, money0 } from './pricing.js';
import { elevation, plan, thumb } from './draw.js';
import { nestJob, drawSheet } from './nest.js';
import {
  roomWalls, ensureWalls, newRoom, demoRoom, wallLength, remaining, layout, runWidth,
  makeCabinet, makeAppliance, makeFiller, addItem, removeItem, moveItem,
  findItem, fillGap, roomCabinets, benchtopRuns, priceBenchtops, itemWidth,
  moveToWall, placeItem, resolvePosition, resolveHeight, normaliseRoom,
  gaps, overhang, itemHeight, wallExtents, levelFloor,
} from './room.js';
import { wallElevation, roomPlan } from './planview.js';

/* ---------------- state ---------------- */
const LS = 'kerf.v2';
const state = {
  mode: 'trade',
  theme: null,
  cat: 'all',
  cart: [],
  jobName: '',
  view: 'elev',       // elev | plan
  tab: 'cut',         // cut | price | specs
  cfg: null,
  pid: null,
  editing: null,
  /* planner */
  room: null,
  wall: 'A',
  level: 'base',
  sel: null,
  cam: 'iso',
  plTab: 'products',
  plCat: null,
  plQuery: '',
  elevOpen: false,
  vis: { uppers: true, dims: true, doors: true },
};

function save() {
  try {
    localStorage.setItem(LS, JSON.stringify({
      mode: state.mode, theme: state.theme, cart: state.cart,
      jobName: state.jobName, room: state.room,
    }));
  } catch (e) { /* private mode — carry on */ }
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(LS) || '{}');
    Object.assign(state, {
      mode: d.mode || 'trade', theme: d.theme || null,
      cart: Array.isArray(d.cart) ? d.cart : [], jobName: d.jobName || '',
      room: d.room && d.room.walls ? normaliseRoom(d.room) : null,
    });
  } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------------
   Undo history

   The room is small and plain JSON, so a snapshot per edit is simpler
   and more reliable than tracking inverse operations. Snapshots are
   taken BEFORE a mutation, so undo lands on the pre-edit state.
   ------------------------------------------------------------------ */
const history = { past: [], future: [] };
const HISTORY_MAX = 60;

function pushHistory() {
  if (!state.room) return;
  history.past.push(JSON.stringify(state.room));
  if (history.past.length > HISTORY_MAX) history.past.shift();
  history.future.length = 0;
}
function stepHistory(from, to) {
  if (!from.length || !state.room) return false;
  to.push(JSON.stringify(state.room));
  state.room = normaliseRoom(JSON.parse(from.pop()));
  state.sel = null;
  if (!roomWalls(state.room).some((w) => w.k === state.wall)) state.wall = 'A';
  save();
  renderPlanner();
  return true;
}

/* actions that change the room and therefore belong in history */
const MUTATING = new Set([
  'addcab', 'addappl', 'del', 'mv', 'fill', 'towall', 'dupeitem', 'rstyle',
  'bt', 'roomdim', 'shape', 'resetroom', 'selw', 'selh', 'seld', 'sely', 'selfin',
]);

const isTrade = () => state.mode === 'trade';
const uid = () => Math.random().toString(36).slice(2, 9);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const $ = (sel) => document.querySelector(sel);

/* price shown to the customer: trade sees ex-GST, homeowner sees inc-GST */
const disp = (n) => (isTrade() ? n : n * (1 + SETTINGS.gst));
const gstLabel = () => (isTrade() ? 'ex GST' : 'inc GST');

function defaultCfg(p) {
  return {
    ...p.def,
    material: 'mel-white', finish: 'match', edge: 'abs04',
    hinge: 'sc', runner: 'under', handle: 'bar',
    back: 'inset16', includeKick: p.cat === 'base' || p.cat === 'tall',
    kickMatchesFront: false, assembled: false, drawerBoxes: true,
    panelAsFront: false, qty: 1,
  };
}

function computed(p, cfg) {
  const parts = buildParts(p, cfg);
  const price = priceCabinet(p, cfg, parts, { trade: isTrade() });
  return { parts, price };
}

/* Everything in the job: cabinets placed in the room, then loose items
   added from the catalogue. Both feed pricing, cut list and nesting. */
function allItems() {
  const fromRoom = state.room
    ? roomCabinets(state.room).map((r) => ({ uid: r.uid, pid: r.pid, cfg: r.cfg, where: r.where, inRoom: true }))
    : [];
  return [...fromRoom, ...state.cart];
}

function cartLines() {
  return allItems().map((it) => {
    const p = productById(it.pid);
    const { parts, price } = computed(p, it.cfg);
    return { ...it, p, parts, price, label: `${p.name} ${it.cfg.w}×${it.cfg.h}×${it.cfg.d}` };
  });
}

/* the whole job, benchtops included */
function jobData() {
  const items = cartLines();
  const bt = state.room ? priceBenchtops(state.room) : { runs: [], lines: [], total: 0, area: 0, leadDays: 0 };
  const btNet = isTrade() ? bt.total * (1 - SETTINGS.tradeDiscount) : bt.total;
  const tot = priceJob(items, { extra: btNet, extraList: bt.total });
  tot.leadDays = Math.max(tot.leadDays, bt.leadDays);
  return { items, bt, btNet, tot };
}

/* ---------------- toast ---------------- */
let toastT;
function toast(msg) {
  const el = $('#toast');
  el.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>${esc(msg)}</span>`;
  el.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('on'), 2600);
}

/* ==================================================================
   VIEWS
   ================================================================== */

function viewShop() {
  const list = state.cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === state.cat);

  const cards = list.map((p) => {
    const cfg = defaultCfg(p);
    const { price } = computed(p, cfg);
    return `
      <button class="card" data-act="open" data-id="${p.id}" type="button">
        <div class="card-fig">${thumb(p)}</div>
        <div class="card-body">
          <span class="tag">${p.cat}</span>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.blurb)}</p>
          <div class="card-foot">
            <span class="from">from · ${p.def.w}×${p.def.h}</span>
            <span class="price">${money0(disp(price.netEach))}</span>
          </div>
        </div>
      </button>`;
  }).join('');

  return `
  <section class="hero">
    <div>
      <div class="kicker">Cut to size · Gold Coast &amp; Brisbane</div>
      <h1>Every cabinet, any size,<br>priced while you type.</h1>
      <p>Change a width and the drawing, the cut list and the price all move together. No sales call, no waiting on a quote, and you see the panel schedule before you commit a cent.</p>
      <div class="hero-stats">
        <div><strong>${PRODUCTS.length}</strong><span>configurable products</span></div>
        <div><strong>${FINISHES.match.lead}&nbsp;days</strong><span>standard melamine lead</span></div>
        <div><strong>${SETTINGS.sheet.l}&nbsp;×&nbsp;${SETTINGS.sheet.w}</strong><span>sheet size we nest to</span></div>
      </div>
    </div>
    <div class="hero-card">
      <div class="callout info" style="margin-bottom:14px">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex:none"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01" stroke-linecap="round"/></svg>
        <div>You're seeing <b>${isTrade() ? 'trade pricing, ex GST' : 'homeowner pricing, inc GST'}</b>. Switch it up in the header.</div>
      </div>
      <div class="steps" style="grid-template-columns:1fr">
        <div class="step"><div class="n">01</div><h3>Configure</h3><p>Drag a dimension, pick a board. The elevation redraws live.</p></div>
        <div class="step"><div class="n">02</div><h3>Check the working</h3><p>Full cut list, edging schedule and a line-by-line price breakdown.</p></div>
        <div class="step"><div class="n">03</div><h3>Send to the saw</h3><p>Nested sheet layout, CSV cut list, order in one click.</p></div>
      </div>
    </div>
  </section>

  <div class="page-head">
    <div>
      <h1>Catalogue</h1>
      <p>Seventeen parametric products instead of four hundred fixed SKUs. Every one takes any dimension inside its limits.</p>
    </div>
  </div>

  <div class="chips" role="group" aria-label="Filter by category">
    ${CATEGORIES.map((c) => `<button class="chip" data-act="cat" data-cat="${c.id}" aria-pressed="${state.cat === c.id}" type="button">${c.name}</button>`).join('')}
  </div>

  <div class="grid">${cards}</div>`;
}

/* ---------------- configurator ---------------- */
function viewProduct(id) {
  const p = productById(id);
  if (!p) return viewShop();
  if (!state.cfg || state.pid !== id) { state.pid = id; state.cfg = defaultCfg(p); }

  return `
  <div class="page-head">
    <div>
      <div class="kicker">${p.cat} cabinet</div>
      <h1>${esc(p.name)}</h1>
      <p>${esc(p.blurb)}</p>
    </div>
    <button class="btn btn-ghost" data-act="back" type="button" style="margin-left:auto">← All products</button>
  </div>

  <div class="cfg">
    <div class="dwg-stage">
      <div class="pane">
        <div class="pane-head">
          <h2>Drawing</h2>
          <div class="viewtabs" role="group" aria-label="Drawing view">
            <button data-act="view" data-view="elev" type="button">Elevation</button>
            <button data-act="view" data-view="plan" type="button">Plan</button>
          </div>
        </div>
        <div class="dwg-wrap" id="dwgwrap"></div>
      </div>

      <div class="pane" style="margin-top:16px">
        <div class="pane-head">
          <h2>Show the working</h2>
          <div class="viewtabs" role="group" aria-label="Detail view" style="margin-left:auto">
            <button data-act="tab" data-tab="cut" type="button">Cut list</button>
            <button data-act="tab" data-tab="price" type="button">Price breakdown</button>
            <button data-act="tab" data-tab="specs" type="button">Specs</button>
          </div>
        </div>
        <div id="detail"></div>
      </div>
    </div>

    <div class="pane">
      <div class="pane-head"><h2>Configure</h2></div>
      <div id="controls"></div>
      <div class="pricebox" id="pricebox"></div>
    </div>
  </div>`;
}

function renderControls() {
  const p = productById(state.pid);
  const c = state.cfg;
  const lim = p.lim;
  const el = $('#controls');
  if (!el) return;

  const dim = (key, label, hint) => `
    <div class="dimrow">
      <div>
        <div class="lab">${label}<i>${hint}</i></div>
        <input type="range" data-dim="${key}" min="${lim[key][0]}" max="${lim[key][1]}" step="1" value="${c[key]}" aria-label="${label} slider">
      </div>
      <div class="numbox">
        <button data-act="step" data-dim="${key}" data-by="-10" type="button" aria-label="Decrease ${label}">−</button>
        <input type="number" data-dim="${key}" min="${lim[key][0]}" max="${lim[key][1]}" value="${c[key]}" aria-label="${label} in millimetres">
        <button data-act="step" data-dim="${key}" data-by="10" type="button" aria-label="Increase ${label}">+</button>
        <span class="unit">mm</span>
      </div>
    </div>`;

  const swatchGroup = (obj, key, current) => `
    <div class="swatches" role="group">
      ${Object.entries(obj).map(([k, v]) => `
        <button class="sw" data-act="set" data-key="${key}" data-val="${k}" aria-pressed="${current === k}" type="button">
          <span class="dot" style="background:${v.swatch}"></span>
          <span class="txt"><b>${esc(v.name)}</b><span>${esc(v.sub)}</span></span>
        </button>`).join('')}
    </div>`;

  const optGroup = (obj, key, current, unit) => `
    <div class="opts" role="group">
      ${Object.entries(obj).map(([k, v]) => `
        <button class="opt" data-act="set" data-key="${key}" data-val="${k}" aria-pressed="${current === k}" type="button">
          <b>${esc(v.name)}</b><span class="rate">${v.rate === 0 ? 'incl.' : '$' + v.rate.toFixed(2) + (unit || '')}</span>
        </button>`).join('')}
    </div>`;

  const sw = (key, title, sub, cost) => `
    <label class="switch">
      <input type="checkbox" data-toggle="${key}" ${state.cfg[key] ? 'checked' : ''}>
      <span class="track"></span>
      <span class="sl"><b>${title}</b><span>${sub}</span></span>
      ${cost ? `<span class="cost">${cost}</span>` : ''}
    </label>`;

  let h = '';

  /* dimensions */
  h += `<div class="ctrl">
    <div class="ctrl-label">Dimensions <small>carcass, excludes doors</small></div>
    ${p.flat
      ? dim('w', 'Length', `${lim.w[0]}–${lim.w[1]}mm`) + dim('h', 'Width', `${lim.h[0]}–${lim.h[1]}mm`)
      : dim('w', 'Width', `${lim.w[0]}–${lim.w[1]}mm`) + dim('h', 'Height', `${lim.h[0]}–${lim.h[1]}mm`) + dim('d', 'Depth', `${lim.d[0]}–${lim.d[1]}mm`)}
  </div>`;

  /* internals */
  if (!p.flat) {
    const rows = [];
    if (!p.noShelf && p.front !== 'drawer') {
      rows.push(`<div class="dimrow">
        <div class="lab">Adjustable shelves<i>${c.shelves ? `${c.shelves * 4} pins included` : 'none'}</i></div>
        <div class="numbox">
          <button data-act="step" data-dim="shelves" data-by="-1" type="button" aria-label="Fewer shelves">−</button>
          <input type="number" data-dim="shelves" min="0" max="6" value="${c.shelves}" aria-label="Number of shelves">
          <button data-act="step" data-dim="shelves" data-by="1" type="button" aria-label="More shelves">+</button>
        </div>
      </div>`);
    }
    if (p.front === 'drawer' || p.front === 'mixed') {
      rows.push(`<div class="dimrow">
        <div class="lab">Drawers<i>graduated front heights</i></div>
        <div class="numbox">
          <button data-act="step" data-dim="drawers" data-by="-1" type="button" aria-label="Fewer drawers">−</button>
          <input type="number" data-dim="drawers" min="1" max="6" value="${c.drawers}" aria-label="Number of drawers">
          <button data-act="step" data-dim="drawers" data-by="1" type="button" aria-label="More drawers">+</button>
        </div>
      </div>`);
    }
    if (rows.length) h += `<div class="ctrl"><div class="ctrl-label">Internals</div>${rows.join('')}</div>`;
  }

  /* boards */
  h += `<div class="ctrl">
    <div class="ctrl-label">Carcass board <small>$${MATERIALS[c.material].rate}/m²</small></div>
    ${swatchGroup(MATERIALS, 'material', c.material)}
  </div>`;

  if (!p.flat && p.front !== 'none') {
    h += `<div class="ctrl">
      <div class="ctrl-label">Door &amp; front finish <small>${FINISHES[c.finish].lead} day lead</small></div>
      ${swatchGroup(FINISHES, 'finish', c.finish)}
    </div>`;
  }

  h += `<div class="ctrl">
    <div class="ctrl-label">Edge banding</div>
    ${optGroup(EDGES, 'edge', c.edge, '/m')}
  </div>`;

  /* hardware */
  if (!p.flat) {
    let hw = '';
    if (p.doors > 0) hw += `<div class="ctrl-label" style="margin-top:4px">Hinges</div>${optGroup(HARDWARE.hinge, 'hinge', c.hinge, ' ea')}`;
    if (c.drawers > 0) hw += `<div class="ctrl-label" style="margin-top:14px">Drawer runners</div>${optGroup(HARDWARE.runner, 'runner', c.runner, ' pr')}`;
    if (p.front !== 'none') hw += `<div class="ctrl-label" style="margin-top:14px">Handles</div>${optGroup(HARDWARE.handle, 'handle', c.handle, ' ea')}`;
    if (hw) h += `<div class="ctrl"><div class="ctrl-label">Hardware</div>${hw}</div>`;
  }

  /* construction toggles */
  if (!p.flat) {
    let t = '';
    t += sw('assembled', 'Assembled & squared', 'Arrives built, not flat pack', '+' + money(RATES.assemble[p.cat] || 0));
    if (p.cat === 'base' || p.cat === 'tall') {
      t += sw('includeKick', 'Include kickboard', `${c.kick}mm high, cut to width`, '');
      if (c.includeKick) t += sw('kickMatchesFront', 'Kick in door finish', 'Matches the doors, not the carcass', '');
    }
    if (c.drawers > 0 && c.runner !== 'blum') t += sw('drawerBoxes', 'Supply drawer boxes', '16mm box, cut and edged', '');
    h += `<div class="ctrl"><div class="ctrl-label">Construction</div>${t}
      <div class="ctrl-label" style="margin-top:14px">Back panel</div>
      <div class="opts">
        ${[['inset16', '16mm full back', 'Strongest'], ['ply6', '6mm ply in rebate', 'Lighter, cheaper'], ['none', 'No back', 'Open back']]
          .map(([k, n, s]) => `<button class="opt" data-act="set" data-key="back" data-val="${k}" aria-pressed="${c.back === k}" type="button"><b>${n}</b><span class="rate">${s}</span></button>`).join('')}
      </div>
    </div>`;
  }

  /* quantity */
  h += `<div class="ctrl">
    <div class="dimrow">
      <div class="lab">Quantity<i>identical cabinets</i></div>
      <div class="numbox">
        <button data-act="step" data-dim="qty" data-by="-1" type="button" aria-label="Fewer">−</button>
        <input type="number" data-dim="qty" min="1" max="99" value="${c.qty}" aria-label="Quantity">
        <button data-act="step" data-dim="qty" data-by="1" type="button" aria-label="More">+</button>
      </div>
    </div>
  </div>`;

  el.innerHTML = h;
}

function renderPrice() {
  const p = productById(state.pid);
  const { price } = computed(p, state.cfg);
  const box = $('#pricebox');
  if (!box) return;

  const each = disp(price.netEach);
  const was = disp(price.listEach);
  const total = disp(price.total);

  box.innerHTML = `
    <div class="price-main">
      <div>
        <div class="amt">${money(each)}</div>
        <div class="price-sub">
          <span>per cabinet · ${gstLabel()}</span>
          ${state.cfg.qty > 1 ? `<span>× ${state.cfg.qty} = <b class="num">${money(total)}</b></span>` : ''}
        </div>
      </div>
      ${isTrade() && price.discountEach > 0
        ? `<div style="text-align:right"><div class="was">${money(was)}</div><div class="price-sub savings" style="justify-content:flex-end">trade −${Math.round(SETTINGS.tradeDiscount * 100)}%</div></div>`
        : ''}
    </div>
    <div class="price-sub" style="margin:8px 0 12px">
      <span>${price.summary.panelCount} panels</span>
      <span>${price.summary.edgeLm.toFixed(1)} lm edging</span>
      <span>${price.leadDays} day lead</span>
    </div>
    <button class="btn btn-pri" data-act="add" type="button">
      ${state.editing ? 'Update this cabinet' : 'Add to job'}
    </button>`;
}

function renderDetail() {
  const p = productById(state.pid);
  const c = state.cfg;
  const { parts, price } = computed(p, c);
  const el = $('#detail');
  if (!el) return;

  document.querySelectorAll('[data-act="tab"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.tab === state.tab));
  document.querySelectorAll('[data-act="view"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view));

  if (state.tab === 'cut') {
    const matName = (m) => m === 'front' ? FINISHES[c.finish].name : m === 'back6' ? '6mm Ply' : MATERIALS[c.material].name;
    const edgeCode = (pt) => {
      if (!pt.eL && !pt.eW) return '—';
      if (pt.eL === 2 && pt.eW === 2) return 'All round';
      const bits = [];
      if (pt.eL) bits.push(`${pt.eL}L`);
      if (pt.eW) bits.push(`${pt.eW}S`);
      return bits.join(' + ');
    };
    el.innerHTML = `<div class="scrollx"><table class="tbl">
      <thead><tr><th>Part</th><th class="r">Qty</th><th class="r">Length</th><th class="r">Width</th><th>Board</th><th>Edging</th></tr></thead>
      <tbody>${parts.map((pt) => `
        <tr>
          <td><b>${esc(pt.name)}</b><div class="dimtx" style="font-size:11.5px">${esc(pt.note || '')}</div></td>
          <td class="r">${pt.qty}</td>
          <td class="r">${Math.round(pt.l)}</td>
          <td class="r">${Math.round(pt.w)}</td>
          <td style="font-size:12px">${esc(matName(pt.mat))}</td>
          <td style="font-size:12px">${edgeCode(pt)}</td>
        </tr>`).join('')}
        <tr class="tot"><td>Totals</td><td class="r">${price.summary.panelCount}</td><td class="r" colspan="2">${(price.summary.areaCarcass + price.summary.areaFront + price.summary.areaBack).toFixed(2)} m²</td><td colspan="2">${price.summary.edgeLm.toFixed(1)} lm banding</td></tr>
      </tbody></table></div>`;
    return;
  }

  if (state.tab === 'price') {
    const groups = [...new Set(price.lines.map((l) => l.group))];
    el.innerHTML = `<div class="scrollx"><table class="tbl">
      <thead><tr><th>Cost driver</th><th>How it's worked out</th><th class="r">Amount</th></tr></thead>
      <tbody>
      ${groups.map((g) => `
        <tr class="grp"><td colspan="3">${g}</td></tr>
        ${price.lines.filter((l) => l.group === g).map((l) => `
          <tr><td>${esc(l.label)}</td><td class="dimtx" style="font-family:var(--mono);font-size:11.5px">${esc(l.detail)}</td><td class="r">${money(disp(l.amount))}</td></tr>`).join('')}
      `).join('')}
        <tr class="tot"><td colspan="2">List price each (${gstLabel()})</td><td class="r">${money(disp(price.listEach))}</td></tr>
        ${isTrade() && price.discountEach ? `<tr><td colspan="2" class="savings">Trade account discount ${Math.round(SETTINGS.tradeDiscount * 100)}%</td><td class="r savings">−${money(price.discountEach)}</td></tr>` : ''}
        <tr class="tot"><td colspan="2">Your price each</td><td class="r">${money(disp(price.netEach))}</td></tr>
      </tbody></table></div>
      <div style="padding:14px 18px"><div class="callout">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex:none"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01" stroke-linecap="round"/></svg>
        <div>Nothing here is a marked-up guess. Every line is board area, banding metres, machine operations or bought-in hardware — the same numbers the factory works to.</div>
      </div></div>`;
    return;
  }

  /* specs */
  const t = SETTINGS.thickness;
  const iw = c.w - 2 * t;
  const doorH = c.h - SETTINGS.gap;
  el.innerHTML = `<div class="scrollx"><table class="tbl"><tbody>
    ${[
      ['Overall size (W × H × D)', `${c.w} × ${c.h + (c.includeKick ? c.kick : 0)} × ${c.d} mm`],
      ['Carcass height', `${c.h} mm${c.includeKick ? ` (+ ${c.kick}mm kick)` : ''}`],
      ['Internal width', `${iw} mm`],
      ['Internal depth', `${c.d - (c.back === 'ply6' ? 6 : c.back === 'none' ? 0 : t)} mm`],
      ['Board thickness', `${t} mm`],
      ['Front reveal / gap', `${SETTINGS.gap} mm`],
      p.doors ? ['Door size', `${Math.round(doorH)} mm high, ${hingesFor(doorH)} hinges per door`] : null,
      ['Construction', 'Top & bottom between sides, 32mm system drilling'],
      ['Edge banding', `${EDGES[c.edge].name} — ${price.summary.edgeLm.toFixed(1)} lm on this cabinet`],
      ['Supplied', c.assembled ? 'Assembled, squared and wrapped' : 'Flat pack, labelled, with fixings'],
      ['Lead time', `${price.leadDays} working days`],
    ].filter(Boolean).map(([k, v]) => `<tr><td style="width:44%"><b>${k}</b></td><td class="mono" style="font-size:12.5px">${esc(v)}</td></tr>`).join('')}
  </tbody></table></div>`;
}

function renderDrawing() {
  const p = productById(state.pid);
  const w = $('#dwgwrap');
  if (!w) return;
  const c = state.cfg;
  const svg = state.view === 'plan' ? (plan(p, c) || elevation(p, c)) : elevation(p, c);
  const overall = c.h + (c.includeKick ? c.kick : 0);
  /* the SVG carries the dimension lines; this caption carries the same
     numbers as real text, so they survive small screens and screen readers */
  w.innerHTML = svg + `<div class="dwg-cap mono">
      <span><b>${c.w}</b> W</span><span><b>${c.h}</b> H${c.includeKick && c.kick ? ` <i>(${overall} incl. kick)</i>` : ''}</span>${p.flat ? '' : `<span><b>${c.d}</b> D</span>`}<span class="dimtx">all mm · carcass only</span>
    </div>`;
}

function refresh() { renderDrawing(); renderDetail(); renderPrice(); }

/* ==================================================================
   ROOM PLANNER
   ================================================================== */
let scene3d = null;
let threeFailed = false;

function roomPrice() {
  const room = state.room;
  const cabs = roomCabinets(room).map((r) => computed(productById(r.pid), r.cfg).price);
  const cab = cabs.reduce((a, p) => a + p.total, 0);
  const bt = priceBenchtops(room);
  const btNet = isTrade() ? bt.total * (1 - SETTINGS.tradeDiscount) : bt.total;
  return { cab, bt, btNet, total: cab + btNet, count: cabs.length };
}

/* Room style is the whole kitchen's look — changing it rewrites every
   cabinet already placed, including any per-cabinet override. That is
   what "apply to the whole kitchen" has to mean. */
function applyRoomStyle() {
  const s = state.room.style;
  for (const { k } of roomWalls(state.room)) {
    for (const lvl of ['base', 'upper']) {
      for (const it of state.room.walls[k][lvl]) {
        if (!it.cfg) continue;
        Object.assign(it.cfg, {
          material: s.material, finish: s.finish, edge: s.edge,
          hinge: s.hinge, runner: s.runner, handle: s.handle,
          back: s.back, assembled: s.assembled,
        });
        if (it.cfg.includeKick) it.cfg.kick = s.kick;
      }
    }
  }
}

/* small inline icon set — matches the reference's control vocabulary */
const ICO = {
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  cab: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M9 11h.01M15 11h.01"/>',
  tools: '<path d="M14.7 6.3a4 4 0 0 1-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5z"/>',
  inbox: '<path d="M3 12h5l2 3h4l2-3h5"/><path d="M4 4h16l1 8v8H3v-8z"/>',
  doc: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h4"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M8 3v18"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12H9"/>',
  redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h5"/>',
  history: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 15h12v6H6z"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>',
  ruler: '<path d="m3 15 6-6 6 6-6 6z" transform="rotate(-45 12 12)"/><path d="M8 10.5 9.5 12M11 8l1.5 1.5M14 5.5 15.5 7"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/>',
  walk: '<circle cx="7" cy="14" r="3.4"/><circle cx="17" cy="14" r="3.4"/><path d="M10.4 14h3.2M4 9l3-2M20 9l-3-2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4v.3M12 17h.01"/>',
  keys: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
  move: '<path d="M12 3v18M3 12h18M12 3 9 6M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',
  edit: '<path d="M4 20h4L20 8l-4-4L4 16z"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15V5a1.5 1.5 0 0 1 1.5-1.5H15"/>',
  left: '<path d="M15 6 9 12l6 6"/>',
  right: '<path d="m9 6 6 6-6 6"/>',
  cube: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m12 3 8 4.5-8 4.5-8-4.5z"/><path d="M12 12v9"/>',
};
const svgIco = (k, size = 17) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICO[k]}</svg>`;

const PL_TABS = [
  ['products', 'cab', 'Products'],
  ['tools', 'tools', 'Style'],
  ['inbox', 'inbox', 'Room'],
  ['doc', 'doc', 'Benchtop'],
  ['book', 'book', 'Totals'],
];

function viewPlanner() {
  if (!state.room) state.room = demoRoom();
  return `
  <div class="pl">
    <div class="pl-stage" id="plStage">
      <div class="pl-canvas" id="stage3d"><div class="stage-msg" id="stageMsg">Loading the 3D view…</div></div>

      <div class="pl-tl">
        <button class="pl-chip pl-round" data-act="pl-menu" type="button" title="Back to biltstudio.com.au" aria-label="Back to the website">${svgIco('left', 22)}</button>
        <button class="pl-chip pl-ghost" data-act="pl-save" type="button">${svgIco('doc', 19)}<span>Save</span></button>
        <button class="pl-chip pl-round-sm pl-ghost" data-act="undo" type="button" title="Undo (Ctrl+Z)" aria-label="Undo">${svgIco('undo', 18)}</button>
        <button class="pl-chip pl-round-sm pl-ghost" data-act="redo" type="button" title="Redo (Ctrl+Shift+Z)" aria-label="Redo">${svgIco('redo', 18)}</button>
      </div>

      <div class="pl-tr">
        <button class="pl-chip pl-round pl-ghost" data-act="pl-help" type="button" title="How this works" aria-label="How this works">${svgIco('help', 21)}</button>
        <div class="pl-price" id="plPrice"></div>
        <button class="pl-chip" data-act="gojob" type="button">Summary${svgIco('right', 18)}</button>
      </div>

      <div class="pl-bl">
        <button class="pl-chip pl-round-sm" data-act="cam" data-cam="iso" type="button" title="3D view" aria-label="3D view">${svgIco('cube', 18)}</button>
        <button class="pl-chip pl-round-sm" data-act="cam" data-cam="plan" type="button" title="Top view" aria-label="Top view">${svgIco('globe', 18)}</button>
        <button class="pl-chip pl-round-sm" data-act="cam" data-cam="walk" type="button" title="Walk through" aria-label="Walk through">${svgIco('walk', 18)}</button>
        <button class="pl-chip pl-round-sm" data-act="zoom" data-by="-1" type="button" title="Zoom in" aria-label="Zoom in">${svgIco('plus', 18)}</button>
        <button class="pl-chip pl-round-sm" data-act="zoom" data-by="1" type="button" title="Zoom out" aria-label="Zoom out">${svgIco('minus', 18)}</button>
      </div>

      <div class="pl-bc">
        <button class="pl-chip pl-chip-sm" data-act="pl-tab" data-tab="inbox" type="button">${svgIco('move', 17)}Customise room</button>
        <button class="pl-chip pl-chip-sm" data-act="pl-elev" type="button">${svgIco('ruler', 17)}Elevation</button>
        <button class="pl-chip pl-chip-sm" data-act="vis" data-vis="uppers" type="button" title="Show or hide wall cabinets">${svgIco('cab', 16)}Uppers</button>
        <button class="pl-chip pl-chip-sm" data-act="vis" data-vis="doors" type="button" title="Show or hide doors">${svgIco('eye', 16)}Doors</button>
        <button class="pl-chip pl-chip-sm" data-act="vis" data-vis="dims" type="button" title="Show or hide dimensions">${svgIco('ruler', 16)}Sizes</button>
      </div>

      <div class="pl-runstrip" id="runstrip" hidden></div>
      <div class="pl-objbar" id="objbar" hidden></div>
      <div class="pl-units">All measurements in mm</div>
      <div class="pl-hint">drag a cabinet to move it · drag the background to orbit · scroll to zoom</div>
    </div>

    <aside class="pl-panel" aria-label="Product and settings panel">
      <div class="pl-tabs" role="tablist">
        ${PL_TABS.map(([id, ic, label]) => `
          <button data-act="pl-tab" data-tab="${id}" type="button" role="tab">${svgIco(ic, 19)}<span>${label}</span></button>`).join('')}
      </div>
      <div class="pl-panel-inner" id="plPanel"></div>
    </aside>
  </div>`;
}

/* categories, presented as rows first then a card grid — the pattern the
   reference planner uses */
const PL_CATS = [
  { id: 'fav', name: 'Popular' },
  { id: 'base', name: 'Base cabinets' },
  { id: 'tall', name: 'Tall cabinets' },
  { id: 'upper', name: 'Wall cabinets' },
  { id: 'pantry', name: 'Pantry & oven' },
  { id: 'component', name: 'Panels & appliances' },
  { id: 'all', name: 'Everything' },
];

function plCatItems(cat) {
  const P = (f) => PRODUCTS.filter(f).map((p) => ({ kind: 'p', p }));
  const appl = Object.entries(APPLIANCES).map(([k, a]) => ({ kind: 'a', k, a }));
  switch (cat) {
    case 'fav': return P((p) => ['base-2d', 'base-3drw', 'wall-2d', 'tall-pantry', 'panel-end'].includes(p.id));
    case 'base': return P((p) => p.cat === 'base');
    case 'tall': return P((p) => p.cat === 'tall');
    case 'upper': return P((p) => p.cat === 'wall');
    case 'pantry': return P((p) => p.id === 'tall-pantry' || p.id === 'tall-oven');
    case 'component': return [...P((p) => p.cat === 'panel'), ...appl];
    default: return [...PRODUCTS.map((p) => ({ kind: 'p', p })), ...appl];
  }
}

function renderPlanner({ rebuild3d = true } = {}) {
  const room = state.room;
  if (!room) return;

  document.querySelectorAll('[data-act="cam"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.cam === state.cam));
  document.querySelectorAll('[data-act="pl-tab"]').forEach((b) => b.setAttribute('aria-pressed', !state.sel && b.dataset.tab === state.plTab));
  document.querySelectorAll('[data-act="vis"]').forEach((b) => b.setAttribute('aria-pressed', !!state.vis[b.dataset.vis]));

  renderPlPanel();
  renderRunStrip();
  renderPlPrice();

  if (rebuild3d && scene3d) scene3d.build(room);
  else if (scene3d) scene3d.highlight(state.sel);
  if (!state.sel) renderObjBar(null);
}

function renderPlPrice() {
  const el = $('#plPrice');
  if (!el) return;
  const rp = roomPrice();
  el.innerHTML = `<b>${money0(disp(rp.total))}</b><span>${gstLabel()} · ${rp.count} items</span>`;
}

/* ---- bottom elevation drawer ---- */
function renderRunStrip() {
  const el = $('#runstrip');
  if (!el) return;
  el.hidden = !state.elevOpen;
  if (!state.elevOpen) return;
  const room = state.room, k = state.wall, lvl = state.level;
  const gapList = gaps(room, k, lvl).filter((g) => g.w >= 10);
  const gap = Math.round(gapList.reduce((a, g) => a + g.w, 0));
  const over = Math.round(overhang(room, k, lvl));
  const L = wallLength(room, k);
  const used = Math.round(runWidth(room.walls[k][lvl]));
  const ext = wallExtents(room, k);

  el.innerHTML = `
    <div class="pl-runstrip-head">
      <div class="pl-walltabs">
        ${roomWalls(room).map((w) => `<button data-act="wall" data-wall="${w.k}" aria-pressed="${w.k === k}" type="button" title="${esc(w.name)}">${w.k}</button>`).join('')}
      </div>
      <div class="pl-walltabs">
        <button data-act="level" data-level="base" aria-pressed="${lvl === 'base'}" type="button">Base</button>
        <button data-act="level" data-level="upper" aria-pressed="${lvl === 'upper'}" type="button">Upper</button>
      </div>
      ${ext ? `<span class="dimtx">overall <b>${ext.w} × ${ext.h}</b></span>` : ''}
      <span class="dimtx">${used} / ${L} mm</span>
      <span class="${over ? 'over' : gap ? 'dimtx' : 'savings'}">${over ? `${over} over` : gap ? `${gap} in ${gapList.length} gap${gapList.length === 1 ? '' : 's'}` : 'no gaps'}</span>
      ${gapList.length ? `<button class="pl-walltabs" style="border:0;background:none;padding:0"><button data-act="fill" type="button" style="padding:0 12px">Fill gaps</button></button>` : ''}
      <button data-act="pl-elev" type="button" style="margin-left:auto;border:0;background:none;cursor:pointer;color:var(--dim);font-size:12px">Hide ✕</button>
    </div>
    <div id="elev">${wallElevation(room, k, state.sel)}</div>`;
}

/* ---- right panel ---- */
function renderPlPanel() {
  const el = $('#plPanel');
  if (!el) return;
  const sel = state.sel ? findItem(state.room, state.sel) : null;
  if (sel) { el.innerHTML = plInfoCard(sel); return; }

  const head = (title, backTo) => `
    <div class="pl-panel-head">
      ${backTo !== undefined ? `<button class="back" data-act="pl-cat" data-cat="${backTo}" type="button" aria-label="Back">${svgIco('left', 20)}</button>` : ''}
      <h2>${esc(title)}</h2>
    </div>`;

  if (state.plTab === 'tools') {
    el.innerHTML = head('Style') + `<div class="pl-panel-body">
      <p class="pl-eyebrow">Applies to every cabinet in the room.</p>${plStyleControls()}</div>`;
    return;
  }
  if (state.plTab === 'inbox') {
    el.innerHTML = head('Room') + `<div class="pl-panel-body">${plRoomControls()}</div>`;
    return;
  }
  if (state.plTab === 'doc') {
    el.innerHTML = head('Benchtop') + `<div class="pl-panel-body">${plBenchControls()}</div>`;
    return;
  }
  if (state.plTab === 'book') {
    el.innerHTML = head('Totals') + `<div class="pl-panel-body">${plRoomTotals()}</div>`;
    return;
  }

  /* products */
  const cat = state.plCat;
  const search = `
    <div class="pl-search">
      <input id="plq" type="search" data-plq value="${esc(state.plQuery || '')}" placeholder="Search products" aria-label="Search products">
    </div>`;

  if (!cat && !state.plQuery) {
    el.innerHTML = head('Add to your kitchen') + `
      <div class="pl-panel-body">
        ${search}
        ${PL_CATS.map((c) => {
          const items = plCatItems(c.id);
          const first = items[0];
          return `<button class="pl-catrow" data-act="pl-cat" data-cat="${c.id}" type="button">
            <span class="fig">${first && first.kind === 'p' ? thumb(first.p) : ''}</span>
            <b>${esc(c.name)}</b>
            <span class="n">${items.length}</span>
            ${svgIco('right', 18)}
          </button>`;
        }).join('')}
      </div>`;
    return;
  }

  const title = state.plQuery ? 'Search' : (PL_CATS.find((c) => c.id === cat)?.name || 'Products');
  const items = state.plQuery ? plSearch(state.plQuery) : plCatItems(cat);
  el.innerHTML = head(title, '') + `
    <div class="pl-panel-body">
      ${search}
      <p class="pl-eyebrow">Adds to wall <b>${state.wall}</b> · ${state.level === 'upper' ? 'upper run' : 'base run'}</p>
      ${plProductGrid(items)}
    </div>`;
}

function plSearch(q) {
  const s = q.toLowerCase();
  return [
    ...PRODUCTS.filter((p) => p.name.toLowerCase().includes(s)).map((p) => ({ kind: 'p', p })),
    ...Object.entries(APPLIANCES).filter(([, a]) => a.name.toLowerCase().includes(s)).map(([k, a]) => ({ kind: 'a', k, a })),
  ];
}

function plProductGrid(items) {
  if (!items.length) return '<p class="dimtx" style="font-size:13.5px">Nothing matches that.</p>';
  const add = `<span class="pl-tile-add">${svgIco('plus', 17)}</span>`;
  return `<div class="pl-tiles">
    ${items.map((it) => {
      if (it.kind === 'a') {
        return `<button class="pl-tile" data-act="addappl" data-ak="${it.k}" type="button">
          <span class="pl-tile-fig">
            <span style="width:74px;height:56px;border-radius:4px;background:${it.a.colour};display:block"></span>${add}
          </span>
          <span class="pl-tile-txt"><b>${esc(it.a.name)}</b><span>${it.a.w} × ${it.a.h} mm</span><span class="price">space</span></span>
        </button>`;
      }
      const p = it.p;
      const price = computed(p, defaultCfg(p)).price;
      return `<button class="pl-tile" data-act="addcab" data-pid="${p.id}" type="button">
        <span class="pl-tile-fig">${thumb(p)}${add}</span>
        <span class="pl-tile-txt">
          <b>${esc(p.name)}</b>
          <span>${p.def.w} × ${p.def.h}${p.flat ? '' : ' × ' + p.def.d} mm</span>
          <span class="price">${money0(disp(price.netEach))}</span>
        </span>
      </button>`;
    }).join('')}
  </div>`;
}

/* ---- the selected object ---- */
function plInfoCard(sel) {
  const it = sel.it;
  const room = state.room;
  const isAppl = it.type === 'appl';
  const isCab = it.type === 'cab';
  const p = isCab ? productById(it.pid) : null;
  const idx = layout(room, sel.k, sel.level).findIndex((o) => o.it.uid === it.uid) + 1;
  const name = isAppl ? APPLIANCES[it.ak].name : isCab ? p.name : 'Filler panel';
  const price = isAppl ? 0 : computed(productById(isCab ? it.pid : 'panel-end'), it.cfg).price.total;
  const mat = !isAppl ? MATERIALS[it.cfg.material] : null;
  const fin = !isAppl ? FINISHES[it.cfg.finish] : null;

  const step = (key, label, val) => `
    <div class="pl-dim">
      <div class="lab">${label}<i>mm</i></div>
      <div class="pl-stepper">
        <button data-act="sel${key}" data-by="-10" type="button" aria-label="Decrease ${label}">−</button>
        <input type="number" data-sel${key} value="${val}" aria-label="${label}">
        <button data-act="sel${key}" data-by="10" type="button" aria-label="Increase ${label}">+</button>
      </div>
    </div>`;

  return `
    <div class="pl-info-head">
      <h2>${esc(name)}</h2>
      ${isAppl ? '' : `<span class="amt">${money(disp(price))}</span>`}
    </div>
    <div class="pl-panel-body">
      <p class="pl-eyebrow">Wall ${sel.k}, position ${idx} · ${sel.level === 'upper' ? 'upper run' : 'base run'}</p>

      ${isAppl ? '' : `
      <div class="pl-eyebrow" style="margin-bottom:8px">Front — just this cabinet</div>
      <div class="pl-swrow">
        ${Object.entries(FINISHES).map(([fk, fv]) => `
          <button class="pl-swchip" data-act="selfin" data-key="finish" data-val="${fk}"
                  aria-pressed="${it.cfg.finish === fk}" type="button" title="${esc(fv.name)}">
            <span style="background:${fv.swatch}"></span>
          </button>`).join('')}
      </div>
      <div class="pl-eyebrow" style="margin:14px 0 8px">Carcass — just this cabinet</div>
      <div class="pl-swrow">
        ${Object.entries(MATERIALS).map(([mk, mv]) => `
          <button class="pl-swchip" data-act="selfin" data-key="material" data-val="${mk}"
                  aria-pressed="${it.cfg.material === mk}" type="button" title="${esc(mv.name)}">
            <span style="background:${mv.swatch}"></span>
          </button>`).join('')}
      </div>
      <p class="pl-eyebrow" style="margin-top:8px">${esc(fin.name)} · ${esc(mat.name)}</p>`}

      <div class="pl-specs">
        ${isAppl
          ? `<div class="pl-dim"><div class="lab">Width</div><div><b>${itemWidth(it)} mm</b></div></div>
             <div class="pl-dim"><div class="lab">Height</div><div><b>${APPLIANCES[it.ak].h} mm</b></div></div>
             <div class="pl-dim"><div class="lab">Depth</div><div><b>${APPLIANCES[it.ak].d} mm</b></div></div>`
          : `${step('w', 'Width', itemWidth(it))}
             ${isCab ? step('h', 'Height', it.cfg.h) + step('d', 'Depth', it.cfg.d) : ''}`}
        <div class="pl-dim"><div class="lab">From the corner</div><div><b>${Math.round(it.x || 0)} mm</b></div></div>
        ${step('y', 'Off the floor', Math.round(it.y || 0))}
      </div>

      <div class="k pl-eyebrow" style="margin-top:20px">Move to another wall</div>
      <div class="wallmove">
        ${roomWalls(room).map((w) => `<button data-act="towall" data-wall="${w.k}" type="button" ${w.k === sel.k ? 'disabled' : ''} title="${esc(w.name)}">${w.k}</button>`).join('')}
      </div>
      <p class="pl-eyebrow" style="margin-top:14px">Drag it in the 3D view to move it sideways or stack it. It snaps flush to its neighbours, the floor and the tops of other cabinets.</p>
    </div>
    <div class="pl-acts">
      <button data-act="deselect" type="button">Done</button>
      ${isCab
        ? `<button class="go" data-act="editroom" data-uid="${it.uid}" type="button">${svgIco('edit', 16)} Edit options</button>`
        : `<button class="go" data-act="del" data-uid="${it.uid}" type="button">${svgIco('trash', 16)} Remove</button>`}
    </div>`;
}

/* ---- per-object floating toolbar ---- */
function renderObjBar(pos) {
  const el = $('#objbar');
  if (!el) return;
  const f = state.sel ? findItem(state.room, state.sel) : null;
  if (!pos || !f || pos.behind) { el.hidden = true; el.dataset.uid = ''; return; }
  el.hidden = false;
  el.style.left = `${pos.x}px`;
  el.style.top = `${pos.y}px`;
  if (el.dataset.uid === state.sel) return;
  el.dataset.uid = state.sel;
  el.innerHTML = `
    <span class="grip" title="Drag the cabinet in the 3D view to move it">${svgIco('move', 16)}</span>
    <button data-act="mv" data-uid="${state.sel}" data-dir="-1" title="Swap with the one before" type="button">${svgIco('left', 16)}</button>
    <button data-act="mv" data-uid="${state.sel}" data-dir="1" title="Swap with the one after" type="button">${svgIco('right', 16)}</button>
    ${f.it.type === 'cab' ? `
      <button data-act="editroom" data-uid="${state.sel}" title="Edit this cabinet" type="button">${svgIco('edit', 16)}</button>
      <button data-act="dupeitem" data-uid="${state.sel}" title="Duplicate" type="button">${svgIco('copy', 16)}</button>` : ''}
    <button class="danger" data-act="del" data-uid="${state.sel}" title="Delete" type="button">${svgIco('trash', 16)}</button>`;
}

/* ---- panel tabs ---- */
function plStyleControls() {
  const room = state.room;
  return `
    <div class="pl-sub" style="margin-top:0">Carcass board</div>
    <div class="swatches">
      ${Object.entries(MATERIALS).map(([k, v]) => `
        <button class="sw" data-act="rstyle" data-key="material" data-val="${k}" aria-pressed="${room.style.material === k}" type="button">
          <span class="dot" style="background:${v.swatch}"></span>
          <span class="txt"><b>${esc(v.name)}</b><span>$${v.rate}/m²</span></span>
        </button>`).join('')}
    </div>
    <div class="pl-sub">Doors &amp; fronts</div>
    <div class="swatches">
      ${Object.entries(FINISHES).map(([k, v]) => `
        <button class="sw" data-act="rstyle" data-key="finish" data-val="${k}" aria-pressed="${room.style.finish === k}" type="button">
          <span class="dot" style="background:${v.swatch}"></span>
          <span class="txt"><b>${esc(v.name)}</b><span>${esc(v.sub)}</span></span>
        </button>`).join('')}
    </div>
    <div class="pl-sub">Handles</div>
    <div class="opts">
      ${Object.entries(HARDWARE.handle).map(([k, v]) => `
        <button class="opt" data-act="rstyle" data-key="handle" data-val="${k}" aria-pressed="${room.style.handle === k}" type="button">
          <b>${esc(v.name)}</b><span class="rate">${v.rate ? '$' + v.rate.toFixed(2) : 'incl.'}</span>
        </button>`).join('')}
    </div>`;
}

function plRoomControls() {
  const shape = state.room.shape || 'rect';
  return `
    <div class="pl-sub" style="margin-top:0">Room shape</div>
    <div class="opts" style="margin-bottom:6px">
      ${[['rect', 'Rectangular', '4 walls'], ['L', 'L-shaped', '6 walls']].map(([v, n, sub]) => `
        <button class="opt" data-act="shape" data-shape="${v}" aria-pressed="${shape === v}" type="button">
          <b>${n}</b><span class="rate">${sub}</span>
        </button>`).join('')}
    </div>
    ${shape === 'L' ? [['notchW', 'Cut-out width'], ['notchD', 'Cut-out depth']].map(([key, lab]) => `
      <div class="pl-dim">
        <div class="lab">${lab}<i>mm</i></div>
        <div class="pl-stepper">
          <button data-act="roomdim" data-key="${key}" data-by="-100" type="button" aria-label="Decrease ${lab}">−</button>
          <input type="number" data-roomdim="${key}" value="${state.room[key]}" aria-label="${lab}">
          <button data-act="roomdim" data-key="${key}" data-by="100" type="button" aria-label="Increase ${lab}">+</button>
        </div>
      </div>`).join('') : ''}
    ${[['w', 'Overall width'], ['d', 'Overall depth'], ['h', 'Ceiling height'], ['upperBottom', 'Wall cabinets start at']]
      .map(([key, lab]) => `
      <div class="pl-dim">
        <div class="lab">${lab}<i>mm</i></div>
        <div class="pl-stepper">
          <button data-act="roomdim" data-key="${key}" data-by="-50" type="button" aria-label="Decrease ${lab}">−</button>
          <input type="number" data-roomdim="${key}" value="${state.room[key]}" aria-label="${lab}">
          <button data-act="roomdim" data-key="${key}" data-by="50" type="button" aria-label="Increase ${lab}">+</button>
        </div>
      </div>`).join('')}
    <div class="pl-sub">Plan</div>
    <div id="plan2d">${roomPlan(state.room, state.wall)}</div>
    <button class="pl-chip pl-chip-sm" style="width:100%;margin-top:18px" data-act="resetroom" type="button">Start an empty room</button>`;
}

function plBenchControls() {
  const room = state.room;
  const runs = benchtopRuns(room);
  return `
    <p class="pl-eyebrow">${runs.length} run${runs.length === 1 ? '' : 's'}, worked out from the base cabinets — 20mm overhang plus 10mm scribe.</p>
    <div class="swatches">
      ${Object.entries(BENCHTOPS).map(([k, v]) => `
        <button class="sw" data-act="bt" data-key="material" data-val="${k}" aria-pressed="${room.bt.material === k}" type="button">
          <span class="dot" style="background:${v.swatch}"></span>
          <span class="txt"><b>${esc(v.name)}</b><span>$${v.rate}/m²</span></span>
        </button>`).join('')}
    </div>
    <div class="pl-sub">Edge</div>
    <div class="opts">
      ${Object.entries(BT_EDGES).map(([k, v]) => `
        <button class="opt" data-act="bt" data-key="edge" data-val="${k}" aria-pressed="${room.bt.edge === k}" type="button">
          <b>${esc(v.name)}</b><span class="rate">${v.rate ? '$' + v.rate + '/m' : 'incl.'}</span>
        </button>`).join('')}
    </div>
    <div class="pl-sub">Cut-outs</div>
    ${Object.entries(BT_CUTOUTS).map(([k, v]) => `
      <label class="switch">
        <input type="checkbox" data-bt="${k}" ${room.bt[k] ? 'checked' : ''}>
        <span class="track"></span>
        <span class="sl"><b>${esc(v.name)}</b></span>
        <span class="cost">${money(v.rate)}</span>
      </label>`).join('')}`;
}

function plRoomTotals() {
  const rp = roomPrice();
  return `
    <div class="totals">
      <div class="row"><span>${rp.count} cabinet${rp.count === 1 ? '' : 's'} &amp; panels</span><span>${money(disp(rp.cab))}</span></div>
      ${rp.bt.runs.length ? `<div class="row"><span>Benchtop · ${rp.bt.area.toFixed(2)} m²</span><span>${money(disp(rp.btNet))}</span></div>` : ''}
      <div class="row big"><span>Room total</span><span>${money(disp(rp.total))}</span></div>
    </div>
    <div class="price-sub" style="margin-top:10px">
      <span>${gstLabel()}</span>${isTrade() ? `<span class="savings">trade −${Math.round(SETTINGS.tradeDiscount * 100)}%</span>` : ''}
    </div>
    <button class="pl-chip" style="width:100%;margin-top:18px;background:var(--accent);color:#fff" data-act="gojob" type="button">Review job &amp; cut list</button>`;
}

async function mount3d() {
  const el = $('#stage3d');
  if (!el) return;
  if (threeFailed) { showStageMsg('3D unavailable — the three.js module could not be loaded. The planner still works from the elevation and plan views.'); return; }
  try {
    const mod = await import('./three-view.js');
    if (!$('#stage3d')) return;                 // navigated away while loading
    $('#stageMsg')?.remove();
    scene3d = mod.mountScene(el, {
      onSelect: (uid) => {
        state.sel = uid;
        if (uid) {
          const f = findItem(state.room, uid);
          if (f) { state.wall = f.k; state.level = f.level; }
        }
        renderPlanner({ rebuild3d: false });
        scene3d.highlight(uid);
      },
      /* keeps the floating per-object toolbar pinned to the cabinet */
      onSelectionScreen: (pos) => renderObjBar(pos),
      /* the scene asks who it is about to drag */
      getItemWall: (uid) => {
        const f = findItem(state.room, uid);
        if (!f) return null;
        return {
          k: f.k, wall: f.k, level: f.level,
          width: itemWidth(f.it), height: itemHeight(f.it),
          depth: f.it.type === 'appl' ? APPLIANCES[f.it.ak].d : (f.it.cfg?.d || 560),
        };
      },
      /* dropped somewhere — snap it into that wall's run at that point */
      /* live snapping while the item is in the air, in both axes */
      resolveDrag: (uid, wall, desiredX, desiredY) => {
        const f = findItem(state.room, uid);
        if (!f || wall !== f.k) return { x: desiredX, y: desiredY };
        const y = resolveHeight(state.room, wall, f.level, uid, desiredY);
        return { x: resolvePosition(state.room, wall, f.level, uid, desiredX, y), y };
      },
      onItemDrop: (uid, wall, mm, wantY) => {
        const f = findItem(state.room, uid);
        if (!f) return;
        pushHistory();
        const want = mm - itemWidth(f.it) / 2;
        if (wall !== f.k) moveToWall(state.room, uid, wall, want, wantY);
        else placeItem(state.room, uid, want, wantY);
        state.sel = uid; state.wall = wall; state.level = f.level;
        save();
        renderPlanner();
      },
    });
    scene3d.build(state.room);
    scene3d.setView('iso', state.room);
  } catch (err) {
    threeFailed = true;
    console.error('3D failed:', err);
    /* say which of the two it was — a missing module and a broken scene
       need very different responses */
    const offline = /Failed to fetch|Importing a module|dynamically imported/i.test(err.message || '');
    showStageMsg(offline
      ? '3D unavailable — three.js could not be fetched. Check the connection; the elevation and plan views below still work and pricing is unaffected.'
      : `3D failed to build: ${err.message}. The elevation and plan views below still work and pricing is unaffected.`);
  }
}

function showStageMsg(text) {
  const el = $('#stage3d');
  if (!el) return;
  el.innerHTML = `<div class="stage-msg">${esc(text)}</div>`;
}

function unmount3d() {
  if (scene3d) { try { scene3d.dispose(); } catch (e) { /* already gone */ } scene3d = null; }
}

/* ---------------- job view ---------------- */
function viewJob() {
  const { items, bt, btNet, tot } = jobData();
  if (!items.length) {
    return `<div class="empty">
      <h2>No cabinets in this job yet</h2>
      <p>Plan a room or add a single cabinet — either way the cut list, sheet layout and totals fill in here.</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-pri" style="width:auto" data-act="goplan" type="button">Open the room planner</button>
        <button class="btn btn-sec" data-act="back" type="button">Browse the catalogue</button>
      </div>
    </div>`;
  }

  const nests = nestJob(items);
  const totalSheets = nests.reduce((a, n) => a + n.sheets.length, 0);
  const allParts = items.reduce((a, i) => a + i.parts.reduce((b, p) => b + p.qty, 0) * i.cfg.qty, 0);
  const edgeLm = items.reduce((a, i) => a + i.price.summary.edgeLm * i.cfg.qty, 0);
  /* area-weighted, not an average of percentages */
  const sheetArea = (SETTINGS.sheet.l * SETTINGS.sheet.w) / 1e6;
  const usedM2 = nests.reduce((a, n) => a + n.usedM2, 0);
  const avgYield = totalSheets ? usedM2 / (totalSheets * sheetArea) : 0;
  const wasteM2 = Math.max(0, totalSheets * sheetArea - usedM2);

  const lines = items.map((it) => `
    <div class="line">
      <div class="line-fig">${thumb(it.p)}</div>
      <div>
        <h4>${esc(it.p.name)}</h4>
        <div class="spec">${it.cfg.w} × ${it.cfg.h} × ${it.cfg.d} mm</div>
        <div class="meta">${esc(MATERIALS[it.cfg.material].name)} · ${it.p.front !== 'none' ? esc(FINISHES[it.cfg.finish].name) + ' · ' : ''}${esc(EDGES[it.cfg.edge].name)}${it.cfg.assembled ? ' · assembled' : ' · flat pack'}</div>
        <div style="margin-top:8px;display:flex;gap:14px;align-items:center">
          ${it.inRoom
            ? `<span class="tag">room · wall ${esc((it.where || '').charAt(0))}</span><button class="linkbtn" data-act="goplan" type="button">Edit in planner</button>`
            : `<button class="linkbtn" data-act="edit" data-uid="${it.uid}" type="button">Edit</button>
               <button class="linkbtn" data-act="dupe" data-uid="${it.uid}" type="button">Duplicate</button>
               <button class="linkbtn" data-act="rm" data-uid="${it.uid}" type="button">Remove</button>`}
        </div>
      </div>
      <div class="line-right">
        ${it.inRoom ? '' : `<div class="qty">
          <button data-act="q" data-uid="${it.uid}" data-by="-1" type="button" aria-label="Decrease quantity">−</button>
          <span>${it.cfg.qty}</span>
          <button data-act="q" data-uid="${it.uid}" data-by="1" type="button" aria-label="Increase quantity">+</button>
        </div>`}
        <div class="amt">${money(disp(it.price.total))}</div>
        <div class="dimtx" style="font-size:11.5px">${money(disp(it.price.netEach))} each</div>
      </div>
    </div>`).join('');

  const sheets = nests.map((n) => `
    <div style="margin-bottom:20px">
      <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:9px;flex-wrap:wrap">
        <h3 style="font-size:14px">${esc(n.label)}</h3>
        <span class="tag">${n.sheets.length} sheet${n.sheets.length === 1 ? '' : 's'}</span>
        <span class="tag">${Math.round(n.yield * 100)}% yield</span>
        ${n.grain ? '<span class="tag">grain locked</span>' : ''}
      </div>
      ${n.sheets.map((s, i) => `
        <div class="sheetwrap">
          <header><b>Sheet ${i + 1}</b><span class="dimtx">${SETTINGS.sheet.l} × ${SETTINGS.sheet.w} mm</span><span class="dimtx" style="margin-left:auto">${s.shelves.reduce((a, sh) => a + sh.parts.length, 0)} parts</span></header>
          ${drawSheet(s, i)}
        </div>`).join('')}
      ${n.oversize.length ? `<div class="callout" style="border-color:var(--warn);color:var(--warn)"><div><b>${n.oversize.length} part${n.oversize.length === 1 ? '' : 's'} exceed a single sheet.</b> These need joining or a larger board — we'll call you before cutting.</div></div>` : ''}
    </div>`).join('');

  return `
  <div class="page-head">
    <div>
      <div class="kicker">Job</div>
      <h1>${state.jobName ? esc(state.jobName) : 'Untitled job'}</h1>
      <p>${items.length} line${items.length === 1 ? '' : 's'} · ${allParts} panels · ${totalSheets} sheets · ${edgeLm.toFixed(0)} lm edging</p>
    </div>
    <div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-ghost" data-act="csv" type="button">Download cut list (CSV)</button>
      <button class="btn btn-ghost" data-act="print" type="button">Print quote</button>
    </div>
  </div>

  <div class="job">
    <div style="display:grid;gap:18px">
      <div class="pane">
        <div class="pane-head"><h2>Cabinets</h2></div>
        ${lines}
      </div>

      <div class="pane">
        <div class="pane-head"><h2>Sheet optimisation</h2><span class="dimtx" style="margin-left:auto;font-size:12px">${usedM2.toFixed(1)} m² used of ${(totalSheets * sheetArea).toFixed(1)} m²</span></div>
        <div class="pane-body">
          <div class="callout info" style="margin-bottom:16px">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex:none"><path d="M3 3h18v18H3zM3 9h18M9 9v12" stroke-linejoin="round"/></svg>
            <div>This is how your job lands on the saw. You're carrying <b>${wasteM2.toFixed(1)} m² of offcut</b> across ${nests.length} board type${nests.length === 1 ? '' : 's'} — consolidating boards or nudging a width is where the money actually is.</div>
          </div>
          ${sheets}
        </div>
      </div>

      ${bt.runs.length ? `
      <div class="pane">
        <div class="pane-head"><h2>Benchtop schedule</h2><span class="dimtx" style="margin-left:auto;font-size:12px">${esc(BENCHTOPS[state.room.bt.material].name)}</span></div>
        <div class="scrollx"><table class="tbl">
          <thead><tr><th>Run</th><th class="r">Length</th><th class="r">Depth</th><th class="r">Area</th><th>Edge</th></tr></thead>
          <tbody>
            ${bt.runs.map((r) => `<tr>
              <td><b>${esc(r.wallName)}</b></td>
              <td class="r">${r.length}</td><td class="r">${r.depth}</td>
              <td class="r">${((r.length * r.depth) / 1e6).toFixed(2)} m²</td>
              <td style="font-size:12px">${esc(BT_EDGES[state.room.bt.edge].name)}</td></tr>`).join('')}
            <tr class="tot"><td>Total</td><td class="r" colspan="2">${bt.runs.length} run${bt.runs.length === 1 ? '' : 's'}</td><td class="r">${bt.area.toFixed(2)} m²</td><td>${money(disp(btNet))}</td></tr>
          </tbody></table></div>
        <div class="pane-body" style="padding-top:0">
          <div class="callout">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex:none"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01" stroke-linecap="round"/></svg>
            <div>Derived automatically from the base runs in the planner — 20mm front overhang plus 10mm scribe allowance. Change a cabinet depth and this follows.</div>
          </div>
        </div>
      </div>` : ''}
    </div>

    <div style="display:grid;gap:16px;position:sticky;top:76px">
      <div class="pane">
        <div class="pane-head"><h2>Quote</h2></div>
        <div class="pane-body">
          <div class="totals">
            ${isTrade() && tot.saved > 0 ? `<div class="row"><span>List price</span><span class="dimtx" style="text-decoration:line-through">${money(disp(tot.list))}</span></div>
            <div class="row savings"><span>Trade discount</span><span>−${money(tot.saved)}</span></div>` : ''}
            <div class="row"><span>Cabinets &amp; panels</span><span>${money(disp(tot.sub - btNet))}</span></div>
            ${bt.runs.length ? `<div class="row"><span>Benchtop · ${bt.area.toFixed(2)} m² ${esc(BENCHTOPS[state.room.bt.material].name)}</span><span>${money(disp(btNet))}</span></div>` : ''}
            <div class="row"><span>Delivery${tot.delivery === 0 ? ' <b class="savings">free</b>' : ' (metro)'}</span><span>${tot.delivery === 0 ? '$0.00' : money(disp(tot.delivery))}</span></div>
            ${isTrade()
              ? `<div class="row dimtx"><span>GST</span><span>${money(tot.gst)}</span></div>
                 <div class="row big"><span>Total ex GST</span><span>${money(tot.exGst)}</span></div>`
              : `<div class="row dimtx"><span>Includes GST</span><span>${money(tot.gst)}</span></div>
                 <div class="row big"><span>Total</span><span>${money(tot.incGst)}</span></div>`}
          </div>

          ${tot.freeDeliveryGap > 0 ? `
            <div style="margin-top:16px">
              <div class="bar"><i style="width:${Math.min(100, (tot.sub / SETTINGS.freeDeliveryOver) * 100)}%"></i></div>
              <div class="dimtx" style="font-size:12px;margin-top:7px">${money(tot.freeDeliveryGap)} more for free delivery</div>
            </div>` : ''}

          <div class="callout good" style="margin-top:16px">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex:none"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div>Ready to cut. <b>${tot.leadDays} working days</b> from order.</div>
          </div>

          <button class="btn btn-pri" style="margin-top:16px" data-act="checkout" type="button">Order this job</button>
          <button class="btn btn-sec" style="width:100%;margin-top:9px" data-act="back" type="button">Add another cabinet</button>
        </div>
      </div>

      <div class="pane">
        <div class="pane-head"><h2>Job totals</h2></div>
        <div class="pane-body">
          <div class="stats">
            <div><strong>${allParts}</strong><span>panels</span></div>
            <div><strong>${totalSheets}</strong><span>sheets</span></div>
            <div><strong>${edgeLm.toFixed(0)}</strong><span>lm edging</span></div>
            <div><strong>${Math.round(avgYield * 100)}%</strong><span>yield</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ==================================================================
   QUOTE — the printable deliverable
   ================================================================== */
function quoteRef() {
  /* stable for a given job name so reprinting doesn't renumber it */
  const seed = (state.jobName || 'job').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return 'BS-' + String(1000 + (seed % 9000));
}

function viewQuote() {
  const { items, bt, btNet, tot } = jobData();
  if (!items.length) {
    return `<div class="empty">
      <h2>Nothing to quote yet</h2>
      <p>Add cabinets to the job first.</p>
      <button class="btn btn-pri" style="width:auto" data-act="goplan" type="button">Open the room planner</button>
    </div>`;
  }

  const nests = nestJob(items);
  const sheets = nests.reduce((a, n) => a + n.sheets.length, 0);
  const panels = items.reduce((a, i) => a + i.parts.reduce((b, p) => b + p.qty, 0) * i.cfg.qty, 0);
  const edgeLm = items.reduce((a, i) => a + i.price.summary.edgeLm * i.cfg.qty, 0);
  const today = new Date();
  const valid = new Date(today.getTime() + 30 * 864e5);
  const fmt = (d) => d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

  return `
  <div class="quote-actions">
    <button class="btn btn-ghost" data-act="gojob" type="button">← Back to the job</button>
    <div style="margin-left:auto;display:flex;gap:8px">
      <button class="btn btn-ghost" data-act="csv" type="button">Cut list (CSV)</button>
      <button class="btn btn-pri" style="width:auto" data-act="print" type="button">Print or save as PDF</button>
    </div>
  </div>

  <article class="quote">
    <header class="quote-head">
      <div>
        <div class="quote-brand">BILT</div>
        <div class="dimtx" style="font-size:12px">Bilt Studio · cut-to-size cabinetry</div>
      </div>
      <div class="quote-meta">
        <div><span>Quote</span><b>${quoteRef()}</b></div>
        <div><span>Date</span><b>${fmt(today)}</b></div>
        <div><span>Valid until</span><b>${fmt(valid)}</b></div>
      </div>
    </header>

    <section class="quote-parties">
      <div>
        <h3>Job</h3>
        <p><b>${esc(state.jobName || 'Untitled job')}</b></p>
        <p class="dimtx">${isTrade() ? 'Trade account' : 'Homeowner'} · prices ${gstLabel()}</p>
      </div>
      <div>
        <h3>Customer</h3>
        <p class="quote-fill">Name</p>
        <p class="quote-fill">Delivery address</p>
        <p class="quote-fill">Contact</p>
      </div>
    </section>

    <table class="tbl quote-tbl">
      <thead><tr>
        <th>#</th><th>Item</th><th>Specification</th>
        <th class="r">Qty</th><th class="r">Unit</th><th class="r">Total</th>
      </tr></thead>
      <tbody>
        ${items.map((it, i) => `<tr>
          <td>${i + 1}</td>
          <td><b>${esc(it.p.name)}</b><div class="dimtx" style="font-size:11.5px">${it.cfg.w} × ${it.cfg.h} × ${it.cfg.d} mm</div></td>
          <td style="font-size:12px">${esc(MATERIALS[it.cfg.material].name)}${it.p.front !== 'none' ? ' · ' + esc(FINISHES[it.cfg.finish].name) : ''}<br>
            <span class="dimtx">${esc(EDGES[it.cfg.edge].name)} · ${it.cfg.assembled ? 'assembled' : 'flat pack'}</span></td>
          <td class="r">${it.cfg.qty}</td>
          <td class="r">${money(disp(it.price.netEach))}</td>
          <td class="r">${money(disp(it.price.total))}</td>
        </tr>`).join('')}
        ${bt.runs.length ? `<tr>
          <td>${items.length + 1}</td>
          <td><b>Benchtop</b><div class="dimtx" style="font-size:11.5px">${bt.runs.length} run${bt.runs.length === 1 ? '' : 's'}, ${bt.area.toFixed(2)} m²</div></td>
          <td style="font-size:12px">${esc(BENCHTOPS[state.room.bt.material].name)}<br>
            <span class="dimtx">${esc(BT_EDGES[state.room.bt.edge].name)}</span></td>
          <td class="r">1</td>
          <td class="r">${money(disp(btNet))}</td>
          <td class="r">${money(disp(btNet))}</td>
        </tr>` : ''}
      </tbody>
    </table>

    <section class="quote-foot">
      <div class="quote-summary">
        <h3>What gets cut</h3>
        <div class="stats">
          <div><strong>${panels}</strong><span>panels</span></div>
          <div><strong>${sheets}</strong><span>sheets</span></div>
          <div><strong>${edgeLm.toFixed(0)}</strong><span>lm edging</span></div>
          <div><strong>${tot.leadDays}</strong><span>day lead</span></div>
        </div>
        <p class="dimtx" style="font-size:11.5px;margin-top:12px">
          Full panel schedule with edging codes is available as a CSV and forms part of this quote.
          Sizes are carcass sizes; doors are additional and included in the item price.
        </p>
      </div>

      <div class="totals quote-totals">
        ${isTrade() && tot.saved > 0 ? `
          <div class="row"><span>List price</span><span class="dimtx" style="text-decoration:line-through">${money(disp(tot.list))}</span></div>
          <div class="row savings"><span>Trade discount ${Math.round(SETTINGS.tradeDiscount * 100)}%</span><span>−${money(tot.saved)}</span></div>` : ''}
        <div class="row"><span>Goods</span><span>${money(disp(tot.sub))}</span></div>
        <div class="row"><span>Delivery${tot.delivery === 0 ? ' (free)' : ' (metro)'}</span><span>${tot.delivery ? money(disp(tot.delivery)) : '$0.00'}</span></div>
        ${isTrade()
          ? `<div class="row dimtx"><span>GST</span><span>${money(tot.gst)}</span></div>
             <div class="row big"><span>Total ex GST</span><span>${money(tot.exGst)}</span></div>`
          : `<div class="row dimtx"><span>Includes GST</span><span>${money(tot.gst)}</span></div>
             <div class="row big"><span>Total</span><span>${money(tot.incGst)}</span></div>`}
      </div>
    </section>

    <footer class="quote-terms dimtx">
      Prices hold until ${fmt(valid)}. Lead time runs from order confirmation, not from quote date.
      Measurements are the customer's responsibility unless a site measure has been booked.
      This is a prototype quote — it is not a tax invoice and no order has been placed.
    </footer>
  </article>`;
}

function viewHow() {
  return `
  <div class="page-head"><div>
    <div class="kicker">How it works</div>
    <h1>Priced like a factory, not a guess.</h1>
    <p>Most cut-to-size portals hide the number until you commit. This one shows the arithmetic, because a builder who can see the arithmetic orders again.</p>
  </div></div>
  <div class="steps">
    ${[
      ['01', 'Plan the room in 3D', 'Set the wall lengths, drop cabinets along a run and they butt up in order. Orbit the real kitchen, or work from the dimensioned elevation.'],
      ['02', 'Configure anything', 'Seventeen parametric products cover what a 400-SKU list covers, without the scrolling. Any size inside the machine limits.'],
      ['03', 'The drawing is live', 'Elevation and plan redraw on every keystroke, with real dimension lines. No "preview is indicative only" disclaimer.'],
      ['04', 'The price is live', 'Board area, banding metres, drilling operations, hardware. Each on its own line, updating as you type.'],
      ['05', 'Benchtops follow the run', 'Lengths, depths, joins and cut-outs are derived from the cabinets underneath. Change a depth and the benchtop follows.'],
      ['06', 'The cut list is yours', 'Full panel schedule and edging codes before you pay, downloadable as CSV. If you want to cut it yourself, take it.'],
      ['07', 'Nested before you order', 'See exactly how many sheets your job burns. Change one width, watch a sheet disappear.'],
      ['08', 'Order or park it', 'Jobs save locally and reload. Trade accounts see ex-GST with the discount applied; homeowners see inc-GST.'],
    ].map(([n, t, p]) => `<div class="step"><div class="n">${n}</div><h3>${t}</h3><p>${p}</p></div>`).join('')}
  </div>`;
}

/* ==================================================================
   drawer / cart
   ================================================================== */
function renderDrawer() {
  const { items, bt, btNet, tot } = jobData();
  const body = $('#drawerBody');
  const foot = $('#drawerFoot');
  $('#cartCount').textContent = items.reduce((a, i) => a + i.cfg.qty, 0);

  if (!items.length) {
    body.innerHTML = `<div class="empty" style="padding:50px 20px"><h2 style="font-size:16px">Nothing here yet</h2><p style="font-size:13.5px">Cabinets you add show up here.</p></div>`;
    foot.innerHTML = `<button class="btn btn-sec" data-act="closecart" type="button">Keep browsing</button>`;
    return;
  }
  body.innerHTML = items.map((it) => `
    <div class="line">
      <div class="line-fig">${thumb(it.p)}</div>
      <div>
        <h4>${esc(it.p.name)}</h4>
        <div class="spec">${it.cfg.w} × ${it.cfg.h} × ${it.cfg.d}</div>
        <div class="meta">${esc(MATERIALS[it.cfg.material].name)}</div>
        ${it.inRoom
          ? `<span class="tag" style="margin-top:6px">in room</span>`
          : `<button class="linkbtn" data-act="rm" data-uid="${it.uid}" type="button" style="margin-top:6px">Remove</button>`}
      </div>
      <div class="line-right">
        ${it.inRoom ? '' : `<div class="qty">
          <button data-act="q" data-uid="${it.uid}" data-by="-1" type="button" aria-label="Decrease quantity">−</button>
          <span>${it.cfg.qty}</span>
          <button data-act="q" data-uid="${it.uid}" data-by="1" type="button" aria-label="Increase quantity">+</button>
        </div>`}
        <div class="amt">${money(disp(it.price.total))}</div>
      </div>
    </div>`).join('')
    + (bt.runs.length ? `<div class="line">
        <div class="line-fig" style="display:grid;place-items:center;background:${BENCHTOPS[state.room.bt.material].swatch}"></div>
        <div>
          <h4>Benchtop</h4>
          <div class="spec">${bt.area.toFixed(2)} m² · ${bt.runs.length} run${bt.runs.length === 1 ? '' : 's'}</div>
          <div class="meta">${esc(BENCHTOPS[state.room.bt.material].name)}</div>
        </div>
        <div class="line-right"><div class="amt">${money(disp(btNet))}</div></div>
      </div>` : '');

  foot.innerHTML = `
    <div class="totals">
      <div class="row"><span>Subtotal</span><span>${money(disp(tot.sub))}</span></div>
      <div class="row dimtx"><span>Delivery</span><span>${tot.delivery ? money(disp(tot.delivery)) : 'free'}</span></div>
      <div class="row big"><span>${isTrade() ? 'Total ex GST' : 'Total'}</span><span>${money(isTrade() ? tot.exGst : tot.incGst)}</span></div>
    </div>
    <button class="btn btn-pri" data-act="gojob" type="button">Review job &amp; cut list</button>`;
}

function openCart(on) {
  $('#drawer').classList.toggle('on', on);
  $('#scrim').classList.toggle('on', on);
  $('#drawer').setAttribute('aria-hidden', String(!on));
}

/* ==================================================================
   CSV export
   ================================================================== */
function exportCsv() {
  const items = cartLines();
  const rows = [['Item', 'Cabinet', 'Part', 'Qty', 'Length (mm)', 'Width (mm)', 'Board', 'Edge L', 'Edge W', 'Notes']];
  items.forEach((it, idx) => {
    const matName = (m) => m === 'front' ? FINISHES[it.cfg.finish].name : m === 'back6' ? '6mm Ply' : MATERIALS[it.cfg.material].name;
    it.parts.forEach((pt) => {
      rows.push([
        idx + 1, `${it.p.name} ${it.cfg.w}x${it.cfg.h}x${it.cfg.d}`, pt.name,
        pt.qty * it.cfg.qty, Math.round(pt.l), Math.round(pt.w),
        matName(pt.mat), pt.eL, pt.eW, pt.note || '',
      ]);
    });
  });
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(state.jobName || 'bilt-job').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-cutlist.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Cut list downloaded');
}

/* ==================================================================
   router + events
   ================================================================== */
function route() {
  const h = location.hash || '#/shop';
  const view = $('#view');
  document.querySelectorAll('#nav a').forEach((a) => {
    a.toggleAttribute('aria-current', a.getAttribute('href') === h.split('/').slice(0, 2).join('/'));
    if (a.getAttribute('href') === h) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  if (h !== '#/plan') unmount3d();
  document.body.classList.toggle('on-planner', h === '#/plan');

  if (h.startsWith('#/p/')) {
    view.innerHTML = viewProduct(h.slice(4));
    renderControls();
    refresh();
  } else if (h === '#/plan') {
    if (!scene3d) {
      view.innerHTML = viewPlanner();
      renderPlanner({ rebuild3d: false });
      mount3d();
    } else {
      renderPlanner();
    }
  } else if (h === '#/job') {
    view.innerHTML = viewJob();
  } else if (h === '#/quote') {
    view.innerHTML = viewQuote();
  } else if (h === '#/how') {
    view.innerHTML = viewHow();
  } else {
    state.cfg = null; state.pid = null; state.editing = null;
    view.innerHTML = viewShop();
  }
  window.scrollTo(0, 0);
  renderDrawer();
  renderChrome();
}

function renderChrome() {
  document.querySelectorAll('[data-act="mode"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === state.mode));
  const n = $('#notice');
  n.innerHTML = isTrade()
    ? `<span><span class="dot"></span><b>Trade account</b></span><span>${Math.round(SETTINGS.tradeDiscount * 100)}% off list, applied</span><span>Prices shown <b>ex GST</b></span><span>Free delivery over ${money0(SETTINGS.freeDeliveryOver)}</span>`
    : `<span><span class="dot"></span>Homeowner pricing</span><span>All prices <b>include GST</b></span><span>Free metro delivery over ${money0(SETTINGS.freeDeliveryOver)}</span><span>Flat pack or assembled</span>`;
}

function applyTheme() {
  /* Bilt Studio is a dark identity, so charcoal is the default face and
     the toggle is an opt-out rather than an OS mirror. */
  const t = state.theme || 'dark';
  document.documentElement.setAttribute('data-theme', t);
}

function setDim(key, val) {
  const p = productById(state.pid);
  const lim = p.lim[key];
  let v = Math.round(Number(val) || 0);
  if (lim) v = Math.min(lim[1], Math.max(lim[0], v));
  else if (key === 'qty') v = Math.min(99, Math.max(1, v));
  else if (key === 'shelves') v = Math.min(6, Math.max(0, v));
  else if (key === 'drawers') v = Math.min(6, Math.max(1, v));
  state.cfg[key] = v;

  document.querySelectorAll(`[data-dim="${key}"]`).forEach((el) => { el.value = v; });
  if (key === 'drawers' || key === 'shelves') renderControls();
  refresh();
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  if (MUTATING.has(act)) pushHistory();

  if (act === 'undo') {
    if (!stepHistory(history.past, history.future)) toast('Nothing to undo');
    return;
  }
  if (act === 'redo') {
    if (!stepHistory(history.future, history.past)) toast('Nothing to redo');
    return;
  }

  if (act === 'mode') { state.mode = el.dataset.mode; save(); route(); return; }
  if (act === 'theme') {
    state.theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(); save();
    if (scene3d) scene3d.build(state.room);
    return;
  }
  if (act === 'opencart') { openCart(true); return; }
  if (act === 'closecart') { openCart(false); return; }
  if (act === 'gojob') { openCart(false); location.hash = '#/job'; return; }
  if (act === 'goplan') { openCart(false); location.hash = '#/plan'; return; }
  if (act === 'cat') { state.cat = el.dataset.cat; route(); return; }
  if (act === 'open') { state.editing = null; location.hash = '#/p/' + el.dataset.id; return; }
  if (act === 'back') { location.hash = '#/shop'; return; }
  if (act === 'view') { state.view = el.dataset.view; refresh(); return; }
  if (act === 'tab') { state.tab = el.dataset.tab; renderDetail(); return; }
  if (act === 'step') { setDim(el.dataset.dim, (state.cfg[el.dataset.dim] || 0) + Number(el.dataset.by)); return; }

  /* ---------- planner ---------- */
  if (act === 'wall') { state.wall = el.dataset.wall; state.sel = null; renderPlanner({ rebuild3d: false }); if (/^[A-D]$/.test(state.cam)) { state.cam = state.wall; scene3d?.setView('wall:' + state.wall, state.room); } return; }
  if (act === 'pl-tab') { state.sel = null; state.plTab = el.dataset.tab; state.plCat = null; renderPlanner({ rebuild3d: false }); return; }
  if (act === 'pl-cat') { state.plCat = el.dataset.cat || null; state.plQuery = ''; renderPlPanel(); return; }
  if (act === 'pl-elev') { state.elevOpen = !state.elevOpen; renderRunStrip(); return; }
  if (act === 'pl-save') { save(); toast('Job saved to this browser'); return; }
  if (act === 'pl-menu') { location.href = '/'; return; }
  if (act === 'deselect') { state.sel = null; renderPlanner({ rebuild3d: false }); scene3d?.highlight(null); return; }
  if (act === 'dupeitem') {
    const f = findItem(state.room, el.dataset.uid);
    if (f && f.it.type === 'cab') {
      const copy = makeCabinet(state.room, f.it.pid, { ...f.it.cfg });
      copy.x = (f.it.x || 0) + itemWidth(f.it);
      addItem(state.room, f.k, f.level, copy);
      placeItem(state.room, copy.uid, copy.x);
      state.sel = copy.uid; save(); renderPlanner(); toast('Duplicated');
    }
    return;
  }
  if (act === 'vis') {
    state.vis[el.dataset.vis] = !state.vis[el.dataset.vis];
    scene3d?.setVisibility(state.vis);
    document.querySelectorAll('[data-act="vis"]').forEach((b) =>
      b.setAttribute('aria-pressed', !!state.vis[b.dataset.vis]));
    return;
  }
  if (act === 'zoom') { scene3d?.zoom(Number(el.dataset.by)); return; }
  if (act === 'print') { window.print(); return; }
  if (act === 'pl-help') { toast('Drag a cabinet to move it. Drag the background to orbit. Scroll to zoom.'); return; }
  if (act === 'pl-keys') { toast('Esc deselects · +/− zoom · A–D switch walls'); return; }
  if (act === 'level') { state.level = el.dataset.level; state.sel = null; renderPlanner({ rebuild3d: false }); return; }
  if (act === 'cam') {
    state.cam = el.dataset.cam;
    if (/^[A-D]$/.test(state.cam)) { state.wall = state.cam; renderPlanner({ rebuild3d: false }); }
    const mode = /^[A-D]$/.test(state.cam) ? 'wall:' + state.cam : state.cam;
    scene3d?.setView(mode, state.room);
    document.querySelectorAll('[data-act="cam"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.cam === state.cam));
    return;
  }
  if (act === 'sel') { state.sel = el.dataset.uid; renderPlanner({ rebuild3d: false }); scene3d?.highlight(state.sel); return; }
  if (act === 'mv') { moveItem(state.room, el.dataset.uid, Number(el.dataset.dir)); save(); renderPlanner(); return; }
  if (act === 'del') {
    if (state.sel === el.dataset.uid) state.sel = null;
    removeItem(state.room, el.dataset.uid); save(); renderPlanner(); return;
  }
  if (act === 'fill') {
    const made = fillGap(state.room, state.wall, state.level);
    if (made.length) { state.sel = made[0].uid; save(); renderPlanner(); toast(`${made.length} filler panel${made.length === 1 ? '' : 's'} added`); }
    return;
  }
  if (act === 'addcab') {
    const p = productById(el.dataset.pid);
    const it = makeCabinet(state.room, p.id, state.level === 'upper' ? {} : {});
    addItem(state.room, state.wall, state.level, it);
    state.sel = it.uid; save(); renderPlanner(); toast(`${p.name} added to wall ${state.wall}`);
    return;
  }
  if (act === 'addappl') {
    const it = makeAppliance(el.dataset.ak);
    addItem(state.room, state.wall, state.level, it);
    state.sel = it.uid; save(); renderPlanner(); toast(`${APPLIANCES[el.dataset.ak].name} added`);
    return;
  }
  if (act === 'selw' || act === 'selh' || act === 'seld' || act === 'sely') {
    const key = { selw: 'w', selh: 'h', seld: 'd', sely: 'y' }[act];
    const f = state.sel && findItem(state.room, state.sel);
    if (!f) return;
    const cur = key === 'w' ? itemWidth(f.it) : key === 'y' ? (f.it.y || 0) : f.it.cfg[key];
    setSelDim(key, cur + Number(el.dataset.by));
    return;
  }
  /* a finish set on one cabinet only — EKET's per-module colour */
  if (act === 'selfin') {
    const f = state.sel && findItem(state.room, state.sel);
    if (!f || !f.it.cfg) return;
    f.it.cfg[el.dataset.key] = el.dataset.val;
    save(); renderPlanner();
    return;
  }
  if (act === 'roomdim') {
    setRoomDim(el.dataset.key, state.room[el.dataset.key] + Number(el.dataset.by));
    return;
  }
  if (act === 'rstyle') {
    state.room.style[el.dataset.key] = el.dataset.val;
    applyRoomStyle(); save(); renderPlanner();
    return;
  }
  if (act === 'bt') { state.room.bt[el.dataset.key] = el.dataset.val; save(); renderPlanner(); return; }
  if (act === 'towall') {
    if (moveToWall(state.room, state.sel, el.dataset.wall)) {
      state.wall = el.dataset.wall;
      save(); renderPlanner();
      if (state.cam === 'wall') scene3d?.setView('wall:' + state.wall, state.room);
      toast(`Moved to wall ${el.dataset.wall}`);
    }
    return;
  }
  if (act === 'editroom') {
    const f = findItem(state.room, el.dataset.uid);
    if (!f) return;
    state.editing = { uid: f.it.uid, inRoom: true };
    state.pid = f.it.pid;
    state.cfg = { ...f.it.cfg };
    location.hash = '#/p/' + f.it.pid;
    return;
  }
  if (act === 'shape') {
    state.room.shape = el.dataset.shape;
    ensureWalls(state.room);
    if (!roomWalls(state.room).some((w) => w.k === state.wall)) state.wall = 'A';
    state.sel = null;
    save(); renderPlanner();
    toast(el.dataset.shape === 'L' ? 'L-shaped room' : 'Rectangular room');
    return;
  }
  if (act === 'resetroom') {
    state.room = newRoom(); state.sel = null; state.wall = 'A'; state.level = 'base';
    save(); renderPlanner(); toast('Empty room');
    return;
  }

  if (act === 'set') {
    state.cfg[el.dataset.key] = el.dataset.val;
    renderControls(); refresh(); return;
  }

  if (act === 'add') {
    const p = productById(state.pid);
    if (state.editing) {
      const ed = state.editing;
      state.editing = null;
      if (ed.inRoom) {
        const f = findItem(state.room, ed.uid);
        if (f) Object.assign(f.it.cfg, state.cfg);
        save(); toast('Cabinet updated'); location.hash = '#/plan'; return;
      }
      const i = state.cart.find((x) => x.uid === ed.uid);
      if (i) i.cfg = { ...state.cfg };
      toast('Cabinet updated');
      save(); location.hash = '#/job'; return;
    }
    state.cart.push({ uid: uid(), pid: p.id, cfg: { ...state.cfg } });
    save(); renderDrawer(); toast(`${p.name} added to job`);
    return;
  }

  if (act === 'rm') {
    state.cart = state.cart.filter((x) => x.uid !== el.dataset.uid);
    save(); renderDrawer();
    if (location.hash === '#/job') route();
    return;
  }
  if (act === 'dupe') {
    const it = state.cart.find((x) => x.uid === el.dataset.uid);
    if (it) { state.cart.push({ uid: uid(), pid: it.pid, cfg: { ...it.cfg } }); save(); route(); toast('Duplicated'); }
    return;
  }
  if (act === 'edit') {
    const it = state.cart.find((x) => x.uid === el.dataset.uid);
    if (it) { state.editing = { uid: it.uid, inRoom: false }; state.pid = it.pid; state.cfg = { ...it.cfg }; location.hash = '#/p/' + it.pid; }
    return;
  }
  if (act === 'q') {
    const it = state.cart.find((x) => x.uid === el.dataset.uid);
    if (!it) return;
    it.cfg.qty = Math.max(1, Math.min(99, it.cfg.qty + Number(el.dataset.by)));
    save(); renderDrawer();
    if (location.hash === '#/job') route();
    return;
  }
  if (act === 'csv') { exportCsv(); return; }
  if (act === 'print') { window.print(); return; }
  if (act === 'checkout') { location.hash = '#/quote'; return; }
});

/* clicking a cabinet in the elevation or plan SVG selects it */
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-act]')) return;
  const g = e.target.closest('.pv-item[data-uid]');
  if (!g || dragState) return;
  state.sel = g.dataset.uid;
  renderPlanner({ rebuild3d: false });
  scene3d?.highlight(state.sel);
});

/* ------------------------------------------------------------------
   Drag a cabinet along its run in the wall elevation.

   Cabinets butt up in sequence, so dragging is really "choose a new
   index". We translate the dragged group for feedback, show an
   insertion marker, and commit the reorder on release.
   ------------------------------------------------------------------ */
let dragState = null;

function svgMm(svg, clientX) {
  const vb = svg.viewBox.baseVal;
  const r = svg.getBoundingClientRect();
  if (!r.width) return NaN;              // detached node — caller ignores
  return vb.x + ((clientX - r.left) / r.width) * vb.width;
}

/* height off the floor, from a pointer over the elevation SVG */
function svgHeight(svg, clientY) {
  const vb = svg.viewBox.baseVal;
  const r = svg.getBoundingClientRect();
  if (!r.height) return NaN;
  const yDown = vb.y + ((clientY - r.top) / r.height) * vb.height;
  return state.room.h - yDown;           // SVG y runs down from the ceiling
}

/* where the item's left edge wants to be, given the cursor holds its centre */
function desiredLeft(room, uid, mm) {
  const f = findItem(room, uid);
  return f ? mm - itemWidth(f.it) / 2 : mm;
}

document.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  const g = e.target.closest('#elev .pv-item[data-uid]');
  if (!g) return;
  const svg = g.closest('svg');
  const found = findItem(state.room, g.dataset.uid);
  if (!svg || !found) return;

  /* Dragging an upper cabinet switches the panel to the upper run, but
     we must NOT re-render now — that would replace the very node being
     dragged. The strip catches up on drop. */
  state.level = found.level;

  pushHistory();
  dragState = {
    uid: g.dataset.uid, g, svg, level: found.level, wall: found.k,
    startMm: svgMm(svg, e.clientX), originX: found.it.x || 0,
    originY: found.it.y || 0, height: itemHeight(found.it), moved: false,
  };
  g.style.pointerEvents = 'none';
  svg.style.cursor = 'grabbing';
});

document.addEventListener('pointermove', (e) => {
  if (!dragState) return;
  const mm = svgMm(dragState.svg, e.clientX);
  if (!Number.isFinite(mm)) return;
  const dx = mm - dragState.startMm;
  if (!dragState.moved && Math.abs(dx) < 12) return;
  dragState.moved = true;
  e.preventDefault();

  /* preview the snapped landing spot, not the raw cursor — so the
     magnet is visible while you drag, in both axes */
  const want = desiredLeft(state.room, dragState.uid, mm);
  const wantY = svgHeight(dragState.svg, e.clientY) - dragState.height / 2;
  const y = resolveHeight(state.room, dragState.wall, dragState.level, dragState.uid, wantY);
  const x = resolvePosition(state.room, dragState.wall, dragState.level, dragState.uid, want, y);
  /* SVG y grows downward, so a rise in the room is a negative translate */
  dragState.g.setAttribute('transform', `translate(${x - dragState.originX} ${dragState.originY - y})`);
  dragState.g.style.opacity = '.85';
});

document.addEventListener('pointerup', (e) => {
  if (!dragState) return;
  const d = dragState;
  dragState = null;
  d.svg.style.cursor = '';
  d.g.style.pointerEvents = '';
  if (!d.moved) { d.g.style.opacity = ''; d.g.removeAttribute('transform'); return; }

  const mm = svgMm(d.svg, e.clientX);
  const wantY = svgHeight(d.svg, e.clientY) - d.height / 2;
  placeItem(state.room, d.uid, desiredLeft(state.room, d.uid, mm), wantY);
  state.sel = d.uid;
  save();
  renderPlanner();
});

function setSelDim(key, val) {
  const f = state.sel && findItem(state.room, state.sel);
  if (!f) return;
  let v = Math.round(Number(val) || 0);

  if (key === 'y') {
    /* stack height — snap it the same way a drag would */
    f.it.y = resolveHeight(state.room, f.k, f.level, f.it.uid, v);
    f.it.x = resolvePosition(state.room, f.k, f.level, f.it.uid, f.it.x || 0, f.it.y);
    const box = document.querySelector('[data-sely]');
    if (box) box.value = f.it.y;
    save();
    renderPlanner();
    return;
  }

  const p = f.it.type === 'cab' ? productById(f.it.pid) : null;
  if (p && p.lim[key]) v = Math.min(p.lim[key][1], Math.max(p.lim[key][0], v));
  else v = Math.max(20, Math.min(3400, v));

  if (f.it.type === 'cab') f.it.cfg[key] = v;
  else if (key === 'w') { f.it.w = v; if (f.it.cfg) f.it.cfg.w = v; }
  else return;

  const box = document.querySelector(`[data-sel${key}]`);
  if (box) box.value = v;
  save();
  renderPlanner();
}

function setRoomDim(key, val) {
  let v = Math.round(Number(val) || 0);
  const lim = {
    w: [1200, 12000], d: [1200, 12000], h: [2100, 4000], upperBottom: [1000, 2000],
    notchW: [400, Math.max(500, state.room.w - 800)],
    notchD: [400, Math.max(500, state.room.d - 800)],
  }[key];
  v = Math.min(lim[1], Math.max(lim[0], v));
  state.room[key] = v;
  ensureWalls(state.room);
  const box = document.querySelector(`[data-roomdim="${key}"]`);
  if (box) box.value = v;
  save();
  renderPlanner();
}

document.addEventListener('input', (e) => {
  const el = e.target;
  if (!el.dataset) return;
  if (el.dataset.dim) { setDim(el.dataset.dim, el.value); return; }
  if (el.dataset.toggle) {
    state.cfg[el.dataset.toggle] = el.checked;
    renderControls(); refresh(); return;
  }
  if (el.hasAttribute('data-selw')) { setSelDim('w', el.value); return; }
  if (el.hasAttribute('data-selh')) { setSelDim('h', el.value); return; }
  if (el.hasAttribute('data-seld')) { setSelDim('d', el.value); return; }
  if (el.hasAttribute('data-sely')) { setSelDim('y', el.value); return; }
  if (el.dataset.roomdim) { setRoomDim(el.dataset.roomdim, el.value); return; }
  if (el.dataset.bt) { state.room.bt[el.dataset.bt] = el.checked; save(); renderPlanner(); }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { openCart(false); return; }
  if (!(e.ctrlKey || e.metaKey)) return;
  const k = e.key.toLowerCase();
  if (k === 'z' && !e.shiftKey) { e.preventDefault(); stepHistory(history.past, history.future); }
  else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); stepHistory(history.future, history.past); }
});

window.addEventListener('hashchange', route);

/* ---------------- boot ---------------- */
load();
applyTheme();
if (!state.jobName) state.jobName = 'Kitchen — 14 Hillcrest Ave';
route();
