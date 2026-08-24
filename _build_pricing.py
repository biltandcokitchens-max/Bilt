# -*- coding: utf-8 -*-
"""Generate /pricing/ — "how much does a kitchen cost".

Run after _build_locations.py and _build_compare.py.

WHY THIS PAGE IS THE MOST DEFENSIBLE ONE ON THE SITE
"How much does a kitchen cost" is the highest-intent query in the
category, and almost nobody in the trade answers it — because a quote is
how the conversation gets controlled. If the number arrives after a
showroom visit and a design meeting, it arrives after the buyer is
invested. BILT can answer it up front, and that is harder for a
competitor to copy than any keyword.

THE HONESTY CONSTRAINT THAT SHAPES IT
A BILT range price is CABINETRY AND BENCHTOP. It is not a renovation.
Industry surveys generally put cabinetry at roughly a third to a half of
a complete kitchen renovation, with the rest going to appliances,
plumbing, electrical, flooring, tiling and labour.

So the page states the SCOPE before it states the NUMBER. Putting $4,490
next to a whole-renovation figure would be exactly the apples-to-oranges
comparison the brief forbids, and it would also be the kind of claim that
falls apart the moment a reader checks it.

No third-party figure is asserted as fact here. The industry context is
described in ranges and attributed as "industry surveys generally put",
because the underlying numbers move, vary by state and vary by scope.
"""
import io, os, re

import _build_locations as B
import _build_compare as CMP

ROOT = B.ROOT
SITE = B.SITE


def build():
    depth = 1
    up = '../' * depth
    url = '%s/pricing/' % SITE
    title = 'How Much Does a Kitchen Cost? | Real Prices | BILT Studio'
    desc = ('What a kitchen actually costs, with real numbers. Complete cut-to-size kitchens '
            'from $%s including Blum hardware and a stone benchtop.' % B.ANCHOR)
    crumbs = [('Home', SITE + '/'), ('Pricing', url)]

    faqs = [
        ("How much does a kitchen cost in Australia?",
         "It depends almost entirely on scope, and most published figures quietly cover a full "
         "renovation rather than cabinetry. Industry surveys generally put a complete kitchen "
         "renovation in the tens of thousands, with cabinetry accounting for roughly a third to "
         "a half of it and the rest going to appliances, benchtop, plumbing, electrical, "
         "flooring, tiling and labour. A BILT range price covers the cabinetry and the "
         "benchtop, and starts at $4,490."),
        ("Can I get a kitchen for under $5,000?",
         "Yes. The 2 400 mm Compact range is $4,590 and is complete in the cabinetry sense — "
         "carcasses, doors, Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners, and a "
         "quartz or granite benchtop. It does not include appliances, sink, tap, installation, "
         "plumbing or electrical, and no honest quote at that figure would."),
        ("Can I get a kitchen for under $10,000?",
         "Comfortably, on the cabinetry. All three ranges sit under $10,000 — $4,590, $5,500 "
         "and $7,500 — which leaves room in a $10,000 budget for a sink, tap and installation "
         "on a straightforward job. Appliances, and any plumbing or electrical relocation, are "
         "the variables that move that total."),
        ("Why do so few kitchen companies publish prices?",
         "Because a quote is how the conversation gets controlled. If the number arrives after a "
         "showroom visit and a design meeting, it arrives after you are invested. We would "
         "rather you had it first — and if it turns out not to suit you, that is a better "
         "outcome than a wasted appointment for both of us."),
        ("Does the price change after I order?",
         "The cabinetry price is what the planner showed for the kitchen you drew. Freight is "
         "the one figure quoted separately: it is confirmed per order once a team member has "
         "checked your 3D plan by hand, so it reflects your actual address and your actual "
         "kitchen rather than an average."),
        ("What is not included?",
         "Sink, tap, appliances, installation, plumbing, electrical, splashback, flooring and "
         "removal of the old kitchen. Those are separate in every system, including ours, which "
         "is what the checklist on this page is for."),
    ]

    cards = '\n'.join(
        '      <div class="card">\n'
        '        <h3>%s</h3>\n'
        '        <p class="card__note">%s run</p>\n'
        '        <p class="card__price">$%s</p>\n'
        '        <p class="card__note">%s</p>\n'
        '      </div>' % (n, run, price, note)
        for n, run, price, _img, note in B.RANGES)

    main = '''%(crumbs)s

<section class="hero-block">
  <div class="wrap">
    <p class="eyebrow">Pricing</p>
    <h1>What a kitchen<br>actually costs.</h1>
    <p class="lede">Real numbers, published. Complete cut-to-size kitchens from $%(anchor)s,
      including Blum hardware and a stone benchtop.</p>
    <p style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="price-hero-planner">Price your room</a>
      <a class="btn btn--ghost" href="#total">What else you will pay for</a>
    </p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">The ranges</p>
    <h2 class="narrow">Three complete kitchens.</h2>
    <div class="grid3">
%(cards)s
    </div>
    <p class="narrow" style="margin-top:1.75rem;color:var(--muted)">Every one includes carcasses,
      doors, Blum CLIP top BLUMOTION hinges and TANDEMBOX antaro runners, and a quartz or
      granite benchtop. Marble is a paid upgrade. There is no laminate and no timber benchtop
      option.</p>
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <h2 class="narrow">Read the scope before the number.</h2>
    <div class="narrow" style="margin-top:1.5rem">
      <p>Published kitchen prices are quietly measuring different things, which is why they seem
        irreconcilable. Some are a cabinet. Some are cabinetry. Some are a whole renovation with
        appliances and trades inside them.</p>
      <p>A BILT range price is <strong>cabinetry and benchtop</strong>. Industry surveys
        generally put cabinetry at roughly a third to a half of a complete kitchen renovation,
        with the remainder going to appliances, plumbing, electrical, flooring, tiling,
        splashback and labour.</p>
      <p>So $%(anchor)s is not a renovation, and we are not going to imply it is. It is the part
        we supply, priced in full, with nothing waiting to be added once you have committed.</p>
    </div>
  </div>
</section>

<section class="sec" id="total">
  <div class="wrap">
    <p class="eyebrow">The whole project</p>
    <h2 class="narrow">Everything a kitchen costs.</h2>
    <p class="narrow" style="margin-top:1.25rem;color:var(--muted)">Price these for your job and
      you have a real budget rather than a headline. The first six are cabinetry; the rest you
      arrange whoever you buy from.</p>
%(checklist)s
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <h2 class="narrow">Where the saving actually comes from.</h2>
    <div class="narrow" style="margin-top:1.5rem">
      <p>Not the cabinetry. The board, the hardware and the stone are the same materials a good
        cabinetmaker would use. Blum is Blum.</p>
      <p>It comes from what is not in the price: no showroom to fund, no sales visit, no design
        cycle billed as design time, no quote stage. You draw it, you price it, you take the cut
        list away.</p>
      <p>That also says what BILT is not for. If your kitchen needs a curved island, joinery that
        continues into another room, or a heritage match, that is bespoke work and a cabinetmaker
        is the right call. Better to say so here than after you had ordered.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 class="narrow">Straight answers about money.</h2>
%(faq)s
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap narrow">
    <h2>Draw it. See the price.</h2>
    <p style="margin-top:1.25rem;color:var(--muted)">Every cabinet prices as a line item as you
      draw. The cut list is yours before you pay anything.</p>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="%(up)sroomplanner/#/plan" data-track="price-foot-cta">Open the planner</a>
    </p>
    <p style="margin-top:2rem;font-size:.9375rem;color:#6F6A61">
      Weighing up options? <a href="%(up)scompare/">Compare BILT against IKEA, Kaboodle and a
      cabinetmaker</a>.</p>
  </div>
</section>''' % dict(crumbs=B.crumbs_html(crumbs), up=up, anchor=B.ANCHOR,
                     cards=cards, checklist=CMP.cost_checklist(), faq=B.faq_html(faqs))

    html = B.PAGE % dict(
        title=B.esc(title), desc=B.esc(desc), url=url, site=SITE,
        hero='why-we-do-this.jpg', up=up,
        schema=B.schema(url, title, desc, crumbs, faqs),
        mast=B.mast(depth), main=main, foot=B.foot(depth, B.TOWNS))

    d = os.path.join(ROOT, 'pricing')
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
    return url, len(re.sub(r'<[^>]+>', ' ', main).split())


if __name__ == '__main__':
    u, w = build()
    print('%-46s %4d words' % (u, w))
