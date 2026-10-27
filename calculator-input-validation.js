/* Validate calculator numbers without substituting an example for invalid input. */
window.validateCalculatorInputs = function (ids, resultId) {
  var invalid = [];
  ids.forEach(function (id) {
    var el = document.getElementById(id);
    var raw = el.value.replace(/[$,]/g, '').trim();
    var n = Number(raw);
    var min = el.getAttribute('min') || el.dataset.min || '0';
    var max = el.getAttribute('max');
    var ok = /^(?:\d+\.?\d*|\.\d+)$/.test(raw) && Number.isFinite(n) && n >= Number(min) && (!max || n <= Number(max));
    if (id === 'w-sale-price') ok = ok && n > 0;
    if (id === 'w-term' || id === 'bd-term-custom') ok = ok && Number.isInteger(n);
    el.setAttribute('aria-invalid', String(!ok));
    el.style.outline = ok ? '' : '2px solid #b91c1c';
    var errorId = id + '-validation-error';
    var error = document.getElementById(errorId);
    if (!error) {
      error = document.createElement('small'); error.id = errorId;
      error.style.cssText = 'display:block;color:#b91c1c;line-height:1.4';
      el.parentNode.appendChild(error);
      el.setAttribute('aria-describedby', ((el.getAttribute('aria-describedby') || '') + ' ' + errorId).trim());
    }
    error.textContent = ok ? '' : 'Enter a complete number from ' + min + (max ? ' to ' + max : ' or more') + '.';
    if (!ok) invalid.push(id);
  });
  var notice = document.getElementById('calculator-validation-notice');
  if (!notice) {
    notice = document.createElement('p'); notice.id = 'calculator-validation-notice';
    notice.className = 'calculator-validation-notice'; notice.setAttribute('role', 'status');
    notice.style.cssText = 'font-size:1rem;line-height:1.5;color:#991b1b;background:#fff7ed;padding:12px;border-radius:8px';
    var result = document.getElementById(resultId);
    var anchor = result.closest('.adc-hero, .bd-summary-cards, .wrap-metric-headline') || result;
    anchor.parentNode.insertBefore(notice, anchor);
  }
  notice.hidden = invalid.length === 0;
  notice.textContent = 'Results still show the last valid inputs. Correct the highlighted fields to update them.';
  return invalid.length === 0;
};

// Do not export a prior scenario while the visible calculator inputs are invalid.
function stopInvalidCalculatorExport(event) {
  var notice = document.getElementById('calculator-validation-notice');
  if (!notice || notice.hidden) return;
  var exportButton = event.target.closest('#bd-share-btn, #bd-print-btn, #w-btn-pdf');
  if (exportButton || (event.type === 'submit' && event.target.id === 'adc-email-form')) {
    event.preventDefault(); event.stopImmediatePropagation();
    var field = document.querySelector('[aria-invalid="true"]');
    if (field) field.focus();
  }
}
document.addEventListener('click', stopInvalidCalculatorExport, true);
document.addEventListener('submit', stopInvalidCalculatorExport, true);
