# -*- coding: utf-8 -*-
"""Generate the build-type pages and their hub.

Run:  python _build_usecases.py   (after _build_locations.py)

Reuses the chrome, schema and price cards from _build_locations so these
pages are indistinguishable from the location set. What differs is the
breadcrumb trail (Home > Building or renovating > X rather than
Home > Queensland > City) and that each page ends with the
not-a-certifier disclaimer.
"""
import io, os, re

import _facts as F
import _build_locations as B
import _usecases as U

ROOT = B.ROOT
SITE = B.SITE
HUB = 'new-builds'


def _disclaimer():
    return ('<p class="tbc" style="max-width:68ch">%s</p>' % U.DISCLAIMER)


def build_page(u):
    depth = 2
    up = '../' * depth
    url = '%s/kitchens/%s/' % (SITE, u['slug'])
    crumbs = [('Home', SITE + '/'),
              ('Building or renovating', '%s/kitchens/%s/' % (SITE, HUB)),
              (u['name'], url)]

    sections = []
    for i, (heading, paras) in enumerate(u['body']):
        ps = '\n      '.join('<p>%s</p>' % p for p in paras)
        sections.append('<section class="sec%s">\n'
                        '  <div class="wrap">\n'
                        '    <h2 class="narrow">%s</h2>\n'
                        '    <div class="narrow" style="margin-top:1.5rem">\n'
                        '      %s\n'
                        '    </div>\n'
                        '  </div>\n'
                        '</section>' % (' sec--tint' if i % 2 else '', B.esc(heading), ps))

    others = '\n'.join(
        '  <li><a href="%skitchens/%s/">\n    <h3>%s</h3>\n    <p>%s</p>\n  </a></li>'
        % (up, o['slug'], B.esc(o['name']), B.esc(o['blurb']))
        for o in U.USECASES if o['slug'] != u['slug'])

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">Building or renovating</p>
    <h1>%(h1)s</h1>
    <p class="lede">%(lede)s</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="uc-hero-planner">Design your kitchen</a>
      <a class="btn btn--ghost" href="#ranges">See the ranges</a>
    </p>
    %(disc)s
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <img src="%(up)simg-stock/%(hero)s" alt="%(heroalt)s" loading="lazy" decoding="async"
         style="width:100%%;max-height:min(70vh,34rem);object-fit:cover">
  </div>
</section>

%(sections)s

<section class="sec" id="ranges">
  <div class="wrap">
    <p class="eyebrow">The ranges</p>
    <h2 class="narrow">Complete kitchens, from $%(anchor)s.</h2>
    <p class="narrow" style="margin-top:1.25rem;color:var(--muted)">Every range includes
      carcasses, doors, Blum hardware and a quartz or granite benchtop. %(freight)s</p>
    <div class="grid3">
%(cards)s
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">%(name)s, specifically.</h2>
%(faq)s
    %(disc)s
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">Also building</p>
    <h2 class="narrow">Other builds we fit out.</h2>
    <ul class="towns">
%(others)s
    </ul>
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">A full cut list and setout before you
      pay, so your builder knows exactly what is coming.</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="uc-foot-cta">Open the planner</a>
    </p>
  </div>
</section>''' % dict(
        crumbs=B.crumbs_html(crumbs), h1=u['h1'], lede=B.esc(u['lede']), up=up,
        hero=u['hero'], heroalt=B.esc(u['heroalt']), sections='\n\n'.join(sections),
        anchor=B.ANCHOR, cards=B.price_cards(depth), faq=B.faq_html(u['faqs']),
        name=B.esc(u['name']), others=others, disc=_disclaimer(),
        freight=F.FREIGHT_SHORT)

    desc = u['desc']
    if '%s' in desc:
        desc = desc % B.ANCHOR

    html = B.PAGE % dict(
        title=B.esc(u['title']), desc=B.esc(desc), url=url, site=SITE,
        hero=u['hero'], up=up,
        schema=B.schema(url, u['title'], desc, crumbs, u['faqs']),
        mast=B.mast(depth), main=main, foot=B.foot(depth, B.TOWNS))

    d = os.path.join(ROOT, 'kitchens', u['slug'])
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


def build_hub():
    depth = 2
    up = '../' * depth
    url = '%s/kitchens/%s/' % (SITE, HUB)
    title = 'Architectural Kitchens for New Builds | Class 1a, Granny Flats'
    desc = ('Cut-to-size kitchens for new builds and renovations — Class 1a dwellings, '
            'granny flats, tiny homes and modular builds. From $%s.' % B.ANCHOR)
    crumbs = [('Home', SITE + '/'), ('Building or renovating', url)]

    items = '\n'.join(
        '  <li><a href="%skitchens/%s/">\n    <h3>%s</h3>\n    <p>%s</p>\n  </a></li>'
        % (up, o['slug'], B.esc(o['name']), B.esc(o['blurb'])) for o in U.USECASES)

    faqs = [
        ("What is a Class 1a building?",
         "Under the National Construction Code, Class 1a is a single dwelling: a detached "
         "house, or one of a group of attached dwellings such as a townhouse separated by "
         "fire-resisting walls. Class 10a covers non-habitable structures like sheds and "
         "garages, and Class 2 covers apartments. Your building certifier confirms which "
         "applies to your project."),
        ("Is a tiny home a Class 1a building?",
         "Only if it is on a fixed foundation. A tiny home on wheels is generally treated as a "
         "registrable vehicle rather than a building, so it sits outside the NCC classes "
         "entirely and is governed by vehicle rules and your council's occupancy rules "
         "instead."),
        ("Can I buy a kitchen before the room is built?",
         "Yes, and a new build is the ideal case for it — the dimensions come off the plan and "
         "every carcass is cut to those numbers. You get a full cut list and setout for your "
         "builder before manufacture. Confirm as-built dimensions before ordering, since walls "
         "move slightly during construction."),
        ("Do you provide documentation for a builder or certifier?",
         "The planner produces a full cut list and setout showing every cabinet dimension and "
         "where services need to land. We supply cabinetry, not building certification — "
         "approval documentation comes from your certifier."),
    ]

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">Building or renovating</p>
    <h1>Architectural kitchens<br>for new builds.</h1>
    <p class="lede">Class 1a dwellings, granny flats, tiny homes and modular builds — priced
      on the page, with a cut list your builder can work from.</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="uc-hub-planner">Design your kitchen</a>
      <a class="btn btn--ghost" href="#types">Find your build type</a>
    </p>
    %(disc)s
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <h2 class="narrow">The kitchen is the line item everyone leaves until last.</h2>
    <div class="narrow" style="margin-top:1.5rem">
      <p>By the time a build reaches fitout the budget is usually tight, the program has
        slipped, and the kitchen is the biggest discretionary number left. That is exactly
        when a quote that takes three weeks and then moves does the most damage.</p>
      <p>Specifying it early solves that. On a new build the room does not exist yet, so the
        dimensions are whatever the plan says — which means you can price the kitchen
        properly at design stage instead of guessing, and hand your builder a cut list and
        setout showing where every service needs to land.</p>
      <p>%(freight)s</p>
    </div>
  </div>
</section>

<section class="sec sec--tint" id="types">
  <div class="wrap">
    <p class="eyebrow">Build types</p>
    <h2 class="narrow">What are you building?</h2>
    <ul class="towns">
%(items)s
    </ul>
  </div>
</section>

<section class="sec" id="ranges">
  <div class="wrap">
    <p class="eyebrow">The ranges</p>
    <h2 class="narrow">Complete kitchens, from $%(anchor)s.</h2>
    <div class="grid3">
%(cards)s
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">Classifications and approvals.</h2>
%(faq)s
    %(disc)s
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">No showroom appointment, no sales visit,
      and no waiting on a quote.</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="uc-hub-cta">Open the planner</a>
    </p>
  </div>
</section>''' % dict(crumbs=B.crumbs_html(crumbs), up=up, items=items,
                     anchor=B.ANCHOR, cards=B.price_cards(depth), faq=B.faq_html(faqs),
                     disc=_disclaimer(), freight=F.FREIGHT_NOTE)

    html = B.PAGE % dict(
        title=B.esc(title), desc=B.esc(desc), url=url, site=SITE,
        hero='why-we-do-this.jpg', up=up,
        schema=B.schema(url, title, desc, crumbs, faqs),
        mast=B.mast(depth), main=main, foot=B.foot(depth, B.TOWNS))

    d = os.path.join(ROOT, 'kitchens', HUB)
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


if __name__ == '__main__':
    made = []
    u, w = build_hub()
    made.append((u, '0.9'))
    print('%-52s %4d words' % (u, w))
    for uc in U.USECASES:
        u, w = build_page(uc)
        made.append((u, '0.8'))
        print('%-52s %4d words' % (u, w))

    # rebuild the sitemap so it carries locations AND build types
    urls = [(SITE + '/', '1.0'), (SITE + '/roomplanner/', '0.8'),
            ('%s/kitchens/%s/' % (SITE, B.STATE_SLUG), '0.9'),
            ('%s/kitchens/%s/' % (SITE, B.HUB_SLUG), '0.9')]
    urls += [('%s/kitchens/%s/' % (SITE, p['slug']), '0.8') for p in B.ALL_PLACES]
    urls += made
    seen, dedup = set(), []
    for u, p in urls:
        if u not in seen:
            seen.add(u)
            dedup.append((u, p))
    print('sitemap.xml: %d urls' % B.build_sitemap(dedup))
