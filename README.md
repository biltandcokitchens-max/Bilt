# Bilt Studio

Cut-to-size cabinetry. Marketing site and the room planner, deployed as one static site.

```
/                 landing page
/roomplanner/     the planner, catalogue, job and quote
/assets/          images, video, self-hosted woff2
```

The marketing site and planner shell are plain HTML, CSS and ES modules — no build step for
those. Trade account gating (signup/login/session) adds `netlify/functions/` (TypeScript,
run through esbuild by Netlify) with real npm dependencies in `package.json` (Drizzle ORM,
bcryptjs, jsonwebtoken, `@netlify/database`) — see `package.json` and `netlify/functions/`.

---

## Deploy

Point Netlify at this repository. Publish directory is the repo root, build command is
empty (Netlify builds the Functions itself). `netlify.toml` is committed for this.

`vercel.json` is also committed, but Netlify and Vercel are **not** interchangeable
anymore: Vercel has no equivalent of `netlify/functions/`, so trade-signup, trade-login and
trade-session would all 404 there. Per the client-side handling in
`roomplanner/js/trade-auth.js`, a 404/transport failure on `trade-session` degrades
gracefully (the visitor is just treated as logged-out for that page load, no stored session
is destroyed) rather than crashing — but trade signup/login would be simply unusable on a
Vercel deploy. Netlify is the only supported target for this feature.

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

### The hero

The landing bundle's own hero is replaced at build time by `hero.html`, styled by
`css/hero.css` and driven by `js/hero.js`. Edit those three files, not `index.html` —
a rebuild overwrites `index.html` entirely.

Two things about this section are easy to break:

- **The page is React.** The design tool's runtime parses the `<x-dc>` template and
  mounts it into `#dc-root` *after* scripts run, so `hero.js` binds on a MutationObserver
  and ignores the inert template copy. A plain `querySelector` at startup finds the wrong
  node — or nothing — and the hero silently never moves.
- **The old hero's film lived in the page controller**, bound to `#bl-video` and `#bl-cap`.
  Those IDs left with the old markup, so `_build.py` excises that block. Without it the
  controller throws inside `componentDidMount` and takes the live price demo and all the
  `[data-rev]` reveals down with it.

The kitchen film fills the frame from the first paint and is **scrubbed by scroll
position** across a 340vh sticky track — it is never played. The words are not tied to
scroll: they arrive once on load, in order (wordmark, headline line one, line two,
positioning line, buttons), driven by the `is-in` class and the transition delays in
`css/hero.css`. Retiming the load-in is a CSS edit, not a JS one.

That split is deliberate. An earlier version drove the text from scroll too, which meant
the page's first paint was an empty black screen and the composition only assembled once
you scrolled. Nothing should now leave the hero reading as blank at any scroll position.

Below 768px none of the scrubbing applies: the still becomes a banner above the words,
the composition is static, and **the video is never fetched**.

### Hand-patched sections (not reproduced by `_build.py`)

Same caveat as the hero above, but for a handful of later additions that were made by
hand-editing `index.html` directly rather than through the design bundle. `_build.py`
has no knowledge of any of these — a rebuild will silently discard all of them:

- `id="bl-smart"` ("07 / Storage that thinks ahead") — full section, added directly to
  `index.html`
- `id="bl-why"` ("Why we do this") — full section, added directly to `index.html`
- The three range-tile photos (Compact/Granny flat/Tiny home cards), now pointing at
  `img-stock/compact.jpg`, `img-stock/granny-flat.jpg`, and `img-stock/tiny-home.jpg`
  instead of the generated `assets/*.jpg`
- The three finish-strip photos in the "Come and see it" section
  (`img-stock/finish-brass.jpg`, `img-stock/finish-gunmetal.jpg`,
  `img-stock/finish-copper.jpg`)
- The `bl-why` photo (`img-stock/why-we-do-this.jpg`)

If `_build.py` is run again, these must be manually reapplied afterward — same as
`hero.html`/`css/hero.css`/`js/hero.js`.

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
