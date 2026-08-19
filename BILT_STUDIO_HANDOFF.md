# BILT Studio — Site Handoff

**For:** incoming web developer
**Date:** 19 Aug 2026
**Live at:** biltstudio.com.au (Netlify, static, no build step)
**Repo root:** `/site` — this doc lives at `/site/BILT_STUDIO_HANDOFF.md`

This is a working handoff, not a spec. Everything under "Current build" is real and deployed. Everything under "Direction from here" is an approved creative brief that hasn't been built yet. Don't blend them without checking with the owner first — a few things in the brief conflict with decisions already locked in (see §5).

---

## 1. Business context

| | |
|---|---|
| Brand | BILT Studio |
| Legal entity | Bilt & Co Pty Ltd |
| ACN | 700 798 509 |
| Contact | hello@biltstudio.com.au |
| Market | Queensland, Australia (Brisbane / Sunshine Coast / Rockhampton delivery) |
| Product | Cut-to-size, flat-pack kitchen cabinetry — parametric, not fixed SKUs |

**Positioning:** *"A beautiful kitchen shouldn't cost what you think."* Not a discount brand — a smarter-sourcing brand. The intended read is: look expensive first, discover the price second, feel like you found a system rather than a sale.

**Confirmed pricing anchor:** Kitchens from **$4,490** (complete packages — this is the page-wide anchor, distinct from the three range-tile prices below it).

**Confirmed range tiers** (owner-supplied, 19 Aug 2026):

| Tier | Run length | From |
|---|---|---|
| Compact | 2400 mm | $4,590 |
| Granny flat | 2700 mm | $5,500 |
| Tiny home | 3000 mm | $7,500 |

**Confirmed hardware:** Blum — CLIP top BLUMOTION hinges, TANDEMBOX antaro runners. (This is the real sourced brand from the Flatpax rate data this build's pricing engine was originally reverse-engineered from — not a placeholder.)

**Confirmed benchtop:** Quartz and granite standard, marble available as a paid upgrade. **No timber benchtop, no laminate** — explicitly ruled out by the owner ("looks and feels tacky").

**Confirmed lead time:** 8–12 weeks.

**Data integrity rule the owner set, and that this build follows strictly:** never publish a review count, install count, award, certification, warranty term, brand, or lead time that hasn't been confirmed by the owner. Where something is still unknown it is left as a visible `[BRACKETED PLACEHOLDER]` in the HTML rather than invented — see §6 for the current list.

---

## 2. Current build — stack and structure

No framework, no build tooling, no dependencies. Plain HTML/CSS/ES modules, deployed as-is.

```
/site
  index.html          landing page (this doc's main subject)
  roomplanner/         the app — planner, catalogue, quote (separate sub-project, see §7)
  assets/              images, video, self-hosted woff2 (28 files, content-hashed names)
  css/hero.css         hero-specific styles
  js/hero.js           scroll-scrubbed hero controller
  _reviews.html        the 3 testimonial cards — content only, edited independently of build logic
  _build.py            assembles index.html from a design-tool export + the fragments above
  _headers / netlify.toml / vercel.json   host config, both committed (see README.md)
```

**Important quirk for whoever inherits this:** `index.html` is a *generated* file. It's assembled by `_build.py` from a Claude-Design HTML export (asset-bundled artifact) plus a handful of Python string-substitution passes — section reordering, a numbered-eyebrow renumbering pass, price/spec data fills, and the reviews/arc section injections. **Don't hand-edit `index.html` directly for anything structural** — those edits get silently lost the next time `_build.py` runs. Copy edits are fine to make by hand if `_build.py` won't be re-run again; content-only edits (reviews, prices) are best made in `_reviews.html` or the corresponding fragment inside `_build.py`.

If you're taking this to a real framework (Next.js, Astro, whatever) — this is the point to actually do it. The Python-assembly approach was a way to iterate fast without a toolchain while content was still being locked down. It has served its purpose; don't inherit it.

**Typography:** Newsreader (body copy, serif), Archivo (headlines, variable weight/stretch), IBM Plex Mono (eyebrows, labels, monospace numerics), all self-hosted woff2.

**Color tokens** (`:root` in `index.html`):
```css
--char:    #16130F   /* primary dark background */
--lift:    #1D1A15   /* raised panel background */
--lift2:   #221E19   /* secondary raised panel */
--plaster: #E7E4DD   /* primary light text/surface */
--greige:  #B4AB9E   /* secondary text */
--walnut:  #8A5E3A   /* accent — used for numerics, hover states, the price reveal */
--steel:   #8D9698   /* label/eyebrow color */
--paper:   #F4F2EE   /* light section background (bl-trade) */
--hair:    rgba(141,150,152,.22)  /* hairline borders */
--ease:    cubic-bezier(.22,.61,.36,1)
```

**Layout helpers** (wired by inline JS in `index.html`, respond to a resize/load listener — not CSS Grid `auto-fit`, this is deliberate viewport-based switching):
- `data-two` → 2-col above 940px, 1-col below
- `data-three` → 3-col above 820px, 1-col below
- `data-five` → 5/2/1-col at 1100/700px breakpoints
- `data-rev` → scroll-reveal (IntersectionObserver, opacity+translateY, respects `prefers-reduced-motion`)

---

## 3. Page architecture — as built, section by section

The running order was deliberately re-sequenced (see §4 for the reasoning). Current order, top to bottom:

| # | Section id | Headline | Job |
|---|---|---|---|
| — | `bl-top` | "Beautiful kitchens. Smarter by design." | Hero. Scroll-scrubbed video (desktop/tablet), static image fallback (mobile). **Locked — do not redesign.** |
| — | `bl-convert` | "See your kitchen. See your price." | Low-commitment CTA strip immediately post-hero. Locked in position. |
| — | `bl-why` | "A kitchen quote should be a number, not a negotiation." | Un-numbered belief-statement beat, right after the hero/convert strip and before the problem/shift/price arc begins. States why BILT exists before any argument is made. |
| 01 | `bl-problem` | "Why does buying a kitchen still feel so complicated?" | Builds dissonance before any price is shown. 3-up grid: opaque quotes / showroom overhead / slow process. |
| 02 | `bl-shift` | "A smarter way to buy a beautiful kitchen." | Old-way/BILT-way two-column comparison. No competitor is named. |
| 03 | `bl-price` | "Start with a better number." | The reveal. Big walnut-accent numeral, **$4,490**, "Kitchens from." Copy: *"The number changes with your kitchen — never with our margin."* |
| 04 | `bl-planner` | "Draw the room. Watch the price move." | Live interactive demo — the proof-of-possibility beat. Carries the stats strip (lead time, min order, etc.) at its foot. |
| 05 | `bl-range` | "Kitchenettes, priced on the page." | The three real tiles: Compact / Granny flat / Tiny home, each with mm run, price, one-line description, real photography. |
| 06 | `bl-spec` | "What you are actually buying." | Board / edge / hardware / benchtop spec sheet. Currently reusing a kitchen photo as a stand-in for a real cabinet-detail macro shot — flagged in §6. |
| 07 | `bl-smart` | "Every cabinet can go further." | Motorized/smart storage showcase — pull-down overheads, blind-corner pull-outs, drop-down drying rack. |
| 08 | *(anonymous `<section>`, no id — sits between `bl-smart` and `bl-visit`)* | "Five steps, no surprises." | "From drawing to bench" — the five-step process. |
| 09 | `bl-visit` | "The finishes, in your hands." | Tiny home display invitation — real installed kitchen, walk in and open the drawers. |
| 10 | `bl-reviews` | "Everyone arrives a little sceptical." | Three real testimonials (Sarah Wallace/Rockhampton, Brian T./Gladstone, Betty Miller/Caboolture), 5-star, no fabricated review count. |
| 11 | *(anonymous `<section>`, no id — sits between `bl-reviews` and `bl-trade`)* | "A short list of true things." | "What we can prove" — kept deliberately short; only substantiated claims. |
| — | `bl-trade` | "Wholesale, without the container." | Un-numbered eyebrow (deliberately demoted — trade is a secondary audience, not part of the primary homeowner narrative). Comparison table: BILT vs offshore container vs local cabinetmaker across price visibility, lead time, minimum order, sizing. |
| 12 | `bl-faq` | — | Objection-clearing `<details>` accordion immediately before the close. |
| — | `bl-contact` | "Draw it. See the price." | Final CTA: Open the planner / Book a viewing / Email us. |

---

## 4. The emotional journey this order is built on

This isn't decorative — every section above maps to one beat, in this order, and the order is load-bearing. Don't reshuffle sections without checking which beat you'd be breaking.

```
1. WANT       →  Hero. Pure desire. No argument yet — nothing here needs
                  proof, it needs to be wanted.

2. CURIOUS    →  The post-hero CTA strip + the planner's own copy
                  ("no login, no measure-up, no salesperson"). The job
                  is to provoke "how does that even work?", not to inform.

3. POSSIBLE   →  The Problem → Shift → Price arc, landing in the live
                  planner. Dissonance is built FIRST (why is this
                  normally painful), then explained (the old way vs the
                  BILT way), then resolved (the $4,490 reveal) — and
                  only then does the visitor get to touch the actual
                  mechanism and watch a number move in real time.

4. BELIEVE    →  Anatomy of a cabinet (bl-spec). Possible ≠ good — this
                  section's whole job is answering "but is it actually
                  well made, or is that how they keep it cheap?"

5. TRUST      →  Come and see it + reviews + "what we can prove"
                  (bl-visit / bl-reviews). This is the trust PEAK —
                  a real installed kitchen you can walk into, real
                  people's own words, only substantiated claims. This
                  is BILT's strongest asset and it's placed at the
                  emotional high point on purpose, not buried mid-page.

6. MINE       →  Currently the weakest beat on the page (see §6 — flagged
                  open item, not yet built). Nothing right now
                  deliberately personalizes the outcome to the visitor's
                  own space after trust is earned. "From drawing to
                  bench" comes closest but reads as BILT's process, not
                  the visitor's kitchen. Worth a dedicated pass.

7. EFFORTLESS →  FAQ (last objections cleared) → final CTA. The close is
                  never "buy" — it's "open the planner" or "book a
                  viewing." Free, reversible, no commitment. That's the
                  whole trick: it shouldn't feel like a close.
```

`bl-why` sits as an unnumbered mood beat right after the hero, ahead of beat 1 above — it states the company's belief ("a kitchen quote should be a number, not a negotiation") before the problem/shift/price argument begins. It is not the MINE beat: beat 6 (§ above) is still an open, unbuilt gap on the page — `bl-why` speaks to why BILT exists, not to personalizing the outcome to the visitor's own space, so it does not resolve that flagged item.

**Governing rule, stated explicitly by the owner and worth repeating to whoever builds on this:** *BILT should never sell a kitchen immediately.* Every CTA on the page is an invitation to explore (the planner, a viewing), never a hard commercial ask. If a future section reads like "buy now," it's off-brand — flag it rather than shipping it.

---

## 5. Direction from here — the cinematic master brief

The owner has separately approved a much larger creative direction for where this site goes next: cinematic, architectural, Apple/Tesla-adjacent restraint, a scroll-built kitchen sequence in the hero (empty room → cabinetry assembles → final reveal), material macro interactions, an exploded-view cabinet moment, a before/after room transform, a configuration explorer (straight/L-shape/galley/island).

**Two things from that brief were explicitly overridden by the owner when this was discussed — don't silently reintroduce them:**

- **No wardrobes, no storage/joinery product lines.** The brief's "What We Make" section proposed three categories (Complete Kitchens / Wardrobes & Robes / Storage & Joinery). Confirmed: **kitchens only.** BILT has never sold wardrobes or joinery; don't build copy or product categories implying otherwise.
- **Hero stays as currently built.** The brief's hero spec wanted a price signal ("Kitchens from $4,490") directly in the hero. That was deliberately rejected — the dissonance-then-reveal arc in §4 only works if the price is NOT shown before the Problem/Shift sections build the case for it. The hero itself is otherwise locked per the owner's instruction to keep the cinematic scroll as-is.

Everything else in the cinematic brief — material hover states, exploded-view cabinet, before/after room transform, configuration explorer, the 12-image asset list — is real approved future direction, just not yet built. Treat it as the north star for visual ambition, not a literal spec to implement wholesale; reconcile it against what's already shipped (§3–4) rather than replacing it wholesale.

---

## 6. Open items — genuinely unresolved, don't guess

These are live `[BRACKETED]` placeholders in `index.html` right now. Do not fill any of these without the owner confirming the actual value — that's the one hard rule on this project.

| Placeholder | Where | What's needed |
|---|---|---|
| `[BOARD]`, `[BOARD SPEC]`, `[EDGE]` | bl-spec | Actual board substrate and edge-banding system in use |
| `[ABN]`, `[PHONE]` | footer/contact | Legal + contact details |
| `[WARRANTY TERMS + ACL WORDING]` | — | Needs to go through the owner, this is a consumer-law-sensitive field, don't draft it speculatively |
| `[RANGE]`, `[CONFIRM]`, `[CONFIRM ORIGIN + BOARD/HARDWARE BRANDS]`, `[PLACEHOLDER RATES]` | scattered | Assorted smaller confirmations, self-explanatory in context |

**Also open, not a placeholder but a known gap:** the "Anatomy of a cabinet" section (`bl-spec`) is currently reusing the granny-flat kitchen photo as its "cabinet carcass detail" image. It needs a real macro shot — board edge, hinge, drawer runner — not a wide kitchen photo. This is the single missing piece of photography on the whole page; everything else (hero, tiny-home display, all three range tiles) already has real, non-placeholder photography.

**Beat 6 ("MINE") in §4** — no dedicated section yet personalizes the outcome to the visitor's own space post-trust. Worth a proposal before building blind.

---

## 7. The room planner (`/roomplanner/`)

Separate sub-project, same repo, same domain (`/roomplanner/` — deliberately not a subdomain, for SEO reasons documented in `README.md`). Vanilla JS, ES modules, three.js r160 vendored locally (not CDN — CDN loads were unreliable in testing).

Briefly, since it's a large system in its own right and this doc is about the landing page: 17 parametric cabinet products (not fixed SKUs), live line-item pricing, a polygon-based room model supporting rectangular and L-shaped rooms, free 2-axis cabinet placement with 55mm magnetic snapping, undo/redo, and a guillotine sheet-nesting cutlist generator. Full detail is in `roomplanner/README.md` if you need to go deeper — flagging its existence here mainly so nobody assumes the landing page is the whole product.

---

## 8. What NOT to do

- Don't hand-edit generated sections of `index.html` if `_build.py` will run again — edits will be silently overwritten.
- Don't invent brands, certifications, review counts, or lead times. If it's not in §1's confirmed list or explicitly given by the owner, it's a placeholder, not a guess.
- Don't reorder sections without checking §4 — the sequence is deliberate, not aesthetic.
- Don't add wardrobes/storage product lines or a hard "buy now" CTA — both explicitly rejected, see §5.
- Don't move the site to a subdomain (`app.biltstudio.com.au`) — deliberately kept path-based (`/roomplanner/`) for SEO. See `README.md` for the reasoning if you want to push back on it.
