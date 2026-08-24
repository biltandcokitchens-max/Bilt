# -*- coding: utf-8 -*-
"""Generate the comparison pages, their hub, and the pricing page.

Run after _build_locations.py (it borrows the chrome and schema).

These are the pages that are NOT gated by local authority. A zero-history
site will take a long time to beat a sixty-year-old Rockhampton
cabinetmaker for "kitchens Rockhampton". It will not take nearly as long
to rank for "IKEA kitchen alternative" or "how much does a kitchen cost",
because neither competitor group writes that content: local cabinetmakers
do not publish prices, and the flat-pack suppliers do not write
comparisons.
"""
import io, os, re

import _facts as F
import _build_locations as B
import _compare as C

ROOT = B.ROOT
SITE = B.SITE
HUB = 'compare'


def cost_checklist():
    """The line items any honest total has to contain.

    This is the answer to the brief's rule against comparing a complete
    kitchen with a cabinet-only price: rather than asserting a competitor
    total nobody can verify, hand the reader the list and let them build
    it themselves.
    """
    rows = '\n'.join(
        '  <details>\n    <summary>%s</summary>\n'
        '    <div class="faq__a"><p>%s</p></div>\n  </details>'
        % (B.esc(name), B.esc(note)) for name, note in C.PROJECT_COSTS)
    return '<div class="faq">\n%s\n</div>' % rows


def build_comparison(c):
    depth = 2
    up = '../' * depth
    url = '%s/%s/%s/' % (SITE, HUB, c['slug'])
    crumbs = [('Home', SITE + '/'),
              ('Compare', '%s/%s/' % (SITE, HUB)),
              (c['nav'], url)]

    sections = []
    for i, (heading, paras) in enumerate(c['body']):
        ps = '\n      '.join('<p>%s</p>' % p for p in paras)
        sections.append('<section class="sec%s">\n  <div class="wrap">\n'
                        '    <h2 class="narrow">%s</h2>\n'
                        '    <div class="narrow" style="margin-top:1.5rem">\n      %s\n    </div>\n'
                        '  </div>\n</section>'
                        % (' sec--tint' if i % 2 else '', B.esc(heading), ps))

    others = '\n'.join(
        '  <li><a href="%s%s/%s/">\n    <h3>%s</h3>\n    <p>%s</p>\n  </a></li>'
        % (up, HUB, o['slug'], B.esc(o['nav']), B.esc(o['blurb']))
        for o in C.COMPARISONS if o['slug'] != c['slug'])

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">Compare</p>
    <h1>%(h1)s</h1>
    <p class="lede">%(lede)s</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="cmp-hero-planner">See your price</a>
      <a class="btn btn--ghost" href="#total">How to total a kitchen</a>
    </p>
  </div>
</section>

%(sections)s

<section class="sec" id="total">
  <div class="wrap">
    <p class="eyebrow">Comparing properly</p>
    <h2 class="narrow">Total the whole project, not the headline.</h2>
    <p class="narrow" style="margin-top:1.25rem;color:var(--muted)">A cabinet price is not a
      kitchen price, and the gap between them is where most comparisons go wrong. Whatever you
      are weighing up, price these twelve lines for each option and compare the totals.</p>
%(checklist)s
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">The ranges</p>
    <h2 class="narrow">What a BILT kitchen includes, from $%(anchor)s.</h2>
    <p class="narrow" style="margin-top:1.25rem;color:var(--muted)">Carcasses, doors, Blum CLIP
      top BLUMOTION hinges and TANDEMBOX antaro runners, and a quartz or granite benchtop.
      %(freight)s</p>
    <div class="grid3">
%(cards)s
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">%(name)s, specifically.</h2>
%(faq)s
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">Other comparisons</p>
    <h2 class="narrow">Weighing up something else?</h2>
    <ul class="towns">
%(others)s
    </ul>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">The fastest way to compare is to price
      your actual room. No appointment, no quote stage, cut list before you pay.</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="cmp-foot-cta">Open the planner</a>
    </p>
  </div>
</section>''' % dict(
        crumbs=B.crumbs_html(crumbs), h1=c['h1'], lede=B.esc(c['lede']), up=up,
        sections='\n\n'.join(sections), checklist=cost_checklist(),
        anchor=B.ANCHOR, cards=B.price_cards(depth), faq=B.faq_html(c['faqs']),
        name=B.esc(c['nav']), others=others, freight=F.FREIGHT_SHORT)

    html = B.PAGE % dict(
        title=B.esc(c['title']), desc=B.esc(c['desc']), url=url, site=SITE,
        hero=c['hero'], up=up,
        schema=B.schema(url, c['title'], c['desc'], crumbs, c['faqs']),
        mast=B.mast(depth), main=main, foot=B.foot(depth, B.TOWNS))

    d = os.path.join(ROOT, HUB, c['slug'])
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


def build_hub():
    depth = 1
    up = '../' * depth
    url = '%s/%s/' % (SITE, HUB)
    title = 'Compare Kitchen Options | IKEA, Kaboodle, Cabinetmakers | BILT Studio'
    desc = ('How a cut-to-size kitchen package compares to IKEA, Kaboodle and a local '
            'cabinetmaker — and how to total a kitchen project properly.')
    crumbs = [('Home', SITE + '/'), ('Compare', url)]

    items = '\n'.join(
        '  <li><a href="%s%s/%s/">\n    <h3>%s</h3>\n    <p>%s</p>\n  </a></li>'
        % (up, HUB, o['slug'], B.esc(o['nav']), B.esc(o['blurb'])) for o in C.COMPARISONS)

    faqs = [
        ("How do I compare kitchen quotes fairly?",
         "Total the whole project for each option rather than comparing headline prices: "
         "carcasses, doors, hinges and runners, legs and plinths, filler panels, benchtop, "
         "delivery, assembly, installation, plumbing and electrical, and waste removal. A "
         "cabinet price is not a kitchen price, and that gap is where most comparisons go "
         "wrong."),
        ("What is the most commonly missed cost?",
         "Soft-close hardware. In several systems the hinges or drawer slides are sold "
         "separately from the cabinet, so a quoted cabinet price may not include the thing that "
         "decides how the kitchen feels to use. Blum CLIP top BLUMOTION hinges and TANDEMBOX "
         "antaro runners are standard on every BILT cabinet."),
        ("Is a flat pack kitchen worse than a custom one?",
         "It is a different product rather than a worse one. A cabinetmaker designs around you "
         "from nothing, which is the right answer for genuinely bespoke work. A cut-to-size "
         "package gives you a resolved design cut to your room's real dimensions, without a "
         "design-and-quote cycle. Both are legitimate; the question is which your project "
         "needs."),
        ("Why does BILT publish prices when nobody else does?",
         "Because the number is the thing people most want and least often get. Complete "
         "kitchens start at $4,490, every cabinet prices as a line item as you draw, and you "
         "get the cut list before you pay anything."),
    ]

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">Compare</p>
    <h1>Comparing kitchens,<br>without the sales pitch.</h1>
    <p class="lede">No competitor prices we cannot verify, and no pretending BILT is right for
      everyone. Just the structural differences and how to total them.</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="cmphub-planner">See your price</a>
      <a class="btn btn--ghost" href="#total">How to total a kitchen</a>
    </p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <h2 class="narrow">Almost every kitchen comparison is broken.</h2>
    <div class="narrow" style="margin-top:1.5rem">
      <p>Not dishonestly — structurally. The options are priced in different units. Some sell
        you a cabinet and let you add doors, hinges, legs and a benchtop. Some sell you a
        finished room with a person responsible for it. Comparing the first number you see
        against the first number you see tells you almost nothing.</p>
      <p>So these pages do two things. They set out what is actually different about each
        option — construction, what is included, who does the work — using each vendor's own
        published information. And they give you the twelve-line checklist to total any of
        them properly.</p>
      <p>What they deliberately do not do is quote competitor prices. Kitchen pricing moves,
        varies by configuration and varies by state, and a figure we cannot stand behind is
        worth less than no figure at all.</p>
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">Comparisons</p>
    <h2 class="narrow">What are you weighing up?</h2>
    <ul class="towns">
%(items)s
    </ul>
  </div>
</section>

<section class="sec" id="total">
  <div class="wrap">
    <p class="eyebrow">Comparing properly</p>
    <h2 class="narrow">The twelve lines a real total contains.</h2>
    <p class="narrow" style="margin-top:1.25rem;color:var(--muted)">Price each of these for
      every option you are considering. The winner is frequently not the one with the lowest
      headline.</p>
%(checklist)s
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">Comparing fairly.</h2>
%(faq)s
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">The fastest way to compare is to price
      your actual room.</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="cmphub-cta">Open the planner</a>
    </p>
  </div>
</section>''' % dict(crumbs=B.crumbs_html(crumbs), up=up, items=items,
                     checklist=cost_checklist(), faq=B.faq_html(faqs))

    html = B.PAGE % dict(
        title=B.esc(title), desc=B.esc(desc), url=url, site=SITE,
        hero='why-we-do-this.jpg', up=up,
        schema=B.schema(url, title, desc, crumbs, faqs),
        mast=B.mast(depth), main=main, foot=B.foot(depth, B.TOWNS))

    d = os.path.join(ROOT, HUB)
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


if __name__ == '__main__':
    u, w = build_hub()
    print('%-46s %4d words' % (u, w))
    for c in C.COMPARISONS:
        u, w = build_comparison(c)
        print('%-46s %4d words' % (u, w))
