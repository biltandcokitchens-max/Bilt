/* Netlify build plugin: submit changed pages to IndexNow after every
 * production deploy goes live.
 *
 * This is the WordPress "IndexNow plugin" equivalent for a static site. The
 * build writes a per-page lastmod (_lastmod.json); this plugin remembers the
 * lastmod it last submitted for every URL (in Netlify's build cache) and,
 * once the deploy is live, sends only the URLs whose lastmod moved or that
 * are new. First run with an empty cache submits everything. Two deploys on
 * the same day do not double-submit.
 *
 * Registered in netlify.toml under [[plugins]]. Runs only for the production
 * context so deploy previews never ping search engines with preview content.
 */
const path = require('path');
const fs = require('fs');

const STATE = path.join(process.cwd(), '.indexnow-state.json');

module.exports = {
  async onSuccess({ utils, constants }) {
    if (process.env.CONTEXT !== 'production') {
      console.log(`IndexNow: skipped (${process.env.CONTEXT} context)`);
      return;
    }
    const indexnow = require(path.join(constants.PUBLISH_DIR, '_indexnow.js'));

    await utils.cache.restore(STATE);
    const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};

    const lm = indexnow.lastmodByUrl();
    const sent = state.submitted || {};
    const urls = Object.keys(lm).filter((u) => sent[u] !== lm[u]);
    if (!urls.length) {
      console.log('IndexNow: no pages changed since last submission');
      return;
    }

    let r;
    try {
      r = await indexnow.submit(urls);
    } catch (e) {
      // Never fail a deploy over a ping. Leave the state alone so the next
      // deploy retries the same set.
      utils.status.show({ title: 'IndexNow', summary: `Request failed: ${e.message}` });
      return;
    }
    if (!r.ok) {
      utils.status.show({ title: 'IndexNow', summary: `Rejected (${r.status}) for ${r.count} URLs. ${r.body || ''}`.trim() });
      return;
    }

    urls.forEach((u) => { sent[u] = lm[u]; });
    // Pages removed from the sitemap drop out of the state too.
    Object.keys(sent).forEach((u) => { if (!lm[u]) delete sent[u]; });
    state.submitted = sent;
    state.lastRun = new Date().toISOString();
    fs.writeFileSync(STATE, JSON.stringify(state, null, 2));
    await utils.cache.save(STATE);

    utils.status.show({ title: 'IndexNow', summary: `Submitted ${r.count} URL${r.count === 1 ? '' : 's'} (HTTP ${r.status})`, text: urls.join('\n') });
    console.log(`IndexNow: submitted ${r.count} URLs (HTTP ${r.status})`);
  },
};
