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


# ----------------------------------------------------------------- towns
TOWNS = [
    dict(
        slug='rockhampton', name='Rockhampton', region='Central Queensland',
        blurb='Queenslander kitchens, under-house conversions and the freight route the rest of the region runs through.',
        hero='granny-flat.jpg',
        heroalt='A compact kitchen run in a converted under-house space, pale cabinetry and stone benchtop.',
        title='Flat Pack Kitchens Rockhampton | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Rockhampton. Draw your kitchen, see the price as you go. Complete kitchens from $%s.' % ANCHOR,
        h1='Flat pack kitchens,<br>delivered to Rockhampton.',
        lede='Rockhampton is already on our delivery run. Draw the room, watch the number move, and get the cut list before you pay a cent.',
        body=[
            ('Rockhampton kitchens are usually a shape problem before they are a budget problem',
             ["Much of Rockhampton's older housing is classic high-set Queenslander — timber, "
              "elevated, and built in an era when the kitchen was a closed room at the back of "
              "the house rather than the centre of it. That leaves a recognisable set of "
              "constraints: a narrow galley, a chamfered corner where the wall meets the "
              "verandah line, a doorway in exactly the wrong place, and a window you cannot "
              "move without touching the weatherboards.",
              "Off-the-shelf flat pack assumes none of that. It comes in fixed module widths, so "
              "you lay out 600s and 900s until you run out of wall and then hide the difference "
              "behind a filler panel. In a room that is 2 380 mm across, that is a visible "
              "compromise on a wall you look at every day.",
              "Cut-to-size starts from the opposite end. You give the planner the real dimensions "
              "and every carcass is cut to suit, so a 2 380 mm wall gets 2 380 mm of cabinetry. "
              "There is no filler strip because there is nothing to fill."]),
            ('The under-house conversion is the other half of the market here',
             ["Enclosing underneath a high-set house is one of the most common renovations in "
              "Rockhampton, and it almost always needs a second kitchen — a full one if it is "
              "becoming a granny flat, a kitchenette if it is a rumpus or a teenager's retreat.",
              "That is exactly what the 2 700 mm Granny flat range is sized for. It is a complete "
              "kitchen at $5,500, not a stripped-back one, which matters when the space is going "
              "to be rented or lived in by family rather than used twice a year."]),
        ],
        quote=("Glad we took the chance", "Sarah Wallace", "Rockhampton"),
        faqs=[
            ("Do you deliver to Rockhampton?",
             "Yes. Rockhampton is a named destination on our Queensland delivery run, alongside "
             "Brisbane and the Sunshine Coast. [TBC: DELIVERY COST AND LEAD TIME TO ROCKHAMPTON]"),
            ("Can you make cabinetry for an old Queenslander with uneven walls?",
             "That is the case cut-to-size handles best. Every carcass is cut to the dimensions "
             "you enter rather than picked from fixed module widths, so out-of-square walls and "
             "odd runs do not have to be absorbed by filler panels. Measure the room at several "
             "heights and use the tightest figure."),
            ("What does a granny flat kitchen cost in Rockhampton?",
             "The 2 700 mm Granny flat range starts at $5,500 and is a complete kitchen — "
             "carcasses, doors, Blum hardware and benchtop. The price you see in the planner is "
             "the price; there is no quote stage."),
            ("Do I need a cabinet maker to install it?",
             "No. It arrives flat-packed with a cut list and hardware. Plenty of people assemble "
             "and fit it themselves; a handyman or a chippie can do it faster. Plumbing and "
             "electrical still need the relevant licensed trades."),
        ],
    ),
    dict(
        slug='gladstone', name='Gladstone', region='Central Queensland',
        blurb='Investment properties, worker housing and kitchens that have to be durable before they are beautiful.',
        hero='compact.jpg',
        heroalt='A compact galley kitchen with flat-panel doors and a stone benchtop.',
        title='Flat Pack Kitchens Gladstone | Cut-to-Size Cabinetry | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Gladstone. Priced on the page, no quote stage. Complete kitchens from $%s.' % ANCHOR,
        h1='Flat pack kitchens,<br>delivered to Gladstone.',
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
        title='Flat Pack Kitchens Yeppoon & the Capricorn Coast | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Yeppoon and the Capricorn Coast. Priced on the page. Complete kitchens from $%s.' % ANCHOR,
        h1='Flat pack kitchens,<br>delivered to Yeppoon.',
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
        title='Flat Pack Kitchens Emerald & the Central Highlands | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Emerald and the Central Highlands. No showroom trip, no quote stage. From $%s.' % ANCHOR,
        h1='Flat pack kitchens,<br>delivered to Emerald.',
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
        title='Flat Pack Kitchens Biloela & the Banana Shire | BILT Studio',
        desc='Cut-to-size flat pack kitchens delivered to Biloela and the Banana Shire. Priced on the page. Complete kitchens from $%s.' % ANCHOR,
        h1='Flat pack kitchens,<br>delivered to Biloela.',
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


# -------------------------------------------------------------- template
def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


TBC_RE = re.compile(r'\s*\[TBC:[^\]]*\]')


def strip_tbc(t):
    """Remove [TBC: ...] markers from customer-facing copy.

    Applied to FAQ answers AND to the schema generated from them, so the
    visible text and the structured data cannot drift -- a [TBC] leaking
    into a FAQPage node would be published straight to Google.
    """
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
      </div>
      <div>
        <h4>Central Queensland</h4>
        <ul>
          <li><a href="%(up)skitchens/central-queensland/">All of Central Queensland</a></li>
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
    org = {
        "@type": "Organization",
        "@id": SITE + "/#organization",
        "name": F.BRAND,
        "legalName": F.LEGAL_NAME,
        "url": SITE + "/",
        "email": F.EMAIL,
        "areaServed": [{"@type": "State", "name": "Queensland"}] +
                      [{"@type": "City", "name": t["name"]} for t in TOWNS],
    }
    if F.PHONE_TEL:
        org["telephone"] = F.PHONE_TEL
        org["contactPoint"] = {
            "@type": "ContactPoint",
            "telephone": F.PHONE_TEL,
            "email": F.EMAIL,
            "contactType": "sales",
            "areaServed": "AU",
            "availableLanguage": "English",
        }
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
def build_town(t):
    depth = 2
    up = '../' * depth
    url = '%s/kitchens/%s/' % (SITE, t['slug'])
    crumbs = [('Home', SITE + '/'),
              ('Central Queensland', '%s/kitchens/%s/' % (SITE, HUB_SLUG)),
              (t['name'], url)]

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
    <p style="margin-top:2rem;font-size:.9375rem;color:#6F6A61">
      Also serving <a href="%(up)skitchens/%(hub)s/">the rest of Central Queensland</a>.</p>
  </div>
</section>''' % dict(
        crumbs=crumbs_html(crumbs), region=esc(t['region']), h1=t['h1'],
        lede=esc(t['lede']), up=up, hero=t['hero'], heroalt=esc(t['heroalt']),
        sections='\n\n'.join(sections), quote=quote, anchor=ANCHOR,
        cards=price_cards(depth), name=esc(t['name']),
        tbcblock=F.tbc('    <p class="tbc">[TBC: DELIVERY COST AND LEAD TIME TO %s]</p>\n'
                       % t['name'].upper()),
        faq=faq_html(t['faqs']), hub=HUB_SLUG)

    html = PAGE % dict(
        title=esc(t['title']), desc=esc(t['desc']), url=url, site=SITE,
        hero=t['hero'], up=up,
        schema=schema(url, t['title'], t['desc'], crumbs, t['faqs'], area=t['name']),
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
    title = 'Flat Pack Kitchens Central Queensland | Cut-to-Size Cabinetry | BILT Studio'
    desc = ('Cut-to-size flat pack kitchens delivered across Central Queensland — Rockhampton, '
            'Gladstone, Yeppoon, Emerald and Biloela. Complete kitchens from $%s.' % ANCHOR)
    crumbs = [('Home', SITE + '/'), ('Central Queensland', url)]

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
    <h1>Flat pack kitchens,<br>across Central Queensland.</h1>
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


if __name__ == '__main__':
    urls = [(SITE + '/', '1.0'), (SITE + '/roomplanner/', '0.8')]
    hub_url, hub_words = build_hub()
    urls.append((hub_url, '0.9'))
    print('%-46s %4d words' % (hub_url, hub_words))
    for t in TOWNS:
        u, w = build_town(t)
        urls.append((u, '0.8'))
        print('%-46s %4d words' % (u, w))
    print('sitemap.xml: %d urls' % build_sitemap(urls))
