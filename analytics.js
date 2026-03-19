/**
 * analytics.js — Shared conversion tracking for styermortgage.com
 * Fires dataLayer events for GTM / Google Ads.
 * Included on every page. Do not add page-specific events here.
 */
(function () {
  'use strict';

  function track(eventData) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }

  function initTracking() {
    // ── Quick Quote form ───────────────────────────────────────────
    // Matches hero-quick-form on homepage and all landing pages
    document.querySelectorAll(
      'form.hero-quick-form, form[name="hero-quick-form"], form[name="quick-contact"]'
    ).forEach(function (form) {
      form.addEventListener('submit', function () {
        track({ event: 'generate_lead', lead_type: 'quick_quote' });
      });
    });

    // ── Phone number clicks ────────────────────────────────────────
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        track({ event: 'phone_click', phone_number: '5129566010' });
      });
    });

    // ── Calendly link clicks ───────────────────────────────────────
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function (link) {
      link.addEventListener('click', function () {
        track({ event: 'calendly_click' });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }
})();
