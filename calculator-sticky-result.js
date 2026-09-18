// Keeps the live answer reachable on phones while someone edits a long input group.
// Used by the DSCR, asset-depletion, rate-buydown and WRAP calculators; the payment and affordability
// calculators have the same behavior built into calculator-suite.js.
// The full result, assumptions and disclaimers stay in their original location.
(function () {
  'use strict';
  var CONFIGS = [
    { main: '#dscr-calc-main', inputs: '.dscr-grid > .dscr-card', result: '.dscr-score-card',
      label: 'Estimated DSCR', value: '#dscr-score', suffix: 'x' },
    { main: '#adc-main', inputs: '.adc-grid > div:first-child', result: '.adc-hero',
      label: 'Illustrative monthly asset income', value: '#adc-hero-amount', detail: '#adc-hero-period' },
    { main: '#calc-main', inputs: '.bd-inputs-panel', result: '.bd-summary-cards',
      label: 'Year 1 payment', value: '#bd-out-yr1-pmt' },
    { main: '#wrap-calc', inputs: '.calc-inputs-col', result: '.wrap-dual-cards',
      label: 'Buyer monthly P&I', value: '#w-out-buyer-payment' }
  ];
  function init() {
    if (typeof IntersectionObserver === 'undefined' || typeof MutationObserver === 'undefined') return;
    CONFIGS.forEach(function (cfg) {
      var main = document.querySelector(cfg.main);
      if (!main) return;
      var inputs = main.querySelector(cfg.inputs);
      var result = main.querySelector(cfg.result);
      var value = main.querySelector(cfg.value);
      if (!inputs || !result || !value) return;
      if (!result.id) result.id = 'calculator-result';
      var summary = document.createElement('a');
      summary.className = 'calc-mobile-summary';
      summary.href = '#' + result.id;
      var label = document.createElement('span');
      var amount = document.createElement('strong');
      var more = document.createElement('small');
      label.textContent = cfg.label;
      more.textContent = 'View result & assumptions →';
      summary.append(label, amount, more);
      main.appendChild(summary);
      function refresh() {
        var text = value.textContent.trim();
        var hasNumber = /\d/.test(text);
        var extra = cfg.detail ? (main.querySelector(cfg.detail) || {}).textContent || '' : '';
        amount.textContent = hasNumber ? text + (cfg.suffix || '') + (extra ? ' ' + extra.trim() : '') : '—';
      }
      refresh();
      new MutationObserver(refresh).observe(result, { childList: true, subtree: true, characterData: true });
      var editing = false, resultVisible = false;
      var watcher = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === inputs) editing = entry.isIntersecting;
          if (entry.target === result) resultVisible = entry.isIntersecting;
        });
        document.body.classList.toggle('calc-editing-visible', editing && !resultVisible);
      });
      watcher.observe(inputs);
      watcher.observe(result);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
