
  (function () {
    "use strict";

    // ----- CONFIG (edit these to tune behavior) ------------------
    // Set APPLICATION_URL to enable the tertiary "Start Full Loan Application" link.
    // Site's current application URL pattern:
    var APPLICATION_URL = "https://hypersmart.my1003app.com/513013/register?time=1779291829279";

    // Set WEBHOOK_URL to enable the optional "Email me this analysis" form.
    // Empty string keeps the form hidden.
    var WEBHOOK_URL = "";

    // Ratio bands (edit cutoffs / labels / messages here)
    var BANDS = [
      { min: 1.15, key: "strong", label: "Strong coverage", tone: "tone-green", color: "#10B981",
        msg: "Strong. This may also fit programs with higher coverage expectations, including some short-term rental scenarios." },
      { min: 1.00, key: "solid",  label: "Solid coverage",  tone: "tone-blue",  color: "#2563EB",
        msg: "Solid. The estimated rent covers the estimated debt payment." },
      { min: 0.75, key: "common", label: "Common investor range", tone: "tone-amber", color: "#F59E0B",
        msg: "Common investor range. DSCR below 1.0 does not automatically mean weak pricing. Strong files can still be very competitive." },
      { min: 0,    key: "tight",  label: "Needs a closer look",   tone: "tone-red",   color: "#E04B3F",
        msg: "Tight on rent coverage alone. That does not always mean the deal is dead, but it needs a closer look before making assumptions." }
    ];

    // Meter range and band tick positions used to map a DSCR value to a 0..100% position on the meter.
    // Layout below MUST match the CSS grid-template-columns on .dscr-meter-track:
    //   <0.75 → 0–35.05% | 0.75–0.99 → 35.05–46.26% | 1.00–1.14 → 46.26–53.27% | 1.15+ → 53.27–100%
    var METER_END_BELOW = 35.05;
    var METER_END_COMMON = 46.26;
    var METER_END_SOLID = 53.27;
    function ratioToPercent(r) {
      if (!isFinite(r) || r < 0) return 0;
      if (r >= 1.5) return 100;
      if (r >= 1.15) return METER_END_SOLID + ((r - 1.15) / (1.5 - 1.15)) * (100 - METER_END_SOLID);
      if (r >= 1.00) return METER_END_COMMON + ((r - 1.00) / (1.15 - 1.00)) * (METER_END_SOLID - METER_END_COMMON);
      if (r >= 0.75) return METER_END_BELOW + ((r - 0.75) / (1.00 - 0.75)) * (METER_END_COMMON - METER_END_BELOW);
      // below 0.75
      return Math.max(2, (r / 0.75) * METER_END_BELOW);
    }

    // ----- Helpers -----------------------------------------------
    var root = document.querySelector(".dscr-calculator-module");
    if (!root) return;
    function $(id) { return root.querySelector("#" + id); }
    function num(el) {
      if (!el) return NaN;
      var raw = String(el.value).replace(/[$,]/g, "").trim();
      if (!raw || !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(raw)) return NaN;
      var v = Number(raw);
      return Number.isFinite(v) ? v : NaN;
    }
    var fmtCurrency = new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD", maximumFractionDigits: 0
    });
    function $currency(n) { return fmtCurrency.format(Math.round(n)); }

    // Monthly P&I with safe handling of 0% rate
    function monthlyPI(loan, annualRatePct, years) {
      var n = years * 12;
      if (loan <= 0 || n <= 0) return 0;
      if (annualRatePct === 0) return loan / n;
      var r = (annualRatePct / 100) / 12;
      return r === 0 ? loan / n : loan * r / -Math.expm1(-n * Math.log1p(r));
    }

    function bandFor(ratio) {
      for (var i = 0; i < BANDS.length; i++) {
        if (ratio >= BANDS[i].min) return BANDS[i];
      }
      return BANDS[BANDS.length - 1];
    }

    // ----- Elements ----------------------------------------------
    var priceEl = $("dscr-price");
    var downEl = $("dscr-down");
    var downSuffix = $("dscr-down-suffix");
    var loanAmtEl = $("dscr-loan-amount");
    var rateEl = $("dscr-rate");
    var termEl = $("dscr-term");
    var taxEl = $("dscr-tax");
    var insEl = $("dscr-ins");
    var hoaEl = $("dscr-hoa");
    var rentEl = $("dscr-rent");

    var pctBtn = $("dscr-down-pct-btn");
    var dollarBtn = $("dscr-down-dollar-btn");

    var scoreEl = $("dscr-score");
    var bandLabelEl = $("dscr-band-label");
    var bandTagDot = root.querySelector("#dscr-band-tag .dscr-band-dot");
    var meterMarker = $("dscr-meter-marker");
    var cashflowEl = $("dscr-cashflow");
    var statusEl = $("dscr-status");
    var statusTitleEl = $("dscr-status-title");
    var statusMsgEl = $("dscr-status-msg");

    var piOut = $("dscr-pi");
    var taxOut = $("dscr-tax-m");
    var insOut = $("dscr-ins-m");
    var hoaOut = $("dscr-hoa-m");
    var pitiaOut = $("dscr-pitia");

    var appLink = $("dscr-app-link");
    var leadBlock = $("dscr-lead");
    var leadSubmit = $("dscr-lead-submit");
    var leadStatus = $("dscr-lead-status");

    var downMode = "pct"; // "pct" or "dollar"

    // Show app link / lead form per config
    if (APPLICATION_URL) {
      appLink.hidden = false;
      appLink.setAttribute("href", APPLICATION_URL);
      appLink.setAttribute("target", "_blank");
      appLink.setAttribute("rel", "noopener");
    }
    if (WEBHOOK_URL) {
      leadBlock.hidden = false;
    }

    // ----- Validation --------------------------------------------
    function setError(id, msg) {
      var el = $(id + "-err");
      if (el) el.textContent = msg || "";
      var input = $(id);
      if (input) input.setAttribute("aria-invalid", String(!!msg));
    }
    function validate(inputs) {
      var ok = true;
      setError("dscr-price", ""); setError("dscr-down", ""); setError("dscr-rate", "");
      setError("dscr-tax", ""); setError("dscr-ins", ""); setError("dscr-hoa", ""); setError("dscr-rent", "");

      var fields = {price:'dscr-price', downRaw:'dscr-down', rate:'dscr-rate', tax:'dscr-tax', ins:'dscr-ins', hoa:'dscr-hoa', rent:'dscr-rent'};
      Object.keys(fields).forEach(function(key) {
        if (!Number.isFinite(inputs[key])) { setError(fields[key], 'Enter a complete number. Use 0 when a cost does not apply.'); ok = false; }
      });
      if (!ok) return false;
      if (inputs.price === 0) { setError('dscr-price', 'Enter a purchase price greater than zero.'); ok = false; }
      if (inputs.rate > 20) { setError('dscr-rate', 'Enter a rate from 0 to 20%.'); ok = false; }
      if (![15,30].includes(inputs.years)) ok = false;
      if (inputs.price < 0) { setError("dscr-price", "Purchase price cannot be negative."); ok = false; }
      if (inputs.rate < 0)  { setError("dscr-rate",  "Interest rate cannot be negative."); ok = false; }
      if (inputs.tax < 0)   { setError("dscr-tax",   "Taxes cannot be negative."); ok = false; }
      if (inputs.ins < 0)   { setError("dscr-ins",   "Insurance cannot be negative."); ok = false; }
      if (inputs.hoa < 0)   { setError("dscr-hoa",   "HOA cannot be negative."); ok = false; }
      if (inputs.rent < 0)  { setError("dscr-rent",  "Rent cannot be negative."); ok = false; }

      if (inputs.downAmount < 0) { setError("dscr-down", "Down payment cannot be negative."); ok = false; }
      if (inputs.downAmount > inputs.price) {
        setError("dscr-down", "Down payment cannot exceed purchase price.");
        ok = false;
      }
      if (inputs.loan < 0) { ok = false; }
      return ok;
    }

    function setInvalidState() {
      scoreEl.textContent = "—";
      bandLabelEl.textContent = "Check inputs";
      if (bandTagDot) bandTagDot.style.background = "#9CA3AF";
      statusEl.classList.remove("tone-green", "tone-blue", "tone-amber", "tone-red");
      statusEl.classList.add("tone-red");
      statusTitleEl.textContent = "Fix the highlighted input";
      statusMsgEl.textContent = "Once the input is corrected, the DSCR estimate will update automatically.";
      meterMarker.style.left = "0%";
      cashflowEl.textContent = "—";
      cashflowEl.classList.remove("positive", "negative");
      piOut.textContent = "—";
      taxOut.textContent = "—";
      insOut.textContent = "—";
      hoaOut.textContent = "—";
      pitiaOut.textContent = "—";
    }

    // ----- Main compute ------------------------------------------
    function compute() {
      var price = num(priceEl);
      var downRaw = num(downEl);
      var rate = num(rateEl);
      var years = parseInt(termEl.value, 10) || 30;
      var annualTax = num(taxEl);
      var annualIns = num(insEl);
      var hoa = num(hoaEl);
      var rent = num(rentEl);

      var downAmount = downMode === "pct"
        ? (price * (downRaw / 100))
        : downRaw;
      var loan = Math.max(price - downAmount, 0);

      var inputs = {
        price: price, downRaw: downRaw, downAmount: downAmount, rate: rate,
        years: years, tax: annualTax, ins: annualIns, hoa: hoa, rent: rent, loan: loan
      };
      var valid = validate(inputs);

      // Live "loan amount" helper text
      loanAmtEl.textContent = valid ? $currency(loan) : "—";

      if (!valid) {
        setInvalidState();
        return;
      }

      var pi = monthlyPI(loan, rate, years);
      var taxM = annualTax / 12;
      var insM = annualIns / 12;
      var pitia = pi + taxM + insM + hoa;
      var dscr = pitia > 0 ? rent / pitia : 0;
      var cashflow = rent - pitia;

      // Score
      scoreEl.textContent = pitia > 0 ? dscr.toFixed(2) : "—";

      // Band
      var band = pitia>0 ? bandFor(dscr) : {label:'No payment denominator',color:'#607168',tone:'tone-blue',msg:'PITIA is $0, so a rent-to-payment ratio cannot be calculated. Review the loan amount, taxes, insurance, and HOA inputs.'};
      bandLabelEl.textContent = band.label;
      if (bandTagDot) bandTagDot.style.background = band.color;

      // Status card
      statusEl.classList.remove("tone-green", "tone-blue", "tone-amber", "tone-red");
      statusEl.classList.add(band.tone);
      statusTitleEl.textContent = band.label;
      statusMsgEl.textContent = band.msg;

      // Meter marker
      var pct = ratioToPercent(dscr);
      meterMarker.style.left = pct + "%";

      // Cashflow
      cashflowEl.textContent = (cashflow >= 0 ? "+" : "−") + $currency(Math.abs(cashflow));
      cashflowEl.classList.toggle("positive", cashflow >= 0);
      cashflowEl.classList.toggle("negative", cashflow < 0);

      // Breakdown
      piOut.textContent  = $currency(pi);
      taxOut.textContent = $currency(taxM);
      insOut.textContent = $currency(insM);
      hoaOut.textContent = $currency(hoa);
      pitiaOut.textContent = $currency(pitia);
    }

    // ----- Wire up events ----------------------------------------
    [priceEl, downEl, rateEl, termEl, taxEl, insEl, hoaEl, rentEl].forEach(function (el) {
      if (!el) return;
      var ev = el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(ev, compute);
    });

    // Down payment toggle
    function setDownMode(mode) {
      if (mode === downMode) return;
      var price = num(priceEl);
      var current = num(downEl);
      if (!Number.isFinite(price) || !Number.isFinite(current)) { compute(); return; }
      downMode = mode;
      pctBtn.classList.toggle("is-active", mode === "pct");
      dollarBtn.classList.toggle("is-active", mode === "dollar");
      downSuffix.textContent = mode === "pct" ? "%" : "$";
      // Convert displayed value so user keeps the same dollar amount
      if (mode === "dollar") {
        var dollars = price * (current / 100);
        downEl.value = Math.round(dollars);
        if (window.styerMoney) window.styerMoney.fmtEl(downEl);
        downEl.step = "1000";
      } else {
        var pct = price > 0 ? (current / price) * 100 : 0;
        downEl.value = pct.toFixed(2).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
        downEl.step = "0.5";
      }
      compute();
    }
    pctBtn.addEventListener("click", function () { setDownMode("pct"); });
    dollarBtn.addEventListener("click", function () { setDownMode("dollar"); });

    // ----- Lead capture (only active if WEBHOOK_URL set) ----------
    if (WEBHOOK_URL && leadSubmit) {
      leadSubmit.addEventListener("click", function () {
        var name = ($("dscr-lead-name").value || "").trim();
        var email = ($("dscr-lead-email").value || "").trim();
        var notes = ($("dscr-lead-notes").value || "").trim();
        leadStatus.className = "dscr-lead-status";
        if (!name || !email || !/.+@.+\..+/.test(email)) {
          leadStatus.textContent = "Please enter your name and a valid email.";
          leadStatus.classList.add("err");
          return;
        }
        leadStatus.textContent = "Sending...";

        var price = num(priceEl), downRaw = num(downEl), rate = num(rateEl);
        var years = parseInt(termEl.value, 10) || 30;
        var downAmount = downMode === "pct" ? price * (downRaw / 100) : downRaw;
        var loan = Math.max(price - downAmount, 0);
        var pi = monthlyPI(loan, rate, years);
        var taxM = num(taxEl) / 12, insM = num(insEl) / 12, hoa = num(hoaEl);
        var pitia = pi + taxM + insM + hoa;
        var rent = num(rentEl);
        var dscr = pitia > 0 ? rent / pitia : 0;
        var cashflow = rent - pitia;

        var payload = {
          name: name, email: email, notes: notes,
          inputs: {
            purchasePrice: price, downPaymentMode: downMode,
            downPaymentValue: downRaw, downPaymentAmount: downAmount,
            loanAmount: loan, interestRate: rate, termYears: years,
            annualTaxes: num(taxEl), annualInsurance: num(insEl),
            monthlyHOA: hoa, monthlyRent: rent
          },
          outputs: {
            dscr: +dscr.toFixed(4), monthlyPITIA: +pitia.toFixed(2),
            monthlyCashFlow: +cashflow.toFixed(2)
          },
          dscr: +dscr.toFixed(4),
          cashFlow: +cashflow.toFixed(2),
          pitiaBreakout: {
            principalInterest: +pi.toFixed(2),
            taxes: +taxM.toFixed(2),
            insurance: +insM.toFixed(2),
            hoa: +hoa.toFixed(2),
            total: +pitia.toFixed(2)
          },
          page: "dscr-calculator"
        };

        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).then(function (res) {
          if (!res.ok) throw new Error("Network");
          leadStatus.textContent = "Sent. Adam will reply directly.";
          leadStatus.classList.add("ok");
        }).catch(function () {
          leadStatus.textContent = "Could not send right now — please email adam@thestyerteam.com.";
          leadStatus.classList.add("err");
        });
      });
    }

    // Initial compute
    compute();
  })();
  