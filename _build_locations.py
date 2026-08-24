# -*- coding: utf-8 -*-
"""Generate the Central Queensland location pages.

Run:  python _build_locations.py

WHY A GENERATOR AND NOT SIX HAND-WRITTEN FILES
The chrome (masthead, footer, breadcrumb, schema, price cards) is
identical across the set and should stay identical. The *content* must
not be: near-duplicate location pages with the town name swapped are
doorway pages, and Google demotes them. So the template below carries
only the furniture, and every word that makes a page worth landing on
lives in TOWNS -- a distinct angle, distinct prose and distinct FAQs per
town, written from that town's real housing stock and economy.

WHAT IS DELIBERATELY NOT HERE
No phone, no street address, no ABN. BILT_STUDIO_HANDOFF.md sec.6 makes
filling those without owner confirmation the one hard rule on this
project, so no page claims them and no page emits LocalBusiness schema
(which requires them to be eligible for the local pack).
Freight cost and lead time per town are not known either; those render
as a visible [TBC] block rather than an invented figure.
"""
import io, os, json, re

import _facts as F

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = 'https://biltstudio.com.au'

# Confirmed pricing, BILT_STUDIO_HANDOFF.md sec.1
ANCHOR = '4,490'
RANGES = [
    ('Compact', '2400 mm', '4,590', 'compact.jpg',
     'A galley or single run. Units, doors, hardware, benchtop.'),
    ('Granny flat', '2700 mm', '5,500', 'granny-flat.jpg',
     'Sized for a secondary dwelling or a converted under-house space.'),
    ('Tiny home', '3000 mm', '7,500', 'tiny-home.jpg',
     'A full working kitchen in a footprint that has to earn every millimetre.'),
]

HUB_SLUG = 'central-queensland'
STATE_SLUG = 'queensland'


# ----------------------------------------------------------------- towns
TOWNS = [
    dict(
        slug='rockhampton', name='Rockhampton', region='Central Queensland',
        blurb='The regional capital, and the freight route every other Central Queensland town runs through.',
        hero='why-we-do-this.jpg',
        heroalt='An architectural kitchen with a stone island, pale cabinetry and considered lighting.',
        # SEARCH language in the title, BRAND language in the H1. The brief
        # permits these to differ, and they must here: "flat pack" carries
        # the demand, "architectural" carries the positioning.
        title='Architectural Kitchens Rockhampton | Flat Pack Packages | BILT Studio',
        desc='Architectural kitchens for Rockhampton, intelligently priced. Draw your kitchen, '
             'see the price as you go, and get the cut list before you pay. From $%s.' % ANCHOR,
        h1='Architectural kitchens<br>for Rockhampton.',
        lede='Designed with a premium eye. Directly sourced. Priced on the page, before you commit to anything.',
        body=[
            ('A considered kitchen, without the custom-kitchen wait',
             ["Rockhampton is well served by cabinetmakers, several of them with decades behind "
              "them and a showroom worth visiting. What that route asks of you is time and an "
              "unknown: a measure appointment, a design meeting, then a quote some days later "
              "that you could not have predicted at the start.",
              "BILT is the other way round. The design is already resolved &mdash; a curated "
              "material palette, Blum hardware as standard, quartz or granite benchtops and no "
              "laminate &mdash; and what you control is the room. You draw it, the price moves "
              "as you draw, and the cut list is yours before you pay anything.",
              "The result is intended to look like a designed kitchen rather than a bought one. "
              "The saving is not in the cabinetry; it is in removing the showroom, the sales "
              "visit and the margin those carry."]),
            ('Rockhampton kitchens are a shape problem before they are a budget problem',
             ["Much of Rockhampton\'s older housing is classic high-set Queenslander &mdash; "
              "timber, elevated, and built when the kitchen was a closed room at the back of the "
              "house rather than the centre of it. That leaves a recognisable set of "
              "constraints: a narrow galley, a chamfered corner where the wall meets the "
              "verandah line, a doorway in the wrong place, and a window you cannot move without "
              "touching the weatherboards.",
              "Fixed-module cabinetry assumes none of that. It arrives in 600s and 900s, and you "
              "lay them out until you run out of wall and hide the difference behind a filler "
              "panel. On a 2 380 mm wall that is a visible compromise you look at every day.",
              "Cutting to size starts from the opposite end. Every carcass is made to the "
              "dimensions you enter, so a 2 380 mm wall gets 2 380 mm of cabinetry. There is no "
              "filler strip because there is nothing to fill."]),
            ('Two Rockhampton projects that come up again and again',
             ["<strong>The under-house conversion.</strong> Enclosing beneath a high-set house is "
              "one of the most common renovations here, and it almost always needs a second "
              "kitchen &mdash; a full one if it is becoming a granny flat, a kitchenette if it "
              "is a rumpus. The 2 700 mm Granny flat range is sized for exactly that at $5,500, "
              "complete rather than stripped back, which matters when the space will be rented "
              "or lived in by family.",
              "<strong>The investment refit.</strong> Rockhampton is a regional capital with a "
              "substantial rental market, and a tenanted kitchen fails at the moving parts "
              "first. Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners are standard "
              "rather than an upgrade, and the benchtop range is stone only. That is the "
              "specification that is still working after several tenancies &mdash; and knowing "
              "the total before starting is what decides whether an investor starts at all."]),
            ('The regional advantage nobody mentions',
             ["Rockhampton is the freight route for Central Queensland. Gladstone, Yeppoon, "
              "Emerald, Biloela and the Capricorn Coast all sit on runs that pass through or "
              "near it.",
              "Everything ships direct from our base, flat-packed. Panels travel considerably "
              "better than assembled carcasses full of air, which is why buying this way makes "
              "more sense the further you are from a capital city, not less."]),
        ],
        quote=("Glad we took the chance", "Sarah Wallace", "Rockhampton"),
        faqs=[
            ("What does an architectural kitchen cost in Rockhampton?",
             "Complete kitchens start at $4,490. The three ranges are $4,590 for a 2 400 mm run, "
             "$5,500 for 2 700 mm and $7,500 for 3 000 mm, each including carcasses, doors, Blum "
             "hardware and a quartz or granite benchtop. The price in the planner is the price "
             "— there is no quote stage."),
            ("How does this compare to a local cabinetmaker?",
             "They are different products for different briefs. A cabinetmaker designs around "
             "you from scratch, which suits an unusual layout or a specific vision, and you pay "
             "for that design time and workshop time. BILT is a curated design you configure to "
             "your room, priced instantly and shipped flat. If you want a resolved architectural "
             "look without the design-and-quote cycle, this is the faster route; if you want "
             "something bespoke, a cabinetmaker is the right call."),
            ("Do you deliver to Rockhampton?",
             "Yes — Rockhampton is a named destination on our delivery run and the route "
             "much of Central Queensland is served through. Everything ships direct from our "
             "base."),
            ("Will it work in an old Queenslander with out-of-square walls?",
             "That is the case cutting to size handles best. Every carcass is made to the "
             "dimensions you enter rather than picked from fixed module widths, so walls that "
             "are out of square do not have to be absorbed by filler panels. Measure each wall "
             "at several heights and use the smallest figure."),
            ("Do I need a cabinet maker to install it?",
             "No. It arrives flat-packed with a cut list, setout drawings and all hardware. "
             "Plenty of people assemble and fit it themselves; a carpenter will be faster. "
             "Plumbing and electrical still need the relevant licensed trades."),
        ],
    ),
    dict(
        slug='gladstone', name='Gladstone', region='Central Queensland',
        blurb='Investment properties, worker housing and kitchens that have to be durable before they are beautiful.',
        hero='compact.jpg',
        heroalt='A compact galley kitchen with flat-panel doors and a stone benchtop.',
        title='Architectural Kitchens Gladstone | Flat Pack Packages | BILT Studio',
        desc='Architectural kitchens for Gladstone, intelligently priced. Priced on the page, no quote stage. Complete kitchens from $%s.' % ANCHOR,
        h1='Architectural kitchens<br>for Gladstone.',
        lede='A kitchen you can price to the dollar before you commit — which matters more when it is going into a rental than a forever home.',
        body=[
            ('Gladstone renovates on a different maths to everywhere else',
             ["Gladstone is a port and processing town, and its housing market moves with the "
              "industrial workforce rather than with lifestyle buyers. A large share of the "
              "kitchens replaced here each year go into investment properties and worker "
              "accommodation, not owner-occupied renovations.",
              "That changes the brief completely. An investor is not trying to build a dream "
              "kitchen; they are trying to hit a rentable standard without over-capitalising, "
              "and they need to know the number before they start, because the number decides "
              "whether the job happens at all.",
              "This is the part of the process the industry is worst at. A conventional kitchen "
              "quote arrives days after a showroom visit and can shift depending on how the room "
              "reads. Ours does not: you draw the room, the price updates as you go, and the "
              "figure on screen is the figure."]),
            ('Durable is the specification, not a nice-to-have',
             ["A rental kitchen gets harder use than a family one and gets it from people who did "
              "not choose it. The parts that fail first are always the moving parts — hinges "
              "that drop, drawers that stop running true.",
              "Every cabinet ships with Blum hardware as standard: CLIP top BLUMOTION hinges and "
              "TANDEMBOX antaro runners. That is the hardware most custom cabinet makers charge "
              "extra for, and it is the single biggest difference between a kitchen that still "
              "shuts properly after five years of tenants and one that does not.",
              "Benchtops are quartz and granite. There is no laminate option and no timber "
              "option, which rules out the two surfaces most likely to swell or delaminate in a "
              "property you are not living in to look after."]),
        ],
        quote=("Everyone arrives a little sceptical", "Brian T.", "Gladstone"),
        faqs=[
            ("Do you deliver to Gladstone?",
             "Yes. Gladstone sits on the Bruce Highway about 107 km south-east of Rockhampton, "
             "which is already on our delivery run. [TBC: DELIVERY COST AND LEAD TIME TO GLADSTONE]"),
            ("Can I get a fixed price before I commit?",
             "That is the whole point of the planner. You draw the room, every cabinet is priced "
             "as a line item, and the total updates as you work. There is no quote stage and no "
             "appointment — you get the cut list before you pay."),
            ("Is this suitable for a rental or investment property?",
             "It is one of the most common uses. Blum hardware is standard rather than an "
             "upgrade, and benchtops are quartz or granite only, which is the specification that "
             "survives tenants. The 2 400 mm Compact range starts at $4,590."),
            ("Can I order several kitchens for multiple properties?",
             "Yes. If you are fitting out more than one dwelling, the trade account gives you "
             "wholesale pricing — it requires a short business questionnaire and is approved "
             "before pricing is visible."),
        ],
    ),
    dict(
        slug='yeppoon', name='Yeppoon', region='Capricorn Coast',
        blurb='Salt air, holiday lets and downsizers — where the hardware matters more than the door colour.',
        hero='why-we-do-this.jpg',
        heroalt='A coastal kitchen with a stone island, pale cabinetry and pendant lighting.',
        title='Architectural Kitchens Yeppoon & the Capricorn Coast | BILT Studio',
        desc='Architectural kitchens for Yeppoon and the Capricorn Coast, intelligently priced. Priced on the page. Complete kitchens from $%s.' % ANCHOR,
        h1='Architectural kitchens<br>for Yeppoon.',
        lede='Coastal kitchens fail at the hinges long before they fail at the doors. This is a specification built for that.',
        body=[
            ('Salt air is the design constraint nobody quotes for',
             ["Yeppoon, Emu Park and the rest of the Capricorn Coast sit close enough to the water "
              "that airborne salt is a permanent condition rather than an occasional one. "
              "Combined with the humidity, it goes after the metal in a kitchen first: hinges, "
              "runners, handles and fixings.",
              "Most kitchen quotes never mention hardware brand at all, which is convenient, "
              "because unbranded hardware is where the margin hides. It is also why a coastal "
              "kitchen can look fine and stop working properly within a few seasons — the "
              "cabinetry is fine, the mechanisms are not.",
              "Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners are standard on every "
              "cabinet here, not an upgrade line. It will not make a kitchen immortal three "
              "streets from the beach, but it starts the clock from a much better place.",
              "It is worth pairing that with the usual coastal habits: rinse the exterior "
              "hardware occasionally, and keep the extraction working so cooking humidity is not "
              "added to the sea air."]),
            ('Two very different buyers, one range',
             ["The Capricorn Coast has an unusually split kitchen market. On one side, holiday "
              "lets and short-stay properties, where the kitchen has to look good in photographs, "
              "survive guests, and be replaced without a long shutdown. On the other, retirees "
              "downsizing from larger inland homes, who want fewer, better-organised cabinets "
              "rather than more of them.",
              "Both are served by the same thing: an exact fit and a price known in advance. A "
              "holiday let cannot afford weeks of downtime waiting on a custom build, and a "
              "downsizer should not be paying for a showroom they walked through once."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Yeppoon and the Capricorn Coast?",
             "Yes. Yeppoon is about 43 km from Rockhampton, which is on our delivery run, and the "
             "same applies to Emu Park and the surrounding coast. "
             "[TBC: DELIVERY COST AND LEAD TIME TO THE CAPRICORN COAST]"),
            ("Does the hardware hold up near the ocean?",
             "Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners are standard on every "
             "cabinet, which is the specification most quotes treat as a paid upgrade. Salt air "
             "is still salt air — rinse exterior hardware occasionally and keep extraction "
             "running — but the moving parts start from a far better baseline."),
            ("What benchtop should I choose for a coastal property?",
             "Quartz and granite are standard and both handle humidity without moving. There is "
             "no timber or laminate option, which is deliberate — those are the two surfaces "
             "most likely to swell or lift in a coastal climate. Marble is available as a paid "
             "upgrade."),
            ("Can I fit a kitchen out for a holiday let quickly?",
             "The planner gives you the full cut list and price immediately rather than after an "
             "appointment, which removes the slowest part of the process. "
             "[TBC: LEAD TIME FROM ORDER TO DELIVERY]"),
        ],
    ),
    dict(
        slug='emerald', name='Emerald', region='Central Highlands',
        blurb='Inland, and a long way from a showroom — which is exactly where buying flat is worth the most.',
        hero='tiny-home.jpg',
        heroalt='A compact kitchen run with tall cabinetry and an integrated oven.',
        title='Architectural Kitchens Emerald & the Central Highlands | BILT Studio',
        desc='Architectural kitchens for Emerald and the Central Highlands, intelligently priced. No showroom trip, no quote stage. From $%s.' % ANCHOR,
        h1='Architectural kitchens<br>for Emerald.',
        lede='Two hundred and seventy kilometres from the coast, the hardest part of a new kitchen is usually getting anyone to come and price it.',
        body=[
            ('Distance is the real cost of a Central Highlands kitchen',
             ["Emerald sits roughly 270 km west of Rockhampton, and that distance shapes every "
              "renovation in the Central Highlands. The pool of local cabinet makers is small, "
              "the trades who can install are frequently booked out by mining and agricultural "
              "work, and anyone quoting from the coast has to price the trip both ways — "
              "usually more than once, since a custom kitchen needs a measure visit before it "
              "needs an install.",
              "None of that is anybody's fault. It is just what a long haul does to a job that "
              "traditionally requires several site visits before a single cabinet is built.",
              "Buying cut-to-size removes most of those trips. The measuring is yours, done once "
              "with a tape; the pricing happens on screen instead of in a showroom; and the "
              "cabinetry travels flat, which is a far more efficient thing to freight over that "
              "distance than assembled boxes full of air."]),
            ('Newer housing, but not newer kitchens',
             ["A good share of Emerald's housing stock went up through the 1990s and 2000s during "
              "successive resource booms, which puts a lot of it at exactly the age where the "
              "original builder-grade kitchen is due. Those kitchens are typically sound in "
              "layout and tired in every other respect — the carcasses are fine, the doors "
              "are dated and the hardware has given up.",
              "That is a straightforward replacement rather than a redesign, and it is the "
              "cheapest kind of kitchen to get right: keep the plumbing where it is, keep the "
              "layout that already works, and replace the cabinetry with something cut to the "
              "actual room."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Emerald?",
             "Yes, into the Central Highlands. Emerald is about 270 km west of Rockhampton, which "
             "is on our delivery run. [TBC: DELIVERY COST AND LEAD TIME TO EMERALD]"),
            ("Do I have to travel to a showroom?",
             "No, and that is the point. You draw the room in the planner, the price updates as "
             "you go, and you get the cut list before you pay. There is no measure-and-quote "
             "visit to schedule."),
            ("How accurate do my measurements need to be?",
             "Accurate enough to matter: measure each wall at several heights and use the "
             "smallest figure, and check the diagonals to see how far out of square the room is. "
             "Because every carcass is cut to your numbers, the numbers are doing real work."),
            ("What if something arrives damaged this far out?",
             "Flat-packed panels travel far better than assembled cabinets, which is part of why "
             "the format suits long freight runs. [TBC: DAMAGE, RETURNS AND REPLACEMENT POLICY "
             "— NEEDS OWNER CONFIRMATION]"),
        ],
    ),
    dict(
        slug='biloela', name='Biloela', region='Banana Shire',
        blurb='A small town with a short supplier list, where waiting is usually the biggest cost.',
        hero='compact.jpg',
        heroalt='A simple, hard-wearing kitchen run with flat-panel doors.',
        title='Architectural Kitchens Biloela & the Banana Shire | BILT Studio',
        desc='Architectural kitchens for Biloela and the Banana Shire, intelligently priced. Priced on the page. Complete kitchens from $%s.' % ANCHOR,
        h1='Architectural kitchens<br>for Biloela.',
        lede='In a town this size the question is rarely which cabinet maker to use. It is whether anyone can start this year.',
        body=[
            ('Small town, short list',
             ["Biloela serves a wide agricultural and coal-mining catchment from a population of "
              "only a few thousand. That is enough to sustain excellent trades, but not enough to "
              "sustain many of them in any one speciality — and cabinet making is a "
              "speciality.",
              "The practical result is familiar to anyone who has tried to renovate here: the "
              "quote is fine, the work is good, and the earliest start is months away. Meanwhile "
              "the alternative — a chain store flat pack from Rockhampton or further — "
              "comes in fixed module sizes that were never going to fit the room properly.",
              "Cut-to-size sits between those. You get cabinetry made to your room's real "
              "dimensions, without joining a queue for someone's workshop time."]),
            ('Built for houses that get used hard',
             ["Rural and mining households are tough on a kitchen. Boots, heat, long hours and "
              "irregular meal times all land on the same few cabinet doors and drawer runners.",
              "Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners are standard rather "
              "than an upgrade, and benchtops are quartz or granite — no laminate, no timber. "
              "It is a specification chosen to still be working in ten years rather than to hit a "
              "lower headline price."]),
        ],
        quote=None,
        faqs=[
            ("Do you deliver to Biloela?",
             "Yes, into the Banana Shire. Biloela is roughly 140 km south-west of Rockhampton, "
             "which is on our delivery run. [TBC: DELIVERY COST AND LEAD TIME TO BILOELA]"),
            ("How is this different from a chain store flat pack?",
             "Chain store flat pack comes in fixed module widths, so an odd-sized wall gets made "
             "up with filler panels. Every carcass here is cut to the dimensions you enter, so "
             "the cabinetry fits the room instead of the room accommodating the cabinetry."),
            ("Can a local handyman install it?",
             "Yes. It arrives flat with a cut list and all hardware, and needs no cabinet-making "
             "skill to assemble and fit. Plumbing and electrical work still need licensed trades."),
            ("What is the cheapest complete kitchen?",
             "Complete kitchens start at $%s. The 2 400 mm Compact range is $4,590 and includes "
             "carcasses, doors, Blum hardware and benchtop." % ANCHOR),
        ],
    ),
]


# The Central Queensland towns plus the twelve wider-Queensland cities.
# build_town() and the footer both walk this, so a city added to either
# module appears everywhere without another edit.
import _cities_qld as _cq
import _cities_qld_north as _cqn
import _cities_qld_mining as _cqm
import _cities_qld_coast as _cqc

ALL_PLACES = (TOWNS + _cq.CITIES + _cqn.CITIES_NORTH
              + _cqm.CITIES_MINING + _cqc.CITIES_COAST)

_seen = [p['slug'] for p in ALL_PLACES]
assert len(_seen) == len(set(_seen)), 'duplicate slug: %s' % _seen


    # Grouped to the war-map clusters rather than by size, so the hub
# reads as a service map of Central Queensland with the south-east
# attached, not as a list of cities ordered by population.
CLUSTERS = [
    ('Rockhampton and the Capricorn Coast',
     ['rockhampton', 'gracemere', 'yeppoon', 'emu-park']),
    ('The Bowen Basin and mining corridor',
     ['moranbah', 'blackwater', 'dysart', 'clermont']),
    # Emerald is the gateway to the Central West, so pairing it with
    # Longreach is geographically honest as well as being the only way
    # Longreach gets a sibling to link to at all.
    ('The Central Highlands and Central West',
     ['emerald', 'longreach']),
    ('Gladstone region and the Dawson Valley',
     ['gladstone', 'tannum-sands', 'biloela']),
    ('Mackay and the Whitsundays',
     ['mackay', 'sarina', 'airlie-beach']),
    ('Wide Bay and the north',
     ['bundaberg', 'hervey-bay', 'townsville', 'cairns']),
    ('South East Queensland',
     ['brisbane', 'gold-coast', 'sunshine-coast', 'ipswich', 'logan',
      'caboolture', 'toowoomba']),
]


# -------------------------------------------------------------- template
def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


TBC_RE = re.compile(r'\s*\[TBC:[^\]]*\]')


# Freight was unknown when these pages were first written, so the copy
# carried [TBC] markers. It is confirmed now -- quoted per order after a
# team member checks the 3D plan -- so those markers resolve to the real
# process instead of being deleted. Anything still genuinely unknown
# (the damage/returns policy) keeps falling through to strip_tbc.
FREIGHT_MARKERS = re.compile(
    r'\[TBC: (?:DELIVERY COST AND LEAD TIME TO [^\]]*|'
    r'LEAD TIME FROM ORDER TO DELIVERY|'
    r'FULL DELIVERY AREA, COST AND LEAD TIMES)\]')


def resolve_freight(t):
    return FREIGHT_MARKERS.sub(F.FREIGHT_NOTE, t)


def strip_tbc(t):
    """Remove [TBC: ...] markers from customer-facing copy.

    Applied to FAQ answers AND to the schema generated from them, so the
    visible text and the structured data cannot drift -- a [TBC] leaking
    into a FAQPage node would be published straight to Google.
    """
    t = resolve_freight(t)
    if F.SHOW_PLACEHOLDERS:
        return t
    return re.sub(r'\s{2,}', ' ', TBC_RE.sub('', t)).strip()


def mast(depth):
    up = '../' * depth
    return '''<header class="mast">
  <div class="mast__in">
    <a class="mast__brand" href="%(up)s">BILT</a>
    <a class="btn btn--ghost mast__cta-2" href="%(up)skitchens/central-queensland/">Central Queensland</a>
    <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="loc-open-planner">Open the planner</a>
  </div>
</header>''' % {'up': up}


def foot(depth, towns):
    up = '../' * depth
    links = '\n'.join(
        '        <li><a href="%skitchens/%s/">%s</a></li>' % (up, t['slug'], t['name'])
        for t in towns)
    return '''<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div>
        <h4>Start</h4>
        <ul>
          <li><a href="%(up)sroomplanner/#/plan" data-track="loc-foot-planner">Open the planner</a></li>
          <li><a href="%(up)s#bl-range">The signature range</a></li>
          <li><a href="%(up)s#bl-trade">Trade account</a></li>
        </ul>
        <h4 style="margin-top:1.75rem">Building or renovating</h4>
        <ul>
          <li><a href="%(up)skitchens/new-builds/">New builds &amp; renovations</a></li>
          <li><a href="%(up)skitchens/class-1a/">Class 1a builds</a></li>
          <li><a href="%(up)skitchens/granny-flat/">Granny flats</a></li>
          <li><a href="%(up)skitchens/tiny-home/">Tiny homes</a></li>
          <li><a href="%(up)skitchens/modular/">Modular builds</a></li>
        </ul>
      </div>
      <div>
        <h4>Queensland</h4>
        <ul>
          <li><a href="%(up)skitchens/queensland/">All of Queensland</a></li>
          <li><a href="%(up)skitchens/central-queensland/">Central Queensland</a></li>
%(links)s
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="%(up)s#bl-faq">Questions</a></li>
          <li><a href="%(up)slegal/privacy/">Privacy</a></li>
          <li><a href="%(up)slegal/terms/">Terms of sale</a></li>
          <li><a href="%(up)slegal/warranty/">Warranty</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>%(phone)s</li>
          <li><a href="mailto:%(email)s" data-track="loc-email">%(email)s</a></li>
        </ul>
        %(abn)s
      </div>
    </div>
    <p class="foot__legal">&copy; 2026 Bilt &amp; Co Pty Ltd &middot; ACN 700 798 509 &middot;
      Bilt Studio is a trading name of Bilt &amp; Co Pty Ltd.
      Display in Queensland, by appointment. We supply cabinetry.</p>
  </div>
</footer>''' % {'up': up, 'links': links,
       'phone': F.phone_link(track='loc-phone'),
       'email': F.EMAIL,
       'abn': ('<p style="margin-top:1rem">%s</p>' % F.abn_line()) if F.ABN else ''}


def price_cards(depth):
    up = '../' * depth
    out = []
    for name, run, price, img, note in RANGES:
        out.append('''      <div class="card">
        <img src="%(up)simg-stock/%(img)s" alt="%(name)s kitchen range" loading="lazy" decoding="async">
        <h3 style="margin-top:1.25rem">%(name)s</h3>
        <p class="card__note">%(run)s run</p>
        <p class="card__price">$%(price)s</p>
        <p class="card__note">%(note)s</p>
      </div>''' % dict(up=up, img=img, name=name, run=run, price=price, note=note))
    return '\n'.join(out)


def faq_html(faqs):
    """Render the FAQ accordion.

    NOTE: answers pass through esc(), so an HTML entity written in the
    source ("&mdash;") would be escaped to "&amp;mdash;" and render as
    literal text. Body paragraphs are NOT escaped, which makes the
    asymmetry easy to trip over -- hence the assertion.
    """
    for _q, _a in faqs:
        assert '&' not in _a or '&amp;' in _a, (
            'FAQ answer contains an HTML entity; esc() will double-escape '
            'it. Use the literal character instead: %r' % _a[:70])
    out = ['<div class="faq">']
    for q, a in faqs:
        a = strip_tbc(a)
        if not a:
            continue            # the answer was nothing but a placeholder
        out.append('  <details>\n    <summary>%s</summary>\n    <div class="faq__a"><p>%s</p></div>\n  </details>'
                   % (esc(q), esc(a)))
    out.append('</div>')
    return '\n'.join(out)


def schema(page_url, title, desc, crumbs, faqs, area=None):
    # The Organization node is repeated on every page rather than only
    # cross-referenced by @id from the landing page. A crawler that lands
    # here first should not have to fetch another URL to learn who the
    # business is or how to ring it. No postalAddress and no
    # LocalBusiness type: this is a service-area business with no
    # premises, and LocalBusiness needs an address to be eligible.
    org = F.organization_node(SITE, [p['name'] for p in ALL_PLACES])

    graph = [
        org,
        {"@type": "WebPage", "@id": page_url + "#webpage", "url": page_url,
         "name": title, "description": desc, "inLanguage": "en-AU",
         "isPartOf": {"@id": SITE + "/#website"},
         "about": {"@id": SITE + "/#organization"}},
        {"@type": "BreadcrumbList", "@id": page_url + "#crumbs",
         "itemListElement": [
             {"@type": "ListItem", "position": i + 1, "name": n, "item": u}
             for i, (n, u) in enumerate(crumbs)]},
    ]
    if area:
        graph.append({
            "@type": "Service", "@id": page_url + "#service",
            "name": "Cut-to-size flat pack kitchen cabinetry",
            "serviceType": "Kitchen cabinetry supply",
            "provider": {"@id": SITE + "/#organization"},
            "areaServed": {"@type": "City", "name": area},
            "offers": {"@type": "Offer", "priceCurrency": "AUD",
                       "price": ANCHOR.replace(',', ''),
                       "priceSpecification": {
                           "@type": "PriceSpecification",
                           "minPrice": ANCHOR.replace(',', ''),
                           "priceCurrency": "AUD",
                           "valueAddedTaxIncluded": True}}})
    if faqs:
        graph.append({
            "@type": "FAQPage", "@id": page_url + "#faq",
            "mainEntity": [
                {"@type": "Question", "name": q,
                 "acceptedAnswer": {"@type": "Answer", "text": strip_tbc(a)}}
                for q, a in faqs if strip_tbc(a)]})
    return json.dumps({"@context": "https://schema.org", "@graph": graph},
                      indent=2, ensure_ascii=False)


PAGE = u'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<link rel="canonical" href="%(url)s">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#16130F">

<meta property="og:type" content="website">
<meta property="og:site_name" content="BILT Studio">
<meta property="og:locale" content="en_AU">
<meta property="og:url" content="%(url)s">
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:image" content="%(site)s/img-stock/%(hero)s">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="%(title)s">
<meta name="twitter:description" content="%(desc)s">
<meta name="twitter:image" content="%(site)s/img-stock/%(hero)s">

<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%%2316130F'/><path d='M8 8h9a5 5 0 0 1 0 10H8zM8 18h10a5 5 0 0 1 0 10H8z' fill='none' stroke='%%238A5E3A' stroke-width='2.6'/></svg>">
<link rel="stylesheet" href="%(up)scss/pages.css">

<script type="application/ld+json">
%(schema)s
</script>
</head>
<body>
%(mast)s

<main>
%(main)s
</main>

%(foot)s
<script src="%(up)sjs/analytics.js" defer></script>
</body>
</html>
'''


def crumbs_html(items):
    li = []
    for i, (name, url) in enumerate(items):
        if i == len(items) - 1:
            li.append('    <li aria-current="page">%s</li>' % esc(name))
        else:
            li.append('    <li><a href="%s">%s</a></li>' % (url, esc(name)))
    return '<nav class="crumb wrap" aria-label="Breadcrumb">\n  <ol>\n%s\n  </ol>\n</nav>' % '\n'.join(li)


# ------------------------------------------------------------ town pages
def nearby_html(t, up):
    """Link a town to the other towns in its war-map cluster.

    Regional authority comes from places pointing at each other, not only
    from every page pointing up at a hub. Without this the newer towns
    carried a single inbound link each while the originals had 26.
    """
    slug = t['slug']
    cluster = next((name for name, slugs in CLUSTERS if slug in slugs), None)
    if not cluster:
        return ''
    by = {c['slug']: c for c in ALL_PLACES}
    sibs = [by[x] for x in dict(CLUSTERS)[cluster] if x != slug and x in by]
    if not sibs:
        # A cluster of one renders no links at all, which is how a page
        # ends up with a single inbound link and nobody notices.
        print('  WARNING: %s alone in its cluster - no nearby links' % t['slug'])
        return ''
    row = ('  <li><a href="%skitchens/%s/">\n'
           '    <h3>%s</h3>\n'
           '    <p>%s</p>\n'
           '  </a></li>')
    items = '\n'.join(
        row % (up, o['slug'], esc(o['name']), esc(o['blurb'])) for o in sibs)
    return '''<section class="sec">
  <div class="wrap">
    <p class="eyebrow">%s</p>
    <h2 class="narrow">Also delivering nearby.</h2>
    <ul class="towns">
%s
    </ul>
    <p style="margin-top:1.5rem;font-size:.9375rem;color:#6F6A61">
      See every town across <a href="%skitchens/queensland/">Queensland</a>.</p>
  </div>
</section>''' % (esc(cluster), items, up)


def build_town(t):
    depth = 2
    up = '../' * depth
    url = '%s/kitchens/%s/' % (SITE, t['slug'])
    # Root -> state -> (region) -> city. The Central Queensland towns keep
    # their regional hub in the trail because it is a real intermediate
    # page; the rest hang straight off the state. A city that claims to
    # sit under a region it is not in is a broken trail in the eyes of a
    # crawler and a confusing one for a reader.
    crumbs = [('Home', SITE + '/'),
              ('Queensland', '%s/kitchens/%s/' % (SITE, STATE_SLUG))]
    if t in TOWNS:
        crumbs.append(('Central Queensland', '%s/kitchens/%s/' % (SITE, HUB_SLUG)))
    crumbs.append((t['name'], url))

    sections = []
    for i, (heading, paras) in enumerate(t['body']):
        tint = ' sec--tint' if i % 2 else ''
        ps = '\n      '.join('<p>%s</p>' % p for p in paras)
        sections.append('''<section class="sec%(tint)s">
  <div class="wrap">
    <h2 class="narrow">%(h)s</h2>
    <div class="narrow" style="margin-top:1.5rem">
      %(ps)s
    </div>
  </div>
</section>''' % dict(tint=tint, h=esc(heading), ps=ps))

    quote = ''
    if t['quote']:
        text, who, where = t['quote']
        quote = '''<section class="sec sec--tint">
  <div class="wrap">
    <figure class="quote narrow">
      <blockquote class="quote__text">&ldquo;%s&rdquo;</blockquote>
      <figcaption class="quote__by">%s &middot; %s</figcaption>
    </figure>
  </div>
</section>''' % (esc(text), esc(who), esc(where))

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">%(region)s</p>
    <h1>%(h1)s</h1>
    <p class="lede">%(lede)s</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="loc-hero-planner">Design your kitchen</a>
      <a class="btn btn--ghost" href="#ranges">See the ranges</a>
    </p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <img src="%(up)simg-stock/%(hero)s" alt="%(heroalt)s" loading="lazy" decoding="async"
         style="width:100%%;max-height:min(70vh,34rem);object-fit:cover">
  </div>
</section>

%(sections)s

%(quote)s

<section class="sec" id="ranges">
  <div class="wrap">
    <p class="eyebrow">The ranges</p>
    <h2 class="narrow">Complete kitchens, from $%(anchor)s.</h2>
    <p class="narrow" style="margin-top:1.25rem;color:var(--muted)">Every range includes carcasses,
      doors, Blum hardware and a quartz or granite benchtop. Marble is available as a paid upgrade.
      There is no laminate and no timber benchtop.</p>
    <div class="grid3">
%(cards)s
    </div>
%(tbcblock)s  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">%(name)s, specifically.</h2>
%(faq)s
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">No showroom appointment, no sales visit,
      and no waiting on a quote. Draw your room, watch the number move, and take the cut list away.</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="loc-foot-cta">Open the planner</a>
    </p>
%(nearby)s
  </div>
</section>''' % dict(
        crumbs=crumbs_html(crumbs), region=esc(t['region']), h1=t['h1'],
        lede=esc(t['lede']), up=up, hero=t['hero'], heroalt=esc(t['heroalt']),
        sections='\n\n'.join(sections), quote=quote, anchor=ANCHOR,
        cards=price_cards(depth), name=esc(t['name']),
        tbcblock=F.tbc('    <p class="tbc">[TBC: DELIVERY COST AND LEAD TIME TO %s]</p>\n'
                       % t['name'].upper()),
        faq=faq_html(t['faqs']), hub=HUB_SLUG, nearby=nearby_html(t, up))

    desc = t['desc']
    if '%s' in desc:
        desc = desc % ANCHOR
    html = PAGE % dict(
        title=esc(t['title']), desc=esc(desc), url=url, site=SITE,
        hero=t['hero'], up=up,
        schema=schema(url, t['title'], desc, crumbs, t['faqs'], area=t['name']),
        mast=mast(depth), main=main, foot=foot(depth, TOWNS))

    d = os.path.join(ROOT, 'kitchens', t['slug'])
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


# -------------------------------------------------------------- hub page
def build_hub():
    depth = 2
    up = '../' * depth
    url = '%s/kitchens/%s/' % (SITE, HUB_SLUG)
    title = 'Architectural Kitchens Central Queensland | BILT Studio'
    desc = ('Architectural kitchens across Central Queensland — Rockhampton, '
            'Gladstone, Yeppoon, Emerald and Biloela. Complete kitchens from $%s.' % ANCHOR)
    crumbs = [('Home', SITE + '/'),
              ('Queensland', '%s/kitchens/%s/' % (SITE, STATE_SLUG)),
              ('Central Queensland', url)]

    towns_html = '\n'.join(
        '''  <li><a href="%skitchens/%s/">
    <h3>%s</h3>
    <p>%s</p>
  </a></li>''' % (up, t['slug'], esc(t['name']), esc(t['blurb'])) for t in TOWNS)

    faqs = [
        ("Which Central Queensland towns do you deliver to?",
         "Rockhampton is a named destination on our Queensland delivery run, and we deliver "
         "across the surrounding region including Gladstone, Yeppoon and the Capricorn Coast, "
         "Emerald and the Central Highlands, and Biloela and the Banana Shire. "
         "[TBC: FULL DELIVERY AREA, COST AND LEAD TIMES]"),
        ("Do I need to visit a showroom?",
         "No. You draw your room in the planner, the price updates as you go, and you get the "
         "cut list before you pay. That removes the measure-and-quote visit, which is the part "
         "of the process that costs the most time in regional Queensland."),
        ("How is cut-to-size different from chain store flat pack?",
         "Chain store flat pack comes in fixed module widths, so a wall that is not a neat "
         "multiple gets made up with filler panels. Every carcass here is cut to the dimensions "
         "you enter, so the cabinetry fits the room rather than the other way around."),
        ("What is included in the price?",
         "Carcasses, doors, Blum hardware — CLIP top BLUMOTION hinges and TANDEMBOX antaro "
         "runners — and a quartz or granite benchtop. Marble is a paid upgrade. There is no "
         "laminate or timber benchtop option."),
    ]

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">Central Queensland</p>
    <h1>Architectural kitchens,<br>across Central Queensland.</h1>
    <p class="lede">Rockhampton is already on our delivery run. Draw your room, see the price
      as you go, and get the cut list before you pay.</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="hub-hero-planner">Design your kitchen</a>
      <a class="btn btn--ghost" href="#towns">Find your town</a>
    </p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <img src="%(up)simg-stock/why-we-do-this.jpg"
         alt="A kitchen with a stone island, pale cabinetry and pendant lighting."
         loading="lazy" decoding="async"
         style="width:100%%;max-height:min(70vh,34rem);object-fit:cover">
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <h2 class="narrow">Regional Queensland pays twice for a kitchen.</h2>
    <div class="narrow" style="margin-top:1.5rem">
      <p>Once for the cabinetry, and once for the distance. Every conventional kitchen needs a
        measure visit before it needs an install, and outside the south-east that trip gets
        priced into the job — along with the wait for someone to make it.</p>
      <p>Cut-to-size removes most of that. You measure once with a tape, the pricing happens on
        screen instead of in a showroom, and the cabinetry travels flat, which is a far more
        efficient thing to freight than assembled boxes full of air.</p>
      <p>What arrives is not a compromise on fit. Every carcass is cut to the dimensions you
        entered, so a 2 380 mm wall gets 2 380 mm of cabinetry instead of two standard modules
        and a filler strip.</p>
    </div>
  </div>
</section>

<section class="sec sec--tint" id="towns">
  <div class="wrap">
    <p class="eyebrow">Where we deliver</p>
    <h2 class="narrow">Find your town.</h2>
    <ul class="towns">
%(towns)s
    </ul>
  </div>
</section>

<section class="sec" id="ranges">
  <div class="wrap">
    <p class="eyebrow">The ranges</p>
    <h2 class="narrow">Complete kitchens, from $%(anchor)s.</h2>
    <p class="narrow" style="margin-top:1.25rem;color:var(--muted)">Every range includes carcasses,
      doors, Blum hardware and a quartz or granite benchtop.</p>
    <div class="grid3">
%(cards)s
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">Delivering this far out.</h2>
%(faq)s
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">No showroom appointment, no sales visit,
      and no waiting on a quote.</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="hub-foot-cta">Open the planner</a>
    </p>
  </div>
</section>''' % dict(crumbs=crumbs_html(crumbs), up=up, towns=towns_html,
                     anchor=ANCHOR, cards=price_cards(depth), faq=faq_html(faqs))

    html = PAGE % dict(
        title=esc(title), desc=esc(desc), url=url, site=SITE,
        hero='why-we-do-this.jpg', up=up,
        schema=schema(url, title, desc, crumbs, faqs, area='Central Queensland'),
        mast=mast(depth), main=main, foot=foot(depth, TOWNS))

    d = os.path.join(ROOT, 'kitchens', HUB_SLUG)
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


# --------------------------------------------------------------- sitemap
def build_sitemap(urls):
    body = '\n'.join(
        '  <url>\n    <loc>%s</loc>\n    <changefreq>monthly</changefreq>\n'
        '    <priority>%s</priority>\n  </url>' % (u, p) for u, p in urls)
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           '%s\n</urlset>\n' % body)
    io.open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8').write(xml)
    return len(urls)


def build_state_hub():
    """The Queensland hub.

    Sits between the site root and the individual cities so the set has a
    spine: root -> state -> city, with Central Queensland hanging off it
    as a regional cluster. Without it, eighteen city pages all link
    sideways to each other and nothing consolidates.
    """
    depth = 2
    up = '../' * depth
    slug = 'queensland'
    url = '%s/kitchens/%s/' % (SITE, slug)
    title = 'Architectural Kitchens Queensland | Flat Pack Packages | BILT Studio'
    desc = ('Architectural kitchens across Queensland, from Cairns to the '
            'Gold Coast. Priced on the page. Complete kitchens from $%s.' % ANCHOR)
    crumbs = [('Home', SITE + '/'), ('Queensland', url)]

    groups = CLUSTERS
    by_slug = {c['slug']: c for c in ALL_PLACES}

    blocks = []
    for heading, slugs in groups:
        items = '\n'.join(
            '''  <li><a href="%skitchens/%s/">
    <h3>%s</h3>
    <p>%s</p>
  </a></li>''' % (up, s, esc(by_slug[s]['name']), esc(by_slug[s]['blurb']))
            for s in slugs if s in by_slug)
        extra = ''
        if heading == 'The Bowen Basin and mining corridor':
            extra = ('<p style="margin-top:1.25rem"><a href="%skitchens/%s/">'
                     'More on delivering across Central Queensland</a></p>' % (up, HUB_SLUG))
        blocks.append('''<section class="sec">
  <div class="wrap">
    <p class="eyebrow">%s</p>
    <ul class="towns">
%s
    </ul>%s
  </div>
</section>''' % (esc(heading), items, extra))

    faqs = [
        ("Do you deliver anywhere in Queensland?",
         "Yes. Everything ships direct from our base, flat-packed, so there is no showroom "
         "network to be near and no regional surcharge for being outside the south-east. " +
         F.FREIGHT_NOTE),
        ("How is delivery priced?",
         F.FREIGHT_NOTE + " That way the quote reflects the kitchen you actually drew rather "
         "than a guess at its size."),
        ("How is cut-to-size different from chain store flat pack?",
         "Chain store flat pack comes in fixed module widths, so a wall that is not a neat "
         "multiple gets made up with filler panels. Every carcass here is cut to the dimensions "
         "you enter, so the cabinetry fits the room rather than the other way around."),
        ("What is included in the price?",
         "Carcasses, doors, Blum hardware — CLIP top BLUMOTION hinges and TANDEMBOX antaro "
         "runners — and a quartz or granite benchtop. Marble is a paid upgrade. There is no "
         "laminate or timber benchtop option."),
    ]

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">Queensland</p>
    <h1>Architectural kitchens,<br>across Queensland.</h1>
    <p class="lede">From Cairns to the Gold Coast, shipped direct from our base. Draw your
      room, see the price as you go, and get the cut list before you pay.</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="qld-hero-planner">Design your kitchen</a>
      <a class="btn btn--ghost" href="#towns">Find your city</a>
    </p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <h2 class="narrow">One base, one price list, the whole state.</h2>
    <div class="narrow" style="margin-top:1.5rem">
      <p>Kitchens are normally sold through a showroom network, which is why what you pay
        depends partly on where you live. We ship direct from our base instead, so the
        cabinetry costs the same in Cairns as it does in Brisbane.</p>
      <p>%(freight)s</p>
      <p>Queensland is not one market, though. A tower apartment on the Gold Coast, a
        character Queenslander in Paddington, a rental between postings in Townsville and a
        homestead outside Emerald all want different things from a kitchen — so each city
        page below deals with what that place actually asks for.</p>
    </div>
  </div>
</section>

<section class="sec sec--tint" id="towns">
  <div class="wrap">
    <p class="eyebrow">Where we deliver</p>
    <h2 class="narrow">Find your city.</h2>
  </div>
</section>

%(blocks)s

<section class="sec sec--tint" id="ranges">
  <div class="wrap">
    <p class="eyebrow">The ranges</p>
    <h2 class="narrow">Complete kitchens, from $%(anchor)s.</h2>
    <div class="grid3">
%(cards)s
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">Delivering across Queensland.</h2>
%(faq)s
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">No showroom appointment, no sales visit,
      and no waiting on a quote.</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="qld-foot-cta">Open the planner</a>
    </p>
  </div>
</section>''' % dict(crumbs=crumbs_html(crumbs), up=up, blocks='\n\n'.join(blocks),
                     anchor=ANCHOR, cards=price_cards(depth), faq=faq_html(faqs),
                     freight=F.FREIGHT_NOTE)

    html = PAGE % dict(
        title=esc(title), desc=esc(desc), url=url, site=SITE,
        hero='why-we-do-this.jpg', up=up,
        schema=schema(url, title, desc, crumbs, faqs, area='Queensland'),
        mast=mast(depth), main=main, foot=foot(depth, TOWNS))

    d = os.path.join(ROOT, 'kitchens', slug)
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


if __name__ == '__main__':
    urls = [(SITE + '/', '1.0'), (SITE + '/roomplanner/', '0.8')]

    u, w = build_state_hub()
    urls.append((u, '0.9'))
    print('%-48s %4d words' % (u, w))

    hub_url, hub_words = build_hub()
    urls.append((hub_url, '0.9'))
    print('%-48s %4d words' % (hub_url, hub_words))

    for t in ALL_PLACES:
        u, w = build_town(t)
        urls.append((u, '0.8'))
        print('%-48s %4d words' % (u, w))

    print('sitemap.xml: %d urls' % build_sitemap(urls))
