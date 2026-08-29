# Bilt & Co — Rockhampton SEO strategy

Written for **Bilt & Co Pty Ltd**, ACN 123 456 789, 12 Rockhampton St, Rockhampton QLD 4700.
This document applies to both builds (`bilt-and-co`, the dark edition, and `bilt-and-co-light`).

---

## 1. The competitive field

Businesses that currently rank for kitchen terms in Rockhampton:

| Competitor | Position of strength | Where they are weak |
|---|---|---|
| **Large's Furniture & Cabinet Makers** | Est. 1946, huge local brand authority, HIA-certified designer | No published pricing, little cost content, limited suburb targeting |
| **Kitchen Bathroom Solutions** (160 Kent St) | 14+ years, physical showroom, broad service pages | Thin on structured data and FAQ content |
| **Kitchen Design CQ** (kdcq.com.au) | Clear service list, testimonials page | Homepage copy is ~50 words; no pricing, no project examples, no process detail, no FAQ |
| **Olive & White Cabinetmaking** | Free measure & quote, 2-year warranty offer | Narrow content footprint |
| **Superior Benchtops** | Covers Rockhampton *and* Yeppoon | Benchtop-led, not full-kitchen led |
| **Refined Space Constructions** | Builder credibility | Kitchens are one service among many |
| **Peff Cabinets, O'Donnell Cabinetmaking** | Long trading history | Minimal web presence |
| **Directories** (Localsearch, Yellow Pages, Trusted Tradie, ThreeBestRated, HomeImprovement2day) | Dominate page 1 for "best" queries | Beatable on informational queries; also a citation opportunity |

**The pattern:** almost every local competitor withholds pricing, publishes thin service pages, and
targets only "Rockhampton" — not the surrounding suburbs and towns that actually convert.

---

## 2. How this site attacks that

| Gap in the market | What we built |
|---|---|
| Nobody publishes prices | `investment.html` — real 2026 bands, what each includes, a live estimator, and "where to spend first" |
| No cost-intent content | Targets the highest-intent query in the category: *kitchen renovation cost Rockhampton* |
| No FAQ / rich results | `FAQPage` schema on 8 pages; every question written to match real search phrasing |
| No local schema | `HomeAndConstructionBusiness` with geo coordinates, ACN, opening hours, `areaServed` (15 localities) and an `OfferCatalog` |
| Rockhampton-only targeting | Dedicated suburb pages: Yeppoon, Gracemere, Capricorn Coast — each with unique copy, unique FAQs and its own breadcrumb trail |
| Thin service pages | 900–1,600 words per money page, written to answer buying questions rather than to hit a word count |
| No comparison content | The "why two quotes differ by $20,000" table (light edition) — a strong dwell-time and link-earning asset |
| Generic image handling | Every `<img>` carries descriptive, location-bearing alt text and explicit width/height |

---

## 3. Keyword map

One primary keyword per page. Do not let these overlap.

| Page | Primary keyword | Secondary |
|---|---|---|
| `index.html` | luxury kitchens Rockhampton | bespoke kitchens Rockhampton, kitchen design Rockhampton |
| `kitchens.html` | custom kitchens Rockhampton | kitchen renovations Rockhampton, cabinet makers Rockhampton, kitchen designer Rockhampton |
| `investment.html` | kitchen renovation cost Rockhampton | how much does a kitchen cost QLD, kitchen prices 2026 |
| `butlers-pantries.html` | butler's pantry Rockhampton | scullery Rockhampton, walk-through pantry cost |
| `joinery.html` | walk-in wardrobes Rockhampton | custom joinery Rockhampton, laundry cabinetry, custom vanities Rockhampton |
| `gallery.html` | kitchen gallery Rockhampton | kitchen ideas Central Queensland |
| `process.html` | kitchen renovation process | how long does a kitchen renovation take |
| `studio.html` | cabinet makers Rockhampton | about + brand/name queries |
| `contact.html` | kitchen design consultation Rockhampton | brand + "near me" queries |
| `kitchens-yeppoon.html` | kitchens Yeppoon | kitchen renovations Yeppoon |
| `kitchens-gracemere.html` | kitchens Gracemere | kitchen renovations Gracemere |
| `kitchens-capricorn-coast.html` | kitchens Capricorn Coast | kitchens Emu Park, kitchens Keppel Sands |

---

## 4. Technical SEO already shipped

- Unique `<title>` (≤62 chars) and meta description (≤158 chars) on every page
- One `<h1>` per page, semantic heading order below it
- `rel="canonical"` on every page; `robots` meta with `max-image-preview:large`
- `sitemap.xml` (excludes the 404) and `robots.txt` pointing to it
- JSON-LD: `HomeAndConstructionBusiness` (home), `WebPage` (inner pages), `BreadcrumbList`, `FAQPage`
- Open Graph + Twitter card metadata with per-page images
- `geo.region` / `geo.position` / `ICBM` meta for local relevance
- Explicit `width`/`height` on every image (read from the real files at build time) — no layout shift
- Hero image preloaded with `fetchpriority="high"`; everything below the fold lazy-loaded
- Fonts preconnected; a single CSS file and a single deferred JS file
- Mobile-first responsive with no horizontal overflow at 390px (verified)
- `prefers-reduced-motion` respected throughout

---

## 5. What must happen off-site (not code)

These matter more than anything on the page for local pack rankings:

1. **Google Business Profile** — claim it, category "Kitchen remodeler" + "Cabinet maker", exact NAP match
   to `12 Rockhampton St, Rockhampton QLD 4700`, post project photos weekly.
2. **NAP consistency** across Localsearch, Yellow Pages, True Local, Hotfrog, Yelp AU, HIA and
   the QBCC public register. Name, address and phone must match this site *character for character*.
3. **Reviews** — the site claims 4.9 from 87 reviews. That number must be real and matched by the
   Google Business Profile before launch, or remove it (see `PLACEHOLDERS.md`).
4. **Local links** — Capricorn Enterprise, Rockhampton Regional Council business directory,
   local sponsorships, supplier pages (Blum, Laminex, Caesarstone dealer listings).
5. **Photography** — replace the stock imagery with real project photos. Original photography of
   local jobs is the single biggest ranking and conversion upgrade available to this site.

---

## 6. Measurement

Set up before launch: Google Search Console (submit `sitemap.xml`), Google Analytics 4 or Plausible,
and call tracking on the phone number. Track these as conversions:

- Consultation form submissions
- `tel:` link clicks (mobile is where most of these come from)
- Estimator completions on `investment.html`
- Scroll depth past the price bands
