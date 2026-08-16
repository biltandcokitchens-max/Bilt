# Bilt Studio

Cut-to-size cabinetry. Marketing site and the room planner, deployed as one static site.

```
/                 landing page
/roomplanner/     the planner, catalogue, job and quote
/assets/          images, video, self-hosted woff2
```

No build step, no dependencies, no framework. Plain HTML, CSS and ES modules.

---

## Deploy

Point Netlify or Vercel at this repository. Publish directory is the repo root, build
command is empty.

`netlify.toml` and `vercel.json` are both committed — each host reads its own and ignores
the other, so the same repo deploys to either without changes.

`_headers` caches `/assets/*` and the vendored three.js for a year, and forces the app's
own CSS and JS to revalidate so a deploy takes effect immediately.

### Domain

The landing page's calls-to-action point at `/roomplanner/#/plan` — same origin, not a
subdomain. That is deliberate: a subdomain is treated as a separate site for ranking, and
a free public planner is worth a lot of search traffic. Keep them on one domain.

---

## The room planner

`/roomplanner/` is a working cut-to-size shop:

- **17 parametric products** — any size inside its limits, rather than a fixed SKU list
- **Live pricing** — recalculates on every keystroke, with a line-by-line breakdown of
  board area, edging metres, machining operations and hardware
- **3D room planner** — rectangular or L-shaped rooms, drag to place, magnetic snapping,
  vertical stacking, per-cabinet finishes
- **Cut list** — full panel schedule with edging codes, downloadable as CSV *before* payment
- **Sheet nesting** — how many sheets the job actually burns, and the offcut
- **Printable quote** — trade ex-GST with discount applied, or homeowner inc-GST

### Layout

```
roomplanner/
  index.html
  css/app.css
  js/
    data.js       rate card: materials, finishes, hardware, labour, catalogue
    cutlist.js    parametric panel generation
    pricing.js    cost build-up
    room.js       room outline, placement, snapping, benchtops
    planview.js   2D elevation and plan
    three-view.js 3D scene
    draw.js       SVG elevations and thumbnails
    nest.js       sheet optimisation
    app.js        state, routing, rendering
  vendor/
    three.module.js   three.js r160, MIT, vendored deliberately
```

Three.js is **vendored, not on a CDN**. It previously loaded from unpkg and failed
roughly half of page loads, taking the 3D with it. Do not put it back on a CDN.

---

## Rebuilding

`_build.py` regenerates `index.html` and `/assets` from the landing page design bundle,
and re-copies the app from the working folder. It rewrites the planner CTAs to
`/roomplanner/#/plan`, points the app's wordmark back at `/`, and strips the design
tool's branding badge.

```bash
python _build.py
```

It is deliberately non-destructive — it will not delete `roomplanner/` while a local
preview server is holding it open.

---

## Before this takes real orders

The pricing engine is sound but the **rate card is not yours yet**. `js/data.js` carries
Flatpax Cut To Size's published rates for board, edging, handling, drilling and assembly,
plus estimates for hardware and benchtops. Replace them before quoting a customer.

Also outstanding:

- No backend. Jobs live in `localStorage`; the quote prints but transmits nothing.
- Pricing is client-side, which is fine for quoting but must move server-side before
  money changes hands.
- The nester is a shelf-pack at 57–72% yield; a production optimiser reaches 75–85%,
  so quoted sheet counts are currently pessimistic.
