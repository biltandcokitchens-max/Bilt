/* The rate card. One source of truth.
 *
 * These are the same numbers the estimator in assets/js/main.js uses. Every
 * table and worked example on the cost pages is generated from here, so a
 * rate change updates every page at once and nothing can go stale in one
 * place while staying current in another.
 *
 * _build.js asserts that main.js still matches this file. If that assertion
 * fires, the two have drifted and the build stops rather than publishing two
 * different prices for the same thing.
 *
 * Figures are supply of cabinetry, delivered. They exclude freight (quoted to
 * the postcode), installation outside Central Queensland, appliances, and
 * plumbing and electrical work.
 */
const RATES = {
  // Per linear metre of run, [low, high]
  tiers: {
    essence: { name: 'Essence', lo: 1970, hi: 2850,
      blurb: 'Soft-matte doors, 18mm moisture-resistant carcasses, soft-close hinges and full-extension runners, laminate benchtop.' },
    maison: { name: 'Maison', lo: 3070, hi: 5040,
      blurb: 'Deeper door range, stone benchtop, integrated appliance provision, full-height joinery where the room allows.' },
    atelier: { name: 'Atelier', lo: 6150, hi: 8700,
      blurb: 'Bespoke detailing, specialist finishes, mitred stone, motorised and specialty hardware.' },
  },
  // Benchtop upgrade over the laminate included in the tier rate
  bench: {
    laminate: { name: 'Laminate', add: 0, life: 'Good', care: 'Wipe clean; avoid standing heat and water at the joins' },
    stone: { name: 'Engineered stone', add: 1750, life: 'Very good', care: 'Sealed; avoid abrasives and sustained heat' },
    porcelain: { name: 'Porcelain', add: 3000, life: 'Excellent', care: 'Near-inert; heat and scratch resistant' },
    natural: { name: 'Natural stone', add: 4750, life: 'Excellent', care: 'Needs periodic resealing; marks from acids' },
  },
  // Flat additions
  extras: {
    pantry: { name: "Butler's pantry", cost: 4000 },
    island: { name: 'Island', cost: 2850 },
    appliances: { name: 'Appliance provision pack', cost: 3700 },
    wine: { name: 'Wine storage', cost: 2350 },
  },
  // The cheapest thing we sell. Nothing quotes below it.
  floor: 4500,
  // Benchtop upgrades scale on the high side of a range by this factor,
  // matching the estimator.
  benchHiFactor: 1.35,
  extraHiFactor: 1.4,
  // Common run lengths used in the worked tables, in metres.
  runs: [2.4, 3.0, 3.6, 4.2, 4.8, 6.0],
  reviewed: 'October 2026',
};

module.exports = RATES;
