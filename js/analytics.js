/* ==================================================================
   BILT STUDIO — measurement

   The page had no tracking of any kind, which means there is currently
   no way to know whether the planner is the conversion path everything
   on the page assumes it is.

   Three deliberate choices:

   1. INERT UNTIL CONFIGURED. MEASUREMENT_ID is empty. Nothing loads and
      no network request is made until a real G-XXXXXXX is dropped in.
      This ships safely — it cannot leak data before the privacy policy
      exists, and that policy is still an unwritten page.

   2. CONSENT FIRST. Google Consent Mode v2 defaults are set to denied
      BEFORE the tag loads, so the first pageview of a visitor who has
      not opted in is cookieless. Australian Privacy Act obligations are
      lighter than GDPR, but the site takes EU and UK traffic too and
      the cost of doing this correctly is four lines.

   3. NO VENDOR IN THE MARKUP. Everything routes through dataLayer, so
      swapping GA4 for Plausible or Fathom later is a change to this
      file only — the data-track attributes in the HTML stay put.
   ================================================================== */
(() => {
  'use strict';

  /* ---- fill this in to switch measurement on -------------------- */
  const MEASUREMENT_ID = '';        // e.g. 'G-XXXXXXXXXX'
  const CONSENT_KEY = 'bilt.consent.analytics';

  const dl = (window.dataLayer = window.dataLayer || []);
  function gtag() { dl.push(arguments); }
  window.gtag = window.gtag || gtag;

  /* Consent defaults go in before anything else, or the first hit is
     already out the door under the wrong assumption. */
  const granted = localStorage.getItem(CONSENT_KEY) === 'granted';
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });

  /* Exposed so a consent banner — which does not exist yet — can flip
     this without touching the tag itself. */
  window.biltGrantAnalytics = function (yes) {
    localStorage.setItem(CONSENT_KEY, yes ? 'granted' : 'denied');
    gtag('consent', 'update', { analytics_storage: yes ? 'granted' : 'denied' });
  };

  if (MEASUREMENT_ID) {
    const t = document.createElement('script');
    t.async = true;
    t.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    document.head.appendChild(t);
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID, { anonymize_ip: true });
  }

  /* ---- the events worth having ----------------------------------
     Kept to the handful that describe the funnel this page is built
     around. More events is not more insight; these are the ones a
     decision would actually hang on. */

  // 1. every CTA, by name. Delegated, so it survives the re-render.
  document.addEventListener('click', (ev) => {
    const el = ev.target.closest?.('[data-track]');
    if (!el) return;
    dl.push({
      event: 'cta_click',
      cta: el.dataset.track,
      href: el.getAttribute('href') || null,
    });
  });

  // 2. reaching the planner is the conversion this whole page exists for
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest?.('a[href*="/roomplanner"]');
    if (a) dl.push({ event: 'planner_open', from: a.dataset.track || 'other' });
  });

  /* 3. scroll depth, once each. The page is a long scroll-driven story;
        without this there is no way to tell whether anyone reaches the
        pricing at all, or bails during the hero film. */
  const marks = [25, 50, 75, 100];
  const seen = new Set();
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      try {
        const h = document.documentElement;
        const max = h.scrollHeight - innerHeight;
        if (max <= 0) return;
        const pct = (scrollY / max) * 100;
        for (const m of marks) {
          if (pct >= m && !seen.has(m)) {
            seen.add(m);
            dl.push({ event: 'scroll_depth', percent: m });
          }
        }
      } finally { ticking = false; }
    });
  }, { passive: true });
})();
