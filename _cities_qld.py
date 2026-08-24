# -*- coding: utf-8 -*-
"""Queensland city data for the location-page generator.

Same schema as TOWNS in _build_locations.py. Kept in its own module
because the list is long and the prose is the actual product -- the
template is trivial, the per-city substance is not.

THE RULE THAT GOVERNS EVERY ENTRY HERE
Google's scaled-content-abuse policy targets exactly this page type:
many location pages, one template, the place name swapped. The defence
is not clever wording, it is that each page is genuinely about its
place. So every entry below is built on something specific and
checkable about that city -- its housing stock and era, its climate, the
market that actually buys kitchens there -- and the FAQs answer what
someone in THAT city would ask.

Nothing here invents a business fact. Freight is described by the real
process (F.FREIGHT_NOTE): quoted per order after a team member checks
the 3D plan by hand.
"""

CITIES = [
    # ---------------------------------------------------------- south-east
    dict(
        slug='brisbane', name='Brisbane', region='Greater Brisbane', state='queensland',
        blurb='Character-overlay Queenslanders where the outside cannot change, so the kitchen carries the whole renovation.',
        hero='why-we-do-this.jpg',
        heroalt='A renovated kitchen with a stone island and pale cabinetry in a Brisbane home.',
        title='Flat Pack Kitchens Brisbane | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered across Brisbane. Draw your kitchen, see the price as you go. Complete kitchens from $%s.',
        h1='Flat pack kitchens,<br>delivered across Brisbane.',
        lede='Draw the room, watch the number move, and get the cut list before you pay. No showroom, no sales visit.',
        body=[
            ('In a character suburb the kitchen is where the renovation actually happens',
             ["Large parts of inner Brisbane sit under character or traditional building "
              "overlays. Paddington, Red Hill, Ashgrove, Norman Park, Annerley and their "
              "neighbours are full of pre-1947 timber-and-tin houses where what you can change "
              "outside is tightly controlled, and rightly so.",
              "The practical effect is that almost the entire renovation budget goes indoors, "
              "and the kitchen absorbs most of it. It is also the room least suited to standard "
              "cabinetry: original Queenslander kitchens were small service rooms at the back "
              "of the house, with VJ walls that are rarely plumb, floors with a fall in them, "
              "and window openings you cannot move without a development application.",
              "Cut-to-size is built for that. Every carcass is cut to the dimensions you enter, "
              "so a wall measuring 2 380 mm gets 2 380 mm of cabinetry instead of two standard "
              "modules and a filler strip apologising for the gap."]),
            ('The other Brisbane kitchen is underneath the house',
             ["Legal height under a raised Queenslander is the most common way Brisbane adds "
              "space without touching the roofline, and a dual-occupancy or a self-contained "
              "flat downstairs needs its own kitchen.",
              "The 2 700 mm Granny flat range is sized for exactly that at $5,500 — a complete "
              "kitchen rather than a stripped-back one, which matters when the space is going "
              "to be rented or lived in by family."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Brisbane?",
             "Yes, across Greater Brisbane. Everything ships direct from our base."),
            ("Will cut-to-size work in an old Queenslander with out-of-square walls?",
             "That is the case it handles best. Because every carcass is cut to the dimensions "
             "you enter rather than picked from fixed module widths, walls that are out of "
             "square do not have to be absorbed by filler panels. Measure each wall at several "
             "heights and use the smallest figure."),
            ("Do I need council approval for a new kitchen?",
             "Replacing cabinetry in the same footprint generally does not, but plumbing and "
             "electrical work needs licensed trades, and character overlays can affect anything "
             "structural or external. Check with Brisbane City Council before moving walls or "
             "windows — we supply cabinetry, not building certification."),
            ("What does a kitchen cost in Brisbane?",
             "Complete kitchens start at $4,490, and the three ranges are $4,590, $5,500 and "
             "$7,500. The price in the planner is the price — there is no quote stage and no "
             "showroom appointment."),
        ],
    ),
    dict(
        slug='gold-coast', name='Gold Coast', region='Gold Coast', state='queensland',
        blurb='Towers, body corporates and lift bookings — where getting the kitchen into the building is half the job.',
        hero='compact.jpg',
        heroalt='A compact apartment kitchen with flat-panel doors and a stone benchtop.',
        title='Flat Pack Kitchens Gold Coast | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to the Gold Coast. Apartment-friendly, priced on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered to the Gold Coast.',
        lede='Flat-packed cabinetry fits in a service lift. An assembled kitchen frequently does not.',
        body=[
            ('Apartment renovation is a logistics problem before it is a design problem',
             ["A very large share of Gold Coast housing is attached — towers along the "
              "Surfers-to-Broadbeach strip, walk-ups through Southport and Labrador, canal "
              "townhouses through Mermaid Waters and Broadbeach Waters. Renovating any of them "
              "means working around a body corporate: approved contractor hours, a booked "
              "service lift, protected common areas, and a strict window for getting materials "
              "in and rubbish out.",
              "This is where flat-packed cabinetry has a structural advantage that has nothing "
              "to do with price. Panels travel flat, fit in a service lift, and go through a "
              "standard apartment door without being turned on their edge. Pre-assembled "
              "carcasses are boxes of air that frequently do not.",
              "It also compresses the disruptive part of the job. The cabinetry arrives cut and "
              "labelled with a cut list, so the noisy work happens on site over days rather "
              "than weeks of trades coming and going past your neighbours' doors."]),
            ('Short-stay changes what a kitchen has to survive',
             ["The Gold Coast has one of the highest concentrations of short-stay and holiday "
              "letting in the country, and a holiday-let kitchen ages differently to a family "
              "one: heavy use, by people who did not choose it and are not looking after it.",
              "Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners are standard on "
              "every cabinet rather than an upgrade, and benchtops are quartz or granite with "
              "no laminate option. Those are the parts that decide whether a kitchen still "
              "shuts properly after three summers of guests."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to the Gold Coast?",
             "Yes, from Coolangatta through to Beenleigh and inland to the hinterland. "
             "Everything ships direct from our base."),
            ("Will flat pack fit in an apartment lift?",
             "That is one of its real advantages. Panels travel flat and fit through standard "
             "doorways and service lifts that pre-assembled carcasses often cannot clear. "
             "Check your building's lift dimensions and booking rules before you order."),
            ("Do I need body corporate approval?",
             "Usually yes for any work affecting common property, waterproofing or noise, and "
             "most schemes require approved contractors and set work hours. Ask your body "
             "corporate manager early — it is the step that most often delays an apartment "
             "kitchen."),
            ("Is this suitable for a short-stay or holiday-let apartment?",
             "It is a common use. Blum hardware is standard rather than an upgrade and "
             "benchtops are quartz or granite only, which is the specification that survives "
             "guest turnover. The 2 400 mm Compact range starts at $4,590."),
        ],
    ),
    dict(
        slug='sunshine-coast', name='Sunshine Coast', region='Sunshine Coast', state='queensland',
        blurb='New estates and hinterland acreage, plus salt air that goes after the hardware first.',
        hero='why-we-do-this.jpg',
        heroalt='A light coastal kitchen with stone benchtops and pendant lighting.',
        title='Flat Pack Kitchens Sunshine Coast | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered across the Sunshine Coast. Priced on the page, no quote stage. From $%s.',
        h1='Flat pack kitchens,<br>delivered to the Sunshine Coast.',
        lede='Two very different houses, one specification: coastal-grade hardware and stone, priced before you commit.',
        body=[
            ('A builder-grade kitchen in a five-year-old estate is not a design problem',
             ["The Sunshine Coast has absorbed enormous growth through Caloundra South, Baringa, "
              "Palmview and the Aura corridor, and those homes came with builder-grade "
              "kitchens: a sound layout, standard-width modules, and the cheapest hardware that "
              "would pass handover.",
              "Those kitchens fail from the inside out. The carcasses are usually fine years "
              "later; the hinges have dropped and the drawers no longer run true. Replacing "
              "cabinetry in the existing footprint — same plumbing, same layout, better "
              "everything — is the cheapest worthwhile kitchen upgrade there is, and it is "
              "exactly what cut-to-size is for."]),
            ('Then there is the hinterland, and the salt',
             ["Behind the coast, Maleny, Montville and the Blackall Range run to older timber "
              "homes and acreage, where rooms are rarely square and standard modules rarely "
              "land cleanly. Cutting to the actual dimensions solves that without a custom "
              "cabinetmaker's lead time.",
              "Everywhere within reach of the water, salt is the constraint nobody quotes for. "
              "It attacks the metal first — hinges, runners, fixings — which is why unbranded "
              "hardware in a coastal kitchen can look fine and stop working within a few "
              "seasons. Blum hinges and runners are standard here, and benchtops are quartz or "
              "granite with no timber or laminate, both of which move in humidity."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to the Sunshine Coast?",
             "Yes — Caloundra, Maroochydore, Noosa, the Aura and Palmview corridors, and the "
             "hinterland. Everything ships direct from our base."),
            ("Can I replace cabinetry without moving the plumbing?",
             "Yes, and it is the cheapest way to get a much better kitchen. Keep the sink and "
             "appliances where they are, enter your real dimensions, and the new cabinetry is "
             "cut to the existing footprint."),
            ("Does the hardware handle salt air?",
             "Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners are standard on every "
             "cabinet, which is what most quotes treat as a paid upgrade. Salt air is still "
             "salt air — rinse exterior hardware occasionally and keep extraction running — but "
             "the moving parts start from a much better baseline."),
            ("What benchtop suits a coastal home?",
             "Quartz and granite are standard and neither moves in humidity. There is no timber "
             "or laminate option, deliberately — those are the two surfaces most likely to "
             "swell or lift near the coast. Marble is available as a paid upgrade."),
        ],
    ),
    dict(
        slug='toowoomba', name='Toowoomba', region='Darling Downs', state='queensland',
        blurb='Frost, heritage brick and big blocks — the one Queensland city where winter is a design input.',
        hero='granny-flat.jpg',
        heroalt='A warm kitchen with timber-look cabinetry and a stone benchtop.',
        title='Flat Pack Kitchens Toowoomba | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Toowoomba and the Darling Downs. Priced on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered to Toowoomba.',
        lede='Draw the room, see the price, get the cut list. No trip down the range to a showroom.',
        body=[
            ('Toowoomba renovates older, heavier houses than the coast does',
             ["At around 700 metres, Toowoomba is the one substantial Queensland city with a "
              "genuine cold season — frosts through winter and a real temperature swing across "
              "the day. Its housing reflects it: solid brick, weatherboard with proper "
              "insulation, and a heritage stock through East Toowoomba and Newtown that is "
              "closer to a southern city than to Cairns.",
              "Kitchens in those houses tend to be enclosed rooms with load-bearing walls, "
              "chimney breasts, and openings in fixed positions. They are not open-plan "
              "rectangles, and standard-module cabinetry lands badly in them. Cutting each "
              "carcass to the measured dimension is the difference between cabinetry that fits "
              "the room and a run of filler panels."]),
            ('Blocks are big, so the second dwelling is common',
             ["Older Toowoomba blocks are generous by modern standards, which makes a granny "
              "flat or a converted rear space a realistic option rather than a squeeze — for "
              "ageing parents, adult children, or rental income.",
              "The 2 700 mm Granny flat range is sized for that at $5,500, complete with "
              "carcasses, doors, Blum hardware and a stone benchtop. Being able to see the "
              "whole number before committing matters more on a second dwelling than on a main "
              "kitchen, because it is a discretionary project that lives or dies on the total."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Toowoomba?",
             "Yes, to Toowoomba and across the Darling Downs. Everything ships direct from our "
             "base, so there is no trip down the range to a showroom at any point."),
            ("Do I need a cabinet maker to install it?",
             "No. It arrives flat-packed with a cut list and all hardware, and needs no "
             "cabinet-making skill to assemble and fit. Plumbing and electrical still need the "
             "relevant licensed trades."),
            ("Can you work around a chimney breast or a load-bearing wall?",
             "Yes — that is the point of cutting to size. Measure the actual openings and enter "
             "them, and the cabinetry is made to suit rather than the room being adjusted to "
             "suit standard modules."),
            ("What does a granny flat kitchen cost?",
             "The 2 700 mm Granny flat range starts at $5,500 and is complete — carcasses, "
             "doors, Blum hardware and a quartz or granite benchtop."),
        ],
    ),
    dict(
        slug='ipswich', name='Ipswich', region='Ipswich & West Moreton', state='queensland',
        blurb='Heritage workers’ cottages on one side, Ripley’s new estates on the other, and a budget that has to be known up front.',
        hero='compact.jpg',
        heroalt='A straightforward kitchen run with flat-panel doors and a stone benchtop.',
        title='Flat Pack Kitchens Ipswich | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Ipswich and West Moreton. Fixed price on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered to Ipswich.',
        lede='A price you can see before you commit, which matters most when the budget is the whole decision.',
        body=[
            ('Two housing stocks, forty years apart, in one city',
             ["Ipswich has one of the largest concentrations of pre-war housing in Queensland — "
              "workers' cottages and timber homes through Booval, Bundamba, North Ipswich and "
              "Woodend, many of them heritage-listed or in character areas. At the same time, "
              "Ripley Valley and Springfield have gone up almost entirely since 2010.",
              "They need opposite things. The older houses need cabinetry cut to walls that "
              "have moved over a century. The newer ones have square rooms and perfectly "
              "adequate layouts, but builder-grade cabinetry that is now at the age where the "
              "hinges have dropped and the finish looks tired.",
              "Cut-to-size covers both, because it is not a fixed-module product. You enter the "
              "dimensions you actually have."]),
            ('Knowing the number first is the whole point',
             ["Ipswich buys carefully. A kitchen is a discretionary project competing with a "
              "mortgage, and the reason many of them never start is not that the quote was too "
              "high — it is that the quote took three weeks to arrive and could move.",
              "There is no quote stage here. You draw the room, every cabinet is priced as a "
              "line item, and the total updates as you work. Complete kitchens start at $4,490 "
              "and you can take the cut list away before paying anything."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Ipswich?",
             "Yes, to Ipswich, Springfield, Ripley and across West Moreton. Everything ships "
             "direct from our base."),
            ("Will this work in a heritage workers' cottage?",
             "Yes, and it is a better fit than fixed-module flat pack. Century-old cottages "
             "rarely have square rooms; because every carcass is cut to the dimensions you "
             "enter, the gaps that would otherwise be hidden behind filler panels do not exist."),
            ("What is the cheapest complete kitchen?",
             "Complete kitchens start at $4,490. The 2 400 mm Compact range is $4,590 and "
             "includes carcasses, doors, Blum hardware and a quartz or granite benchtop."),
            ("Can I see the price before committing to anything?",
             "Yes — that is the entire point of the planner. Prices update per line item as you "
             "draw, and you get the cut list before you pay. There is no appointment and no "
             "sales visit."),
        ],
    ),
    dict(
        slug='logan', name='Logan', region='Logan & Redlands', state='queensland',
        blurb='High investor density and big households — kitchens that have to be durable and generous at once.',
        hero='granny-flat.jpg',
        heroalt='A practical family kitchen with generous storage and a stone benchtop.',
        title='Flat Pack Kitchens Logan | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered across Logan and Redlands. Priced on the page. From $%s.',
        h1='Flat pack kitchens,<br>delivered across Logan.',
        lede='Built for the two things Logan kitchens actually need: more storage, and hardware that survives it.',
        body=[
            ('Logan has more rental stock than almost anywhere in South East Queensland',
             ["A large share of Logan housing is investor-owned, and a rental kitchen is a "
              "different brief to an owner-occupier one. The owner needs a rentable standard "
              "without over-capitalising, and they need the number before they start, because "
              "the number decides whether the job happens at all.",
              "That is the part the industry handles worst. A conventional quote arrives days "
              "after a showroom visit and can shift depending on how the room reads. Here the "
              "price updates as you draw and the figure on screen is the figure.",
              "For durability the specification does the work: Blum CLIP top BLUMOTION hinges "
              "and TANDEMBOX antaro runners standard on every cabinet, and quartz or granite "
              "benchtops with no laminate. Those are the parts that decide whether a kitchen "
              "still works after several tenancies."]),
            ('Larger households need storage, not styling',
             ["Logan has some of the largest average household sizes in the region, often "
              "multi-generational. A kitchen serving six or eight people has a storage problem "
              "long before it has a taste problem — and standard-module cabinetry wastes space "
              "at exactly the point where it is most needed.",
              "Cutting to size means the run uses the full wall, and the internal fittings — "
              "corner pull-outs, pantry lifts, deep drawers rather than cupboards — are the "
              "difference between a kitchen that holds everything and one that does not."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Logan?",
             "Yes, across Logan and the Redlands. Everything ships direct from our base."),
            ("Is this suitable for a rental property?",
             "It is one of the most common uses. Blum hardware is standard rather than an "
             "upgrade and benchtops are quartz or granite only, which is the specification that "
             "survives tenants. The 2 400 mm Compact range starts at $4,590."),
            ("Can I order kitchens for several properties?",
             "Yes. If you are fitting out more than one dwelling, the trade account gives "
             "wholesale pricing — it needs a short business questionnaire and is approved "
             "before trade pricing becomes visible."),
            ("How do I get more storage out of the same room?",
             "Two things: cutting to size uses the full wall rather than leaving filler strips, "
             "and choosing drawers over cupboards plus corner pull-outs reaches space a "
             "standard layout wastes. You can try both in the planner and watch the price move."),
        ],
    ),
]
