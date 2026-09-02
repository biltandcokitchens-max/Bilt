# Keyword strategy

Companion to `KEYWORD-MAP.csv`. The CSV is the database; this explains how to use it and what it
says.

## What is deliberately not in here

**No search volumes.** There is no keyword tool on this project and Search Console has no history
yet, so any monthly-volume figure would be invented. Invented numbers are worse than no numbers,
because they get treated as fact and then drive real decisions. The `gsc_*` columns are empty on
purpose — fill them from your own data once it exists (see below).

The `priority` column is a judgement call about commercial value and fit, not a volume estimate.
`1` = worth real effort, `3` = only if it is free, `0` = deliberately avoided.

## The one rule this database exists to enforce

**One page owns one keyword.** The `owner_page` column is the whole point. When two pages chase the
same term they split their own signals and Google picks the weaker one — the single most common
self-inflicted SEO problem for a site this size.

Before writing any new page, search the CSV for its main term. If something already owns it,
strengthen that page instead of building a rival. `status` values:

| status | meaning |
|---|---|
| `owned` | this page is the intended target, and the term is in its title or H1 |
| `secondary` | supported by that page, but not what the page is titled for |
| `partial` | covered in the copy but not properly targeted — an easy win |
| `gap` | no page covers it |
| `avoid` | deliberately not targeted — reason in `notes` |
| `deferred` | not yet, and there is a reason |

## What the map says right now

**Coverage is strong.** All 24 indexable pages own a distinct commercial term. There is no
cannibalisation: no two pages carry the same term as `owned`.

**Four genuine gaps**, in the order I would take them:

1. **Kitchen renovation checklist** — the best of the four. Naturally link-worthy, works as a lead
   magnet, and sits upstream of every money page. Informational, so it feeds the funnel rather than
   converting directly.
2. **Kitchen island bench** — real commercial interest, currently spread thin across `kitchens.html`
   and the layouts guide. Deserves its own page.
3. **Laundry renovation Rockhampton** — `joinery.html` mentions laundries in passing. A separate
   page would be a genuine service expansion, not a doorway page, since the work is already done.
4. **How to measure for a kitchen** — useful for trade buyers and the DIY-adjacent. Lowest priority.

**Three `partial` entries worth a small fix rather than a new page:**

- `kitchen designer rockhampton` → work the phrase into a `studio.html` H2.
- `built in wardrobes rockhampton` → strengthen in `joinery.html`; the phrase is missing from the title.
- `kitchen cabinets rockhampton` → cabinet-level intent currently landing on `kitchens.html`.

**Deliberate exclusions.** Flat-pack terms, competitor brands (Kaboodle, IKEA) and DIY intent are
avoided on purpose — they attract a buyer the studio cannot serve profitably. `cabinet makers
rockhampton` is avoided for a different reason: it implies manufacture, which would be a false claim.
Caloundra and Sunshine Coast terms are deferred, not abandoned.

## Filling in the real numbers

Once Search Console has four to six weeks of data:

1. Search Console → **Performance** → set the range to the last 3 months → **Queries** tab.
2. Export, then paste impressions, clicks and average position into the `gsc_*` columns.
3. Sort by impressions with position between 8 and 20. Those are pages Google already considers
   relevant but is not quite ranking — the cheapest wins on the whole site, and far better value
   than writing anything new.
4. Anything with impressions but a position past 30 is usually a targeting problem, not an effort
   problem. Check the term is actually in the title and H1 of its `owner_page`.

Do this quarterly. Do not do it weekly — early traffic is noise, and reacting to it produces churn.

## Refresh notes

- `kitchen colours 2026` and `average kitchen renovation cost 2026` carry a year. Update the content
  and the title each January or retire them; a stale year in a title actively costs clicks.
- Prices appear in titles for the segment pages. If `main.js` rate cards change, these must change
  with them or the CSV and the site disagree.
