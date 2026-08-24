# -*- coding: utf-8 -*-
"""Build-type pages: tiny home, granny flat, Class 1a, modular.

WHY THESE EXIST
Someone reading their council's Class 1a requirements is mid-build and
has not bought a kitchen yet. That is high-intent traffic, and nobody in
this category targets it -- the competition all writes "our beautiful
kitchens" pages and waits for people to search for kitchens.

WHAT THESE PAGES MUST NOT DO
Give building advice as though it were authoritative. Classification and
approval are decided by a building certifier and the local council, and
the rules vary between councils and change between NCC editions. So
every page:
  - explains the classification in general terms only (the class
    definitions themselves are stable; specific clauses are not),
  - says plainly and more than once that the certifier and council are
    the authority,
  - and then talks about the part we actually know, which is the
    cabinetry.

One correction the industry gets wrong constantly, and which is the
single most useful thing on the tiny-home page: a tiny home ON WHEELS is
generally a registrable vehicle rather than a building, so it is not
Class 1a at all. On a fixed foundation it usually is. Those are two
completely different approval paths and people conflate them.
"""

DISCLAIMER = (
    'BILT Studio supplies cabinetry. We are not building certifiers and this is '
    'general orientation, not approval advice — classification, siting and '
    'compliance are decided by your building certifier and local council, and '
    'requirements differ between councils.')

USECASES = [
    dict(
        slug='tiny-home', name='Tiny home',
        nav='Tiny homes',
        blurb='On wheels or on a slab — two different approval paths, and two different kitchens.',
        hero='tiny-home.jpg',
        heroalt='A compact tiny-home kitchen with full-height cabinetry and a stone benchtop.',
        title='Tiny Home Kitchens | Architectural Cabinetry | BILT Studio',
        desc='Cut-to-size kitchens for tiny homes, on wheels or on a fixed foundation. '
             'Complete 3000 mm kitchens from $7,500.',
        h1='Architectural kitchens<br>for tiny homes.',
        lede='Every millimetre has to earn its place, and on wheels every kilogram does too.',
        body=[
            ('First, the distinction almost everyone gets wrong',
             ["Whether your tiny home is a <strong>building</strong> or a "
              "<strong>vehicle</strong> decides nearly everything that follows, and the two "
              "paths have almost nothing in common.",
              "A tiny home <strong>on wheels</strong> is generally treated as a registrable "
              "vehicle or caravan rather than a building. It is usually not classified under "
              "the National Construction Code at all, so it is not a Class 1a dwelling — "
              "instead you are dealing with vehicle registration, towing mass, and your "
              "council's rules on how long something may be occupied on a site.",
              "A tiny home on a <strong>fixed foundation</strong> is a building. If it is a "
              "self-contained dwelling it will usually be Class 1a, with the same approval "
              "path as any small house: building approval, a certifier, and licensed trades "
              "for plumbing and electrical.",
              "People conflate these constantly, and it matters here because it changes what "
              "the kitchen has to be."]),
            ('On wheels, weight is a design constraint',
             ["If the home is towable, everything you put in it counts against an aggregate "
              "trailer mass you cannot exceed. A kitchen is one of the heaviest fitouts in the "
              "building, and stone is the heaviest thing in the kitchen.",
              "This is worth working out before you choose a benchtop rather than after. A "
              "20 mm quartz slab is roughly 45–50 kg per square metre; over a 3-metre run that "
              "is a meaningful share of your payload. Our benchtops are quartz and granite, "
              "which are excellent surfaces and are not light — so on a towable build, plan the "
              "benchtop weight into the mass calculation with your builder or engineer.",
              "On a fixed foundation none of that applies and stone is simply the better "
              "surface."]),
            ('A 3000 mm kitchen that is a real kitchen',
             ["The Tiny home range is a complete 3000 mm kitchen at $7,500 — carcasses, doors, "
              "Blum hardware and a stone benchtop. Not a kitchenette.",
              "In a footprint this size the internal fittings do more work than the layout "
              "does. Deep drawers instead of base cupboards, a corner pull-out so the dead "
              "corner is usable, and a pantry lift so high storage comes back down to bench "
              "height. All of it runs on Blum TANDEMBOX antaro runners as standard.",
              "And because every carcass is cut to the dimensions you enter, a 2 840 mm wall "
              "gets 2 840 mm of cabinetry. In a house this small there is no room to lose "
              "60 mm to a filler panel."]),
        ],
        faqs=[
            ("Is a tiny home a Class 1a building?",
             "It depends entirely on whether it is fixed or towable. On a fixed foundation a "
             "self-contained tiny home is usually Class 1a. On wheels it is generally treated "
             "as a registrable vehicle rather than a building, so it falls outside the NCC "
             "classes and is governed by vehicle rules plus your council's occupancy rules. "
             "Confirm which applies with your building certifier before you commit to a build."),
            ("How much does a tiny home kitchen cost?",
             "The 3000 mm Tiny home range starts at $7,500 and is a complete kitchen — "
             "carcasses, doors, Blum hardware and a quartz or granite benchtop. Smaller "
             "footprints can use the 2400 mm Compact range from $4,590."),
            ("Is a stone benchtop too heavy for a towable tiny home?",
             "It needs to be planned for rather than assumed. Stone is roughly 45–50 kg per "
             "square metre at 20 mm, which is a real share of a towable build's payload. Work "
             "the benchtop weight into your mass calculation with your builder or engineer "
             "before ordering."),
            ("Can I fit it myself?",
             "The cabinetry, generally yes — it arrives flat-packed with a cut list and all "
             "hardware and needs no cabinet-making skill. Plumbing, electrical and any gas work "
             "must be done by the relevant licensed trades regardless of how small the dwelling "
             "is."),
        ],
    ),
    dict(
        slug='granny-flat', name='Granny flat',
        nav='Granny flats',
        blurb='Secondary dwellings are usually Class 1a — a real house, at a quarter of the size.',
        hero='granny-flat.jpg',
        heroalt='A complete granny flat kitchen with pale cabinetry and a stone benchtop.',
        title='Granny Flat Kitchens | Secondary Dwelling Cabinetry | BILT Studio',
        desc='Cut-to-size kitchens for granny flats and secondary dwellings. '
             'Complete 2700 mm kitchens from $5,500.',
        h1='Architectural kitchens<br>for granny flats.',
        lede='A complete kitchen, not a kitchenette — because a secondary dwelling has to work like a home.',
        body=[
            ('A secondary dwelling is a house, in code terms',
             ["A granny flat that is self-contained — its own kitchen, bathroom and living "
              "space — is generally a Class 1a dwelling under the National Construction Code, "
              "the same class as the main house. It is not a shed and it is not an extension.",
              "That has consequences worth knowing before you plan the kitchen. Class 1a "
              "brings requirements around ventilation, lighting, power and plumbing, and your "
              "kitchen has to satisfy them the same way the main house's does — mechanical "
              "exhaust or an openable window, adequate circuits, and compliant plumbing to the "
              "sink.",
              "Separately from the code, your council decides whether you can build one at "
              "all: maximum floor area, setbacks, car parking, and in many places who is "
              "allowed to occupy it. Those rules vary considerably between councils, so start "
              "there rather than with the kitchen."]),
            ('The number is what decides whether it gets built',
             ["A granny flat is a discretionary project. It competes with everything else the "
              "property needs, and in our experience it is not usually cost that kills one — it "
              "is not knowing the cost early enough to commit.",
              "The 2 700 mm Granny flat range is $5,500 complete: carcasses, doors, Blum "
              "hardware and a quartz or granite benchtop. You can see that number, and the "
              "number for any variation on it, before speaking to anyone.",
              "It is deliberately a full kitchen rather than a stripped-back one. If the space "
              "is going to be rented, or lived in by a parent for years, a kitchenette is a "
              "false economy — and if you are building to Class 1a anyway, you have already "
              "committed to the plumbing and the circuits."]),
        ],
        faqs=[
            ("Is a granny flat a Class 1a building?",
             "A self-contained secondary dwelling is generally Class 1a under the National "
             "Construction Code — the same class as a house. Your building certifier confirms "
             "the classification for your specific build."),
            ("Do I need council approval for a granny flat?",
             "Almost always. Councils set rules on maximum floor area, setbacks, parking and "
             "sometimes who may occupy the dwelling, and these differ significantly between "
             "councils. Sort the approval path before ordering cabinetry."),
            ("What does a granny flat kitchen cost?",
             "The 2 700 mm Granny flat range starts at $5,500 and is a complete kitchen — "
             "carcasses, doors, Blum hardware and a quartz or granite benchtop. Marble is "
             "available as a paid upgrade."),
            ("Can the kitchen be delivered before the build is finished?",
             "Freight is quoted per order once one of our team has checked your 3D plan by "
             "hand, so timing can be discussed then. Most people take delivery once the space "
             "is lined and the floor is down."),
        ],
    ),
    dict(
        slug='class-1a', name='Class 1a',
        nav='Class 1a builds',
        blurb='What the classification means, and where the kitchen fits in the build program.',
        hero='why-we-do-this.jpg',
        heroalt='A finished kitchen in a new Class 1a home, stone island and pale cabinetry.',
        title='Class 1a Kitchens | New Builds & Renovations | BILT Studio',
        desc='Kitchens for Class 1a dwellings — new builds, extensions and renovations. '
             'Cut-to-size cabinetry with setout drawings. From $4,490.',
        h1='Architectural kitchens<br>for Class 1a builds.',
        lede='If you are reading your council’s Class 1a requirements, you will need one of these too.',
        body=[
            ('What Class 1a actually covers',
             ["The National Construction Code sorts every building into a class, and "
              "<strong>Class 1a</strong> is the residential one most people end up in: a single "
              "dwelling. That means a detached house, or one of a group of attached dwellings "
              "— a townhouse or row house — separated from its neighbours by fire-resisting "
              "walls.",
              "The neighbouring classes are worth knowing because people land in the wrong one:",
              "<strong>Class 1b</strong> covers small boarding houses and guest houses, or "
              "several dwellings on one allotment used for short-term accommodation. "
              "<strong>Class 10a</strong> is non-habitable — a shed, garage or carport — which "
              "is why you cannot simply put a kitchen in a shed and call it a dwelling. "
              "<strong>Class 2</strong> is apartments: two or more sole-occupancy units in one "
              "building.",
              "Which one applies to your project is a decision for your building certifier, not "
              "for a cabinetry supplier. Get it settled early, because it drives the approval "
              "path, the energy-efficiency requirements and the inspections."]),
            ('Where a kitchen touches the code',
             ["Most of what governs a kitchen is not the NCC itself but the standards it calls "
                 "up, and the licensed trades who work to them: plumbing to the sink and any "
                 "dishwasher, the electrical circuits behind the appliances, and gas if you are "
                 "running a gas cooktop. Those are licensed trades in every state, on any size "
                 "of dwelling.",
              "The requirements that most often catch people out are ventilation — a kitchen "
              "generally needs mechanical exhaust or an adequate openable window — and "
              "clearances around a cooktop, which come from the appliance manufacturer's "
              "specification as much as from any code.",
              "None of that is affected by choosing cut-to-size cabinetry. What changes is that "
              "you know the exact dimensions of every carcass before anything is built, which "
              "is genuinely useful when the room still only exists on a drawing."]),
            ('Buying a kitchen while the house is still on paper',
             ["A new build is the one situation where you can specify the kitchen precisely, "
                 "because the room has not been built yet and the dimensions are whatever the "
                 "plan says they are.",
              "The planner gives you a full cut list and setout, so your builder can see exactly "
              "what is coming and where the services need to land. And the price does not move "
              "between drawing and delivery — which matters on a build, where the kitchen is one "
              "of the last line items and the budget is usually tight by the time it arrives."]),
        ],
        faqs=[
            ("What is a Class 1a building?",
             "Under the National Construction Code, Class 1a is a single dwelling: a detached "
             "house, or one of a group of attached dwellings such as a townhouse or row house "
             "separated by fire-resisting walls. Your building certifier confirms the "
             "classification for your project."),
            ("Is a granny flat Class 1a?",
             "A self-contained secondary dwelling generally is. A non-habitable structure like "
             "a shed or garage is Class 10a, which is why a kitchen alone does not turn one "
             "into a dwelling."),
            ("Do you supply setout drawings for the builder?",
             "Yes. The planner produces a full cut list and setout so your builder or certifier "
             "can see every cabinet dimension and where services need to land, before anything "
             "is delivered."),
            ("Can I order the kitchen before the room is built?",
             "That is the ideal case — the dimensions come off the plan, and cut-to-size means "
             "the cabinetry is made to those numbers rather than to standard modules. Confirm "
             "the as-built dimensions before manufacture, since walls move slightly during "
             "construction."),
            ("Do I need licensed trades?",
             "Yes, for plumbing, electrical and any gas work, on any size of dwelling. The "
             "cabinetry itself needs no cabinet-making skill to assemble and fit."),
        ],
    ),
    dict(
        slug='modular', name='Modular and prefab',
        nav='Modular builds',
        blurb='Built in a factory, where a 6 mm discrepancy is a problem you cannot scribe out on site.',
        hero='compact.jpg',
        heroalt='A precisely fitted kitchen run in a modular home, flat-panel doors and stone benchtop.',
        title='Modular & Prefab Kitchens | Architectural Cabinetry | BILT Studio',
        desc='Cut-to-size kitchens for modular and prefabricated homes. Exact dimensions, '
             'flat-packed to the factory or the site. From $%s.',
        h1='Architectural kitchens<br>for modular builds.',
        lede='Factory tolerances are unforgiving. Cabinetry cut to the drawing is the point.',
        body=[
            ('A modular home is still a Class 1a dwelling',
             ["Building off site changes how a house is made, not what it has to comply with. A "
              "modular or prefabricated dwelling is generally still Class 1a under the National "
              "Construction Code, and still needs certification, approval and licensed trades — "
              "it is simply that much of the inspection happens in a factory rather than on a "
              "block.",
              "What genuinely does change is tolerance. On a conventional site build a "
              "cabinetmaker scribes cabinetry to the wall it meets. In a factory the modules "
              "are built to a drawing and the fitout goes in against dimensions that were "
              "decided weeks earlier, then the whole thing gets craned onto a truck.",
              "In that environment, cabinetry that arrives in standard module widths is a "
              "problem. Every filler panel is a compromise agreed in advance, and every "
              "millimetre of drift is one nobody can adjust for later."]),
            ('Flat-packed suits a production line',
             ["Panels cut to the drawing, labelled, and delivered flat are far easier to "
              "schedule into a factory than assembled carcasses. They stack, they store, and "
              "they do not occupy a bay of floor space waiting for their module to come up the "
              "line.",
              "They also travel. A modular build frequently ends up a long way from where it "
              "was made, and flat panels survive that considerably better than boxes of air "
              "with doors hung on them.",
              "We can ship to the factory or to the final site — freight is quoted per order "
              "once one of our team has checked the 3D plan by hand, so which of those makes "
              "sense can be worked out then."]),
        ],
        faqs=[
            ("Is a modular home Class 1a?",
             "A modular or prefabricated single dwelling is generally Class 1a under the "
             "National Construction Code, the same as a site-built house. Building off site "
             "changes the process, not the classification. Your certifier confirms it."),
            ("Can you deliver to a factory rather than a building site?",
             "Yes. Freight is quoted per order once a team member has checked your 3D plan, so "
             "delivery to a fabrication facility or to the final site can both be arranged."),
            ("How exact are the dimensions?",
             "Every carcass is cut to the dimensions you enter, which is the whole reason this "
             "suits modular. You get a full cut list and setout before manufacture so the "
             "factory can check it against the module drawings."),
            ("Do you supply for multiple units?",
             "Yes. If you are fitting out more than one dwelling, the trade account gives "
             "wholesale pricing — it needs a short business questionnaire and is approved "
             "before trade pricing becomes visible."),
        ],
    ),
]
