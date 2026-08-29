/* =========================================================================
   BILT & CO — Light edition, conversion-first content
   ========================================================================= */
'use strict';

module.exports = function (api) {
  const { SITE, rv, img, frame, ctaBand, faqBlock, crumbs } = api;
  const T = SITE.phoneHref;

  /* ------------------------------------------------------------- helpers */

  const svg = {
    check: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 10.5l4 4 8-9"/></svg>',
    shield: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M10 2l6.5 2.5v5c0 4-2.8 7.4-6.5 8.5C6.3 16.9 3.5 13.5 3.5 9.5v-5L10 2z"/></svg>',
    tool: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M13 2.5a4.5 4.5 0 00-4 6.6L2.8 15.3a1.6 1.6 0 002.3 2.3l6.2-6.2A4.5 4.5 0 1013 2.5z"/></svg>',
    dollar: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M10 2v16M13.5 5.5H8.2a2.3 2.3 0 000 4.6h3.6a2.3 2.3 0 010 4.6H6"/></svg>',
    clock: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 2"/></svg>',
    pin: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M10 18s6-5.2 6-9.4A6 6 0 004 8.6C4 12.8 10 18 10 18z"/><circle cx="10" cy="8.5" r="2.2"/></svg>',
  };

  /** The short above-the-fold lead form — the primary conversion device */
  function leadForm(opts = {}) {
    const {
      id = 'lead-hero',
      heading = 'Get your free design &amp; fixed quote',
      sub = 'Three questions. We call you back within one business day with a real number — not a "from" price.',
      cta = 'Get my free design',
      ctaSub = 'No obligation &middot; No deposit &middot; No sales visit unless you want one',
    } = opts;
    return `<form class="form-card form js-lead" id="${id}">
      <div class="form-card__head">
        <h2 class="d4">${heading}</h2>
        <p class="small muted" style="margin:0">${sub}</p>
      </div>
      <div class="form__ok" role="status">Thank you — your email app should now be open with your details ready to send. If it did not open, call us on ${SITE.phone}.</div>
      <div class="form__row">
        <div class="field"><label for="${id}-n">Name</label><input id="${id}-n" name="name" type="text" required autocomplete="name" placeholder="Jane Marchetti"></div>
        <div class="field"><label for="${id}-p">Phone</label><input id="${id}-p" name="phone" type="tel" required autocomplete="tel" placeholder="0400 000 000"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="${id}-s">Suburb</label><input id="${id}-s" name="suburb" type="text" autocomplete="address-level2" placeholder="Frenchville"></div>
        <div class="field">
          <label for="${id}-b">Rough budget</label>
          <select id="${id}-b" name="budget">
            <option value="">Not sure yet</option>
            <option>Under $20,000</option>
            <option>$20,000 – $30,000</option>
            <option selected>$30,000 – $45,000</option>
            <option>$45,000 – $65,000</option>
            <option>$65,000 +</option>
          </select>
        </div>
      </div>
      <button class="btn btn--lg btn--block" type="submit">${cta}<span class="btn__sub">${ctaSub}</span></button>
      <p class="form__note">${svg.shield} Your details stay with our Rockhampton studio. We never sell or share them &mdash; see our <a href="privacy.html">privacy policy</a></p>
    </form>`;
  }

  const trustStrip = `<div class="trust">
    <div class="wrap trust__in">
      <span class="trust__i">${svg.check} 10-year cabinetry warranty</span>
      <span class="trust__i">${svg.tool} Built in our own Rockhampton workshop</span>
      <span class="trust__i">${svg.dollar} Fixed-price quotes, no variations</span>
      <span class="trust__i">${svg.shield} Fully insured</span>
      <span class="trust__i">${svg.pin} Central Queensland wide</span>
    </div>
  </div>`;

  const proof = `<section class="section--tight" style="padding-block:0">
    <div class="wrap" style="padding-inline:0">
      <dl class="proof" ${rv()}>
        <div><dt class="tabnums">75+</dt><dd>Kitchens delivered</dd></div>
        <div><dt class="tabnums">10 yr</dt><dd>Cabinetry warranty</dd></div>
        <div><dt class="tabnums">Lifetime</dt><dd>Blum hardware warranty</dd></div>
        <div><dt class="tabnums">7&ndash;10</dt><dd>Days on site, typical</dd></div>
      </dl>
    </div>
  </section>`;

  const marquee = `<div class="marq" aria-hidden="true">
    <div class="marq__t">
      ${'<span>Calacatta marble <i>&#9670;</i> American oak <i>&#9670;</i> Brushed brass <i>&#9670;</i> Blum hardware <i>&#9670;</i> Porcelain benchtops <i>&#9670;</i> Fenix matte <i>&#9670;</i> Dekton <i>&#9670;</i> Hand-finished timber <i>&#9670;</i> </span>'.repeat(2)}
    </div>
  </div>`;

  /* Scarcity / offer band — the strongest single conversion block */
  const offerBand = `<section class="section--tight">
    <div class="wrap">
      <div class="offer" ${rv()}>
        <div class="offer__grid">
          <div>
            <span class="pill" style="background:rgba(201,160,90,.16);color:var(--brass-lite)">This month in Rockhampton</span>
            <h2 class="d2">Free 3D design, full material board and a fixed quote &mdash; <span class="italic" style="color:var(--brass-lite)">worth $800.</span></h2>
            <p class="lede" style="margin-top:1.25rem">We only take on a fixed number of new designs each month, because the same person who draws your kitchen also builds it. When the month is booked, it is booked.</p>
            <ul class="list-check mt-2">
              <li>A measured 3D render of your actual room, not a catalogue page</li>
              <li>Doors, stone and hardware brought to you, seen in your own light</li>
              <li>A fully itemised fixed-price quote, valid for 90 days</li>
              <li>Yours to keep, and to take to any other quote you get</li>
            </ul>
            <div class="counter">
              <b class="tabnums">4</b> <span>consultation spots left for this month</span>
            </div>
            <!-- PLACEHOLDER: update the spots-remaining number, or remove this counter, before launch. See PLACEHOLDERS.md -->
          </div>
          <div>
            <a class="btn btn--brass btn--lg btn--block" href="contact.html">Claim a design spot<span class="btn__sub">Takes 60 seconds &middot; No deposit</span></a>
            <a class="btn btn--light btn--lg btn--block" href="tel:${T}" style="margin-top:.75rem">Call ${SITE.phone}</a>
            <p class="small" style="color:#A39B8D;margin-top:1rem;text-align:center">Or see real prices first &mdash; <a href="investment.html" style="color:var(--brass-lite);text-decoration:underline">the 2026 price guide</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const GUARANTEES = [
    ['The price does not move', 'Once your design is signed off, the quote is fixed. In seventeen years we have never issued a surprise variation for our own scope of works. If we get a measurement wrong, we wear it.'],
    ['Ten years, in writing', 'Cabinetry and workmanship, warranted for a decade, backed by Blum’s lifetime mechanical warranty on every hinge and runner we install.'],
    ['We build it, we install it', 'No subcontracted installers, no flat packs trucked in from Brisbane. The people in your house are on our payroll and their name is on the job.'],
    ['On the day we said', 'A written site programme before demolition, and a $200-a-day credit back to you for every working day we run past our own completion date.'],
    ['Your drawings are yours', 'If our quote does not work for you, you keep the 3D design and the measured drawings of your own room. No charge, no hard feelings.'],
  ];

  const guarantees = `<section class="section bg-2" id="guarantee">
    <div class="wrap">
      <div class="split" style="align-items:start">
        <div>
          <p class="eyebrow" ${rv()}>Risk, removed</p>
          <h2 class="d2" ${rv()} data-rv-d="1">Five promises we<br>put in the contract.</h2>
          <p class="lede mt-2" ${rv()} data-rv-d="2">A kitchen is one of the largest cheques most households ever write to a small business. These are the five things that go wrong most often &mdash; so these are the five things we guarantee.</p>
          <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="3">Start with a free design</a>
        </div>
        <div class="grid" style="gap:1.75rem">
          ${GUARANTEES.map(([h, p], i) => `
          <div class="gtee" ${rv()} data-rv-d="${(i % 4) + 1}">
            <span class="gtee__n">0${i + 1}</span>
            <div><h3>${h}</h3><p class="muted">${p}</p></div>
          </div>`).join('')}
        </div>
      </div>
      <!-- PLACEHOLDER: confirm the late-delivery credit and warranty terms with the client's contract before launch. -->
    </div>
  </section>`;

  const comparison = `<section class="section">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>Compare honestly</p>
      <div class="split" style="align-items:end;margin-bottom:2rem">
        <h2 class="d2" ${rv()} data-rv-d="1">Why two quotes for the<br>same kitchen differ by $20,000.</h2>
        <p class="muted" ${rv()} data-rv-d="2">It is almost never the design. It is these six lines. Ask every company you speak to in Rockhampton to answer them in writing &mdash; including us.</p>
      </div>
      <div class="cmp-scroll" ${rv()} data-rv-d="1">
        <table class="cmp">
          <thead>
            <tr><th scope="col">What you are actually buying</th><th scope="col">Bilt &amp; Co</th><th scope="col">Flat pack + installer</th><th scope="col">Typical cabinet shop</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Carcass board</th><td>18mm moisture-resistant</td><td>16mm standard MDF</td><td>16&ndash;18mm, varies</td></tr>
            <tr><th scope="row">Edging</th><td>Laser-bonded, no glue line</td><td>Hot-melt glued</td><td>Hot-melt glued</td></tr>
            <tr><th scope="row">Hinges &amp; runners</th><td>Blum, lifetime warranty</td><td>Unbranded</td><td>Mixed brands</td></tr>
            <tr><th scope="row">Who installs it</th><td>Our own employed team</td><td>Contract handyman</td><td>Usually subcontracted</td></tr>
            <tr><th scope="row">Quote type</th><td class="yes">Fixed, itemised</td><td>Estimate, excludes install</td><td>Often "provisional"</td></tr>
            <tr><th scope="row">Warranty</th><td>10 years, written</td><td class="no">12 months, parts only</td><td>2&ndash;7 years, varies</td></tr>
            <tr><th scope="row">Typical 7m kitchen</th><td>$26,000 &ndash; $35,000</td><td>$14,000 &ndash; $22,000</td><td>$32,000 &ndash; $55,000</td></tr>
          </tbody>
        </table>
      </div>
      <p class="small muted mt-2" ${rv()}>Competitor columns describe common market practice in Central Queensland, not any specific business. Always get the specification in writing.</p>
    </div>
  </section>`;

  /* Real customer reviews, carried across from biltstudio.com.au. Do not
     edit the wording — these are quoted as given. */
  const REVIEWS = [
    ['For what we paid compared to what similar kitchens were costing elsewhere, we&rsquo;re extremely happy with it.', 'Sarah Wallace', 'Rockhampton', 'S'],
    ['Could not be happier with our kitchen. The funny thing is, pretty much everyone who&rsquo;s come over since we installed it has asked who did our kitchen and assumed we spent a lot more than we actually did.', 'Brian T.', 'Gladstone', 'B'],
    ['Once we saw it in person, it was a pretty easy decision. It looked even better than we expected.', 'Betty Miller', 'Caboolture', 'B'],
  ];

  const reviews = `<section class="section bg-2">
    <div class="wrap">
      <div class="center" style="max-width:52rem;margin-inline:auto">
        <p class="eyebrow centred" ${rv()}>In their words</p>
        <h2 class="d2" ${rv()} data-rv-d="1">The people who already<br>cook in one.</h2>
      </div>
      <div class="grid cols-3 mt-3">
        ${REVIEWS.map(([q, who, ctx, ini], i) => `
        <figure class="review" ${rv()} data-rv-d="${i + 1}" style="margin:0">
          <blockquote>&ldquo;${q}&rdquo;</blockquote>
          <figcaption><span class="avatar" aria-hidden="true">${ini}</span><span><span class="who">${who}</span><br>${ctx}</span></figcaption>
        </figure>`).join('')}
      </div>
      <!-- PLACEHOLDER: replace with verified Google reviews and real names before launch. See PLACEHOLDERS.md -->
      <div class="center mt-3" ${rv()}><a class="link-u" href="contact.html">Book your free design &amp; quote &rarr;</a></div>
    </div>
  </section>`;

  const COLLECTIONS = [
    { no: '01', name: 'Essence', img: 'matte-black-bank', price: 'From $15,000',
      alt: 'Matte black handleless kitchen cabinetry with integrated appliances',
      copy: 'Handleless, quiet, exact. Soft-matte doors on Blum soft-close runners with a stone benchtop. Our entry to bespoke — and still nothing like a flat pack.' },
    { no: '02', name: 'Maison', img: 'collection-marble-01', price: 'From $26,000', feature: true,
      alt: 'Oak kitchen with full-height marble splashback and stone island, Rockhampton',
      copy: 'What most Rockhampton families build. Timber veneer against a full-height stone splashback, a waterfall island, integrated lighting and a butler’s pantry behind a hidden door.' },
    { no: '03', name: 'Atelier', img: 'signature-dark', price: 'From $47,000',
      alt: 'Dark bespoke kitchen with feature stone island and leather bar seating',
      copy: 'No constraints. Book-matched slabs, curved and fluted cabinetry, solid brass, wine walls and a pantry built like a jewellery box. One project at a time.' },
  ];

  const collectionCards = COLLECTIONS.map((c, i) => `
        <a class="card" href="kitchens.html#${c.name.toLowerCase()}" ${rv()} data-rv-d="${i + 1}">
          ${frame(c.img, c.alt, 'wide')}
          <div class="card__body">
            <p class="card__price">${c.price}</p>
            <h3 class="d4">The ${c.name} Collection</h3>
            <p>${c.copy}</p>
            <span class="link-u mt-1">See what's included &rarr;</span>
          </div>
        </a>`).join('');

  const PROCESS = [
    ['1', 'Free design consultation', 'Ninety minutes at your kitchen table. We measure, photograph and listen — then tell you honestly what your budget buys in 2026.'],
    ['2', '3D design &amp; selections', 'A render of your actual room. We bring the doors, the stone offcuts and the handles to you, so you see them in your own light before anything is locked in.'],
    ['3', 'Your fixed quote', 'One document, every line itemised, signed and fixed. Revisions are free until you are happy. Valid 90 days.'],
    ['4', 'Built in Rockhampton', 'Cut, edged and assembled by our own cabinetmakers on Rockhampton St. You are welcome to walk the floor and watch it happen.'],
    ['5', 'Installed &amp; handed over', 'Seven to ten working days with one team and a written programme. Cleaned, adjusted, photographed and warranted for ten years.'],
  ];

  const processSteps = PROCESS.map(([no, h, p], i) => `
        <div class="step" ${rv()} data-rv-d="${(i % 3) + 1}">
          <span class="step__no">${no}</span>
          <h3>${h}</h3>
          <p class="muted">${p}</p>
        </div>`).join('');

  /* Cinematic scroll-scrubbed band. The hero on this build carries the lead
     form, so the film earns its own moment further down the page. */
  const videoBand = `<section class="vband" data-scrub>
    <div class="vband__track">
      <div class="vband__stage">
        <div class="vband__media">
          <video src="assets/video/hero.mp4" poster="assets/img/hero-poster.jpg" muted playsinline preload="none"
                 aria-label="Slow camera move through a bespoke timber and stone kitchen built by Bilt &amp; Co"
                 width="1024" height="576"></video>
        </div>
        <div class="wrap vband__in">
          <div class="vband__foot">
            <div>
              <p class="eyebrow">Scroll to walk through it</p>
              <h2 class="d2">Timber, travertine<br>and morning light.</h2>
              <p class="lede mt-2" style="max-width:44ch">Every surface here was drawn for one room, cut in our Rockhampton workshop and installed by the people who made it.</p>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:.75rem">
              <a class="btn btn--light btn--lg" href="contact.html">Get my free design</a>
              <a class="btn btn--brass btn--lg" href="gallery.html">See more work</a>
            </div>
          </div>
        </div>
        <div class="vband__cue" aria-hidden="true">Keep scrolling <i></i></div>
      </div>
    </div>
  </section>`;

  const areasBlock = `<section class="section--tight">
    <div class="wrap">
      <div class="split">
        <div>
          <p class="eyebrow" ${rv()}>Where we build</p>
          <h2 class="d3" ${rv()} data-rv-d="1">From the Fitzroy to the Capricorn Coast &mdash; no travel loading.</h2>
          <p class="mt-2 muted" ${rv()} data-rv-d="2">Our workshop and our installers are both local, so a Yeppoon kitchen costs exactly what a Rockhampton kitchen costs.</p>
        </div>
        <div class="area-tags" ${rv()} data-rv-d="2">
          <a href="kitchens.html">Rockhampton</a>
          <a href="kitchens-yeppoon.html">Yeppoon</a>
          <a href="kitchens-gracemere.html">Gracemere</a>
          <a href="kitchens-capricorn-coast.html">Capricorn Coast</a>
          ${['North Rockhampton', 'Frenchville', 'Norman Gardens', 'The Range', 'Park Avenue', 'Emu Park', 'Mount Morgan', 'Gladstone', 'Emerald', 'Blackwater'].map((a) => `<span>${a}</span>`).join('\n          ')}
        </div>
      </div>
    </div>
  </section>`;

  /* ================================================================= HOME */

  const homeFaq = [
    { q: 'How much does a new kitchen cost in Rockhampton?', a: 'Most Bilt & Co kitchens land between $15,000 and $51,000 supplied and installed. A compact handleless galley starts around $15,000; a typical Rockhampton family kitchen with a stone island and butler’s pantry sits between $26,000 and $35,000; fully bespoke work begins at $47,000. Our published investment guide breaks down every band line by line, and the estimator gives you a range in about thirty seconds.' },
    { q: 'Is the free design really free?', a: 'Yes. The measure, the 3D render, the material board and the fixed quote cost you nothing and carry no obligation. If our number does not work for you, you keep the drawings of your own room. We can afford to do this because we build what we sell — we are not paying a franchise fee out of your deposit.' },
    { q: 'How long does a kitchen take?', a: 'Eight to twelve weeks from signed quote to handover. Design and documentation takes two to three weeks, manufacture in our Rockhampton workshop four to six, and installation is typically seven to ten working days on site.' },
    { q: 'Do you build the cabinetry yourselves?', a: 'Yes. Every carcass, door and drawer is cut, edged and assembled at our Rockhampton St workshop by our own cabinetmakers, and installed by our own employed team. That is why we can put ten years in writing.' },
    { q: 'Do you service Yeppoon and the Capricorn Coast?', a: 'Yes — Yeppoon, Emu Park, Gracemere, Mount Morgan and the wider Capricorn Coast are inside our standard service area at no travel loading. We also work through Gladstone, Emerald and Blackwater on larger projects.' },
    { q: 'Can I use my own builder and trades?', a: 'Absolutely. We work alongside your trades weekly and can hand them a full set of service drawings, or we can coordinate the whole renovation as a single point of contact. Both are priced transparently so you can choose on merit.' },
  ];

  const home = {
    file: 'index.html',
    title: 'Kitchen Renovations Rockhampton | Free Design — Bilt & Co',
    desc: 'Custom kitchen renovations in Rockhampton from $15,000. Free 3D design and fixed-price quote, built in our own workshop, 10-year warranty.',
    og: 'collection-marble-01',
    preload: 'collection-marble-01',
    faq: homeFaq,
    trail: [['index.html', 'Home']],
    body: `
  <section class="hero">
    <div class="wrap hero__grid">
      <div>
        <span class="pill" ${rv()}>Only 4 free design spots left this month</span>
        <h1 class="d1" ${rv()} data-rv-d="1">The kitchen<br>Rockhampton<br><span class="italic brass">talks about.</span></h1>
        <p class="lede" ${rv()} data-rv-d="2">Bespoke kitchens drawn, built and installed by one local team &mdash; with a free 3D design, a fixed price that does not move, and a ten-year warranty in writing.</p>
        <div class="badge-row mt-2" ${rv()} data-rv-d="3">
          <span class="badge">Free 3D design &amp; quote</span>
          <span class="badge">Fixed price, no variations</span>
          <span class="badge">Built in Rockhampton</span>
        </div>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem" ${rv()} data-rv-d="4">
          <a class="btn btn--lg" href="#lead-hero">Get my free design</a>
          <a class="btn btn--ghost btn--lg" href="investment.html">See real prices first</a>
        </div>
      </div>
      <div class="hero__media" ${rv()} data-rv-d="2">
        ${leadForm()}
      </div>
    </div>
  </section>

  ${trustStrip}

  <section class="section--tight">
    <div class="wrap split">
      <div class="hero__media" ${rv()}>
        ${frame('hero-main', 'Luxury bespoke kitchen and dining room with marble island built in Rockhampton by Bilt & Co', 'wide', { eager: true })}
        <div class="hero__badge">
          <b class="tabnums">75+</b>
          <span>Central Queensland kitchens, designed and built in Rockhampton</span>
        </div>
      </div>
      <div>
        <p class="eyebrow" ${rv()}>Why Bilt &amp; Co</p>
        <h2 class="d2" ${rv()} data-rv-d="1">You will open these<br>drawers <span class="italic brass">40,000 times.</span></h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">A kitchen is the most-touched thing you will ever buy. It should feel expensive every morning &mdash; not just in the photos taken the week it was finished.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="3">So we build to a standard, not to a price. Moisture-resistant carcasses because this is Central Queensland. Blum hardware with a lifetime mechanical warranty. Laser-bonded edges that will not lift in a Rockhampton February. Then we install it ourselves and put our name on it for ten years.</p>
        <a class="link-u mt-3" href="studio.html" ${rv()} data-rv-d="4">Meet the workshop &rarr;</a>
      </div>
    </div>
  </section>

  ${proof}
  ${offerBand}

  <section class="section">
    <div class="wrap">
      <div class="split" style="align-items:end;margin-bottom:2.5rem">
        <div>
          <p class="eyebrow" ${rv()}>Three collections</p>
          <h2 class="d2" ${rv()} data-rv-d="1">Pick your level.<br>We draw the rest.</h2>
        </div>
        <p class="muted" ${rv()} data-rv-d="2">Every kitchen is designed from a blank page for your room. The collections simply set the level of material and hand-work &mdash; and the honest starting price for each.</p>
      </div>
      <div class="grid cols-3">${collectionCards}</div>
    </div>
  </section>

  ${videoBand}
  ${comparison}
  ${guarantees}

  <section class="section">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>How it works</p>
      <div class="split" style="align-items:end;margin-bottom:2.5rem">
        <h2 class="d2" ${rv()} data-rv-d="1">Five steps,<br>no surprises.</h2>
        <p class="muted" ${rv()} data-rv-d="2">The biggest complaint about renovations is not cost &mdash; it is not knowing what happens next, or who to call. Here is exactly what happens next.</p>
      </div>
      <div class="grid cols-3">${processSteps}</div>
      <div class="mt-3" ${rv()}><a class="btn" href="contact.html">Start at step one &mdash; it's free</a></div>
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap">
      <div class="split" style="align-items:end;margin-bottom:2rem">
        <div>
          <p class="eyebrow" ${rv()}>Recent work</p>
          <h2 class="d2" ${rv()} data-rv-d="1">Built here. Installed here.</h2>
        </div>
        <a class="link-u" href="gallery.html" ${rv()} data-rv-d="2">See the full gallery &rarr;</a>
      </div>
      <div class="gal">
        <a class="g-8 ar-43" href="gallery.html" ${rv()}>${img('collection-marble-02', 'Oak kitchen with marble splashback and brass lighting, Rockhampton')}<figcaption>Maison &middot; Norman Gardens</figcaption></a>
        <a class="g-4 ar-34" href="gallery.html" ${rv()} data-rv-d="1">${img('splashback-marble-01', 'Full height marble splashback with matte black tapware')}<figcaption>Maison &middot; The Range</figcaption></a>
        <a class="g-4 ar-34" href="gallery.html" ${rv()} data-rv-d="1">${img('galley-stone', 'Stone galley kitchen with pendant lighting')}<figcaption>Essence &middot; North Rockhampton</figcaption></a>
        <a class="g-8 ar-43" href="gallery.html" ${rv()} data-rv-d="2">${img('openplan-long', 'Open plan kitchen with long island bench, Yeppoon')}<figcaption>Maison &middot; Yeppoon</figcaption></a>
      </div>
    </div>
  </section>

  ${reviews}
  ${marquee}
  ${areasBlock}
  ${faqBlock(homeFaq)}
  ${ctaBand()}
`,
  };

  /* ============================================================= KITCHENS */

  const kitchensFaq = [
    { q: 'What is the difference between a custom kitchen and a flat pack?', a: 'A flat pack is built from a fixed catalogue of cabinet sizes, so your room gets filled with filler panels and compromise. A Bilt & Co kitchen is drawn to the millimetre for your walls, your appliances and your height. We also use 18mm moisture-resistant board, laser-bonded edging and Blum hardware as standard, where flat packs typically use 16mm board, glued edging and unbranded runners.' },
    { q: 'Do you replace just doors and benchtops?', a: 'Yes. If your carcasses are sound and the layout works, replacing doors, drawer fronts, hardware and the benchtop can transform a kitchen for a fraction of a rebuild. We will tell you honestly at the first visit which option makes sense — even when the smaller job is worth less to us.' },
    { q: 'Which benchtop is best in Central Queensland?', a: 'Engineered porcelain and sintered stone are the most forgiving here — heat resistant, UV stable and non-porous, which matters when a benchtop sits in afternoon sun. Natural marble is the most beautiful and the least forgiving. We will show you both with real offcuts, in your own kitchen light.' },
    { q: 'How long will I be without a kitchen?', a: 'Typically seven to ten working days on site, with a two to three day gap while stone is templated and cut. We can set up a temporary kitchen and we always keep water and a fridge running.' },
    { q: 'Can you work with my architect or builder?', a: 'Constantly. We read full documentation sets, issue service and setout drawings back to your team, and attend site meetings. Bring us in early and the joinery will be better for it.' },
  ];

  const kitchens = {
    file: 'kitchens.html',
    title: 'Custom Kitchens Rockhampton | Cabinet Makers — Bilt & Co',
    desc: 'Custom kitchens in Rockhampton built in our own workshop. Three collections from $15,000, free 3D design, fixed quotes, 10-year warranty.',
    og: 'collection-marble-04',
    preload: 'collection-marble-04',
    faq: kitchensFaq,
    trail: [['index.html', 'Home'], ['kitchens.html', 'Custom Kitchens Rockhampton']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Kitchens']])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">Custom kitchens,<br><span class="italic brass">Rockhampton.</span></h1>
        <p class="lede">Every kitchen drawn from a blank page for one room and one household &mdash; then built by our own cabinetmakers two suburbs from your door.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Get my free 3D design</a>
          <a class="btn btn--ghost btn--lg" href="investment.html">See the price bands</a>
        </div>
        <div class="badge-row mt-2">
          <span class="badge">Fixed price</span><span class="badge">10-year warranty</span><span class="badge">Fully insured</span>
        </div>
      </div>
      <div>${frame('collection-marble-04', 'Custom oak and marble kitchen built by Bilt & Co cabinet makers in Rockhampton', 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  ${COLLECTIONS.map((c, i) => `
  <section class="section${i % 2 ? ' bg-2' : ''}" id="${c.name.toLowerCase()}">
    <div class="wrap">
      <div class="split${i % 2 ? ' split--rev' : ''}">
        <div ${rv()}>${frame(c.img, c.alt, 'wide')}</div>
        <div>
          <p class="eyebrow" ${rv()}>Collection ${c.no} &middot; ${c.price}</p>
          <h2 class="d2" ${rv()} data-rv-d="1">${c.name}</h2>
          <p class="lede mt-2" ${rv()} data-rv-d="2">${c.copy}</p>
          <ul class="list-check mt-3" ${rv()} data-rv-d="3">
            ${(c.name === 'Essence' ? [
      '18mm moisture-resistant carcasses, laser-bonded edging',
      'Blum soft-close hinges and runners throughout',
      '20mm engineered stone benchtop, eight colours',
      'Handleless rail or slimline aluminium profile',
      'Design, documentation and installation included',
    ] : c.name === 'Maison' ? [
      'Natural timber veneer, two-pack or Fenix matte doors',
      '20&ndash;40mm stone or porcelain, mitred waterfall ends',
      'Full-height stone or glass splashback',
      'Blum Legrabox drawers with internal organisers',
      'Integrated LED task lighting and appliance garage',
      'Butler&rsquo;s pantry available from $4,000',
    ] : [
      'Book-matched slabs, curved and fluted cabinetry',
      'Solid brass, bronze or nickel hardware',
      'Wine wall, coffee station, appliance garages',
      'Hand-finished timber in oil or rubbed lacquer',
      'Joinery carried through adjoining rooms',
      'Principal designer on site throughout',
    ]).map((li) => `<li>${li}</li>`).join('\n            ')}
          </ul>
          <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem" ${rv()} data-rv-d="4">
            <a class="btn" href="contact.html">Design my ${c.name} kitchen</a>
            <a class="btn btn--ghost" href="investment.html">What's included</a>
          </div>
        </div>
      </div>
    </div>
  </section>`).join('')}

  ${comparison}

  <section class="section bg-2">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>Also part of the kitchen</p>
      <h2 class="d2 mb-2" ${rv()} data-rv-d="1">The rooms that make it work.</h2>
      <div class="grid cols-3 mt-3">
        <a class="card" href="butlers-pantries.html" ${rv()} data-rv-d="1">
          ${frame('detail-black-cabinetry', "Concealed butler's pantry with black cabinetry and integrated sink", 'wide')}
          <div class="card__body"><p class="card__price">From $4,000</p><h3 class="d4">Butler's pantries</h3><p>Second sink, bulk storage, appliance bench, hidden door. The room that keeps the kitchen photograph-ready.</p><span class="link-u mt-1">Explore &rarr;</span></div>
        </a>
        <a class="card" href="joinery.html" ${rv()} data-rv-d="2">
          ${frame('wardrobe-robe', 'Custom walk-in wardrobe joinery with glazed cabinetry', 'wide')}
          <div class="card__body"><p class="card__price">From $3,600</p><h3 class="d4">Wardrobes &amp; joinery</h3><p>Walk-in robes, laundries, vanities, media walls and studies — same hands, same finishes, same standard.</p><span class="link-u mt-1">Explore &rarr;</span></div>
        </a>
        <a class="card" href="investment.html" ${rv()} data-rv-d="3">
          ${frame('material-samples', 'Timber veneer and finish samples on a workbench', 'wide')}
          <div class="card__body"><p class="card__price">Free guide</p><h3 class="d4">2026 price guide</h3><p>What each surface costs, how it behaves in a CQ summer, and where your money is best spent first.</p><span class="link-u mt-1">Explore &rarr;</span></div>
        </a>
      </div>
    </div>
  </section>

  ${reviews}
  ${faqBlock(kitchensFaq, 'Kitchen questions, answered')}
  ${areasBlock}
  ${ctaBand({ image: 'island-calacatta', alt: 'Calacatta marble waterfall island in a bright bespoke kitchen', title: 'Bring us your plans and<br><span class="italic" style="color:var(--brass-lite)">your worst frustration.</span>' })}
`,
  };

  /* ======================================================= BUTLER'S PANTRY */

  const pantryFaq = [
    { q: "How much does a butler's pantry cost in Rockhampton?", a: 'A butler’s pantry added to a Bilt & Co kitchen starts at $4,000 for a compact walk-through with open shelving and a laminate bench. A full second kitchen — second sink, dishwasher, stone benchtop, floor-to-ceiling joinery and a concealed door — typically runs $7,700 to $14,200.' },
    { q: "How much space does a butler's pantry need?", a: 'A functional walk-through needs about 1.1m of clear floor between benches and roughly 2.4m of run. Below that we would usually recommend a tall appliance cupboard or a dedicated pantry wall instead — and we will tell you so rather than sell you something that annoys you daily.' },
    { q: "Can one be added to an existing kitchen?", a: 'Often yes, most commonly by borrowing space from an adjoining laundry, garage entry or oversized walk-in pantry. It becomes a building question as much as a joinery one, so we bring our builder through at the first visit and you get one honest answer.' },
    { q: 'Do I need plumbing in there?', a: 'Not necessarily, but a second sink is the one feature clients say they would never give up. If plumbing is straightforward we almost always recommend it; if the wall is on the far side of the house we will show you the cost before you decide.' },
  ];

  const pantry = {
    file: 'butlers-pantries.html',
    title: 'Butler\'s Pantry Rockhampton | Custom Build — Bilt & Co',
    desc: 'Custom butler\'s pantries built in Rockhampton from $4,000. Second sinks, bulk storage, concealed doors. Free design and fixed quote.',
    og: 'matte-black-bank',
    preload: 'matte-black-bank',
    faq: pantryFaq,
    trail: [['index.html', 'Home'], ['butlers-pantries.html', "Butler's Pantries"]],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', "Butler's Pantries"]])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">Butler's pantries<br><span class="italic brass">that earn the door.</span></h1>
        <p class="lede">The room that lets your kitchen stay beautiful while the actual cooking happens somewhere else. From $4,000 alongside a new kitchen.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Get my free design</a>
          <a class="btn btn--ghost btn--lg" href="tel:${T}">Call ${SITE.phone}</a>
        </div>
      </div>
      <div>${frame('matte-black-bank', "Concealed butler's pantry in matte black joinery with integrated appliances", 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow" ${rv()}>The case for one</p>
        <h2 class="d2" ${rv()} data-rv-d="1">Every mess<br>gets a home.</h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">Ask any client with a butler's pantry what they would keep if they rebuilt tomorrow. It is never the splashback.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="3">Appliances live plugged in and out of sight. Sunday's dishes go behind a door. The bulk shop unloads onto a bench nobody has to look at. Your island stays a clean stone surface &mdash; which is, after all, what you paid for.</p>
        <ul class="list-check mt-3" ${rv()} data-rv-d="4">
          <li>Second sink and dishwasher, so the main kitchen never stacks up</li>
          <li>Appliance bench with dedicated power for every machine you own</li>
          <li>Floor-to-ceiling storage sized to the products you actually buy</li>
          <li>Concealed or flush push-to-open door from the main kitchen</li>
          <li>Optional second oven, microwave drawer or bar fridge</li>
        </ul>
      </div>
      <div ${rv()} data-rv-d="1">${frame('glossy-dark', "Dark gloss butler's pantry cabinetry with integrated ovens", 'wide')}</div>
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>Three configurations</p>
      <h2 class="d2 mb-2" ${rv()} data-rv-d="1">Sized to your wall,<br>not to a brochure.</h2>
      <div class="grid cols-3 mt-3">
        ${[
        ['The walk-through', '$4,000 – $6,600', 'A corridor between kitchen and laundry or garage entry. Open shelving above, drawers below, a laminate or compact stone bench. The most efficient money in the whole renovation.'],
        ['The second kitchen', '$7,700 – $14,200', 'Full stone benchtop, second sink, dishwasher, floor-to-ceiling joinery, dedicated appliance run and a concealed door. This is what most clients build.'],
        ['The scullery', '$14,200 +', 'Where the pantry becomes a room in its own right — second oven, coffee station, glazed display cabinetry, a window, and the same materials as the kitchen it serves.'],
      ].map(([h, p, c], i) => `
        <div class="tier${i === 1 ? ' tier--feature' : ''}" ${rv()} data-rv-d="${i + 1}">
          ${i === 1 ? '<span class="tier__flag">Most popular</span>' : ''}
          <span class="tier__tag">0${i + 1}</span>
          <h3>${h}</h3>
          <div class="tier__price" style="font-size:clamp(1.35rem,2vw,1.75rem)">${p}<small>Supplied &amp; installed</small></div>
          <p class="small muted" style="margin-top:1.25rem">${c}</p>
          <a class="btn${i === 1 ? '' : ' btn--ghost'} btn--block" href="contact.html" style="margin-top:1.75rem">Get a fixed quote</a>
        </div>`).join('')}
      </div>
      <p class="small muted mt-2" ${rv()}>Indicative for Rockhampton in 2026, assuming the pantry is built alongside a Bilt &amp; Co kitchen. Standalone projects are quoted individually.</p>
    </div>
  </section>

  ${guarantees}
  ${reviews}
  ${faqBlock(pantryFaq, "Butler's pantry questions")}
  ${ctaBand({ image: 'concrete-luxe', alt: 'Modern kitchen with concrete ceiling and island bench', eyebrow: 'Start here', title: 'Show us the wall.<br><span class="italic" style="color:var(--brass-lite)">We will show you the room.</span>' })}
`,
  };

  /* ============================================================== JOINERY */

  const joineryFaq = [
    { q: 'How much does a custom walk-in wardrobe cost?', a: 'A fitted walk-in robe in Rockhampton typically runs $3,600 to $9,900 depending on size, whether doors and drawer fronts are included, and the finish. Melamine interiors with open shelving sit at the lower end; timber veneer, glazed fronts and integrated lighting at the upper end.' },
    { q: 'Do you do laundries and bathroom vanities?', a: 'Yes — laundries, vanities, media walls, studies, mudrooms, wine rooms and display joinery. Most clients build them at the same time as the kitchen, which is cheaper and produces a house that reads as one piece of work.' },
    { q: 'Can you match joinery to an existing kitchen?', a: 'Usually. Bring us a door and we will identify the decor or colour and check current availability. Where a finish is discontinued we will show you the closest current match honestly, in your own light, before you commit.' },
    { q: 'Is it cheaper to build it all at once?', a: 'Materially, yes. One design process, one delivery, one installation mobilisation and one set of sheet stock — clients typically save 10 to 15 percent against building the same joinery a year later.' },
  ];

  const joinery = {
    file: 'joinery.html',
    title: 'Walk-In Wardrobes & Joinery Rockhampton — Bilt & Co',
    desc: 'Bespoke joinery in Rockhampton: walk-in wardrobes from $3,600, laundries, vanities, media walls and studies. Built in our own workshop.',
    og: 'wardrobe-robe',
    preload: 'wardrobe-robe',
    faq: joineryFaq,
    trail: [['index.html', 'Home'], ['joinery.html', 'Joinery']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Joinery']])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">Joinery for<br><span class="italic brass">the whole house.</span></h1>
        <p class="lede">Wardrobes, laundries, vanities, studies and media walls &mdash; detailed by the same hands that build our kitchens, in the same finishes, to the same standard.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Get my free design</a>
          <a class="btn btn--ghost btn--lg" href="gallery.html">See the work</a>
        </div>
      </div>
      <div>${frame('wardrobe-robe', 'Custom walk-in wardrobe with glazed joinery built in Rockhampton', 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap grid cols-2">
      ${[
        ['Walk-in wardrobes', '$3,600 – $9,900', 'wardrobe-walkin', 'Custom walk-in wardrobe with lit timber shelving and drawers, Rockhampton', 'Hanging calculated against what you own rather than a standard. Soft-close drawers with felt-lined inserts, lighting on a door sensor, glazed or open fronts, and a bench if the room allows.'],
        ['Laundries', '$2,800 – $7,700', 'laundry-room', 'Custom laundry joinery with overhead cabinets and folding bench, Rockhampton', 'The most under-designed room in most Rockhampton homes. Full-height broom storage, a proper folding bench, a drying rail out of sight, and a benchtop that survives a decade of detergent.'],
        ['Vanities &amp; bathrooms', '$1,900 – $6,100', 'vanity-bathroom', 'Custom timber bathroom vanity with stone top and backlit mirror', 'Wall-hung or floor-mounted in finishes that will not swell. Stone or porcelain tops with undermount or above-counter basins, and drawers that clear the plumbing properly rather than pretending to.'],
        ['Media walls &amp; studies', '$4,300 – $13,100', 'media-wall', 'Built-in media wall and study joinery with integrated desk and shelving', 'Cable management that actually works, ventilated equipment bays, display shelving lit from within, and desks built to your height rather than a catalogue&rsquo;s.'],
      ].map(([h, p, im, alt, c], i) => `
      <div class="card" ${rv()} data-rv-d="${(i % 2) + 1}">
        ${frame(im, alt, 'wide')}
        <div class="card__body">
          <p class="card__price">${p}</p>
          <h2 class="d3">${h}</h2>
          <p class="muted mt-1">${c}</p>
          <a class="link-u mt-2" href="contact.html">Get a fixed quote &rarr;</a>
        </div>
      </div>`).join('')}
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap split">
      <div ${rv()}>${frame('joinery-sketch', 'Hand drawn joinery detail drawings for a custom cabinetry project', 'wide')}</div>
      <div>
        <p class="eyebrow" ${rv()}>One house, one hand</p>
        <h2 class="d2" ${rv()} data-rv-d="1">Build it all<br>at once and save.</h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">Kitchens designed in isolation from the rest of the house always look like it &mdash; veneer running the wrong way against the media wall, laundry doors a shade off, a vanity with different handles because it was bought two years later.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="3">Documented together, the house reads as one piece of work &mdash; and clients typically save ten to fifteen percent on joinery they were always going to build eventually.</p>
        <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="4">Plan the whole house</a>
      </div>
    </div>
  </section>

  ${guarantees}
  ${faqBlock(joineryFaq, 'Joinery questions')}
  ${ctaBand({ image: 'timber-island', alt: 'Timber kitchen island and joinery in an open plan home' })}
`,
  };

  /* ============================================================== GALLERY */

  const GAL = [
    ['hero-main', 'Luxury dark timber kitchen with marble island and dining, Rockhampton', 'Atelier', 'The Range', 'g-8 ar-43'],
    ['dark-luxe-bar', 'Dark bespoke kitchen with timber bar stools and coffee station', 'Atelier', 'Frenchville', 'g-4 ar-34'],
    ['collection-marble-01', 'Oak kitchen with marble splashback and stone island bench', 'Maison', 'Norman Gardens', 'g-4 ar-34'],
    ['collection-marble-02', 'Marble splashback and brass wall lights above an oak kitchen run', 'Maison', 'Norman Gardens', 'g-8 ar-43'],
    ['island-marble-brass', 'Stone island bench with brushed brass tapware', 'Maison', 'Yeppoon', 'g-6 ar-43'],
    ['signature-dark', 'Dark navy bespoke kitchen with leather bar seating', 'Atelier', 'Emu Park', 'g-6 ar-43'],
    ['splashback-marble-01', 'Full height marble splashback with matte black tapware', 'Maison', 'The Range', 'g-4 ar-34'],
    ['detail-stone-black', 'Black stone benchtop detail with concealed lighting', 'Atelier', 'Detail', 'g-4 ar-34'],
    ['island-calacatta', 'Calacatta marble waterfall island in a bright kitchen', 'Maison', 'Gracemere', 'g-4 ar-34'],
    ['openplan-long', 'Open plan kitchen with long island and integrated appliances', 'Maison', 'Yeppoon', 'g-8 ar-43'],
    ['matte-black-bank', 'Matte black handleless cabinetry with appliance garage', 'Essence', 'Park Avenue', 'g-4 ar-34'],
    ['galley-stone', 'Stone galley kitchen with pendant lighting', 'Essence', 'North Rockhampton', 'g-4 ar-34'],
    ['glossy-dark', 'Dark gloss kitchen joinery with integrated ovens', 'Atelier', 'Gladstone', 'g-4 ar-34'],
    ['dark-island', 'Dark island bench with pendant lighting and open living beyond', 'Atelier', 'Capricorn Coast', 'g-4 ar-34'],
    ['collection-marble-03', 'Marble splashback with brass lighting above a timber kitchen', 'Maison', 'Norman Gardens', 'g-6 ar-43'],
    ['splashback-marble-02', 'Marble splashback and timber joinery with integrated oven', 'Maison', 'The Range', 'g-6 ar-43'],
    ['concrete-luxe', 'Kitchen with concrete ceiling, white island and bar stools', 'Essence', 'Rockhampton City', 'g-4 ar-34'],
    ['black-marble-bar', 'Black marble bar with bar stools and concealed lighting', 'Atelier', 'Frenchville', 'g-4 ar-34'],
    ['island-marble-close', 'Marble island bench detail with pendant lights', 'Maison', 'Detail', 'g-4 ar-34'],
    ['timber-island', 'Timber island and joinery in an open plan Queensland home', 'Maison', 'Emu Park', 'g-6 ar-43'],
    ['wardrobe-robe', 'Custom walk-in wardrobe with glazed joinery', 'Joinery', 'Norman Gardens', 'g-6 ar-43'],
    ['detail-timber-joinery', 'Timber media joinery and stone splashback detail', 'Joinery', 'Detail', 'g-6 ar-43'],
    ['drawer-detail', 'Deep drawers with brass handles and internal organisers', 'Detail', 'Hardware', 'g-6 ar-43'],
    ['dark-dining', 'Dark timber kitchen and dining space with feature lighting', 'Atelier', 'The Range', 'g-12 ar-219'],
  ];

  const gallery = {
    file: 'gallery.html',
    title: 'Kitchen Gallery Rockhampton — Bilt & Co',
    desc: 'Bespoke kitchens, butler\'s pantries and joinery built by Bilt & Co across Rockhampton, Yeppoon, Gracemere and the Capricorn Coast.',
    og: 'signature-dark',
    preload: 'hero-main',
    trail: [['index.html', 'Home'], ['gallery.html', 'Gallery']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Gallery']])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">Recent work.</h1>
        <p class="lede">Kitchens, pantries and joinery built across Rockhampton, the Capricorn Coast and Central Queensland. Every one drawn from a blank page.</p>
      </div>
      <div>${leadForm({ id: 'lead-gallery', heading: 'Like something you see?', sub: 'Tell us which one and we will send you the specification, the drawings and what it actually cost to build.', cta: 'Send me the details' })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap">
      <div class="gal">
        ${GAL.map(([f, alt, coll, loc, cls], i) => `
        <a class="${cls}" href="contact.html" ${rv()} data-rv-d="${(i % 3) + 1}">
          ${img(f, alt)}
          <figcaption>${coll} &middot; ${loc}</figcaption>
        </a>`).join('')}
      </div>
      <!-- PLACEHOLDER: replace stock photography with the client's own project shots. See IMAGE-CREDITS.md -->
    </div>
  </section>

  ${reviews}
  ${ctaBand({ eyebrow: 'Yours next', title: 'We photograph every<br><span class="italic" style="color:var(--brass-lite)">kitchen we finish.</span>', body: 'Book a free design consultation and we will walk you through the full project files for anything here — the drawings, the specification and the real cost.' })}
`,
  };

  /* =========================================================== INVESTMENT */

  const investFaq = [
    { q: 'What does a kitchen renovation cost in Rockhampton in 2026?', a: 'Across Australia the HIA puts the average kitchen renovation at roughly $42,600 including installation, and mid-range Brisbane projects at $28,000 to $45,000. Rockhampton generally sits slightly below Brisbane on labour but level on materials, since stone, hardware and appliances are priced nationally. Bilt & Co kitchens run $15,000 to $51,000+ depending on collection, size and materials.' },
    { q: 'Why are two quotes for the "same" kitchen thousands apart?', a: 'Almost always board thickness, edging method, hardware brand and who installs it. 16mm board with glued edging and unbranded runners will always beat 18mm moisture-resistant board with laser-bonded edging and Blum on price — for about six years. Ask every quote to state those four things in writing and the difference usually explains itself.' },
    { q: 'Do you offer payment plans or finance?', a: 'We work to a standard progress schedule: a design fee to begin, a deposit on acceptance, a payment at the start of manufacture and the balance on completion. We do not lend money ourselves, but many clients fund renovations through their existing home lender and we will provide whatever documentation your bank needs.' },
    { q: 'Is the quote genuinely fixed?', a: 'Yes, for our scope. Once the design is signed off and the quote accepted, that number does not move unless you change the design. Variations only arise from things nobody could see — asbestos, rot, or a wall that turns out to be structural — and those are raised, priced and approved by you before any work continues.' },
    { q: 'Where is money best spent first?', a: 'Hardware, then layout, then benchtop, then doors. Nobody has ever regretted spending on drawers that close properly for twenty years; plenty of people regret an expensive door finish sitting on cheap runners. We will say this to your face even when it costs us the upsell.' },
  ];

  const investment = {
    file: 'investment.html',
    title: 'Kitchen Renovation Cost Rockhampton 2026 | Calculator',
    desc: 'What a kitchen really costs in Rockhampton in 2026. Real price bands from $15,000, a live cost calculator, and what each band includes.',
    og: 'material-samples',
    preload: 'island-marble-close',
    faq: investFaq,
    trail: [['index.html', 'Home'], ['investment.html', 'Price Guide']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Price guide']])}
        <span class="pill">Updated for 2026</span>
        <h1 class="d1" style="font-size:clamp(2rem,4.4vw,3.5rem)">What a kitchen<br><span class="italic brass">actually costs</span><br>in Rockhampton.</h1>
        <p class="lede">Published openly, because almost nobody else will. Take this page to every quote you get &mdash; including ours.</p>
      </div>
      <div>${frame('island-marble-close', 'Marble island benchtop detail in a bespoke Rockhampton kitchen', 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow" ${rv()}>Straight answer first</p>
        <h2 class="d2" ${rv()} data-rv-d="1">$15,000 to<br>$51,000 <span class="italic brass">and up.</span></h2>
      </div>
      <div>
        <p class="lede" ${rv()} data-rv-d="1">That is the honest span for a genuinely custom kitchen in Rockhampton in 2026, supplied and installed. Most of our clients land between $26,000 and $35,000.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="2">For context: the Housing Industry Association puts the national average kitchen renovation at around $42,600 including installation, and mid-range Brisbane projects at $28,000 to $45,000. Rockhampton labour is a little softer than Brisbane; stone, hardware and appliances are priced nationally and are not. Anyone quoting a bespoke kitchen at $12,000 is quoting a flat pack with an installer.</p>
      </div>
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>The bands</p>
      <h2 class="d2 mb-2" ${rv()} data-rv-d="1">What each number buys.</h2>
      <div class="grid cols-3 mt-3">
        ${[
        ['Essence', '$15,000 – $23,000', false, ['18mm moisture-resistant carcasses', 'Laser-bonded edging on all fronts', 'Blum soft-close hinges &amp; runners', '20mm engineered stone benchtop', 'Handleless rail or slimline profile', 'Design, documentation &amp; installation']],
        ['Maison', '$26,000 – $42,000', true, ['Everything in Essence, plus:', 'Timber veneer, two-pack or Fenix doors', '20–40mm stone or porcelain, mitred ends', 'Full-height stone or glass splashback', 'Blum Legrabox with internal organisers', 'Integrated LED task lighting', 'Butler&rsquo;s pantry option from $4,000']],
        ['Atelier', '$47,000 +', false, ['Everything in Maison, plus:', 'Book-matched and bespoke stone slabs', 'Curved, fluted and hand-finished work', 'Solid brass, bronze or nickel hardware', 'Wine wall, coffee station, appliance garages', 'Joinery carried through adjoining rooms', 'Principal designer on site throughout']],
      ].map(([n, p, feat, items], i) => `
        <div class="tier${feat ? ' tier--feature' : ''}" ${rv()} data-rv-d="${i + 1}">
          ${feat ? '<span class="tier__flag">Most popular in Rockhampton</span>' : ''}
          <span class="tier__tag">Collection 0${i + 1}</span>
          <h3>${n}</h3>
          <div class="tier__price">${p}<small>Supplied &amp; installed</small></div>
          <ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul>
          <a class="btn${feat ? '' : ' btn--ghost'} btn--block" href="contact.html">Get a fixed quote</a>
        </div>`).join('')}
      </div>
      <p class="small muted mt-2" ${rv()}>Ranges assume 6&ndash;9 linear metres in the Rockhampton region and exclude appliances, plumbing, electrical, flooring and structural work. Every quote itemises these separately.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow" ${rv()}>Free calculator</p>
        <h2 class="d2" ${rv()} data-rv-d="1">Work out your<br>own number.</h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">Measure the total length of your cabinetry runs, including the island. This gives you the same range we would give you on the phone.</p>
        <p class="mt-2 muted small" ${rv()} data-rv-d="3">An estimate, not a quote. A real fixed quote follows a free site measure and takes about a week.</p>
        <div class="mt-3" ${rv()} data-rv-d="4"><a class="btn" href="contact.html">Turn this into a fixed quote</a></div>
      </div>
      <form id="estimator" class="form form-card" ${rv()} data-rv-d="1" onsubmit="return false">
        <div class="form__row">
          <div class="field">
            <label for="metres">Total cabinetry (linear metres)</label>
            <input id="metres" name="metres" type="number" min="1" max="40" step="0.5" value="7" inputmode="decimal">
          </div>
          <div class="field">
            <label for="tier">Collection</label>
            <select id="tier" name="tier">
              <option value="essence">Essence</option>
              <option value="maison" selected>Maison</option>
              <option value="atelier">Atelier</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label for="bench">Benchtop</label>
          <select id="bench" name="bench">
            <option value="laminate">Laminate / compact</option>
            <option value="stone" selected>Engineered stone, 20mm</option>
            <option value="porcelain">Porcelain or sintered stone, 20–40mm</option>
            <option value="natural">Natural marble or granite</option>
          </select>
        </div>
        <div class="field">
          <label>Add to the project</label>
          <div class="chips">
            <label class="chip"><input type="checkbox" name="extra" value="pantry"><span>Butler's pantry</span></label>
            <label class="chip"><input type="checkbox" name="extra" value="island" checked><span>Island bench</span></label>
            <label class="chip"><input type="checkbox" name="extra" value="appliances"><span>Appliance garage</span></label>
            <label class="chip"><input type="checkbox" name="extra" value="wine"><span>Wine wall</span></label>
          </div>
        </div>
        <div class="readout">
          <p class="lbl">Indicative investment</p>
          <p class="val tabnums" data-est-out style="margin:0">&mdash;</p>
          <p class="note" data-est-note style="margin:0"></p>
        </div>
        <a class="btn btn--block" href="contact.html">Get this priced properly &mdash; free</a>
      </form>
    </div>
  </section>

  ${comparison}

  <section class="section bg-2">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>Where the money goes</p>
      <h2 class="d2 mb-2" ${rv()} data-rv-d="1">Spend here first.</h2>
      <div class="grid cols-4 mt-3">
        ${[
        ['1', 'Hardware', 'Blum runners and hinges add roughly $1,200–$2,400 to a kitchen and are the one thing you touch every day for twenty years. Never the place to save.'],
        ['2', 'Layout', 'Costs nothing but thought. Getting the bin, dishwasher and prep zone in the right relationship is worth more than any finish.'],
        ['3', 'Benchtop', 'The largest visible surface and the one that takes the abuse. Porcelain and sintered stone perform best in a Central Queensland kitchen.'],
        ['4', 'Doors', 'Where taste lives — and where a budget can flex most safely. A beautiful door on cheap hardware is a false economy; the reverse is merely patient.'],
      ].map(([no, h, p], i) => `
        <div class="step" ${rv()} data-rv-d="${i + 1}">
          <span class="step__no">${no}</span>
          <h3>${h}</h3>
          <p class="muted">${p}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${guarantees}
  ${faqBlock(investFaq, 'Cost questions, answered plainly')}
  ${ctaBand({ eyebrow: 'No obligation', title: 'A fixed quote,<br><span class="italic" style="color:var(--brass-lite)">in about a week.</span>', body: 'Free site measure, 3D design and a fully itemised fixed-price quote. If the number does not work for you, you owe us nothing and you keep the drawings of your own room.', image: 'splashback-marble-02', alt: 'Marble splashback and timber joinery in a bespoke kitchen' })}
`,
  };

  /* ============================================================== PROCESS */

  const process = {
    file: 'process.html',
    title: 'Our Process | How Your Kitchen Is Built — Bilt & Co',
    desc: 'From free design consultation to handover: how Bilt & Co designs, builds and installs a kitchen in Rockhampton. Timelines, payments, what we ask.',
    og: 'studio-desk',
    preload: 'studio-desk',
    trail: [['index.html', 'Home'], ['process.html', 'Process']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Process']])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">Eight to twelve weeks,<br><span class="italic brass">written down.</span></h1>
        <p class="lede">The worst part of a renovation is not the cost. It is not knowing what happens next, or who to call. Here is the whole thing, in order.</p>
        <div class="mt-3"><a class="btn btn--lg" href="contact.html">Start at week zero &mdash; free</a></div>
      </div>
      <div>${frame('studio-desk', 'Design studio desk with drawings and material samples', 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap"><h2 class="vh">The five steps</h2><div class="grid cols-3">${processSteps}</div></div>
  </section>

  <section class="section bg-2">
    <div class="wrap split">
      <div>
        <p class="eyebrow" ${rv()}>The programme</p>
        <h2 class="d2" ${rv()} data-rv-d="1">Week by week.</h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">A typical Maison kitchen in Rockhampton, from first phone call to the day you cook in it.</p>
      </div>
      <div class="faq" ${rv()} data-rv-d="1">
        ${[
        ['Week 0', 'Free consultation and site measure. We photograph, measure and listen. No charge, no obligation.'],
        ['Weeks 1–2', '3D design, renders and material selection at your place. A design fee applies and is credited in full against your project.'],
        ['Week 3', 'Fixed-price quote issued, fully itemised, valid 90 days. Revisions free until you are happy.'],
        ['Weeks 4–9', 'Manufacture in our Rockhampton St workshop. Your trades are booked and a written site programme is issued.'],
        ['Week 9', 'Demolition and site preparation. Temporary kitchen set up if you need one.'],
        ['Weeks 10–11', 'Cabinetry installation, stone template and install, splashback, plumbing and electrical fit-off.'],
        ['Week 12', 'Adjustment, cleaning, photography, handover pack and the start of your ten-year warranty.'],
      ].map(([w, d], i) => `
        <details${i === 0 ? ' open' : ''}>
          <summary>${w}</summary>
          <div class="faq__a"><p class="muted">${d}</p></div>
        </details>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split split--rev">
      <div ${rv()}>${frame('joinery-sketch', 'Joinery drawings and detail sketches for a bespoke kitchen', 'wide')}</div>
      <div>
        <p class="eyebrow" ${rv()}>What we ask of you</p>
        <h2 class="d3" ${rv()} data-rv-d="1">Three things, honestly.</h2>
        <ul class="list-check mt-3" ${rv()} data-rv-d="2">
          <li><strong>A real budget.</strong> Not a number designed to test us. Tell us the truth and we will design to it, or tell you it cannot be done.</li>
          <li><strong>Decisions at the decision points.</strong> Once manufacture starts, changes cost real money. We flag every point of no return in advance.</li>
          <li><strong>Access.</strong> Ten working days of clear site access, and somewhere to park a van.</li>
        </ul>
        <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="3">Book my free consultation</a>
      </div>
    </div>
  </section>

  ${guarantees}
  ${reviews}
  ${ctaBand({ image: 'dark-island', alt: 'Dark island bench with pendant lighting in an open plan home' })}
`,
  };

  /* =============================================================== STUDIO */

  const studio = {
    file: 'studio.html',
    title: 'About Bilt & Co | Cabinet Makers, Rockhampton',
    desc: 'Bilt & Co is a Rockhampton cabinetmaking studio building bespoke kitchens and joinery from its own workshop. Fully insured. ACN 700 798 509.',
    og: 'material-samples',
    preload: 'material-samples',
    trail: [['index.html', 'Home'], ['studio.html', 'Studio']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Studio']])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">A workshop,<br><span class="italic brass">not a shopfront.</span></h1>
        <p class="lede">Not a retailer. Not a franchise. Bilt &amp; Co draws, builds and installs every kitchen it sells, from one address on Rockhampton St.</p>
        <div class="badge-row mt-3">
          <span class="badge">${SITE.legalNameHtml}</span>
          <span class="badge">ACN ${SITE.acn}</span>
          <span class="badge">Fully insured</span>
        </div>
      </div>
      <div>${frame('material-samples', 'Timber veneer and finish samples from the Bilt & Co Rockhampton workshop', 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow" ${rv()}>The studio</p>
        <h2 class="d2" ${rv()} data-rv-d="1">One team,<br>start to finish.</h2>
      </div>
      <div>
        <p class="lede" ${rv()} data-rv-d="1">Most kitchen companies in Central Queensland are a shopfront with a supply chain behind it. A salesperson takes your deposit, a designer in another city draws your room, a factory somewhere else cuts the boxes, and a subcontractor you have never met turns up to install them.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="2">Bilt &amp; Co is the other model. The person who measures your kitchen designs it. The workshop that cuts it is ours. The installers are on our payroll. When something is not right &mdash; and occasionally something is not right &mdash; there is nobody for us to blame, so we simply fix it.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="3">That is also why we can put ten years in writing on cabinetry and workmanship. It is not a marketing line; it is what happens when you control the whole chain and intend to be answering the phone in ten years.</p>
      </div>
    </div>
  </section>

  ${proof}

  <section class="section">
    <div class="wrap grid cols-3">
      ${[
        ['We say no.', 'If your budget will not buy what you are describing, you hear that at the first meeting rather than the fourth. We would rather lose a job than deliver a compromised one with our name on it.'],
        ['We over-build.', '18mm moisture-resistant carcasses as standard, laser-bonded edging, Blum hardware throughout. In this climate, the cheap version of any of those three fails first.'],
        ['We answer.', 'Warranty calls are answered by the people who built the kitchen, not a call centre. Everyone promises service; it is worth asking who actually picks up.'],
      ].map(([h, p], i) => `
      <div ${rv()} data-rv-d="${i + 1}">
        <h3 class="d3">${h}</h3>
        <p class="muted mt-1">${p}</p>
      </div>`).join('')}
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap split split--rev">
      <div ${rv()}>${frame('detail-black-cabinetry', 'Detail of matte black cabinetry and integrated sink', 'wide')}</div>
      <div>
        <p class="eyebrow" ${rv()}>Visit us</p>
        <h2 class="d2" ${rv()} data-rv-d="1">We come<br>to you.</h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">Full-size working displays across all three collections, every door finish we offer, and stone slabs you can put your hands on under lighting that tells the truth.</p>
        <address class="mt-3" style="font-style:normal" ${rv()} data-rv-d="3">
          <strong>${SITE.street}, ${SITE.suburb} ${SITE.state} ${SITE.postcode}</strong><br>
          <a class="link-u mt-1" href="tel:${T}">${SITE.phone}</a>
        </address>
        <div class="mt-2" ${rv()} data-rv-d="4">
          ${SITE.hours.map(([d, t]) => `<p class="small muted" style="margin-bottom:.3rem">${d} &mdash; <strong style="font-weight:600">${t}</strong></p>`).join('')}
        </div>
        <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="5">Book a consultation</a>
      </div>
    </div>
  </section>

  ${guarantees}
  ${reviews}
  ${ctaBand()}
`,
  };

  /* ============================================================== CONTACT */

  const contact = {
    file: 'contact.html',
    title: 'Contact Bilt & Co | Free Kitchen Design, Rockhampton',
    desc: 'Book a free kitchen design consultation in Rockhampton. Call 0401 821 848 or send your project details for a fixed-price quote within a week.',
    og: 'island-marble-brass',
    preload: 'signature-dark',
    trail: [['index.html', 'Home'], ['contact.html', 'Contact']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Contact']])}
        <span class="pill">4 free design spots left this month</span>
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,3.75rem)">Free 3D design.<br><span class="italic brass">Fixed quote.</span><br>No obligation.</h1>
        <p class="lede">Send this through and we will call you within one business day to arrange a time &mdash; at your kitchen table, with your plans in front of us.</p>
        <ul class="list-check mt-3">
          <li>An honest read on what your budget buys in 2026</li>
          <li>A measured 3D design of your actual room</li>
          <li>Materials and hardware in your hands</li>
          <li>A written fixed-price quote about a week later</li>
        </ul>
      </div>
      <div>
        <form class="form-card form js-lead" id="enquiry">
          <div class="form-card__head">
            <h2 class="d4">Book your free design consultation</h2>
            <p class="small muted" style="margin:0">Takes about 60 seconds. No deposit, no sales visit unless you want one.</p>
          </div>
          <div class="form__ok" role="status">Thank you &mdash; your email app should now be open with your details ready to send. If it did not open, call us on ${SITE.phone}.</div>
          <div class="form__row">
            <div class="field"><label for="name">Your name</label><input id="name" name="name" type="text" required autocomplete="name" placeholder="Jane Marchetti"></div>
            <div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" required autocomplete="tel" placeholder="0400 000 000"></div>
          </div>
          <div class="form__row">
            <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required autocomplete="email" placeholder="jane@example.com.au"></div>
            <div class="field"><label for="suburb">Suburb</label><input id="suburb" name="suburb" type="text" autocomplete="address-level2" placeholder="Frenchville"></div>
          </div>
          <div class="field">
            <label>What are you building?</label>
            <div class="chips">
              ${['Kitchen', "Butler's pantry", 'Wardrobes', 'Laundry', 'Vanities', 'Whole house'].map((s, i) => `<label class="chip"><input type="checkbox" name="scope" value="${s}"${i === 0 ? ' checked' : ''}><span>${s}</span></label>`).join('\n              ')}
            </div>
          </div>
          <div class="form__row">
            <div class="field">
              <label for="budget">Investment range</label>
              <select id="budget" name="budget">
                <option value="">Prefer not to say</option>
                <option>Under $20,000</option>
                <option>$20,000 – $30,000</option>
                <option selected>$30,000 – $45,000</option>
                <option>$45,000 – $65,000</option>
                <option>$65,000 +</option>
              </select>
            </div>
            <div class="field">
              <label for="timeline">Timeline</label>
              <select id="timeline" name="timeline">
                <option>As soon as possible</option>
                <option selected>Within 3 months</option>
                <option>3 – 6 months</option>
                <option>6 – 12 months</option>
                <option>Just researching</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="message">Tell us about the room</label>
            <textarea id="message" name="message" rows="4" placeholder="1970s Queenslander in Frenchville, kitchen is 5.4m along one wall with a bad island. We cook every night and hate the bench height."></textarea>
          </div>
          <button class="btn btn--lg btn--block" type="submit">Get my free design &amp; quote<span class="btn__sub">We reply within one business day</span></button>
          <p class="form__note">${svg.shield} Your details stay with our studio &mdash; never sold, never shared &mdash; see our <a href="privacy.html">privacy policy</a></p>
          <!-- PLACEHOLDER: this form opens the visitor's email client. Connect a real form handler
               (Netlify Forms, Formspree or a CRM endpoint) before launch. See PLACEHOLDERS.md -->
        </form>
      </div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap grid cols-3">
      <div ${rv()}>
        <span class="step__no">${svg.clock}</span>
        <h3 class="d4">Opening hours</h3>
        ${SITE.hours.map(([d, t]) => `<p class="small muted" style="margin-bottom:.3rem">${d} &mdash; <strong style="font-weight:600">${t}</strong></p>`).join('')}
      </div>
      <div ${rv()} data-rv-d="1">
        <span class="step__no">${svg.pin}</span>
        <h3 class="d4">Where we work</h3>
        <address style="font-style:normal" class="muted">
          ${SITE.suburb} ${SITE.state} ${SITE.postcode}<br>Central Queensland
        </address>
      </div>
      <div ${rv()} data-rv-d="2">
        <span class="step__no">${svg.dollar}</span>
        <h3 class="d4">Talk to us now</h3>
        <p class="muted small">Prefer to speak to a person?</p>
        <a class="link-u" href="tel:${T}">${SITE.phone}</a><br><br>
        <a class="link-u" href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
    </div>
  </section>

  ${reviews}
`,
  };

  /* ============================================================ AREA PAGES */

  function areaPage(slug, place, opts) {
    const { blurb, suburbs, image, alt, drive } = opts;
    const tp = place.replace(/^the /, '');
    const faq = [
      { q: `Do you build kitchens in ${place}?`, a: `Yes. ${place} is inside Bilt & Co's standard service area with no travel loading — our workshop is ${drive} away in ${SITE.suburb}. We site measure in ${place} weekly.` },
      { q: `How much does a kitchen cost in ${place}?`, a: `The same as Rockhampton: $15,000 to $23,000 for our Essence collection, $26,000 to $42,000 for Maison, and $47,000 and up for fully bespoke Atelier work. We do not charge a premium for ${place} projects.` },
      { q: `Will your own team install it?`, a: `Yes. Our employed installation team works across the region every week — we do not subcontract ${place} jobs to a third party. Same crew, same ten-year warranty.` },
      { q: `Is the design consultation really free in ${place}?`, a: `Yes — the site measure, the 3D design and the fixed quote are free anywhere in our service area, ${place} included. If our number does not work for you, you keep the drawings.` },
    ];
    return {
      file: `kitchens-${slug}.html`,
      title: `Kitchen Renovations ${tp} | Free Design — Bilt & Co`,
      desc: `Custom kitchens in ${place} from $15,000, built in our Rockhampton workshop. Free 3D design, fixed quotes, no travel loading.`,
      og: image,
      preload: image,
      priority: '0.7',
      faq,
      trail: [['index.html', 'Home'], ['kitchens.html', 'Kitchens'], [`kitchens-${slug}.html`, place]],
      body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['kitchens.html', 'Kitchens'], ['#', place]])}
        <span class="pill">${drive} from our workshop &middot; No travel loading</span>
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">Custom kitchens,<br><span class="italic brass">${place}.</span></h1>
        <p class="lede">${blurb}</p>
      </div>
      <div>${leadForm({ id: 'lead-area', heading: `Free design for your ${tp} kitchen`, sub: 'We site measure in ' + place + ' weekly. Tell us where you are and we will call within one business day.', cta: `Book my ${tp} site measure` })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow" ${rv()}>${place}</p>
        <h2 class="d2" ${rv()} data-rv-d="1">Local enough<br>to be accountable.</h2>
      </div>
      <div>
        <p class="lede" ${rv()} data-rv-d="1">Every ${tp} kitchen is drawn, manufactured and installed by Bilt &amp; Co &mdash; no travel loading, no subcontracted installers, and the same ten-year warranty we give a job in Rockhampton itself.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="2">We site measure across ${place} and the surrounding area weekly. Bring your plans to Rockhampton St, or we will come to your kitchen table with a tape and a camera.</p>
        <div class="area-tags mt-3" ${rv()} data-rv-d="3">${suburbs.map((s) => `<span>${s}</span>`).join('')}</div>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem" ${rv()} data-rv-d="4">
          <a class="btn" href="contact.html">Book a free ${tp} site measure</a>
          <a class="btn btn--ghost" href="investment.html">See the price bands</a>
        </div>
      </div>
    </div>
  </section>

  ${proof}

  <section class="section bg-2">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>What we build in ${place}</p>
      <h2 class="d2 mb-2" ${rv()} data-rv-d="1">Three collections,<br>one standard.</h2>
      <div class="grid cols-3 mt-3">${collectionCards}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="gal">
        <a class="g-6 ar-43" href="gallery.html" ${rv()}>${img('collection-marble-02', `Oak and marble kitchen built for a ${tp} home`)}<figcaption>Maison &middot; ${place}</figcaption></a>
        <a class="g-6 ar-43" href="gallery.html" ${rv()} data-rv-d="1">${img('dark-island', `Dark island bench kitchen installed in ${tp}`)}<figcaption>Atelier &middot; ${place}</figcaption></a>
      </div>
    </div>
  </section>

  ${guarantees}
  ${reviews}
  ${faqBlock(faq, `Building in ${place}`)}
  ${ctaBand({ eyebrow: place, title: `Your ${tp} kitchen<br><span class="italic" style="color:var(--brass-lite)">starts with a free measure.</span>` })}
`,
    };
  }

  const areaPages = [
    areaPage('yeppoon', 'Yeppoon', {
      drive: '40 minutes', image: 'openplan-long',
      alt: 'Open plan coastal kitchen with long island bench, Yeppoon',
      blurb: 'Coastal homes need joinery that can take salt air, humidity and a house full of weekend guests. We build for all three.',
      suburbs: ['Yeppoon', 'Cooee Bay', 'Lammermoor', 'Taranganba', 'Barmaryee', 'Farnborough', 'Zilzie', 'Emu Park', 'Mulambin', 'Kinka Beach'],
    }),
    areaPage('gracemere', 'Gracemere', {
      drive: '15 minutes', image: 'island-calacatta',
      alt: 'Bright kitchen with marble waterfall island, Gracemere',
      blurb: 'New builds and growing families, fifteen minutes from our workshop door. Gracemere is one of the busiest postcodes on our board.',
      suburbs: ['Gracemere', 'Stanwell', 'Kabra', 'Bouldercombe', 'Fairy Bower', 'Alton Downs', 'Mount Morgan', 'Westwood'],
    }),
    areaPage('capricorn-coast', 'the Capricorn Coast', {
      drive: '45 minutes', image: 'timber-island',
      alt: 'Timber island kitchen in a Capricorn Coast home',
      blurb: 'From Emu Park to Keppel Sands &mdash; bespoke kitchens built in Rockhampton and installed on the coast by our own team.',
      suburbs: ['Emu Park', 'Zilzie', 'Keppel Sands', 'Kinka Beach', 'Causeway Lake', 'Mulambin', 'Bangalee', 'Rosslyn', 'Yeppoon'],
    }),
  ];

  /* ============================================================== PRIVACY */
  /* Drafted against the Australian Privacy Principles. Written to describe
     what the site ACTUALLY does today — where a practice is not yet decided
     it says so, rather than claiming a protection that is not in place. */

  const privacy = {
    file: 'privacy.html',
    title: 'Privacy Policy | Bilt & Co',
    desc: `How Bilt & Co collects, uses and protects the personal information you send through this site. Australian Privacy Principles, plainly explained.`,
    og: 'material-samples',
    priority: '0.3',
    trail: [['index.html', 'Home'], ['privacy.html', 'Privacy Policy']],
    body: `
  <section class="phero">
    <div class="wrap">
      ${crumbs([['index.html', 'Home'], ['#', 'Privacy Policy']])}
      <h1 class="d1" style="font-size:clamp(2rem,4.4vw,3.25rem)">Privacy policy</h1>
      <p class="lede">What we collect when you enquire, why we collect it, and what we will never do with it.</p>
      <p class="small muted" style="margin-top:1rem">Last updated 29 August 2026</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="legal">
      <h2 class="d3">Who we are</h2>
      <p>This site is operated by <strong>${SITE.legalNameHtml}</strong> (ACN ${SITE.acn}), trading as Bilt &amp; Co, of ${SITE.street}, ${SITE.suburb} ${SITE.state} ${SITE.postcode}.</p>
      <p>We handle personal information in line with the <strong>Australian Privacy Principles</strong> in the <em>Privacy Act 1988</em> (Cth). Many businesses our size are not strictly bound by that Act. We follow it anyway, because you are handing us your home address and your budget.</p>

      <h2 class="d3">What we collect</h2>
      <p>Only what you type into a form on this site. That is:</p>
      <ul class="list-check">
        <li>Your name, phone number and email address</li>
        <li>Your suburb</li>
        <li>What you are building, your indicative budget range and your timeline</li>
        <li>Anything you choose to write in the message field</li>
      </ul>
      <p>We do not ask for and do not want your date of birth, your identity documents, or your bank or card details. <strong>Never send payment details through a form on this website.</strong></p>
      <p>Our web host keeps standard server logs — IP address, browser type, pages requested and timestamps — as almost every website does. We do not use these to identify you.</p>

      <h2 class="d3">Cookies and analytics</h2>
      <p>This site sets <strong>no tracking cookies</strong> and runs <strong>no analytics or advertising scripts</strong>. There is no Google Analytics, no advertising pixel and no third-party tracker on any page.</p>
      <p>The only third party your browser contacts is Google Fonts, which serves the typefaces, and Google Maps on the contact page, which loads only if you view that page. Both receive your IP address as a normal part of serving a request.</p>
      <!-- PLACEHOLDER: this section becomes untrue the moment analytics or an ad pixel is added.
           Update it in the same change that adds them. See PLACEHOLDERS.md -->

      <h2 class="d3">Why we collect it</h2>
      <p>To answer your enquiry, prepare a design and a quote, and — if you go ahead — to design, build and install your kitchen. That is the whole purpose. We do not use your details for anything you did not contact us about.</p>

      <h2 class="d3">How your enquiry reaches us</h2>
      <p>At present the enquiry forms open your own email application with your answers filled in, and the message is sent from your email account to ours. Your details are not transmitted to any third-party form service.</p>
      <!-- PLACEHOLDER: when a real form handler is connected (Netlify Forms, Formspree, a CRM),
           this paragraph MUST be rewritten to name that provider and where it stores data. -->

      <h2 class="d3">Who we share it with</h2>
      <p>We do not sell, rent or trade your personal information. Ever.</p>
      <p>If your project proceeds, we share only what is necessary with the people doing the work — for example your address and site access details with our installers, or measurements with a stone supplier. They receive what they need to do their job and nothing else.</p>
      <p>We may also disclose information where the law requires it, or where it is necessary to establish or defend a legal claim.</p>

      <h2 class="d3">Where it is kept, and for how long</h2>
      <p>Enquiries are held in our email and our quoting records, on systems protected by passwords and multi-factor authentication where the provider supports it.</p>
      <p>We keep enquiry records for <strong>two years</strong> from your last contact with us, and project records for <strong>seven years</strong> after completion, which is the period Australian tax and building records are ordinarily retained. After that we delete them.</p>
      <p>No system is perfectly secure. If a data breach occurs that is likely to cause you serious harm, we will notify you and the Office of the Australian Information Commissioner as the Notifiable Data Breaches scheme requires.</p>

      <h2 class="d3">Your rights</h2>
      <ul class="list-check">
        <li><strong>Access.</strong> Ask us what we hold about you and we will tell you, free, within 30 days.</li>
        <li><strong>Correction.</strong> Tell us something is wrong and we will fix it.</li>
        <li><strong>Deletion.</strong> Ask us to delete your details and we will, unless we are legally required to keep them.</li>
        <li><strong>Complaint.</strong> Raise it with us first at <a href="mailto:${SITE.email}">${SITE.email}</a>. If we have not resolved it within 30 days, you can take it to the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener">oaic.gov.au</a> or 1300 363 992.</li>
      </ul>

      <h2 class="d3">Children</h2>
      <p>This site is not directed at children and we do not knowingly collect information from anyone under 16.</p>

      <h2 class="d3">Changes</h2>
      <p>If we change how we handle your information we will update this page and change the date at the top. Material changes affecting people who have already enquired will be emailed to them.</p>

      <h2 class="d3">Contact us</h2>
      <p>
        ${SITE.legalNameHtml} (ACN ${SITE.acn})<br>
        ${SITE.street}, ${SITE.suburb} ${SITE.state} ${SITE.postcode}<br>
        <a href="mailto:${SITE.email}">${SITE.email}</a><br>
        <a href="tel:${T}">${SITE.phone}</a>
      </p>
      </div>
    </div>
  </section>
`,
  };

  /* ================================================================== 404 */

  const notFound = {
    file: '404.html',
    noindex: true,
    title: 'Page not found — Bilt & Co',
    desc: 'That page does not exist. Browse our kitchens, joinery and 2026 price guide, or call the Rockhampton studio.',
    trail: null,
    body: `
  <section class="section" style="min-height:64vh">
    <div class="wrap center">
      <p class="eyebrow centred" ${rv()}>Error 404</p>
      <h1 class="d1" ${rv()} data-rv-d="1">Not in<br><span class="italic brass">this drawer.</span></h1>
      <p class="lede mt-2" ${rv()} data-rv-d="2">The page you were after has moved or never existed. Everything we build is one click away.</p>
      <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center" ${rv()} data-rv-d="3">
        <a class="btn" href="index.html">Back to the studio</a>
        <a class="btn btn--ghost" href="gallery.html">See the gallery</a>
      </div>
    </div>
  </section>`,
  };

  return [home, kitchens, pantry, joinery, gallery, investment, process, studio, contact, ...areaPages, privacy, notFound];
};
