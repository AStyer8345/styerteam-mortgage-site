// First-touch attribution for Netlify forms.
// Stores only navigation metadata (never contact or scenario fields) and fills
// hidden inputs without overwriting values supplied by a page-specific script.

(function () {
  'use strict';

  var STORAGE_KEY = 'styer:first-touch:v1';
  var LAST_CTA_KEY = 'styer:last-cta:v1';
  var MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
  var LAST_CTA_MAX_AGE_MS = 30 * 60 * 1000;
  var UTM_NAMES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  function cleanText(value, maxLength) {
    return typeof value === 'string' ? value.trim().slice(0, maxLength || 300) : '';
  }

  // Keep useful path/origin data while dropping query strings and hashes that
  // could contain information a visitor did not intend to submit.
  function cleanUrl(value) {
    if (!value) return '';
    try {
      var parsed = new URL(value, window.location.origin);
      if (!/^https?:$/.test(parsed.protocol)) return '';
      return cleanText(parsed.origin + parsed.pathname, 500);
    } catch (_) {
      return '';
    }
  }

  function getParam(name) {
    return cleanText(new URLSearchParams(window.location.search).get(name) || '', 200);
  }

  function getStorage(name) {
    try {
      return window[name];
    } catch (_) {
      return null;
    }
  }

  function safeRead(storage) {
    try {
      if (!storage) return null;
      var value = JSON.parse(storage.getItem(STORAGE_KEY) || 'null');
      if (!value || typeof value !== 'object') return null;
      var recordedAt = Date.parse(value.first_touch_at || '');
      if (!recordedAt || Date.now() - recordedAt > MAX_AGE_MS) return null;
      return value;
    } catch (_) {
      return null;
    }
  }

  function safeWrite(storage, value) {
    try {
      if (!storage) return;
      storage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (_) {
      // Storage can be unavailable in private browsing or a restricted iframe.
    }
  }

  function readLastCta() {
    try {
      var sessionStorage = getStorage('sessionStorage');
      if (!sessionStorage) return null;
      var value = JSON.parse(sessionStorage.getItem(LAST_CTA_KEY) || 'null');
      var recordedAt = value && Date.parse(value.at || '');
      if (!recordedAt || Date.now() - recordedAt > LAST_CTA_MAX_AGE_MS) return null;
      return value;
    } catch (_) {
      return null;
    }
  }

  function referrerSource(referrer) {
    if (!referrer) return 'direct';
    try {
      var hostname = new URL(referrer).hostname.toLowerCase();
      if (hostname === window.location.hostname.toLowerCase()) return 'site_navigation';
      if (hostname.indexOf('google.') !== -1) return 'google';
      if (hostname.indexOf('bing.') !== -1) return 'bing';
      if (hostname.indexOf('chatgpt.') !== -1 || hostname.indexOf('openai.') !== -1) return 'chatgpt';
      if (hostname.indexOf('perplexity.') !== -1) return 'perplexity';
      if (hostname.indexOf('claude.') !== -1 || hostname.indexOf('anthropic.') !== -1) return 'claude';
      if (hostname.indexOf('gemini.') !== -1 || hostname.indexOf('bard.') !== -1) return 'gemini';
      if (hostname.indexOf('facebook.') !== -1 || hostname.indexOf('fb.') !== -1) return 'facebook';
      if (hostname.indexOf('instagram.') !== -1) return 'instagram';
      return 'referral';
    } catch (_) {
      return 'referral';
    }
  }

  function inferredCtaLabel(intent) {
    if (intent === 'scenario') return 'Send Your Scenario';
    if (intent === 'schedule') return 'Schedule Strategy Call';
    return '';
  }

  function makeFirstTouch() {
    var currentPage = cleanUrl(window.location.href);
    var entryReferrer = cleanUrl(document.referrer);
    var firstTouchPage = currentPage;

    // When the immediately preceding page is on this site, it is the earliest
    // page we can reliably recover on pages that did not yet load this script.
    try {
      if (entryReferrer && new URL(entryReferrer).origin === window.location.origin) {
        firstTouchPage = entryReferrer;
      }
    } catch (_) {
      // Keep the current page as the first-touch page.
    }

    var touch = {
      first_touch_page: firstTouchPage,
      first_touch_referrer: entryReferrer,
      first_touch_at: new Date().toISOString(),
      first_touch_source: getParam('source') || getParam('utm_source') || referrerSource(document.referrer)
    };
    UTM_NAMES.forEach(function (name) {
      touch['first_touch_' + name] = getParam(name);
    });
    return touch;
  }

  function getFirstTouch() {
    var sessionStorage = getStorage('sessionStorage');
    var localStorage = getStorage('localStorage');
    var firstTouch = safeRead(sessionStorage) || safeRead(localStorage);
    if (!firstTouch) firstTouch = makeFirstTouch();
    safeWrite(sessionStorage, firstTouch);
    safeWrite(localStorage, firstTouch);
    return firstTouch;
  }

  function fill(name, value) {
    document.querySelectorAll('input[name="' + name + '"]').forEach(function (el) {
      if (el.value === '') el.value = value || '';
    });
  }

  function populate() {
    var firstTouch = getFirstTouch();
    var lastCta = readLastCta();
    var intent = getParam('intent') || cleanText(lastCta && lastCta.intent, 100);
    var entryReferrer = cleanUrl(document.referrer);
    var source = getParam('source') || cleanText(lastCta && lastCta.source, 300) || getParam('utm_source') || firstTouch.first_touch_source || referrerSource(document.referrer);
    // `source` is a campaign label such as `homepage_hero`, not a URL. Keep it
    // out of cta_source_page so reports never invent paths like
    // /homepage_hero when the CTA click record is unavailable.
    var ctaSourcePage = cleanUrl(getParam('cta_source_page')) || cleanUrl(lastCta && lastCta.cta_source_page) || entryReferrer || firstTouch.first_touch_page || cleanUrl(window.location.href);
    var ctaLabel = getParam('cta_label') || cleanText(lastCta && lastCta.cta_label, 160) || inferredCtaLabel(intent);

    UTM_NAMES.forEach(function (name) {
      fill(name, getParam(name) || firstTouch['first_touch_' + name] || '');
      fill('first_touch_' + name, firstTouch['first_touch_' + name] || '');
    });
    fill('page_url', cleanUrl(window.location.href));
    fill('entry_referrer', entryReferrer);
    // Older forms still use this field name. The pre-approval funnel uses
    // entry_referrer so it cannot collide with Netlify's reserved metadata.
    fill('referrer', entryReferrer);
    fill('first_touch_page', firstTouch.first_touch_page || '');
    fill('first_touch_referrer', firstTouch.first_touch_referrer || '');
    fill('first_touch_at', firstTouch.first_touch_at || '');
    fill('first_touch_source', firstTouch.first_touch_source || '');
    fill('intent', intent);
    fill('source', source);
    fill('cta_source_page', ctaSourcePage);
    fill('cta_label', ctaLabel);

    window.StyerAttribution = {
      intent: intent,
      source: source,
      cta_source_page: ctaSourcePage,
      cta_label: ctaLabel,
      first_touch_page: firstTouch.first_touch_page || ''
    };
    document.dispatchEvent(new CustomEvent('styer:attribution-ready', {
      detail: window.StyerAttribution
    }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populate, { once: true });
  } else {
    populate();
  }
})();
