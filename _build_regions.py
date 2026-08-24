# -*- coding: utf-8 -*-
"""Generate the regional hub pages.

Run:  python _build_regions.py   (after _build_locations.py)

Reuses the chrome and schema from _build_locations. The one thing these
pages do that no other page type does is name the towns that did NOT
earn their own page -- see the `also` list in _regions.py. That is how a
small town gets served without generating a doorway page for it.
"""
import io, os, re

import _facts as F
import _build_locations as B
import _regions as R

ROOT = B.ROOT
SITE = B.SITE


def build_region(r):
    depth = 2
    up = '../' * depth
    url = '%s/kitchens/%s/' % (SITE, r['slug'])

    crumbs = [('Home', SITE + '/'),
              ('Queensland', '%s/kitchens/%s/' % (SITE, B.STATE_SLUG))]
    if r['parent'] != 'queensland':
        crumbs.append(('Central Queensland',
                       '%s/kitchens/%s/' % (SITE, B.HUB_SLUG)))
    crumbs.append((r['name'], url))

    by = {c['slug']: c for c in B.ALL_PLACES}
    row = ('  <li><a href="%skitchens/%s/">\n'
           '    <h3>%s</h3>\n'
           '    <p>%s</p>\n'
           '  </a></li>')
    towns = '\n'.join(
        row % (up, s, B.esc(by[s]['name']), B.esc(by[s]['blurb']))
        for s in r['towns'] if s in by)

    # The towns without their own page. Naming them is the whole point of
    # a regional hub -- it is what lets the brief's "do not create a page
    # for every town" rule coexist with actually serving those towns.
    also = ''
    if r.get('also'):
        also = ('<p style="margin-top:2rem;max-width:68ch;color:var(--muted)">'
                'We also deliver to %s and the surrounding district. Those towns do not have '
                'their own page &mdash; the delivery, pricing and specification are identical '
                'to the towns above.</p>'
                % (', '.join(r['also'][:-1]) + ' and ' + r['also'][-1]))

    sections = []
    for i, (heading, paras) in enumerate(r['body']):
        ps = '\n      '.join('<p>%s</p>' % p for p in paras)
        sections.append('<section class="sec%s">\n'
                        '  <div class="wrap">\n'
                        '    <h2 class="narrow">%s</h2>\n'
                        '    <div class="narrow" style="margin-top:1.5rem">\n'
                        '      %s\n'
                        '    </div>\n'
                        '  </div>\n'
                        '</section>' % (' sec--tint' if i % 2 else '',
                                        B.esc(heading), ps))

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">%(name)s</p>
    <h1>%(h1)s</h1>
    <p class="lede">%(lede)s</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="region-hero-planner">Design your kitchen</a>
      <a class="btn btn--ghost" href="#towns">Find your town</a>
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

<section class="sec sec--tint" id="towns">
  <div class="wrap">
    <p class="eyebrow">Where we deliver</p>
    <h2 class="narrow">Towns across %(name)s.</h2>
    <ul class="towns">
%(towns)s
    </ul>
    %(also)s
  </div>
</section>

<section class="sec" id="ranges">
  <div class="wrap">
    <p class="eyebrow">The ranges</p>
    <h2 class="narrow">Complete kitchens, from $%(anchor)s.</h2>
    <p class="narrow" style="margin-top:1.25rem;color:var(--muted)">%(freight)s</p>
    <div class="grid3">
%(cards)s
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">Delivering across %(name)s.</h2>
%(faq)s
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">No showroom appointment, no sales visit,
      and no waiting on a quote.</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="region-foot-cta">Open the planner</a>
    </p>
    <p style="margin-top:2rem;font-size:.9375rem;color:#6F6A61">
      See every region across <a href="%(up)skitchens/queensland/">Queensland</a>.</p>
  </div>
</section>''' % dict(
        crumbs=B.crumbs_html(crumbs), name=B.esc(r['name']), h1=r['h1'],
        lede=B.esc(r['lede']), up=up, hero=r['hero'], heroalt=B.esc(r['heroalt']),
        sections='\n\n'.join(sections), towns=towns, also=also,
        anchor=B.ANCHOR, cards=B.price_cards(depth), faq=B.faq_html(r['faqs']),
        freight=F.FREIGHT_NOTE)

    desc = r['desc']
    if '%s' in desc:
        desc = desc % B.ANCHOR

    html = B.PAGE % dict(
        title=B.esc(r['title']), desc=B.esc(desc), url=url, site=SITE,
        hero=r['hero'], up=up,
        schema=B.schema(url, r['title'], desc, crumbs, r['faqs'], area=r['name']),
        mast=B.mast(depth), main=main, foot=B.foot(depth, B.TOWNS))

    d = os.path.join(ROOT, 'kitchens', r['slug'])
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split()), len(r.get('also', []))


if __name__ == '__main__':
    covered = 0
    for r in R.REGIONS:
        u, w, a = build_region(r)
        covered += a
        print('%-52s %4d words  (+%d towns named)' % (u, w, a))
    print('small towns served without their own page: %d' % covered)
