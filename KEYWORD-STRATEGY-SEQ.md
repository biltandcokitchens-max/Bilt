# South East Queensland — keyword intent index

Companion to `KEYWORD-MAP-SEQ.csv`. 78 rows. No search volumes — there is no keyword
tool on this project, so any figure would be invented. `viability` is a judgement about
whether Bilt & Co can realistically win *and* serve the query, not a volume estimate.

## The constraint that shapes everything

South East Queensland is roughly **600–700km** from Rockhampton. The installation team
works to about 150km. So **every SEQ page is supply-tier**: designed here, delivered
assembled, fitted by the customer's own builder or installer.

That single fact splits the entire keyword set in two, and it is why this file has an
`avoid` column at all.

| tier | rows | meaning |
|---|---|---|
| `supply` | 66 | Serviceable — delivered assembled, their installer fits |
| `none` | 12 | Not serviceable at any price. Do not target. |

## What NOT to chase, and why

Twelve keywords are marked `avoid`. They fall into two groups:

**Unserviceable.** "kitchen installer near me", "emergency kitchen replacement brisbane",
"kitchen showroom brisbane". Ranking for these would generate enquiries that must be
turned away, and the showroom one would be a false claim — there is no showroom anywhere.

**Unwinnable and unserviceable.** "kitchen renovation brisbane", "kitchens gold coast",
"kitchen renovation sunshine coast". A Rockhampton supplier with no install presence is
competing against dozens of established local firms on their own turf, for work it could
not deliver if it won.

Chasing these is the single most expensive mistake available in this file.

## Where SEQ is genuinely winnable

Three categories, and they share a trait: **the buyer already expects a supply
arrangement**, so distance is not a defect.

**1. Disability housing — the strongest opening.**
`sda kitchen supplier queensland`, `robust category kitchen sda`, `ot report kitchen quote`,
`ndis kitchen supplier`. SDA builders operate statewide and routinely supply-and-fit.
The work is specification-driven, so a written spec travels perfectly. Competition is
close to zero because kitchen companies do not write about design categories. Already
served by `sda-kitchens-queensland`, `accessible-kitchens` and the NDIS guide.

**2. Trade and builder supply — highest value per enquiry.**
`who supplies kitchens to builders queensland`, `kitchen supplier for granny flat builders`,
`bulk kitchen supply queensland`. B2B, repeat orders, and already exactly what `trade.html`
offers. A builder in Logan does not care where cabinetry is made if it arrives assembled
with service drawings.

**3. Owner-builders and alternative dwellings.**
`owner builder kitchen queensland`, `kitchen for a container home queensland`,
`kitchen for a kit home`. These buyers are already coordinating their own trades.

**Plus: informational content ranks statewide regardless of service area.** The approvals
guides, the benchtop and layout guides, and the cost calculator all reach SEQ readers
today. That traffic converts to supply enquiries without a single location page.

## Five gaps worth building first

Every one is `viability 1` and `status gap`:

1. **`is it cheaper to supply your own kitchen`** — frames the whole proposition. High
   intent, low competition, and it is the question a SEQ owner-builder actually types.
2. **`flat pack vs assembled kitchen`** — positions Bilt correctly *without* competing in
   the flat-pack pond. "Delivered assembled" is the differentiator; this page names it.
3. **`granny flat rules queensland`** — state-level companion to the Rockhampton page.
   Ranks across every SEQ council and funnels to supply.
4. **`secondary dwelling queensland requirements`** — pairs with the above.
5. **`kitchen supply brisbane no install`** — the one Brisbane query that can be owned
   honestly, because the query itself states the constraint.

## Rules carried over

- One `owner_page` per keyword. Verified: no keyword is owned twice across this file.
- Any SEQ page must state plainly that installation is not offered, exactly as the
  Mackay, Bundaberg and Caloundra pages do. The `Service` node names supply and delivery
  only, and the business `areaServed` GeoCircle stays at 250km.
- Council pages link the council directly and carry a "last checked" date.
- Fill the `gsc_*` columns from Search Console once there is data. Sort by impressions
  with position 8–20; that is where the cheap wins are, not in new content.
