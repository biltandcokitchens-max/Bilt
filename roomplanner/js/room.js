/* ------------------------------------------------------------------
   room.js  ·  the room model

   A rectangular room with four walls. Each wall carries two runs — a
   base run and an upper run — and items sit end to end along the run
   from the wall's left-hand corner. That is how a kitchen is actually
   specified, and it means the planner never lets you place a cabinet
   in mid-air or overlapping its neighbour.

   Wall keys, viewed from inside the room:
     A  back    runs left→right,  length = room.w
     B  right   runs back→front,  length = room.d
     C  front   runs right→left,  length = room.w
     D  left    runs front→back,  length = room.d
   ------------------------------------------------------------------ */

import {
  PRODUCTS, productById, APPLIANCES, BENCHTOPS, BT_EDGES, BT_CUTOUTS,
  BT_OVERHANG, BT_SCRIBE, MATERIALS, FINISHES,
} from './data.js';

/* Legacy rectangle labels. Prefer roomWalls(room) — the wall list is
   derived from the room's outline now, so an L-shaped room has six. */
export const WALLS = [
  { k: 'A', name: 'Back wall',  dim: 'w' },
  { k: 'B', name: 'Right wall', dim: 'd' },
  { k: 'C', name: 'Front wall', dim: 'w' },
  { k: 'D', name: 'Left wall',  dim: 'd' },
];

const uid = () => Math.random().toString(36).slice(2, 9);

/* ------------------------------------------------------------------
   Room outline

   The room is a closed polygon walked in a fixed direction, so the
   inward normal of a segment is always its left-hand normal. Cabinets
   are positioned from the segment rather than from hard-coded wall
   letters, which is what lets the shape change.
   ------------------------------------------------------------------ */
export function roomPolygon(room) {
  const { w, d } = room;
  if (room.shape === 'L') {
    const nw = Math.min(room.notchW ?? 1600, w - 600);
    const nd = Math.min(room.notchD ?? 1400, d - 600);
    return [
      { x: 0, z: 0 }, { x: w, z: 0 }, { x: w, z: d - nd },
      { x: w - nw, z: d - nd }, { x: w - nw, z: d }, { x: 0, z: d },
    ];
  }
  return [{ x: 0, z: 0 }, { x: w, z: 0 }, { x: w, z: d }, { x: 0, z: d }];
}

const dirName = (nx, nz) =>
  nz > 0.7 ? 'Back wall' : nz < -0.7 ? 'Front wall'
  : nx > 0.7 ? 'Left wall' : 'Right wall';

export function wallSegments(room) {
  const pts = roomPolygon(room);
  const segs = [];
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i], p1 = pts[(i + 1) % pts.length];
    const dx = p1.x - p0.x, dz = p1.z - p0.z;
    const len = Math.hypot(dx, dz);
    if (len < 1) continue;
    const k = String.fromCharCode(65 + segs.length);
    segs.push({
      k, p0, p1, len,
      ux: dx / len, uz: dz / len,
      nx: -dz / len, nz: dx / len,       // left normal points into the room
      name: dirName(-dz / len, dx / len),
    });
  }
  /* two walls can face the same way on an L — keep the labels unique */
  const seen = new Map();
  for (const s of segs) {
    const n = (seen.get(s.name) || 0) + 1;
    seen.set(s.name, n);
    if (n > 1) s.name += ' (return)';
  }
  return segs;
}

export const roomWalls = (room) => wallSegments(room).map((s) => ({ k: s.k, name: s.name }));
export const wallSegment = (room, k) => wallSegments(room).find((s) => s.k === k);

/* Make sure there is a run object for every wall the outline produces,
   and fold anything on a wall that no longer exists back onto wall A. */
export function ensureWalls(room) {
  const segs = wallSegments(room);
  const keys = segs.map((s) => s.k);
  for (const k of keys) if (!room.walls[k]) room.walls[k] = { base: [], upper: [] };
  for (const k of Object.keys(room.walls)) {
    if (keys.includes(k)) continue;
    for (const lvl of ['base', 'upper']) {
      for (const it of room.walls[k][lvl]) {
        it.x = nextFreeX(room, keys[0], lvl, itemWidth(it));
        room.walls[keys[0]][lvl].push(it);
      }
    }
    delete room.walls[k];
  }
  return room;
}

export function newRoom() {
  return {
    name: 'Kitchen',
    shape: 'rect',
    notchW: 1600, notchD: 1400,
    w: 4200, d: 3600, h: 2700,
    upperBottom: 1500,          // height off the floor to the underside of wall cabinets
    walls: {
      A: { base: [], upper: [] },
      B: { base: [], upper: [] },
      C: { base: [], upper: [] },
      D: { base: [], upper: [] },
    },
    bt: { material: 'bt-lam', edge: 'postform', sink: true, cooktop: true, tap: true },
    /* defaults every cabinet dropped into the room inherits */
    style: {
      material: 'mel-white', finish: 'thermo', edge: 'abs04',
      hinge: 'sc', runner: 'under', handle: 'bar', back: 'inset16',
      kick: 150, assembled: false, drawerBoxes: true,
    },
  };
}

export const wallLength = (room, k) => {
  const s = wallSegment(room, k);
  return s ? s.len : room.w;
};

/* ---- items -------------------------------------------------------- */

export function makeCabinet(room, pid, over = {}) {
  const p = productById(pid);
  return {
    uid: uid(), type: 'cab', pid,
    cfg: {
      ...p.def, ...room.style,
      includeKick: p.cat === 'base' || p.cat === 'tall',
      kickMatchesFront: false, panelAsFront: false, qty: 1,
      ...over,
    },
  };
}

export function makeAppliance(key) {
  const a = APPLIANCES[key];
  return { uid: uid(), type: 'appl', ak: key, w: a.w };
}

export function makeFiller(room, w) {
  return {
    uid: uid(), type: 'filler', w,
    cfg: { ...room.style, w, h: 720, d: 16, shelves: 0, drawers: 0, kick: 0, qty: 1, includeKick: false },
  };
}

export const itemWidth = (it) =>
  it.type === 'cab' ? it.cfg.w : it.w;

/* Overall height of the box as it stands in the room — a base cabinet
   includes its kickboard, because that is what sits on the floor. */
export function itemHeight(it) {
  if (it.type === 'appl') return APPLIANCES[it.ak].h;
  const c = it.cfg || {};
  return (c.h || 720) + (c.includeKick ? (c.kick || 0) : 0);
}

export const runWidth = (items) =>
  items.reduce((a, it) => a + itemWidth(it), 0);

export const remaining = (room, k, level) =>
  wallLength(room, k) - runWidth(room.walls[k][level]);

/* How close two edges have to be before they snap together (mm). */
export const SNAP = 55;

/* Every item carries its own offset along the wall, so cabinets can sit
   anywhere with real gaps between them. Sorted by position, not by the
   order they happen to sit in the array. */
export function layout(room, k, level) {
  return room.walls[k][level]
    .map((it) => ({ it, x: it.x || 0, y: it.y || 0, w: itemWidth(it), h: itemHeight(it) }))
    .sort((a, b) => a.x - b.x || a.y - b.y);
}

/* The height a run's items sit at by default. */
export const levelFloor = (room, level) => (level === 'upper' ? room.upperBottom : 0);

/* Older saved rooms stored no positions — lay them out end to end once. */
export function normaliseRoom(room) {
  if (!room || !room.walls) return room;
  if (!room.shape) room.shape = 'rect';
  ensureWalls(room);
  for (const { k } of roomWalls(room)) {
    for (const level of ['base', 'upper']) {
      let x = 0;
      for (const it of room.walls[k][level]) {
        if (typeof it.x !== 'number') it.x = x;
        if (typeof it.y !== 'number') it.y = levelFloor(room, level);
        x = it.x + itemWidth(it);
      }
    }
  }
  return room;
}

/* ------------------------------------------------------------------
   Free placement with magnetic edges.

   `desired` is where the drag wants the item's left edge. We snap to
   any nearby edge, then make sure the result doesn't sit on top of a
   neighbour — resolving to whichever side the item is already closer
   to, so you can still drag one cabinet past another.
   ------------------------------------------------------------------ */
/* ------------------------------------------------------------------
   Vertical placement — the stacking idea borrowed from EKET.

   A cabinet snaps to the floor, to the standard wall-cabinet height, or
   flush on top of / underneath any neighbour on the same wall. Once the
   height is settled, horizontal placement only has to avoid the items
   that actually share that height band.
   ------------------------------------------------------------------ */
export function resolveHeight(room, k, level, uid, desiredY) {
  const me = findItem(room, uid);
  if (!me) return desiredY;
  const h = itemHeight(me.it);
  if (!Number.isFinite(desiredY)) return Math.round(me.it.y || 0);

  const others = [...room.walls[k].base, ...room.walls[k].upper]
    .filter((it) => it.uid !== uid)
    .map((it) => ({ y: it.y || 0, h: itemHeight(it) }));

  const cands = [0, levelFloor(room, 'upper')];
  for (const o of others) cands.push(o.y + o.h, o.y - h, o.y);

  let best = null, bestD = SNAP;
  for (const c of cands) {
    if (c < -1 || c + h > room.h + 1) continue;
    const d = Math.abs(c - desiredY);
    if (d < bestD) { bestD = d; best = c; }
  }
  const y = best !== null ? best : desiredY;
  return Math.round(Math.max(0, Math.min(room.h - h, y)));
}

export function resolvePosition(room, k, level, uid, desired, atY) {
  const L = wallLength(room, k);
  const me = findItem(room, uid);
  if (!me) return desired;
  /* a detached SVG or a lost pointer can hand us NaN — never let that
     reach the model, where `x || 0` would silently read as zero */
  if (!Number.isFinite(desired)) return Math.round(me.it.x || 0);
  const w = itemWidth(me.it);
  const myY = Number.isFinite(atY) ? atY : (me.it.y || 0);
  const myH = itemHeight(me.it);
  /* only things sharing our height band can get in our way */
  const overlapsY = (o) => myY < o.y + o.h - 1 && myY + myH > o.y + 1;

  const others = room.walls[k][level].filter((it) => it.uid !== uid)
    .map((it) => ({ x: it.x || 0, w: itemWidth(it), y: it.y || 0, h: itemHeight(it) }))
    .filter(overlapsY)
    .sort((a, b) => a.x - b.x);
  const cross = room.walls[k][level === 'base' ? 'upper' : 'base']
    .map((it) => ({ x: it.x || 0, w: itemWidth(it) }));

  /* Ranges of left-edge positions where the item fits without touching
     a neighbour. Working from free space (rather than pushing out of
     collisions) means we can never settle on an overlap. */
  const ranges = [];
  let cursor = 0;
  for (const o of others) {
    if (o.x - cursor >= w) ranges.push([cursor, o.x - w]);
    cursor = Math.max(cursor, o.x + o.w);
  }
  if (L - cursor >= w) ranges.push([cursor, L - w]);

  /* nowhere on this wall is wide enough — leave it where it was */
  if (!ranges.length) return Math.round(me.it.x || 0);

  const clampToRanges = (v) => {
    let best = null, bestD = Infinity;
    for (const [lo, hi] of ranges) {
      const c = Math.max(lo, Math.min(hi, v));
      const d = Math.abs(c - v);
      if (d < bestD) { bestD = d; best = c; }
    }
    return best;
  };
  const inRange = (v) => ranges.some(([lo, hi]) => v >= lo - 0.5 && v <= hi + 0.5);

  /* --- magnetic edges: wall ends, neighbours, and alignment with the
     cabinets on the other level --- */
  const cands = [0, L - w];
  for (const o of others) cands.push(o.x + o.w, o.x - w);
  for (const o of cross) cands.push(o.x, o.x + o.w - w, o.x + o.w / 2 - w / 2);

  let snapped = null, bestD = SNAP;
  for (const c of cands) {
    const d = Math.abs(c - desired);
    if (d < bestD && inRange(c)) { bestD = d; snapped = c; }
  }

  return Math.round(snapped !== null ? snapped : clampToRanges(desired));
}

/* Where a new item should land: just past the rightmost thing on the run. */
function nextFreeX(room, k, level, w) {
  const run = layout(room, k, level);
  if (!run.length) return 0;
  const last = run[run.length - 1];
  const x = last.x + last.w;
  return Math.max(0, Math.min(wallLength(room, k) - w, x));
}

/* ---- run editing --------------------------------------------------- */

export function addItem(room, k, level, item) {
  if (typeof item.y !== 'number') item.y = levelFloor(room, level);
  if (typeof item.x !== 'number') item.x = nextFreeX(room, k, level, itemWidth(item));
  room.walls[k][level].push(item);
  return item;
}

/* Items standing on the run's own floor — the ones a gap is measured
   between. A cabinet stacked on top of another does not leave a gap. */
const groundRow = (room, k, level) =>
  layout(room, k, level).filter((o) => Math.abs(o.y - levelFloor(room, level)) < 2);

/* Every clear span on a run, including the ends. */
export function gaps(room, k, level) {
  const L = wallLength(room, k);
  const out = [];
  let cursor = 0;
  for (const o of groundRow(room, k, level)) {
    if (o.x - cursor > 1) out.push({ x: cursor, w: o.x - cursor });
    cursor = Math.max(cursor, o.x + o.w);
  }
  if (L - cursor > 1) out.push({ x: cursor, w: L - cursor });
  return out;
}

/* Anything hanging off the end of the wall. */
export function overhang(room, k, level) {
  const L = wallLength(room, k);
  const run = layout(room, k, level);
  if (!run.length) return 0;
  const end = Math.max(...run.map((o) => o.x + o.w));
  return Math.max(0, end - L);
}

/* Overall size of everything on a wall — EKET shows the combination's
   total, not just each module's. */
export function wallExtents(room, k) {
  const all = [...layout(room, k, 'base'), ...layout(room, k, 'upper')];
  if (!all.length) return null;
  const x0 = Math.min(...all.map((o) => o.x));
  const x1 = Math.max(...all.map((o) => o.x + o.w));
  const y1 = Math.max(...all.map((o) => o.y + o.h));
  return { w: Math.round(x1 - x0), h: Math.round(y1), x: Math.round(x0) };
}
export function removeItem(room, id) {
  for (const k of Object.keys(room.walls)) {
    for (const lvl of ['base', 'upper']) {
      const i = room.walls[k][lvl].findIndex((x) => x.uid === id);
      if (i >= 0) { room.walls[k][lvl].splice(i, 1); return true; }
    }
  }
  return false;
}
/* Swap an item with its neighbour, keeping the pair's overall span put. */
export function moveItem(room, id, dir) {
  const f = findItem(room, id);
  if (!f) return false;
  const run = layout(room, f.k, f.level);
  const i = run.findIndex((o) => o.it.uid === id);
  const j = i + dir;
  if (j < 0 || j >= run.length) return false;
  const a = run[i], b = run[j];
  if (dir > 0) { a.it.x = b.x + b.w - a.w; b.it.x = a.x; }
  else { a.it.x = b.x; b.it.x = a.x + a.w - b.w; }
  return true;
}
/* Put an item at an explicit spot on its wall — height first, then the
   horizontal position that height allows. Both drag handlers commit here. */
export function placeItem(room, id, desiredX, desiredY) {
  const f = findItem(room, id);
  if (!f) return false;
  if (desiredY !== undefined) f.it.y = resolveHeight(room, f.k, f.level, id, desiredY);
  f.it.x = resolvePosition(room, f.k, f.level, id, desiredX, f.it.y);
  return true;
}

/* send a cabinet to a different wall, keeping its level */
export function moveToWall(room, id, k, desiredX, desiredY) {
  const f = findItem(room, id);
  if (!f || f.k === k) return false;
  const run = room.walls[f.k][f.level];
  run.splice(run.indexOf(f.it), 1);
  room.walls[k][f.level].push(f.it);
  if (typeof desiredY === 'number') f.it.y = resolveHeight(room, k, f.level, id, desiredY);
  f.it.x = typeof desiredX === 'number'
    ? resolvePosition(room, k, f.level, id, desiredX, f.it.y)
    : nextFreeX(room, k, f.level, itemWidth(f.it));
  return true;
}

export function findItem(room, id) {
  for (const k of Object.keys(room.walls)) {
    for (const lvl of ['base', 'upper']) {
      const it = room.walls[k][lvl].find((x) => x.uid === id);
      if (it) return { it, k, level: lvl };
    }
  }
  return null;
}

/* Fill every clear span on a run with a filler panel. Real kitchens
   almost never come out to a round number, so this is the single most
   used button in the planner. */
export function fillGap(room, k, level) {
  const found = gaps(room, k, level).filter((g) => g.w >= 10);
  const made = [];
  for (const g of found) {
    const f = makeFiller(room, Math.round(g.w));
    f.x = Math.round(g.x);
    if (level === 'upper') f.cfg.h = 720;
    room.walls[k][level].push(f);
    made.push(f);
  }
  return made;
}

/* ---- everything the room contributes to the job -------------------- */

export function roomCabinets(room) {
  const out = [];
  for (const { k } of roomWalls(room)) {
    for (const level of ['base', 'upper']) {
      for (const it of room.walls[k][level]) {
        if (it.type === 'cab') out.push({ uid: it.uid, pid: it.pid, cfg: it.cfg, where: `${k} · ${level}` });
        else if (it.type === 'filler') out.push({ uid: it.uid, pid: 'panel-end', cfg: it.cfg, where: `${k} · filler` });
      }
    }
  }
  return out;
}

/* ---- benchtops ----------------------------------------------------- */
/* One benchtop per wall that carries base cabinets, spanning from the
   first to the last of them, at the deepest carcass on that run. */
export function benchtopRuns(room) {
  const runs = [];
  for (const { k, name } of roomWalls(room)) {
    const items = layout(room, k, 'base').filter((o) => o.it.type !== 'appl' || !APPLIANCES[o.it.ak].tall);
    if (!items.length) continue;
    /* only cabinets actually standing on the floor carry a benchtop */
    const onFloor = layout(room, k, 'base').filter((o) => (o.y || 0) < 2);
    const hasCab = onFloor.some((o) => o.it.type === 'cab' && productById(o.it.pid).cat === 'base');
    if (!hasCab) continue;

    const all = onFloor;
    const first = all[0];
    const last = all[all.length - 1];
    const length = (last.x + last.w) - first.x;

    const depths = room.walls[k].base
      .filter((it) => it.type === 'cab')
      .map((it) => it.cfg.d);
    const depth = Math.max(560, ...depths) + BT_OVERHANG + BT_SCRIBE;

    runs.push({ wall: k, wallName: name, x: first.x, length: Math.round(length), depth: Math.round(depth) });
  }
  return runs;
}

export function priceBenchtops(room) {
  const runs = benchtopRuns(room);
  const mat = BENCHTOPS[room.bt.material];
  const edge = BT_EDGES[room.bt.edge];
  const lines = [];
  let area = 0, edgeLm = 0;

  for (const r of runs) {
    const a = (r.length * r.depth) / 1e6;
    area += a;
    edgeLm += r.length / 1000;              // front edge only
    lines.push({
      group: 'Benchtop', label: `${r.wallName} · ${r.length} × ${r.depth}`,
      detail: `${a.toFixed(2)} m² @ $${mat.rate}/m²`, amount: a * mat.rate,
    });
  }
  if (edgeLm > 0 && edge.rate > 0) {
    lines.push({
      group: 'Benchtop', label: edge.name,
      detail: `${edgeLm.toFixed(1)} lm @ $${edge.rate}/m`, amount: edgeLm * edge.rate,
    });
  }
  if (runs.length) {
    for (const key of ['sink', 'cooktop', 'tap']) {
      if (room.bt[key]) {
        const c = BT_CUTOUTS[key];
        lines.push({ group: 'Benchtop', label: c.name, detail: '1 off', amount: c.rate });
      }
    }
    if (runs.length > 1) {
      lines.push({
        group: 'Benchtop', label: 'Join', detail: `${runs.length - 1} × masonry join`,
        amount: (runs.length - 1) * 65,
      });
    }
  }

  const total = lines.reduce((a, l) => a + l.amount, 0);
  return {
    runs, lines: lines.map((l) => ({ ...l, amount: Math.round(l.amount * 100) / 100 })),
    total: Math.round(total * 100) / 100,
    area: Math.round(area * 100) / 100,
    leadDays: runs.length ? mat.lead : 0,
  };
}

/* ---- a starter kitchen so the planner is never an empty box -------- */
export function demoRoom() {
  const r = newRoom();
  const add = (k, lvl, pid, over) => addItem(r, k, lvl, makeCabinet(r, pid, over));

  /* back wall: sink run */
  add('A', 'base', 'base-3drw', { w: 600 });
  add('A', 'base', 'base-sink', { w: 900 });
  addItem(r, 'A', 'base', makeAppliance('dw'));
  add('A', 'base', 'base-2d', { w: 800 });
  add('A', 'base', 'base-3drw', { w: 600 });
  fillGap(r, 'A', 'base');

  add('A', 'upper', 'wall-2d', { w: 900 });
  addItem(r, 'A', 'upper', makeAppliance('rangehood'));
  add('A', 'upper', 'wall-2d', { w: 900 });
  add('A', 'upper', 'wall-1d', { w: 450 });

  /* left wall: tall bank */
  add('D', 'base', 'tall-pantry', { w: 900 });
  add('D', 'base', 'tall-oven', { w: 600 });
  addItem(r, 'D', 'base', makeAppliance('fridge'));

  return r;
}

export { APPLIANCES, BENCHTOPS, BT_EDGES, BT_CUTOUTS };
