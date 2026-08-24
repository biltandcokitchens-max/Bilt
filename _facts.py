# -*- coding: utf-8 -*-
"""Single source of truth for the business facts that appear site-wide.

Every generated page reads these. Changing a value here and re-running

    python _build_locations.py && python _build_legal.py

updates every page at once. That matters more than it sounds: NAP
consistency -- the same name, address and phone rendered identically
everywhere -- is a real local-ranking factor, and the way it usually
breaks is a number updated in four places out of nine.

CONFIRMED values only. Anything still unknown stays None, and the
templates render a visible [TBC] rather than a guess. See
PLACEHOLDERS.md for what is outstanding and why.
"""

# --- identity ----------------------------------------------------------
BRAND = 'BILT Studio'
LEGAL_NAME = 'Bilt & Co Pty Ltd'
ACN = '700 798 509'
ABN = None                      # [TBC] owner to confirm
EMAIL = 'hello@biltstudio.com.au'

# --- phone -------------------------------------------------------------
# Confirmed 24 Aug 2026. Australia has only four area codes, so there is
# no such thing as a per-town local number -- Rockhampton, Gladstone,
# Yeppoon, Emerald, Biloela and Brisbane are all 07. A mobile is
# accepted by Google Business Profile with no ranking penalty, and one
# number used identically everywhere beats a "more local"-looking one
# used inconsistently.
#
# To swap to an 07 49xx number later: change these three lines, re-run
# both generators, and update the Google Business Profile to match on
# the same day. Never run two numbers at once.
PHONE_DISPLAY = '0401 821 848'
PHONE_TEL = '+61401821848'      # E.164, for tel: hrefs and schema

# --- premises ----------------------------------------------------------
# Confirmed 24 Aug 2026: there is no premises. This is a service-area
# business, so no page claims a street address and no page emits a
# LocalBusiness node -- that type needs a postalAddress to be eligible
# for rich results, and asserting one that does not exist is worse than
# asserting nothing. The Google Business Profile should be set up as a
# service-area business with the address hidden.
HAS_PREMISES = False

# --- delivery ----------------------------------------------------------
# Confirmed 24 Aug 2026: shipped direct from base, Australia-wide.
# Freight is not a published rate card -- it is quoted per order after a
# team member manually reviews the 3D plan from the room planner. That
# is worth stating plainly rather than hiding: it answers the buyer's
# real question ("what will delivery cost me?") with the true answer
# ("a person checks your actual design first"), and it doubles as the
# only human touchpoint in an otherwise self-serve funnel.
SHIPS_NATIONALLY = True
FREIGHT_NOTE = (
    'Delivery is quoted per order, not off a rate card. Once you have drawn '
    'your kitchen in the planner, one of our team checks the 3D plan by hand '
    'and confirms freight to your address.')
FREIGHT_SHORT = 'Freight is quoted per address once your plan is checked.'

POSTAL_ADDRESS = None
SERVICE_AREA_NOTE = 'Service-area business. Display in Queensland, by appointment.'

# --- pricing, confirmed in BILT_STUDIO_HANDOFF.md sec.1 ----------------
PRICE_ANCHOR = '4,490'


def phone_link(cls='', track='phone'):
    """A tel: link, or the TBC marker if the number is ever unset."""
    if not PHONE_DISPLAY:
        return ''          # absence, never a placeholder -- see abn_line()
    c = ' class="%s"' % cls if cls else ''
    return '<a href="tel:%s"%s data-track="%s">%s</a>' % (
        PHONE_TEL, c, track, PHONE_DISPLAY)


def abn_line():
    """The ABN, or nothing.

    An unconfirmed value renders as absence, not as a visible [TBC].
    A placeholder in a footer is a note-to-self published to customers:
    it reads as an unfinished site, and "ABN: to be confirmed" damages
    trade credibility more than simply not listing one does. The gap is
    tracked in PLACEHOLDERS.md, which is where it belongs.
    """
    return ('ABN %s' % ABN) if ABN else ''


# --- placeholder policy ------------------------------------------------
# False: unconfirmed facts render as absence on customer-facing pages.
# A [TBC] in front of a buyer is a note-to-self published by accident --
# it reads as an unfinished site and costs more trust than the missing
# fact does. The gaps stay tracked in PLACEHOLDERS.md, which is the right
# place for them.
#
# The noindex legal drafts are the deliberate exception: those pages
# announce themselves as unfinished, so naming what is missing is honest
# rather than sloppy.
SHOW_PLACEHOLDERS = False


def tbc(text):
    """Render a [TBC: ...] marker only when placeholders are switched on."""
    return text if SHOW_PLACEHOLDERS else ''


# --- what we sell, structured -----------------------------------------
SLOGAN = 'A beautiful kitchen should not cost what you think.'

# Confirmed ranges, BILT_STUDIO_HANDOFF.md sec.1
CATALOG = [
    ('Compact kitchen', '2400 mm', '4590',
     'A complete 2400 mm cut-to-size kitchen: carcasses, doors, Blum hardware '
     'and a quartz or granite benchtop.'),
    ('Granny flat kitchen', '2700 mm', '5500',
     'A complete 2700 mm cut-to-size kitchen for a secondary dwelling or a '
     'converted under-house space.'),
    ('Tiny home kitchen', '3000 mm', '7500',
     'A complete 3000 mm cut-to-size kitchen for a tiny home or cabin.'),
]

# Profiles the business actually controls. sameAs is how an assistant
# reconciles "BILT Studio" across sources and decides it is one entity --
# it is the single highest-value field still empty. Add real URLs only;
# a wrong sameAs is worse than none.
SAME_AS = []          # [TBC] e.g. Google Business Profile, Instagram, Facebook

# A square logo on its own background. Knowledge panels and assistant
# answers use it; there is no logo file in the repo yet.
LOGO_URL = None       # [TBC] e.g. https://biltstudio.com.au/img/logo.png


def organization_node(site, towns=None):
    """The Organization node, emitted identically on every page.

    One definition rather than per-template copies: assistants and
    crawlers reconcile entities by @id, and an Organization that says
    slightly different things on different URLs is a weaker entity than
    one that says the same thing everywhere.
    """
    node = {
        '@type': 'Organization',
        '@id': site + '/#organization',
        'name': BRAND,
        'legalName': LEGAL_NAME,
        'url': site + '/',
        'email': EMAIL,
        'slogan': SLOGAN,
        'description': (
            'Cut-to-size flat pack kitchen cabinetry, made to order and shipped '
            'direct across Australia. Kitchens are drawn and priced in an online '
            'planner, with the cut list supplied before payment. Complete kitchens '
            'from $%s. Blum hardware and stone benchtops standard.' % PRICE_ANCHOR),
        'knowsAbout': [
            'flat pack kitchens', 'cut-to-size cabinetry', 'kitchen cabinet making',
            'granny flat kitchens', 'tiny home kitchens', 'kitchen renovation',
            'Blum hardware', 'quartz benchtops', 'kitchen cut lists',
        ],
        'identifier': [{
            '@type': 'PropertyValue',
            'propertyID': 'ACN',
            'value': ACN.replace(' ', ''),
        }],
        'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Kitchen ranges',
            'itemListElement': [{
                '@type': 'Offer',
                'itemOffered': {
                    '@type': 'Product',
                    'name': name,
                    'description': desc,
                    'material': 'Cabinetry with Blum hardware and a quartz or granite benchtop',
                    'size': run,
                },
                'price': price,
                'priceCurrency': 'AUD',
                'availability': 'https://schema.org/InStock',
            } for name, run, price, desc in CATALOG],
        },
    }
    if PHONE_TEL:
        node['telephone'] = PHONE_TEL
        node['contactPoint'] = {
            '@type': 'ContactPoint', 'telephone': PHONE_TEL, 'email': EMAIL,
            'contactType': 'sales', 'areaServed': 'AU', 'availableLanguage': 'English',
        }
    if ABN:
        node['identifier'].append({
            '@type': 'PropertyValue', 'propertyID': 'ABN', 'value': ABN.replace(' ', '')})
    if LOGO_URL:
        node['logo'] = LOGO_URL
        node['image'] = LOGO_URL
    if SAME_AS:
        node['sameAs'] = SAME_AS
    # No postalAddress and no LocalBusiness type: service-area business
    # with no premises. See the note on HAS_PREMISES above.
    area = [{'@type': 'Country', 'name': 'Australia'},
            {'@type': 'State', 'name': 'Queensland'}]
    if towns:
        area += [{'@type': 'City', 'name': t} for t in towns]
    node['areaServed'] = area
    return node
