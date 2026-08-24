# -*- coding: utf-8 -*-
"""Comparison pages (brief sec.13-19).

THE RULES THIS FILE OBEYS, AND WHY THEY BITE HERE
sec.17  Never compare a complete kitchen against a cabinet-only price.
sec.18  Never attack. Explain the trade-off and who each option suits.
        Non-negotiable: DO NOT INVENT COMPETITOR PRICES.

That last one is the hard constraint, and it is the reason these pages
are built the way they are. I have no verified current IKEA or Kaboodle
pricing, so no competitor dollar figure appears anywhere below. What
does appear is STRUCTURE, taken from the vendors' own published product
information and verifiable by anyone in thirty seconds:

  IKEA METOD    frames, doors, hinges, legs, plinths, cover panels and
                worktops are each sold separately; installation is a
                referral service (excluded in SA)
  Kaboodle      fixed widths (450/600/800/900/1000 mm); doors sold
                separately; soft-close slides sold separately

That structure is a more useful comparison than a price anyway, because
it is what people actually get wrong: a cabinet frame price is not a
kitchen price. So instead of asserting a total, these pages hand the
reader the checklist to build their own -- which is honest, and more
persuasive than a number they would be right to distrust.
"""

# The line items a real quote has to contain. Used to show a reader how
# to total any option properly rather than comparing headline prices.
PROJECT_COSTS = [
    ('Cabinet carcasses', 'The boxes themselves.'),
    ('Doors and drawer fronts', 'Frequently priced separately from the carcass.'),
    ('Hinges and drawer runners',
     'Check whether soft-close is included or an upgrade — it is the single most '
     'common hidden line.'),
    ('Legs, plinths and kickboards', 'Often separate.'),
    ('End and filler panels',
     'Fixed-width systems need these wherever a run does not land on a module.'),
    ('Benchtop', 'Usually a separate purchase and a separate trade.'),
    ('Sink, tap and appliances', 'Separate in every system, including ours.'),
    ('Delivery / freight', 'Varies enormously outside a capital city.'),
    ('Assembly', 'Your time, or a paid service.'),
    ('Installation', 'A carpenter or cabinet fitter.'),
    ('Plumbing and electrical', 'Licensed trades, non-negotiable, in every case.'),
    ('Removal and waste', 'Old kitchen out, rubbish gone.'),
]

COMPARISONS = [
    dict(
        slug='ikea',
        name='IKEA',
        nav='BILT vs IKEA',
        blurb='Both flat-packed. One is a component system you assemble into a kitchen; the other is a kitchen.',
        hero='compact.jpg',
        heroalt='A resolved kitchen with flat-panel doors and a stone benchtop.',
        title='BILT vs IKEA Kitchens | An Honest Comparison | BILT Studio',
        desc='How BILT compares to an IKEA METOD kitchen — fixed modules versus cut-to-size, '
             'what each includes, and how to total a project properly.',
        h1='BILT and IKEA,<br>compared honestly.',
        lede='IKEA builds excellent kitchens. It is also a component system, and that is the difference that matters.',
        body=[
            ('The structural difference: modules versus millimetres',
             ["IKEA\'s METOD system is built from fixed cabinet widths. You lay those modules "
              "along your wall until you run out of wall, and whatever is left over is closed "
              "with a filler or cover panel. That is not a flaw — it is what makes the system "
              "affordable, consistent and available off the shelf worldwide.",
              "BILT works the other way round. You enter the room\'s real dimensions and every "
              "carcass is cut to suit, so a 2 380 mm wall gets 2 380 mm of cabinetry. There is "
              "no filler strip because there is nothing to fill.",
              "Which is better depends entirely on your room. A square room with generous walls "
              "loses very little to standard modules. An older Queenslander with a chamfered "
              "corner and a window you cannot move loses a great deal."]),
            ('What is in the price, and what is not',
             ["This is where most comparisons go wrong, and it is worth being precise rather "
              "than rhetorical.",
              "An IKEA METOD <em>cabinet frame</em> is sold as a frame. According to IKEA\'s own "
              "product information, doors, hinges, legs, plinths, shelves, cover panels and "
              "worktops are each sold separately. Installation is offered as a referral service "
              "rather than performed by IKEA, and is not available in South Australia.",
              "None of that is hidden — it is stated plainly on every product page. But it does "
              "mean a frame price is not a kitchen price, and comparing one against a complete "
              "kitchen is comparing two different things.",
              "A BILT range price includes carcasses, doors, Blum CLIP top BLUMOTION hinges and "
              "TANDEMBOX antaro runners, and a quartz or granite benchtop. Complete kitchens "
              "start at $4,490. Sink, tap, appliances and installation are separate, as they are "
              "everywhere."]),
            ('Soft-close is the line to check',
             ["If you compare only one specification, make it the hardware. Hinges and runners "
              "are what fail first in any kitchen, and they are also where the headline price is "
              "usually protected.",
              "Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners are standard on every "
              "BILT cabinet. Not an upgrade, not a line item. Whatever you are comparing against, "
              "check what brand of hardware is included at the quoted price and whether "
              "soft-close costs extra."]),
            ('Who each one actually suits',
             ["<strong>IKEA suits you if</strong> your room is reasonably regular, you enjoy the "
              "DIY, you want the enormous ecosystem of internal fittings and accessories, you "
              "are near a store, and you are comfortable coordinating the pieces into a finished "
              "kitchen yourself.",
              "<strong>BILT suits you if</strong> your room is awkward, you want a resolved "
              "architectural look without assembling it from a catalogue, you want the whole "
              "number before committing, you want premium hardware included rather than "
              "specified, or you live a long way from a capital city.",
              "There is no universally right answer here, and anyone telling you otherwise is "
              "selling."]),
        ],
        faqs=[
            ("Is BILT cheaper than IKEA?",
             "That is not a question anyone can answer honestly in one number, because the two "
             "are priced differently — IKEA sells components, BILT sells a complete kitchen. "
             "Total both properly using the checklist on this page: carcasses, doors, hinges and "
             "runners, legs and plinths, filler panels, benchtop, delivery, assembly and "
             "installation. Then compare."),
            ("What does IKEA sell separately?",
             "According to IKEA's own product information, METOD cabinet frames are sold as "
             "frames, with doors, hinges, legs, plinths, shelves, cover panels and worktops each "
             "purchased separately. Installation is a referral service and is not offered in "
             "South Australia."),
            ("What is included in a BILT price?",
             "Carcasses, doors, Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners, and "
             "a quartz or granite benchtop. Complete kitchens start at $4,490. Sink, tap, "
             "appliances, plumbing, electrical and installation are separate."),
            ("Can BILT fit a room IKEA cannot?",
             "It is less about cannot and more about how much you lose. Fixed modules handle a "
             "square room well and an irregular one with filler panels. Because every BILT "
             "carcass is cut to the dimensions you enter, an awkward wall does not cost you "
             "cabinetry — which matters most in older houses."),
        ],
    ),
    dict(
        slug='kaboodle',
        name='Kaboodle',
        nav='BILT vs Kaboodle',
        blurb='Bunnings’ flat-pack range — same fixed-module logic, with soft-close as an extra.',
        hero='granny-flat.jpg',
        heroalt='A neat kitchen run with flat-panel doors and a stone benchtop.',
        title='BILT vs Kaboodle Kitchens | An Honest Comparison | BILT Studio',
        desc='How BILT compares to Kaboodle from Bunnings — fixed widths versus cut-to-size, '
             'what soft-close costs, and how to total a project properly.',
        h1='BILT and Kaboodle,<br>compared honestly.',
        lede='Kaboodle’s advantage is availability. Ours is that the cabinetry is made to your room.',
        body=[
            ('Fixed widths, and what they cost you',
             ["Kaboodle is Bunnings\' flat-pack kitchen range, built around fixed cabinet widths "
              "— 450, 600, 800, 900 and 1000 mm — with a 3D planner to lay them out. It is "
              "genuinely convenient: it is in every Bunnings, you can see and touch it, and you "
              "can walk out with it.",
              "The trade-off is the same one every modular system makes. Your wall is whatever "
              "length it is, and the modules are whatever length they are, so the difference "
              "becomes a filler panel.",
              "On a generous, square wall that costs you very little. On a 2 380 mm wall in an "
              "older house it costs you a visible strip of nothing where cabinetry should be. "
              "BILT cuts every carcass to the dimension you enter instead."]),
            ('Check the slides',
             ["Kaboodle drawer cabinets can be fitted with standard, push-to-open or soft-close "
              "slides, and the slides are sold separately. Doors are also purchased separately "
              "from the cabinets.",
              "Again, none of that is concealed — it is on the product pages. But it changes the "
              "arithmetic, because soft-close is the thing most people assume is included and "
              "most notice the absence of.",
              "Every BILT cabinet ships with Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro "
              "runners as standard. Soft-close is not a decision you have to make or a line you "
              "have to add."]),
            ('Who each one actually suits',
             ["<strong>Kaboodle suits you if</strong> you want it today, you like being able to "
              "inspect the product in person before buying, your room is regular, and you are "
              "comfortable specifying the slides, doors and panels yourself.",
              "<strong>BILT suits you if</strong> you want the cabinetry made to your room rather "
              "than your room worked around the cabinetry, you want premium hardware and a stone "
              "benchtop included rather than added, and you would rather see the complete number "
              "on screen than assemble it from a parts list."]),
        ],
        faqs=[
            ("Is Kaboodle cheaper than BILT?",
             "The two price differently, so a headline comparison is misleading. Kaboodle sells "
             "cabinets with doors and slides purchased separately; a BILT range price is a "
             "complete kitchen including Blum hardware and a stone benchtop. Total both using "
             "the checklist on this page before deciding."),
            ("Does Kaboodle include soft-close?",
             "Kaboodle drawer cabinets can be fitted with standard, push-to-open or soft-close "
             "slides, and the slides are sold separately. Blum soft-close hinges and runners are "
             "standard on every BILT cabinet."),
            ("What sizes does Kaboodle come in?",
             "Fixed widths including 450, 600, 800, 900 and 1000 mm. BILT cuts every carcass to "
             "the dimensions you enter, which is the core difference between the two."),
            ("Can I see BILT in person before buying?",
             "There is no showroom — that is deliberate, and it is part of why the pricing works "
             "the way it does. What you get instead is the full cut list and setout before you "
             "pay anything."),
        ],
    ),
    dict(
        slug='cabinetmaker',
        name='a local cabinetmaker',
        nav='BILT vs a cabinetmaker',
        blurb='The genuine alternative for most people — and the one comparison where BILT is not always the answer.',
        hero='why-we-do-this.jpg',
        heroalt='A finished architectural kitchen with a stone island and considered detailing.',
        title='BILT vs a Local Cabinetmaker | An Honest Comparison | BILT Studio',
        desc='How a cut-to-size kitchen package compares to a custom cabinetmaker — design, '
             'lead time, cost structure, and when a cabinetmaker is the better call.',
        h1='BILT and a local<br>cabinetmaker, compared.',
        lede='This is the comparison where the answer is genuinely sometimes “use the cabinetmaker”.',
        body=[
            ('Two different products, not two prices for one product',
             ["A cabinetmaker designs around you from nothing. They measure, they draw, they "
              "solve the specific problems of your specific room, and they build it. You are "
              "buying design time, workshop time and a person who takes responsibility for the "
              "result.",
              "BILT is a resolved design you configure to your room. The material palette, the "
              "hardware and the construction are already decided; what you control is the layout "
              "and the dimensions. You are not buying design time, which is most of why the "
              "number is what it is.",
              "The saving is not in the cabinetry. It is in removing the showroom, the sales "
              "visit, the design cycle and the margin those carry."]),
            ('Where a cabinetmaker genuinely wins',
             ["<strong>Anything truly bespoke.</strong> A curved island, an unusual material, "
              "joinery that continues into another room, a heritage kitchen that has to match "
              "existing detailing. A configurable system cannot do those, and pretending "
              "otherwise would waste your time.",
              "<strong>When you want one person accountable.</strong> A cabinetmaker measures, "
              "so a measuring error is theirs. With cut-to-size the measurements are yours, and "
              "that responsibility is real — it is why the planner asks you to measure at "
              "several heights and check the diagonals.",
              "<strong>When you do not want to project-manage.</strong> Someone coordinating "
              "trades, sequencing and rectification has genuine value, and it is value you pay "
              "for either way — in money or in your own hours."]),
            ('Where BILT wins',
             ["<strong>Knowing the number now.</strong> A cabinetmaker\'s quote follows a measure "
              "visit and a design conversation, and it can move. Here the price updates as you "
              "draw and the cut list is yours before you pay.",
              "<strong>Lead time.</strong> There is no workshop queue for the cabinetry. In "
              "regional Queensland, where the trades are frequently absorbed by resource work, "
              "that difference is often months rather than weeks.",
              "<strong>Distance.</strong> A cabinetmaker quoting from the coast prices the trip "
              "in, usually twice. Panels shipped flat do not care how far they travel.",
              "<strong>Hardware you can name.</strong> Blum CLIP top BLUMOTION hinges and "
              "TANDEMBOX antaro runners are standard here. Ask any quote what hardware it "
              "includes — a good cabinetmaker will answer immediately, and the answer is worth "
              "knowing."]),
        ],
        faqs=[
            ("Is a cabinetmaker better than a kitchen package?",
             "For genuinely bespoke work, yes. For a kitchen that has to fit a real room, look "
             "resolved and cost a known amount, a cut-to-size package does the same job faster "
             "and without a design cycle. They are different products rather than better and "
             "worse."),
            ("Who is responsible if the measurements are wrong?",
             "With a cabinetmaker, they measure, so it is theirs. With cut-to-size the "
             "measurements are yours. Measure each wall at several heights, use the smallest "
             "figure, and check the diagonals for square — and confirm as-built dimensions "
             "before ordering on a new build, because walls move during construction."),
            ("What should I ask a cabinetmaker to compare fairly?",
             "What hardware brand is included and whether soft-close is standard; whether the "
             "benchtop is in the quote; what the lead time is from deposit; and what happens to "
             "the price if the room measures differently to the drawing."),
            ("Do you install?",
             "No. We supply cabinetry flat-packed with a cut list, setout drawings and all "
             "hardware. Plenty of people fit it themselves, and a carpenter will be faster. "
             "Plumbing and electrical need licensed trades."),
        ],
    ),
]
