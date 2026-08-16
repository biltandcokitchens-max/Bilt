/* ------------------------------------------------------------------
   Bilt Studio — cut-to-size cabinetry shop
   data.js  ·  materials, hardware, rates and the product catalogue

   Every number in this file is a business input, not a magic constant.
   In production these come from the admin dashboard / ERP. They are
   deliberately grouped so a supplier can re-price the whole shop by
   editing one file.
   ------------------------------------------------------------------ */

/* Sizes, gaps and rates below are taken from Flatpax Cut To Size's own
   configuration, read from their Cabinetry.Online account on
   9 Aug 2026 (room 788856 / 788843). Where a figure came from them it is
   marked FLATPAX. */
export const SETTINGS = {
  thickness: 16.5,        // FLATPAX board thickness (mm)
  sheet: { l: 3600, w: 1800 },
  kerf: 4.4,              // saw blade / router bit width (mm)
  trim: 10,               // edge trim off each sheet (mm)
  gap: 2,                 // FLATPAX door gap (mm)
  drawerGap: 3,           // FLATPAX drawer gap (mm)
  shelfSetback: 2,        // FLATPAX shelf set back from front (mm)
  shelfClearance: 2,      // total side clearance on shelves (mm)
  tradeDiscount: 0.22,    // 22% off list for trade accounts
  gst: 0.10,
  deliveryMetro: 95,
  freeDeliveryOver: 2500,
};

/* ------------------------------------------------------------------
   Colours

   The palette is matched to IKEA's METOD kitchen range, which is what
   most customers have already seen and can picture. The names are our
   own — the colours are the point, the trademarks are not ours to use.

   `rough` drives the 3D shading: 0.15 reads as high-gloss, 0.9 as a
   dead-matt lacquer. `grain` adds a timber texture.
   ------------------------------------------------------------------ */

/* ---------- carcass board ---------- */
export const MATERIALS = {
  'mel-white':   { name: 'White',                   sub: '16mm HMR · the standard frame', rate: 30.43, swatch: '#F3F2EF', grain: false, rough: 0.78 },
  'mel-stone':   { name: 'Light Grey',              sub: '16mm HMR',                      rate: 34.50, swatch: '#CFCFCA', grain: false, rough: 0.78 },
  'mel-oak':     { name: 'Light Ash Effect',        sub: '16mm · woodgrain',              rate: 113.53, swatch: '#D9C6A5', grain: true,  rough: 0.74 },
  'mel-walnut':  { name: 'Black-Brown Wood Effect', sub: '16mm · woodgrain',              rate: 113.53, swatch: '#3A2F28', grain: true,  rough: 0.74 },
  'mdf-mr':      { name: 'MR MDF (paintable)',      sub: '16mm · for painted work',       rate: 58,  swatch: '#D8C9A9', grain: false, rough: 0.9  },
  'ply-mar':     { name: 'Marine Ply',              sub: '16mm · outdoor / wet area',     rate: 118, swatch: '#E2CBA4', grain: true,  rough: 0.8  },
  'compact':     { name: 'Compact Laminate',        sub: '12mm · commercial / wet',       rate: 210, swatch: '#33363A', grain: false, rough: 0.5  },
};

/* ---------- door & drawer front finishes ---------- */
export const FINISHES = {
  'match':       { name: 'Matching Melamine',  sub: 'Cheapest · same board as the frame', rate: 79.75, swatch: '#F3F2EF', lead: 5,  grain: false, rough: 0.78 },
  'thermo':      { name: 'Matt White',         sub: 'Wrapped MDF · soft matt',            rate: 117.13, swatch: '#F2F1EE', lead: 12, grain: false, rough: 0.88 },
  'gloss':       { name: 'High-Gloss White',   sub: 'Mirror finish · wipes clean',        rate: 132.00, swatch: '#FAFAF8', lead: 14, grain: false, rough: 0.14 },
  'beige':       { name: 'Warm Beige',         sub: 'Soft matt · warm neutral',           rate: 122.00, swatch: '#D6C8B0', lead: 14, grain: false, rough: 0.86 },
  '2pac':        { name: 'Off-White',          sub: '2Pac painted · classic',             rate: 205.00, swatch: '#EDE7DC', lead: 20, grain: false, rough: 0.84 },
  'shaker':      { name: 'Shaker Grey',        sub: 'Routed rail & stile',                rate: 262.00, swatch: '#B6B5AA', lead: 22, grain: false, rough: 0.84 },
  'greygreen':   { name: 'Grey-Green',         sub: 'Matt · muted sage',                  rate: 224.00, swatch: '#7C8878', lead: 20, grain: false, rough: 0.86 },
  'blackblue':   { name: 'Black-Blue',         sub: 'Deep matt · dramatic',               rate: 224.00, swatch: '#2C3440', lead: 20, grain: false, rough: 0.88 },
  'matte':       { name: 'Matt Anthracite',    sub: 'Fingerprint resistant',              rate: 148.00, swatch: '#43474A', lead: 12, grain: false, rough: 0.9  },
  'ash':         { name: 'Light Ash Effect',   sub: 'Woodgrain · pale timber',            rate: 117.13, swatch: '#D9C6A5', lead: 18, grain: true,  rough: 0.74 },
  'veneer':      { name: 'Walnut Effect',      sub: 'Woodgrain · warm brown',             rate: 178.00, swatch: '#6E4B33', lead: 25, grain: true,  rough: 0.7  },
};

/* ---------- edge banding ---------- */
export const EDGES = {
  'abs04': { name: '0.4mm ABS', sub: 'Standard match', rate: 1.20 },
  'abs1':  { name: '1mm ABS',   sub: 'Hard wearing',   rate: 2.10 },
  'abs2':  { name: '2mm ABS',   sub: 'Commercial',     rate: 3.40 },
};

/* ---------- hardware ---------- */
export const HARDWARE = {
  hinge: {
    'std':   { name: 'Standard hinge',            rate: 2.40 },
    'sc':    { name: 'Soft-close hinge',          rate: 4.80 },
    'blum':  { name: 'Blum CLIP top BLUMOTION',   rate: 11.50 },
  },
  runner: {
    'side':  { name: 'Side-mount soft close',     rate: 14.00, boxClear: 13 },
    'under': { name: 'Undermount soft close',     rate: 32.00, boxClear: 21 },
    'blum':  { name: 'Blum TANDEMBOX antaro',     rate: 78.00, boxClear: 0, boxIncluded: true },
  },
  handle: {
    'none':  { name: 'No handle (push / J-pull)', rate: 0 },
    'bar':   { name: 'Bar pull 160mm · black',    rate: 12.00 },
    'knurl': { name: 'Knurled pull · brass',      rate: 28.00 },
    'edge':  { name: 'Edge profile · aluminium',  rate: 19.00 },
  },
};

/* ---------- machining & labour ---------- */
export const RATES = {
  cutPerPart:    2.21,   // FLATPAX handling, per part
  edgePerPart:   1.11,   // FLATPAX carcass edge handling, per banded part
  edgeApplyCarc: 1.52,   // FLATPAX carcass edge application
  edgeApplyExt:  1.34,   // FLATPAX exterior edge application
  edgeLmCarc:    0.90,   // FLATPAX carcass edging, $/lm
  edgeLmExt:     2.12,   // FLATPAX exterior edging, $/lm
  drillPerHole:  0.20,   // FLATPAX drilling
  /* Doors and drawer fronts are manufactured items, not just board: cut,
     edged all round, pressed and bored. Flatpax's ext_area_cost is the
     raw board only, so this conversion charge sits on top. Derived by
     least squares from six of their real priced cabinets (9 Aug 2026),
     with hinges, pins and legs counted separately. Door-bearing cabinets
     then land within ~3% of Flatpax; door-less open units run ~9% high. */
  frontMakeM2:   143.18,
  asmCarcM2:     3.84,   // FLATPAX assembly, carcass $/m2
  asmExtM2:      4.32,   // FLATPAX assembly, exterior $/m2
  hingeBore:     2.20,   // per hinge cup + plate holes
  shelfHoleSet:  1.10,   // per side panel drilled for shelf pins
  runnerHoleSet: 1.80,   // per side panel drilled for runners
  handleDrill:   1.50,   // per front
  assemble: { base: 28, wall: 22, tall: 45, panel: 0 },
  shelfPin:      0.35,
  legSet:        9.60,   // 4 adjustable legs + clips
};

/* ------------------------------------------------------------------
   Product catalogue
   cat      · base | wall | tall | panel
   build    · which carcass generator to use
   front    · door | drawer | mixed | none
   ------------------------------------------------------------------ */
export const PRODUCTS = [
  {
    id: 'base-1d', cat: 'base', name: 'Base — 1 Door',
    blurb: 'Single door base cabinet with adjustable shelf.',
    front: 'door', doors: 1,
    def: { w: 450, h: 720, d: 560, shelves: 1, drawers: 0, kick: 150 },
    lim: { w: [150, 600], h: [400, 900], d: [300, 700] },
  },
  {
    id: 'base-2d', cat: 'base', name: 'Base — 2 Door',
    blurb: 'Twin door base, the workhorse of any kitchen run.',
    front: 'door', doors: 2,
    def: { w: 900, h: 720, d: 560, shelves: 1, drawers: 0, kick: 150 },
    lim: { w: [500, 1200], h: [400, 900], d: [300, 700] },
  },
  {
    id: 'base-3drw', cat: 'base', name: 'Base — 3 Drawer',
    blurb: 'Pot drawer bank. Equal or graduated front heights.',
    front: 'drawer', doors: 0,
    def: { w: 600, h: 720, d: 560, shelves: 0, drawers: 3, kick: 150 },
    lim: { w: [300, 1200], h: [400, 900], d: [300, 700] },
  },
  {
    id: 'base-4drw', cat: 'base', name: 'Base — 4 Drawer',
    blurb: 'Cutlery drawer over three pot drawers.',
    front: 'drawer', doors: 0,
    def: { w: 600, h: 720, d: 560, shelves: 0, drawers: 4, kick: 150 },
    lim: { w: [300, 1200], h: [400, 900], d: [300, 700] },
  },
  {
    id: 'base-1d1drw', cat: 'base', name: 'Base — Drawer over Door',
    blurb: 'Top drawer with a door below. Great for utensils.',
    front: 'mixed', doors: 1,
    def: { w: 450, h: 720, d: 560, shelves: 1, drawers: 1, kick: 150 },
    lim: { w: [150, 600], h: [400, 900], d: [300, 700] },
  },
  {
    id: 'base-sink', cat: 'base', name: 'Sink Base — 2 Door',
    blurb: 'No shelf, rear rails only, ready for plumbing.',
    front: 'door', doors: 2, noShelf: true,
    def: { w: 900, h: 720, d: 560, shelves: 0, drawers: 0, kick: 150 },
    lim: { w: [600, 1200], h: [400, 900], d: [300, 700] },
  },
  {
    id: 'base-corner', cat: 'base', name: 'Blind Corner Base',
    blurb: 'Returns into the corner with a blind panel.',
    front: 'door', doors: 1, blind: 300,
    def: { w: 1050, h: 720, d: 560, shelves: 1, drawers: 0, kick: 150 },
    lim: { w: [800, 1400], h: [400, 900], d: [300, 700] },
  },
  {
    id: 'base-open', cat: 'base', name: 'Open Base / Shelving',
    blurb: 'No fronts. Wine rack, bin unit or display.',
    front: 'none', doors: 0,
    def: { w: 600, h: 720, d: 560, shelves: 2, drawers: 0, kick: 150 },
    lim: { w: [150, 1200], h: [300, 900], d: [200, 700] },
  },
  {
    id: 'wall-1d', cat: 'wall', name: 'Wall — 1 Door',
    blurb: 'Single door overhead with adjustable shelves.',
    front: 'door', doors: 1,
    def: { w: 450, h: 750, d: 300, shelves: 1, drawers: 0, kick: 0 },
    lim: { w: [150, 600], h: [300, 1200], d: [150, 450] },
  },
  {
    id: 'wall-2d', cat: 'wall', name: 'Wall — 2 Door',
    blurb: 'Twin door overhead cabinet.',
    front: 'door', doors: 2,
    def: { w: 900, h: 750, d: 300, shelves: 1, drawers: 0, kick: 0 },
    lim: { w: [500, 1200], h: [300, 1200], d: [150, 450] },
  },
  {
    id: 'wall-lift', cat: 'wall', name: 'Wall — Lift Up',
    blurb: 'Single horizontal front on a lift-up mechanism.',
    front: 'door', doors: 1, lift: true,
    def: { w: 900, h: 450, d: 300, shelves: 1, drawers: 0, kick: 0 },
    lim: { w: [400, 1200], h: [300, 700], d: [150, 450] },
  },
  {
    id: 'wall-open', cat: 'wall', name: 'Wall — Open Shelf',
    blurb: 'Frameless open box. Fixed or adjustable shelves.',
    front: 'none', doors: 0,
    def: { w: 600, h: 750, d: 300, shelves: 2, drawers: 0, kick: 0 },
    lim: { w: [150, 1200], h: [200, 1200], d: [150, 450] },
  },
  {
    id: 'tall-pantry', cat: 'tall', name: 'Tall — Pantry',
    blurb: 'Full height pantry, four adjustable shelves.',
    front: 'door', doors: 2,
    def: { w: 900, h: 2100, d: 580, shelves: 4, drawers: 0, kick: 150 },
    lim: { w: [400, 1200], h: [1500, 2400], d: [300, 700] },
  },
  {
    id: 'tall-oven', cat: 'tall', name: 'Tall — Oven Tower',
    blurb: 'Cut-out for a 600mm oven with drawers below.',
    front: 'mixed', doors: 1, oven: true,
    def: { w: 600, h: 2100, d: 580, shelves: 1, drawers: 2, kick: 150 },
    lim: { w: [560, 900], h: [1800, 2400], d: [500, 700] },
  },
  {
    id: 'panel-end', cat: 'panel', name: 'End / Return Panel',
    blurb: 'Finished panel to close off the end of a run.',
    front: 'none', doors: 0, flat: true,
    def: { w: 600, h: 750, d: 16, shelves: 0, drawers: 0, kick: 0 },
    lim: { w: [100, 2400], h: [100, 1800], d: [16, 16] },
  },
  {
    id: 'panel-kick', cat: 'panel', name: 'Kickboard',
    blurb: 'Cut to length, edged on the top edge.',
    front: 'none', doors: 0, flat: true,
    def: { w: 2400, h: 150, d: 16, shelves: 0, drawers: 0, kick: 0 },
    lim: { w: [100, 3400], h: [80, 300], d: [16, 16] },
  },
  {
    id: 'panel-shelf', cat: 'panel', name: 'Loose Shelf',
    blurb: 'Any size shelf, edged on one long edge.',
    front: 'none', doors: 0, flat: true,
    def: { w: 800, h: 300, d: 16, shelves: 0, drawers: 0, kick: 0 },
    lim: { w: [100, 3400], h: [80, 900], d: [16, 16] },
  },
];

/* ------------------------------------------------------------------
   Appliance & void spaces — they consume run width but aren't cabinets
   ------------------------------------------------------------------ */
export const APPLIANCES = {
  'dw':      { name: 'Dishwasher',        w: 600,  h: 720,  d: 600, level: 'base', colour: '#8A9199' },
  'cooker':  { name: 'Freestanding cooker', w: 600, h: 900, d: 600, level: 'base', colour: '#4A4F55', tall: true },
  'fridge':  { name: 'Fridge space',      w: 900,  h: 1800, d: 700, level: 'base', colour: '#9AA2AA', tall: true },
  'void':    { name: 'Open space',        w: 600,  h: 720,  d: 560, level: 'base', colour: 'transparent', empty: true },
  'rangehood': { name: 'Rangehood',       w: 900,  h: 400,  d: 500, level: 'upper', colour: '#8A9199' },
};

/* ------------------------------------------------------------------
   Benchtops — priced by area with a per-metre edge charge
   ------------------------------------------------------------------ */
export const BENCHTOPS = {
  'bt-lam':    { name: 'Laminate (postform)', sub: '33mm · budget',        rate: 180, swatch: '#D9D4CA', thick: 33, lead: 7  },
  'bt-lam-sq': { name: 'Laminate (square)',   sub: '20mm · square edge',   rate: 235, swatch: '#CFC9BE', thick: 20, lead: 10 },
  'bt-timber': { name: 'Solid timber',        sub: '32mm · oiled oak',     rate: 420, swatch: '#B98F5E', thick: 32, lead: 15 },
  'bt-compact':{ name: 'Compact laminate',    sub: '12mm · ultra slim',    rate: 520, swatch: '#33363A', thick: 12, lead: 18 },
  'bt-stone':  { name: 'Engineered stone',    sub: '20mm · mitred 40mm',   rate: 650, swatch: '#E8E6E1', thick: 20, lead: 21 },
};

export const BT_EDGES = {
  'postform': { name: 'Postformed roll',  rate: 0    },
  'square':   { name: 'Square ABS edge',  rate: 22   },
  'mitre40':  { name: 'Mitred 40mm',      rate: 145  },
};

export const BT_CUTOUTS = {
  sink:    { name: 'Undermount sink cut-out', rate: 95 },
  cooktop: { name: 'Cooktop cut-out',         rate: 85 },
  tap:     { name: 'Tap hole',                rate: 25 },
};

export const BT_OVERHANG = 20;   // front overhang past the carcass (mm)
export const BT_SCRIBE = 10;     // extra depth for scribing to the wall (mm)

export const CATEGORIES = [
  { id: 'all',   name: 'Everything' },
  { id: 'base',  name: 'Base cabinets' },
  { id: 'wall',  name: 'Wall cabinets' },
  { id: 'tall',  name: 'Tall cabinets' },
  { id: 'panel', name: 'Panels & shelves' },
];

export const productById = (id) => PRODUCTS.find((p) => p.id === id);
