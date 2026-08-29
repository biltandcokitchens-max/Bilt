# Placeholders — must be resolved before launch

Everything below is invented, assumed, or supplied as a stand-in. **None of it should go live
unverified.** Several items carry legal risk under Australian Consumer Law if published without
being true (misleading conduct, false testimonials, unsubstantiated licence claims).

Applies to both builds: `bilt-and-co` and `bilt-and-co-light`.

---

## Legal / identity

| Item | Current value | Action |
|---|---|---|
| ACN | `700 798 509` | **Resolved.** Carried across from the retired biltstudio.com.au site, where it is published as the ACN of Bilt & Co Pty Ltd. Verify once against the ASIC register, then treat as final. |
| Legal name | `Bilt & Co Pty Ltd` | Confirm the registered entity name. |
| ABN | not shown | Add if the client trades under one — it belongs in the footer. |
| QBCC licence | claimed as "QBCC licensed & fully insured", no number | **Publish the licence number or remove the claim.** QBCC licensing claims must be accurate. |
| Domain | `https://biltstudio.com.au` | **Resolved.** The new site replaces the old one on the existing domain, inheriting its age and links. Canonicals, schema and sitemap all point here. |

## Contact details

| Item | Current value | Action |
|---|---|---|
| Phone | `(07) 4900 0000` → `tel:+61749000000` | Replace with the real number in `SITE.phone` / `SITE.phoneHref`. |
| Email | `hello@biltstudio.com.au` | Carried from the old site because it matches the retained domain. Confirm the mailbox is live before launch; it is also hard-coded in `assets/js/main.js`. |
| Address | `12 Rockhampton St, Rockhampton QLD 4700` | Client-supplied. Confirm it is the actual showroom, since it drives the map embed and LocalBusiness schema. |
| Opening hours | Mon-Fri 8:30-5:00, Sat 9:00-1:00 by appt | Confirm — these are published in schema and read by Google. |
| Geo coordinates | `-23.3781, 150.5136` | Rockhampton city centre, not the exact address. Replace with the real rooftop coordinates. |

## Trust claims

Resolved with the client on 29 August 2026. Everything below is now either true or removed.

| Claim | Status |
|---|---|
| QBCC licence | **Removed everywhere.** No replacement, at the client's direction. |
| `aggregateRating` schema | **Removed.** Also gone from the utility bar and proof bar. |
| "4.9 from 87 reviews" | **Removed.** |
| Testimonials | **Real.** The three quotes are imported verbatim from biltstudio.com.au with their real names and locations (Sarah Wallace, Rockhampton; Brian T., Gladstone; Betty Miller, Caboolture). Star ratings were **not** shown with them and have been removed rather than invented. Do not edit the wording. |
| "640+ kitchens delivered" | **Corrected to 75+.** |
| "17 years" / "Est. 2009" | **Removed.** The business is one year old; the client has asked that this not be advertised, so no figure replaces it. `foundingDate` is also out of the schema. |
| Showroom / street address | **Removed.** There is no public premises. The address, map embed, geo coordinates and opening hours are all out of the schema, and every "showroom" reference in the copy now describes consultations at the client's kitchen table. |
| Phone | **Real:** 0401 821 848. |
| Email | **Real:** hello@biltstudio.com.au. |
| 10-year warranty | Still to confirm against the written terms. |
| "4 design spots left this month" | **Still unverified.** A scarcity claim that must be true and kept current, or removed. Search `counter` and `pill` in `_pages.js`. |
| "Free 3D design worth $1,100" | **Still unverified.** Confirm the client offers this and that $1,100 is a defensible ordinary price. |
| "$200-a-day" late-delivery credit | **Still unverified.** Only publish if it will be honoured in the contract. |

## Pricing

All price bands, the estimator rate card and the comparison table figures are **market estimates**,
built from published 2026 Australian averages (HIA ~$42,600 national average; Brisbane mid-range
$28,000-$45,000) adjusted for regional Queensland. They are plausible but they are not the client's
numbers.

- Bands: `$15,000-$23,000` / `$26,000-$42,000` / `$47,000+`, pantries from `$4,000`
- Estimator rates: `TIER`, `BENCH` and `EXTRA` objects in `assets/js/main.js`
- Comparison table "typical 7m kitchen" figures in `_pages.js`

**These bands were cut twice at the client's direction - 25% on 2026-08-29, then a further 27%
- leaving them roughly 45% below the original market estimates.** Essence now overlaps the flat-pack
column of the site's own comparison table ($14,000-$22,000), and the typical-7m-kitchen row sits
below the typical-cabinet-shop column. The surrounding copy still argues a premium position; that
contradiction needs resolving before launch. Confirm the numbers clear your margin.

**Superseded note:** the first cut was described as 25% from the original estimates at the client's direction (2026-08-29).**
The competitor columns, HIA averages and Brisbane figures were deliberately left untouched, so the
site now positions Bilt & Co inside the `typical cabinet shop` range rather than above it. Check the
surrounding copy still argues the right case, and confirm the new numbers clear your margin.

**Action:** replace every one of these with the client's real rate card before launch.

## Functionality

| Item | Current behaviour | Action |
|---|---|---|
| Enquiry forms | Open the visitor's email client via `mailto:` | Connect a real handler — Netlify Forms, Formspree, or a CRM endpoint. Without this, leads will be lost on any device with no configured mail client. |
| Form spam protection | none | Add a honeypot field or Turnstile/reCAPTCHA once a real handler is wired. |
| Privacy policy | `privacy.html` — written, linked from the footer and both forms | **Two sections inside it go stale the moment you change the site.** The cookies/analytics section states there is no tracking of any kind; adding GA4 or an ad pixel makes that false. The "how your enquiry reaches us" section describes the mailto handoff; connecting a form handler makes that false. Update both in the same change. Have a lawyer read it before launch. |
| Favicon | generated `B&C` monogram SVG (`assets/favicon.svg`) | Replace with the real Bilt & Co mark. |
| Analytics | none installed | Add GA4 or Plausible plus call tracking. |
| Hero film | `assets/video/hero.mp4` — supplied from the `forma-kitchens` project; a rendered/CG kitchen, not a Bilt & Co install | Same issue as the stock photography: it presents a kitchen the business did not build. Replace with footage of a real project, or keep it only as an abstract mood piece with no claim attached. `assets/img/hero-poster.jpg` is a frame from it. |

## Imagery

All 34 photographs are free-licence stock from Pexels and Unsplash — see `IMAGE-CREDITS.md` for the
source URL of every file. They are legally usable, but they are **not the client's work**, and the
gallery presents them with invented project locations ("Maison · Norman Gardens").

**Action:** replace with real project photography before launch. Publishing stock imagery as your own
completed projects is misleading conduct.

---

## Quick pre-launch checklist

- [x] Real ACN (700 798 509)
- [x] Real phone and email
- [x] Address / showroom claims removed — no public premises
- [x] QBCC claim removed
- [x] `aggregateRating`, review count and star ratings removed
- [x] Real testimonials imported from biltstudio.com.au
- [x] Kitchens delivered corrected to 75+
- [x] Years-trading claims removed
- [x] Price bands confirmed by the client
- [x] Privacy policy written and linked
- [x] `SITE.origin` set to biltstudio.com.au
- [ ] ABN, if the business has one
- [ ] Scarcity, offer-value and late-credit claims verified or removed
- [ ] Warranty period confirmed against the written terms
- [ ] Real project photography, gallery captions and hero film
- [ ] Form handler + spam protection (privacy policy text must be updated in the same change)
- [ ] WebP/AVIF image variants
- [ ] Real favicon
- [ ] Deploy `out-redirects/` — 65 x 301 from the retired site structure
- [ ] Google Business Profile, Search Console, analytics
