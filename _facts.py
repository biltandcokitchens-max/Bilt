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
POSTAL_ADDRESS = None
SERVICE_AREA_NOTE = 'Service-area business. Display in Queensland, by appointment.'

# --- pricing, confirmed in BILT_STUDIO_HANDOFF.md sec.1 ----------------
PRICE_ANCHOR = '4,490'


def phone_link(cls='', track='phone'):
    """A tel: link, or the TBC marker if the number is ever unset."""
    if not PHONE_DISPLAY:
        return '<span class="tbc">[TBC: PHONE NUMBER]</span>'
    c = ' class="%s"' % cls if cls else ''
    return '<a href="tel:%s"%s data-track="%s">%s</a>' % (
        PHONE_TEL, c, track, PHONE_DISPLAY)


def abn_line():
    return ('ABN %s' % ABN) if ABN else '<span class="tbc">[TBC: ABN]</span>'
