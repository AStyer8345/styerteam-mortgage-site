/**
 * Calculator Suite — shared helpers (Option B vanilla)
 * Use with calculator-suite.css. Chart.js optional for donut/bar.
 */
(function () {
  'use strict';

  window.CalcSuite = {
    formatCurrency: function (amount) {
      if (amount == null || !isFinite(amount)) return '—';
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
    },
    formatPercent: function (value) {
      if (value == null || !isFinite(value)) return '—';
      return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
    },
    formatNumber: function (value, decimals) {
      if (value == null || !isFinite(value)) return '—';
      return new Intl.NumberFormat('en-US', { maximumFractionDigits: decimals != null ? decimals : 2 }).format(value);
    },

    /**
     * P&I payment for fully amortizing loan.
     */
    monthlyPayment: function (principal, annualRatePercent, years) {
      var r = annualRatePercent / 100 / 12;
      var n = years * 12;
      if (principal <= 0) return 0;
      if (r === 0) return principal / n;
      return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    },

    /**
     * Amortize for t months. Returns { balance, interestPaid, principalPaid }.
     * (From EquityEdge WRAP logic.)
     */
    amortize: function (balance, annualRatePercent, payment, months) {
      var r = annualRatePercent / 100 / 12;
      var bal = balance;
      var interestPaid = 0;
      var principalPaid = 0;
      for (var i = 0; i < months; i++) {
        if (bal <= 0) { bal = 0; break; }
        var interest = r * bal;
        var principal = payment - interest;
        if (principal <= 0) {
          interestPaid += interest;
          continue;
        }
        if (principal > bal) principal = bal;
        bal -= principal;
        interestPaid += interest;
        principalPaid += principal;
      }
      return { balance: bal, interestPaid: interestPaid, principalPaid: principalPaid };
    },

    /**
     * Create a slider group in the container. Config: id, label, min, max, step, value, formatter(value), onChange(value).
     * Returns { el, input, valueEl, setValue }.
     */
    createSlider: function (container, config) {
      var id = config.id || ('slider-' + Math.random().toString(36).slice(2, 9));
      var formatter = config.formatter || function (v) { return v; };
      var value = config.value != null ? config.value : config.min;

      var wrap = document.createElement('div');
      wrap.className = 'calc-slider-group';
      wrap.innerHTML =
        '<div class="calc-slider-label">' +
          '<span>' + (config.label || '') + '</span>' +
          '<span class="calc-slider-value" data-value></span>' +
        '</div>' +
        '<input type="range" class="calc-slider-input" id="' + id + '" min="' + config.min + '" max="' + config.max + '" step="' + (config.step != null ? config.step : 1) + '" value="' + value + '">';

      var valueEl = wrap.querySelector('[data-value]');
      var input = wrap.querySelector('input');

      function updateDisplay() {
        var v = parseFloat(input.value);
        valueEl.textContent = formatter(v);
        if (typeof config.onChange === 'function') config.onChange(v);
      }

      input.addEventListener('input', updateDisplay);
      updateDisplay();

      if (container && container.appendChild) container.appendChild(wrap);

      return {
        el: wrap,
        input: input,
        valueEl: valueEl,
        setValue: function (v) {
          input.value = v;
          updateDisplay();
        },
        getValue: function () { return parseFloat(input.value); }
      };
    },

    /**
     * Down payment toggle: $ (flat amount) vs % (percentage of price).
     * Options: container, salePriceGetter() -> number, initialMode 'pct'|'dollar', initialPct, initialDollar, onChange(downDollars, downPct).
     * Returns { getDownDollars, getDownPct, setSalePrice }.
     */
    createDownPaymentToggle: function (container, options) {
      var mode = options.initialMode || 'pct';
      var salePrice = 0;
      var getPrice = typeof options.salePriceGetter === 'function' ? options.salePriceGetter : function () { return salePrice; };

      var wrap = document.createElement('div');
      wrap.className = 'calc-down-toggle-wrap';
      wrap.innerHTML =
        '<span class="calc-down-toggle-label">Down payment</span>' +
        '<div class="calc-down-toggle-btns" role="group" aria-label="Down payment as dollar amount or percentage">' +
          '<button type="button" class="calc-down-toggle-btn" data-mode="dollar">$</button>' +
          '<button type="button" class="calc-down-toggle-btn active" data-mode="pct">%</button>' +
        '</div>' +
        '<div class="calc-down-toggle-value" id="dp-dollar-wrap" aria-hidden="true">' +
          '<input type="number" id="dp-dollar-input" min="0" step="1000" value="0" placeholder="0" style="width:100%;margin-top:0.5rem;padding:0.5rem 0.75rem;border-radius:8px;border:1px solid var(--calc-input-border, #e2e8f0);background:var(--calc-input-bg, #fff);">' +
        '</div>' +
        '<div class="calc-down-toggle-value" id="dp-pct-wrap" aria-hidden="false">' +
          '<input type="number" id="dp-pct-input" min="0" max="100" step="0.5" value="10" placeholder="10" style="width:100%;margin-top:0.5rem;padding:0.5rem 0.75rem;border-radius:8px;border:1px solid var(--calc-input-border, #e2e8f0);background:var(--calc-input-bg, #fff);">' +
        '</div>';

      var btnDollar = wrap.querySelector('[data-mode="dollar"]');
      var btnPct = wrap.querySelector('[data-mode="pct"]');
      var dollarWrap = wrap.querySelector('#dp-dollar-wrap');
      var pctWrap = wrap.querySelector('#dp-pct-wrap');
      var dollarInput = wrap.querySelector('#dp-dollar-input');
      var pctInput = wrap.querySelector('#dp-pct-input');

      if (options.initialMode === 'dollar') {
        btnDollar.classList.add('active');
        btnPct.classList.remove('active');
        dollarWrap.setAttribute('aria-hidden', 'false');
        pctWrap.setAttribute('aria-hidden', 'true');
        if (options.initialDollar != null) dollarInput.value = options.initialDollar;
      } else {
        if (options.initialPct != null) pctInput.value = options.initialPct;
      }

      function emit() {
        var price = getPrice();
        var dollars = mode === 'dollar' ? parseFloat(dollarInput.value) || 0 : price * (parseFloat(pctInput.value) || 0) / 100;
        var pct = price > 0 ? (dollars / price) * 100 : (parseFloat(pctInput.value) || 0);
        if (typeof options.onChange === 'function') options.onChange(dollars, pct);
      }

      btnDollar.addEventListener('click', function () {
        if (mode === 'dollar') return;
        mode = 'dollar';
        var price = getPrice();
        var pct = parseFloat(pctInput.value) || 0;
        dollarInput.value = price > 0 ? Math.round(price * pct / 100) : 0;
        btnDollar.classList.add('active');
        btnPct.classList.remove('active');
        dollarWrap.setAttribute('aria-hidden', 'false');
        pctWrap.setAttribute('aria-hidden', 'true');
        emit();
      });
      btnPct.addEventListener('click', function () {
        if (mode === 'pct') return;
        mode = 'pct';
        var price = getPrice();
        var dollars = parseFloat(dollarInput.value) || 0;
        pctInput.value = price > 0 ? ((dollars / price) * 100).toFixed(1) : 0;
        btnPct.classList.add('active');
        btnDollar.classList.remove('active');
        pctWrap.setAttribute('aria-hidden', 'false');
        dollarWrap.setAttribute('aria-hidden', 'true');
        emit();
      });
      dollarInput.addEventListener('input', function () { if (mode === 'dollar') emit(); });
      pctInput.addEventListener('input', function () { if (mode === 'pct') emit(); });
      pctInput.addEventListener('input', emit);

      if (container && container.appendChild) container.appendChild(wrap);

      return {
        getDownDollars: function () {
          var price = getPrice();
          return mode === 'dollar' ? (parseFloat(dollarInput.value) || 0) : price * (parseFloat(pctInput.value) || 0) / 100;
        },
        getDownPct: function () {
          var price = getPrice();
          var d = mode === 'dollar' ? (parseFloat(dollarInput.value) || 0) : price * (parseFloat(pctInput.value) || 0) / 100;
          return price > 0 ? (d / price) * 100 : (parseFloat(pctInput.value) || 0);
        },
        setSalePrice: function (p) { salePrice = p; }
      };
    },

    /**
     * Create a Chart.js doughnut in the given canvas id. data: { labels: [], values: [], colors?: [] }.
     * Requires Chart.js to be loaded.
     */
    createDonutChart: function (canvasId, data) {
      var canvas = document.getElementById(canvasId);
      if (!canvas || typeof Chart === 'undefined') return null;
      var ctx = canvas.getContext('2d');
      var colors = data.colors || ['#2563eb', '#059669', '#9A7B2D', '#6B7280', '#0A1F3F'];
      return new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.labels || [],
          datasets: [{
            data: data.values || [],
            backgroundColor: colors.slice(0, (data.values || []).length),
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '65%',
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    },

    /**
     * WRAP calculator: compute all outputs from input values (EquityEdge logic).
     * vals: existingMortgageBalance, existingInterestRate, monthlyMortgagePayment, existingRemainingTermYears,
     *       salesPrice, downPaymentPercentage, closingCostPercentage, interestRate, loanTerm, balloonYears
     */
    computeWrap: function (vals) {
      var downPayment = vals.salesPrice * (vals.downPaymentPercentage / 100);
      var wrapLoanAmount = vals.salesPrice - downPayment;
      var wrapMonthlyPayment = this.monthlyPayment(wrapLoanAmount, vals.interestRate, vals.loanTerm);
      var grossSpread = wrapMonthlyPayment - vals.monthlyMortgagePayment;
      var closingCosts = vals.salesPrice * (vals.closingCostPercentage / 100);
      var cashAtClosing = downPayment - closingCosts;
      var tMonths = Math.round(vals.balloonYears * 12);
      var underlyingRemainingMonths = Math.round(vals.existingRemainingTermYears * 12);
      var underlyingMonthsToProject = Math.min(tMonths, underlyingRemainingMonths);

      var wrapAm = this.amortize(wrapLoanAmount, vals.interestRate, wrapMonthlyPayment, tMonths);
      var underAm = this.amortize(vals.existingMortgageBalance, vals.existingInterestRate, vals.monthlyMortgagePayment, underlyingMonthsToProject);

      var netAtBalloon = wrapAm.balance - underAm.balance;
      var cumeSpread = grossSpread * tMonths;
      var coverage = vals.monthlyMortgagePayment > 0 ? wrapMonthlyPayment / vals.monthlyMortgagePayment : NaN;

      return {
        downPayment: downPayment,
        wrapLoanAmount: wrapLoanAmount,
        wrapMonthlyPayment: wrapMonthlyPayment,
        grossSpread: grossSpread,
        cashAtClosing: cashAtClosing,
        netAtBalloon: netAtBalloon,
        cumeSpread: cumeSpread,
        coverage: coverage,
        wrapBalanceAtBalloon: wrapAm.balance,
        underlyingBalanceAtBalloon: underAm.balance,
        wrapInterestToBalloon: wrapAm.interestPaid,
        underlyingInterestToBalloon: underAm.interestPaid,
        balloonMonths: tMonths,
        balloonYears: vals.balloonYears
      };
    }
  };
})();
