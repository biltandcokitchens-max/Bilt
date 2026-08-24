# -*- coding: utf-8 -*-
"""Regional and northern Queensland city data.

Second half of the Queensland set; see _cities_qld.py for the schema and
for the rule every entry has to satisfy. Split across two modules purely
because one file of this much prose is unpleasant to edit.
"""

CITIES_NORTH = [
    dict(
        slug='caboolture', name='Caboolture', region='Moreton Bay', state='queensland',
        blurb='Acreage and a growth corridor at once — the region where a second dwelling is the obvious move.',
        hero='granny-flat.jpg',
        heroalt='A self-contained kitchen in a granny flat, pale cabinetry and stone benchtop.',
        title='Flat Pack Kitchens Caboolture & Moreton Bay | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Caboolture and Moreton Bay. Priced on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered to Caboolture.',
        lede='Big blocks, growing families, and a granny flat kitchen you can price to the dollar before you start.',
        body=[
            ('Land is the reason Moreton Bay builds second dwellings',
             ["The stretch from Caboolture out through Wamuran, Elimbah and Narangba is one of "
              "the few parts of South East Queensland where ordinary blocks are still large "
              "enough that a secondary dwelling is a realistic project rather than a squeeze.",
              "That is why the granny flat is the region's signature job — for ageing parents, "
              "for adult children who cannot buy yet, or for rental income. And a granny flat "
              "lives or dies on the total: it is discretionary, so an unknown number is the "
              "reason most of them never get built.",
              "The 2 700 mm Granny flat range is $5,500 complete — carcasses, doors, Blum "
              "hardware and a quartz or granite benchtop. You see the whole figure before "
              "committing to anything."]),
            ('The main house is usually 1990s brick, and due',
             ["Caboolture's established estates went up largely through the 1990s and 2000s, "
              "which puts a great many original kitchens right at the age where the layout is "
              "still sensible and everything else has given up — dropped hinges, drawers that "
              "no longer run, laminate lifting at the edges.",
              "That is the cheapest kind of kitchen to fix properly: keep the plumbing and the "
              "layout, replace the cabinetry with carcasses cut to the room you actually have, "
              "and specify hardware that will not need doing again."]),
        ],
        quote=("Everything turned up when they said it would", "Betty Miller", "Caboolture"),
        faqs=[
            ("Do you deliver to Caboolture?",
             "Yes, across the Moreton Bay region. Everything ships direct from our base."),
            ("What does a granny flat kitchen cost?",
             "The 2 700 mm Granny flat range starts at $5,500 and is a complete kitchen, not a "
             "stripped-back one — carcasses, doors, Blum hardware and a stone benchtop."),
            ("Do I need approval for a secondary dwelling?",
             "A secondary dwelling needs Moreton Bay Regional Council approval and has rules on "
             "size, setbacks and occupancy. Sort that before ordering cabinetry — we supply the "
             "kitchen, not the building approval."),
            ("Can I replace a 1990s kitchen without moving anything?",
             "Yes, and it is the best-value version of the job. Keep the sink and appliances "
             "where they are, enter your real dimensions, and the cabinetry is cut to the "
             "existing footprint."),
        ],
    ),
    dict(
        slug='bundaberg', name='Bundaberg', region='Wide Bay', state='queensland',
        blurb='Queenslanders in a humid coastal region, on a budget that has to be visible up front.',
        hero='compact.jpg',
        heroalt='A straightforward kitchen run with flat-panel doors and a stone benchtop.',
        title='Flat Pack Kitchens Bundaberg | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Bundaberg and the Wide Bay. Priced on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered to Bundaberg.',
        lede='A fixed price on screen, in a market where a kitchen has to justify every dollar.',
        body=[
            ('Bundaberg buys on value, and knows exactly what things cost',
             ["Bundaberg is an agricultural and processing city, and its housing is priced "
              "accordingly — which means a kitchen renovation gets weighed carefully against "
              "everything else the house needs. A quote that takes three weeks and then moves is "
              "how those projects die.",
              "There is no quote stage here. You draw the room, each cabinet prices as a line "
              "item, and the total updates as you go. Complete kitchens start at $4,490, and you "
              "can take the cut list away before paying anything.",
              "The value argument is not a cheaper kitchen. It is the same kitchen without the "
              "showroom, the sales visit, and the margin those carry."]),
            ('Timber houses, and humidity that never really lets up',
             ["Much of Bundaberg's older stock is high-set timber, with the same awkwardness as "
              "Queenslanders further south: rooms rarely square, floors with a fall in them, "
              "openings you cannot move cheaply. Cutting each carcass to the measured dimension "
              "is what makes those rooms work without a run of filler panels.",
              "It is also a humid coastal region that gets weather. Benchtops here are quartz "
              "and granite only — there is no timber or laminate option — because those are the "
              "two surfaces that swell and lift when damp is a constant rather than a season."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Bundaberg?",
             "Yes, to Bundaberg and across the Wide Bay. Everything ships direct from our base."),
            ("What is the cheapest complete kitchen?",
             "Complete kitchens start at $4,490. The 2 400 mm Compact range is $4,590 including "
             "carcasses, doors, Blum hardware and a quartz or granite benchtop."),
            ("Can a local handyman fit it?",
             "Yes. It arrives flat with a cut list and all hardware and needs no cabinet-making "
             "skill to assemble. Plumbing and electrical still need licensed trades."),
            ("Will the benchtop handle the humidity?",
             "Quartz and granite are standard and neither moves in humidity. There is no timber "
             "or laminate option, which is deliberate for exactly this climate."),
        ],
    ),
    dict(
        slug='hervey-bay', name='Hervey Bay', region='Fraser Coast', state='queensland',
        blurb='One of the oldest population profiles in Australia — where drawer height matters more than door colour.',
        hero='why-we-do-this.jpg',
        heroalt='A bright, accessible kitchen with deep drawers and a stone benchtop.',
        title='Flat Pack Kitchens Hervey Bay | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Hervey Bay and the Fraser Coast. Priced on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered to Hervey Bay.',
        lede='Drawers instead of cupboards, and a price you can see before you commit. Both matter more here than anywhere.',
        body=[
            ('A kitchen you can still use comfortably at eighty',
             ["Hervey Bay has one of the oldest population profiles in the country, and that "
              "changes what a good kitchen is. The design question is not which door finish — "
              "it is whether you can reach the back of a base cupboard without kneeling on the "
              "floor.",
              "The single biggest improvement is replacing base cupboards with deep drawers. A "
              "drawer brings its contents out to you; a cupboard makes you go in after them. Add "
              "corner pull-outs so the dead corner becomes usable, and a pantry lift so the top "
              "shelf comes down to bench height, and an ordinary kitchen becomes one that will "
              "not need rethinking in ten years.",
              "All of it runs on Blum TANDEMBOX antaro runners as standard, which is what makes "
              "a loaded drawer glide rather than drag — the difference between a feature and a "
              "nuisance."]),
            ('Downsizers and holiday lets, in the same street',
             ["The other half of the market is short-stay. Hervey Bay is the mainland base for "
              "K'gari and the whale season, and a holiday-let kitchen has to photograph well, "
              "survive guests, and be replaced without closing the property for weeks.",
              "Both cases want the same things: an exact fit in an existing footprint, hardware "
              "that lasts, and a number known before the job starts rather than after."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Hervey Bay?",
             "Yes, to Hervey Bay, Maryborough and across the Fraser Coast. Everything ships "
             "direct from our base."),
            ("Can you make a kitchen more accessible?",
             "Yes, and it is mostly about choosing drawers over cupboards, adding corner "
             "pull-outs, and using a pantry lift so high storage comes down to you. You can "
             "configure all of that in the planner and watch the price change as you do."),
            ("Are the drawers easy to open when loaded?",
             "Blum TANDEMBOX antaro runners are standard on every drawer rather than an upgrade. "
             "They carry the load on the runner rather than the drawer base, which is what keeps "
             "a full drawer gliding instead of dragging."),
            ("Is this suitable for a holiday rental?",
             "Yes. Blum hardware is standard and benchtops are quartz or granite only, which is "
             "the specification that survives guest turnover."),
        ],
    ),
    dict(
        slug='mackay', name='Mackay', region='Mackay & the Whitsundays', state='queensland',
        blurb='Mining rosters, rental churn and a trades queue measured in months.',
        hero='compact.jpg',
        heroalt='A hard-wearing kitchen run with flat-panel doors and a stone benchtop.',
        title='Flat Pack Kitchens Mackay | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Mackay and the Whitsundays. Priced on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered to Mackay.',
        lede='Priced on screen and shipped direct, in a town where every trade is booked out to the mines.',
        body=[
            ('The trades shortage is the real constraint',
             ["Mackay services the Bowen Basin, and when the coal sector is busy it absorbs "
              "almost every available tradesperson at rates a domestic kitchen cannot compete "
              "with. The result is familiar to anyone who has tried: the quote is fine, the work "
              "would be good, and the earliest start is months away.",
              "Cut-to-size does not remove the need for an installer, but it removes the need for "
              "a cabinet maker's workshop time — which is the longest part of that queue. The "
              "cabinetry arrives cut, labelled and flat-packed with a cut list, so assembly and "
              "fit is work a competent handyman or carpenter can do in days."]),
            ('Rental churn and humidity set the specification',
             ["Mackay's rental market moves with the resource cycle, and a kitchen that turns "
              "over tenants frequently fails at the moving parts first. Blum CLIP top BLUMOTION "
              "hinges and TANDEMBOX antaro runners are standard rather than an upgrade for "
              "exactly that reason.",
              "The climate does the rest of the arguing. High humidity for much of the year is "
              "why benchtops are quartz and granite only — no laminate, no timber, both of which "
              "lift and swell when damp is constant."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Mackay?",
             "Yes, to Mackay and the Whitsundays. Everything ships direct from our base."),
            ("How quickly can I get a kitchen?",
             "There is no quote stage and no workshop queue for the cabinetry — you draw it, "
             "price it and order it the same day. Freight is quoted per order once one of our "
             "team has checked your 3D plan by hand."),
            ("Do I need a cabinet maker?",
             "No. It arrives flat with a cut list and hardware, so a competent handyman or "
             "carpenter can assemble and fit it. Plumbing and electrical need licensed trades."),
            ("Is it suitable for a rental property?",
             "Yes, and it is a common use here. Blum hardware standard and stone benchtops only "
             "is the specification that survives tenant turnover."),
        ],
    ),
    dict(
        slug='townsville', name='Townsville', region='North Queensland', state='queensland',
        blurb='Defence postings and relentless humidity — the toughest climate test in the state.',
        hero='granny-flat.jpg',
        heroalt='A durable kitchen with stone benchtops and quality hardware.',
        title='Flat Pack Kitchens Townsville | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Townsville and North Queensland. Priced on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered to Townsville.',
        lede='Specified for humidity and a rental market that turns over every posting cycle.',
        body=[
            ('Humidity decides how long a kitchen lasts',
             ["Townsville runs hot and humid for a long stretch of the year, and in that climate "
              "the failure points are predictable: particleboard swelling where water reaches an "
              "unsealed edge, laminate lifting, and metal corroding.",
              "That is why the benchtop range here is quartz and granite with no laminate and no "
              "timber option — those are the two surfaces most likely to move. And it is why "
              "hardware brand matters more than it does further south: Blum hinges and runners "
              "are standard on every cabinet rather than a paid upgrade.",
              "None of that makes a kitchen immune. Keep the extraction working and wipe up "
              "standing water at the sink. But the specification starts from a much better place "
              "than a builder-grade fitout does."]),
            ('Defence postings keep the rental market moving',
             ["Townsville hosts one of Australia's largest defence concentrations, and posting "
              "cycles keep a substantial share of the housing stock in rental. That means a lot "
              "of kitchens needing a quick refit to a rentable standard without "
              "over-capitalising.",
              "Being able to price the whole job on screen before committing is worth more in "
              "that market than in most, because the sums are tight and the decision is "
              "commercial rather than emotional."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Townsville?",
             "Yes, to Townsville and across North Queensland. Everything ships direct from our "
             "base."),
            ("Will the cabinetry cope with the humidity?",
             "Benchtops are quartz and granite only — no laminate, no timber — because those "
             "are the surfaces that swell and lift in constant humidity. Blum hinges and runners "
             "are standard, which is the part that corrodes first in a tropical climate."),
            ("Is it suitable for a rental between postings?",
             "Yes, and it is a common use here. The specification is chosen to survive turnover, "
             "and the 2 400 mm Compact range starts at $4,590 complete."),
            ("How is freight handled this far north?",
             "Everything ships direct from our base, flat-packed, which travels far better over "
             "distance than assembled cabinets. Freight is quoted per order once a team member "
             "has checked your 3D plan."),
        ],
    ),
    dict(
        slug='cairns', name='Cairns', region='Far North Queensland', state='queensland',
        blurb='Tropical damp, holiday lets and a long freight run — where flat-packing earns its keep twice.',
        hero='why-we-do-this.jpg',
        heroalt='A bright tropical kitchen with stone benchtops and pale cabinetry.',
        title='Flat Pack Kitchens Cairns | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Cairns and Far North Queensland. Priced on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered to Cairns.',
        lede='Flat panels travel. Assembled boxes of air do not. Over this distance that is most of the argument.',
        body=[
            ('Distance and damp, the two Far North constants',
             ["Cairns is a long way from anywhere, and that shapes what a kitchen costs before "
              "anyone discusses cabinetry. A custom kitchen quoted from further south prices the "
              "trip in — usually twice, since a measure visit has to precede the install.",
              "Flat-packed cabinetry sidesteps most of that. The measuring is yours, done once "
              "with a tape; the pricing happens on screen; and panels travel flat, which is a far "
              "more efficient thing to freight over that distance than assembled carcasses full "
              "of air.",
              "The wet season handles the rest of the specification argument. In a climate this "
              "humid laminate lifts and timber moves, which is why benchtops here are quartz and "
              "granite only, and why Blum hinges and runners are standard rather than optional."]),
            ('Holiday lets, and houses built to breathe',
             ["Tourism keeps a large share of Cairns and Port Douglas housing in short-stay, "
              "where a kitchen has to photograph well, survive guests, and be replaced without "
              "closing the property for weeks.",
              "The older residential stock — elevated timber homes built for airflow long "
              "before air conditioning — has the same awkward geometry as Queenslanders further "
              "south. Cutting each carcass to the measured dimension is what lets cabinetry fit "
              "those rooms without a run of filler panels."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Cairns?",
             "Yes, to Cairns and across Far North Queensland. Everything ships direct from our "
             "base, flat-packed, which travels far better over that distance than assembled "
             "cabinets."),
            ("Will it survive the wet season?",
             "Benchtops are quartz and granite only, with no laminate or timber option, because "
             "those are the surfaces that lift and swell in tropical humidity. Blum hinges and "
             "runners are standard for the same reason — metal is what fails first up here."),
            ("Do I have to travel to a showroom?",
             "No. You draw the room in the planner, the price updates as you go, and you get the "
             "cut list before you pay. There is no measure-and-quote visit to schedule."),
            ("What if a panel arrives damaged this far north?",
             "Flat-packed panels travel considerably better than assembled cabinets, which is "
             "part of why the format suits long freight runs. Freight is quoted per order after "
             "one of our team checks your 3D plan by hand."),
        ],
    ),
]
