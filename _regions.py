# -*- coding: utf-8 -*-
"""Regional hubs (brief sec.25).

Two jobs, and the second is the one that matters:

1. Give the geography a spine. Root -> state -> region -> town, so
   Queensland is not one hub carrying twenty-seven towns in a flat list.

2. Cover the towns that did NOT earn their own page. The brief forbids
   thin pages for every small town, but those places still have people
   in them searching. Naming them inside their region's hub is how they
   get served without generating a doorway page each -- and the `also`
   list below is exactly that promise being kept.

The duplication risk here is between HUBS, not between towns: five pages
all saying "we deliver across regional Queensland" would collapse into
each other. So each hub leads on its region's actual economy and the
housing that economy produced.
"""

REGIONS = [
    dict(
        slug='capricorn-coast', name='Capricorn Coast',
        parent='central-queensland',
        towns=['rockhampton', 'gracemere', 'yeppoon', 'emu-park'],
        also=['Zilzie', 'Lammermoor', 'Rosslyn', 'Keppel Sands', 'Mount Morgan',
              'Bouldercombe', 'Mount Chalmers'],
        hero='why-we-do-this.jpg',
        heroalt='A coastal kitchen with a stone island and pale cabinetry.',
        title='Architectural Kitchens Capricorn Coast | Rockhampton to Yeppoon',
        desc='Architectural kitchens across the Capricorn Coast — Rockhampton, Gracemere, '
             'Yeppoon and Emu Park. Intelligently priced. From $%s.',
        h1='Architectural kitchens,<br>across the Capricorn Coast.',
        lede='One region, two climates, and a kitchen specified to handle both.',
        body=[
            ('Forty kilometres changes what a kitchen has to survive',
             ["The Capricorn Coast is unusually compressed. Rockhampton sits inland on the "
              "Fitzroy, hot and dry enough that the summer is famous for it. Yeppoon and Emu "
              "Park are forty minutes east, on the water, where salt is a permanent condition "
              "rather than a seasonal one.",
              "That short distance changes the failure mode. Inland, an ageing kitchen fails at "
              "the surfaces — heat, water, thirty years of use. On the coast it fails at the "
              "metal first: hinges, runners and fixings give up long before the doors look "
              "tired.",
              "The specification here is set for the harder of the two. Blum CLIP top BLUMOTION "
              "hinges and TANDEMBOX antaro runners are standard rather than an upgrade, and "
              "benchtops are quartz and granite with no laminate or timber — the two surfaces "
              "most likely to lift where humidity is constant."]),
            ('Queenslanders inland, holiday houses on the water',
             ["Rockhampton and Gracemere run to high-set Queenslanders and newer estate housing; "
              "the coastal strip runs to beach houses, holiday lets and downsizers. What they "
              "share is rooms that fixed-module cabinetry fits badly — older houses because they "
              "have moved, newer ones because the builder chose the modules and not the room.",
              "Cutting every carcass to the dimension you enter is the answer to both. A "
              "2 380 mm wall gets 2 380 mm of cabinetry rather than two standard modules and a "
              "filler strip."]),
        ],
        faqs=[
            ("Which Capricorn Coast towns do you deliver to?",
             "Rockhampton, Gracemere, Yeppoon and Emu Park have their own pages, and we deliver "
             "across the whole coast including Zilzie, Lammermoor, Rosslyn, Keppel Sands, Mount "
             "Morgan and the surrounding district. Everything ships direct from our base."),
            ("Does the hardware handle the salt on the coastal strip?",
             "Blum hinges and runners are standard on every cabinet, which is what most quotes "
             "treat as a paid upgrade. Salt air is still salt air — rinse exterior hardware "
             "occasionally and keep extraction running — but the moving parts start from a far "
             "better baseline."),
            ("Is Rockhampton on your delivery run?",
             "Yes, and it is the route much of Central Queensland is served through. That is why "
             "the surrounding towns are straightforward rather than exceptional."),
        ],
    ),
    dict(
        slug='bowen-basin', name='Bowen Basin',
        parent='central-queensland',
        towns=['moranbah', 'blackwater', 'dysart', 'clermont'],
        also=['Middlemount', 'Tieri', 'Glenden', 'Coppabella', 'Nebo',
              'Collinsville', 'Capella'],
        hero='compact.jpg',
        heroalt='A hard-wearing kitchen with durable hardware and a stone benchtop.',
        title='Architectural Kitchens Bowen Basin | Mining Towns | BILT Studio',
        desc='Architectural kitchens across the Bowen Basin — Moranbah, Dysart, Blackwater and '
             'Clermont. Investment-grade specification. From $%s.',
        h1='Architectural kitchens,<br>across the Bowen Basin.',
        lede='Towns built in a decade, so their kitchens come due together — and nobody local is free to do them.',
        body=[
            ('A housing stock with no gradual history',
             ["Most regions accumulate housing over a century. The Bowen Basin did not. Moranbah, "
              "Dysart, Middlemount, Tieri and Glenden were purpose-built within roughly a decade "
              "of each other to house workforces for specific mines, to a small number of "
              "designs.",
              "The consequence is unusual and useful: the kitchens age in cohorts. Across the "
              "corridor an enormous number of them are originals or a single 1990s replacement, "
              "sitting at the same point on the same curve — layout still sound, carcasses "
              "generally fine, hardware finished.",
              "That makes replacement-in-footprint the highest-value renovation available here. "
              "Keep the plumbing and the layout, replace the cabinetry with carcasses cut to the "
              "actual room, and specify hardware that outlasts the next few tenancies."]),
            ('The constraint is availability, not money',
             ["When coal is busy the sector absorbs nearly every available tradesperson at rates "
              "a domestic kitchen cannot match. The quote is reasonable, the work would be good, "
              "and the earliest start is months out.",
              "Cut-to-size does not remove the installer, but it removes the cabinetmaker's "
              "workshop time, which is the long part of that queue. Cabinetry arrives cut, "
              "labelled and flat-packed with a cut list and setout drawings, so fitting is work a "
              "competent carpenter can do in days.",
              "It also arrives complete. Out here a missing part is a week, not an afternoon, so "
              "hardware, doors and benchtop come in the same consignment."]),
        ],
        faqs=[
            ("Which Bowen Basin towns do you deliver to?",
             "Moranbah, Dysart, Blackwater and Clermont have their own pages, and we deliver "
             "across the corridor including Middlemount, Tieri, Glenden, Coppabella, Nebo, "
             "Capella and Collinsville. Everything ships direct from our base."),
            ("Is this suitable for investment and company housing?",
             "It is the most common use in the region. Blum hardware standard and stone "
             "benchtops only is the specification chosen to survive turnover, and the 2 400 mm "
             "Compact range starts at $4,590 complete."),
            ("Can I order for multiple properties?",
             "Yes. The trade account gives wholesale pricing for multi-dwelling fitouts — it "
             "needs a short business questionnaire and is approved before trade pricing becomes "
             "visible."),
            ("Who installs it if every trade is booked out?",
             "The cabinetry needs no cabinet-making skill to assemble and fit, and arrives with "
             "a cut list and setout drawings. Plumbing and electrical still need licensed "
             "trades."),
        ],
    ),
    dict(
        slug='central-highlands', name='Central Highlands and Central West',
        parent='central-queensland',
        towns=['emerald', 'longreach'],
        also=['Springsure', 'Rolleston', 'Comet', 'Bluff', 'Sapphire', 'Rubyvale',
              'Anakie', 'Barcaldine', 'Blackall', 'Ilfracombe', 'Winton', 'Aramac',
              'Jericho', 'Tambo', 'Alpha'],
        hero='tiny-home.jpg',
        heroalt='A well-organised kitchen with tall cabinetry and a stone benchtop.',
        title='Architectural Kitchens Central Highlands & Central West Queensland',
        desc='Architectural kitchens for the Central Highlands and Central West — Emerald, '
             'Longreach and the districts between. From $%s.',
        h1='Architectural kitchens,<br>inland Queensland.',
        lede='The further west you go, the better buying flat gets. That is not a slogan; it is freight.',
        body=[
            ('Three economies, one road',
             ["Head west from Emerald and the country changes character twice. Around Emerald "
              "itself the economy is coal and irrigated agriculture, with the Fairbairn Dam "
              "supporting cotton and citrus that would otherwise be impossible. North of that "
              "sit the gemfields — Sapphire, Rubyvale and Anakie — and beyond them the grazing "
              "country that runs out to Barcaldine, Blackall and Longreach.",
              "What they share is distance from anywhere that sells a kitchen. Emerald is roughly "
              "270 km from Rockhampton; Longreach is roughly 700. A cabinetmaker quoting from the "
              "coast prices that trip in, usually twice, because a measure visit has to precede "
              "an install.",
              "Buying cut-to-size removes most of those trips. The measuring is yours, done once "
              "with a tape. The pricing happens on screen. And the cabinetry travels flat, which "
              "is a far more efficient thing to freight than assembled carcasses full of air."]),
            ('Heat and dry, not humidity',
             ["Inland Queensland fails a kitchen differently to the coast. There is no salt and "
              "far less humidity; instead there is sustained heat and the movement it causes in "
              "anything that is not dimensionally stable.",
              "Quartz and granite handle that without complaint, which is why they are the only "
              "benchtops offered. And Blum hinges and runners matter more out here rather than "
              "less — a replacement part is a freight order, not a trip to the hardware shop."]),
        ],
        faqs=[
            ("How far west do you deliver?",
             "Emerald and Longreach have their own pages, and we deliver across the Central "
             "Highlands and Central West including Springsure, Rolleston, Comet, Bluff, the "
             "gemfields at Sapphire, Rubyvale and Anakie, and out through Barcaldine, Blackall, "
             "Ilfracombe and Winton. Everything ships direct from our base."),
            ("Is freight prohibitive that far out?",
             "Flat-packed panels travel considerably better than assembled cabinets, which is "
             "why the format suits long runs. Freight is quoted per order once one of our team "
             "has checked your 3D plan by hand, so the figure reflects your actual address and "
             "the kitchen you actually drew."),
            ("Do I have to travel to a showroom?",
             "No, and inland that is the whole point. You draw the room, the price updates as "
             "you draw, and you get the cut list before you pay."),
            ("How accurate do my measurements need to be?",
             "Accurate enough to matter. Measure each wall at several heights, use the smallest "
             "figure, and check the diagonals for square. Every carcass is cut to your numbers, "
             "so the numbers are doing real work."),
        ],
    ),
    dict(
        slug='gladstone-region', name='Gladstone Region and Dawson Valley',
        parent='central-queensland',
        towns=['gladstone', 'tannum-sands', 'biloela'],
        also=['Boyne Island', 'Calliope', 'Miriam Vale', 'Agnes Water', 'Seventeen Seventy',
              'Moura', 'Theodore', 'Wowan', 'Taroom', 'Wandoan', 'Baralaba'],
        hero='compact.jpg',
        heroalt='A durable kitchen run with flat-panel doors and a stone benchtop.',
        title='Architectural Kitchens Gladstone Region & Dawson Valley | BILT Studio',
        desc='Architectural kitchens across the Gladstone region and Dawson Valley — Gladstone, '
             'Tannum Sands, Biloela and the Callide. From $%s.',
        h1='Architectural kitchens,<br>Gladstone and the Dawson.',
        lede='Heavy industry on the coast, agriculture inland, and two completely different kitchen briefs.',
        body=[
            ('An industrial port and a farming valley, an hour apart',
             ["Gladstone runs on the port — alumina, the Boyne smelter, LNG on Curtis Island — "
              "and its housing market moves with that industrial workforce rather than with "
              "lifestyle buyers. A large share of the kitchens replaced there each year go into "
              "investment properties and worker accommodation.",
              "Drive inland to the Callide and Dawson valleys and the economy changes completely: "
              "Biloela, Moura and Theodore are agriculture and coal, with power generation at "
              "Callide, and the housing is owner-occupied farming and small-town stock rather "
              "than investor-held.",
              "Those are opposite briefs. An investor needs a rentable standard at a known number "
              "and no surprises. A farming family is renovating a kitchen they will use for "
              "twenty years and want it to hold a lot and last."]),
            ('The one thing both want is the number, first',
             ["What unites the region is impatience with the quote cycle. Whether the kitchen is "
              "a yield calculation or a twenty-year decision, a figure that takes three weeks and "
              "then moves is how the project dies.",
              "Every cabinet prices as a line item as you draw, complete kitchens start at "
              "$4,490, and the cut list is yours before you pay. There is no showroom "
              "appointment and no sales visit anywhere in that."]),
        ],
        faqs=[
            ("Which towns does this cover?",
             "Gladstone, Tannum Sands and Biloela have their own pages, and we deliver across "
             "the region including Boyne Island, Calliope, Miriam Vale, Agnes Water and 1770, "
             "and inland through Moura, Theodore, Wowan, Baralaba, Taroom and Wandoan."),
            ("Is this suitable for an investment property?",
             "It is one of the most common uses in Gladstone. Blum hardware is standard rather "
             "than an upgrade and benchtops are quartz or granite only, which is the "
             "specification that survives tenants."),
            ("Can you handle a farmhouse kitchen with serious storage?",
             "Yes. Drawers instead of base cupboards, corner pull-outs so the dead corner is "
             "usable, and a pantry lift for high storage. Configure it in the planner and watch "
             "the price move as you do."),
        ],
    ),
    dict(
        slug='mackay-whitsunday', name='Mackay and the Whitsundays',
        parent='queensland',
        towns=['mackay', 'sarina', 'airlie-beach'],
        also=['Walkerston', 'Marian', 'Mirani', 'Eton', 'Proserpine', 'Cannonvale',
              'Bowen', 'Collinsville'],
        hero='why-we-do-this.jpg',
        heroalt='A bright kitchen with a stone island and pale cabinetry.',
        title='Architectural Kitchens Mackay & Whitsundays | BILT Studio',
        desc='Architectural kitchens across Mackay and the Whitsundays — Mackay, Sarina, '
             'Airlie Beach and the Pioneer Valley. From $%s.',
        h1='Architectural kitchens,<br>Mackay and the Whitsundays.',
        lede='Sugar, coal and tourism in one region — three markets, one specification.',
        body=[
            ('Australia’s sugar capital, servicing Australia’s coal basin, next to its reef',
             ["Few regions carry three unrelated economies this close together. Mackay and the "
              "Pioneer Valley are the centre of Australian sugar production, with mills and cane "
              "country running through Walkerston, Marian, Mirani and Sarina. Mackay is "
              "simultaneously the service city for the Bowen Basin, an hour or two inland. And "
              "an hour north, Airlie Beach and Proserpine run almost entirely on Whitsunday "
              "tourism.",
              "Each produces a different kitchen. Cane-country housing is older timber homes with "
              "the usual Queenslander geometry. Mining-services housing is rental stock that "
              "turns over with the coal cycle. Tourism housing is short-stay that has to "
              "photograph well and survive guests.",
              "What does not change is the climate. This is a humid, cyclone-exposed coast, which "
              "is why benchtops are quartz and granite with no laminate or timber, and why Blum "
              "hinges and runners are standard rather than optional — metal and unsealed edges "
              "are what fail here first."]),
            ('Trades follow the mines, which leaves everyone else waiting',
             ["When the resource sector is busy it draws tradespeople inland at rates a domestic "
              "kitchen cannot compete with, and the coastal towns feel it as a waiting list.",
              "There is no workshop queue for cut-to-size cabinetry. You draw it, price it and "
              "order it the same day, and it arrives flat-packed with a cut list and setout "
              "drawings a competent carpenter can work straight from."]),
        ],
        faqs=[
            ("Which towns does this cover?",
             "Mackay, Sarina and Airlie Beach have their own pages, and we deliver across the "
             "region including Walkerston, Marian, Mirani, Eton, Proserpine, Cannonvale, Bowen "
             "and Collinsville. Everything ships direct from our base."),
            ("Will it cope with the humidity and cyclone season?",
             "Benchtops are quartz and granite only, with no laminate or timber, because those "
             "are the surfaces that swell and lift when damp is constant. Blum hinges and "
             "runners are standard, which is the part that corrodes first."),
            ("Is this suitable for a holiday letting property?",
             "Yes, and it is a common use around Airlie Beach and Cannonvale. The specification "
             "survives guest turnover and the curated palette still photographs like a designed "
             "kitchen."),
        ],
    ),
]
