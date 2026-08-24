# BILT Studio — SEO audit, action list and change log

**Audited:** 24 Aug 2026
**Scope:** `biltstudio.com.au` landing page (`/index.html`), plus the plan for Central Queensland location pages.
**Method:** source inspection of the deployed files, plus live DOM/render measurement in a browser at 1400×900 and 375×812.

---

## 0. Where this site actually stood

The build quality is high and the render model is better than it looks — but as a *search* asset the page was close to invisible. Eleven things were missing outright, not merely suboptimal:

| | Before |
|---|---|
| `<html lang>` | absent |
| Canonical URL | absent |
| Open Graph / Twitter cards | absent — a shared link rendered as a bare URL |
| Structured data (JSON-LD) | **none at all** |
| `robots.txt` | **file did not exist** |
| `sitemap.xml` | **file did not exist** |
| Analytics / tracking | **none of any kind** |
| Image `loading`/`width`/`height` | absent on all 8 images |
| Dead links | 3 (`Privacy`, `Terms of sale`, `Warranty` → `href="#"`) |
| Phone number | **none on the page** |
| Booking mechanism | **0 forms, 0 inputs** |

**One thing that is genuinely fine:** the `<x-dc>` runtime. 96% of the body is authored inside a custom element that a JS runtime re-mounts into `#dc-root`. That *sounds* like an SPA indexing problem, but it is not — the full text is present in the raw HTML source, so it is readable without JS, and the runtime removes the template after mounting, so the rendered DOM contains each heading exactly once. Verified: 17 `h1`/`h2`/`h3`, zero duplicates. No action needed.

---

## 1. The two findings that outrank everything else

### 1.1 There is no NAP, so local SEO cannot actually start

Local ranking is built on a **Google Business Profile**, and a GBP requires a real business name, address and phone. Right now the site has:

- **No phone number.** Zero `tel:` links anywhere.
- **No street address.** The footer says only "Display in Queensland, by appointment."
- **No ABN.** Only ACN 700 798 509.

`BILT_STUDIO_HANDOFF.md` §6 lists `[ABN]` and `[PHONE]` as owner-confirmation-required, with the note that filling them without confirmation is *"the one hard rule on this project."* **I have not invented any of them, and the schema I added deliberately does not claim a `LocalBusiness` type** — that type requires `postalAddress` and `telephone` to be eligible for the local pack, and asserting a fake one is worse than asserting nothing.

> **This is the single highest-value action on the list, and it is not a code task.** Until there is a phone number and a verifiable address, the location pages below can rank in organic results but **cannot enter the map pack** — which is where the majority of "kitchens near me" clicks go.

### 1.2 SEO traffic would currently arrive at a page it cannot convert on

There are **zero forms and zero input fields** on the entire landing page. "Book a viewing" links to `#bl-contact`, which offers *Open the planner / Book a viewing / Email us* — where "Book a viewing" is a link to the section containing itself. The only real conversion paths are an email address and the planner.

Sending paid or organic traffic into this is spending attention you cannot bank. **Fix the conversion mechanism before, or at least alongside, the traffic work.**

---

## 2. CHANGE LOG

### ✅ `/` — landing page — **DONE** (24 Aug 2026)

| # | Change | File |
|---|---|---|
| 1 | `<html lang="en-AU">` added | `index.html` |
| 2 | `charset`/`viewport` moved to the top of `<head>` (charset must be in the first 1024 bytes) | `index.html` |
| 3 | Title rewritten → `Flat Pack Kitchens Queensland \| Cut-to-Size Cabinetry \| BILT Studio` (67 chars) | `index.html` |
| 4 | Meta description rewritten, 144 chars, leads with the product and the $4,490 anchor | `index.html` |
| 5 | `<link rel="canonical">` added | `index.html` |
| 6 | `robots` meta with `max-image-preview:large` (bigger thumbnail in results) | `index.html` |
| 7 | Full Open Graph set (8 tags) + Twitter `summary_large_image` (4 tags) | `index.html` |
| 8 | **JSON-LD `@graph`**: `Organization` + `WebSite` + `WebPage` + `ItemList` of 3 `Product`/`Offer` nodes carrying the real $4,590 / $5,500 / $7,500 prices. Validated: parses, 4 node types, 3 products. | `index.html` |
| 9 | `areaServed` covers QLD + Brisbane, Rockhampton, Gladstone, Yeppoon, Emerald | `index.html` |
| 10 | All 8 images given intrinsic `width`/`height` (kills layout shift) and `decoding="async"` | `index.html` |
| 11 | 7 below-fold images set `loading="lazy"`; the hero still kept eager with `fetchpriority="high"` (it is the LCP element) | `index.html` |
| 12 | 3 dead `href="#"` links pointed at real routes `/legal/privacy/`, `/legal/terms/`, `/legal/warranty/` | `index.html` |
| 13 | `data-track` extended from 2 CTAs to **12** across every conversion path | `index.html` |
| 14 | **`robots.txt` created** — allows the site, keeps crawlers out of ephemeral planner state, points at the sitemap | `robots.txt` |
| 15 | **Measurement layer created** — consent-gated, vendor-neutral, inert until a measurement ID is supplied | `js/analytics.js` |

**Verified after the change:** `lang=en-AU`, title 67 chars, description 144 chars, canonical present, 8 OG + 4 Twitter tags, JSON-LD parses cleanly, 8/8 images sized, 7 lazy, **0 dead links**, 12 tracked CTAs, consent defaults pushed before any tag, 1 `<h1>`, no console errors, and **no analytics network request fires** (correct — no ID configured yet).

### ⬜ Location pages — Central Queensland — *next*

See §6.

---

## 3. TECHNICAL — what is still outstanding

| Priority | Task | Notes |
|---|---|---|
| **P1** | **Generate `sitemap.xml`** | Deliberately not written yet — it should be generated *after* the location pages exist so it ships complete rather than immediately stale. |
| **P1** | **Verify in Google Search Console + Bing Webmaster Tools** | Nothing about this site's real search performance is knowable until this is done. Submit the sitemap here. |
| **P1** | **Build `/legal/privacy/`** | Now linked from the footer, and legally load-bearing the moment analytics is switched on. Must exist *before* the measurement ID goes in. |
| P2 | Build `/legal/terms/` and `/legal/warranty/` | Also now linked. The handoff flags warranty wording as consumer-law-sensitive — **do not draft speculatively**, it needs the owner. |
| P2 | **Hero video is 897 KB and loads on mobile** | It is fetched on every phone visit. Add a `navigator.connection.saveData` / `effectiveType` guard so metered connections keep the still image instead. Directly affects mobile LCP, which is a ranking factor. |
| P2 | Convert `img-stock` JPEGs to AVIF/WebP with `<picture>` | 1.1 MB across 7 images. Netlify Image CDN can do this on the fly. |
| P3 | Add `BreadcrumbList` schema | Only meaningful once there is more than one page — do it with the location pages. |
| P3 | Self-host or subset the fonts more aggressively | `assets/` is 3.3 MB, largely woff2. Check which weights are actually used. |
| P3 | Add `_headers` rules for HTML | Currently only `/assets/*` and planner paths are covered. |

---

## 4. TEXT — content and keyword strategy

### 4.1 Fix the geography contradiction first

The site currently says three different things about where it operates:

| Where | Claim |
|---|---|
| Old `<title>` | "Gold Coast & Brisbane" |
| Footer "WHERE" | "Brisbane · Sunshine Coast · Rockhampton" |
| Handoff §1 | "Brisbane / Sunshine Coast / Rockhampton delivery" |
| Testimonials | Rockhampton, Gladstone, Caboolture |

Gold Coast appeared in the title but **nowhere else in the business**. I removed it and made the title state-level (`Queensland`), which is defensible for all readings. But this needs an owner decision, because it determines which location pages are honest to publish. **Central Queensland is well supported by the evidence** — Rockhampton is a named delivery destination and two of the three real testimonials are from Rockhampton and Gladstone.

### 4.2 The page is thin for a commercial term

**1,175 words.** For a competitive transactional query, page-one results in this category typically run substantially longer and answer far more buyer questions. The page is beautifully written but it is a *brochure*, not a *resource*.

### 4.3 Keyword architecture

I have **not** invented search volumes — that needs Ahrefs/Semrush/Keyword Planner, which I do not have access to here. What follows is the *cluster structure*; validate the volumes before committing to priority order.

**Primary (home):** flat pack kitchens Queensland · cut to size cabinetry · custom flat pack kitchens Australia

**Money terms (location pages):** flat pack kitchens `<town>` · kitchen cabinets `<town>` · kitchen renovation `<town>` · granny flat kitchen `<town>`

**Product/long-tail (deserve their own pages):**
- granny flat kitchen cost Australia
- tiny home kitchen cabinets
- flat pack vs custom kitchen cost
- how much does a new kitchen cost Queensland
- Blum hinges vs standard hinges
- quartz vs granite benchtop
- how to measure for a flat pack kitchen

**Trade cluster:** wholesale kitchen cabinets QLD · trade kitchen supplier · cabinet maker supplier Queensland

### 4.4 Content to write

| Priority | Page | Why |
|---|---|---|
| P1 | **Pricing page** | "How much does X cost" is the highest-intent query in this category and the page currently answers it only in fragments. You have real numbers — $4,490 anchor, three tiers — which most competitors will not publish. That is a genuine advantage. |
| P1 | **FAQ expansion + `FAQPage` schema** | Eligible for rich results; directly answers buyer objections. |
| P2 | Buying guide: *flat pack vs custom* | Top-of-funnel, links down to the money pages. |
| P2 | *How to measure your kitchen* | Feeds straight into the planner — the conversion you want. |
| P3 | Project gallery with per-project pages | Real photography of real installs; each one is an indexable long-tail asset. |

**One caution:** the planner offers laminate and timber benchtops, which the owner **explicitly ruled out** ("looks and feels tacky"). If a content page states the benchtop range, it will contradict the planner. Fix the planner or the copy — do not let SEO content harden the inconsistency.

---

## 5. TRACKING

Shipped in `js/analytics.js`, currently inert. It is deliberately **vendor-neutral** — everything routes through `dataLayer`, so switching GA4 → Plausible/Fathom is a one-file change and the 12 `data-track` attributes in the HTML stay untouched.

**Events wired:** `cta_click` (all 12 CTAs, by name) · `planner_open` (the conversion this page exists for) · `scroll_depth` at 25/50/75/100%.

Scroll depth matters more than usual here: the page is a long scroll-driven film, and the CTA does not appear until ~128vh of desktop scroll. Without this you cannot tell whether visitors reach the pricing or bail during the hero.

### To do

1. **Write the privacy policy first.** Then create a GA4 property and paste the ID into `MEASUREMENT_ID`. Nothing transmits until then — that ordering is intentional.
2. **Build the consent banner.** `window.biltGrantAnalytics(true|false)` is already exposed for it; Consent Mode v2 defaults are set to denied before the tag loads.
3. **Mark `planner_open` as a GA4 conversion**, and `cta_click` where `cta = book-viewing`.
4. **Search Console** — the only source of truth for queries, impressions and CTR.
5. **Later:** server-side events from the trade-signup function, so trade accounts are attributable to a channel.

---

## 6. LOCAL SEO — Central Queensland

### 6.1 Prerequisites (owner, not code)

1. **Google Business Profile** — blocked on address + phone (§1.1). Category: *Kitchen furniture store* or *Cabinet maker*. If there is no public premises, GBP supports a **service-area business** with a hidden address, but it still requires a real verifiable address behind the scenes.
2. **Consistent NAP everywhere** — one exact spelling of name, address, phone. Inconsistency is the most common cause of weak local ranking.
3. **Citations** — True Local, Yellow Pages AU, Hotfrog, Localsearch, StartLocal, plus trade directories (HIA, Houzz AU).
4. **Reviews** — you have three real ones with permission. Get them onto the GBP, where they affect ranking; on-site testimonials do not.

### 6.2 Page architecture

A hub-and-spoke, so the towns reinforce each other rather than competing:

```
/kitchens/central-queensland/     ← hub
    ├── /kitchens/rockhampton/    ← delivery hub, strongest evidence
    ├── /kitchens/gladstone/      ← real testimonial
    ├── /kitchens/yeppoon/        ← Capricorn Coast
    ├── /kitchens/emerald/        ← Central Highlands
    └── /kitchens/biloela/        ← Banana Shire
```

### 6.3 The rule these pages must obey

**Google penalises doorway pages** — near-identical location pages with the town name swapped. Each page must earn its existence with genuinely local substance:

- real delivery reality for that town (freight route, lead time, cost)
- local housing stock (Rockhampton Queenslanders vs Gladstone workers' cottages vs Emerald newer builds) and what that means for cabinetry
- the actual local use case — Gladstone's industry-driven rental market makes granny-flat and investment-property kitchens the live product there, which is a different pitch from owner-occupier renovation
- named local references only where true

**Where a fact is not known, the page must carry a visible `[PLACEHOLDER]`** rather than an invented one. Freight costs and lead times per town are not in the handoff and I will not guess them.

---

## 7. Blocked on the owner — nothing ships without these

| Item | Blocks |
|---|---|
| **Phone number** | Google Business Profile, local pack, `LocalBusiness` schema, conversion |
| **Street address** | Same as above |
| **ABN** | Footer legal, trade credibility |
| **Warranty wording** | `/legal/warranty/` — consumer-law sensitive, do not draft |
| **Delivery cost + lead time per CQ town** | Substance of the location pages |
| **Confirmed service area** | Whether Gold Coast / Sunshine Coast / Central QLD claims are honest |
| **Board substrate + edge banding** | Spec content, competitive differentiation |
