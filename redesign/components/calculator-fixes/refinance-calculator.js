
/* =========================================================================
   REFINANCE CLOSING COSTS CALCULATOR — Pure JS, no dependencies
   ========================================================================= */

// ===== UTILITY FUNCTIONS =====

/** Format number as USD currency string */
function fmt(n) {
  if (n == null || isNaN(n)) return '$0.00';
  const abs = Math.abs(n);
  const str = abs.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return n < 0 ? '-' + str : str;
}

/** Parse a numeric value from an input element by ID; returns 0 if empty/NaN */
function num(id) {
  const v = parseFloat(String(document.getElementById(id).value).replace(/[$,]/g, ''));
  return isNaN(v) ? 0 : v;
}

/** Parse the closing date input; returns a Date or null */
function getClosingDate() {
  const val = document.getElementById('closing-date').value;
  if (!val) return null;
  // Input type="date" returns YYYY-MM-DD; parse as local date
  const parts = val.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

/** Get checked state of a checkbox by ID */
function isChecked(id) {
  return document.getElementById(id).checked;
}

/** Set text content of element by ID */
function setText(id, text) {
  document.getElementById(id).textContent = text;
}

// ===== PURE CALCULATION FUNCTIONS =====

/**
 * Compute per-diem interest amount.
 * @param {number} loanAmt - Loan amount in dollars
 * @param {number} noteRate - Note rate as a percentage (e.g. 6.5 for 6.5%)
 * @param {number} manualPerDiem - Manual per-diem override (0 = use computed)
 * @returns {number} per-diem interest in dollars
 */
function calcPerDiem(loanAmt, noteRate, manualPerDiem) {
  if (manualPerDiem > 0) return manualPerDiem;
  if (loanAmt <= 0 || noteRate <= 0) return 0;
  return (loanAmt * (noteRate / 100)) / 365;
}

/**
 * Compute number of prepaid interest days (closing day through end of month).
 * @param {Date} closingDate
 * @returns {number} number of days
 */
function calcPrepaidDays(closingDate) {
  if (!closingDate) return 0;
  const lastDay = new Date(closingDate.getFullYear(), closingDate.getMonth() + 1, 0).getDate();
  return lastDay - closingDate.getDate() + 1;
}

/**
 * Determine the first mortgage payment month and year.
 * Illustration assumption: first payment is the first day of the second month after closing.
 * @param {Date} closingDate
 * @returns {{month: number, year: number}} 0-indexed month, full year
 */
function calcFirstPaymentDate(closingDate) {
  if (!closingDate) return { month: 0, year: 2026 };
  // Standard refi convention: first payment is due the 1st of the SECOND month
  // after closing, regardless of closing day (interim interest covers the gap).
  const offset = 2;
  let m = closingDate.getMonth() + offset;
  let y = closingDate.getFullYear();
  if (m > 11) { m -= 12; y++; }
  return { month: m, year: y };
}

/**
 * Calculate the initial escrow deposit for property taxes.
 * Taxes are due once per year on December 31.
 *
 * Returns an object with every intermediate value for transparency.
 *
 * @param {number} annualTax
 * @param {Date} closingDate
 * @returns {object} breakdown of the tax escrow calculation
 */
function calcTaxEscrow(annualTax, closingDate) {
  if (!closingDate || annualTax <= 0) {
    return { monthlyTax: 0, escrowDeposits: 0, baseTaxNeeded: 0,
             cushion: 0, projectedAfterPay: 0, additionalForCushion: 0,
             aggregateAdj: 0, finalDeposit: 0, firstPmtMonth: 0, firstPmtYear: 0 };
  }

  const monthlyTax = annualTax / 12;

  // Step 1: Next tax due date — always Dec 31
  const closingYear = closingDate.getFullYear();
  let taxDueYear = closingYear;
  const nextDue = new Date(closingYear, 11, 31); // Dec 31
  if (closingDate > nextDue) {
    taxDueYear = closingYear + 1; // edge case
  }

  // Step 2: First escrow deposit month = first payment month
  const fp = calcFirstPaymentDate(closingDate);
  const firstM = fp.month; // 0-indexed
  const firstY = fp.year;

  // Step 3: Count monthly escrow deposits from firstEscrow through November of tax due year (inclusive)
  // November is month 10 (0-indexed)
  const totalFirst = firstY * 12 + firstM;
  const totalNov = taxDueYear * 12 + 10; // November of due year
  const escrowDeposits = Math.max(0, totalNov - totalFirst + 1);

  // Step 4: Base tax needed at closing
  const baseTaxNeeded = Math.max(0, annualTax - (escrowDeposits * monthlyTax));

  // Step 5: 2-month cushion
  const cushion = 2 * monthlyTax;

  // Step 6: Projected balance after paying tax bill
  const projectedAfterPay = (baseTaxNeeded + (escrowDeposits * monthlyTax)) - annualTax;

  // Step 7: Additional needed for cushion
  const additionalForCushion = Math.max(0, cushion - projectedAfterPay);

  // Step 8: Aggregate adjustment — conservative negative, capped at 1 monthly payment
  const aggregateAdj = -Math.min(baseTaxNeeded, monthlyTax);

  // Step 9: Final deposit
  const finalDeposit = Math.max(0, baseTaxNeeded + additionalForCushion + aggregateAdj);

  return {
    monthlyTax,
    escrowDeposits,
    baseTaxNeeded,
    cushion,
    projectedAfterPay,
    additionalForCushion,
    aggregateAdj,
    finalDeposit,
    firstPmtMonth: firstM + 1, // 1-indexed for display
    firstPmtYear: firstY,
    taxDueYear
  };
}

/**
 * Calculate insurance escrow deposit.
 * @param {number} annualHazard
 * @param {boolean} collectFullPremium - if true, annual premium is a prepaid, not escrowed
 * @returns {{monthlyIns: number, deposit: number, prepaidPremium: number}}
 */
function calcInsuranceEscrow(annualHazard, collectFullPremium) {
  if (annualHazard <= 0) return { monthlyIns: 0, deposit: 0, prepaidPremium: 0 };
  const monthlyIns = annualHazard / 12;
  if (collectFullPremium) {
    // Full premium is prepaid; no escrow deposit for insurance
    return { monthlyIns, deposit: 0, prepaidPremium: annualHazard };
  }
  // Standard: 2-month cushion
  return { monthlyIns, deposit: 2 * monthlyIns, prepaidPremium: 0 };
}

/**
 * Calculate HOA escrow deposit (simple: 2 months if escrowed).
 */
function calcHoaEscrow(monthlyHoa, escrowHoa) {
  if (!escrowHoa || monthlyHoa <= 0) return 0;
  return 2 * monthlyHoa;
}

// ===== SUM HELPERS =====

/** Sum all inputs with a given CSS class */
function sumClass(cls) {
  let total = 0;
  document.querySelectorAll('.' + cls).forEach(function(el) {
    const v = parseFloat(String(el.value).replace(/[$,]/g, ''));
    if (!isNaN(v)) total += v;
  });
  return total;
}

/** Collect named fee items from a class for the breakdown */
function collectFeeItems(cls) {
  const items = [];
  document.querySelectorAll('.' + cls).forEach(function(el) {
    const v = parseFloat(String(el.value).replace(/[$,]/g, '')) || 0;
    items.push({ name: el.getAttribute('data-name'), amount: v });
  });
  return items;
}

// ===== MASTER CALCULATION =====

function validateCostInputs() {
  const fields=[...document.querySelectorAll('.inputs input')].filter(el=>!el.readOnly&&!['checkbox','date','radio','hidden'].includes(el.type)&&el.id!=='computed-perdiem');
  let valid=true;
  fields.forEach(el=>{const raw=String(el.value).replace(/[$,]/g,'').trim(),n=Number(raw);const ok=raw===''||(/^(?:\d+\.?\d*|\.\d+)$/.test(raw)&&Number.isFinite(n)&&n>=0);el.setAttribute('aria-invalid',String(!ok));if(!ok)valid=false;});
  const dateEl=document.getElementById('closing-date'),dateValue=getClosingDate(),dateOk=!!dateValue&&Number.isFinite(dateValue.getTime());
  dateEl.setAttribute('aria-invalid',String(!dateOk));if(!dateOk)valid=false;
  let message=document.getElementById('refi-input-error');if(!message){message=document.createElement('p');message.id='refi-input-error';message.setAttribute('role','status');document.querySelector('.inputs').prepend(message);}
  message.textContent=valid?'':'Correct the highlighted amount or date. Enter a nonnegative number, or leave an optional amount blank. A closing date is needed for interest and escrow estimates.';
  if(!valid){document.querySelectorAll('[id^="sum-"]').forEach(el=>{if(!el.children.length)el.textContent='—';});window._lastResult=null;document.getElementById('bd-content').textContent='Correct the highlighted inputs to see the breakdown.';}
  return valid;
}
function calculateAll() {
  if(!validateCostInputs())return;
  const loanAmt = num('loan-amount');
  const noteRate = num('note-rate');
  const manualPerDiem = num('manual-perdiem');
  const closingDate = getClosingDate();
  const annualTax = num('annual-taxes');
  const annualHazard = num('annual-hazard');
  const monthlyHoa = num('monthly-hoa');
  const escrowsOn = isChecked('escrow-toggle');
  const escrowHoa = isChecked('escrow-hoa');
  const collectFullPremium = isChecked('collect-full-premium');
  const collectPrepaidAnyway = isChecked('collect-prepaid-anyway');
  const lendersTitle = num('lenders-title');
  const lenderCredit = num('lender-credit');
  const sellerCredit = num('seller-credit');

  // --- Per-diem ---
  const perDiem = calcPerDiem(loanAmt, noteRate, manualPerDiem);
  document.getElementById('computed-perdiem').value = perDiem > 0 ? fmt(perDiem) + '/day' : '—';

  // --- Prepaid interest ---
  const prepaidDays = calcPrepaidDays(closingDate);
  const prepaidInterest = perDiem * prepaidDays;

  // --- Discount Points ---
  const pointsPct = num('points-pct');
  let pointsDollar = num('points-dollar');
  if(!document.getElementById('points-dollar').dataset.manual && pointsPct===0){pointsDollar=0;document.getElementById('points-dollar').value='0.00';}
  // Auto-compute from % if loan amount is available and % is entered
  if (pointsPct > 0 && loanAmt > 0) {
    const computed = loanAmt * (pointsPct / 100);
    // Only auto-fill if user hasn't manually typed a $ amount
    if (!document.getElementById('points-dollar').dataset.manual) {
      pointsDollar = computed;
      document.getElementById('points-dollar').value = computed.toFixed(2);
      if (window.styerMoney) window.styerMoney.fmtEl('points-dollar');
    }
  }

  // --- Lender Fees ---
  const lenderFeeItems = collectFeeItems('lender-fee');
  const lenderFeesBase = sumClass('lender-fee');
  const totalLenderFees = lenderFeesBase + pointsDollar;

  // --- Third-Party Fees ---
  const tpFeeItems = collectFeeItems('tp-fee');
  const totalTPFees = sumClass('tp-fee');

  // --- Prepaids ---
  const prepaidItems = [];
  prepaidItems.push({ name: 'Prepaid Interest (' + prepaidDays + ' days @ ' + fmt(perDiem) + '/day)', amount: prepaidInterest });

  // Insurance prepaid (if collecting full premium at closing and escrows on)
  let insurancePrepaid = 0;
  if (escrowsOn && collectFullPremium && annualHazard > 0) {
    insurancePrepaid = annualHazard;
    prepaidItems.push({ name: 'Annual Hazard Insurance Premium', amount: insurancePrepaid });
  }

  // Non-escrow prepaids (taxes/insurance collected as prepaids when escrows off)
  if (!escrowsOn && collectPrepaidAnyway) {
    if (annualTax > 0) prepaidItems.push({ name: 'Property Taxes (prepaid)', amount: annualTax });
    if (annualHazard > 0) prepaidItems.push({ name: 'Hazard Insurance (prepaid)', amount: annualHazard });
  }

  const totalPrepaids = prepaidItems.reduce(function(s, i) { return s + i.amount; }, 0);

  // --- Escrow Deposits ---
  let taxEscrow = { finalDeposit: 0 };
  let insEscrow = { deposit: 0 };
  let hoaEscrowAmt = 0;
  let totalEscrow = 0;

  if (escrowsOn) {
    taxEscrow = calcTaxEscrow(annualTax, closingDate);
    insEscrow = calcInsuranceEscrow(annualHazard, collectFullPremium);
    hoaEscrowAmt = calcHoaEscrow(monthlyHoa, escrowHoa);
    totalEscrow = taxEscrow.finalDeposit + insEscrow.deposit + hoaEscrowAmt;
  }

  // --- Credits ---
  const totalCredits = lenderCredit + sellerCredit;

  // --- Totals ---
  const totalCosts = totalLenderFees + totalTPFees + lendersTitle + totalPrepaids + totalEscrow;
  const cashToClose = totalCosts - totalCredits;

  // ===== RENDER SUMMARY =====
  setText('sum-lender', fmt(totalLenderFees));
  setText('sum-tp', fmt(totalTPFees));
  setText('sum-title', fmt(lendersTitle));
  setText('sum-prepaids', fmt(totalPrepaids));
  setText('sum-escrow', fmt(totalEscrow));
  setText('sum-total-costs', fmt(totalCosts));
  setText('sum-credits', totalCredits > 0 ? '-' + fmt(totalCredits) : fmt(0));
  const cashEl = document.getElementById('sum-cash-to-close');
  cashEl.textContent = fmt(cashToClose);
  cashEl.className = 'sl-value' + (cashToClose < 0 ? ' negative' : '');

  // Show/hide escrow row in summary
  document.getElementById('sum-escrow-row').style.display = escrowsOn ? '' : 'none';

  // ===== RENDER BREAKDOWN =====
  renderBreakdown({
    lenderFeeItems, pointsDollar, totalLenderFees,
    tpFeeItems, totalTPFees,
    lendersTitle,
    prepaidItems, totalPrepaids,
    escrowsOn, taxEscrow, insEscrow, hoaEscrowAmt, monthlyHoa, totalEscrow,
    lenderCredit, sellerCredit, totalCredits,
    totalCosts, cashToClose,
    closingDate, prepaidDays, perDiem
  });

  // Store result for clipboard
  window._lastResult = {
    lenderFeeItems, pointsDollar, totalLenderFees,
    tpFeeItems, totalTPFees,
    lendersTitle,
    prepaidItems, totalPrepaids,
    escrowsOn, taxEscrow, insEscrow, hoaEscrowAmt, monthlyHoa, totalEscrow,
    lenderCredit, sellerCredit, totalCredits,
    totalCosts, cashToClose,
    closingDate, loanAmt, prepaidDays, perDiem
  };
}

// ===== RENDER BREAKDOWN =====

function renderBreakdown(r) {
  let html = '';

  // Lender Fees
  html += '<div class="bd-section"><div class="bd-section-title">Lender Fees</div>';
  r.lenderFeeItems.forEach(function(item) {
    if (item.amount > 0) html += bdLine(item.name, item.amount);
  });
  if (r.pointsDollar > 0) html += bdLine('Discount Points', r.pointsDollar);
  html += bdLine('Subtotal', r.totalLenderFees, true);
  html += '</div>';

  // Third-Party Fees
  html += '<div class="bd-section"><div class="bd-section-title">Third-Party Fees</div>';
  r.tpFeeItems.forEach(function(item) {
    if (item.amount > 0) html += bdLine(item.name, item.amount);
  });
  html += bdLine('Subtotal', r.totalTPFees, true);
  html += '</div>';

  // Title
  html += '<div class="bd-section"><div class="bd-section-title">Title</div>';
  html += bdLine("Lender's Title Policy", r.lendersTitle);
  html += '</div>';

  // Prepaids
  html += '<div class="bd-section"><div class="bd-section-title">Prepaids</div>';
  r.prepaidItems.forEach(function(item) {
    html += bdLine(item.name, item.amount);
  });
  html += bdLine('Subtotal', r.totalPrepaids, true);
  html += '</div>';

  // Escrow Deposit (only if on)
  if (r.escrowsOn) {
    html += '<div class="bd-section"><div class="bd-section-title">Initial Escrow Deposit</div>';

    // Tax escrow with detail
    html += bdLine('Tax Escrow Deposit', r.taxEscrow.finalDeposit);
    if (r.taxEscrow.finalDeposit > 0) {
      html += '<div class="bd-note">';
      html += 'Monthly tax: ' + fmt(r.taxEscrow.monthlyTax);
      html += ' &middot; Deposits before due: ' + r.taxEscrow.escrowDeposits;
      html += ' &middot; Base: ' + fmt(r.taxEscrow.baseTaxNeeded);
      html += ' &middot; Cushion add: ' + fmt(r.taxEscrow.additionalForCushion);
      html += ' &middot; Agg. adj.: ' + fmt(r.taxEscrow.aggregateAdj);
      html += ' (estimate)</div>';
    }

    // Insurance escrow
    html += bdLine('Insurance Escrow Deposit', r.insEscrow.deposit);
    if (r.insEscrow.deposit > 0) {
      html += '<div class="bd-note">2-month cushion (estimate)</div>';
    }

    // HOA escrow
    if (r.hoaEscrowAmt > 0) {
      html += bdLine('HOA Escrow Deposit', r.hoaEscrowAmt);
      html += '<div class="bd-note">2 months × ' + fmt(r.monthlyHoa) + '/mo</div>';
    }

    html += bdLine('Subtotal', r.totalEscrow, true);
    html += '</div>';
  }

  // Credits
  if (r.totalCredits > 0) {
    html += '<div class="bd-section"><div class="bd-section-title">Credits</div>';
    if (r.lenderCredit > 0) html += bdLine('Lender Credit', -r.lenderCredit);
    if (r.sellerCredit > 0) html += bdLine('Seller / Other Credits', -r.sellerCredit);
    html += bdLine('Subtotal', -r.totalCredits, true);
    html += '</div>';
  }

  // Grand total
  html += '<div class="bd-section" style="background:#f8fafc;">';
  html += '<div class="bd-line subtotal" style="border:none;font-size:0.95rem;">';
  html += '<span class="bd-label" style="color:var(--navy);font-weight:700;">ESTIMATED CASH TO CLOSE</span>';
  html += '<span class="bd-val" style="color:var(--green);font-weight:800;">' + fmt(r.cashToClose) + '</span>';
  html += '</div></div>';

  document.getElementById('bd-content').innerHTML = html;
}

/** Helper: generate a breakdown line */
function bdLine(label, amount, isSubtotal) {
  const cls = isSubtotal ? 'bd-line subtotal' : 'bd-line';
  return '<div class="' + cls + '"><span class="bd-label">' + label + '</span><span class="bd-val">' + fmt(amount) + '</span></div>';
}

// ===== CLIPBOARD EXPORT =====

function copyBreakdown() {
  const r = window._lastResult;
  if (!r) return;
  const pad = function(label, val, width) {
    width = width || 40;
    const valStr = fmt(val);
    const gap = Math.max(1, width - label.length - valStr.length);
    return '  ' + label + ' '.repeat(gap) + valStr;
  };
  let lines = [];
  lines.push('REFINANCE CLOSING COSTS ESTIMATE');
  lines.push('================================');
  if (r.closingDate) {
    lines.push('Closing Date: ' + (r.closingDate.getMonth()+1) + '/' + r.closingDate.getDate() + '/' + r.closingDate.getFullYear());
  }
  if (r.loanAmt > 0) lines.push('Loan Amount:  ' + fmt(r.loanAmt));
  lines.push('');

  lines.push('LENDER FEES');
  r.lenderFeeItems.forEach(function(item) {
    if (item.amount > 0) lines.push(pad(item.name, item.amount));
  });
  if (r.pointsDollar > 0) lines.push(pad('Discount Points', r.pointsDollar));
  lines.push(pad('Subtotal', r.totalLenderFees));
  lines.push('');

  lines.push('THIRD-PARTY FEES');
  r.tpFeeItems.forEach(function(item) {
    if (item.amount > 0) lines.push(pad(item.name, item.amount));
  });
  lines.push(pad('Subtotal', r.totalTPFees));
  lines.push('');

  lines.push('TITLE');
  lines.push(pad("Lender's Title Policy", r.lendersTitle));
  lines.push('');

  lines.push('PREPAIDS');
  r.prepaidItems.forEach(function(item) {
    lines.push(pad(item.name, item.amount));
  });
  lines.push(pad('Subtotal', r.totalPrepaids));
  lines.push('');

  if (r.escrowsOn) {
    lines.push('INITIAL ESCROW DEPOSIT');
    lines.push(pad('Tax Escrow', r.taxEscrow.finalDeposit));
    lines.push(pad('Insurance Escrow', r.insEscrow.deposit));
    if (r.hoaEscrowAmt > 0) lines.push(pad('HOA Escrow', r.hoaEscrowAmt));
    lines.push(pad('Subtotal', r.totalEscrow));
    lines.push('');
  }

  if (r.totalCredits > 0) {
    lines.push('CREDITS');
    if (r.lenderCredit > 0) lines.push(pad('Lender Credit', -r.lenderCredit));
    if (r.sellerCredit > 0) lines.push(pad('Seller / Other', -r.sellerCredit));
    lines.push(pad('Subtotal', -r.totalCredits));
    lines.push('');
  }

  lines.push('================================');
  lines.push('ESTIMATED CASH TO CLOSE: ' + fmt(r.cashToClose));
  lines.push('');
  lines.push('(Estimates only; confirm with title/escrow and lender.)');

  const text = lines.join('\n');
  navigator.clipboard.writeText(text).then(function() {
    const btn = document.getElementById('btn-copy');
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function() {
      btn.textContent = 'Copy Breakdown';
      btn.classList.remove('copied');
    }, 1800);
  });
}

// ===== ESCROW TOGGLE UI =====

function updateEscrowUI() {
  const on = isChecked('escrow-toggle');
  document.getElementById('escrow-label').textContent = on ? 'ON' : 'OFF (Waived)';
  document.getElementById('escrow-options').classList.toggle('hidden', !on);
  document.getElementById('noescrow-options').classList.toggle('hidden', on);
}

// ===== POINTS % AUTO-COMPUTE =====

function handlePointsPctChange() {
  const pct = num('points-pct');
  const loanAmt = num('loan-amount');
  const dollarInput = document.getElementById('points-dollar');
  if (pct > 0 && loanAmt > 0) {
    dollarInput.value = (loanAmt * (pct / 100)).toFixed(2);
    if (window.styerMoney) window.styerMoney.fmtEl(dollarInput);
    delete dollarInput.dataset.manual;
  }
}

// Mark manual entry on points dollar
document.getElementById('points-dollar').addEventListener('input', function() {
  this.dataset.manual = '1';
});
document.getElementById('points-pct').addEventListener('input', handlePointsPctChange);
document.getElementById('loan-amount').addEventListener('input', handlePointsPctChange);

// ===== RESET =====

function resetAll() {
  // Reset to defaults
  document.getElementById('loan-amount').value = '';
  document.getElementById('note-rate').value = '';
  document.getElementById('manual-perdiem').value = '';
  document.getElementById('annual-taxes').value = '';
  document.getElementById('annual-hazard').value = '';
  document.getElementById('monthly-hoa').value = '';
  document.getElementById('escrow-toggle').checked = true;
  document.getElementById('escrow-hoa').checked = false;
  document.getElementById('collect-full-premium').checked = false;
  document.getElementById('collect-prepaid-anyway').checked = false;
  document.getElementById('points-pct').value = '';
  document.getElementById('points-dollar').value = '';
  document.getElementById('lenders-title').value = '2,119';
  document.getElementById('lender-credit').value = '';
  document.getElementById('seller-credit').value = '';

  // Reset lender fees to defaults
  var lenderDefaults = [0, 1295, 995, 0, 0];
  document.querySelectorAll('.lender-fee').forEach(function(el, i) {
    el.value = lenderDefaults[i] !== undefined ? lenderDefaults[i] : 0;
  });

  // Reset TP fees to defaults
  var tpDefaults = [795, 110, 495, 15, 125, 550, 125, 12, 200];
  document.querySelectorAll('.tp-fee').forEach(function(el, i) {
    el.value = tpDefaults[i] !== undefined ? tpDefaults[i] : 0;
  });

  // Set today's date
  setDefaultDate();

  updateEscrowUI();
  calculateAll();
}

// ===== SET DEFAULT DATE =====

function setDefaultDate() {
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  document.getElementById('closing-date').value = yyyy + '-' + mm + '-' + dd;
}

// ===== BREAKDOWN TOGGLE =====

document.getElementById('bd-toggle').addEventListener('click', function() {
  this.classList.toggle('open');
  document.getElementById('bd-content').classList.toggle('open');
});

// ===== EVENT BINDING =====

// Delegate input/change events on all input areas
document.querySelector('.inputs').addEventListener('input', function() {
  calculateAll();
});
document.querySelector('.inputs').addEventListener('change', function() {
  updateEscrowUI();
  calculateAll();
});

// Buttons
document.getElementById('btn-reset').addEventListener('click', resetAll);
document.getElementById('btn-copy').addEventListener('click', copyBreakdown);

// ===== INIT =====
(function init() {
  setDefaultDate();
  updateEscrowUI();
  calculateAll();
  // Auto-open breakdown on desktop
  if (window.innerWidth > 820) {
    document.getElementById('bd-toggle').classList.add('open');
    document.getElementById('bd-content').classList.add('open');
  }
})();
