
  (function () {
    'use strict';

    // ----- CONFIG (edit these to adjust behavior) ----------------------------
    // Active loan application URL. Set to "" to hide the tertiary link.
    var APPLICATION_URL = "https://hypersmart.my1003app.com/513013/register?time=1779291829279";

    // Webhook for the optional "Email me this analysis" form. Empty = hide.
    var WEBHOOK_URL = "";

    // Primary depletion periods (visually emphasized cards)
    var PRIMARY_PERIODS = [36, 60, 84];

    // Illustrative inclusion percentages (0–100), not lender eligibility rules.
    var DEFAULT_HAIRCUTS = {
      checking: 100,
      brokerage: 100,
      retirement: 70,
      other: 100
    };

    // Compliance / disclaimer copy (used in webhook payload as well)
    var DISCLAIMER = "Illustrative assumptions only. Not verified eligible assets or qualifying income, a quote, loan offer, approval, commitment to lend, or Loan Estimate. Closing funds, reserves, taxes, penalties, and account obligations are not deducted automatically. The income/payment comparison is not a debt-to-income or affordability test. Current lender rules and full underwriting control.";

    // ----- Helpers -----------------------------------------------------------
    function $(id) { return document.getElementById(id); }
    function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    function num(v) {
      var n = parseFloat(String(v).replace(/[$,]/g, ""));
      return isFinite(n) && n >= 0 ? n : 0;
    }
    function pct(v) {
      var n = parseFloat(v);
      if (!isFinite(n)) return 0;
      if (n < 0) return 0;
      if (n > 100) return 100;
      return n;
    }
    var currencyFmt = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
    function money(v) {
      if (!isFinite(v) || v < 0) v = 0;
      return currencyFmt.format(Math.round(v));
    }

    // ----- DOM refs ----------------------------------------------------------
    var els = {
      checking: $('adc-checking'),
      brokerage: $('adc-brokerage'),
      retirement: $('adc-retirement'),
      other: $('adc-other'),
      otherIncome: $('adc-other-income'),
      target: $('adc-target'),
      pctChecking: $('adc-pct-checking'),
      pctBrokerage: $('adc-pct-brokerage'),
      pctRetirement: $('adc-pct-retirement'),
      pctOther: $('adc-pct-other'),
      segBtns: qsa('.adc-seg-btn'),
      periodCards: qsa('.adc-period'),
      heroAmount: $('adc-hero-amount'),
      heroPeriod: $('adc-hero-period'),
      period36: $('adc-period-36'),
      period60: $('adc-period-60'),
      period84: $('adc-period-84'),
      outTotalAssets: $('adc-out-total-assets'),
      outEligible: $('adc-out-eligible'),
      outAssetIncome: $('adc-out-asset-income'),
      outExistingRow: $('adc-out-existing-row'),
      outExisting: $('adc-out-existing'),
      outTotalIncome: $('adc-out-total-income'),
      coverage: $('adc-coverage'),
      coverageRatio: $('adc-coverage-ratio'),
      coverageIncome: $('adc-coverage-income'),
      coverageTarget: $('adc-coverage-target'),
      barFill: $('adc-bar-fill'),
      surplusLabel: $('adc-surplus-label'),
      surplusValue: $('adc-surplus-value'),
      status: $('adc-status'),
      statusTitle: $('adc-status-title'),
      statusMsg: $('adc-status-msg'),
      appLink: $('adc-app-link'),
      accordionToggle: document.querySelector('.adc-accordion-toggle'),
      accordionBody: $('adc-advanced'),
      emailWrap: $('adc-email'),
      emailForm: $('adc-email-form'),
      emailMsg: $('adc-email-msg'),
      emailName: $('adc-email-name'),
      emailAddr: $('adc-email-addr'),
      emailNotes: $('adc-email-notes')
    };

    // ----- State -------------------------------------------------------------
    var state = { period: 60 };

    // ----- Wire config -> DOM ------------------------------------------------
    if (APPLICATION_URL && els.appLink) {
      els.appLink.href = APPLICATION_URL;
      els.appLink.target = "_blank";
      els.appLink.rel = "noopener";
      els.appLink.hidden = false;
    }
    if (WEBHOOK_URL && els.emailWrap) {
      els.emailWrap.hidden = false;
    }

    // ----- Core math ---------------------------------------------------------
    function readInputs() {
      return {
        assets: {
          checking: num(els.checking.value),
          brokerage: num(els.brokerage.value),
          retirement: num(els.retirement.value),
          other: num(els.other.value)
        },
        haircuts: {
          checking: pct(els.pctChecking.value),
          brokerage: pct(els.pctBrokerage.value),
          retirement: pct(els.pctRetirement.value),
          other: pct(els.pctOther.value)
        },
        otherIncome: num(els.otherIncome.value),
        target: num(els.target.value)
      };
    }

    function computeEligible(inputs) {
      var a = inputs.assets, h = inputs.haircuts;
      return (
        a.checking   * (h.checking   / 100) +
        a.brokerage  * (h.brokerage  / 100) +
        a.retirement * (h.retirement / 100) +
        a.other      * (h.other      / 100)
      );
    }

    function totalAssets(inputs) {
      var a = inputs.assets;
      return a.checking + a.brokerage + a.retirement + a.other;
    }

    function monthlyFromAssets(eligible, periodMonths) {
      if (!periodMonths || periodMonths <= 0) return 0;
      return eligible / periodMonths;
    }

    // ----- Neutral arithmetic explanation (not underwriting status) ---------
    function computeStatus(totalIncome, target) {
      if (!target || target <= 0) {
        return {
          mod: '',
          title: 'Illustrative calculation',
          msg: 'This shows the effect of your selected assumptions. A lender must separately determine eligible assets, qualifying income, debts, and the permitted housing payment.'
        };
      }
      return {
        mod: '',
        title: totalIncome >= target ? 'Illustrative income is at or above the entered payment' : 'Illustrative income is below the entered payment',
        msg: 'This comparison does not determine whether the payment is affordable or the loan qualifies. It omits other debts and does not apply lender debt-to-income limits or verify the income and assets.'
      };
    }

    function applyStatus(s) {
      els.status.classList.remove('adc-status--strong', 'adc-status--warn', 'adc-status--alert');
      if (s.mod) els.status.classList.add(s.mod);
      els.statusTitle.textContent = s.title;
      els.statusMsg.textContent = s.msg;
    }

    // ----- Render ------------------------------------------------------------
    function validateAssetInputs() {
      var fields=[els.checking,els.brokerage,els.retirement,els.other,els.otherIncome,els.target,els.pctChecking,els.pctBrokerage,els.pctRetirement,els.pctOther];
      var invalid=[];
      fields.forEach(function(el){var raw=String(el.value).replace(/[$,]/g,'').trim(),value=Number(raw),isPercent=el.id.indexOf('adc-pct-')===0;
        var ok=/^(?:\d+\.?\d*|\.\d+)$/.test(raw)&&Number.isFinite(value)&&value>=0&&(!isPercent||value<=100);
        el.setAttribute('aria-invalid',String(!ok));if(!ok)invalid.push(el);
      });
      if(!invalid.length)return true;
      [els.period36,els.period60,els.period84,els.heroAmount,els.outTotalAssets,els.outEligible,els.outAssetIncome,els.outTotalIncome].forEach(function(el){el.textContent='—';});
      els.coverage.hidden=true;els.outExistingRow.hidden=true;
      els.status.setAttribute('role','status');els.statusTitle.textContent='Check the highlighted inputs';
      els.statusMsg.textContent='Enter a complete, nonnegative number in each field. Use 0 when an amount does not apply. Inclusion percentages must be from 0 to 100. The illustration updates after correction.';
      lastSnapshot=null;return false;
    }
    function render() {
      if(!validateAssetInputs())return;
      var inputs = readInputs();
      var totalA = totalAssets(inputs);
      var eligible = computeEligible(inputs);

      // Period card incomes
      var income36 = monthlyFromAssets(eligible, 36);
      var income60 = monthlyFromAssets(eligible, 60);
      var income84 = monthlyFromAssets(eligible, 84);
      els.period36.textContent = money(income36);
      els.period60.textContent = money(income60);
      els.period84.textContent = money(income84);

      // Selected period
      var assetIncome = monthlyFromAssets(eligible, state.period);
      var totalIncome = assetIncome + inputs.otherIncome;

      // Hero
      els.heroAmount.textContent = money(assetIncome);
      els.heroPeriod.textContent = '/mo @ ' + state.period + ' mo';

      // Result list
      els.outTotalAssets.textContent = money(totalA);
      els.outEligible.textContent = money(eligible);
      els.outAssetIncome.textContent = money(assetIncome);
      if (inputs.otherIncome > 0) {
        els.outExistingRow.hidden = false;
        els.outExisting.textContent = money(inputs.otherIncome);
      } else {
        els.outExistingRow.hidden = true;
      }
      els.outTotalIncome.textContent = money(totalIncome);

      // Coverage meter
      if (inputs.target > 0) {
        els.coverage.hidden = false;
        var ratio = inputs.target > 0 ? (totalIncome / inputs.target) : 0;
        // visual scale: cap at 200% but show ratio number truthfully
        var widthPct = Math.max(0, Math.min(200, ratio * 100));
        // Map 0–200% onto 0–100% of bar (so 100% target sits at midpoint ~50%)
        els.barFill.style.width = (widthPct / 2) + '%';
        els.barFill.classList.remove('adc-bar-fill--strong', 'adc-bar-fill--warn', 'adc-bar-fill--alert');
        els.coverageRatio.textContent = (ratio * 100).toFixed(0) + '% of entered payment';
        els.coverageIncome.textContent = money(totalIncome);
        els.coverageTarget.textContent = money(inputs.target);

        var diff = totalIncome - inputs.target;
        els.surplusLabel.textContent = diff >= 0 ? 'Illustrative income exceeds payment by' : 'Illustrative income is below payment by';
        els.surplusValue.textContent = money(Math.abs(diff));
      } else {
        els.coverage.hidden = true;
      }

      // Status
      applyStatus(computeStatus(totalIncome, inputs.target));

      // Period cards selection state
      els.periodCards.forEach(function (btn) {
        var p = parseInt(btn.getAttribute('data-period-card'), 10);
        var sel = (p === state.period);
        btn.classList.toggle('is-selected', sel);
        btn.setAttribute('aria-pressed', sel ? 'true' : 'false');
      });
      els.segBtns.forEach(function (btn) {
        var p = parseInt(btn.getAttribute('data-period'), 10);
        var sel = (p === state.period);
        btn.classList.toggle('is-active', sel);
        if (sel) btn.setAttribute('aria-selected', 'true');
        else btn.removeAttribute('aria-selected');
      });

      // Preserve legacy payload keys for integrations. All values remain illustrations;
      // the disclaimer, not these historical field names, defines their meaning.
      lastSnapshot = {
        inputs: {
          checking: inputs.assets.checking,
          brokerage: inputs.assets.brokerage,
          retirement: inputs.assets.retirement,
          other: inputs.assets.other,
          existingMonthlyIncome: inputs.otherIncome,
          targetMonthlyPayment: inputs.target
        },
        assumptions: inputs.haircuts,
        outputs: {
          totalAssets: Math.round(totalA),
          eligibleAssets: Math.round(eligible),
          assetUtilizationIncome: Math.round(assetIncome),
          totalQualifyingIncome: Math.round(totalIncome),
          income36mo: Math.round(income36),
          income60mo: Math.round(income60),
          income84mo: Math.round(income84)
        },
        selectedDepletionPeriod: state.period,
        estimatedAssetIncome: Math.round(assetIncome),
        estimatedTotalIncome: Math.round(totalIncome)
      };
    }

    var lastSnapshot = null;

    // ----- Events ------------------------------------------------------------
    function onInput() { render(); }

    [els.checking, els.brokerage, els.retirement, els.other,
     els.otherIncome, els.target,
     els.pctChecking, els.pctBrokerage, els.pctRetirement, els.pctOther
    ].forEach(function (el) {
      if (el) el.addEventListener('input', onInput);
    });

    els.segBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.period = parseInt(btn.getAttribute('data-period'), 10) || 60;
        render();
      });
    });

    els.periodCards.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.period = parseInt(btn.getAttribute('data-period-card'), 10) || 60;
        render();
      });
    });

    if (els.accordionToggle) {
      els.accordionToggle.addEventListener('click', function () {
        var open = els.accordionBody.classList.toggle('is-open');
        els.accordionToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // ----- Email form (only active when WEBHOOK_URL is set) ------------------
    if (WEBHOOK_URL && els.emailForm) {
      els.emailForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (els.emailName.value || '').trim();
        var email = (els.emailAddr.value || '').trim();
        var notes = (els.emailNotes.value || '').trim();
        els.emailMsg.classList.remove('adc-email-msg--ok', 'adc-email-msg--err');

        if (!name || !email || email.indexOf('@') < 1) {
          els.emailMsg.textContent = 'Please add your name and a valid email.';
          els.emailMsg.classList.add('adc-email-msg--err');
          return;
        }

        var payload = Object.assign({
          name: name,
          email: email,
          notes: notes,
          page: 'asset-depletion-calculator',
          disclaimer: DISCLAIMER
        }, lastSnapshot || {});

        els.emailMsg.textContent = 'Sending…';
        fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (res) {
          if (!res.ok) throw new Error('http ' + res.status);
          els.emailMsg.textContent = 'Thanks — Adam will follow up shortly.';
          els.emailMsg.classList.add('adc-email-msg--ok');
          els.emailForm.reset();
        }).catch(function () {
          els.emailMsg.textContent = "Couldn't send right now. Email adam@thestyerteam.com and Adam will follow up.";
          els.emailMsg.classList.add('adc-email-msg--err');
        });
      });
    }

    // First render
    render();
  })();
  