/* BILT &amp; CO — interactions */
(function () {
  'use strict';

  /* ---- Mobile nav ---- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Header: solid on scroll, hide on scroll-down ---- */
  var head = document.querySelector('.head');
  var sticky = document.querySelector('.sticky-cta');
  var last = 0;
  function onScroll() {
    var y = window.pageYOffset;
    if (head) {
      head.classList.toggle('solid', y > 40);
      head.classList.toggle('hide', y > 520 && y > last && !document.body.classList.contains('nav-open'));
    }
    if (sticky) sticky.classList.toggle('show', y > 640);
    last = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  var items = document.querySelectorAll('[data-rv]');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Enquiry forms ----------------------------------------------------
     The forms POST natively to Netlify Forms and redirect to /thanks.html.
     No JS is required for them to work; this only guards against a double
     submit on a slow connection. -------------------------------------- */
  var leadForms = document.querySelectorAll('form[data-netlify]');
  Array.prototype.forEach.call(leadForms, function (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    });
  });

  /* ---- Investment estimator ---- */
  var est = document.getElementById('estimator');
  if (est) {
    var out = est.querySelector('[data-est-out]');
    var note = est.querySelector('[data-est-note]');
    // Base rates are indicative supply-and-install ranges per linear metre of cabinetry
    // for the Central Queensland market. Confirm against the client's real rate card.
    // Calibrated so a typical 7m kitchen lands inside the bands published on
    // investment.html: Essence $15–23k, Maison $26–42k, Atelier $47k+.
    var TIER = { essence: [1970, 2850], maison: [3070, 5040], atelier: [6150, 8700] };
    var BENCH = { laminate: 0, stone: 1750, porcelain: 3000, natural: 4750 };
    var EXTRA = { pantry: 4000, island: 2850, appliances: 3700, wine: 2350 };

    function fmt(n) { return '$' + (Math.round(n / 100) * 100).toLocaleString('en-AU'); }

    function calc() {
      var metres = parseFloat(est.querySelector('[name="metres"]').value) || 0;
      var tier = est.querySelector('[name="tier"]').value;
      var bench = est.querySelector('[name="bench"]').value;
      var extras = Array.prototype.slice.call(est.querySelectorAll('[name="extra"]:checked')).map(function (i) { return i.value; });

      var r = TIER[tier] || TIER.maison;
      var lo = metres * r[0], hi = metres * r[1];
      var b = BENCH[bench] || 0;
      lo += b; hi += b * 1.35;
      extras.forEach(function (k) { lo += EXTRA[k] || 0; hi += (EXTRA[k] || 0) * 1.4; });
      // Nothing we sell is cheaper than a kitchenette, so no estimate should be.
      var FLOOR = 4500;
      if (lo < FLOOR) lo = FLOOR;
      if (hi < FLOOR) hi = FLOOR;

      if (!metres) { out.textContent = 'Enter your run length'; note.textContent = ''; return; }
      out.textContent = fmt(lo) + ' – ' + fmt(hi);
      note.textContent = 'Indicative supply and installation for ' + metres + ' linear metres, ' +
        est.querySelector('[name="tier"]').selectedOptions[0].text.toLowerCase() + '. Excludes appliances, plumbing, electrical and any structural work.';
    }
    est.addEventListener('input', calc);
    est.addEventListener('change', calc);
    calc();
  }


  /* ---- Scroll-scrubbed video -------------------------------------------
     A tall [data-scrub] track holds a sticky stage; scroll position through
     the track maps to the video's currentTime, eased so seeking stays smooth.
     Narrow screens and reduced-motion users get a quiet autoplay loop instead,
     because per-frame seeking is expensive on mobile and reads as motion the
     user has asked us not to produce. ------------------------------------ */
  var tracks = document.querySelectorAll('[data-scrub]');
  Array.prototype.forEach.call(tracks, function (track) {
    var video = track.querySelector('video');
    if (!video) return;

    /* The film is 1.4MB. Loading it eagerly cost ~2s of LCP on the home page,
       so it is fetched only when the band is near the viewport. */
    if ('IntersectionObserver' in window) {
      var lazy = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) {
          if (video.preload !== 'auto') { video.preload = 'auto'; video.load(); }
          lazy.disconnect();
        }
      }, { rootMargin: '300px 0px' });
      lazy.observe(track);
    } else { video.preload = 'auto'; }

    var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var mqSmall = window.matchMedia('(max-width: 820px)');
    var target = 0, current = 0, raf = null, ready = false, mode = null, primed = false;

    function span() { return track.offsetHeight - window.innerHeight; }

    function progress() {
      var s = span();
      if (s <= 0) return 0;
      var top = track.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, -top / s));
    }

    function tick() {
      current += (target - current) * 0.14;
      if (Math.abs(current - video.currentTime) > 0.015) {
        try { video.currentTime = current; } catch (e) { /* seek not ready */ }
      }
      raf = Math.abs(target - current) > 0.004 ? requestAnimationFrame(tick) : null;
    }

    function onScroll() {
      if (mode !== 'scrub' || !ready) return;
      var p = progress();
      track.style.setProperty('--p', p.toFixed(3));
      target = p * Math.max(0, video.duration - 0.05);
      if (raf === null) raf = requestAnimationFrame(tick);
    }

    /* Safari/iOS will not seek a video it has never been told to play. */
    function prime() {
      if (primed) return;
      primed = true;
      var pr = video.play();
      if (pr && pr.then) pr.then(function () { video.pause(); }).catch(function () {});
      else { try { video.pause(); } catch (e) {} }
    }

    function setMode(next) {
      if (next === mode) return;
      mode = next;
      if (mode === 'loop') {
        track.classList.add('is-loop');
        video.loop = true;
        var pr = video.play();
        if (pr && pr.catch) pr.catch(function () {});
      } else {
        track.classList.remove('is-loop');
        video.loop = false;
        prime();
        current = target = video.currentTime || 0;
        onScroll();
      }
    }

    function decide() { setMode(mqSmall.matches || mqReduce.matches ? 'loop' : 'scrub'); }

    video.addEventListener('loadedmetadata', function () {
      ready = true;
      track.classList.add('is-ready');
      decide();
    });
    if (video.readyState >= 1) { ready = true; track.classList.add('is-ready'); decide(); }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { decide(); onScroll(); }, { passive: true });
    ['change', 'addListener'].length && [mqSmall, mqReduce].forEach(function (mq) {
      if (mq.addEventListener) mq.addEventListener('change', decide);
      else if (mq.addListener) mq.addListener(decide);
    });
  });

  /* ---- Conversion events ----
     Pageviews alone cannot answer "which page earns enquiries", so send the
     actions that represent real intent. No-ops entirely when GA4 is not
     configured, because gtag simply will not exist.

     Every event carries page_type, so an audience can be "people who got
     halfway down a WA town page and clicked call" rather than a URL guess. */
  var BILT_CTX = (function () {
    var m = document.querySelector('meta[name="bilt-page"]');
    var v = m ? m.getAttribute('content').split('|') : [];
    return { page_type: v[0] || 'other', content_state: v[1] || 'none', content_region: v[2] || 'none' };
  })();

  function track(name, params) {
    if (typeof window.gtag !== 'function') return;
    var p = params || {};
    p.page_type = BILT_CTX.page_type;
    p.content_state = BILT_CTX.content_state;
    p.content_region = BILT_CTX.content_region;
    p.page_path = p.page_path || location.pathname;
    window.gtag('event', name, p);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) {
      track('contact_phone', { method: 'phone', page_path: location.pathname });
    } else if (href.indexOf('mailto:') === 0) {
      track('contact_email', { method: 'email', page_path: location.pathname });
    }
  }, { passive: true });

  Array.prototype.forEach.call(document.querySelectorAll('form[data-netlify], form[name]'), function (f) {
    f.addEventListener('submit', function () {
      // generate_lead is a GA4 recommended event, so it shows up in the
      // standard reports rather than needing a custom definition.
      var lead = { form_name: f.getAttribute('name') || 'unnamed', page_path: location.pathname };
      // Estimated value of an enquiry, set as SITE.leadValue in _build.js.
      // Unset until a real figure exists: a made-up number trains Ads on fiction.
      if (window.BILT_LEAD_VALUE) { lead.value = window.BILT_LEAD_VALUE; lead.currency = 'AUD'; }
      track('generate_lead', lead);
    });
  });

  var estimator = document.querySelector('#estimator, [data-estimator]');
  if (estimator) {
    var sent = false;
    estimator.addEventListener('change', function () {
      if (sent) return;
      sent = true;  // once per visit; we want engagement, not every keystroke
      track('estimator_used', { page_path: location.pathname });
    });
  }

  /* ---- Scroll depth ----
     Three marks, once each per page. Read depth is the best available proxy
     for genuine interest on a page nobody fills a form on, and it is what
     makes a usable remarketing audience out of the geography pages. */
  (function () {
    var marks = [25, 50, 75, 90], hit = {};
    function check() {
      var h = document.documentElement;
      var pct = (h.scrollTop + window.innerHeight) / h.scrollHeight * 100;
      for (var i = 0; i < marks.length; i++) {
        if (pct >= marks[i] && !hit[marks[i]]) {
          hit[marks[i]] = true;
          track('scroll_depth', { percent_scrolled: marks[i] });
        }
      }
      if (hit[90]) window.removeEventListener('scroll', check);
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
  })();

  /* ---- Engaged reader ----
     Thirty seconds on the page with at least one interaction. Filters the
     bounce traffic out of any audience built on this. */
  (function () {
    var interacted = false, fired = false;
    ['click', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, function () { interacted = true; }, { passive: true, once: true });
    });
    setTimeout(function () {
      if (interacted && !fired && !document.hidden) { fired = true; track('engaged_read'); }
    }, 30000);
  })();

  /* ---- Enquiry start, and where people give up ----
     GA4 Enhanced Measurement sends its own form_start, so ours is named
     enquiry_start to keep the two apart. The gap between enquiry_start and
     generate_lead is the abandonment rate; last_field says which field they
     stopped at, which is what would actually justify changing the form. */
  Array.prototype.forEach.call(document.querySelectorAll('form[data-netlify], form[name]'), function (f) {
    var started = false, submitted = false, lastField = '';
    f.addEventListener('input', function (e) {
      if (e.target && e.target.name) lastField = e.target.name;
      if (started) return;
      started = true;
      track('enquiry_start', { form_name: f.getAttribute('name') || 'unnamed' });
    }, { passive: true });
    f.addEventListener('submit', function () { submitted = true; });
    // Abandonment is sent on hide, the only teardown event mobile honours.
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState !== 'hidden' || !started || submitted) return;
      submitted = true;
      track('enquiry_abandon', { form_name: f.getAttribute('name') || 'unnamed', last_field: lastField });
    });
  });

  /* ---- Quote intent ----
     A click on any primary call to action, wherever it sits on the page. The
     position tells us which block actually earns the click. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="contact"], a[href="/contact"]');
    if (!a) return;
    var sec = a.closest('section');
    track('quote_intent', {
      cta_text: (a.textContent || '').trim().slice(0, 40),
      cta_section: (sec && (sec.id || sec.className.split(' ')[0])) || 'unknown'
    });
  }, { passive: true });

  /* ---- Outbound clicks ----
     Mostly the council and licensing links in the guides. Worth knowing which
     regulator pages people actually needed. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="http"]');
    if (!a) return;
    if (a.hostname === location.hostname) return;
    track('click', { link_domain: a.hostname, link_url: a.href, outbound: true });
  }, { passive: true });

  /* ---- Consultation spots counter ----
     Counts down across the month and resets on the 1st. Derived from the date
     so every visitor on a given day sees the same figure, and recomputed on
     view rather than at build time so it is never stale between deploys. */
  var spotsEls = document.querySelectorAll('[data-spots]');
  if (spotsEls.length) {
    var start = parseInt(spotsEls[0].getAttribute('data-spots-start'), 10) || 6;
    var now = new Date();
    var daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    // Floor of 1: showing "0 left" would tell a ready buyer not to enquire.
    var left = Math.max(1, Math.ceil(start * (1 - (now.getDate() - 1) / daysInMonth)));
    Array.prototype.forEach.call(spotsEls, function (el) { el.textContent = String(left); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-spots-plural]'), function (el) {
      el.textContent = left === 1 ? 'spot' : 'spots';
    });
  }

  /* ---- Internal traffic badge ----
     Only ever renders on a device that has set the flag, so it is invisible to
     visitors. Without it the flag is unauditable - you cannot tell whether a
     device is still excluded, or how to undo it. */
  try {
    if (localStorage.getItem('bilt_internal') === '1') {
      var badge = document.createElement('div');
      badge.className = 'intbadge';
      badge.innerHTML = 'Analytics: internal &middot; not counted <a href="?internal=0">turn off</a>';
      document.body.appendChild(badge);
    }
  } catch (e) {}

  /* ---- Current year ---- */
  var yr = document.querySelectorAll('[data-year]');
  Array.prototype.forEach.call(yr, function (el) { el.textContent = new Date().getFullYear(); });
})();
