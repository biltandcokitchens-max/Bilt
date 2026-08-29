/* =========================================================================
   BILT &amp; CO — static site builder
   Run:  node _build.js
   Writes every .html file in this folder from the shared layout + _pages.js
   ========================================================================= */
'use strict';
const fs = require('fs');
const path = require('path');

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
  areas: [
    'Rockhampton', 'North Rockhampton', 'Frenchville', 'Norman Gardens', 'Park Avenue',
    'The Range', 'Gracemere', 'Yeppoon', 'Emu Park', 'Capricorn Coast', 'Mount Morgan',
    'Blackwater', 'Emerald', 'Gladstone', 'Central Queensland',
  ],
};
SITE.addressLine = `${SITE.suburb} ${SITE.state} ${SITE.postcode}`;

const NAV = [
  ['kitchens.html', 'Kitchens'],
  ['butlers-pantries.html', "Butler's Pantries"],
  ['joinery.html', 'Joinery'],
  ['gallery.html', 'Gallery'],
  ['investment.html', 'Investment'],
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
  return `<img src="assets/img/${file}.jpg" alt="${esc(alt)}" width="${w}" height="${h}"${cls ? ` class="${cls}"` : ''} loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>`;
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
      <span>Designed, built and installed in <strong>Rockhampton</strong></span>
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
        <a class="btn" href="contact.html">Get my free design</a>
        <button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span></button>
      </div>
    </div>
  </header>`;
}

function footer() {
  const areaLinks = [
    ['kitchens.html', 'Rockhampton'],
    ['kitchens-yeppoon.html', 'Yeppoon'],
    ['kitchens-gracemere.html', 'Gracemere'],
    ['kitchens-capricorn-coast.html', 'Capricorn Coast'],
  ].map(([h, l]) => `<li><a href="${h}">Kitchens ${l}</a></li>`).join('');

  return `<footer class="foot">
    <div class="wrap">
      <div class="foot__grid">
        <div>
          <a href="index.html" class="brand" style="margin-bottom:1.75rem">
            <span class="brand__mark">BILT &amp; CO</span>
            <span class="brand__sub">Rockhampton</span>
          </a>
          <p class="small muted" style="max-width:34ch">${SITE.tagline} for Rockhampton and Central Queensland. Designed, built and installed by our own hands — never outsourced.</p>
          <div class="badge-row mt-2">
            <span class="badge">Built in our own workshop</span>
            <span class="badge">10-year cabinetry warranty</span>
          </div>
        </div>
        <div>
          <h2>Craft</h2>
          <ul>
            <li><a href="kitchens.html">Bespoke kitchens</a></li>
            <li><a href="fit-out.html">Fit-out options</a></li>
            <li><a href="butlers-pantries.html">Butler's pantries</a></li>
            <li><a href="joinery.html">Wardrobes &amp; joinery</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="investment.html">Investment guide</a></li>
            <li><a href="process.html">Our process</a></li>
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
    <a href="contact.html">Get my free design &amp; quote</a>
  </div>`;
}

/* --------------------------------------------------------- shared blocks */
const BLOCKS = {};

BLOCKS.proof = `<section class="section--tight">
  <div class="wrap">
    <dl class="proof" ${rv()}>
      <div><dt class="tabnums">75+</dt><dd>Kitchens delivered</dd></div>
      <div><dt class="tabnums">10 yr</dt><dd>Cabinetry warranty</dd></div>
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
    title = 'Your kitchen begins with<br><span class="italic brass">one conversation.</span>',
    body = 'Ninety minutes at your kitchen table, with your plans, your photographs and your budget in front of us. You leave with a concept direction, a realistic investment range and no obligation whatsoever.',
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
          <a class="btn btn--lg" href="contact.html">Book your private consultation</a>
          <a class="btn btn--ghost btn--lg" href="tel:${SITE.phoneHref}">${SITE.phone}</a>
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
      'Bilt & Co designs, builds and installs bespoke luxury kitchens, butler’s pantries and fine joinery for Rockhampton and Central Queensland from its own Rockhampton workshop.',
    url: `${SITE.origin}/`,
    telephone: '+61 401 821 848',
    email: SITE.email,
    image: `${SITE.origin}/assets/img/hero-main.jpg`,
    logo: `${SITE.origin}/assets/img/hero-main.jpg`,
    priceRange: '$$$',
    identifier: { '@type': 'PropertyValue', propertyID: 'ACN', value: SITE.acn.replace(/\s/g, '') },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.suburb,
      addressRegion: SITE.state,
      addressCountry: 'AU',
    },
    areaServed: SITE.areas.map((a) => ({ '@type': 'Place', name: `${a}, Queensland` })),
    serviceArea: { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: SITE.lat, longitude: SITE.lng }, geoRadius: 250000 },
    knowsAbout: ['Kitchen design', 'Cabinetmaking', 'Stone benchtops', 'Butler’s pantries', 'Custom joinery', 'Walk-in wardrobes'],
    slogan: 'Bespoke kitchens, built in Rockhampton.',
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

function ldBreadcrumbs(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t[1], item: `${SITE.origin}/${t[0]}`.replace(/\/index\.html$/, '/'),
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
function layout(page) {
  const canonical = `${SITE.origin}/${page.file}`.replace(/\/index\.html$/, '/');
  const ld = [];
  if (page.file === 'index.html') ld.push(ldLocalBusiness());
  else ld.push({ '@context': 'https://schema.org', '@type': 'WebPage', url: canonical, name: page.title, description: page.desc, isPartOf: { '@id': `${SITE.origin}/#business` }, about: { '@id': `${SITE.origin}/#business` } });
  if (page.trail) ld.push(ldBreadcrumbs(page.trail));
  if (page.faq) ld.push(ldFaq(page.faq));
  if (page.ld) ld.push(...page.ld);

  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
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
${page.preload ? `<link rel="preload" as="image" href="assets/img/${page.preload}.jpg" fetchpriority="high">` : ''}
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
`;
}

/* ------------------------------------------------------------------ build */
const api = { SITE, NAV, esc, rv, img, frame, BLOCKS, ctaBand, faqBlock, crumbs, layout };
const pages = require('./_pages.js')(api);

const outDir = __dirname;
let n = 0;
pages.forEach((p) => {
  fs.writeFileSync(path.join(outDir, p.file), layout(p), 'utf8');
  n++;
  console.log('  ✓', p.file);
});

/* sitemap + robots */
const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => !p.noindex).map((p) => {
  const loc = `${SITE.origin}/${p.file}`.replace(/\/index\.html$/, '/');
  const pr = p.file === 'index.html' ? '1.0' : p.priority || '0.8';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${pr}</priority>\n  </url>`;
}).join('\n');
fs.writeFileSync(path.join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, 'utf8');
console.log('  ✓ sitemap.xml');

fs.writeFileSync(path.join(outDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.origin}/sitemap.xml\n`, 'utf8');
console.log('  ✓ robots.txt');

fs.writeFileSync(path.join(outDir, 'assets', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0B0B0C"/><text x="32" y="43" font-family="Georgia,serif" font-size="26" fill="#C9A96A" text-anchor="middle" letter-spacing="1">B&amp;C</text></svg>\n`, 'utf8');

console.log(`\nBuilt ${n} pages.\n`);
