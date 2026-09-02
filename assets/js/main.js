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
     three actions that represent a real lead. No-ops entirely when GA4 is not
     configured, because gtag simply will not exist. */
  function track(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
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
      track('generate_lead', { form_name: f.getAttribute('name') || 'unnamed', page_path: location.pathname });
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

  /* ---- Current year ---- */
  var yr = document.querySelectorAll('[data-year]');
  Array.prototype.forEach.call(yr, function (el) { el.textContent = new Date().getFullYear(); });
})();
