/* =========================================================================
   BILT & CO — Light edition, conversion-first content
   ========================================================================= */
'use strict';

module.exports = function (api) {
  const { SITE, rv, img, frame, ctaBand, faqBlock, crumbs, spotsNow } = api;
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
    return `<form class="form-card form" id="${id}" name="quick-enquiry" method="POST"
      action="/thanks" data-netlify="true" data-netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="quick-enquiry">
      <p class="hp"><label>Leave this field empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
      <div class="form-card__head">
        <h2 class="d4">${heading}</h2>
        <p class="small muted" style="margin:0">${sub}</p>
      </div>
      
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
      <span class="trust__i">${svg.tool} Specified and installed by us</span>
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
              <b class="tabnums" data-spots data-spots-start="${SITE.spotsPerMonth}">${spotsNow()}</b> <span>consultation <span data-spots-plural>spots</span> left for this month</span>
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
    ['The price does not move', 'Once your design is signed off, the quote is fixed. We have never issued a surprise variation for our own scope of works. If we get a measurement wrong, we wear it.'],
    ['Ten years, in writing', 'Cabinetry and workmanship, warranted for a decade, backed by Blum’s lifetime mechanical warranty on every hinge and runner we install.'],
    ['One team, drawing to handover', 'We specify your cabinetry to the millimetre, take delivery of it and install it ourselves. No subcontracted installers — the people in your house are on our payroll and their name is on the job.'],
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
        <p class="muted" ${rv()} data-rv-d="2">It is rarely the design. It is these seven lines. Ask every company you speak to in Rockhampton to answer them in writing &mdash; including us.</p>
      </div>
      <div class="cmp-scroll" ${rv()} data-rv-d="1">
        <table class="cmp">
          <thead>
            <tr><th scope="col">What you are actually buying</th><th scope="col">Bilt &amp; Co</th><th scope="col">Custom cabinetmaker</th><th scope="col">Kitchen retailer or franchise</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Who designs it</th><td>The person who measured your room</td><td>Usually the maker, in person</td><td class="no">A salesperson, then a designer elsewhere</td></tr>
            <tr><th scope="row">Carcass board</th><td>18mm moisture-resistant</td><td>Typically 18mm, varies by maker</td><td>16&ndash;18mm, varies by range</td></tr>
            <tr><th scope="row">Hardware</th><td>Blum, lifetime warranty</td><td>Usually Blum or Hettich</td><td>Depends on the range you pick</td></tr>
            <tr><th scope="row">Lead time</th><td class="yes">8&ndash;12 weeks</td><td class="no">12&ndash;20 weeks, often longer</td><td>10&ndash;16 weeks</td></tr>
            <tr><th scope="row">Quote</th><td class="yes">Fixed and itemised before you start</td><td>Often estimated, refined later</td><td>Fixed, but showroom cost is in it</td></tr>
            <tr><th scope="row">Who installs it</th><td>Our own employed team</td><td>Usually the maker</td><td class="no">Commonly subcontracted</td></tr>
            <tr><th scope="row">Typical 7m kitchen</th><td>$26,000 &ndash; $42,000</td><td>$35,000 &ndash; $60,000</td><td>$30,000 &ndash; $55,000</td></tr>
          </tbody>
        </table>
      </div>
      <p class="small muted mt-2" ${rv()}>The two right-hand columns describe common market practice in Central Queensland, not any particular business, and good cabinetmakers beat these figures regularly. Always get the specification in writing before you compare prices.</p>
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

  const KITCHENETTE = {
    name: 'Kitchenette', img: 'detail-black-cabinetry', href: '/kitchenettes',
    alt: 'Compact kitchenette with integrated sink and concealed storage',
    copy: 'For a studio, an under-house room or a short-stay unit. Sink, bench and cold storage; cooktop and microwave where they fit. Same carcasses and hardware as a full kitchen.',
  };
  const RANGES = { Kitchenette: 'From $4,500',  Essence: '$15,000 – $23,000', Maison: '$26,000 – $42,000', Atelier: '$47,000 +' };

  /* Three kitchens with their full price ranges. Shown on regulation-stage
     pages so a reader researching council rules sees what the kitchen is and
     what it costs before they leave. */
  const collectionsStrip = `
  <section class="section bg-2">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>What the kitchen costs</p>
      <div class="split" style="align-items:end;margin-bottom:2rem">
        <h2 class="d2" ${rv()} data-rv-d="1">From a kitchenette<br>to fully bespoke.</h2>
        <p class="muted" ${rv()} data-rv-d="2">Supplied and installed in Central Queensland; supplied assembled everywhere else in Queensland. Every figure is a real range, not a from-price with the catches left out.</p>
      </div>
      <div class="grid cols-4">
        ${[KITCHENETTE, ...COLLECTIONS].map((c, i) => `
        <a class="card" href="${c.href || '/kitchens#' + c.name.toLowerCase()}" ${rv()} data-rv-d="${i + 1}">
          ${frame(c.img, c.alt, 'wide')}
          <div class="card__body">
            <p class="card__price">${RANGES[c.name]}</p>
            <h3 class="d4">${c.name}</h3>
            <p>${c.copy}</p>
            <span class="link-u mt-1">See what's included &rarr;</span>
          </div>
        </a>`).join('')}
      </div>
    </div>
  </section>`;

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
    ['4', 'Made to your millimetres', 'Your cabinetry is manufactured to our specification and your measurements, and arrives assembled — not flat-packed in a carton for somebody to build on your floor.'],
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
              <p class="lede mt-2" style="max-width:44ch">Every surface here was drawn for one room, specified to the millimetre and installed by the people who drew it.</p>
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
          <p class="eyebrow" ${rv()}>Where we work</p>
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
    { q: 'Is the free design really free?', a: 'Yes. The measure, the 3D render, the material board and the fixed quote cost you nothing and carry no obligation. If our number does not work for you, you keep the drawings of your own room. We can afford to do this because we carry no showroom and no franchise fee — that overhead goes into your kitchen instead.' },
    { q: 'How long does a kitchen take?', a: 'Eight to twelve weeks from signed quote to handover. Design and documentation takes two to three weeks, manufacture to your specification four to six, and installation is typically seven to ten working days on site.' },
    { q: 'Who makes the cabinetry?', a: 'It is manufactured to our specification and your measurements by the maker we have chosen and stay with, and delivered to us assembled rather than flat-packed. We draw it, we specify every carcass, hinge and runner, we check each unit before it goes in, and we install it with our own team. It is warranted by us for ten years — if something is wrong, it is ours to fix and there is nobody for us to point at.' },
    { q: 'Do you service Yeppoon and the Capricorn Coast?', a: 'Yes — Yeppoon, Emu Park, Gracemere, Mount Morgan and the wider Capricorn Coast are inside our standard service area at no travel loading. We also work through Gladstone, Emerald and Blackwater on larger projects.' },
    { q: 'Can I use my own builder and trades?', a: 'Absolutely. We work alongside your trades weekly and can hand them a full set of service drawings, or we can coordinate the whole renovation as a single point of contact. Both are priced transparently so you can choose on merit.' },
  ];

  const home = {
    file: 'index.html',
    title: 'Kitchen Renovations Rockhampton | Free Design — Bilt & Co',
    desc: 'Custom kitchen renovations in Rockhampton from $15,000. Free 3D design and fixed-price quote, installed by one local team, 10-year warranty.',
    og: 'collection-marble-01',
    preload: 'collection-marble-01',
    faq: homeFaq,
    trail: [['index.html', 'Home']],
    body: `
  <section class="hero">
    <div class="wrap hero__grid">
      <div>
        <span class="pill" ${rv()}>Only <b class="tabnums" data-spots data-spots-start="${SITE.spotsPerMonth}">${spotsNow()}</b> free design <span data-spots-plural>spots</span> left this month</span>
        <h1 class="d1" ${rv()} data-rv-d="1">The kitchen<br>Rockhampton<br><span class="italic brass">talks about.</span></h1>
        <p class="lede" ${rv()} data-rv-d="2">Bespoke kitchens drawn, specified and installed by one local team &mdash; with a free 3D design, a fixed price that does not move, and a ten-year warranty in writing.</p>
        <div class="badge-row mt-2" ${rv()} data-rv-d="3">
          <span class="badge">Free 3D design &amp; quote</span>
          <span class="badge">Fixed price, no variations</span>
          <span class="badge">Installed by our own team</span>
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
        ${frame('hero-main', 'Luxury bespoke kitchen and dining room with marble island, installed in Rockhampton by Bilt & Co', 'wide', { eager: true })}
        <div class="hero__badge">
          <b class="tabnums">75+</b>
          <span>Central Queensland kitchens, designed and installed from Rockhampton</span>
        </div>
      </div>
      <div>
        <p class="eyebrow" ${rv()}>Why Bilt &amp; Co</p>
        <h2 class="d2" ${rv()} data-rv-d="1">You will open these<br>drawers <span class="italic brass">40,000 times.</span></h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">A kitchen is the most-touched thing you will ever buy. It should feel expensive every morning &mdash; not just in the photos taken the week it was finished.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="3">So we specify to a standard, not to a price. Moisture-resistant carcasses because this is Central Queensland. Blum hardware with a lifetime mechanical warranty. Laser-bonded edges that will not lift in a Rockhampton February. Then we install it ourselves and put our name on it for ten years.</p>
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
    service: { name: "Bespoke kitchen design and installation", type: "Kitchen renovation" },
    title: 'Custom Kitchens Rockhampton | Design & Install — Bilt & Co',
    desc: 'Custom kitchens designed and installed in Rockhampton. Three collections from $15,000, free 3D design, fixed quotes, 10-year warranty.',
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
        <p class="lede">Every kitchen drawn from a blank page for one room and one household &mdash; specified to the millimetre, delivered assembled and installed by our own team.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Get my free 3D design</a>
          <a class="btn btn--ghost btn--lg" href="investment.html">See the price bands</a>
        </div>
        <div class="badge-row mt-2">
          <span class="badge">Fixed price</span><span class="badge">10-year warranty</span><span class="badge">Fully insured</span>
        </div>
      </div>
      <div>${frame('collection-marble-04', 'Custom oak and marble kitchen designed and installed by Bilt & Co in Rockhampton', 'wide', { eager: true })}</div>
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

  <section class="section">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>The specification</p>
      <div class="split" style="align-items:end;margin-bottom:2.5rem">
        <h2 class="d2" ${rv()} data-rv-d="1">What is actually<br>in the price.</h2>
        <p class="muted" ${rv()} data-rv-d="2">Most kitchen quotes describe a look. This is the build. Ask any other company you are talking to for the same six lines in writing &mdash; it is the fastest way to understand why two quotes for the &ldquo;same&rdquo; kitchen are thousands apart.</p>
      </div>

      <div class="scan" ${rv()} data-rv-d="1" style="overflow-x:auto;border:1px solid var(--line);border-radius:var(--radius);background:#FDFBF7">
        <table class="cmp">
          <thead><tr><th scope="col">Component</th><th scope="col">What we specify</th><th scope="col">Why it matters here</th></tr></thead>
          <tbody>
            <tr><th scope="row">Carcass</th><td>18mm moisture-resistant board</td><td>16mm standard board swells the first time water reaches a joint. In this climate that is when, not if.</td></tr>
            <tr><th scope="row">Edging</th><td>Laser-bonded, no glue line</td><td>Hot-melt glued edging lifts in heat and humidity. Laser bonding leaves no seam for it to start from.</td></tr>
            <tr><th scope="row">Hinges</th><td>Blum soft-close, lifetime warranty</td><td>The part you touch most and notice least until it sags. Blum carries a lifetime mechanical warranty.</td></tr>
            <tr><th scope="row">Runners</th><td>Blum full-extension</td><td>The whole drawer comes out, not two thirds. You use the back of every drawer instead of losing it.</td></tr>
            <tr><th scope="row">Benchtop</th><td>Stone, porcelain or laminate</td><td>Porcelain and sintered stone are the best performers in a room that gets afternoon sun.</td></tr>
            <tr><th scope="row">Install</th><td>Our own team, adjustable legs</td><td>Rockhampton floors are rarely level. Adjustable legs and scribed fillers mean that is our problem, not yours.</td></tr>
          </tbody>
        </table>
      </div>
      <p class="small muted mt-2" ${rv()}>Every one of these is standard across all three collections. The collections differ in doors, benchtop and hand-work &mdash; never in the parts that determine how long the kitchen lasts.</p>
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>What moves the number</p>
      <div class="split" style="align-items:end;margin-bottom:2.5rem">
        <h2 class="d2" ${rv()} data-rv-d="1">Four things<br>set your price.</h2>
        <p class="muted" ${rv()} data-rv-d="2">In order of impact. Everything else is rounding, which is why we can quote a realistic range on the phone before we have seen your room.</p>
      </div>
      <div class="grid cols-4">
        <div class="step" ${rv()} data-rv-d="1">
          <span class="step__no">1</span>
          <h3>Run length</h3>
          <p class="muted">The single biggest factor. We price per linear metre of cabinetry, so a 4m kitchen and an 8m kitchen are genuinely different projects. Measure your runs and the <a href="investment.html" style="color:var(--brass)">estimator</a> will give you a real range.</p>
        </div>
        <div class="step" ${rv()} data-rv-d="2">
          <span class="step__no">2</span>
          <h3>Benchtop</h3>
          <p class="muted">Laminate is included. Engineered stone adds roughly $1,750 on a compact run, porcelain more again, natural stone more again. It is the largest single upgrade most people make. <a href="guide-benchtops-compared.html" style="color:var(--brass)">Compared here</a>.</p>
        </div>
        <div class="step" ${rv()} data-rv-d="3">
          <span class="step__no">3</span>
          <h3>Doors</h3>
          <p class="muted">Where taste lives, and where a budget flexes most safely. Laminate and matte at the bottom, two-pack in the middle, timber veneer above. A beautiful door on cheap hardware is a false economy; the reverse is merely patient.</p>
        </div>
        <div class="step" ${rv()} data-rv-d="4">
          <span class="step__no">4</span>
          <h3>Fit-out</h3>
          <p class="muted">Pull-downs, blind-corner pull-outs, carousels and push-to-open motion, each priced individually. The same items do most of the work in an <a href="/guide-ndis-kitchen-modifications-queensland" style="color:var(--brass)">accessible kitchen</a>. Cheaper designed in than retrofitted, because the cabinet has to be built to suit. <a href="fit-out.html" style="color:var(--brass)">All eight options</a>.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>Who we build for</p>
      <div class="split" style="align-items:end;margin-bottom:2.5rem">
        <h2 class="d2" ${rv()} data-rv-d="1">Not every kitchen<br>is a renovation.</h2>
        <p class="muted" ${rv()} data-rv-d="2">Roughly half of what we build is not somebody replacing a tired kitchen. Each of these has its own constraints, its own pricing and its own page.</p>
      </div>
      <div class="grid cols-3">
        <a class="card" href="new-build-kitchens.html" ${rv()} data-rv-d="1">
          <div class="card__body"><p class="card__price">From $15,000</p><h3 class="d4">New builds</h3><p>Upgrading from the builder&rsquo;s standard, worked against your construction programme.</p><span class="link-u mt-1">More &rarr;</span></div>
        </a>
        <a class="card" href="granny-flat-kitchens.html" ${rv()} data-rv-d="2">
          <div class="card__body"><p class="card__price">From $6,500</p><h3 class="d4">Granny flats</h3><p>Secondary dwellings and under-house conversions, specified for the second tenant.</p><span class="link-u mt-1">More &rarr;</span></div>
        </a>
        <a class="card" href="tiny-home-kitchens.html" ${rv()} data-rv-d="3">
          <div class="card__body"><p class="card__price">From $5,300</p><h3 class="d4">Tiny homes</h3><p>Compact runs where every millimetre counts, with full-size hardware.</p><span class="link-u mt-1">More &rarr;</span></div>
        </a>
        <a class="card" href="kitchenettes.html" ${rv()} data-rv-d="4">
          <div class="card__body"><p class="card__price">From $4,500</p><h3 class="d4">Kitchenettes</h3><p>Studios, offices and short-stay rooms. A bench, a sink and storage that earns its place.</p><span class="link-u mt-1">More &rarr;</span></div>
        </a>
        <a class="card" href="short-stay-kitchens.html" ${rv()} data-rv-d="5">
          <div class="card__body"><p class="card__price">From $6,500</p><h3 class="d4">Short-stay &amp; Airbnb</h3><p>Built to photograph well and survive guests who have no reason to be careful.</p><span class="link-u mt-1">More &rarr;</span></div>
        </a>
        <a class="card" href="trade.html" ${rv()} data-rv-d="6">
          <div class="card__body"><p class="card__price">Trade pricing</p><h3 class="d4">Builders</h3><p>Held specifications for repeating layouts. Supply only, or supply and install.</p><span class="link-u mt-1">More &rarr;</span></div>
        </a>
      </div>
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap split">
      <div>
        <p class="eyebrow" ${rv()}>Rockhampton, specifically</p>
        <h2 class="d2" ${rv()} data-rv-d="1">Three rooms we<br>see constantly.</h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">Housing stock here is distinctive, and the same three projects come across our table most weeks.</p>
        <a class="link-u mt-3" href="contact.html" ${rv()} data-rv-d="3">Tell us about yours &rarr;</a>
      </div>
      <div ${rv()} data-rv-d="1">
        <ul class="list-check">
          <li><strong><a href="/under-house-kitchens-rockhampton" style="color:var(--brass)">The high-set under-house conversion.</a></strong> Enclosing beneath an older Queenslander to make a second living space or flat <a href="/guide-queenslander-kitchen-renovation" style="color:var(--brass)">(renovating the kitchen upstairs has its own quirks)</a>. If the space has taken water before, <a href="/guide-flood-damage-kitchen-replacement-rockhampton" style="color:var(--brass)">specify it so it can be dried out</a>. Floors are rarely level and walls are rarely square, so we measure what is actually there and scribe to it rather than trusting the plan.</li>
          <li><strong>The 1970s brick renovation.</strong> Small, closed-off kitchens with a load-bearing wall between the cooking and living space. Half the value is in what comes out, so we bring a builder through before quoting rather than after.</li>
          <li><strong>The new build upgrade.</strong> A house under construction where the standard kitchen in the contract does not match the rest of the build. Worth raising with your builder before the slab, while services can still move cheaply.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
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
    service: { name: "Butler's pantry design and construction", type: "Butler's pantry installation" },
    title: 'Butler\'s Pantry Rockhampton | Custom Build — Bilt & Co',
    desc: 'Custom butler\'s pantries designed and installed in Rockhampton from $4,000. Second sinks, bulk storage, concealed doors. Free design and fixed quote.',
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
        <p class="lede mt-2" ${rv()} data-rv-d="2">Ask any client with a butler's pantry what they would keep if they rebuilt tomorrow. It is never the splashback. If you are still deciding, our guide on <a href="guide-butlers-pantry-worth-it.html" style="color:var(--brass)">whether you actually need one</a> covers the clearances below which it stops working.</p>
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
    service: { name: "Custom joinery, wardrobes and vanities", type: "Custom joinery" },
    title: 'Walk-In Wardrobes & Joinery Rockhampton — Bilt & Co',
    desc: 'Bespoke joinery in Rockhampton: walk-in wardrobes from $3,600, laundries, vanities, media walls and studies. Designed and installed by one local team.',
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
      <div>${frame('wardrobe-robe', 'Custom walk-in wardrobe with glazed joinery, installed in Rockhampton', 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap grid cols-2">
      ${[
        ['Walk-in wardrobes', '$3,600 – $9,900', 'wardrobe-walkin', 'Custom walk-in wardrobe with lit timber shelving and drawers, Rockhampton', 'Hanging calculated against what you own rather than a standard. Soft-close drawers with felt-lined inserts, lighting on a door sensor, glazed or open fronts, and a bench if the room allows.'],
        ['Laundries', '$2,800 – $7,700', 'laundry-room', 'Custom laundry joinery with overhead cabinets and folding bench, Rockhampton', 'The most under-designed room in most Rockhampton homes — <a href="laundries.html" style="color:var(--brass)">see what a proper one costs</a>. Full-height broom storage, a proper folding bench, a drying rail out of sight, and a benchtop that survives a decade of detergent.'],
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

  /* Captions describe what is in the photograph — materials, layout, detail.
     They previously named Rockhampton suburbs, which claimed these were our
     completed projects. They are reference imagery until the real work is
     photographed, and the copy now says so. */
  const GAL = [
    ['hero-main', 'Dark timber kitchen and dining room with a stone island and linear pendant lighting', 'Dark timber, stone island', 'Full-height joinery to the ceiling', 'g-8 ar-43'],
    ['dark-luxe-bar', 'Dark kitchen with timber bar stools and an integrated coffee station', 'Integrated coffee station', 'Appliance garage behind a lift door', 'g-4 ar-34'],
    ['collection-marble-01', 'Oak kitchen with a full-height marble splashback and stone island bench', 'American oak and marble', 'Full-height stone splashback', 'g-4 ar-34'],
    ['collection-marble-02', 'Marble splashback with brass wall lights above an oak kitchen run', 'Brass lighting on stone', 'Handleless rail, no visible hardware', 'g-8 ar-43'],
    ['island-marble-brass', 'Stone island bench with brushed brass tapware and a natural stone benchtop', 'Brushed brass tapware', 'Mitred stone edge, 40mm', 'g-6 ar-43'],
    ['signature-dark', 'Dark navy kitchen with leather bar seating opening to a living area', 'Navy cabinetry, leather seating', 'Open-plan island with seating for four', 'g-6 ar-43'],
    ['splashback-marble-01', 'Full-height marble splashback with matte black tapware over an induction cooktop', 'Matte black tapware', 'Induction, flush to the stone', 'g-4 ar-34'],
    ['detail-stone-black', 'Black stone benchtop with concealed under-cabinet lighting', 'Black stone, concealed lighting', 'LED to the underside of the overheads', 'g-4 ar-34'],
    ['island-calacatta', 'Calacatta marble waterfall island in a bright open kitchen', 'Calacatta waterfall island', 'Veining matched across the return', 'g-4 ar-34'],
    ['openplan-long', 'Open plan kitchen with a long island bench and integrated appliances', 'Long island, integrated appliances', 'Four metre run, single stone slab', 'g-8 ar-43'],
    ['matte-black-bank', 'Matte black handleless cabinetry with an appliance garage', 'Matte black, handleless', 'Push-to-open, no handles at all', 'g-4 ar-34'],
    ['galley-stone', 'Stone galley kitchen with pendant lighting and concealed handles', 'Galley layout in stone', 'Compact run, full-depth storage', 'g-4 ar-34'],
    ['glossy-dark', 'Dark gloss kitchen joinery with integrated ovens', 'Gloss doors, integrated ovens', 'Tall bank, floor to ceiling', 'g-4 ar-34'],
    ['dark-island', 'Dark island bench with pendant lighting and open living beyond', 'Dark island, pendant lighting', 'Seating on two sides', 'g-4 ar-34'],
    ['collection-marble-03', 'Marble splashback with brass lighting above a timber kitchen', 'Timber and marble together', 'Warm neutrals, matte finish', 'g-6 ar-43'],
    ['splashback-marble-02', 'Marble splashback and timber joinery with an integrated oven', 'Stone splashback, timber doors', 'Oven at bench height', 'g-6 ar-43'],
    ['concrete-luxe', 'Kitchen with a concrete ceiling, white island and bar stools', 'White island, concrete above', 'Minimal, no upper cabinets', 'g-4 ar-34'],
    ['black-marble-bar', 'Black marble bar with bar stools and concealed lighting', 'Black marble bar', 'Waterfall ends, both sides', 'g-4 ar-34'],
    ['island-marble-close', 'Marble island benchtop detail with pendant lights above', 'Stone detail, close', 'Mitred edge and shadow line', 'g-4 ar-34'],
    ['timber-island', 'Timber island and joinery in an open plan home', 'Timber island', 'Warm oak, hard-wax oil finish', 'g-6 ar-43'],
    ['wardrobe-robe', 'Custom walk-in wardrobe with glazed joinery and integrated lighting', 'Walk-in robe, glazed fronts', 'Lighting on a door sensor', 'g-6 ar-43'],
    ['detail-timber-joinery', 'Timber media joinery and stone splashback detail', 'Media joinery in timber', 'Ventilated equipment bays', 'g-6 ar-43'],
    ['drawer-detail', 'Deep pot drawers with brass handles and internal organisers', 'Deep drawers, organisers', 'Blum full-extension runners', 'g-6 ar-43'],
    ['dark-dining', 'Dark timber kitchen and dining space with feature lighting', 'Kitchen into dining', 'One material palette throughout', 'g-12 ar-219'],
  ];

  const gallery = {
    file: 'gallery.html',
    images: GAL,
    title: 'Kitchen Gallery & Finishes | Bilt & Co Rockhampton',
    desc: 'Kitchen design references from Bilt & Co — timber and stone, handleless and gloss finishes, island layouts and joinery detail, and what each costs.',
    og: 'signature-dark',
    preload: 'hero-main',
    trail: [['index.html', 'Home'], ['gallery.html', 'Gallery']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Gallery']])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">Finishes,<br><span class="italic brass">layouts and detail.</span></h1>
        <p class="lede">Twenty-four references covering the combinations we are asked for most often &mdash; what each material actually looks like in a room, and what it does to the price.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Design mine</a>
          <a class="btn btn--ghost btn--lg" href="investment.html">What these cost</a>
        </div>
      </div>
      <div>${frame('collection-marble-01', 'Oak kitchen with full-height marble splashback and stone island', 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section--tight" style="padding-bottom:0">
    <div class="wrap">
      <div class="split" style="align-items:end;margin-bottom:2rem">
        <div>
          <p class="eyebrow" ${rv()}>How to read this</p>
          <h2 class="d2" ${rv()} data-rv-d="1">Three decisions<br>set the price.</h2>
        </div>
        <p class="muted" ${rv()} data-rv-d="2">Almost every kitchen below is a combination of the same three choices: what the doors are made of, what the benchtop is cut from, and whether there are handles. Everything else is detail. Knowing that makes a gallery far easier to use than scrolling for something that feels right.</p>
      </div>

      <div class="grid cols-3" style="margin-bottom:2.5rem">
        <div ${rv()} data-rv-d="1">
          <h3 class="d4">Doors</h3>
          <p class="small muted">Laminate and matte finishes sit at the bottom of the range and behave well in this climate. Timber veneer costs more and moves more, and is worth it where you will touch it daily. Two-pack paint sits between them and can be any colour you like.</p>
        </div>
        <div ${rv()} data-rv-d="2">
          <h3 class="d4">Benchtops</h3>
          <p class="small muted">Laminate is included. Engineered stone adds around $1,750 on a compact run. Porcelain and sintered stone add more again and handle heat and afternoon sun better than anything else. Natural marble is the most beautiful and the least forgiving. <a href="guide-benchtops-compared.html" style="color:var(--brass)">All five compared here</a>.</p>
        </div>
        <div ${rv()} data-rv-d="3">
          <h3 class="d4">Handles, or none</h3>
          <p class="small muted">A handleless rail is included in every collection. Push-to-open motion is an upgrade and adds roughly $1,200 to $2,400 across a run. Solid brass and bronze hardware sit at the top and change the character of a kitchen more than any other single item.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section--tight">
    <div class="wrap">
      <div class="gal">
        ${GAL.map(([f, alt, cap, sub, cls], i) => `
        <a class="${cls}" href="contact.html" ${rv()} data-rv-d="${(i % 3) + 1}">
          ${img(f, alt)}
          <figcaption><strong>${cap}</strong><br>${sub}</figcaption>
        </a>`).join('')}
      </div>
      <div class="note mt-3" ${rv()} style="border:1px solid var(--line);background:var(--paper-2);border-radius:var(--radius);padding:1.15rem 1.35rem">
        <p class="small muted" style="margin:0">These are design references showing materials and layouts, not photographs of completed Bilt &amp; Co projects. We photograph every kitchen we finish, and this page will be replaced with our own work as those projects come through.</p>
      </div>
      <!-- PLACEHOLDER: replace with the client's own project photography and remove the
           disclosure note above once real work is shot. See PLACEHOLDERS.md -->
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap split">
      <div>
        <p class="eyebrow" ${rv()}>Where to start</p>
        <h2 class="d2" ${rv()} data-rv-d="1">Bring us a picture<br>you like.</h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">You do not need to know what the finish is called — though <a href="guide-kitchen-colours-2026.html" style="color:var(--brass)">what people are choosing in 2026</a> is worth five minutes if you are starting from scratch. Screenshot anything &mdash; from here, from Instagram, from a friend&rsquo;s house &mdash; and we will tell you what it is, what it costs, and whether it will survive a Central Queensland summer.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="3">That last part matters more than people expect. Some finishes that photograph beautifully in a Melbourne apartment do not belong in a room that gets afternoon sun in February.</p>
        <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="4">Send us your reference</a>
      </div>
      <div ${rv()} data-rv-d="1">${frame('material-samples', 'Timber veneer and finish samples on a workbench', 'wide')}</div>
    </div>
  </section>

  ${reviews}
  ${ctaBand({ eyebrow: 'Yours next', title: 'We photograph every<br><span class="italic" style="color:var(--brass-lite)">kitchen we finish.</span>', body: 'Book a free design consultation and we will walk you through the full specification for anything here — the materials, the hardware and what it costs to build.' })}
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
    title: 'Our Process | How Your Kitchen Comes Together — Bilt & Co',
    desc: 'From free design consultation to handover: how Bilt & Co designs, specifies and installs a kitchen in Rockhampton. Timelines, payments, what we ask.',
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
        ['Weeks 4–9', 'Your cabinetry is manufactured to specification. Your trades are booked and a written site programme is issued.'],
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
          <li><strong>A real budget.</strong> Not a number designed to test us. Tell us the truth and we will design to it, or tell you it cannot be done. <a href="guide-kitchen-renovation-checklist.html" style="color:var(--brass)">Our renovation checklist</a> covers what to have ready before the first visit.</li>
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
    title: 'About Bilt & Co | Kitchen Design & Install, Rockhampton',
    desc: 'Bilt & Co is a Rockhampton kitchen design studio. We specify, supply and install bespoke kitchens and joinery. Fully insured. ACN 700 798 509.',
    og: 'material-samples',
    preload: 'material-samples',
    trail: [['index.html', 'Home'], ['studio.html', 'Studio']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Studio']])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">A design studio,<br><span class="italic brass">not a shopfront.</span></h1>
        <p class="lede">Not a retailer. Not a franchise. Bilt &amp; Co draws every kitchen it sells, specifies it to the millimetre, and installs it with its own team.</p>
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
        <p class="mt-2 muted" ${rv()} data-rv-d="2">Bilt &amp; Co is the other model. The person who measures your kitchen designs it. The specification is ours, down to the millimetre. The installers are on our payroll. When something is not right &mdash; and occasionally something is not right &mdash; there is nobody for us to blame, so we simply fix it.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="3">That is also why we can put ten years in writing on cabinetry and workmanship. It is not a marketing line; it is what happens when one studio owns the drawing, the specification and the installation, and intends to be answering the phone in ten years.</p>
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
        <span class="pill"><b class="tabnums" data-spots data-spots-start="${SITE.spotsPerMonth}">${spotsNow()}</b> free design <span data-spots-plural>spots</span> left this month</span>
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
        <form class="form-card form" id="enquiry" name="consultation" method="POST"
          action="/thanks" data-netlify="true" data-netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="consultation">
          <p class="hp"><label>Leave this field empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
          <div class="form-card__head">
            <h2 class="d4">Book your free design consultation</h2>
            <p class="small muted" style="margin:0">Takes about 60 seconds. No deposit, no sales visit unless you want one.</p>
          </div>
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
    // Towns inside about an hour carry the no-travel-loading promise. Further
    // out it is not confirmed, so `travel` overrides it rather than asserting.
    const travel = opts.travel
      || `${place} is inside Bilt & Co's standard service area with no travel loading — we are based ${drive} away in ${SITE.suburb}. We site measure in ${place} weekly.`;
    const descTail = opts.descTail || 'Free 3D design, fixed quotes, no travel loading.';
    const tp = place.replace(/^the /, '');
    const faq = [
      { q: `Do you build kitchens in ${place}?`, a: `Yes. ${travel}` },
      { q: `How much does a kitchen cost in ${place}?`, a: `The same as Rockhampton: $15,000 to $23,000 for our Essence collection, $26,000 to $42,000 for Maison, and $47,000 and up for fully bespoke Atelier work. We do not charge a premium for ${place} projects.` },
      { q: `Will your own team install it?`, a: `Yes. Our employed installation team works across the region every week — we do not subcontract ${place} jobs to a third party. Same crew, same ten-year warranty.` },
      { q: `Is the design consultation really free in ${place}?`, a: `Yes — the site measure, the 3D design and the fixed quote are free anywhere in our service area, ${place} included. If our number does not work for you, you keep the drawings.` },
    ];
    return {
      file: `kitchens-${slug}.html`,
      service: { name: `Kitchen design and installation in ${place}`, type: 'Kitchen renovation', areas: [place] },
      title: `Kitchen Renovations ${tp} | Free Design — Bilt & Co`,
      desc: `Custom kitchens in ${place} from $15,000, designed and installed by our Rockhampton team. ${descTail}`,
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
        <span class="pill">${opts.pill || `${drive} from our Rockhampton base &middot; No travel loading`}</span>
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
        <p class="lede" ${rv()} data-rv-d="1">Every ${tp} kitchen is designed, supplied and installed by Bilt &amp; Co &mdash; ${opts.leadNote || 'no travel loading'}, no subcontracted installers, and the same ten-year warranty we give a job in Rockhampton itself.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="2">We site measure across ${place} and the surrounding area weekly. We will come to your kitchen table with a tape and a camera, at a time that suits you.</p>
        <div class="area-tags mt-3" ${rv()} data-rv-d="3">${suburbs.map((s) => `<span>${s}</span>`).join('')}</div>
        ${opts.related ? `<p class="small muted mt-2">Also in ${tp}: ${opts.related.map((r) => `<a href="${r[0]}" style="color:var(--brass)">${r[1]}</a>`).join(" &middot; ")}</p>` : ''}
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
    areaPage('gladstone', 'Gladstone', {
      related: [['/granny-flat-kitchens-gladstone', 'granny flat kitchens in Gladstone']],
      leadNote: 'one team from design to handover',
      drive: 'about 90 minutes', image: 'concrete-luxe',
      alt: 'Bright modern kitchen with stone island, Gladstone',
      pill: 'Inside our installation area &middot; Gladstone &amp; surrounds',
      descTail: 'Free 3D design and fixed quotes. Installed by our own team.',
      travel: `Yes. Gladstone is inside our installation area and our own team installs there — we do not subcontract it. We are based about 90 minutes north in ${SITE.suburb}. Tell us your timing and we will confirm the next available site measure.`,
      blurb: 'An industrial city with housing stock to match — workers&rsquo; cottages, seventies brick, and a steady run of investment properties turning over between tenants. Durability matters more here than anywhere else on our board.',
      suburbs: ['Gladstone', 'West Gladstone', 'South Gladstone', 'Kin Kora', 'Clinton', 'Telina', 'New Auckland', 'Calliope', 'Tannum Sands', 'Boyne Island'],
    }),
    areaPage('biloela', 'Biloela', {
      leadNote: 'one team from design to handover',
      drive: 'about two hours', image: 'galley-stone',
      alt: 'Compact galley kitchen with stone benchtop, Biloela',
      pill: 'Inside our installation area &middot; Callide Valley',
      descTail: 'Free 3D design and fixed quotes. Installed by our own team.',
      travel: `Yes. Biloela and the Callide Valley are inside our installation area, installed by our own team. We are based about two hours away in ${SITE.suburb}, so we schedule site measures and installations together rather than dropping in — tell us your timing and we will confirm the next visit.`,
      blurb: 'Rural and agricultural, with properties that are worked hard and renovated properly rather than often. Most of what we do here is a kitchen meant to last twenty years, not five.',
      suburbs: ['Biloela', 'Thangool', 'Callide', 'Jambin', 'Banana', 'Moura', 'Dululu', 'Goovigen'],
    }),
    areaPage('yeppoon', 'Yeppoon', {
      related: [['/granny-flat-kitchens-yeppoon', 'granny flat kitchens'], ['/short-stay-kitchens-capricorn-coast', 'holiday let kitchens']],
      drive: '40 minutes', image: 'openplan-long',
      alt: 'Open plan coastal kitchen with long island bench, Yeppoon',
      blurb: 'Coastal homes need joinery that can take salt air, humidity and a house full of weekend guests. Building a secondary dwelling here? <a href="/guide-class-1a-granny-flat-yeppoon" style="color:var(--brass)">What Class 1a means on the Capricorn Coast</a>. We build for all three.',
      suburbs: ['Yeppoon', 'Cooee Bay', 'Lammermoor', 'Taranganba', 'Barmaryee', 'Farnborough', 'Zilzie', 'Emu Park', 'Mulambin', 'Kinka Beach'],
    }),
    areaPage('gracemere', 'Gracemere', {
      related: [['/new-build-kitchens-gracemere', 'new build kitchens in Gracemere']],
      drive: '15 minutes', image: 'island-calacatta',
      alt: 'Bright kitchen with marble waterfall island, Gracemere',
      blurb: 'New builds and growing families, fifteen minutes from our door. Gracemere is one of the busiest postcodes on our board.',
      suburbs: ['Gracemere', 'Stanwell', 'Kabra', 'Bouldercombe', 'Fairy Bower', 'Alton Downs', 'Mount Morgan', 'Westwood'],
    }),
    areaPage('capricorn-coast', 'the Capricorn Coast', {
      related: [['/short-stay-kitchens-capricorn-coast', 'holiday let kitchens'], ['/granny-flat-kitchens-yeppoon', 'granny flat kitchens in Yeppoon']],
      drive: '45 minutes', image: 'timber-island',
      alt: 'Timber island kitchen in a Capricorn Coast home',
      blurb: 'From Emu Park to Keppel Sands &mdash; bespoke kitchens designed in Rockhampton and installed on the coast by our own team.',
      suburbs: ['Emu Park', 'Zilzie', 'Keppel Sands', 'Kinka Beach', 'Causeway Lake', 'Mulambin', 'Bangalee', 'Rosslyn', 'Yeppoon'],
    }),
  ];

  /* ============================================================== FIT-OUT */
  /* Mechanism diagrams rather than product photography: they show how the
     thing actually works, and they do not pass a manufacturer's press shot
     off as one of our installs. */

  const FITOUT = [
    {
      slug: 'pull-down-overheads',
      name: 'Pull-down overheads',
      price: '$580 – $780',
      copy: 'Brings the top shelf down to where you can actually reach it. No stepstool, no forgotten back row.',
      fits: 'Needs an overhead at least 600mm wide and 800mm tall.',
      svg: `<rect x="26" y="14" width="108" height="52" rx="2"/><path d="M26 40h108"/>
            <rect x="44" y="72" width="72" height="16" rx="2"/><path d="M52 72V60M108 72V60"/>
            <path d="M138 30c14 18 10 40-10 52" stroke-dasharray="4 4"/><path d="M124 78l4 6 6-3"/>`,
    },
    {
      slug: 'motorised-pull-down-overheads',
      name: 'Motorised pull-down overheads',
      price: 'Quoted',
      copy: 'The same idea as the manual unit without the pull. A button lowers the shelf down and forward, which matters when reach or grip is the problem rather than height.',
      fits: 'Needs a power supply to the cabinet and an overhead built to the unit’s internal dimensions.',
      svg: `<rect x="26" y="14" width="108" height="52" rx="2"/><path d="M26 40h108"/>
            <rect x="20" y="10" width="12" height="10" rx="1"/><path d="M26 20v6"/>
            <rect x="44" y="72" width="72" height="16" rx="2"/><path d="M52 72V60M108 72V60"/>
            <path d="M138 30c14 18 10 40-10 52" stroke-dasharray="4 4"/><path d="M124 78l4 6 6-3"/>
            <circle cx="150" cy="46" r="6"/><path d="M150 43v6"/>`,
    },
    {
      slug: 'blind-corner-pull-outs',
      name: 'Blind-corner pull-outs',
      price: '$620 – $950',
      copy: 'The dead corner every kitchen wastes, turned into two full-depth trays that swing out with the door.',
      fits: 'Needs a corner cabinet of at least 900mm.',
      svg: `<path d="M20 20h60v40h60v60H20Z"/><rect x="30" y="70" width="42" height="14" rx="2"/>
            <rect x="30" y="92" width="42" height="14" rx="2"/>
            <path d="M84 77h34M84 99h34" stroke-dasharray="4 4"/><path d="M112 71l8 6-8 6"/>`,
    },
    {
      slug: 'drop-down-drying-racks',
      name: 'Drop-down drying racks',
      price: '$240 – $380',
      copy: 'Wet dishes drip into the sink and dry behind a closed door. Nothing sits on the benchtop.',
      fits: 'Needs an overhead directly above the sink, 600mm or wider.',
      svg: `<rect x="30" y="14" width="100" height="44" rx="2"/>
            <path d="M46 58v20M114 58v20M46 78h68"/><path d="M56 62v14M70 62v14M84 62v14M98 62v14"/>
            <path d="M40 100h80l-6 20H46Z"/>`,
    },
    {
      slug: 'corner-carousels',
      name: 'Corner carousels',
      price: '$420 – $680',
      copy: 'Two rotating shelves that bring the whole corner to the door, rather than you climbing into it.',
      fits: 'L-shaped corners only, 900mm minimum.',
      svg: `<path d="M20 20h60v40h60v60H20Z"/><circle cx="74" cy="74" r="34"/><circle cx="74" cy="74" r="4"/>
            <path d="M74 40a34 34 0 0132 22" stroke-dasharray="4 4"/><path d="M104 56l4 8 8-2"/>`,
    },
    {
      slug: 'internal-drawers',
      name: 'Internal drawers',
      price: '$180 – $280 each',
      copy: 'A drawer inside a drawer. Doubles what a deep pot drawer holds without adding a single cabinet.',
      fits: 'Any drawer 450mm deep or more.',
      svg: `<rect x="24" y="26" width="112" height="88" rx="2"/><path d="M24 62h112"/>
            <rect x="40" y="74" width="80" height="28" rx="2"/><path d="M64 88h32"/><path d="M62 44h36"/>`,
    },
    {
      slug: 'waste-systems',
      name: 'Concealed waste systems',
      price: '$380 – $560',
      copy: 'Two or three sorted bins on full-extension runners, behind a door, off the floor.',
      fits: 'Needs a 450mm or 600mm base cabinet.',
      svg: `<rect x="26" y="20" width="108" height="94" rx="2"/>
            <path d="M52 46h24v52H52ZM88 46h24v52H88Z"/><path d="M46 40h72"/>
            <path d="M134 60h16" stroke-dasharray="4 4"/><path d="M144 54l8 6-8 6"/>`,
    },
    {
      slug: 'tall-pantry-pull-outs',
      name: 'Tall pantry pull-outs',
      price: '$890 – $1,450',
      copy: 'Five shelves that come to you at once, so nothing lives permanently at the back.',
      fits: 'Needs a 450mm or 600mm tall unit, full height.',
      svg: `<rect x="34" y="10" width="60" height="118" rx="2"/>
            <path d="M42 30h44M42 52h44M42 74h44M42 96h44M42 118h44"/>
            <path d="M102 40h32M102 88h32" stroke-dasharray="4 4"/><path d="M128 34l8 6-8 6M128 82l8 6-8 6"/>`,
    },
    {
      slug: 'push-to-open',
      name: 'Push-to-open motion',
      price: '$1,200 – $2,400 per run',
      copy: 'Handleless doors and drawers that open at a touch and close themselves. The quiet luxury option.',
      fits: 'Needs power to the cabinet run. Specify before manufacture.',
      svg: `<rect x="24" y="30" width="112" height="80" rx="2"/><path d="M80 30v80"/>
            <path d="M62 70h-24" stroke-dasharray="4 4"/><path d="M46 64l-8 6 8 6"/>
            <circle cx="96" cy="70" r="7"/><path d="M110 58l8-8M114 70h10M110 82l8 8"/>`,
    },
  ];

  const fitoutFaq = [
    { q: 'Are these included or extra?', a: 'Soft-close hinges and runners are standard on every Bilt & Co kitchen at no extra cost. Everything on this page is a paid option, priced individually and itemised on your quote so you can see exactly what each one adds.' },
    { q: 'Can fit-out options be added later?', a: 'Some can, most should not be. Pull-downs, carousels and pantry pull-outs depend on the cabinet being built to suit — width, internal clearance and in some cases power. Retrofitting means replacing the cabinet. Decide these at design stage and they cost a fraction of what they cost afterwards.' },
    { q: 'Which one is worth it if I can only pick one?', a: 'The blind-corner pull-out, almost every time. It is the only option here that creates storage you currently do not have, rather than making existing storage easier to reach. Every kitchen with an L-shaped corner is wasting roughly half a cabinet.' },
    { q: 'Is this Blum hardware?', a: 'The runners, hinges and motion systems are Blum, which carries a lifetime mechanical warranty. Some specialist units — carousels and pull-down shelves in particular — come from other specialist manufacturers where they make a better product. We will tell you which is which on your quote.' },
  ];

  const fitout = {
    file: 'fit-out.html',
    service: { name: "Kitchen fit-out and storage options", type: "Kitchen fit-out" },
    title: 'Kitchen Fit-Out Options & Prices | Bilt & Co Rockhampton',
    desc: 'Pull-down overheads, blind-corner pull-outs, carousels, waste systems and push-to-open motion — what each one does, what it costs, and where it fits.',
    og: 'drawer-detail',
    preload: 'drawer-detail',
    priority: '0.8',
    faq: fitoutFaq,
    trail: [['index.html', 'Home'], ['kitchens.html', 'Kitchens'], ['fit-out.html', 'Fit-out options']],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['kitchens.html', 'Kitchens'], ['#', 'Fit-out options']])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">Every cabinet<br><span class="italic brass">can go further.</span></h1>
        <p class="lede">Soft-close is the standard. Motion is the option. Pull-down overheads, blind-corner pull-outs and lift systems &mdash; drawn into your layout at design stage, not bolted on afterwards.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Get these priced for your kitchen</a>
          <a class="btn btn--ghost btn--lg" href="investment.html">See the collections</a>
        </div>
      </div>
      <div>${frame('drawer-detail', 'Deep pot drawer with internal organisers and full-extension runners', 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap">
      <div class="split" style="align-items:end;margin-bottom:2.5rem">
        <div>
          <p class="eyebrow" ${rv()}>The options</p>
          <h2 class="d2" ${rv()} data-rv-d="1">Eight ways to get<br>more out of the same room.</h2>
        </div>
        <p class="muted" ${rv()} data-rv-d="2">Each one is priced individually and itemised on your quote. The note under each says where it fits &mdash; and where it does not, because a pull-out that will not fit your corner is worth knowing about before you pay for it.</p>
      </div>

      <div class="fitout">
        ${FITOUT.map((f, i) => `
        <article class="fo" id="${f.slug}" ${rv()} data-rv-d="${(i % 4) + 1}">
          <div class="fo__dia" aria-hidden="true">
            <svg viewBox="0 0 160 140" fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round">${f.svg}</svg>
          </div>
          <div class="fo__body">
            <p class="fo__price">${f.price}</p>
            <h3 class="d4">${f.name}</h3>
            <p>${f.copy}</p>
            <p class="fo__fits">${f.fits}</p>
          </div>
        </article>`).join('')}
      </div>

      <p class="small muted mt-3" ${rv()}>Prices are fitted, added to a Bilt &amp; Co kitchen, and include the hardware and the cabinet modifications each option needs. Retrofitting into an existing kitchen is quoted separately.</p>
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap split">
      <div>
        <p class="eyebrow" ${rv()}>What you already get</p>
        <h2 class="d2" ${rv()} data-rv-d="1">Standard is<br>not basic.</h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">Before you add anything, every Bilt &amp; Co kitchen already includes the hardware most companies charge extra for.</p>
      </div>
      <div ${rv()} data-rv-d="1">
        <ul class="list-check">
          <li><strong>Blum soft-close hinges</strong> on every door, with a lifetime mechanical warranty</li>
          <li><strong>Blum full-extension runners</strong> on every drawer &mdash; the whole drawer comes out, not two thirds of it</li>
          <li><strong>18mm moisture-resistant carcasses</strong>, because this is Central Queensland</li>
          <li><strong>Laser-bonded edging</strong> with no glue line to lift</li>
          <li><strong>Adjustable legs and toe kicks</strong>, so an out-of-level floor is not your problem</li>
        </ul>
        <a class="link-u mt-3" href="kitchens.html">See what each collection includes &rarr;</a>
      </div>
    </div>
  </section>

  ${faqBlock(fitoutFaq, 'Fit-out questions')}
  ${reviews}
  ${ctaBand({ eyebrow: 'Specify it early', title: 'Cheaper to design in<br><span class="italic" style="color:var(--brass-lite)">than to retrofit.</span>', body: 'Most of these depend on the cabinet being built to suit. Decided at design stage they cost a fraction of what they cost once the kitchen is in. Bring your layout and we will tell you which are worth it for your room.', image: 'detail-black-cabinetry', alt: 'Matte black cabinetry with integrated storage' })}
`,
  };

  /* =============================================================== THANKS */
  /* Netlify redirects here after a successful form POST. Its existence is
     the only proof a visitor gets that the enquiry actually sent. */

  const thanks = {
    file: 'thanks.html',
    title: 'Enquiry received | Bilt & Co',
    desc: 'Your enquiry has reached the Bilt & Co studio. We reply within one business day.',
    og: 'collection-marble-01',
    priority: '0.1',
    noindex: true,
    trail: [['index.html', 'Home'], ['thanks.html', 'Enquiry received']],
    body: `
  <section class="section" style="min-height:62vh;display:flex;align-items:center">
    <div class="wrap">
      <div style="max-width:44rem">
        <p class="eyebrow" ${rv()}>Received</p>
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,3.75rem)" ${rv()} data-rv-d="1">That&rsquo;s with us.</h1>
        <p class="lede mt-2" ${rv()} data-rv-d="2">Your enquiry has landed in the studio. We reply within one business day &mdash; usually the same afternoon.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="3">If it is urgent, or you would rather just talk, call <a href="tel:${T}" style="color:var(--brass);text-decoration:underline">${SITE.phone}</a>.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem" ${rv()} data-rv-d="4">
          <a class="btn" href="gallery.html">See the work while you wait</a>
          <a class="btn btn--ghost" href="investment.html">Read the price guide</a>
        </div>
      </div>
    </div>
  </section>
`,
  };

  /* ============================================================= SEGMENTS */
  /* The four buyers who reorder. Compact-run prices are derived from the
     same rate card as the estimator in main.js, so the site never quotes two
     different numbers for the same kitchen. */

  const SEGMENTS = [
    {
      file: 'tiny-home-kitchens.html',
    related: [['/guide-tiny-home-laws-qld', 'tiny home laws in Queensland'], ['/guide-flat-pack-vs-assembled-kitchen', 'flat pack vs assembled']],
      slug: 'tiny-home',
      nav: 'Tiny home kitchens',
      title: 'Tiny Home Kitchens | Compact Runs from $5,300 | Bilt & Co',
      desc: 'Compact kitchens for tiny homes, from $5,300. Full-size hardware in a 1.8–2.4m run, delivered assembled and built to be lived in every day.',
      h1: 'Tiny home kitchens,<br><span class="italic brass">without the compromise.</span>',
      lede: 'A small kitchen is harder to design than a large one. Every millimetre is spoken for, and there is nowhere to hide a mistake.',
      img: 'galley-stone',
      alt: 'Compact galley kitchen with stone benchtop and full-height storage',
      price: 'From $5,300',
      range: '1.8m – 2.4m run',
      body: [
        ['Small does not mean cheap hardware', 'The temptation in a tiny home is to save on the parts you touch. It is the wrong place to save, because in a kitchen this size you touch everything, constantly. Every Bilt &amp; Co tiny home kitchen gets the same Blum soft-close hinges and full-extension runners as a $40,000 kitchen. The drawer still comes all the way out.'],
        ['Designed around the actual footprint', 'We draw to your measurements, not to a module, and <a href="guide-kitchen-layouts.html" style="color:var(--brass)">the layout you choose</a> matters more here than in any other kitchen. That matters more here than anywhere else: a 40mm filler panel in a 2.4m kitchen is 40mm of bench you have lost forever. If your build is on a trailer, tell us the axle position and we will keep the weight where it belongs.'],
        ['Built for a house that moves', 'Tiny homes travel, flex and settle. We specify moisture-resistant carcasses and laser-bonded edging as standard, fix into the frame rather than the lining where we can, and check every unit before it goes in.'],
      ],
      list: [
        '1.8m to 2.4m runs, drawn to your exact dimensions',
        'Blum soft-close hinges and full-extension runners throughout',
        '18mm moisture-resistant carcasses, laser-bonded edging',
        'Stone, porcelain or laminate benchtop',
        'Delivered assembled — not flat-packed in a carton',
        'Repeat pricing for builders doing multiple units',
      ],
      faq: [
        { q: 'How much is a tiny home kitchen?', a: 'A 1.8m run starts at about $5,300 and a 2.4m run at about $6,500, supplied with carcasses, doors, Blum hardware and a benchtop. The exact figure depends on your run length, benchtop material and whether you want fit-out options like a pull-down overhead. Draw it in the estimator or send us your dimensions for a fixed quote.' },
        { q: 'Can you work to a trailer build?', a: 'Yes, and we would rather know early. Tell us the trailer dimensions, the axle position and where your services come up, and we will design the cabinetry so the weight sits where your engineer wants it rather than where the kitchen happens to fall.' },
        { q: 'Do you supply tiny home builders repeatedly?', a: 'Yes — this is a large part of what we do. If you build multiple units to a repeating layout, we hold your specification so each order is a confirmation rather than a fresh design, and pricing reflects the volume. Talk to us about a trade account.' },
        { q: 'Is it delivered flat packed?', a: 'No. Your cabinetry arrives assembled. You are fitting a kitchen, not building one on the floor of a shell you still have to finish.' },
      ],
    },
    {
      file: 'granny-flat-kitchens.html',
    related: [['/granny-flat-kitchens-yeppoon', 'in Yeppoon'], ['/granny-flat-kitchens-gladstone', 'in Gladstone'], ['/guide-granny-flat-rules-rockhampton', 'the rules in Rockhampton'], ['/guide-granny-flat-rules-qld', 'the rules statewide'], ['/guide-multigenerational-living-queensland', 'moving family in']],
      slug: 'granny-flat',
      nav: 'Granny flat kitchens',
      title: 'Granny Flat Kitchens | From $6,500 Installed | Bilt & Co',
      desc: 'Kitchens for granny flats and secondary dwellings from $6,500. Durable, tenant-ready cabinetry in a 2.4–3.0m run, delivered assembled.',
      h1: 'Granny flat kitchens<br><span class="italic brass">that outlast the tenant.</span>',
      lede: 'A secondary dwelling kitchen has a harder life than a main one and usually a smaller budget. Those two facts fight each other, and cheap cabinetry loses.',
      img: 'matte-black-bank',
      alt: 'Compact handleless kitchen with integrated appliances for a secondary dwelling',
      price: 'From $6,500',
      range: '2.4m – 3.0m run',
      body: [
        ['Specify for the second tenant, not the first', 'A granny flat kitchen gets used hard and is rarely the owner using it. The parts that fail first are always the same: glued edging that lifts, standard runners that sag, and chipboard carcasses that swell the first time a tap drips. We specify against all three as standard, because replacing a kitchen in four years costs more than specifying it properly once. If you are planning to let it, <a href="/guide-granny-flat-rent-rockhampton" style="color:var(--brass)">what the approval decides about renting it out</a> matters more than the build cost.'],
        ['Small enough to be affordable, real enough to let', 'A 2.4 to 3.0 metre run covers almost every secondary dwelling, and a galley is almost always the right shape for it — see <a href="guide-kitchen-layouts.html" style="color:var(--brass)">the layouts compared</a> for the clearances that decide it. That is a genuine kitchen — full-depth base cabinets, a real benchtop, and storage a person can actually live out of, rather than a kitchenette that shows up in the listing photos as a compromise.'],
        ['Coordinated with your build', 'If the flat is under construction we will work to your builder’s programme and hand your trades a full set of service drawings. If it is a conversion of an under-house or garage space, we will measure what is really there rather than what the plan says.'],
      ],
      list: [
        '2.4m to 3.0m runs, drawn to your exact dimensions',
        'Moisture-resistant carcasses — the first thing to fail in a rental',
        'Blum hardware with a lifetime mechanical warranty',
        'Stone, porcelain or laminate benchtop',
        'Delivered assembled and installed by our own team',
        'Ten-year warranty on cabinetry and workmanship',
      ],
      faq: [
        { q: 'How much is a granny flat kitchen?', a: 'A 2.4m run starts at about $6,500 and a 3.0m run at about $7,700, including carcasses, doors, Blum hardware and a benchtop. Add a stone benchtop or fit-out options and it rises from there. Send us the dimensions and we will give you a fixed quote.' },
        { q: 'Is it worth spending more on a rental kitchen?', a: 'On hardware and carcasses, yes. On doors and benchtops, not especially. The parts that fail in a rental are the moving ones and the ones that meet water — runners, hinges and carcass edges. Spend there, keep the finishes simple, and <a href="/guide-does-a-new-kitchen-add-value" style="color:var(--brass)">what a kitchen does to value</a> follows. The kitchen will still be sound when the third tenant moves in.' },
        { q: 'Can you work with my builder?', a: 'Yes. We work alongside your trades weekly and can issue a full set of service drawings so your plumber and electrician know exactly where everything lands. We can also coordinate the whole fit-out as a single point of contact if you would rather not manage it.' },
        { q: 'Do you do under-house and garage conversions?', a: 'Regularly — it is one of the most common projects in Rockhampton. Older high-set homes convert well, but the floors are rarely level and the walls are rarely square. We measure what is actually there and scribe to it rather than assuming.' },
      ],
    },
    {
      file: 'new-build-kitchens.html',
    related: [['/new-build-kitchens-gracemere', 'in Gracemere']],
      slug: 'new-builds',
      nav: 'New build kitchens',
      title: 'New Build Kitchens Rockhampton | Bilt & Co',
      desc: 'Upgrading from the builder’s standard kitchen in a new build. Fixed pricing, service drawings for your trades, and delivery to your construction programme.',
      h1: 'The kitchen your builder<br><span class="italic brass">did not quote you.</span>',
      lede: 'The standard kitchen in a new build contract is chosen to hit a price, not to suit how you cook. Upgrading it is the single highest-value change most people make to a new home.',
      img: 'openplan-long',
      alt: 'Open plan new build kitchen with long island bench',
      price: 'From $15,000',
      range: 'Full kitchen, any layout',
      body: [
        ['You are allowed to use your own supplier', 'Most build contracts include a provisional sum for the kitchen, and most allow you to take it elsewhere. Ask your builder what the kitchen allowance is and whether it can be credited. Very often the answer is yes, and the difference between the allowance and a proper kitchen is far smaller than people assume.'],
        ['We work to your builder’s programme', 'A new build has a lock-up date and a trades sequence, and a kitchen that arrives at the wrong moment is a genuine problem. We book against your programme, issue service drawings so your plumber and electrician rough in to the right positions the first time, and deliver assembled so installation is days rather than weeks.'],
        ['Decide before the slab if you can', 'The cheapest time to change a kitchen is before anything is poured. Power to an island, a second sink in a pantry, or a wider opening all cost very little on a plan and a great deal once the slab is down. Bring us your floor plan early, even if you are months from needing us. <a href="guide-kitchen-renovation-checklist.html" style="color:var(--brass)">The checklist</a> sets out what to settle before the slab, when it is still free to change. In the meantime <a href="guide-kitchen-layouts.html" style="color:var(--brass)">the layout guide</a> will tell you what will actually fit the room you are building.'],
      ],
      list: [
        'Free 3D design of your actual plan before you commit',
        'Fixed price, itemised, valid 90 days — works against a provisional sum',
        'Full service drawings for your plumber and electrician',
        'Booked against your builder’s programme, not ours',
        'Delivered assembled; typical install seven to ten working days',
        'Ten-year warranty on cabinetry and workmanship',
      ],
      faq: [
        { q: 'Can I use my own kitchen supplier in a new build?', a: 'Usually yes. Most contracts carry a provisional sum or prime cost allowance for the kitchen, and most builders will credit it if you supply your own. Ask early — before the kitchen is ordered — and ask for the allowance figure in writing so you can compare properly.' },
        { q: 'When should I talk to you during a build?', a: 'Earlier than you think. Ideally before the slab, because power to an island, plumbing to a butler’s pantry and the position of a window over a sink all cost almost nothing on a plan and a great deal afterwards. Even at frame stage we can still influence the services.' },
        { q: 'Will you coordinate with my builder?', a: 'Yes, and we prefer it. We work to your builder’s programme, attend site meetings where useful, and issue a full set of service and setout drawings so your trades rough in correctly the first time. Your builder gets one contact and one delivery date.' },
        { q: 'How much more than the standard kitchen will it cost?', a: 'That depends entirely on the allowance in your contract, which is why we ask for it. Our kitchens start at $15,000 and most new build clients land between $26,000 and $42,000. Subtract the allowance your builder credits and the real number is often much smaller than the sticker.' },
      ],
    },
    {
      file: 'trade.html',
      slug: 'trade',
      nav: 'Trade & builders',
      title: 'Trade Kitchen Supply for Builders | Bilt & Co',
      desc: 'Kitchen and joinery supply for builders, tiny home makers and granny flat specialists. Fixed pricing, held specifications, delivered assembled.',
      h1: 'For builders who need<br><span class="italic brass">the same kitchen, again.</span>',
      lede: 'If you build repeatedly, the value is not in a clever design. It is in a specification that does not change, a price that does not move and a delivery that arrives when it said it would.',
      img: 'detail-timber-joinery',
      alt: 'Timber joinery detail showing cabinetry construction quality',
      price: 'Trade pricing',
      range: 'Supply, or supply and install',
      body: [
        ['We hold your specification', 'Once we have built a kitchen for one of your units, that specification stays on file — carcass, doors, hardware, benchtop, the lot. The next order is a confirmation, not a fresh design process. For anyone building repeating layouts, that removes the single most time-consuming part of ordering a kitchen.'],
        ['Supply only, or supply and install', 'Take delivery assembled and fit it with your own crew, or have our team install it. If you are speccing for a client, <a href="guide-benchtops-compared.html" style="color:var(--brass)">the benchtop guide</a> is the fastest way to explain the price difference to them. Most builders start with the first and move to the second once they have seen how long it takes us. Either way you get service drawings so your trades rough in correctly.'],
        ['Fixed price, and it stays fixed', 'Your quote is itemised and it holds. We have never issued a surprise variation for our own scope of works, which matters more to a builder carrying the risk on a fixed-price contract than it does to a homeowner.'],
        ['Segments we supply regularly', 'Tiny home builders, granny flat and secondary dwelling specialists, project builders upgrading from a standard kitchen, and renovators who want the cabinetry handled while they do everything else.'],
      ],
      list: [
        'Held specifications for repeating layouts',
        'Supply only, or supply and install',
        'Full service and setout drawings for your trades',
        'Delivered assembled — no flat-pack build time on site',
        'Fixed, itemised pricing that does not move',
        'Ten-year warranty on cabinetry and workmanship',
      ],
      faq: [
        { q: 'Do you offer trade pricing?', a: 'Yes. Trade terms depend on volume and how much of the process you take on, so they are quoted rather than published. Tell us what you build and roughly how many kitchens a year, and we will put terms in front of you.' },
        { q: 'Can I take supply only?', a: 'Yes. Cabinetry is delivered assembled with hardware fitted and a setout drawing, ready for your crew to fix and scribe. If you would rather we installed it, our own team does that too.' },
        { q: 'How far do you deliver?', a: 'Rockhampton, Gracemere, Yeppoon, Emu Park and the wider Capricorn Coast are inside our standard area. For trade volumes we will freight further — ask, and we will price the delivery honestly rather than folding a guess into the kitchen.' },
        { q: 'What lead time should I plan for?', a: 'Allow eight to twelve weeks from signed order to delivery for a first specification, and less once we hold your details. Tell us your programme and we will book against it rather than against ours.' },
      ],
      placeholder: 'PLACEHOLDER: trade discount structure, minimum order quantity, payment terms and credit application are not defined. Confirm with the client and add them here before promoting this page.',
    },
  ];

  SEGMENTS.push({
    file: 'kitchenettes.html',
    related: [['/under-house-kitchens-rockhampton', 'under-house conversions in Rockhampton'], ['/guide-garage-conversion-approval-qld', 'garage and shed conversions']],
    slug: 'kitchenette',
    nav: 'Kitchenettes',
    title: 'Kitchenettes Rockhampton | From $4,500 | Bilt & Co',
    desc: 'Compact kitchenettes from $4,500 for studios, under-house conversions, offices and short-stay rentals. 1.2–1.8m runs, delivered assembled and installed.',
    h1: 'Kitchenettes that<br><span class="italic brass">still feel like a kitchen.</span>',
    lede: 'A kitchenette is not a shrunken kitchen. It is a different brief — fewer appliances, less run, and every decision about what earns its place.',
    img: 'detail-black-cabinetry',
    alt: 'Compact kitchenette with integrated sink, benchtop and concealed storage',
    price: 'From $4,500',
    range: '1.2m – 1.8m run',
    body: [
      ['Where a kitchenette is the right answer', 'Studios and self-contained rooms. Under-house conversions where the ceiling will not take overheads. Offices and staff rooms. Short-stay and Airbnb rooms where guests reheat rather than cook. Pool houses and shed conversions. In all of them the job is a bench, a sink, cold storage and somewhere to put things — not a full kitchen squeezed into a smaller footprint. If anyone is going to cook a proper meal in the space, you want a compact kitchen instead, and our <a href="granny-flat-kitchens.html" style="color:var(--brass)">granny flat kitchens</a> page is the better place to start.'],
      ['What to leave out, and what never to', 'The oven is usually the first thing to go, and it is usually the right call — a cooktop and a microwave cover almost everything a kitchenette is actually used for. Lose the overheads if the ceiling is low. What we would not cut is the sink size or the hardware. A bar-sized sink you cannot fit an oven tray into gets complained about for years, and a drawer that sticks is worse in a small room than a large one, because there are fewer of them carrying the same load.'],
      ['Plumbing usually decides the layout', 'In a conversion, where the waste can run is the constraint that sets the design — not where you would like the sink to be. We look at that before drawing anything, because a kitchenette designed around a plumbing run that cannot be built is a wasted fortnight. If you are converting an under-house, a shed or a garage, send us a photo of where the existing services come up and we will tell you what is realistic before you spend anything.'],
      ['Built to the same standard as a full kitchen', 'Same 18mm moisture-resistant carcasses, same Blum soft-close hardware, same laser-bonded edging, same ten-year warranty. A kitchenette is smaller, not lighter in construction — and in a rental or a short-stay room it often works harder per cabinet than a family kitchen does. It is also the cheapest room in the house to over-specify, because there is so little of it.'],
    ],
    list: [
      '1.2m to 1.8m runs, drawn to your dimensions',
      'Sink, benchtop and cold storage as standard',
      'Cooktop and microwave options; oven where it fits',
      'Blum soft-close hinges and full-extension runners',
      'Laminate, stone or porcelain benchtop',
      'Delivered assembled and installed by our own team',
    ],
    faq: [
      { q: 'What is the difference between a kitchenette and a small kitchen?', a: 'A small kitchen does everything a full kitchen does in less space — oven, full-size sink, proper storage. A kitchenette deliberately does less: usually a cooktop and microwave rather than an oven, a smaller sink, and storage for one or two people. Choosing between them is really one question — will anyone cook a full meal in there?' },
      { q: 'How much does a kitchenette cost in Rockhampton?', a: 'A kitchenette starts from $4,500 with a laminate benchtop, including carcasses, doors and Blum hardware. Length, a stone benchtop and any cooktop or appliance provision move it from there. Send us the dimensions and a photo of where your plumbing comes up and we will give you a fixed, itemised quote.' },
      { q: 'Can I put a kitchenette in a granny flat?', a: 'You can, but most granny flats are better served by a full compact kitchen — see our <a href="granny-flat-kitchens.html">granny flat kitchens</a> page. A kitchenette suits a studio or a single room where nobody is cooking a roast. If the flat is being let as a self-contained dwelling, check the requirements with your council first, because a kitchenette may not satisfy them.' },
      { q: 'Do I need council approval for a kitchenette?', a: 'Not for the cabinetry itself. But adding a second cooking or washing facility can change how a property is classified, and the rules vary by council and by whether the space is self-contained. Ask Rockhampton Regional Council before you commit — it is a short conversation, and far cheaper than finding out afterwards.' },
    ],
  });

  SEGMENTS.push({
    file: 'short-stay-kitchens.html',
    related: [['/short-stay-kitchens-capricorn-coast', 'on the Capricorn Coast'], ['/guide-short-stay-letting-rules-qld', 'letting rules in Queensland']],
    slug: 'short-stay',
    nav: 'Short-stay kitchens',
    title: 'Airbnb & Short-Stay Kitchens Rockhampton | Bilt & Co',
    desc: 'Kitchens for Airbnb and short-stay properties in Rockhampton. Built to photograph well and survive guests, from $6,500. Delivered assembled and installed.',
    h1: 'Kitchens that win the booking<br><span class="italic brass">and survive the guest.</span>',
    lede: 'A short-stay kitchen has two jobs your own kitchen never has. It has to earn the booking in a photograph, and it has to hold up to people with no reason to be careful.',
    img: 'concrete-luxe',
    alt: 'Bright white short-stay apartment kitchen with stone island and stainless appliances',
    price: 'From $6,500',
    range: '2.4m – 4.0m run',
    body: [
      ['The photograph earns the booking', 'Guests scroll. The kitchen is one of the three photographs that decide whether they stop, and it is the one that signals whether the whole place has been looked after. That does not mean an expensive kitchen — it means an uncluttered one that photographs wide. Full-height cabinetry to hide the mess, a benchtop with no appliance garage door halfway along it, and a splashback that does not fight the camera. We design short-stay kitchens knowing the first person to see it will see it at 400 pixels wide.'],
      ['Guests are not careless. They are unfamiliar.', 'The damage in a short-stay kitchen is rarely malice. It is someone who does not know your drawers are soft-close and shuts them like their own, who puts a hot pan down because they cannot find the trivet, who stacks the heavy pot in the shallow drawer because nothing is labelled. Design around that and most of the wear stops: full-extension runners rated for real weight, a benchtop that shrugs off heat, and a layout obvious enough that a stranger puts things back where they found them.'],
      ['Spend here, not there', 'Put the money in the parts that fail: hardware, carcass board and the benchtop. Skip the parts that only reward an owner — integrated appliances behind cabinetry panels are a service call waiting to happen when a guest reports the fridge at 9pm, and bespoke finishes are wasted on someone staying two nights. Porcelain or sintered stone is worth it here even more than in a family kitchen, because it takes heat and does not stain, and it is the surface every guest photograph includes.'],
      ['Designed for the ten minutes between guests', 'Ask your cleaner what slows them down and they will say the same things: open shelving that collects dust, too many separate cupboards to check, and no obvious home for the crockery. Fewer, deeper drawers beat more cupboards. One drawer per category, sized so nothing is stacked two deep. It sounds minor until you are turning the place over twice in a weekend.'],
    ],
    list: [
      '2.4m to 4.0m runs, drawn to your dimensions',
      'Porcelain or sintered stone benchtop — heat and stain resistant',
      'Blum full-extension runners rated for guest handling',
      '18mm moisture-resistant carcasses, laser-bonded edging',
      'Layouts designed around turnover and cleaning',
      'Delivered assembled and installed by our own team',
      'Ten-year warranty on cabinetry and workmanship',
    ],
    faq: [
      { q: 'Does a better kitchen actually increase my nightly rate?', a: 'Not directly, and anyone promising that is guessing. What it changes is your photographs and your reviews, and those change your occupancy. A kitchen that looks cared for lifts the whole listing, and "the kitchen had everything we needed" is one of the most common lines in a five-star review. Occupancy is where the money is, not the nightly rate.' },
      { q: 'What fails first in a short-stay kitchen?', a: 'Drawer runners, then benchtop edges, then hinges — in that order, and much faster than in a family home because of the sheer number of different people using it. All three are specification decisions rather than design ones, which is why we do not economise on them here.' },
      { q: 'Laminate or stone for a short-stay property?', a: 'Stone, and porcelain or sintered stone if the budget reaches. Laminate is perfectly good in a long-term rental where one household learns to look after it, but a short-stay benchtop meets a new person every few days and one of them will put a hot pan straight down on it. See <a href="guide-benchtops-compared.html">the benchtop guide</a> for what each material actually tolerates.' },
      { q: 'Do I need approval to run a short-stay property?', a: 'Possibly, and it is worth checking before you spend anything on the kitchen. Short-stay accommodation rules vary by council and by whether the property is your home, a secondary dwelling or a standalone investment, and body corporate by-laws can override all of it. Ask Rockhampton Regional Council and, if it applies, read your by-laws. We can tell you what a kitchen costs; we cannot tell you whether you are allowed to let the place.' },
    ],
  });

  SEGMENTS.push({
    file: 'kitchen-islands.html',
    slug: 'island',
    nav: 'Kitchen islands',
    title: 'Kitchen Islands Rockhampton | From $2,850 | Bilt & Co',
    desc: 'Custom kitchen islands in Rockhampton from $2,850. Clearances, seating overhangs, waterfall ends and what an island actually needs before it will fit.',
    h1: 'The island most kitchens<br><span class="italic brass">cannot actually fit.</span>',
    lede: 'An island is the most requested thing in a new kitchen and the most often abandoned once the room is measured. Here is what one really needs.',
    img: 'timber-island',
    alt: 'Timber kitchen island with stone waterfall end and pendant lighting',
    price: 'From $2,850',
    range: '1.8m – 3.0m island',
    body: [
      ['The number that decides it', 'An island needs <strong>1,000mm clear on every side</strong>, and 1,200mm on any side people walk past while someone is working. That is not a style preference, it is the width of an open dishwasher door plus a person. Add the island depth and you need roughly <strong>3.6 metres of room width</strong> before an island is even possible. Measure that first. If the room does not have it, a peninsula gives you most of the bench and none of the squeeze — see <a href="guide-kitchen-layouts.html" style="color:var(--brass)">the layouts guide</a> for how the four shapes compare.'],
      ['Seating costs more bench than people expect', 'An overhang for stools needs 300mm to sit comfortably, which comes off the working side of the island, not out of thin air. Two stools want 1.2m of run, three want 1.8m. If you want seating and a sink and a prep zone in the same island, you are usually looking at 2.4m minimum before it stops feeling cramped.'],
      ['Services are the hidden cost', 'A bench is cheap. Power, water and waste in the middle of a slab are not. If the island carries a sink or a cooktop, that decision has to be made before the slab is poured or the floor is opened — retrofitting it later is the single most expensive change people make. If your build has not started, tell us now and it costs almost nothing.'],
      ['Waterfall ends, and when to skip them', 'A mitred waterfall end is the detail that makes an island look built rather than assembled, and on a figured stone it is worth the money. On a plain laminate it is not — the join shows and the effect is lost. We will tell you which of those you are looking at before you pay for it.'],
    ],
    list: [
      '1.8m to 3.0m islands, drawn to your room',
      'Clearances checked before anything is quoted',
      'Stone, porcelain or laminate benchtop',
      'Mitred waterfall ends where the stone earns it',
      'Power, water and waste coordinated with your trades',
      'Delivered assembled and installed by our own team',
    ],
    faq: [
      { q: 'How much does a kitchen island cost?', a: 'From about $2,850 added to a kitchen for cabinetry and a laminate top. Stone lifts it, and a sink or cooktop in the island adds plumbing and electrical on top of the cabinetry. Draw it in the estimator on our <a href="investment.html">costs page</a> for a figure against your own run.' },
      { q: 'How much space do I need for a kitchen island?', a: 'About 3.6 metres of room width as a working minimum: 1,000mm clearance each side plus the island itself. Below that an island makes the kitchen worse, not better, and a peninsula is the honest answer.' },
      { q: 'Can I put a sink or cooktop in the island?', a: 'Yes, and it is worth deciding early. Both need services run to the middle of the floor, which is straightforward before a slab is poured and expensive afterwards. A cooktop also needs extraction, which usually means a ceiling unit or a downdraft.' },
      { q: 'Is a peninsula worse than an island?', a: 'No — it is different. A peninsula attaches at one end, so it needs clearance on three sides instead of four and fits rooms an island cannot. You lose the ability to walk all the way around, which matters less than most people expect.' },
    ],
  });

  SEGMENTS.push({
    file: 'laundries.html',
    slug: 'laundry',
    nav: 'Laundries',
    parent: ['joinery.html', 'Joinery'],
    title: 'Laundry Renovations Rockhampton | From $2,800 | Bilt & Co',
    desc: 'Custom laundry joinery in Rockhampton from $2,800. Folding benches, full-height broom storage, drying rails and cabinetry that survives a wet room.',
    h1: 'The most under-designed<br><span class="italic brass">room in the house.</span>',
    lede: 'A laundry gets the leftover space, the leftover budget and none of the thought. It is also the room that annoys people daily.',
    img: 'laundry-room',
    alt: 'Custom laundry joinery with overhead cabinets, folding bench and drying rail',
    price: 'From $2,800',
    range: '1.8m – 3.5m run',
    body: [
      ['A bench you can actually fold on', 'The single upgrade people notice most is a continuous bench over the machines rather than beside them. Front loaders make this straightforward; a top loader does not, which is worth knowing before you buy the machine. Give it 900mm of clear run and folding stops happening on the dining table.'],
      ['Built for a room that gets wet', 'A laundry is the wettest room in a house after the bathroom, and it is where cheap cabinetry fails first. Moisture-resistant carcasses and laser-bonded edging are standard on everything we supply, which matters more here than in the kitchen — a laundry cabinet lives with a leaking tap, a damp floor and a machine that vibrates.'],
      ['Storage that takes the things nowhere else wants', 'Full-height broom storage for the vacuum, the mop and the ironing board. A drying rail that pulls out and disappears. A basket drawer rather than baskets on the floor. None of it is expensive; all of it is the difference between a laundry and a room with a washing machine in it.'],
      ['Often part of a bigger move', 'Laundries frequently get done alongside a kitchen, and doing both together is materially cheaper — one design, one delivery, one installation. If you are already thinking about the kitchen, mention the laundry at the first visit rather than the last. The same is true of a <a href="joinery.html" style="color:var(--brass)">walk-in robe or a vanity</a>.'],
    ],
    list: [
      '1.8m to 3.5m runs, drawn to your dimensions',
      'Continuous folding bench over front loaders',
      'Full-height broom and appliance storage',
      'Moisture-resistant carcasses, laser-bonded edging',
      'Pull-out drying rails, basket drawers, hidden bins',
      'Delivered assembled and installed by our own team',
    ],
    faq: [
      { q: 'How much does a laundry renovation cost in Rockhampton?', a: 'Cabinetry and a benchtop start around $2,800 for a compact run and reach roughly $7,700 for a full laundry with stone, full-height storage and fit-out. That is joinery only — plumbing, tiling and electrical are separate trades we can coordinate.' },
      { q: 'Can you fit a bench over a top loader?', a: 'Not over the lid, no. A top loader needs clear space above it, so the bench has to sit beside the machine rather than across it. If a continuous bench matters to you and you are replacing the machine anyway, a front loader is the decision that unlocks it.' },
      { q: 'Can the laundry be done with the kitchen?', a: 'Yes, and it should be if both are on the list. One design process, one delivery and one installation is meaningfully cheaper than two separate jobs, and the finishes will actually match.' },
      { q: 'Do you do under-house laundry conversions?', a: 'Regularly — it is common in older high-set Rockhampton homes. The floors are rarely level and the walls are rarely square, so we measure what is there and scribe to it rather than assuming.' },
    ],
  });

  SEGMENTS.push({
    file: 'owner-builder-kitchen-supply.html',
    related: [['/guide-how-to-install-a-supplied-kitchen', 'getting it installed'], ['/guide-how-to-measure-for-a-kitchen', 'how to measure for a kitchen'], ['/guide-owner-builder-permit-qld', 'owner-builder permits'], ['/guide-supply-your-own-kitchen', 'is supplying your own cheaper?']],
    slug: 'owner-builder',
    nav: 'Owner-builder supply',
    title: 'Owner Builder Kitchen Supply QLD | Delivered Assembled | Bilt & Co',
    desc: 'Kitchen supply for owner-builders in Queensland. Designed to your measurements, delivered assembled with service drawings for your trades. Fit it yourself.',
    h1: 'You are managing the build.<br><span class="italic brass">We will handle the kitchen.</span>',
    lede: 'Owner-builders get treated as a nuisance by most kitchen companies. You are the opposite of that here — you know your programme, you make your own decisions, and you do not need selling to.',
    img: 'dark-island',
    alt: 'Kitchen cabinetry delivered assembled ready for installation',
    price: 'Supply pricing',
    range: 'Delivered assembled',
    body: [
      ['Supply only, and it is not a lesser service', 'You get the same design process, the same 18mm moisture-resistant carcasses, the same Blum hardware and the same ten-year warranty on the cabinetry as anyone paying for installation. The difference is that it arrives assembled at your site and your crew fits it. This is not a stripped-back product for people who could not afford the real one — it is the same kitchen with one line removed from the invoice.'],
      ['Assembled, not flat packed', 'The distinction matters most to you of anyone. Carcasses arrive built, hardware fitted, doors hung and adjusted. You are fitting a kitchen, not assembling one on the floor of a house you are still finishing, at the point in the build where you have the least time and patience left. If you have ever built a flat-pack kitchen at the end of an owner-build, you already know why this is worth paying for.'],
      ['Drawings your trades can actually work from', 'You get a full set of service drawings showing where every waste, water point and power outlet needs to land, dimensioned. Hand them to your plumber and electrician before they rough in. This is where owner-builds most often lose money on a kitchen — services roughed in to a guess, then a cabinet that has to be modified on site or a wall that has to be reopened.'],
      ['Tell us your programme, not your deadline', 'We hold your specification once it is confirmed, so the order becomes a confirmation rather than a fresh design when your build is finally ready. Owner-builds move. Yours will too. Tell us where the build actually is and we will work to it rather than pushing you to take delivery into a house with no floor down.'],
      ['What sits with you', 'Under an owner-builder permit the obligations are yours: making sure every licensed trade on the job holds a current licence, keeping the documentation, and the restrictions that apply to selling the property afterwards. <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">QBCC</a> sets out the current requirements. We are a supplier — we are not your builder, and we do not certify your build. See <a href="/guide-do-i-need-approval-kitchen-renovation" style="color:var(--brass)">whether a kitchen needs approval</a> for where a kitchen sits in all that.'],
    ],
    list: [
      'Designed to your measurements, not to a module',
      'Delivered assembled — carcasses built, doors hung and adjusted',
      'Full service drawings for your plumber and electrician',
      '18mm moisture-resistant carcasses, laser-bonded edging',
      'Blum soft-close hardware throughout',
      'Specification held for when your build is actually ready',
      'Ten-year warranty on the cabinetry we supply',
    ],
    faq: [
      { q: 'Can I buy a kitchen without installation?', a: 'Yes. Supply-only is a normal part of what we do, not an exception — it is what we already provide to tiny home and granny flat builders. You get the design, the cabinetry delivered assembled and the service drawings; your crew fits it.' },
      { q: 'What does an owner-builder need to supply you?', a: 'Room dimensions, ceiling height, the position of windows, doors and existing services, and your appliance models with their exact dimensions. Photographs of the space help. If the build is not up yet, the plans are enough to start.' },
      { q: 'Do you deliver to my site?', a: 'Yes, across Central Queensland, and to the Sunshine Coast as supply-only — see our <a href="/kitchens-caloundra">Caloundra page</a>. Tell us the site access and whether there is somewhere dry and secure to store it, because assembled cabinetry takes more room than cartons.' },
      { q: 'Can I get help if something does not fit?', a: 'Ring us. Our drawings are dimensioned so this is rare, but buildings move and site conditions differ from plans. We would rather solve it on the phone than have you cut something you cannot uncut.' },
      { q: 'Is supply-only cheaper?', a: 'You are not paying for our installation labour, so yes. The cabinetry, hardware and warranty are identical. Send your dimensions for a fixed, itemised supply quote.' },
    ],
  });

  SEGMENTS.push({
    file: 'accessible-kitchens.html',
    slug: 'accessible',
    nav: 'Accessible kitchens',
    title: 'Accessible Kitchens Rockhampton | Built to OT Spec | Bilt & Co',
    desc: 'Accessible and adaptive kitchens in Rockhampton and Central Queensland, built to your occupational therapist’s specification. Quoted itemised for plan managers.',
    h1: 'Accessible kitchens,<br><span class="italic brass">built to the specification.</span>',
    lede: 'An accessible kitchen is a specification problem, not a design compromise. Send us what your OT has written and we will build exactly that.',
    img: 'island-marble-brass',
    alt: 'Bright open kitchen with clear approach to bench and sink',
    price: 'Quoted to spec',
    range: 'To your OT report',
    related: [['/guide-ndis-kitchen-modifications-queensland', 'how NDIS funding works'], ['/aging-in-place-kitchens', 'aging in place'], ['/sda-kitchens-queensland', 'SDA housing'], ['/motorised-pull-down-shelving', 'motorised pull-down shelving']],
    body: [
      ['We build to the report, we do not write it', `The specification comes from an occupational therapist who has assessed the person in their own home. That is the document that supports funding and it is the document we quote against. We do not assess eligibility, write OT reports or manage claims — we are the cabinetmaker in that process, and the projects that go smoothly are the ones where the OT specifies first. If you have a report, send it. If you do not, that is the call to make before ours. <a href="https://www.ndis.gov.au/participants/home-and-living/home-modifications" rel="noopener" target="_blank" style="color:var(--brass)">NDIS</a> sets out how home modification funding works.`],
      ['Knee clearance is the one that gets missed', 'Everyone thinks of bench height. The item that more often decides whether a kitchen actually works from a seated position is clear space underneath — at the sink and at a section of bench, deep enough to get close rather than reach across. It affects the plumbing layout, the sink depth and where the waste runs, which is why it has to be designed rather than adjusted afterwards. A shallower sink bowl usually buys the room.'],
      ['Height is not one number', 'A seated user and a standing user need different working heights, and plenty of households contain both. That is what height-adjustable sections are for, and where they are not funded or not warranted, two fixed working heights in the same kitchen often solves it more cheaply. Your OT specifies the heights for the individual; we build to them. Anyone quoting a standard accessible bench height without asking who is using it is guessing.'],
      ['Most of it costs nothing extra here', 'Full-extension drawers instead of base cupboards, D-pull handles instead of knobs, and soft-close hardware throughout are standard on everything we supply. Those three do a large share of the work in an accessible kitchen and they are already in the price. The cost sits in the specific items — height-adjustable mechanisms, pull-down shelving units, specialised hardware — which get quoted as line items so a plan manager can see exactly what each one is.'],
      ['Quoted the way a plan manager reads it', 'Cabinetry, benchtop, hardware, accessible items and installation listed separately, fixed, with the specification referenced. That is the format that gets approved without three rounds of questions. We are in Rockhampton and install across Central Queensland; beyond that we supply, delivered assembled, for a local installer to fit.'],
    ],
    list: [
      'Built to your occupational therapist’s specification',
      'Knee clearance designed in, not adjusted later',
      'Height-adjustable or dual-height working surfaces',
      'Full-extension drawers and D-pull handles as standard',
      'Lever taps and front-mounted controls',
      'Itemised quote in the format plan managers expect',
      'Installed by our own team across Central Queensland',
    ],
    faq: [
      { q: 'Do you quote from an OT report?', a: 'Yes, and it is the fastest way to get a usable number. Send the report and you will get a fixed, itemised quote against the specification in it. We do not assess eligibility or write reports — that is the occupational therapist’s role.' },
      { q: 'What if I do not have an OT report yet?', a: 'Then that is the first call, ahead of ours. For NDIS-funded modifications the report is generally what supports the funding and it drives the scope. Quoting before it exists is the most common reason these projects stall.' },
      { q: 'How much does an accessible kitchen cost?', a: 'It depends entirely on the specification, which is why we quote rather than publish a figure. The cabinetry is broadly comparable to any kitchen; cost comes from specific items like height-adjustable mechanisms and pull-down shelving. Those are quoted as separate lines so nothing is buried.' },
      { q: 'Do you install outside Central Queensland?', a: 'We install within about 150 kilometres of Rockhampton. Beyond that we supply, delivered assembled, with full service drawings for a local installer — which suits SDA and modification builders who already have their own trades.' },
    ],
  });

  SEGMENTS.push({
    file: 'sda-kitchens-queensland.html',
    slug: 'sda',
    nav: 'SDA kitchens',
    title: 'SDA Kitchens Queensland | Specialist Disability Accommodation | Bilt & Co',
    desc: 'Kitchens for Specialist Disability Accommodation builds in Queensland. Built to the design standard your certifier assesses against, supplied or installed.',
    h1: 'SDA kitchens,<br><span class="italic brass">built to the standard.</span>',
    lede: 'SDA is not a generous version of an accessible kitchen. It is a certified build against a published standard, and the cabinetry has to survive that assessment.',
    img: 'black-marble-bar',
    alt: 'Accessible kitchen with clear circulation space and low bench section',
    price: 'Supply or install',
    range: 'To the SDA design standard',
    related: [['/guide-sda-design-categories-explained', 'the four SDA design categories'], ['/accessible-kitchens', 'accessible kitchens'], ['/motorised-pull-down-shelving', 'motorised pull-down shelving'], ['/trade', 'trade supply']],
    body: [
      ['Tell us it is SDA at the first conversation', `The <a href="https://www.ndis.gov.au/providers/housing-and-living-supports-and-services/housing/specialist-disability-accommodation" rel="noopener" target="_blank" style="color:var(--brass)">SDA Design Standard</a> carries requirements that differ from a standard accessible kitchen, and the build is assessed against them by an SDA assessor. That changes the drawings, not just the price. Projects go wrong when a cabinetmaker is briefed as though it were an ordinary kitchen and the design category surfaces halfway through — tell us at the start and it costs nothing.`],
      ['Which design category', 'Improved Liveability, Fully Accessible, Robust and High Physical Support each carry different expectations, and they are not interchangeable. Robust in particular changes the specification materially: the cabinetry has to take deliberate impact, not just daily use, and that is a construction decision rather than a finish one. Tell us the category and the assessor’s requirements and we will build to them.'],
      ['What we build, and what we do not certify', 'We supply and install cabinetry, benchtops and hardware to the specification you provide. We are not SDA assessors and we do not certify the dwelling. If the assessor requires something specific of the joinery, put it in writing and it goes in the drawings — we would rather build it right than argue about it at inspection.'],
      ['Supply anywhere, install in Central Queensland', 'SDA builders operate across the state, and most already have their own installers. We install within about 150 kilometres of Rockhampton; beyond that we supply delivered assembled with a full set of service drawings, which is exactly how we already work with tiny home and granny flat builders. Repeat specifications are held, so a second dwelling to the same design is a confirmation rather than a fresh drawing.'],
      ['Built to be used hard', 'Whatever the category, SDA housing works harder than a family kitchen and is occupied continuously. Our standard specification — 18mm moisture-resistant carcasses, Blum hardware with a lifetime mechanical warranty, laser-bonded edging — is the right starting point for that, and it is what we would build anyway.'],
    ],
    list: [
      'Built to your SDA design category and assessor requirements',
      'Robust category specification available',
      '18mm moisture-resistant carcasses, laser-bonded edging',
      'Blum hardware, lifetime mechanical warranty',
      'Full service drawings for your trades',
      'Repeat specifications held for multi-dwelling builds',
      'Supply anywhere in Queensland, install within 150km of Rockhampton',
    ],
    faq: [
      { q: 'Do you build kitchens for SDA housing?', a: 'Yes, to the design category and assessor requirements you provide. Tell us it is SDA at the first conversation — the requirements differ from a standard accessible kitchen and they affect the drawings, not just the price.' },
      { q: 'Which SDA design categories can you build to?', a: 'Improved Liveability, Fully Accessible, Robust and High Physical Support. Robust changes the specification most, because the cabinetry has to take deliberate impact rather than ordinary wear. Send the assessor’s requirements in writing.' },
      { q: 'Do you certify the build?', a: 'No. We supply and install the joinery to specification. Certification is the SDA assessor’s role, and we work to what they require.' },
      { q: 'Can you supply SDA builds outside Central Queensland?', a: 'Yes, as supply — delivered assembled with full service drawings for your own installer. We install within about 150 kilometres of Rockhampton. For repeat builds we hold the specification so each order is a confirmation.' },
    ],
  });

  SEGMENTS.push({
    file: 'aging-in-place-kitchens.html',
    slug: 'aging-in-place',
    nav: 'Aging in place kitchens',
    title: 'Aging in Place Kitchens Rockhampton | Design to Stay Put | Bilt & Co',
    desc: 'Kitchens designed for staying in your own home longer. Drawers instead of low cupboards, better light, hardware that works with arthritic hands. From $15,000.',
    h1: 'A kitchen designed<br><span class="italic brass">for staying put.</span>',
    lede: 'Nobody wants a kitchen that looks like a hospital. Almost everything that makes one easier to use at eighty is invisible, and most of it is free if you decide it now.',
    img: 'splashback-marble-01',
    alt: 'Warm timber kitchen with drawers and integrated task lighting',
    price: 'From $15,000',
    range: 'Full kitchen',
    related: [['/accessible-kitchens', 'accessible kitchens'], ['/guide-ndis-kitchen-modifications-queensland', 'NDIS modifications'], ['/motorised-pull-down-shelving', 'motorised pull-down shelving'], ['/fit-out', 'fit-out options']],
    body: [
      ['The renovation you do at sixty decides the one at eighty', 'Most people renovate a kitchen once more in their life, somewhere in their late fifties or sixties, and that kitchen is the one they will still be using twenty-five years later. Designing it for the person you are now is the expensive choice, because the alternative is a second renovation, or moving out of a house you did not want to leave.'],
      ['Drawers, not low cupboards', 'This is the single biggest one. Getting to the back of a base cupboard means kneeling on a hard floor and getting back up, and that stops being trivial long before anyone would call themselves frail. Deep full-extension drawers bring everything out to you. It is not an accessibility feature, it is a better kitchen at any age, and it costs nothing extra here because full-extension runners are standard.'],
      ['Hardware you can use with bad hands', 'Arthritis is close to universal eventually and it makes knobs and small handles genuinely difficult. D-pull handles that a whole hand or a forearm can hook are the answer, and they look like ordinary contemporary hardware. Lever taps rather than twist. Push-to-open where a handle would be awkward. None of it reads as adapted.'],
      ['Light, and the things you stop seeing', 'Eyes change earlier than anything else, and the kitchen is where that shows first. Task lighting under every overhead so the bench is lit rather than shadowed by your own body. Contrast between the benchtop and the floor edge, and between the bench and the sink, so edges are visible. This costs very little at build time and cannot be retrofitted neatly.'],
      ['What to leave out, and what to leave room for', `Overheads above shoulder height that need a step stool. A microwave over the cooktop, which is a reach across heat. Deep corner cupboards. Where budget allows, leave a section of bench with clear space underneath — it is unremarkable now and it is the difference later if a chair or a walker ever comes into the house. The <a href="https://livablehousingaustralia.org.au/" rel="noopener" target="_blank" style="color:var(--brass)">Livable Housing Australia</a> guidelines are a useful reference if you want to go further, and if funded modifications are ever involved, <a href="/accessible-kitchens" style="color:var(--brass)">accessible kitchens</a> covers how that works.`],
    ],
    list: [
      'Drawers rather than low cupboards throughout',
      'D-pull handles and lever taps as standard',
      'Task lighting under every overhead',
      'Contrast at bench edges and the sink',
      'Nothing critical stored above shoulder height',
      'Room left for a seated working section',
      'Ten-year warranty on cabinetry and workmanship',
    ],
    faq: [
      { q: 'Does an aging in place kitchen look different?', a: 'No, and that is rather the point. Drawers, D-pull handles, lever taps and good task lighting are ordinary contemporary choices. Nothing about it reads as adapted, and nothing about it dates the way a clinical fit-out would.' },
      { q: 'Is it more expensive?', a: 'Barely. Full-extension drawers, soft-close hardware and D-pull handles are standard on everything we supply, so most of what matters is already in the price. Extra cost only appears if you add specific items like pull-down shelving.' },
      { q: 'When should I think about this?', a: 'At the renovation you are already planning. Designing it in costs almost nothing; retrofitting it later means a second kitchen. If you are renovating in your fifties or sixties, this is the conversation worth having now.' },
      { q: 'What if I need funded modifications later?', a: 'Different pathway. Funded home modifications generally follow an occupational therapist’s assessment — see our accessible kitchens page and the NDIS guide. A kitchen designed sensibly now needs less modification later, whoever pays for it.' },
    ],
  });

  SEGMENTS.push({
    file: 'motorised-pull-down-shelving.html',
    slug: 'pull-down',
    nav: 'Motorised pull-down shelving',
    title: 'Motorised Pull-Down Kitchen Shelving | Built to Take It | Bilt & Co',
    desc: 'Motorised pull-down overhead shelving in Rockhampton and Queensland. We build the cabinetry to take the unit, to your occupational therapist’s specification.',
    h1: 'The top shelf,<br><span class="italic brass">at the press of a button.</span>',
    lede: 'Overhead storage is the first thing to become unusable and the last thing anyone plans for. A motorised pull-down brings it to you instead.',
    img: 'matte-black-bank',
    alt: 'Handleless overhead cabinetry with concealed pull-down shelving',
    price: 'Quoted to spec',
    range: 'Per overhead cabinet',
    related: [['/accessible-kitchens', 'accessible kitchens'], ['/aging-in-place-kitchens', 'aging in place'], ['/fit-out', 'other fit-out options']],
    body: [
      ['What it does that a manual one does not', `A manual pull-down overhead is a good piece of hardware — you grip a handle and draw the shelf down and forward on a sprung mechanism. It solves height. What it does not solve is force, because you still have to pull it, hold it and push it back. A motorised unit removes that entirely: a switch lowers the shelf and raises it again. If the difficulty is reach or grip rather than height alone, that is the whole difference, and it is why the two are not interchangeable.`],
      ['Who it is actually for', `Someone working seated, for whom an overhead is unreachable regardless of what the shelf does. Someone with limited grip or arm strength, where a sprung mechanism is the barrier rather than the help. And someone who simply should not be on a step — which covers a great many people who would never describe themselves as having a disability. It appears regularly in occupational therapist specifications for exactly these reasons.`],
      ['The cabinet has to be built for it', `This is the part that gets missed until it is expensive. A motorised unit has its own internal width, depth and height requirements, a weight limit, and structural fixing points that have to land in solid material rather than a cabinet back. Building a standard overhead and retrofitting a mechanism into it usually means rebuilding the cabinet. Tell us at design stage and the cabinet is drawn around the unit from the start, which costs nothing extra.`],
      ['It needs power, and that decision is early', `A powered unit needs a supply into the cabinet, which means an outlet or a hard-wired point behind or above it, placed before the cabinetry goes in. Adding it afterwards means opening a wall you have just finished. If a motorised overhead is even a possibility, have the electrician rough in for it — an unused point costs very little and a retrofit costs a great deal.`],
      ['When the manual one is the right answer', `Often. If the person using it has the grip and arm strength to draw a sprung shelf down, the manual unit does the same job for a fraction of the cost and has nothing to fail or lose power. We would rather fit a manual pull-down that suits you than sell a motorised one that does not. The <a href="/fit-out" style="color:var(--brass)">fit-out options</a> page lists the manual version with its price.`],
      ['What we build, and what we do not make', `We build the cabinetry and install it. The mechanism itself is a manufactured component we specify and fit — we are not its maker, and we will not pretend the unit is ours. What we are responsible for is a cabinet built correctly to take it, wired for it, and installed so it works on the day it is handed over. Quoted as a separate line so you can see exactly what it costs, which matters if a plan manager is reading the quote. See <a href="/accessible-kitchens" style="color:var(--brass)">accessible kitchens</a> for how we quote against an OT specification.`],
    ],
    list: [
      'Cabinetry drawn around the unit from the start',
      'Structural fixing into solid material, not a cabinet back',
      'Coordinated with your electrician for the power supply',
      'Quoted as a separate line item, not buried',
      'Manual pull-downs also available where they suit better',
      'Installed by our own team across Central Queensland',
      'Supplied assembled elsewhere in Queensland',
    ],
    faq: [
      { q: 'What is a motorised pull-down shelf?', a: `An overhead shelf unit that lowers down and forward at the press of a switch, bringing the contents to a reachable height, then returns. The manual equivalent does the same movement but you pull it, which is the difference that matters if grip or arm strength is the issue.` },
      { q: 'Will the NDIS pay for it?', a: `That is determined by the participant’s plan and the supporting assessment, not by us. Motorised pull-down shelving does appear in occupational therapist specifications for home modifications. Speak to the OT and the plan manager — we quote against whatever specification comes out of that, itemised so each element is visible.` },
      { q: 'Does it need a power point?', a: 'Yes, a supply into or behind the cabinet, placed before the cabinetry is installed. Retrofitting it means opening a finished wall. If it is even a possibility, have your electrician rough in for it while they are on site.' },
      { q: 'Can it be retrofitted into my existing overheads?', a: 'Sometimes, but it depends on the cabinet’s internal dimensions and whether there is solid material to fix into. Often a standard overhead has to be rebuilt to take one, which is why it is far cheaper decided at design stage than afterwards.' },
      { q: 'Should I get manual or motorised?', a: 'Manual if you have the grip and arm strength to draw a sprung shelf down — it costs far less and there is nothing to power or fail. Motorised if reach or force is the barrier. If an OT is involved, they will specify which.' },
    ],
  });

  const segmentPages = SEGMENTS.map((s) => ({
    file: s.file,
    title: s.title,
    desc: s.desc,
    og: s.img,
    preload: s.img,
    priority: '0.8',
    service: { name: s.nav, type: s.nav, desc: s.desc, price: s.price.replace(/[^0-9]/g, '') },
    faq: s.faq,
    trail: [['index.html', 'Home'], s.parent || ['kitchens.html', 'Kitchens'], [s.file, s.nav]],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], s.parent || ['kitchens.html', 'Kitchens'], ['#', s.nav]])}
        <span class="pill">${s.price} &middot; ${s.range}</span>
        <h1 class="d1" style="font-size:clamp(2.1rem,4.6vw,3.6rem)">${s.h1}</h1>
        <p class="lede">${s.lede}</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">${s.slug === 'trade' ? 'Open a trade account' : 'Get a fixed quote'}</a>
          <a class="btn btn--ghost btn--lg" href="investment.html">See the price bands</a>
        </div>
      </div>
      <div>${frame(s.img, s.alt, 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap split" style="align-items:start">
      <div>
        ${s.body.map((b, i) => `
        <div ${rv()} data-rv-d="${(i % 3) + 1}" style="margin-bottom:2.25rem">
          <h2 class="d3">${b[0]}</h2>
          <p class="mt-1 muted">${b[1]}</p>
        </div>`).join('')}
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">What you get</span>
          <div class="tier__price" style="font-size:clamp(1.5rem,2.4vw,2rem)">${s.price}<small>${s.range}</small></div>
          <ul>${s.list.map((x) => `<li>${x}</li>`).join('')}</ul>
          <a class="btn btn--block" href="contact.html">${s.slug === 'trade' ? 'Talk to us about trade' : 'Get this priced'}</a>
        </div>
        ${s.related ? `<p class="small muted mt-2">Also: ${s.related.map((r) => `<a href="${r[0]}" style="color:var(--brass)">${r[1]}</a>`).join(" &middot; ")}</p>` : ''}
      </div>
    </div>
    ${s.placeholder ? `<!-- ${s.placeholder} -->` : ''}
  </section>

  ${faqBlock(s.faq, s.nav + ' — questions')}
  ${reviews}
  ${ctaBand({ eyebrow: s.nav, title: 'Send us the dimensions.<br><span class="italic" style="color:var(--brass-lite)">We will send back a number.</span>', body: 'A fixed, itemised quote with nothing hidden in it. If the number does not work for you, you owe us nothing and you keep the drawings.' })}
`,
  }));

  /* ================================================================ GUIDES */
  /* The site's first top-of-funnel content. Written to answer the question
     properly rather than to reach a word count, because a guide that does not
     answer it is worse than no guide. */

  const GUIDES = [
    {
      slug: 'how-to-install-a-supplied-kitchen',
      group: 'design',
      nav: 'Getting a supplied kitchen installed',
      title: 'How to Get a Supplied Kitchen Installed | Trades, Order, Sign-Off | Bilt & Co',
      desc: 'The three trades you need to install a supplied kitchen, the order they work in, what to check on their licences, and what paperwork you should end up holding.',
      h1: 'Getting a supplied kitchen<br><span class="italic brass">installed properly.</span>',
      lede: 'Three trades, in a fixed order, each licensed for their part. It is not complicated, but the sequence matters and the paperwork matters more than people expect.',
      img: 'joinery-sketch',
      alt: 'Kitchen installation drawings and measurements',
      read: '8 min read',
      note: 'Last checked: September 2026. General guidance, not building advice. Licensing requirements and paperwork are set by the regulators linked above and change — confirm the current position with them or a building certifier.',
      answer: 'You need three trades: an installer to fit the cabinetry and benchtop, a licensed plumber for the sink, dishwasher and any tap, and a licensed electrician for the oven, cooktop, rangehood and power. They work in a fixed order — rough-in, cabinetry, benchtop template and install, then fit-off — and you should end the job holding the plumbing and electrical compliance paperwork. Check every licence on the QBCC register before anyone starts.',
      inlineCta: {
        after: 3,
        eyebrow: 'What arrives from us',
        title: 'Assembled cabinetry and drawings your trades can work from.',
        body: 'Carcasses built, doors hung, hardware fitted, plus dimensioned service drawings showing every waste, water point and outlet. Your installer fits it; your plumber and electrician rough in from the drawings.',
        label: 'See how supply works',
        href: '/owner-builder-kitchen-supply',
      },
      cta: {
        eyebrow: 'Supply only',
        title: 'We build it.<br><span class="italic" style="color:var(--brass-lite)">Your trades fit it.</span>',
        body: 'Send us the dimensions and we will quote the cabinetry delivered assembled, with the service drawings your plumber and electrician need to rough in correctly the first time.',
        image: 'dark-island',
        alt: 'Kitchen cabinetry delivered assembled ready to install',
      },
      sections: [
        ['The three trades, and who does what', `<strong>The installer</strong> fits the cabinetry, fixes it to the wall and floor, scribes it to the room, fits the benchtop and hangs and adjusts doors. This is usually a carpenter, a cabinet installer or a kitchen fitter, and for most jobs it does not require a specific licence beyond what the value of the work triggers — check with the <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">QBCC licence register</a>. <strong>The plumber</strong> handles the sink, tap, dishwasher connection and any water point, and must be licensed. <strong>The electrician</strong> handles the oven, cooktop, rangehood, lighting and power points, and must be licensed. Those two are not optional and not negotiable.`],
        ['The order is fixed, and it matters', 'Rough-in first: the plumber and electrician bring services to where the drawings say, before any cabinetry is on site. Then the cabinetry goes in. Then the benchtop is templated — measured off the installed cabinets — and made, which for stone means a fabricator and usually a week or more. Then the benchtop is installed. Then the plumber and electrician return for fit-off: sink, tap, dishwasher, appliances, power. Get this order wrong and you pay twice, because a benchtop templated before the cabinets are level does not fit.'],
        ['What we hand over', 'Cabinetry delivered assembled — carcasses built, doors hung and adjusted, hardware fitted — so your installer is fitting a kitchen rather than building one on the floor first. And a full set of dimensioned service drawings: where every waste comes up, every water point, every outlet and every appliance connection. Hand those to your plumber and electrician before rough-in. Services placed to a guess and then a cabinet modified on site is where supply jobs actually lose money, and the drawings are what prevent it.'],
        ['How to find them', 'Ask your builder first if you have one; most have trades they use repeatedly. Otherwise, a local kitchen company that installs but does not supply is often glad of the work, and a cabinet installer will usually know a plumber and electrician they work alongside. Trade directories work but verify independently. In a smaller town, ask at the hardware store — they know who turns up and who does not.'],
        ['Check the licence before they start', `Ask for the licence number and check it yourself rather than taking the card at face value: the <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">QBCC licence register</a> covers building and plumbing licences, and the <a href="https://www.worksafe.qld.gov.au/licensing-and-registrations/electrical-licences" rel="noopener" target="_blank" style="color:var(--brass)">Electrical Safety Office</a> covers electrical. It takes a minute. An unlicensed plumber or electrician is not a saving — the work can fail inspection, void your insurance, and surface in a building and pest report when you sell. Ask for evidence of insurance at the same time.`],
        ['The questions worth asking', 'Have you fitted assembled cabinetry before, or only flat pack? Do you template stone yourself or use a fabricator, and who is that? How many days on site, and are they consecutive? What do you need from me before you start — power on, floor down, walls finished? What paperwork will I get at the end? A trade who answers those clearly is telling you something; one who is vague on two of them is telling you more.'],
        ['What you should be holding when it is done', 'From the plumber, the compliance paperwork Queensland requires for the work. From the electrician, a certificate confirming the work was tested. From the installer, ideally a written note of what was fitted. Keep all of it. It is asked for at sale, it matters to an insurance claim, and it is the difference between a documented kitchen and an argued one.'],
        ['Timing and site readiness', 'The cabinetry cannot go in until the floor is down, the walls are finished and painted, and rough-in is complete. Assembled cabinetry takes more room to store than cartons, so have somewhere dry and secure if delivery lands before the site is ready. Tell us your real programme rather than your hoped-for one — we would rather hold the order than deliver into a house with no floor. Our <a href="/guide-how-to-measure-for-a-kitchen" style="color:var(--brass)">measuring guide</a> covers what to get right before any of this starts.'],
      ],
      faq: [
        { q: 'Who installs a supplied kitchen?', a: 'An installer — carpenter, cabinet installer or kitchen fitter — for the cabinetry and benchtop, plus a licensed plumber and a licensed electrician for their parts. The plumber and electrician are required regardless of who fits the cabinets.' },
        { q: 'What order do the trades work in?', a: 'Rough-in (plumber and electrician bring services to the drawings), cabinetry installation, benchtop template and fabrication, benchtop installation, then plumbing and electrical fit-off. The benchtop must be templated off the installed cabinets, so the order cannot be shuffled.' },
        { q: 'How do I check a tradesperson is licensed?', a: 'Ask for the licence number and look it up yourself on the QBCC register for building and plumbing, or the Electrical Safety Office for electrical. It takes a minute and it is worth doing every time.' },
        { q: 'What paperwork should I get at the end?', a: 'The plumbing compliance paperwork Queensland requires, a certificate from the electrician confirming the work was tested, and ideally a written record from the installer. Keep all of it — it matters at sale and for insurance.' },
        { q: 'Can I install the cabinetry myself?', a: 'Often, for the cabinetry itself, if you are capable and have the time — it arrives assembled, so you are fitting rather than building. The plumbing and electrical must still be done by licensed trades. If you are managing it as an owner-builder, see our guide to owner-builder permits for what that involves.' },
      ],
    },
    {
      slug: 'granny-flat-rules-isaac-regional',
      showCollections: true,
      group: 'approvals',
      nav: 'Isaac Regional: secondary dwellings',
      title: 'Granny Flat & Secondary Dwelling Rules | Isaac Regional Council | Bilt & Co',
      desc: 'What to check with Isaac Regional Council before building a granny flat or secondary dwelling in Moranbah, Dysart, Clermont or Glenden, and where to find the current rules.',
      h1: 'Secondary dwellings<br><span class="italic brass">in the Isaac region.</span>',
      lede: 'Mining housing gets built in cohorts, which means a lot of Isaac homes reach the same decision at the same time: whether the block can take a second dwelling.',
      img: 'concrete-luxe',
      alt: 'Durable kitchen with stone island for a secondary dwelling',
      read: '7 min read',
      note: 'Last checked: September 2026. General orientation, not planning or building advice. Council requirements change and every property is assessed on its own facts — confirm the current position with the council on the number above, or a building certifier, before you spend anything.',
      answer: 'Whether you can build a secondary dwelling on your Isaac Regional block, how large it may be, and whether it can be let to someone outside your household are all set by the council’s planning scheme, and they change. Check the current position on <a href="https://www.isaac.qld.gov.au/Residents/Planning-and-Development/Planning-Scheme" rel="noopener" target="_blank" style="color:var(--brass)">Isaac Regional Council’s planning scheme page</a> before you design anything. We supply kitchens to the region delivered assembled; we do not install there.',
      inlineCta: {
        after: 3,
        eyebrow: 'Building in Moranbah, Dysart or Clermont',
        title: 'The kitchen, supplied assembled.',
        body: 'Designed to your measurements, delivered built, with service drawings for your trades. From $6,500 for a compact secondary-dwelling kitchen.',
        label: 'See Moranbah supply',
        href: '/kitchens-moranbah',
      },
      cta: {
        eyebrow: 'Isaac region',
        title: 'Approval first.<br><span class="italic" style="color:var(--brass-lite)">Then send us the plan.</span>',
        body: 'Once you know what the council will permit, send the dimensions and we will quote the kitchen supply, fixed and itemised, delivered to your site.',
        image: 'galley-stone',
        alt: 'Compact secondary dwelling kitchen',
      },
      sections: [
        ['What a secondary dwelling is, in planning terms', 'Councils rarely say "granny flat". The term is generally secondary dwelling: a self-contained dwelling on the same lot as a house and subordinate to it. Dual occupancy is a separate classification with separate rules. Search the scheme for the right term or you will conclude there are no rules — there are. The statewide picture is in <a href="/guide-granny-flat-rules-qld" style="color:var(--brass)">granny flat rules across Queensland</a>; this page is about what is specific to Isaac.'],
        ['Why Isaac is a cohort market', 'Moranbah, Dysart, Clermont, Glenden, Nebo and Coppabella were largely built for a mining workforce, in defined windows. That means a large number of houses are the same age, on similar blocks, reaching the same stage of life together — and a secondary dwelling is a common answer, whether for family, for a worker, or for income during a project. The council sees these applications in waves, which is worth knowing when you ask about timing.'],
        ['The categories to check, not the figures', `Maximum floor area, and whether it is fixed or a proportion of the main dwelling. Setbacks from boundaries. Whether the dwelling must remain attached or share services. Parking. And the one that decides the business case — whether it may be occupied by someone outside the household of the main house. We are not going to quote a number for any of these, because a wrong one costs you a build. <a href="https://www.isaac.qld.gov.au/Residents/Planning-and-Development/Planning-Scheme" rel="noopener" target="_blank" style="color:var(--brass)">Isaac Regional Council’s planning scheme page</a> carries the current scheme.`],
        ['Letting it to workers', 'In a mining region the obvious use for a second dwelling is workforce accommodation, and that is precisely the question the occupancy rule answers. Some approvals restrict a secondary dwelling to the household of the main house; some permit separate tenancy. Ask that question first and in writing, because it is the difference between a project that pays for itself and one that does not.'],
        ['Council decides planning; a certifier decides building', 'Two approvals. The council answers whether the use is permitted on that land and on what conditions. A private building certifier assesses whether what you propose meets the building code, including classification — a secondary dwelling is generally Class 1a and has to meet the standards of somewhere people live. Ring a certifier early; they will tell you in one call whether the idea is straightforward.'],
        ['What the kitchen has to be', `If the dwelling is approved as a dwelling, it generally needs the facilities of one: a sink, a cooking facility, a bench and storage. A kitchenette usually will not satisfy that. We supply those kitchens to the Isaac region delivered assembled, from $6,500 for a 2.4 metre run, with full service drawings for your builder — see <a href="/kitchens-moranbah" style="color:var(--brass)">kitchen supply to Moranbah and the Isaac region</a>. We do not install in the region and we say so plainly.`],
      ],
      faq: [
        { q: 'Can I build a granny flat in Moranbah?', a: 'That depends on your block and Isaac Regional Council’s current planning scheme. Check the scheme on their website, and ask specifically about your address. Do not rely on what was permitted for a neighbour — conditions differ by lot.' },
        { q: 'Can I rent a secondary dwelling to a worker in the Isaac region?', a: 'Only if the approval permits occupation by someone outside the household of the main dwelling. Some do and some do not. Ask the council before you budget on rental income; it is the question that decides whether the project works.' },
        { q: 'Do you install kitchens in Moranbah or Dysart?', a: 'No. Our installers work Central Queensland within about 150 kilometres of Rockhampton. We supply the Isaac region delivered assembled, with service drawings, for your own builder or installer to fit.' },
        { q: 'How much is a secondary dwelling kitchen?', a: 'From about $6,500 for a 2.4 metre run and $7,700 for 3.0 metres, supplied, including carcasses, doors, Blum hardware and a benchtop. Delivery to the Isaac region is quoted with it.' },
      ],
    },
    {
      slug: 'granny-flat-rules-mackay-regional',
      showCollections: true,
      group: 'approvals',
      nav: 'Mackay Regional: secondary dwellings',
      title: 'Granny Flat & Secondary Dwelling Rules | Mackay Regional Council | Bilt & Co',
      desc: 'What to check with Mackay Regional Council before building a granny flat or secondary dwelling in Mackay or Sarina, why the rules changed recently, and where the current ones are.',
      h1: 'Secondary dwellings<br><span class="italic brass">in Mackay and Sarina.</span>',
      lede: 'Mackay has actively reworked its secondary dwelling settings in recent years. That is good news for owners — and a reason not to trust anything written before the change.',
      img: 'dark-luxe-bar',
      alt: 'Contemporary kitchen with island for a Mackay secondary dwelling',
      read: '7 min read',
      note: 'Last checked: September 2026. General orientation, not planning or building advice. Council requirements change and every property is assessed on its own facts — confirm the current position with the council on the number above, or a building certifier, before you spend anything.',
      answer: 'Mackay Regional Council has amended its secondary dwelling rules under an affordable housing package in recent years, reportedly easing size limits and occupancy. Because the settings have moved, older advice is likely wrong — check the current scheme on <a href="https://www.mackay.qld.gov.au/Business/Building-Planning-and-Development/Planning-Schemes" rel="noopener" target="_blank" style="color:var(--brass)">Mackay Regional Council’s planning schemes page</a> before you design. We supply kitchens to Mackay delivered assembled; we do not install there.',
      inlineCta: {
        after: 3,
        eyebrow: 'Building in Mackay or Sarina',
        title: 'The kitchen, supplied assembled.',
        body: 'Designed to your measurements, delivered built, with service drawings for your trades. From $6,500 for a compact secondary-dwelling kitchen.',
        label: 'See Mackay supply',
        href: '/kitchens-mackay',
      },
      cta: {
        eyebrow: 'Mackay region',
        title: 'Approval first.<br><span class="italic" style="color:var(--brass-lite)">Then send us the plan.</span>',
        body: 'Once you know what the council will permit, send the dimensions and we will quote the kitchen supply, fixed and itemised, delivered to your site.',
        image: 'collection-marble-02',
        alt: 'Compact secondary dwelling kitchen with stone splashback',
      },
      sections: [
        ['The rules moved, so check the date on anything you read', `Mackay Regional Council rewrote its secondary dwelling settings as part of an affordable housing amendment package. The reported direction was to make secondary dwellings easier — larger permitted sizes and, in at least some form, tenancy to people outside the household. We are deliberately not quoting the figures, because they are the council’s to publish and they may move again. What matters is that advice from before the change is probably out of date. <a href="https://www.mackay.qld.gov.au/Business/Building-Planning-and-Development/Planning-Schemes" rel="noopener" target="_blank" style="color:var(--brass)">Mackay Regional Council’s planning schemes page</a> has the current position;.`],
        ['What a secondary dwelling is, in planning terms', `A self-contained dwelling on the same lot as a house and subordinate to it. That is the phrase to search the scheme for; "granny flat" will find nothing. Dual occupancy is a different classification. The statewide framework is covered in <a href="/guide-granny-flat-rules-qld" style="color:var(--brass)">granny flat rules across Queensland</a>; this page is about what is specific to Mackay.`],
        ['The categories to confirm', 'Maximum floor area and how it is measured. Setbacks. Whether the dwelling must stay attached to or share services with the main house. Parking. Whether it may be let to someone outside the household. And whether the lot sits in a flood or other hazard overlay, which in parts of Mackay it will. Every one of those can change the design, and none can be answered by a builder.'],
        ['Why this is a genuine investment market', 'A council that has deliberately made secondary dwellings easier is signalling something, and investors have noticed. If the current settings permit separate tenancy, a secondary dwelling in Mackay or Sarina is a real income proposition rather than a family accommodation one. Confirm the occupancy position in writing before you run the numbers — our guide to <a href="/guide-granny-flat-rent-rockhampton" style="color:var(--brass)">renting out a secondary dwelling</a> covers the arithmetic, and the same logic applies here.'],
        ['Council decides planning; a certifier decides building', 'Two approvals. The council answers whether the use is permitted and on what conditions. A private building certifier assesses the building itself against the code, including classification — generally Class 1a for a dwelling, with the standards that implies. Ring a certifier early; the call usually costs nothing and tells you whether the idea is straightforward.'],
        ['What the kitchen has to be', `Approved as a dwelling, it generally needs a real kitchen — sink, cooking facility, bench, storage — rather than a kitchenette. We supply those to Mackay delivered assembled, from $6,500 for a 2.4 metre run, with full service drawings for your builder. See <a href="/kitchens-mackay" style="color:var(--brass)">kitchen supply to Mackay</a>. We do not install in Mackay and we say so on that page.`],
      ],
      faq: [
        { q: 'What are the granny flat rules in Mackay?', a: 'Set by Mackay Regional Council’s planning scheme, and amended in recent years under an affordable housing package. Because the settings changed, check the current position on the council’s planning schemes page rather than relying on older advice.' },
        { q: 'Can I rent out a granny flat in Mackay?', a: 'The council’s recent amendments reportedly addressed this, but confirm the current occupancy position for your specific lot in writing before you budget on it. It is the single question that decides whether the project pays.' },
        { q: 'Do you install kitchens in Mackay?', a: 'No. We supply Mackay delivered assembled, with service drawings for your own installer. Our installers work within about 150 kilometres of Rockhampton.' },
        { q: 'How much is a secondary dwelling kitchen supplied to Mackay?', a: 'From about $6,500 for a 2.4 metre run and $7,700 for 3.0 metres, including carcasses, doors, Blum hardware and a benchtop. Delivery is quoted with it.' },
      ],
    },
    {
      slug: 'granny-flat-rules-whitsunday-regional',
      showCollections: true,
      group: 'approvals',
      nav: 'Whitsunday Regional: secondary dwellings',
      title: 'Granny Flat & Short-Stay Rules | Whitsunday Regional Council | Bilt & Co',
      desc: 'What to check with Whitsunday Regional Council before building a secondary dwelling or holiday-let unit in Airlie Beach, Cannonvale, Proserpine or Bowen.',
      h1: 'Second dwellings<br><span class="italic brass">on the Whitsunday coast.</span>',
      lede: 'On this coast a "granny flat" is as often a holiday let as a family flat — and the council may assess those two things quite differently.',
      img: 'island-marble-brass',
      alt: 'Bright coastal kitchen for a Whitsundays holiday let',
      read: '7 min read',
      note: 'Last checked: September 2026. General orientation, not planning or building advice. Council requirements change and every property is assessed on its own facts — confirm the current position with the council on the number above, or a building certifier, before you spend anything.',
      answer: 'In the Whitsundays the first question is not size but use. A secondary dwelling occupied by family and one let to holiday guests can sit under different assessment pathways, and body corporate by-laws may apply as well. Check the current position on <a href="https://www.whitsundayrc.qld.gov.au/Economic-Development-Business-and-Planning/Building-and-Development/Planning" rel="noopener" target="_blank" style="color:var(--brass)">Whitsunday Regional Council’s planning page</a> before you design. We supply kitchens to the Whitsundays delivered assembled; we do not install there.',
      inlineCta: {
        after: 3,
        eyebrow: 'Building in Airlie Beach, Cannonvale or Bowen',
        title: 'The kitchen, supplied assembled.',
        body: 'Built to photograph well and survive guests, delivered assembled with service drawings for your installer. From $6,500 for a 2.4 metre run.',
        label: 'See Whitsundays supply',
        href: '/kitchens-whitsundays',
      },
      cta: {
        eyebrow: 'Whitsundays',
        title: 'Settle the use first.<br><span class="italic" style="color:var(--brass-lite)">Then the kitchen follows.</span>',
        body: 'Family flat or holiday let changes the approval and the kitchen brief. Once the council has answered, send the dimensions and we will quote the supply, fixed and itemised.',
        image: 'concrete-luxe',
        alt: 'Bright short-stay kitchen with stone island',
      },
      sections: [
        ['Use decides the pathway', `This is what makes the Whitsundays different from an inland council. A secondary dwelling for family and a unit let to tourists are not the same proposal in planning terms, and short-stay accommodation is a land use in its own right. Which pathway your project falls under affects what is assessed and how. Be precise about the intended use when you ask the council, because a vague answer to a vague question is how people end up with an approval that does not cover what they are actually doing. <a href="https://www.whitsundayrc.qld.gov.au/Economic-Development-Business-and-Planning/Building-and-Development/Planning" rel="noopener" target="_blank" style="color:var(--brass)">Whitsunday Regional Council’s planning page</a> has the current scheme;.`],
        ['Body corporate can override the council', 'A large share of Airlie Beach and Cannonvale housing sits in community titles schemes, and the by-laws can restrict or prohibit short-stay letting regardless of what the council permits. This is the check people miss. If the property is in a scheme, read the by-laws before you plan anything around holiday income. Our guide to <a href="/guide-short-stay-letting-rules-qld" style="color:var(--brass)">short-stay letting rules</a> covers this in more depth.'],
        ['What a secondary dwelling is, in planning terms', `A self-contained dwelling on the same lot as a house and subordinate to it — the phrase to search the scheme for. Dual occupancy is separate. <a href="/guide-granny-flat-rules-qld" style="color:var(--brass)">granny flat rules across Queensland</a> covers the statewide framework; this page is about what is particular to the Whitsunday coast.`],
        ['The categories to confirm', 'Whether a secondary dwelling is permitted at all on your lot. Maximum floor area. Setbacks. Whether it must stay attached. Parking, which matters more in a tourist area. Whether short-stay use is permitted and under what conditions. And hazard overlays, which on this coast means cyclone, storm tide and flood. None of these have a figure we will quote; all of them come from the council.'],
        ['Tiny homes and the coast', 'The council has published its own guidance on tiny houses, which is worth reading if that is the form your second dwelling might take, because the answer depends on whether the home is a vehicle or a building. See our guide to <a href="/guide-tiny-home-laws-qld" style="color:var(--brass)">tiny home laws in Queensland</a> for the statewide picture, then the council’s own material for the local position.'],
        ['What the kitchen has to be', `A dwelling needs a real kitchen; a holiday let needs one that photographs well and survives guests who have no reason to be careful, in salt air. We supply both to the Whitsundays delivered assembled, from $6,500 for a 2.4 metre run — see <a href="/kitchens-whitsundays" style="color:var(--brass)">kitchen supply to the Whitsundays</a> and <a href="/short-stay-kitchens" style="color:var(--brass)">short-stay kitchens</a>. We do not install there and we say so plainly.`],
      ],
      faq: [
        { q: 'Can I build a granny flat in Airlie Beach?', a: 'It depends on your lot, on Whitsunday Regional Council’s current scheme, and on how you intend to use it. Family accommodation and short-stay letting can fall under different pathways. Check with the council and be precise about the intended use.' },
        { q: 'Can I Airbnb a secondary dwelling in the Whitsundays?', a: 'Short-stay accommodation is a land use in its own right and is assessed as such. Body corporate by-laws may also prohibit it regardless of the council position. Confirm both before you plan around holiday income.' },
        { q: 'Do you install kitchens in Airlie Beach or Bowen?', a: 'No. We supply the Whitsundays delivered assembled, with service drawings for your own installer. Our installers work within about 150 kilometres of Rockhampton.' },
        { q: 'What kitchen suits a Whitsundays holiday let?', a: 'One that photographs wide and uncluttered, uses moisture-resistant carcasses and laser-bonded edging for the salt air, and has full-extension runners that survive unfamiliar users. From about $6,500 for a 2.4 metre run, supplied.' },
      ],
    },
    {
      slug: 'how-to-measure-for-a-kitchen',
      group: 'design',
      nav: 'How to measure for a kitchen',
      title: 'How to Measure for a Kitchen | Get It Right First Time | Bilt & Co',
      desc: 'How to measure a kitchen properly for a quote or a supply-only order: what to record, the mistakes that cost money, and what to photograph.',
      h1: 'How to measure<br><span class="italic brass">for a kitchen.</span>',
      lede: 'Measuring badly costs more than measuring slowly. Cabinetry is built to the numbers you give, and a wrong one is not an adjustment — it is a rebuild.',
      img: 'joinery-sketch',
      alt: 'Kitchen measurements and drawings laid out on a bench',
      read: '7 min read',
      answer: 'Measure wall to wall at three heights — floor level, bench height and up near the ceiling — and use the smallest number. Record ceiling height in each corner, every window and door with its distance from the corner, and the position of every service. Photograph each corner of the room. Never measure to existing cabinetry; measure to the walls behind it.',
      inlineCta: {
        after: 3,
        eyebrow: 'Got your numbers',
        title: 'Send them and we will draw it.',
        body: 'Dimensions and photographs are enough for a concept and a realistic range. If it works, we measure it properly before anything is ordered.',
        label: 'Send your measurements',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Measuring',
        title: 'A rough measure gets you<br><span class="italic" style="color:var(--brass-lite)">a rough number.</span>',
        body: 'Enough to know whether the project is in your range. Nothing gets ordered until we have measured it ourselves, or until you have signed off dimensions you supplied.',
        image: 'material-samples',
        alt: 'Finish samples and measurements on a workbench',
      },
      sections: [
        ['Three measurements per wall, not one', 'Walls are not parallel and rooms are not square, particularly in older houses. Measure each wall at floor level, at bench height and near the ceiling, then use the smallest of the three. Cabinetry built to the widest number will not go in. This single habit prevents most of the fit problems we see on supplied-dimension jobs.'],
        ['Measure the room, not the kitchen', 'Take every dimension to the wall itself, not to the existing cabinets or the old benchtop. What is there now may have been packed out, scribed or simply installed badly, and you will inherit somebody else’s error. If the existing kitchen is still in, measure what you can and note clearly which dimensions are to cabinetry rather than wall.'],
        ['The four things people forget', 'Ceiling height in every corner, not one — floors fall away and ceilings are rarely level. The distance from each corner to each window and door, plus the window sill height. Skirting, architraves and any bulkhead. And services: where the waste comes up, where the water points are, where the switchboard is and where every existing power point sits.'],
        ['Photograph it properly', 'One photograph from each corner of the room, plus a straight-on shot of each wall, plus close-ups of anything unusual — a bulkhead, a pipe boxing, an odd step in the floor. Photographs catch what a tape measure misses, and they are what lets us spot a problem before it becomes a variation.'],
        ['Appliances decide cabinet sizes', 'Cabinetry is built around appliances, not the other way round. Record the make and model of the oven, cooktop, dishwasher, rangehood and fridge, or decide them now if you are replacing them. A fridge cavity built for a fridge you later change is a rebuilt cabinet, not an adjustment. Fridge cavities in particular need the manufacturer’s clearance allowance, which is not the same as the box dimensions.'],
        ['What a supplied measure can and cannot do', 'Your numbers are enough for us to draw a concept and give you a realistic range, which is often all you need to decide whether to proceed. They are not enough for us to order cabinetry against without you signing off on them. On a full install we measure ourselves before anything is manufactured. On a supply-only order, the dimensions are yours and so is the responsibility — which is why we would rather you measure three times than once. See <a href="/owner-builder-kitchen-supply" style="color:var(--brass)">owner-builder kitchen supply</a>.'],
        ['If the house is old', 'Queenslanders and other older timber homes move, and nothing in them is square. Expect to find a 20mm difference across a three-metre wall and do not assume you have measured wrong. Note the discrepancy rather than averaging it out; cabinetry is scribed to the actual line, and knowing the taper in advance is what makes that possible. More in <a href="/guide-queenslander-kitchen-renovation" style="color:var(--brass)">our Queenslander guide</a>.'],
      ],
      faq: [
        { q: 'How do I measure a kitchen for a quote?', a: 'Wall to wall at three heights, taking the smallest. Ceiling height in each corner. Every window and door with its distance from the corner. All services. Then photograph each corner. That is enough for a concept and a realistic range.' },
        { q: 'Should I measure to the walls or the existing cabinets?', a: 'The walls, always. Existing cabinetry may have been packed out or installed badly, and measuring to it inherits that error. Note clearly if any dimension had to be taken to cabinetry.' },
        { q: 'How accurate does it need to be?', a: 'To the millimetre for anything we will order against. For an initial concept and ballpark, careful measurements to the nearest 5mm are fine. We measure ourselves before manufacture on any job we install.' },
        { q: 'What if my walls are not square?', a: 'They will not be, particularly in an older home. Record the difference rather than averaging it. Cabinetry is scribed to the real line, and knowing the taper in advance is what makes a clean fit possible.' },
      ],
    },
    {
      slug: 'sda-design-categories-explained',
      group: 'approvals',
      nav: 'SDA design categories explained',
      title: 'SDA Design Categories Explained | What Changes the Kitchen | Bilt & Co',
      desc: 'The four SDA design categories and what each one changes about the kitchen joinery. Written for builders and developers specifying Specialist Disability Accommodation.',
      h1: 'The four SDA categories,<br><span class="italic brass">and what each does to the kitchen.</span>',
      lede: 'The category is set before you brief a cabinetmaker, and it changes the drawings rather than just the price. Getting it into the brief early costs nothing.',
      img: 'drawer-detail',
      alt: 'Full extension drawer with accessible hardware',
      read: '8 min read',
      note: 'Last checked: September 2026. General guidance for builders, not a substitute for the <a href="https://www.ndis.gov.au/providers/housing-and-living-supports-and-services/housing/specialist-disability-accommodation" rel="noopener" target="_blank" style="color:var(--brass)">SDA Design Standard</a> or your SDA assessor. Requirements are set by the standard and interpreted by the assessor on your project — confirm with them before you brief joinery.',
      answer: 'There are four: Improved Liveability, Fully Accessible, Robust and High Physical Support. They are not tiers of the same thing — they address different needs. For kitchen joinery, Fully Accessible and High Physical Support drive clearance and reach, while Robust drives construction and fixings. Tell your cabinetmaker the category at briefing, not at inspection.',
      inlineCta: {
        after: 3,
        eyebrow: 'Specifying an SDA build',
        title: 'Send the category and the assessor requirements.',
        body: 'We build the joinery to what your assessor requires, supplied or installed, with drawings your trades can rough in from. Repeat specifications held for multi-dwelling builds.',
        label: 'See SDA kitchens',
        href: '/sda-kitchens-queensland',
      },
      cta: {
        eyebrow: 'SDA builders',
        title: 'Tell us the category<br><span class="italic" style="color:var(--brass-lite)">at the first conversation.</span>',
        body: 'It changes the drawings, not just the price. Brief us early and it costs nothing; discover it at inspection and it costs a rebuild.',
        image: 'black-marble-bar',
        alt: 'Accessible kitchen with clear circulation space',
      },
      sections: [
        ['They are categories, not grades', 'The most common misunderstanding is treating the four as a ladder from basic to premium. They are not. Each addresses a different set of needs, and a dwelling is built to one of them because that is what the participant requires — not because it is better. Briefing a cabinetmaker with "it is SDA" and nothing else is the fastest way to get joinery that has to be redone.'],
        ['Improved Liveability', 'Broadly aimed at people with sensory, intellectual or cognitive impairment. The emphasis tends to fall on ease of use, way-finding and reducing confusion rather than on wheelchair clearance. For joinery that often means legible, consistent layouts, good contrast between surfaces and edges, and hardware that behaves predictably. Less about dimensions, more about clarity.'],
        ['Fully Accessible', 'Aimed at people with significant physical impairment, and this is where clearance and reach dominate the kitchen. Knee space at the sink and at a section of bench, approach and turning space, reachable storage, and controls that do not require reaching across a hot surface. These are dimensional requirements and they have to be in the drawings from the start; they cannot be added to a standard kitchen afterwards.'],
        ['Robust', 'The one that changes construction rather than layout. Robust housing is designed for participants whose behaviour may result in significant impact on the building, so joinery has to withstand deliberate force rather than daily wear. That reaches into carcass construction, fixings, hardware selection and how doors and drawers are hung. It is a materially different build and it needs to be priced as one.'],
        ['High Physical Support', 'For participants requiring very high support, often including assistive technology and hoists. The kitchen implications overlap with Fully Accessible on clearance but the surrounding requirements are broader, and the specification typically comes from the design and the assessor rather than from a cabinetmaker’s standard range.'],
        ['What we need in the brief', 'The category, the assessor’s specific requirements in writing, and any occupational therapist input on the individual. With those we can quote joinery accurately and build to it. Without them, any quote is a guess that will move — and in our experience the projects that go badly are the ones where the category surfaced halfway through. See <a href="/sda-kitchens-queensland" style="color:var(--brass)">our SDA kitchens page</a> for what we supply and where we install.'],
        ['Multi-dwelling builds', 'If you are building several dwellings to the same category, tell us. We hold the specification so the second and third are a confirmation rather than a fresh drawing, and pricing reflects the repetition. That is how we already work with granny flat and tiny home builders — see <a href="/trade" style="color:var(--brass)">trade supply</a>.'],
      ],
      faq: [
        { q: 'What are the four SDA design categories?', a: 'Improved Liveability, Fully Accessible, Robust and High Physical Support. They address different needs rather than forming a hierarchy. Refer to the SDA Design Standard and your assessor for the requirements that apply to your project.' },
        { q: 'Which category changes the kitchen most?', a: 'Fully Accessible and High Physical Support drive clearance, reach and approach. Robust changes construction and fixings, because the joinery has to take deliberate impact rather than ordinary wear. All three affect the drawings, not just the price.' },
        { q: 'Can you build to Robust category?', a: 'Yes, given the assessor requirements in writing. Robust is a materially different build and needs to be specified and priced as one rather than treated as a standard kitchen with tougher hardware.' },
        { q: 'Do you certify the dwelling?', a: 'No. We supply and install joinery to the specification provided. Certification is the SDA assessor’s role and we build to what they require.' },
        { q: 'Do you supply SDA builds outside Central Queensland?', a: 'Yes, as supply — delivered assembled with full service drawings for your own installer. We install within about 150 kilometres of Rockhampton.' },
      ],
    },
    {
      slug: 'granny-flat-rules-qld',
      showCollections: true,
      group: 'approvals',
      nav: 'Granny flat rules across Queensland',
      title: 'Granny Flat Rules Queensland | Secondary Dwelling Requirements | Bilt & Co',
      desc: 'How secondary dwelling rules work in Queensland, why they differ by council, and the questions that decide whether you can build one and let it.',
      h1: 'Granny flat rules<br><span class="italic brass">across Queensland.</span>',
      lede: 'There is no single Queensland granny flat rule. There is a framework, and then eighty councils applying it differently.',
      img: 'collection-marble-04',
      alt: 'Compact secondary dwelling kitchen with stone benchtop',
      read: '8 min read',
      note: 'Last checked: September 2026. General information, not building, legal or planning advice. Every Queensland council applies its own planning scheme and the rules change without notice — confirm with your council, or a building certifier, before you commit to anything.',
      answer: `Queensland has no statewide granny flat rule. A "secondary dwelling" is defined in the state planning framework, but whether one is permitted on your block — its size, whether it must stay attached, and whether it can be let to someone outside your household — is set by your local council’s planning scheme. Two adjoining councils routinely give different answers. Find yours before you design anything. We have council-specific pages for <a href="/guide-granny-flat-rules-rockhampton" style="color:var(--brass)">Rockhampton</a>, <a href="/guide-granny-flat-rules-mackay-regional" style="color:var(--brass)">Mackay</a>, <a href="/guide-granny-flat-rules-isaac-regional" style="color:var(--brass)">Isaac</a> and <a href="/guide-granny-flat-rules-whitsunday-regional" style="color:var(--brass)">the Whitsundays</a>.`,
      inlineCta: {
        after: 2,
        eyebrow: 'Once you know what you can build',
        title: 'The kitchen it will need.',
        body: 'A compliant secondary-dwelling kitchen runs 2.4 to 3.0 metres, from $6,500. Installed by our team in Central Queensland, supplied assembled anywhere else in the state.',
        label: 'See granny flat kitchens',
        href: '/granny-flat-kitchens',
      },
      cta: {
        eyebrow: 'Anywhere in Queensland',
        title: 'Install in Central Queensland.<br><span class="italic" style="color:var(--brass-lite)">Supply everywhere else.</span>',
        body: 'Within about 150km of Rockhampton our own team installs. Beyond that we design it, deliver it assembled and provide the service drawings for your builder. Fixed and itemised either way.',
        image: 'galley-stone',
        alt: 'Compact secondary dwelling kitchen',
      },
      sections: [
        ['Secondary dwelling is the term to search', `Councils rarely write "granny flat". The planning term is generally secondary dwelling: a self-contained dwelling on the same lot as a house, subordinate to it. Searching your council’s planning scheme for that phrase is the difference between finding the rules and concluding there are none. Dual occupancy is a different classification with different rules, and the two are confused constantly — a dual occupancy is generally two dwellings of comparable standing, which is assessed differently.`],
        ['Why the answers differ between councils', 'Queensland planning operates through a state framework that each local government implements in its own scheme. That leaves real discretion over maximum floor area, whether the dwelling may be detached, setbacks, parking, and crucially who may occupy it. Advice that begins "in Queensland you can..." is almost always describing one council. Ask yours, about your specific address, and get it in writing.'],
        ['The questions that decide your project', 'Is a secondary dwelling permitted on this lot? Is there a maximum floor area, and is it a fixed figure or a proportion of the main dwelling? Must it remain attached, or share services? May it be occupied by someone outside the household of the main dwelling? What parking is required? Is the lot in a flood, bushfire or other hazard overlay? Any single answer can end the project, and none of them can be answered by a builder or a website.'],
        ['Building it and letting it are separate permissions', `This is the one that costs people money. A secondary dwelling can be entirely lawful to build and still be restricted to family occupation, which removes the rental income the business case assumed. If the project only works with a tenant, settle this first — <a href="/guide-granny-flat-rent-rockhampton" style="color:var(--brass)">the guide on renting one out</a> covers the arithmetic and what to ask.`],
        ['Council decides planning, a certifier decides building', 'Two separate approvals. The council answers whether the use is permitted on that land. A private building certifier assesses whether what you propose meets the building code, including the classification. You will generally deal with both, and ringing a certifier early is worth doing because they will tell you in one call whether the idea is straightforward.'],
        ['Conversions are assessed as reclassification', `Enclosing under a high-set house, or converting a shed or garage, is a change of building classification from non-habitable to a dwelling. It is assessed as building work against the standards of somewhere people live — ceiling height, ventilation, light, egress and services. See <a href="/guide-garage-conversion-approval-qld" style="color:var(--brass)">the conversion guide</a> and, for the Rockhampton version specifically, <a href="/guide-granny-flat-rules-rockhampton" style="color:var(--brass)">granny flat rules in Rockhampton</a>.`],
        ['What the kitchen has to be', 'If the dwelling is approved as a dwelling, it generally needs the facilities of one: a sink, a cooking facility, a bench and storage. A kitchenette usually will not satisfy that, which is worth knowing before you budget for one. Confirm the requirement with your certifier against your approval rather than assuming it.'],
      ],
      faq: [
        { q: 'What are the granny flat rules in Queensland?', a: 'There is no single statewide rule. The state framework defines a secondary dwelling, and each council sets whether one is permitted on a given lot, how large it may be, and who may occupy it. Check your own council’s planning scheme for "secondary dwelling".' },
        { q: 'What is a secondary dwelling in Queensland?', a: 'Generally a self-contained dwelling on the same lot as a house and subordinate to it. It is the planning term councils use, and it is what to search for rather than "granny flat". Dual occupancy is a different classification with different rules.' },
        { q: 'Can I rent out a granny flat in Queensland?', a: 'It depends on your approval. Some councils permit separate tenancy, others restrict occupation to the household of the main dwelling. Because this decides whether the project pays for itself, confirm it before you commit.' },
        { q: 'Do granny flat rules differ between councils?', a: 'Substantially, and adjoining councils frequently differ. Any advice that starts "in Queensland you can" is describing one council. Ask yours about your specific address, in writing.' },
        { q: 'Does a secondary dwelling need a full kitchen?', a: 'If approved as a dwelling, generally yes — a sink, cooking facility, bench and storage rather than a kitchenette. Your building certifier confirms the requirement against the approved classification.' },
      ],
    },
    {
      slug: 'supply-your-own-kitchen',
      group: 'design',
      nav: 'Supplying your own kitchen',
      title: 'Is It Cheaper to Supply Your Own Kitchen? | Bilt & Co',
      desc: 'What you actually save by supplying your own kitchen instead of leaving it in the builder contract, what it costs you in coordination, and when it is worth it.',
      h1: 'Is it cheaper to<br><span class="italic brass">supply your own kitchen?</span>',
      lede: 'Usually, and not for the reason people expect. The saving is rarely the cabinetry. It is the margin sitting on top of it.',
      img: 'dark-island',
      alt: 'Kitchen cabinetry delivered assembled ready for installation',
      read: '7 min read',
      answer: `Generally yes, if you are already managing trades. A builder’s kitchen allowance carries their margin and their supplier’s margin. Supplying direct removes one of those. What it costs you is coordination — you own the measurements, the timing and the fix if something is wrong. Worth it for an owner-builder; often not worth it if you have never run a trade before.`,
      inlineCta: {
        after: 2,
        eyebrow: 'Supply pricing',
        title: 'Delivered assembled, not in cartons.',
        body: 'Designed to your measurements, with full service drawings for your plumber and electrician. Your crew fits it.',
        label: 'See supply pricing',
        href: '/owner-builder-kitchen-supply',
      },
      cta: {
        eyebrow: 'Supply only',
        title: 'The same kitchen,<br><span class="italic" style="color:var(--brass-lite)">minus one line.</span>',
        body: 'Same carcasses, same Blum hardware, same ten-year warranty. You are not paying for our installation labour, and that is the whole difference. Send us the dimensions for a fixed, itemised supply quote.',
        image: 'concrete-luxe',
        alt: 'Bright kitchen with stone island',
      },
      sections: [
        ['Where the money actually is', `Most build contracts carry the kitchen as an allowance or a provisional sum, and that figure has been through two sets of hands: the supplier’s margin, then the builder’s margin on top. Supplying direct removes the second one. On a mid-range kitchen that is a meaningful number, and it is a larger share of the total than most people assume because cabinetry is a high-margin trade.`],
        ['What you take on in exchange', 'Measurements become yours. Timing becomes yours — the cabinetry has to arrive when the site is ready for it, not before, and storing assembled cabinetry in a half-finished house is a genuine problem. Coordination with the plumber and electrician becomes yours. And if something does not fit, you are the one solving it rather than the builder. None of that is hard if you are already running trades. All of it is a real cost if you are not.'],
        ['The variable nobody prices', 'Services roughed in to a guess. This is where owner-supplied kitchens actually lose money — a waste or a power point placed before the cabinetry was drawn, then a cabinet modified on site or a wall reopened. It is entirely avoidable with dimensioned service drawings handed to your trades before they rough in, which is why we provide them as standard rather than as an extra.'],
        ['Talk to the builder before you assume', 'If you are mid-contract, taking the kitchen out as a provisional sum is a conversation, not a right. Many builders are comfortable with it; some are not, and some will charge a margin on the excluded item anyway. Raise it early. Doing it at lock-up stage is a fight; doing it at contract stage is an administrative change.'],
        ['When it is not worth it', `If you are not managing the build, the saving usually evaporates into your own time and risk. If you have never coordinated trades, the first thing that goes wrong will cost more than the margin you saved. Be honest about which of those you are — we would rather tell you that now than take the order and watch it go badly.`],
        ['What supply actually includes here', `Design to your measurements, cabinetry delivered assembled rather than flat packed, full service drawings, a fixed and itemised quote, and the same ten-year warranty on the cabinetry. What it does not include is installation outside Central Queensland. See <a href="/owner-builder-kitchen-supply" style="color:var(--brass)">owner-builder kitchen supply</a>, and <a href="/guide-flat-pack-vs-assembled-kitchen" style="color:var(--brass)">the flat pack comparison</a> for how assembled delivery differs from a flat pack.`],
      ],
      faq: [
        { q: 'Is it cheaper to supply your own kitchen?', a: `Generally, because you remove the builder’s margin on the item. What you take on is coordination — measurements, timing and any fix. It is a good trade for an owner-builder and often a poor one for someone who has never managed trades.` },
        { q: 'Can I take the kitchen out of my build contract?', a: 'Often, as a provisional sum, but it is a conversation with your builder rather than an entitlement. Raise it at contract stage rather than at lock-up, when it becomes a much harder discussion.' },
        { q: 'What is the biggest risk of supplying your own?', a: 'Services roughed in before the cabinetry is drawn. That is what causes modified cabinets and reopened walls. Dimensioned service drawings handed to your trades before rough-in removes it, and we supply those as standard.' },
        { q: 'Do you install if I supply my own kitchen?', a: 'Within about 150 kilometres of Rockhampton, yes. Beyond that we supply only, delivered assembled, for your own installer to fit.' },
      ],
    },
    {
      slug: 'flat-pack-vs-assembled-kitchen',
      group: 'design',
      nav: 'Flat pack versus assembled',
      title: 'Flat Pack vs Assembled Kitchen | What Actually Differs | Bilt & Co',
      desc: 'The real differences between a flat pack kitchen you assemble and cabinetry delivered assembled: build quality, time, hardware, and who carries the risk.',
      h1: 'Flat pack<br><span class="italic brass">versus delivered assembled.</span>',
      lede: 'These are different products for different buyers, and the honest difference is smaller than one side claims and larger than the other admits.',
      img: 'drawer-detail',
      alt: 'Assembled drawer box with full extension runners and soft close',
      read: '7 min read',
      answer: `The cabinetry can be similar. What differs is who assembles it, and therefore who carries the risk of it being assembled badly. Flat pack arrives as panels and fittings for you to build. Ours arrives with carcasses built, hardware fitted and doors hung and adjusted. The saving on flat pack is real; so is the labour, and so is the variance in the result.`,
      inlineCta: {
        after: 3,
        eyebrow: 'Delivered assembled',
        title: 'Fit a kitchen, do not build one.',
        body: 'Carcasses built, hardware fitted, doors hung and adjusted before it reaches you. Your installer fits it, or ours does within Central Queensland.',
        label: 'See how supply works',
        href: '/owner-builder-kitchen-supply',
      },
      cta: {
        eyebrow: 'Assembled delivery',
        title: 'The boring part<br><span class="italic" style="color:var(--brass-lite)">is already done.</span>',
        body: 'Nobody enjoys building carcasses on the floor of a house they are still finishing. Send us the dimensions and it arrives ready to fit, fixed and itemised.',
        image: 'galley-stone',
        alt: 'Compact kitchen with stone benchtop',
      },
      sections: [
        ['What is genuinely the same', `Be sceptical of anyone claiming flat pack is categorically rubbish. A good flat pack in 18mm moisture-resistant board with Blum hardware is a perfectly sound kitchen, and plenty of them outlast badly specified custom work. The board, the hardware and the edging are the things that decide longevity, and they are specification questions rather than assembly questions. Ask any supplier those three regardless of which route you take.`],
        ['What is genuinely different: who assembles it', `A flat pack transfers the assembly labour to you. That is the saving, and it is honest. The consequence is that the squareness of every carcass, the alignment of every drawer and the adjustment of every door now depends on the person doing it — usually at the end of a build, usually tired, usually on an unfinished floor. Cabinetry assembled out of square does not announce itself; it shows up as doors that do not line up, and it cannot be fixed afterwards without taking it apart.`],
        ['Time is the cost people underestimate', 'A full kitchen is a substantial amount of assembly. People routinely budget a weekend and lose a fortnight of evenings, and it lands at the point in a renovation where patience is already gone. If your time has any value at all, price it in before comparing quotes. If you enjoy the work and have the space to do it properly, that changes the calculation entirely and there is nothing wrong with the answer being flat pack.'],
        ['Where the risk sits', 'With a flat pack, a damaged or mis-drilled panel is your problem to resolve with a supplier, mid-build. With assembled delivery, it arrives built and any fault is visible on delivery rather than discovered at hour six of assembly. Neither is immune to problems; they differ in when you find out and who is holding the pieces.'],
        ['What we actually do', `We are not a flat pack company and we are not pretending to be a workshop either. Cabinetry is imported, assembled before delivery, and installed by our own team within Central Queensland or by your installer beyond it. That is the whole model, stated plainly. It means you get built carcasses and adjusted doors without paying for local manufacture — and it is why our <a href="/investment" style="color:var(--brass)">price bands</a> sit where they do.`],
        ['Which one you should choose', `If you are cost-driven, capable and have the time and space, flat pack is a legitimate answer and we will say so. If you want the assembly done before it arrives, or you are on a build programme where a fortnight of evenings is not available, assembled delivery is the reason we exist. Either way, ask about board, hardware and edging first — those decide whether the kitchen lasts. <a href="/guide-kitchen-renovation-checklist" style="color:var(--brass)">Our renovation checklist</a> has the seven questions worth asking any supplier.`],
      ],
      faq: [
        { q: 'Is a flat pack kitchen worse than an assembled one?', a: 'Not necessarily. The board, hardware and edging decide longevity, and a well-specified flat pack beats a poorly specified custom kitchen. What differs is who assembles it, and therefore how consistent the result is.' },
        { q: 'How long does it take to assemble a flat pack kitchen?', a: 'Longer than most people budget. A full kitchen is a serious amount of assembly, and it lands at the end of a build when time and patience are shortest. Price your own hours before comparing quotes.' },
        { q: 'Do you sell flat pack kitchens?', a: 'No. Our cabinetry arrives assembled — carcasses built, hardware fitted, doors hung and adjusted. You are fitting a kitchen rather than building one first.' },
        { q: 'What should I ask any kitchen supplier?', a: 'Board thickness and moisture rating, hardware brand and warranty, and whether the edging is glued or laser-bonded. Those three matter more than flat pack versus assembled, and a supplier who is vague on any of them is telling you something.' },
      ],
    },
    {
      slug: 'multigenerational-living-queensland',
      group: 'approvals',
      nav: 'Moving family in',
      title: 'Multigenerational Living QLD | Moving Parents In | Bilt & Co',
      desc: 'The options when a parent or adult child moves in: converting under the house, a secondary dwelling, or reworking the main home. What each involves and costs.',
      h1: 'When family<br><span class="italic brass">moves back in.</span>',
      lede: 'It is rarely a design decision to begin with. Someone gets older, or someone cannot afford to move out, and the house has to do something it was not built for.',
      img: 'matte-black-bank',
      alt: 'Compact second kitchen in a multigenerational home',
      read: '7 min read',
      note: 'Last checked: September 2026. General information, not building, legal or financial advice. Requirements differ by council and change without notice — confirm with the authority linked above, or a building certifier, before you commit to anything.',
      answer: 'Three realistic options in most Rockhampton homes: convert underneath a high-set house, build or approve a secondary dwelling, or rework the main kitchen so two households can share it. The second kitchen is usually what makes shared living survivable long term — from $4,500 for a kitchenette and $6,500 for a full compact kitchen.',
      inlineCta: {
        after: 2,
        eyebrow: 'The second kitchen',
        title: 'What keeps everyone sane.',
        body: 'Separate cooking and separate storage is what most families say made the difference. A kitchenette from $4,500, a full compact kitchen from $6,500.',
        label: 'See the options',
        href: '/granny-flat-kitchens',
      },
      cta: {
        eyebrow: 'Multigenerational',
        title: 'Two households,<br><span class="italic" style="color:var(--brass-lite)">one address.</span>',
        body: 'Tell us who is moving in and what the house is, and we will tell you honestly which of the three options fits and what the kitchen side costs. Free, and yours to keep.',
        image: 'galley-stone',
        alt: 'Compact second kitchen for a secondary dwelling',
      },
      sections: [
        ['Independence is the thing worth buying', 'Families who make this work long term almost all describe the same thing: separate cooking, separate storage, and a door. Sharing a kitchen with an adult child or an elderly parent is where the friction accumulates, because it is the room everyone needs at the same time of day. A second kitchen is not a luxury in this arrangement; it is the part that keeps the arrangement pleasant.'],
        ['Option one: convert underneath', `The most common version in this city, because so much of the housing stock is high-set. Enclosing underneath produces a genuinely separate living space with its own entrance, often without touching the main house. It is a change of building classification and assessed as building work — see <a href="/under-house-kitchens-rockhampton" style="color:var(--brass)">under-house kitchens</a> for the cabinetry side and <a href="/guide-garage-conversion-approval-qld" style="color:var(--brass)">the conversion guide</a> for what the reclassification involves.`],
        ['Option two: a secondary dwelling', `A separate small dwelling on the same block. More independent, more expensive, and subject to whether your block permits one — ask <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a> first. It is also the option that retains value independently, since it can often be let later. <a href="/guide-granny-flat-rules-rockhampton" style="color:var(--brass)">The granny flat rules guide</a> covers what to ask.`],
        ['Option three: rework the main house', 'Sometimes the answer is not a second dwelling at all but a better main kitchen plus a small second point — a kitchenette in a converted bedroom or rumpus. Cheaper, faster, no classification change if it stays part of the same dwelling. It suits arrangements expected to last a few years rather than decades.'],
        ['Design for the person who will be oldest', `If a parent is moving in, the kitchen they use should be designed for the person they will be in fifteen years, not the one they are now. Drawers rather than low cupboards, D-pull handles, task lighting, nothing critical above shoulder height. It costs almost nothing extra at build time — see <a href="/aging-in-place-kitchens" style="color:var(--brass)">aging in place kitchens</a> — and it is the difference between staying and moving into care.`],
        ['Talk about money before building', 'Who pays for the build, who owns the improvement, and what happens if circumstances change. It is an awkward conversation and it is much less awkward now than in three years. If the arrangement involves a parent contributing capital, it is worth advice from an accountant and possibly a solicitor before the first trade arrives.'],
      ],
      faq: [
        { q: 'What is the cheapest way to house a parent at home?', a: 'Usually a kitchenette added to an existing room that can be made self-contained, from about $4,500 for the cabinetry. Converting under a high-set house or building a secondary dwelling costs more and gives more independence.' },
        { q: 'Do I need approval to add a second kitchen?', a: 'Adding a second cooking facility can change how a property is classified, and requirements vary by council and by whether the space is self-contained. Ask your council before you commit — it is a short conversation.' },
        { q: 'Is a granny flat better than converting under the house?', a: 'It depends on the block and the budget. Under-house conversions are usually cheaper and very common in Rockhampton; a secondary dwelling is more independent and can often be let later. Price both.' },
        { q: 'How much is a second kitchen?', a: 'A kitchenette from about $4,500, a full compact kitchen from about $6,500 including carcasses, doors, Blum hardware and a benchtop.' },
      ],
    },
    {
      slug: 'queenslander-kitchen-renovation',
      group: 'design',
      nav: 'Renovating a Queenslander kitchen',
      title: 'Queenslander Kitchen Renovation | What Changes | Bilt & Co',
      desc: 'Renovating a kitchen in a Queenslander: VJ walls, high ceilings, timber floors that move, and nothing square. What it changes about the cabinetry.',
      h1: 'Renovating a kitchen<br><span class="italic brass">in a Queenslander.</span>',
      lede: 'These houses are worth keeping and they are unforgiving to cabinetry designed for a brick veneer box.',
      img: 'detail-timber-joinery',
      alt: 'Timber joinery detail in a Queenslander kitchen',
      read: '7 min read',
      note: 'Last checked: September 2026. General guidance on renovating older timber homes — every house differs, and a site measure is what settles it.',
      answer: 'Four things change in a Queenslander: nothing is square or level, the walls are VJ boards rather than plasterboard so fixings differ, the ceilings are high enough that standard overheads leave an awkward gap, and the floors move seasonally. All four are solvable by measuring the house as built rather than assuming it.',
      inlineCta: {
        after: 3,
        eyebrow: 'Older homes',
        title: 'We measure before we quote.',
        body: 'Not from your dimensions, and not from the plan — from the room. In a hundred-year-old house that is the only number that means anything.',
        label: 'Book a site measure',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Queenslanders',
        title: 'Old house.<br><span class="italic" style="color:var(--brass-lite)">Properly fitted kitchen.</span>',
        body: 'Scribed to the walls and floors as they are, fixed into the framing rather than the lining, and detailed so it belongs in the house rather than fighting it.',
        image: 'timber-island',
        alt: 'Timber kitchen island in a renovated Queenslander',
      },
      sections: [
        ['Nothing is square, and that is normal', 'These houses are timber, they have moved for a century, and they are still moving. Walls lean, floors fall away toward the verandah, and corners are rarely ninety degrees. Cabinetry built to nominal dimensions and pushed into place will show a tapering gap along the benchtop that nobody can unsee. The answer is scribing — cutting the end panels and fillers to the actual line of the wall and floor. It is standard practice and it requires a real site measure.'],
        ['VJ walls change how it is fixed', 'Vertical-joint boards are not plasterboard on studs at predictable centres. Fixing a wall cabinet into VJ alone is not adequate for a loaded overhead, so cabinets are fixed into the framing behind, which means finding it. In older houses the framing is where it is, not where a tape measure suggests. This is a competent-installer problem rather than a design one, but it is why we do not send cabinetry to a Queenslander without measuring.'],
        ['High ceilings need a decision', 'Standard overhead cabinets in a room with three-metre ceilings leave a substantial gap above, which reads as unfinished and collects dust nobody can reach. Three honest options: run the cabinetry to the ceiling and accept the top shelf needs a step; stop the overheads at a considered height and treat the gap as deliberate with a bulkhead or a painted band; or leave the upper wall clear and put the storage in tall units and drawers instead. All three work. Doing nothing does not.'],
        ['Timber floors move with the seasons', 'A timber floor over stumps expands and contracts through the wet and dry, and a kitchen fixed rigidly across it will eventually show it at the joins. Cabinetry is set on adjustable legs with a separate kickboard rather than a fixed plinth, which lets the floor move without dragging the carcasses with it, and lets the kick be removed later if anything needs to get underneath.'],
        ['Keeping the character without pastiche', 'Shaker doors and a farmhouse sink are one route and there is nothing wrong with it, but it is not the only one. Plenty of Queenslanders take a flat-panel contemporary kitchen well, provided the proportions respect the room — the ceiling height, the window heights, the width of the boards. What tends to look wrong is a kitchen that ignores the house entirely, in either direction. <a href="/guide-kitchen-colours-2026" style="color:var(--brass)">Our colours and materials guide</a> covers what people are actually choosing.'],
        ['If you are enclosing underneath too', `Many Queenslander renovations happen alongside converting the space below into a flat or second living area. If that is your project, <a href="/under-house-kitchens-rockhampton" style="color:var(--brass)">under-house kitchens</a> covers the cabinetry down there, which has different constraints again.`],
      ],
      faq: [
        { q: 'What is different about renovating a Queenslander kitchen?', a: 'Nothing is square or level, the walls are VJ boards rather than plasterboard so cabinets fix into the framing behind, the ceilings are high enough to need a decision about the gap above the overheads, and the timber floors move seasonally. All four are handled by measuring the house rather than assuming it.' },
        { q: 'Can you fix cabinets to VJ walls?', a: 'Cabinets fix into the framing behind the VJ, not into the boards alone. Finding that framing accurately in a hundred-year-old house is part of the site measure, and it is why we measure rather than working from supplied dimensions on these homes.' },
        { q: 'What do you do about high ceilings?', a: 'Run cabinetry to the ceiling, stop it at a considered height with a bulkhead, or leave the upper wall clear and put storage in tall units. Any of the three works; leaving an unresolved gap is the one that always looks wrong.' },
        { q: 'Will a modern kitchen suit a Queenslander?', a: 'Often, yes, provided the proportions respect the room. The mismatch people notice is not old versus new — it is a kitchen that ignores the ceiling height and window lines of the house it is in.' },
      ],
    },
    {
      slug: 'garage-conversion-approval-qld',
      group: 'approvals',
      nav: 'Garage and shed conversions',
      title: 'Garage Conversion Approval QLD | Shed to Living Space | Bilt & Co',
      desc: 'Turning a garage or shed into habitable space in Queensland: why it is a change of building classification, who assesses it, and what it means for the kitchen.',
      h1: 'Converting a garage<br><span class="italic brass">into somewhere you live.</span>',
      lede: 'The build is usually the easy part. What catches people is that you are not renovating a garage — you are changing what the building legally is.',
      img: 'glossy-dark',
      alt: 'Converted space with dark gloss cabinetry and compact kitchen',
      read: '7 min read',
      note: 'Last checked: September 2026. General information, not building, legal or planning advice. Requirements differ by council and change without notice — confirm with the authority linked above, or a building certifier, before you commit to anything.',
      answer: 'A garage or shed is generally a Class 10a building — non-habitable. Making it somewhere people live is a change of classification to Class 1a, and it is assessed as building work against the standards of a dwelling: ceiling height, ventilation, light, insulation, egress and services. Talk to a building certifier and your council before you buy anything.',
      inlineCta: {
        after: 2,
        eyebrow: 'Once the classification is settled',
        title: 'The kitchen it will need.',
        body: 'A kitchenette from $4,500 if nobody is cooking a roast in there. A full compact kitchen from $6,500 if it is becoming a self-contained dwelling.',
        label: 'See the options',
        href: '/kitchenettes',
      },
      cta: {
        eyebrow: 'Conversions',
        title: 'We measure what is there,<br><span class="italic" style="color:var(--brass-lite)">not what the plan says.</span>',
        body: 'Converted spaces are rarely square and rarely level. We site measure and scribe the cabinetry to the room as built, which is the difference between a fitted kitchen and a forced one.',
        image: 'detail-black-cabinetry',
        alt: 'Compact kitchen cabinetry fitted to a converted space',
      },
      sections: [
        ['Class 10a to Class 1a is the whole story', 'Garages, sheds and carports are generally Class 10a in the National Construction Code — non-habitable structures. A dwelling is Class 1a. Converting one into the other is a reclassification, and the building has to meet the standards of what it is becoming rather than what it was. That reaches into ceiling height, natural light, ventilation, insulation, fire separation, egress and services. None of it is exotic; all of it is assessed.'],
        ['What tends to fail', 'Ceiling height is the most common blocker, because a garage was never built to a habitable standard and raising a roof is a different project entirely. After that: natural light and ventilation, which usually means adding or enlarging windows; the slab, which may lack a moisture barrier; and insulation, which most garages simply do not have. A certifier will tell you which of these apply to yours in one visit.'],
        ['Council and certifier do different jobs', `The council handles planning — whether the use is permitted on that land at all, and any conditions. A private building certifier handles the building approval against the code. You will generally deal with both. Ring the certifier first, because they will tell you quickly whether the idea is viable, and ring <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a> (or <a href="https://www.livingstone.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Livingstone Shire Council</a> on the Capricorn Coast) about the planning side before you spend on drawings.`],
        ['Services are where the budget goes', 'A garage has one light circuit and no plumbing. A dwelling needs power distribution, lighting, likely a hot water service, and drainage for a sink. Getting waste out of a slab-on-ground garage is often the single most expensive line in the project, and it is worth pricing before you commit to a layout. That constraint usually decides where the kitchen goes, not preference.'],
        ['Kitchenette or full kitchen', `If it is becoming a self-contained dwelling, it generally needs the facilities of one and a <a href="/kitchenettes" style="color:var(--brass)">kitchenette</a> will not satisfy that. If it is a rumpus, studio or teenage retreat that stays part of the main house, a kitchenette is usually the right answer and starts at $4,500. Your certifier confirms which against the approved classification — ask before you design, not after.`],
        ['If it is under a high-set house', `Enclosing underneath rather than converting a detached garage is the more common version in Rockhampton, and it has its own quirks: the floors are rarely level and the walls rarely square. We cover that specifically in <a href="/under-house-kitchens-rockhampton" style="color:var(--brass)">under-house kitchens in Rockhampton</a>.`],
      ],
      faq: [
        { q: 'Do I need approval to convert a garage in Queensland?', a: 'Generally yes. Making a non-habitable building habitable is a change of building classification and is assessed as building work. Speak to a building certifier and your council before you start.' },
        { q: 'What usually stops a garage conversion?', a: 'Ceiling height most often, then natural light and ventilation, slab moisture, and insulation. A certifier can tell you which apply to your building in a single visit, and that visit is worth paying for before anything else.' },
        { q: 'Can I put a kitchen in a converted garage?', a: 'Yes, and what kind depends on the classification. A self-contained dwelling generally needs a full kitchen; a rumpus or studio attached to the main house is usually fine with a kitchenette from $4,500.' },
        { q: 'How much does the kitchen cost?', a: 'A kitchenette starts around $4,500 and a compact full kitchen around $6,500. The building work around it, particularly getting drainage out of a slab, is usually the larger number.' },
      ],
    },
    {
      slug: 'tiny-home-laws-qld',
      group: 'approvals',
      nav: 'Tiny home laws in Queensland',
      title: 'Tiny House Laws Queensland | Can You Live In One? | Bilt & Co',
      desc: 'Whether a tiny home is a caravan or a building in Queensland, what that changes, and why the answer depends on your council rather than the internet.',
      h1: 'Tiny home laws<br><span class="italic brass">in Queensland.</span>',
      lede: 'Almost every confident answer online is wrong somewhere, because the rule that matters is your council’s, and they differ.',
      img: 'splashback-marble-02',
      alt: 'Compact kitchen run with stone splashback in a tiny home',
      read: '7 min read',
      note: 'Last checked: September 2026. General information, not building, legal or planning advice. Requirements differ by council and change without notice — confirm with the authority linked above, or a building certifier, before you commit to anything.',
      answer: 'The first question is whether your tiny home is a registrable vehicle or a building. On wheels and registered, it is generally treated more like a caravan; fixed to the ground, it is generally treated as a building and assessed accordingly. What that then permits — especially living in it full time — is a local planning question, and councils differ. Ask yours before you buy or build.',
      inlineCta: {
        after: 2,
        eyebrow: 'Building or buying one',
        title: 'The kitchen is the tightest part.',
        body: 'A 1.8m run from $5,300, drawn to your actual dimensions rather than a module, delivered assembled. Tell us the axle position if it is on a trailer.',
        label: 'See tiny home kitchens',
        href: '/tiny-home-kitchens',
      },
      cta: {
        eyebrow: 'Tiny homes',
        title: 'Every millimetre<br><span class="italic" style="color:var(--brass-lite)">is spoken for.</span>',
        body: 'A 40mm filler panel in a 2.4 metre kitchen is 40mm of bench gone forever. We draw to your measurements, not to a module, and we supply tiny home builders repeatedly.',
        image: 'galley-stone',
        alt: 'Compact galley kitchen for a tiny home',
      },
      sections: [
        ['Vehicle or building: everything follows from this', 'A tiny home on a registered trailer is generally treated more like a caravan. One fixed to the ground, on piers or a slab, is generally a building and is assessed as one — which means classification, approval and the standards that come with a dwelling. Builders and sellers sometimes blur this, because "no approval needed" sells better than the real answer. Establish which you are dealing with before money changes hands.'],
        ['Living in it full time is the harder question', `Even where a tiny home is treated as a caravan, how long someone may live in it on a given block is usually restricted by the local planning scheme, and the limits vary. Some councils allow it in defined circumstances, some during construction of a main dwelling, some not at all. This is the question to put to <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a> or <a href="https://www.livingstone.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Livingstone Shire Council</a> in writing, and it is worth having the answer before you commit rather than after you have moved in.`],
        ['Secondary dwelling is often the real answer', `If the intention is somewhere permanent for family, a <a href="/granny-flat-kitchens" style="color:var(--brass)">granny flat</a> approved as a secondary dwelling is frequently the more straightforward path than a tiny home, because it goes through a process that already exists. It is worth pricing both. Our guide to <a href="/guide-granny-flat-rules-rockhampton" style="color:var(--brass)">granny flat rules</a> covers what that involves.`],
        ['Services still have to come from somewhere', 'Power, water and waste are the practical constraints regardless of classification. Composting toilets and tanks change the picture but do not remove the question, and how waste is handled is frequently what the council actually cares about. Sort this early; it shapes the design.'],
        ['If it is on a trailer, weight matters to the kitchen', `Cabinetry is heavy and the kitchen is usually the densest run in the build. Tell us the axle position and we will keep the mass where your engineer wants it. That is a drawing decision, not something to solve after delivery. More in <a href="/tiny-home-kitchens" style="color:var(--brass)">tiny home kitchens</a>.`],
      ],
      faq: [
        { q: 'Can I live in a tiny house in Queensland?', a: 'It depends on your council and on whether the home is a registrable vehicle or a building. Some councils permit it in defined circumstances, some only during construction of a main dwelling, some not at all. Ask yours in writing before you commit.' },
        { q: 'Does a tiny home on wheels need building approval?', a: 'Generally not in the way a fixed dwelling does, if it is a registrable vehicle. Fix it to the ground and it is usually assessed as a building. The distinction is the thing to establish first, and sellers are not always precise about it.' },
        { q: 'Is a granny flat easier than a tiny home?', a: 'Often, if the goal is somewhere permanent. A secondary dwelling goes through an established approval process, whereas tiny home rules vary and can be restrictive. Price both before deciding.' },
        { q: 'How much is a tiny home kitchen?', a: 'From about $5,300 for a 1.8 metre run and $6,500 for 2.4 metres, with full-size Blum hardware and moisture-resistant carcasses. Delivered assembled, not flat packed.' },
      ],
    },
    {
      slug: 'short-stay-letting-rules-qld',
      group: 'approvals',
      nav: 'Short-stay letting rules',
      title: 'Airbnb & Short-Stay Rules Queensland | Council & Body Corporate | Bilt & Co',
      desc: 'What decides whether you can let a property short-stay in Queensland: council planning, body corporate by-laws, and the questions to ask before you fit it out.',
      h1: 'Short-stay letting rules<br><span class="italic brass">in Queensland.</span>',
      lede: 'Two separate permissions can stop a short-stay plan, and neither of them is the one people check first.',
      img: 'dark-dining',
      alt: 'Kitchen and dining space in a short-stay property',
      read: '6 min read',
      note: 'Last checked: September 2026. General information, not building, legal or planning advice. Requirements differ by council and change without notice — confirm with the authority linked above, or a building certifier, before you commit to anything.',
      answer: 'Two things decide it, independently. Council planning — whether short-stay accommodation is a permitted use at that address — and, if the property is in a scheme, the body corporate by-laws, which can prohibit it regardless of what the council says. Check both before you spend on the fit-out. Some councils also run registration or levy schemes.',
      inlineCta: {
        after: 2,
        eyebrow: 'Cleared to let',
        title: 'Now build it to survive guests.',
        body: 'Photographs well, holds up to people with no reason to be careful, and turns over fast between stays. From $6,500 for a 2.4 metre run.',
        label: 'See short-stay kitchens',
        href: '/short-stay-kitchens',
      },
      cta: {
        eyebrow: 'Short-stay',
        title: 'The kitchen wins the booking<br><span class="italic" style="color:var(--brass-lite)">and survives the guest.</span>',
        body: 'Two jobs your own kitchen never has. Send us the dimensions and we will specify for both, fixed and itemised.',
        image: 'concrete-luxe',
        alt: 'Bright short-stay apartment kitchen',
      },
      sections: [
        ['Council first', `Short-stay accommodation is a land use, and whether it is permitted at a given address is a planning question for the local council. It can depend on the zone, the dwelling type and whether the owner lives there. <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a> covers Rockhampton and <a href="https://www.livingstone.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Livingstone Shire Council</a> covers Yeppoon and the Capricorn Coast, and they are separate schemes with separate answers. Ask in writing, and ask about your specific address rather than in general.`],
        ['Body corporate can override everything', 'If the property is in a community titles scheme — an apartment, townhouse or unit — the by-laws may restrict or prohibit short-stay letting regardless of the council position. This is the one that most often surprises people, because they check the council, get a workable answer, and never look at the by-laws. Read them before you buy, not after.'],
        ['Registration, levies and insurance', 'Some Queensland councils operate registration schemes or apply differential rating to short-stay properties. Separately, standard landlord and home insurance frequently does not cover short-stay letting, and finding that out after an incident is expensive. Ask your insurer directly and get the answer in writing.'],
        ['Then it becomes a fit-out question', `Once you are cleared to let, the brief changes. The kitchen has two jobs it would not have in your own home: it has to earn the booking in a photograph, and survive people with no reason to be careful. That is a specification conversation more than a finishes one — <a href="/short-stay-kitchens" style="color:var(--brass)">short-stay kitchens</a> covers what actually fails and in what order.`],
        ['Coastal properties have their own version', `On the Capricorn Coast, holiday letting is common and the salt air adds a third force to the two above. See <a href="/short-stay-kitchens-capricorn-coast" style="color:var(--brass)">holiday let kitchens on the Capricorn Coast</a> for how that changes the specification.`],
      ],
      faq: [
        { q: 'Do I need council approval to run an Airbnb in Queensland?', a: 'Possibly. Short-stay accommodation is a land use and whether it is permitted depends on the address, the zone and the council. Ask your council about your specific property in writing before you invest in the fit-out.' },
        { q: 'Can a body corporate stop short-stay letting?', a: 'In many cases yes, through the by-laws, and independently of the council position. If the property is in a scheme, read the by-laws before you buy. This is the most commonly missed check.' },
        { q: 'Does normal home insurance cover Airbnb?', a: 'Frequently not. Standard home and landlord policies often exclude short-stay letting. Ask your insurer directly and get the confirmation in writing rather than assuming.' },
        { q: 'What kitchen suits a short-stay property?', a: 'One that photographs wide and uncluttered, and that survives unfamiliar users — full-extension runners, a heat-tolerant benchtop, and a layout obvious enough that a stranger puts things back. From about $6,500 for a 2.4 metre run.' },
      ],
    },
    {
      slug: 'owner-builder-permit-qld',
      group: 'approvals',
      nav: 'Owner-builder permits in Queensland',
      title: 'Owner Builder Permit Queensland | What It Covers | Bilt & Co',
      desc: 'How owner-builder permits work in Queensland: when you need one, the course, what you take on, and the restrictions that apply afterwards.',
      h1: 'Owner-builder permits<br><span class="italic brass">and what they hand you.</span>',
      lede: 'An owner-builder permit is not a licence to do everything yourself. It is a transfer of responsibility, and it is worth understanding what moves before you apply.',
      img: 'joinery-sketch',
      alt: 'Building plans and measurements laid out on a bench',
      read: '7 min read',
      note: 'Last checked: September 2026. General information, not building, legal or financial advice. Requirements differ by council and change without notice — confirm with the authority linked above, or a building certifier, before you commit to anything.',
      answer: 'You generally need an owner-builder permit from the <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">QBCC</a> to manage building work on your own home above a value threshold, and an approved course is usually required first. The permit does not let you do licensed work — plumbing and electrical still need licensed trades. It also carries restrictions on selling the property for a period afterwards. Check the current threshold and rules directly; both change.',
      inlineCta: {
        after: 2,
        eyebrow: 'Supplying owner-builders',
        title: 'You manage the build. We handle the kitchen.',
        body: 'Designed to your measurements, delivered assembled, with service drawings your plumber and electrician can rough in from. Fit it with your own crew.',
        label: 'See owner-builder supply',
        href: '/owner-builder-kitchen-supply',
      },
      cta: {
        eyebrow: 'Owner-builders',
        title: 'One less trade<br><span class="italic" style="color:var(--brass-lite)">to chase.</span>',
        body: 'Send us the plans and we will quote the cabinetry fixed and itemised, delivered assembled when your build is actually ready rather than when it suits our calendar.',
        image: 'dark-island',
        alt: 'Kitchen cabinetry delivered assembled',
      },
      sections: [
        ['What the permit actually is', 'It is permission to take on the role a licensed builder would otherwise hold on your own property. The <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">QBCC</a> issues it, generally where the work exceeds a value threshold, and an approved owner-builder course is usually a prerequisite. What it is not is a licence to perform trade work. You are becoming the manager of the project and the person legally accountable for it, not the tradesperson.'],
        ['What still needs a licensed trade', 'Plumbing and electrical work must be carried out and certified by licensed trades regardless of your permit. So must several other categories. This is the point owner-builders most often get wrong, and it is expensive rather than academic: unlicensed work can void insurance, fail at inspection, and surface years later in a building and pest report when you try to sell.'],
        ['What you take on', 'Verifying every trade on your site holds a current licence, and keeping the records. Workplace health and safety on your own site. Insurance appropriate to the work. Coordinating certification. Warranty responsibility that a builder would otherwise carry. None of it is unmanageable, and all of it is work most people underestimate when comparing an owner-build against a contract build.'],
        ['The restriction on selling', 'Queensland places restrictions on selling a property you owner-built for a set period after the work, and there are disclosure obligations if you do. If a sale within a few years is even possible, factor this in before you apply — it is the single most common regret we hear. The <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">QBCC</a> publishes the current period; do not rely on what someone told you at a barbecue.'],
        ['Where the kitchen fits', `Cabinetry is generally not what triggers a certification requirement — the building work around it is. We supply owner-builders regularly: the kitchen is designed to your measurements, delivered assembled, and fitted by your crew, with a full set of service drawings so your plumber and electrician can rough in correctly the first time. More on that in <a href="/owner-builder-kitchen-supply" style="color:var(--brass)">owner-builder kitchen supply</a>, and on approvals in <a href="/guide-do-i-need-approval-kitchen-renovation" style="color:var(--brass)">our approvals guide</a>.`],
        ['Before you apply', `Read the current requirements on the <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">QBCC</a> site rather than a forum. Confirm the value threshold and the course requirement as they stand now. Talk to a building certifier about your specific project. And check with <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a> or your own council about the planning side, which is separate from the building approval and often forgotten.`],
      ],
      faq: [
        { q: 'Do I need an owner-builder permit in Queensland?', a: 'Generally yes, where the value of the building work exceeds a threshold set by the QBCC. The threshold changes, so check the current figure on their site rather than relying on a number you have been told.' },
        { q: 'Can an owner-builder do their own plumbing and electrical?', a: 'No. Those remain licensed trades regardless of an owner-builder permit, and the work must be certified by the licensed tradesperson. Unlicensed work in these categories causes problems at inspection, at sale and with insurers.' },
        { q: 'Can I install my own kitchen as an owner-builder?', a: 'Fitting cabinetry is generally within what an owner-builder manages, provided the plumbing and electrical connections are done by licensed trades. We supply owner-builders assembled cabinetry and service drawings for exactly this.' },
        { q: 'Can I sell a house I owner-built?', a: 'Yes, but Queensland applies restrictions and disclosure obligations for a period after the work. Check the current rules with the QBCC before you apply for the permit, particularly if you might sell within a few years.' },
      ],
    },
    {
      slug: 'granny-flat-rules-rockhampton',
      showCollections: true,
      group: 'approvals',
      nav: 'Granny flat rules in Rockhampton',
      title: 'Granny Flat Rules Rockhampton | Secondary Dwellings | Bilt & Co',
      desc: 'What decides whether you can build a granny flat in Rockhampton, who assesses it, whether you can rent it out, and the questions to ask the council first.',
      h1: 'Granny flat rules<br><span class="italic brass">in Rockhampton.</span>',
      lede: 'Almost everything that decides whether your granny flat project works is settled before you draw it, in a conversation with the council.',
      img: 'matte-black-bank',
      alt: 'Compact secondary dwelling kitchen with integrated appliances',
      read: '8 min read',
      note: 'Last checked: September 2026. General information, not building, legal or financial advice. Requirements differ by council and change without notice — confirm with the authority linked above, or a building certifier, before you commit to anything.',
      answer: 'A granny flat in Queensland is usually a "secondary dwelling", and whether you can build one on your block — how big, whether it must stay attached, and whether it can be tenanted separately — is decided by your council’s planning scheme. In Rockhampton that is <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a>. Yeppoon and the Capricorn Coast are <a href="https://www.livingstone.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Livingstone Shire Council</a> instead. Ask before you design anything.',
      inlineCta: {
        after: 2,
        eyebrow: 'Once the council says yes',
        title: 'The kitchen it will need.',
        body: 'A compliant secondary-dwelling kitchen runs 2.4 to 3.0 metres, from $6,500 delivered assembled and installed by our own team.',
        label: 'See granny flat kitchens',
        href: '/granny-flat-kitchens',
      },
      cta: {
        eyebrow: 'Secondary dwellings',
        title: 'Approval first.<br><span class="italic" style="color:var(--brass-lite)">Then the fun part.</span>',
        body: 'When you know what you are allowed to build, send us the plan. Free site measure, 3D design and a fixed quote for the kitchen, yours to keep whatever you decide.',
        image: 'galley-stone',
        alt: 'Compact galley kitchen in a secondary dwelling',
      },
      sections: [
        ['Secondary dwelling is the term that matters', 'Councils rarely say "granny flat". The planning term is usually secondary dwelling, and it means a self-contained dwelling on the same lot as a house. How that plays out differs by council — see <a href="/guide-granny-flat-rules-qld" style="color:var(--brass)">granny flat rules across Queensland</a>. Searching the planning scheme for the right term is the difference between finding the rules and concluding there are none. Dual occupancy is a different thing again, with different rules, and the two get confused constantly.'],
        ['The questions that decide the project', `Put these to <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a> before you spend anything. Is a secondary dwelling permitted on this block? Is there a maximum floor area? Must it remain attached to the main dwelling or share services? Can it be tenanted to someone outside the household? What parking is required? What are the setbacks? Is the block in a flood or other hazard overlay? Any one of those answers can end the project or change it fundamentally, and none of them can be answered by a builder.`],
        ['Renting it out is a separate question', `Being allowed to build one and being allowed to let it are different permissions. Some approvals restrict occupation to the household of the main dwelling, which makes the income case disappear. We cover this properly in <a href="/guide-granny-flat-rent-rockhampton" style="color:var(--brass)">the guide on renting one out</a> — if the project only works with rental income, settle this before anything else.`],
        ['Council versus certifier', 'The council decides the planning question: what you are allowed to do on that land. A private building certifier handles the building approval: whether what you propose meets the code. You will generally deal with both. Ring a certifier early — they will tell you in one call whether your idea is straightforward or not, and the call usually costs nothing.'],
        ['Conversions are the common version here', `Rockhampton’s housing stock means a lot of secondary dwellings are conversions rather than new builds — enclosing under a high-set house, or converting a shed or garage. That is a change of building classification and is assessed as building work. See <a href="/under-house-kitchens-rockhampton" style="color:var(--brass)">under-house kitchens</a> for how we handle the cabinetry side, and <a href="/guide-class-1a-granny-flat-yeppoon" style="color:var(--brass)">the Class 1a guide</a> for what the classification means.`],
        ['What the kitchen has to be', 'If the dwelling is approved as a dwelling, it generally needs the facilities of one, which means a real kitchen rather than a kitchenette: a sink, a cooking facility, a bench and storage. From $6,500 for a 2.4 metre run. Confirm the requirement with your certifier against your approval rather than assuming, because it is the kind of thing that surfaces late and costs money.'],
      ],
      faq: [
        { q: 'Can I build a granny flat in Rockhampton?', a: 'It depends on your block and the planning scheme. Ask Rockhampton Regional Council whether a secondary dwelling is permitted at your address, and what conditions apply. That answer comes before design, not after.' },
        { q: 'Can I rent out a granny flat in Rockhampton?', a: 'Sometimes. Some approvals restrict occupation to the household of the main dwelling. Since this decides whether the project pays for itself, confirm it with the council before you commit.' },
        { q: 'Which council covers Yeppoon and the Capricorn Coast?', a: 'Livingstone Shire Council, not Rockhampton Regional Council. Different planning scheme, different answers. This catches people out regularly.' },
        { q: 'Does a granny flat need a full kitchen?', a: 'If it is approved as a dwelling, generally yes — a sink, cooking facility, bench and storage rather than a kitchenette. Your building certifier confirms the requirement against the approved classification.' },
        { q: 'How much does a granny flat kitchen cost?', a: 'From about $6,500 for a 2.4 metre run and $7,700 for 3.0 metres, including carcasses, doors, Blum hardware and a benchtop. That is the kitchen only, not the dwelling.' },
      ],
    },
    {
      slug: 'flood-damage-kitchen-replacement-rockhampton',
      answer: 'Photograph everything before you move or throw out anything — that is what the claim rests on, and it is free. Assume base cabinets that sat in water are gone, whatever anyone offers to dry out. Then use the rebuild to specify so the next one can be dried rather than replaced.',
      inlineCta: {
        after: 0,
        eyebrow: 'When you are ready to quote',
        title: 'Itemised the way assessors work through it.',
        body: 'Cabinetry, benchtop, hardware, appliances and installation listed separately, which is how a claim gets assessed. We cannot tell you what your policy covers — we can give you the document it needs.',
        label: 'Get an itemised quote',
        href: '/contact',
      },
      cta: {
        eyebrow: 'After the water',
        title: 'One kitchen out.<br><span class="italic" style="color:var(--brass-lite)">One chance to specify better.</span>',
        body: 'Moisture-resistant carcasses, laser-bonded edging and removable kickboards cost very little extra while you are rebuilding anyway, and change what happens next time. We work to whenever your floors and walls are signed off, not to our calendar.',
        image: 'detail-stone-black',
        alt: 'Moisture resistant cabinetry and stone benchtop detail',
      },
      nav: 'Replacing a kitchen after flood damage',
      title: 'Flood Damage Kitchen Replacement Rockhampton | Bilt & Co',
      desc: 'Replacing a kitchen after flood or storm damage in Rockhampton: what to document, how insurance quotes usually work, and specifying so it survives next time.',
      h1: 'Replacing a kitchen<br><span class="italic brass">after the water goes down.</span>',
      lede: 'Rockhampton knows this drill. The cabinetry is rarely salvageable, the paperwork decides how much you get back, and the rebuild is your one chance to specify better.',
      img: 'detail-stone-black',
      alt: 'Stone benchtop and moisture resistant cabinetry detail',
      read: '7 min read',
      note: 'Last checked: September 2026. This is general information, not building, legal, financial or insurance advice. Rules, funding and figures differ by council, insurer and individual circumstance and change without notice — confirm with the authority linked above before you commit to anything.',
      sections: [
        ['Document before you clear', 'The strongest thing you can do for a claim happens in the first hours, and it is free: photograph everything before anything is moved or thrown out. Every cabinet, the water line on the wall, the underside of the sink base, the floor, the appliances, serial numbers where you can reach them. Wide shots and close shots. Insurers assess what you can evidence, and a cleared kitchen is very hard to evidence after the fact. Keep the damaged doors somewhere until the assessor has been.'],
        ['Why flooded cabinetry usually does not come back', 'Standard chipboard carcasses swell irreversibly once water gets into the core, and it happens through the unsealed bottom edge and the back panel rather than the visible faces. A kitchen can look fine for a fortnight and then the doors stop closing as the carcass distorts. Moisture-resistant board resists it considerably better but is not a submarine. Assume base cabinets that sat in water are gone, and be sceptical of anyone offering to dry them out and re-hang the doors.'],
        ['How the quote side normally runs', 'Most insurers want an itemised scope and quote, and many will accept one from a supplier of your choosing rather than only their preferred repairer — but that varies by policy and by insurer, so ask yours directly rather than assuming either way. What helps in every case is a quote that itemises cabinetry, benchtop, hardware, appliances and installation separately, because that is how assessors work through it. We quote in that format as standard. What we cannot do is tell you what your policy covers; that conversation is between you and your insurer. The <a href="https://insurancecouncil.com.au/" rel="noopener" target="_blank" style="color:var(--brass)">Insurance Council of Australia</a> publishes general guidance on the claims process, and if a claim is disputed, <a href="https://www.afca.org.au/" rel="noopener" target="_blank" style="color:var(--brass)">AFCA</a> handles complaints.'],
        ['The rebuild is your one cheap chance to specify better', 'You are replacing the kitchen anyway. The incremental cost of specifying it to cope better next time is small compared to doing it as a separate project later. Moisture-resistant carcasses throughout rather than only under the sink. Laser-bonded edging instead of glued, because glued edging lifts first when it gets wet. Legs and kickboards that can be removed and dried rather than a sealed plinth that traps water. Drawers rather than low cupboards, so contents sit higher. Stone or porcelain rather than laminate on the benchtop, since laminate swells at the join.'],
        ['Raised homes and under-house kitchens', 'Rockhampton’s high-set housing stock exists for a reason, and a second kitchen or kitchenette under the house is common. If you are rebuilding one, the specification conversation is different again — that space will get wet at some point in its life, so nothing should be there that cannot be dried out or removed. Talk to us about it rather than replacing like for like out of habit. <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a> holds the flood mapping for your address.'],
        ['What we can do', 'Design, itemised quote in the format assessors expect, supply delivered assembled, and installation by our own team. We work to your timeline, which after a flood is usually driven by when the floor and walls are dry and signed off rather than by us. See <a href="/investment" style="color:var(--brass)">the price bands</a> for the price bands so you know roughly where you are before the assessor visits.'],
      ],
      faq: [
        { q: 'Will insurance cover a new kitchen after a flood?', a: 'That depends entirely on your policy, your excess and how the damage is assessed, and flood cover in particular is not included in every policy. Ask your insurer directly. What we can provide is the itemised scope and quote that a claim generally needs.' },
        { q: 'Can I choose my own kitchen supplier for an insurance job?', a: 'Often yes, though some policies steer you to a preferred repairer and some make that a condition. Ask your insurer before you commission anything. If you are free to choose, an itemised quote separating cabinetry, benchtop, hardware and installation is what assessors work from.' },
        { q: 'Can flooded kitchen cabinets be dried out and saved?', a: 'Rarely, if the carcasses are standard chipboard and sat in water. The board swells from the unsealed edges inward and the distortion often shows up weeks later, after the repair has been signed off. Moisture-resistant board does better. Be cautious of anyone promising to salvage submerged base cabinets.' },
        { q: 'What should I photograph before cleaning up?', a: 'Everything, before anything moves. The water line on the walls, every cabinet inside and out, under the sink, the floor, appliances and their serial numbers, both wide and close. Keep damaged doors until the assessor has attended. It costs nothing and it is the difference between an evidenced claim and an argued one.' },
      ],
    },
    {
      slug: 'does-a-new-kitchen-add-value',
      answer: 'There is no reliable single percentage, and we will not invent one. What a kitchen consistently changes is how many buyers can picture living there and how long the house sits on the market. Spend to the ceiling of the house and the street, not to the level of the photographs you have saved.',
      inlineCta: {
        after: 2,
        eyebrow: 'Work out where your budget sits',
        title: 'The price bands, before you ring an agent.',
        body: 'Three collections with real numbers against them, and a calculator you can put your own run length into. No email required to see any of it.',
        label: 'See the price bands',
        href: '/investment',
      },
      cta: {
        eyebrow: 'Selling or staying',
        title: 'Two different briefs.<br><span class="italic" style="color:var(--brass-lite)">Tell us which one you are on.</span>',
        body: 'Selling inside a year means broad appeal and nothing a buyer reads as unfinished. Staying five years means building what you actually want. Tell us which, and the quote will reflect it.',
        image: 'island-calacatta',
        alt: 'Marble island bench in a bright kitchen',
      },
      nav: 'Does a new kitchen add value?',
      title: 'Does a New Kitchen Add Value to a House? | Australia | Bilt & Co',
      desc: 'How a kitchen actually affects what a house sells for, why quoted return percentages are unreliable, and how to spend so the money is not wasted.',
      h1: 'Does a new kitchen<br><span class="italic brass">actually add value?</span>',
      lede: 'Usually, but not the way the percentages you have read suggest. What a kitchen reliably changes is whether the house sells at all, and how fast.',
      img: 'island-calacatta',
      alt: 'Calacatta marble waterfall island in a bright kitchen',
      read: '6 min read',
      note: 'Last checked: September 2026. This is general information, not building, legal, financial or insurance advice. Rules, funding and figures differ by council, insurer and individual circumstance and change without notice — confirm with the authority linked above before you commit to anything.',
      sections: [
        ['Be sceptical of the percentages', 'You will find articles claiming a kitchen returns a specific percentage of its cost at sale. Treat all of them carefully. Those figures come from different markets, different years and different price brackets, and almost none of them isolate the kitchen from everything else that was done to the house. Nobody renovates only the kitchen and then sells the next week, which is what you would need to actually measure it. Anyone quoting you a precise return figure for Rockhampton in 2026 is guessing, and so would we be.'],
        ['What a kitchen reliably does', 'Two things, and they are worth more than a percentage. It changes how many people inspect and how many of them can imagine living there — a dated kitchen is the room that makes a buyer mentally start subtracting a renovation budget. And it changes time on market. A house that sells in three weeks instead of three months has saved you carrying costs, price reductions and a lot of stress. That is real money even when it does not show up as a higher headline price.'],
        ['The ceiling nobody mentions', 'A house has a value ceiling set by its street, its land and its size, and no kitchen breaks through it. Putting a $50,000 kitchen into a house at the top of a modest street generally does not return $50,000, because the buyer at that price point is not there. The reverse is also true: a cheap kitchen in a house that warrants better will actively cost you at sale. Spend to the level of the house and the street, not to the level of the photographs you have saved.'],
        ['Selling versus staying', 'These are different jobs and they deserve different money. If you are selling within a year, the brief is broad appeal and no obvious faults — neutral finishes, everything working, nothing that reads as a job the buyer inherits. If you are staying five years or more, build the kitchen you want, because you are buying five years of using it, not a resale line item. The most expensive mistake is a compromise between the two, which serves neither.'],
        ['Where the money goes furthest at sale', 'Layout beats finishes. A kitchen that works — where the bin, dishwasher and prep zone are in the right relationship — reads as considered even in modest materials, and no benchtop rescues a bad layout. After layout: light, storage that visibly closes the clutter away, and a benchtop that photographs well, since most buyers meet your kitchen as a photograph first. <a href="/guide-kitchen-layouts" style="color:var(--brass)">The layouts guide</a> covers the shapes; <a href="/guide-benchtops-compared" style="color:var(--brass)">the benchtop guide</a> covers the materials.'],
        ['Rentals are a different calculation again', 'For an investment property the question is not resale value but tenancy: how fast it lets, at what rent, and how long the fittings survive tenants. That is a durability and hardware conversation more than a finishes one. See <a href="/short-stay-kitchens" style="color:var(--brass)">short-stay kitchens</a> for short-stay, or <a href="/granny-flat-kitchens" style="color:var(--brass)">granny flat kitchens</a> for secondary dwellings.'],
      ],
      faq: [
        { q: 'How much value does a new kitchen add to a house?', a: 'There is no reliable single figure, and we will not invent one. It depends on the market, the suburb, the value ceiling of the house and what the kitchen replaced. What is more consistently observed is the effect on buyer interest and time on market. For a figure specific to your property, ask two local agents — they see the comparable sales.' },
        { q: 'Is it worth renovating the kitchen before selling?', a: 'Often, if the existing kitchen is dated enough that buyers will price in replacing it. The brief is different from renovating for yourself: neutral, functional, nothing a buyer reads as unfinished. Spend to the level of the street rather than to the level of your own taste.' },
        { q: 'How much should I spend if I am selling?', a: 'Less than you would if you were staying, and never past the value ceiling of the house and street. A local agent will tell you what the ceiling is in your area, which is the number that should set the budget.' },
        { q: 'Does a kitchen help a rental property?', a: 'It affects letting speed and how well the property survives tenants more than it affects the rent achievable. That makes it a hardware and durability decision rather than a finishes one — spend on runners, hinges and carcass board, keep the finishes simple.' },
      ],
    },
    {
      slug: 'granny-flat-rent-rockhampton',
      answer: 'The approval decides whether you can let it, not the build — some secondary dwellings are approved only for the household of the main house. Ask the council that before anything else. Then get real rent figures from current listings in your own suburb rather than from anyone selling you a build.',
      inlineCta: {
        after: 1,
        eyebrow: 'Council said yes',
        title: 'Now make the feasibility real.',
        body: 'A 2.4 metre secondary-dwelling kitchen starts at $6,500 and a 3.0 metre run at $7,700, delivered assembled and installed. A real number beats an allowance in a spreadsheet.',
        label: 'Price the kitchen',
        href: '/granny-flat-kitchens',
      },
      cta: {
        eyebrow: 'Secondary dwellings',
        title: 'Specify it for the second tenant,<br><span class="italic" style="color:var(--brass-lite)">not the first.</span>',
        body: 'The parts that fail in a let property are always the same: glued edging, standard runners, chipboard that swells at the first dripping tap. We specify against all three as standard, because replacing a kitchen in four years costs more than doing it properly once.',
        image: 'collection-marble-02',
        alt: 'Compact secondary dwelling kitchen',
      },
      nav: 'Renting out a granny flat in Rockhampton',
      title: 'Renting Out a Granny Flat in Rockhampton | Rules & Returns | Bilt & Co',
      desc: 'Whether you can rent a secondary dwelling in Rockhampton, what the approval conditions decide, and how to work out the return before you build.',
      h1: 'Renting out a granny flat<br><span class="italic brass">in Rockhampton.</span>',
      lede: 'The build cost is the easy number. Whether you are allowed to let it, and to whom, is the one that decides if the project works.',
      img: 'collection-marble-02',
      alt: 'Compact secondary dwelling kitchen with stone splashback',
      read: '7 min read',
      note: 'Last checked: September 2026. This is general information, not building, legal, financial or insurance advice. Rules, funding and figures differ by council, insurer and individual circumstance and change without notice — confirm with the authority linked above before you commit to anything.',
      sections: [
        ['Approval decides this, not the building', 'A secondary dwelling can be built to a perfectly good standard and still not be lettable to the general public, because the approval it was granted under may restrict occupation — commonly to members of the household of the main dwelling. This is the single most expensive thing to discover late. Before you spend anything, ask <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a> what a secondary dwelling on your specific block can be approved for and whether it may be tenanted separately. Yeppoon and the Capricorn Coast are <a href="https://www.livingstone.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Livingstone Shire Council</a> instead, with their own planning scheme.'],
        ['Questions to put to the council, in this order', 'Is a secondary dwelling permitted on this block at all? Is there a maximum floor area? Must it remain attached to, or share services with, the main dwelling? Can it be tenanted to someone outside the household? Is separate metering required or permitted? What parking is required? Is the block in a flood or other hazard overlay? Every one of those changes the design or the business case, and none of them can be answered by a builder.'],
        ['Working out the return honestly', 'The arithmetic is simple; the inputs are where people fool themselves. Total build cost including services, approvals, certification and connection — not just the quoted build. Realistic rent, taken from current comparable listings in your actual suburb rather than a figure someone quoted you. Then subtract: vacancy, insurance, rates impact, maintenance, agent fees if you use one, and the tax position, which is a question for your accountant and not for us. We are not going to publish a rent figure or a payback period here, because both vary by suburb and year and a wrong one sends people into bad projects.'],
        ['Where to get the real numbers', 'For rent, look at what is actually listed and what has actually let in your suburb — <a href="https://www.realestate.com.au/" rel="noopener" target="_blank" style="color:var(--brass)">realestate.com.au</a> and the equivalent listing sites show both, and a local property manager will give you a realistic figure in one phone call. For rates and charges implications, ask the council. For the tax treatment of income and depreciation, ask your accountant before you build rather than after, because it can affect how the project is best structured.'],
        ['Specify for a tenant, not for a guest', 'A tenanted secondary dwelling is used every day by someone with no reason to be careful with it. The parts that fail are always the same — glued edging that lifts, standard runners that sag, chipboard carcasses that swell at the first dripping tap. Spend there and keep the finishes simple. It is the cheapest insurance in the project. <a href="/granny-flat-kitchens" style="color:var(--brass)">Granny flat kitchens</a> covers how we specify these, from $6,500 for a 2.4 metre run.'],
        ['Short-stay is a different question again', 'Letting a secondary dwelling on Airbnb rather than to a long-term tenant brings a separate set of council and, if applicable, body corporate considerations, and the kitchen brief changes too. See <a href="/short-stay-kitchens" style="color:var(--brass)">short-stay kitchens</a>.'],
      ],
      faq: [
        { q: 'Can I rent out a granny flat in Rockhampton?', a: 'It depends on the approval attached to your specific property. Some secondary dwellings are approved only for occupation by the household of the main dwelling. Ask Rockhampton Regional Council about your block before you budget on rental income — it is the question that decides whether the project works.' },
        { q: 'How much rent can I get for a granny flat in Rockhampton?', a: 'We will not quote a figure, because it varies by suburb, size and year, and a wrong number leads people into bad decisions. Look at current comparable listings in your own suburb and ring a local property manager. Both take minutes and give you a real number rather than a guess.' },
        { q: 'How much does a granny flat kitchen cost?', a: 'A 2.4 metre run starts at about $6,500 and a 3.0 metre run at about $7,700, including carcasses, doors, Blum hardware and a benchtop. That is the kitchen only, not the dwelling.' },
        { q: 'Does a granny flat add value to the property?', a: 'It can, particularly where it is approved for separate tenancy and therefore represents income. Where occupation is restricted to the household, the effect is usually smaller. A local agent is better placed than we are to tell you what it does in your street.' },
        { q: 'Do I need separate metering?', a: 'Sometimes required, sometimes optional, sometimes not permitted — it depends on the approval and the utility. Ask the council and your electricity distributor early, because retrofitting metering is far more expensive than allowing for it at design stage.' },
      ],
    },
    {
      slug: 'do-i-need-approval-kitchen-renovation',
      answer: 'Replacing cabinetry and a benchtop in the same footprint, with services staying where they are, is generally the least involved case. It changes the moment you move a wall, a drain or a circuit. Four questions decide which side of the line you are on, and a building certifier will answer them in one phone call that usually costs nothing.',
      inlineCta: {
        after: 1,
        eyebrow: 'Not sure which side you are on',
        title: 'Send us the plan. We will tell you before you spend.',
        body: 'Photographs or a floor plan is enough. If your job needs a certifier we will say so up front, rather than let you find out three weeks into a build.',
        label: 'Get a straight answer',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Before you commit',
        title: 'Find out what your job needs<br><span class="italic" style="color:var(--brass-lite)">before you pay for any of it.</span>',
        body: 'Send us your dimensions and photographs. You get a fixed, itemised quote and an honest read on whether certification is involved. Free, and yours to keep whatever you decide.',
        image: 'joinery-sketch',
        alt: 'Kitchen drawings and measurements on a workbench',
      },
      nav: 'Do you need approval to renovate a kitchen?',
      title: 'Do I Need Council Approval to Renovate a Kitchen? | QLD | Bilt & Co',
      desc: 'When a kitchen renovation in Queensland needs building approval and when it does not, who signs off the plumbing and electrical, and what to ask your council.',
      h1: 'Do you need approval<br><span class="italic brass">to renovate a kitchen?</span>',
      lede: 'Usually less than people fear, and never nothing. The cabinetry is rarely the issue. What you do to services, walls and ventilation is.',
      img: 'joinery-sketch',
      alt: 'Kitchen joinery drawings and measurements on a workbench',
      read: '6 min read',
      note: 'Last checked: September 2026. This is general information, not building, legal, financial or insurance advice. Rules, funding and figures differ by council, insurer and individual circumstance and change without notice — confirm with the authority linked above before you commit to anything.',
      sections: [
        ['The short version', 'Replacing cabinetry and a benchtop in the same footprint, with services staying where they are, is generally the least involved case. It starts needing more the moment you move a wall, alter a window, change where the plumbing or wiring runs, or convert the space into something it was not before. The cabinets are almost never what triggers an approval — the building work around them is.'],
        ['The four questions that decide it', 'Are you removing or altering any wall? Are you moving the sink, dishwasher or any drain? Are you adding circuits, a new oven point or an island power supply? Are you changing the room’s use or its ventilation? A yes to any of those moves you out of "like for like" and into a conversation with a building certifier. A no to all four usually means the work is straightforward — but confirm it rather than assume it.'],
        ['Council or private certifier', 'In Queensland most residential building approvals are handled by a private building certifier rather than the council counter. The certifier assesses the work, and the council still holds the planning side — what you are allowed to do on that block at all. For anything beyond a straight replacement, ring a certifier first: they will tell you in one call whether you need them, and that call is usually free. <a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a> can tell you which planning rules apply to your address.'],
        ['Plumbing and electrical are separate, and not optional', 'Whatever the building approval position, the licensed work is regulated in its own right. A licensed plumber and a licensed electrician must carry out and certify their parts, and you should receive documentation for both. This matters later — when you sell, and if you ever claim on insurance. Unlicensed plumbing or wiring in a kitchen is the single most common thing that turns up in a building and pest inspection and costs a sale.'],
        ['Where owner-builders sit', 'If you are managing the job yourself under an owner-builder permit, the responsibilities move to you, including making sure every licensed trade on the job is actually licensed and that you hold the paperwork. <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">The QBCC</a> sets out what an owner-builder can and cannot do, and there are limits on selling the property afterwards. We supply owner-builders regularly — see <a href="/owner-builder-kitchen-supply" style="color:var(--brass)">owner-builder kitchen supply</a>.'],
        ['What we do and do not do', 'We design, supply and install the cabinetry, and we provide service drawings so your plumber and electrician know exactly where everything lands. We are not building certifiers and we do not lodge approvals for you. If your job needs certification we will say so early rather than let you find out mid-build, and we work to your certifier’s programme.'],
      ],
      faq: [
        { q: 'Do I need council approval to replace a kitchen in Queensland?', a: 'For a like-for-like replacement in the same footprint, with services staying put, generally the cabinetry itself is not what triggers an approval. It changes as soon as walls, services, ventilation or the use of the room change. Confirm your specific case with a building certifier or your council before you start.' },
        { q: 'Who signs off the plumbing and electrical?', a: 'A licensed plumber and a licensed electrician, each certifying their own work, and you should be given the paperwork. Keep it. It is asked for at sale and can matter to an insurance claim.' },
        { q: 'Does moving the sink change things?', a: 'It can. Moving a sink means altering drainage, which is regulated plumbing work and may change the approval position depending on what is involved. It is one of the four questions worth answering before you finalise a layout.' },
        { q: 'What if I am an owner-builder?', a: 'The obligations sit with you rather than a head contractor, including verifying that every licensed trade is licensed and keeping the documentation. Check the QBCC guidance on owner-builder permits, and note there are restrictions on selling within a set period afterwards.' },
      ],
    },
    {
      slug: 'ndis-kitchen-modifications-queensland',
      answer: 'Funding generally follows an occupational therapist’s report, not a builder’s quote. Get the OT assessment first — it is what supports the funding and what drives the scope. We quote against whatever specification comes out of it, itemised in the format a plan manager needs.',
      inlineCta: {
        after: 1,
        eyebrow: 'Already have an OT report',
        title: 'Send it through. We will quote against it.',
        body: 'Fixed and itemised, in the format a plan manager expects. We do not assess eligibility or write reports — we build to the specification yours produces.',
        label: 'See accessible kitchens',
        href: '/accessible-kitchens',
      },
      cta: {
        eyebrow: 'Accessible kitchens',
        title: 'Send the report.<br><span class="italic" style="color:var(--brass-lite)">We will quote what it specifies.</span>',
        body: 'Full-extension drawers, D-pull handles and reachable storage are standard on everything we build, so much of what makes a kitchen accessible costs nothing extra here.',
        image: 'drawer-detail',
        alt: 'Full extension drawer with accessible storage',
      },
      nav: 'NDIS and accessible kitchen modifications',
      title: 'NDIS Kitchen Modifications Queensland | Accessible Kitchens | Bilt & Co',
      desc: 'How accessible kitchen modifications work under the NDIS in Queensland, what an occupational therapist assesses, and the cabinetry details that matter.',
      h1: 'Accessible kitchens,<br><span class="italic brass">and how they get funded.</span>',
      lede: 'An accessible kitchen is a specification problem, not a design compromise. The hard part is usually the funding pathway, not the cabinetry.',
      img: 'drawer-detail',
      alt: 'Full extension drawer with soft close runners and internal storage',
      read: '7 min read',
      note: 'Last checked: September 2026. This is general information, not building, legal, financial or insurance advice. Rules, funding and figures differ by council, insurer and individual circumstance and change without notice — confirm with the authority linked above before you commit to anything.',
      sections: [
        ['How the funding pathway actually works', 'Home modifications under the NDIS generally begin with an occupational therapist, not a builder. The OT assesses the person in their own home, documents what they cannot currently do and why, and recommends modifications. That report is what supports funding. We are not the ones who determine eligibility or what a plan will cover — <a href="https://www.ndis.gov.au/participants/home-and-living/home-modifications" rel="noopener" target="_blank" style="color:var(--brass)">The NDIS</a> and the participant’s planner do. What we can do is quote and build to an OT’s specification, which is usually the part they need from a cabinetmaker.'],
        ['Start with the OT report, not the kitchen', 'The most common way these jobs stall is a quote produced before the OT has specified anything. The report drives the scope; the scope drives the quote. If you have an OT report already, send it with your enquiry and we will quote directly against it. If you do not, that is the first call to make.'],
        ['What actually makes a kitchen usable', 'Bench height is the obvious one, and it is not one number — a seated user and a standing user need different heights, which is why height-adjustable sections exist. Beyond that: knee clearance under the sink and a section of bench, so a wheelchair user can get close enough to work. Full-extension drawers instead of cupboards, because reaching into the back of a base cupboard from a seated position is close to impossible. D-pull handles rather than knobs, for limited grip. A shallower sink to preserve knee room. Lever taps. Front-mounted controls so nobody reaches over a hot surface.'],
        ['Aging in place is the same brief, quieter', 'Most of what makes a kitchen work for a wheelchair user also makes it work for someone in their seventies who is not going anywhere. Drawers instead of low cupboards, better task lighting, handles that work with arthritic hands, pull-down shelving to bring an overhead within reach, <a href="/motorised-pull-down-shelving" style="color:var(--brass)">motorised or manual</a>. None of it looks clinical, and it is far cheaper designed in at the start than retrofitted after a fall. If you are renovating in your sixties, this is the conversation worth having now.'],
        ['Reference standards worth knowing', 'The <a href="https://livablehousingaustralia.org.au/" rel="noopener" target="_blank" style="color:var(--brass)">Livable Housing Australia</a> guidelines set out the widely used benchmarks for accessible and adaptable housing, including kitchen provisions, and are what many OTs specify against. Specialist Disability Accommodation has its own design standard with its own requirements. If your project is SDA, tell us at the first conversation — the specification is different and it affects the drawings, not just the price.'],
        ['What we can quote', 'Cabinetry, benchtops, hardware and installation, built to the specification you or your OT provide. We do not assess eligibility, write OT reports, or manage NDIS claims. Send us the report or the specification and you will get a fixed, itemised quote you can put in front of a plan manager. More on how we build them on our <a href="/accessible-kitchens">accessible kitchens</a> page, or <a href="/sda-kitchens-queensland">SDA kitchens</a> if the project is Specialist Disability Accommodation.'],
      ],
      faq: [
        { q: 'Will the NDIS pay for a new kitchen?', a: 'That is determined by the participant\'s plan and supporting assessments, not by us. Home modification funding generally follows an occupational therapist\'s report showing what the modification enables. Speak to the OT and the plan manager first; we quote against whatever specification comes out of that.' },
        { q: 'Do I need an occupational therapist report?', a: 'For NDIS-funded modifications it is generally the starting point, and quoting without one is the most common reason these projects stall. If you already have one, send it with your enquiry.' },
        { q: 'What bench height should an accessible kitchen be?', a: 'There is no single correct height, which is why the question matters. A seated user and a standing user need different heights, and households with both often use a height-adjustable section or two working heights. The Livable Housing Australia guidelines are the usual reference, and your OT will specify for the individual.' },
        { q: 'Is an accessible kitchen more expensive?', a: 'The cabinetry itself is broadly comparable. Cost comes from specific items — height-adjustable mechanisms, pull-down shelving units and specialised hardware. Full-extension drawers and D-pull handles are standard on everything we supply, so a good part of what makes a kitchen accessible costs nothing extra here.' },
      ],
    },
    {
      slug: 'class-1a-granny-flat-yeppoon',
      showCollections: true,
      answer: 'Class 1a means a dwelling. If your secondary dwelling is classified as one, it generally needs the facilities of a home — a sink, a cooking facility and a bench, not a kitchenette. And Yeppoon is Livingstone Shire, not Rockhampton Regional Council, which is what decides whether a secondary dwelling is permitted on your block at all.',
      inlineCta: {
        after: 1,
        eyebrow: 'Know your classification',
        title: 'We will tell you what kitchen it needs.',
        body: 'A compliant secondary-dwelling kitchen runs 2.4 to 3.0 metres, from $6,500 delivered assembled and installed. Send the plan and we will spec it against your approval.',
        label: 'Price my granny flat kitchen',
        href: '/granny-flat-kitchens',
      },
      cta: {
        eyebrow: 'Capricorn Coast',
        title: 'Building on the Coast?<br><span class="italic" style="color:var(--brass-lite)">We are forty minutes away.</span>',
        body: 'Yeppoon, Emu Park, Cooee Bay, Lammermoor and Taranganba are all inside our standard service area with no travel loading. Send us the plan and we will work to your certifier’s programme.',
        image: 'collection-marble-04',
        alt: 'Compact secondary dwelling kitchen with stone benchtop',
      },
      nav: 'Class 1a granny flats in Yeppoon',
      title: 'Class 1a Granny Flat Rules Yeppoon | Livingstone Shire | Bilt & Co',
      desc: 'What Class 1a means for a granny flat or secondary dwelling in Yeppoon and the Capricorn Coast, who assesses it, and what to ask Livingstone Shire Council.',
      h1: 'Class 1a granny flats<br><span class="italic brass">on the Capricorn Coast.</span>',
      lede: 'The building classification decides what your secondary dwelling must contain. Get it clear before you draw anything, because it changes the kitchen.',
      img: 'collection-marble-04',
      alt: 'Compact secondary dwelling kitchen with stone benchtop and full height storage',
      read: '7 min read',
      note: 'Last checked: September 2026. This is general information, not building, legal, financial or insurance advice. Rules, funding and figures differ by council, insurer and individual circumstance and change without notice — confirm with the authority linked above before you commit to anything.',
      sections: [
        ['What Class 1a actually means', 'Building classifications come from the National Construction Code, and they describe what a building is for. Class 1a is, broadly, a house or a dwelling — somewhere people live permanently. Class 10a is a non-habitable structure such as a shed, garage or carport. The distinction matters because a Class 1a building has to meet the requirements of somewhere people live: fire separation, ventilation, natural light, insulation, sanitary facilities and cooking provisions. A shed does not.'],
        ['Why the classification changes the kitchen', 'This is the part most people miss until late. If your secondary dwelling is classified as a dwelling, it generally needs the facilities of one — which means a real kitchen rather than a bar fridge and a microwave on a shelf. That is a specification question with a cost attached, and it is far better known at design stage than after a certifier raises it. It is also why a <a href="/kitchenettes" style="color:var(--brass)">kitchenette</a> can be the wrong answer for a secondary dwelling even though it looks like a saving.'],
        ['Converting a shed is a reclassification', 'Enclosing under a high-set home, or converting a Class 10a shed into somewhere someone lives, is a change of classification and it is assessed as such. The structure has to meet the standards of what it is becoming, which can reach into framing, ceiling height, waterproofing, egress and services. It is entirely doable and it is done constantly around Rockhampton and the Coast — but it is a building approval process, not a decorating project.'],
        ['Yeppoon, and who you actually talk to', 'Yeppoon, Emu Park, Cooee Bay, Lammermoor, Taranganba and the surrounding Capricorn Coast are <a href="https://www.livingstone.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Livingstone Shire Council</a>, not Rockhampton Regional Council. That trips people up constantly, and it matters because planning rules differ between the two. The council holds the planning side — whether a secondary dwelling is permitted on your block, and on what conditions. A private building certifier handles the building approval. Ring both early; neither conversation costs anything.'],
        ['Questions worth asking before you spend money', 'Is a secondary dwelling permitted on this block, and is there a size limit? Does it have to stay connected to the main dwelling, or can it be detached? Can it be tenanted to someone outside the household? What are the parking and setback requirements? Is the block in a flood, bushfire or coastal hazard overlay? Every one of those answers can change the design, and all of them come from the council rather than from a builder.'],
        ['The kitchen part', 'A compliant secondary-dwelling kitchen generally means a sink, a cooking facility, a bench and storage — a real kitchen at a small scale. We build those to a 2.4 to 3.0 metre run from $6,500, delivered assembled and installed by our own team, and we work to your certifier’s programme. See <a href="/granny-flat-kitchens" style="color:var(--brass)">granny flat kitchens</a> for how they are specified.'],
      ],
      faq: [
        { q: 'What is a Class 1a building?', a: 'In the National Construction Code, Class 1a is broadly a dwelling — a house or similar, somewhere people live permanently. It carries the requirements you would expect of a home: ventilation, light, insulation, sanitary and cooking facilities. Class 10a covers non-habitable structures like sheds and garages.' },
        { q: 'Does a granny flat in Yeppoon need a full kitchen?', a: 'If it is classified and approved as a dwelling, it generally needs the facilities of one, which includes a cooking facility and a sink rather than a kitchenette. The precise requirement comes from your building certifier against the approved classification, so confirm it before finalising the design.' },
        { q: 'Which council covers Yeppoon?', a: 'Livingstone Shire Council, not Rockhampton Regional Council. It covers Yeppoon, Emu Park, Cooee Bay, Lammermoor, Taranganba and the broader Capricorn Coast. Their planning scheme is what governs whether a secondary dwelling is permitted on your block.' },
        { q: 'Can I convert my shed into a granny flat?', a: 'Often yes, but it is a change of building classification from Class 10a to Class 1a and is assessed as building work. The structure has to meet the standards of a dwelling, which can involve framing, ceiling height, waterproofing, egress and services. Talk to a building certifier before you buy materials.' },
        { q: 'Can I rent out a granny flat in Yeppoon?', a: 'That is a planning question for Livingstone Shire Council and the answer depends on the approval and the conditions attached to it. Some secondary dwellings are approved for household use only. Ask the council before you budget on rental income.' },
      ],
    },
    {
      slug: 'kitchen-renovation-checklist',
      answer: 'In this order: measure the room and photograph it, decide a real budget, list the five things that annoy you about the current kitchen, settle the layout before the finishes, sort services before the walls close, lock the appliance models, then ask every quote the same seven questions. Most renovations go wrong at step four or five, not at the build.',
      inlineCta: {
        after: 4,
        eyebrow: 'Working through the list',
        title: 'The budget step, made easy.',
        body: 'Real price bands and a calculator you can put your own run length into, so step two is a number rather than a guess. No email required.',
        label: 'See what it costs',
        href: '/investment',
      },
      cta: {
        eyebrow: 'The checklist',
        title: 'Bring us the list.<br><span class="italic" style="color:var(--brass-lite)">We will work through it with you.</span>',
        body: 'Ninety minutes at your kitchen table with your measurements, your photographs and your five annoyances. You leave with a concept direction and a realistic number.',
        image: 'material-samples',
        alt: 'Timber and stone finish samples on a workbench',
      },
      nav: 'The kitchen renovation checklist',
      title: 'Kitchen Renovation Checklist | Australia | Bilt & Co',
      desc: 'What to decide, measure and lock in before a kitchen renovation starts, in the order it actually matters. The list we work through at the table.',
      h1: 'The checklist we work<br><span class="italic brass">through at your table.</span>',
      lede: 'Most kitchen renovations go wrong before anything is ordered. Almost always it is one of these, missed early and discovered late.',
      img: 'material-samples',
      alt: 'Timber veneer and stone finish samples laid out on a workbench',
      read: '7 min read',
      sections: [
        ['Before you contact anybody', 'Three things, and they take an afternoon. <strong>Measure the room</strong> — wall to wall, floor to ceiling, and the position of every window, door and power point. <strong>Photograph it</strong> from all four corners. <strong>Decide your real number</strong>, not the number you would like to be true. Any company worth talking to will design to a budget honestly stated, and none of them can design to one they are guessing at. Our <a href="investment.html" style="color:var(--brass)">costs page</a> shows the bands before you have to say anything to anyone.'],
        ['Work out what is actually wrong with the current kitchen', 'Write down the five things that irritate you most. Not what looks dated — what does not work. The bin is in the wrong place. Two people cannot pass. There is nowhere to put a hot tray. This list is worth more to a designer than any number of saved photographs, because it describes how you actually use the room. A kitchen that fixes those five things and looks ordinary will make you happier than a beautiful one that fixes none.'],
        ['Decide the layout before the finishes', 'People choose a colour first and a layout last. It is backwards. The layout is constrained by the room and costs nothing to change on paper; the finishes are free to choose and expensive to change once ordered. Settle the shape, the clearances and where the sink, bin and dishwasher sit in relation to each other — <a href="guide-kitchen-layouts.html" style="color:var(--brass)">the layouts guide</a> covers the numbers — then choose how it looks.'],
        ['Services, before the walls close', 'This is the one that costs money when missed. Power to an island, a second sink, a water point for the fridge, extraction for a cooktop, and whether the existing switchboard can carry a new oven. All of it is cheap while the wall is open and expensive afterwards. If you are building, this conversation belongs before the slab — see <a href="kitchen-islands.html" style="color:var(--brass)">kitchen islands</a> for why an island in particular has to be decided early.'],
        ['Lock the appliances first', 'Cabinetry is built around appliances, not the reverse. The oven, cooktop, dishwasher, rangehood and fridge all have to be chosen, and their exact model dimensions known, before a single cabinet is drawn. A fridge cavity built for a fridge you then change is a rebuild, not an adjustment. Buy or at least confirm the models before design finishes.'],
        ['Ask every quote the same seven questions', 'Carcass board thickness and moisture rating. Hardware brand and warranty. Edging — glued or laser-bonded. Who installs it, employee or subcontractor. Whether the quote is fixed or an estimate. Lead time from deposit. What happens if something is damaged in transit. Ask us the same. A company that answers all seven in writing is telling you something; one that gets vague on two of them is telling you more.'],
        ['Plan for the weeks without a kitchen', 'Eight to twelve weeks from deposit, and roughly one to two weeks without a working kitchen during install. Set up a temporary bench with the kettle, toaster and microwave somewhere else in the house before demolition, not during it. Know where the fridge is going to live. It sounds trivial and it is the thing families remember most about the process.'],
        ['Before you pay the final invoice', 'Walk the kitchen with the installer. Open and close every door and drawer. Check the alignment of the gaps — they should be even, which is the fastest way to judge whether cabinetry was fitted or forced. Run the tap and check under the sink for leaks. Confirm the warranty is in writing and that you have been told what is and is not covered.'],
      ],
      faq: [
        { q: 'How long does a kitchen renovation take?', a: 'Eight to twelve weeks from deposit to handover for most kitchens, of which one to two weeks is the disruptive part where the old kitchen is out and the new one is going in. Our <a href="process.html">process page</a> sets out what happens in each week.' },
        { q: 'What is the most common mistake?', a: 'Choosing finishes before settling the layout, and leaving services until the walls are closed. Both are cheap to get right early and expensive to fix late.' },
        { q: 'Do I need to buy appliances before the design is finished?', a: 'You need to have chosen them and know the exact model dimensions. Cabinetry is built around appliances, so changing a fridge or an oven after drawings are signed off usually means rebuilding a cabinet rather than adjusting one.' },
      ],
    },
    {
      slug: 'kitchen-colours-2026',
      answer: 'Warm neutrals have replaced cool grey, decisively. Natural timber is the defining material, matte has replaced high gloss, and flat-panel doors dominate over shaker. Bold colour still appears but on the island rather than the whole kitchen. In price terms: laminate and matte sit at the bottom, two-pack in the middle, timber veneer above that.',
      inlineCta: {
        after: 3,
        eyebrow: 'Seeing it beats reading it',
        title: 'Twenty-four finished kitchens.',
        body: 'Timber and stone, handleless and gloss, island layouts and joinery detail — with what each combination costs.',
        label: 'Open the gallery',
        href: '/gallery',
      },
      cta: {
        eyebrow: 'Colours and materials',
        title: 'You do not need to know<br><span class="italic" style="color:var(--brass-lite)">what the finish is called.</span>',
        body: 'Screenshot anything that appeals — from here, from Instagram, from a magazine — and we will identify it, price it, and tell you how it behaves in this climate.',
        image: 'collection-marble-03',
        alt: 'Warm timber kitchen with stone splashback',
      },
      nav: 'Kitchen colours and materials in 2026',
      title: 'Kitchen Colours & Materials 2026 | Australia | Bilt & Co',
      desc: 'What Australian kitchens actually look like in 2026 — warm neutrals over cool grey, natural timber, matte finishes and flat-panel doors — and what each costs.',
      h1: 'Kitchen colours<br><span class="italic brass">and materials in 2026.</span>',
      lede: 'Cool grey is over. Here is what has replaced it, why, and what each choice does to the price of your kitchen.',
      img: 'collection-marble-03',
      alt: 'Warm timber kitchen with stone splashback and brass lighting',
      read: '6 min read',
      sections: [
        ['The palette moved warm, and it moved decisively', 'For most of the last decade the safe Australian kitchen was cool grey with a white benchtop. That has genuinely ended. The colours being specified now are warm whites, putty, mushroom, taupe, clay and muted sage — tones with some earth in them that let natural materials sit comfortably alongside.<br><br>The reason is not fashion for its own sake. Cool grey fights timber, and timber has come back hard. Put an oak veneer against a cool grey door and one of them looks wrong; put it against putty or mushroom and they read as a set.'],
        ['Where the bold colour goes', 'The move to warm neutrals has not made kitchens timid. What has changed is where the colour sits. Rather than a whole kitchen in a strong colour, the pattern now is a neutral run with one committed element — forest green, burgundy, navy or deep brown on an island, a bank of tall cabinetry, or the door concealing a butler’s pantry.<br><br>That approach is also far easier to live with. An island can be repainted or replaced in a way a whole kitchen cannot, so the risk of a bold choice is contained.'],
        ['Timber is the defining material', 'Natural timber is the clearest material trend of 2026, used to soften kitchens that would otherwise read as hard. In practice that means veneer rather than solid — a rift-cut or quarter-cut oak, finished in a hard-wax oil or a matte lacquer, celebrating the grain rather than hiding it.<br><br>Worth knowing before you commit: timber veneer costs more than laminate and it moves more. In a Central Queensland kitchen that gets afternoon sun, where you put it matters. We would rather use it where you touch it and specify something more stable where the sun lands.'],
        ['Matte has beaten gloss', 'Soft-touch laminates and lightly grained timber-look surfaces now dominate over high gloss. Matte hides fingerprints, does not throw glare across a room, and photographs better in the natural light most Queensland kitchens have plenty of.<br><br>Flat-panel doors have returned alongside it — smooth faces, streamlined edges, no profile. It is a quieter look than the shaker that preceded it, and it suits a handleless rail or push-to-open particularly well.'],
        ['What this costs you', 'Roughly: laminate and matte finishes sit at the bottom of the range and behave well here. Two-pack paint sits in the middle and can be any colour you like, which is how most people get a bold island without committing the whole kitchen. Timber veneer sits above that.<br><br>The benchtop moves the number more than the doors do. Laminate is included, engineered stone adds around $1,750 on a compact run, and porcelain or sintered stone adds more again while handling heat and sun better than anything else.'],
      ],
      faq: [
        { q: 'Is grey completely out for kitchens?', a: 'Cool grey has fallen away sharply, yes — the palette has moved to warm whites, putty, mushroom, taupe, clay and muted sage. Warm greys still work, particularly alongside timber. If you already have a cool grey kitchen you do not need to panic; it reads as of its moment rather than as a mistake.' },
        { q: 'Will timber veneer survive a Queensland summer?', a: 'Yes, if it is specified sensibly. Veneer is stable in normal use, but direct afternoon sun will fade and move any timber over years. We use it where you touch it and specify something more stable where the sun actually lands, which is usually one or two runs rather than the whole kitchen.' },
        { q: 'What colour holds its value longest?', a: 'A warm neutral on the bulk of the cabinetry, with the personality in one contained element. It ages well, it does not date the room to a single year, and if you tire of the bold piece you can change one island rather than a whole kitchen.' },
      ],
    },
    {
      slug: 'butlers-pantry-worth-it',
      answer: 'You need one if you have about 1.1 metres of clear floor between benches and roughly 2.4 metres of run to give it. Below that it stops working as a room and becomes an expensive cupboard. It is worth it when the real goal is getting mess out of sight rather than storage — and it is not worth it if the space comes out of a kitchen that is already tight.',
      inlineCta: {
        after: 3,
        eyebrow: 'If the clearances work',
        title: 'From $4,000, added to a kitchen.',
        body: 'A compact walk-through with open shelving and a laminate bench starts there. A full second kitchen with a sink, dishwasher and stone runs higher.',
        label: 'See butler’s pantries',
        href: '/butlers-pantries',
      },
      cta: {
        eyebrow: 'Butler’s pantries',
        title: 'Send us the floor plan.<br><span class="italic" style="color:var(--brass-lite)">We will tell you if it fits.</span>',
        body: 'Before you commit the floor space, we will measure whether the clearances actually work in your room — and say so plainly if they do not.',
        image: 'matte-black-bank',
        alt: 'Concealed butler pantry in matte black joinery',
      },
      nav: 'Do you actually need a butler’s pantry?',
      title: 'Do You Need a Butler’s Pantry? | Honest Guide | Bilt & Co',
      desc: 'When a butler’s pantry is worth the money, when it is not, how much space it really needs, and what it costs in Rockhampton.',
      h1: 'Do you actually need<br><span class="italic brass">a butler’s pantry?</span>',
      lede: 'The most requested feature in Australian kitchens right now, and the one most likely to be built too small to work.',
      img: 'detail-black-cabinetry',
      alt: 'Concealed butler’s pantry with integrated sink and storage',
      read: '5 min read',
      sections: [
        ['Why everyone wants one', 'The stated reason people give is storage. The real reason, consistently, is that they want the mess out of sight. A butler’s pantry lets the main kitchen stay a clean stone surface while the actual work — the appliances, the drying dishes, the bulk shop — happens behind a door.<br><br>That is why it keeps topping want-lists. It is not really a storage feature. It is a feature that protects the thing you spent the most money on.'],
        ['The size below which it stops working', 'This is where most of them go wrong. A functional walk-through needs about <strong>1.1 metres of clear floor</strong> between opposing benches, and roughly <strong>2.4 metres of run</strong>. Below that, two people cannot pass, the door to the dishwasher blocks the aisle, and you end up with a corridor you resent.<br><br>If you cannot find that space, you are usually better served by a tall appliance cupboard or a dedicated pantry wall in the main kitchen. We would rather tell you that than sell you a room that annoys you every day.'],
        ['The second sink is the thing people keep', 'Ask anyone who has one what they would refuse to give up, and it is almost never the shelving. It is the second sink. It is what allows the main kitchen sink to stay empty and the bench to stay clear while cooking is actually happening.<br><br>If plumbing to that wall is straightforward, we will almost always recommend it. If the wall is on the far side of the house, we will show you what it costs before you decide rather than quietly leaving it out.'],
        ['What it costs', 'A compact walk-through with open shelving and a laminate bench starts around $4,000 added to a kitchen. A full second kitchen — second sink, dishwasher, stone benchtop, floor-to-ceiling joinery and a concealed door — typically runs $10,500 to $19,500. A scullery that is genuinely a room of its own, with a second oven and a window, starts around $19,500.<br><br>Those figures assume it is built alongside a new kitchen. Retrofitting into a finished house costs more, because it is a building job before it is a joinery one.'],
        ['When to say no', 'Skip it if you cannot make the clearances, if plumbing is genuinely expensive to run, or if the space would come out of a kitchen that is already tight. A cramped butler’s pantry attached to a compromised kitchen is worse than a generous kitchen with good tall storage.<br><br>It is also worth being honest about how you cook. A butler’s pantry earns its keep in a household that entertains and cooks daily. In a house of two who eat simply, that money often does more in better hardware and a better benchtop.'],
      ],
      faq: [
        { q: 'How much space does a butler’s pantry need?', a: 'About 1.1 metres of clear floor between benches and roughly 2.4 metres of run. Below that it stops functioning as a working room — two people cannot pass and appliance doors block the aisle. If you cannot achieve it, a tall appliance cupboard in the main kitchen is the better answer.' },
        { q: 'Does a butler’s pantry add value to a house?', a: 'In the current market it is one of the most requested features, so it helps a listing. But it adds value through the kitchen it protects rather than on its own — a butler’s pantry attached to a poor kitchen does very little. Get the kitchen right first.' },
        { q: 'Do I need plumbing in it?', a: 'Not strictly, but the second sink is the feature owners say they would never give up. If the plumbing run is straightforward we recommend it nearly every time. If it is expensive we will price it separately so you can make the call with the number in front of you.' },
      ],
    },
    {
      slug: 'benchtops-compared',
      answer: 'Porcelain and sintered stone are the most durable — heat resistant, UV stable and non-porous, which is what matters in a Central Queensland kitchen. Engineered stone is the common upgrade and adds roughly $1,750 on a compact run. Laminate is included and better than its reputation. Natural marble is the most beautiful and the least forgiving.',
      inlineCta: {
        after: 3,
        eyebrow: 'Seen enough',
        title: 'What each one does to the price.',
        body: 'Three collections with real numbers against them, and a calculator you can put your own run length into. No email required.',
        label: 'See the price bands',
        href: '/investment',
      },
      cta: {
        eyebrow: 'Benchtops',
        title: 'Hold the samples<br><span class="italic" style="color:var(--brass-lite)">before you choose.</span>',
        body: 'Photographs lie about stone. We bring real offcuts to your kitchen so you see them in your own light, next to your own floor. Free, and yours to keep whatever you decide.',
        image: 'detail-stone-black',
        alt: 'Stone benchtop detail showing a mitred edge',
      },
      nav: 'Kitchen benchtops compared',
      title: 'Kitchen Benchtops Compared | Cost & Durability | Bilt & Co',
      desc: 'Laminate, engineered stone, porcelain, sintered stone and natural marble compared on cost, heat, stains and how each behaves in a Queensland kitchen.',
      h1: 'Benchtops,<br><span class="italic brass">compared honestly.</span>',
      lede: 'The largest surface in the room, the one that takes the abuse, and the single choice that moves your price most.',
      img: 'island-marble-close',
      alt: 'Stone benchtop detail showing a mitred edge',
      read: '7 min read',
      sections: [
        ['Laminate', 'Included in every collection, and better than its reputation. Modern laminates hold their colour, come in convincing stone and timber looks, and survive normal use for years.<br><br>Where it fails: heat and water at the edges. A hot pan will mark it permanently, and if water gets into a joint or an unsealed cut-out the substrate swells and there is no repair. In a rental or a secondary dwelling it is often exactly the right choice. In a kitchen you intend to keep for twenty years it is a compromise you will notice.'],
        ['Engineered stone', 'The default upgrade, and adds around $1,750 on a compact run. Non-porous, consistent in appearance, and available in patterns that look like natural stone without natural stone’s variation.<br><br>Two things to know. It is not heatproof — a pan straight off the cooktop can mark it. And be aware that engineered stone containing crystalline silica has been the subject of significant regulatory change in Australia on worker-safety grounds; ask your supplier what they are actually selling you and how it is fabricated.'],
        ['Porcelain and sintered stone', 'Our recommendation for most Central Queensland kitchens. Heat resistant to a degree the others are not, UV stable so it will not shift colour in a room that gets afternoon sun, non-porous, and extremely hard.<br><br>The trade-offs are cost and edges. It is dearer than engineered stone, and because the pattern is often surface-printed, a mitred edge needs to be done well or the join reads. Ask to see a mitred sample rather than a flat one.'],
        ['Natural stone — marble and granite', 'The most beautiful and the least forgiving. Marble is porous, etches with anything acidic, and will develop a patina whether or not you wanted one. Granite is far harder and more practical but has fallen out of fashion in a way that has nothing to do with performance.<br><br>Choose marble with your eyes open. People who love it accept the marks as character. People who wanted it to stay pristine are unhappy within a year. We will show you an aged sample, not just a polished one, before you sign.'],
        ['What we would actually specify', 'For a rental or a granny flat: laminate, and put the saving into hardware. For a family kitchen that will be used hard: porcelain or sintered stone. For a kitchen where appearance leads and the owner understands the trade-off: natural marble on the island, something tougher on the working runs.<br><br>That last combination is more common than people expect, and it is often the sensible answer — the beautiful stone where it is seen, the practical stone where the cooking happens.<br><br>Which stone reads as current is a separate question from which one lasts, and <a href="guide-kitchen-colours-2026.html" style="color:var(--brass)">the 2026 colours and materials guide</a> covers it.'],
      ],
      faq: [
        { q: 'What is the most durable kitchen benchtop?', a: 'Porcelain and sintered stone. They are heat resistant, UV stable, non-porous and extremely hard, which makes them the best performers in a Queensland kitchen that gets afternoon sun. They cost more than engineered stone and the mitred edges need to be well made.' },
        { q: 'How much does a stone benchtop add?', a: 'Engineered stone adds roughly $1,750 on a compact run, with porcelain and sintered stone above that and natural marble or granite above again. On a larger kitchen the gap widens, because you are paying per square metre of slab.' },
        { q: 'Can you put a hot pan on engineered stone?', a: 'No. Engineered stone is not heatproof and a pan straight off the cooktop can mark it permanently. Porcelain and sintered stone handle heat far better. If you are a cook who moves pans directly to the bench, that difference should decide your choice.' },
        { q: 'Does marble stain?', a: 'Marble is porous and etches with anything acidic — lemon, wine, vinegar — regardless of sealing. It develops a patina. Owners who love marble accept that as character; owners who expected it to stay pristine are usually unhappy. We show clients an aged sample before they commit.' },
      ],
    },
    {
      slug: 'kitchen-layouts',
      answer: 'The room decides, not preference. Australian kitchens work to a bench height of about 900mm and a depth of 600mm, and you need 1,000mm clear between opposing runs — 1,200mm where people walk past. An island needs 1,000mm on every side, so roughly 3.6 metres of room width before it is possible. Measure first; that usually eliminates two of the four layouts immediately.',
      inlineCta: {
        after: 4,
        eyebrow: 'Before you commit to a shape',
        title: 'We measure the room, free.',
        body: 'Clearances are decided by what is actually there, not by a plan. A site measure, a 3D design and a fixed quote, yours to keep either way.',
        label: 'Book a site measure',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Layouts',
        title: 'Measure the room first.<br><span class="italic" style="color:var(--brass-lite)">Then choose the shape.</span>',
        body: 'Apply the clearances and two of the four layouts usually rule themselves out. That is a far better starting point than a mood board, and it costs nothing to find out.',
        image: 'galley-stone',
        alt: 'Galley kitchen with stone benchtop',
      },
      nav: 'Kitchen layouts compared',
      title: 'Kitchen Layouts Compared | Galley, L, U, Island | Bilt & Co',
      desc: 'Galley, L-shaped, U-shaped and island kitchens compared on clearances, cost and which room each one actually suits.',
      h1: 'Four layouts,<br><span class="italic brass">and the room each suits.</span>',
      lede: 'Layout costs nothing to get right at drawing stage and a great deal to get wrong. It is the most valuable decision in the whole project.',
      img: 'openplan-long',
      alt: 'Open plan kitchen with a long island bench',
      read: '6 min read',
      sections: [
        ['The clearances that decide everything', 'Before the shapes, the numbers. Australian kitchens work to a bench height of about <strong>900mm</strong> and a depth of <strong>600mm</strong>, with overheads <strong>600 to 750mm</strong> above the bench.<br><br>The one that matters most is aisle width. <strong>1,000mm is the practical minimum</strong> between opposing runs, and <strong>1,200mm</strong> is where a kitchen starts to feel generous and two people stop colliding. If a layout cannot give you 1,000mm, it is the wrong layout for that room regardless of how good it looks on a plan.'],
        ['Galley', 'Two parallel runs. The most efficient layout that exists in terms of work per step, and the cheapest per metre of storage, which is why it dominates apartments, granny flats and tiny homes.<br><br>It needs that 1,000mm aisle and it does not tolerate through-traffic. If the galley is also the path to the back door, it will be a nuisance forever. Best in a room with one entrance.'],
        ['L-shaped', 'Two runs meeting in a corner. The most common domestic layout in Australia, and for good reason — it opens to a dining space, keeps traffic out of the working zone, and adapts to almost any room.<br><br>Its weakness is the corner, which wastes roughly half a cabinet unless you address it. A blind-corner pull-out or a carousel turns that dead space into the most useful storage in the kitchen, and it is the fit-out option we recommend more than any other.'],
        ['U-shaped', 'Three runs. The most storage and bench you can fit in a given footprint, and excellent for a serious cook because everything is within a step.<br><br>It needs width — you are managing two aisles, not one — and it can feel enclosed if the third run is solid to the ceiling. Two corners means two corner solutions, so budget for them.<br><br>If the room will not take a third run, the storage you wanted is often better found behind a door: <a href="guide-butlers-pantry-worth-it.html" style="color:var(--brass)">whether a butler&rsquo;s pantry is worth it</a> walks through the clearances.'],
        ['Island', 'Any of the above with a freestanding bench. What most people picture when they picture a new kitchen, and the layout that most often will not fit. <a href="kitchen-islands.html" style="color:var(--brass)">What an island actually needs</a> covers the clearances in full.<br><br>An island needs <strong>1,000mm clear on every side you use</strong>, and 1,200mm where people sit. Add the island depth and you need roughly 3.6 metres of room width before an island is comfortable. Below that, a peninsula does the same social job without the pinch points. Islands also carry cost beyond the cabinetry — power, and often plumbing.'],
        ['How to choose', 'Measure the room and apply the clearances first. That usually eliminates two of the four immediately, which is a far better starting point than a mood board.<br><br>Then ask how many people cook at once. One cook is well served by a galley or an L. Two need the wider aisles of a U or an island. Then ask where people stand when they are not cooking, because that is what an island really solves — it is a social answer more than a storage one.'],
      ],
      faq: [
        { q: 'What is the minimum space for a kitchen island?', a: 'Allow 1,000mm clear on every side you use and 1,200mm where people will sit. With a 900mm island that means roughly 3.6 metres of room width before it is comfortable. Below that a peninsula gives you the same social benefit without the pinch points.' },
        { q: 'Which kitchen layout is cheapest?', a: 'A galley, per metre of storage. Two straight runs, no corners to solve and no island to power or plumb. It is why galleys dominate granny flats, apartments and tiny homes — the layout is efficient before you have spent anything on finishes.' },
        { q: 'How wide should a kitchen aisle be?', a: '1,000mm is the practical minimum between opposing runs. 1,200mm is where it stops feeling tight and two people can work without colliding. If a layout cannot give you 1,000mm, it is the wrong layout for that room.' },
        { q: 'What do I do about the corner in an L-shaped kitchen?', a: 'A blind-corner pull-out or a carousel. An unaddressed corner wastes roughly half a cabinet — you can reach the front of it and nothing else. It is the fit-out option we recommend most, because it creates storage you do not currently have rather than making existing storage easier to reach.' },
      ],
    },
  ];

  /* Caloundra: a SUPPLY page, not a location page. Bilt & Co is Rockhampton
     based and does not install on the Sunshine Coast, so the suburb template
     with its "no travel loading" and weekly site measures would be false
     here. Supply delivered assembled is genuinely available today, which is
     what this page sells. Its Service node names supply only and the global
     areaServed GeoCircle is untouched. */
  const caloundraFaq = [
    { q: 'Do you install kitchens in Caloundra?', a: 'Not yet. We are based in Rockhampton and our installation team works Central Queensland. What we can do on the Sunshine Coast today is supply — we design the kitchen, and it arrives assembled for your builder, cabinetmaker or installer to fit. Full design-and-install on the Sunshine Coast is planned, and registering your interest is what tells us when to move.' },
    { q: 'How does supply-only work from 500km away?', a: 'The same way it works for the builders we already supply. We design to your measurements, you confirm the drawings, and the cabinetry is delivered assembled — not flat packed in cartons. Your installer fits it. We provide the service drawings so your plumber and electrician know exactly where everything lands.' },
    { q: 'Can I get a quote if I am on the Sunshine Coast?', a: 'Yes. Send us the room dimensions and photographs and we will quote the supply, fixed and itemised, including delivery. What we will not do is quote you for an installation we cannot stand behind.' },
    { q: 'When will you install on the Sunshine Coast?', a: 'When there is enough work there to justify it, which is genuinely what the enquiries on this page decide. We would rather tell you that plainly than put a page up pretending we already have a team on the Coast.' },
  ];

  const caloundra = {
    file: 'kitchens-caloundra.html',
    service: {
      name: 'Kitchen supply and delivery to Caloundra and the Sunshine Coast',
      type: 'Kitchen supply and delivery',
      desc: 'Cabinetry designed in Rockhampton and delivered assembled to Caloundra and the Sunshine Coast, fitted by your own builder or installer.',
      areas: ['Caloundra', 'Sunshine Coast'],
    },
    title: 'Kitchens Caloundra & Sunshine Coast | Supply & Delivery | Bilt & Co',
    desc: 'Bilt & Co supplies kitchens to Caloundra and the Sunshine Coast, delivered assembled and fitted by your builder. Design and full installation coming.',
    og: 'openplan-long',
    trail: [['index.html', 'Home'], ['kitchens.html', 'Kitchens'], ['kitchens-caloundra.html', 'Caloundra']],
    faq: caloundraFaq,
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['kitchens.html', 'Kitchens'], ['#', 'Caloundra']])}
        <span class="pill">Supply and delivery available now — installation coming</span>
        <h1 class="d1" style="font-size:clamp(2.1rem,4.6vw,3.6rem)">Caloundra, we supply.<br><span class="italic brass">We do not install yet.</span></h1>
        <p class="lede">Most companies would put up a page here claiming to serve the Sunshine Coast. We are in Rockhampton, five hundred kilometres north, and we would rather tell you exactly what we can and cannot do.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Get a supply quote</a>
          <a class="btn btn--ghost btn--lg" href="investment.html">See the price bands</a>
        </div>
      </div>
      <div>${frame('openplan-long', 'Open plan kitchen with a long island bench, supplied assembled', 'wide', { eager: true })}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split" style="align-items:start">
      <div>
        <div ${rv()} style="margin-bottom:2.25rem">
          <h2 class="d3">What we can do on the Sunshine Coast today</h2>
          <p class="mt-1 muted">We design your kitchen to your measurements, and it is delivered to Caloundra assembled — carcasses built, hardware fitted, doors hung. Your builder, cabinetmaker or installer fits it. This is not a compromise arrangement invented for the Coast; it is exactly what we already do for the tiny home and granny flat builders we supply, and it is set out on our <a href="trade.html" style="color:var(--brass)">trade page</a>.</p>
        </div>
        <div ${rv()} data-rv-d="2" style="margin-bottom:2.25rem">
          <h2 class="d3">What we will not pretend</h2>
          <p class="mt-1 muted">We do not have an installation team on the Sunshine Coast. We cannot site measure your kitchen this week, and we will not quote you a fixed install price for work we would have to subcontract to someone we have never worked with. Every other page on this site promises our own employed installers. That promise does not currently reach Caloundra, so we are not making it.</p>
        </div>
        <div ${rv()} data-rv-d="3" style="margin-bottom:2.25rem">
          <h2 class="d3">Why Caloundra specifically</h2>
          <p class="mt-1 muted">Family. The Sunshine Coast is where Bilt &amp; Co expects to open a second base, and Caloundra is where that starts. Until there is enough work on the Coast to put an installer there permanently, supply is the honest offer — and the enquiries that come through this page are genuinely what decides the timing.</p>
        </div>
        <div ${rv()} data-rv-d="1">
          <h2 class="d3">If you want the full service now</h2>
          <p class="mt-1 muted">Then you want a Sunshine Coast company, and we would say so at the first phone call rather than the third. If you are in Central Queensland, everything on this site applies to you in full — <a href="kitchens.html" style="color:var(--brass)">Rockhampton</a>, <a href="kitchens-yeppoon.html" style="color:var(--brass)">Yeppoon</a>, <a href="kitchens-gracemere.html" style="color:var(--brass)">Gracemere</a> and the <a href="kitchens-capricorn-coast.html" style="color:var(--brass)">Capricorn Coast</a>.</p>
        </div>
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">Sunshine Coast</span>
          <div class="tier__price" style="font-size:clamp(1.5rem,2.4vw,2rem)">Supply only<small>Delivered assembled</small></div>
          <ul>
            <li>Designed to your measurements</li>
            <li>Delivered assembled, not flat packed</li>
            <li>Full service drawings for your trades</li>
            <li>Fixed, itemised supply quote including delivery</li>
            <li>Blum hardware and moisture-resistant carcasses</li>
            <li>Ten-year warranty on the cabinetry we supply</li>
            <li class="no">Installation not included — not yet</li>
          </ul>
          <a class="btn btn--block" href="contact.html">Register interest</a>
        </div>
        <p class="small muted mt-2">Not sure how the install side works? <a href="/guide-how-to-install-a-supplied-kitchen" style="color:var(--brass)">How to get a supplied kitchen installed</a> — the three trades, the order, and the paperwork.</p>
      </div>
    </div>
  </section>

  ${faqBlock(caloundraFaq, 'Caloundra and the Sunshine Coast — questions')}
  ${ctaBand({ eyebrow: 'Sunshine Coast', title: 'Tell us what you are building.<br><span class="italic" style="color:var(--brass-lite)">We will tell you what we can do.</span>', body: 'A fixed supply quote, delivered assembled to Caloundra, with nothing hidden in it. If you need installation as well, we will say so plainly rather than take the job and work it out later.' })}
`,
  };

  /* Supply-tier towns. Beyond the installation boundary, so these pages sell
     supply delivered assembled and state plainly that installation is not
     offered. Modelled on the Caloundra page. */
  function supplyPage(slug, place, opts) {
    const { blurb, image, alt, distance, towns } = opts;
    const faq = [
      { q: `Do you install kitchens in ${place}?`, a: `No. Our installation team works Central Queensland, within about 150 kilometres of Rockhampton, and ${place} is beyond that. What we do offer is supply — we design the kitchen and it arrives assembled for your builder, cabinetmaker or installer to fit. We would rather say that plainly than take the job and subcontract it to someone we have never worked with.` },
      { q: `How does supply-only work from ${distance} away?`, a: `The same way it works for the builders we already supply. We design to your measurements, you confirm the drawings, and the cabinetry is delivered assembled — carcasses built, hardware fitted, doors hung. Your installer fits it. You get a full set of service drawings so your plumber and electrician know exactly where everything lands.` },
      { q: `Can I get a fixed quote in ${place}?`, a: `Yes. Send the room dimensions, photographs and your appliance models and we will quote the supply, fixed and itemised, including delivery to ${place}. What we will not do is quote you for an installation we cannot stand behind.` },
      { q: `Is it flat packed?`, a: `No. It arrives assembled. You or your installer are fitting a kitchen, not building one on the floor first. Allow for the space that takes — assembled cabinetry needs more room to store than cartons do.` },
      { q: `Will you ever install in ${place}?`, a: `Only if there is enough work there to put a team on properly. The enquiries through this page are genuinely what decides that. Until then, supply is the honest offer.` },
    ];
    // 'the Whitsundays' -> title 'Kitchens Whitsundays', H1 'The Whitsundays, we supply.'
    const bare = place.replace(/^the /, '');
    const Place = place.charAt(0).toUpperCase() + place.slice(1);
    return {
      file: `kitchens-${slug}.html`,
      service: {
        name: `Kitchen supply and delivery to ${place}`,
        type: 'Kitchen supply and delivery',
        desc: `Cabinetry designed in Rockhampton and delivered assembled to ${place}, fitted by your own builder or installer.`,
        areas: towns || [place],
      },
      title: `Kitchens ${bare} | Supply & Delivery | Bilt & Co`,
      desc: `Bilt & Co supplies kitchens to ${place}, delivered assembled and fitted by your builder. Designed in Rockhampton, fixed itemised quotes including delivery.`,
      og: image,
      priority: '0.6',
      faq,
      trail: [['index.html', 'Home'], ['kitchens.html', 'Kitchens'], [`kitchens-${slug}.html`, Place]],
      body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['kitchens.html', 'Kitchens'], ['#', Place]])}
        <span class="pill">Supply and delivery — installation not offered here</span>
        <h1 class="d1" style="font-size:clamp(2.1rem,4.6vw,3.6rem)">${Place}, we supply.<br><span class="italic brass">Your installer fits it.</span></h1>
        <p class="lede">${blurb}</p>
        <div class="answer"><p class="eyebrow">The short answer</p><p>We are in Rockhampton, ${distance} away. Our installers do not work ${place}, and we will not pretend otherwise. What we can do is design your kitchen and deliver it assembled for your own builder to fit — which is already what we do for the tiny home and granny flat builders we supply.</p></div>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="/contact">Get a supply quote</a>
          <a class="btn btn--ghost btn--lg" href="/investment">See the price bands</a>
        </div>
      </div>
      <div>${frame(image, alt, 'wide', { eager: true })}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split" style="align-items:start">
      <div>
        <div ${rv()} style="margin-bottom:2.25rem">
          <h2 class="d3">What arrives in ${place}</h2>
          <p class="mt-1 muted">Carcasses built, hardware fitted, doors hung and adjusted, benchtop templated to your drawings. Not cartons. Your installer is fitting a kitchen rather than assembling one on the floor of a house that is still being finished — which is the point in a build where nobody has time or patience left.</p>
        </div>
        <div ${rv()} data-rv-d="2" style="margin-bottom:2.25rem">
          <h2 class="d3">Drawings your trades can work from</h2>
          <p class="mt-1 muted">A full set of service drawings showing where every waste, water point and power outlet needs to land, dimensioned. Hand them to your plumber and electrician before they rough in. Services roughed in to a guess is where supply jobs lose money, and it is entirely avoidable.</p>
        </div>
        <div ${rv()} data-rv-d="3" style="margin-bottom:2.25rem">
          <h2 class="d3">Who this suits</h2>
          <p class="mt-1 muted">Builders and owner-builders who have their own crew. Investors renovating from a distance. Anyone already managing trades who needs the cabinetry handled properly rather than a company to manage the whole job. If you want design and installation under one roof, you want a ${place} company, and we would say so on the first call.</p>
        </div>
        <div ${rv()}>
          <h2 class="d3">The same kitchen, minus one line</h2>
          <p class="mt-1 muted">Same 18mm moisture-resistant carcasses, same Blum soft-close hardware, same laser-bonded edging, same ten-year warranty on the cabinetry. Supply is not a lesser product for people who could not afford the real one — it is the same kitchen without our installation labour on the invoice. See <a href="/owner-builder-kitchen-supply" style="color:var(--brass)">owner-builder supply</a> for how it works end to end.</p>
        </div>
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">${place}</span>
          <div class="tier__price" style="font-size:clamp(1.5rem,2.4vw,2rem)">Supply only<small>Delivered assembled</small></div>
          <ul>
            <li>Designed to your measurements</li>
            <li>Delivered assembled, not flat packed</li>
            <li>Full service drawings for your trades</li>
            <li>Fixed, itemised quote including delivery</li>
            <li>Blum hardware, moisture-resistant carcasses</li>
            <li>Ten-year warranty on the cabinetry</li>
            <li class="no">Installation not offered in ${place}</li>
          </ul>
          <a class="btn btn--block" href="/contact">Get a supply quote</a>
        </div>
        ${opts.council ? `<p class="small muted mt-2">Building a second dwelling here? <a href="${opts.council[0]}" style="color:var(--brass)">${opts.council[1]}</a>.</p>` : ''}
        <p class="small muted mt-2">Not sure how the install side works? <a href="/guide-how-to-install-a-supplied-kitchen" style="color:var(--brass)">How to get a supplied kitchen installed</a> — the three trades, the order, and the paperwork.</p>
      </div>
    </div>
  </section>

  ${faqBlock(faq, `${place} — questions`)}
  ${ctaBand({ eyebrow: place, title: 'Send us the dimensions.<br><span class="italic" style="color:var(--brass-lite)">We will send back a number.</span>', body: `A fixed, itemised supply quote delivered to ${place}, with nothing hidden in it. If you need installation as well, we will tell you plainly rather than take the job and work it out afterwards.` })}
`,
    };
  }

  const supplyPages = [
    supplyPage('brisbane', 'Brisbane', {
      distance: 'about 600 kilometres', image: 'glossy-dark',
      alt: 'Contemporary dark kitchen with island, supplied assembled to Brisbane',
      towns: ['Brisbane', 'Logan', 'Ipswich', 'Moreton Bay', 'Redland'],
      blurb: 'Brisbane has no shortage of kitchen companies, and we are not pretending to be one of them. What we offer here is supply — designed in Rockhampton, delivered assembled, fitted by your own builder.',
    }),
    supplyPage('whitsundays', 'the Whitsundays', {
      council: ['/guide-granny-flat-rules-whitsunday-regional', 'What Whitsunday Regional Council needs you to check'],
      distance: 'about 430 kilometres', image: 'island-marble-brass',
      alt: 'Bright coastal kitchen with stone island, Whitsundays',
      towns: ['Airlie Beach', 'Cannonvale', 'Proserpine', 'Bowen', 'Whitsundays'],
      blurb: 'Airlie Beach and the coast run on tourism, and a second dwelling here is as often a holiday let as a family flat. We supply the kitchen delivered assembled; your local installer fits it.',
    }),
    supplyPage('mackay', 'Mackay', {
      council: ['/guide-granny-flat-rules-mackay-regional', 'What Mackay Regional Council needs you to check'],
      distance: 'about 330 kilometres', image: 'dark-luxe-bar',
      alt: 'Dark contemporary kitchen with island and integrated appliances, Mackay',
      towns: ['Mackay', 'Sarina', 'Walkerston', 'Mirani'],
      blurb: 'Mining, sugar and a steady renovation market. We supply Mackay builders and owner-builders; we do not install there, and this page is about what we can actually do rather than what we would like to claim.',
    }),
    supplyPage('bundaberg', 'Bundaberg', {
      distance: 'about 290 kilometres', image: 'collection-marble-02',
      alt: 'Bright kitchen with stone benchtop and timber accents, Bundaberg',
      towns: ['Bundaberg', 'Bargara', 'Childers', 'Gin Gin'],
      blurb: 'Coastal, with a lot of older housing stock and a strong investment market. Supply delivered assembled suits both, provided you have your own installer.',
    }),
    supplyPage('emerald', 'Emerald', {
      distance: 'about 270 kilometres', image: 'matte-black-bank',
      alt: 'Matte black handleless kitchen, Emerald',
      towns: ['Emerald', 'Capella', 'Springsure', 'Sapphire', 'Rubyvale'],
      blurb: 'Central Highlands, where getting trades on site is the hard part and freight is normal. Assembled delivery removes one variable from a build that already has plenty.',
    }),
    supplyPage('blackwater', 'Blackwater', {
      distance: 'about 190 kilometres', image: 'galley-stone',
      alt: 'Compact galley kitchen with stone benchtop, Blackwater',
      towns: ['Blackwater', 'Bluff', 'Duaringa'],
      blurb: 'Mining town housing that turns over between tenants and gets used hard. Specify for the second tenant rather than the first, and have your own crew fit it.',
    }),
    supplyPage('moranbah', 'Moranbah', {
      council: ['/guide-granny-flat-rules-isaac-regional', 'What Isaac Regional Council needs you to check'],
      distance: 'about 380 kilometres', image: 'concrete-luxe',
      alt: 'Bright durable kitchen with stone island, Moranbah',
      towns: ['Moranbah', 'Dysart', 'Middlemount', 'Clermont'],
      blurb: 'Company and investment housing, hard use, and a long way from anywhere that sells cabinetry properly. Freight is a fact of life here; assembled delivery makes it less of one.',
    }),
    supplyPage('hervey-bay', 'Hervey Bay', {
      distance: 'about 400 kilometres', image: 'openplan-long',
      alt: 'Open plan coastal kitchen with long island, Hervey Bay',
      towns: ['Hervey Bay', 'Pialba', 'Urangan', 'Torquay', 'Maryborough'],
      blurb: 'Retirement and coastal renovation country, with a lot of downsizing and a lot of secondary dwellings. Supply suits an owner-builder or a local installer you already trust.',
    }),
  ];

  /* Segment x town. Targets "<segment> <town>", which neither the segment page
     nor the town page targets. Links up to both so the relationship is a
     hierarchy rather than a competition. */
  function comboPage(slug, opts) {
    const { place, h1, title, desc, lede, answer, price, range, image, alt,
            parentSeg, parentSegLabel, parentTown, parentTownLabel, sections, faq, council } = opts;
    return {
      file: `${slug}.html`,
      service: { name: title.split(' | ')[0], type: opts.serviceType, areas: [place] },
      title,
      desc,
      og: image,
      priority: '0.6',
      faq,
      trail: [['index.html', 'Home'], [parentSeg, parentSegLabel], [`${slug}.html`, place]],
      body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], [parentSeg, parentSegLabel], ['#', place]])}
        <span class="pill">${price} &middot; ${range}</span>
        <h1 class="d1" style="font-size:clamp(2.1rem,4.6vw,3.4rem)">${h1}</h1>
        <p class="lede">${lede}</p>
        <div class="answer"><p class="eyebrow">The short answer</p><p>${answer}</p></div>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="/contact">Get a fixed quote</a>
          <a class="btn btn--ghost btn--lg" href="${parentSeg}">How we build them</a>
        </div>
      </div>
      <div>${frame(image, alt, 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap split" style="align-items:start">
      <div class="legal">
        ${sections.map((sec, i) => `
        <div ${rv()} data-rv-d="${(i % 3) + 1}" style="margin-bottom:2.25rem">
          <h2 class="d3">${sec[0]}</h2>
          <p class="mt-1 muted">${sec[1]}</p>
        </div>`).join('')}
        <aside class="offer" ${rv()}>
          <div>
            <p class="eyebrow">${place}</p>
            <h3 class="d3">Send us the dimensions.</h3>
            <p class="mt-1 muted">Fixed and itemised, with nothing hidden in it. If the number does not work you owe us nothing and you keep the drawings.</p>
          </div>
          <a class="btn btn--lg" href="/contact">Get a fixed quote</a>
        </aside>
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">${place}</span>
          <div class="tier__price" style="font-size:clamp(1.5rem,2.4vw,2rem)">${price}<small>${range}</small></div>
          <ul>${opts.list.map((x) => `<li>${x}</li>`).join('')}</ul>
          <a class="btn btn--block" href="/contact">Get this priced</a>
        </div>
        <p class="small muted mt-2">More on <a href="${parentSeg}" style="color:var(--brass)">${parentSegLabel.toLowerCase()}</a> and on <a href="${parentTown}" style="color:var(--brass)">${parentTownLabel}</a>.${council ? ` Planning questions go to ${council}.` : ''}</p>
      </div>
    </div>
  </section>

  ${faqBlock(faq, `${place} — questions`)}
  ${ctaBand({ eyebrow: place, title: 'Tell us about the room.<br><span class="italic" style="color:var(--brass-lite)">We will tell you what fits.</span>', body: `A free site measure, a 3D design and a fixed quote for your ${place} project. Yours to keep whatever you decide.` })}
`,
    };
  }

  const LIVINGSTONE = '<a href="https://www.livingstone.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Livingstone Shire Council</a>';
  const ROCKY_C = '<a href="https://www.rockhamptonregion.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Rockhampton Regional Council</a>';
  const GLADSTONE_C = '<a href="https://www.gladstone.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">Gladstone Regional Council</a>';

  const comboPages = [
    comboPage('granny-flat-kitchens-yeppoon', {
      place: 'Yeppoon', serviceType: 'Granny flat kitchen installation',
      title: 'Granny Flat Kitchens Yeppoon | From $6,500 | Bilt & Co',
      desc: 'Kitchens for granny flats and secondary dwellings in Yeppoon and the Capricorn Coast, from $6,500. Built for Livingstone Shire approvals and coastal conditions.',
      h1: 'Granny flat kitchens<br><span class="italic brass">for the Capricorn Coast.</span>',
      lede: 'Secondary dwellings are common along this coast, and the two things that decide the kitchen are the council and the salt air.',
      answer: `A compliant secondary-dwelling kitchen in Yeppoon generally needs a sink, a cooking facility and a bench — a real kitchen, not a kitchenette. From $6,500 for a 2.4 metre run, installed by our own team. Yeppoon is Livingstone Shire, not Rockhampton, and that is who decides whether a secondary dwelling is permitted on your block.`,
      price: 'From $6,500', range: '2.4m – 3.0m run', image: 'galley-stone',
      alt: 'Compact galley kitchen with stone benchtop in a Yeppoon secondary dwelling',
      parentSeg: '/granny-flat-kitchens', parentSegLabel: 'Granny flat kitchens',
      parentTown: '/kitchens-yeppoon', parentTownLabel: 'kitchens in Yeppoon',
      council: LIVINGSTONE,
      list: ['2.4m to 3.0m runs, drawn to your dimensions', 'Moisture-resistant carcasses for coastal humidity', 'Blum hardware with a lifetime mechanical warranty', 'Stone, porcelain or laminate benchtop', 'Installed by our own team, forty minutes away', 'Ten-year warranty on cabinetry and workmanship'],
      sections: [
        ['Livingstone Shire, not Rockhampton', `This is the one that trips people up. Yeppoon, Cooee Bay, Lammermoor, Taranganba, Barmaryee, Zilzie and Emu Park are all ${LIVINGSTONE}, with their own planning scheme. Whether a secondary dwelling is permitted on your block, how big it can be, and whether it can be tenanted separately are all their decisions, not ours and not Rockhampton’s. Ask them before you spend anything — we cover what the classification means for the kitchen in <a href="/guide-class-1a-granny-flat-yeppoon" style="color:var(--brass)">our Class 1a guide</a>.`],
        ['Salt air is a specification problem', 'Coastal humidity and salt do two things to cabinetry: they get into unsealed board edges, and they corrode cheap hardware. Neither shows up in year one. We specify moisture-resistant carcasses and laser-bonded edging as standard, which matters more here than fifty kilometres inland, and we would not use unbranded runners on a coastal job at any price.'],
        ['Built for whoever lives there next', 'Secondary dwellings on this coast get used three ways — family, long-term tenant, or holiday letting — and they often change between them. Specify for the hardest of those and you never have to think about it again. If holiday letting is the plan, the brief changes again: see <a href="/short-stay-kitchens-capricorn-coast" style="color:var(--brass)">short-stay kitchens on the Capricorn Coast</a>.'],
      ],
      faq: [
        { q: 'Which council covers granny flats in Yeppoon?', a: 'Livingstone Shire Council, not Rockhampton Regional Council. Their planning scheme decides whether a secondary dwelling is permitted on your block and on what conditions. Confirm with them before committing to a design.' },
        { q: 'Does a granny flat in Yeppoon need a full kitchen?', a: 'If it is approved as a dwelling, it generally needs the facilities of one — a sink, a cooking facility and a bench. Your building certifier confirms the requirement against the approved classification.' },
        { q: 'How much is a granny flat kitchen in Yeppoon?', a: 'From about $6,500 for a 2.4 metre run and $7,700 for 3.0 metres, including carcasses, doors, Blum hardware and a benchtop. Yeppoon is inside our standard service area with no travel loading.' },
        { q: 'Do you install in Yeppoon yourself?', a: 'Yes. Our own employed team, forty minutes from Rockhampton. We do not subcontract Capricorn Coast work.' },
      ],
    }),

    comboPage('short-stay-kitchens-capricorn-coast', {
      place: 'the Capricorn Coast', serviceType: 'Short-stay kitchen installation',
      title: 'Airbnb & Short-Stay Kitchens Capricorn Coast | Bilt & Co',
      desc: 'Kitchens for holiday lets and short-stay properties on the Capricorn Coast. Built to photograph well, survive guests and handle coastal humidity.',
      h1: 'Holiday let kitchens<br><span class="italic brass">for the Capricorn Coast.</span>',
      lede: 'A beach-house kitchen is photographed more than it is cooked in, and used by people who have never seen it before. Both facts change the specification.',
      answer: `Coastal short-stay kitchens fail in two predictable ways: salt and humidity get into the carcass edges, and guests treat the hardware as if it were their own. Specify moisture-resistant board and full-extension Blum runners and most of it stops. From $6,500 for a 2.4 metre run, installed by our own team.`,
      price: 'From $6,500', range: '2.4m – 4.0m run', image: 'openplan-long',
      alt: 'Bright open plan coastal kitchen in a Capricorn Coast holiday let',
      parentSeg: '/short-stay-kitchens', parentSegLabel: 'Short-stay kitchens',
      parentTown: '/kitchens-capricorn-coast', parentTownLabel: 'kitchens on the Capricorn Coast',
      council: LIVINGSTONE,
      list: ['2.4m to 4.0m runs, drawn to your dimensions', 'Porcelain or sintered stone benchtop', 'Moisture-resistant carcasses for coastal air', 'Blum full-extension runners rated for guest handling', 'Layouts designed around turnover and cleaning', 'Installed by our own team, forty minutes away'],
      sections: [
        ['The listing photograph does the selling', 'Guests scroll. On this coast they are comparing your place against a dozen others with the same view, so the kitchen photograph is doing real work. That means uncluttered rather than expensive: full-height storage to hide the mess, an unbroken run of bench, and a splashback that does not fight the camera. We design knowing the first person to see it will see it at 400 pixels wide.'],
        ['Salt, humidity and people who do not live there', 'Three forces, all working on the same cabinetry. Coastal air gets into unsealed edges; guests shut soft-close drawers like ordinary ones; and turnover means it is cleaned harder and more often than a family kitchen. Moisture-resistant carcasses, laser-bonded edging and proper runners handle all three. This is not the room to save on hardware.'],
        ['Check the letting rules before the kitchen', `Short-stay letting on the Capricorn Coast is a planning matter for ${LIVINGSTONE}, and body corporate by-laws can override the answer where they apply. Confirm you are permitted to let the property before you spend on it — we can tell you what a kitchen costs, not whether you are allowed to run the business.`],
      ],
      faq: [
        { q: 'Do I need council approval to run an Airbnb on the Capricorn Coast?', a: 'Possibly, and it depends on the property and its approval. Short-stay accommodation is a planning matter for Livingstone Shire Council, and body corporate by-laws may also apply. Confirm before you invest in the fit-out.' },
        { q: 'What benchtop suits a coastal holiday let?', a: 'Porcelain or sintered stone. Heat resistant, non-porous and UV stable, which matters in a bright coastal room where a guest will eventually put a hot pan straight down.' },
        { q: 'How much is a short-stay kitchen on the Capricorn Coast?', a: 'From about $6,500 for a 2.4 metre run. Yeppoon, Emu Park and the surrounding coast are inside our standard service area with no travel loading.' },
      ],
    }),

    comboPage('under-house-kitchens-rockhampton', {
      place: 'Rockhampton', serviceType: 'Under-house kitchen installation',
      title: 'Under House Kitchens Rockhampton | High-Set Conversions | Bilt & Co',
      desc: 'Kitchens and kitchenettes for under-house conversions in Rockhampton high-set homes. Built for floors that are not level and walls that are not square.',
      h1: 'Under-house kitchens<br><span class="italic brass">in a high-set Queenslander.</span>',
      lede: 'Enclosing underneath is the most common second-space project in this city. It is also the one where the plan and the reality differ most.',
      answer: `Under-house conversions are measured, not assumed — the floors are rarely level and the walls are rarely square, so cabinetry is scribed to what is actually there. A kitchenette starts at $4,500 and a full secondary-dwelling kitchen at $6,500. Whether the space can become habitable is a certifier and Rockhampton Regional Council question, and worth answering first.`,
      price: 'From $4,500', range: 'Kitchenette to full kitchen', image: 'detail-black-cabinetry',
      alt: 'Compact under-house kitchen with dark cabinetry, Rockhampton',
      parentSeg: '/kitchenettes', parentSegLabel: 'Kitchenettes',
      parentTown: '/kitchens', parentTownLabel: 'kitchens in Rockhampton',
      council: ROCKY_C,
      list: ['Scribed to floors and walls as they actually are', 'Kitchenette from $4,500, full kitchen from $6,500', 'Moisture-resistant carcasses throughout', 'Removable kickboards where flooding is a risk', 'Service drawings for your plumber and electrician', 'Installed by our own team'],
      sections: [
        ['Nothing under a Queenslander is square', 'These houses have moved for a century, and they are still moving. Floors slope, wall studs wander, and the concrete slab poured underneath is rarely flat to the tolerance cabinetry assumes. We measure what is there and scribe to it rather than trusting the plan, which is why we site measure rather than working from your dimensions on this particular job type.'],
        ['Habitable is a classification, not a decision', `Enclosing underneath to make a living space is a change of building classification, and it is assessed as building work — ceiling height, ventilation, natural light, egress and services all come into it. Ask a building certifier and ${ROCKY_C} before you buy anything. Our <a href="/guide-do-i-need-approval-kitchen-renovation" style="color:var(--brass)">approvals guide</a> covers what triggers what.`],
        ['Assume it will get wet at some point', 'This is Rockhampton and that space is at ground level. Specify so it can be dried out rather than replaced: moisture-resistant carcasses throughout, removable kickboards instead of a sealed plinth, drawers rather than low cupboards so contents sit higher. It costs very little extra now and changes what happens after the next event. More in our <a href="/guide-flood-damage-kitchen-replacement-rockhampton" style="color:var(--brass)">flood rebuild guide</a>.'],
        ['Kitchenette or full kitchen', 'If nobody will cook a proper meal down there, a kitchenette from $4,500 is the honest answer. If it is becoming a self-contained dwelling, it generally needs a real kitchen and the classification will say so. We will tell you which you are looking at before you commit to either.'],
      ],
      faq: [
        { q: 'Can I put a kitchen under my Queenslander?', a: 'Usually, but making the space habitable is a change of building classification and is assessed as building work. Talk to a building certifier and Rockhampton Regional Council before you spend. The cabinetry is the straightforward part.' },
        { q: 'How much is an under-house kitchen in Rockhampton?', a: 'A kitchenette starts around $4,500 and a full secondary-dwelling kitchen around $6,500. The variable is usually the building work around it rather than the cabinetry.' },
        { q: 'Do you site measure under-house conversions?', a: 'Always, on this job type. Floors are rarely level and walls are rarely square in a high-set home, so we measure what is actually there and scribe the cabinetry to it.' },
        { q: 'What if the space has flooded before?', a: 'Tell us. We specify differently — moisture-resistant carcasses throughout, removable kickboards, drawers rather than low cupboards. It costs little extra and it is the difference between drying a kitchen out and replacing it.' },
      ],
    }),

    comboPage('granny-flat-kitchens-gladstone', {
      place: 'Gladstone', serviceType: 'Granny flat kitchen installation',
      title: 'Granny Flat Kitchens Gladstone | From $6,500 | Bilt & Co',
      desc: 'Kitchens for granny flats and secondary dwellings in Gladstone, from $6,500. Specified for rental turnover and installed by our own team.',
      h1: 'Granny flat kitchens<br><span class="italic brass">in Gladstone.</span>',
      lede: 'A lot of Gladstone secondary dwellings are built to be let, not lived in by family. That changes what the kitchen has to survive.',
      answer: `From $6,500 for a 2.4 metre run, installed by our own team — Gladstone is inside our installation area. Whether you can let a secondary dwelling separately is a Gladstone Regional Council planning question and worth settling before you design anything.`,
      price: 'From $6,500', range: '2.4m – 3.0m run', image: 'matte-black-bank',
      alt: 'Compact handleless kitchen in a Gladstone secondary dwelling',
      parentSeg: '/granny-flat-kitchens', parentSegLabel: 'Granny flat kitchens',
      parentTown: '/kitchens-gladstone', parentTownLabel: 'kitchens in Gladstone',
      council: GLADSTONE_C,
      list: ['2.4m to 3.0m runs, drawn to your dimensions', 'Specified for tenant turnover, not first impressions', 'Moisture-resistant carcasses, laser-bonded edging', 'Blum hardware with a lifetime mechanical warranty', 'Installed by our own team', 'Ten-year warranty on cabinetry and workmanship'],
      sections: [
        ['An industrial city rents differently', 'Gladstone housing turns over with the projects, and a secondary dwelling here is often an income decision rather than a family one. That means the kitchen gets a new occupant more often than most, and the parts that fail are always the same three: glued edging, standard runners, and chipboard carcasses that swell at the first dripping tap. Spend there and keep the finishes simple.'],
        ['Settle the approval before the design', `Whether a secondary dwelling can be tenanted separately on your block is a ${GLADSTONE_C} planning matter, and some approvals restrict occupation to the household of the main dwelling. That single answer decides whether the project makes sense. Our guide on <a href="/guide-granny-flat-rent-rockhampton" style="color:var(--brass)">renting out a secondary dwelling</a> covers the questions to ask, and the same logic applies here.`],
        ['We install, we do not subcontract', 'Gladstone is inside our installation area and our own employed team does the work. We are about ninety minutes north, so we schedule site measures and installations together rather than dropping in — tell us your timing and we will confirm the next available visit.'],
      ],
      faq: [
        { q: 'Do you install granny flat kitchens in Gladstone?', a: 'Yes, with our own employed team. Gladstone is inside our installation area. We are about ninety minutes away, so we schedule site measures and installs together rather than attending ad hoc.' },
        { q: 'Can I rent out a granny flat in Gladstone?', a: 'That depends on the approval attached to your property, and some are restricted to the household of the main dwelling. Ask Gladstone Regional Council before you budget on rental income.' },
        { q: 'How much is a granny flat kitchen in Gladstone?', a: 'From about $6,500 for a 2.4 metre run and $7,700 for 3.0 metres, including carcasses, doors, Blum hardware and a benchtop.' },
      ],
    }),

    comboPage('new-build-kitchens-gracemere', {
      place: 'Gracemere', serviceType: 'New build kitchen installation',
      title: 'New Build Kitchens Gracemere | Upgrade the Standard | Bilt & Co',
      desc: 'Upgrading from the builder&rsquo;s standard kitchen in a Gracemere new build. Fixed pricing, service drawings for your trades, delivered to your construction programme.',
      h1: 'The kitchen your builder<br><span class="italic brass">did not quote you.</span>',
      lede: 'Gracemere is one of the busiest new-build postcodes on our board, and the standard kitchen in most contracts is chosen to hit a price.',
      answer: `You can usually take the kitchen out of the builder’s contract as a provisional sum and have it done properly instead — but raise it early, ideally before the slab, while services can still move cheaply. From $15,000. Gracemere is fifteen minutes from us.`,
      price: 'From $15,000', range: 'Full kitchen, new build', image: 'collection-marble-01',
      alt: 'Open plan new build kitchen with island bench, Gracemere',
      parentSeg: '/new-build-kitchens', parentSegLabel: 'New build kitchens',
      parentTown: '/kitchens-gracemere', parentTownLabel: 'kitchens in Gracemere',
      council: ROCKY_C,
      list: ['Fixed, itemised pricing before you commit', 'Service drawings for your builder’s trades', 'Delivered to your construction programme', 'Blum hardware and moisture-resistant carcasses', 'Fifteen minutes from our door', 'Ten-year warranty on cabinetry and workmanship'],
      sections: [
        ['Raise it before the slab', 'The cheapest time to change a kitchen is before anything is poured. Power to an island, a second sink in a pantry, a water point for the fridge — all trivial while the plumber and electrician are still roughing in, all expensive afterwards. If your Gracemere build has not started, this is the conversation to have now rather than at handover.'],
        ['How the provisional sum usually works', 'Most build contracts carry the kitchen as an allowance. Speak to your builder about taking it out as a provisional sum and having it supplied separately — many are entirely comfortable with it, some are not, and it is a conversation worth having early rather than late. We provide the service drawings your builder’s trades need either way.'],
        ['Growing suburb, growing families', 'Gracemere builds tend to be family houses on generous blocks, which means the kitchen is doing real work rather than looking good in a display home. Storage that actually holds a week of shopping, a bin in the right place, and a bench you can put a hot tray on. That is a layout conversation before it is a finishes one.'],
      ],
      faq: [
        { q: 'Can I use my own kitchen supplier in a new build?', a: 'Usually, by taking the kitchen out of the contract as a provisional sum. Some builders are comfortable with it and some are not, so raise it early. We supply the service drawings your builder\'s trades need regardless.' },
        { q: 'When should I talk to you about a new build kitchen?', a: 'Before the slab if you can. Services in the middle of a floor are cheap to place and expensive to move, and the island is where that bites hardest.' },
        { q: 'How much to upgrade from the builder\'s standard kitchen?', a: 'From about $15,000 for our Essence collection. What you are comparing against is the allowance already in your contract, so the real number is often the difference rather than the whole amount.' },
      ],
    }),
  ];

  const guidePages = GUIDES.map((g) => ({
    file: `guide-${g.slug}.html`,
    title: g.title,
    desc: g.desc,
    og: g.img,
    preload: g.img,
    priority: '0.7',
    faq: g.faq,
    trail: [['index.html', 'Home'], ['guides.html', 'Guides'], [`guide-${g.slug}.html`, g.nav]],
    ld: [{
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.nav,
      description: g.desc,
      image: `${SITE.origin}/assets/img/${g.img}.jpg`,
      author: { '@type': 'Organization', name: SITE.name, '@id': `${SITE.origin}/#business` },
      publisher: { '@id': `${SITE.origin}/#business` },
      mainEntityOfPage: `${SITE.origin}/guide-${g.slug}.html`,
    }],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['guides.html', 'Guides'], ['#', g.nav]])}
        <span class="pill">${g.read}</span>
        <h1 class="d1" style="font-size:clamp(2.1rem,4.6vw,3.6rem)">${g.h1}</h1>
        <p class="lede">${g.lede}</p>
        ${g.answer ? `<div class="answer" ${rv()} data-rv-d="2"><p class="eyebrow">The short answer</p><p>${g.answer}</p></div>` : ''}
      </div>
      <div>${frame(g.img, g.alt, 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap">
      <div class="legal">
        ${g.sections.map((sec, i) => `
        <div ${rv()} data-rv-d="${(i % 3) + 1}">
          <h2 class="d3">${sec[0]}</h2>
          <p class="mt-1 muted">${sec[1]}</p>
        </div>${g.inlineCta && g.inlineCta.after === i ? `
        <aside class="offer" ${rv()}>
          <div>
            <p class="eyebrow">${g.inlineCta.eyebrow}</p>
            <h3 class="d3">${g.inlineCta.title}</h3>
            <p class="mt-1 muted">${g.inlineCta.body}</p>
          </div>
          <a class="btn btn--lg" href="${g.inlineCta.href || '/contact'}">${g.inlineCta.label}</a>
        </aside>` : ''}`).join('')}
      </div>
    </div>
  </section>

  ${g.note ? `<section class="section--tight"><div class="wrap"><div class="legal"><p class="small muted" style="border-left:1px solid var(--line);padding-left:1rem">${g.note}</p></div></div></section>` : ''}

  ${g.showCollections ? collectionsStrip : ''}

  ${faqBlock(g.faq, 'Common questions')}
  ${ctaBand(g.cta || { eyebrow: 'Put it to use', title: 'Reading is one thing.<br><span class="italic" style="color:var(--brass-lite)">Your room is another.</span>', body: 'Send us your dimensions and we will tell you what actually works in your space — and what it costs. Free, fixed, and yours to keep either way.' })}
`,
  }));

  const guidesHub = {
    file: 'guides.html',
    title: 'Kitchen Guides | Colours, Benchtops, Layouts | Bilt & Co',
    desc: 'Practical guides to planning a kitchen — 2026 colours and materials, benchtops compared, layouts and clearances, and whether a butler’s pantry is worth it.',
    og: 'joinery-sketch',
    preload: 'joinery-sketch',
    priority: '0.8',
    trail: [['index.html', 'Home'], ['guides.html', 'Guides']],
    ld: [{
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Kitchen guides',
      url: `${SITE.origin}/guides.html`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: GUIDES.map((g, i) => ({
          '@type': 'ListItem', position: i + 1, name: g.nav, url: `${SITE.origin}/guide-${g.slug}.html`,
        })),
      },
    }],
    body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['#', 'Guides']])}
        <h1 class="d1" style="font-size:clamp(2.25rem,5vw,4rem)">Everything we get<br><span class="italic brass">asked at the table.</span></h1>
        <p class="lede">Written from the questions clients actually put to us, answered the way we would answer them in your kitchen &mdash; including where the answer is &ldquo;do not do that&rdquo;.</p>
      </div>
      <div>${frame('joinery-sketch', 'Kitchen drawings and detail sketches', 'wide', { eager: true })}</div>
    </div>
  </section>

  ${trustStrip}

  <section class="section">
    <div class="wrap">
      <div class="grid cols-2">
        ${GUIDES.map((g, i) => `
        <a class="card" href="guide-${g.slug}.html" ${rv()} data-rv-d="${(i % 2) + 1}">
          ${frame(g.img, g.alt, 'wide')}
          <div class="card__body">
            <p class="card__price">${g.read}</p>
            <h2 class="d4">${g.nav}</h2>
            <p>${g.lede}</p>
            <span class="link-u mt-1">Read the guide &rarr;</span>
          </div>
        </a>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand({ eyebrow: 'Or just ask', title: 'Not finding<br><span class="italic" style="color:var(--brass-lite)">your question?</span>', body: 'Call the studio. We would rather talk it through than have you guess — and we will tell you honestly when the answer is that you should not spend the money.' })}
`,
  };

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
      ${SITE.ga4 ? `<p>This site carries <strong>no advertising pixel</strong> and we do not sell or share your details with advertisers. We do use <strong>Google Analytics</strong> to see which pages people find useful. It sets a cookie in your browser and tells Google your IP address, the pages you view and your approximate location. We have switched off Google Signals and ad personalisation, so your visit is not used to build an advertising profile of you.</p>
      <p>If you would rather not be counted, any tracker-blocking browser or extension will stop it, as will Google's own <a href="https://tools.google.com/dlpage/gaoptout" rel="nofollow noopener" target="_blank">opt-out add-on</a>. The site works exactly the same either way.</p>` : `<p>This site sets <strong>no tracking cookies</strong> and runs <strong>no analytics or advertising scripts</strong>. There is no Google Analytics, no advertising pixel and no third-party tracker on any page.</p>`}
      <p>${SITE.ga4 ? 'Besides Analytics, the third parties your browser contacts are' : 'The only third party your browser contacts is'} Google Fonts, which serves the typefaces, and Google Maps on the contact page, which loads only if you view that page. Both receive your IP address as a normal part of serving a request.</p>
      <!-- The wording above follows SITE.ga4 automatically, so it cannot go
           stale when analytics is switched on or off. An ad pixel would still
           need this section rewritten by hand. -->

      <h2 class="d3">Why we collect it</h2>
      <p>To answer your enquiry, prepare a design and a quote, and — if you go ahead — to design, build and install your kitchen. That is the whole purpose. We do not use your details for anything you did not contact us about.</p>

      <h2 class="d3">How your enquiry reaches us</h2>
      <p>When you submit an enquiry form, your answers are sent to <strong>Netlify Forms</strong>, the service that hosts this website, and stored there so we can read and reply to them. Netlify is a United States company, so your enquiry is stored overseas. Their privacy terms are at <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener">netlify.com/privacy</a>.</p>
      <p>We are notified by email when a form is submitted. Nothing you type is shared with anyone else.</p>


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

  return [home, kitchens, pantry, joinery, gallery, investment, process, studio, contact, ...areaPages, caloundra, ...supplyPages, ...comboPages, fitout, ...segmentPages, guidesHub, ...guidePages, privacy, thanks, notFound];
};
