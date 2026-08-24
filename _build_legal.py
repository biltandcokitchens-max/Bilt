# -*- coding: utf-8 -*-
"""Generate the three legal pages.

Run:  python _build_legal.py   (after _build_locations.py)

WHY THESE EXIST AT ALL
Privacy / Terms of sale / Warranty are linked from every footer on the
site, so they cannot 404 -- and until now they did.

WHY THEY ARE NOT FINISHED
Terms of sale and warranty wording are consumer-law sensitive.
BILT_STUDIO_HANDOFF.md sec.6 says explicitly not to draft the warranty
speculatively, and the same reasoning applies to terms. So each page is
honest about being a draft and carries `noindex` until it is signed off:
a visible draft beats a broken link, but an unfinished legal page must
never be what a search result lands on.

The privacy page is different -- most of it is a factual description of
what this codebase actually does, which is knowable. Only the parts that
depend on the owner (postal address, processors, complaint handling)
are left as [TBC].
"""
import io, os

import _build_locations as B   # reuse the template, chrome and schema

ROOT = B.ROOT
SITE = B.SITE

LEGAL = [
    dict(
        slug='privacy', title='Privacy Policy', h1='Privacy policy',
        body=[
            ("What this site collects", [
                "<strong>Analytics.</strong> The site ships a measurement layer that is "
                "currently switched off. No analytics identifier is configured, so no "
                "analytics request is sent and no analytics cookie is set. If it is switched "
                "on later it runs behind Google Consent Mode with storage denied by default, "
                "which means a first visit stays cookieless unless you opt in.",
                "<strong>Trade accounts.</strong> If you apply for a trade account we collect "
                "the business details you enter: business name, ABN, website, address, phone, "
                "email, trade type, years in business and approximate kitchens per year. Your "
                "password is stored only as a bcrypt hash and never in readable form. Your "
                "login session is a signed token held in your own browser, not on our server.",
                "<strong>Email.</strong> If you email us we hold that message and your address "
                "so we can reply.",
                "<strong>The room planner.</strong> Kitchen designs you draw stay in your own "
                "browser. Drawing a kitchen does not send it to us.",
            ]),
            ("What we do not do", [
                "We do not sell personal information. There is no advertising or remarketing "
                "pixel on this site -- no Meta, TikTok or LinkedIn tag on any page.",
            ]),
            ("Where it is held", [
                "The site and its database are hosted on Netlify.",
                "[TBC: DATA RESIDENCY, RETENTION PERIOD AND ANY OTHER PROCESSORS]",
            ]),
            ("Your rights", [
                "Under the Privacy Act 1988 (Cth) and the Australian Privacy Principles you "
                "may ask what personal information we hold about you, ask us to correct it, "
                "and ask us to delete it. Email "
                "<a href=\"mailto:hello@biltstudio.com.au\">hello@biltstudio.com.au</a>.",
                "[TBC: PRIVACY CONTACT, POSTAL ADDRESS AND COMPLAINT-HANDLING PROCESS]",
            ]),
        ]),
    dict(
        slug='terms', title='Terms of Sale', h1='Terms of sale',
        body=[
            ("This page is not finished yet", [
                "Terms of sale govern payment, delivery, cancellation, variation and risk. "
                "They have to describe how this business actually operates rather than be "
                "adapted from a template, and they have not been settled yet.",
                "[TBC: TERMS OF SALE. REQUIRES OWNER SIGN-OFF AND, REALISTICALLY, LEGAL "
                "REVIEW. MUST COVER AT MINIMUM: PAYMENT AND DEPOSIT TERMS; DELIVERY AND "
                "FREIGHT; LEAD TIMES; CANCELLATION AND VARIATION; RISK AND TITLE ON DELIVERY; "
                "WHO IS RESPONSIBLE FOR MEASUREMENTS; AND WHAT HAPPENS WHEN CUSTOMER-SUPPLIED "
                "DIMENSIONS TURN OUT TO BE WRONG.]",
                "Whatever those terms end up saying, nothing in them can exclude the "
                "guarantees you have under the Australian Consumer Law.",
            ]),
        ]),
    dict(
        slug='warranty', title='Warranty', h1='Warranty',
        body=[
            ("This page is not finished yet", [
                "Warranty terms sit directly on top of the consumer guarantees in the "
                "Australian Consumer Law, and getting the wording wrong is a compliance "
                "problem rather than a copywriting one. It has deliberately not been drafted "
                "here.",
                "[TBC: WARRANTY TERMS AND ACL WORDING. OWNER TO CONFIRM -- DO NOT DRAFT "
                "SPECULATIVELY. NEEDS: WARRANTY PERIOD BY COMPONENT (CARCASS, DOORS, "
                "HARDWARE, BENCHTOP); WHAT IS AND IS NOT COVERED; THE CLAIM PROCESS; AND THE "
                "MANDATORY ACL TEXT.]",
                "In the meantime, the position that always applies: our goods come with "
                "guarantees that cannot be excluded under the Australian Consumer Law. Any "
                "warranty we offer is in addition to those rights, never instead of them.",
            ]),
        ]),
]


def build():
    depth = 2
    up = '../' * depth
    made = []
    for L in LEGAL:
        url = '%s/legal/%s/' % (SITE, L['slug'])
        crumbs = [('Home', SITE + '/'), (L['title'], url)]

        secs = []
        for i, (h, paras) in enumerate(L['body']):
            ps = '\n      '.join('<p>%s</p>' % x for x in paras)
            secs.append(
                '<section class="sec%s">\n'
                '  <div class="wrap">\n'
                '    <h2 class="narrow">%s</h2>\n'
                '    <div class="narrow" style="margin-top:1.5rem">\n'
                '      %s\n'
                '    </div>\n'
                '  </div>\n'
                '</section>' % (' sec--tint' if i % 2 else '', B.esc(h), ps))

        main = (
            '%s\n\n'
            '<section class="hero-block">\n'
            '  <div class="wrap">\n'
            '    <p class="eyebrow">Legal</p>\n'
            '    <h1>%s</h1>\n'
            '    <p class="lede">Last reviewed 24 August 2026.</p>\n'
            '    <p class="tbc" style="max-width:68ch">This page is a working draft. It is '
            'marked noindex until it has been reviewed and signed off.</p>\n'
            '  </div>\n'
            '</section>\n\n%s' % (B.crumbs_html(crumbs), B.esc(L['h1']), '\n\n'.join(secs)))

        desc = '%s for BILT Studio, a trading name of Bilt & Co Pty Ltd.' % L['title']
        html = B.PAGE % dict(
            title=B.esc('%s | BILT Studio' % L['title']), desc=B.esc(desc),
            url=url, site=SITE, hero='why-we-do-this.jpg', up=up,
            schema=B.schema(url, L['title'], desc, crumbs, None),
            mast=B.mast(depth), main=main, foot=B.foot(depth, B.TOWNS))

        # a draft legal page must never be the thing a search result lands on
        html = html.replace(
            '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
            '<meta name="robots" content="noindex, follow">')

        d = os.path.join(ROOT, 'legal', L['slug'])
        os.makedirs(d, exist_ok=True)
        io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
        made.append(url)
    return made


if __name__ == '__main__':
    for u in build():
        print('%-46s noindex (deliberately absent from sitemap.xml)' % u)
