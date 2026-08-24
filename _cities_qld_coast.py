# -*- coding: utf-8 -*-
"""Capricorn Coast, Gladstone satellites, Mackay/Whitsunday and Central West.

Scored in (brief sec.40): each of these has either a distinct economy or a
distinct housing stock that its neighbour does not share.

Scored out, covered by regional hubs instead: Zilzie, Lammermoor,
Rosslyn, Keppel Sands, Mount Morgan, Calliope, Miriam Vale, Agnes Water,
Walkerston, Marian, Mirani, Eton, Wowan, Theodore, Taroom, Wandoan,
Barcaldine, Blackall, Tambo, Aramac, Muttaburra, Jericho, Ilfracombe,
Winton. Under roughly 2,000 people the demand cannot support a page that
is genuinely different from the town next to it.
"""

CITIES_COAST = [
    dict(
        slug='gracemere', name='Gracemere', region='Capricorn Coast', state='queensland',
        blurb='Rockhampton’s growth suburb — new estates, builder-grade kitchens, and blocks big enough for a second dwelling.',
        hero='granny-flat.jpg',
        heroalt='A kitchen in a newer estate home with pale cabinetry and a stone benchtop.',
        title='Architectural Kitchens Gracemere | BILT Studio',
        desc='Architectural kitchens for Gracemere, intelligently priced. New-estate upgrades '
             'and granny flat kitchens. From $%s.',
        h1='Architectural kitchens<br>for Gracemere.',
        lede='A better kitchen in the footprint you already have — priced before you commit.',
        body=[
            ('Gracemere grew fast, and fast growth leaves a signature',
             ["Gracemere has absorbed a large share of Rockhampton\'s residential growth, and the "
              "estates that went up through the 2000s and 2010s came with builder-grade "
              "kitchens: sensible layouts, standard module widths, and the cheapest hardware "
              "that would pass handover.",
              "Those kitchens do not fail structurally. They fail at the moving parts, and they "
              "date. Ten to fifteen years on, the carcasses are usually fine while the hinges "
              "have dropped, the drawers drag and the doors look their age.",
              "Replacing cabinetry in the existing footprint is the best-value kitchen there is: "
              "keep the plumbing and the layout that already works, and put in carcasses cut to "
              "the room with hardware specified to outlast the next owner."]),
            ('Block sizes make the second dwelling realistic',
             ["Gracemere blocks are generous by south-east standards, which puts a granny flat or "
              "a self-contained extension within reach for family or for rental income — and "
              "Rockhampton\'s rental market gives that a real return.",
              "The 2 700 mm Granny flat range is sized for exactly that at $5,500 complete, "
              "including a stone benchtop. Because it is a discretionary project, seeing the "
              "whole number before starting is usually what decides whether it starts."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Gracemere?",
             "Yes. Gracemere sits alongside Rockhampton, which is a named destination on our "
             "delivery run. Everything ships direct from our base."),
            ("Can I replace an estate kitchen without moving the plumbing?",
             "Yes, and it is the cheapest worthwhile version of the job. Keep the sink and "
             "appliances where they are, enter your real dimensions, and the cabinetry is cut to "
             "the existing footprint."),
            ("What does a granny flat kitchen cost?",
             "The 2 700 mm Granny flat range starts at $5,500 and is a complete kitchen — "
             "carcasses, doors, Blum hardware and a quartz or granite benchtop."),
            ("Is builder-grade cabinetry worth replacing?",
             "Usually the carcasses are sound and the hardware is what has failed. Cut-to-size "
             "replaces the whole run to your exact dimensions with Blum hinges and runners as "
             "standard, which is the part that decides how long the next one lasts."),
        ],
    ),
    dict(
        slug='emu-park', name='Emu Park', region='Capricorn Coast', state='queensland',
        blurb='A small coastal town of holiday houses and downsizers, where salt gets at the hardware first.',
        hero='why-we-do-this.jpg',
        heroalt='A bright coastal kitchen with a stone benchtop and pale cabinetry.',
        title='Architectural Kitchens Emu Park | Capricorn Coast | BILT Studio',
        desc='Architectural kitchens for Emu Park and the Capricorn Coast, intelligently priced. '
             'Coastal-grade hardware as standard. From $%s.',
        h1='Architectural kitchens<br>for Emu Park.',
        lede='Coastal kitchens fail at the hinges long before they fail at the doors.',
        body=[
            ('The beach house problem',
             ["Emu Park is a small coastal town whose housing skews to holiday houses, weekenders "
              "and people who have downsized to the coast. Many of those homes are used "
              "intermittently, which sounds gentle on a kitchen and is not.",
              "A house that sits closed up for weeks at a time, metres from the water, gives "
              "salt and humidity an uninterrupted run at the metal in the kitchen — hinges, "
              "runners, fixings. Unbranded hardware is where a quote hides its margin, and it is "
              "why a coastal kitchen can look perfectly fine and stop working properly within a "
              "few seasons.",
              "Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners are standard on every "
              "cabinet here rather than an upgrade line. That does not make a kitchen immortal "
              "three streets from the beach, but it starts the clock from a much better place."]),
            ('Small footprints, used hard for short bursts',
             ["Beach houses and holiday lets tend to have compact kitchens that get used "
              "intensively for a fortnight and then not at all. The design answer is storage "
              "that works without a full walk-around: deep drawers instead of base cupboards, a "
              "corner pull-out, and a benchtop that shrugs off summer.",
              "Quartz and granite are standard, with no timber or laminate option — the two "
              "surfaces most likely to swell or lift where humidity is constant."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Emu Park?",
             "Yes, to Emu Park, Zilzie, Yeppoon and across the Capricorn Coast. Everything ships "
             "direct from our base."),
            ("Does the hardware handle salt air?",
             "Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners are standard, which is "
             "what most quotes treat as a paid upgrade. Salt air is still salt air — rinse "
             "exterior hardware occasionally and keep extraction running — but the moving parts "
             "start from a far better baseline."),
            ("What benchtop suits a beach house?",
             "Quartz and granite are standard and neither moves in humidity. There is "
             "deliberately no timber or laminate option. Marble is available as a paid upgrade."),
            ("Is this suitable for a holiday let?",
             "Yes. The specification is chosen to survive guest turnover, and the 2 400 mm "
             "Compact range starts at $4,590 complete."),
        ],
    ),
    dict(
        slug='tannum-sands', name='Tannum Sands', region='Gladstone Region', state='queensland',
        blurb='Where Gladstone’s industry earns and its families live — owner-occupier renovation, not investor refits.',
        hero='why-we-do-this.jpg',
        heroalt='A family kitchen with an island bench, stone benchtop and pale cabinetry.',
        title='Architectural Kitchens Tannum Sands | Boyne Island | BILT Studio',
        desc='Architectural kitchens for Tannum Sands and Boyne Island, intelligently priced. '
             'Family renovations, coastal specification. From $%s.',
        h1='Architectural kitchens<br>for Tannum Sands.',
        lede='The other side of the Gladstone market: houses people intend to stay in.',
        body=[
            ('Tannum Sands is where Gladstone goes home',
             ["Gladstone\'s kitchen market is usually described in investor terms, and for much "
              "of the city that is accurate. Tannum Sands and Boyne Island are the exception. "
              "This is the residential coast of the region — families on industry wages, in "
              "houses they intend to keep.",
              "That changes the brief entirely. An owner-occupier is not calculating yield; they "
              "are renovating a room they will cook in for fifteen years, and they care about "
              "how it looks and how it works far more than about the cheapest compliant "
              "specification.",
              "It is also why the price transparency lands differently here. The point is not "
              "that it is cheap — it is that a considered, stone-and-Blum kitchen turns out to "
              "cost less than the quote you were bracing for."]),
            ('Coastal, and built across four decades',
             ["Housing here runs from 1980s brick through to recent estate builds, with the "
                 "constant being proximity to the water. Humidity and salt air are the design "
                 "input: benchtops are quartz and granite with no laminate or timber, and Blum "
                 "hinges and runners are standard rather than an upgrade.",
              "The older stock has the usual out-of-square walls that come with age, which is "
                 "where cutting each carcass to the measured dimension earns its keep instead of "
                 "hiding the difference behind a filler panel."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Tannum Sands and Boyne Island?",
             "Yes, and across the wider Gladstone region including Calliope. Everything ships "
             "direct from our base."),
            ("What does a kitchen cost?",
             "Complete kitchens start at $4,490. The three ranges are $4,590 for a 2 400 mm run, "
             "$5,500 for 2 700 mm and $7,500 for 3 000 mm, each including carcasses, doors, Blum "
             "hardware and a stone benchtop. The price in the planner is the price."),
            ("Will it handle the coastal humidity?",
             "Benchtops are quartz and granite only, with no timber or laminate, because those "
             "are the surfaces that move in humidity. Blum hinges and runners are standard, "
             "which is the part that corrodes first near the water."),
            ("Can I keep my existing layout?",
             "Yes, and it is the cheapest way to a much better kitchen. Keep the plumbing and "
             "appliances where they are and the new cabinetry is cut to the existing footprint."),
        ],
    ),
    dict(
        slug='airlie-beach', name='Airlie Beach', region='Whitsunday', state='queensland',
        blurb='Short-stay capital of the coast — kitchens that photograph well, survive guests, and cannot close the property for a month.',
        hero='compact.jpg',
        heroalt='A compact, well-finished kitchen in a holiday apartment with a stone benchtop.',
        title='Architectural Kitchens Airlie Beach | Whitsunday | BILT Studio',
        desc='Architectural kitchens for Airlie Beach and the Whitsundays, intelligently priced. '
             'Built for short-stay turnover. From $%s.',
        h1='Architectural kitchens<br>for Airlie Beach.',
        lede='A kitchen guests photograph, on a specification that survives them.',
        body=[
            ('Short-stay is the whole market here',
             ["Airlie Beach and Cannonvale run on tourism, and an unusually large share of the "
              "housing is holiday letting, apartments and managed short-stay. A kitchen in that "
              "use has three jobs at once: it has to look good in a listing photograph, survive "
              "people who did not choose it and are not looking after it, and be replaceable "
              "without closing the property for a month.",
              "Those pull in different directions, and the usual compromise is a kitchen that "
              "photographs well and falls apart. The specification here is the opposite way "
              "round: Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners as standard, "
              "quartz or granite benchtops, no laminate — with a curated material palette so it "
              "still looks like a designed room rather than a rental fitout.",
              "The third requirement is where flat-packing genuinely helps. Panels arrive cut, "
              "labelled and flat, so the disruptive part of the job is measured in days rather "
              "than weeks of trades coming and going."]),
            ('Apartments, and everything that comes with them',
             ["Much of the accommodation stock is attached, which means a body corporate, "
              "approved contractor hours, a booked service lift and a tight window to get "
              "materials in and rubbish out.",
              "Flat-packed cabinetry fits a service lift and goes through a standard apartment "
              "door. Pre-assembled carcasses are boxes of air that frequently do not — an "
              "advantage that has nothing to do with price and everything to do with whether the "
              "job is possible at all."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Airlie Beach?",
             "Yes, to Airlie Beach, Cannonvale, Proserpine and across the Whitsundays. "
             "Everything ships direct from our base."),
            ("Is this suitable for a holiday letting property?",
             "It is one of the most common uses. Blum hardware standard and stone benchtops only "
             "is the specification that survives guest turnover, and the curated palette means "
             "it still photographs like a designed kitchen."),
            ("Will it fit in an apartment lift?",
             "That is one of the real advantages of flat-packing. Panels travel flat and fit "
             "through standard doorways and service lifts that pre-assembled carcasses often "
             "cannot clear. Check your building's lift dimensions and booking rules first."),
            ("Do I need body corporate approval?",
             "Usually yes for any work affecting common property, waterproofing or noise, and "
             "most schemes set contractor hours. Ask your body corporate manager early — it is "
             "the step that most often delays an apartment kitchen."),
        ],
    ),
    dict(
        slug='sarina', name='Sarina', region='Mackay Region', state='queensland',
        blurb='Cane country south of Mackay — older Queenslanders, working households, and a long way down the list for a cabinetmaker.',
        hero='granny-flat.jpg',
        heroalt='A hard-working family kitchen with generous storage and a stone benchtop.',
        title='Architectural Kitchens Sarina | Mackay Region | BILT Studio',
        desc='Architectural kitchens for Sarina and the Mackay region, intelligently priced. '
             'Cut to suit older timber homes. From $%s.',
        h1='Architectural kitchens<br>for Sarina.',
        lede='Cut to the room you measured, in a town that is nobody’s first callout.',
        body=[
            ('Sugar, not coal — and a different housing stock for it',
             ["Sarina sits in cane country south of Mackay, and its economy runs on sugar "
              "milling and agriculture alongside the mining workforce that commutes inland. Its "
              "housing reflects a longer, steadier history than the purpose-built mining towns "
              "west of here: older high-set timber homes, workers\' cottages, and farmhouses on "
              "the surrounding land.",
              "Those are rooms with the familiar Queenslander problems — a kitchen that was a "
              "closed service room at the back of the house, walls that are no longer plumb, and "
              "a window you cannot move cheaply. Fixed-module cabinetry lands badly in them; "
              "cutting each carcass to the measured dimension does not."]),
            ('Close to Mackay, but not close enough',
             ["Being forty minutes from Mackay is close enough that people assume it is easy and "
                 "far enough that it is not. Trades are drawn to the larger jobs in town, and "
                 "when the resource sector is busy a domestic kitchen in Sarina waits.",
              "There is no workshop queue for cut-to-size cabinetry. You draw it, price it and "
                 "order it the same day, and what arrives is flat-packed with a cut list and "
                 "setout drawings that a competent carpenter can work straight from."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Sarina?",
             "Yes, to Sarina and across the Mackay region. Everything ships direct from our "
             "base."),
            ("Will it suit an older timber home?",
             "That is the case cutting to size handles best. Older houses move, so walls are "
             "rarely square — and because every carcass is made to the dimensions you enter, the "
             "gaps that would otherwise be hidden behind filler panels do not exist."),
            ("Can a local carpenter install it?",
             "Yes. It arrives flat with a cut list, setout drawings and all hardware, and needs "
             "no cabinet-making skill to assemble and fit. Plumbing and electrical need licensed "
             "trades."),
            ("Will the benchtop cope with the humidity?",
             "Quartz and granite are standard and neither moves in humidity. There is no timber "
             "or laminate option, which is deliberate for this climate."),
        ],
    ),
    dict(
        slug='longreach', name='Longreach', region='Central West', state='queensland',
        blurb='Six hundred kilometres inland, where freight and scarcity decide what a kitchen really costs.',
        hero='tiny-home.jpg',
        heroalt='A well-organised kitchen with tall cabinetry and a stone benchtop.',
        title='Architectural Kitchens Longreach | Central West | BILT Studio',
        desc='Architectural kitchens for Longreach and the Central West, intelligently priced. '
             'Flat-packed for the distance. From $%s.',
        h1='Architectural kitchens<br>for Longreach.',
        lede='Flat panels travel. Assembled boxes of air do not. Out here that is most of the argument.',
        body=[
            ('Distance is the price, before anyone mentions cabinetry',
             ["Longreach is roughly 700 km inland from Rockhampton, and that distance is the "
              "dominant cost in any renovation out here. A cabinetmaker quoting from the coast "
              "has to price the trip — usually twice, since a measure visit precedes an install "
              "— and the local trade pool is small enough that timing is a genuine constraint "
              "rather than a preference.",
              "Buying cut-to-size removes most of those trips. The measuring is yours, done once "
              "with a tape. The pricing happens on screen instead of in a showroom seven hours "
              "away. And the cabinetry travels flat, which is a far more efficient thing to "
              "freight over that distance than assembled carcasses full of air.",
              "This is the case where the format earns its keep most obviously. The further you "
              "are from a capital city, the better buying this way gets — not worse."]),
            ('Homesteads and heat',
             ["Central West housing runs to older timber homes, homestead kitchens and worker "
              "accommodation on stations, with a hot, dry climate rather than a humid one. That "
              "changes the failure mode: timber movement and heat rather than swelling.",
              "Quartz and granite handle both without complaint, and Blum hinges and runners are "
              "standard rather than an upgrade — which matters more, not less, somewhere a "
              "replacement part is a freight order rather than a trip to the hardware shop."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Longreach?",
             "Yes, to Longreach and across the Central West. Everything ships direct from our "
             "base, flat-packed, which travels considerably better over that distance than "
             "assembled cabinets."),
            ("Do I have to travel to a showroom?",
             "No, and out here that is the point. You draw the room in the planner, the price "
             "updates as you draw, and you get the cut list before you pay. There is no "
             "measure-and-quote visit to schedule."),
            ("How accurate do my measurements need to be?",
             "Accurate enough to matter. Measure each wall at several heights and use the "
             "smallest figure, and check the diagonals to see how far out of square the room is. "
             "Because every carcass is cut to your numbers, the numbers are doing real work."),
            ("What happens if something arrives damaged this far out?",
             "Flat-packed panels travel far better than assembled cabinets, which is part of why "
             "the format suits long freight runs. Freight is quoted per order after one of our "
             "team checks your 3D plan by hand."),
        ],
    ),
]
