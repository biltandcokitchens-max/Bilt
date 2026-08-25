# -*- coding: utf-8 -*-
"""Generic content-page builder for guides, product and spec pages.

Run after _build_locations.py.

Everything that is not a location, a comparison or the pricing page runs
through here: the measuring guide, the trade page, the range/spec page,
cabinet types, layouts, use-cases and material guides. One template, and
all the substance in _content.py -- same split as the location
generator, and for the same reason.

Pages declare their own section (the first breadcrumb after Home), so a
guide sits under /guides/ and a cabinet type under /cabinets/ without
needing a builder each.
"""
import io, os, re

import _facts as F
import _build_locations as B
import _content as CT

ROOT = B.ROOT
SITE = B.SITE


def _sections(body):
    out = []
    for i, (heading, paras) in enumerate(body):
        ps = '\n      '.join('<p>%s</p>' % p for p in paras)
        out.append('<section class="sec%s">\n  <div class="wrap">\n'
                   '    <h2 class="narrow">%s</h2>\n'
                   '    <div class="narrow" style="margin-top:1.5rem">\n      %s\n    </div>\n'
                   '  </div>\n</section>' % (' sec--tint' if i % 2 else '',
                                             B.esc(heading), ps))
    return '\n\n'.join(out)


def _steps(steps):
    """Numbered steps. Used by the measuring guide; HowTo-shaped."""
    if not steps:
        return ''
    rows = []
    for n, (title, text) in enumerate(steps, 1):
        rows.append(
            '  <li style="margin-bottom:1.75rem">\n'
            '    <h3 style="margin-bottom:.5rem">%d. %s</h3>\n'
            '    <p style="margin:0;color:var(--muted)">%s</p>\n'
            '  </li>' % (n, B.esc(title), text))
    return ('<ol class="narrow" style="list-style:none;padding:0;margin-top:2rem">\n%s\n</ol>'
            % '\n'.join(rows))


def _siblings(page, up):
    sibs = [p for p in CT.PAGES
            if p['section'] == page['section'] and p['slug'] != page['slug']]
    if not sibs:
        return ''
    row = ('  <li><a href="%s%s/%s/">\n    <h3>%s</h3>\n    <p>%s</p>\n  </a></li>')
    items = '\n'.join(
        row % (up, o['section'], o['slug'], B.esc(o['nav']), B.esc(o['blurb']))
        for o in sibs)
    return '''<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">%s</p>
    <h2 class="narrow">%s</h2>
    <ul class="towns">
%s
    </ul>
  </div>
</section>''' % (B.esc(page['sectionLabel']), B.esc(page.get('siblingsHeading', 'Related')),
                 items)


def build_page(p):
    depth = 2
    up = '../' * depth
    url = '%s/%s/%s/' % (SITE, p['section'], p['slug'])
    crumbs = [('Home', SITE + '/'),
              (p['sectionLabel'], '%s/%s/' % (SITE, p['section'])),
              (p['nav'], url)]

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">%(eyebrow)s</p>
    <h1>%(h1)s</h1>
    <p class="lede">%(lede)s</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="ct-hero-planner">%(cta)s</a>
      <a class="btn btn--ghost" href="%(up)spricing/">See pricing</a>
    </p>
  </div>
</section>

%(steps)s

%(sections)s

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">%(faqhead)s</h2>
%(faq)s
  </div>
</section>

%(siblings)s

<section class="sec">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">%(closing)s</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="ct-foot-cta">Open the planner</a>
    </p>
  </div>
</section>''' % dict(
        crumbs=B.crumbs_html(crumbs), eyebrow=B.esc(p['sectionLabel']), h1=p['h1'],
        lede=B.esc(p['lede']), up=up, cta=B.esc(p.get('cta', 'Design your kitchen')),
        steps=(('<section class="sec"><div class="wrap">%s</div></section>'
                % _steps(p['steps'])) if p.get('steps') else ''),
        sections=_sections(p['body']), faq=B.faq_html(p['faqs']),
        faqhead=B.esc(p.get('faqHeading', p['nav'] + ', specifically.')),
        siblings=_siblings(p, up),
        closing=B.esc(p.get('closing',
                            'Every cabinet prices as a line item as you draw, and the cut '
                            'list is yours before you pay anything.')))

    desc = p['desc']
    if '%s' in desc:
        desc = desc % B.ANCHOR

    html = B.PAGE % dict(
        title=B.esc(p['title']), desc=B.esc(desc), url=url, site=SITE,
        hero=p.get('hero', 'why-we-do-this.jpg'), up=up,
        schema=B.schema(url, p['title'], desc, crumbs, p['faqs']),
        mast=B.mast(depth), main=main, foot=B.foot(depth, B.TOWNS))

    d = os.path.join(ROOT, p['section'], p['slug'])
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


def build_section_hub(section, meta):
    depth = 1
    up = '../' * depth
    url = '%s/%s/' % (SITE, section)
    crumbs = [('Home', SITE + '/'), (meta['label'], url)]
    pages = [p for p in CT.PAGES if p['section'] == section]

    row = ('  <li><a href="%s%s/%s/">\n    <h3>%s</h3>\n    <p>%s</p>\n  </a></li>')
    items = '\n'.join(row % (up, section, o['slug'], B.esc(o['nav']), B.esc(o['blurb']))
                      for o in pages)

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">%(label)s</p>
    <h1>%(h1)s</h1>
    <p class="lede">%(lede)s</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="cthub-planner">Design your kitchen</a>
      <a class="btn btn--ghost" href="%(up)spricing/">See pricing</a>
    </p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="narrow">
      <p>%(intro)s</p>
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">%(label)s</p>
    <h2 class="narrow">%(listHeading)s</h2>
    <ul class="towns">
%(items)s
    </ul>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">%(freight)s</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="cthub-cta">Open the planner</a>
    </p>
  </div>
</section>''' % dict(crumbs=B.crumbs_html(crumbs), label=B.esc(meta['label']),
                     h1=meta['h1'], lede=B.esc(meta['lede']), up=up,
                     intro=meta['intro'], items=items,
                     listHeading=B.esc(meta['listHeading']), freight=F.FREIGHT_SHORT)

    html = B.PAGE % dict(
        title=B.esc(meta['title']), desc=B.esc(meta['desc']), url=url, site=SITE,
        hero=meta.get('hero', 'why-we-do-this.jpg'), up=up,
        schema=B.schema(url, meta['title'], meta['desc'], crumbs, None),
        mast=B.mast(depth), main=main, foot=B.foot(depth, B.TOWNS))

    d = os.path.join(ROOT, section)
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


if __name__ == '__main__':
    for section, meta in CT.SECTIONS.items():
        u, w = build_section_hub(section, meta)
        print('%-50s %4d words  HUB' % (u, w))
    for p in CT.PAGES:
        u, w = build_page(p)
        print('%-50s %4d words' % (u, w))
    print('%d pages across %d sections' % (len(CT.PAGES) + len(CT.SECTIONS), len(CT.SECTIONS)))
