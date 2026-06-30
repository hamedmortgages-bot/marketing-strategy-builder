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

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
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
