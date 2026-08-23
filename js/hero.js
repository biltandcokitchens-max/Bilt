/* ==================================================================
   BILT STUDIO — hero

   Vanilla, no dependencies. The site ships no framework of its own and
   no build step, so a 40KB animation library for one section would be
   the most expensive thing on the page.

   One caveat drives the structure below: the landing page is rendered
   at runtime by the design tool's React runtime, which parses the
   <x-dc> template and mounts it into #dc-root. A `defer` script runs
   BEFORE that mount, so querying the hero at startup finds either
   nothing or the inert template copy — and anything bound to it is
   thrown away when React mounts. So element references are (re)bound
   whenever the rendered hero appears or is replaced; the window-level
   listeners are attached once and read through those references.
   ================================================================== */
(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width: 767px)');

  /* Only reduced-motion opts out of the scrub now — phones scrub too.
     `small` is still watched so crossing the breakpoint re-syncs. */
  const isStatic = () => reduced.matches;

  let hero = null, parts = null, media = null, video = null;

  /* --- helpers ---------------------------------------------------- */
  const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
  const span = (p, a, b) => clamp01((p - a) / (b - a));

  function paint(p) {
    if (!hero) return;

    /* Scroll is the film's transport. The wordmark, headline and
       buttons still arrive on load — so the frame is never empty — but
       the subheading is held back and brought in by scroll.

       Readiness is tested here rather than latched from a one-shot
       'loadeddata' listener — a cached video can be ready before the
       listener is attached, which would leave the film loaded but
       permanently invisible. */
    if (video && video.readyState >= 2 && Number.isFinite(video.duration)) {
      if (!video.classList.contains('is-ready')) video.classList.add('is-ready');
      const target = p * video.duration;
      if (Math.abs(video.currentTime - target) > 0.03) video.currentTime = target;
    }

    /* The subheading arrives as the scroll continues, a little after
       the film has started moving. */
    const sub = span(p, 0.06, 0.30);
    parts.sub.style.opacity = sub;
    parts.sub.style.transform = `translate3d(0, ${(1 - sub) * 24}px, 0)`;

    // the prompt to scroll retires once you have taken it
    parts.hint.style.opacity = 1 - span(p, 0.15, 0.4);
  }

  /* --- progress through the sticky track -------------------------- */
  function progress() {
    const r = hero.getBoundingClientRect();
    const travel = r.height - window.innerHeight;
    if (travel <= 0) return 0;
    return clamp01(-r.top / travel);
  }

  let ticking = false;
  function onScroll() {
    if (ticking || !hero || isStatic()) return;
    ticking = true;
    requestAnimationFrame(() => {
      // try/finally: if paint ever throws, the flag must still clear or
      // the hero latches on one frame and never moves again
      try { paint(progress()); } finally { ticking = false; }
    });
  }

  /* --- the film ---------------------------------------------------
     The still is in the markup and paints immediately; the video is
     fetched as soon as the hero is anywhere near the viewport and fades
     over the still once it can be scrubbed. Phones fetch it too — the
     file is ~0.9MB, which is the price of the effect on mobile. */
  function loadVideo() {
    if (!video || video.dataset.loaded || isStatic()) return;
    video.dataset.loaded = '1';
    video.preload = 'auto';
    video.src = video.dataset.src;
    // repaint as soon as there are frames, so the film appears without
    // waiting for the next scroll; paint() decides readiness itself
    video.addEventListener('loadeddata', () => paint(progress()), { once: true });
    video.addEventListener('canplay', () => paint(progress()), { once: true });
    // a video that will not load is not worth an error to anyone: the
    // poster still sits behind it and carries the composition
    video.addEventListener('error', () => video.classList.remove('is-ready'), { once: true });

    /* iOS will not decode frames for a video that has never played, so
       setting currentTime on it silently does nothing and the film sits
       on frame zero. Muted + playsinline lets this run without a user
       gesture; pausing on the same tick keeps it a scrub rather than
       playback. Desktop does not need it and is unharmed by it. */
    const kick = video.play();
    if (kick && typeof kick.then === 'function') {
      kick.then(() => { video.pause(); paint(progress()); }).catch(() => {});
    }
  }

  let near = null;

  /* Static composition: hand the subheading back to CSS, which shows it
     unconditionally without the is-scrub class. */
  function reset() {
    if (!hero) return;
    hero.classList.remove('is-scrub');
    parts.hint.style.cssText = '';
    parts.sub.style.cssText = '';
  }

  function sync() {
    if (!hero) return;
    if (isStatic()) { reset(); return; }
    hero.classList.add('is-scrub');
    loadVideo();
    paint(progress());
  }

  /* --- bind to the rendered hero, and re-bind if React replaces it - */
  function bind() {
    const el = document.querySelector('[data-hero]');
    // ignore the inert <x-dc> template copy — only the mounted one moves
    if (!el || el === hero || el.closest('x-dc')) return;

    hero = el;
    const pick = (name) => hero.querySelector(`[data-hero-el="${name}"]`);
    parts = {
      brand: pick('brand'), line1: pick('line1'), line2: pick('line2'),
      sub: pick('sub'), cta: pick('cta'), hint: pick('hint'),
    };
    media = hero.querySelector('[data-hero-media]');
    video = hero.querySelector('[data-hero-video]');

    // a hero missing its pieces is a markup change, not a runtime state
    // worth limping through
    if (!media || Object.values(parts).some((n) => !n)) { hero = null; return; }

    if (near) near.disconnect();
    near = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) loadVideo();
    }, { rootMargin: '200% 0px' });
    near.observe(hero);

    /* Next frame, so the browser has painted the starting state and the
       transition actually runs rather than being collapsed into the
       initial style resolution. */
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));

    sync();
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', sync, { passive: true });
  /* A hidden tab stops issuing animation frames, so a scroll that lands
     while backgrounded leaves the film on a stale frame until the next
     one. Re-sync on the way back rather than waiting for that scroll. */
  addEventListener('visibilitychange', () => { if (!document.hidden) sync(); });
  small.addEventListener('change', sync);
  reduced.addEventListener('change', sync);

  bind();
  // React mounts after this script runs, so watch for the hero arriving
  new MutationObserver(bind).observe(document.documentElement,
    { childList: true, subtree: true });

  /* --- CTA tracking hook ------------------------------------------
     Delegated from the document so it survives a re-render. No
     analytics vendor is wired up yet; this pushes to a dataLayer if one
     exists and is otherwise inert, so adding GA or Plausible later is a
     one-line change rather than a hunt through the markup. */
  document.addEventListener('click', (ev) => {
    const link = ev.target.closest?.('[data-track]');
    if (!link) return;
    (window.dataLayer = window.dataLayer || []).push({
      event: 'cta_click', cta: link.dataset.track, href: link.getAttribute('href'),
    });
  });
})();
