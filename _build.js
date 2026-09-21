/* =========================================================================
   BILT &amp; CO — static site builder
   Run:  node _build.js
   Writes every .html file in this folder from the shared layout + _pages.js
   ========================================================================= */
'use strict';
const fs = require('fs');
const path = require('path');

let LASTMOD = {};
const SITE = {
  name: 'Bilt & Co',
  legalName: 'Bilt & Co Pty Ltd',
  nameHtml: 'Bilt &amp; Co',
  legalNameHtml: 'Bilt &amp; Co Pty Ltd',
  acn: '700 798 509',
  tagline: 'Bespoke Kitchens & Fine Joinery',
  origin: 'https://biltstudio.com.au',
  phone: '0401 821 848',
  phoneHref: '+61401821848',
  email: 'hello@biltstudio.com.au',
  street: null,
  suburb: 'Rockhampton',
  state: 'QLD',
  postcode: '4700',
  lat: -23.3781,
  lng: 150.5136,
  hours: [
    ['Monday – Friday', '8:30am – 5:00pm'],
    ['Saturday', '9:00am – 1:00pm (by appointment)'],
    ['Sunday', 'Closed'],
  ],
  // Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'. Leave empty and
  // no analytics ships at all - the tag, the event tracking and the matching
  // privacy policy wording are all gated on this one value.
  ga4: 'G-G40133MH26',
  // Free design consultations offered per month. The counter on the homepage
  // and contact page counts down from this across the month and resets on the
  // 1st. Change it here and both pages follow.
  spotsPerMonth: 6,
  // Social profile URLs. Leave empty and nothing renders - no footer link,
  // no sameAs. Fill in the full URL once the page exists.
  facebook: 'https://www.facebook.com/biltandcokitchens',
  instagram: 'https://www.instagram.com/biltandcokitchens',
  areas: [
    'Rockhampton', 'North Rockhampton', 'Frenchville', 'Norman Gardens', 'Park Avenue',
    'The Range', 'Gracemere', 'Yeppoon', 'Emu Park', 'Capricorn Coast', 'Mount Morgan',
    'Blackwater', 'Emerald', 'Gladstone', 'Tannum Sands', 'Boyne Island', 'Calliope',
    'Biloela', 'Moura', 'Central Queensland',
  ],
};
SITE.addressLine = `${SITE.suburb} ${SITE.state} ${SITE.postcode}`;

const NAV = [
  ['kitchens.html', 'Kitchens'],
  ['butlers-pantries.html', "Butler's Pantries"],
  ['joinery.html', 'Joinery'],
  ['gallery.html', 'Gallery'],
  ['investment.html', 'Investment'],
  ['guides.html', 'Guides'],
  ['studio.html', 'Studio'],
];

/* ---------------------------------------------------------------- helpers */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Reveal-on-scroll attribute helper */
const rv = (d) => `data-rv${d ? ` data-rv-d="${d}"` : ''}`;

/** Read real JPEG dimensions so every <img> ships width/height (no layout shift) */
const DIMS = {};
function jpegSize(fp) {
  const b = fs.readFileSync(fp);
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return { w: 1920, h: 1280 };
}
try {
  fs.readdirSync(path.join(__dirname, 'assets', 'img'))
    .filter((f) => f.endsWith('.jpg'))
    .forEach((f) => { DIMS[f.replace(/\.jpg$/, '')] = jpegSize(path.join(__dirname, 'assets', 'img', f)); });
} catch (e) { console.warn('  ! could not read image dimensions:', e.message); }

/** Picture-less img with lazy loading + explicit intrinsic size */
function img(file, alt, opts = {}) {
  const d = DIMS[file] || {};
  const { w = d.w || 1920, h = d.h || 1280, cls = '', eager = false } = opts;
  const tag = `<img src="assets/img/${file}.jpg" alt="${esc(alt)}" width="${w}" height="${h}"${cls ? ` class="${cls}"` : ''} loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>`;
  // WebP where the browser supports it, JPEG otherwise. Halves image weight.
  return fs.existsSync(path.join(__dirname, 'assets', 'img', file + '.webp'))
    ? `<picture><source srcset="assets/img/${file}.webp" type="image/webp">${tag}</picture>`
    : tag;
}

function frame(file, alt, ratio = 'wide', opts = {}) {
  return `<div class="frame frame--${ratio}">${img(file, alt, opts)}</div>`;
}

/* ------------------------------------------------------------ components */
function header(active) {
  const links = NAV.map(([href, label]) =>
    `<a href="${href}"${href === active ? ' aria-current="page"' : ''}>${label}</a>`).join('\n          ');
  return `<div class="util">
    <div class="wrap util__in">
      <span>Designed and installed in <strong>Rockhampton</strong></span>
      <span>Consultations at your kitchen table, by appointment</span>
      <span>Free design &amp; fixed quote &mdash; <a href="tel:${SITE.phoneHref}">${SITE.phone}</a></span>
    </div>
  </div>
  <header class="head">
    <div class="wrap head__in">
      <a href="index.html" class="brand" aria-label="Bilt &amp; Co — home">
        <span class="brand__mark">BILT &amp; CO</span>
        <span class="brand__sub">Rockhampton</span>
      </a>
      <nav class="nav" id="nav" aria-label="Primary">
          ${links}
          <a class="nav__tel" href="tel:${SITE.phoneHref}">${SITE.phone}</a>
      </nav>
      <div class="head__cta">
        <a class="head__tel" href="tel:${SITE.phoneHref}"><span>Talk to a designer</span><strong>${SITE.phone}</strong></a>
        <a class="btn" href="contact.html">Get my free quote</a>
        <button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span></button>
      </div>
    </div>
  </header>`;
}

function footer() {
  // Two tiers, labelled. Install towns are where our own team works; supply
  // towns get cabinetry delivered assembled, with nothing claimed about
  // installation there.
  const areaLinks = [
    ['kitchens.html', 'Rockhampton'],
    ['kitchens-yeppoon.html', 'Yeppoon'],
    ['kitchens-gracemere.html', 'Gracemere'],
    ['kitchens-capricorn-coast.html', 'Capricorn Coast'],
    ['kitchens-gladstone.html', 'Gladstone'],
    ['kitchens-biloela.html', 'Biloela'],
  ].map(([h, l]) => `<li><a href="${h}">Kitchens ${l}</a></li>`).join('')
    + '<li style="margin-top:.9rem;color:#8B8375;font-size:.8125rem">Supply only</li>'
    + [
      ['kitchens-brisbane.html', 'Brisbane'],
      ['kitchens-mackay.html', 'Mackay'],
      ['kitchens-bundaberg.html', 'Bundaberg'],
      ['kitchens-emerald.html', 'Emerald'],
      ['kitchens-blackwater.html', 'Blackwater'],
      ['kitchens-moranbah.html', 'Moranbah'],
      ['kitchens-hervey-bay.html', 'Hervey Bay'],
      ['kitchens-whitsundays.html', 'Whitsundays'],
      ['kitchens-caloundra.html', 'Caloundra'],
    ].map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')
    + '<li style="margin-top:.9rem;color:#8B8375;font-size:.8125rem">Flat pack, ships nationally</li>'
    + [
      ['flat-pack-kitchens-sydney.html', 'Sydney'],
      ['flat-pack-kitchens-melbourne.html', 'Melbourne'],
      ['flat-pack-kitchens-perth.html', 'Perth'],
      ['flat-pack-kitchens-adelaide.html', 'Adelaide'],
      ['flat-pack-kitchens-canberra.html', 'Canberra'],
      ['flat-pack-kitchens-hobart.html', 'Hobart'],
      ['flat-pack-kitchens-darwin.html', 'Darwin'],
    ].map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('');

  return `<footer class="foot">
    <div class="wrap">
      <div class="foot__grid">
        <div>
          <a href="index.html" class="brand" style="margin-bottom:1.75rem">
            <span class="brand__mark">BILT &amp; CO</span>
            <span class="brand__sub">Rockhampton</span>
          </a>
          <p class="small muted" style="max-width:34ch">${SITE.tagline} for Rockhampton and Central Queensland. Drawn, specified and installed by one local team — never subcontracted.</p>
          <div class="badge-row mt-2">
            <span class="badge">Designed &amp; installed by us</span>
            <span class="badge">Delivered assembled</span>
          </div>
        </div>
        <div>
          <h2>Craft</h2>
          <ul>
            <li><a href="kitchens.html">Bespoke kitchens</a></li>
            <li><a href="fit-out.html">Fit-out options</a></li>
            <li><a href="new-build-kitchens.html">New build kitchens</a></li>
            <li><a href="granny-flat-kitchens.html">Granny flat kitchens</a></li>
            <li><a href="tiny-home-kitchens.html">Tiny home kitchens</a></li>
            <li><a href="kitchenettes.html">Kitchenettes</a></li>
            <li><a href="flat-pack-kitchens.html">Flat pack kitchens</a></li>
            <li><a href="flat-pack-kitchen-upgrades.html">Flat pack upgrades</a></li>
            <li><a href="assembled-kitchens.html">Assembled kitchens</a></li>
            <li><a href="short-stay-kitchens.html">Short-stay &amp; Airbnb</a></li>
            <li><a href="kitchen-islands.html">Kitchen islands</a></li>
            <li><a href="laundries.html">Laundries</a></li>
            <li><a href="kitchens-caloundra.html">Caloundra supply</a></li>
            <li><a href="owner-builder-kitchen-supply.html">Owner-builder supply</a></li>
            <li><a href="accessible-kitchens.html">Accessible kitchens</a></li>
            <li><a href="sda-kitchens-queensland.html">SDA kitchens</a></li>
            <li><a href="aging-in-place-kitchens.html">Aging in place</a></li>
            <li><a href="motorised-pull-down-shelving.html">Pull-down shelving</a></li>
            <li><a href="kitchens-gladstone.html">Kitchens Gladstone</a></li>
            <li><a href="kitchens-biloela.html">Kitchens Biloela</a></li>
            <li><a href="trade.html">Trade &amp; builders</a></li>
            <li><a href="butlers-pantries.html">Butler's pantries</a></li>
            <li><a href="joinery.html">Wardrobes &amp; joinery</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="investment.html">Investment guide</a></li>
            <li><a href="process.html">Our process</a></li>
            <li><a href="guides.html">Kitchen guides</a></li>
          </ul>
        </div>
        <div>
          <h2>Service areas</h2>
          <ul>${areaLinks}</ul>
          <h2 style="margin-top:2rem">Studio</h2>
          <ul>
            <li><a href="studio.html">About Bilt &amp; Co</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy.html">Privacy policy</a></li>
          </ul>
        </div>
        <div>
          <h2>Talk to us</h2>
          <address>
            ${SITE.suburb} ${SITE.state} ${SITE.postcode}<br>
            Central Queensland<br><br>
            <a href="tel:${SITE.phoneHref}">${SITE.phone}</a><br>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
            ${[['Facebook', SITE.facebook], ['Instagram', SITE.instagram]].filter(([, u]) => u).map(([n, u], i) => `${i ? ' &middot; ' : '<br>'}<a href="${u}" rel="noopener" target="_blank">${n}</a>`).join('')}
          </address>
          <h2 style="margin-top:2rem">Hours</h2>
          <ul class="small">
            ${SITE.hours.map(([d, t]) => `<li class="muted">${d}<br><span style="color:var(--stone)">${t}</span></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="foot__base">
        <span>&copy; <span data-year>2026</span> ${SITE.legalNameHtml} — ACN ${SITE.acn}. All rights reserved.</span>
        <span>${SITE.tagline} · Rockhampton, Central Queensland</span>
      </div>
    </div>
  </footer>`;
}

function stickyCta() {
  return `<div class="sticky-cta">
    <a href="tel:${SITE.phoneHref}">Call ${SITE.phone}</a>
    <a href="contact.html">Get my free quote</a>
  </div>`;
}

/* --------------------------------------------------------- shared blocks */
const BLOCKS = {};

BLOCKS.proof = `<section class="section--tight">
  <div class="wrap">
    <dl class="proof" ${rv()}>
      <div><dt class="tabnums">75+</dt><dd>Kitchens delivered</dd></div>
      <div><dt class="tabnums">18mm</dt><dd>Moisture-resistant board</dd></div>
      <div><dt class="tabnums">Lifetime</dt><dd>Blum hardware warranty</dd></div>
      <div><dt class="tabnums">7&ndash;10</dt><dd>Days on site, typical</dd></div>
    </dl>
  </div>
</section>`;

BLOCKS.marquee = `<div class="marq" aria-hidden="true">
  <div class="marq__t">
    ${'<span>Calacatta marble <i>&#9670;</i> American oak <i>&#9670;</i> Brushed brass <i>&#9670;</i> Blum hardware <i>&#9670;</i> Porcelain benchtops <i>&#9670;</i> Fenix matte <i>&#9670;</i> Hand-finished timber <i>&#9670;</i> Dekton <i>&#9670;</i> </span>'.repeat(2)}
  </div>
</div>`;

function ctaBand(opts = {}) {
  const {
    eyebrow = 'The next step',
    title = 'Send us your rough measurements.<br><span class="italic brass">We&rsquo;ll send back a price.</span>',
    body = 'Wall lengths, ceiling height, where the window is. Rough is fine. You get a fixed, itemised number back within one business day &mdash; no deposit, no showroom visit, no salesperson at your door.',
    image = 'dark-dining',
    alt = 'Dark timber and marble kitchen with dining table, Rockhampton',
  } = opts;
  return `<section class="section cta">
    <div class="cta__media">${img(image, alt)}</div>
    <div class="wrap cta__in">
      <div style="max-width:38rem">
        <p class="eyebrow" ${rv()}>${eyebrow}</p>
        <h2 class="d2" ${rv()} data-rv-d="1">${title}</h2>
        <p class="lede mt-2" ${rv()} data-rv-d="2">${body}</p>
        <div class="hero__actions mt-3" ${rv()} data-rv-d="3">
          <a class="btn btn--light btn--lg" href="contact.html">Get my free quote</a>
          <a class="btn btn--outline btn--lg btn--tel" href="tel:${SITE.phoneHref}"><svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${SITE.phone}</a>
        </div>
      </div>
    </div>
  </section>`;
}

function faqBlock(items, heading = 'Questions, answered honestly') {
  return `<section class="section bg-2" id="faq">
    <div class="wrap">
      <div class="split" style="align-items:start">
        <div>
          <p class="eyebrow" ${rv()}>Frequently asked</p>
          <h2 class="d2" ${rv()} data-rv-d="1">${heading}</h2>
          <p class="lede mt-2" ${rv()} data-rv-d="2">If your question is not here, call the studio. We would rather talk it through than have you guess.</p>
          <a class="link-u mt-3" href="contact.html" ${rv()} data-rv-d="3">Ask us directly <span class="arw">&rarr;</span></a>
        </div>
        <div class="faq" ${rv()} data-rv-d="1">
          ${items.map((f) => `<details>
            <summary>${f.q}</summary>
            <div class="faq__a"><p>${f.a}</p></div>
          </details>`).join('\n          ')}
        </div>
      </div>
    </div>
  </section>`;
}

function crumbs(trail) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${trail
    .map((t, i) => (i === trail.length - 1
      ? `<span aria-current="page" style="margin:0;color:var(--stone)">${t[1]}</span>`
      : `<a href="${t[0]}">${t[1]}</a><span>/</span>`))
    .join('')}</nav>`;
}

/* ------------------------------------------------------------ structured data */
function ldLocalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE.origin}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: 'Bilt & Co Bespoke Kitchens',
    description:
      'Bilt & Co designs, specifies and installs bespoke kitchens, butler’s pantries and fine joinery for Rockhampton and Central Queensland.',
    url: `${SITE.origin}/`,
    telephone: '+61 401 821 848',
    email: SITE.email,
    image: `${SITE.origin}/assets/img/hero-main.jpg`,
    logo: { '@type': 'ImageObject', url: `${SITE.origin}/assets/img/logo.png`, width: 1000, height: 1000 },
    priceRange: '$$$',
    ...([SITE.facebook, SITE.instagram].some(Boolean) ? { sameAs: [SITE.facebook, SITE.instagram].filter(Boolean) } : {}),
    // Saturday is by appointment. Schema has no way to say that, and listing
    // it with fixed hours would be a claim we cannot keep, so it lives in the
    // Google Business Profile instead.
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '17:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '13:00' },
    ],
    identifier: { '@type': 'PropertyValue', propertyID: 'ACN', value: SITE.acn.replace(/\s/g, '') },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.suburb,
      addressRegion: SITE.state,
      addressCountry: 'AU',
    },
    areaServed: SITE.areas.map((a) => ({ '@type': 'Place', name: `${a}, Queensland` })),
    serviceArea: { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: SITE.lat, longitude: SITE.lng }, geoRadius: 250000 },
    knowsAbout: ['Kitchen design', 'Kitchen installation', 'Stone benchtops', 'Butler’s pantries', 'Custom joinery', 'Walk-in wardrobes'],
    slogan: 'Bespoke kitchens, designed and installed in Rockhampton.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bespoke kitchen and joinery services',
      itemListElement: [
        ['Bespoke kitchen design and installation', 'kitchens.html'],
        ['Butler’s pantry design and construction', 'butlers-pantries.html'],
        ['Walk-in wardrobes and custom joinery', 'joinery.html'],
      ].map(([n, u]) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: n, url: `${SITE.origin}/${u}`, areaServed: 'Rockhampton, Queensland', provider: { '@id': `${SITE.origin}/#business` } },
      })),
    },
  };
}

function ldService(page, canonical) {
  const sv = page.service;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: sv.name,
    description: sv.desc || page.desc,
    serviceType: sv.type || sv.name,
    url: canonical,
    provider: { '@id': `${SITE.origin}/#business` },
    // Most services are Queensland-only, so a plain string is assumed to be a
    // QLD town. National flat-pack pages pass [name, state] tuples instead so
    // their schema does not claim Sydney is in Queensland.
    areaServed: (sv.areas || SITE.areas).map((a) => (Array.isArray(a)
      ? { '@type': 'Place', name: `${a[0]}, ${a[1]}` }
      : { '@type': 'Place', name: `${a}, Queensland` })),
    ...(sv.price ? { offers: { '@type': 'Offer', priceCurrency: 'AUD', price: sv.price, availability: 'https://schema.org/InStock', url: canonical } } : {}),
    ...(page.images ? { image: [page.og, ...page.images.map((i) => i[0])].filter(Boolean).map((f) => `${SITE.origin}/assets/img/${f}.jpg`) } : {}),
  };
}

function ldImageGallery(page, canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${canonical}#gallery`,
    url: canonical,
    name: page.title,
    associatedMedia: page.images.map(([file, alt, cap]) => ({
      '@type': 'ImageObject',
      contentUrl: `${SITE.origin}/assets/img/${file}.jpg`,
      caption: cap || alt,
      description: alt,
      creditText: SITE.name,
      creator: { '@id': `${SITE.origin}/#business` },
    })),
  };
}

// 'index.html' -> '/', 'kitchens.html' -> '/kitchens'. The file on disk keeps
// its extension; only the public URL loses it.
function cleanPath(file) {
  return file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, '');
}

function ldBreadcrumbs(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t[1], item: `${SITE.origin}${cleanPath(t[0])}`,
    })),
  };
}

function ldFaq(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
    })),
  };
}

/* ----------------------------------------------------------------- layout */
function spotsNow() {
  // Mirrors the client-side maths in main.js so a no-JS visitor sees a
  // plausible number rather than a frozen one.
  const now = new Date();
  const dim = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return Math.max(1, Math.ceil(SITE.spotsPerMonth * (1 - (now.getDate() - 1) / dim)));
}

function preloadTag(page) {
  // Preload whatever the page actually renders eagerly, read back out of the
  // built markup. A hand-maintained field drifted from the hero on six pages,
  // and four of those preloaded an image that was never rendered eagerly.
  // Pages with no eager image get no preload, which is the correct answer.
  const m = /src="assets\/img\/([a-z0-9-]+)\.jpg"[^>]*loading="eager"/.exec(page.body || '');
  if (!m) return '';
  const file = m[1];
  // Must match what <picture> will actually choose, or the preload is wasted.
  return fs.existsSync(path.join(__dirname, 'assets', 'img', file + '.webp'))
    ? `<link rel="preload" as="image" href="assets/img/${file}.webp" type="image/webp" fetchpriority="high">`
    : `<link rel="preload" as="image" href="assets/img/${file}.jpg" fetchpriority="high">`;
}

function tidyLinks(html) {
  return html
    .replace(/href="index\.html(#[^"]*)?"/g, 'href="/$1"')
    .replace(/href="(?!https?:|\/\/|mailto:|tel:)([\w.\/-]+)\.html(#[^"]*)?"/g, 'href="/$1$2"');
}

function layout(page) {
  const canonical = `${SITE.origin}${cleanPath(page.file)}`;
  // Every page carries three described images and the assembled section,
  // unless it opts out (legal, thanks, 404, contact, the gallery itself).
  const noGallery = page.noGallery || ['contact.html', 'thanks.html', 'privacy.html', '404.html'].includes(page.file);
  if (!page.images && !noGallery) page.images = autoImages(page);
  if (page.images && !noGallery && page.body && page.body.includes('<section class="section cta">')) {
    page.body = page.body.replace('<section class="section cta">', assembledBlock(page) + '\n  <section class="section cta">');
  }
  // Articles: image set and honest dates from _lastmod.json.
  if (page.ld) page.ld.forEach((o) => {
    if (o['@type'] === 'Article') {
      o.image = [o.image, ...(page.images || []).map((i) => `${SITE.origin}/assets/img/${i[0]}.jpg`)].filter(Boolean);
      o.mainEntityOfPage = canonical;
      const lm = (typeof LASTMOD !== 'undefined' && LASTMOD[page.file]) || null;
      if (lm) { o.dateModified = lm.date; o.datePublished = lm.published || lm.date; }
    }
  });
  const ld = [];
  if (page.file === 'index.html') ld.push(ldLocalBusiness());
  else ld.push({ '@context': 'https://schema.org', '@type': 'WebPage', url: canonical, name: page.title, description: page.desc, isPartOf: { '@id': `${SITE.origin}/#business` }, about: { '@id': `${SITE.origin}/#business` },
    ...(page.og ? { primaryImageOfPage: { '@type': 'ImageObject', contentUrl: `${SITE.origin}/assets/img/${page.og}.jpg`, description: (IMG_BY_FILE[page.og] || [])[1] || page.title } } : {}),
    ...(page.images ? { image: page.images.map((i) => `${SITE.origin}/assets/img/${i[0]}.jpg`) } : {}) });
  if (page.service) ld.push(ldService(page, canonical));
  if (page.images) ld.push(ldImageGallery(page, canonical));
  if (page.trail) ld.push(ldBreadcrumbs(page.trail));
  if (page.faq) ld.push(ldFaq(page.faq));
  if (page.ld) ld.push(...page.ld);

  return tidyLinks(`<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
<meta name="theme-color" content="#FBF9F5">
<meta name="geo.region" content="AU-QLD">
<meta name="geo.placename" content="Rockhampton">
<meta name="geo.position" content="${SITE.lat};${SITE.lng}">
<meta name="ICBM" content="${SITE.lat}, ${SITE.lng}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:locale" content="en_AU">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.origin}/assets/img/${page.og || 'hero-main'}.jpg">
<meta property="og:image:width" content="1920">
<meta property="og:image:height" content="1441">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.desc)}">
<meta name="twitter:image" content="${SITE.origin}/assets/img/${page.og || 'hero-main'}.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="assets/css/main.css">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
${preloadTag(page)}
${SITE.ga4 ? `<link rel="preconnect" href="https://www.googletagmanager.com">
<script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}"></script>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());
// No ad profiling: this business does not advertise, and the privacy policy
// says so. Keep these false or that statement stops being true.
// Internal-traffic flag. Read before config: gtag sends a page_view as part
// of the config call, so setting traffic_type afterwards would let the first
// hit of every pageload through as real traffic.
// Never report localhost. Dev and preview traffic is not real traffic, and
// once it is in the property it cannot be removed.
var biltH=location.hostname;
var biltLocal=(biltH==='localhost'||biltH==='127.0.0.1'||biltH==='[::1]'||biltH==='::1');
var biltCfg={allow_google_signals:false,allow_ad_personalization_signals:false};
if(biltLocal){biltCfg.traffic_type='internal';}
try{
  var biltQ=location.search;
  if(biltQ.indexOf('internal=1')>-1){localStorage.setItem('bilt_internal','1')}
  else if(biltQ.indexOf('internal=0')>-1){localStorage.removeItem('bilt_internal')}
  if(localStorage.getItem('bilt_internal')==='1'){biltCfg.traffic_type='internal'}
}catch(e){/* private mode or storage blocked: count it, better than breaking */}
gtag('config','${SITE.ga4}',biltCfg);
</script>` : ''}
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(page.file)}
<main id="main">
${page.body}
</main>
${footer()}
${stickyCta()}
<script src="assets/js/main.js" defer></script>
</body>
</html>
`);
}

/* ------------------------------------------------------- page images */
/* Every image on the site, described once. Each page shows three of these
   in its "delivered assembled" section and carries them in structured
   data and the image sitemap. Tags drive which pool a page draws from;
   the pick is seeded by the page's file name so it is stable between
   builds (a moving image would move the page's lastmod). */
const IMG_POOL = [
  ['hero-main', 'Dark timber kitchen and dining room with a stone island, delivered assembled and installed in Rockhampton', 'Full-height joinery, fitted in days', ['kitchen', 'island', 'dark']],
  ['dark-luxe-bar', 'Dark kitchen with an integrated coffee station behind a lift door, cabinetry delivered assembled', 'Appliance garage, hardware fitted before delivery', ['kitchen', 'dark', 'detail']],
  ['collection-marble-01', 'Oak kitchen with full-height marble splashback and stone island bench', 'American oak and stone', ['kitchen', 'island', 'light']],
  ['collection-marble-02', 'Marble splashback with brass wall lights above an oak kitchen run', 'Handleless rail on an assembled run', ['kitchen', 'light', 'detail']],
  ['collection-marble-03', 'Light oak kitchen run with stone benchtop and open shelving', 'Oak run, doors hung and adjusted before delivery', ['kitchen', 'light']],
  ['collection-marble-04', 'Oak and marble kitchen with island seating and pendant lighting', 'Island with seating overhang', ['kitchen', 'island', 'light']],
  ['island-marble-brass', 'Stone island bench with brushed brass tapware', 'Mitred stone edge over assembled carcasses', ['kitchen', 'island', 'light']],
  ['signature-dark', 'Dark navy kitchen with leather bar seating opening to a living area', 'Navy cabinetry, open-plan island', ['kitchen', 'island', 'dark']],
  ['dark-island', 'Dark cabinetry kitchen with a long island, delivered assembled ready to fit', 'Long island, one delivery', ['kitchen', 'island', 'dark']],
  ['island-calacatta', 'Calacatta stone island in a new build kitchen', 'New build, kitchen fitted at fit-off', ['kitchen', 'island', 'light', 'newbuild']],
  ['island-marble-close', 'Close detail of a marble island benchtop edge and drawer front', 'Drawer fronts aligned on the bench, not on site', ['detail', 'island']],
  ['dark-dining', 'Dark timber kitchen and dining space with feature lighting', 'Kitchen into dining, one palette', ['kitchen', 'dark']],
  ['openplan-long', 'Long open-plan kitchen run with stone benchtop', 'A long run arrives as numbered assembled units', ['kitchen', 'light']],
  ['galley-stone', 'Compact galley kitchen with stone benchtop', 'Galley layout for a narrow room', ['kitchen', 'compact', 'light']],
  ['timber-island', 'Timber-fronted island with stone top', 'Timber island, stone top', ['kitchen', 'island', 'light', 'coastal']],
  ['black-marble-bar', 'Black cabinetry bar with marble top', 'Black joinery, marble bar', ['kitchen', 'dark', 'detail']],
  ['concrete-luxe', 'Concrete-look kitchen with matte black fixtures', 'Concrete-look doors, matte black hardware', ['kitchen', 'dark', 'shortstay']],
  ['glossy-dark', 'High-gloss dark kitchen cabinetry', 'Gloss doors, adjusted to even gaps before delivery', ['kitchen', 'dark']],
  ['matte-black-bank', 'Bank of matte black tall cabinets', 'Tall units arrive as built boxes', ['kitchen', 'dark', 'detail']],
  ['detail-black-cabinetry', 'Compact black kitchenette with integrated sink', 'Kitchenette, delivered assembled', ['compact', 'dark', 'detail']],
  ['detail-stone-black', 'Black stone benchtop detail with concealed storage', 'Stone on a compact run', ['compact', 'dark', 'detail']],
  ['detail-timber-joinery', 'Timber joinery detail with shadow-line edge', 'Laser-bonded edging, no glue line', ['detail', 'joinery']],
  ['drawer-detail', 'Open drawer showing Blum full-extension runners', 'Blum runners fitted before it leaves', ['detail', 'flatpack']],
  ['splashback-marble-01', 'Marble splashback behind a cooktop', 'Full-height stone splashback', ['detail', 'light']],
  ['splashback-marble-02', 'Marble splashback with rangehood detail', 'Rangehood set into assembled overheads', ['detail', 'light']],
  ['material-samples', 'Door, stone and hardware samples laid out on a bench', 'Samples brought to you', ['detail', 'process']],
  ['joinery-sketch', 'Kitchen design drawings with dimensions', 'Service drawings for your trades', ['process', 'flatpack']],
  ['studio-desk', 'Design studio desk with drawings and samples', 'Drawn to your measurements', ['process']],
  ['laundry-room', 'Laundry with tall storage and a folding bench', 'Laundry, delivered assembled', ['laundry', 'joinery']],
  ['vanity-bathroom', 'Bathroom vanity with stone top', 'Vanity, same carcasses and hardware', ['joinery']],
  ['wardrobe-robe', 'Built-in wardrobe with open shelving', 'Built-in robe, fitted in a day', ['joinery']],
  ['wardrobe-walkin', 'Walk-in wardrobe with drawer bank', 'Walk-in robe drawers on Blum runners', ['joinery']],
  ['media-wall', 'Media wall with concealed storage', 'Media wall, assembled units', ['joinery']],
];
const IMG_BY_FILE = Object.fromEntries(IMG_POOL.map((i) => [i[0], i]));

function imgTagsFor(file) {
  const f = file.replace(/\.html$/, '');
  if (/kitchenette/.test(f)) return ['compact'];
  if (/laundr/.test(f)) return ['laundry'];
  if (/joinery|wardrobe|fit-out/.test(f)) return ['joinery'];
  if (/pantr/.test(f)) return ['detail', 'light'];
  if (/island/.test(f)) return ['island'];
  if (/flat-pack|assemble/.test(f)) return ['flatpack', 'detail'];
  if (/tiny-home|granny|under-house|garage|secondary|sda|accessib|aging|ndis/.test(f)) return ['compact', 'light'];
  if (/new-build|pc-item/.test(f)) return ['newbuild', 'island'];
  if (/short-stay|letting|coast|yeppoon|whitsunday/.test(f)) return ['coastal', 'shortstay', 'light'];
  if (/process|measure|install|checklist|studio/.test(f)) return ['process', 'detail'];
  return ['kitchen'];
}

function seedFrom(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
  return h;
}

/* Three images: first two from the page's tag pool, third from the general
   kitchen pool, never the page's own hero, never a repeat. */
function autoImages(page) {
  const hero = page.og || page.preload || '';
  const tags = imgTagsFor(page.file);
  const seed = seedFrom(page.file);
  const pick = (pool, n, taken) => {
    const out = [];
    const cands = pool.filter((i) => i[0] !== hero && !taken.has(i[0]));
    for (let k = 0; k < n && cands.length; k++) {
      const idx = (seed + k * 7919) % cands.length;
      out.push(cands.splice(idx, 1)[0]);
    }
    return out;
  };
  const taken = new Set();
  const tagged = IMG_POOL.filter((i) => tags.some((t) => i[3].includes(t)));
  const first = pick(tagged, 2, taken);
  first.forEach((i) => taken.add(i[0]));
  const rest = pick(IMG_POOL.filter((i) => i[3].includes('kitchen')), 3 - first.length, taken);
  return [...first, ...rest].map(([file, alt, cap]) => [file, alt, cap]);
}

/* The "delivered assembled" section. One angle, stated the same way on every
   page, with the three images as evidence. The install line changes with
   where the page sits: install zone, supply-only, or general. */
function assembledBlock(page) {
  const imgs = page.images;
  const mode = page.assembled || 'general';
  const tail = {
    install: 'Within Central Queensland our own team levels it, fixes it and fits the benchtop.',
    supply: 'Your builder or installer levels it, fixes it and fits the benchtop, working from our drawings.',
    general: 'Our own team fits it in Central Queensland; your installer fits it anywhere else in Australia.',
  }[mode];
  return `
  <section class="section bg-2" id="assembled">
    <div class="wrap">
      <div class="split" style="align-items:end;margin-bottom:2rem">
        <div>
          <p class="eyebrow" ${rv()}>Delivered assembled</p>
          <h2 class="d2" ${rv()} data-rv-d="1">The assembly is done<br>before it arrives.</h2>
        </div>
        <p class="muted" ${rv()} data-rv-d="2">Carcasses built square on a bench, Blum hardware fitted, doors hung and adjusted to even gaps. On site you are fixing finished cabinets to a wall, not building them on the floor. ${tail} Prefer to build it yourself? The same kitchen <a href="flat-pack-kitchens.html" style="color:var(--brass)">ships flat pack</a>.</p>
      </div>
      <div class="grid cols-3">
        ${imgs.map(([file, alt, cap], i) => `
        <figure class="card" style="margin:0" ${rv()} data-rv-d="${i + 1}">
          ${frame(file, alt, 'wide')}
          <figcaption class="card__body"><p class="small muted" style="margin:0">${esc(cap)}</p></figcaption>
        </figure>`).join('')}
      </div>
      <p class="mt-3" ${rv()}><a class="link-u" href="assembled-kitchens.html">What delivered assembled means, in detail &rarr;</a></p>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------ build */
const api = { SITE, NAV, esc, rv, img, frame, BLOCKS, ctaBand, faqBlock, crumbs, layout, spotsNow };
const pages = require('./_pages.js')(api);

const outDir = __dirname;

/* Per-page lastmod. A page's date only moves when its HTML actually changes,
   so the sitemap's <lastmod> is something Google can trust rather than the
   build date stamped on every page. The consultation counter changes daily
   and is stripped before hashing. _lastmod.json is committed. */
const crypto = require('crypto');
const lastmodPath = path.join(outDir, '_lastmod.json');
const lastmod = fs.existsSync(lastmodPath) ? JSON.parse(fs.readFileSync(lastmodPath, 'utf8')) : {};
LASTMOD = lastmod;
const today = new Date().toISOString().slice(0, 10);
/* Only the page's own content counts: <title>, description and <main>.
   Header, footer and nav are shared, so a footer edit must not move every
   page's date. */
function contentHash(html) {
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0];
  const title = (html.match(/<title>[\s\S]*?<\/title>/) || [''])[0];
  const desc = (html.match(/name="description" content="[^"]*"/) || [''])[0];
  const stable = (title + desc + main).replace(/(data-spots[^>]*>)\d+/g, '$1N');
  return crypto.createHash('sha1').update(stable).digest('hex').slice(0, 16);
}

let n = 0;
let changed = 0;
pages.forEach((p) => {
  const html = layout(p);
  fs.writeFileSync(path.join(outDir, p.file), html, 'utf8');
  const hash = contentHash(html);
  const prev = lastmod[p.file];
  if (!prev || prev.hash !== hash) {
    lastmod[p.file] = { hash, date: today, published: (prev && prev.published) || (prev && prev.date) || today };
    changed++;
  }
  n++;
  console.log('  ✓', p.file, prev && prev.hash !== hash ? '(changed)' : !prev ? '(new)' : '');
});
Object.keys(lastmod).forEach((f) => { if (!pages.some((p) => p.file === f)) delete lastmod[f]; });
fs.writeFileSync(lastmodPath, JSON.stringify(lastmod, null, 2) + '\n', 'utf8');
console.log(`  ✓ _lastmod.json (${changed} page${changed === 1 ? '' : 's'} changed)`);

/* redirects: hand-written old-site rules, plus a generated 301 from every
   .html URL to its clean form so each page has exactly one address. */
const base = fs.existsSync(path.join(__dirname, '_redirects-base'))
  ? fs.readFileSync(path.join(__dirname, '_redirects-base'), 'utf8').trimEnd()
  : '';
const cleanRules = pages
  // 404.html is Netlify's error document; redirecting it would break the
  // custom 404 page.
  .filter((p) => p.file !== '404.html')
  .map((p) => (p.file === 'index.html'
    ? '/index.html  /  301!'
    : `/${p.file}  ${cleanPath(p.file)}  301!`))
  .join('\n');
fs.writeFileSync(path.join(outDir, '_redirects'),
  `${base}\n\n# Generated by _build.js - do not edit below this line.\n${cleanRules}\n`, 'utf8');
console.log('  \u2713 _redirects');

/* sitemap + robots */
const urls = pages.filter((p) => !p.noindex).map((p) => {
  const loc = `${SITE.origin}${cleanPath(p.file)}`;
  const pr = p.file === 'index.html' ? '1.0' : p.priority || '0.8';
  // Image sitemap entries: hero first, then the page's three images.
  const imgs = [p.og, ...((p.images || []).map((i) => i[0]))].filter((f, i, a) => f && a.indexOf(f) === i);
  const imgXml = imgs.map((f) => {
    const meta = IMG_BY_FILE[f];
    const title = meta ? esc(meta[2]) : '';
    return `    <image:image>\n      <image:loc>${SITE.origin}/assets/img/${f}.jpg</image:loc>${title ? `\n      <image:title>${title}</image:title>` : ''}\n    </image:image>`;
  }).join('\n');
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod[p.file].date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${pr}</priority>${imgXml ? '\n' + imgXml : ''}\n  </url>`;
}).join('\n');
fs.writeFileSync(path.join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`, 'utf8');
console.log('  ✓ sitemap.xml');

fs.writeFileSync(path.join(outDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.origin}/sitemap.xml\n`, 'utf8');
console.log('  ✓ robots.txt');

fs.writeFileSync(path.join(outDir, 'assets', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0B0B0C"/><text x="32" y="43" font-family="Georgia,serif" font-size="26" fill="#C9A96A" text-anchor="middle" letter-spacing="1">B&amp;C</text></svg>\n`, 'utf8');

console.log(`\nBuilt ${n} pages.\n`);
