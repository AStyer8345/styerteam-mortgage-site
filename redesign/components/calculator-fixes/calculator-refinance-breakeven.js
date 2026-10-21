
(function () {
  var Suite = window.CalcSuite;
  var container = document.getElementById('refi-break-sliders');
  var heroSavings = document.getElementById('hero-savings');
  var heroBreakeven = document.getElementById('hero-breakeven');
  var outCurrent = document.getElementById('out-current-pmt');
  var outNew = document.getElementById('out-new-pmt');
  var outCosts = document.getElementById('out-costs');
  var newRateInp = document.getElementById('new-rate');
  var newTermInp = document.getElementById('new-term');
  var costsInp = document.getElementById('costs');
  var newRateVal = document.getElementById('new-rate-val');
  var newTermVal = document.getElementById('new-term-val');
  var costsVal = document.getElementById('costs-val');

  var state = { balance: 350000, currentRate: 7, currentYears: 30, newRate: 6, newYears: 30, costs: 6000 };

  function formatCurr(v) { return Suite.formatCurrency(v); }

  function update() {
    var checks=[[newRateInp,0,20],[newTermInp,1,50],[costsInp,0,1000000]],valid=true;
    checks.forEach(function(c){var raw=c[0].value.trim(),v=Number(raw),ok=raw!==''&&Number.isFinite(v)&&v>=c[1]&&v<=c[2];c[0].setAttribute('aria-invalid',String(!ok));if(!ok)valid=false;});
    if(!valid){heroSavings.textContent='—';heroBreakeven.textContent='Check inputs';outCurrent.textContent='—';outNew.textContent='—';return;}
    var currentPmt = Suite.monthlyPayment(state.balance, state.currentRate, state.currentYears);
    var newPmt = Suite.monthlyPayment(state.balance, state.newRate, state.newYears);
    var savings = currentPmt - newPmt;
    var months = state.costs > 0 && savings > 0 ? Math.ceil(state.costs / savings) : 0;

    outCurrent.textContent = formatCurr(currentPmt) + '/mo';
    outNew.textContent = formatCurr(newPmt) + '/mo';
    outCosts.textContent = formatCurr(state.costs);
    heroSavings.textContent = savings >= 0 ? formatCurr(savings) + '/mo' : '—';
    heroBreakeven.textContent = months > 0 ? months + ' mo' : (savings > 0 && state.costs === 0 ? '0 mo' : 'No payment break-even');

    newRateVal.textContent = state.newRate.toFixed(2) + '%';
    newTermVal.textContent = state.newYears + ' yrs';
    costsVal.textContent = formatCurr(state.costs);
  }

  Suite.createSlider(container, {
    id: 'balance',
    label: 'Current balance ($)',
    min: 50000,
    max: 1000000,
    step: 10000,
    value: 350000,
    formatter: formatCurr,
    onChange: function (v) { state.balance = v; update(); }
  });
  Suite.createSlider(container, {
    id: 'current-rate',
    label: 'Current rate (%)',
    min: 2,
    max: 10,
    step: 0.125,
    value: 7,
    formatter: function (v) { return v.toFixed(2) + '%'; },
    onChange: function (v) { state.currentRate = v; update(); }
  });
  Suite.createSlider(container, {
    id: 'current-term',
    numericStep: 1,
    label: 'Current term (years)',
    min: 10,
    max: 30,
    step: 1,
    value: 30,
    formatter: function (v) { return v + ' yrs'; },
    onChange: function (v) { state.currentYears = v; update(); }
  });

  newRateInp.addEventListener('input', function () { state.newRate = parseFloat(newRateInp.value); update(); });
  newTermInp.addEventListener('input', function () { state.newYears = parseFloat(newTermInp.value); update(); });
  costsInp.addEventListener('input', function () { state.costs = parseFloat(costsInp.value); update(); });

  update();
})();
  