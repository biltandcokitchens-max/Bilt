# -*- coding: utf-8 -*-
"""Guides, trade, product-spec, cabinet, layout, use-case and material pages.

Everything here is a page that is NOT a location, comparison or pricing
page. Section hubs are declared in SECTIONS; individual pages in PAGES
declare which section they belong to.

The measuring guide is the most important page in this file, and it is
not primarily an SEO page. Cut-to-size means the CUSTOMER'S measurements
drive the cut, which is the scariest thing about buying this way and the
most likely reason a drawn plan never becomes an order. It is also the
open liability question flagged on the terms page. Answering it plainly
converts better than another location page ever will.
"""

SECTIONS = {
    'guides': dict(
        label='Guides',
        title='Kitchen Guides | Measuring, Planning & Materials | BILT Studio',
        desc='Practical guides to planning a kitchen — how to measure, what the materials '
             'mean, and how to choose a layout that works.',
        h1='Guides.',
        lede='The things worth knowing before you order, written plainly.',
        intro='Buying a kitchen involves a handful of decisions that are hard to reverse and '
              'easy to get wrong. These are the ones that matter, answered without a sales '
              'pitch attached.',
        listHeading='Start here.',
    ),
    'cabinets': dict(
        label='Cabinets',
        title='Kitchen Cabinet Types | Cut-to-Size Cabinetry | BILT Studio',
        desc='Every cabinet type we make, cut to your dimensions — base, wall, tall, corner, '
             'drawers and panels. Blum hardware standard.',
        h1='Every cabinet,<br>cut to your room.',
        lede='Seventeen cabinet types, made to the dimensions you enter rather than picked from fixed widths.',
        intro='Most flat-pack systems give you a catalogue of fixed widths and ask you to make '
              'your room fit. Every cabinet below is cut to the dimensions you enter, so the '
              'run fits the wall you actually have.',
        listHeading='Cabinet types.',
    ),
    'layouts': dict(
        label='Layouts',
        title='Kitchen Layouts | Galley, L-Shaped, U-Shaped & Island | BILT Studio',
        desc='How to choose a kitchen layout — galley, L-shaped, U-shaped and island — and '
             'what each one needs to work properly.',
        h1='Kitchen layouts,<br>and what each one needs.',
        lede='The layout decides how the kitchen feels to use far more than the finish does.',
        intro='Most kitchen advice starts with colour. It should start with the shape of the '
              'room, because that is what determines whether two people can work in it at once '
              'and whether the door of the dishwasher blocks the fridge.',
        listHeading='Choose a layout.',
    ),
}

PAGES = [
    # ------------------------------------------------------- TIER 1
    dict(
        section='guides', sectionLabel='Guides', slug='how-to-measure',
        nav='How to measure your kitchen',
        blurb='The half hour that decides whether your cabinetry fits.',
        hero='why-we-do-this.jpg',
        title='How to Measure Your Kitchen for Flat Pack | BILT Studio',
        desc='How to measure a kitchen properly for cut-to-size cabinetry — what to measure, '
             'where people go wrong, and how to check a room for square.',
        h1='How to measure<br>your kitchen.',
        lede='Cut-to-size means your numbers drive the cut. Half an hour spent here is the difference between cabinetry that fits and cabinetry that nearly does.',
        cta='Start your plan',
        faqHeading='Measuring, specifically.',
        closing='Enter your measurements and every carcass is cut to them. The cut list is '
                'yours before you pay anything.',
        steps=[
            ('Measure the whole wall first, corner to corner',
             'Not the gap you think the cabinets will fill &mdash; the entire wall, hard corner '
             'to hard corner. Work in millimetres. Centimetres invite rounding, and rounding is '
             'what filler panels are made of.'),
            ('Measure each wall at three heights',
             'At about 100&nbsp;mm off the floor, at bench height, and near the top of where '
             'the wall cabinets will sit. Older houses in particular are rarely parallel. '
             '<strong>Use the smallest of the three figures</strong> &mdash; cabinetry cut to '
             'the widest measurement will not go in.'),
            ('Check the room for square',
             'Measure both diagonals of the floor area. If they differ, the room is out of '
             'square, and by roughly how much. This does not stop anything, but it tells you '
             'where the discrepancy will show up so it can be planned for rather than '
             'discovered on install day.'),
            ('Mark every fixed obstacle',
             'Window and door openings, and their distance from the nearest corner. Power '
             'points, the meter box, the waste and water rough-ins, the gas point, any '
             'manhole, and skirting or cornice that will not be removed. These decide where '
             'cabinetry can and cannot go far more than taste does.'),
            ('Note the ceiling height, and whether it changes',
             'Measure at both ends of the run. A raked or dropped ceiling changes what tall '
             'cabinetry is possible, and it is the single most common thing people forget '
             'until the pantry will not stand up.'),
            ('Photograph the room from three corners',
             'Not for us &mdash; for you. When you are drawing the plan a fortnight later, '
             'the photographs will answer questions the measurements do not.'),
            ('Check appliance dimensions from the appliance, not the gap',
             'Take the manufacturer&rsquo;s specified cut-out dimensions, including any '
             'ventilation clearance, from the appliance you have actually bought. Freestanding '
             'cookers in particular need more room than the appliance is wide.'),
            ('On a new build, confirm as-built before ordering',
             'Plan dimensions and finished dimensions differ. Walls get sheeted, they move, '
             'and they are rarely exactly where the drawing said. Measure the room once it '
             'exists, then order.'),
        ],
        body=[
            ('Where measuring actually goes wrong',
             ["Almost nobody gets a wall length badly wrong. What goes wrong is subtler, and it "
              "is nearly always one of four things.",
              "<strong>Measuring the gap instead of the wall.</strong> People measure between "
              "the fridge and the corner rather than the wall itself, then discover the fridge "
              "was never where they thought it would end up.",
              "<strong>Measuring at one height.</strong> A wall that is 2 400&nbsp;mm at bench "
              "height can be 2 393&nbsp;mm at the floor. Cabinetry cut to 2 400 does not go in.",
              "<strong>Forgetting the skirting.</strong> If the skirting stays, the usable wall "
              "is shorter than the wall. If it goes, say so before ordering.",
              "<strong>Trusting the plan on a new build.</strong> Drawings are intentions. "
              "Sheeted walls are facts, and they are usually a few millimetres apart."]),
            ('Whose responsibility the measurements are',
             ["This is worth being direct about, because it is the real difference between "
              "buying this way and hiring a cabinetmaker.",
              "A cabinetmaker measures your room themselves, and a measuring error is therefore "
              "theirs. With cut-to-size, the dimensions you enter are what gets cut, so the "
              "measurements are yours. That is precisely why the price is what it is &mdash; "
              "you are not paying for a measure visit.",
              "It is not a difficult job. It is an attentive one, and it takes about half an "
              "hour with a tape, a pencil and someone to hold the other end. If you would "
              "rather not, a carpenter will do it in less time than that for a small fee, and "
              "it is money well spent on an awkward room."]),
            ('What to have with you',
             ["A steel tape at least five metres long &mdash; not a fabric one, which stretches. "
              "A pencil and paper, because you will amend the sketch several times. A second "
              "person for anything over about two metres. And a spirit level or a phone level "
              "if you want to know how far off level the floor is.",
              "Sketch the room roughly first and write measurements onto the sketch as you go. "
              "A list of numbers with no drawing attached is very hard to interpret afterwards."]),
        ],
        faqs=[
            ("How accurate do the measurements need to be?",
             "To the millimetre, and always rounding down rather than up. Measure each wall at "
             "three heights and use the smallest figure. Cabinetry cut a few millimetres too "
             "wide will not fit; cabinetry cut a few millimetres narrow is absorbed by the "
             "scribe."),
            ("What if my room is out of square?",
             "Most are, particularly older houses. Measure both diagonals so you know by how "
             "much, and use the smallest wall measurement. Because every carcass is cut to your "
             "dimensions rather than picked from fixed widths, an out-of-square room does not "
             "cost you a filler panel the way a modular system would."),
            ("Do I measure with the old kitchen still in?",
             "You can, but measure the wall itself wherever possible rather than the gap "
             "between existing units, and note anything the old kitchen is hiding — a "
             "chamfered corner, a services duct, damaged plaster. If the skirting is coming "
             "off, measure as though it already has."),
            ("Can I get someone to measure for me?",
             "Yes, and on an awkward room it is worth it. Any carpenter or handyman can do it, "
             "usually inside half an hour. We do not offer a measuring service — that is part "
             "of why the pricing works the way it does."),
            ("What happens if I get a measurement wrong?",
             "It depends what and by how much. A wall entered too long is the serious one, "
             "because the cabinetry will not fit the space. Check your numbers against the "
             "setout drawings before confirming an order — that is what they are for."),
            ("Should I measure before or after the walls are sheeted?",
             "After, always. On a new build or an extension, plan dimensions and as-built "
             "dimensions differ, and it is the as-built one that has to match the cabinetry."),
        ],
    ),
    dict(
        section='guides', sectionLabel='Guides', slug='what-you-get',
        nav='What arrives, and how it is made',
        blurb='Board, hardware, edging and what is actually in the delivery.',
        hero='compact.jpg',
        title='What Is in a BILT Kitchen | Construction & Materials | BILT Studio',
        desc='What a BILT kitchen is made of and what arrives — carcass construction, Blum '
             'hardware, stone benchtops, and everything in the delivery.',
        h1='What arrives,<br>and how it is made.',
        lede='The specification, stated plainly, so you can compare it against anything else you are looking at.',
        cta='Price your room',
        faqHeading='Construction and delivery.',
        body=[
            ('The hardware is the part worth checking',
             ["If you only compare one line between kitchen quotes, make it the hardware. "
              "Hinges and drawer runners are what fail first in every kitchen, and they are "
              "also where a headline price is most often protected.",
              "Every BILT cabinet ships with <strong>Blum CLIP top BLUMOTION hinges</strong> "
              "and <strong>TANDEMBOX antaro runners</strong>. Standard, on every cabinet, not "
              "an upgrade line and not a decision you have to remember to make.",
              "Blum is the hardware a good cabinetmaker specifies. It is soft-close by default, "
              "the runners carry the load on the runner rather than the drawer base, and the "
              "hinges clip off without tools if you ever need to take a door off. Ask anything "
              "else you are quoting what brand is included at that price."]),
            ('Benchtops: stone only, deliberately',
             ["Quartz and granite are standard. Marble is available as a paid upgrade. There is "
              "<strong>no laminate option and no timber option</strong>, and that is a decision "
              "rather than an omission.",
              "Laminate lifts at the edges where water gets in, and timber moves &mdash; both "
              "of them faster in a humid climate, which is most of Queensland for much of the "
              "year. Offering a surface we expect to fail would make the headline price lower "
              "and the kitchen worse."]),
            ('Cut to your dimensions, not to a catalogue',
             ["This is the structural difference. A modular system gives you fixed widths and "
              "you fill the remainder with a panel. Every carcass here is cut to the dimensions "
              "you enter, so a 2 380&nbsp;mm wall gets 2 380&nbsp;mm of cabinetry.",
              "That matters most in older houses, where walls are rarely square and openings "
              "sit where a century of additions left them &mdash; and in very small rooms, "
              "where losing 60&nbsp;mm to a filler is losing a drawer."]),
            ('What is in the delivery, and what is not',
             ["<strong>Arrives:</strong> every panel cut and labelled, doors and drawer fronts, "
              "all Blum hardware, fixings, edging applied, your benchtop, a full cut list and "
              "setout drawings showing where services need to land.",
              "<strong>Does not:</strong> sink, tap, appliances, splashback, flooring, and "
              "installation. Plumbing, electrical and any gas work require licensed trades in "
              "every state, on any size of dwelling. Those are separate in every system, "
              "including this one &mdash; the difference is that they are listed here rather "
              "than discovered later."]),
        ],
        faqs=[
            ("What hardware is included?",
             "Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners, standard on every "
             "cabinet. Soft-close is not an upgrade and not an option you can forget to tick."),
            ("Can I have a laminate or timber benchtop?",
             "No, and it is deliberate. Quartz and granite are standard and marble is a paid "
             "upgrade. Laminate lifts where water reaches an edge and timber moves, both faster "
             "in a humid climate."),
            ("Is the cabinetry assembled?",
             "No — it ships flat, cut and labelled, with a cut list and setout drawings. That is "
             "what lets it fit in a service lift, travel well over long distances, and cost what "
             "it costs. No cabinet-making skill is needed to assemble and fit it."),
            ("Do you supply the sink, tap and appliances?",
             "No. Those are separate in every system including ours, so buy them before you "
             "finalise the plan and use the manufacturer's cut-out dimensions when you draw."),
            ("Do you install?",
             "No. We supply cabinetry. Plenty of people fit it themselves and a carpenter will "
             "be faster; plumbing and electrical need licensed trades regardless."),
        ],
    ),
    dict(
        section='guides', sectionLabel='Guides', slug='trade',
        nav='Trade and builder accounts',
        blurb='Wholesale pricing for builders, developers and cabinet installers.',
        hero='granny-flat.jpg',
        title='Trade Kitchen Supplier | Wholesale Cabinetry Queensland | BILT Studio',
        desc='Wholesale cut-to-size kitchen cabinetry for builders, developers and installers '
             'across Queensland. Trade pricing, cut lists and setout drawings.',
        h1='Trade and builder<br>accounts.',
        lede='Wholesale pricing, the same cut lists, and no showroom appointment for you or your client.',
        cta='Open the planner',
        faqHeading='Trade accounts, specifically.',
        closing='Draw the job, price it at trade rates, and take the cut list to site.',
        body=[
            ('Built for people who order more than one kitchen',
             ["If you build spec homes, fit out granny flats, develop units or install "
              "cabinetry for other people, the retail process is the wrong shape for you. You "
              "do not need to be sold to, you need a number and a cut list.",
              "A trade account gives you wholesale pricing across the range, with the same "
              "planner, the same cut-to-size manufacturing and the same Blum hardware. Draw the "
              "job, price it at trade rates, and take the setout drawings to site.",
              "Trade pricing is hidden from retail visitors entirely. It is not a discount code "
              "&mdash; approved accounts see different numbers."]),
            ('Why this suits volume work',
             ["<strong>The number does not move.</strong> You can quote a client from the "
              "planner figure rather than waiting on a supplier quote, which means your quote "
              "goes out the same day.",
              "<strong>Repeatability.</strong> A layout that worked once can be redrawn for the "
              "next dwelling in minutes, cut to that dwelling&rsquo;s actual dimensions rather "
              "than forced onto standard modules.",
              "<strong>It ships flat.</strong> Panels stack, store on site without occupying a "
              "room, and go up stairs and into lifts that assembled carcasses do not clear.",
              "<strong>No queue.</strong> There is no workshop backlog for the cabinetry, which "
              "in regional Queensland is frequently the difference between a job starting this "
              "month and next quarter."]),
            ('How to open an account',
             ["There is a short questionnaire covering the business &mdash; name, ABN, website, "
              "address, contact details, trade type, years operating and roughly how many "
              "kitchens a year you expect. It exists so trade pricing goes to actual trade.",
              "Accounts are reviewed before trade pricing becomes visible. Once approved you "
              "log in and the planner prices at your rates."]),
        ],
        faqs=[
            ("Who can open a trade account?",
             "Builders, developers, cabinet installers, property managers and anyone fitting "
             "out more than one dwelling. The questionnaire asks for business details including "
             "an ABN, and accounts are approved before trade pricing becomes visible."),
            ("Can retail customers see trade pricing?",
             "No. Trade rates are only visible inside an approved, logged-in account. It is not "
             "a code or a public discount."),
            ("Do you deliver to building sites?",
             "Yes, and to a fabrication facility if you build modular. Freight is quoted per "
             "order once a team member has checked the 3D plan by hand."),
            ("Can I order several kitchens at once?",
             "Yes — that is what the account is for. Each dwelling is drawn and cut to its own "
             "dimensions rather than everything being forced onto one standard layout."),
            ("Do I get setout drawings for my installer?",
             "Yes. Every job produces a full cut list and setout showing each cabinet dimension "
             "and where services need to land."),
        ],
    ),
]


# --- Tier 2 and Tier 3, kept in their own modules for editability -----
import _content2 as _c2
import _content3 as _c3

PAGES = PAGES + _c2.CABINETS + _c2.LAYOUTS + _c3.MATERIALS

_seen = [(p['section'], p['slug']) for p in PAGES]
assert len(_seen) == len(set(_seen)), 'duplicate section/slug: %s' % _seen
