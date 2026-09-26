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
      heading = 'Send us your rough measurements.<br>We&rsquo;ll send back a price.',
      sub = 'Five fields. We reply within one business day with a real number, not a "from" price.',
      cta = 'Get my free quote',
      ctaSub = 'No deposit &middot; No showroom visit &middot; No salesperson at your door',
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
        <div class="field"><label for="${id}-e">Email</label><input id="${id}-e" name="email" type="email" required autocomplete="email" placeholder="jane@example.com.au"></div>
        <div class="field"><label for="${id}-s">Suburb</label><input id="${id}-s" name="suburb" type="text" autocomplete="address-level2" placeholder="Frenchville"></div>
      </div>
      <div class="field"><label for="${id}-m">Rough measurements <span class="muted">(optional)</span></label><input id="${id}-m" name="message" type="text" placeholder="5.4m wall, 2.4m ceiling, window on the left"></div>
      <button class="btn btn--lg btn--block" type="submit">${cta}<span class="btn__sub">${ctaSub}</span></button>
      <p class="form__note">${svg.shield} Your details stay with our Rockhampton studio. We never sell or share them &mdash; see our <a href="privacy.html">privacy policy</a></p>
    </form>`;
  }

  const trustStrip = `<div class="trust">
    <div class="wrap trust__in">
      <span class="trust__i">${svg.check} Delivered assembled, doors adjusted</span>
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
        <div><dt class="tabnums">18mm</dt><dd>Moisture-resistant board</dd></div>
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
            <a class="btn btn--brass btn--lg btn--block" href="contact.html">Get my free quote<span class="btn__sub">No deposit &middot; No showroom visit &middot; No salesperson at your door</span></a>
            <a class="btn btn--light btn--lg btn--block" href="tel:${T}" style="margin-top:.75rem">Call ${SITE.phone}</a>
            <p class="small" style="color:#A39B8D;margin-top:1rem;text-align:center">Or see real prices first &mdash; <a href="investment.html" style="color:var(--brass-lite);text-decoration:underline">the 2026 price guide</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const GUARANTEES = [
    ['The price does not move', 'Once your design is signed off, the quote is fixed. We have never issued a surprise variation for our own scope of works. If we get a measurement wrong, we wear it.'],
    ['Assembled before it arrives', 'Carcasses built square, Blum hardware fitted, doors hung and adjusted to even gaps. On site it is fitted, not built — and Blum’s lifetime mechanical warranty sits on every hinge and runner.'],
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
          <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="3">Get my free quote</a>
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
      <div class="center mt-3" ${rv()}><a class="link-u" href="contact.html">Get my free quote &rarr;</a></div>
    </div>
  </section>`;

  const COLLECTIONS = [
    { no: '01', name: 'Essence', img: 'matte-black-bank', price: 'From $15,000',
      alt: 'Matte black handleless kitchen cabinetry with integrated appliances',
      copy: 'Handleless, quiet, exact. Soft-matte doors on Blum soft-close runners with a stone benchtop. Our entry to bespoke, drawn to your room rather than picked from a catalogue.' },
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
        <p class="muted" ${rv()} data-rv-d="2">Supplied and installed in Central Queensland; shipped flat pack or assembled anywhere in Australia. Every figure is a real range, not a from-price with the catches left out.</p>
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
    ['4', 'Made to your millimetres', 'Your cabinetry is manufactured to our specification and your measurements. It arrives assembled with doors hung and adjusted, or flat packed and labelled if you would rather build it — your call, both on the quote.'],
    ['5', 'Installed &amp; handed over', 'Seven to ten working days with one team and a written programme. Cleaned, adjusted, photographed and handed over with the drawings and paperwork.'],
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
              <a class="btn btn--light btn--lg" href="contact.html">Get my free quote</a>
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
    { q: 'Who makes the cabinetry?', a: 'It is manufactured to our specification and your measurements by the maker we have chosen and stay with, and delivered assembled or flat packed, whichever you order. We draw it, we specify every carcass, hinge and runner, we check each unit before it goes in, and we install it with our own team. If something is wrong, it is ours to fix and there is nobody for us to point at.' },
    { q: 'Do you service Yeppoon and the Capricorn Coast?', a: 'Yes — Yeppoon, Emu Park, Gracemere, Mount Morgan and the wider Capricorn Coast are inside our standard service area at no travel loading. We also work through Gladstone, Emerald and Blackwater on larger projects.' },
    { q: 'Can I use my own builder and trades?', a: 'Absolutely. We work alongside your trades weekly and can hand them a full set of service drawings, or we can coordinate the whole renovation as a single point of contact. Both are priced transparently so you can choose on merit.' },
  ];

  const home = {
    file: 'index.html',
    title: 'Kitchen Renovations Rockhampton | Free Design — Bilt & Co',
    desc: 'Custom kitchen renovations in Rockhampton from $15,000. Free 3D design and fixed-price quote, delivered assembled and installed by one local team.',
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
        <p class="lede" ${rv()} data-rv-d="2">Bespoke kitchens drawn to your room and delivered assembled &mdash; doors hung, hardware fitted, nothing to build on the floor &mdash; with a free 3D design and a fixed price that does not move.</p>
        <div class="badge-row mt-2" ${rv()} data-rv-d="3">
          <span class="badge">Free 3D design &amp; quote</span>
          <span class="badge">Fixed price, no variations</span>
          <span class="badge">Installed by our own team</span>
        </div>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem" ${rv()} data-rv-d="4">
          <a class="btn btn--lg" href="#lead-hero">Get my free quote</a>
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
        <p class="mt-2 muted" ${rv()} data-rv-d="3">So we specify to a standard, not to a price. Moisture-resistant carcasses because this is Central Queensland. Blum hardware with a lifetime mechanical warranty. Laser-bonded edges that will not lift in a Rockhampton February. Then we install it ourselves and put our name on it.</p>
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
      <div class="mt-3" ${rv()}><a class="btn" href="contact.html">Get my free quote</a></div>
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
    { q: 'What is the difference between a custom kitchen and a flat pack?', a: 'A catalogue flat pack is built from fixed cabinet widths, so your room gets filled with filler panels and compromise, usually in 16mm board with glued edging and unbranded runners. Every Bilt & Co kitchen is drawn to the millimetre for your walls, your appliances and your height in 18mm moisture-resistant board with laser-bonded edging and Blum hardware — and you can have it <a href="/flat-pack-kitchens">flat packed</a> or <a href="/assembled-kitchens">delivered assembled</a>. Custom and flat pack are not opposites here.' },
    { q: 'Do you replace just doors and benchtops?', a: 'Yes. If your carcasses are sound and the layout works, replacing doors, drawer fronts, hardware and the benchtop can transform a kitchen for a fraction of a rebuild. We will tell you honestly at the first visit which option makes sense — even when the smaller job is worth less to us.' },
    { q: 'Which benchtop is best in Central Queensland?', a: 'Engineered porcelain and sintered stone are the most forgiving here — heat resistant, UV stable and non-porous, which matters when a benchtop sits in afternoon sun. Natural marble is the most beautiful and the least forgiving. We will show you both with real offcuts, in your own kitchen light.' },
    { q: 'How long will I be without a kitchen?', a: 'Typically seven to ten working days on site, with a two to three day gap while stone is templated and cut. We can set up a temporary kitchen and we always keep water and a fridge running.' },
    { q: 'Can you work with my architect or builder?', a: 'Constantly. We read full documentation sets, issue service and setout drawings back to your team, and attend site meetings. Bring us in early and the joinery will be better for it.' },
  ];

  const kitchens = {
    file: 'kitchens.html',
    service: { name: "Bespoke kitchen design and installation", type: "Kitchen renovation" },
    title: 'Custom Kitchens Rockhampton | Design & Install — Bilt & Co',
    desc: 'Custom kitchens designed and installed in Rockhampton. Three collections from $15,000, free 3D design, fixed quotes, delivered assembled.',
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
        <p class="lede">Every kitchen drawn from a blank page for one room and one household &mdash; specified to the millimetre, delivered with the assembly already done, and installed by our own team.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Get my free quote</a>
          <a class="btn btn--ghost btn--lg" href="investment.html">See the price bands</a>
        </div>
        <div class="badge-row mt-2">
          <span class="badge">Fixed price</span><span class="badge">Delivered assembled</span><span class="badge">Fully insured</span>
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
            <a class="btn" href="contact.html">Get my free quote</a>
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
        <a class="link-u mt-3" href="contact.html" ${rv()} data-rv-d="3">Get my free quote &rarr;</a>
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
        <p class="lede">The room that lets your kitchen stay beautiful while the actual cooking happens somewhere else. From $4,000 alongside a new kitchen, delivered as built units that go in the same day.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Get my free quote</a>
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
          <a class="btn${i === 1 ? '' : ' btn--ghost'} btn--block" href="contact.html" style="margin-top:1.75rem">Get my free quote</a>
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
        <p class="lede">Wardrobes, laundries, vanities, studies and media walls &mdash; the same carcasses, hardware and finishes as our kitchens, delivered assembled so a robe is fitted in a morning rather than built over a weekend.</p>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="contact.html">Get my free quote</a>
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
          <a class="link-u mt-2" href="contact.html">Get my free quote</a>
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
        <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="4">Get my free quote</a>
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
          <a class="btn btn--lg" href="contact.html">Get my free quote</a>
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
        <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="4">Get my free quote</a>
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
          <a class="btn${feat ? '' : ' btn--ghost'} btn--block" href="contact.html">Get my free quote</a>
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
        <div class="mt-3" ${rv()} data-rv-d="4"><a class="btn" href="contact.html">Get my free quote</a></div>
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
        <a class="btn btn--block" href="contact.html">Get my free quote</a>
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
        <p class="lede">The worst part of a renovation is not the cost. It is not knowing what happens next, or who to call. Here is the whole thing, in order &mdash; including why the kitchen arrives built and what that does to the timeline.</p>
        <div class="mt-3"><a class="btn btn--lg" href="contact.html">Get my free quote</a></div>
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
        ['Week 12', 'Adjustment, cleaning, photography and the handover pack: drawings, hardware details and every certificate.'],
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
        <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="3">Get my free quote</a>
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
        <p class="lede">Not a retailer. Not a franchise. Bilt &amp; Co draws every kitchen it sells, specifies it to the millimetre, has it delivered assembled, and installs it with its own team.</p>
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
        <p class="mt-2 muted" ${rv()} data-rv-d="3">That is also why the phone is answered by the people who drew and fitted the kitchen. It is not a marketing line; it is what happens when one studio owns the drawing, the specification and the installation, and intends to be answering that phone for years.</p>
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
        <a class="btn mt-3" href="contact.html" ${rv()} data-rv-d="5">Get my free quote</a>
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
            <h2 class="d4">Send us your rough measurements.<br>We&rsquo;ll send back a price.</h2>
            <p class="small muted" style="margin:0">Rough is fine &mdash; wall lengths, ceiling height, where the window is. You get a confirmation straight away and a call within one business day.</p>
          </div>
          <div class="form__row">
            <div class="field"><label for="name">Your name</label><input id="name" name="name" type="text" required autocomplete="name" placeholder="Jane Marchetti"></div>
            <div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" required autocomplete="tel" placeholder="0400 000 000"></div>
          </div>
          <div class="form__row">
            <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required autocomplete="email" placeholder="jane@example.com.au"></div>
            <div class="field"><label for="suburb">Suburb or town</label><input id="suburb" name="suburb" type="text" autocomplete="address-level2" placeholder="Frenchville"></div>
          </div>
          <div class="field">
            <label for="message">Rough measurements, or what you&rsquo;re after</label>
            <textarea id="message" name="message" rows="4" placeholder="Kitchen is 5.4m along one wall, 2.4m ceiling, window on the left. Want an island if it fits. Granny flat, so a kitchenette might do."></textarea>
          </div>
          <button class="btn btn--lg btn--block" type="submit">Get my free quote<span class="btn__sub">No deposit &middot; No showroom visit &middot; No salesperson at your door</span></button>
          <p class="form__note">Or call <a href="tel:${SITE.phoneHref}">${SITE.phone}</a> &mdash; you get the person who designs it, not a call centre.</p>
          <p class="form__note">${svg.shield} Your details stay with our studio &mdash; never sold, never shared &mdash; see our <a href="privacy.html">privacy policy</a></p>
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

  /* Product families: each product page links its siblings. */
  const PRODUCT_FAMILIES = [
    { label: 'Flat pack and supply', slugs: ['flat-pack', 'flat-pack-upgrades', 'flat-pack-nsw', 'flat-pack-victoria', 'assembled', 'diy-flat-pack', 'flat-pack-cabinets', 'flat-pack-kitchenette', 'kitchenette', 'owner-builder', 'trade'] },
    { label: 'By layout', slugs: ['galley-flat-pack', 'l-shaped-flat-pack', 'u-shaped-flat-pack', 'one-wall-flat-pack', 'island'] },
    { label: 'More flat pack rooms', slugs: ['outdoor-kitchen', 'flat-pack-butlers-pantry', 'flat-pack-wardrobes', 'scullery', 'bar-cabinetry', 'laundry'] },
    { label: 'Kitchens for', slugs: ['granny-flat', 'tiny-home', 'new-builds', 'short-stay', 'island', 'laundry'] },
    { label: 'Accessible kitchens', slugs: ['accessible', 'sda', 'aging-in-place', 'pull-down', 'retirement-village'] },
    { label: 'Who we supply', slugs: ['airbnb-national', 'investors', 'container-homes', 'relocatable-homes', 'remote-fifo', 'office-kitchenette', 'display-home', 'student-accommodation', 'medical-kitchenette', 'gym-kitchenette', 'community-hall'] },
  ];
  const INSTALL_TOWNS = [['gladstone', 'Gladstone'], ['biloela', 'Biloela'], ['yeppoon', 'Yeppoon'], ['gracemere', 'Gracemere'], ['capricorn-coast', 'the Capricorn Coast']];
  const SUPPLY_TOWNS = [['brisbane', 'Brisbane'], ['mackay', 'Mackay'], ['bundaberg', 'Bundaberg'], ['emerald', 'Emerald'], ['blackwater', 'Blackwater'], ['moranbah', 'Moranbah'], ['hervey-bay', 'Hervey Bay'], ['whitsundays', 'the Whitsundays'], ['caloundra', 'Caloundra']];
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
      { q: `Will your own team install it?`, a: `Yes. Our employed installation team works across the region every week — we do not subcontract ${place} jobs to a third party. Same crew, same drawings, same standard.` },
      { q: `Is the design consultation really free in ${place}?`, a: `Yes — the site measure, the 3D design and the fixed quote are free anywhere in our service area, ${place} included. If our number does not work for you, you keep the drawings.` },
    ];
    return {
      assembled: 'install',
      file: `kitchens-${slug}.html`,
      service: { name: `Kitchen design and installation in ${place}`, type: 'Kitchen renovation', areas: [place] },
      title: `Kitchen Renovations ${tp} | Free Design & Quote`,
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
      <div>${leadForm({ id: 'lead-area', heading: `Free design for your ${tp} kitchen`, sub: 'We site measure in ' + place + ' weekly. Tell us where you are and we will call within one business day.', cta: 'Get my free quote' })}</div>
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
        <p class="lede" ${rv()} data-rv-d="1">Every ${tp} kitchen is designed, supplied and installed by Bilt &amp; Co &mdash; ${opts.leadNote || 'no travel loading'}, no subcontracted installers, and the cabinetry arrives assembled exactly as it does for a job in Rockhampton itself.</p>
        <p class="mt-2 muted" ${rv()} data-rv-d="2">We site measure across ${place} and the surrounding area weekly. We will come to your kitchen table with a tape and a camera, at a time that suits you.</p>
        <div class="area-tags mt-3" ${rv()} data-rv-d="3">${suburbs.map((s) => `<span>${s}</span>`).join('')}</div>
        <p class="small muted mt-2">We also install in ${INSTALL_TOWNS.filter((t) => t[0] !== slug).map((t) => `<a href="/kitchens-${t[0]}" style="color:var(--brass)">${t[1]}</a>`).join(', ')} and Rockhampton, and ship flat pack or assembled to ${SUPPLY_TOWNS.map((t) => `<a href="/kitchens-${t[0]}" style="color:var(--brass)">${t[1]}</a>`).join(', ')}.</p>
        ${opts.related ? `<p class="small muted mt-2">Also in ${tp}: ${opts.related.map((r) => `<a href="${r[0]}" style="color:var(--brass)">${r[1]}</a>`).join(" &middot; ")}</p>` : ''}
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem" ${rv()} data-rv-d="4">
          <a class="btn" href="contact.html">Get my free quote</a>
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
      related: [['/guide-kitchen-pc-item-new-build-contract', 'the kitchen PC item explained'], ['/new-build-kitchens-gracemere', 'new build kitchens in Gracemere']],
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
          <a class="btn btn--lg" href="contact.html">Get my free quote</a>
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
      lede: 'A small kitchen is harder to design than a large one. Every millimetre is spoken for, and there is nowhere to hide a mistake. It arrives as a handful of built units and is in the same day.',
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
        'Delivered assembled, or flat packed if you would rather build it',
        'Repeat pricing for builders doing multiple units',
      ],
      faq: [
        { q: 'How much is a tiny home kitchen?', a: 'A 1.8m run starts at about $5,300 and a 2.4m run at about $6,500, supplied with carcasses, doors, Blum hardware and a benchtop. The exact figure depends on your run length, benchtop material and whether you want fit-out options like a pull-down overhead. Draw it in the estimator or send us your dimensions for a fixed quote.' },
        { q: 'Can you work to a trailer build?', a: 'Yes, and we would rather know early. Tell us the trailer dimensions, the axle position and where your services come up, and we will design the cabinetry so the weight sits where your engineer wants it rather than where the kitchen happens to fall.' },
        { q: 'Do you supply tiny home builders repeatedly?', a: 'Yes — this is a large part of what we do. If you build multiple units to a repeating layout, we hold your specification so each order is a confirmation rather than a fresh design, and pricing reflects the volume. Talk to us about a trade account.' },
        { q: 'Is it delivered flat packed?', a: 'Your choice. Assembled means you are fitting a kitchen, not building one on the floor of a shell you still have to finish. Flat pack ships for less and gets into tight rooms. The quote shows both.' },
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
      lede: 'A secondary dwelling kitchen has a harder life than a main one and usually a smaller budget. Those two facts fight each other, and cheap cabinetry loses. Ours arrives assembled, so the builder is fitting it, not building it.',
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
        'Delivered assembled, doors adjusted before it arrives',
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
    related: [['/guide-kitchen-pc-item-new-build-contract', 'the kitchen PC item explained'], ['/new-build-kitchens-gracemere', 'in Gracemere']],
      slug: 'new-builds',
      nav: 'New build kitchens',
      title: 'New Build Kitchens Rockhampton | Bilt & Co',
      desc: 'Upgrading from the builder’s standard kitchen in a new build. Fixed pricing, service drawings for your trades, and delivery to your construction programme.',
      h1: 'The kitchen your builder<br><span class="italic brass">did not quote you.</span>',
      lede: 'The standard kitchen in a new build contract is chosen to hit a price, not to suit how you cook. Upgrading it is the single highest-value change most people make to a new home &mdash; and because ours arrives assembled, it drops into the builder’s programme at fit-off without adding days.',
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
        'Delivered assembled, doors adjusted before it arrives',
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
      title: 'Trade Flat Pack & Assembled Kitchens for Builders',
      desc: 'Trade flat pack and assembled kitchen supply for builders, tiny home makers and granny flat specialists. Held specs, fixed pricing, shipped Australia-wide.',
      h1: 'For builders who need<br><span class="italic brass">the same kitchen, again.</span>',
      lede: 'If you build repeatedly, the value is not in a clever design. It is in a specification that does not change, a price that does not move, and cabinetry that arrives assembled so your carpenter fits it in a day instead of building it for three.',
      img: 'detail-timber-joinery',
      alt: 'Timber joinery detail showing cabinetry construction quality',
      price: 'Trade pricing',
      range: 'Supply, or supply and install',
      body: [
        ['We hold your specification', 'Once we have built a kitchen for one of your units, that specification stays on file — carcass, doors, hardware, benchtop, the lot. The next order is a confirmation, not a fresh design process. For anyone building repeating layouts, that removes the single most time-consuming part of ordering a kitchen.'],
        ['Supply only, or supply and install', 'Take delivery assembled and fit it with your own crew, or have our team install it. If you are speccing for a client, <a href="guide-benchtops-compared.html" style="color:var(--brass)">the benchtop guide</a> is the fastest way to explain the price difference to them. Most builders start with the first and move to the second once they have seen how long it takes us. Either way you get service drawings so your trades rough in correctly.'],
        ['Fixed price, and it stays fixed', 'Your quote is itemised and it holds. We have never issued a surprise variation for our own scope of works, which matters more to a builder carrying the risk on a fixed-price contract than it does to a homeowner.'],
        ['Trade flat pack, or assembled: your crew decides', `The same kitchen ships either way. Flat pack when your carpenter would rather build on site, the unit is hard to get a built cabinet into, or the job is interstate and freight matters — cartons labelled per cabinet, Blum hardware bagged with each, panels pre-drilled. Assembled when you want the crew fitting rather than building: carcasses square, doors adjusted, ready to fix. Mixed orders are normal — tall units flat for access, base runs built. Repeat layouts are held on file so the tenth unit is quoted from the first. See <a href="/flat-pack-kitchens" style="color:var(--brass)">flat pack kitchens</a> and <a href="/assembled-kitchens" style="color:var(--brass)">assembled kitchens</a> for what arrives in each case.`],
        ['Segments we supply regularly', 'Tiny home builders, granny flat and secondary dwelling specialists, project builders upgrading from a standard kitchen, and renovators who want the cabinetry handled while they do everything else.'],
      ],
      list: [
        'Held specifications for repeating layouts',
        'Supply only, or supply and install',
        'Full service and setout drawings for your trades',
        'Delivered assembled, or flat packed for access and freight',
        'Fixed, itemised pricing that does not move',
        'Delivered assembled, doors adjusted before it arrives',
      ],
      faq: [
        { q: 'Do you offer trade pricing?', a: 'Yes. Trade terms depend on volume and how much of the process you take on, so they are quoted rather than published. Tell us what you build and roughly how many kitchens a year, and we will put terms in front of you.' },
        { q: 'Can I take supply only?', a: 'Yes. Cabinetry is delivered assembled with hardware fitted and a setout drawing, ready for your crew to fix and scribe. If you would rather we installed it, our own team does that too.' },
        { q: 'How far do you deliver?', a: 'Anywhere in Australia, flat pack or assembled, with freight quoted to the site. Rockhampton, Gracemere, Yeppoon, Emu Park and the wider Capricorn Coast are inside our install area. For trade volumes we will freight further — ask, and we will price the delivery honestly rather than folding a guess into the kitchen.' },
        { q: 'What lead time should I plan for?', a: 'Allow eight to twelve weeks from signed order to delivery for a first specification, and less once we hold your details. Tell us your programme and we will book against it rather than against ours.' },
      ],
      placeholder: 'PLACEHOLDER: trade discount structure, minimum order quantity, payment terms and credit application are not defined. Confirm with the client and add them here before promoting this page.',
    },
  ];

  SEGMENTS.push({
    file: 'flat-pack-kitchens.html',
    related: [['/flat-pack-kitchen-upgrades', 'flat pack kitchen upgrades'], ['/diy-flat-pack-kitchens', 'DIY flat pack kitchens'], ['/flat-pack-cabinets', 'flat pack cabinets for the rest of the house'], ['/assembled-kitchens', 'delivered assembled instead'], ['/guide-how-to-assemble-a-flat-pack-kitchen', 'how to assemble a flat pack kitchen'], ['/guide-how-long-do-flat-pack-kitchens-last', 'how long they last']],
    slug: 'flat-pack',
    nav: 'Flat pack kitchens',
    title: 'Flat Pack Kitchens Australia | Cut to Your Room | Bilt & Co',
    desc: 'Custom flat pack kitchens cut to your measurements, shipped anywhere in Australia. 18mm board, Blum hardware, pre-drilled and labelled. Fixed itemised quotes.',
    h1: 'Flat pack kitchens,<br><span class="italic brass">cut to your room.</span>',
    lede: 'Not a catalogue of fixed cabinet sizes with filler panels to hide the gaps. The same cabinetry we deliver assembled, shipped flat to any address in Australia for you or your installer to build.',
    img: 'drawer-detail',
    alt: 'Flat pack kitchen drawer box with Blum full-extension runners',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['What flat pack means here', 'Every carcass is cut to your wall lengths, your ceiling height and your appliances, then packed flat with the hardware, the doors and a labelled drawing. Panels are pre-drilled for hinges and runners so nothing is measured on site. It is the same 18mm moisture-resistant board, laser-bonded edging and Blum soft-close hardware as our assembled kitchens — the only thing that changes is who puts the carcasses together. Flat pack, flatpack, kit kitchen: same thing, and ours is cut to the room rather than pulled from a shelf.'],
      ['Ordering online, without an account', `There is no design portal to sign up to and no price hidden behind a login. Send the room dimensions and photos through the <a href="/contact" style="color:var(--brass)">quote form</a>, or email them, and a person draws it and prices it — flat pack and assembled on the same quote, freight to your postcode on each. You see the drawing before you pay anything. The <a href="/guide-how-to-order-a-flat-pack-kitchen" style="color:var(--brass)">ordering guide</a> walks through the whole sequence.`],
      ['Who it suits', 'Owner-builders and renovators who have the time and a flat floor to build on. Builders fitting out granny flats, tiny homes and units where a flat carton is easier to get into the room than a built cabinet. Anyone interstate, because flat cartons ship for less and travel better than assembled carcasses. And people for whom the assembly is the part they actually want to do.'],
      ['What arrives', 'Cartons labelled to the drawing, one per cabinet where possible. Doors and drawer fronts wrapped separately. Blum hinges, runners and adjustable legs bagged and labelled per cabinet. Kickboards, end panels and fillers cut to length. A dimensioned drawing with every cabinet numbered, plus the service drawing your plumber and electrician rough in from. Benchtops are a separate conversation — stone is templated on site after the cabinets are in.'],
      ['If you would rather not build it', `Order the same kitchen <a href="/assembled-kitchens" style="color:var(--brass)">delivered assembled</a> instead: carcasses built, doors hung and adjusted, ready to fix to the wall. Within Central Queensland our own team installs it. The quote shows both so you can see what the assembly is actually worth to you.`],
      ['Shipped nationally', `Cut in Rockhampton and freighted flat to every state and territory capital &mdash; <a href="/flat-pack-kitchens-sydney" style="color:var(--brass)">Sydney</a>, <a href="/flat-pack-kitchens-melbourne" style="color:var(--brass)">Melbourne</a>, <a href="/flat-pack-kitchens-perth" style="color:var(--brass)">Perth</a>, <a href="/flat-pack-kitchens-adelaide" style="color:var(--brass)">Adelaide</a>, <a href="/flat-pack-kitchens-canberra" style="color:var(--brass)">Canberra</a>, <a href="/flat-pack-kitchens-hobart" style="color:var(--brass)">Hobart</a> and <a href="/flat-pack-kitchens-darwin" style="color:var(--brass)">Darwin</a> &mdash; plus the major regional centres in between: <a href="/flat-pack-kitchens-gold-coast" style="color:var(--brass)">the Gold Coast</a>, <a href="/flat-pack-kitchens-newcastle" style="color:var(--brass)">Newcastle</a>, <a href="/flat-pack-kitchens-wollongong" style="color:var(--brass)">Wollongong</a>, <a href="/flat-pack-kitchens-townsville" style="color:var(--brass)">Townsville</a>, <a href="/flat-pack-kitchens-cairns" style="color:var(--brass)">Cairns</a>, <a href="/flat-pack-kitchens-geelong" style="color:var(--brass)">Geelong</a> and <a href="/flat-pack-kitchens-toowoomba" style="color:var(--brass)">Toowoomba</a>. Same board, same hardware, same fixed-quote process wherever it is going &mdash; see <a href="/flat-pack-kitchen-upgrades" style="color:var(--brass)">flat pack kitchen upgrades</a> if you want it to look like it cost more than it did.`],
    ],
    list: [
      'Drawn to your measurements, not a fixed catalogue',
      '18mm moisture-resistant board, laser-bonded edging',
      'Blum soft-close hinges and full-extension runners',
      'Pre-drilled, labelled, packed per cabinet',
      'Service drawings for your plumber and electrician',
      'Shipped to any address in Australia',
    ],
    faq: [
      { q: 'Are your flat pack kitchens custom sized?', a: 'Yes. Every cabinet is cut to your drawing rather than picked from a list of standard widths, so the run fits the wall without filler panels doing the work.' },
      { q: 'How much does a flat pack kitchen cost?', a: 'It is quoted to your drawing, fixed and itemised, with freight shown as its own line. Send the room dimensions and we come back with a number that does not move.' },
      { q: 'Do you ship flat pack kitchens Australia-wide?', a: 'Yes. Flat cartons ship to any address in Australia. Freight is quoted to your postcode and shown on the quote rather than folded into the price.' },
      { q: 'How hard is it to assemble?', a: `Cabinet by cabinet it is straightforward — the panels are pre-drilled and labelled. What people underestimate is the total: a full kitchen is a lot of cabinets. Our <a href="/guide-how-to-assemble-a-flat-pack-kitchen" style="color:var(--brass)">assembly guide</a> covers the order, the tools and the mistakes that cost time.`},
      { q: 'Can I get some cabinets flat pack and some assembled?', a: 'Yes. Tall pantry and overhead units often go flat for access reasons while base runs come assembled. Say which on the quote request.' },
    ],
  });

  SEGMENTS.push({
    file: 'assembled-kitchens.html',
    related: [['/flat-pack-kitchens', 'flat pack instead'], ['/guide-flat-pack-vs-assembled-kitchen', 'flat pack versus assembled'], ['/guide-how-to-install-a-supplied-kitchen', 'getting a supplied kitchen installed'], ['/owner-builder-kitchen-supply', 'owner-builder supply']],
    slug: 'assembled',
    nav: 'Assembled kitchens',
    title: 'Pre-Assembled Kitchens Delivered Australia-wide | Bilt & Co',
    desc: 'Kitchen cabinetry delivered assembled: carcasses built, doors hung, Blum hardware fitted. Shipped anywhere in Australia; installed in Central Queensland.',
    h1: 'Delivered assembled.<br><span class="italic brass">Fit it, don’t build it.</span>',
    lede: 'Carcasses built, hardware fitted, doors hung and adjusted before it leaves. On site you are fixing cabinets to a wall, not assembling them on the floor of a house you are still finishing.',
    img: 'dark-island',
    alt: 'Assembled dark cabinetry kitchen with island, delivered ready to fit',
    price: 'Quoted to your drawing',
    range: 'delivered Australia-wide',
    body: [
      ['What assembled means here', 'Each carcass arrives as a finished box: glued and screwed square, Blum hinges and runners fitted, drawers in, doors hung and adjusted to even gaps. Legs are on. The installer levels the run, fixes it to the wall, fits the kickboards and end panels, and the benchtop goes on top. The slow, fiddly part of a kitchen is already done, and it was done on a bench rather than a floor.'],
      ['Who it suits', 'Anyone on a build programme where a fortnight of evenings is not available. Builders who want their carpenter fitting, not assembling. Owner-builders at the end of a project with no patience left. Renovators who want the kitchen in and usable in days. Within Central Queensland, everyone who wants us to install it as well.'],
      ['What to plan for', 'Assembled cabinets take more room than cartons, on the truck and in the house. Have somewhere dry and level to stand them if delivery lands before the room is ready. Tall units and wide overheads may need two people to carry through a door. Everything else is the same as any kitchen: rough-in first, cabinets, benchtop template, fit-off.'],
      ['If you would rather build it', `The same kitchen ships <a href="/flat-pack-kitchens" style="color:var(--brass)">flat pack</a> for less freight and easier access. Same board, same hardware, same warranty. The quote shows both.`],
    ],
    list: [
      'Carcasses built square, doors hung and adjusted',
      'Blum soft-close hardware fitted before delivery',
      '18mm moisture-resistant board, laser-bonded edging',
      'Delivered to any address in Australia',
      'Installed by our own team in Central Queensland',
      'Lifetime mechanical warranty on Blum hardware',
    ],
    faq: [
      { q: 'What is a pre-assembled kitchen?', a: 'Cabinetry delivered as finished boxes rather than flat panels: carcasses built, hardware fitted, doors hung and adjusted. The installer fixes them in place and fits the benchtop.' },
      { q: 'Is assembled dearer than flat pack?', a: 'The cabinetry is the same price. Assembly and the extra freight volume are what you pay for, and both are shown as their own lines on the quote so you can decide whether they are worth it to you.' },
      { q: 'Do you deliver assembled kitchens interstate?', a: 'Yes, anywhere in Australia. Assembled cabinets take more truck space than cartons so freight is higher; the quote shows it to your postcode.' },
      { q: 'Who installs it outside Central Queensland?', a: `Your builder, carpenter or kitchen installer, working from our drawings. Our <a href="/guide-how-to-install-a-supplied-kitchen" style="color:var(--brass)">install guide</a> covers the three trades, the order they work in and the paperwork to hold at the end.`},
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-kitchenettes.html',
    parent: ['kitchenettes.html', 'Kitchenettes'],
    related: [['/kitchenettes', 'kitchenettes delivered assembled'], ['/flat-pack-kitchens', 'flat pack kitchens'], ['/granny-flat-kitchens', 'granny flat kitchens'], ['/tiny-home-kitchens', 'tiny home kitchens']],
    slug: 'flat-pack-kitchenette',
    nav: 'Flat pack kitchenettes',
    title: 'Flat Pack Kitchenettes From $4,500 | Studio & Office Kits',
    desc: 'Flat pack kitchenettes from $4,500, cut to your measurements and shipped Australia-wide. Sink, bench, cold storage; cooktop where it fits. Blum hardware.',
    h1: 'A kitchenette in a carton,<br><span class="italic brass">cut to the room.</span>',
    lede: 'For the studio, the under-house room, the site office and the short-stay unit. The same kitchenette we deliver assembled, packed flat so it fits through a door and ships for less.',
    img: 'detail-stone-black',
    alt: 'Compact kitchenette with black stone benchtop and concealed storage',
    price: 'From $4,500',
    range: '1.2m – 1.8m run, shipped flat',
    body: [
      ['What is in the kit', 'Base cabinets cut to your run length with a sink base, a drawer bank and cold-storage provision. A benchtop in laminate, or a stone benchtop templated on site after the cabinets are in. Overheads where the ceiling allows. Blum soft-close hinges and full-extension runners, adjustable legs, kickboards and end panels. Every panel pre-drilled and labelled to a numbered drawing, with the service drawing your plumber works from.'],
      ['Where a flat pack kitchenette makes sense', 'Rooms you cannot get a built cabinet into: under-house conversions with a low door, upstairs studios, converted sheds and site offices. Multi-unit jobs where a builder is fitting six of the same thing. Interstate, where a carton of panels travels for a fraction of an assembled cabinet. And any job where the person on site is capable and would rather spend an afternoon than pay for assembly.'],
      ['What to decide before you order', 'Whether there is an oven, because that sets the run length more than anything else. Where the waste can run, because in a conversion the plumbing decides the layout, not the other way round. Ceiling height, for overheads. And whether the room is self-contained, because a second cooking facility can change how a council classifies the property — ask before you build.'],
      ['Assembled instead', `The same kitchenette ships <a href="/kitchenettes" style="color:var(--brass)">delivered assembled</a>, and within Central Queensland we install it. The quote shows both.`],
    ],
    list: [
      '1.2m to 1.8m runs, cut to your dimensions',
      'Sink base, drawer bank, cold-storage provision',
      'Cooktop and microwave options; oven where it fits',
      'Blum soft-close hinges and full-extension runners',
      'Pre-drilled, labelled, packed per cabinet',
      'Shipped to any address in Australia',
    ],
    faq: [
      { q: 'How much is a flat pack kitchenette?', a: 'From $4,500 with a laminate benchtop, including carcasses, doors and Blum hardware. Run length, a stone benchtop and any cooktop or appliance provision move it from there; freight is quoted to your postcode.' },
      { q: 'Can I assemble it myself?', a: `Yes. A kitchenette is a handful of cabinets, and the panels are pre-drilled and labelled. Our <a href="/guide-how-to-assemble-a-flat-pack-kitchen" style="color:var(--brass)">assembly guide</a> covers the order and the tools. The plumbing and any electrical must still be done by licensed trades.`},
      { q: 'Does it come with a sink and tap?', a: 'The sink base is cut for a standard inset sink. Sink, tap and appliances are quoted as line items if you want us to supply them, or you source your own and tell us the cut-out sizes.' },
      { q: 'Is a kitchenette enough for a granny flat?', a: `Usually not. A granny flat is a dwelling, and a full compact kitchen serves it better — see <a href="/granny-flat-kitchens" style="color:var(--brass)">granny flat kitchens</a>. A kitchenette suits a studio, a single room or a space where guests reheat rather than cook.`},
    ],
  });

  SEGMENTS.push({
    file: 'diy-flat-pack-kitchens.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/guide-how-to-assemble-a-flat-pack-kitchen', 'the assembly guide'], ['/flat-pack-kitchens', 'flat pack kitchens'], ['/guide-how-to-order-a-flat-pack-kitchen', 'how ordering works'], ['/assembled-kitchens', 'or have it delivered assembled']],
    slug: 'diy-flat-pack',
    nav: 'DIY flat pack kitchens',
    title: 'DIY Flat Pack Kitchens | Cut to Size, You Build | Bilt & Co',
    desc: 'DIY flat pack kitchens cut to your measurements, shipped Australia-wide. Pre-drilled, labelled, Blum hardware bagged per cabinet. You build, trades connect.',
    h1: 'DIY flat pack kitchens,<br><span class="italic brass">for people who want to build it.</span>',
    lede: 'Some people would rather spend a weekend with a drill than pay for assembly, and they are right to. This is the same kitchen we deliver assembled, packed for you to build — with the drawings that make it go together first time.',
    img: 'joinery-sketch',
    alt: 'Numbered kitchen cabinet drawings used to assemble a DIY flat pack kitchen',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['What you are actually building', 'Carcasses, one per carton, pre-drilled for the Blum hinges and runners bagged with them. Doors and drawer fronts arrive finished; you hang and adjust them. Kickboards, end panels and fillers are cut to length. Every carcass is numbered to a drawing that shows where it goes and which hardware it takes. There is no cutting, no measuring hinge positions, and nothing that needs a workshop — a drill-driver, a square, a level and a flat floor.'],
      ['What stays with the trades', 'Plumbing and electrical connection is licensed work in every Australian state, and it is what produces the compliance paperwork you need at sale or for insurance. You build the cabinets and cut the service holes to our drawing; the plumber and electrician connect at fit-off. Stone benchtops are templated by a fabricator after the cabinets are in. Everything else — assembly, levelling, fixing to the wall, hanging doors — is yours if you want it.'],
      ['Honest about the time', `A kitchenette is an afternoon. A full kitchen with an island and a pantry is several days for a careful first-timer, and it lands at the end of a renovation when patience is shortest. The <a href="/guide-how-to-assemble-a-flat-pack-kitchen" style="color:var(--brass)">assembly guide</a> sets out the order and the mistakes that cost a weekend. If the time is not there, the same kitchen ships <a href="/assembled-kitchens" style="color:var(--brass)">delivered assembled</a> and the quote shows both, so it is a line item rather than a leap.`],
      ['Support that is a person', 'There is no portal and no ticket queue. If a panel is damaged or a cabinet number does not match the drawing, you ring the studio and speak to the person who drew it. Photos of the problem get a same-day answer; a replacement panel is cut to the drawing on file rather than re-measured.'],
    ],
    list: [
      'Cut to your measurements, not catalogue widths',
      'Pre-drilled for hinges and runners, labelled per cabinet',
      'Blum soft-close hardware bagged with each carcass',
      'Numbered drawing plus service drawing for your trades',
      '18mm moisture-resistant board, laser-bonded edging',
      'Shipped to any address in Australia',
    ],
    faq: [
      { q: 'Can I really build a kitchen myself?', a: 'The cabinetry, yes, if you can use a drill-driver and a level and have a flat floor to work on. Panels are pre-drilled and labelled so nothing is measured on site. Plumbing and electrical connection stay with licensed trades.' },
      { q: 'What tools do I need?', a: 'Drill-driver with a clutch, a square, a rubber mallet, a long level, clamps, a hex key and a Phillips driver for the Blum hardware. Nothing exotic.' },
      { q: 'What if something is missing or damaged?', a: 'Check the delivery against the drawing on the day. Ring the studio with a photo and a cabinet number and a replacement is cut to the drawing on file.' },
      { q: 'Is DIY flat pack cheaper than assembled?', a: 'The cabinetry is the same price. You save the assembly labour and some freight volume; both are separate lines on the quote so you can see exactly what you are trading your weekend for.' },
      { q: 'Do you ship DIY kitchens interstate?', a: 'Yes, anywhere in Australia. Flat cartons travel well and cost less to ship than assembled cabinets; freight is quoted to your postcode.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-cabinets.html',
    parent: ['joinery.html', 'Joinery'],
    related: [['/joinery', 'joinery delivered assembled'], ['/laundries', 'laundries'], ['/flat-pack-kitchens', 'flat pack kitchens'], ['/flat-pack-kitchenettes', 'flat pack kitchenettes']],
    slug: 'flat-pack-cabinets',
    nav: 'Flat pack cabinets',
    title: 'Custom Flat Pack Cabinets | Laundry, Robes, Vanities',
    desc: 'Custom flat pack cabinets for laundries, wardrobes, vanities and media walls, cut to your measurements and shipped Australia-wide. Same board and Blum hardware.',
    h1: 'Flat pack cabinets for<br><span class="italic brass">the rest of the house.</span>',
    lede: 'Laundries, robes, vanities, a study wall, the unit under the television. The same carcasses, edging and hardware as our kitchens, cut to the room and packed flat for you or your installer to build.',
    img: 'wardrobe-walkin',
    alt: 'Walk-in wardrobe drawer bank in custom flat pack cabinetry',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['What we cut', 'Laundry tall units and benches. Built-in and walk-in wardrobes with drawer banks, shelving and hanging. Vanities to take the basin you have chosen. Study desks with drawer pedestals. Media walls with concealed storage. Linen presses, mudroom lockers, garage storage. Anything that is a carcass with doors or drawers on it, drawn to your dimensions and your ceiling height.'],
      ['Why the same specification matters here', 'Laundries and bathrooms are wetter than kitchens and robes carry more weight per shelf than people expect. The 18mm moisture-resistant board, laser-bonded edging and Blum runners that make a kitchen last do the same for a laundry cabinet with a machine vibrating beside it, or a robe drawer that is opened every morning for twenty years. Cheaper flat pack cuts corners here first because nobody photographs a laundry.'],
      ['What arrives', 'Cartons labelled per cabinet, panels pre-drilled, hardware bagged with each carcass, a numbered drawing. For vanities and laundries, a service drawing marking waste and water positions for your plumber. Benchtops in laminate, or stone templated on site after the cabinets are in. Basins, taps and appliances are quoted as line items if you want them supplied, or you give us the cut-out sizes.'],
      ['Assembled instead', `Every one of these also ships <a href="/joinery" style="color:var(--brass)">delivered assembled</a> — a built-in robe is fitted in a morning that way — and within Central Queensland our own team installs it. The quote shows both.`],
    ],
    list: [
      'Laundries, wardrobes, vanities, studies, media walls',
      'Cut to your dimensions and ceiling height',
      '18mm moisture-resistant board, laser-bonded edging',
      'Blum soft-close hinges and full-extension runners',
      'Service drawings for vanity and laundry plumbing',
      'Shipped to any address in Australia',
    ],
    faq: [
      { q: 'Do you do flat pack wardrobes?', a: 'Yes, built-in and walk-in, with drawer banks, shelving and hanging rails drawn to your wall and ceiling height. Panels arrive pre-drilled and labelled with Blum hardware bagged per carcass.' },
      { q: 'Can you make a vanity to fit my basin?', a: 'Yes. Send the basin model or its cut-out drawing and the vanity is cut to take it, with a service drawing for the plumber.' },
      { q: 'Is flat pack cabinetry strong enough for a laundry?', a: 'Ours is. Same 18mm moisture-resistant board and laser-bonded edging as a kitchen, which is what the room needs. The cheap end of flat pack uses 16mm board with glued edging and that is where laundries fail.' },
      { q: 'Can I mix flat pack and assembled in one order?', a: 'Yes. Tall robe units often go flat for access while a vanity comes assembled. Say which on the quote request.' },
    ],
  });

  SEGMENTS.push({
    file: 'kitchenettes.html',
    related: [['/under-house-kitchens-rockhampton', 'under-house conversions in Rockhampton'], ['/guide-garage-conversion-approval-qld', 'garage and shed conversions']],
    slug: 'kitchenette',
    nav: 'Kitchenettes',
    title: 'Kitchenettes Rockhampton | From $4,500 | Bilt & Co',
    desc: 'Compact kitchenettes from $4,500 for studios, under-house conversions, offices and short-stay rentals. 1.2–1.8m runs, delivered assembled and installed.',
    h1: 'Kitchenettes that<br><span class="italic brass">still feel like a kitchen.</span>',
    lede: 'A kitchenette is not a shrunken kitchen. It is a different brief — fewer appliances, less run, and every decision about what earns its place. It arrives as two or three built units and is in within hours.',
    img: 'detail-black-cabinetry',
    alt: 'Compact kitchenette with integrated sink, benchtop and concealed storage',
    price: 'From $4,500',
    range: '1.2m – 1.8m run',
    body: [
      ['Where a kitchenette is the right answer', 'Studios and self-contained rooms. Under-house conversions where the ceiling will not take overheads. Offices and staff rooms. Short-stay and Airbnb rooms where guests reheat rather than cook. Pool houses and shed conversions. In all of them the job is a bench, a sink, cold storage and somewhere to put things — not a full kitchen squeezed into a smaller footprint. If anyone is going to cook a proper meal in the space, you want a compact kitchen instead, and our <a href="granny-flat-kitchens.html" style="color:var(--brass)">granny flat kitchens</a> page is the better place to start.'],
      ['What to leave out, and what never to', 'The oven is usually the first thing to go, and it is usually the right call — a cooktop and a microwave cover almost everything a kitchenette is actually used for. Lose the overheads if the ceiling is low. What we would not cut is the sink size or the hardware. A bar-sized sink you cannot fit an oven tray into gets complained about for years, and a drawer that sticks is worse in a small room than a large one, because there are fewer of them carrying the same load.'],
      ['Plumbing usually decides the layout', 'In a conversion, where the waste can run is the constraint that sets the design — not where you would like the sink to be. We look at that before drawing anything, because a kitchenette designed around a plumbing run that cannot be built is a wasted fortnight. If you are converting an under-house, a shed or a garage, send us a photo of where the existing services come up and we will tell you what is realistic before you spend anything.'],
      ['Built to the same standard as a full kitchen', 'Same 18mm moisture-resistant carcasses, same Blum soft-close hardware, same laser-bonded edging. A kitchenette is smaller, not lighter in construction — and in a rental or a short-stay room it often works harder per cabinet than a family kitchen does. It is also the cheapest room in the house to over-specify, because there is so little of it.'],
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
    lede: 'A short-stay kitchen has two jobs your own kitchen never has. It has to earn the booking in a photograph, and it has to hold up to people with no reason to be careful. Delivered assembled, it is in between one booking and the next.',
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
      'Delivered assembled, doors adjusted before it arrives',
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
    lede: 'An island is the most requested thing in a new kitchen and the most often abandoned once the room is measured. Here is what one really needs &mdash; and why an island that arrives as built units stays square once the stone goes on.',
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
    lede: 'A laundry gets the leftover space, the leftover budget and none of the thought. It is also the room that annoys people daily. Ours is drawn properly and arrives assembled, so it is in the same day.',
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
    related: [['/guide-kitchen-pc-item-new-build-contract', 'the kitchen PC item in a new build'], ['/guide-how-to-install-a-supplied-kitchen', 'getting it installed'], ['/guide-how-to-measure-for-a-kitchen', 'how to measure for a kitchen'], ['/guide-supply-your-own-kitchen', 'is supplying your own cheaper?']],
    slug: 'owner-builder',
    nav: 'Owner-builder supply',
    title: 'Owner Builder Kitchen Supply | Flat Pack or Assembled',
    desc: 'Kitchen supply for owner-builders in Queensland. Designed to your measurements, delivered assembled with service drawings for your trades. Fit it yourself.',
    h1: 'You are managing the build.<br><span class="italic brass">We will handle the kitchen.</span>',
    lede: 'Owner-builders get treated as a nuisance by most kitchen companies. You are the opposite of that here — you know your programme, you make your own decisions, and you do not need selling to. The kitchen arrives assembled, because at the end of an owner-build the last thing you have is evenings.',
    img: 'dark-island',
    alt: 'Kitchen cabinetry delivered assembled ready for installation',
    price: 'Supply pricing',
    range: 'Delivered assembled',
    body: [
      ['Supply only, and it is not a lesser service', 'You get the same design process, the same 18mm moisture-resistant carcasses, the same Blum hardware and the same drawings on the cabinetry as anyone paying for installation. The difference is that it arrives assembled at your site and your crew fits it. This is not a stripped-back product for people who could not afford the real one — it is the same kitchen with one line removed from the invoice.'],
      ['Assembled or flat packed: decide with your eyes open', 'The distinction matters most to you of anyone. Assembled means carcasses arrive built, hardware fitted, doors hung and adjusted — you are fitting a kitchen, not assembling one on the floor of a house you are still finishing, at the point in the build where you have the least time and patience left. Flat pack means the same cabinetry ships for less and fits through any door, and the assembly is yours. We quote both on the same drawing; if you have ever built a flat pack at the end of an owner-build, you already know which line you are looking at.'],
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
      'Delivered assembled, doors adjusted before it arrives',
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
    title: 'Accessible Kitchens Rockhampton | Built to OT Spec',
    desc: 'Accessible and adaptive kitchens in Rockhampton and Central Queensland, built to your occupational therapist’s specification. Quoted itemised for plan managers.',
    h1: 'Accessible kitchens,<br><span class="italic brass">built to the specification.</span>',
    lede: 'An accessible kitchen is a specification problem, not a design compromise. Send us what your OT has written and we will supply exactly that, assembled and adjusted before it arrives so the install is a day, not a disruption.',
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
    title: 'SDA Kitchens Queensland | Specialist Disability Housing',
    desc: 'Kitchens for Specialist Disability Accommodation builds in Queensland. Built to the design standard your certifier assesses against, supplied or installed.',
    h1: 'SDA kitchens,<br><span class="italic brass">built to the standard.</span>',
    lede: 'SDA is not a generous version of an accessible kitchen. It is a certified build against a published standard, and the cabinetry has to survive that assessment. Assembled and checked before delivery means what is assessed on site is what left us.',
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
      'Ship anywhere in Australia, install within 150km of Rockhampton',
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
    title: 'Aging in Place Kitchens Rockhampton | Design to Stay Put',
    desc: 'Kitchens designed for staying in your own home longer. Drawers instead of low cupboards, better light, hardware that works with arthritic hands. From $15,000.',
    h1: 'A kitchen designed<br><span class="italic brass">for staying put.</span>',
    lede: 'Nobody wants a kitchen that looks like a hospital. Almost everything that makes one easier to use at eighty is invisible, and most of it is free if you decide it now. Delivered assembled, the kitchen is out of action for days, not weeks.',
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
      'Delivered assembled, doors adjusted before it arrives',
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
    title: 'Motorised Pull-Down Kitchen Shelving | Overheads You Reach',
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

  SEGMENTS.push({
    file: 'flat-pack-kitchen-upgrades.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/flat-pack-kitchens', 'flat pack kitchens'], ['/investment', 'the full price bands'], ['/guide-benchtops-compared', 'benchtops compared'], ['/assembled-kitchens', 'delivered assembled instead']],
    slug: 'flat-pack-upgrades',
    nav: 'Flat pack kitchen upgrades',
    title: 'Flat Pack Kitchen Upgrades | Stone, Brass & Lighting',
    desc: 'Upgrade a flat pack kitchen without changing the bones: stone benchtops, brass hardware, integrated lighting and Blum Legrabox drawers.',
    h1: 'Same kitchen.<br><span class="italic brass">Different budget, different finish.</span>',
    lede: 'Every flat pack kitchen we cut starts from the same board and the same Blum hardware, whether it costs $15,000 or $47,000. The difference is entirely in what you choose to add.',
    img: 'island-marble-brass',
    alt: 'Stone island bench with brushed brass tapware and hardware upgrades',
    price: 'From $15,000',
    range: 'Base kitchen, upgrades priced separately',
    body: [
      ['Why the base kitchen is already good', 'Essence, the entry collection, is not a stripped-down kitchen — it is 18mm moisture-resistant carcasses, laser-bonded edging and Blum soft-close hinges and runners, the same three things that actually decide how long a kitchen lasts. Nothing about starting at $15,000 means starting with a lesser board or a lesser hinge. It means a 20mm engineered stone benchtop and a handleless or slimline profile, done properly, with nothing yet spent on the parts that are optional.'],
      ['Stone and benchtop upgrades', `Engineered stone in a wider slab or a feature colour, a mitred waterfall edge instead of a square one, or a step up to porcelain or a book-matched natural stone slab. This is usually the single highest-impact upgrade in the kitchen, because it is the surface a hand touches and an eye lands on before anything else. Our <a href="/guide-benchtops-compared" style="color:var(--brass)">benchtops compared</a> guide runs through what each material actually costs to live with.`],
      ['Hardware and hinges', 'Blum soft-close is standard on every collection. The upgrade path from there is Blum Legrabox drawers with integrated organisers, solid brass or bronze handles in place of a standard profile, and push-to-open on the runs where a handle would interrupt a handleless line. None of it changes how the carcass is built; all of it changes how the kitchen feels to use every day.'],
      ['Light and detail', 'Integrated LED task lighting under every overhead, a lit toe-kick, or a feature pendant over an island — the kind of detail that reads as considered rather than added later. Cheap to specify at drawing stage and disproportionately expensive to retrofit once the cabinetry is built, so this is worth deciding early even if you delay paying for it.'],
      ['How to order it', 'Send the room dimensions as normal and say which upgrades you want considered — the quote comes back with the base kitchen and each upgrade as its own line, so you can add or drop any of them before you sign off. Nothing is bundled in a way that hides what it costs.'],
    ],
    list: [
      'Base spec: 18mm moisture-resistant board, Blum soft-close',
      'Stone, porcelain or natural slab benchtop upgrades',
      'Blum Legrabox, brass hardware, push-to-open',
      'Integrated LED task and toe-kick lighting',
      'Every upgrade priced as its own line, never bundled',
      'Works on flat pack or delivered assembled',
    ],
    faq: [
      { q: 'Does upgrading a flat pack kitchen change how it is built?', a: 'No. Every collection starts from the same 18mm moisture-resistant carcasses and Blum hardware. Upgrades change the benchtop, the hardware finish and the lighting — the parts you see and touch — not the structure underneath.' },
      { q: 'What is the highest-impact upgrade for the money?', a: 'Usually the benchtop. It is the largest single surface in the room and the one a hand and an eye meet first, so a stone or porcelain upgrade tends to change how the whole kitchen reads more than any other single line.' },
      { q: 'Can I add upgrades after ordering the base kitchen?', a: 'Before sign-off, yes — the quote is revised until you are happy and nothing is cut until you sign the drawing. After sign-off, changes are a new order rather than an amendment.' },
      { q: 'Do upgrades work on a flat pack order?', a: 'Yes. Stone is templated on site regardless of whether the carcasses arrive flat or assembled, and hardware and lighting upgrades are fitted the same way in either case.' },
      { q: 'Is an upgraded Essence kitchen the same as a Maison kitchen?', a: 'Not quite — Maison and Atelier also change the door profile, the carcass finishes available and the level of joinery detail. But a well-upgraded Essence kitchen closes much of that gap for a lot less than moving up a full collection.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-kitchens-nsw.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/flat-pack-kitchens-sydney', 'Sydney'], ['/flat-pack-kitchens-newcastle', 'Newcastle'], ['/flat-pack-kitchens-wollongong', 'Wollongong'], ['/guide-granny-flat-rules-nsw', 'granny flat rules in NSW'], ['/flat-pack-kitchen-upgrades', 'flat pack kitchen upgrades']],
    slug: 'flat-pack-nsw',
    nav: 'Flat pack kitchens NSW',
    title: 'Flat Pack Kitchens NSW | Sydney, Newcastle & Beyond',
    desc: 'Custom flat pack kitchens cut in Rockhampton and freighted anywhere in NSW — Sydney, Newcastle, Wollongong and every postcode between. Fixed itemised quotes.',
    h1: 'NSW, delivered flat.<br><span class="italic brass">One specification, every postcode.</span>',
    lede: 'Not just Sydney. The same kitchen ships to Newcastle, Wollongong and everywhere on a freight route between them, at the same specification and the same honesty about what we do and do not do.',
    img: 'collection-marble-04',
    alt: 'Oak and marble kitchen with island seating, shipped flat pack across NSW',
    price: 'Quoted to your drawing',
    range: 'shipped anywhere in NSW',
    body: [
      ['One state, one specification', 'Whether the freight is going to a terrace in Sydney\'s inner west, a new build in Newcastle or a renovation in Wollongong, the cabinetry is the same: 18mm moisture-resistant board, laser-bonded edging, Blum hardware. We do not build a lesser kitchen for a longer freight run.'],
      ['Dedicated pages for the cities we ship to most', `<a href="/flat-pack-kitchens-sydney" style="color:var(--brass)">Sydney</a>, <a href="/flat-pack-kitchens-newcastle" style="color:var(--brass)">Newcastle</a> and <a href="/flat-pack-kitchens-wollongong" style="color:var(--brass)">Wollongong</a> each have their own page with local detail. Anywhere else in NSW ships on the same terms — send your postcode with the quote request and we will confirm freight to it directly.`],
      ['Before you design around a secondary dwelling', `If this kitchen is going into a granny flat or secondary dwelling, NSW runs its own statewide framework under the Housing SEPP — see <a href="/guide-granny-flat-rules-nsw" style="color:var(--brass)">granny flat rules in NSW</a> before you finalise the room size, since the approval pathway can change what actually fits.`],
      ['Affordable to start, upgrades to follow', 'Every collection starts from the same base specification regardless of postcode — see <a href="/flat-pack-kitchen-upgrades" style="color:var(--brass)">flat pack kitchen upgrades</a> for what stone, brass and lighting add once the base kitchen is sorted.'],
    ],
    list: [
      'Designed to your measurements in Rockhampton',
      '18mm moisture-resistant board, Blum lifetime hardware',
      'Flat packed or delivered assembled, your call',
      'Freight quoted to your exact NSW postcode',
      'Dedicated coverage for Sydney, Newcastle and Wollongong',
      'Fixed, itemised quote, nothing hidden in it',
    ],
    faq: [
      { q: 'Do you ship flat pack kitchens anywhere in NSW?', a: 'Yes — Sydney, Newcastle and Wollongong have their own pages, and we ship on the same terms to any NSW postcode. Send your address with the quote request and freight is confirmed directly.' },
      { q: 'Is a flat pack kitchen cheaper in regional NSW than Sydney?', a: 'The cabinetry price is the same everywhere; only the freight line changes with distance and postcode, and it is quoted separately rather than folded into the price.' },
      { q: 'Do you install kitchens in NSW?', a: 'No — our installation team works Central Queensland only. Everywhere in NSW is supply: flat pack or delivered assembled, fitted by your own builder or installer.' },
      { q: 'What is the difference between this page and the Sydney page?', a: 'This page covers the whole state; the Sydney page has content specific to that city. Both offer the same kitchen on the same terms — use whichever is more relevant to you.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-kitchens-victoria.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/flat-pack-kitchens-melbourne', 'Melbourne'], ['/flat-pack-kitchens-geelong', 'Geelong'], ['/guide-granny-flat-rules-victoria', 'small second dwelling rules in Victoria'], ['/flat-pack-kitchen-upgrades', 'flat pack kitchen upgrades']],
    slug: 'flat-pack-victoria',
    nav: 'Flat pack kitchens Victoria',
    title: 'Flat Pack Kitchens Victoria | Melbourne, Geelong & Beyond',
    desc: 'Custom flat pack kitchens cut in Rockhampton and freighted anywhere in Victoria — Melbourne, Geelong and every postcode between. Fixed itemised quotes.',
    h1: 'Victoria, delivered flat.<br><span class="italic brass">One specification, every postcode.</span>',
    lede: 'Melbourne and Geelong each have their own page. Anywhere else in Victoria ships on exactly the same terms — same board, same hardware, same fixed-quote process.',
    img: 'signature-dark',
    alt: 'Dark navy kitchen with leather bar seating, shipped flat pack across Victoria',
    price: 'Quoted to your drawing',
    range: 'shipped anywhere in Victoria',
    body: [
      ['One state, one specification', 'A kitchen freighted to regional Victoria carries the same 18mm moisture-resistant board, laser-bonded edging and Blum hardware as one going to inner Melbourne. Distance changes the freight line on the quote, not the cabinetry.'],
      ['Dedicated pages for the cities we ship to most', `<a href="/flat-pack-kitchens-melbourne" style="color:var(--brass)">Melbourne</a> and <a href="/flat-pack-kitchens-geelong" style="color:var(--brass)">Geelong</a> each have their own page. Anywhere else in Victoria ships on the same terms — send your postcode and we will confirm freight to it directly.`],
      ['Before you design around a small second dwelling', `Victoria removed the planning permit requirement for many small second dwellings in 2023, which changes the approval timeline more than it changes the kitchen — see <a href="/guide-granny-flat-rules-victoria" style="color:var(--brass)">small second dwelling rules in Victoria</a> before you finalise the room size.`],
      ['Affordable to start, upgrades to follow', 'Every collection starts from the same base specification regardless of postcode — see <a href="/flat-pack-kitchen-upgrades" style="color:var(--brass)">flat pack kitchen upgrades</a> for what stone, brass and lighting add once the base kitchen is sorted.'],
    ],
    list: [
      'Designed to your measurements in Rockhampton',
      '18mm moisture-resistant board, Blum lifetime hardware',
      'Flat packed or delivered assembled, your call',
      'Freight quoted to your exact Victorian postcode',
      'Dedicated coverage for Melbourne and Geelong',
      'Fixed, itemised quote, nothing hidden in it',
    ],
    faq: [
      { q: 'Do you ship flat pack kitchens anywhere in Victoria?', a: 'Yes — Melbourne and Geelong have their own pages, and we ship on the same terms to any Victorian postcode. Send your address with the quote request and freight is confirmed directly.' },
      { q: 'Is a flat pack kitchen cheaper in regional Victoria than Melbourne?', a: 'The cabinetry price is the same everywhere; only the freight line changes with distance and postcode.' },
      { q: 'Do you install kitchens in Victoria?', a: 'No — our installation team works Central Queensland only. Everywhere in Victoria is supply: flat pack or delivered assembled, fitted by your own builder or installer.' },
      { q: 'What is the difference between this page and the Melbourne page?', a: 'This page covers the whole state; the Melbourne page has content specific to that city. Both offer the same kitchen on the same terms — use whichever is more relevant to you.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-kitchens-airbnb.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/short-stay-kitchens', 'short-stay kitchens installed in Central Queensland'], ['/flat-pack-kitchen-upgrades', 'flat pack kitchen upgrades'], ['/guide-flat-pack-kitchen-shipping-and-freight', 'shipping and freight']],
    slug: 'airbnb-national',
    nav: 'Flat pack kitchens for Airbnb hosts',
    title: 'Flat Pack Kitchens for Airbnb & Short-Stay | Australia-Wide',
    desc: 'Flat pack kitchens for Airbnb and short-stay properties anywhere in Australia. Built to survive guest turnover and photograph well, freighted nationally.',
    h1: 'A kitchen built for<br><span class="italic brass">guests, not just you.</span>',
    lede: 'A short-stay kitchen is photographed constantly and used by people who have never seen it before. Both facts change what should be specified.',
    img: 'concrete-luxe',
    alt: 'Bright short-stay kitchen with matte black fixtures',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Specified for turnover, not for you', 'A family kitchen is used by people who learn its quirks over years. A short-stay kitchen is used by strangers every few days, who will shut a soft-close drawer like an ordinary one and not know which cupboard sticks. Full-extension Blum runners and proper hinges are not a luxury here — they are what survives guest handling.'],
      ['The photograph does real selling', 'On a booking platform, your kitchen is competing with a dozen similar listings at the same price point. An uncluttered run, a benchtop that photographs cleanly and hidden storage matter more than an expensive finish nobody will linger on in a 400-pixel-wide thumbnail.'],
      ['If you already have an installer, or need supply only', 'This is a supply-only offer — cut in Rockhampton, packed flat or delivered assembled, freighted to your property anywhere in Australia. Within Central Queensland our own team also installs; see <a href="/short-stay-kitchens" style="color:var(--brass)">short-stay kitchens</a> for that local option.'],
    ],
    list: [
      'Specified for guest turnover, not daily family use',
      'Blum full-extension runners rated for heavy handling',
      'Moisture-resistant carcasses, laser-bonded edging',
      'Layouts designed around cleaning and turnover speed',
      'Flat packed or delivered assembled, your call',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'Do you supply kitchens for Airbnb properties outside Queensland?', a: 'Yes, anywhere in Australia — cut to your room, packed flat or delivered assembled, freighted to the property. Installation is your own trade outside Central Queensland.' },
      { q: 'What benchtop suits a short-stay property?', a: 'Engineered stone or porcelain — both photograph well, resist heat and stains from guest use, and need very little upkeep between changeovers.' },
      { q: 'Does a short-stay kitchen need different hardware to a family kitchen?', a: 'The board and hardware specification does not change, but full-extension Blum runners matter even more here, since guests handle drawers less carefully than someone who lives with the kitchen daily.' },
      { q: 'How much does a short-stay kitchen cost?', a: 'The same bands as any kitchen we supply — from $15,000 for Essence — quoted to your drawing with freight shown separately to your postcode.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-kitchens-investors.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/guide-does-a-new-kitchen-add-value', 'does a new kitchen add value'], ['/trade', 'trade and builder accounts'], ['/flat-pack-kitchen-upgrades', 'flat pack kitchen upgrades']],
    slug: 'investors',
    nav: 'Flat pack kitchens for property investors',
    title: 'Flat Pack Kitchens for Investment Properties | Bilt & Co',
    desc: 'Fixed-price flat pack kitchens for investment property renovations anywhere in Australia — specified for tenant turnover and a defensible valuation uplift.',
    h1: 'Specified for the<br><span class="italic brass">next tenant, and the one after.</span>',
    lede: 'An investment kitchen has a different brief to a family one: it has to survive tenant turnover and justify the rent, not reflect one owner\'s taste.',
    img: 'galley-stone',
    alt: 'Compact investment property kitchen with stone benchtop',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Specify for durability over personality', 'A neutral, durable palette rents and re-lets more easily than a bold one, and holds its condition through several tenancies rather than one. Moisture-resistant carcasses and laser-bonded edging matter more here than anywhere, since an investment kitchen is rarely maintained as attentively as an owner-occupied one.'],
      ['A fixed, itemised quote for a fixed budget', 'Renovation budgets on an investment property are usually set before the trades start, and a scope that grows once work begins is the single biggest way a renovation stops making financial sense. Our quotes are fixed and itemised before anything is cut, so the number you budget on is the number you pay.'],
      ['Does a kitchen actually add value?', `Sometimes, and sometimes the existing kitchen is not what is holding the rent or the sale price back. See <a href="/guide-does-a-new-kitchen-add-value" style="color:var(--brass)">does a new kitchen add value</a> before committing a renovation budget on assumption alone.`],
    ],
    list: [
      'Neutral, durable specification built for tenant turnover',
      'Fixed, itemised quote before anything is cut',
      'Moisture-resistant carcasses, laser-bonded edging',
      'Flat packed or delivered assembled, your call',
      'Freighted to any investment property in Australia',
      'Trade accounts available for multiple properties',
    ],
    faq: [
      { q: 'Does a new kitchen increase rental value?', a: 'Often, but not always — it depends on the current condition and what is actually limiting the rent. See our guide on whether a new kitchen adds value before committing a budget.' },
      { q: 'Can I get the same kitchen across multiple investment properties?', a: 'Yes — a repeated specification is a common approach for investors with several properties, and it simplifies quoting and maintenance across the portfolio. See our trade page for volume arrangements.' },
      { q: 'Is a cheaper kitchen sensible for a rental property?', a: 'Cheaper materials often cost more over several tenancies through earlier failure — durability tends to matter more in a rental than an owner-occupied kitchen, not less.' },
      { q: 'Do you offer fixed pricing for investment renovations?', a: 'Yes — every quote is fixed and itemised before work starts, which matters more on an investment budget than almost anywhere else.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-kitchens-container-homes.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/tiny-home-kitchens', 'tiny home kitchens'], ['/owner-builder-kitchen-supply', 'owner-builder supply'], ['/guide-what-is-moisture-resistant-board', 'what is moisture-resistant board']],
    slug: 'container-homes',
    nav: 'Flat pack kitchens for container homes',
    title: 'Flat Pack Kitchens for Container Homes | Bilt & Co',
    desc: 'Kitchens cut to the exact internal width of a shipping container conversion, flat packed to fit through container doors and freighted anywhere in Australia.',
    h1: 'Cut to a container\'s<br><span class="italic brass">exact internal width.</span>',
    lede: 'A container home has less forgiving dimensions than a standard room. The kitchen has to be drawn to the container, not adjusted after the fact.',
    img: 'detail-black-cabinetry',
    alt: 'Compact kitchen fitted into a container home conversion',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Standard container widths change everything', 'A 20 or 40-foot shipping container has a fixed, narrow internal width once insulation and lining are added, which rules out some layouts outright and makes every centimetre of cabinetry depth a real decision. We draw to your actual internal measurements rather than a generic room width.'],
      ['Flat pack is close to essential here', 'Container door openings and internal corridors are tighter than a standard house, and an assembled carcass can simply not fit through where a flat carton will. This is one of the clearest cases where flat pack is the practical choice rather than a preference.'],
      ['Ventilation and condensation need extra thought', 'Steel containers behave differently to timber-framed construction under humidity and temperature swings — worth discussing insulation and ventilation with your builder alongside the kitchen, since moisture-resistant carcasses matter even more in this build type.'],
    ],
    list: [
      'Cut to your container\'s exact internal dimensions',
      'Flat packed to fit through container door openings',
      'Moisture-resistant carcasses for a steel-shell build',
      'Compact layouts drawn for narrow container widths',
      'Full service drawings for your electrician and plumber',
      'Freighted to any container home site in Australia',
    ],
    faq: [
      { q: 'Can a full kitchen fit in a shipping container home?', a: 'Yes, drawn to the container\'s actual internal width — a compact galley layout is the most common and space-efficient fit. Send your measurements and we will confirm what suits.' },
      { q: 'Should a container home kitchen be flat pack or assembled?', a: 'Flat pack, in almost every case — container doors and internal corridors are narrower than a standard house, and an assembled carcass may not physically fit through them.' },
      { q: 'Does a container home need different cabinetry specification?', a: 'Moisture-resistant carcasses matter more here, since a steel shell behaves differently to timber-framed construction under humidity and temperature change.' },
      { q: 'Do you supply kitchens for container homes outside Queensland?', a: 'Yes, anywhere in Australia — cut to your container\'s measurements and freighted flat pack to the site.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-kitchens-relocatable-homes.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/tiny-home-kitchens', 'tiny home kitchens'], ['/granny-flat-kitchens', 'granny flat kitchens'], ['/guide-flat-pack-kitchen-shipping-and-freight', 'shipping and freight']],
    slug: 'relocatable-homes',
    nav: 'Flat pack kitchens for relocatable homes',
    title: 'Flat Pack Kitchens for Relocatable & Demountable Homes',
    desc: 'Kitchens for transportable, relocatable and demountable homes, specified to handle transit vibration and freighted flat pack anywhere in Australia.',
    h1: 'Built to move once,<br><span class="italic brass">and never loosen after.</span>',
    lede: 'A relocatable home travels on a truck before it is ever lived in. The kitchen has to survive that trip as well as daily use afterwards.',
    img: 'wardrobe-robe',
    alt: 'Built-in cabinetry in a relocatable home',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Transit vibration is a real specification factor', 'A relocatable or demountable home is transported as a completed or near-completed module, which subjects cabinetry to sustained road vibration well beyond normal use. Properly fixed hardware and a securely built carcass matter more here than in a site-built home, where the kitchen is only ever installed once and never moves again.'],
      ['Flat pack or assembled, depending on your build stage', 'If cabinetry goes in before transport, we specify and fit it to handle the trip. If it goes in after the module is placed, flat pack or delivered assembled both work — the same decision as any other supply job.'],
      ['Manufacturer coordination', 'We work from your relocatable home manufacturer\'s floor plan and rough-in details rather than assuming a generic layout, since these builds often have fixed service locations set by the manufacturer\'s own standard chassis and services.'],
    ],
    list: [
      'Specified to withstand transit vibration if fitted pre-transport',
      'Blum hardware secured for repeated movement, not just daily use',
      'Compact layouts suited to relocatable home floor plans',
      'Coordinated with your manufacturer\'s service locations',
      'Flat packed or delivered assembled, depending on build stage',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'Can kitchen cabinetry be fitted before a relocatable home is transported?', a: 'Yes, and we specify it to handle transit vibration if that is your build sequence — tell us at the quote stage so hardware and fixing points are chosen accordingly.' },
      { q: 'Do you work from a relocatable home manufacturer\'s plans?', a: 'Yes — send us the floor plan and service locations from your manufacturer and we draw the kitchen to fit their specific layout rather than a generic room.' },
      { q: 'Is flat pack or assembled better for a relocatable home?', a: 'It depends on whether the kitchen goes in before or after transport — before, transit-rated fixing matters most; after, it is the same flat pack versus assembled decision as any other supply job.' },
      { q: 'Do you supply kitchens for relocatable homes outside Queensland?', a: 'Yes, anywhere in Australia, coordinated with your manufacturer\'s build schedule and freighted to the site or factory as required.' },
    ],
  });

  SEGMENTS.push({
    file: 'remote-fifo-kitchen-supply.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/trade', 'trade and builder accounts'], ['/guide-flat-pack-kitchen-shipping-and-freight', 'shipping and freight'], ['/owner-builder-kitchen-supply', 'owner-builder supply']],
    slug: 'remote-fifo',
    nav: 'Kitchen supply for remote & FIFO sites',
    title: 'Kitchen Supply for Remote & FIFO Sites Australia-Wide',
    desc: 'Flat pack kitchens for remote builds, mining camps and FIFO accommodation, freighted anywhere in Australia with freight already factored into the process.',
    h1: 'Freight is already<br><span class="italic brass">the normal cost of building remote.</span>',
    lede: 'Every remote build already pays a freight premium on everything. Flat pack is the version of a kitchen that does not multiply it unnecessarily.',
    img: 'concrete-luxe',
    alt: 'Durable matte kitchen suited to remote and mining accommodation',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Why flat pack matters more here than anywhere', 'Freight to a remote site is expensive regardless of what is on the truck, which makes the freight-volume saving of a flat-packed kitchen — see <a href="/guide-flat-pack-kitchen-shipping-and-freight" style="color:var(--brass)">shipping and freight</a> — worth considerably more here than on a suburban job. Cartons simply move for less than an assembled carcass over the same remote route.'],
      ['Specified for hard use and harder replacement logistics', 'A cabinet that fails on a remote or mining site is not a quick warranty callout — it can be weeks before a tradesperson or replacement part reaches site. We specify to a standard built to outlast normal residential use, on the basis that replacing anything remotely is expensive in time as well as money.'],
      ['Bulk and repeat orders', 'Camp accommodation and multi-unit remote builds often need the same kitchen or kitchenette repeated many times over — see our <a href="/trade" style="color:var(--brass)">trade page</a> for how repeated specification and volume ordering work.'],
    ],
    list: [
      'Flat packed for freight efficiency over long distances',
      'Specified for hard use where replacement is slow and costly',
      'Moisture-resistant carcasses, laser-bonded edging',
      'Repeat and bulk specification for camp accommodation',
      'Full service drawings for remote-site trades',
      'Freighted anywhere in Australia, including via multiple carriers',
    ],
    faq: [
      { q: 'Do you ship kitchens to remote or mining sites?', a: 'Yes — anywhere in Australia, with freight quoted to the actual delivery point, which may involve more than one carrier for genuinely remote locations.' },
      { q: 'Is flat pack cheaper than assembled for remote freight?', a: 'Considerably, and the saving grows with distance — a carton takes a fraction of the truck space an assembled carcass needs for the same kitchen.' },
      { q: 'Can I order the same kitchen multiple times for camp accommodation?', a: 'Yes — repeated or bulk specification is common for multi-unit remote builds. See our trade page for how volume ordering works.' },
      { q: 'How do you handle warranty on a remote site?', a: 'The same Blum lifetime mechanical warranty applies regardless of location — we specify to a durable standard from the outset specifically because remote-site replacement is slow and expensive.' },
    ],
  });

  SEGMENTS.push({
    file: 'office-kitchenette-supply.html',
    parent: ['flat-pack-kitchenettes.html', 'Flat pack kitchenettes'],
    related: [['/kitchenettes', 'kitchenettes delivered assembled'], ['/flat-pack-kitchenettes', 'flat pack kitchenettes'], ['/trade', 'trade and builder accounts']],
    slug: 'office-kitchenette',
    nav: 'Office kitchenette supply',
    title: 'Office Kitchenette Supply Australia-Wide | Bilt & Co',
    desc: 'Tea-point and staff kitchenettes for offices and workplaces — bench, sink and cold storage, cut to your fit-out and freighted anywhere in Australia.',
    h1: 'A staff kitchen<br><span class="italic brass">that survives an open-plan office.</span>',
    lede: 'An office kitchenette gets used by everyone and cleaned by no one in particular. Specify for that, not for a display photo.',
    img: 'detail-stone-black',
    alt: 'Compact office kitchenette with dark stone benchtop',
    price: 'From $4,500',
    range: '1.2m – 1.8m run, shipped flat',
    body: [
      ['Not a commercial kitchen, and not trying to be one', 'This is a staff tea point — a sink, a bench, cold storage and space for a microwave or small appliances, not a commercial food-preparation kitchen and not built or certified to commercial food-service standards. If your fit-out needs certified commercial catering equipment, that is a different specification to discuss directly with your fitout consultant.'],
      ['Durable finishes for shared, unsupervised use', 'An office kitchenette gets more anonymous daily wear than almost any residential kitchen — Blum full-extension runners and laser-bonded edging matter here specifically because nobody individually maintains it the way a homeowner would.'],
      ['Fits your existing fit-out drawings', 'We work from your office fit-out plans and services layout rather than assuming a standard room, and provide service drawings your electrician and plumber can rough in from ahead of the cabinetry arriving.'],
    ],
    list: [
      '1.2m to 1.8m runs, cut to your fit-out dimensions',
      'Sink base, bench and cold-storage provision',
      'Blum full-extension runners for shared daily use',
      'Not certified for commercial food preparation',
      'Flat packed or delivered assembled, your call',
      'Freighted to any office location in Australia',
    ],
    faq: [
      { q: 'Is this suitable for a commercial kitchen fit-out?', a: 'No — this is a staff tea-point kitchenette, not a certified commercial food-preparation kitchen. Talk to a commercial fitout specialist if you need certified catering equipment.' },
      { q: 'How much does an office kitchenette cost?', a: 'From $4,500 for a 1.2 metre run including carcasses, doors and Blum hardware, with freight quoted to your office location.' },
      { q: 'Can you work from our office fit-out drawings?', a: 'Yes — send your existing fit-out plan and services layout and we draw the kitchenette to fit it rather than assuming a standard room.' },
      { q: 'Do you supply office kitchenettes outside Queensland?', a: 'Yes, anywhere in Australia — flat pack or delivered assembled, freighted to the site.' },
    ],
  });

  SEGMENTS.push({
    file: 'display-home-kitchenette-supply.html',
    parent: ['flat-pack-kitchenettes.html', 'Flat pack kitchenettes'],
    related: [['/trade', 'trade and builder accounts'], ['/new-build-kitchens', 'new build kitchens'], ['/flat-pack-kitchen-upgrades', 'flat pack kitchen upgrades']],
    slug: 'display-home',
    nav: 'Display home kitchenette supply',
    title: 'Display Home Kitchenette & Kitchen Supply | Bilt & Co',
    desc: 'Kitchens and kitchenettes for builder display homes, specified to present well under constant foot traffic and freighted anywhere in Australia.',
    h1: 'A kitchen judged<br><span class="italic brass">by thousands of visitors, not one owner.</span>',
    lede: 'A display home kitchen is walked through by strangers every open day for years. It needs to photograph and present, not just function.',
    img: 'island-calacatta',
    alt: 'New build display kitchen with island bench',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Presentation under constant foot traffic', 'A display home kitchen is touched, opened and photographed by more people in a year than most kitchens see in a decade, without the daily cooking wear of a lived-in home. Durable soft-close hardware keeps drawers and doors feeling new under that volume of casual handling.'],
      ['Consistent specification across multiple display homes', 'Builders running several display homes across different estates often want the same specification repeated for consistency and easier quoting — see our <a href="/trade" style="color:var(--brass)">trade page</a> for how repeated and bulk specification works.'],
      ['Upgradeable for a premium display', `Where a display home is positioned to sell a higher price point, our <a href="/flat-pack-kitchen-upgrades" style="color:var(--brass)">upgrade options</a> — stone, brass, integrated lighting — let the display kitchen match the aspirational end of the range being sold.`],
    ],
    list: [
      'Specified for durability under constant foot traffic',
      'Consistent specification across multiple display homes',
      'Photographs well: clean lines, considered detail',
      'Upgrade options for a premium display standard',
      'Flat packed or delivered assembled, your call',
      'Freighted to any display estate in Australia',
    ],
    faq: [
      { q: 'Can you supply the same kitchen for multiple display homes?', a: 'Yes — repeated specification across several display homes is common and simplifies quoting. See our trade page for volume arrangements.' },
      { q: 'Do display home kitchens need different hardware to a normal kitchen?', a: 'The specification does not change, but durable soft-close hardware matters more here given the sheer volume of casual handling from visitors over the display period.' },
      { q: 'Can a display home kitchen be upgraded to match a premium price point?', a: 'Yes — see our flat pack kitchen upgrades page for stone, brass and lighting options that lift the display to match a higher-end range.' },
      { q: 'Do you supply display home kitchens outside Queensland?', a: 'Yes, anywhere in Australia, with consistent specification available across multiple estates.' },
    ],
  });

  SEGMENTS.push({
    file: 'student-accommodation-kitchenette.html',
    parent: ['flat-pack-kitchenettes.html', 'Flat pack kitchenettes'],
    related: [['/flat-pack-kitchenettes', 'flat pack kitchenettes'], ['/trade', 'trade and builder accounts'], ['/kitchenettes', 'kitchenettes delivered assembled']],
    slug: 'student-accommodation',
    nav: 'Student accommodation kitchenette supply',
    title: 'Student Accommodation Kitchenette Supply | Bilt & Co',
    desc: 'Compact kitchenettes for student accommodation and boarding houses, specified for high turnover and repeated bulk ordering across many rooms.',
    h1: 'One kitchenette,<br><span class="italic brass">ordered a hundred times over.</span>',
    lede: 'Student accommodation needs the same compact kitchenette repeated across dozens or hundreds of rooms, specified for the hardest use it will ever see.',
    img: 'detail-black-cabinetry',
    alt: 'Compact kitchenette suited to student accommodation',
    price: 'From $4,500',
    range: '1.2m – 1.8m run, shipped flat',
    body: [
      ['Built for the highest-turnover use case we supply', 'Student accommodation turns over tenants annually or more, with less individual care for the space than almost any other residential use. Blum full-extension runners and moisture-resistant carcasses are specified here for hard use over a long service life, not a display finish.'],
      ['Volume ordering for many identical rooms', 'A single specification repeated across dozens or hundreds of rooms is the normal order shape for this sector — see our <a href="/trade" style="color:var(--brass)">trade page</a> for how repeat and bulk pricing works with a developer or operator.'],
      ['Compact by design, not by compromise', 'A student room kitchenette needs a sink, cold storage and bench in a small footprint — see <a href="/flat-pack-kitchenettes" style="color:var(--brass)">flat pack kitchenettes</a> for the base specification this is built from.'],
    ],
    list: [
      '1.2m to 1.8m runs, repeated across many rooms',
      'Blum full-extension runners rated for high turnover',
      'Moisture-resistant carcasses for long service life',
      'Bulk and repeat-order pricing available',
      'Flat packed for efficient freight to multi-unit sites',
      'Freighted anywhere in Australia',
    ],
    faq: [
      { q: 'Can you supply kitchenettes for a whole student accommodation building?', a: 'Yes — a single specification ordered in volume across many rooms is the normal shape of this project. See our trade page for bulk pricing.' },
      { q: 'How durable is a student accommodation kitchenette?', a: 'Specified with Blum full-extension runners and moisture-resistant carcasses for high turnover and less individual care than a typical residential kitchen — built for hard, repeated use.' },
      { q: 'How much does a bulk kitchenette order cost per unit?', a: 'Quoted per your total order volume and specification — contact us with the number of rooms and we will provide a fixed unit price and total.' },
      { q: 'Do you supply student accommodation projects outside Queensland?', a: 'Yes, anywhere in Australia, flat packed for efficient freight to a multi-unit site.' },
    ],
  });

  SEGMENTS.push({
    file: 'medical-practice-kitchenette.html',
    parent: ['flat-pack-kitchenettes.html', 'Flat pack kitchenettes'],
    related: [['/flat-pack-kitchenettes', 'flat pack kitchenettes'], ['/accessible-kitchens', 'accessible kitchens'], ['/kitchenettes', 'kitchenettes delivered assembled']],
    slug: 'medical-kitchenette',
    nav: 'Medical & allied health practice kitchenette',
    title: 'Medical & Allied Health Practice Kitchenette | Bilt & Co',
    desc: 'Staff tea-point kitchenettes for medical, dental and allied health practices — durable, easy to clean, and freighted anywhere in Australia.',
    h1: 'A staff kitchenette,<br><span class="italic brass">not a clinical kitchen.</span>',
    lede: 'A practice kitchenette needs to be easy to keep clean and durable under shared staff use — it is not, and does not claim to be, a certified clinical or food-handling space.',
    img: 'detail-stone-black',
    alt: 'Compact staff kitchenette with dark stone benchtop',
    price: 'From $4,500',
    range: '1.2m – 1.8m run, shipped flat',
    body: [
      ['A staff amenity, not a clinical fit-out', 'This is a break-room or staff tea-point kitchenette — a sink, bench and cold storage for staff use — not a certified clinical, sterilisation or food-handling space. If your fit-out has clinical compliance requirements, those are addressed separately with your fitout consultant and building certifier.'],
      ['Easy-clean finishes for a shared amenity', 'Non-porous stone or laminate benchtops and simple, wipeable cabinet fronts suit a space used by rotating staff throughout the day, with no single person responsible for its upkeep.'],
      ['Fits your existing fit-out drawings', 'We work from your practice fit-out plan and services layout, providing service drawings your electrician and plumber can rough in from ahead of installation.'],
    ],
    list: [
      '1.2m to 1.8m runs, cut to your fit-out dimensions',
      'Sink base, bench and cold-storage provision',
      'Easy-clean, non-porous benchtop options',
      'Not a certified clinical or food-handling space',
      'Flat packed or delivered assembled, your call',
      'Freighted to any practice location in Australia',
    ],
    faq: [
      { q: 'Is this a clinical or certified kitchen fit-out?', a: 'No — this is a staff tea-point kitchenette. Clinical, sterilisation or food-handling compliance is a separate specification handled with your fitout consultant and building certifier.' },
      { q: 'How much does a practice kitchenette cost?', a: 'From $4,500 for a 1.2 metre run including carcasses, doors and Blum hardware, with freight quoted to your practice location.' },
      { q: 'Can you work from our practice fit-out drawings?', a: 'Yes — send your existing plan and services layout and we draw the kitchenette to fit it.' },
      { q: 'Do you supply practice kitchenettes outside Queensland?', a: 'Yes, anywhere in Australia — flat pack or delivered assembled, freighted to the site.' },
    ],
  });

  SEGMENTS.push({
    file: 'gym-studio-kitchenette.html',
    parent: ['flat-pack-kitchenettes.html', 'Flat pack kitchenettes'],
    related: [['/flat-pack-kitchenettes', 'flat pack kitchenettes'], ['/kitchenettes', 'kitchenettes delivered assembled'], ['/trade', 'trade and builder accounts']],
    slug: 'gym-kitchenette',
    nav: 'Gym & studio kitchenette supply',
    title: 'Gym & Fitness Studio Kitchenette Supply | Bilt & Co',
    desc: 'Reception and staff kitchenettes for gyms, fitness studios and wellness spaces — durable, easy to clean, freighted anywhere in Australia.',
    h1: 'A reception kitchenette<br><span class="italic brass">that keeps up with foot traffic.</span>',
    lede: 'A gym or studio kitchenette sits front of house and behind the scenes at once — presentable for members, durable for constant staff use.',
    img: 'concrete-luxe',
    alt: 'Compact kitchenette with matte black fixtures suited to a fitness studio',
    price: 'From $4,500',
    range: '1.2m – 1.8m run, shipped flat',
    body: [
      ['Front of house and staff-use, at once', 'A gym reception kitchenette is often visible to members while also being the space staff use constantly through the day — a specification that has to present well and survive heavy daily use simultaneously.'],
      ['Durable, easy-clean surfaces', 'Non-porous benchtops and simple, wipeable cabinet fronts suit a high-traffic, shared-use environment where cleaning happens frequently but maintenance is rarely a single person\'s job.'],
      ['Consistent specification across multiple locations', 'Gym and studio franchises with several sites often want an identical fit-out repeated for brand consistency — see our <a href="/trade" style="color:var(--brass)">trade page</a> for multi-site and volume arrangements.'],
    ],
    list: [
      '1.2m to 1.8m runs, cut to your fit-out dimensions',
      'Durable, non-porous, easy-clean benchtop options',
      'Blum full-extension runners for heavy daily use',
      'Consistent specification across multiple locations',
      'Flat packed or delivered assembled, your call',
      'Freighted to any location in Australia',
    ],
    faq: [
      { q: 'How much does a gym kitchenette cost?', a: 'From $4,500 for a 1.2 metre run including carcasses, doors and Blum hardware, with freight quoted to your location.' },
      { q: 'Can you supply the same kitchenette across multiple gym locations?', a: 'Yes — consistent specification across several sites is a common request for franchises. See our trade page for multi-site arrangements.' },
      { q: 'What benchtop suits a gym or studio kitchenette?', a: 'A non-porous, easy-clean surface such as engineered stone or laminate suits the high-traffic, frequently cleaned nature of a gym front-of-house space.' },
      { q: 'Do you supply gym kitchenettes outside Queensland?', a: 'Yes, anywhere in Australia — flat pack or delivered assembled, freighted to the site.' },
    ],
  });

  SEGMENTS.push({
    file: 'community-hall-kitchen-supply.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/flat-pack-kitchenettes', 'flat pack kitchenettes'], ['/kitchenettes', 'kitchenettes delivered assembled'], ['/owner-builder-kitchen-supply', 'owner-builder supply']],
    slug: 'community-hall',
    nav: 'Community hall & church kitchen supply',
    title: 'Community Hall & Church Kitchen Supply | Bilt & Co',
    desc: 'Kitchens for community halls, churches and not-for-profit facilities — durable for volunteer use, quoted fixed for committee budgeting, freighted nationally.',
    h1: 'Built for volunteers,<br><span class="italic brass">budgeted for a committee.</span>',
    lede: 'A community kitchen is used by rotating volunteers and has to be approved against a fixed budget, usually by people who are not builders.',
    img: 'openplan-long',
    alt: 'Long kitchen run suited to a community hall or church facility',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['A fixed number for a committee to approve', 'Community and not-for-profit renovation budgets are usually approved once, by a committee, against a fixed figure — not adjusted as work proceeds. A fixed, itemised quote before anything is cut is exactly what that kind of approval process needs.'],
      ['Durable for rotating, unsupervised use', 'Nobody personally maintains a community kitchen the way a homeowner does — moisture-resistant carcasses and full-extension Blum runners matter here specifically because the people using it change constantly and nobody is individually responsible for its upkeep.'],
      ['This is not a certified commercial catering kitchen', 'If your hall runs catered events requiring certified commercial kitchen compliance, that is a separate specification to work through with a commercial fitout specialist — this offer covers a genuine kitchen for community and volunteer use, not commercial food service.'],
    ],
    list: [
      'Fixed, itemised quote suited to committee approval',
      'Moisture-resistant carcasses for rotating, shared use',
      'Blum full-extension runners for unsupervised handling',
      'Not certified for commercial food service',
      'Flat packed or delivered assembled, your call',
      'Freighted to any community facility in Australia',
    ],
    faq: [
      { q: 'Can you quote a fixed price for a committee to approve?', a: 'Yes — every quote is fixed and itemised before anything is cut, which suits a not-for-profit or committee approval process that needs one number to sign off on.' },
      { q: 'Is this suitable for a commercial catering kitchen?', a: 'No — this is a genuine kitchen for community and volunteer use, not a certified commercial food-service kitchen. Talk to a commercial fitout specialist if certified catering compliance is required.' },
      { q: 'How durable is a community hall kitchen specification?', a: 'Specified for rotating, unsupervised volunteer use with moisture-resistant carcasses and full-extension Blum runners — built for hard use over a long service life.' },
      { q: 'Do you supply community facilities outside Queensland?', a: 'Yes, anywhere in Australia — flat pack or delivered assembled, freighted to the site.' },
    ],
  });

  SEGMENTS.push({
    file: 'retirement-village-kitchenette.html',
    parent: ['flat-pack-kitchenettes.html', 'Flat pack kitchenettes'],
    related: [['/aging-in-place-kitchens', 'aging in place kitchens'], ['/accessible-kitchens', 'accessible kitchens'], ['/flat-pack-kitchenettes', 'flat pack kitchenettes']],
    slug: 'retirement-village',
    nav: 'Retirement village kitchenette supply',
    title: 'Retirement Village & Over-55s Kitchenette Supply | Bilt & Co',
    desc: 'Compact, accessible kitchenettes for retirement village and over-55s units, specified for ease of use and freighted anywhere in Australia.',
    h1: 'Compact, and genuinely<br><span class="italic brass">easier to live with.</span>',
    lede: 'A retirement unit kitchenette benefits from the same accessible detailing as a full aging-in-place kitchen, in a smaller footprint.',
    img: 'galley-stone',
    alt: 'Compact galley kitchenette suited to a retirement village unit',
    price: 'From $4,500',
    range: '1.2m – 1.8m run, shipped flat',
    body: [
      ['Accessible detailing in a compact footprint', 'D-pull handles, lever taps, task lighting and drawers rather than low cupboards — see <a href="/aging-in-place-kitchens" style="color:var(--brass)">aging in place kitchens</a> for the full reasoning — all translate directly into a smaller retirement unit kitchenette without adding meaningfully to the cost.'],
      ['Repeat specification across a village', 'Retirement village operators building or refurbishing multiple units often want an identical, accessible kitchenette specification repeated across the development — a straightforward volume order once the first unit\'s specification is confirmed.'],
      ['If funded modifications are involved', `Where a specific unit needs modifications under a funded aged-care or accessibility pathway, see <a href="/accessible-kitchens" style="color:var(--brass)">accessible kitchens</a> for how we quote against an occupational therapist\'s specification.`],
    ],
    list: [
      '1.2m to 1.8m runs with accessible detailing as standard',
      'D-pull handles, lever taps, task lighting',
      'Drawers rather than low cupboards throughout',
      'Repeat specification available across a village development',
      'Flat packed or delivered assembled, your call',
      'Freighted to any retirement village in Australia',
    ],
    faq: [
      { q: 'Does an accessible kitchenette cost more?', a: 'Barely — full-extension drawers, D-pull handles and task lighting are close to standard specification already, so the accessible detailing adds very little to the base cost.' },
      { q: 'Can you supply the same kitchenette across a whole retirement village?', a: 'Yes — repeat specification across multiple units is a common and straightforward volume order once the first unit is confirmed.' },
      { q: 'Do you quote against an occupational therapist specification?', a: 'Yes, where a specific unit needs funded modifications — see our accessible kitchens page for how that process works.' },
      { q: 'Do you supply retirement villages outside Queensland?', a: 'Yes, anywhere in Australia — flat pack or delivered assembled, freighted to the site.' },
    ],
  });

  SEGMENTS.push({
    file: 'outdoor-kitchen-flat-pack.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/flat-pack-kitchens', 'indoor flat pack kitchens'], ['/kitchen-islands', 'kitchen islands'], ['/guide-kitchen-sink-materials-compared', 'sink materials compared']],
    slug: 'outdoor-kitchen',
    nav: 'Outdoor kitchen cabinetry',
    title: 'Flat Pack Outdoor Kitchen Cabinetry | Bilt & Co',
    desc: 'Weather-rated outdoor kitchen cabinetry, cut to your alfresco space and freighted flat pack anywhere in Australia. A different spec to an indoor kitchen.',
    h1: 'Outdoor cabinetry,<br><span class="italic brass">specified for the weather, not just the look.</span>',
    lede: 'An outdoor kitchen is not an indoor kitchen with a roof over it. UV, humidity and temperature swings are a different specification problem entirely.',
    img: 'concrete-luxe',
    alt: 'Weather-rated outdoor kitchen cabinetry',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Why indoor board does not belong outside', 'Standard and even moisture-resistant indoor board is not rated for sustained UV and weather exposure the way genuinely outdoor-rated materials are. An alfresco cabinet built to indoor specification will fail — swelling, fading or delaminating — far faster than the same cabinet built for the exposure it actually faces.'],
      ['What changes in the specification', 'Weather-rated compact laminate or marine-grade materials, stainless steel or powder-coated hardware rather than standard finishes, and porcelain or stone benchtops with genuine UV stability — see is a porcelain benchtop worth it for where that material earns its cost outdoors specifically.'],
      ['Covered versus fully exposed alfresco', 'A covered alfresco area under a solid roof faces less extreme exposure than a fully open outdoor kitchen, and the specification can be adjusted accordingly — tell us which you have so the quote is not over- or under-specified for your actual conditions.'],
    ],
    list: [
      'Weather-rated board and finishes, not indoor specification',
      'Stainless steel or powder-coated hardware',
      'Porcelain or stone benchtop for UV and heat stability',
      'Specified differently for covered versus open exposure',
      'Flat packed for easier transport to an outdoor build',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'Can I use an indoor kitchen cabinet outdoors?', a: 'No — standard and even moisture-resistant indoor board is not rated for sustained UV and weather exposure and will fail considerably faster than genuinely outdoor-rated materials.' },
      { q: 'What benchtop suits an outdoor kitchen?', a: 'Porcelain or engineered stone with genuine UV stability — see our guide on whether a porcelain benchtop is worth it for where its heat and UV resistance matter most.' },
      { q: 'Does a covered alfresco need the same specification as a fully open outdoor kitchen?', a: 'Not necessarily — a covered area faces less extreme exposure, and the specification can be adjusted. Tell us which applies so the quote matches your actual conditions.' },
      { q: 'Do you supply outdoor kitchens outside Queensland?', a: 'Yes, anywhere in Australia — cut to your alfresco space and freighted flat pack for ease of transport.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-butlers-pantry.html',
    parent: ['butlers-pantries.html', "Butler's pantries"],
    related: [["/butlers-pantries", "butler's pantries installed in Central Queensland"], ['/guide-butlers-pantry-worth-it', "whether a butler's pantry is worth it"], ['/flat-pack-kitchens', 'flat pack kitchens']],
    slug: 'flat-pack-butlers-pantry',
    nav: "Flat pack butler's pantry",
    title: "Flat Pack Butler's Pantry Australia-Wide | Bilt & Co",
    desc: "A butler's pantry cut to your room and shipped flat pack anywhere in Australia — bench, storage and a second sink provision, same specification as our installed pantries.",
    h1: "A butler's pantry,<br><span class=\"italic brass\">shipped flat to your door.</span>",
    lede: "The overflow kitchen that keeps mess out of sight, cut to your room and freighted anywhere in Australia for you or your installer to fit.",
    img: 'material-samples',
    alt: "Butler's pantry cabinetry with stone benchtop and storage",
    price: 'From $4,000',
    range: 'shipped Australia-wide',
    body: [
      ['The same specification, freighted rather than installed by us', `Everything that makes a butler's pantry worth having — bench space, concealed storage, a second sink provision — is the same whether we install it in Central Queensland or freight it flat packed to your own installer. See <a href="/guide-butlers-pantry-worth-it" style="color:var(--brass)">whether a butler's pantry is worth it</a> for the layout reasoning.`],
      ['What arrives, and what your trades need', 'Cartons labelled to a numbered drawing, hardware bagged per cabinet, and a service drawing showing exactly where the second sink and any power points need to land — the same document your builder\'s plumber and electrician use for the main kitchen.'],
      ['Sized to fit behind a hidden door', 'A butler\'s pantry is often designed to disappear behind a door matching the main kitchen joinery — tell us the opening dimensions and we draw the internal layout to make the most of the space behind it.'],
    ],
    list: [
      'Bench, concealed storage and second sink provision',
      'Cut to your room, packed flat, freighted nationally',
      'Full service drawings for your plumber and electrician',
      '18mm moisture-resistant board, Blum hardware',
      'Delivered assembled instead, if you prefer',
      'From $4,000 depending on size and specification',
    ],
    faq: [
      { q: "Can I get a butler's pantry shipped flat pack outside Queensland?", a: 'Yes — the same specification we install in Central Queensland ships flat packed anywhere in Australia for your own installer to fit.' },
      { q: "How much does a flat pack butler's pantry cost?", a: 'From $4,000 depending on size and specification, with freight quoted separately to your postcode.' },
      { q: "Does a butler's pantry need its own sink?", a: 'Many do, though it depends on your plumbing and layout — our service drawing shows exactly where a second sink connection would need to land if you want one.' },
      { q: "Can a flat pack butler's pantry match my main kitchen?", a: 'Yes — we specify the same board, doors and hardware as your main kitchen order so the two present as one considered fit-out rather than two separate jobs.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-wardrobes.html',
    parent: ['joinery.html', 'Joinery'],
    related: [['/joinery', 'wardrobes and joinery installed in Central Queensland'], ['/flat-pack-cabinets', 'flat pack cabinets for the rest of the house'], ['/flat-pack-kitchens', 'flat pack kitchens']],
    slug: 'flat-pack-wardrobes',
    nav: 'Flat pack wardrobes',
    title: 'Flat Pack Wardrobes & Built-In Robes Australia-Wide',
    desc: 'Built-in wardrobes and walk-in robes cut to your room and shipped flat pack anywhere in Australia. Same board and Blum hardware as our installed joinery.',
    h1: 'Built-in robes,<br><span class="italic brass">shipped flat to any address.</span>',
    lede: 'The same wardrobe joinery we install in Central Queensland, cut to your room and freighted flat pack for you or your own installer to fit.',
    img: 'wardrobe-walkin',
    alt: 'Walk-in wardrobe with drawer bank on Blum runners',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Built-in and walk-in, both available flat pack', 'A built-in robe along one wall or a full walk-in layout with an island bank — both are drawn to your room\'s actual dimensions and packed flat for freight, with the same 18mm moisture-resistant board and Blum soft-close hardware as our installed joinery.'],
      ['What arrives, and what to check on delivery', 'Cartons labelled to a numbered drawing, doors and drawer fronts wrapped separately, hardware bagged per cabinet — the same packing standard as our flat pack kitchens. Check cartons against the drawing when the freight arrives.'],
      ['Internal fit-out options', 'Hanging rails, shelving, drawer banks and shoe storage are all specified to your drawing rather than a generic internal layout — tell us what you are actually storing and we draw around it.'],
    ],
    list: [
      'Built-in or walk-in, drawn to your room',
      '18mm moisture-resistant board, Blum soft-close hardware',
      'Internal fit-out specified to what you actually store',
      'Packed flat, labelled per cabinet, with a numbered drawing',
      'Delivered assembled instead, if you prefer',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'Can I get built-in wardrobes shipped flat pack outside Queensland?', a: 'Yes — the same joinery specification we install in Central Queensland ships flat packed anywhere in Australia for your own installer to fit.' },
      { q: 'What is the difference between this and a flat pack cabinet order?', a: 'This page covers wardrobe and robe joinery specifically; see flat pack cabinets for laundry, vanity and media wall cabinetry using the same base specification.' },
      { q: 'Can the internal wardrobe layout be customised?', a: 'Yes — hanging rails, shelving, drawer banks and shoe storage are drawn to your actual needs rather than a fixed generic layout.' },
      { q: 'Do you install wardrobes outside Central Queensland?', a: 'No — outside our roughly 150 kilometre installation radius we supply only, flat pack or delivered assembled, fitted by your own installer.' },
    ],
  });

  SEGMENTS.push({
    file: 'scullery-walk-in-pantry-flat-pack.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/guide-butlers-pantry-worth-it', "whether a butler's pantry is worth it"], ['/flat-pack-butlers-pantry', "flat pack butler's pantry"], ['/kitchen-islands', 'kitchen islands']],
    slug: 'scullery',
    nav: 'Scullery & walk-in pantry cabinetry',
    title: 'Flat Pack Scullery & Walk-In Pantry Cabinetry | Bilt & Co',
    desc: 'Scullery and walk-in pantry cabinetry cut to your room and shipped flat pack anywhere in Australia — shelving, bench space and appliance storage.',
    h1: 'The room behind<br><span class="italic brass">the room you photograph.</span>',
    lede: 'A scullery keeps the mess of real cooking out of the kitchen people see. It needs storage density more than style.',
    img: 'material-samples',
    alt: 'Scullery-style storage cabinetry with shelving',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Storage density over presentation', 'A scullery is not styled for photographs the way the main kitchen is — deep shelving, appliance storage and bench space for the messy part of meal prep matter more than finish choices here, which is exactly what we specify for.'],
      ['How it differs from a butler\'s pantry', `A butler's pantry often includes a second sink and presents almost as a second kitchen; a scullery leans more toward pure storage and appliance space. See <a href="/flat-pack-butlers-pantry" style="color:var(--brass)">flat pack butler's pantry</a> if a second sink and prep bench is what you actually need.`],
      ['Ventilation for appliance storage', 'If a scullery is housing an air fryer, second oven or other heat-generating appliance in regular use, ventilation is worth discussing at design stage rather than assuming a closed room handles the heat and steam on its own.'],
    ],
    list: [
      'Deep shelving and appliance storage, drawn to your room',
      'Bench space for prep kept out of the main kitchen',
      '18mm moisture-resistant board, Blum hardware',
      'Packed flat, labelled per cabinet, freighted nationally',
      'Delivered assembled instead, if you prefer',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'What is the difference between a scullery and a butler\'s pantry?', a: 'A scullery leans toward pure storage and appliance space; a butler\'s pantry often includes a second sink and prep bench and presents closer to a second kitchen.' },
      { q: 'Can a scullery be shipped flat pack outside Queensland?', a: 'Yes, anywhere in Australia — cut to your room and freighted flat pack for your own installer to fit.' },
      { q: 'Does a scullery need ventilation?', a: 'Worth considering if it will house a heat-generating appliance in regular use — discuss at design stage rather than assuming a closed room handles it.' },
      { q: 'How much does scullery cabinetry cost?', a: 'Quoted to your drawing based on size and specification, with freight shown separately to your postcode.' },
    ],
  });

  SEGMENTS.push({
    file: 'flat-pack-bar-cabinetry.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/kitchen-islands', 'kitchen islands'], ['/guide-what-is-a-waterfall-benchtop-edge', 'waterfall benchtop edges'], ['/flat-pack-kitchen-upgrades', 'flat pack kitchen upgrades']],
    slug: 'bar-cabinetry',
    nav: 'Home bar & entertaining cabinetry',
    title: 'Flat Pack Home Bar Cabinetry Australia-Wide | Bilt & Co',
    desc: 'Home bar and entertaining cabinetry — wine storage, a servery bench and glassware storage, cut to your space and shipped flat pack anywhere in Australia.',
    h1: 'The bar,<br><span class="italic brass">specified like a kitchen.</span>',
    lede: 'A home bar gets treated as decoration far too often. Built to the same specification as a kitchen, it survives entertaining far longer.',
    img: 'black-marble-bar',
    alt: 'Home bar cabinetry with marble top and dark joinery',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['The same specification, a different room', 'Blum soft-close hardware and moisture-resistant carcasses matter just as much on a bar that sees spilled wine and constant glassware handling at a party as they do in a kitchen — this is not a lower-stakes cabinetry job just because it is not the kitchen.'],
      ['Wine storage and glassware, specified properly', 'Wine racking, open display shelving for glassware, and a servery bench height suited to standing use rather than seated dining are all decisions worth making at drawing stage rather than adapting a generic cabinet after the fact.'],
      ['A stone or waterfall-edge feature bench', `A bar bench is one of the more common places to justify a <a href="/guide-what-is-a-waterfall-benchtop-edge" style="color:var(--brass)">waterfall benchtop edge</a> — it is visible from across an entertaining space in a way a kitchen island end sometimes is not.`],
    ],
    list: [
      'Wine racking, glassware storage, servery bench height',
      'Blum soft-close hardware, same as our kitchens',
      'Moisture-resistant carcasses for spill-prone use',
      'Stone or waterfall-edge bench options',
      'Flat packed or delivered assembled, your call',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'Is home bar cabinetry the same specification as a kitchen?', a: 'Yes — the same board, hardware and warranty apply, since a bar sees just as much handling and spill exposure during entertaining as a kitchen does during cooking.' },
      { q: 'Can a home bar have wine storage built in?', a: 'Yes — wine racking and open glassware display are common inclusions, specified to your bottle and glass sizes at drawing stage.' },
      { q: 'What benchtop suits a home bar?', a: 'Stone or engineered stone, often with a waterfall edge if the bar is a visible feature in an entertaining space — see what is a waterfall benchtop edge.' },
      { q: 'Do you ship bar cabinetry outside Queensland?', a: 'Yes, anywhere in Australia — flat pack or delivered assembled, freighted to your address.' },
    ],
  });

  SEGMENTS.push({
    file: 'galley-flat-pack-kitchen.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/guide-kitchen-layouts', 'kitchen layouts compared'], ['/flat-pack-kitchens', 'flat pack kitchens'], ['/kitchen-islands', 'kitchen islands']],
    slug: 'galley-flat-pack',
    nav: 'Galley flat pack kitchen',
    title: 'Galley Flat Pack Kitchen | Two Runs, Cut to Fit | Bilt & Co',
    desc: 'A galley layout flat pack kitchen — two parallel runs, cut to your exact room width, the most storage-efficient layout available. Shipped Australia-wide.',
    h1: 'A galley kitchen,<br><span class="italic brass">cut to your exact width.</span>',
    lede: 'Two parallel runs, the most efficient layout per metre of storage that exists — and the one most sensitive to being a few centimetres out.',
    img: 'galley-stone',
    alt: 'Galley layout kitchen with stone benchtop, cut to fit',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Why cut-to-fit matters most in a galley', `A galley kitchen needs a minimum aisle width to function — see <a href="/guide-kitchen-layouts" style="color:var(--brass)">kitchen layouts compared</a> for the clearance numbers — and a catalogue kitchen built to standard cabinet widths rarely lands exactly on your room's actual dimensions. Cut to your drawing, the cabinetry fills the space without filler panels doing the work.`],
      ['Where a galley suits, and where it does not', 'It dominates apartments, granny flats and tiny homes for good reason — maximum storage per metre, minimum wasted floor space. It does not tolerate through-traffic well; if the galley is also the path to a back door, it will be a nuisance regardless of how well it is built.'],
      ['Flat pack fits a narrow room particularly well', 'A narrow galley space, especially in an apartment or renovation with tight access, often suits flat pack cartons better than an assembled carcass that needs to be carried and turned through a confined corridor.'],
    ],
    list: [
      'Two parallel runs, cut to your exact room width',
      'No filler panels — cabinetry sized to the actual room',
      '18mm moisture-resistant board, Blum hardware',
      'Suits apartments, granny flats and tiny homes',
      'Flat packed for easier access into narrow spaces',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'What is the minimum width for a galley kitchen?', a: 'Around 1,000mm clear between the two opposing runs is the practical minimum, with 1,200mm more comfortable — see our kitchen layouts guide for the full clearance breakdown.' },
      { q: 'Is a galley layout the cheapest kitchen shape?', a: 'Generally yes, per metre of storage — two straight runs with no corners to solve and no island to power or plumb.' },
      { q: 'Should a galley kitchen be flat pack or assembled?', a: 'Flat pack often suits a narrow galley particularly well, since cartons move through a tight corridor or apartment doorway more easily than an assembled carcass.' },
      { q: 'Can a galley kitchen have an island?', a: 'Only if the room is wide enough to add island clearance on top of the two runs — most galley layouts exist specifically because the room is not wide enough for one.' },
    ],
  });

  SEGMENTS.push({
    file: 'l-shaped-flat-pack-kitchen.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/guide-kitchen-layouts', 'kitchen layouts compared'], ['/guide-what-is-a-blind-corner-cabinet', 'blind corner cabinets'], ['/guide-what-is-a-corner-carousel', 'corner carousels']],
    slug: 'l-shaped-flat-pack',
    nav: 'L-shaped flat pack kitchen',
    title: 'L-Shaped Flat Pack Kitchen | Cut to Your Corner | Bilt & Co',
    desc: 'An L-shaped flat pack kitchen, cut to your room with the corner solved properly — carousel or blind-corner pull-out, your choice. Shipped Australia-wide.',
    h1: 'L-shaped,<br><span class="italic brass">with the corner solved properly.</span>',
    lede: 'The most common domestic layout in Australia — and the one where the corner decision matters more than any finish choice.',
    img: 'collection-marble-01',
    alt: 'L-shaped kitchen layout with stone island and oak cabinetry',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Why the corner is the whole decision', `Two runs meeting in a corner waste roughly half a cabinet unless addressed — see <a href="/guide-what-is-a-blind-corner-cabinet" style="color:var(--brass)">what is a blind corner cabinet</a> and <a href="/guide-what-is-a-corner-carousel" style="color:var(--brass)">what is a corner carousel</a> for the two common fixes. We ask which you prefer at quote stage rather than defaulting to a fixed shelf.`],
      ['Opens well to a dining or living space', 'An L-shape naturally keeps traffic out of the working zone while opening the room to adjoining living or dining space, which is a large part of why it is the most common domestic layout in the country.'],
      ['Cut to your exact corner dimensions', 'Every L-shaped kitchen has slightly different leg lengths and a corner that is rarely perfectly square — cutting to your drawing rather than a catalogue module avoids the filler-panel compromises a fixed-width kitchen forces.'],
    ],
    list: [
      'Two runs meeting at a corner, cut to your exact dimensions',
      'Blind corner pull-out or carousel — your choice',
      '18mm moisture-resistant board, Blum hardware',
      'Opens naturally to dining or living space',
      'Flat packed or delivered assembled, your call',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'What should I do about the corner in an L-shaped kitchen?', a: 'A blind corner pull-out or a carousel — both solve the roughly half-cabinet of storage an unaddressed corner otherwise wastes. We ask which you prefer at quote stage.' },
      { q: 'Is an L-shaped kitchen more expensive than a galley?', a: 'Generally somewhat more, due to the corner solution required — a galley has no internal corner to solve at all.' },
      { q: 'Can an L-shaped kitchen include an island?', a: 'Yes, if the room is wide enough — see our kitchen layouts guide for the clearance an island needs on top of the L-shaped runs.' },
      { q: 'Do you ship L-shaped flat pack kitchens outside Queensland?', a: 'Yes, anywhere in Australia — cut to your exact corner dimensions and freighted flat pack or delivered assembled.' },
    ],
  });

  SEGMENTS.push({
    file: 'u-shaped-flat-pack-kitchen.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/guide-kitchen-layouts', 'kitchen layouts compared'], ['/guide-what-is-a-corner-carousel', 'corner carousels'], ['/guide-butlers-pantry-worth-it', "whether a butler's pantry is worth it"]],
    slug: 'u-shaped-flat-pack',
    nav: 'U-shaped flat pack kitchen',
    title: 'U-Shaped Flat Pack Kitchen | Maximum Storage, Cut to Fit',
    desc: 'A U-shaped flat pack kitchen — three runs, maximum bench and storage in the footprint, with two corners solved properly. Shipped Australia-wide.',
    h1: 'U-shaped,<br><span class="italic brass">the most storage you can fit.</span>',
    lede: 'Three runs, two corners, and more bench within reach than any other layout — provided the room is wide enough to take it.',
    img: 'collection-marble-04',
    alt: 'U-shaped kitchen layout with island seating',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['Two corners means two decisions, not one', `A U-shaped layout has two internal corners rather than an L-shape's one — see <a href="/guide-what-is-a-corner-carousel" style="color:var(--brass)">what is a corner carousel</a> for the mechanisms available, and decide on a solution for each rather than treating them as identical.`],
      ['Excellent for a serious cook, if the room allows it', 'Everything sits within a step in a U-shaped kitchen, which suits someone who genuinely cooks rather than reheats. It needs real width to avoid feeling enclosed — a third run solid to the ceiling on a narrow U can feel like a corridor rather than a kitchen.'],
      ['If the storage still is not enough', `Where a U-shape still cannot fit everything, that storage is often better found behind a door than by cramming a fourth run into the room — see <a href="/guide-butlers-pantry-worth-it" style="color:var(--brass)">whether a butler's pantry is worth it</a>.`],
    ],
    list: [
      'Three runs, two corners, cut to your exact room',
      'Corner solutions specified for each corner individually',
      'Maximum bench and storage within a single step',
      '18mm moisture-resistant board, Blum hardware',
      'Flat packed or delivered assembled, your call',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'How wide does a room need to be for a U-shaped kitchen?', a: 'Wide enough to manage two aisles rather than one comfortably — our kitchen layouts guide covers the clearance numbers, and we confirm against your actual room at quote stage.' },
      { q: 'Does a U-shaped kitchen need two corner solutions?', a: 'Yes — treating both corners individually rather than assuming one solution suits both is worth deciding deliberately rather than defaulting to fixed shelves in either.' },
      { q: 'Can a U-shaped kitchen feel too enclosed?', a: 'It can, particularly in a narrow room with a solid third run to the ceiling — worth discussing openings or a lower run height if this is a concern for your space.' },
      { q: 'Do you ship U-shaped flat pack kitchens outside Queensland?', a: 'Yes, anywhere in Australia — cut to your exact room and freighted flat pack or delivered assembled.' },
    ],
  });

  SEGMENTS.push({
    file: 'one-wall-flat-pack-kitchen.html',
    parent: ['flat-pack-kitchens.html', 'Flat pack kitchens'],
    related: [['/guide-kitchen-layouts', 'kitchen layouts compared'], ['/flat-pack-kitchenettes', 'flat pack kitchenettes'], ['/tiny-home-kitchens', 'tiny home kitchens']],
    slug: 'one-wall-flat-pack',
    nav: 'One-wall flat pack kitchen',
    title: 'One-Wall Flat Pack Kitchen | Studios & Compact Spaces',
    desc: 'A single-run flat pack kitchen for studios, tiny homes and compact living — cut to your exact wall length, no wasted floor space. Shipped Australia-wide.',
    h1: 'One wall,<br><span class="italic brass">every centimetre used.</span>',
    lede: 'The simplest layout that exists, and the one where wasted centimetres are the most obvious.',
    img: 'timber-island',
    alt: 'Single-run kitchen along one wall in a compact space',
    price: 'Quoted to your drawing',
    range: 'shipped Australia-wide',
    body: [
      ['The layout for genuinely compact living', 'A studio apartment, a tiny home or a single-room granny flat conversion generally has one usable wall for a kitchen — see <a href="/tiny-home-kitchens" style="color:var(--brass)">tiny home kitchens</a> for how this plays out in that specific context.'],
      ['Every centimetre matters more here than anywhere', 'With no second run and no corner to hide inefficiency in, a one-wall kitchen cut to a catalogue width leaves visible wasted space at either end. Cut to your exact wall length, nothing is left over.'],
      ['Vertical storage does the work a second run would', 'Without a second run to add storage, tall units and full-height overheads on the single wall carry more of the storage burden — worth prioritising over a wider bench if storage is tight.'],
    ],
    list: [
      'Single run, cut to your exact wall length',
      'No wasted floor space at either end',
      'Tall units and full-height overheads to maximise storage',
      '18mm moisture-resistant board, Blum hardware',
      'Flat packed for easy access into compact spaces',
      'Freighted to any address in Australia',
    ],
    faq: [
      { q: 'Is a one-wall kitchen enough for a full-time home?', a: 'For a studio, tiny home or compact conversion, yes — provided storage is planned vertically since there is no second run to add it elsewhere.' },
      { q: 'How do I maximise storage in a one-wall kitchen?', a: 'Tall units and full-height overheads carry more of the load than in a two-run layout — prioritise vertical storage over bench width if space is tight.' },
      { q: 'Is a one-wall kitchen cheaper than an L-shape?', a: 'Generally yes, per kitchen — fewer cabinets and no corner solution required, though less total storage for the same room width.' },
      { q: 'Do you ship one-wall flat pack kitchens outside Queensland?', a: 'Yes, anywhere in Australia — cut to your exact wall length and freighted flat pack.' },
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
          <a class="btn btn--lg" href="contact.html">${s.slug === 'trade' ? 'Open a trade account' : 'Get my free quote'}</a>
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
          <a class="btn btn--block" href="contact.html">${s.slug === 'trade' ? 'Talk to us about trade' : 'Get my free quote'}</a>
        </div>
        ${s.related ? `<p class="small muted mt-2">Also: ${s.related.map((r) => `<a href="${r[0]}" style="color:var(--brass)">${r[1]}</a>`).join(" &middot; ")}</p>` : ''}
        ${(() => {
          const fam = PRODUCT_FAMILIES.find((f) => f.slugs.includes(s.slug));
          if (!fam) return '';
          const sibs = fam.slugs.filter((x) => x !== s.slug).map((x) => SEGMENTS.find((y) => y.slug === x)).filter(Boolean);
          return `<p class="small muted mt-2">${fam.label}: ${sibs.map((y) => `<a href="/${y.file.replace(/\.html$/, '')}" style="color:var(--brass)">${y.nav}</a>`).join(' &middot; ')}.</p>`;
        })()}
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

  /* Guide clusters: every guide links its siblings, so no guide sits on two inbound links. */
  const GUIDE_SERIES = {'flatpack': ['flat-pack-vs-assembled-kitchen', 'how-to-order-a-flat-pack-kitchen', 'how-to-assemble-a-flat-pack-kitchen', 'how-long-do-flat-pack-kitchens-last', 'are-flat-pack-kitchens-good-quality', 'flat-pack-kitchen-shipping-and-freight', 'supply-your-own-kitchen', 'how-to-install-a-supplied-kitchen', 'how-to-measure-for-a-kitchen'], 'council': ['granny-flat-rules-qld', 'granny-flat-rules-rockhampton', 'class-1a-granny-flat-yeppoon', 'granny-flat-rules-isaac-regional', 'granny-flat-rules-mackay-regional', 'granny-flat-rules-whitsunday-regional', 'granny-flat-rent-rockhampton', 'granny-flat-rules-nsw', 'granny-flat-rules-victoria', 'granny-flat-rules-wa', 'granny-flat-rules-sa', 'granny-flat-rules-tasmania', 'secondary-residence-rules-act', 'granny-flat-rules-nt'], 'approvals': ['do-i-need-approval-kitchen-renovation', 'owner-builder-permit-qld', 'garage-conversion-approval-qld', 'tiny-home-laws-qld', 'short-stay-letting-rules-qld', 'multigenerational-living-queensland'], 'accessible': ['ndis-kitchen-modifications-queensland', 'sda-design-categories-explained'], 'money': ['kitchen-pc-item-new-build-contract', 'does-a-new-kitchen-add-value', 'flood-damage-kitchen-replacement-rockhampton', 'kitchen-renovation-checklist'], 'design': ['kitchen-layouts', 'benchtops-compared', 'kitchen-colours-2026', 'butlers-pantry-worth-it', 'queenslander-kitchen-renovation'],
    'glossary': ['what-is-a-cabinet-carcass', 'what-is-a-kickboard', 'what-is-a-scribe-piece', 'what-is-edge-banding', 'what-is-a-full-extension-runner', 'soft-close-hinges-explained', 'what-is-a-handleless-kitchen', 'what-is-a-waterfall-benchtop-edge', 'what-is-a-mitred-join', 'what-is-a-kitchen-splashback', 'what-is-a-service-drawing', 'what-does-supply-only-mean', 'what-is-a-tall-pantry-unit', 'what-is-a-corner-carousel', 'what-is-a-blind-corner-cabinet', 'push-to-open-hardware-explained', 'what-is-moisture-resistant-board', 'what-is-an-overhead-cabinet'],
    'style': ['hamptons-style-kitchen', 'modern-farmhouse-kitchen', 'japandi-kitchen-design', 'coastal-kitchen-design', 'industrial-style-kitchen', 'scandinavian-kitchen-design'],
    'materials': ['engineered-stone-benchtop-care-guide', 'is-porcelain-benchtop-worth-it', 'timber-benchtop-pros-and-cons', 'blum-legrabox-explained', 'handleless-kitchen-hardware-guide', 'brass-vs-matte-black-kitchen-hardware', '2-pack-vs-laminate-kitchen-doors', 'matte-vs-gloss-kitchen-doors', 'timber-veneer-vs-laminate-doors', '18mm-vs-16mm-cabinet-board', 'mdf-vs-particleboard-kitchen-cabinets', 'kitchen-sink-materials-compared', 'induction-vs-gas-cooktop', 'rangehood-types-explained'],
    'cost': ['flat-pack-kitchen-cost-per-linear-metre', 'average-kitchen-renovation-cost-australia', 'cost-to-replace-a-kitchen-benchtop-only', 'flat-pack-kitchen-cost-per-cabinet', 'how-much-does-a-granny-flat-kitchen-cost-australia', 'hidden-costs-in-a-kitchen-renovation'],
    'sustainability': ['e0-vs-e1-board-explained', 'is-flat-pack-furniture-bad-for-the-environment', 'blum-hardware-warranty-explained', 'kitchen-cabinet-warranty-what-to-check', 'bushfire-rebuild-kitchen-supply-australia', 'recyclable-low-waste-kitchen-cabinetry']};
  const SERIES_NAMES = {'flatpack': 'Flat pack and supply', 'council': 'Council rules for second dwellings', 'approvals': 'Approvals and permits', 'accessible': 'Accessible and SDA kitchens', 'money': 'Money and value', 'design': 'Design decisions', 'glossary': 'Kitchen &amp; cabinetry glossary', 'style': 'Kitchen styles', 'materials': 'Materials &amp; hardware guides', 'cost': 'Cost and pricing', 'sustainability': 'Sustainability, warranty &amp; compliance'};
  const GUIDES = [
    {
      slug: 'how-to-order-a-flat-pack-kitchen',
      group: 'design',
      nav: 'How to order a flat pack kitchen',
      title: 'How to Order a Flat Pack Kitchen | Measure, Quote, Ship',
      desc: 'How ordering a custom flat pack kitchen works without design software: what to send, what comes back, what the quote shows, and what happens up to delivery.',
      h1: 'How to order a flat pack kitchen<br><span class="italic brass">without the software.</span>',
      lede: 'Some suppliers make you design your own kitchen in a portal and hope the software caught your mistakes. This is the other way: a person draws it from your measurements, and you see the drawing before you pay.',
      img: 'studio-desk',
      alt: 'Kitchen drawings and samples on a design studio desk',
      read: '7 min read',
      note: 'Freight, lead time and any deposit are shown on your quote for your job; none are stated here because they depend on the kitchen and the postcode.',
      answer: 'Send the room’s measurements and photos. A designer draws the kitchen to your room and sends the drawing with a fixed, itemised quote showing it flat pack and delivered assembled, freight to your postcode on each. You check the drawing, change what you want, sign it off, pay, and it is cut and shipped to the address on the order. No account, no software, no showroom visit.',
      inlineCta: {
        after: 2,
        eyebrow: 'Start here',
        title: 'Send the measurements. A person draws it.',
        body: 'Wall lengths at three heights, ceiling height, windows, doors and services, a photo of each corner. Rough is fine for the first drawing.',
        label: 'Get my free quote',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Flat pack or assembled',
        title: 'One drawing,<br><span class="italic" style="color:var(--brass-lite)">two prices.</span>',
        body: 'The quote comes back both ways so the assembly is a line item you choose, not a leap.',
        image: 'drawer-detail',
        alt: 'Drawer box with Blum runners, part of a flat pack kitchen order',
      },
      sections: [
        ['Step one: measure and photograph', `Wall to wall at floor, bench and ceiling height, using the smallest figure. Ceiling height in each corner. Every window and door with its distance from the nearest corner. Where the waste, water and power are now. A photo of each corner of the room. Our <a href="/guide-how-to-measure-for-a-kitchen" style="color:var(--brass)">measuring guide</a> has the full list. If you have plans, send those too — but measure anyway, because plans and rooms disagree.`],
        ['Step two: send it, and say what you want', 'Through the quote form or by email. Tell us what the room is for — family kitchen, granny flat, short-stay, laundry — and anything fixed: an appliance you already own, a basin you have chosen, a benchtop material. Say whether you want it flat pack, assembled, or are undecided. Undecided is fine; the quote shows both.'],
        ['Step three: the drawing and the quote', 'A designer draws the kitchen to your room and sends a dimensioned plan and elevations with a fixed, itemised quote: every cabinet, the hardware, the benchtop, the doors, freight to your postcode, and the assembly as its own line if you take it. Nothing is a from-price and nothing is hidden behind a login. You look at it at your kitchen table and mark it up.'],
        ['Step four: changes, then sign-off', 'Move the sink, lose the overheads, add a drawer bank — changes are redrawn and the quote updated until it is right. Then you sign the drawing off. That signed drawing is what gets cut, so this is the point to check every dimension against the room once more. After sign-off the number does not move.'],
        ['Step five: payment and cutting', 'The quote states what is due and when for your job. Once it is paid, the kitchen is cut to the signed drawing, the panels drilled for the hardware, the doors finished, and everything checked against the drawing before it is packed. Assembled orders are built and adjusted at this stage; flat pack orders are packed per cabinet with the hardware bagged.'],
        ['Step six: delivery', 'Freight is booked to the address on the order and you are told when it is leaving. Someone needs to be there to receive it and check it against the drawing on the day — cartons counted, fronts inspected. Assembled cabinets need a dry, level place to stand if the room is not ready. Then your build starts, or your installer’s does.'],
        ['What you never have to do', 'Create an account. Learn design software. Guess at a cabinet width and hope. Visit a showroom. Pay a deposit to see a price. Talk to a salesperson. Every one of those is a step that exists to serve the supplier rather than you, and none of them make the kitchen fit the room better than a person drawing it from your measurements.'],
      ],
      faq: [
        { q: 'Do I need to design the kitchen myself?', a: 'No. You send measurements and photos and a designer draws it. You review the drawing and change what you want before anything is cut.' },
        { q: 'Can I order a flat pack kitchen online?', a: 'Yes, in the sense that matters: everything happens by form, email and phone without a showroom visit. There is no portal to sign up to; a person draws and prices it instead.' },
        { q: 'When do I pay?', a: 'The quote for your job states what is due and when. Nothing is due to receive the drawing and the quote.' },
        { q: 'How long does delivery take?', a: 'It depends on the kitchen and the postcode, and it is stated on your quote rather than guessed here.' },
        { q: 'Can I change my mind after sign-off?', a: 'Before cutting starts, usually yes; after it, the signed drawing is what has been cut. Check every dimension against the room before you sign.' },
      ],
    },
    {
      slug: 'how-long-do-flat-pack-kitchens-last',
      group: 'design',
      nav: 'How long flat pack kitchens last',
      title: 'How Long Do Flat Pack Kitchens Last in Australia?',
      desc: 'What decides how long a flat pack kitchen lasts in an Australian home: board, edging, hardware, assembly, moisture. What fails first and how to buy around it.',
      h1: 'How long does a<br><span class="italic brass">flat pack kitchen last?</span>',
      lede: 'As long as the board, the edging and the hardware allow, and the assembly does not shorten. The label on the carton has almost nothing to do with it.',
      img: 'detail-timber-joinery',
      alt: 'Laser-bonded edge on a kitchen cabinet panel',
      read: '6 min read',
      answer: 'A flat pack kitchen lasts as long as its weakest material. 18mm moisture-resistant board with laser-bonded edging and Blum hardware is the same specification as a good custom kitchen and lasts as long as one. 16mm standard board with glued edging and unbranded runners, in a humid Australian kitchen, fails at the edges and the drawers first and is often replaced within a decade. Whether it was flat packed or assembled changes nothing about that; how it was assembled does.',
      inlineCta: {
        after: 3,
        eyebrow: 'Ask any supplier three things',
        title: 'Board. Edging. Hardware.',
        body: '18mm moisture-resistant board, laser-bonded edging, Blum soft-close runners and hinges. That is our standard on every kitchen, flat pack or assembled, and it is why the question has a good answer here.',
        label: 'Get my free quote',
        href: '/flat-pack-kitchens',
      },
      cta: {
        eyebrow: 'Built to last, either way',
        title: 'Same board, same hardware,<br><span class="italic" style="color:var(--brass-lite)">flat pack or assembled.</span>',
        body: 'Send the room dimensions and the quote shows both. The specification is identical; only who builds the carcasses changes.',
        image: 'drawer-detail',
        alt: 'Blum full-extension drawer runner in a kitchen cabinet',
      },
      sections: [
        ['The board decides most of it', 'Cabinet carcasses are particleboard or MDF with a melamine face. The two things that matter are thickness and moisture rating. 18mm board holds screws and shelf weight; 16mm flexes and strips. Moisture-resistant board (usually a green core) shrugs off the humidity that a standard board swells in, and in most of Australia a kitchen is a humid room for part of the year whether or not anything is spilled. Standard board around a sink or a dishwasher is where flat pack gets its reputation.'],
        ['Edging is where water gets in', 'The edge strip on every panel is the seal. Glued edging has a visible glue line that water tracks along, lifts at the corners, and once it lifts the board underneath swells and the door never sits right again. Laser-bonded edging is fused to the board with no glue line; there is no seam for water to find. It is a small manufacturing difference and it is the single most reliable predictor of how a kitchen looks at year ten.'],
        ['Hardware is what you touch', 'Hinges and drawer runners are the moving parts, and moving parts wear. Unbranded runners sag, stick and drop drawers; unbranded hinges lose adjustment so doors stop lining up. Blum hinges and runners carry a lifetime mechanical warranty because they are built to be opened a hundred thousand times. On a flat pack, hardware is often where the price was cut, because it is the part you cannot see in a photograph.'],
        ['Assembly can shorten all of it', 'A carcass built out of square puts constant load on every joint and every hinge. Cam locks over-driven with a drill split the board around them. A back panel fitted last holds whatever shape the box was in. None of it shows on day one; all of it shows by year three as doors that will not line up and drawers that rub. This is the one way flat pack differs from assembled: with assembled, the squareness is done on a bench by someone who does it daily.'],
        ['Where it lives matters', 'Coastal humidity, a rental with tenants, a short-stay unit turned over weekly, a laundry with a machine vibrating beside the cabinet — all of these shorten the life of cheap board and hardware faster than a family kitchen does. The specification that survives them is the same one: 18mm moisture-resistant, laser-bonded, Blum. Buying to a lower specification for a hard-use room is buying twice.'],
        ['How to buy a flat pack that lasts', `Ask three questions and get the answers in writing: board thickness and moisture rating, edging method, hardware brand. If any answer is vague, that is the answer. Then either build it square — our <a href="/guide-how-to-assemble-a-flat-pack-kitchen" style="color:var(--brass)">assembly guide</a> covers how — or have it <a href="/assembled-kitchens" style="color:var(--brass)">delivered assembled</a> so the squareness is done before it arrives. Our <a href="/flat-pack-kitchens" style="color:var(--brass)">flat pack kitchens</a> are 18mm moisture-resistant board, laser-bonded edging and Blum hardware as standard, because there is no honest way to answer this question otherwise.`],
      ],
      faq: [
        { q: 'How many years does a flat pack kitchen last?', a: 'There is no fixed number. Good board, edging and hardware, built square, last as long as a custom kitchen. Cheap board with glued edging and unbranded runners in a humid room often needs replacing within a decade, and the edges and drawers go first.' },
        { q: 'Are flat pack kitchens less durable than custom?', a: 'Not because they are flat packed. The materials and the assembly decide durability. A flat pack in 18mm moisture-resistant board with Blum hardware is the same specification as a good custom kitchen.' },
        { q: 'What fails first on a cheap flat pack?', a: 'Edging lifting near the sink and dishwasher, then drawer runners sagging, then doors losing adjustment. All three are material choices, not assembly.' },
        { q: 'Does moisture-resistant board matter in Australia?', a: 'Yes. Most Australian kitchens are humid for part of the year and standard board swells at the edges. Moisture-resistant board is the difference between a kitchen that looks the same at year ten and one that does not.' },
      ],
    },
    {
      slug: 'are-flat-pack-kitchens-good-quality',
      group: 'design',
      nav: 'Are flat pack kitchens good quality?',
      title: 'Are Flat Pack Kitchens Good Quality? An Honest Answer',
      desc: 'Whether flat pack kitchens are good quality depends on four things you can check before buying. What separates a good flat pack from a bad one and from custom.',
      h1: 'Are flat pack kitchens<br><span class="italic brass">good quality?</span>',
      lede: 'Some are, and the ones that are cost about what a good custom kitchen costs to make, because they are made of the same things. The rest are cheap for a reason you can find in about a minute.',
      img: 'drawer-detail',
      alt: 'Assembled drawer with Blum full-extension runners, evidence of flat pack quality',
      read: '6 min read',
      answer: 'Flat pack is a delivery format, not a quality grade. The quality of any kitchen — flat pack, assembled or custom — comes down to four checkable things: board thickness and moisture rating, edging method, hardware brand, and whether the cabinets are cut to your room or picked from a catalogue. A flat pack that passes all four is a good kitchen. A custom kitchen that fails two of them is not.',
      inlineCta: {
        after: 3,
        eyebrow: 'Cut to the room, not the catalogue',
        title: 'Flat pack that passes all four.',
        body: '18mm moisture-resistant board, laser-bonded edging, Blum hardware, and every cabinet drawn to your measurements. Shipped anywhere in Australia, flat pack or assembled.',
        label: 'Get my free quote',
        href: '/flat-pack-kitchens',
      },
      cta: {
        eyebrow: 'Judge for yourself',
        title: 'The specification is on<br><span class="italic" style="color:var(--brass-lite)">every quote we send.</span>',
        body: 'Board, edging, hardware, benchtop, all named. Send the room dimensions and compare it line for line with anything else you are quoted.',
        image: 'material-samples',
        alt: 'Door, stone and hardware samples on a bench',
      },
      sections: [
        ['Where the reputation comes from', 'Flat pack got its name from the bottom of the market: fixed-width cabinets in 16mm standard board, glued edging, unbranded runners, filler panels to hide the gap where the run did not fit the wall. That kitchen is poor quality, and it would be poor quality if it arrived assembled. The format did not make it cheap; the specification did. The mistake is treating the carton as the thing to judge.'],
        ['Check one: the board', '18mm or 16mm, and moisture-resistant or standard. Ask, and ask for it in writing. 18mm moisture-resistant is the specification of a good custom kitchen; 16mm standard is the specification of a kitchen that swells at the sink. Most of the price difference between cheap flat pack and good flat pack is in this line.'],
        ['Check two: the edging', 'Laser-bonded edging has no glue line and does not lift. Glued edging has a visible dark line and lifts at the corners near water. Run a fingernail along a sample edge: if you can feel a seam, water can find it. This is the check people skip because it sounds technical, and it is the most reliable one.'],
        ['Check three: the hardware', 'Name the brand. Blum, Hettich and Grass are the brands a cabinetmaker would use; anything unnamed is unnamed for a reason. Runners should be full-extension and soft-close; hinges should be soft-close with three-way adjustment. This is the part that decides whether the kitchen feels good in year five.'],
        ['Check four: catalogue or cut to size', 'A catalogue flat pack comes in fixed widths and fills the difference with filler panels, which means wasted space, awkward corners and a run that looks like it was bought rather than designed. Cut-to-size flat pack is drawn to your wall lengths and ceiling height, so it fits the way a custom kitchen fits. The second costs more than the first and less than custom, and it is the one worth buying.'],
        ['Then there is assembly', `A good flat pack built badly is a bad kitchen. Carcasses out of square, cam locks over-driven, back panels fitted last — all of it shows by year three. Either build it carefully (our <a href="/guide-how-to-assemble-a-flat-pack-kitchen" style="color:var(--brass)">assembly guide</a>) or take the same kitchen <a href="/assembled-kitchens" style="color:var(--brass)">delivered assembled</a>, with the squareness done on a bench. That is the one genuine difference between the two, and it is a labour question, not a quality one.`],
        ['So: are they good quality?', `The ones that pass the four checks are as good as any custom kitchen, because they are made of the same materials by the same kind of machinery, and they cost less only because you are doing the assembly or paying for it separately. Our <a href="/flat-pack-kitchens" style="color:var(--brass)">flat pack kitchens</a> pass all four as standard, and the specification is printed on every quote so you can hold it against anything else you are offered. Our guide on <a href="/guide-how-long-do-flat-pack-kitchens-last" style="color:var(--brass)">how long flat pack kitchens last</a> covers what happens to each check over time.`],
      ],
      faq: [
        { q: 'Are flat pack kitchens as good as custom?', a: 'They can be. If the board, edging and hardware match and the cabinets are cut to the room, a flat pack is the same kitchen delivered in cartons. The difference is who assembles it.' },
        { q: 'What makes a flat pack kitchen poor quality?', a: '16mm standard board, glued edging, unbranded hardware and catalogue widths with filler panels. Any one of those is a warning; all four is the bottom of the market.' },
        { q: 'Is a more expensive flat pack worth it?', a: 'If the extra money is in the board, edging and hardware, yes, because those decide how the kitchen looks at year ten. If it is in the brand name or the showroom, no.' },
        { q: 'Are your flat pack kitchens good quality?', a: '18mm moisture-resistant board, laser-bonded edging, Blum soft-close hardware, every cabinet cut to your drawing. It is the same specification as our assembled kitchens and it is printed on the quote.' },
      ],
    },
    {
      slug: 'how-to-assemble-a-flat-pack-kitchen',
      group: 'design',
      nav: 'Assembling a flat pack kitchen',
      title: 'How to Assemble a Flat Pack Kitchen | Order, Tools, Mistakes',
      desc: 'How to assemble a flat pack kitchen: the order to build in, the tools you need, keeping carcasses square, and the mistakes that cost a weekend.',
      h1: 'How to assemble<br><span class="italic brass">a flat pack kitchen.</span>',
      lede: 'Cabinet by cabinet it is simple. The total is not. This is the order, the tools and the handful of things that decide whether the doors line up at the end.',
      img: 'drawer-detail',
      alt: 'Assembled drawer box with Blum runners on a workbench',
      read: '8 min read',
      note: 'General guidance for pre-drilled, labelled flat pack cabinetry. Plumbing and electrical connection must be done by licensed trades regardless of who assembles the cabinets.',
      answer: 'Unpack one cabinet at a time, on a flat clean surface, and build it square before you build the next. Base cabinets first, then tall units, then overheads. Fit runners and hinge plates while the carcass is on the bench, not after it is on the wall. Level the whole base run before fixing anything, because the benchtop is templated off it. Budget more time than you think, and stop when you are tired — carcasses built out of square cannot be fixed later.',
      inlineCta: {
        after: 3,
        eyebrow: 'Cut to your room',
        title: 'Flat pack, drawn to your measurements.',
        body: 'Pre-drilled, labelled per cabinet, Blum hardware bagged with each one. Shipped anywhere in Australia with a numbered drawing to build from.',
        label: 'Get my free quote',
        href: '/flat-pack-kitchens',
      },
      cta: {
        eyebrow: 'Or skip the assembly',
        title: 'The same kitchen,<br><span class="italic" style="color:var(--brass-lite)">delivered built.</span>',
        body: 'If a fortnight of evenings is not on offer, order it assembled. Carcasses square, doors adjusted, ready to fix to the wall. The quote shows both.',
        image: 'dark-island',
        alt: 'Assembled kitchen cabinetry ready to install',
      },
      sections: [
        ['Before you open a carton', 'Check the delivery against the drawing: every cabinet number present, doors and fronts undamaged, hardware bags matched to cabinets. Do it on the day, because damage found at hour six of assembly is harder to resolve. Clear a flat, clean, dry area at least the size of the largest cabinet, with a blanket or the carton itself down so you are not scratching finished faces on concrete. Get the drawing on the wall where you can see it.'],
        ['Tools that matter', 'A drill-driver with a clutch, so you can stop over-driving cam screws and splitting board. A square — a proper one, not a phone app. A rubber mallet. A 5mm hex key for Blum, a Phillips 2 driver, a long spirit level and a laser level if you have one. Clamps are worth more than a second pair of hands for holding a carcass square while you fix it. A sharp knife for cartons, and a bag for the hardware you have not got to yet.'],
        ['One cabinet at a time, and square', 'Build each carcass completely before you start the next, and check it for square by measuring the diagonals — equal diagonals means square. Tap joints home with the mallet rather than pulling them with the screws. Fit the back panel while the carcass is square and it will hold that shape; fit it after and it will hold whatever shape it was in. Then fit hinge plates and drawer runners while the box is on the bench, where you can see and reach both sides.'],
        ['The order to build in', 'Base cabinets first, starting from the corner if there is one and working out, because corners set the geometry of the run. Then tall units — pantry, oven tower — which share the base line. Overheads last, once the base run is fixed and you can measure up from a level bench line rather than a floor that is never level. Drawers and doors go on at the very end, after everything is fixed, because they are the parts that get knocked.'],
        ['Level the run before you fix anything', 'Set every base cabinet on its legs, then level the whole run to the highest point of the floor with the legs, not with packers under the carcass. Clamp cabinets face to face so the fronts are flush, and only then screw them to each other and to the wall. The benchtop is templated off this run; if it is out, the benchtop is out, and a stone top cannot be adjusted afterwards.'],
        ['What the plumber and electrician need from you', 'Cut-outs for waste, water and power are made in the back panels and floors of the relevant cabinets before those cabinets go in — mark them from the service drawing, drill from the finished face out to avoid breakout, and keep them tight. The plumber and electrician connect through them at fit-off. Do not run any service yourself: connection is licensed work, and it is what the compliance paperwork at the end is for.'],
        ['The mistakes that cost a weekend', 'Building on an uneven floor and getting a parallelogram. Driving cam locks with a drill on full torque. Fitting the back panel last. Hanging doors before the run is fixed. Assuming the wall is straight, and not scribing the end panel to it. Starting the overheads before the base run is levelled. Every one of those is common and every one of them is avoidable by going slower at the start.'],
        ['When to stop and order it assembled', `If you are looking at a full kitchen with an island and a pantry, or want the <a href="/diy-flat-pack-kitchens" style="color:var(--brass)">DIY route</a> laid out end to end first, have no flat area to build in, or are at the end of an owner-build with no evenings left, price your time honestly. The same cabinetry ships <a href="/assembled-kitchens" style="color:var(--brass)">delivered assembled</a> and the quote shows both, so the decision is a line item rather than a leap.`],
      ],
      faq: [
        { q: 'How long does it take to assemble a flat pack kitchen?', a: 'A kitchenette is an afternoon. A full kitchen is several days for a capable person working carefully, and more if it is the first one. Budget more than you think and do not rush the base run.' },
        { q: 'What tools do I need for a flat pack kitchen?', a: 'Drill-driver with a clutch, square, rubber mallet, hex key and Phillips driver for the hardware, long level, clamps. A laser level helps with overheads. Nothing exotic.' },
        { q: 'How do I keep flat pack cabinets square?', a: 'Build on a flat surface, measure the diagonals, and fit the back panel while the carcass is square. Fix cabinets to each other with the fronts clamped flush before screwing to the wall.' },
        { q: 'Can I connect the sink and cooktop myself?', a: 'No. You can build the cabinets and cut the service holes, but plumbing and electrical connection is licensed work in every Australian state, and it produces the compliance paperwork you will need at sale or for insurance.' },
        { q: 'Is assembling a flat pack kitchen worth the saving?', a: 'If you have the time, the space and some patience, usually yes. If any of those three is missing, order it assembled and put your time somewhere else. The cabinetry is the same either way.' },
      ],
    },
    {
      slug: 'kitchen-pc-item-new-build-contract',
      group: 'money',
      showCollections: true,
      nav: 'Kitchen PC item in a new build',
      title: 'Kitchen PC Item Upgrade | New Build Allowance Explained',
      desc: 'What the kitchen PC item or allowance in a new-build contract means, the four ways to handle it, and how to upgrade without paying the builder\u2019s margin on top.',
      h1: 'The kitchen allowance in your<br><span class="italic brass">new-build contract.</span>',
      lede: 'Most project-home contracts price the kitchen as an allowance, not a kitchen. What you do with that line before you sign decides whether you get the builder’s standard, pay a marked-up upgrade, or source it yourself for the difference.',
      img: 'island-calacatta',
      alt: 'Calacatta stone island kitchen in a new build home',
      read: '9 min read',
      note: 'Last checked: September 2026. General guidance, not legal or contract advice. Prime cost and provisional sum rules for Queensland domestic building contracts are set out by the <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">QBCC</a> and change; how your own builder handles deletions, credits and owner-supplied items is in your contract and in their hands. Read both before you sign.',
      answer: 'A kitchen PC item (prime cost) or allowance is a fixed dollar figure the builder has set aside for the kitchen in your contract. If the kitchen you actually choose costs more, you pay the difference — usually plus the builder’s margin on that difference. You have four options: accept the standard kitchen, upgrade through the builder, take a credit and supply your own, or fit a kitchenette-grade standard and replace it after handover. The third is where the money is, and it has to be agreed before you sign.',
      inlineCta: {
        after: 3,
        eyebrow: 'What we do for new builds',
        title: 'Priced against the allowance, not the builder’s upgrade list.',
        body: 'Send us the builder’s kitchen drawing and the allowance figure. We quote the same footprint in our cabinetry, fixed and itemised, so you can put the two numbers side by side before you sign anything.',
        label: 'Get my free quote',
        href: '/contact',
      },
      cta: {
        eyebrow: 'New builds',
        title: 'Two numbers,<br><span class="italic" style="color:var(--brass-lite)">side by side.</span>',
        body: 'The builder’s upgrade price and ours, for the same kitchen. Delivered assembled to your site on the builder’s programme, with service drawings for their plumber and electrician.',
        image: 'island-calacatta',
        alt: 'New build kitchen with stone island, delivered assembled',
      },
      sections: [
        ['What a PC item actually is', `A <strong>prime cost (PC) item</strong> is an allowance in a building contract for something that has not been selected yet — the builder puts a dollar figure against it so the contract can be signed. A <strong>provisional sum</strong> is the same idea for work rather than goods. Kitchens turn up as either, or as a “standard inclusion” with a specification attached. In Queensland the contract has to state each allowance, and the <a href="https://www.qbcc.qld.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">QBCC</a> publishes what a builder must tell you about them. The number is a placeholder for a real kitchen, and it is almost always set to hit a contract price rather than to suit how you cook.`],
        ['How the maths works when you go over', 'If the kitchen you choose costs more than the allowance, the difference is added to the contract as a variation, and the contract will state the builder’s margin on that difference. That margin is the part people miss. An upgrade through the builder is priced by the builder’s kitchen supplier, then marked up, so you are paying two businesses to sell you one kitchen. If you come in under the allowance you are credited the difference, though in practice a standard kitchen is priced so that nobody does.'],
        ['Option one: accept the standard kitchen', 'It is the cheapest path on paper and the right one if you intend to sell or rent the house soon. Look hard at the specification, not the display-home kitchen: board thickness, whether the drawers are full-extension, what brand the hinges and runners are, whether the benchtop is laminate or stone and at what thickness. Most standard inclusions are chosen to a price, and the parts that fail first in a kitchen — runners, hinges, edging — are exactly where a standard kitchen saves the money.'],
        ['Option two: upgrade through the builder', 'Simplest, and the builder carries the warranty and the coordination. The cost is the margin on every dollar over the allowance, and the fact that you are choosing from the supplier’s range on the builder’s terms. Ask for the upgrade to be itemised — cabinetry, benchtop, hardware, appliances — so you can see what each line costs against the allowance rather than one total.'],
        ['Option three: delete the kitchen and supply your own', `This is the option worth negotiating, and it has to happen <strong>before you sign</strong>. You ask the builder to remove the kitchen from their scope and credit the allowance. Three things to pin down in writing: the credit amount (it is often less than the allowance, because the builder’s cost for the standard kitchen is not the allowance figure); who does the plumbing and electrical fit-off and when; and what the builder charges to accommodate an owner-supplied kitchen. Builders vary from “no problem” to “no” to a coordination fee, and the answer tells you something about the builder. The kitchen becomes yours to warrant, and your supplier’s drawings become the document their trades rough in from — our <a href="/guide-how-to-install-a-supplied-kitchen" style="color:var(--brass)">guide to getting a supplied kitchen installed</a> covers how that sequence runs.`],
        ['Option four: fit the cheapest standard and replace after handover', `Some people take the builder’s standard kitchen, get their certificate, and replace it. It avoids the negotiation entirely, but you pay for a kitchen you will throw away and you pay again for demolition, and a house generally needs a working kitchen sink and cooking facilities before a certifier will sign it off as habitable, so you cannot simply leave the space empty — ask your certifier. It makes sense only when the builder refuses option three and the credit on offer is small.`],
        ['What to ask before you sign', 'What exactly is the kitchen allowance, and is it a PC item, a provisional sum or a standard inclusion? What is your margin on PC overruns? If I delete the kitchen, what is the credit? Do you accept owner-supplied kitchens, and is there a fee? Who does fit-off, and at what stage? Will your plumber and electrician rough in to my supplier’s drawings? Every one of those has a plain answer, and a builder who will not give one is telling you how the rest of the build will go.'],
        ['Timing on the programme', 'A supplied kitchen has to be on site after the floor is down, walls are sheeted and painted, and rough-in is complete, and before fit-off. That window is short and it moves. Give your supplier the builder’s programme, not a guess, and tell the site supervisor who is supplying the kitchen so nobody orders the standard one by default. Benchtops are templated off the installed cabinetry, so stone adds a week or more to that window — our <a href="/guide-how-to-measure-for-a-kitchen" style="color:var(--brass)">measuring guide</a> covers what to record from the plans before the frame is even up.'],
      ],
      faq: [
        { q: 'What is a kitchen PC item?', a: 'A prime cost item is a dollar allowance in a building contract for something not yet selected — here, the kitchen. If your kitchen costs more than the allowance you pay the difference plus the builder’s stated margin; if it costs less, you are credited.' },
        { q: 'Can I supply my own kitchen in a new build?', a: 'Usually, if it is agreed before contract. The builder deletes the kitchen from scope, credits an amount, and you supply the kitchen for their trades to fit off. Some builders charge a coordination fee and some refuse; ask early.' },
        { q: 'Is the credit the same as the allowance?', a: 'Often not. The builder’s actual cost for the standard kitchen is usually less than the allowance figure, and the credit is based on their cost. Get the credit figure in writing before you sign.' },
        { q: 'Who warrants an owner-supplied kitchen?', a: 'Your supplier, not the builder. The builder’s statutory warranty covers their work; the cabinetry warranty comes from whoever supplied it. Blum hardware carries its own lifetime mechanical warranty.' },
        { q: 'Can I leave the kitchen out and do it after handover?', a: 'A dwelling generally needs a sink and cooking facilities to be certified as fit to occupy, so an empty kitchen space is usually not an option. Ask your certifier. Replacing a cheap standard kitchen after handover is possible but means paying for a kitchen twice.' },
      ],
    },
    {
      slug: 'how-to-install-a-supplied-kitchen',
      group: 'design',
      nav: 'Getting a supplied kitchen installed',
      title: 'How to Get a Supplied Kitchen Installed | Trades & Order',
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
      title: 'Granny Flat Rules Moranbah & Isaac Region | Council Guide',
      desc: 'What to check with Isaac Regional Council before building a granny flat in Moranbah, Dysart, Clermont or Glenden, and where the current rules are.',
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
      title: 'Granny Flat Rules Mackay | Mackay Regional Council Guide',
      desc: 'What to check with Mackay Regional Council before building a granny flat in Mackay or Sarina, why the rules changed, and where the current ones are.',
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
      title: 'Granny Flat Rules Airlie Beach & Whitsundays | Council Guide',
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
      title: 'How to Measure for a Kitchen | Get It Right First Time',
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
        label: 'Get my free quote',
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
      title: 'SDA Design Categories Explained | What Changes the Kitchen',
      desc: 'The four SDA design categories and what each changes about the kitchen joinery. For builders and developers specifying Specialist Disability Accommodation.',
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
      title: 'Granny Flat Rules Queensland | Secondary Dwelling Guide',
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
        body: 'Same carcasses, same Blum hardware, same drawings. You are not paying for our installation labour, and that is the whole difference. Send us the dimensions for a fixed, itemised supply quote.',
        image: 'concrete-luxe',
        alt: 'Bright kitchen with stone island',
      },
      sections: [
        ['Where the money actually is', `Most build contracts carry the kitchen as an allowance or a provisional sum, and that figure has been through two sets of hands: the supplier’s margin, then the builder’s margin on top. Supplying direct removes the second one. On a mid-range kitchen that is a meaningful number, and it is a larger share of the total than most people assume because cabinetry is a high-margin trade.`],
        ['What you take on in exchange', 'Measurements become yours. Timing becomes yours — the cabinetry has to arrive when the site is ready for it, not before, and storing assembled cabinetry in a half-finished house is a genuine problem. Coordination with the plumber and electrician becomes yours. And if something does not fit, you are the one solving it rather than the builder. None of that is hard if you are already running trades. All of it is a real cost if you are not.'],
        ['The variable nobody prices', 'Services roughed in to a guess. This is where owner-supplied kitchens actually lose money — a waste or a power point placed before the cabinetry was drawn, then a cabinet modified on site or a wall reopened. It is entirely avoidable with dimensioned service drawings handed to your trades before they rough in, which is why we provide them as standard rather than as an extra.'],
        ['Talk to the builder before you assume', 'If you are mid-contract, taking the kitchen out as a provisional sum is a conversation, not a right. Many builders are comfortable with it; some are not, and some will charge a margin on the excluded item anyway. Raise it early. Doing it at lock-up stage is a fight; doing it at contract stage is an administrative change.'],
        ['When it is not worth it', `If you are not managing the build, the saving usually evaporates into your own time and risk. If you have never coordinated trades, the first thing that goes wrong will cost more than the margin you saved. Be honest about which of those you are — we would rather tell you that now than take the order and watch it go badly.`],
        ['What supply actually includes here', `Design to your measurements, cabinetry delivered assembled rather than flat packed, full service drawings, and a fixed and itemised quote. What it does not include is installation outside Central Queensland. See <a href="/owner-builder-kitchen-supply" style="color:var(--brass)">owner-builder kitchen supply</a>, and <a href="/guide-flat-pack-vs-assembled-kitchen" style="color:var(--brass)">the flat pack comparison</a> for how assembled delivery differs from a flat pack.`],
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
      title: 'Flat Pack vs Assembled Kitchen | Which to Order | Bilt & Co',
      desc: 'The real differences between a flat pack kitchen you assemble and cabinetry delivered assembled: build quality, time, hardware, and who carries the risk.',
      h1: 'Flat pack<br><span class="italic brass">versus delivered assembled.</span>',
      lede: 'We ship both. Same cabinetry, same hardware, same warranty; the difference is who builds the carcasses and how much truck they take. This is how to choose.',
      img: 'drawer-detail',
      alt: 'Assembled drawer box with full extension runners and soft close',
      read: '7 min read',
      answer: `The cabinetry is the same. What differs is who assembles it and what it costs to ship. Flat pack arrives as pre-drilled, labelled panels for you or your installer to build, and travels for less. Assembled arrives with carcasses built, hardware fitted and doors hung and adjusted, and takes more truck. We quote both on the same drawing so the difference is a line item, not a guess.`,
      inlineCta: {
        after: 3,
        eyebrow: 'Both, on one quote',
        title: 'Flat pack or assembled. Same drawing, two prices.',
        body: 'Send the room dimensions once. The quote shows the kitchen flat packed and delivered assembled, with freight to your postcode on each, so you choose with the numbers in front of you.',
        label: 'Get my free quote',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Your call',
        title: 'Flat pack or assembled.<br><span class="italic" style="color:var(--brass-lite)">Two prices, one drawing.</span>',
        body: 'Send us the dimensions and the quote comes back both ways, fixed and itemised, freight to your postcode on each. Then decide.',
        image: 'galley-stone',
        alt: 'Compact kitchen with stone benchtop',
      },
      sections: [
        ['What is genuinely the same', `Be sceptical of anyone claiming flat pack is categorically rubbish. A good flat pack in 18mm moisture-resistant board with Blum hardware is a perfectly sound kitchen, and plenty of them outlast badly specified custom work. The board, the hardware and the edging are the things that decide longevity, and they are specification questions rather than assembly questions. Ask any supplier those three regardless of which route you take.`],
        ['What is genuinely different: who assembles it', `A flat pack transfers the assembly labour to you. That is the saving, and it is honest. The consequence is that the squareness of every carcass, the alignment of every drawer and the adjustment of every door now depends on the person doing it — usually at the end of a build, usually tired, usually on an unfinished floor. Cabinetry assembled out of square does not announce itself; it shows up as doors that do not line up, and it cannot be fixed afterwards without taking it apart.`],
        ['Time is the cost people underestimate', 'A full kitchen is a substantial amount of assembly. People routinely budget a weekend and lose a fortnight of evenings, and it lands at the point in a renovation where patience is already gone. If your time has any value at all, price it in before comparing quotes. If you enjoy the work and have the space to do it properly, that changes the calculation entirely and there is nothing wrong with the answer being flat pack.'],
        ['Where the risk sits', 'With a flat pack, a damaged or mis-drilled panel is your problem to resolve with a supplier, mid-build. With assembled delivery, it arrives built and any fault is visible on delivery rather than discovered at hour six of assembly. Neither is immune to problems; they differ in when you find out and who is holding the pieces.'],
        ['What we actually do', `We ship both, anywhere in Australia, from the same drawing. Cabinetry is imported to our specification — we are not a workshop and do not pretend to be — and either packed flat with the hardware bagged per cabinet, or assembled before delivery with doors hung and adjusted. Within Central Queensland our own team installs the assembled version. Our <a href="/flat-pack-kitchens" style="color:var(--brass)">flat pack</a> and <a href="/assembled-kitchens" style="color:var(--brass)">assembled</a> pages cover what arrives in each case, and the <a href="/investment" style="color:var(--brass)">price bands</a> apply to both.`],
        ['Which one you should choose', `Flat pack if you have the time, a flat floor to build on, and the room is hard to get a built cabinet into — or you are interstate and freight matters. Assembled if you are on a build programme, want your carpenter fitting rather than building, or are at the end of an owner-build with no evenings left. Mixed if some units need to go flat for access. Either way, ask about board, hardware and edging first — those decide whether the kitchen lasts, and they are the same on both of ours. <a href="/guide-kitchen-renovation-checklist" style="color:var(--brass)">Our renovation checklist</a> has the seven questions worth asking any supplier, and the <a href="/guide-how-to-assemble-a-flat-pack-kitchen" style="color:var(--brass)">assembly guide</a> shows what the flat pack route actually involves.`],
      ],
      faq: [
        { q: 'Is a flat pack kitchen worse than an assembled one?', a: 'Not necessarily. The board, hardware and edging decide longevity, and a well-specified flat pack beats a poorly specified custom kitchen. What differs is who assembles it, and therefore how consistent the result is.' },
        { q: 'How long does it take to assemble a flat pack kitchen?', a: 'Longer than most people budget. A full kitchen is a serious amount of assembly, and it lands at the end of a build when time and patience are shortest. Price your own hours before comparing quotes.' },
        { q: 'Do you sell flat pack kitchens?', a: 'Yes, and assembled. Same cabinetry cut to your drawing either way; the quote shows both with freight to your postcode. Flat pack ships as pre-drilled, labelled panels; assembled arrives with carcasses built and doors adjusted.' },
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
        label: 'Get my free quote',
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
      title: 'Garage Conversion Approval QLD | Shed to Living Space',
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
      title: 'Tiny House Laws Queensland | Can You Live In One?',
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
        { q: 'How much is a tiny home kitchen?', a: 'From about $5,300 for a 1.8 metre run and $6,500 for 2.4 metres, with full-size Blum hardware and moisture-resistant carcasses. Delivered assembled or flat packed, your call.' },
      ],
    },
    {
      slug: 'short-stay-letting-rules-qld',
      group: 'approvals',
      nav: 'Short-stay letting rules',
      title: 'Airbnb & Short-Stay Rules Queensland | Council & Body Corp',
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
      title: 'Granny Flat Rules Rockhampton | Secondary Dwelling Guide',
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
        label: 'Get my free quote',
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
      title: 'Does a New Kitchen Add Value to a House? | Honest Answer',
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
      title: 'Renting Out a Granny Flat in Rockhampton | Rules & Returns',
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
        label: 'Get my free quote',
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
      title: 'Do I Need Council Approval to Renovate a Kitchen? | QLD',
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
      title: 'NDIS Kitchen Modifications Queensland | Accessible Kitchens',
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
      title: 'Class 1a Granny Flat Rules Yeppoon | Livingstone Shire',
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
        label: 'Get my free quote',
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
    {
      slug: 'flat-pack-kitchen-shipping-and-freight',
      group: 'flatpack',
      nav: 'Flat pack kitchen shipping & freight',
      title: 'Flat Pack Kitchen Shipping & Freight Australia-Wide',
      desc: 'How freight actually works for a flat pack kitchen shipped anywhere in Australia: what decides the cost, what decides the time.',
      h1: 'How freight actually<br><span class="italic brass">works, door to door.</span>',
      lede: 'The question every interstate buyer asks and most suppliers dodge. Here is the honest version: what decides the cost, what decides the time, and what you are responsible for on the day.',
      img: 'joinery-sketch',
      alt: 'Service drawing showing a numbered kitchen cabinet layout for freight',
      read: '6 min read',
      answer: 'Freight for a flat pack kitchen is priced by cubic volume and distance, quoted to your exact postcode on the same document as the cabinetry — never a flat national rate, because a Sydney quote and a Perth quote are not the same freight job. Flat cartons cost a fraction of what assembled carcasses cost to move because they stack tightly on a pallet; that gap widens with distance, which is why we recommend flat pack for anything outside Queensland.',
      inlineCta: {
        after: 2,
        eyebrow: 'Get the real number',
        title: 'Send the dimensions. We quote the freight too.',
        body: 'Freight to your postcode is worked out on the same quote as the cabinetry, itemised rather than folded in.',
        label: 'Get my free quote',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Flat pack, freighted honestly',
        title: 'One quote,<br><span class="italic" style="color:var(--brass-lite)">the freight already in it.</span>',
        body: 'No from-price that changes at checkout. What you see is what the freight company actually charges to your postcode.',
        image: 'drawer-detail',
        alt: 'Drawer box with Blum runners, packed flat for freight',
      },
      sections: [
        ['What actually decides the freight cost', 'Two things: how much space the kitchen takes on a truck, and how far it is travelling. A flat-packed kitchen nests into a fraction of the pallet space an assembled one needs, because assembled carcasses are mostly air once the doors are hung. That is the entire reason freight is cheaper flat than assembled, and the gap grows with every kilometre past Queensland.'],
        ['Why we will not quote a flat national rate', 'Freight to Sydney, Perth and Darwin are three different jobs, and a single "from $X" figure would be true for none of them. Every quote states freight to your actual postcode as its own line, worked out from the cubic volume of your specific kitchen, so what you see is what the freight company actually charges rather than a number picked to look good on a page.'],
        ['What arrives, and how it is packed', 'Cartons labelled to a numbered drawing, doors and drawer fronts wrapped separately, hardware bagged per cabinet, kickboards and fillers cut to length. Everything is checked against the drawing before it is packed, so what leaves Rockhampton matches what you signed off.'],
        ['What you are responsible for on delivery day', 'Someone needs to be there to receive the freight and check the cartons against the drawing before the driver leaves — count them, and look for transit damage on the outer packaging. Freight claims are far easier to resolve on the day than a week later. If assembled cabinets are coming instead, have a dry, level space ready to stand them, because they take more room than cartons.'],
        ['Timeframes, honestly', 'Production time and freight transit both depend on the kitchen and the destination, so a single figure here would be a guess dressed up as a fact. Your quote states both once the drawing is signed off — ask for it in writing if timing is driving a decision, such as a settlement date or a booked trade.'],
      ],
      faq: [
        { q: 'How much does it cost to freight a flat pack kitchen interstate?', a: 'It depends on the cubic volume of your specific kitchen and the destination postcode, so it is quoted on your job rather than stated as a general figure. As a rule, flat packed costs a fraction of assembled to freight, and the saving grows with distance.' },
        { q: 'Is freight included in the kitchen price?', a: 'No. Freight is always its own line on the quote, worked out to your postcode, so you can see exactly what the cabinetry costs and what moving it costs.' },
        { q: 'How long does delivery take?', a: 'Production and freight transit both vary by kitchen and destination. Your quote states both once the drawing is signed off.' },
        { q: 'What happens if something arrives damaged?', a: 'Check the cartons against the drawing while the driver is still there and note any damage on the freight docket before they leave — that is what makes a claim straightforward. Tell us immediately either way.' },
        { q: 'Does flat pack really cost less to freight than assembled?', a: 'Yes, and it is not close. Cartons stack tightly on a pallet; assembled carcasses are mostly empty space once the doors are on, so they take several times the truck volume for the same kitchen.' },
      ],
    },
    {
      slug: 'what-is-a-cabinet-carcass',
      group: 'glossary',
      nav: 'What is a cabinet carcass?',
      title: 'What Is a Cabinet Carcass? | Kitchen Glossary | Bilt & Co',
      desc: 'The carcass is the box behind the door — what it is made of, why the thickness and moisture rating matter more than the finish, and what to ask before you buy.',
      h1: 'What is a<br><span class="italic brass">cabinet carcass?</span>',
      lede: 'The part nobody photographs and everybody eventually finds out about.',
      img: 'matte-black-bank',
      alt: 'Bank of matte black tall cabinet carcasses before doors are fitted',
      read: '3 min read',
      answer: 'A carcass is the box behind the door — the sides, base, back and shelves that everything else attaches to. It decides how a kitchen ages far more than the door finish does: 18mm moisture-resistant board with laser-bonded edging outlasts a thinner or standard board by years, because the carcass is what the hinges, runners and benchtop actually anchor into.',
      sections: [
        ['What it is made of', 'Almost every Australian kitchen carcass is particleboard or MDF with a melamine or laminate face, not solid timber — that is normal and not a sign of a cheap kitchen. What varies, and what actually matters, is the board grade (standard versus moisture-resistant), the thickness (16mm versus 18mm), and whether the exposed edges are laser-bonded or glued. We build every carcass to 18mm moisture-resistant board with laser-bonded edging as standard, on every collection.'],
        ['Why it matters more than the door', 'A door can be replaced for a few hundred dollars if you tire of it. A failed carcass — swollen at a water line, an edge lifting near the sink, a shelf sagging under crockery — means pulling the kitchen apart. Ask any supplier what board thickness and moisture rating they use before you ask about door colours; it is the question that predicts how the kitchen looks in year eight, not year one.'],
      ],
      faq: [
        { q: 'What is the difference between a carcass and a cabinet?', a: 'They are usually the same thing in conversation — "carcass" is the trade term for the box itself, before doors, benchtop or handles are added.' },
        { q: 'Is 18mm board better than 16mm?', a: 'Generally yes — it is stiffer over a wide span and holds screws and hardware more securely, particularly in base cabinets carrying a stone benchtop. We use 18mm across every collection.' },
        { q: 'How do I know if a carcass is moisture-resistant?', a: 'Ask the supplier directly and get it in writing on the quote — it is not visible once the kitchen is finished, and it is the single biggest factor in how a kitchen survives near a sink or in a humid climate.' },
      ],
    },
    {
      slug: 'what-is-a-kickboard',
      group: 'glossary',
      nav: 'What is a kickboard?',
      title: 'What Is a Kitchen Kickboard? | Kitchen Glossary | Bilt & Co',
      desc: 'The kickboard is the recessed panel at floor level under every cabinet — why it exists, why it should be removable.',
      h1: 'What is a<br><span class="italic brass">kickboard?</span>',
      lede: 'The small panel at floor level that decides how a flood or a leak plays out.',
      img: 'island-marble-close',
      alt: 'Kickboard and toe space beneath an assembled island bench',
      read: '3 min read',
      answer: 'A kickboard, or toe kick, is the recessed panel running along the floor beneath base cabinets — it lets you stand close to the bench without stubbing your toes on the cabinet legs behind it. It is usually the first thing wet if a dishwasher hose fails or water gets in at floor level, which is why we specify it as a removable clip-fit panel rather than glued and sealed.',
      sections: [
        ['Why it is recessed at all', 'Cabinet legs sit back from the front face specifically so a person can stand at the bench with their feet under it rather than against it — try to imagine a kitchen without that gap and you will feel why it exists within a minute of using one. The kickboard hides the legs and the gap behind a clean panel.'],
        ['Why removable beats glued', 'A sealed kickboard looks marginally tidier and is a genuine liability the first time water gets underneath it — you cannot dry out what you cannot access. Clip-fit kickboards pop off for a plumber, a dropped ring, or a clean-up, and go straight back on. In flood-prone areas this single detail is the difference between drying a kitchen out and replacing it — see our note on <a href="/guide-flood-damage-kitchen-replacement-rockhampton" style="color:var(--brass)">flood damage and kitchen replacement</a>.'],
      ],
      faq: [
        { q: 'Is a kickboard structural?', a: 'No — it is a cosmetic panel that clips or screws over the cabinet legs. Removing it does not affect the cabinet above it.' },
        { q: 'Should a kickboard be sealed or removable?', a: 'Removable, in almost every case. A sealed kickboard traps moisture against the cabinet base if water ever gets underneath, instead of letting it be found and dried out.' },
        { q: 'What height is a standard kickboard?', a: 'Typically around 150mm, matched to the cabinet leg height, though it can be adjusted slightly for an uneven floor — which is also where a scribed kickboard comes in; see what a scribe piece is.' },
      ],
    },
    {
      slug: 'what-is-a-scribe-piece',
      group: 'glossary',
      nav: 'What is a scribe piece?',
      title: 'What Is a Scribe Piece in Cabinetry? | Kitchen Glossary',
      desc: 'A scribe piece is the strip cut to match an uneven wall or floor so a cabinet sits flush against it — why almost no wall is actually straight.',
      h1: 'What is a<br><span class="italic brass">scribe piece?</span>',
      lede: 'The strip that makes a straight cabinet fit a wall that is not.',
      img: 'detail-black-cabinetry',
      alt: 'Cabinet end panel scribed to fit an uneven wall',
      read: '3 min read',
      answer: 'A scribe piece is a strip of matching panel, cut and trimmed on site to follow the exact contour of a wall, floor or ceiling that is not perfectly straight — which describes almost every wall in an existing house. Without it, a factory-square cabinet end would leave a wedge-shaped gap against a wall that bows even a few millimetres.',
      sections: [
        ['Why almost nothing is actually straight', 'New-build walls move as a house settles, and older walls were rarely dead straight to begin with. A cabinet run built perfectly square will not sit flush against real walls without some adjustment at the point of contact — that adjustment is the scribe.'],
        ['Where it shows up, and where it should not', 'A well-fitted kitchen scribes at the wall and ceiling junctions so the gaps disappear, rather than leaving a caulk line to hide the problem. It is one of the least visible parts of a good installation and one of the most obvious signs of a poor one — run your eye along where a cabinet meets a wall and you will see it immediately if it was skipped.'],
      ],
      faq: [
        { q: 'Is scribing only needed for old houses?', a: 'No. New-build walls are rarely perfectly straight either, and even a small amount of movement during construction is enough for a factory-square cabinet to need adjustment.' },
        { q: 'What happens if a cabinet is not scribed?', a: 'A visible wedge-shaped gap between the cabinet and the wall, often hidden badly with a bead of sealant that yellows and cracks over time.' },
        { q: 'Do flat pack kitchens still get scribed?', a: 'Yes, if the installer does the job properly — scribing happens on site regardless of whether the cabinet arrived assembled or in cartons, because it depends on the actual wall, not the cabinet.' },
      ],
    },
    {
      slug: 'what-is-edge-banding',
      group: 'glossary',
      nav: 'What is edge banding?',
      title: 'What Is Edge Banding? Laser-Bonded vs Glued | Bilt & Co',
      desc: 'Edge banding seals the cut edge of a cabinet panel. Laser-bonded versus glued is the single biggest predictor of how long a kitchen lasts.',
      h1: 'What is<br><span class="italic brass">edge banding?</span>',
      lede: 'A thin strip that decides whether steam and spills ever reach the raw board underneath.',
      img: 'detail-timber-joinery',
      alt: 'Laser-bonded edge on a kitchen cabinet panel with no visible glue line',
      read: '3 min read',
      answer: 'Edge banding is the thin strip applied to the raw, cut edge of a cabinet panel to seal it and match the door or panel finish. It matters because the raw edge is where moisture gets into the board first — a poorly bonded edge lifts within a few years near a sink or dishwasher, while a laser-bonded edge fuses without a visible glue line and resists lifting for far longer.',
      sections: [
        ['Glued versus laser-bonded', 'Traditional glued edging uses a hot-melt adhesive that can soften with repeated heat and moisture exposure, eventually letting the strip lift at a corner. Laser-bonded edging fuses a functional layer built into the strip itself directly to the board using a laser rather than a separate glue line, which is both more durable and invisible — there is no seam to catch a fingernail or a cloth on.'],
        ['Where it fails first', 'Corners and edges nearest the sink, dishwasher and cooktop, because that is where steam and moisture concentrate. It is worth running a hand along the front edges of any kitchen you are assessing — if you can feel a seam or see a slightly darker line, that is glued banding starting to show its age.'],
      ],
      faq: [
        { q: 'What is laser-bonded edging?', a: 'An edge-sealing method that fuses the banding to the panel without a separate glue line, giving a smoother, less visible join that resists moisture and lifting better than traditional hot-melt glued edging.' },
        { q: 'Does edge banding affect price?', a: 'Marginally, but it is one of the cheapest specification decisions with the biggest long-term consequence. We use laser-bonded edging on every collection as standard rather than as an upgrade.' },
        { q: 'Can lifted edge banding be fixed?', a: 'Sometimes re-glued as a temporary repair, but if it has lifted once it usually will again nearby — the more durable fix is replacing the affected panel with properly bonded edging.' },
      ],
    },
    {
      slug: 'what-is-a-full-extension-runner',
      group: 'glossary',
      nav: 'What is a full-extension runner?',
      title: 'What Is a Full-Extension Drawer Runner? | Bilt & Co',
      desc: 'A full-extension runner lets a drawer pull all the way out so you can see and reach the back. What it is, why it matters for deep drawers, and what Blum adds.',
      h1: 'What is a<br><span class="italic brass">full-extension runner?</span>',
      lede: 'The difference between reaching into a drawer and actually seeing what is in the back of it.',
      img: 'drawer-detail',
      alt: 'Open drawer showing Blum full-extension runners',
      read: '3 min read',
      answer: 'A full-extension runner lets a drawer slide all the way out of the cabinet so the entire base is visible and reachable — as opposed to a partial-extension runner, which stops the drawer short and leaves the back third or so hidden behind the cabinet face. It matters most on deep drawers and pantry drawers, where "hidden at the back" quietly becomes "forgotten and wasted".',
      sections: [
        ['Full versus partial extension', 'Partial-extension runners are cheaper and were standard in older kitchens; they open a drawer roughly two-thirds of the way and rely on you reaching blind for the rest. Full-extension runners, which we use throughout, open the entire drawer box so nothing at the back goes unused.'],
        ['Why Blum specifically', 'Runner quality varies enormously and is invisible until it fails — a cheap runner sags, binds or drops a fully loaded drawer within a few years. Blum runners carry a lifetime mechanical warranty and are rated for repeated heavy loads, which is why they sit under every drawer we build regardless of collection.'],
      ],
      faq: [
        { q: 'Are full-extension runners worth the extra cost?', a: 'Almost always, particularly on pantry, pot and cutlery drawers. The cost difference is small relative to the cabinetry; the difference in how much of the drawer you actually use is not.' },
        { q: 'What is a soft-close runner?', a: 'A runner with a built-in damper that slows the drawer in the last few centimetres so it closes quietly rather than slamming — see soft-close hinges explained for the equivalent on doors.' },
        { q: 'What weight can a Blum runner hold?', a: 'It depends on the specific runner series and drawer size, and is stated on the product specification — ask your supplier for the rated load on any drawer that will carry pots, appliances or a large recycling bin.' },
      ],
    },
    {
      slug: 'soft-close-hinges-explained',
      group: 'glossary',
      nav: 'Soft-close hinges explained',
      title: 'Soft-Close Hinges Explained | Kitchen Glossary | Bilt & Co',
      desc: 'How a soft-close hinge actually works, why it matters for more than quietness, and what to check before assuming every "soft-close" kitchen has a good one.',
      h1: 'Soft-close hinges,<br><span class="italic brass">explained properly.</span>',
      lede: 'Not just about the noise. A cheap soft-close hinge and a good one fail very differently.',
      img: 'black-marble-bar',
      alt: 'Cabinet door closing on a soft-close hinge',
      read: '3 min read',
      answer: 'A soft-close hinge has a built-in hydraulic damper that slows a door in the final few centimetres of travel, so it eases shut instead of banging. Beyond the obvious noise reduction, it matters because it removes the repeated impact that eventually cracks door edges and loosens hinge screws on standard hinges — a house with children or a dog closes a door hundreds of times more often than one without.',
      sections: [
        ['How it actually works', 'A small hydraulic or pneumatic cylinder inside the hinge engages in the last stretch of the door\'s swing, absorbing the momentum so the door decelerates smoothly rather than stopping abruptly. It is a mechanical part, not a soft pad or bumper — which is why hinge quality genuinely varies and cheaper mechanisms wear out or start slamming again within a few years.'],
        ['Why the brand behind it matters', 'A "soft-close" kitchen can mean a genuine Blum mechanism rated for tens of thousands of cycles, or an unbranded hinge that softens the close for the first year and then does not. We specify Blum soft-close hinges, with a lifetime mechanical warranty, across every collection rather than as a named upgrade.'],
      ],
      faq: [
        { q: 'Do soft-close hinges wear out?', a: 'Cheap, unbranded ones can lose their damping effect within a few years. Branded hinges such as Blum are rated for a very high number of open-close cycles and carry a mechanical warranty accordingly.' },
        { q: 'Can soft-close hinges be retrofitted to an old kitchen?', a: 'Often, if the existing hinge is a compatible type — ask a cabinetmaker to check before assuming, since some older hinge systems have no soft-close equivalent.' },
        { q: 'Is soft-close only about noise?', a: 'No. It also reduces the repeated physical shock that loosens screws and stresses door joints over years of use, which is a durability issue as much as a comfort one.' },
      ],
    },
    {
      slug: 'what-is-a-handleless-kitchen',
      group: 'glossary',
      nav: 'What is a handleless kitchen?',
      title: 'What Is a Handleless Kitchen? Rail vs Push-to-Open',
      desc: 'A handleless kitchen opens without visible handles — via a recessed rail or push-to-open hardware. What each method actually is and which suits which household.',
      h1: 'What is a<br><span class="italic brass">handleless kitchen?</span>',
      lede: 'No handles does not mean no way to open it. It means the mechanism is hidden rather than absent.',
      img: 'collection-marble-02',
      alt: 'Handleless kitchen rail on an assembled cabinet run',
      read: '3 min read',
      answer: 'A handleless kitchen has no visible handles on doors or drawers; it opens instead via a recessed grip rail along the top or bottom edge of the door, an angled profile you hook a finger under, or push-to-open hardware that releases the door with a light press. The look reads as quieter and more architectural, and it removes the one part of a kitchen that gets touched with dirty or wet hands most often.',
      sections: [
        ['Rail versus profile versus push-to-open', 'A recessed rail sits along the top of base cabinets and the underside of overheads, giving a continuous grip line. An angled or slimline profile is milled into the door edge itself for a similar effect without a separate rail. Push-to-open hardware needs neither — see push-to-open hardware explained — but has its own trade-offs around door weight and mechanism wear.'],
        ['Who it suits, and who it does not', 'It suits a quieter, more minimal aesthetic and is genuinely easier to keep clean than moulded handles. It suits people with full hand mobility less well if the profile is very shallow — worth testing in person before committing, particularly for an aging-in-place kitchen; see our note on <a href="/aging-in-place-kitchens" style="color:var(--brass)">aging in place kitchens</a> for where hardware choice matters more than usual.'],
      ],
      faq: [
        { q: 'Is a handleless kitchen harder to clean?', a: 'Generally easier — there are no handle recesses to collect grime, though a push-to-open front picks up fingermarks in the same spot repeatedly, similar to any flat door.' },
        { q: 'Is a handleless kitchen more expensive?', a: 'The rail or profile adds a modest cost over standard handles; push-to-open hardware adds more, since it requires a mechanism in every door and drawer rather than a simple pull.' },
        { q: 'Can I mix handleless and handled cabinetry?', a: 'Yes — a common approach is handleless on base runs with a rail, and a conventional handle on a pantry or tall unit that gets pulled open with more force or wet hands.' },
      ],
    },
    {
      slug: 'what-is-a-waterfall-benchtop-edge',
      group: 'glossary',
      nav: 'What is a waterfall benchtop edge?',
      title: 'What Is a Waterfall Benchtop Edge? | Kitchen Glossary',
      desc: 'A waterfall edge wraps the benchtop material down the side of an island to the floor, in one continuous piece. What it takes to do well, and where it works.',
      h1: 'What is a<br><span class="italic brass">waterfall edge?</span>',
      lede: 'The benchtop material does not stop at the edge — it turns the corner and runs to the floor.',
      img: 'island-marble-brass',
      alt: 'Waterfall edge on a stone island benchtop',
      read: '3 min read',
      answer: 'A waterfall edge continues the benchtop material vertically down the end of an island, cabinet run or peninsula to the floor, rather than stopping at a standard front edge profile — as though the stone or stone-look surface is "falling" over the edge. It reads as a single continuous slab even where two or three pieces have been joined with a mitred seam.',
      sections: [
        ['Why it needs a mitred join, done well', 'A convincing waterfall edge depends entirely on the mitre — the diagonal join where the horizontal benchtop meets the vertical drop — being cut and fitted so the veining or pattern lines up and the seam is as close to invisible as the material allows. A poorly cut mitre is the single most common way a waterfall edge looks cheap rather than expensive; see what a mitred join is.'],
        ['Where it works, and where it is wasted', 'It suits an island or peninsula end that is genuinely visible from the main sightlines of the room — a kitchen you walk into and see the end grain of before anything else. On a run against a wall, where nobody will ever see the end, it is cost spent on a detail nobody experiences.'],
      ],
      faq: [
        { q: 'Does a waterfall edge cost much more?', a: 'Yes, noticeably — it uses significantly more of the benchtop material and requires precise mitre cutting and matching, which is skilled, time-consuming work.' },
        { q: 'Can any benchtop material do a waterfall edge?', a: 'Engineered stone, porcelain and natural stone all can; laminate generally cannot achieve a convincing seamless look at the mitre the same way.' },
        { q: 'Is a waterfall edge purely decorative?', a: 'Mostly, though it does protect the cabinet end panel underneath from knocks in a busy kitchen, which is a minor practical benefit alongside the visual one.' },
      ],
    },
    {
      slug: 'what-is-a-mitred-join',
      group: 'glossary',
      nav: 'What is a mitred join?',
      title: 'What Is a Mitred Join in Benchtops? | Kitchen Glossary',
      desc: 'A mitred join is the angled cut where two benchtop pieces meet to look like one surface. Why it is one of the hardest things to get right in a kitchen.',
      h1: 'What is a<br><span class="italic brass">mitred join?</span>',
      lede: 'Two pieces of stone, cut at an angle, trying to convince you they are one.',
      img: 'splashback-marble-02',
      alt: 'Mitred stone join behind a rangehood',
      read: '3 min read',
      answer: 'A mitred join is a diagonal cut, usually at 45 degrees, made where two pieces of benchtop meet so the pattern or veining continues across the seam as if it were a single piece rather than a visible butt join. It is most often seen on a waterfall benchtop edge, where the horizontal top meets the vertical drop, and on wide island benches assembled from more than one slab.',
      sections: [
        ['Why it is harder than it looks', 'Getting a mitred join to disappear requires the veining or pattern in a natural or engineered stone to be matched across the cut before it is even made, then the two faces polished and fitted with a seam gap measured in fractions of a millimetre. Rush the template or the fabrication and the join sits as a visible line rather than a continuation.'],
        ['What to check before you accept one', 'Stand at the actual viewing angle you will use the kitchen from — most often standing at the island rather than crouched at bench height — and look along the join in good light. A well-done mitre is very hard to find even looking for it; a rushed one is obvious the moment you know where to look.'],
      ],
      faq: [
        { q: 'Is a mitred join weaker than a single slab?', a: 'Structurally it is adequately supported when fabricated correctly, though a single uninterrupted slab is marginally stronger — the mitre exists for appearance and material efficiency, not structural need.' },
        { q: 'Can a mitred join be repaired if it opens up?', a: 'A fabricator can sometimes re-seal a join that has opened slightly, but a poorly cut mitre that has never sat flush usually needs to be redone rather than patched.' },
        { q: 'Does every stone benchtop need a mitred join?', a: 'No — only where the benchtop is wider or longer than a single slab allows, or where a waterfall edge is specified. A straightforward bench run often needs none at all.' },
      ],
    },
    {
      slug: 'what-is-a-kitchen-splashback',
      group: 'glossary',
      nav: 'What is a kitchen splashback?',
      title: 'What Is a Kitchen Splashback? | Kitchen Glossary | Bilt & Co',
      desc: 'The splashback protects the wall behind a bench and cooktop from moisture and grease. What materials suit it, and why full-height is different from a strip.',
      h1: 'What is a<br><span class="italic brass">splashback?</span>',
      lede: 'The wall surface between the benchtop and the overheads, doing a genuinely thankless job.',
      img: 'splashback-marble-01',
      alt: 'Full height stone splashback behind a cooktop',
      read: '3 min read',
      answer: 'A splashback is the water- and heat-resistant surface fixed to the wall between the benchtop and the underside of the overhead cabinets, protecting the wall from cooking splatter, grease and moisture. It ranges from a narrow strip behind the cooktop and sink only, to a full-height splashback running the entire wall from bench to overheads or ceiling.',
      sections: [
        ['Strip versus full height', 'A strip splashback covers just the areas most exposed to splatter and is the cheaper option; a full-height splashback covers the entire wall in one material, which reads as more considered and eliminates the join line between splashback and painted wall above it — visible in almost every kitchen that used a strip.'],
        ['What it is usually made from', 'Stone or engineered stone matching the benchtop, glass, tile, or a mirror-polished panel are the common choices. Behind a cooktop specifically, heat rating matters more than anywhere else in the kitchen — check any material\'s heat tolerance before it goes anywhere near a gas or induction cooktop.'],
      ],
      faq: [
        { q: 'Does a splashback need to match the benchtop?', a: 'No, though a full-height splashback in the same stone as the benchtop is a common way to make a kitchen feel like one continuous material rather than several competing finishes.' },
        { q: 'Is glass or stone better behind a cooktop?', a: 'Both perform well if correctly rated for heat; toughened glass and stone both tolerate cooktop heat, while some laminates and standard tiles with certain grouts do not hold up as well over time.' },
        { q: 'Is a full-height splashback worth the extra cost?', a: 'Often, for the visual result alone — it removes a join line and reads as a more finished, considered kitchen, which matters if the room is on display as much as it is used.' },
      ],
    },
    {
      slug: 'what-is-a-service-drawing',
      group: 'glossary',
      nav: 'What is a service drawing?',
      title: 'What Is a Kitchen Service Drawing? | Kitchen Glossary',
      desc: 'A service drawing shows a plumber and electrician exactly where every waste, water point and outlet needs to land before cabinetry arrives. What it includes.',
      h1: 'What is a<br><span class="italic brass">service drawing?</span>',
      lede: 'The document that stops your plumber and your kitchen disagreeing about where things go.',
      img: 'joinery-sketch',
      alt: 'Kitchen service drawing with dimensions for plumbing and electrical rough-in',
      read: '3 min read',
      answer: 'A service drawing is a dimensioned plan showing exactly where every plumbing point, waste, power outlet and appliance connection needs to land before the cabinetry is installed — it is what a plumber and electrician rough in from, so services end up exactly where the finished kitchen needs them rather than a rushed guess made after the cabinets are already in.',
      sections: [
        ['Why it has to come before the trades, not after', 'Moving a water point or an outlet before the wall is finished costs very little; moving it after the cabinetry is in and the wall is closed up is expensive and often means opening a finished surface. A service drawing exists to make that decision once, correctly, at the point it is nearly free to change.'],
        ['What it typically shows', 'Every sink, dishwasher and waste connection with its exact position, power outlets for every appliance including ones not yet purchased, water points for a fridge or coffee machine, and rangehood ducting where relevant. On a supply-only job it is the single most important document your builder\'s trades receive — see <a href="/guide-how-to-install-a-supplied-kitchen" style="color:var(--brass)">how to get a supplied kitchen installed</a> for how it fits into the sequence.'],
      ],
      faq: [
        { q: 'Who uses a service drawing?', a: 'Your plumber and electrician, primarily, to rough in water, waste and power before the cabinetry arrives. Your builder or installer also references it to confirm the cabinetry lands where the services already are.' },
        { q: 'Do I get a service drawing with a flat pack order?', a: 'Yes — every quote includes a dimensioned service drawing alongside the cabinetry drawing, whether the kitchen is ordered flat pack or delivered assembled.' },
        { q: 'What happens if trades work without one?', a: 'Services get roughed in to a guess, which is one of the most common and expensive mistakes on a supply-only job — a waste point in the wrong spot after the wall is finished is a real repair, not a small adjustment.' },
      ],
    },
    {
      slug: 'what-does-supply-only-mean',
      group: 'glossary',
      nav: 'What does "supply only" mean?',
      title: 'What Does "Supply Only" Mean for a Kitchen?',
      desc: 'Supply only means you get the cabinetry, drawings and hardware — your own builder or installer fits it. What is included, and what is genuinely not.',
      h1: 'What does<br><span class="italic brass">"supply only" mean?</span>',
      lede: 'Everything except the labour to fit it — and exactly what that does and does not include.',
      img: 'studio-desk',
      alt: 'Design studio desk with kitchen drawings and material samples',
      read: '3 min read',
      answer: 'Supply only means the kitchen is designed, manufactured and delivered — either flat packed or assembled — but installation is not included; your own builder, cabinetmaker or installer fits it on site. It is the standard arrangement for any job outside an installer\'s travel radius, and it is exactly what we offer everywhere outside Central Queensland.',
      sections: [
        ['What is included', 'Design to your measurements, a fixed itemised quote, the cabinetry itself with hardware fitted or bagged, doors, benchtop (templated separately in most cases), and a full set of service drawings for your trades. Nothing about supply-only is a reduced specification — see what is a service drawing for the document that makes it work smoothly.'],
        ['What is not included, and why that is stated plainly', 'Installation labour, and anything that requires a licensed trade on site — plumbing, electrical, and fixing the cabinets to the wall. We say this plainly rather than quote for work we cannot stand behind from a distance; see <a href="/guide-how-to-install-a-supplied-kitchen" style="color:var(--brass)">how to get a supplied kitchen installed</a> for the three trades involved and the order they work in.'],
      ],
      faq: [
        { q: 'Is supply-only cheaper than supply and install?', a: 'The cabinetry itself costs the same either way; you are simply not paying installation labour, which your own builder or installer then charges separately.' },
        { q: 'Who installs a supply-only kitchen?', a: 'Your builder, a cabinetmaker, or a kitchen installer you engage directly — working from the service and cabinetry drawings included with the order.' },
        { q: 'Is supply-only the same as flat pack?', a: 'No — supply-only describes who installs it, not how it arrives. A supply-only order can be delivered flat packed or fully assembled; see flat pack vs assembled kitchen for that separate decision.' },
      ],
    },
    {
      slug: 'what-is-a-tall-pantry-unit',
      group: 'glossary',
      nav: 'What is a tall pantry unit?',
      title: 'What Is a Tall Pantry Unit? | Kitchen Glossary | Bilt & Co',
      desc: 'A tall pantry unit runs floor to ceiling for concentrated storage. What it is, how it differs from a butler\'s pantry, and what to fit inside it.',
      h1: 'What is a<br><span class="italic brass">tall pantry unit?</span>',
      lede: 'The single tallest, deepest storage cabinet in most kitchens — and often the most wasted.',
      img: 'matte-black-bank',
      alt: 'Tall pantry unit built as a single floor-to-ceiling box',
      read: '3 min read',
      answer: 'A tall pantry unit is a single cabinet running from floor to close to ceiling height, typically 550 to 600mm deep, used for dry food storage, small appliances or a mix of both. It concentrates a large volume of storage into one footprint, which makes internal fit-out — shelving, pull-out baskets, or a larder unit with racks on the door — the decision that determines whether it works well or becomes a black hole.',
      sections: [
        ['Fixed shelves versus pull-out fit-out', 'A tall unit with fixed shelves is the cheapest option and the easiest to lose things in — anything at the back of a 600mm-deep shelf above eye level is functionally gone. Pull-out wire baskets or a larder-style unit with racks on the door and shallow pull-out trays behind it turn the same footprint into storage you can actually see and reach.'],
        ['Tall pantry unit versus butler\'s pantry', 'A tall pantry unit is one cabinet within the main kitchen; a butler\'s pantry is a separate room or alcove with its own bench and often its own sink, hidden behind a door. If you are choosing between the two, the real question is whether you want prep mess visible from the main kitchen at all — see whether a butler\'s pantry is worth it.'],
      ],
      faq: [
        { q: 'How deep should a tall pantry unit be?', a: 'Around 550 to 600mm is standard, matching base cabinet depth, though a shallower unit with pull-out trays can be easier to use well than a deep one with fixed shelves.' },
        { q: 'Can a tall pantry unit include an oven?', a: 'Yes — a common configuration builds an oven and microwave into the upper section of a tall unit, with pantry storage above and below.' },
        { q: 'Is a pull-out pantry worth the extra cost?', a: 'Usually yes, if the alternative is fixed shelves at a depth where you cannot see the back — the extra cost buys storage you actually use rather than storage you forget about.' },
      ],
    },
    {
      slug: 'what-is-a-corner-carousel',
      group: 'glossary',
      nav: 'What is a corner carousel?',
      title: 'What Is a Corner Carousel (Lazy Susan)? | Bilt & Co',
      desc: 'A corner carousel rotates shelving in a corner cabinet so nothing is trapped in the unreachable back. What it is, and the alternatives.',
      h1: 'What is a<br><span class="italic brass">corner carousel?</span>',
      lede: 'A rotating shelf built to solve the one corner every kitchen layout creates.',
      img: 'galley-stone',
      alt: 'Corner storage solution in a compact galley-style kitchen',
      read: '3 min read',
      answer: 'A corner carousel, often called a lazy susan, is a set of circular or D-shaped shelves that rotate inside a corner cabinet, bringing stored items around to the door opening instead of leaving them wedged in the unreachable back corner. It exists because an L-shaped kitchen layout always creates one internal corner where two cabinet runs meet, and that corner wastes roughly half its volume without some mechanism to access it.',
      sections: [
        ['Full-round versus D-shaped or blind-corner alternatives', 'A full carousel rotates 360 degrees and suits a corner with door access on both sides. Where only one side opens, a D-shaped rotating shelf or a pull-out blind corner mechanism — see what is a blind corner cabinet — can suit better, sliding the contents out into the room rather than spinning them.'],
        ['Why it is the fit-out worth spending on', 'Of every optional upgrade in a kitchen, a corner solution changes daily usability more than almost anything else, because the alternative — an unaddressed corner — is functionally lost storage you paid for and cannot use. See our <a href="/guide-kitchen-layouts" style="color:var(--brass)">kitchen layouts</a> guide for why the corner problem exists in the first place.'],
      ],
      faq: [
        { q: 'Is a corner carousel worth the cost?', a: 'Generally yes — an unaddressed corner wastes roughly half a cabinet, so a carousel or pull-out mechanism converts genuinely lost storage into usable space.' },
        { q: 'What is the difference between a carousel and a blind corner pull-out?', a: 'A carousel rotates in place inside the cabinet; a blind corner pull-out slides the entire mechanism out into the room on runners, which some people find easier to load and unload than reaching in to spin a shelf.' },
        { q: 'Does every L-shaped kitchen need a corner solution?', a: 'Not strictly, but without one that corner is largely unusable storage — worth deciding deliberately rather than leaving it as an afterthought at fit-off.' },
      ],
    },
    {
      slug: 'what-is-a-blind-corner-cabinet',
      group: 'glossary',
      nav: 'What is a blind corner cabinet?',
      title: 'What Is a Blind Corner Cabinet? | Kitchen Glossary',
      desc: 'A blind corner cabinet is the base unit tucked behind an adjoining run where only one side opens. What makes it "blind".',
      h1: 'What is a<br><span class="italic brass">blind corner cabinet?</span>',
      lede: 'The cabinet you can see the front of and still cannot see inside.',
      img: 'timber-island',
      alt: 'Corner cabinetry detail in a timber kitchen run',
      read: '3 min read',
      answer: 'A blind corner cabinet is a base unit in an L-shaped run where an adjoining cabinet sits hard against one side, leaving a deep, dark section behind it that a standard door and fixed shelf cannot reach — "blind" because you cannot see or easily access that portion without a mechanism designed for it, such as a pull-out frame or a corner carousel.',
      sections: [
        ['Why the corner is blind in the first place', 'Two cabinet runs meeting at 90 degrees create an internal corner where one cabinet\'s side panel physically blocks direct access to roughly half of the neighbouring cabinet\'s width. A standard shelf in that space becomes storage you can see with a torch and reach with difficulty, if at all.'],
        ['The two common fixes', 'A blind corner pull-out mechanism slides shelving out and around the obstruction into the room; a corner carousel — see what is a corner carousel — rotates shelving to bring contents to the door opening instead. Both solve the same problem differently, and which suits better depends on which side of the corner the door actually opens from.'],
      ],
      faq: [
        { q: 'Can a blind corner cabinet be left with just a fixed shelf?', a: 'Yes, and many are, but a significant portion of that cabinet becomes very difficult to use — most people fitting one out properly choose a pull-out or carousel mechanism instead.' },
        { q: 'Is a blind corner pull-out expensive?', a: 'It costs more than a fixed shelf but is one of the highest-value fit-out upgrades available, because it recovers storage that would otherwise be functionally wasted.' },
        { q: 'Does a U-shaped kitchen have two blind corners?', a: 'Often yes — a U-shaped layout has two internal corners, so it is worth deciding on a corner solution for each rather than only the more visible one.' },
      ],
    },
    {
      slug: 'push-to-open-hardware-explained',
      group: 'glossary',
      nav: 'Push-to-open hardware explained',
      title: 'Push-to-Open Hardware Explained | Kitchen Glossary',
      desc: 'Push-to-open hardware releases a handleless door or drawer with a light press instead of a handle or grip rail. How it works, and its real trade-offs.',
      h1: 'Push-to-open,<br><span class="italic brass">explained properly.</span>',
      lede: 'No handle, no rail — just a press, and a mechanism doing the rest.',
      img: 'concrete-luxe',
      alt: 'Handleless concrete-look doors using push-to-open hardware',
      read: '3 min read',
      answer: 'Push-to-open hardware is a spring-and-catch mechanism fitted inside a cabinet that releases the door or drawer with a light push on the front face, rather than requiring a handle or a recessed grip rail to pull. It is one route to a fully handleless kitchen — see what is a handleless kitchen for how it compares to a rail or milled profile.',
      sections: [
        ['How the mechanism actually works', 'A spring-loaded catch inside the cabinet holds the door closed under light tension; pushing the door face releases the catch and the door springs open slightly, far enough to grip and open fully by hand. Closing it firmly re-engages the catch.'],
        ['The trade-offs worth knowing before you choose it', 'Push-to-open mechanisms add cost per door and drawer, since every one needs its own catch rather than a single continuous rail. They can also feel less immediate than a handle to someone unfamiliar with the kitchen, and heavier doors put more strain on the catch over years of use — worth testing a sample door in person before specifying it throughout a whole kitchen.'],
      ],
      faq: [
        { q: 'Does push-to-open hardware wear out?', a: 'The catch mechanism can weaken over years of heavy use, particularly on large or heavy doors — a quality mechanism such as Blum\'s tends to hold up considerably longer than an unbranded equivalent.' },
        { q: 'Is push-to-open more expensive than a handle?', a: 'Yes, noticeably — every door and drawer needs its own mechanism, compared with a single continuous rail achieving the same handleless look for less.' },
        { q: 'Can push-to-open be mixed with handles in the same kitchen?', a: 'Yes — a common approach is push-to-open on overheads that are reached less often, with a handle or rail on base cabinets and drawers used constantly.' },
      ],
    },
    {
      slug: 'what-is-moisture-resistant-board',
      group: 'glossary',
      nav: 'What is moisture-resistant board?',
      title: 'What Is Moisture-Resistant Board (MR/HMR)? | Bilt & Co',
      desc: 'Moisture-resistant board is particleboard or MDF treated to resist swelling from humidity and moisture.',
      h1: 'What is<br><span class="italic brass">moisture-resistant board?</span>',
      lede: 'The one line on a specification sheet that predicts a kitchen\'s lifespan more than any other.',
      img: 'material-samples',
      alt: 'Moisture-resistant board sample with a laminate finish',
      read: '3 min read',
      answer: 'Moisture-resistant board — often labelled MR or HMR (high moisture resistance) — is particleboard or MDF manufactured with a resin that resists water absorption and swelling far better than standard board. In a kitchen, where humidity, spills and the occasional undetected leak are inevitable over a decade of use, it is the difference between a carcass that survives and one that swells and delaminates at the first sustained exposure.',
      sections: [
        ['Standard board versus moisture-resistant', 'Standard particleboard swells, softens and can delaminate when it absorbs moisture over time — a slow leak under a sink, condensation, or repeated splashing near a benchtop edge are all it takes. Moisture-resistant board resists that swelling substantially longer, though "resistant" is not "waterproof" — sustained standing water will eventually affect any wood-based board.'],
        ['Why Central Queensland and coastal Australia specifically', 'Humidity accelerates every one of these failure modes, which is why we specify 18mm moisture-resistant board as standard across every collection rather than as a regional upgrade — a kitchen in a humid coastal climate is not a special case, it is simply where a standard-board carcass fails fastest.'],
      ],
      faq: [
        { q: 'Is moisture-resistant board waterproof?', a: 'No — it resists swelling and moisture absorption significantly better than standard board, but sustained standing water will still eventually damage it. It is resistance, not immunity.' },
        { q: 'How can I tell if a kitchen uses moisture-resistant board?', a: 'It is not visually distinguishable once installed — ask the supplier directly and get the board grade stated on the quote.' },
        { q: 'Does moisture-resistant board cost much more?', a: 'It costs somewhat more than standard board, and it is one of the cheapest specification upgrades relative to how much it affects the kitchen\'s lifespan.' },
      ],
    },
    {
      slug: 'what-is-an-overhead-cabinet',
      group: 'glossary',
      nav: 'What is an overhead cabinet?',
      title: 'What Is an Overhead Cabinet? Height & Depth Explained',
      desc: 'Overhead cabinets are the wall-mounted units above the benchtop. Standard heights, depths, and what changes when they need to house a rangehood.',
      h1: 'What is an<br><span class="italic brass">overhead cabinet?</span>',
      lede: 'The wall units above the bench — and the measurements that decide whether they work or get in the way.',
      img: 'dark-luxe-bar',
      alt: 'Overhead cabinets with a concealed appliance garage',
      read: '3 min read',
      answer: 'An overhead cabinet is a wall-mounted unit fixed above the benchtop, typically 600 to 750mm above the bench surface, used for lighter or less frequently accessed storage than base cabinets. Depth is usually shallower than base cabinets — around 300 to 350mm — so they do not intrude too far into the room at head height.',
      sections: [
        ['Standard clearances, and why they exist', 'The 600 to 750mm gap between benchtop and the underside of overheads balances workable bench clearance against reachable overhead storage; too low and tall items cannot fit on the bench underneath, too high and the overheads become hard to reach without a step. See our <a href="/guide-kitchen-layouts" style="color:var(--brass)">kitchen layouts</a> guide for how this interacts with the rest of the room.'],
        ['Where a rangehood changes the rule', 'The section of overhead cabinetry above a cooktop is usually built specifically to house a rangehood and its ducting, which changes both the depth and the internal structure compared with a standard overhead elsewhere in the run — worth confirming with your supplier before assuming every overhead in a kitchen is interchangeable.'],
      ],
      faq: [
        { q: 'How high should overhead cabinets be mounted?', a: 'Typically 600 to 750mm above the benchtop, though this can be adjusted for very tall or short household members, or where accessibility is a consideration — see aging in place kitchens.' },
        { q: 'How deep are overhead cabinets compared to base cabinets?', a: 'Usually shallower, around 300 to 350mm against 560 to 600mm for base cabinets, to avoid intruding too far into the room at head height.' },
        { q: 'Do all overhead cabinets need to go to the ceiling?', a: 'No — some kitchens leave a gap above overheads for display or lighting, while others run cabinetry to the ceiling for maximum storage and easier cleaning on top. Both are valid design choices.' },
      ],
    },
    {
      slug: 'hamptons-style-kitchen',
      group: 'style',
      nav: 'Hamptons style kitchen guide',
      title: 'Hamptons Style Kitchen Guide | Materials & Details',
      desc: 'What actually makes a kitchen read as Hamptons style: door profile, palette and hardware — and how to get it without it looking like a display-home cliché.',
      h1: 'The Hamptons kitchen,<br><span class="italic brass">without the cliché.</span>',
      lede: 'Everyone can name the look. Almost nobody can name the four decisions that actually create it.',
      img: 'splashback-marble-01',
      alt: 'Full height marble splashback with painted Shaker-style cabinetry',
      read: '5 min read',
      answer: 'A Hamptons kitchen is built on four decisions: a painted or off-white Shaker-profile door with a recessed panel, a light natural stone or stone-look benchtop, brushed brass or nickel hardware rather than chrome, and a full-height splashback in stone or a simple metro-adjacent tile. Get those four right and the rest of the room can be relatively plain; get them wrong and no amount of styling fixes it.',
      inlineCta: {
        after: 2,
        eyebrow: 'Every finish, itemised',
        title: 'See what a Hamptons palette actually costs.',
        body: 'Painted Shaker doors, stone benchtop and brass hardware sit inside our Maison collection as standard, not as named upgrades.',
        label: 'See the price bands',
        href: '/investment',
      },
      cta: {
        eyebrow: 'Hamptons, done properly',
        title: 'Four decisions,<br><span class="italic" style="color:var(--brass-lite)">drawn to your room.</span>',
        body: 'Send your measurements and we will show you what the palette looks like in your actual kitchen, not a display home.',
        image: 'island-marble-brass',
        alt: 'Stone island with brushed brass tapware and hardware',
      },
      sections: [
        ['The door profile is doing most of the work', 'A Shaker door — a flat centre panel inside a simple recessed frame — is the single most recognisable Hamptons signal, almost always painted rather than a timber veneer or laminate print. Off-white, soft grey and pale sage are the palette that reads as considered rather than dated; a bright white can tip into a builder-grade look if the rest of the room does not support it.'],
        ['Stone, not stone-look-of-everything', 'A genuine engineered stone or natural marble benchtop with visible veining is what separates a real Hamptons kitchen from an imitation. A flat, pattern-free benchtop under a Shaker door reads as a different, plainer style entirely — the veining is not decoration, it is doing structural work in the overall look.'],
        ['Brass or nickel, never chrome', 'Warm metals — brushed brass, aged brass or a warm nickel — are what age this palette well. Chrome or bright polished finishes read as a different, colder era of kitchen entirely, even against an otherwise correct Shaker-and-stone base.'],
        ['Where people overdo it', 'Shiplap on every wall, a farmhouse sink that is oversized for the room, and navy on every second cabinet are the three most common ways a Hamptons kitchen tips into pastiche. One strong navy or dark element — an island, most often — reads as intentional; navy everywhere reads as a theme rather than a kitchen.'],
      ],
      faq: [
        { q: 'What makes a kitchen "Hamptons style"?', a: 'Four elements together: a painted Shaker-profile door, a light natural or stone-look benchtop with visible veining, brushed brass or nickel hardware, and a full-height stone or simple tiled splashback.' },
        { q: 'Does a Hamptons kitchen have to be white?', a: 'No — soft grey, pale sage and warm off-whites all read correctly. What matters more than the exact shade is that the door is painted rather than a timber or laminate finish.' },
        { q: 'Is a Hamptons kitchen more expensive than a standard kitchen?', a: 'Not inherently — the palette sits comfortably inside our Maison collection. What adds cost is a genuine stone benchtop over a laminate one, which the look depends on more than most other style decisions.' },
      ],
    },
    {
      slug: 'modern-farmhouse-kitchen',
      group: 'style',
      nav: 'Modern farmhouse kitchen guide',
      title: 'Modern Farmhouse Kitchen Guide | Bilt & Co',
      desc: 'Modern farmhouse balances warm timber against flat matte cabinetry. What separates it from a Hamptons look, and where the style actually comes from.',
      h1: 'Modern farmhouse,<br><span class="italic brass">without the theme park.</span>',
      lede: 'Warmer than industrial, plainer than Hamptons — and the easiest of the popular styles to get half-right by accident.',
      img: 'timber-island',
      alt: 'Timber-fronted island with stone top in a modern farmhouse kitchen',
      read: '5 min read',
      answer: 'A modern farmhouse kitchen pairs a flat, matte cabinet door — usually in a warm off-white, sage or charcoal — against natural timber elements: an oak island, open shelving, or a timber benchtop used deliberately in one zone rather than throughout. The "modern" half keeps the door profile flat and simple rather than ornate, which is what stops the look sliding into a more rustic, dated country style.',
      inlineCta: {
        after: 2,
        eyebrow: 'Timber, without the maintenance',
        title: 'The look of timber, the durability of stone.',
        body: 'A timber-look benchtop in a durable material on the island, with stone elsewhere, gets most of the visual warmth without the upkeep of real timber near a sink.',
        label: 'Get my free quote',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Modern farmhouse',
        title: 'Warm timber,<br><span class="italic" style="color:var(--brass-lite)">flat modern doors.</span>',
        body: 'Send your room and we will show you the balance in your own layout before you commit to a single finish.',
        image: 'timber-island',
        alt: 'Timber island bench with stone top',
      },
      sections: [
        ['Flat doors, not ornate ones', 'The word "modern" in modern farmhouse is doing real work — a flat slab or simple square-edged door keeps the look current, where a raised-panel or ornate profile pulls it toward a more traditional country kitchen instead. This is the detail most likely to get skipped by accident.'],
        ['One timber element, used deliberately', 'An oak or American oak island against otherwise plain cabinetry is the most common and most effective version of this style — timber in one clear zone rather than scattered across open shelving, a benchtop and cabinetry all at once, which reads as busy rather than considered.'],
        ['Black hardware and fixtures as the accent', 'Matte black tapware, handles and a rangehood are the accent metal of choice here, in contrast to the warm brass of a Hamptons kitchen — a small, consistent detail that ties the room together against the warm timber and pale cabinetry.'],
      ],
      faq: [
        { q: 'What is the difference between modern farmhouse and Hamptons style?', a: 'Modern farmhouse leans on warm timber and flat, plain doors with black hardware; Hamptons leans on painted Shaker-profile doors, stone and brass. Both are light and welcoming, but the material warmth comes from timber in one case and stone veining in the other.' },
        { q: 'Do I need open shelving for a modern farmhouse kitchen?', a: 'No — it is a common feature but not essential, and in a busy household closed storage is often more practical. A single timber element, such as an island, carries the style without it.' },
        { q: 'What benchtop suits a modern farmhouse kitchen?', a: 'A light engineered stone works well against timber cabinetry, or a durable timber-look benchtop on an island specifically, paired with stone on the perimeter bench where water and heat exposure is higher.' },
      ],
    },
    {
      slug: 'japandi-kitchen-design',
      group: 'style',
      nav: 'Japandi kitchen design guide',
      title: 'Japandi Kitchen Design Guide | Quiet, Handleless | Bilt & Co',
      desc: 'Japandi kitchens combine Japanese restraint with Scandinavian warmth. What that actually means in cabinetry: handleless fronts, natural materials.',
      h1: 'Japandi:<br><span class="italic brass">restraint as the whole style.</span>',
      lede: 'The style with the fewest decorative elements and the least room to hide a mistake.',
      img: 'collection-marble-03',
      alt: 'Light oak kitchen run with stone benchtop and open shelving',
      read: '5 min read',
      answer: 'Japandi combines Japanese minimalism with Scandinavian warmth: handleless cabinetry in a natural timber tone or a quiet matte finish, a restrained material palette of two or three finishes at most, and almost no visible hardware or ornament. Because there is so little to distract from proportion and finish quality, this is the style that shows up flaws in either the fastest of all of them.',
      inlineCta: {
        after: 2,
        eyebrow: 'Where the quality shows',
        title: 'A handleless kitchen with nowhere to hide.',
        body: 'A slimline or recessed rail profile, laser-bonded edges and an even reveal between doors are what carry this look — see what a handleless kitchen actually is.',
        label: 'What is a handleless kitchen?',
        href: '/guide-what-is-a-handleless-kitchen',
      },
      cta: {
        eyebrow: 'Japandi',
        title: 'Fewer decisions,<br><span class="italic" style="color:var(--brass-lite)">each one more visible.</span>',
        body: 'Send your room and we will show you the palette that suits it before a single cabinet is cut.',
        image: 'collection-marble-03',
        alt: 'Light oak kitchen run with open shelving',
      },
      sections: [
        ['Two or three finishes, no more', 'A natural oak or light timber veneer, a matte stone or concrete-look benchtop, and one accent — often a warm black or a soft clay tone — is close to the full palette. Adding a fourth competing material is the single fastest way to break the calm this style depends on.'],
        ['Handleless is close to mandatory', 'Visible hardware reads as clutter against this palette, which is why almost every genuine Japandi kitchen is handleless — a recessed rail or slimline profile rather than push-to-open hardware, which can look bulkier at the door edge than the style tolerates.'],
        ['Where the craftsmanship has nowhere to hide', 'With almost no ornament to distract the eye, gaps between doors, an uneven reveal, or a visible edge-banding seam are far more obvious than in a busier style. This is the kitchen where laser-bonded edging and precise door alignment matter more than almost anywhere else — see what is edge banding for why the detail matters.'],
      ],
      faq: [
        { q: 'What is Japandi style?', a: 'A blend of Japanese minimalism and Scandinavian warmth — restrained materials, natural timber tones, handleless cabinetry and almost no visible ornament or hardware.' },
        { q: 'Is a Japandi kitchen hard to keep looking good?', a: 'Not to clean, but the restrained palette shows any inconsistency in finish or alignment more readily than a busier style, so installation quality matters more than usual.' },
        { q: 'What colour suits a Japandi kitchen?', a: 'Natural oak or light timber tones as the base, with a matte stone or concrete-look benchtop and a single warm accent such as black or clay — rarely more than three materials total.' },
      ],
    },
    {
      slug: 'coastal-kitchen-design',
      group: 'style',
      nav: 'Coastal kitchen design guide',
      title: 'Coastal Kitchen Design Guide | Bilt & Co',
      desc: 'A genuinely coastal kitchen is a specification decision as much as a design one — what to specify near salt air and humidity, and the look that goes with it.',
      h1: 'Coastal kitchens,<br><span class="italic brass">built for the coast.</span>',
      lede: 'The look is easy. The part that actually has to survive salt air and humidity is the part most guides skip.',
      img: 'openplan-long',
      alt: 'Bright open plan coastal kitchen with a long stone benchtop',
      read: '5 min read',
      answer: 'A coastal kitchen pairs a light, breezy palette — whitewashed or light timber, pale stone, woven or linen-look textures — with a specification that actually suits a humid, salt-air environment: moisture-resistant carcasses, laser-bonded edging and corrosion-resistant hardware. The look and the specification are not separate decisions here; a beautiful coastal kitchen built to a standard palette fails faster than almost anywhere else.',
      inlineCta: {
        after: 2,
        eyebrow: 'Built for the climate, not just the look',
        title: 'Coastal humidity is a specification problem.',
        body: 'Moisture-resistant board and laser-bonded edging are standard on every collection, not a coastal upgrade — see why that matters more here than inland.',
        label: 'What is moisture-resistant board?',
        href: '/guide-what-is-moisture-resistant-board',
      },
      cta: {
        eyebrow: 'Coastal',
        title: 'The look, and the<br><span class="italic" style="color:var(--brass-lite)">specification underneath it.</span>',
        body: 'Send your room and your postcode and we will spec the kitchen for the climate it actually sits in.',
        image: 'openplan-long',
        alt: 'Open plan coastal kitchen with a long island',
      },
      sections: [
        ['The palette: light, textural, unfussy', 'Whitewashed or pale oak cabinetry, a light stone or stone-look benchtop, woven pendant lights and linen-toned splashback tiles are the recognisable coastal vocabulary — deliberately understated rather than glossy, which reads as more relaxed against a bright, sun-filled room.'],
        ['Why coastal specification is not optional', 'Salt-laden air accelerates every failure mode a kitchen can have: it gets into unsealed board edges faster, corrodes cheap hardware faster, and stresses hinges and runners that were not rated for it. Moisture-resistant board and laser-bonded edging are not stylistic choices here — they are the difference between a coastal kitchen that lasts and one that does not, which is exactly why we specify to that standard everywhere we ship, not only near the coast.'],
        ['Hardware that will not corrode', 'Brushed or matte finishes generally resist salt-air corrosion better than bright polished chrome over the long term, and quality hinges and runners — see soft-close hinges explained — hold their action longer in humid conditions than unbranded equivalents.'],
      ],
      faq: [
        { q: 'What makes a kitchen "coastal style"?', a: 'A light, textural palette — whitewashed or pale timber, light stone, woven and linen-toned finishes — paired with a specification suited to salt air and humidity rather than a standard inland kitchen.' },
        { q: 'Does a coastal kitchen need special hardware?', a: 'It benefits from quality, well-sealed hardware and moisture-resistant carcasses regardless of where it is installed, since humidity and salt air accelerate the same failure modes an inland kitchen eventually faces anyway, just faster.' },
        { q: 'Is a coastal kitchen more expensive to build?', a: 'Not necessarily more expensive in palette, but it is a false economy to specify a standard-grade board or hardware near the coast — the earlier failure cost more in the long run than specifying correctly the first time.' },
      ],
    },
    {
      slug: 'industrial-style-kitchen',
      group: 'style',
      nav: 'Industrial style kitchen guide',
      title: 'Industrial Style Kitchen Guide | Concrete, Black, Steel',
      desc: 'Industrial kitchens use matte black, concrete-look surfaces and exposed detail. How to do it without it feeling cold, and where warmth needs to come from.',
      h1: 'Industrial style,<br><span class="italic brass">without the cold room.</span>',
      lede: 'The style most likely to feel unlivable if you commit to it without a plan for warmth.',
      img: 'black-marble-bar',
      alt: 'Black joinery with a marble bar top and matte black hardware',
      read: '5 min read',
      answer: 'An industrial kitchen is built on matte black or concrete-look cabinetry, exposed or visible hardware rather than hidden mechanisms, and materials that read as raw — honed stone rather than polished, matte rather than gloss. The risk with this style specifically is that it can read as cold or unfinished without a deliberate warm counterpoint, usually timber, brought in somewhere in the room.',
      inlineCta: {
        after: 2,
        eyebrow: 'Dark cabinetry, done properly',
        title: 'Matte black without the fingerprint problem.',
        body: 'A quality matte finish and laser-bonded edging resist marking far better than a cheap matte laminate — worth confirming before you commit to an all-dark kitchen.',
        label: 'Get my free quote',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Industrial',
        title: 'Dark, raw materials.<br><span class="italic" style="color:var(--brass-lite)">One warm counterpoint.</span>',
        body: 'Send your room and we will show you where the warmth needs to sit before the whole kitchen commits to black.',
        image: 'concrete-luxe',
        alt: 'Concrete-look kitchen with matte black fixtures',
      },
      sections: [
        ['Matte black as the dominant tone', 'Matte black cabinetry, tapware and a rangehood are the clearest industrial signal, paired with concrete-look benchtops or honed rather than polished stone — anything glossy pulls the look toward a different, sleeker contemporary style instead of industrial.'],
        ['Where the warmth has to come from', 'An entirely dark, hard-surfaced kitchen can feel more like a workshop than a home to live in daily. A single warm counterpoint — an oak or timber-veneer island, open timber shelving, or warm task lighting — is what keeps the room liveable rather than merely photogenic.'],
        ['Exposed detail, on purpose', 'Visible hardware, an exposed rangehood flue rather than a boxed one, and a deliberately utilitarian tap are all consistent with this style — the opposite instinct to a handleless, hidden-mechanism kitchen. Choosing hardware to be seen, rather than hidden, is part of the brief here.'],
      ],
      faq: [
        { q: 'Does an industrial kitchen have to be all black?', a: 'No, though matte black cabinetry is the most recognisable version. A concrete-look palette with black accents and a single warm timber element achieves the same feel with more livability.' },
        { q: 'How do you stop an industrial kitchen feeling cold?', a: 'Bring in one warm material deliberately — an oak island, timber open shelving, or warm-toned task lighting — rather than committing every surface to black or concrete-look finishes.' },
        { q: 'Does matte black cabinetry show fingerprints?', a: 'A quality matte finish resists marking far better than a cheap laminate equivalent, though any dark, matte surface shows more than a light one — worth checking the finish in person before specifying it throughout.' },
      ],
    },
    {
      slug: 'scandinavian-kitchen-design',
      group: 'style',
      nav: 'Scandinavian kitchen design guide',
      title: 'Scandinavian Kitchen Design Guide | Bilt & Co',
      desc: 'Scandinavian kitchens are light, functional and unfussy rather than minimal for its own sake. What defines the look, and how it differs from Japandi.',
      h1: 'Scandinavian design:<br><span class="italic brass">function first, always.</span>',
      lede: 'Not minimalism for its own sake — every decision here is justified by how the kitchen is actually used.',
      img: 'collection-marble-04',
      alt: 'Oak and marble kitchen with island seating and pendant lighting',
      read: '5 min read',
      answer: 'A Scandinavian kitchen is light, pale timber and white or off-white cabinetry, simple flat or Shaker-lite door profiles, and a strong emphasis on genuine daily function over decoration — good task lighting, sensible storage, and nothing purely ornamental. It is close to Japandi in palette but warmer and less severe, with more visible timber grain and softer, rounder detailing allowed.',
      inlineCta: {
        after: 2,
        eyebrow: 'Function decides the layout first',
        title: 'A kitchen laid out for how you actually cook.',
        body: 'Clearances, storage and lighting come before finish decisions in this style — our layouts guide covers the numbers that make a Scandinavian kitchen actually work.',
        label: 'Kitchen layouts compared',
        href: '/guide-kitchen-layouts',
      },
      cta: {
        eyebrow: 'Scandinavian',
        title: 'Light, warm,<br><span class="italic" style="color:var(--brass-lite)">and built to be used daily.</span>',
        body: 'Send your room and we will design around function first, then the palette on top of it.',
        image: 'collection-marble-04',
        alt: 'Oak kitchen with island seating and pendant lighting',
      },
      sections: [
        ['Light timber and white, kept warm', 'Pale oak or birch-look cabinetry against white or off-white walls and benchtops is the base palette, with enough visible timber grain to keep the room feeling warm rather than clinical — the detail that most separates it from a starker Japandi or minimalist look.'],
        ['Function over ornament, in every decision', 'Open shelving that is actually used daily rather than styled for photographs, task lighting placed for real cooking rather than ambience alone, and storage chosen for what genuinely gets used — this style has a lower tolerance for decoration that does not also work.'],
        ['Where it differs from Japandi', 'Scandinavian design allows softer, rounder details and more visible timber texture than the more severe restraint of Japandi, which favours flatter, more uniform surfaces. Both share a light palette and a dislike of clutter, but Scandinavian design is warmer and more forgiving of a busy household.'],
      ],
      faq: [
        { q: 'What is the difference between Scandinavian and Japandi kitchen styles?', a: 'Scandinavian design is warmer and more forgiving, with visible timber grain and softer detailing; Japandi is more severe and restrained, favouring flatter surfaces and a stricter, smaller material palette.' },
        { q: 'Does a Scandinavian kitchen need open shelving?', a: 'It is common but not essential — the defining trait is function-first design generally, which can be achieved with closed storage just as validly if that suits the household better.' },
        { q: 'What benchtop suits a Scandinavian kitchen?', a: 'A light engineered stone or a simple white benchtop keeps the palette consistent, paired with pale timber cabinetry rather than a dark or heavily veined stone that would dominate the room.' },
      ],
    },
    {
      slug: 'granny-flat-rules-nsw',
      showCollections: true,
      group: 'council',
      nav: 'Granny flat rules in NSW',
      title: 'Granny Flat Rules NSW | Secondary Dwelling Guide | Bilt & Co',
      desc: 'How secondary dwelling approvals work in NSW under the Housing SEPP, the complying development pathway, and the questions to settle before you design one.',
      h1: 'Granny flat rules<br><span class="italic brass">in New South Wales.</span>',
      lede: 'NSW has a statewide framework for secondary dwellings, which makes it more consistent than Queensland — but the detail still depends on your specific lot.',
      img: 'collection-marble-04',
      alt: 'Compact secondary dwelling kitchen with stone benchtop',
      read: '7 min read',
      note: 'Last checked: 21 September 2026. General information, not planning or legal advice. Figures and pathways change — confirm current requirements on the <a href="https://www.planning.nsw.gov.au/the-planning-system/housing/housing-sepp/secondary-dwellings" rel="noopener" target="_blank" style="color:var(--brass)">NSW Planning Portal</a> or with your council before you commit to a design.',
      answer: 'NSW regulates secondary dwellings through the Housing SEPP, which sets a statewide framework rather than leaving it entirely to individual councils. A secondary dwelling can often be approved through a faster Complying Development Certificate (CDC) pathway if it meets set standards; if it does not, it goes through a standard Development Application (DA) with your council instead, which takes longer. Floor area caps and site rules can still vary by zone and by council overlay, so the framework narrows the questions rather than answering them for your specific block.',
      inlineCta: {
        after: 2,
        eyebrow: 'Once the approval question is settled',
        title: 'The kitchen a secondary dwelling needs.',
        body: 'A self-contained secondary dwelling generally needs a full kitchen, not a kitchenette. Cut to your room, delivered flat pack or assembled, freighted to your NSW postcode.',
        label: 'See flat pack kitchens for NSW',
        href: '/flat-pack-kitchens-nsw',
      },
      cta: {
        eyebrow: 'Anywhere in NSW',
        title: 'Designed in Rockhampton.<br><span class="italic" style="color:var(--brass-lite)">Freighted to your address.</span>',
        body: 'We supply, not install, this far from Central Queensland — cut to your measurements, flat pack or delivered assembled, with the service drawings your own trades need.',
        image: 'galley-stone',
        alt: 'Compact secondary dwelling kitchen',
      },
      sections: [
        ['CDC versus DA, in plain terms', 'A Complying Development Certificate is a faster approval available when your proposal meets fixed, published standards exactly — size, setbacks, height and so on. If it does not meet every standard, or your land has a constraint the CDC pathway excludes, it goes to a standard Development Application through your council, assessed on merit and generally taking longer. Which pathway you qualify for is worth confirming before you finalise a design, not after.'],
        ['What decides the numbers on your block', 'Minimum lot size, zone, and whether your land carries a flood, bushfire, heritage or environmental overlay all affect what a secondary dwelling can be and how it is approved. A figure that applies to a standard suburban lot is not automatically the figure that applies to yours.'],
        ['One dwelling, one lot, no subdivision', 'A secondary dwelling sits on the same title as the principal dwelling and cannot be separately subdivided or sold off — it remains legally part of the one property, which is a constant across NSW rather than something that varies by council.'],
        ['Renting it out', 'Recent reform has generally widened who a secondary dwelling can be let to, moving away from family-only restrictions in many cases — but confirm the current position for your specific approval before it becomes part of your financial plan for the project.'],
        ['Building code and energy requirements still apply', 'A secondary dwelling must meet the National Construction Code regardless of the planning pathway, and current requirements generally call for a high minimum energy rating on new dwellings. Your building certifier or designer confirms what this means in practice for your build.'],
      ],
      faq: [
        { q: 'What are the granny flat rules in NSW?', a: 'Secondary dwellings are regulated under the Housing SEPP, with a Complying Development Certificate pathway available where standards are met exactly, and a standard Development Application otherwise. Site-specific factors such as zone and overlays affect the detail — confirm on the NSW Planning Portal or with your council.' },
        { q: 'How big can a granny flat be in NSW?', a: 'There is a commonly cited size cap, but it is worth confirming the current figure and any variations for your zone directly on the NSW Planning Portal rather than relying on a fixed number, since planning settings are periodically updated.' },
        { q: 'Can I rent out a secondary dwelling in NSW to anyone?', a: 'Recent changes have generally moved toward allowing rental beyond family members, but confirm the current rule for your specific approval before treating rental income as certain.' },
        { q: 'What is the difference between a CDC and a DA?', a: 'A CDC is a faster approval available when a proposal meets fixed published standards exactly. A DA is a standard council assessment used when a CDC pathway does not apply, and it generally takes longer.' },
        { q: 'Does a secondary dwelling in NSW need its own kitchen?', a: 'A self-contained secondary dwelling generally needs the facilities of an independent dwelling, including a proper kitchen rather than a kitchenette — confirm the requirement against your specific approval with your certifier.' },
      ],
    },
    {
      slug: 'granny-flat-rules-victoria',
      showCollections: true,
      group: 'council',
      nav: 'Granny flat rules in Victoria',
      title: 'Small Second Dwelling Rules Victoria | Bilt & Co',
      desc: 'How the Victorian small second dwelling planning permit exemption works, what still needs a building permit, and what to check before you design one.',
      h1: 'Small second dwelling rules<br><span class="italic brass">in Victoria.</span>',
      lede: 'Victoria removed the planning permit for many small second dwellings in 2023 — which is not the same as removing every approval.',
      img: 'matte-black-bank',
      alt: 'Compact secondary dwelling kitchen with dark cabinetry',
      read: '7 min read',
      note: 'Last checked: 21 September 2026. General information, not planning or legal advice. Confirm current requirements on <a href="https://www.planning.vic.gov.au/guides-and-resources/strategies-and-initiatives/small-second-dwellings" rel="noopener" target="_blank" style="color:var(--brass)">Planning Victoria</a> or with your council before you commit to a design.',
      answer: 'Since a 2023 reform, a small second dwelling of a set maximum floor area on a sufficiently large lot generally does not need a planning permit in Victoria, provided the land has no flood, bushfire, heritage or environmental overlay that would otherwise trigger one. A building permit is still required regardless — the planning exemption removes one approval step, not the whole process.',
      inlineCta: {
        after: 2,
        eyebrow: 'Once the approval is sorted',
        title: 'A kitchen for the space you are actually allowed.',
        body: 'Cut to your room, flat pack or delivered assembled, freighted to your Victorian postcode with service drawings for your builder.',
        label: 'See flat pack kitchens for Victoria',
        href: '/flat-pack-kitchens-victoria',
      },
      cta: {
        eyebrow: 'Anywhere in Victoria',
        title: 'Designed in Rockhampton.<br><span class="italic" style="color:var(--brass-lite)">Freighted to your door.</span>',
        body: 'Supply only this far from Central Queensland — the same specification kitchen, cut to your measurements, with drawings your own trades can work from.',
        image: 'matte-black-bank',
        alt: 'Dark compact secondary dwelling kitchen',
      },
      sections: [
        ['What the planning exemption actually covers', 'A small second dwelling under the current exemption generally needs a kitchen, bathroom and toilet, and cannot be connected to reticulated gas or require a dedicated car space — the exemption was written around a defined, modest dwelling type, not any secondary structure someone chooses to call a granny flat.'],
        ['Where the exemption does not apply', 'Land affected by a flood, bushfire, environmental or heritage overlay is commonly excluded from the no-permit pathway, sending the proposal back to a standard planning permit application through your council instead. Confirm your property\'s overlays before assuming the exemption applies.'],
        ['A building permit is still required, always', 'Planning approval and building approval are separate steps. Even a fully exempt small second dwelling still needs a building permit to confirm it meets siting, structural, safety and amenity standards — this step is never skipped.'],
        ['It cannot be subdivided or sold separately', 'A small second dwelling remains on the one title as the main house. It can generally be let to anyone, including someone outside the family, but it is not a separate, sellable lot.'],
      ],
      faq: [
        { q: 'Do I need a planning permit for a granny flat in Victoria?', a: 'Often not, if it meets the current small second dwelling exemption criteria and your land has no flood, bushfire, heritage or other relevant overlay. A building permit is still required regardless.' },
        { q: 'How big can a small second dwelling be in Victoria without a permit?', a: 'There is a defined maximum floor area under the current exemption — confirm the exact current figure on the Planning Victoria website, since planning settings can be updated.' },
        { q: 'Can I rent out a small second dwelling in Victoria?', a: 'Generally yes, to anyone, under current rules — but it cannot be subdivided or sold separately from the main dwelling.' },
        { q: 'Does a small second dwelling in Victoria need a car space?', a: 'Under the current exemption, generally no dedicated car parking space is required — confirm against the specific criteria for your property.' },
        { q: 'Is a building permit still needed if no planning permit is required?', a: 'Yes, always. The planning exemption removes one approval step; a building permit assessing siting, safety and construction standards is still required for any second dwelling.' },
      ],
    },
    {
      slug: 'granny-flat-rules-wa',
      showCollections: true,
      group: 'council',
      nav: 'Ancillary dwelling rules in WA',
      title: 'Ancillary Dwelling Rules WA | Granny Flat Guide | Bilt & Co',
      desc: 'How ancillary dwelling approvals work under WA\'s R-Codes, the floor area exemption pathway, and what still depends on your local council.',
      h1: 'Ancillary dwelling rules<br><span class="italic brass">in Western Australia.</span>',
      lede: 'WA calls it an ancillary dwelling, not a granny flat — and the R-Codes set the framework your local council applies.',
      img: 'concrete-luxe',
      alt: 'Compact secondary dwelling kitchen with matte finishes',
      read: '7 min read',
      note: 'Last checked: 21 September 2026. General information, not planning or legal advice. Confirm current requirements with the <a href="https://www.planning.wa.gov.au/planning-reform/ancillary-dwelling-information-sheet" rel="noopener" target="_blank" style="color:var(--brass)">WA Department of Planning, Lands and Heritage</a> or your local council before you commit to a design.',
      answer: 'Western Australia refers to a granny flat as an ancillary dwelling — a self-contained dwelling on the same lot as a single house, which may be attached, integrated or detached. The state\'s Residential Design Codes (R-Codes) set a framework, including a floor area threshold under which an ancillary dwelling can often be approved without a full planning application, provided lot size and other deemed-to-comply criteria are met. Your local council administers the actual approval against that framework.',
      inlineCta: {
        after: 2,
        eyebrow: 'Once the R-Codes question is settled',
        title: 'A kitchen sized to what you can build.',
        body: 'Cut to your room, flat pack or delivered assembled, freighted to your WA postcode with service drawings for your trades.',
        label: 'See flat pack kitchens for WA',
        href: '/flat-pack-kitchens-perth',
      },
      cta: {
        eyebrow: 'Anywhere in WA',
        title: 'The furthest run we ship,<br><span class="italic" style="color:var(--brass-lite)">and one of the most common.</span>',
        body: 'Cut in Rockhampton, packed flat, freighted across the country. The same specification kitchen either way.',
        image: 'timber-island',
        alt: 'Timber-fronted island kitchen with stone top',
      },
      sections: [
        ['Ancillary dwelling, not granny flat', 'WA planning documents consistently use "ancillary dwelling" — searching your council\'s local planning policy for that exact term, rather than "granny flat", is the fastest way to find the rules that actually apply.'],
        ['The deemed-to-comply pathway', 'Where a proposal meets set criteria — floor area, lot size, design compatibility with the main house in colour, roof pitch and materials — many WA councils can approve an ancillary dwelling without requiring a full planning application. Falling outside any one criterion generally means a standard application instead.'],
        ['Design compatibility is genuinely assessed', 'Unlike some states, WA\'s framework specifically expects an ancillary dwelling to be visually compatible with the existing house — matching materials, colour and roof pitch are commonly required rather than optional, which is worth factoring into a design brief from the outset.'],
        ['It stays tied to the main dwelling', 'An ancillary dwelling is not a separate title and is intended for use in conjunction with the main house — the same lot, generally one dwelling and one ancillary unit, not independent freehold subdivision.'],
      ],
      faq: [
        { q: 'What is an ancillary dwelling in WA?', a: 'The WA planning term for what is commonly called a granny flat — a self-contained dwelling on the same lot as a single house, attached, integrated or detached from it.' },
        { q: 'How big can an ancillary dwelling be in WA without full planning approval?', a: 'There is a defined floor area threshold under the current R-Codes deemed-to-comply pathway — confirm the current figure with the Department of Planning, Lands and Heritage or your local council.' },
        { q: 'Does an ancillary dwelling in WA need to match the main house?', a: 'Generally yes — design compatibility in colour, roof pitch and materials with the existing single house is commonly a specific requirement, not just a suggestion.' },
        { q: 'Can I rent out an ancillary dwelling in WA?', a: 'Rules on occupancy and letting vary and are worth confirming with your local council against your specific approval before treating rental income as certain.' },
        { q: 'Who administers ancillary dwelling approvals in WA?', a: 'Your local council, applying the state\'s R-Codes framework — the state sets the rules, the council assesses individual applications against them.' },
      ],
    },
    {
      slug: 'granny-flat-rules-sa',
      showCollections: true,
      group: 'council',
      nav: 'Granny flat rules in SA',
      title: 'Ancillary Accommodation Rules SA | Granny Flat Guide',
      desc: 'How ancillary accommodation is regulated under South Australia\'s Planning and Design Code, recent reforms, and what to confirm before you design one.',
      h1: 'Ancillary accommodation rules<br><span class="italic brass">in South Australia.</span>',
      lede: 'SA calls it ancillary accommodation, and recent reform has made it considerably more flexible than it used to be.',
      img: 'black-marble-bar',
      alt: 'Compact secondary dwelling kitchen with dark cabinetry',
      read: '7 min read',
      note: 'Last checked: 21 September 2026. General information, not planning or legal advice. Confirm current requirements on <a href="https://plan.sa.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">PlanSA</a> before you commit to a design.',
      answer: 'South Australia regulates a granny flat as "ancillary accommodation" under the statewide Planning and Design Code. Recent reforms have increased the permitted floor area and removed a previous requirement that it share a kitchen, bathroom or laundry with the main house — meaning a genuinely self-contained secondary dwelling is now more straightforward to approve than it was a few years ago. It remains subordinate to the principal dwelling on the same allotment and still requires planning and building approval.',
      inlineCta: {
        after: 2,
        eyebrow: 'Now that it can be fully self-contained',
        title: 'A proper kitchen, not a shared one.',
        body: 'Cut to your room, flat pack or delivered assembled, freighted to your SA postcode with service drawings for your trades.',
        label: 'See flat pack kitchens for SA',
        href: '/flat-pack-kitchens-adelaide',
      },
      cta: {
        eyebrow: 'Anywhere in SA',
        title: 'Designed in Rockhampton.<br><span class="italic" style="color:var(--brass-lite)">Freighted to your door.</span>',
        body: 'The same specification kitchen we build for our own installers, cut to your measurements and delivered flat pack or assembled.',
        image: 'black-marble-bar',
        alt: 'Dark kitchen with marble bar top',
      },
      sections: [
        ['Why "ancillary accommodation" and not "granny flat"', 'It is the defined planning term in the Planning and Design Code, and using it when you search or contact your council will get you to the actual rules far faster than searching the informal name.'],
        ['What changed recently', 'Reforms have increased the permitted floor area and allowed a fully self-contained unit rather than requiring shared kitchen, bathroom or laundry facilities with the main house — a meaningful change from the older rule, and one worth confirming applies to your specific council area and zone.'],
        ['Rental flexibility has also widened', 'Ancillary accommodation can now generally be rented to people outside the immediate family in many cases, alongside tenant protections introduced alongside the reform — confirm the current position before it becomes part of your financial planning.'],
        ['It is still subordinate to the main dwelling', 'Regardless of how self-contained it becomes, ancillary accommodation remains secondary to the principal dwelling on the allotment and subject to floor area and other limitations relative to it — it is not an independent second house on the same block.'],
      ],
      faq: [
        { q: 'What is ancillary accommodation in South Australia?', a: 'The SA planning term for a granny flat — a dwelling on the same allotment as, and subordinate to, a main house, regulated under the statewide Planning and Design Code.' },
        { q: 'Does a granny flat in SA still need to share facilities with the main house?', a: 'Under recent reforms, generally no — a fully self-contained unit with its own kitchen, bathroom and laundry is now permitted in many cases, a change from the previous rule. Confirm the current position for your property.' },
        { q: 'How big can ancillary accommodation be in SA?', a: 'The permitted floor area has recently increased under reform — confirm the current figure on PlanSA or with your council rather than relying on an older cited number.' },
        { q: 'Can I rent an SA granny flat to someone outside my family?', a: 'Generally yes under current rules, alongside tenant protections introduced with recent reform — confirm the current position for your specific approval.' },
        { q: 'Does an SA granny flat still need planning and building approval?', a: 'Yes — increased flexibility in the rules has not removed the requirement for both planning and building approval before construction.' },
      ],
    },
    {
      slug: 'granny-flat-rules-tasmania',
      showCollections: true,
      group: 'council',
      nav: 'Secondary residence rules in Tasmania',
      title: 'Secondary Residence Rules Tasmania | Granny Flat Guide',
      desc: 'How a secondary residence is regulated under the Tasmanian Planning Scheme, the shared-services requirement, and a size increase currently under review.',
      h1: 'Secondary residence rules<br><span class="italic brass">in Tasmania.</span>',
      lede: 'Tasmania has one of the more distinctive rules in the country: a secondary residence generally shares services with the main house, not just the lot.',
      img: 'galley-stone',
      alt: 'Compact galley-style secondary dwelling kitchen',
      read: '7 min read',
      note: 'Last checked: 21 September 2026. General information, not planning or legal advice. Tasmania has an active proposal to change the size limit discussed below — confirm the current position on <a href="https://www.stateplanning.tas.gov.au/topics/housing" rel="noopener" target="_blank" style="color:var(--brass)">Planning in Tasmania</a> before you design anything.',
      answer: 'Tasmania regulates a granny flat as a "secondary residence" under the Tasmanian Planning Scheme. As of our last check, a secondary residence is commonly capped at a set gross floor area and is generally required to share access, parking, and water, sewerage, gas, electricity and telecommunications connections with the main dwelling — it is not necessarily fully independent the way a secondary dwelling can be in some other states. A formal proposal has been under consideration to increase the permitted size; whether and when that takes effect should be confirmed directly before you plan around it.',
      inlineCta: {
        after: 2,
        eyebrow: 'Once the size and services question is settled',
        title: 'A kitchen that fits the current rule.',
        body: 'Cut to your room, flat pack or delivered assembled, freighted to your Tasmanian postcode with service drawings for your trades.',
        label: 'See flat pack kitchens for Tasmania',
        href: '/flat-pack-kitchens-hobart',
      },
      cta: {
        eyebrow: 'Anywhere in Tasmania',
        title: 'Freighted by road<br><span class="italic" style="color:var(--brass-lite)">and sea.</span>',
        body: 'The same specification kitchen we build for Central Queensland, cut to your measurements and shipped across Bass Strait.',
        image: 'galley-stone',
        alt: 'Compact galley kitchen with stone benchtop',
      },
      sections: [
        ['Shared services is the detail that catches people out', 'Where several other states now allow a fully self-contained secondary dwelling with its own separate connections, Tasmania\'s rule has generally required a secondary residence to share access, parking and utility connections with the main house — a meaningfully different starting point for planning your project, and worth confirming still applies before you design around full independence.'],
        ['A size change is in progress, not yet confirmed', 'A proposal to increase the permitted gross floor area has been under formal review. Because this kind of amendment has a process and a timeline, do not plan a design around a figure that may or may not be in effect by the time you read this — check the current status directly with the state planning authority.'],
        ['Both planning and building approval still apply', 'A secondary residence generally needs a building permit regardless of whether a planning permit is required for your specific proposal, assessed against the National Construction Code and Tasmanian building standards.'],
        ['It remains appurtenant to the main dwelling', 'A secondary residence is legally attached in status to the single dwelling on the same site — it is not a separate title and is not intended as an independent second house.'],
      ],
      faq: [
        { q: 'What is a secondary residence in Tasmania?', a: 'The Tasmanian planning term for a granny flat — a self-contained additional dwelling on the same site as a main house, generally required to share access and services with it, under the Tasmanian Planning Scheme.' },
        { q: 'How big can a secondary residence be in Tasmania?', a: 'There has been a commonly cited size limit, with a formal proposal under review to increase it — confirm the current figure directly with the state planning authority rather than relying on either the old or proposed number.' },
        { q: 'Does a secondary residence in Tasmania need its own power and water connection?', a: 'Generally, current rules require it to share the main dwelling\'s connections rather than have fully independent ones — confirm this still applies to your proposal before designing around independent services.' },
        { q: 'Is Tasmania changing its granny flat size rules?', a: 'A formal amendment process to increase the permitted floor area has been underway — check its current status before finalising a design around either the existing or proposed figure.' },
        { q: 'Does a secondary residence in Tasmania need a full kitchen?', a: 'If approved as a self-contained residence, generally yes — confirm the specific requirement against your approval and whether shared-services rules affect the kitchen and laundry arrangement.' },
      ],
    },
    {
      slug: 'secondary-residence-rules-act',
      showCollections: true,
      group: 'council',
      nav: 'Secondary residence rules in the ACT',
      title: 'Secondary Residence Rules ACT | Granny Flat Guide',
      desc: 'How a secondary residence is defined and regulated in the ACT, how it differs from dual occupancy, and what the size limit means for your design.',
      h1: 'Secondary residence rules<br><span class="italic brass">in the ACT.</span>',
      lede: 'Canberra draws a firm planning line between a secondary residence and a dual occupancy — and the two are assessed very differently.',
      img: 'concrete-luxe',
      alt: 'Compact secondary dwelling kitchen with matte black fixtures',
      read: '6 min read',
      note: 'Last checked: 21 September 2026. General information, not planning or legal advice. Confirm current requirements with <a href="https://www.planning.act.gov.au/" rel="noopener" target="_blank" style="color:var(--brass)">ACT Government Planning</a> before you commit to a design.',
      answer: 'The ACT regulates a granny flat as a "secondary residence" — a second dwelling on a block that is subordinate to the principal dwelling, distinct from a dual occupancy, which is generally two dwellings of comparable standing on the one block assessed under different rules. A secondary residence has a defined maximum floor area under the Residential Zones Policy, alongside other siting and design provisions.',
      inlineCta: {
        after: 2,
        eyebrow: 'Once the classification is settled',
        title: 'A kitchen for a subordinate dwelling.',
        body: 'Cut to your room, flat pack or delivered assembled, freighted to your Canberra address with service drawings for your trades.',
        label: 'See flat pack kitchens for Canberra',
        href: '/flat-pack-kitchens-canberra',
      },
      cta: {
        eyebrow: 'Anywhere in the ACT',
        title: 'Designed in Rockhampton.<br><span class="italic" style="color:var(--brass-lite)">Freighted to Canberra.</span>',
        body: 'Cartons move through a standard doorway or lift where an assembled carcass will not — the same specification kitchen either way.',
        image: 'concrete-luxe',
        alt: 'Concrete-look kitchen with matte black fixtures',
      },
      sections: [
        ['Secondary residence versus dual occupancy', 'This distinction decides which set of rules applies to your project. A secondary residence is clearly subordinate to the main house — smaller, secondary in status. A dual occupancy is generally two dwellings of comparable standing on the same block, assessed on different, generally stricter, planning terms. Getting the classification wrong at the outset can send a straightforward secondary-residence proposal down a much longer dual-occupancy assessment path.'],
        ['The floor area limit, and what else counts', 'A secondary residence has a defined maximum size under current policy — but siting, setbacks and other provisions in the Residential Zones Policy also apply alongside the raw floor area figure. A design that fits under the size cap can still fail other siting requirements.'],
        ['Where to check your specific block', 'Zoning and specific provisions for your block are available through the ACT\'s planning mapping tools and the Residential Zones Development Code — confirming your zone before designing avoids working to the wrong rule set entirely.'],
        ['It stays subordinate to the principal dwelling', 'A secondary residence remains a second, smaller dwelling on the same block as the principal one — it does not become an independent equal dwelling, which is the entire distinction from a dual occupancy.'],
      ],
      faq: [
        { q: 'What is a secondary residence in the ACT?', a: 'A second dwelling on a block that is subordinate — smaller and secondary in status — to the principal dwelling, distinct from a dual occupancy, which involves two dwellings of comparable standing.' },
        { q: 'How big can a secondary residence be in the ACT?', a: 'There is a defined maximum floor area under current Residential Zones Policy — confirm the current figure with ACT Government Planning, since policy settings are periodically reviewed.' },
        { q: 'What is the difference between a secondary residence and a dual occupancy in the ACT?', a: 'A secondary residence is clearly subordinate in size and status to the main house; a dual occupancy is generally two dwellings of comparable standing, assessed under different planning provisions.' },
        { q: 'Does a secondary residence in the ACT need council approval?', a: 'It requires assessment under the ACT planning system — the specific pathway depends on your zone and whether the proposal meets relevant codes.' },
        { q: 'Can a secondary residence in the ACT be rented out?', a: 'Confirm the current position for your specific approval with ACT Government Planning, since occupancy conditions can vary by approval type.' },
      ],
    },
    {
      slug: 'granny-flat-rules-nt',
      showCollections: true,
      group: 'council',
      nav: 'Granny flat rules in the NT',
      title: 'Granny Flat & Independent Unit Rules NT | Bilt & Co',
      desc: 'How building an independent unit or granny flat is approved in the Northern Territory, the dual-permit process, and what a certifier checks.',
      h1: 'Granny flat rules<br><span class="italic brass">in the Northern Territory.</span>',
      lede: 'The NT calls it an independent unit, and it is one of the more straightforward processes in the country — provided you get both permits, not just one.',
      img: 'matte-black-bank',
      alt: 'Bank of matte black tall cabinets in a compact secondary dwelling',
      read: '6 min read',
      note: 'Last checked: 21 September 2026. General information, not planning or legal advice. Confirm current requirements on the <a href="https://nt.gov.au/property/land-planning-and-development/planning-professionals-and-applicants/building-an-independent-unit" rel="noopener" target="_blank" style="color:var(--brass)">NT Government website</a> before you commit to a design.',
      answer: 'The Northern Territory refers to a granny flat as an independent unit. Building one generally requires both a development permit, assessed against the NT Planning Scheme, and a building permit through an NT-registered building certifier, assessed against the Building Code of Australia. There is a defined maximum floor area — including any carport or verandah — and the unit must remain on the same lot as, and used in conjunction with, the primary residence rather than being separately subdivided.',
      inlineCta: {
        after: 2,
        eyebrow: 'Once both permits are in hand',
        title: 'A kitchen sized to a compact independent unit.',
        body: 'Cut to your room, flat pack or delivered assembled, freighted to your NT postcode with service drawings for your trades.',
        label: 'See flat pack kitchens for Darwin',
        href: '/flat-pack-kitchens-darwin',
      },
      cta: {
        eyebrow: 'Anywhere in the NT',
        title: 'Designed in Rockhampton.<br><span class="italic" style="color:var(--brass-lite)">Freighted north.</span>',
        body: 'The same specification kitchen either way — cut to your measurements and shipped flat pack or delivered assembled.',
        image: 'matte-black-bank',
        alt: 'Bank of matte black tall cabinets',
      },
      sections: [
        ['Two permits, not one', 'A development permit and a building permit are both generally required — one assessing the planning use against the NT Planning Scheme, the other assessing construction against the Building Code of Australia through a registered building certifier. Treating either as optional is the most common way an NT independent-unit project stalls.'],
        ['The floor area limit includes more than the walls', 'A commonly cited maximum floor area for an independent unit includes attached structures such as a carport or verandah, not just the enclosed living space — worth accounting for early if outdoor covered areas are part of the design.'],
        ['Container and demountable structures are a real option', 'The NT explicitly allows a demountable structure, including a shipping container conversion, to be used as an independent unit, provided it meets the same planning and building requirements as a conventional build — an option worth knowing about given freight and remote-build costs across the Territory.'],
        ['It stays tied to the primary residence', 'An independent unit must be used in conjunction with, not independently of, the main house on the lot, and cannot be separately subdivided — the same constraint that applies in most other states, just under a different name.'],
      ],
      faq: [
        { q: 'What is an independent unit in the NT?', a: 'The Northern Territory\'s term for a granny flat — a self-contained additional dwelling on the same lot as, and used in conjunction with, the primary residence.' },
        { q: 'What permits does a granny flat need in the NT?', a: 'Generally both a development permit under the NT Planning Scheme and a building permit through an NT-registered building certifier assessing it against the Building Code of Australia.' },
        { q: 'How big can an independent unit be in the NT?', a: 'There is a commonly cited maximum floor area which includes attached structures like a carport or verandah — confirm the current figure on the NT Government website.' },
        { q: 'Can a shipping container be used as a granny flat in the NT?', a: 'Yes, a demountable structure including a converted shipping container is explicitly permitted, provided it meets the same planning and building requirements as any other independent unit.' },
        { q: 'Can an independent unit in the NT be subdivided and sold separately?', a: 'No — it must remain on the same lot as, and used in conjunction with, the primary residence rather than becoming an independent, separately titled dwelling.' },
      ],
    },
    {
      slug: 'engineered-stone-benchtop-care-guide',
      group: 'materials',
      nav: 'Engineered stone benchtop care',
      title: 'Engineered Stone Benchtop Care Guide | Bilt & Co',
      desc: 'How to actually look after an engineered stone benchtop — what stains it, what scratches it, and the cleaning habits that keep it looking new for years.',
      h1: 'Engineered stone,<br><span class="italic brass">looked after properly.</span>',
      lede: 'Durable does not mean indestructible. A few habits are the difference between a benchtop that looks new at year ten and one that does not.',
      img: 'island-marble-close',
      alt: 'Close detail of an engineered stone island benchtop edge',
      read: '5 min read',
      answer: 'Engineered stone resists staining, scratching and heat far better than laminate, but it is not immune to any of them. Warm soapy water handles daily cleaning; the habits that actually protect it are using a trivet under hot pans, wiping up wine, oil and pigmented liquids reasonably promptly, and avoiding highly acidic or abrasive cleaning products that can dull the surface finish over years of repeated use.',
      sections: [
        ['What actually stains it', 'Engineered stone is far more stain-resistant than natural stone, but strongly pigmented liquids left to sit — red wine, turmeric, some oils — can leave a mark if not wiped up in a reasonable time. It is not instant staining, but it is not indefinite immunity either.'],
        ['Heat, and where trivets still matter', 'Engineered stone tolerates everyday cooking heat well, but the resin binder in the material means direct, sustained contact with a very hot pan straight from the stove can still cause localised damage over time. A trivet is a small habit that removes the risk entirely rather than testing the limit.'],
        ['What to avoid using on it', 'Bleach-heavy cleaners, abrasive scouring pads and highly acidic products can dull the surface sheen over repeated use. Warm water with a mild dish soap handles the vast majority of daily cleaning without any of that risk.'],
      ],
      faq: [
        { q: 'Can engineered stone stain?', a: 'It resists staining far better than laminate or natural stone, but strongly pigmented liquids left sitting for an extended period can still leave a mark — wipe spills up in a reasonable time and it is rarely an issue.' },
        { q: 'Is engineered stone heatproof?', a: 'It tolerates normal cooking heat well but is not designed for direct, sustained contact with very hot cookware — use a trivet for anything straight off the stove or out of the oven.' },
        { q: 'What should I not clean engineered stone with?', a: 'Avoid bleach-heavy products, abrasive scourers and highly acidic cleaners over the long term — warm water and a mild dish soap is sufficient for almost all daily cleaning.' },
        { q: 'Does engineered stone scratch?', a: 'It resists scratching well under normal kitchen use, though cutting directly on it with a knife is still worth avoiding — a chopping board protects both the knife edge and the benchtop.' },
      ],
    },
    {
      slug: 'is-porcelain-benchtop-worth-it',
      group: 'materials',
      nav: 'Is a porcelain benchtop worth it?',
      title: 'Is a Porcelain Benchtop Worth It? | Bilt & Co',
      desc: 'Porcelain benchtops resist heat and UV better than most stone. Where that genuinely matters, where it does not, and what the trade-offs actually are.',
      h1: 'Is a porcelain<br><span class="italic brass">benchtop worth it?</span>',
      lede: 'The most heat- and UV-resistant benchtop material available. Whether that matters to you depends entirely on the room.',
      img: 'detail-stone-black',
      alt: 'Black porcelain benchtop detail with concealed storage',
      read: '5 min read',
      answer: 'A porcelain benchtop is worth the cost if the kitchen genuinely needs its specific strengths: exceptional heat resistance, UV stability for a benchtop that gets direct sun, and very high scratch resistance. It is not automatically better than engineered stone for every kitchen — it can be less forgiving to fabricate around tight curves or mitred waterfall edges, and it costs more.',
      sections: [
        ['Where porcelain genuinely outperforms', 'A benchtop in direct sun through a large window, an outdoor kitchen, or a household that regularly puts hot cookware straight onto the bench are the scenarios where porcelain\'s heat and UV resistance actually gets used. In a standard indoor kitchen away from direct sun, engineered stone performs very similarly for most households\' actual daily use.'],
        ['The trade-offs worth knowing', 'Porcelain is thinner than most engineered stone slabs and can be less forgiving to fabricate with a seamless mitred waterfall edge — see what is a waterfall benchtop edge — so confirm with your fabricator whether the specific look you want is achievable in porcelain before committing.'],
        ['Cost versus engineered stone', 'Porcelain generally costs more than a comparable engineered stone benchtop, for genuinely superior heat and UV performance rather than a purely cosmetic difference — worth it if you will use that performance, a premium for a benefit you may not if you will not.'],
      ],
      faq: [
        { q: 'Is porcelain better than engineered stone for a benchtop?', a: 'It performs better specifically on heat and UV resistance. For general indoor kitchen use away from direct sun, engineered stone performs very similarly for most households.' },
        { q: 'Can porcelain benchtops be used outdoors?', a: 'Yes, and this is one of its genuine advantages — its UV stability suits an outdoor kitchen or a benchtop in direct sun far better than most other materials.' },
        { q: 'Is porcelain more expensive than engineered stone?', a: 'Generally yes, reflecting its superior heat and UV performance rather than being purely a premium finish.' },
        { q: 'Can porcelain achieve a waterfall benchtop edge?', a: 'Sometimes, but it can be less forgiving than engineered stone for a seamless mitred join given its thinner slab profile — confirm with your fabricator before designing around it.' },
      ],
    },
    {
      slug: 'timber-benchtop-pros-and-cons',
      group: 'materials',
      nav: 'Timber benchtop pros and cons',
      title: 'Timber Benchtop Pros and Cons | Bilt & Co',
      desc: 'A timber benchtop looks warm and ages with character — and needs more maintenance than stone. What it actually takes to live with one long term.',
      h1: 'Timber benchtops:<br><span class="italic brass">the honest maintenance picture.</span>',
      lede: 'Nothing looks warmer against timber cabinetry. Nothing needs more upkeep than stone, either.',
      img: 'timber-island',
      alt: 'Timber island benchtop against oak cabinetry',
      read: '5 min read',
      answer: 'A timber benchtop brings warmth and a natural material quality that stone cannot replicate, and ages with visible character rather than staying static — for some households that is exactly the appeal. Against that, it needs periodic oiling or sealing, is more vulnerable to water marks and heat than stone, and is best kept away from a sink zone unless meticulously maintained.',
      sections: [
        ['Where it works best', 'An island used more for gathering than heavy food prep, a breakfast bar, or a single feature run away from the sink and cooktop are where timber earns its keep without the maintenance becoming a chronic issue — see what is a waterfall benchtop edge for how a timber island can be detailed to feel considered.'],
        ['What the maintenance actually involves', 'Periodic oiling — typically every few months to a year depending on the finish and use — keeps timber sealed against water and staining. Skip it and the timber dries out, marks more easily, and can eventually crack or cup at high-use areas near water.'],
        ['Where it genuinely struggles', 'Direct sink and cooktop zones are the hardest use case for timber — constant water exposure and heat are exactly what it tolerates least well compared with stone or porcelain. Many kitchens that use timber successfully keep it to an island or a section away from both.'],
      ],
      faq: [
        { q: 'Does a timber benchtop need much maintenance?', a: 'More than stone — periodic oiling or resealing, typically every few months to a year, is needed to keep it protected from water and staining.' },
        { q: 'Can a timber benchtop go near a sink?', a: 'It can, with diligent maintenance, but it is more vulnerable to water damage there than anywhere else in the kitchen. Many kitchens keep timber to an island or a zone away from the sink.' },
        { q: 'Does timber scratch and mark easily?', a: 'More readily than engineered stone or porcelain, though scratches and marks are often part of the material\'s appeal, ageing into a patina rather than looking like damage.' },
        { q: 'Can timber and stone be combined in one kitchen?', a: 'Yes, and it is a common approach — stone on the perimeter bench where water and heat exposure is highest, timber on an island or a feature section where it is better protected.' },
      ],
    },
    {
      slug: 'blum-legrabox-explained',
      group: 'materials',
      nav: 'Blum Legrabox explained',
      title: 'Blum Legrabox Explained | Bilt & Co',
      desc: 'Legrabox is Blum\'s premium drawer system with slim steel sides and integrated organisation. What it actually adds over a standard drawer box.',
      h1: 'Blum Legrabox,<br><span class="italic brass">explained properly.</span>',
      lede: 'A drawer system, not just a runner — and the difference shows up every time you open one.',
      img: 'drawer-detail',
      alt: 'Open drawer showing Blum hardware detail',
      read: '4 min read',
      answer: 'Legrabox is Blum\'s premium drawer system, combining slim, high-sided steel drawer sides with integrated soft-close and, on longer runs, tip-on or servo-drive options — as opposed to a standard drawer box built from board with a separate runner fitted underneath. The slim steel sides increase usable internal width for the same external cabinet dimension and support easier integration of organisational inserts.',
      sections: [
        ['What is actually different from a standard drawer', 'A standard drawer is a timber-based box sitting on a separate runner. Legrabox integrates the drawer side, the runner and the soft-close mechanism into one slim steel system, which increases internal capacity for the same cabinet width and gives a more refined look at the open drawer edge.'],
        ['Where it is worth specifying', 'Deep pot drawers, pantry drawers and any run where internal organisation — dividers, cutlery trays, integrated inserts — matters most are where Legrabox\'s design pays off most clearly. It is a genuine upgrade rather than a purely cosmetic one, on the drawers used hardest.'],
        ['The cost trade-off', 'Legrabox costs more per drawer than a standard soft-close drawer box, so many kitchens specify it on high-use drawers — pots, cutlery, pantry — and use a standard soft-close drawer elsewhere, rather than throughout the entire kitchen.'],
      ],
      faq: [
        { q: 'Is Legrabox better than a standard drawer?', a: 'It offers more internal capacity for the same external cabinet size, a more integrated soft-close mechanism, and easier organisational inserts — a genuine functional upgrade, not purely cosmetic.' },
        { q: 'Is Legrabox worth the extra cost on every drawer?', a: 'Not necessarily — many kitchens specify it on the highest-use drawers such as pots and pantry, and use a standard soft-close drawer elsewhere to manage cost.' },
        { q: 'Does Legrabox come with a warranty?', a: 'Blum backs its hardware with a mechanical warranty, consistent with the lifetime mechanical warranty we carry across Blum hardware on every collection.' },
        { q: 'What colours does Legrabox come in?', a: 'Blum offers Legrabox in a range of finishes, commonly including matte white, matte black, orion grey and stainless steel look — confirm current options with your supplier at quote stage.' },
      ],
    },
    {
      slug: 'handleless-kitchen-hardware-guide',
      group: 'materials',
      nav: 'Handleless kitchen hardware guide',
      title: 'Handleless Kitchen Hardware | Rail, Profile, Push-to-Open',
      desc: 'Three ways to build a handleless kitchen — recessed rail, milled profile, and push-to-open — compared on cost, feel and who each one suits.',
      h1: 'Three ways to build<br><span class="italic brass">a handleless kitchen.</span>',
      lede: 'No handles does not mean one solution. Three genuinely different mechanisms, at three different price points.',
      img: 'collection-marble-02',
      alt: 'Handleless kitchen rail detail on an assembled cabinet run',
      read: '5 min read',
      answer: 'A handleless kitchen is built one of three ways: a recessed aluminium rail along the cabinet edge, a milled or angled profile cut directly into the door, or push-to-open hardware fitted inside the cabinet. Rail is the most common and most affordable; a milled profile gives the cleanest continuous line at higher cost; push-to-open removes any visible groove entirely but adds a mechanism to every door and drawer — see what is a handleless kitchen for the basic definition and push-to-open hardware explained for that mechanism specifically.',
      sections: [
        ['Recessed rail', 'An aluminium rail runs along the top of base cabinets and bottom of overheads, providing a continuous grip line across a whole run. It is the most affordable route to a handleless look and the easiest to retrofit or repair if damaged, since the rail is a separate component rather than part of the door itself.'],
        ['Milled or angled profile', 'The grip is cut directly into the door edge rather than added as a separate rail, giving the cleanest, most continuous line with no visible seam between door and rail. It costs more, since every door needs the profile milled individually, and a damaged door means replacing the whole front rather than a length of rail.'],
        ['Push-to-open', 'No visible groove or rail at all — the door releases with a light press via an internal mechanism. It gives the most minimal look of the three but costs the most, since every door and drawer needs its own mechanism, and can feel less immediate to someone unfamiliar with the kitchen.'],
      ],
      faq: [
        { q: 'What is the cheapest way to get a handleless kitchen?', a: 'A recessed aluminium rail is generally the most affordable route, providing a continuous grip line without needing an individual mechanism in every door.' },
        { q: 'Which handleless hardware is easiest to repair?', a: 'A recessed rail, since it is a separate component that can be replaced independently of the doors. A milled profile or push-to-open mechanism generally means addressing the door or cabinet itself if something fails.' },
        { q: 'Can I mix rail and push-to-open in one kitchen?', a: 'Yes — a common approach uses a rail on base cabinets and drawers used constantly, with push-to-open on overheads reached less often, balancing cost against convenience.' },
        { q: 'Does a milled profile door cost much more than a rail system?', a: 'Generally yes, since every door needs the profile machined individually rather than sharing a single continuous rail across a run.' },
      ],
    },
    {
      slug: 'brass-vs-matte-black-kitchen-hardware',
      group: 'materials',
      nav: 'Brass vs matte black hardware',
      title: 'Brass vs Matte Black Kitchen Hardware | Bilt & Co',
      desc: 'The two most popular kitchen hardware finishes read completely differently against the same cabinetry. Which suits which palette, and why.',
      h1: 'Brass or matte black:<br><span class="italic brass">the finish decides more than you think.</span>',
      lede: 'The same door, the same benchtop, two entirely different kitchens — depending on which metal you choose.',
      img: 'island-marble-brass',
      alt: 'Stone island bench with brushed brass tapware and hardware',
      read: '4 min read',
      answer: 'Brass — usually brushed or aged rather than polished — reads as warm, traditional and closer to a Hamptons or heritage palette. Matte black reads as contemporary, graphic and closer to an industrial or modern farmhouse palette. Neither is objectively better; the choice should follow the rest of the room\'s palette rather than lead it.',
      sections: [
        ['What brass suits', 'Warm timber tones, painted Shaker cabinetry, and light stone benchtops with visible veining all sit well against brass — see our Hamptons style kitchen guide for where brass is closest to essential rather than optional.'],
        ['What matte black suits', 'Dark or monochrome cabinetry, concrete-look or honed stone benchtops, and a more graphic, contemporary palette pair naturally with matte black — see our industrial style kitchen guide for the fuller picture.'],
        ['Durability and maintenance are similar for both', 'Quality matters more than the specific colour here — a good matte black or brushed brass finish resists fingerprints and wear similarly well; a cheap version of either shows wear quickly. Confirm the coating quality with your supplier rather than assuming the colour decides durability.'],
      ],
      faq: [
        { q: 'Is brass or matte black more popular for kitchens right now?', a: 'Both remain popular, and each suits a different palette rather than one being generally more in demand — brass for warmer, traditional schemes, matte black for contemporary or industrial ones.' },
        { q: 'Does matte black hardware show fingerprints more than brass?', a: 'A quality matte black finish resists marking reasonably well, though any dark, matte surface tends to show fingerprints more visibly than a lighter or textured finish like brushed brass.' },
        { q: 'Can I mix brass and matte black in one kitchen?', a: 'It is possible but harder to do well — most successful kitchens commit to one accent metal throughout rather than mixing two, which can read as inconsistent rather than intentional.' },
        { q: 'Does brass tarnish over time?', a: 'A quality brushed or lacquered brass finish resists tarnishing well under normal kitchen use; an unlacquered or lower-quality finish can develop a patina more readily, which some households like and others do not.' },
      ],
    },
    {
      slug: '2-pack-vs-laminate-kitchen-doors',
      group: 'materials',
      nav: '2-pack vs laminate kitchen doors',
      title: '2-Pack vs Laminate Kitchen Doors | Bilt & Co',
      desc: 'A 2-pack painted finish and a laminate door can look similar in a photo and behave very differently in daily use. What the real difference is.',
      h1: '2-pack or laminate?<br><span class="italic brass">The photo will not tell you.</span>',
      lede: 'Two ways to get a smooth, painted-look door, at genuinely different price points and with genuinely different upkeep.',
      img: 'collection-marble-01',
      alt: 'Painted-look kitchen cabinetry with a smooth door finish',
      read: '5 min read',
      answer: 'A 2-pack door is sprayed with a genuine paint finish over an MDF substrate, giving a true matte or gloss painted look that can be colour-matched precisely and repaired by re-spraying if damaged. A laminate door has a factory-applied decorative laminate sheet, which is generally more affordable and highly consistent, but cannot be re-sprayed or precisely colour-matched if a repair or change is needed later.',
      sections: [
        ['How each is actually made', '2-pack is a two-component paint system sprayed onto a primed MDF door in a factory or specialist facility, cured to a hard, durable finish. Laminate is a decorative sheet — melamine or a higher-grade laminate — pressed onto a board substrate, factory-finished and consistent from door to door.'],
        ['Repair and future changes', 'A 2-pack door can be re-sprayed to repair damage or even change colour years later, provided you can match the original process. A laminate door generally cannot be re-finished — damage usually means replacing the door.'],
        ['Cost and consistency', 'Laminate is generally more affordable and extremely consistent in colour and finish, since it is factory-applied to a standard. 2-pack costs more, reflecting the labour-intensive spray-and-cure process, and can have very minor sheen or colour variation between production runs.'],
      ],
      faq: [
        { q: 'Which is more durable, 2-pack or laminate?', a: 'Both are durable under normal use when done to a good standard. 2-pack can be re-sprayed if damaged; laminate generally needs the door replaced if it is significantly damaged.' },
        { q: 'Is laminate cheaper than 2-pack?', a: 'Generally yes — laminate\'s factory-applied process is less labour-intensive than the spray-and-cure process 2-pack requires.' },
        { q: 'Can a 2-pack door be repainted a different colour later?', a: 'Yes, in principle — a 2-pack finish can be re-sprayed, which is one of its genuine advantages over laminate for a kitchen you expect to update rather than replace.' },
        { q: 'Which looks more premium, 2-pack or laminate?', a: 'A quality 2-pack finish is often perceived as more premium due to its true painted depth and the ability to achieve a very fine matte or gloss, though high-grade laminates have narrowed that gap considerably.' },
      ],
    },
    {
      slug: 'matte-vs-gloss-kitchen-doors',
      group: 'materials',
      nav: 'Matte vs gloss kitchen doors',
      title: 'Matte vs Gloss Kitchen Doors | Bilt & Co',
      desc: 'Matte and gloss finishes change how a kitchen looks under normal lighting and how visible fingerprints and marks are day to day. The real trade-off explained.',
      h1: 'Matte or gloss?<br><span class="italic brass">Living with it, not just seeing it.</span>',
      lede: 'The showroom light is not your kitchen\'s light. Here is what actually changes once it is installed.',
      img: 'glossy-dark',
      alt: 'High-gloss dark kitchen cabinetry',
      read: '4 min read',
      answer: 'Gloss doors reflect light and can make a smaller or darker room feel brighter and larger, but show fingerprints, smudges and dust more readily than matte. Matte doors hide daily marks far better and have become the dominant contemporary choice for exactly that reason, at a slight cost to how much light they bounce back into a room.',
      sections: [
        ['What gloss actually does in a room', 'A gloss door reflects ambient and natural light, which can genuinely help a smaller, darker or north-facing-poor kitchen feel more open. The trade-off is that every fingerprint, water mark and dust particle is more visible than on a matte surface — a genuinely higher-maintenance daily reality.'],
        ['Why matte has become the default', 'Matte hides daily fingerprints and marks far better, which matters enormously in a household with children or a kitchen that gets touched constantly. Most of the popular styles we cover — Hamptons, Japandi, modern farmhouse, Scandinavian — default to matte for this reason as much as for the look.'],
        ['A middle ground worth knowing about', 'Some finishes offer a satin or semi-matte sheen between the two extremes, softening gloss\'s fingerprint problem while still bouncing more light than a full matte. Worth asking your supplier about if the room genuinely needs the brightness gloss offers.'],
      ],
      faq: [
        { q: 'Do gloss kitchen doors show fingerprints more than matte?', a: 'Yes, noticeably — gloss reflects light in a way that makes marks and smudges far more visible than a matte finish, which is the main reason matte has become the more common contemporary choice.' },
        { q: 'Does gloss make a small kitchen look bigger?', a: 'It can help — reflecting more ambient light gives a sense of openness in a smaller or darker room, though the fingerprint trade-off is worth weighing against that benefit.' },
        { q: 'Is matte or gloss easier to keep clean?', a: 'Matte is generally easier to keep looking clean day to day, since it does not show fingerprints and light marks the way gloss does, even though both clean similarly with a normal wipe-down.' },
        { q: 'Is there a finish between matte and gloss?', a: 'Yes — a satin or semi-matte sheen is available on some ranges, offering a partial middle ground between gloss\'s brightness and matte\'s forgiveness of marks.' },
      ],
    },
    {
      slug: 'timber-veneer-vs-laminate-doors',
      group: 'materials',
      nav: 'Timber veneer vs laminate doors',
      title: 'Timber Veneer vs Laminate Kitchen Doors | Bilt & Co',
      desc: 'A timber veneer door is a real timber skin over a board substrate — different from a printed laminate that imitates timber.',
      h1: 'Real timber skin,<br><span class="italic brass">or a very good photograph of one.</span>',
      lede: 'Both can look like timber from across the room. Only one of them is.',
      img: 'timber-island',
      alt: 'American oak timber veneer kitchen island',
      read: '4 min read',
      answer: 'A timber veneer door has a thin, genuine timber skin bonded to a board substrate, so the grain, colour variation and texture are real timber, not a printed image — it can be lightly sanded and re-finished, and it ages and takes light the way real timber does. A timber-look laminate door is a printed decorative sheet that mimics timber grain, generally more affordable and extremely consistent, but visually and texturally distinguishable up close from real veneer.',
      sections: [
        ['What each actually is', 'Veneer is a thin slice of real timber, typically American oak or similar, bonded over MDF or particleboard — the surface you touch and see is genuine wood. A timber-look laminate is a photographic print of timber grain applied as a decorative laminate sheet — consistent, affordable, but a reproduction rather than the material itself.'],
        ['How they age differently', 'Veneer, being real timber, responds to light exposure over years the way solid timber does, developing subtle tonal changes, and can be lightly sanded back and re-oiled or re-finished if it shows wear. Laminate does not change with light exposure and cannot be sanded or refinished — damage generally means replacing the door.'],
        ['Cost and consistency trade-off', 'Laminate is generally more affordable and perfectly consistent from door to door, since it is a controlled print process. Veneer costs more and has natural grain variation between doors — a feature for some households, an inconsistency for others expecting uniformity.'],
      ],
      faq: [
        { q: 'Can you tell timber veneer from laminate up close?', a: 'Generally yes, on close inspection — veneer has the texture, grain irregularity and colour depth of real timber, while laminate is a flat, consistent print. From a normal viewing distance the difference is less obvious, particularly with a high-quality laminate.' },
        { q: 'Is timber veneer more expensive than laminate?', a: 'Yes, generally — real timber material and the bonding process cost more than a printed decorative laminate sheet.' },
        { q: 'Does timber veneer need more maintenance than laminate?', a: 'A little — it benefits from being kept out of constant direct moisture and can be periodically refreshed, whereas laminate needs essentially no special care beyond normal cleaning.' },
        { q: 'Can timber veneer be repaired if scratched?', a: 'Often, with light sanding and refinishing of the affected area, which is not possible with a laminate door — a genuine advantage of veneer for a kitchen expected to last many years.' },
      ],
    },
    {
      slug: '18mm-vs-16mm-cabinet-board',
      group: 'materials',
      nav: '18mm vs 16mm cabinet board',
      title: '18mm vs 16mm Cabinet Board: Does It Matter? | Bilt & Co',
      desc: 'A 2mm difference in board thickness sounds trivial. In a loaded base cabinet under a stone benchtop, it genuinely is not. Here is why.',
      h1: '18mm or 16mm?<br><span class="italic brass">Two millimetres, real consequences.</span>',
      lede: 'The specification line most buyers skip past, and one of the few that actually predicts how a kitchen ages.',
      img: 'matte-black-bank',
      alt: 'Cabinet carcass construction detail showing board thickness',
      read: '4 min read',
      answer: 'An 18mm cabinet carcass is stiffer over a wide span than 16mm, resists sagging under a loaded shelf or a stone benchtop better, and holds screws and hardware fixings more securely over years of use. 16mm was historically more common in budget cabinetry to reduce material cost; 18mm has become the more common specification where longevity matters, which is why we use it as standard across every collection.',
      sections: [
        ['Why the extra 2mm matters structurally', 'A wider, unsupported cabinet span — a long base run under a stone benchtop, or a wide shelf carrying crockery — flexes more on 16mm board than 18mm. Over years, that flex can show as a slightly sagging shelf or a benchtop that is not perfectly level where it should be rigid.'],
        ['Screw and hinge fixing strength', 'Hinges, runners and shelf pins all fix into the board itself, and a thicker board holds those fixings more securely under repeated opening and closing over years — a detail that matters more the longer you expect the kitchen to last.'],
        ['Where 16mm still shows up, and why', '16mm is not inherently poor-quality board; it is a legitimate lighter-duty specification, still common in some budget cabinetry ranges and in some non-structural applications like internal fittings. The distinction that matters is whether it is used for a loaded base cabinet carcass, where the extra stiffness genuinely counts.'],
      ],
      faq: [
        { q: 'Is 18mm cabinet board actually better than 16mm?', a: 'For load-bearing base cabinets and wide spans, yes — it is stiffer, resists sagging better and holds hardware fixings more securely over years of use.' },
        { q: 'Does board thickness affect price much?', a: '18mm board costs somewhat more than 16mm, but the difference is small relative to the total cost of a kitchen, and it is one of the cheapest specification decisions with real long-term consequence.' },
        { q: 'How can I check what board thickness a supplier uses?', a: 'Ask directly and get it stated on the quote — board thickness is not visible once cabinetry is installed and finished.' },
        { q: 'Is thicker always better for cabinet board?', a: 'Within reason — 18mm is the common standard for genuine durability; going thicker again offers diminishing practical benefit for typical residential kitchen use.' },
      ],
    },
    {
      slug: 'mdf-vs-particleboard-kitchen-cabinets',
      group: 'materials',
      nav: 'MDF vs particleboard cabinets',
      title: 'MDF vs Particleboard Kitchen Cabinets | Bilt & Co',
      desc: 'Both are engineered wood, and they behave differently under moisture and machining. What each is actually good at in a kitchen.',
      h1: 'MDF or particleboard?<br><span class="italic brass">Different jobs, not a hierarchy.</span>',
      lede: 'Neither is automatically the "good" one. Each suits a different part of the kitchen.',
      img: 'material-samples',
      alt: 'Cabinet board material samples',
      read: '4 min read',
      answer: 'MDF (medium-density fibreboard) is made from fine wood fibres bonded under heat and pressure, giving a smooth, dense surface that machines and paints cleanly — commonly used for doors, particularly 2-pack painted finishes. Particleboard is made from larger wood chips bonded with resin, offering good strength and screw-holding for carcasses at a lower cost than MDF. Both, in a moisture-resistant grade, perform well in a kitchen when used for the part they suit.',
      sections: [
        ['What MDF is best at', 'Its fine, dense, uniform structure machines and finishes extremely smoothly, which is why it is the common substrate for a 2-pack painted door — see 2-pack vs laminate kitchen doors — where surface quality genuinely matters for the paint finish.'],
        ['What particleboard is best at', 'Good strength and screw-holding at a lower cost than MDF makes it a common, sensible choice for cabinet carcasses, where the surface is generally covered by a laminate or melamine finish rather than exposed and painted directly.'],
        ['Why moisture rating matters more than the base material', 'Both MDF and particleboard are available in standard and moisture-resistant grades, and the moisture rating affects longevity in a kitchen far more than which of the two base materials is used — see what is moisture-resistant board for why this is the specification question that actually matters.'],
      ],
      faq: [
        { q: 'Is MDF or particleboard better for kitchen cabinets?', a: 'Neither is universally better — MDF suits doors and painted finishes due to its smooth, dense surface; particleboard suits carcasses well at a lower cost. The moisture rating of either matters more than which base material is chosen.' },
        { q: 'Is particleboard weaker than MDF?', a: 'Not necessarily for its intended use — particleboard has good structural strength for carcass construction; MDF is chosen more for its fine, paintable surface than for structural superiority.' },
        { q: 'Does MDF handle moisture better than particleboard?', a: 'Moisture resistance depends on the specific grade of either material rather than which base material it is — always confirm the moisture rating, not just the material name.' },
        { q: 'What is my kitchen carcass most likely made from?', a: 'In Australian kitchens, moisture-resistant particleboard is a very common carcass material, with MDF more commonly used for door faces — confirm the specifics with your supplier.' },
      ],
    },
    {
      slug: 'kitchen-sink-materials-compared',
      group: 'materials',
      nav: 'Kitchen sink materials compared',
      title: 'Kitchen Sink Materials Compared | Bilt & Co',
      desc: 'Stainless steel, granite composite and ceramic sinks behave very differently day to day. What suits a busy family kitchen versus a considered design statement.',
      h1: 'Stainless, composite<br><span class="italic brass">or ceramic — which sink?</span>',
      lede: 'The most-used fixture in the kitchen, chosen last far too often.',
      img: 'splashback-marble-02',
      alt: 'Kitchen sink area with rangehood and splashback',
      read: '5 min read',
      answer: 'Stainless steel is the most affordable and practical option, resisting heat and impact well but showing water spots and scratches over time. Granite composite sinks resist scratching and staining better than stainless and come in colours matching dark cabinetry, at a higher cost. Ceramic (fireclay) sinks offer a classic look and excellent heat resistance but are heavier, more expensive, and can chip if struck hard.',
      sections: [
        ['Stainless steel', 'Affordable, widely available, heat resistant and simple to install. Its main drawback is cosmetic — water spots show clearly, particularly on a satin finish, and fine scratches accumulate with use, though they rarely affect function.'],
        ['Granite composite', 'A blend of quartz or granite particles with resin, offering strong scratch and stain resistance and a matte, non-reflective look that suits dark or handleless cabinetry particularly well. It costs more than stainless and, like any composite surface, benefits from avoiding harsh abrasive cleaners.'],
        ['Ceramic (fireclay)', 'A traditional, heavy, kiln-fired material with excellent heat resistance and a classic look that suits a Hamptons or farmhouse-leaning kitchen especially well. It is the most expensive of the three and can chip if a heavy object is dropped directly on an edge.'],
      ],
      faq: [
        { q: 'What is the most durable kitchen sink material?', a: 'Granite composite generally resists scratching and staining best of the three; ceramic resists heat exceptionally well but can chip; stainless is durable overall but shows cosmetic wear like water spots most visibly.' },
        { q: 'Is a granite composite sink worth the extra cost over stainless?', a: 'If a matte, non-reflective look suited to dark cabinetry matters to you, or scratch resistance is a priority, yes — otherwise stainless remains a very practical, more affordable choice.' },
        { q: 'Do ceramic sinks chip easily?', a: 'They resist everyday use well but can chip if a heavy pot or pan is dropped directly on an edge — a genuine trade-off for their classic look and heat resistance.' },
        { q: 'Which sink material suits a busy family kitchen best?', a: 'Stainless steel or granite composite generally suit heavy daily use best — stainless for affordability and heat resistance, composite for a more scratch- and stain-resistant surface at a higher cost.' },
      ],
    },
    {
      slug: 'induction-vs-gas-cooktop',
      group: 'materials',
      nav: 'Induction vs gas cooktop',
      title: 'Induction vs Gas Cooktop for a Kitchen Renovation',
      desc: 'Cooktop choice changes cabinetry ventilation, benchtop cut-outs and even the rangehood spec. What to decide before the kitchen is designed, not after.',
      h1: 'Induction or gas?<br><span class="italic brass">Decide before the design, not after.</span>',
      lede: 'This is not just an appliance choice. It changes the cabinetry, the power supply and the rangehood spec around it.',
      img: 'splashback-marble-01',
      alt: 'Cooktop area with full height stone splashback',
      read: '5 min read',
      answer: 'Induction cooktops heat the pan directly via electromagnetic current, are fast, precise and produce no open flame or gas by-products in the kitchen, but require compatible cookware and a suitably rated electrical circuit. Gas cooktops offer immediate visual heat feedback and work with any cookware, but need a gas connection, and by-products of combustion make good rangehood extraction more important. Deciding early changes what your electrician and cabinetry maker actually need to plan for.',
      sections: [
        ['Why this decision has to come before cabinetry design', 'Induction needs a dedicated, appropriately rated electrical circuit run to the cooktop location — a rough-in decision, not an afterthought. Gas needs a gas line and compliant clearances. Confirm the cooktop type before your service drawing is finalised — see what is a service drawing — since retrofitting either after cabinetry is installed is expensive.'],
        ['Cookware compatibility with induction', 'Induction only heats magnetic cookware — cast iron and most stainless steel work; some aluminium, copper and glass cookware does not, without an induction-compatible base. Worth checking your existing cookware before committing, or budgeting to replace incompatible pieces.'],
        ['Ventilation needs differ', 'Gas cooking produces combustion by-products alongside cooking fumes, generally making strong rangehood extraction more important than with induction, which produces cooking fumes and heat but no combustion by-products — see rangehood types explained for ducted versus recirculating options.'],
      ],
      faq: [
        { q: 'Is induction better than gas for a kitchen renovation?', a: 'Neither is universally better — induction offers speed, precision and no open flame or combustion by-products; gas offers immediate visual heat control and works with any cookware. The right choice depends on how you cook and your power or gas supply.' },
        { q: 'Does induction need special cookware?', a: 'Yes — it only heats magnetic cookware. Most cast iron and many stainless steel pans work; some aluminium, copper and glass cookware does not without an induction-compatible base.' },
        { q: 'Do I need a stronger rangehood for gas than induction?', a: 'Generally a more capable extraction system is recommended for gas, due to combustion by-products alongside cooking fumes — confirm the right specification with your supplier based on your cooktop choice.' },
        { q: 'When should I decide between induction and gas?', a: 'Before your service drawing is finalised — the electrical or gas rough-in for each is different, and changing your mind after cabinetry and services are installed is expensive.' },
      ],
    },
    {
      slug: 'rangehood-types-explained',
      group: 'materials',
      nav: 'Rangehood types explained',
      title: 'Rangehood Types Explained: Ducted vs Recirculating',
      desc: 'A ducted rangehood vents outside; a recirculating one filters and returns air to the room. Which your kitchen can actually have, and why it matters.',
      h1: 'Ducted or recirculating?<br><span class="italic brass">Your building often decides for you.</span>',
      lede: 'The rangehood question that gets asked after the cabinetry is designed, when it should be one of the first.',
      img: 'dark-luxe-bar',
      alt: 'Overhead cabinetry with rangehood ducting concealed above',
      read: '4 min read',
      answer: 'A ducted rangehood extracts cooking air and vents it outside the building through ductwork, genuinely removing heat, smoke and odour from the kitchen. A recirculating rangehood filters the air through a charcoal or grease filter and returns it to the room, which is simpler to install where external venting is not possible but does not remove heat or moisture the way a ducted system does.',
      sections: [
        ['Why building type often decides this for you', 'A ground-floor kitchen with an external wall nearby generally allows straightforward ducting. An apartment, a kitchen deep in the floor plan, or a heritage-constrained building can make ducting difficult or impossible, in which case recirculating is often the only practical option regardless of preference.'],
        ['What each actually removes from the air', 'Ducted genuinely removes heat, moisture, smoke and odour from the kitchen entirely. Recirculating filters grease and some odour but returns the air, including its heat and moisture, back into the room — a meaningfully different result, not just a different installation method.'],
        ['Ducting needs planning before cabinetry is designed', 'The duct run from cooktop to an external wall or roof needs a physical path through cabinetry, a ceiling void or a wall — a decision that affects overhead cabinet layout and needs to be settled with your service drawing, not worked out after the cabinets are built.'],
      ],
      faq: [
        { q: 'Is a ducted rangehood better than recirculating?', a: 'For actual extraction, yes — ducted removes heat, moisture and odour from the kitchen entirely, where recirculating filters and returns the air. Building constraints sometimes make ducted impractical regardless of preference.' },
        { q: 'Can every kitchen have a ducted rangehood?', a: 'Not always — apartments, kitchens deep in a floor plan, or heritage-constrained buildings can make an external duct run difficult or impossible, in which case recirculating may be the only practical option.' },
        { q: 'Does a recirculating rangehood remove cooking smoke?', a: 'It filters grease and some odour but returns the air to the room, so heat, moisture and residual smell are not removed from the kitchen the way a ducted system removes them.' },
        { q: 'When should I decide on ducted versus recirculating?', a: 'Before overhead cabinetry is finalised — the duct run affects cabinet layout and needs to be planned into the service drawing rather than resolved afterwards.' },
      ],
    },
    {
      slug: 'flat-pack-kitchen-cost-per-linear-metre',
      group: 'cost',
      nav: 'Flat pack kitchen cost per linear metre',
      title: 'Flat Pack Kitchen Cost Per Linear Metre | Bilt & Co',
      desc: 'Why a per-metre kitchen price is only ever a rough guide, what actually drives the number, and how to use our published collection bands to estimate your own.',
      h1: 'Cost per linear metre,<br><span class="italic brass">used properly.</span>',
      lede: 'A useful rough guide for comparing quotes. A poor way to actually price your kitchen, because two metres of cabinetry can cost wildly different amounts.',
      img: 'material-samples',
      alt: 'Kitchen material and hardware samples used for cost estimation',
      read: '5 min read',
      answer: 'There is no single reliable "$ per linear metre" figure for a flat pack kitchen, because the same length of bench can carry a sink base, a sea of drawers, a dishwasher housing or an empty run — all at different costs. As a rough illustration using our own published bands: a 3.6 metre Essence collection kitchen at $15,000 works out near $4,200 per metre, while the same length in Atelier at $47,000-plus is well over $13,000 per metre. The collection and the specific cabinets in that run matter far more than a flat rate ever could.',
      inlineCta: {
        after: 2,
        eyebrow: 'A real number, not a rough one',
        title: 'Send your wall lengths. Get an actual quote.',
        body: 'A per-metre estimate is a starting conversation. A fixed, itemised quote against your actual room is the number that matters.',
        label: 'Get my free quote',
        href: '/contact',
      },
      cta: {
        eyebrow: 'Cost per metre',
        title: 'A rough guide,<br><span class="italic" style="color:var(--brass-lite)">never the final answer.</span>',
        body: 'Send your dimensions and we will price the actual cabinets in your actual room, not an average.',
        image: 'material-samples',
        alt: 'Kitchen material samples',
      },
      sections: [
        ['Why per-metre pricing is unreliable on its own', 'A metre of base cabinets with a sink and dishwasher costs meaningfully more than a metre of plain overhead storage. A quote built purely on linear metres, without knowing what is actually in that run, is a rough industry shorthand rather than a real price.'],
        ['Using our published bands as a rough guide', 'Our collections are published as whole-kitchen bands rather than per-metre rates — see <a href="/investment" style="color:var(--brass)">the price bands</a> — because that is the more honest way to estimate: Essence $15,000&ndash;$23,000, Maison $26,000&ndash;$42,000, Atelier $47,000 and up, for a typical family kitchen run. Dividing by your own approximate run length gives a rough per-metre sense, not a quote.'],
        ['What actually needs measuring for a real number', `Wall lengths, corners, tall units, appliance housings and benchtop material all move the number more than the raw metreage does. Send the room\'s dimensions through the quote form, or see <a href="/guide-how-to-measure-for-a-kitchen" style="color:var(--brass)">how to measure for a kitchen</a> first, and the number that comes back is real rather than an average.`],
      ],
      faq: [
        { q: 'What is the average cost per linear metre for a flat pack kitchen?', a: 'There is no single reliable figure — cost per metre varies enormously by what is in that section of the run (sink, dishwasher, tall unit) and which collection tier is specified. Our published whole-kitchen bands are a more honest guide than a flat rate.' },
        { q: 'Is per-metre pricing a good way to compare kitchen quotes?', a: 'Only as a very rough sense check — two quotes at the same per-metre rate can include very different specifications. Compare the itemised inclusions, not just the headline rate.' },
        { q: 'How much does a 3.6 metre kitchen cost?', a: 'It depends entirely on the collection and what the run includes — as a rough guide, our Essence collection starts around $15,000 for a typical family-sized run, with Maison and Atelier considerably more for a higher specification.' },
        { q: 'How do I get an accurate price instead of a rough per-metre estimate?', a: 'Send your actual wall dimensions and what you want included through the quote form — a fixed, itemised number comes back based on your specific room, not an average.' },
      ],
    },
    {
      slug: 'average-kitchen-renovation-cost-australia',
      group: 'cost',
      nav: 'Average kitchen renovation cost in Australia',
      title: 'Average Kitchen Renovation Cost in Australia (2026)',
      desc: 'What kitchen renovations typically cost across Australia, how our published bands compare, and why a national average tells you less than it seems to.',
      h1: 'What does a kitchen<br><span class="italic brass">actually cost in Australia?</span>',
      lede: 'National averages exist. They also flatten enormous differences in size, specification and location into one unhelpful number.',
      img: 'collection-marble-01',
      alt: 'Oak kitchen with stone island and marble splashback',
      read: '5 min read',
      answer: 'Commonly cited Australian industry figures put a national average kitchen renovation somewhere around the low-to-mid $40,000s, with capital city mid-range renovations often quoted between roughly $28,000 and $45,000 — but these figures blend enormous variation in size, finish level and location into a single number that may not resemble your actual kitchen. Our own published bands — Essence from $15,000, Maison $26,000&ndash;$42,000, Atelier $47,000-plus — give a more specific starting point once you know roughly which tier suits your room and taste.',
      inlineCta: {
        after: 2,
        eyebrow: 'A number for your kitchen, not the nation',
        title: 'See where your kitchen actually sits.',
        body: 'Our full price bands and the live estimator give a far more specific number than any national average can.',
        label: 'See the price bands',
        href: '/investment',
      },
      cta: {
        eyebrow: 'The real number',
        title: 'Averages describe the country.<br><span class="italic" style="color:var(--brass-lite)">Not your kitchen.</span>',
        body: 'Send your room and we will tell you where it actually sits, fixed and itemised.',
        image: 'collection-marble-02',
        alt: 'Kitchen with marble splashback',
      },
      sections: [
        ['Why a national average hides more than it reveals', 'A national figure blends a $15,000 apartment galley kitchen with a $90,000 architectural rebuild into one misleading midpoint. It is a useful sense of scale for a first conversation, and a poor basis for budgeting your specific project.'],
        ['What actually moves the number for your kitchen', 'Size (how many linear metres of cabinetry), specification tier, benchtop material, and whether it is installed by a local team or supplied to your own installer all matter more than which state or city you live in — see <a href="/investment" style="color:var(--brass)">the price bands</a> for how these interact.'],
        ['Freight is the one genuinely regional variable', 'Unlike most of the cost, freight does vary meaningfully with location — see <a href="/guide-flat-pack-kitchen-shipping-and-freight" style="color:var(--brass)">shipping and freight</a> for how that specific line is calculated, separately from the cabinetry price itself.'],
      ],
      faq: [
        { q: 'What is the average cost of a kitchen renovation in Australia?', a: 'Commonly cited industry figures put a national average somewhere in the low-to-mid $40,000s, though this blends enormous variation in size and specification — our own published bands from $15,000 give a more useful starting point.' },
        { q: 'Is a kitchen renovation more expensive in some states than others?', a: 'The cabinetry cost itself does not vary meaningfully by state in our pricing; freight to your specific location is the main genuinely regional cost, quoted to your postcode.' },
        { q: 'Why do kitchen renovation cost estimates vary so much online?', a: 'Different sources include or exclude different scope — some figures cover cabinetry only, others include appliances, benchtops, electrical and plumbing work, or full structural changes. Always check what is actually included in a quoted figure.' },
        { q: 'How do I get a realistic number for my own kitchen?', a: 'Use our published collection bands as a starting range, then send your room dimensions for a fixed, itemised quote rather than relying on a national average.' },
      ],
    },
    {
      slug: 'cost-to-replace-a-kitchen-benchtop-only',
      group: 'cost',
      nav: 'Cost to replace a kitchen benchtop only',
      title: 'Cost to Replace a Kitchen Benchtop Only | Bilt & Co',
      desc: 'Replacing just the benchtop, without new cabinetry, is a genuinely different job with its own cost drivers. What actually decides the price.',
      h1: 'Just the benchtop.<br><span class="italic brass">A smaller job, its own cost logic.</span>',
      lede: 'The cabinetry underneath is fine. Only the surface needs to change. Here is what actually drives that cost.',
      img: 'island-marble-close',
      alt: 'Close detail of a stone island benchtop edge',
      read: '4 min read',
      answer: 'Replacing a benchtop alone is generally driven by material choice, total surface area, edge profile and cut-outs for a sink and cooktop — not by cabinet cost, since the cabinets stay. Engineered stone and laminate sit at different ends of the cost range for the same area, and a waterfall edge or a mitred join adds meaningfully more than a standard square edge.',
      sections: [
        ['What actually drives the price on a benchtop-only job', 'Total area and material choice matter most, followed by edge detail — a simple square edge costs less than a waterfall edge or a mitred join — and the number and complexity of cut-outs for a sink, cooktop and tap. Existing cabinets being reused, rather than replaced, is what keeps this job smaller than a full renovation.'],
        ['Templating has to happen on site', 'A new benchtop is measured and templated against your actual existing cabinets after they are confirmed level and square, not from the old benchtop\'s dimensions — worth building a short lead time into your plan for this step before the new benchtop is fabricated.'],
        ['When benchtop-only makes sense, and when it does not', 'If the cabinets are structurally sound and you like the layout, replacing only the benchtop is a genuinely efficient way to refresh a kitchen. If the cabinets themselves are failing — see <a href="/guide-how-long-do-flat-pack-kitchens-last" style="color:var(--brass)">how long a kitchen lasts</a> — a benchtop-only job can end up postponing a larger, unavoidable cost.'],
      ],
      faq: [
        { q: 'Can I replace just my kitchen benchtop without new cabinets?', a: 'Yes, provided your existing cabinets are structurally sound and level — this is a genuinely smaller job than a full kitchen renovation.' },
        { q: 'What decides the cost of a benchtop-only replacement?', a: 'Total surface area, material choice, edge profile and the number of cut-outs for a sink, cooktop and tap — cabinet cost is not part of this job since the cabinets are reused.' },
        { q: 'Does a benchtop-only replacement need to be templated?', a: 'Yes — templating happens on site against your actual existing cabinets after any levelling is confirmed, not from the old benchtop\'s dimensions.' },
        { q: 'Is it worth replacing just the benchtop if the cabinets are old?', a: 'Depends on their actual condition — if the carcasses and hardware are sound, yes. If they are failing, a benchtop-only job can delay a larger cost rather than avoid it.' },
      ],
    },
    {
      slug: 'flat-pack-kitchen-cost-per-cabinet',
      group: 'cost',
      nav: 'Flat pack kitchen cost per cabinet',
      title: 'Flat Pack Kitchen Cost Per Cabinet | Bilt & Co',
      desc: 'Thinking in individual cabinets rather than linear metres — what makes one cabinet cost more than another, and why a unit count alone still is not a quote.',
      h1: 'Costed cabinet by cabinet,<br><span class="italic brass">not just by the metre.</span>',
      lede: 'A useful way to think about where the money in a kitchen actually goes — a base cabinet and a tall pantry unit are not close to the same cost.',
      img: 'matte-black-bank',
      alt: 'Bank of tall pantry cabinets arriving as built boxes',
      read: '4 min read',
      answer: 'A standard base cabinet with a single door and shelf costs less than a wide drawer bank, which costs less again than a tall pantry unit or a corner cabinet with a carousel mechanism fitted. Thinking cabinet by cabinet, rather than purely by linear metre, is a genuinely useful way to understand where a kitchen budget actually goes — a run of five simple base cabinets and a run of five drawer banks are very different prices for the same wall length.',
      sections: [
        ['What makes one cabinet cost more than another', 'Drawers cost more than a single door and shelf, because of the runners and drawer box construction involved. A corner cabinet with a carousel or blind-corner pull-out — see what is a corner carousel — costs meaningfully more than a standard cabinet of the same width. A tall pantry unit with internal pull-out fit-out costs more again.'],
        ['Why unit count alone still is not a full quote', 'Two kitchens with the same number of cabinets can differ substantially in price if one is all simple base units and the other is heavy with drawer banks, tall units and corner solutions. Benchtop, splashback and hardware upgrades sit on top of the cabinetry cost entirely separately.'],
        ['Where to spend, if the budget is tight', 'Prioritising drawers over low cupboards in the highest-use zones, and a proper corner solution over a fixed shelf, tend to matter more to daily usability than an extra cabinet elsewhere — worth discussing trade-offs at design stage rather than cutting evenly across the whole kitchen.'],
      ],
      faq: [
        { q: 'Does every kitchen cabinet cost the same?', a: 'No — a simple base cabinet with one door and a shelf costs considerably less than a drawer bank, a corner cabinet with a carousel, or a tall pantry unit with internal fit-out.' },
        { q: 'Is thinking in cabinets more useful than thinking per linear metre?', a: 'It can be, for understanding where a budget goes — two runs of the same length can cost very differently depending on how many drawers, corners and tall units are included.' },
        { q: 'Where should I prioritise spending in a tight kitchen budget?', a: 'Drawers over low cupboards in high-use zones, and a proper corner solution over a fixed shelf, tend to affect daily usability more than most other individual choices.' },
        { q: 'Can I get a cabinet-by-cabinet breakdown on my quote?', a: 'Yes — every quote is itemised, so you can see what each cabinet, drawer bank and corner solution actually costs rather than a single lump figure.' },
      ],
    },
    {
      slug: 'how-much-does-a-granny-flat-kitchen-cost-australia',
      group: 'cost',
      nav: 'Granny flat kitchen cost across Australia',
      title: 'How Much Does a Granny Flat Kitchen Cost in Australia?',
      desc: 'Granny flat kitchen pricing, freighted anywhere in Australia — what a compact kitchen or kitchenette actually costs, and what changes the number.',
      h1: 'A granny flat kitchen,<br><span class="italic brass">priced honestly, wherever you are.</span>',
      lede: 'The size of the run and what it needs to include matter far more than which state it is going into.',
      img: 'galley-stone',
      alt: 'Compact secondary dwelling kitchen with stone benchtop',
      read: '4 min read',
      answer: 'A granny flat kitchenette starts from around $4,500, and a full secondary-dwelling kitchen from around $6,500 for a 2.4 metre run, cut to your room and freighted flat pack or delivered assembled anywhere in Australia. Whether the space needs a kitchenette or a full kitchen depends on how your local planning approval classifies the dwelling — worth confirming before budgeting on either figure.',
      sections: [
        ['Kitchenette or full kitchen — the approval decides', 'A kitchenette generally will not satisfy the requirements of an approved self-contained dwelling — see <a href="/guide-what-does-supply-only-mean" style="color:var(--brass)">what does supply only mean</a> and your relevant state\'s granny flat rules guide for what your specific approval actually requires before assuming either figure applies.'],
        ['What moves the number from the base figure', 'Run length beyond 2.4 metres, a stone benchtop upgrade in place of laminate, and any additional appliance provisions all move the price up from the entry figure — the base numbers assume a straightforward, compact specification.'],
        ['Freight is quoted separately, wherever you are', 'The cabinetry price is the same nationally; freight to your specific postcode is the genuinely location-dependent line, shown separately on your quote rather than folded into the headline number.'],
      ],
      faq: [
        { q: 'How much does a granny flat kitchen cost in Australia?', a: 'From around $4,500 for a kitchenette, or $6,500 for a full 2.4 metre kitchen, cut to your room and freighted flat pack or assembled anywhere in Australia — freight is quoted separately to your postcode.' },
        { q: 'Does a granny flat need a full kitchen or a kitchenette?', a: 'It depends on how your local planning approval classifies the dwelling — a self-contained secondary dwelling generally needs a full kitchen. Check your specific state\'s granny flat rules guide before budgeting.' },
        { q: 'Is a granny flat kitchen cheaper outside major cities?', a: 'The cabinetry price is the same nationally; only the freight line varies with your specific postcode and distance.' },
        { q: 'What increases the cost above the base granny flat kitchen price?', a: 'A longer run, a stone benchtop instead of laminate, and additional appliance provisions are the most common reasons the price moves above the entry figure.' },
      ],
    },
    {
      slug: 'hidden-costs-in-a-kitchen-renovation',
      group: 'cost',
      nav: 'Hidden costs in a kitchen renovation',
      title: 'Hidden Costs in a Kitchen Renovation | Bilt & Co',
      desc: 'The costs that catch people out after the cabinetry quote — electrical and plumbing rough-in, waste removal, temporary kitchen arrangements and more.',
      h1: 'The costs that show up<br><span class="italic brass">after the cabinetry quote.</span>',
      lede: 'A cabinetry quote is not the whole renovation budget. Here is what else genuinely belongs in it.',
      img: 'studio-desk',
      alt: 'Kitchen renovation planning with drawings and samples',
      read: '5 min read',
      answer: 'The cabinetry, benchtop and hardware are usually the headline number in a kitchen renovation quote — but electrical and plumbing rough-in or alterations, waste removal from the old kitchen, making good to walls and flooring where cabinets once stood, and living arrangements while the kitchen is out of action are all real costs that sit outside a cabinetry-only quote and are worth budgeting for deliberately.',
      sections: [
        ['Electrical and plumbing changes', 'Moving a sink, adding an island power point, or changing from gas to induction — see induction vs gas cooktop — all involve a licensed trade beyond the cabinetry supplier. Get this priced separately and early, since it is one of the most common budget gaps in a renovation.'],
        ['Making good around the old kitchen\'s footprint', 'Removing existing cabinetry often reveals flooring, wall finishes or paint that do not extend behind where the old units stood — a genuinely common surprise cost that only shows up once demolition starts.'],
        ['Waste removal and disposal', 'Old cabinetry, benchtops and packaging from the new kitchen all need disposal, and skip hire or waste removal is a real line item that a cabinetry-only quote will not include.'],
        ['Living without a kitchen during the works', 'A temporary cooking setup, extra takeaway spending, or a short stay elsewhere during installation are genuine costs of the disruption itself, worth planning for rather than discovering mid-renovation.'],
      ],
      faq: [
        { q: 'What costs are not included in a kitchen cabinetry quote?', a: 'Electrical and plumbing trade work, making good to walls and flooring, waste removal, and appliances are commonly separate from a cabinetry-only quote — confirm what is and is not included before budgeting.' },
        { q: 'Does moving a sink or island add significant cost?', a: 'It can, since it usually requires a licensed plumber or electrician to relocate services — this is worth pricing early rather than assuming it is a minor change.' },
        { q: 'Should I budget for a temporary kitchen during renovation?', a: 'It is worth planning for — a working kitchen is typically out of action for the installation period, and a temporary cooking setup or short-term alternative arrangement is a real, if often overlooked, cost of the disruption.' },
        { q: 'Are appliances included in a kitchen renovation quote?', a: 'Not usually in a cabinetry-only quote — appliances are commonly priced and purchased separately, though cabinetry is drawn around your chosen or planned appliance dimensions.' },
      ],
    },
    {
      slug: 'e0-vs-e1-board-explained',
      group: 'sustainability',
      nav: 'E0 vs E1 board explained',
      title: 'E0 vs E1 Board Explained: Formaldehyde Ratings | Bilt & Co',
      desc: 'E0 and E1 describe formaldehyde emission levels in engineered wood board. What the ratings actually mean, and the question to ask any kitchen supplier.',
      h1: 'E0, E1,<br><span class="italic brass">and what the letters actually mean.</span>',
      lede: 'A specification detail almost nobody asks about, that says something real about indoor air quality.',
      img: 'material-samples',
      alt: 'Engineered wood board sample',
      read: '4 min read',
      answer: 'E0 and E1 are formaldehyde emission classifications for engineered wood panels such as particleboard and MDF, based on Australian and international standards — E0 permits a lower emission level than E1, which is itself well below older, now largely superseded higher-emission board. The rating is a genuine indoor air quality consideration, particularly relevant to anyone sensitive to indoor air quality or renovating a nursery, bedroom-adjacent space, or a very well-sealed modern home.',
      sections: [
        ['What the classification actually measures', 'Both ratings are based on standardised testing of formaldehyde emission from the panel under set conditions, with E0 requiring a lower measured emission than E1. Both are considered low-emission by current Australian standards; the distinction is a matter of degree rather than one being compliant and the other not.'],
        ['Why it matters more in some builds than others', 'A very well-sealed, energy-efficient modern home has less natural air exchange than an older, more draughty one, which is why indoor air quality specifications like board emission rating are getting more attention in newer builds and renovations generally.'],
        ['The question worth asking any supplier', 'Board emission rating is not something a finished kitchen visibly discloses — ask your supplier directly which rating their board carries, and ask for it in writing on the quote if it is a genuine priority for your household.'],
      ],
      faq: [
        { q: 'What is the difference between E0 and E1 board?', a: 'Both are low-formaldehyde-emission classifications for engineered wood panels; E0 permits a lower emission level than E1. Both meet current low-emission standards — the difference is one of degree.' },
        { q: 'Is E1 board unsafe?', a: 'No — E1 is a recognised low-emission standard used widely and considered safe under current Australian benchmarks. E0 is a further step down in emission level, which some households prioritise.' },
        { q: 'Why does board emission rating matter in a new home?', a: 'Well-sealed, energy-efficient modern homes have less natural air exchange than older, draughtier ones, which is part of why indoor air quality specifications are getting more attention generally.' },
        { q: 'How do I find out what board rating my kitchen supplier uses?', a: 'Ask directly, and request it in writing on your quote if it matters to you — the rating is not visible or disclosed automatically once a kitchen is finished.' },
      ],
    },
    {
      slug: 'is-flat-pack-furniture-bad-for-the-environment',
      group: 'sustainability',
      nav: 'Is flat pack furniture bad for the environment?',
      title: 'Is Flat Pack Furniture Bad for the Environment? | Bilt & Co',
      desc: 'An honest look at the environmental trade-offs of flat pack cabinetry — freight efficiency versus board sourcing, and what actually matters most.',
      h1: 'Is flat pack actually<br><span class="italic brass">worse for the environment?</span>',
      lede: 'Not inherently, and the honest answer has more nuance than either side of the debate usually gives it.',
      img: 'drawer-detail',
      alt: 'Flat pack cabinetry packed for freight',
      read: '4 min read',
      answer: 'Flat pack cabinetry itself is not inherently worse for the environment than assembled cabinetry — the material is the same board, hardware and finish either way. Where flat pack has a genuine environmental advantage is freight efficiency: a carton takes a fraction of the truck space an assembled carcass needs for the same kitchen, meaning fewer emissions per kitchen moved over distance. The bigger sustainability factors — board sourcing, formaldehyde emission rating, and how long the kitchen actually lasts — are the same questions regardless of whether it ships flat or assembled.',
      sections: [
        ['Where flat pack genuinely helps', 'Freight volume is the clearest environmental advantage — see <a href="/guide-flat-pack-kitchen-shipping-and-freight" style="color:var(--brass)">shipping and freight</a> — since moving cartons rather than bulky assembled carcasses reduces the number of truck movements needed to deliver the same amount of cabinetry.'],
        ['What matters more than flat pack versus assembled', 'Board emission rating — see E0 vs E1 board explained — and simply how long the kitchen lasts before replacement are bigger environmental factors than packing method. A kitchen replaced every eight years due to a failed carcass has a worse footprint than a well-specified one lasting twenty, regardless of how either shipped.'],
        ['Packaging waste, honestly', 'Flat pack cartons do generate more packaging material per kitchen than an assembled delivery, which is a genuine trade-off against the freight-volume saving — ask your supplier about packaging recyclability if this specifically concerns you.'],
      ],
      faq: [
        { q: 'Is flat pack cabinetry worse for the environment than assembled?', a: 'Not inherently — the material is identical either way. Flat pack has a freight efficiency advantage; it generates somewhat more packaging waste per kitchen, which is the genuine trade-off.' },
        { q: 'Does flat pack furniture last as long as assembled furniture?', a: 'Yes, provided the specification — board grade, edging and hardware — is the same, which it is with our collections. Longevity depends on the materials and assembly quality, not on whether it arrived flat or assembled.' },
        { q: 'What is the biggest environmental factor in kitchen cabinetry?', a: 'How long it lasts before replacement, and the emission rating of the board used, generally matter more than the flat pack versus assembled decision.' },
        { q: 'Is flat pack packaging recyclable?', a: 'It varies by supplier and material — ask directly if this is a priority, since cardboard and protective wrapping recyclability differs.' },
      ],
    },
    {
      slug: 'blum-hardware-warranty-explained',
      group: 'sustainability',
      nav: 'Blum hardware warranty explained',
      title: 'Blum Hardware Warranty Explained | Bilt & Co',
      desc: 'What "lifetime mechanical warranty" actually covers on Blum hinges and runners, what it does not, and how it differs from a general kitchen warranty.',
      h1: 'What "lifetime warranty"<br><span class="italic brass">actually covers.</span>',
      lede: 'A phrase used often and explained rarely. Here is what it genuinely means on the hardware carrying every door and drawer.',
      img: 'drawer-detail',
      alt: 'Blum hardware detail on a kitchen drawer',
      read: '4 min read',
      answer: 'Blum\'s mechanical warranty on hinges and runners covers manufacturing defects and mechanical failure of the hardware itself under normal residential use for the life of the product — it is a hardware manufacturer warranty, distinct from and additional to any warranty your kitchen supplier gives on the cabinetry, installation or finish. It does not cover damage from misuse, incorrect installation, or commercial-intensity use beyond what the hardware is rated for.',
      sections: [
        ['What it actually covers', 'Mechanical failure of the hinge or runner mechanism itself — the soft-close damper failing, a hinge losing tension, a runner binding — under normal residential use, for as long as the product is in service. It is a manufacturer warranty on the component, not a whole-of-kitchen guarantee.'],
        ['What it does not cover', 'Damage from misuse or incorrect installation, wear from use well beyond normal residential intensity, and cosmetic issues unrelated to the mechanism itself are generally outside scope — this is a mechanical warranty, not an all-encompassing one.'],
        ['How it relates to your kitchen supplier\'s own warranty', 'Blum\'s warranty covers the hardware; your kitchen supplier separately stands behind the cabinetry, installation and finish under their own terms. Ask any supplier to state both clearly rather than assuming one covers the other.'],
      ],
      faq: [
        { q: 'What does Blum\'s lifetime mechanical warranty actually cover?', a: 'Mechanical failure of the hinge or runner mechanism itself under normal residential use, for the life of the product — it is a hardware manufacturer warranty specifically, not a whole-kitchen warranty.' },
        { q: 'Does the Blum warranty cover installation mistakes?', a: 'No — it covers manufacturing and mechanical defects in the hardware, not damage caused by incorrect installation, which would be a matter for whoever installed it.' },
        { q: 'Is Blum\'s warranty the same as my kitchen supplier\'s warranty?', a: 'No — they are separate. Blum warrants the hardware itself; your kitchen supplier separately stands behind the cabinetry, installation and finish under their own terms.' },
        { q: 'Does commercial use void the Blum warranty?', a: 'Use beyond the intensity the hardware is rated for — genuinely commercial or industrial use in a residential-rated product — can fall outside normal warranty terms. Confirm the specific rating for heavy-use applications.' },
      ],
    },
    {
      slug: 'kitchen-cabinet-warranty-what-to-check',
      group: 'sustainability',
      nav: 'Kitchen cabinet warranty: what to check',
      title: 'Kitchen Cabinet Warranty: What to Actually Check | Bilt & Co',
      desc: 'Warranty claims vary enormously between kitchen suppliers. The specific questions to ask before you sign, not after something fails.',
      h1: 'Before you sign,<br><span class="italic brass">ask these warranty questions.</span>',
      lede: 'A warranty is only worth what it actually promises in writing — and that varies far more between suppliers than most buyers realise.',
      img: 'joinery-sketch',
      alt: 'Kitchen quote and warranty documentation',
      read: '4 min read',
      answer: 'A genuine kitchen warranty should state, in writing, what is covered (carcass, hardware, finish, installation), for how long, whether hardware carries its own separate manufacturer warranty on top, and what voids it. A verbal assurance of "we stand behind our work" is not a warranty until it is written into the quote or contract.',
      sections: [
        ['Get it broken down by component', 'Carcass, hardware, door finish and installation can carry different warranty periods from different parties — ask for each to be stated separately rather than accepting one vague overall figure.'],
        ['Check whether hardware carries its own manufacturer warranty', `Branded hardware such as Blum often carries its own separate mechanical warranty — see <a href="/guide-blum-hardware-warranty-explained" style="color:var(--brass)">Blum hardware warranty explained</a> — distinct from and additional to whatever your kitchen supplier warrants on the cabinetry as a whole.`],
        ['Ask what voids it', 'Water damage from an unrelated plumbing failure, commercial-intensity use in a residential product, or DIY modifications can all void a warranty depending on the supplier\'s terms — worth knowing before rather than after something goes wrong.'],
      ],
      faq: [
        { q: 'What should a kitchen warranty actually state?', a: 'What is covered by component (carcass, hardware, finish, installation), for how long, and what voids it — in writing, not as a verbal assurance.' },
        { q: 'Does hardware warranty differ from cabinetry warranty?', a: 'Often, yes — branded hardware like Blum frequently carries its own separate manufacturer warranty on top of whatever the kitchen supplier warrants on the cabinetry overall.' },
        { q: 'What commonly voids a kitchen warranty?', a: 'Water damage unrelated to a manufacturing defect, use well beyond normal residential intensity, and unauthorised modifications are common exclusions — confirm your specific supplier\'s terms.' },
        { q: 'Should I get warranty terms in writing before signing?', a: 'Yes, always — a warranty that exists only as a verbal assurance is not enforceable in the way a written term in your quote or contract is.' },
      ],
    },
    {
      slug: 'bushfire-rebuild-kitchen-supply-australia',
      group: 'sustainability',
      nav: 'Bushfire rebuild kitchen supply',
      title: 'Kitchen Supply for Bushfire Rebuilds Australia-Wide',
      desc: 'Rebuilding a kitchen after bushfire loss — insurance timing, fixed pricing for a claim, and freight anywhere in Australia while your build programme is set.',
      h1: 'Rebuilding after fire,<br><span class="italic brass">on your insurer\'s timeline.</span>',
      lede: 'An insurance rebuild runs on somebody else\'s process and paperwork. A fixed, itemised kitchen quote is one thing you can control in it.',
      img: 'matte-black-bank',
      alt: 'New kitchen cabinetry for a bushfire rebuild',
      read: '5 min read',
      answer: 'A bushfire rebuild kitchen is supplied on the same terms as any other order — a fixed, itemised quote your insurer or builder can work from, cut to your new floor plan and freighted flat pack or delivered assembled anywhere in Australia. Building in a designated Bushfire Attack Level area may affect construction materials and detailing elsewhere in the build; your building certifier and insurer confirm what that means for your specific rebuild.',
      sections: [
        ['A fixed quote your insurer can actually use', 'Insurance rebuild processes generally need a clear, itemised figure to assess against a claim — our quotes are fixed and itemised before anything is cut, which suits that process better than an estimate that might move.'],
        ['Working to your rebuild programme, not the other way round', 'A bushfire rebuild often runs on a schedule set by your builder, certifier and insurer rather than a discretionary renovation timeline — tell us your build programme and we plan cabinetry delivery to fit it.'],
        ['Bushfire Attack Level and the kitchen specifically', 'BAL ratings primarily affect external construction materials and detailing rather than internal kitchen cabinetry directly, but confirm with your building certifier whether your specific rating affects anything relevant to the kitchen fit-out, such as window or door specifications near the kitchen.'],
      ],
      faq: [
        { q: 'Can you supply a kitchen for an insurance bushfire rebuild?', a: 'Yes, anywhere in Australia — a fixed, itemised quote your insurer or builder can work from, cut to your new floor plan.' },
        { q: 'Does a Bushfire Attack Level rating affect the kitchen cabinetry itself?', a: 'Generally BAL ratings affect external construction materials more directly than internal cabinetry — confirm with your building certifier whether anything specific to your rating affects the kitchen fit-out.' },
        { q: 'Can cabinetry delivery be timed to a rebuild programme?', a: 'Yes — tell us your builder\'s programme and we plan delivery to fit it rather than working to a generic timeline.' },
        { q: 'Do you offer the same kitchen we had before, or does it need to be redesigned?', a: 'Either — send us photos or the old plan if you want to replicate it closely, or start fresh with a new design; both are quoted the same way.' },
      ],
    },
    {
      slug: 'recyclable-low-waste-kitchen-cabinetry',
      group: 'sustainability',
      nav: 'Recyclable & low-waste kitchen cabinetry',
      title: 'Recyclable & Low-Waste Kitchen Cabinetry | Bilt & Co',
      desc: 'Where waste actually happens in a kitchen order, and the honest questions to ask a supplier about offcuts, packaging and end-of-life disposal.',
      h1: 'Where the waste<br><span class="italic brass">actually happens.</span>',
      lede: 'Not just the finished kitchen — the offcuts, the packaging and what eventually happens when it is replaced.',
      img: 'material-samples',
      alt: 'Cabinet material offcuts and samples',
      read: '4 min read',
      answer: 'Waste in a kitchen order happens in three places: board offcuts during manufacture, packaging for freight, and the eventual disposal of the old kitchen being replaced. Cutting to a precise drawing rather than standard catalogue sizes generally reduces offcut waste, since panels are sized to your room rather than trimmed down from a fixed module. Packaging and end-of-life disposal are worth asking any supplier about directly rather than assuming.',
      sections: [
        ['Offcuts during manufacture', 'Cutting every carcass to your specific drawing, rather than trimming standard catalogue-width panels down to fit, generally produces less offcut waste per kitchen, since less material is cut away to begin with.'],
        ['Packaging for freight', 'Flat pack cartons use more packaging material per kitchen than an assembled delivery, which is a genuine trade-off against the freight-volume saving — see is flat pack furniture bad for the environment. Ask your supplier what the packaging is made from and whether it is recyclable in your area.'],
        ['End-of-life disposal', 'A kitchen replaced after fifteen or twenty years of genuine use generates far less lifetime waste than one replaced after five due to a failed carcass — see how long do flat pack kitchens last for why specification quality is itself a waste consideration, not just a durability one.'],
      ],
      faq: [
        { q: 'Does cutting a kitchen to a custom drawing reduce waste?', a: 'Generally yes — panels sized to your specific room produce less offcut than trimming standard catalogue widths down to fit.' },
        { q: 'Is flat pack packaging recyclable?', a: 'It depends on the specific materials used — ask your supplier directly what the packaging is made from and whether it is recyclable through your local council.' },
        { q: 'Is a longer-lasting kitchen more sustainable than a cheaper one?', a: 'Generally, yes — a kitchen that lasts fifteen to twenty years before replacement produces considerably less lifetime waste than one replaced every five to eight years due to a failed carcass or hardware.' },
        { q: 'What should I ask a supplier about cabinetry waste?', a: 'How panels are cut (custom drawing versus standard modules), what the freight packaging is made from and whether it is recyclable, and what board emission rating is used — see E0 vs E1 board explained.' },
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
    { q: 'How does supply-only work from 500km away?', a: 'The same way it works for the builders we already supply. We design to your measurements, you confirm the drawings, and the cabinetry is delivered assembled or flat packed, whichever you order. Your installer fits it. We provide the service drawings so your plumber and electrician know exactly where everything lands.' },
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
    title: 'Kitchens Caloundra & Sunshine Coast | Supply & Delivery',
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
          <a class="btn btn--lg" href="contact.html">Get my free quote</a>
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
            <li>Delivered assembled, or flat packed — your call</li>
            <li>Full service drawings for your trades</li>
            <li>Fixed, itemised supply quote including delivery</li>
            <li>Blum hardware and moisture-resistant carcasses</li>
            <li>Delivered assembled, doors adjusted before it arrives</li>
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
      { q: `Is it flat packed?`, a: `Your choice. Assembled means you or your installer are fitting a kitchen, not building one on the floor first, and it needs more room to store than cartons do. Flat pack ships for less and gets into tight rooms. The quote shows both.` },
      { q: `Will you ever install in ${place}?`, a: `Only if there is enough work there to put a team on properly. The enquiries through this page are genuinely what decides that. Until then, supply is the honest offer.` },
    ];
    // 'the Whitsundays' -> title 'Kitchens Whitsundays', H1 'The Whitsundays, we supply.'
    const bare = place.replace(/^the /, '');
    const Place = place.charAt(0).toUpperCase() + place.slice(1);
    return {
      assembled: 'supply',
      file: `kitchens-${slug}.html`,
      service: {
        name: `Kitchen supply and delivery to ${place}`,
        type: 'Kitchen supply and delivery',
        desc: `Cabinetry designed in Rockhampton and delivered assembled to ${place}, fitted by your own builder or installer.`,
        areas: towns || [place],
      },
      title: `Kitchens ${bare} | Supply & Delivery | Bilt & Co`,
      desc: `Bilt & Co ships kitchens to ${place}, flat pack or assembled, fitted by your builder. Designed in Rockhampton, fixed itemised quotes with freight.`,
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
          <a class="btn btn--lg" href="/contact">Get my free quote</a>
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
          <p class="mt-1 muted">Same 18mm moisture-resistant carcasses, same Blum soft-close hardware, same laser-bonded edging. Supply is not a lesser product for people who could not afford the real one — it is the same kitchen without our installation labour on the invoice. See <a href="/owner-builder-kitchen-supply" style="color:var(--brass)">owner-builder supply</a> for how it works end to end.</p>
        </div>
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">${place}</span>
          <div class="tier__price" style="font-size:clamp(1.5rem,2.4vw,2rem)">Supply only<small>Delivered assembled</small></div>
          <ul>
            <li>Designed to your measurements</li>
            <li>Delivered assembled, or flat packed — your call</li>
            <li>Full service drawings for your trades</li>
            <li>Fixed, itemised quote including delivery</li>
            <li>Blum hardware, moisture-resistant carcasses</li>
            <li>Blum hardware, lifetime mechanical warranty</li>
            <li class="no">Installation not offered in ${place}</li>
          </ul>
          <a class="btn btn--block" href="/contact">Get my free quote</a>
        </div>
        <p class="small muted mt-2">We also ship to ${SUPPLY_TOWNS.filter((t) => t[0] !== slug).map((t) => `<a href="/kitchens-${t[0]}" style="color:var(--brass)">${t[1]}</a>`).join(', ')}, and install in ${INSTALL_TOWNS.map((t) => `<a href="/kitchens-${t[0]}" style="color:var(--brass)">${t[1]}</a>`).join(', ')}.</p>
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

  /* National reach, flat-pack first. Unlike the QLD supply towns above, these
     pages never lead with "delivered assembled" — past a few hundred
     kilometres a carton is the honest recommendation, not just an option, so
     the pitch here is flat pack plus the upgrade path, not supply-and-install
     framing borrowed from a page that does not fit this distance. Same
     honesty rules as everywhere else: no install claim, no invented freight
     figures, one page per city, cross-linked to the others and to the
     upgrades page rather than competing with flat-pack-kitchens.html for its
     own head term. */
  const NATIONAL_CITIES = [
    ['sydney', 'Sydney'], ['melbourne', 'Melbourne'], ['perth', 'Perth'],
    ['adelaide', 'Adelaide'], ['canberra', 'Canberra'], ['hobart', 'Hobart'],
    ['darwin', 'Darwin'], ['gold-coast', 'the Gold Coast'], ['newcastle', 'Newcastle'],
    ['wollongong', 'Wollongong'], ['townsville', 'Townsville'], ['cairns', 'Cairns'],
    ['geelong', 'Geelong'], ['toowoomba', 'Toowoomba'],
  ];

  /* One small illustrative strip, reused as-is on every national page rather
     than hand-built per city — three facts, three icons, no new markup to
     maintain fourteen times over. Same .trust/.trust__i classes as the
     sitewide trustStrip, so it costs nothing in CSS either. */
  function flatPackRouteStrip(place, distance, freightMode) {
    return `<div class="trust">
    <div class="wrap trust__in">
      <span class="trust__i">${svg.pin} Cut and drawn in Rockhampton, QLD</span>
      <span class="trust__i">${svg.clock} ${distance} to ${place}</span>
      <span class="trust__i">${svg.tool} Freighted ${freightMode}</span>
      <span class="trust__i">${svg.dollar} Quoted to your postcode, not a guess</span>
      <span class="trust__i">${svg.shield} Same spec as every collection</span>
    </div>
  </div>`;
  }

  /* Twelve substantive sections. Three are chosen per town by hash, so two
     towns in one region do not read the same. Every one is a real part of
     buying a kitchen this way - none of it is padding, and none of it states
     a figure we have not published elsewhere on the site. */
  const NAT_SECTIONS = [
    ['What the quote actually itemises', (p) => `Every cabinet as its own line with its width and what is in it, the benchtop by material and linear metre, the hardware by brand, the doors by finish, and freight to your ${p} postcode on a line of its own. No allowances, no provisional sums, no "from" price with the catches left out. If you take an item off, you see exactly what comes off the total, which is the point of itemising it in the first place.`],
    ['Measuring from ${p} without us there', (p) => `Because we do not visit ${p}, your measurements are the drawing. Wall to wall at three heights and use the smallest number. Ceiling height in every corner, because floors are never level. Every window and door with its distance from the nearest corner. Where the waste, the water and the power are now. Then a photograph of each corner of the room. Our measuring guide lists the lot, and a designer checks your numbers against the photographs before anything is cut.`],
    ['Benchtops, and why they are separate', (p) => `Laminate ships with the kitchen. Stone does not, and it should not: a stone benchtop is templated off the cabinets after they are installed and level, by a fabricator near you in ${p}, because a slab cut to a drawing rather than to the room is a slab that does not fit. We quote the cabinetry and the laminate; for stone we tell you the cut-out sizes and the fabricator works from the installed run.`],
    ['Appliances: yours or ours', (p) => `Most ${p} orders come with the appliances already chosen, and that is the easier way round. Send us the model numbers, or the cut-out dimensions from the spec sheet, and the cabinets are cut to take them. If you would rather we supplied them, they are quoted as their own lines. What does not work is guessing: a 900mm cooktop in a cabinet cut for 600mm is a new cabinet, not an adjustment.`],
    ['What happens if something arrives damaged', (p) => `Check the delivery against the numbered drawing on the day it lands in ${p}, before the truck leaves if you can. Count the cartons, look at the door and drawer fronts. If a panel is damaged or a carton is missing, photograph it and ring the studio the same day. A replacement is cut from the drawing we hold on file, so it matches the rest of the kitchen rather than being re-measured from scratch.`],
    ['Ordering in stages', (p) => `Not every ${p} job needs the whole kitchen at once. Builders regularly take the base run first and the overheads and pantry later, and renovators sometimes take the kitchen now and the laundry in six months. The drawing stays on file, so a later order matches the first exactly - same board, same colour batch where we can, same hardware. Say so on the quote request and it is priced in stages.`],
    ['A kitchenette instead of a kitchen', (p) => `If the room in ${p} is a studio, a granny flat, an under-house conversion or a short-stay unit, a kitchenette may be the right answer and it starts at $4,500. Sink, bench, cold storage, and a cooktop where the run allows. Same carcasses and the same Blum hardware as a full kitchen, in a fraction of the length - and it fits through a doorway that a full run would not.`],
    ['Flat pack or assembled, decided on numbers', (p) => `The cabinetry price is identical. What differs is the assembly line on the quote and the freight line, because assembled cabinets take several times the truck space of the same kitchen in cartons. To ${p} that difference is usually decisive, and most orders this far out go flat. But the quote shows both, so it is a number you compare rather than a decision you are talked into.`],
    ['Why there is no design software', (p) => `Plenty of suppliers hand you a portal and let the software approve your own mistakes. We do not. A designer in Rockhampton draws your ${p} kitchen from your measurements and photographs, and catches the things software does not: the window reveal that stops an overhead, the door swing that fouls the fridge, the floor that falls 30mm across the run. You see the drawing before you pay anything.`],
    ['What ships with the order', (p) => `A numbered plan and elevations, a service drawing marking every waste, water point and outlet for your ${p} plumber and electrician, the hardware bagged per cabinet, kickboards and end panels cut to length, and fillers where the room needs them. Nothing on that list is an extra. The service drawing in particular is what stops a cabinet being cut on site to clear a pipe nobody planned for.`],
    ['Second-dwelling and rental kitchens', (p) => `A good share of what we ship to ${p} goes into secondary dwellings, granny flats and rentals. Those kitchens fail in a predictable order - edging near the sink, then drawer runners, then hinge adjustment - and all three are specification, not bad luck. The board, edging and hardware we ship as standard are chosen so the rental kitchen and the owner kitchen are the same kitchen.`],
    ['Comparing our quote with a local one', (p) => `Take our itemised quote to any ${p} cabinetmaker and compare it line for line, which is exactly what it is formatted for. Ask them three things: board thickness and moisture rating, edging method, hardware brand. If the answers match ours and the number is better, take theirs - a local supplier with the same specification and no freight line is a genuinely good outcome. If the answers are vague, you have learned something either way.`],
  ];

  const NAT_H1 = [
    (p) => `Flat pack kitchens<br><span class="italic brass">delivered to ${p}.</span>`,
    (p) => `${p} kitchens,<br><span class="italic brass">cut to your room.</span>`,
    (p) => `Custom kitchens<br><span class="italic brass">freighted to ${p}.</span>`,
    (p) => `A kitchen drawn for ${p},<br><span class="italic brass">not for a catalogue.</span>`,
    (p) => `Flat pack or assembled,<br><span class="italic brass">delivered to ${p}.</span>`,
  ];
  const NAT_ANSWER = [
    (p, r) => `We design and cut every kitchen in Rockhampton, Queensland, and freight it to ${p} ${r.route} — flat packed, or delivered assembled with the doors already hung and adjusted. We do not install in ${p}; your own builder or installer fits it from our drawings. Send the room dimensions and the quote comes back both ways, fixed and itemised, with freight to your postcode on its own line.`,
    (p, r) => `Yes, we ship to ${p}. The kitchen is drawn to your measurements, cut in Rockhampton and freighted ${r.route}. You choose flat packed or delivered assembled on the same quote, and your own trades fit it — we install in Central Queensland only. Nothing is due to see the drawing or the price, and nothing is cut until you sign the drawing off.`,
    (p, r) => `Every cabinet is cut to your wall lengths rather than picked from catalogue widths, then freighted to ${p} ${r.route}. 18mm moisture-resistant board, laser-bonded edging and Blum hardware as standard. Installation in ${p} is by your builder or kitchen installer, working from the dimensioned service drawings that ship with the order.`,
  ];

  /* Three ways of making each argument, picked by the town's position in its
     region. Same facts, different page. */
  const CLIM_VAR = {
    tropical: [
      `Humidity is the design constraint here, not heat. Through the wet season a standard-core carcass takes on moisture at the cut edges and swells, and once a panel has swollen the door never sits square again. Everything we ship is 18mm moisture-resistant board with laser-bonded edging — no glue line for water to track along.`,
      `Ask any local cabinetmaker what fails first in this climate and you will get the same answer: the edge nearest the sink, then the panel behind it. Moisture-resistant board and a fused edge are the whole defence, and they are standard on every cabinet we cut rather than a line you have to ask for.`,
      `A kitchen here spends months in air that never really dries out. That is why we will not quote 16mm standard board at any price — it is the cheaper option that costs the most, because a swollen carcass cannot be adjusted back into square.`,
    ],
    subtropical: [
      `Summers here are humid enough that the cheap end of flat pack fails at the sink and dishwasher first, usually inside five years. Moisture-resistant board and laser-bonded edging are standard on every cabinet we cut.`,
      `The humid months do the damage quietly: water tracks along a glued edge, lifts it, and the board underneath drinks it. A laser-bonded edge has no seam for that to start in, which is why every panel we send is finished that way.`,
      `Between the humidity and the summer storms, the parts of a kitchen that suffer here are the ones nobody photographs — the sink cabinet floor, the edge behind the dishwasher. Moisture-resistant board is specified for exactly those.`,
    ],
    temperate: [
      `The seasonal swing here moves timber and board more than a steady climate does, and the joint that gives first is almost always the edge. Laser-bonded edging is fused to the panel rather than glued to it, so there is no seam to lift.`,
      `Cold mornings and hot afternoons in the same day are hard on a cabinet. Materials expand and contract, glued edging works loose at the corners, and doors drift out of alignment. A fused edge and three-way adjustable Blum hinges are the answer to both halves of that.`,
      `Four real seasons means four cycles of movement a year. Over a decade that is what separates a kitchen that still closes properly from one that does not, and it is decided by the edging and the hinge, not by the door colour.`,
    ],
    arid: [
      `Dry heat, dust and hard water are the local test. Dry heat shrinks poorly-made joints and dust finds its way into cheap runners until they grate. Blum runners and hinges are sealed and carry a lifetime mechanical warranty, which is why we fit nothing else.`,
      `Everything out here is harder on hardware than it is on doors. Fine dust gets into an unsealed runner and turns a soft-close drawer into a grinding one inside a year. Blum is specified for the dust as much as for the warranty.`,
      `Hard water marks stone and laminate alike, and dry heat opens up any joint that was not tight to begin with. Neither is solved by a prettier door; both are answered by the board, the edge and the hardware underneath.`,
    ],
    cool: [
      `Cold, damp winters in older uninsulated housing produce condensation, and condensation sits on the underside of a benchtop and in the back of a sink cabinet where nobody looks. Moisture-resistant board handles that; standard board swells quietly for a year and then lets go.`,
      `The cold itself is not the problem. The problem is the damp that comes with it, settling in the parts of a kitchen that never get looked at until a door stops closing. Moisture-resistant board and a fused edge are specified for those places.`,
      `Kitchens here are warm and steamy for a few hours and cold for the rest. That cycling is what lifts glued edging off a panel, and it is the single best argument for the specification we ship as standard.`,
    ],
  };
  const KIND_VAR = {
    coastal: [
      `Salt air is relentless on hardware. It gets into unbranded runners and hinges and they stiffen, then sag, and the doors stop lining up. Every cabinet runs Blum soft-close hinges and full-extension runners as standard.`,
      `Near the water it is never the doors that go first, it is everything that moves. Salt finds the cheapest component in the kitchen and works on it. Specifying the hardware properly at the start is most of what a coastal kitchen needs.`,
      `A house within reach of sea air is a harder brief than it looks: the finish has to survive the light and the hardware has to survive the salt. We answer the second with Blum on every hinge and runner, and the first with a finish you choose off real samples.`,
    ],
    mining: [
      `A lot of housing here is worked hard and turned over fast — tenants, shift workers, company accommodation. That is a specification argument, not a design one: 18mm carcasses that hold a screw, drawers that survive being slammed, and doors that can be readjusted rather than replaced.`,
      `Kitchens in worker and rental housing get no sympathy, and they are usually repaired by whoever is nearest rather than by whoever built them. Three-way adjustable hinges and a standard Blum runner mean a local handyman can fix it without ordering anything unusual.`,
      `Turnover is the enemy. Every tenancy is a fresh set of hands on the same drawers, and cheap runners announce it within a year. What we ship is specified to be boring and repairable, which in a rental is the highest compliment.`,
    ],
    farming: [
      `The nearest cabinetmaker is not close, and that changes what matters. A complete, labelled delivery with every panel pre-drilled and every hardware bag matched to its cabinet means the job does not stall waiting on one missing part from three hours away.`,
      `Out here a missing bracket is not an inconvenience, it is a fortnight. Everything is packed against a numbered drawing and checked before it leaves, because the cost of getting it wrong is measured in distance rather than dollars.`,
      `Farm houses take a kind of use that suburban kitchens do not — boots, buckets, big cooking, and a back door that is really the front door. The specification we ship assumes that rather than hoping otherwise.`,
    ],
    commuter: [
      `Access is usually the deciding factor here — townhouses, units, narrow hallways, stairs. A flat carton goes where an assembled cabinet cannot, and it is often the only way to get a full kitchen into the room without taking a window out.`,
      `Tight entries, shared driveways and a lift if you are lucky. Measuring the path from the truck to the room matters as much as measuring the room, and it is the question that usually decides flat pack over assembled on these jobs.`,
      `Resale sits behind most kitchens in these suburbs, and a buyer reads a kitchen in about four seconds. What carries that is alignment: even gaps, doors that sit flush, drawers that close themselves. All three are hardware and assembly, not budget.`,
    ],
    lifestyle: [
      `Short-stay and weekender properties get judged on a photograph and then punished by turnover. That combination wants a kitchen that looks like a magazine and behaves like a rental.`,
      `A holiday house has two audiences: the one scrolling listings and the one actually cooking in it at Easter. The first is won on the benchtop and the splashback, the second on drawers that still run properly in year five.`,
      `These kitchens are photographed once and used hard forever after. We would rather put the money into the carcass and the hardware and let the finish do the talking, because the photograph does not get retaken.`,
    ],
    regional: [
      `As the service town for the district, the housing here runs from century-old cottages to new estate builds, and almost none of it suits a catalogue cabinet width. Every run we cut is drawn to the wall it is going on.`,
      `Older housing stock means walls that are not straight and ceilings that are not level, and a catalogue kitchen deals with both by filling the gap with a panel. Cutting to the measured room is the difference between a kitchen that fits and one that has been made to fit.`,
      `A town like this has every decade of Australian housing in it, and each decade has its own kitchen problem. Drawing to the room rather than to a standard width is what lets one supplier handle all of them.`,
    ],
    alpine: [
      `Kitchens here sit cold and closed out of season, then get used hard for a few intense weeks. Temperature cycling like that is what lifts glued edging and loosens cheap hinges.`,
      `A house that is empty and unheated for months and then full for a fortnight puts a kitchen through more movement than a permanent home does. The specification has to assume the empty months, not the busy ones.`,
      `Ski-season turnover is short-stay use at its hardest, on top of a climate that swings further than anywhere else in the state. Board, edge and hardware all have to be chosen for that, and they are.`,
    ],
  };
  const NAT_LEAD = [
    (p, r, k) => `Drawn to your room in Rockhampton and freighted to ${p}, flat packed or delivered assembled. Same board, same Blum hardware, same drawings as every kitchen we build.`,
    (p, r, k) => `A kitchen cut to your measurements rather than picked from catalogue widths, packed flat for the run to ${p} or delivered with the doors already hung and adjusted.`,
    (p, r, k) => `We do not have a showroom in ${p} and we do not need one. Send the measurements, a designer draws it, and you see the drawing and the price before anything is cut.`,
    (p, r, k) => `Every cabinet cut to your wall lengths and ceiling height, pre-drilled, labelled and freighted to ${p} with the hardware bagged against the cabinet it belongs to.`,
    (p, r, k) => `${p} is one freight run from our door in Rockhampton. What arrives is a kitchen drawn for your room, in 18mm moisture-resistant board with Blum hardware throughout.`,
  ];

  function flatPackCityPage(slug, place, opts) {
    const { state, distance, freightMode = 'by road', image, alt, towns, blurb } = opts;
    const ch = Math.abs([...slug].reduce((a, c) => (a * 37 + c.charCodeAt(0)) | 0, 11));
    const cityPicks = [NAT_SECTIONS[ch % 12], NAT_SECTIONS[(ch + 3) % 12], NAT_SECTIONS[(ch + 7) % 12]];
    const faq = [
      { q: `Do you install kitchens in ${place}?`, a: `No. Our installation team works Central Queensland, within about 150 kilometres of Rockhampton — ${place} is ${distance} away. What we ship is the cabinetry itself: cut to your room, packed flat with the hardware and a labelled drawing, and freighted to your door for you or your own installer to build.` },
      { q: `How much does a flat pack kitchen cost, shipped to ${place}?`, a: `The same bands as everywhere else: $15,000&ndash;$23,000 for Essence, $26,000&ndash;$42,000 for Maison, $47,000 and up for Atelier. We do not charge a distance premium on the cabinetry &mdash; freight is quoted separately, to your postcode.` },
      { q: 'Can I upgrade a flat pack kitchen to look more expensive than it was?', a: `Yes &mdash; that is most of what the collections are. Every tier starts from the same 18mm moisture-resistant board and Blum hardware; stone benchtops, brass hardware and integrated lighting are upgrades you add, not a different kitchen. See <a href="/flat-pack-kitchen-upgrades" style="color:var(--brass)">flat pack kitchen upgrades</a> for what each one changes.` },
      { q: `How long does freight to ${place} take?`, a: 'It depends on the kitchen and the freight route, so it is stated on your quote rather than guessed here. Flat cartons move faster and cheaper than assembled carcasses over this kind of distance, which is the main reason we recommend flat pack once a job is outside Queensland.' },
      { q: 'Can I get it delivered assembled instead?', a: `Yes, the quote shows both. Assembled cabinets take more truck space so the freight line is higher; flat pack is what most buyers this far from Rockhampton choose once they see the difference.` },
    ];
    return {
      file: `flat-pack-kitchens-${slug}.html`,
      service: {
        name: `Flat pack kitchen supply and delivery to ${place}`,
        type: 'Flat pack kitchen supply and delivery',
        desc: `Custom flat pack kitchen cabinetry designed in Rockhampton, cut to your room and freighted to ${place}.`,
        areas: towns,
      },
      title: `Flat Pack Kitchens ${place} | Shipped Australia-Wide`,
      desc: `Custom flat pack kitchens cut to your room and freighted to ${place}. 18mm board, Blum hardware, stone and brass upgrades. Fixed itemised quotes.`,
      og: image,
      priority: '0.6',
      faq,
      trail: [['index.html', 'Home'], ['flat-pack-kitchens.html', 'Flat pack kitchens'], [`flat-pack-kitchens-${slug}.html`, place]],
      body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['flat-pack-kitchens.html', 'Flat pack kitchens'], ['#', place]])}
        <span class="pill">Quoted to your drawing &middot; shipped to ${place}</span>
        <h1 class="d1" style="font-size:clamp(2.1rem,4.6vw,3.6rem)">${place}, delivered flat.<br><span class="italic brass">Specified to a standard, not a price.</span></h1>
        <p class="lede">${blurb}</p>
        <div class="answer"><p class="eyebrow">The short answer</p><p>We design and cut every kitchen in Rockhampton, Queensland &mdash; ${state}, ${distance} away. We do not install in ${place}. What we do is exactly what most interstate buyers actually want: a kitchen cut to your measurements, packed flat with the hardware and a labelled drawing, and freighted to your door for you or your installer to build.</p></div>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="/contact">Get my free quote</a>
          <a class="btn btn--ghost btn--lg" href="/flat-pack-kitchen-upgrades">See the upgrade options</a>
        </div>
      </div>
      <div>${frame(image, alt, 'wide', { eager: true })}</div>
    </div>
  </section>

  ${flatPackRouteStrip(place, distance, freightMode)}

  <section class="section">
    <div class="wrap split" style="align-items:start">
      <div>
        <div ${rv()} style="margin-bottom:2.25rem">
          <h2 class="d3">Affordable to start, not to look at</h2>
          <p class="mt-1 muted">Essence, our entry collection, starts at $15,000 flat packed &mdash; 18mm moisture-resistant carcasses, laser-bonded edging and Blum soft-close hardware, the same board and hinges as our $47,000 Atelier kitchens. What changes between the collections is the finish, not the bones underneath it. If you want it to read as more than it cost, the upgrade path is short and itemised: stone benchtop, brass hardware, integrated lighting. Nothing about starting affordable means staying there.</p>
        </div>
        <div ${rv()} data-rv-d="2" style="margin-bottom:2.25rem">
          <h2 class="d3">What arrives in ${place}</h2>
          <p class="mt-1 muted">Cartons labelled to a numbered drawing, one per cabinet where possible. Doors and drawer fronts wrapped separately. Blum hinges, runners and adjustable legs bagged per cabinet. Kickboards, end panels and fillers cut to length. A dimensioned drawing with every cabinet numbered, plus the service drawing your plumber and electrician rough in from.</p>
        </div>
        <div ${rv()} data-rv-d="3" style="margin-bottom:2.25rem">
          <h2 class="d3">Why flat pack over this distance</h2>
          <p class="mt-1 muted">A carton of panels travels for a fraction of what an assembled carcass costs to freight, and it survives the trip better &mdash; nothing to rack or rattle loose over ${distance}. It is the same reason builders and owner-builders this far from any manufacturer already order cabinetry this way. Assembled is still on the quote if you would rather; you can see what the assembly is actually worth to you before you choose.</p>
        </div>
        ${cityPicks.map((sec, i) => `
        <div ${rv()} data-rv-d="${i + 1}" style="margin-bottom:2.25rem">
          <h2 class="d3">${sec[0].replace('${p}', place)}</h2>
          <p class="mt-1 muted">${sec[1](place)}</p>
        </div>`).join('')}
        <div ${rv()}>
          <h2 class="d3">Freight, quoted honestly</h2>
          <p class="mt-1 muted">Freight to ${place} is quoted to your postcode on the same document as the cabinetry &mdash; its own line, not folded into the price. We would rather you see the real number than a from-price that never survives checkout. Our <a href="/guide-flat-pack-kitchen-shipping-and-freight" style="color:var(--brass)">shipping &amp; freight guide</a> covers what decides that number and what to check on delivery day.</p>
        </div>
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">${place}</span>
          <div class="tier__price" style="font-size:clamp(1.5rem,2.4vw,2rem)">From $15,000<small>Flat packed, freighted to ${place}</small></div>
          <ul>
            <li>Designed to your measurements in Rockhampton</li>
            <li>18mm moisture-resistant board, Blum lifetime hardware</li>
            <li>Packed flat, pre-drilled and labelled per cabinet</li>
            <li>Stone, brass and lighting upgrades available</li>
            <li>Fixed, itemised quote, freight shown as its own line</li>
            <li class="no">Installation not offered in ${place}</li>
          </ul>
          <a class="btn btn--block" href="/contact">Get my free quote</a>
        </div>
        <p class="small muted mt-2">We ship flat pack kitchens to every state and territory capital, plus major regional centres &mdash; see the <a href="/flat-pack-kitchens" style="color:var(--brass)">full list</a>, or read <a href="/guide-flat-pack-kitchen-shipping-and-freight" style="color:var(--brass)">how shipping and freight actually works</a>.</p>
        <p class="small muted mt-2">Want it to feel like a bigger budget? <a href="/flat-pack-kitchen-upgrades" style="color:var(--brass)">Flat pack kitchen upgrades</a> &mdash; what stone, brass and lighting actually add.</p>
      </div>
    </div>
  </section>

  ${faqBlock(faq, `${place} — questions`)}
  ${ctaBand({ eyebrow: place, title: 'Send us the dimensions.<br><span class="italic" style="color:var(--brass-lite)">We will send back a number.</span>', body: `A fixed, itemised quote freighted to ${place}, with nothing hidden in it. If the number does not work for you, you owe us nothing and you keep the drawings.` })}
`,
    };
  }

  const flatPackCityPages = [
    flatPackCityPage('sydney', 'Sydney', {
      state: 'NSW', distance: 'about 1,650 kilometres',
      image: 'collection-marble-04', alt: 'Oak and marble kitchen with island seating, shipped flat pack to Sydney',
      towns: [['Sydney', 'New South Wales'], ['Parramatta', 'New South Wales'], ['Newcastle', 'New South Wales'], ['Wollongong', 'New South Wales']],
      blurb: 'Sydney has no shortage of kitchen companies, and we are not pretending to be one of them. What we ship here is the cabinetry itself: cut to your room in Rockhampton, packed flat, and freighted to your door.',
    }),
    flatPackCityPage('melbourne', 'Melbourne', {
      state: 'VIC', distance: 'about 2,300 kilometres',
      image: 'signature-dark', alt: 'Dark navy kitchen with leather bar seating, shipped flat pack to Melbourne',
      towns: [['Melbourne', 'Victoria'], ['Geelong', 'Victoria'], ['Ballarat', 'Victoria']],
      blurb: 'Renovators and builders across Melbourne already order cabinetry supply-only from interstate manufacturers. We cut it in Rockhampton, pack it flat, and freight it to your address.',
    }),
    flatPackCityPage('perth', 'Perth', {
      state: 'WA', distance: 'about 4,900 kilometres',
      image: 'timber-island', alt: 'Timber-fronted island kitchen with stone top, shipped flat pack to Perth',
      towns: [['Perth', 'Western Australia'], ['Fremantle', 'Western Australia'], ['Mandurah', 'Western Australia']],
      blurb: 'The furthest run we ship, and the clearest case for flat pack over assembled: a carton crosses the country for a fraction of what an assembled carcass costs to freight.',
    }),
    flatPackCityPage('adelaide', 'Adelaide', {
      state: 'SA', distance: 'about 2,600 kilometres',
      image: 'black-marble-bar', alt: 'Black cabinetry kitchen with marble bar top, shipped flat pack to Adelaide',
      towns: [['Adelaide', 'South Australia'], ['Mount Barker', 'South Australia']],
      blurb: 'Cut to your room in Rockhampton and freighted flat to Adelaide, with the same specification as every kitchen we build for our own team to install.',
    }),
    flatPackCityPage('canberra', 'Canberra', {
      state: 'ACT', distance: 'about 1,850 kilometres',
      image: 'concrete-luxe', alt: 'Concrete-look kitchen with matte black fixtures, shipped flat pack to Canberra',
      towns: [['Canberra', 'Australian Capital Territory'], ['Queanbeyan', 'New South Wales']],
      blurb: 'New builds and renovations across Canberra take a flat-packed kitchen well &mdash; cartons move through a standard doorway or lift where an assembled carcass will not.',
    }),
    flatPackCityPage('hobart', 'Hobart', {
      state: 'TAS', distance: 'about 3,000 kilometres', freightMode: 'by road and sea freight',
      image: 'galley-stone', alt: 'Compact galley kitchen with stone benchtop, shipped flat pack to Hobart',
      towns: [['Hobart', 'Tasmania'], ['Launceston', 'Tasmania']],
      blurb: 'Freight to Tasmania crosses Bass Strait, which is exactly the leg where an assembled carcass gets expensive and a flat carton does not.',
    }),
    flatPackCityPage('darwin', 'Darwin', {
      state: 'NT', distance: 'about 3,000 kilometres',
      image: 'matte-black-bank', alt: 'Bank of matte black tall cabinets, shipped flat pack to Darwin',
      towns: [['Darwin', 'Northern Territory'], ['Palmerston', 'Northern Territory']],
      blurb: 'Builders fitting out granny flats, units and new builds across Darwin already work supply-only. We cut the kitchen in Rockhampton, pack it flat, and freight it north.',
    }),
    flatPackCityPage('gold-coast', 'the Gold Coast', {
      state: 'QLD', distance: 'about 680 kilometres',
      image: 'collection-marble-03', alt: 'Light oak kitchen run with stone benchtop, shipped flat pack to the Gold Coast',
      towns: [['Gold Coast', 'Queensland'], ['Robina', 'Queensland'], ['Coolangatta', 'Queensland']],
      blurb: 'The Gold Coast has its renovation trade covered. What it does not always have is a supplier willing to cut a kitchen to a granny flat, unit or DIY build and ship it flat &mdash; which is exactly what we do.',
    }),
    flatPackCityPage('newcastle', 'Newcastle', {
      state: 'NSW', distance: 'about 1,350 kilometres',
      image: 'dark-dining', alt: 'Dark timber kitchen and dining space with feature lighting, shipped flat pack to Newcastle',
      towns: [['Newcastle', 'New South Wales'], ['Maitland', 'New South Wales'], ['Lake Macquarie', 'New South Wales']],
      blurb: 'Cut in Rockhampton and freighted flat to Newcastle &mdash; the same specification whether it is going into a family reno or a builder’s spec unit.',
    }),
    flatPackCityPage('wollongong', 'Wollongong', {
      state: 'NSW', distance: 'about 1,750 kilometres',
      image: 'splashback-marble-01', alt: 'Marble splashback behind a cooktop, shipped flat pack to Wollongong',
      towns: [['Wollongong', 'New South Wales'], ['Shellharbour', 'New South Wales'], ['Kiama', 'New South Wales']],
      blurb: 'Owner-builders and renovators around Wollongong already order cabinetry supply-only from interstate. Flat pack is the version that makes sense at this distance.',
    }),
    flatPackCityPage('townsville', 'Townsville', {
      state: 'QLD', distance: 'about 630 kilometres',
      image: 'detail-stone-black', alt: 'Black stone benchtop detail with concealed storage, shipped flat pack to Townsville',
      towns: [['Townsville', 'Queensland'], ['Thuringowa', 'Queensland'], ['Ayr', 'Queensland']],
      blurb: 'North Queensland building and defence-housing turnover both run on supply-only cabinetry. We cut it in Rockhampton and freight it up the coast.',
    }),
    flatPackCityPage('cairns', 'Cairns', {
      state: 'QLD', distance: 'about 970 kilometres',
      image: 'island-calacatta', alt: 'Calacatta stone island kitchen, shipped flat pack to Cairns',
      towns: [['Cairns', 'Queensland'], ['Port Douglas', 'Queensland'], ['Atherton', 'Queensland']],
      blurb: 'Far North Queensland builds carry their own freight costs regardless of supplier, so the flat-pack saving matters more here than almost anywhere else we ship.',
    }),
    flatPackCityPage('geelong', 'Geelong', {
      state: 'VIC', distance: 'about 2,260 kilometres',
      image: 'openplan-long', alt: 'Long open-plan kitchen run with stone benchtop, shipped flat pack to Geelong',
      towns: [['Geelong', 'Victoria'], ['Torquay', 'Victoria'], ['Bellarine Peninsula', 'Victoria']],
      blurb: 'Close enough to Melbourne to share its freight route, and its own growing renovation market besides. Cut in Rockhampton, packed flat, freighted to your door.',
    }),
    flatPackCityPage('toowoomba', 'Toowoomba', {
      state: 'QLD', distance: 'about 450 kilometres',
      image: 'collection-marble-02', alt: 'Marble splashback with brass wall lights above an oak kitchen run, shipped flat pack to Toowoomba',
      towns: [['Toowoomba', 'Queensland'], ['Highfields', 'Queensland'], ['Oakey', 'Queensland']],
      blurb: 'One of the closer runs we ship, and still outside our installation radius &mdash; which is exactly the case flat pack is built for: full specification, none of the freight penalty.',
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
          <a class="btn btn--lg" href="/contact">Get my free quote</a>
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
          <a class="btn btn--lg" href="/contact">Get my free quote</a>
        </aside>
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">${place}</span>
          <div class="tier__price" style="font-size:clamp(1.5rem,2.4vw,2rem)">${price}<small>${range}</small></div>
          <ul>${opts.list.map((x) => `<li>${x}</li>`).join('')}</ul>
          <a class="btn btn--block" href="/contact">Get my free quote</a>
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
      list: ['2.4m to 3.0m runs, drawn to your dimensions', 'Moisture-resistant carcasses for coastal humidity', 'Blum hardware with a lifetime mechanical warranty', 'Stone, porcelain or laminate benchtop', 'Installed by our own team, forty minutes away', 'Delivered assembled, doors adjusted before it arrives'],
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
      title: 'Under House Kitchens Rockhampton | High-Set Conversions',
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
      list: ['2.4m to 3.0m runs, drawn to your dimensions', 'Specified for tenant turnover, not first impressions', 'Moisture-resistant carcasses, laser-bonded edging', 'Blum hardware with a lifetime mechanical warranty', 'Installed by our own team', 'Delivered assembled, doors adjusted before it arrives'],
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
      title: 'New Build Kitchens Gracemere | Upgrade the Standard',
      desc: 'Upgrading from the builder&rsquo;s standard kitchen in a Gracemere new build. Fixed pricing, service drawings for your trades, delivered to your programme.',
      h1: 'The kitchen your builder<br><span class="italic brass">did not quote you.</span>',
      lede: 'Gracemere is one of the busiest new-build postcodes on our board, and the standard kitchen in most contracts is chosen to hit a price.',
      answer: `You can usually take the kitchen out of the builder’s contract as a provisional sum and have it done properly instead — but raise it early, ideally before the slab, while services can still move cheaply. From $15,000. Gracemere is fifteen minutes from us.`,
      price: 'From $15,000', range: 'Full kitchen, new build', image: 'collection-marble-01',
      alt: 'Open plan new build kitchen with island bench, Gracemere',
      parentSeg: '/new-build-kitchens', parentSegLabel: 'New build kitchens',
      parentTown: '/kitchens-gracemere', parentTownLabel: 'kitchens in Gracemere',
      council: ROCKY_C,
      list: ['Fixed, itemised pricing before you commit', 'Service drawings for your builder’s trades', 'Delivered to your construction programme', 'Blum hardware and moisture-resistant carcasses', 'Fifteen minutes from our door', 'Delivered assembled, doors adjusted before it arrives'],
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

  ${(() => {
    const key = Object.keys(GUIDE_SERIES).find((k) => GUIDE_SERIES[k].includes(g.slug));
    if (!key) return '';
    const sibs = GUIDE_SERIES[key].filter((x) => x !== g.slug).map((x) => GUIDES.find((y) => y.slug === x)).filter(Boolean);
    if (!sibs.length) return '';
    return `<section class="section--tight"><div class="wrap"><div class="legal">
      <p class="eyebrow">${SERIES_NAMES[key]}</p>
      <p class="small muted" style="margin:.5rem 0 0">More in this series: ${sibs.map((y) => `<a href="/guide-${y.slug}" style="color:var(--brass)">${y.nav}</a>`).join(' &middot; ')}.</p>
    </div></div></section>`;
  })()}

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

  /* ============================================ national coverage layer */
  /* State -> region -> town. Each town page carries its own H1, lead, the
     climate argument for its zone, the housing-stock paragraph for its type,
     its state's licensing body, and links up to its region and state and
     across to its neighbours. Nothing is asserted that we cannot check. */
  const NAT = require('./_towns.js');

  const natImg = (seed, pool) => pool[Math.abs([...seed].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7)) % pool.length];
  const HERO_LIGHT = ['collection-marble-01', 'collection-marble-03', 'openplan-long', 'galley-stone', 'island-marble-brass', 'collection-marble-04'];
  const HERO_DARK = ['dark-island', 'signature-dark', 'glossy-dark', 'matte-black-bank', 'dark-luxe-bar', 'concrete-luxe'];
  const heroFor = (seed, kind) => natImg(seed, ['mining', 'commuter', 'regional'].includes(kind) ? HERO_DARK : HERO_LIGHT);

  const orderCta = (place) => `
  <section class="section--tight">
    <div class="wrap">
      <div class="offer" ${rv()}>
        <div class="offer__grid">
          <div>
            <span class="pill" style="background:rgba(201,160,90,.16);color:var(--brass-lite)">Ordering from ${place}</span>
            <h2 class="d2">No showroom. No account.<br><span class="italic" style="color:var(--brass-lite)">A person draws it.</span></h2>
            <p class="lede" style="margin-top:1.25rem">Send the wall lengths, the ceiling height and a photo of each corner. A designer draws your kitchen to the room and sends the drawing back with a fixed, itemised quote &mdash; flat packed and delivered assembled, freight to your postcode on each.</p>
            <ul class="list-check mt-2">
              <li>Nothing to pay to see the drawing or the quote</li>
              <li>Changes redrawn until the plan is right</li>
              <li>Cut only after you sign the drawing off</li>
              <li>Freight quoted as its own line, never folded in</li>
            </ul>
          </div>
          <div>
            <a class="btn btn--brass btn--lg btn--block" href="/contact">Get my free quote<span class="btn__sub">No deposit &middot; No showroom visit &middot; No salesperson at your door</span></a>
            <a class="btn btn--light btn--lg btn--block" href="/guide-how-to-order-a-flat-pack-kitchen" style="margin-top:.75rem">Read the ordering guide</a>
            <p class="small" style="color:#A39B8D;margin-top:1rem;text-align:center">Or call <a href="tel:${SITE.phoneHref}" style="color:var(--brass-lite)">${SITE.phone}</a> &mdash; you get the person who designs it.</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  function natSpecStrip(climate, v) {
    const copy = CLIM_VAR[climate][(v || 0) % 3];
    return `
  <section class="section bg-2">
    <div class="wrap split" style="align-items:start">
      <div>
        <p class="eyebrow" ${rv()}>The specification</p>
        <h2 class="d2" ${rv()} data-rv-d="1">Built for this<br>climate, not a catalogue.</h2>
        <p class="muted mt-2" ${rv()} data-rv-d="2">${copy}</p>
        <p class="small muted mt-2" ${rv()} data-rv-d="3">The same three questions decide any kitchen anywhere: board thickness and moisture rating, edging method, hardware brand. Ours are 18mm moisture-resistant, laser-bonded and Blum, and they are printed on every quote. <a href="/guide-are-flat-pack-kitchens-good-quality" style="color:var(--brass)">How to judge a flat pack</a>.</p>
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">Standard on everything</span>
          <ul>
            <li>18mm moisture-resistant board</li>
            <li>Laser-bonded edging, no glue line</li>
            <li>Blum soft-close hinges and runners</li>
            <li>Cut to your drawing, not catalogue widths</li>
            <li>Pre-drilled and labelled per cabinet</li>
            <li>Fixed itemised quote, freight its own line</li>
          </ul>
          <a class="btn btn--block" href="/flat-pack-kitchens">See flat pack kitchens</a>
        </div>
      </div>
    </div>
  </section>`;
  }


  /* ------------------------------------------------------------- towns */
  function townPage(town, region, idx) {
    const [slug, place, kind] = town;
    const stateInfo = NAT.STATES[region.state];
    const sibs = region.towns.filter((t) => t[0] !== slug);
    const hero = heroFor(slug, kind);
    // Three of the twelve sections, chosen by the town's own slug so the
    // choice is stable between builds but different from its neighbours.
    const h = Math.abs([...slug].reduce((a, c) => (a * 33 + c.charCodeAt(0)) | 0, 5)) + idx * 7;
    const picks = [NAT_SECTIONS[h % 12], NAT_SECTIONS[(h + 4 + (idx % 3)) % 12], NAT_SECTIONS[(h + 8 + (idx % 5)) % 12]];
    const h1 = NAT_H1[(h + idx) % NAT_H1.length](place);
    const answer = NAT_ANSWER[(h + idx) % NAT_ANSWER.length](place, region);
    const faq = [
      { q: `Do you deliver flat pack kitchens to ${place}?`, a: `Yes. ${place} is served ${region.route}, and freight is quoted to your postcode as its own line on the quote rather than folded into the cabinetry price.` },
      { q: `Do you install kitchens in ${place}?`, a: `No. Our own installation team works Central Queensland only. In ${place} your builder, carpenter or kitchen installer fits it, working from the dimensioned service drawings that ship with every order. Our install guide covers the three trades and the order they work in.` },
      { q: `Should I order flat pack or assembled to ${place}?`, a: `Both are quoted on the same drawing. Flat cartons ship for less and get through tight doorways; assembled arrives with carcasses built and doors adjusted so your installer is fitting rather than building. Over this distance most ${region.name} orders go flat.` },
      { q: `Who can do the plumbing and electrical in ${place}?`, a: `A licensed plumber and a licensed electrician, and you should check both licences yourself before they start. In ${stateInfo.name}, ${stateInfo.body} is the register to check against.` },
      { q: `What board and hardware do you use?`, a: `18mm moisture-resistant board, laser-bonded edging and Blum soft-close hinges and runners on every cabinet, in every state. The specification is printed on your quote so you can hold it against anything else you are offered.` },
      [
        { q: `How long will a ${place} order take?`, a: `It depends on the kitchen and the freight route, so it is stated on your quote for your job rather than guessed here. What you can plan around is the sequence: drawing, your sign-off, cutting, then freight.` },
        { q: `Can I see a sample before ordering in ${place}?`, a: `Yes. Door, board and edging samples are posted out, and for most people that settles the colour question better than a screen does. Ask when you send the dimensions through.` },
        { q: `Is there a deposit to get a ${place} quote?`, a: `No. The drawing and the itemised quote cost nothing and carry no obligation. Payment terms for the order itself are stated on that quote.` },
      ][(h + idx) % 3],
    ];
    return {
      file: `flat-pack-kitchens-${slug}.html`,
      assembled: 'supply',
      service: {
        name: `Flat pack kitchen supply and delivery to ${place}`,
        type: 'Flat pack kitchen supply and delivery',
        desc: `Custom flat pack and assembled kitchen cabinetry cut to your room in Rockhampton and freighted to ${place}, ${region.state}.`,
        areas: [place, region.name],
      },
      title: `Flat Pack Kitchens ${place} ${region.state} | Delivered`,
      desc: `Flat pack and assembled kitchens delivered to ${place}, ${region.state}. Cut to your measurements in 18mm board with Blum hardware. Fixed itemised quotes.`,
      og: hero,
      priority: '0.5',
      faq,
      trail: [['index.html', 'Home'], ['flat-pack-kitchens.html', 'Flat pack kitchens'], [`flat-pack-kitchens-${stateInfo.slug}.html`, stateInfo.name], [`flat-pack-kitchens-${region.slug}.html`, region.name], [`flat-pack-kitchens-${slug}.html`, place]],
      body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], [`flat-pack-kitchens-${stateInfo.slug}.html`, stateInfo.name], [`flat-pack-kitchens-${region.slug}.html`, region.name], ['#', place]])}
        <span class="pill">Cut to your drawing &middot; freighted to ${place}</span>
        <h1 class="d1" style="font-size:clamp(2.1rem,4.6vw,3.6rem)">${h1}</h1>
        <p class="lede">${NAT_LEAD[(h + idx) % NAT_LEAD.length](place, region, kind)}</p>
        <div class="answer"><p class="eyebrow">The short answer</p><p>${answer}</p></div>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="/contact">Get my free quote</a>
          <a class="btn btn--ghost btn--lg" href="/guide-how-to-order-a-flat-pack-kitchen">How ordering works</a>
        </div>
      </div>
      <div>${frame(hero, `Custom flat pack kitchen cabinetry delivered to ${place}, ${region.state}`, 'wide', { eager: true })}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split" style="align-items:start">
      <div>
        <div ${rv()} style="margin-bottom:2.25rem">
          <h2 class="d3">${['What ${p} housing does to a kitchen', 'The brief ${p} actually sets', 'What a kitchen is up against in ${p}'][(h + idx) % 3].replace('${p}', place)}</h2>
          <p class="mt-1 muted">${KIND_VAR[kind][(h + idx) % 3]} ${region.context}</p>
        </div>
        <div ${rv()} data-rv-d="2" style="margin-bottom:2.25rem">
          <h2 class="d3">${['How it reaches ${p}', 'Getting it to ${p}', 'The run to ${p}'][(h + idx + 1) % 3].replace('${p}', place)}</h2>
          <p class="mt-1 muted">Your kitchen is cut in Rockhampton and freighted ${region.route}. Flat cartons are labelled to a numbered drawing, one per cabinet where possible, with doors and fronts wrapped separately and the Blum hardware bagged against the cabinet it belongs to. Assembled orders arrive as finished boxes, doors hung and adjusted, which takes more truck space and shows as a higher freight line. Both are on the same quote so the choice is a number rather than a guess.</p>
        </div>
        <div ${rv()} data-rv-d="3" style="margin-bottom:2.25rem">
          <h2 class="d3">Who fits it in ${place}</h2>
          <p class="mt-1 muted">Your builder, carpenter or kitchen installer, plus a licensed plumber and a licensed electrician for their parts. Ask each for a licence number and check it yourself &mdash; in ${stateInfo.name} that is <a href="${stateInfo.url}" rel="noopener" target="_blank" style="color:var(--brass)">${stateInfo.body}</a>. Every order ships with dimensioned service drawings showing each waste, water point and outlet, so the trades rough in to the plan rather than to a guess. Our <a href="/guide-how-to-install-a-supplied-kitchen" style="color:var(--brass)">install guide</a> sets out the three trades and the fixed order they work in.</p>
        </div>
        ${picks.map((sec, i) => `
        <div ${rv()} data-rv-d="${i + 2}" style="margin-bottom:2.25rem">
          <h2 class="d3">${sec[0].replace('${p}', place)}</h2>
          <p class="mt-1 muted">${sec[1](place)}</p>
        </div>`).join('')}
        <div ${rv()} data-rv-d="4">
          <h2 class="d3">Around ${region.name}</h2>
          <p class="mt-1 muted">We ship to ${sibs.slice(0, 8).map((t) => `<a href="/flat-pack-kitchens-${t[0]}" style="color:var(--brass)">${t[1]}</a>`).join(', ')}${sibs.length > 8 ? ' and the rest of the region' : ''} on the same route. The <a href="/flat-pack-kitchens-${region.slug}" style="color:var(--brass)">${region.name} page</a> covers the region, and <a href="/flat-pack-kitchens-${stateInfo.slug}" style="color:var(--brass)">${stateInfo.name}</a> covers the state.</p>
        </div>
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">${place}, ${region.state}</span>
          <div class="tier__price" style="font-size:clamp(1.5rem,2.4vw,2rem)">From $15,000<small>Flat packed, freighted to ${place}</small></div>
          <ul>
            <li>Drawn to your measurements, not catalogue widths</li>
            <li>18mm moisture-resistant board, laser-bonded edging</li>
            <li>Blum soft-close hinges and full-extension runners</li>
            <li>Pre-drilled and labelled per cabinet</li>
            <li>Service drawings for your plumber and electrician</li>
            <li>Fixed itemised quote, freight its own line</li>
            <li class="no">Installation not offered in ${place}</li>
          </ul>
          <a class="btn btn--block" href="/contact">Get my free quote</a>
        </div>
        <p class="small muted mt-2">Kitchenettes for a granny flat, studio or short-stay unit start at $4,500 &mdash; see <a href="/flat-pack-kitchenettes" style="color:var(--brass)">flat pack kitchenettes</a>.</p>
        <p class="small muted mt-2">Building a second dwelling? <a href="/guide-${stateInfo.slug === 'act' ? 'secondary-residence-rules-act' : 'granny-flat-rules-' + (stateInfo.slug === 'queensland' ? 'qld' : stateInfo.slug === 'northern-territory' ? 'nt' : stateInfo.slug === 'south-australia' ? 'sa' : stateInfo.slug === 'western-australia' ? 'wa' : stateInfo.slug)}" style="color:var(--brass)">Granny flat rules in ${stateInfo.name}</a>.</p>
      </div>
    </div>
  </section>

  ${natSpecStrip(region.climate, idx)}
  ${orderCta(place)}
  ${faqBlock(faq, `${place} &mdash; questions`)}
  ${ctaBand({ eyebrow: `${place}, ${region.state}`, title: 'Send us the dimensions.<br><span class="italic" style="color:var(--brass-lite)">We will send back a number.</span>', body: `A fixed, itemised quote for your ${place} kitchen, flat packed and delivered assembled, with freight to your postcode on each. Nothing to pay to see it.`, image: natImg(slug + 'cta', HERO_DARK), alt: `Kitchen cabinetry freighted to ${place}` })}
`,
    };
  }

  /* ------------------------------------------------------------ regions */
  function regionPage(region) {
    const stateInfo = NAT.STATES[region.state];
    const faq = [
      { q: `Do you deliver flat pack kitchens across ${region.name}?`, a: `Yes, to every town in the region ${region.route}. Freight is quoted to your postcode on the same document as the cabinetry, as its own line.` },
      { q: `Do you install in ${region.name}?`, a: `No. Installation is Central Queensland only. Everywhere else your own builder or installer fits it from the dimensioned drawings that ship with the order.` },
      { q: `Is the specification different this far from Rockhampton?`, a: `No. 18mm moisture-resistant board, laser-bonded edging and Blum hardware on every cabinet, in every state. What changes with distance is the freight line, which is why most orders out here go flat packed.` },
    ];
    return {
      file: `flat-pack-kitchens-${region.slug}.html`,
      assembled: 'supply',
      service: {
        name: `Flat pack kitchen supply to ${region.name}`,
        type: 'Flat pack kitchen supply and delivery',
        desc: `Custom flat pack and assembled kitchens freighted to ${region.name}, ${region.state}.`,
        areas: region.towns.map((t) => t[1]).concat([region.name]),
      },
      title: `Flat Pack Kitchens ${region.name.replace(/^the /, '').replace(/ and the North West| and Kangaroo Island| and Big Rivers/, '')} | Delivered`,
      desc: `Flat pack and assembled kitchens delivered across ${region.name}, ${region.state}. Cut to your measurements in 18mm board with Blum hardware.`,
      og: natImg(region.slug, HERO_LIGHT),
      priority: '0.6',
      faq,
      trail: [['index.html', 'Home'], ['flat-pack-kitchens.html', 'Flat pack kitchens'], [`flat-pack-kitchens-${stateInfo.slug}.html`, stateInfo.name], [`flat-pack-kitchens-${region.slug}.html`, region.name]],
      body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], [`flat-pack-kitchens-${stateInfo.slug}.html`, stateInfo.name], ['#', region.name]])}
        <span class="pill">${region.towns.length} towns &middot; freighted ${region.route}</span>
        <h1 class="d1" style="font-size:clamp(2.1rem,4.6vw,3.6rem)">Flat pack kitchens<br><span class="italic brass">across ${region.name}.</span></h1>
        <p class="lede">${region.context}</p>
        <div class="answer"><p class="eyebrow">The short answer</p><p>Every kitchen is drawn and cut to your room in Rockhampton and freighted ${region.route} to anywhere in ${region.name}. Flat packed, or delivered assembled with the doors hung and adjusted &mdash; the quote shows both, with freight to your postcode on each. Installation is by your own builder or installer, working from our drawings.</p></div>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="/contact">Get my free quote</a>
          <a class="btn btn--ghost btn--lg" href="/guide-how-to-order-a-flat-pack-kitchen">How ordering works</a>
        </div>
      </div>
      <div>${frame(natImg(region.slug, HERO_LIGHT), `Custom kitchen cabinetry delivered across ${region.name}`, 'wide', { eager: true })}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>Towns we ship to</p>
      <h2 class="d2" ${rv()} data-rv-d="1">${region.name.charAt(0).toUpperCase() + region.name.slice(1)},<br>town by town.</h2>
      <div class="grid cols-4 mt-3">
        ${region.towns.map((t, i) => `<a class="card" href="/flat-pack-kitchens-${t[0]}" ${rv()} data-rv-d="${(i % 4) + 1}"><div class="card__body"><h3 class="d4">${t[1]}</h3><p class="small muted" style="margin:0">Flat pack &amp; assembled kitchens, freighted to ${t[1]}.</p><span class="link-u mt-1">See ${t[1]} &rarr;</span></div></a>`).join('')}
      </div>
      <p class="small muted mt-3" ${rv()}>Not listed? We ship to every postcode in ${stateInfo.name} &mdash; <a href="/flat-pack-kitchens-${stateInfo.slug}" style="color:var(--brass)">see the ${stateInfo.name} page</a> or send your dimensions and we will quote the freight to you.</p>
    </div>
  </section>

  ${natSpecStrip(region.climate, 2)}
  ${orderCta(region.name)}
  ${faqBlock(faq, `${region.name} &mdash; questions`)}
  ${ctaBand({ eyebrow: region.name, title: 'Send us the dimensions.<br><span class="italic" style="color:var(--brass-lite)">We will send back a number.</span>', body: `A fixed, itemised quote freighted anywhere in ${region.name}, flat packed or delivered assembled.`, image: natImg(region.slug + 'c', HERO_DARK), alt: `Kitchen cabinetry freighted to ${region.name}` })}
`,
    };
  }

  /* ------------------------------------------------------------- states */
  function statePage(code) {
    const st = NAT.STATES[code];
    const regions = NAT.REGIONS.filter((r) => r.state === code);
    const townCount = regions.reduce((n, r) => n + r.towns.length, 0);
    const faq = [
      { q: `Do you deliver flat pack kitchens to ${st.name}?`, a: `Yes, to every postcode. Kitchens are cut to your drawing in Rockhampton and freighted across, flat packed or delivered assembled, with freight quoted to your postcode as its own line.` },
      { q: `Do you install kitchens in ${st.name}?`, a: `No. Our own team installs in Central Queensland only. In ${st.name} your builder, carpenter or kitchen installer fits it from the dimensioned service drawings that ship with the order.` },
      { q: `Who do I check a tradesperson's licence with in ${st.name}?`, a: `${st.body}. Ask for the licence number and look it up yourself before anyone starts, and ask for evidence of insurance at the same time.` },
      { q: `Can I order without visiting a showroom?`, a: `That is the only way we work. Send the room dimensions and photos, a designer draws it, and you get the drawing and a fixed itemised quote back. Nothing is due to see either, and nothing is cut until you sign the drawing off.` },
    ];
    return {
      file: `flat-pack-kitchens-${st.slug}.html`,
      assembled: 'supply',
      service: {
        name: `Flat pack kitchen supply and delivery to ${st.name}`,
        type: 'Flat pack kitchen supply and delivery',
        desc: `Custom flat pack and assembled kitchens cut to your room and freighted anywhere in ${st.name}.`,
        areas: regions.map((r) => r.name),
      },
      title: `Flat Pack Kitchens ${st.name.replace(/^the /, '')} | Delivered`,
      desc: `Flat pack and assembled kitchens delivered anywhere in ${st.name}. Cut to your measurements in 18mm board with Blum hardware, fixed itemised quotes.`,
      og: natImg(st.slug, HERO_LIGHT),
      priority: '0.7',
      faq,
      trail: [['index.html', 'Home'], ['flat-pack-kitchens.html', 'Flat pack kitchens'], [`flat-pack-kitchens-${st.slug}.html`, st.name]],
      body: `
  <section class="phero">
    <div class="wrap phero__grid">
      <div>
        ${crumbs([['index.html', 'Home'], ['flat-pack-kitchens.html', 'Flat pack kitchens'], ['#', st.name]])}
        <span class="pill">${regions.length} regions &middot; ${townCount} towns &middot; every postcode</span>
        <h1 class="d1" style="font-size:clamp(2.1rem,4.6vw,3.6rem)">Flat pack kitchens<br><span class="italic brass">delivered across ${st.name}.</span></h1>
        <p class="lede">Cut to your room in Rockhampton and freighted to your door &mdash; flat packed, or delivered assembled with the doors already hung and adjusted. Same board, same Blum hardware, same drawings, wherever in ${st.name} it lands.</p>
        <div class="answer"><p class="eyebrow">The short answer</p><p>We supply, we do not install outside Central Queensland. You get a kitchen drawn to your measurements, a fixed itemised quote with freight on its own line, and dimensioned service drawings your plumber and electrician rough in from. Licences in ${st.name} are checked with ${st.body}.</p></div>
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="btn btn--lg" href="/contact">Get my free quote</a>
          <a class="btn btn--ghost btn--lg" href="/guide-how-to-order-a-flat-pack-kitchen">How ordering works</a>
        </div>
      </div>
      <div>${frame(natImg(st.slug, HERO_LIGHT), `Custom kitchen cabinetry delivered across ${st.name}`, 'wide', { eager: true })}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow" ${rv()}>Where we ship in ${st.name}</p>
      <h2 class="d2" ${rv()} data-rv-d="1">Every region,<br>every postcode.</h2>
      <div class="grid cols-3 mt-3">
        ${regions.map((r, i) => `<a class="card" href="/flat-pack-kitchens-${r.slug}" ${rv()} data-rv-d="${(i % 3) + 1}"><div class="card__body"><h3 class="d4">${r.name.charAt(0).toUpperCase() + r.name.slice(1)}</h3><p class="small muted" style="margin:0">${r.towns.slice(0, 4).map((t) => t[1]).join(', ')}${r.towns.length > 4 ? ' and more' : ''}.</p><span class="link-u mt-1">See the region &rarr;</span></div></a>`).join('')}
      </div>
    </div>
  </section>

  <section class="section bg-2">
    <div class="wrap split" style="align-items:start">
      <div>
        <p class="eyebrow" ${rv()}>Trades and approvals</p>
        <h2 class="d2" ${rv()} data-rv-d="1">What is different<br>about ${st.name}.</h2>
        <p class="muted mt-2" ${rv()} data-rv-d="2">The cabinetry is identical in every state. What changes is who licenses the trades who connect it and who assesses a second dwelling if you are building one. In ${st.name}, plumbing and electrical licences are checked with <a href="${st.url}" rel="noopener" target="_blank" style="color:var(--brass)">${st.body}</a>. Ask for the number, look it up yourself, and ask for evidence of insurance at the same time &mdash; it takes a minute and an unlicensed connection can fail an inspection, void an insurance claim and surface in a building report when you sell.</p>
        <p class="muted mt-2" ${rv()} data-rv-d="3">If the kitchen is going into a granny flat, studio or secondary dwelling, the planning rules are set by your council under the state framework and they change. <a href="/guide-${st.slug === 'act' ? 'secondary-residence-rules-act' : 'granny-flat-rules-' + (st.slug === 'queensland' ? 'qld' : st.slug === 'northern-territory' ? 'nt' : st.slug === 'south-australia' ? 'sa' : st.slug === 'western-australia' ? 'wa' : st.slug)}" style="color:var(--brass)">Granny flat rules in ${st.name}</a> covers what to check before you design anything.</p>
      </div>
      <div ${rv()} data-rv-d="1">
        <div class="tier">
          <span class="tier__tag">${st.name}</span>
          <ul>
            <li>Every postcode, flat packed or assembled</li>
            <li>18mm moisture-resistant board, laser-bonded edging</li>
            <li>Blum soft-close hinges and full-extension runners</li>
            <li>Service drawings for your plumber and electrician</li>
            <li>Fixed itemised quote, freight its own line</li>
            <li class="no">Installation not offered in ${st.name}</li>
          </ul>
          <a class="btn btn--block" href="/contact">Get my free quote</a>
        </div>
      </div>
    </div>
  </section>

  ${orderCta(st.name)}
  ${faqBlock(faq, `${st.name} &mdash; questions`)}
  ${ctaBand({ eyebrow: st.name, title: 'Send us the dimensions.<br><span class="italic" style="color:var(--brass-lite)">We will send back a number.</span>', body: `A fixed, itemised quote freighted anywhere in ${st.name}, flat packed or delivered assembled, with nothing to pay to see it.`, image: natImg(st.slug + 'c', HERO_DARK), alt: `Kitchen cabinetry freighted across ${st.name}` })}
`,
    };
  }

  const statePages = Object.keys(NAT.STATES).filter((c) => !NAT.STATES[c].skip).map(statePage);
  const regionPages = NAT.REGIONS.map(regionPage);
  const townPages = NAT.REGIONS.flatMap((r) => r.towns.map((t, i) => townPage(t, r, i)));

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

  return [home, kitchens, pantry, joinery, gallery, investment, process, studio, contact, ...areaPages, caloundra, ...supplyPages, ...flatPackCityPages, ...statePages, ...regionPages, ...townPages, ...comboPages, fitout, ...segmentPages, guidesHub, ...guidePages, privacy, thanks, notFound];
};
