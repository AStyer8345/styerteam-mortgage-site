// assets/utm.js
// Auto-populates hidden UTM + page_url + referrer fields on any form.
// Safe-by-default: only fills empty inputs, never overwrites values populated by inline JS.

(function () {
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }
  function fill(name, value) {
    document.querySelectorAll('input[name="' + name + '"]').forEach(function (el) {
      if (el.value === '') el.value = value;
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    fill('utm_source',   getParam('utm_source'));
    fill('utm_medium',   getParam('utm_medium'));
    fill('utm_campaign', getParam('utm_campaign'));
    fill('utm_term',     getParam('utm_term'));
    fill('utm_content',  getParam('utm_content'));
    fill('page_url',     window.location.href);
    fill('referrer',     document.referrer);
  });
})();
