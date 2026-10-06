/* Homepage payment teaser delegates amortization to the existing CalcSuite. */
(function () {
  'use strict';
  if (!document.body.classList.contains('premium-homepage')) return;
  // Reuse the shared Call / Text bar, but point its homepage inquiry to the
  // existing inline form. No new lead form or capture owner is introduced.
  var mobileInquiry = document.querySelector('.advisory-contact-bar-primary');
  if (mobileInquiry) {
    mobileInquiry.href = '#contact-form';
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
