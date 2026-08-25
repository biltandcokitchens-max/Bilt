# -*- coding: utf-8 -*-
"""Cabinet-type and layout pages (Tier 2).

Cabinet pages are drawn from the planner's actual product list, not
invented: base (8 products), wall (4), tall (2) and panels (3), plus the
blind corner and the drawer configurations. Every page describes
something you can actually configure and price.

Layout pages target the broad end of the market. Someone searching
"galley kitchen" is usually earlier in the decision than someone
searching "kitchens Rockhampton", which is exactly why these are worth
having: they are cheap to rank for relative to the location pages and
they all end at the planner.
"""

CABINETS = [
    dict(
        section='cabinets', sectionLabel='Cabinets', slug='base-cabinets',
        nav='Base cabinets',
        blurb='One and two door, drawer banks, sink bases and open shelving — cut to your run.',
        hero='compact.jpg',
        title='Kitchen Base Cabinets | Cut to Size | BILT Studio',
        desc='Base cabinets cut to your dimensions — 1 and 2 door, 3 and 4 drawer, drawer over '
             'door, sink base and open shelving. Blum hardware standard.',
        h1='Base cabinets,<br>cut to your run.',
        lede='The row that does the work. Eight configurations, made to the wall you actually have.',
        siblingsHeading='Other cabinet types.',
        body=[
            ('What we make',
             ["<strong>1 door</strong> and <strong>2 door</strong> for general storage. "
              "<strong>3 drawer</strong> and <strong>4 drawer</strong> banks. "
              "<strong>Drawer over door</strong>, which is the most useful single cabinet in "
              "most kitchens &mdash; a shallow drawer for utensils above a cupboard for bulk. "
              "<strong>Sink base</strong> with the back cut for plumbing. <strong>Blind corner "
              "base</strong> for the internal corner. And <strong>open base shelving</strong> "
              "where a run needs to breathe.",
              "Every one is cut to the width you enter. There is no rounding to the nearest "
              "standard module and no filler panel closing the difference."]),
            ('Drawers beat cupboards, almost always',
             ["A cupboard makes you go in after its contents; a drawer brings them out to you. "
              "In a base cabinet that difference is the whole ergonomic argument, and it is why "
              "a drawer bank costs more and is worth it.",
              "It matters most at the back. The rear third of a base cupboard is effectively "
              "storage you have to kneel to reach, which in practice means it holds whatever "
              "you have not used in two years. The same volume in drawers is usable every day.",
              "All drawers run on Blum TANDEMBOX antaro runners as standard &mdash; soft-close, "
              "carrying the load on the runner rather than the drawer base, which is what keeps "
              "a full drawer gliding rather than dragging."]),
            ('The corner is the decision that gets fudged',
             ["Every L or U-shaped kitchen has an internal corner, and it is where storage goes "
              "to die. A blind corner base gives you the volume; whether it is <em>usable</em> "
              "depends on what goes inside it.",
              "Worth planning deliberately rather than defaulting: a corner pull-out brings the "
              "contents out to the opening instead of you reaching past the return. It costs "
              "more than a shelf and it is the difference between a cupboard you use and one "
              "you forget."]),
        ],
        faqs=[
            ("What size base cabinets do you make?",
             "Whatever your run needs. Base cabinets are cut to the width you enter rather than "
             "picked from fixed module sizes, which is the core difference from chain-store "
             "flat pack."),
            ("Are the drawers soft-close?",
             "Yes, on every drawer. Blum TANDEMBOX antaro runners are standard, not an upgrade."),
            ("Can I have a sink base?",
             "Yes — a 2 door sink base with the back cut for plumbing. Take your sink's cut-out "
             "dimensions from the sink itself before you draw."),
            ("What goes in the corner?",
             "A blind corner base. Consider a corner pull-out for the interior — it is the "
             "difference between reaching past the return and having the contents come to you."),
        ],
    ),
    dict(
        section='cabinets', sectionLabel='Cabinets', slug='wall-cabinets',
        nav='Wall cabinets',
        blurb='One and two door, lift-up and open shelf — sized to your ceiling, not a catalogue.',
        hero='why-we-do-this.jpg',
        title='Kitchen Wall Cabinets | Cut to Size | BILT Studio',
        desc='Wall cabinets cut to your dimensions — 1 and 2 door, lift-up and open shelf. '
             'Blum CLIP top BLUMOTION hinges standard.',
        h1='Wall cabinets,<br>sized to your ceiling.',
        lede='Height is the variable nobody standardises well, and it is the one that decides whether the room looks finished.',
        siblingsHeading='Other cabinet types.',
        body=[
            ('What we make',
             ["<strong>1 door</strong> and <strong>2 door</strong> wall cabinets, "
              "<strong>lift-up</strong> units for above a bench or a cooktop where a swinging "
              "door is in the way, and <strong>open shelf</strong> where the run needs "
              "lightening.",
              "Cut to width and to height. That second one matters more than people expect."]),
            ('The gap above the cupboards',
             ["The strip of dead space between the top of the wall cabinets and the ceiling is "
              "the single most common thing that makes a kitchen look like it came from a "
              "catalogue. It collects dust, it cannot be reached, and it exists purely because "
              "the cabinets came in a fixed height and the ceiling did not.",
              "Cutting wall cabinets to your actual ceiling height closes it. In a room with a "
              "high ceiling you may still want a deliberate gap or a bulkhead &mdash; the point "
              "is that it becomes a decision rather than a leftover."]),
            ('Lift-ups are worth it in exactly two places',
             ["Above a cooktop, where a door swinging out at head height is genuinely "
              "hazardous, and above a bench you work at continuously, where an open door is in "
              "your face for the whole task.",
              "Everywhere else a standard door is cheaper and does the same job. Blum CLIP top "
              "BLUMOTION hinges are standard on the doors either way &mdash; soft-close, and "
              "they clip off without tools if you need to take a door down."]),
        ],
        faqs=[
            ("Can wall cabinets go to the ceiling?",
             "Yes. They are cut to the height you enter, so the dead strip above the cupboards "
             "does not have to exist. Measure your ceiling at both ends of the run — it is "
             "rarely level."),
            ("What is a lift-up cabinet for?",
             "Above a cooktop or a bench you work at constantly, where a swinging door is in "
             "the way or at head height. Elsewhere a standard door does the same job for less."),
            ("Are the hinges soft-close?",
             "Yes. Blum CLIP top BLUMOTION on every door, standard rather than an upgrade."),
            ("How high should wall cabinets sit above the bench?",
             "Commonly around 450–600 mm, but it depends on your height, the splashback and "
             "whether a rangehood or appliance sits between. Decide it before you draw, because "
             "it changes the cabinet height that fits."),
        ],
    ),
    dict(
        section='cabinets', sectionLabel='Cabinets', slug='pantry-and-tall',
        nav='Pantry and tall cabinets',
        blurb='Full-height pantry and oven towers, cut to your ceiling.',
        hero='tiny-home.jpg',
        title='Kitchen Pantry & Tall Cabinets | Cut to Size | BILT Studio',
        desc='Full-height pantry cabinets and oven towers cut to your ceiling height. Blum '
             'hardware standard, no fixed module heights.',
        h1='Pantry and<br>tall cabinets.',
        lede='The most storage per square metre of floor in any kitchen — if the height is right.',
        siblingsHeading='Other cabinet types.',
        body=[
            ('What we make',
             ["A full-height <strong>pantry</strong>, and an <strong>oven tower</strong> that "
              "houses a wall oven (and usually a microwave above it) at a height you do not have "
              "to bend to.",
              "Both cut to your ceiling height rather than to a standard 2 100 or 2 400. In a "
              "room with a raked or dropped ceiling that is not a nicety &mdash; it is the "
              "difference between the cabinet standing up and not."]),
            ('A pantry is floor space traded for volume',
             ["Per square metre of floor it holds more than anything else in the kitchen, which "
              "is why it is usually the right answer in a small room even though it feels like "
              "it takes space you cannot spare.",
              "What decides whether it works is the interior. Fixed shelves at even spacing "
              "waste the top third, because you cannot reach it. Consider a pantry lift, which "
              "brings the high shelf down to bench height &mdash; the single biggest usability "
              "upgrade available in a tall cabinet, and the one that matters most as you get "
              "older."]),
            ('The oven tower is an ergonomics decision',
             ["An under-bench oven means bending and lifting a hot, heavy dish at knee height. "
              "A wall oven at chest height does not. If anyone in the house has a bad back or "
              "expects to, this is the change worth making.",
              "It costs floor space and it costs more than an under-bench installation. Take "
              "the manufacturer&rsquo;s cut-out and ventilation clearances from the oven you "
              "have actually bought before drawing it."]),
        ],
        faqs=[
            ("How tall can a pantry be?",
             "Cut to your ceiling height. Measure at both ends of the run — a floor or ceiling "
             "that falls even slightly changes what will stand up."),
            ("Is a pantry worth it in a small kitchen?",
             "Usually yes. It holds more per square metre of floor than any other cabinet, which "
             "matters most when floor space is scarce."),
            ("What is a pantry lift?",
             "A mechanism that brings the high shelf down to bench height. It is the biggest "
             "usability difference available in a tall cabinet and the one that matters most "
             "over time."),
            ("Can I fit a wall oven and microwave in one tower?",
             "Yes, that is the usual configuration. Use the manufacturer's cut-out and "
             "ventilation clearances for both appliances when you draw it."),
        ],
    ),
    dict(
        section='cabinets', sectionLabel='Cabinets', slug='panels-and-finishing',
        nav='Panels, kickboards and finishing',
        blurb='End panels, return panels, kickboards and shelves — the parts that make it look built-in.',
        hero='granny-flat.jpg',
        title='Kitchen End Panels & Kickboards | Cut to Size | BILT Studio',
        desc='End panels, return panels, kickboards and loose shelves cut to match your '
             'cabinetry — the details that make a kitchen look built rather than assembled.',
        h1='The parts that make it<br>look built-in.',
        lede='Nobody shops for a kickboard. It is still the difference between a finished kitchen and a row of boxes.',
        siblingsHeading='Other cabinet types.',
        body=[
            ('What we make',
             ["<strong>End and return panels</strong> to close the exposed side of a run in the "
              "same finish as the doors. <strong>Kickboards</strong> to close the gap under the "
              "base cabinets. <strong>Loose shelves</strong> to add storage inside an existing "
              "carcass.",
              "All cut to match, in the same finish, rather than approximated from something "
              "off a shelf."]),
            ('Why the exposed end matters more than you think',
             ["The side of a base cabinet is a carcass panel. Left exposed at the end of a run "
              "&mdash; against a doorway, at the end of an island, beside a fridge cavity "
              "&mdash; it is visibly the inside of a box, and it is usually the first thing "
              "that reads as cheap.",
              "An end panel in the door finish makes the run look like a single piece of "
              "joinery rather than a line of separate units. It is a small line on a quote and "
              "a large part of whether the kitchen looks designed."]),
            ('Kickboards and the scribe',
             ["The kickboard closes the recess under the base cabinets, keeps the floor sweep "
              "clean and hides the adjustable legs.",
              "It is also the component that absorbs an uneven floor. Floors are rarely level, "
              "particularly in older houses, and the kickboard is scribed to follow the floor "
              "so the cabinetry above it can stay level. That is why a slightly-undersized "
              "measurement is recoverable and an oversized one is not."]),
        ],
        faqs=[
            ("Do I need end panels?",
             "Anywhere a cabinet side is visible — end of a run, beside a fridge cavity, the "
             "back of an island. It is the detail that most often separates a kitchen that "
             "looks built from one that looks assembled."),
            ("Are kickboards included?",
             "They are part of the cabinetry you configure, in the same finish. The kickboard is "
             "also what gets scribed to an uneven floor, which is why it matters more than it "
             "looks."),
            ("Can I add shelves to a cabinet later?",
             "Yes, loose shelves are available cut to match the carcass."),
            ("What finish are the panels?",
             "The same finish as your doors, so the run reads as one piece rather than a "
             "collection of parts."),
        ],
    ),
]

LAYOUTS = [
    dict(
        section='layouts', sectionLabel='Layouts', slug='galley-kitchen',
        nav='Galley kitchen',
        blurb='Two parallel runs — the most efficient layout there is, and the least forgiving of width.',
        hero='compact.jpg',
        title='Galley Kitchen Layout | Design & Cost | BILT Studio',
        desc='How a galley kitchen works, the clearance it needs, and what one costs. '
             'Cut-to-size cabinetry from $%s.',
        h1='The galley kitchen.',
        lede='Fewest steps between sink, cooktop and fridge of any layout — provided the gap between the runs is right.',
        siblingsHeading='Other layouts.',
        body=[
            ('Why chefs use it and homes often should',
             ["Two parallel runs facing each other. Everything is within a pivot: sink on one "
              "side, cooktop on the other, fridge at one end. There is no walking around an "
              "island and no dead corner, because there is no corner at all.",
              "It is the most space-efficient layout that exists, which is why commercial "
              "kitchens use it and why it suits narrow rooms, apartments, granny flats and "
              "anything where floor area is the constraint."]),
            ('The gap between the runs is the whole design',
             ["Get this wrong and nothing else rescues it. Too narrow and two people cannot "
              "pass, and an open dishwasher or oven door blocks the room entirely. Too wide and "
              "you lose the efficiency that made you choose a galley.",
              "Commonly quoted guidance sits around 1 000&ndash;1 200&nbsp;mm of clear floor "
              "between the fronts of opposing runs for a single-cook kitchen, and more if two "
              "people work in it at once. Measure it as clear space between the cabinet "
              "<em>fronts</em>, not between the walls &mdash; the cabinetry takes roughly "
              "600&nbsp;mm from each side before you start.",
              "Check appliance doors specifically. A dishwasher door is the usual culprit, and "
              "an oven door in a narrow galley can make the far run unreachable while it is "
              "open."]),
            ('Where to put what',
             ["Sink and dishwasher on one run, cooktop and oven on the other, so wet work and "
              "hot work do not compete for the same bench.",
              "Keep the fridge at an end rather than mid-run &mdash; a fridge door swings wide "
              "and in the middle of a galley it closes the corridor. And leave landing space "
              "beside the cooktop; a galley with no bench next to the hob is the most common "
              "complaint about the layout."]),
        ],
        faqs=[
            ("How wide does a galley kitchen need to be?",
             "Guidance commonly sits around 1 000–1 200 mm of clear floor between the fronts of "
             "the two runs for one cook, and more for two. Measure between cabinet fronts, not "
             "walls — cabinetry takes roughly 600 mm from each side."),
            ("Is a galley kitchen good for a small space?",
             "It is usually the best layout for a narrow room. There is no corner to waste and "
             "the working triangle is as short as it gets, which is why it suits apartments, "
             "granny flats and tiny homes."),
            ("What does a galley kitchen cost?",
             "Complete cut-to-size kitchens start at $4,490, with the 2 400 mm Compact range at "
             "$4,590 — a galley is typically two runs, so price both walls in the planner."),
            ("Can two people work in a galley?",
             "Yes, with enough clearance between the runs and with the sink and cooktop split "
             "across opposite sides so the two tasks do not compete for the same bench."),
        ],
    ),
    dict(
        section='layouts', sectionLabel='Layouts', slug='l-shaped-kitchen',
        nav='L-shaped kitchen',
        blurb='Two runs meeting at a corner — the most common layout in Australia, and the corner is the catch.',
        hero='why-we-do-this.jpg',
        title='L-Shaped Kitchen Layout | Design & Cost | BILT Studio',
        desc='How an L-shaped kitchen works, how to make the corner usable, and what one costs. '
             'Cut-to-size cabinetry from $%s.',
        h1='The L-shaped kitchen.',
        lede='The default Australian layout, for good reasons — and one problem everybody solves badly.',
        siblingsHeading='Other layouts.',
        body=[
            ('Why it is everywhere',
             ["Two runs meeting at a right angle. It fits the shape of most rooms, it leaves the "
              "rest of the floor open, it works with an adjoining dining area, and it gives you "
              "a natural working triangle without needing an island.",
              "It also scales. The same layout works in a small unit and in a large open-plan "
              "room, which is most of why it has become the default."]),
            ('The corner is where storage goes to die',
             ["Where the two runs meet there is a volume of cabinet that is real, large, and "
              "almost impossible to reach past the return. Left as a plain shelf it becomes the "
              "place things go to be forgotten.",
              "The options, in rough order of cost: leave it as a blind corner with a shelf and "
              "accept the loss; fit a corner pull-out that brings the contents out to the "
              "opening; or design the corner out entirely by turning one run into open shelving "
              "or a bench return.",
              "Decide this deliberately at planning stage. It is the single decision in an "
              "L-shaped kitchen that people most often defer and most often regret."]),
            ('Getting the triangle right',
             ["Put the sink on one run and the cooktop on the other, with the fridge near the "
              "open end of whichever run you enter the room past. That keeps someone getting a "
              "drink out of the path of someone cooking.",
              "Leave bench beside the cooktop and beside the fridge &mdash; those two landing "
              "spaces are what make a kitchen feel workable, and they are the first things "
              "sacrificed when a run is squeezed."]),
        ],
        faqs=[
            ("How do I make the corner usable in an L-shaped kitchen?",
             "A corner pull-out brings the contents out to the opening rather than making you "
             "reach past the return. The alternatives are accepting a blind corner with a shelf, "
             "or designing the corner out with open shelving or a bench return."),
            ("Is an L-shaped kitchen good for a small room?",
             "It works well in small and large rooms alike, which is why it is the most common "
             "layout in Australia. In a very narrow room a galley is usually more efficient."),
            ("Where should the fridge go?",
             "Near the open end of the run you enter past, so someone getting a drink is not "
             "walking through the cooking zone. Leave bench space beside it to put things down."),
            ("What does an L-shaped kitchen cost?",
             "Complete cut-to-size kitchens start at $4,490. Price both runs in the planner — "
             "the corner cabinet and any corner pull-out are configured as part of it."),
        ],
    ),
    dict(
        section='layouts', sectionLabel='Layouts', slug='u-shaped-kitchen',
        nav='U-shaped kitchen',
        blurb='Three runs, maximum storage, two corners to solve.',
        hero='granny-flat.jpg',
        title='U-Shaped Kitchen Layout | Design & Cost | BILT Studio',
        desc='How a U-shaped kitchen works, the clearance it needs, and what one costs. '
             'Cut-to-size cabinetry from $%s.',
        h1='The U-shaped kitchen.',
        lede='The most storage and bench of any layout, at the cost of two corners and a fair amount of floor.',
        siblingsHeading='Other layouts.',
        body=[
            ('Three walls of kitchen',
             ["A U puts cabinetry on three sides, which gives you more bench and more storage "
              "per room than any other layout. The cook stands in the middle and everything is "
              "within a turn.",
              "It suits a dedicated kitchen room rather than an open-plan corner, and it suits "
              "households that genuinely cook &mdash; the bench continuity is the point, and it "
              "is wasted on a kitchen used mainly to reheat."]),
            ('Two corners, and the width in the middle',
             ["A U has two internal corners rather than one, so the corner problem doubles. "
              "Solve both deliberately &mdash; corner pull-outs, or design one out by ending a "
              "run in open shelving or a bench return.",
              "The clear floor in the middle needs to be generous enough that two people can "
              "pass and that appliance doors can open without blocking the opposite run. As "
              "with a galley, measure between cabinet <em>fronts</em>, and check the dishwasher "
              "and oven doors specifically."]),
            ('Where a U starts to fail',
             ["In a room that is too narrow, a U becomes a corridor with a dead end. If the "
              "clear space in the middle drops below what two people can comfortably use, an "
              "L-shape with an island will usually serve you better.",
              "And if the open end of the U is also the doorway, traffic walks straight into the "
              "working zone. Where possible, keep the entry off the end rather than through it."]),
        ],
        faqs=[
            ("Is a U-shaped kitchen good for a small room?",
             "Not usually. It needs enough clear floor in the middle for two people to pass and "
             "for appliance doors to open. In a narrow room a galley or an L-shape works better."),
            ("How do I handle two corners?",
             "Solve both deliberately rather than defaulting. Corner pull-outs make the volume "
             "usable; alternatively design one corner out with open shelving or a bench return."),
            ("Does a U-shaped kitchen give the most storage?",
             "Per room, generally yes — cabinetry on three sides gives more bench and more "
             "storage than any other layout, which is why it suits households that cook a lot."),
            ("What does a U-shaped kitchen cost?",
             "Complete cut-to-size kitchens start at $4,490. A U is three runs, so price all "
             "three walls plus both corner cabinets in the planner."),
        ],
    ),
    dict(
        section='layouts', sectionLabel='Layouts', slug='island-kitchen',
        nav='Island kitchen',
        blurb='The one everybody wants — and the one most often squeezed into a room that cannot take it.',
        hero='why-we-do-this.jpg',
        title='Island Kitchen Layout | Design & Cost | BILT Studio',
        desc='How an island kitchen works, how much clearance it needs, and what one costs. '
             'Cut-to-size cabinetry from $%s.',
        h1='The island kitchen.',
        lede='Worth it when the room can take it. Actively worse than no island when it cannot.',
        siblingsHeading='Other layouts.',
        body=[
            ('What an island is actually for',
             ["Three things, and it is worth knowing which one you want. Extra bench. Extra "
              "storage. Or a social edge &mdash; somewhere to sit, and a way for the cook to "
              "face the room instead of a wall.",
              "Those pull in different directions. An island built for seating wants an "
              "overhang and clear knee space; an island built for storage wants cabinetry on "
              "both sides. Deciding which it is first prevents an island that does neither "
              "well."]),
            ('Clearance is the constraint that kills it',
             ["An island needs clear floor on every side that is used, and the guidance commonly "
              "quoted sits around 1 000&nbsp;mm minimum for a walkway, more where someone works "
              "or where two people pass, and more again on a side with seating so a pulled-out "
              "stool does not block the route.",
              "That adds up quickly. A 900&nbsp;mm island with a metre of clearance on both "
              "sides needs close to three metres of room width before the perimeter cabinetry "
              "is counted.",
              "Where an island does not fit, a peninsula &mdash; a run returning off the main "
              "cabinetry &mdash; gives most of the benefit for a fraction of the floor. It is "
              "the answer far more often than people want it to be."]),
            ('Services change the cost',
             ["An island with a sink or a cooktop needs plumbing or electrical run into the "
              "middle of the floor, which usually means the slab or the subfloor. That is a "
              "trade cost that has nothing to do with cabinetry and it is the line most often "
              "missing from an island budget.",
              "An island with neither &mdash; bench, storage and seating only &mdash; avoids "
              "all of it, and is what most people actually need."]),
        ],
        faqs=[
            ("How much space do I need for an island?",
             "Guidance commonly sits around 1 000 mm of clear floor minimum on each used side, "
             "more where people work or pass and more again where there is seating. A 900 mm "
             "island with clearance both sides needs close to three metres before perimeter "
             "cabinetry."),
            ("What if my room is too small for an island?",
             "A peninsula — a run returning off the main cabinetry — gives most of the benefit "
             "for a fraction of the floor space, and needs clearance on fewer sides."),
            ("Should I put the sink in the island?",
             "Only if you want it enough to pay for services into the middle of the floor. "
             "Plumbing or electrical to an island usually means work in the slab or subfloor, "
             "and it is the cost most often left out of an island budget."),
            ("What does an island kitchen cost?",
             "Complete cut-to-size kitchens start at $4,490. Draw the perimeter runs and the "
             "island in the planner; services to the island are a separate trade cost."),
        ],
    ),
]
