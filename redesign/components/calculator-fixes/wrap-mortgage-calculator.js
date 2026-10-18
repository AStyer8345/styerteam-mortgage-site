
  (function() {
    'use strict';
    var Suite = window.CalcSuite;
    if (!Suite) return;

    function val(id) {
      var el = document.getElementById(id);
      return el ? (parseFloat(String(el.value).replace(/,/g, '')) || 0) : 0;
    }
    function set(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
    function formatInputNumber(value) {
      var raw=String(value).replace(/[$,]/g,'').trim();
      if(!/^(?:\d+\.?\d*|\.\d+)$/.test(raw))return raw;
      var parts=raw.split('.'),integer=parts[0]||'0';
      return Number(integer).toLocaleString('en-US')+(parts.length>1?'.'+parts[1]:'');
    }
    function updateDownPaymentDisplay(salePrice, downPct) {
      var amountEl = document.getElementById('w-down-amount');
      if (amountEl) amountEl.value = Math.round(salePrice * downPct / 100).toLocaleString('en-US');
    }

    var downToggle = null;
    var selectedBalloon = 5; /* 3, 5, or null */

    /* Closed-form remaining balance after k payments on a NEW loan of P.
       Works for wrap loan (starts fresh). For existing loan, use Suite.amortize from current balance. */
    function remainingBalance(P, annualRatePct, n, k) {
      if (P <= 0 || n <= 0 || k >= n) return 0;
      var r = annualRatePct / 100 / 12;
      if (r === 0) return P * (1 - k / n);
      var pow_n = Math.pow(1 + r, n);
      var pow_k = Math.pow(1 + r, k);
      return Math.max(0, P * (pow_n - pow_k) / (pow_n - 1));
    }

    function updateBalloonVisibility() {
      var ids = ['w-metric-existing-bal','w-metric-wrap-bal','w-metric-equity-capture',
                 'w-metric-bal-due','w-metric-home-val','w-metric-buyer-equity'];
      var hasBalloon = selectedBalloon !== null;
      ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.toggle('wrap-metric--hidden', !hasBalloon);
      });
      var lbl = document.getElementById('w-cume-spread-label');
      if (lbl) lbl.textContent = hasBalloon ? 'Cumulative Spread to Balloon' : 'Cumulative Spread (lifetime)';
      var pdlbl = document.getElementById('w-exist-paydown-label');
      if (pdlbl) pdlbl.textContent = hasBalloon ? 'Existing Loan Paid Down to Balloon' : 'Existing Loan Paid Down (lifetime)';
    }

    /* Balloon segmented buttons */
    document.querySelectorAll('.wrap-balloon-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.wrap-balloon-btn').forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        var raw = btn.getAttribute('data-balloon');
        selectedBalloon = (raw === 'null') ? null : parseInt(raw, 10);
        updateBalloonVisibility();
        calcWrap();
      });
    });

    function validateWrapInputs(){
      var ids=['w-balance','w-existing-rate','w-existing-payment','w-sale-price','w-down-pct','w-closing-pct','w-wrap-rate','w-term','w-appreciation'],invalid=[];
      ids.forEach(function(id){var el=document.getElementById(id),raw=String(el.value).replace(/[$,]/g,'').trim(),value=Number(raw),ok=/^(?:\d+\.?\d*|\.\d+)$/.test(raw)&&Number.isFinite(value)&&value>=0;
        if(id==='w-sale-price'||id==='w-term')ok=ok&&value>0;var min=el.getAttribute('min'),max=el.getAttribute('max');if(min!==null)ok=ok&&value>=Number(min);if(max!==null)ok=ok&&value<=Number(max);if(id==='w-down-pct'||id==='w-closing-pct')ok=ok&&value<=100;if(id==='w-term')ok=ok&&value<=50&&Number.isInteger(value);if(id.indexOf('rate')>=0)ok=ok&&value<=20;
        el.setAttribute('aria-invalid',String(!ok));if(!ok)invalid.push(id);
      });
      var message=document.getElementById('wrap-input-error');if(!message){message=document.createElement('p');message.id='wrap-input-error';message.setAttribute('role','status');document.getElementById('w-sale-price').parentElement.before(message);}
      message.textContent=invalid.length?'Correct the highlighted numbers. Enter a positive sale price and term; rates and other amounts cannot be negative.':'';
      if(invalid.length){document.querySelectorAll('[id^="w-out-"],#w-seller-total').forEach(function(el){el.textContent='—';});document.getElementById('w-amort-tbody').textContent='';document.getElementById('print-scenario').textContent='Correct the highlighted inputs before using this illustration.';return false;}return true;
    }
    function calcWrap() {
      if(!validateWrapInputs())return;
      var balance      = val('w-balance');
      var existingRate = val('w-existing-rate');
      var existingPmt  = val('w-existing-payment');
      var wrapRate     = val('w-wrap-rate');
      var wrapTerm     = val('w-term') || 30;
      var salePrice    = val('w-sale-price');
      var closingPct   = val('w-closing-pct');
      var appreciation = val('w-appreciation');
      var downPct      = Math.min(100, Math.max(0, val('w-down-pct')));
      updateDownPaymentDisplay(salePrice, downPct);

      if (salePrice <= 0) {
        ['w-seller-total','w-out-net-cash','w-out-monthly-income','w-out-cume-spread',
         'w-out-exist-paydown','w-out-existing-bal','w-out-wrap-bal','w-out-equity-capture',
         'w-out-buyer-payment','w-out-down','w-out-new-loan',
         'w-out-bal-due','w-out-home-val','w-out-buyer-equity']
          .forEach(function(id) { set(id, '—'); });
        return;
      }

      var downPayment   = salePrice * downPct / 100;
      var wrapLoan      = salePrice - downPayment;
      var closingCosts  = salePrice * closingPct / 100;
      var cashAtClosing = downPayment - closingCosts;
      var wrapMonthly   = Suite.monthlyPayment(wrapLoan, wrapRate, wrapTerm);
      var monthlySpread = wrapMonthly - existingPmt;

      var hasBalloon   = selectedBalloon !== null;
      var spreadMonths = hasBalloon ? selectedBalloon * 12 : wrapTerm * 12;
      spreadMonths=Math.min(spreadMonths,wrapTerm*12);
      var wrapCash=Suite.amortize(wrapLoan,wrapRate,wrapMonthly,spreadMonths);
      var existingCash=Suite.amortize(balance,existingRate,existingPmt,spreadMonths);
      var cumeSpread=wrapCash.totalPaid-existingCash.totalPaid;
      var notice=document.getElementById('wrap-input-error');if(existingPmt<balance*existingRate/1200)notice.textContent='The existing payment is below its first month’s interest. This illustration capitalizes unpaid interest, so the existing balance grows.';

      set('w-seller-total-note', hasBalloon
        ? '* Estimated total over ' + selectedBalloon + ' years: cash at closing + cumulative monthly cash flow + net balloon proceeds (buyer payoff minus your remaining mortgage balance).'
        : '* Estimated total over the ' + wrapTerm + '-year wrap term: cash at closing + cumulative monthly cash flow. No balloon payment is included.');

      if (hasBalloon) {
        var balloonMo      = Math.min(selectedBalloon * 12,wrapTerm * 12);
        var wrapBalBalloon = remainingBalance(wrapLoan, wrapRate, wrapTerm * 12, balloonMo);
        var existBalloon   = Suite.amortize(balance, existingRate, existingPmt, balloonMo).balance;
        var existPaydown   = balance - existBalloon;
        var equityCapture  = wrapBalBalloon - existBalloon;
        var homeVal        = salePrice * Math.pow(1 + appreciation / 100, balloonMo / 12);
        var buyerEquity    = homeVal - wrapBalBalloon;
        var sellerTotal    = cashAtClosing + cumeSpread + equityCapture;

        set('w-out-exist-paydown',  Suite.formatCurrency(existPaydown));
        set('w-out-existing-bal',   Suite.formatCurrency(existBalloon));
        set('w-out-wrap-bal',       Suite.formatCurrency(wrapBalBalloon));
        set('w-out-equity-capture', Suite.formatCurrency(equityCapture));
        set('w-out-bal-due',        Suite.formatCurrency(wrapBalBalloon));
        set('w-out-home-val',       Suite.formatCurrency(homeVal));
        set('w-out-buyer-equity',   Suite.formatCurrency(buyerEquity));
        set('w-seller-total',       Suite.formatCurrency(sellerTotal));
      } else {
        var existAtTerm  = Suite.amortize(balance, existingRate, existingPmt, wrapTerm * 12).balance;
        var existPaydown = balance - existAtTerm;
        set('w-out-exist-paydown', Suite.formatCurrency(existPaydown));
        set('w-seller-total', Suite.formatCurrency(cashAtClosing + cumeSpread - existAtTerm));
        set('w-seller-total-note','* Estimated net over the '+wrapTerm+'-year wrap term: cash at closing + cumulative cash flow − any existing loan balance still owed at term end ('+Suite.formatCurrency(existAtTerm)+').');
      }

      set('w-out-cume-spread',    Suite.formatCurrency(cumeSpread));
      set('w-out-net-cash',       Suite.formatCurrency(cashAtClosing));
      set('w-out-monthly-income', Suite.formatCurrency(monthlySpread) + '/mo');
      set('w-out-buyer-payment',  Suite.formatCurrency(wrapMonthly) + '/mo');
      set('w-out-down',           Suite.formatCurrency(downPayment));
      set('w-out-new-loan',       Suite.formatCurrency(wrapLoan));

      var netCashEl = document.getElementById('w-out-net-cash');
      if (netCashEl) netCashEl.style.color = cashAtClosing < 0 ? '#dc2626' : '';

      buildAmortTable(wrapLoan, wrapRate, wrapTerm, existingPmt, balance, existingRate);
      updatePrintSummary(salePrice, downPct, wrapRate, wrapTerm);
    }

    function buildAmortTable(wrapLoan, wrapRate, wrapTerm, existingPmt, existingBal0, existingRate) {
      var tbody = document.getElementById('w-amort-tbody');
      if (!tbody) return;

      var displayYears = Math.min(selectedBalloon !== null ? selectedBalloon : wrapTerm,wrapTerm);
      var wrapMonthly  = Suite.monthlyPayment(wrapLoan, wrapRate, wrapTerm);
      var wrapN        = wrapTerm * 12;
      var existBal     = existingBal0;
      var cume         = 0;
      var priorWrapBalance=wrapLoan;
      var headings=document.querySelectorAll('#w-amort-table th');if(headings[3])headings[3].textContent='Average Monthly Spread in Year';
      var spread       = wrapMonthly - existingPmt;
      var rows         = '';

      for (var yr = 1; yr <= displayYears; yr++) {
        var wrapBal = remainingBalance(wrapLoan, wrapRate, wrapN, yr * 12);
        var am = Suite.amortize(existBal, existingRate, existingPmt, 12);
        existBal = am.balance;
        var wrapYear=Suite.amortize(priorWrapBalance,wrapRate,wrapMonthly,12);
        priorWrapBalance=wrapYear.balance;
        var annualSpread=wrapYear.totalPaid-am.totalPaid;
        spread=annualSpread/12;cume+=annualSpread;
        var isBalloon = (selectedBalloon !== null && yr === selectedBalloon);
        rows += '<tr' + (isBalloon ? ' class="wrap-amort-balloon"' : '') + '>';
        rows += '<td style="text-align:left;">' + yr + (isBalloon ? ' ★' : '') + '</td>';
        rows += '<td>' + Suite.formatCurrency(wrapBal) + '</td>';
        rows += '<td>' + Suite.formatCurrency(existBal) + '</td>';
        rows += '<td>' + Suite.formatCurrency(spread) + '/mo</td>';
        rows += '<td>' + Suite.formatCurrency(cume) + '</td>';
        rows += '</tr>';
      }
      tbody.innerHTML = rows;
    }

    function updatePrintSummary(salePrice, downPct, wrapRate, wrapTerm) {
      var el = document.getElementById('print-scenario');
      if (!el) return;
      var balloonStr = selectedBalloon !== null ? selectedBalloon + '-yr balloon' : 'no balloon';
      el.textContent = 'Sale price ' + Suite.formatCurrency(salePrice) +
        ' · ' + downPct.toFixed(1) + '% down' +
        ' · ' + wrapRate.toFixed(2) + '% wrap' +
        ' · ' + wrapTerm + '-yr term' +
        ' · ' + balloonStr;
    }

    /* Amort toggle */
    var amortWrap = document.getElementById('w-amort-wrap');
    var amortBtn  = document.getElementById('w-btn-amort');
    if (amortBtn && amortWrap) {
      amortBtn.addEventListener('click', function() {
        if (amortWrap.hasAttribute('hidden')) {
          amortWrap.removeAttribute('hidden');
          amortBtn.textContent = 'Hide Amortization Table';
          amortBtn.setAttribute('aria-expanded', 'true');
        } else {
          amortWrap.setAttribute('hidden', '');
          amortBtn.textContent = 'Show Amortization Table';
          amortBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* PDF print */
    var pdfBtn = document.getElementById('w-btn-pdf');
    if (pdfBtn) pdfBtn.addEventListener('click', function() { window.print(); });

    /* Format currency inputs with thousands separators while preserving numeric calculations. */
    document.querySelectorAll('.wrap-money-input').forEach(function(el) {
      el.addEventListener('input', function() {
        el.value = formatInputNumber(el.value);
      });
      el.addEventListener('blur', function() {
        el.value = formatInputNumber(el.value);
      });
    });

    /* Input listeners */
    ['w-balance','w-existing-rate','w-existing-payment',
     'w-sale-price','w-down-pct','w-closing-pct','w-wrap-rate','w-term','w-appreciation']
      .forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', calcWrap);
      });

    /* Accordion */
    document.querySelectorAll('.accordion-button').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item   = btn.closest('.accordion-item');
        var isOpen = item && item.classList.contains('open');
        document.querySelectorAll('.accordion-item').forEach(function(i) { i.classList.remove('open'); });
        if (item && !isOpen) item.classList.add('open');
      });
    });

    updateBalloonVisibility();
    calcWrap();
  }());
  