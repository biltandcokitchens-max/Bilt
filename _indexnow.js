/* Ping IndexNow with every URL in the sitemap.
 *
 * IndexNow tells Bing and Yandex a page changed instead of waiting to be
 * crawled. Bing also feeds Copilot and ChatGPT search, so this is the fastest
 * route into the AI answer engines. Google does not participate — for Google,
 * submit the sitemap in Search Console and use "Request indexing".
 *
 * Run after a deploy has gone live:  node _indexnow.js
 * The key file must be reachable at https://<host>/<key>.txt or the whole
 * submission is rejected.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const KEY = fs
  .readdirSync(__dirname)
  .filter((f) => /^[0-9a-f]{32}\.txt$/.test(f))
  .map((f) => f.replace('.txt', ''))[0];

if (!KEY) {
  console.error('No IndexNow key file found. Expected a <32-hex>.txt in this folder.');
  process.exit(1);
}

const sitemap = fs.readFileSync(path.join(__dirname, 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!urlList.length) {
  console.error('sitemap.xml contained no <loc> entries. Run node _build.js first.');
  process.exit(1);
}

const host = new URL(urlList[0]).host;
const payload = JSON.stringify({
  host,
  key: KEY,
  keyLocation: `https://${host}/${KEY}.txt`,
  urlList,
});

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
      // 200 and 202 both mean accepted. 422 usually means the key file is not
      // reachable yet, which happens if you run this before the deploy lands.
      const ok = res.statusCode === 200 || res.statusCode === 202;
      console.log(`${ok ? '✓' : '✗'} IndexNow ${res.statusCode} — submitted ${urlList.length} URLs for ${host}`);
      if (body.trim()) console.log(body.trim());
      if (!ok) process.exitCode = 1;
    });
  }
);

req.on('error', (e) => {
  console.error('IndexNow request failed:', e.message);
  process.exitCode = 1;
});
req.write(payload);
req.end();
