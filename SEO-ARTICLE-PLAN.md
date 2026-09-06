# SEO article plan — regulation and approval intent

**Status: plan only. Nothing built. Uncommitted.**

## The play

Catch people at the *permission* stage of a build, months before they shop for a
kitchen. Someone searching "granny flat rules Rockhampton" or "owner builder permit
QLD" is 3–12 months from needing cabinetry and is not yet talking to a kitchen
company. Own that search, be useful, and be the kitchen company they already know
when they get there.

Every page does three jobs, in this order:

1. **Answer the regulatory question** and send them to the actual authority.
2. **Be the most useful page on that query** — the council's own pages are usually
   badly organised, which is the opening.
3. **Bridge to the kitchen** with one honest line, not a sales pitch.

Same pattern forgedcarbon.com.au uses for `granny-flat-rules-qld`, extended with
direct authority links, which forgedcarbon does not currently have.

## Accuracy framework — applies to every page in this plan

Regulation content carries real risk: wrong information causes someone to build
something they have to remove. Non-negotiables:

- **No fee, timeframe, setback, or clause number stated as fact unless sourced**
  and linked. Rules differ per council and change without notice.
- **Every page links directly to the council or authority** it discusses. That is
  the user's stated intent for these pages and it is also what makes them credible.
- **"Last checked: <date>" on every page**, reviewed twice a year.
- **A standing line**: this is general information, not building or legal advice —
  confirm with your building certifier or council before you commit.
- **Describe the process and the questions to ask**, rather than quoting specifics
  that go stale. Durable and safer.
- Where a rule genuinely varies, say so plainly instead of picking one answer.

Authorities to link: Rockhampton Regional Council, Livingstone Shire Council
(Yeppoon/Capricorn Coast), Gladstone Regional Council, Central Highlands Regional
Council, QBCC, Queensland Development Code, business.qld.gov.au, and the NCC for
building classes.

## Cluster 1 — Owner-builder

The strongest commercial fit in this whole plan: owner-builders buy supply-only,
which is already what `trade.html` and `kitchens-caloundra` offer, and they are
actively looking for suppliers.

| Slug | Target intent |
|---|---|
| `owner-builder-qld` | owner builder permit qld, how to become an owner builder |
| `owner-builder-kitchen-supply` | kitchen supply for owner builders, supply only kitchen |
| `owner-builder-what-you-can-do` | what can an owner builder do without a licence |

Bridge: supply-only, delivered assembled, service drawings for their trades.

## Cluster 2 — Building classification

| Slug | Target intent |
|---|---|
| `class-1a-buildings-explained` | class 1a building, what is a class 1a dwelling |
| `class-10a-to-class-1a` | shed to house conversion, class 10a habitable |
| `secondary-dwelling-vs-granny-flat` | secondary dwelling qld, dual occupancy vs granny flat |

The `class-10a-to-class-1a` page is Rockhampton-specific in practice — shed and
under-house conversions are common here.

## Cluster 3 — Council hubs (the direct-link play)

One page per council. Structure: which approvals apply to which project type, what
the council decides versus what a private certifier decides, direct links, contact
details, and a bridge.

| Slug | Council |
|---|---|
| `council-rockhampton` | Rockhampton Regional Council |
| `council-livingstone-yeppoon` | Livingstone Shire — Yeppoon, Emu Park, Capricorn Coast |
| `council-gladstone` | Gladstone Regional Council |
| `council-central-highlands` | Emerald, Blackwater |

These pair with the existing suburb pages (`kitchens-yeppoon`, `kitchens-gracemere`,
`kitchens-capricorn-coast`) and give each area a second, non-commercial entry point.

## Cluster 4 — Project-type approval guides

Highest volume cluster. Each maps to an existing kitchen segment page.

| Slug | Bridges to |
|---|---|
| `granny-flat-rules-qld` | `granny-flat-kitchens` |
| `granny-flat-rules-rockhampton` | `granny-flat-kitchens` |
| `home-extension-approval-qld` | `new-build-kitchens` |
| `under-house-conversion-approval` | `granny-flat-kitchens`, `kitchenettes` |
| `garage-conversion-approval-qld` | `kitchenettes` |
| `tiny-home-laws-qld` | `tiny-home-kitchens` |
| `airbnb-regulations-qld` | `short-stay-kitchens` |
| `dual-occupancy-qld` | `granny-flat-kitchens` |

## Cluster 5 — Kitchen-specific compliance

Closest to purchase intent. Someone asking whether a kitchen renovation needs
approval is renovating now, not in a year.

| Slug | Target intent |
|---|---|
| `do-i-need-approval-kitchen-renovation` | do i need council approval to renovate a kitchen |
| `kitchen-plumbing-electrical-signoff` | who signs off kitchen plumbing, form 4 qld |
| `kitchen-ventilation-requirements` | rangehood requirements australia, kitchen exhaust ncc |
| `kitchen-standards-australia` | bench height, clearances, NCC/AS references |

`do-i-need-approval-kitchen-renovation` is the single highest-intent page in the
plan — it should be built first in this cluster.

## Cluster 6 — Journey hub

| Slug | Purpose |
|---|---|
| `approvals` | Hub linking every page above, mirroring `guides.html`. Gets `CollectionPage` schema and becomes the internal-linking anchor. |

## Build order

**Phase 1 — 6 pages, highest intent per unit of effort**
`do-i-need-approval-kitchen-renovation`, `owner-builder-qld`,
`owner-builder-kitchen-supply`, `granny-flat-rules-rockhampton`,
`under-house-conversion-approval`, `approvals` hub.

**Phase 2 — 8 pages, breadth**
Council hubs ×4, `granny-flat-rules-qld`, `home-extension-approval-qld`,
`tiny-home-laws-qld`, `class-1a-buildings-explained`.

**Phase 3 — 9 pages, completion**
Remaining classification, compliance and project-type pages.

Total: **23 pages**, taking the site from 31 to 54.

## Technical notes

- Flat slugs, matching current architecture — no build changes needed. Clean URLs
  already applied, so these publish as `/owner-builder-qld` etc.
- Schema: `Article` + `FAQPage` on each, `CollectionPage` on the hub. `Service` nodes
  do **not** belong on these — they are informational, not offers.
- External links to councils: `rel="noopener"`, open in a new tab, and they are
  genuine outbound citations, which is fine and expected for this content type.
- Each page needs ≥2 internal inbound links, per the existing rule in
  `KEYWORD-STRATEGY.md`.
- Add every new keyword to `KEYWORD-MAP.csv` with a single `owner_page`, so this
  expansion cannot create cannibalisation.
- Word count target 900–1,400. Below 900 these read as thin against council pages.

## Maintenance load

23 regulation pages need reviewing twice a year against the source councils. That is
the ongoing cost of this strategy and it is the reason for the "last checked" date
and for describing process rather than quoting figures.
