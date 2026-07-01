/* Hamed Ashouri Marketing — shared interactions (lightweight, no dependencies) */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Analytics (GA4) — privacy-friendly, single point of maintenance.
     To activate: replace G-XXXXXXXXXX below with your real GA4
     Measurement ID (Google Analytics → Admin → Data Streams → Web).
     Until then this block is a safe no-op — nothing loads, no cookies.
     IP is anonymized; we only track page views + the lead conversion.
  ----------------------------------------------------------------*/
  var GA_ID = 'G-XXXXXXXXXX';
  window.haTrack = function () {}; // safe default if analytics is off
  if (GA_ID && GA_ID.indexOf('XXXX') === -1) {
    var gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(gs);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
    window.haTrack = function (name, params) { gtag('event', name, params || {}); };
    // Fire the lead conversion automatically on the thank-you page.
    if (/thank-?you/i.test(location.pathname) || document.body.getAttribute('data-conversion') === 'lead') {
      window.haTrack('generate_lead', { source: 'ai_strategy_blueprint' });
    }
  }

  var isRTL = (document.documentElement.getAttribute('dir') === 'rtl') ||
              /-fa\.html?$/i.test(location.pathname);
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  // ---- Skip-to-content link (a11y): first focusable element on the page ----
  var main = document.querySelector('header.nav') &&
             document.querySelector('header.nav').nextElementSibling;
  if (!main) main = document.querySelector('section');
  if (main && !document.getElementById('main')) {
    main.id = 'main';
    main.setAttribute('tabindex', '-1');
    var skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#main';
    skip.textContent = isRTL ? 'رفتن به محتوا' : 'Skip to content';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  // ---- Current-page highlight in the nav (wayfinding) ----
  var navAnchors = document.querySelectorAll('.nav-links a');
  navAnchors.forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
    if (href && href === file && !a.classList.contains('nav-cta') &&
        !a.closest('.lang-switch')) {
      a.classList.add('current');
      a.setAttribute('aria-current', 'page');
    }
  });

  // ---- Mobile nav toggle (accessible: aria-expanded, Esc, click-outside, scroll-lock) ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    links.id = links.id || 'primary-nav';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'primary-nav');
    var setMenu = function (open) {
      links.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setMenu(!links.classList.contains('open'));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setMenu(false); toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('open') &&
          !links.contains(e.target) && !toggle.contains(e.target)) {
        setMenu(false);
      }
    });
  }

  // ---- Mobile sticky CTA bar (Book + Blueprint), injected on every page ----
  // Skipped where redundant: the booking page and the thank-you page.
  var suppress = /^(book|thank-?you)/i.test(file) ||
                 document.body.getAttribute('data-conversion') === 'lead';
  if (suppress) { document.body.classList.add('no-mobilecta'); }
  else {
    var bpHref = isRTL ? 'ai-strategy-blueprint-fa.html' : 'ai-strategy-blueprint.html';
    var bar = document.createElement('div');
    bar.className = 'mobile-cta';
    bar.setAttribute('aria-label', isRTL ? 'اقدام سریع' : 'Quick actions');
    bar.innerHTML =
      '<a class="m-book" href="book.html">' +
        (isRTL ? 'رزرو جلسه' : 'Book a Session') + '</a>' +
      '<a class="m-bp" href="' + bpHref + '">' +
        (isRTL ? 'بلوپرینت رایگان' : 'Free Blueprint') + '</a>';
    document.body.appendChild(bar);
  }

  // Subtle scroll reveals
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Tally embed loader (lazy, with graceful loading state)
  var d = document, w = 'https://tally.so/widgets/embed.js';
  var load = function () {
    if (typeof Tally !== 'undefined') { Tally.loadEmbeds(); return; }
    d.querySelectorAll('iframe[data-tally-src]:not([src])').forEach(function (e) {
      e.src = e.dataset.tallySrc;
    });
  };
  if (d.querySelector('iframe[data-tally-src]')) {
    if (typeof Tally !== 'undefined') { load(); }
    else if (d.querySelector('script[src="' + w + '"]') == null) {
      var s = d.createElement('script');
      s.src = w; s.onload = load; s.onerror = load; d.body.appendChild(s);
    }
    // hide loading state once the iframe paints
    var frame = d.querySelector('iframe[data-tally-src]');
    if (frame) {
      frame.addEventListener('load', function () {
        var ld = d.querySelector('.form-loading');
        if (ld) ld.style.display = 'none';
      });
    }
  }
})();
