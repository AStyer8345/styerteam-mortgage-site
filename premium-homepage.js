/* Homepage payment teaser delegates amortization to the existing CalcSuite. */
(function () {
  'use strict';
  if (!document.body.classList.contains('premium-homepage')) return;
  // The phone bar’s primary action is the same scenario review as the nav.
  // Call and text stay on the bar as secondary. The note form on this page
  // is not the primary path.
  var mobileInquiry = document.querySelector('.advisory-contact-bar-primary');
  if (mobileInquiry) {
    mobileInquiry.href = '/get-preapproved.html?intent=scenario';
    mobileInquiry.textContent = 'See My Options';
    mobileInquiry.setAttribute('data-track','scenario_review_click');
    mobileInquiry.setAttribute('data-source','homepage_sticky_mobile');
  }
  // Desktop submenus also work from a keyboard and dismiss with Escape.
  document.querySelectorAll('header .nav-has-dropdown').forEach(function (item) {
    var parent = item.querySelector(':scope > a');
    item.addEventListener('focusin',function () {
      if (window.innerWidth > 1280 && !item.hasAttribute('data-dismissed')) {
        item.classList.add('open'); parent.setAttribute('aria-expanded','true');
      }
    });
    item.addEventListener('focusout',function (event) {
      // Keep mobile tap targets stable until the shared click handler runs.
      if (window.innerWidth <= 1280) return;
      if (!item.contains(event.relatedTarget)) {
        item.removeAttribute('data-dismissed');item.classList.remove('open');parent.setAttribute('aria-expanded','false');
      }
    });
    item.addEventListener('keydown',function (event) {
      if (event.key === 'Escape' && window.innerWidth > 1280) {
        item.setAttribute('data-dismissed','');item.classList.remove('open');parent.setAttribute('aria-expanded','false');parent.focus();
      }
    });
    item.addEventListener('mouseenter',function () {item.removeAttribute('data-dismissed');});
  });
  var loan = document.getElementById('home-loan');
  var rate = document.getElementById('home-rate');
  var term = document.getElementById('home-term');
  var output = document.getElementById('home-payment-output');
  var error = document.getElementById('home-payment-error');
  if (!loan || !window.CalcSuite) return;
  var timer;
  function update() {
    var amount = Number(loan.value), interest = Number(rate.value), years = Number(term.value);
    var valid = loan.value.trim() !== '' && rate.value.trim() !== '' && Number.isFinite(amount) && amount > 0 && amount <= 100000000 && Number.isFinite(interest) && interest >= 0 && interest <= 30 && [15,20,30].includes(years);
    error.hidden = valid;
    loan.setAttribute('aria-invalid', String(!loan.validity.valid || !loan.value));
    rate.setAttribute('aria-invalid', String(!rate.validity.valid || !rate.value));
    output.replaceChildren(document.createTextNode(valid ? window.CalcSuite.formatCurrency(window.CalcSuite.monthlyPayment(amount,interest,years)) : '—'));
    if (valid) { var unit = document.createElement('span'); unit.textContent = ' / month'; output.appendChild(unit); }
  }
  [loan,rate,term].forEach(function (field) {
    field.addEventListener('input',function () {clearTimeout(timer);timer=setTimeout(update,200);});
    field.addEventListener('change',function () {clearTimeout(timer);update();});
  });
  update();
})();

/* Fast, smooth count-up animation for ledger metrics (1,000+ and 150+) */
(function () {
  'use strict';
  function initCounters() {
    var counters = document.querySelectorAll('.pwe-ledger-num[data-count-to]');
    if (!counters.length) return;

    function runCounter(el) {
      if (el.dataset.animating || el.dataset.counted) return;
      el.dataset.animating = 'true';
      var target = parseInt(el.getAttribute('data-count-to'), 10);
      var suffix = el.getAttribute('data-count-suffix') || '';
      if (isNaN(target)) return;

      var duration = 750; // fast & crisp ~750ms
      var startTime = performance.now();

      function tick(now) {
        var elapsed = now - startTime;
        var progress = Math.min(elapsed / duration, 1);
        // easeOutCubic curve for rapid initial acceleration and clean snap
        var ease = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(ease * target);
        var formatted = target >= 1000 ? current.toLocaleString('en-US') : current;
        el.textContent = formatted + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          var finalFormatted = target >= 1000 ? target.toLocaleString('en-US') : target;
          el.textContent = finalFormatted + suffix;
          el.dataset.counted = 'true';
        }
      }
      requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      counters.forEach(function (c) { observer.observe(c); });
    } else {
      counters.forEach(runCounter);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
