# -*- coding: utf-8 -*-
"""Bowen Basin and Central Highlands mining-corridor towns.

SCORING NOTE (brief sec.6 and sec.40)
These four earned pages. The ones that did not -- Middlemount, Tieri,
Glenden, Coppabella, Capella, Springsure, Bluff, Comet, Rolleston,
Baralaba -- are covered inside the regional hubs instead. Under about
2,000 people the search demand cannot support a page that is genuinely
different from its neighbour, and a page that is not genuinely different
is a doorway page.

THE DIFFERENTIATION PROBLEM, AND HOW IT IS SOLVED HERE
Mining towns are the hardest set to write without duplication: they
share purpose-built housing, boom-bust rentals and a trades shortage.
Writing that three times would produce exactly the near-identical pages
Google demotes. So each page leads on something only true of that town:

  Moranbah   the company-housing legacy and the rental-yield maths
  Blackwater the oldest of them, so the stock is oldest and due first
  Clermont   NOT a purpose-built mining town at all -- an 1860s
             goldfields town that was physically relocated uphill after
             the 1916 flood. Completely different housing.
  Dysart     one employer, two hours from a city, so everything has
             to arrive on the same truck
"""

CITIES_MINING = [
    dict(
        slug='moranbah', name='Moranbah', region='Bowen Basin', state='queensland',
        blurb='A town built for a mine, where most kitchens are company-era originals and the maths is rental yield.',
        hero='compact.jpg',
        heroalt='A hard-wearing kitchen with flat-panel doors and a stone benchtop.',
        title='Architectural Kitchens Moranbah | Bowen Basin | BILT Studio',
        desc='Architectural kitchens for Moranbah and the Bowen Basin, intelligently priced. '
             'Investment-grade specification, shipped direct. From $%s.',
        h1='Architectural kitchens<br>for Moranbah.',
        lede='Priced on the page, before you commit — which matters more when the kitchen is an investment decision than a taste one.',
        body=[
            ('A town built in one go, so its kitchens age in one go',
             ["Moranbah did not grow the way most towns do. It was established in the early "
              "1970s to house the workforce for the Peak Downs mine, and a large share of its "
              "housing went up inside a couple of decades to a small number of designs.",
              "That has an unusual consequence: the housing stock ages in cohorts. A great many "
              "Moranbah kitchens are either originals or a single 1990s replacement, which puts "
              "them all at the same point of the same curve — layout still sound, carcasses "
              "generally fine, hinges dropped, drawers no longer running, laminate lifting at "
              "the edges.",
              "That is the cheapest kind of kitchen to fix properly. Keep the plumbing and the "
              "layout, replace the cabinetry with carcasses cut to the room you actually have, "
              "and specify hardware that will not need doing again in five years."]),
            ('Here the kitchen is a yield calculation',
             ["Moranbah has one of the most investor-weighted housing markets in Queensland, and "
              "rents move with the coal cycle rather than with the wider property market. An "
              "owner refurbishing between tenancies is not building a dream kitchen; they are "
              "hitting a rentable standard without over-capitalising, and they need the number "
              "before they start because the number decides whether the job happens.",
              "That is the part the industry handles worst. A conventional quote arrives days "
              "after a site visit and can move. Here the price updates as you draw and the "
              "figure on screen is the figure — with the 2 400 mm Compact range at $4,590 "
              "complete.",
              "The specification does the rest of the work. Blum CLIP top BLUMOTION hinges and "
              "TANDEMBOX antaro runners are standard rather than an upgrade, and benchtops are "
              "quartz or granite with no laminate. Those are the parts that decide whether a "
              "kitchen still works after several tenancies."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Moranbah?",
             "Yes, to Moranbah and across the Bowen Basin. Everything ships direct from our "
             "base, flat-packed, which travels considerably better over that distance than "
             "assembled cabinets."),
            ("Is this suitable for an investment property?",
             "It is one of the most common uses here. Blum hardware is standard rather than an "
             "upgrade and benchtops are quartz or granite only, which is the specification that "
             "survives tenant turnover. The 2 400 mm Compact range starts at $4,590 complete."),
            ("Can I order kitchens for several properties?",
             "Yes. If you are fitting out more than one dwelling, the trade account gives "
             "wholesale pricing — it needs a short business questionnaire and is approved before "
             "trade pricing becomes visible."),
            ("Who installs it if local trades are booked out?",
             "The cabinetry needs no cabinet-making skill to assemble and fit — it arrives flat "
             "with a cut list, setout drawings and all hardware, so a competent handyman or "
             "carpenter can do it. Plumbing and electrical still need licensed trades."),
        ],
    ),
    dict(
        slug='blackwater', name='Blackwater', region='Central Highlands', state='queensland',
        blurb='The oldest of the coal towns, which means its kitchens came due first.',
        hero='granny-flat.jpg',
        heroalt='A replaced kitchen run with pale cabinetry and a stone benchtop.',
        title='Architectural Kitchens Blackwater | Central Highlands | BILT Studio',
        desc='Architectural kitchens for Blackwater and the Central Highlands, intelligently '
             'priced. Shipped direct, no showroom trip. From $%s.',
        h1='Architectural kitchens<br>for Blackwater.',
        lede='No trip to Emerald or Rockhampton to be told a number. Draw the room and see it.',
        body=[
            ('Blackwater has been a coal town longer than most, and it shows in the housing',
             ["Blackwater expanded through the 1960s and 70s, earlier than most of the Bowen "
              "Basin towns, and it has carried the title of Queensland\'s coal capital for a long "
              "time. Being first means its housing stock is the oldest in the corridor.",
              "A kitchen installed in the 1970s and refreshed once in the 1990s is now on its "
              "third decade of hard use. The failure pattern is consistent: sound carcasses, "
              "dead hardware, and a benchtop that has taken thirty years of heat and water.",
              "Replacing cabinetry inside the existing footprint — same plumbing, same layout, "
              "better everything — is the highest-value renovation available to those houses, "
              "and cutting each carcass to the measured dimension is what makes it fit a room "
              "that has moved a little over fifty years."]),
            ('The nearest showroom is a round trip',
             ["Blackwater sits between Emerald and Rockhampton, which means the nearest kitchen "
              "showroom is a day out rather than an errand. A conventional custom kitchen wants "
              "you to make that trip at least once, and then wants a measure visit priced from "
              "wherever the cabinetmaker is based.",
              "None of that is anyone\'s fault; it is what distance does to a job built around "
              "site visits. Buying cut-to-size removes most of them. The measuring is yours, "
              "done once with a tape; the pricing happens on screen; and the cabinetry ships "
              "direct, flat-packed."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Blackwater?",
             "Yes, to Blackwater and across the Central Highlands. Everything ships direct from "
             "our base."),
            ("Do I have to travel to Emerald or Rockhampton?",
             "No. You draw the room in the planner, the price updates as you draw, and you get "
             "the cut list before you pay. There is no measure-and-quote visit to schedule."),
            ("Will it fit a house built in the 1970s?",
             "That is the case cutting to size handles best. Fifty-year-old houses move, and a "
             "wall that is no longer square does not have to be absorbed by filler panels when "
             "every carcass is made to the dimensions you enter. Measure each wall at several "
             "heights and use the smallest figure."),
            ("What is the cheapest complete kitchen?",
             "Complete kitchens start at $4,490. The 2 400 mm Compact range is $4,590 including "
             "carcasses, doors, Blum hardware and a quartz or granite benchtop."),
        ],
    ),
    dict(
        slug='clermont', name='Clermont', region='Isaac Region', state='queensland',
        blurb='Not a purpose-built mining town — an 1860s goldfields town that was moved uphill, with the housing to match.',
        hero='why-we-do-this.jpg',
        heroalt='A considered kitchen in an older timber home, stone benchtop and pale cabinetry.',
        title='Architectural Kitchens Clermont | Isaac Region | BILT Studio',
        desc='Architectural kitchens for Clermont, intelligently priced. Cut to suit older '
             'timber homes and grazing properties. From $%s.',
        h1='Architectural kitchens<br>for Clermont.',
        lede='Older houses, odd rooms, and cabinetry cut to what you actually measured.',
        body=[
            ('Clermont is the outlier in the coal corridor',
             ["Every other town on this corridor was built in one go, for one mine, in living "
                 "memory. Clermont was not. It began as a goldfields settlement in the 1860s, "
                 "which makes it one of the oldest inland towns in tropical Queensland, and after "
                 "the catastrophic 1916 flood a substantial part of it was physically relocated "
                 "to higher ground.",
              "The result is a housing stock nothing like Moranbah\'s or Dysart\'s: older timber "
                 "homes, buildings that have been moved, additions made across a century, and "
                 "grazing properties on the surrounding land alongside the mining workforce.",
              "Those are rooms where standard-module cabinetry lands badly. Walls are rarely "
                 "square, floors have a fall in them, and openings sit where a century of "
                 "additions left them. Cutting every carcass to the measured dimension is the "
                 "difference between cabinetry that fits and a run of filler panels."]),
            ('Two economies, two briefs',
             ["Clermont serves both coal and cattle, and they want different things. A mining "
                 "household or an investor wants durability and a known number. A grazing family "
                 "is usually renovating a homestead kitchen that has to work hard, be generous "
                 "with storage, and last decades rather than tenancies.",
              "Both are served by the same specification: Blum hinges and runners as standard, "
                 "quartz or granite benchtops with no laminate, and a price you can see before "
                 "committing. What differs is the layout, and that is the part you control in "
                 "the planner."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Clermont?",
             "Yes, to Clermont and across the Isaac region. Everything ships direct from our "
             "base, flat-packed."),
            ("Will it work in an old timber home?",
             "That is what cutting to size is for. Older Clermont houses have been added to and "
             "in some cases relocated, so square rooms are the exception. Every carcass is made "
             "to the dimensions you enter, so the gaps that would otherwise hide behind filler "
             "panels do not exist."),
            ("Can you do a homestead kitchen with serious storage?",
             "Yes. Drawers instead of base cupboards, corner pull-outs so the dead corner is "
             "usable, and a pantry lift for high storage. You can configure all of it in the "
             "planner and watch the price move as you do."),
            ("How long does delivery take out here?",
             "Freight is quoted per order once one of our team has checked your 3D plan by hand, "
             "so the answer reflects your actual address and the kitchen you actually drew."),
        ],
    ),
    dict(
        slug='dysart', name='Dysart', region='Bowen Basin', state='queensland',
        blurb='A small town on a long roster, where the constraint is not money — it is finding anyone free to do the work.',
        hero='compact.jpg',
        heroalt='A practical kitchen run with durable hardware and a stone benchtop.',
        title='Architectural Kitchens Dysart | Bowen Basin | BILT Studio',
        desc='Architectural kitchens for Dysart and the Bowen Basin, intelligently priced. '
             'No workshop queue, shipped direct. From $%s.',
        h1='Architectural kitchens<br>for Dysart.',
        lede='No cabinetmaker’s queue to join. The cabinetry is cut to your numbers and shipped flat.',
        body=[
            ('One employer, one road, and everything arrives on a truck',
             ["Dysart was established in 1973 to serve Norwich Park, and it has never been "
              "anything other than a mine town. Around three thousand people, one dominant "
              "employer, and a population that expands and contracts with rosters and coal "
              "prices rather than with anything local.",
              "That produces a housing market unlike anywhere else. Company-era houses built to "
              "a handful of designs, periods where dwellings sit empty and periods where nothing "
              "is available, and owners who need to refurbish quickly when the cycle turns "
              "rather than when it suits them.",
              "It also produces a supply problem that is not really about trades. Dysart is "
              "roughly two hours from Mackay, so there is no browsing a showroom and no "
              "picking up a forgotten part on the way home. Whatever the job needs has to be on "
              "the truck when it arrives.",
              "That is the argument for a kitchen that ships complete: cut to your dimensions, "
              "labelled, with a cut list, setout drawings and every piece of hardware in the "
              "same delivery. Nothing to source locally, and nothing to wait on."]),
            ('Built for rosters and rentals',
             ["Dysart housing is heavily weighted toward rental and company accommodation, and "
              "kitchens in that use fail at the moving parts first — hinges that drop, runners "
              "that stop tracking. Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners "
              "are standard here rather than a paid upgrade for exactly that reason.",
              "Benchtops are quartz and granite only. There is no laminate option, which removes "
              "the surface most likely to lift at the edges in a kitchen nobody is babying."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Dysart?",
             "Yes, to Dysart and across the Bowen Basin. Everything ships direct from our base."),
            ("Does everything come in one delivery?",
             "Yes — cabinetry cut to your dimensions, labelled, with a cut list, setout drawings "
             "and all hardware in the same consignment. That matters two hours from the nearest "
             "city, where a missing part is a week rather than an afternoon."),
            ("Can I fit it myself?",
             "The cabinetry, generally yes. It needs no cabinet-making skill to assemble and "
             "fit, and the setout drawings show exactly where services land. Plumbing and "
             "electrical need licensed trades."),
            ("Is it suitable for company or rental housing?",
             "Yes, and it is a common use here. Blum hardware standard and stone benchtops only "
             "is the specification chosen to survive turnover."),
        ],
    ),
]
