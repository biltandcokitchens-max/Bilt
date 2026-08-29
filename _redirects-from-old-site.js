/* =========================================================================
   Retiring biltstudio.com.au — 301 redirect map
   Run:  node _redirects-from-old-site.js
   Emits Netlify, Apache and Nginx redirect files into out-redirects/.

   Every one of the 66 old URLs must resolve to a 301. Left as 404s they
   bleed whatever authority the old site accumulated and hand visitors a
   dead end from search results that stay live for months.
   ========================================================================= */
'use strict';
const fs = require('fs');
const path = require('path');

/* Set to the domain the NEW site will live on. If the new site takes over
   biltstudio.com.au, leave this empty and the redirects stay same-origin. */
const NEW_ORIGIN = '';   // e.g. 'https://biltandco.com.au'

const T = (p) => NEW_ORIGIN + p;

/* --- old URL -> new URL -------------------------------------------------
   Mapped by closest intent, not by name. Where the new business genuinely
   does not offer the old thing, the map says so in the note column. */
const MAP = [
  // NOTE: no '/' -> '/' rule. Same-origin that is an infinite loop; cross-origin
  // it belongs in the domain-level redirect, not the path map.

  // The planner is not carried over. The estimator is the nearest analogue:
  // enter dimensions, get a price.
  ['/roomplanner/',                  '/investment.html',     'Planner retired — estimator is the closest equivalent'],
  ['/pricing/',                      '/investment.html',     'Direct match: published prices'],

  // Comparison content lives in the investment page's comparison table.
  ['/compare/',                      '/investment.html',     'Comparison table'],
  ['/compare/ikea/',                 '/investment.html',     'No like-for-like page'],
  ['/compare/kaboodle/',             '/investment.html',     'No like-for-like page'],
  ['/compare/cabinetmaker/',         '/investment.html',     'Closest: flat-pack vs custom table'],

  // Guides
  ['/guides/',                       '/process.html',        'Nearest hub'],
  ['/guides/how-to-measure/',        '/process.html',        'Measuring is step one of the process'],
  ['/guides/what-you-get/',          '/kitchens.html',       'Collection inclusions'],
  ['/guides/trade/',                 '/contact.html',        'Trade enquiries'],
  ['/guides/blum-hardware/',         '/kitchens.html',       'Hardware is specced per collection'],
  ['/guides/benchtops/',             '/investment.html',     'Benchtop options and cost'],
  ['/guides/door-finishes/',         '/kitchens.html',       'Door finishes per collection'],

  // Product taxonomy — the new site sells designed kitchens, not cabinet SKUs
  ['/cabinets/',                     '/kitchens.html',       'No SKU taxonomy on the new site'],
  ['/cabinets/base-cabinets/',       '/kitchens.html',       'No SKU taxonomy'],
  ['/cabinets/wall-cabinets/',       '/kitchens.html',       'No SKU taxonomy'],
  ['/cabinets/pantry-and-tall/',     '/butlers-pantries.html', 'Closest: pantries'],
  ['/cabinets/panels-and-finishing/','/kitchens.html',       'No SKU taxonomy'],

  // Layouts
  ['/layouts/',                      '/kitchens.html',       'No layout taxonomy on the new site'],
  ['/layouts/galley-kitchen/',       '/kitchens.html',       'No layout taxonomy'],
  ['/layouts/l-shaped-kitchen/',     '/kitchens.html',       'No layout taxonomy'],
  ['/layouts/u-shaped-kitchen/',     '/kitchens.html',       'No layout taxonomy'],
  ['/layouts/island-kitchen/',       '/kitchens.html',       'No layout taxonomy'],

  // Locations the new business still serves
  ['/kitchens/rockhampton/',         '/kitchens.html',       'Rockhampton is the primary market'],
  ['/kitchens/gracemere/',           '/kitchens-gracemere.html', 'Direct match'],
  ['/kitchens/yeppoon/',             '/kitchens-yeppoon.html',   'Direct match'],
  ['/kitchens/emu-park/',            '/kitchens-capricorn-coast.html', 'Inside the Capricorn Coast page'],
  ['/kitchens/capricorn-coast/',     '/kitchens-capricorn-coast.html', 'Direct match'],
  ['/kitchens/central-queensland/',  '/kitchens.html',       'Covered by the main service area'],
  ['/kitchens/queensland/',          '/kitchens.html',       'Statewide supply retired'],
];

/* Locations the new business no longer serves. These 301 to the kitchens
   page so nothing 404s, but expect them to drop out of the index — which is
   correct, because the offer genuinely no longer covers them. */
const OUT_OF_AREA = [
  'moranbah', 'blackwater', 'dysart', 'clermont', 'emerald', 'longreach',
  'gladstone', 'tannum-sands', 'biloela', 'mackay', 'sarina', 'airlie-beach',
  'bundaberg', 'hervey-bay', 'townsville', 'cairns', 'brisbane', 'gold-coast',
  'sunshine-coast', 'toowoomba', 'ipswich', 'logan', 'caboolture',
  'bowen-basin', 'central-highlands', 'gladstone-region', 'mackay-whitsunday',
];
OUT_OF_AREA.forEach((s) => MAP.push([`/kitchens/${s}/`, '/kitchens.html', 'Out of service area — will de-index']));

/* Build types the new site does not sell */
['new-builds', 'class-1a', 'granny-flat', 'tiny-home', 'modular'].forEach((s) =>
  MAP.push([`/kitchens/${s}/`, '/kitchens.html', 'Build-type page retired']));

/* Legal */
MAP.push(['/legal/privacy/',  '/privacy.html', 'Direct match']);
MAP.push(['/legal/terms/',    '/',           'Old terms were an unfinished draft — do not carry over']);
MAP.push(['/legal/warranty/', '/kitchens.html', 'Warranty is stated per collection']);

/* ------------------------------------------------------------------ write */
const OUT = path.join(__dirname, 'out-redirects');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// Netlify / Cloudflare Pages
fs.writeFileSync(path.join(OUT, '_redirects'),
  MAP.map(([from, to]) => `${from}  ${T(to)}  301!`).join('\n') + '\n', 'utf8');

// Apache
fs.writeFileSync(path.join(OUT, '.htaccess'),
  ['RewriteEngine On', ...MAP.map(([from, to]) =>
    `Redirect 301 ${from} ${T(to)}`)].join('\n') + '\n', 'utf8');

// Nginx
fs.writeFileSync(path.join(OUT, 'nginx.conf'),
  MAP.map(([from, to]) => `location = ${from} { return 301 ${T(to)}; }`).join('\n') + '\n', 'utf8');

// Human-readable audit sheet
const rows = ['| Old URL | New URL | Note |', '|---|---|---|']
  .concat(MAP.map(([f, t, n]) => `| \`${f}\` | \`${t}\` | ${n} |`));
fs.writeFileSync(path.join(OUT, 'redirect-map.md'),
  `# biltstudio.com.au → new site\n\n${MAP.length} redirects. Every old URL resolves; none 404.\n\n`
  + `Target origin: ${NEW_ORIGIN || 'same origin (new site replaces the old one on biltstudio.com.au)'}\n\n`
  + rows.join('\n') + '\n', 'utf8');

const retired = MAP.filter((m) => /de-index|retired|no longer|No SKU|No layout/i.test(m[2])).length;
console.log(`${MAP.length} redirects written to out-redirects/`);
console.log(`  _redirects      Netlify / Cloudflare Pages`);
console.log(`  .htaccess       Apache`);
console.log(`  nginx.conf      Nginx`);
console.log(`  redirect-map.md review sheet`);
console.log(`\nOld URLs with a direct equivalent: ${MAP.length - retired}`);
console.log(`Old URLs whose offer is retired:   ${retired}  (expect these to de-index)`);
console.log(`Target origin: ${NEW_ORIGIN || 'same origin'}`);
