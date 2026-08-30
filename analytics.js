/**
 * analytics.js — Shared conversion tracking for styermortgage.com
 * Fires dataLayer events for GTM / Google Ads.
 * Included on every page. Do not add page-specific events here.
 *
 * NOTE: thank_you_page_view is NOT fired here. It fires in two places:
 *   1. script.js initHeroQuickForm() — after confirmed Netlify submission
 *   2. /thank-you.html — on page load
 * This prevents false positives from premature firing before validation.
 */
(function () {
  var FIRST_TOUCH_KEY = 'styer:first-touch:v1';
  var LAST_CTA_KEY = 'styer:last-cta:v1';
  var FIRST_TOUCH_MAX_AGE = 90 * 24 * 60 * 60 * 1000;

  function cleanUrl(value) {
    if (!value) return '';
    try {
      var parsed = new URL(value, window.location.origin);
      if (!/^https?:$/.test(parsed.protocol)) return '';
      return (parsed.origin + parsed.pathname).slice(0, 500);
    } catch (_) {
      return '';
    }
  }

  function safeRead(storage, key) {
    try {
      if (!storage) return null;
      return JSON.parse(storage.getItem(key) || 'null');
    } catch (_) {
      return null;
    }
  }

  function safeWrite(storage, key, value) {
    try {
      if (!storage) return;
      storage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // Tracking must never interfere with navigation or conversion.
    }
  }

  function getStorage(name) {
    try {
      return window[name];
    } catch (_) {
      return null;
    }
  }

  function sourceFromReferrer(referrer) {
    if (!referrer) return 'direct';
    try {
      var host = new URL(referrer).hostname.toLowerCase();
      if (host === window.location.hostname.toLowerCase()) return 'site_navigation';
      if (host.indexOf('google.') !== -1) return 'google';
      if (host.indexOf('bing.') !== -1) return 'bing';
      if (host.indexOf('chatgpt.') !== -1 || host.indexOf('openai.') !== -1) return 'chatgpt';
      if (host.indexOf('perplexity.') !== -1) return 'perplexity';
      if (host.indexOf('claude.') !== -1 || host.indexOf('anthropic.') !== -1) return 'claude';
      if (host.indexOf('gemini.') !== -1 || host.indexOf('bard.') !== -1) return 'gemini';
      return 'referral';
    } catch (_) {
      return 'referral';
    }
  }

  function recordFirstTouch() {
    var sessionStorage = getStorage('sessionStorage');
    var localStorage = getStorage('localStorage');
    var existing = safeRead(sessionStorage, FIRST_TOUCH_KEY) || safeRead(localStorage, FIRST_TOUCH_KEY);
    var recordedAt = existing && Date.parse(existing.first_touch_at || '');
    if (recordedAt && Date.now() - recordedAt <= FIRST_TOUCH_MAX_AGE) {
      safeWrite(sessionStorage, FIRST_TOUCH_KEY, existing);
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var touch = {
      first_touch_page: cleanUrl(window.location.href),
      first_touch_referrer: cleanUrl(document.referrer),
      first_touch_at: new Date().toISOString(),
      first_touch_source: (params.get('source') || params.get('utm_source') || sourceFromReferrer(document.referrer)).slice(0, 200)
    };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (name) {
      touch['first_touch_' + name] = (params.get(name) || '').trim().slice(0, 200);
    });
    safeWrite(sessionStorage, FIRST_TOUCH_KEY, touch);
    safeWrite(localStorage, FIRST_TOUCH_KEY, touch);
  }

  function rememberQualificationCta(link) {
    if (!link.matches('a[href*="get-preapproved"]')) return;
    var href;
    try {
      href = new URL(link.href, window.location.href);
    } catch (_) {
      return;
    }
    safeWrite(getStorage('sessionStorage'), LAST_CTA_KEY, {
      cta_source_page: cleanUrl(window.location.href),
      cta_label: (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 160),
      intent: (href.searchParams.get('intent') || '').slice(0, 100),
      source: (href.searchParams.get('source') || window.location.pathname).slice(0, 300),
      at: new Date().toISOString()
    });
  }

  recordFirstTouch();

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a,button');
    if (!link) return;
    rememberQualificationCta(link);
    if (link.matches('a[href*="calendly.com"]') && !link.hasAttribute('data-qualified-calendar')) {
      event.preventDefault();
      safeWrite(getStorage('sessionStorage'), LAST_CTA_KEY, {
        cta_source_page: cleanUrl(window.location.href),
        cta_label: (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 160),
        intent: 'schedule',
        source: window.location.pathname.slice(0, 300),
        at: new Date().toISOString()
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'qualification_started',
        source_page: window.location.pathname,
        original_cta: (link.textContent || '').trim(),
      });
      window.location.href = '/get-preapproved.html?intent=schedule&source=' + encodeURIComponent(window.location.pathname);
      return;
    }
    var eventName = link.getAttribute('data-track');
    if (!eventName && link.matches('a[href^="mailto:"]')) eventName = 'email_click';
    if (!eventName && link.matches('a[href*="my1003app.com"]')) eventName = 'secure_application_click';
    if (!eventName && link.matches('a[href*="scenario"]')) eventName = 'send_scenario_click';
    if (!eventName) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, page_path: window.location.pathname });
  });
  'use strict';

  function track(eventData) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }

  function initTracking() {
    // ── Calendly link clicks ───────────────────────────────────────
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function (link) {
      link.addEventListener('click', function () {
        track({ event: 'book_call_click', page_path: window.location.pathname });
      });
    });

    // ── Apply Now / loan application clicks ────────────────────────
    document.querySelectorAll('a[href*="my1003app.com"]').forEach(function (link) {
      link.addEventListener('click', function () {
        track({ event: 'apply_now_click', destination: link.href });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }
})();
