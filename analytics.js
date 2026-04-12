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
  'use strict';

  function track(eventData) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }

  function initTracking() {
    // ── Successful lead submissions ────────────────────────────────
    document.addEventListener('styer:lead-submitted', function (event) {
      var detail = event.detail || {};
      track({
        event: 'generate_lead',
        lead_type: detail.lead_type || 'website_lead',
        form_name: detail.form_name || ''
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

    // ── Apply Now / loan application clicks ────────────────────────
    document.querySelectorAll('a[href*="mslp.my1003app.com"]').forEach(function (link) {
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
