/* IndexNow submission.
 *
 * IndexNow tells Bing and Yandex a page changed instead of waiting to be
 * crawled. Bing also feeds Copilot and ChatGPT search, so this is the fastest
 * route into the AI answer engines. Google does not participate — for Google,
 * the sitemap's per-page <lastmod> (from _lastmod.json) is the signal, and
 * "Request indexing" in Search Console is the manual override.
 *
 * Two ways to run:
 *   node _indexnow.js            every URL in the sitemap
 *   node _indexnow.js --since D  only pages whose _lastmod.json date is >= D
 *
 * The Netlify plugin in _plugins/indexnow calls submit() automatically after
 * every production deploy with only the pages that changed since the last
 * successful submission. This file is the one place the request is built.
 *
 * The key file must be reachable at https://<host>/<key>.txt or the whole
 * submission is rejected (422).
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = __dirname;

function readKey() {
  const key = fs
    .readdirSync(ROOT)
    .filter((f) => /^[0-9a-f]{32}\.txt$/.test(f))
    .map((f) => f.replace('.txt', ''))[0];
  if (!key) throw new Error('No IndexNow key file found. Expected a <32-hex>.txt in the site root.');
  return key;
}

function sitemapUrls() {
  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urls.length) throw new Error('sitemap.xml contained no <loc> entries. Run node _build.js first.');
  return urls;
}

/* URL -> lastmod date, joined through the sitemap so noindex pages never
   get submitted. */
function lastmodByUrl() {
  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const out = {};
  for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) out[m[1]] = m[2];
  return out;
}

function changedSince(date) {
  const lm = lastmodByUrl();
  return Object.keys(lm).filter((u) => lm[u] >= date);
}

function submit(urlList) {
  return new Promise((resolve, reject) => {
    if (!urlList.length) return resolve({ status: 0, count: 0, skipped: true });
    const key = readKey();
    const host = new URL(urlList[0]).host;
    const payload = JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList });
    const req = https.request(
      {
        hostname: 'api.indexnow.org',
        path: '/indexnow',
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(payload) },
      },
      (res) => {
        let body = '';
        res.on('data', (d) => (body += d));
        res.on('end', () => {
          // 200 and 202 both mean accepted. 422 usually means the key file is
          // not reachable yet, which happens if you run this before the
          // deploy lands.
          const ok = res.statusCode === 200 || res.statusCode === 202;
          resolve({ status: res.statusCode, ok, count: urlList.length, host, body: body.trim() });
        });
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

module.exports = { submit, sitemapUrls, changedSince, lastmodByUrl };

if (require.main === module) {
  const i = process.argv.indexOf('--since');
  const urls = i > -1 ? changedSince(process.argv[i + 1]) : sitemapUrls();
  submit(urls)
    .then((r) => {
      if (r.skipped) return console.log('Nothing to submit.');
      console.log(`${r.ok ? '✓' : '✗'} IndexNow ${r.status} — submitted ${r.count} URLs for ${r.host}`);
      if (r.body) console.log(r.body);
      if (!r.ok) process.exitCode = 1;
    })
    .catch((e) => {
      console.error('IndexNow request failed:', e.message);
      process.exitCode = 1;
    });
}
