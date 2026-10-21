
      /* ── Buydown Calculator ── */
      var BUYDOWN_TYPES = {
        '2-1':   { reductions: [2, 1],    label: '2/1'   },
        '3-2-1': { reductions: [3, 2, 1], label: '3/2/1' },
        '1-1':   { reductions: [1, 1],    label: '1/1'   },
        '1-0':   { reductions: [1],        label: '1/0'   }
      };
      var PI_MODE = 'pi';
      var SHOW_MONTHS_DEFAULT = 36;
      var showFullSchedule = false;
      var chartTimeline = null;
      var chartSubsidy  = null;

      /* Standard fully-amortizing payment at note rate */
      function pmt(principal, annualRatePct, years) {
        if(![principal,annualRatePct,years].every(Number.isFinite)||principal<0||annualRatePct<0||years<=0)return NaN;
        if (annualRatePct === 0) return principal / (years * 12);
        var r = annualRatePct / 100 / 12;
        var n = years * 12;
        return principal * r / -Math.expm1(-n*Math.log1p(r));
      }

      /* Format helpers */
      function fmtDollar(n) {
        return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      function fmtDollarInt(n) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
      }
      function fmtPct(n) { return n.toFixed(3).replace(/\.?0+$/, '') + '%'; }

      /* Build month-by-month schedule rows */
      function buildSchedule(loanAmount, noteRate, termYears, reductions, startDate) {
        var rows = [];
        var balance = loanAmount;
        var basePmt = pmt(loanAmount, noteRate, termYears);
        var totalMonths = termYears * 12;
        var r = noteRate / 100 / 12;
        var date = startDate ? new Date(startDate + '-01') : null;

        for (var m = 1; m <= totalMonths; m++) {
          var yearIdx = Math.floor((m - 1) / 12); /* 0-based */
          var reduction = (yearIdx < reductions.length) ? reductions[yearIdx] : 0;
          var effectiveRate = Math.max(0,noteRate - reduction);
          var rMo = r; /* interest always at note rate */
          var interest = balance * rMo;
          var principal = basePmt - interest;
          balance = Math.max(0, balance - principal);

          var subsidy = 0;
          if (reduction > 0) {
            var discountedPmt = pmt(loanAmount, effectiveRate, termYears);
            subsidy = basePmt - discountedPmt;
          }

          var rowDate = null;
          if (date) {
            rowDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
          }

          rows.push({
            month: m, year: yearIdx + 1,
            effectiveRate: effectiveRate, noteRate: noteRate,
            basePmt: basePmt, subsidy: subsidy,
            interest: interest, principal: principal,
            balance: balance, date: rowDate,
            isBuydown: reduction > 0
          });
        }
        return rows;
      }

      /* Compute summary object from schedule */
      function computeSummary(rows, noteRate, escrowMo, sellerCredit, bdConfig) {
        var totalSubsidy = 0;
        var yr1Pmt = 0, yr1Rate = 0;
        var reductions = bdConfig.reductions;

        for (var i = 0; i < rows.length; i++) {
          totalSubsidy += rows[i].subsidy;
        }

        if (rows.length > 0) {
          yr1Rate = rows[0].effectiveRate;
          yr1Pmt  = rows[0].basePmt - rows[0].subsidy;
        }

        var basePmt    = rows.length > 0 ? rows[0].basePmt : 0;
        var moSavings  = basePmt - yr1Pmt;
        var creditLeft = sellerCredit - totalSubsidy;

        return {
          noteRate:     noteRate,
          basePmt:      basePmt,
          yr1Rate:      yr1Rate,
          yr1Pmt:       yr1Pmt,
          moSavings:    moSavings,
          totalSubsidy: totalSubsidy,
          creditLeft:   creditLeft,
          escrowMo:     escrowMo
        };
      }

      /* Render summary cards */
      function renderSummaryCards(s, showPITI) {
        var esc = s.escrowMo;
        document.getElementById('bd-out-base-rate').textContent = fmtPct(s.noteRate);
        document.getElementById('bd-out-base-pmt').textContent  = fmtDollarInt(showPITI ? s.basePmt + esc : s.basePmt) + '/mo';
        document.getElementById('bd-out-yr1-rate').textContent  = fmtPct(s.yr1Rate);
        document.getElementById('bd-out-yr1-pmt').textContent   = fmtDollarInt(showPITI ? s.yr1Pmt + esc : s.yr1Pmt) + '/mo';
        document.getElementById('bd-out-mo-savings').textContent = fmtDollarInt(s.moSavings);
        document.getElementById('bd-out-total-subsidy').textContent = fmtDollarInt(s.totalSubsidy);
        var bal = s.creditLeft;
        document.getElementById('bd-out-credit-balance').textContent = (bal === 0 && s.escrowMo === 0 && document.getElementById('bd-seller-credit').value == 0) ? '—' : fmtDollarInt(bal);
      }

      /* Render alerts for surplus / shortfall */
      function renderAlerts(s) {
        var surplus   = document.getElementById('bd-alert-surplus');
        var shortfall = document.getElementById('bd-alert-shortfall');
        surplus.style.display   = 'none';
        shortfall.style.display = 'none';
        var credit = parseFloat(String(document.getElementById('bd-seller-credit').value).replace(/[$,]/g, '')) || 0;
        if (credit <= 0) return;
        if (s.creditLeft >= 0) {
          surplus.style.display = 'block';
          surplus.textContent = 'Seller credit covers the buydown with ' + fmtDollarInt(s.creditLeft) + ' remaining for other closing costs.';
        } else {
          shortfall.style.display = 'block';
          shortfall.textContent = 'Seller credit is ' + fmtDollarInt(-s.creditLeft) + ' short of the required buydown deposit (' + fmtDollarInt(s.totalSubsidy) + ' needed).';
        }
      }

      /* Render year-by-year table */
      function renderYearBreakdown(rows, bdConfig, showPITI, escrowMo) {
        var tbody = document.getElementById('bd-year-tbody');
        var years = {};
        for (var i = 0; i < rows.length; i++) {
          var r = rows[i];
          if (!years[r.year]) years[r.year] = { subsidy: 0, pmt: r.basePmt - r.subsidy, rate: r.effectiveRate, isBuydown: r.isBuydown };
          years[r.year].subsidy += r.subsidy;
        }
        var html = '';
        var reductions = bdConfig.reductions;
        var noteRate = rows.length > 0 ? rows[0].noteRate : 0;
        var basePmt  = rows.length > 0 ? rows[0].basePmt  : 0;
        for (var yr = 1; yr <= Object.keys(years).length; yr++) {
          var y = years[yr];
          var moSav = basePmt - y.pmt;
          var pmtShow = showPITI ? y.pmt + escrowMo : y.pmt;
          if (y.isBuydown) {
            html += '<tr><td>Year ' + yr + '</td><td>' + fmtPct(y.rate) + '</td><td>' + fmtDollarInt(pmtShow) + '</td><td class="savings-cell">-' + fmtDollarInt(moSav) + '/mo</td><td>' + fmtDollarInt(y.subsidy) + '</td></tr>';
          } else {
            html += '<tr class="note-row"><td>Year ' + yr + '+</td><td>' + fmtPct(noteRate) + '</td><td>' + fmtDollarInt(showPITI ? basePmt + escrowMo : basePmt) + '</td><td>—</td><td>—</td></tr>';
            break;
          }
        }
        tbody.innerHTML = html;
      }


      /* Render full amortization schedule */
      function renderSchedule(rows, showFull, showPITI, escrowMo) {
        var tbody = document.getElementById('bd-schedule-tbody');
        var limit = showFull ? rows.length : SHOW_MONTHS_DEFAULT;
        var html = '';
        for (var i = 0; i < Math.min(rows.length, limit); i++) {
          var r = rows[i];
          var pmtShow = showPITI ? (r.basePmt - r.subsidy) + escrowMo : (r.basePmt - r.subsidy);
          var cls = r.isBuydown ? ' class="buydown-row"' : '';
          html += '<tr' + cls + '>'
            + '<td>' + r.month + '</td>'
            + '<td>' + r.date + '</td>'
            + '<td>' + fmtPct(r.effectiveRate) + '</td>'
            + '<td>' + fmtDollarInt(pmtShow) + '</td>'
            + '<td>' + fmtDollarInt(r.interest) + '</td>'
            + '<td>' + fmtDollarInt(r.principal) + '</td>'
            + '<td>' + (r.subsidy > 0 ? fmtDollarInt(r.subsidy) : '—') + '</td>'
            + '<td>' + fmtDollarInt(r.balance) + '</td>'
            + '</tr>';
        }
        tbody.innerHTML = html;
        var btn = document.getElementById('bd-show-full-btn');
        if (rows.length <= SHOW_MONTHS_DEFAULT) {
          btn.style.display = 'none';
        } else {
          btn.style.display = showFull ? 'none' : 'block';
          btn.textContent = 'Show all ' + rows.length + ' months';
        }
      }

      /* Chart: payment timeline */
      function renderChartTimeline(rows, showPITI, escrowMo) {
        var ctx = document.getElementById('bd-chart-timeline').getContext('2d');
        var labels = [], dataPI = [], dataPITI = [];
        for (var i = 0; i < rows.length; i++) {
          var r = rows[i];
          var pi = r.basePmt - r.subsidy;
          labels.push(r.month);
          dataPI.push(pi.toFixed(2));
          dataPITI.push((pi + escrowMo).toFixed(2));
        }
        var useData = showPITI ? dataPITI : dataPI;
        if (chartTimeline) chartTimeline.destroy();
        chartTimeline = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: showPITI ? 'Monthly PITI' : 'Monthly P&I',
              data: useData,
              borderColor: '#9A7B2D',
              backgroundColor: 'rgba(201,168,76,0.12)',
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              tension: 0
            }]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { maxTicksLimit: 12, callback: function(v,i){ return (i+1) % 12 === 0 ? 'Yr '+(Math.floor((i+1)/12)) : ''; } } },
              y: { ticks: { callback: function(v){ return '$' + Math.round(v).toLocaleString(); } } }
            }
          }
        });
      }

      /* Chart: subsidy breakdown by buydown year */
      function renderChartSubsidy(rows, bdConfig) {
        var ctx = document.getElementById('bd-chart-subsidy').getContext('2d');
        var yearLabels = [], yearSubsidy = [];
        var years = {};
        for (var i = 0; i < rows.length; i++) {
          var r = rows[i];
          if (!r.isBuydown) continue;
          if (!years[r.year]) years[r.year] = 0;
          years[r.year] += r.subsidy;
        }
        for (var yr in years) {
          yearLabels.push('Year ' + yr + ' (' + bdConfig.label.split('/')[parseInt(yr)-1] + '% off)');
          yearSubsidy.push(years[yr].toFixed(2));
        }
        if (chartSubsidy) chartSubsidy.destroy();
        chartSubsidy = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: yearLabels,
            datasets: [{
              label: 'Seller Subsidy',
              data: yearSubsidy,
              backgroundColor: '#0A1F3F',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { ticks: { callback: function(v){ return '$' + Math.round(v).toLocaleString(); } } }
            }
          }
        });
      }

      /* Render print summary */
      function renderPrintSummary(s, rows, bdLabel) {
        var div = document.getElementById('bd-print-body');
        var loan = parseFloat(String(document.getElementById('bd-loan-input').value).replace(/[$,]/g, '')) || 0;
        document.getElementById('bd-print-date').textContent = new Date().toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
        div.innerHTML = '<p><strong>Buydown Type:</strong> ' + bdLabel + '</p>'
          + '<p><strong>Loan Amount:</strong> ' + fmtDollar(loan) + '</p>'
          + '<p><strong>Note Rate:</strong> ' + fmtPct(s.noteRate) + ' &nbsp;|&nbsp; <strong>Base P&amp;I:</strong> ' + fmtDollarInt(s.basePmt) + '/mo</p>'
          + '<p><strong>Year 1 Rate:</strong> ' + fmtPct(s.yr1Rate) + ' &nbsp;|&nbsp; <strong>Year 1 Payment:</strong> ' + fmtDollarInt(s.yr1Pmt) + '/mo</p>'
          + '<p><strong>Monthly Savings (Yr 1):</strong> ' + fmtDollarInt(s.moSavings) + '/mo</p>'
          + '<p><strong>Total Buydown Deposit:</strong> ' + fmtDollarInt(s.totalSubsidy) + '</p>'
          + (s.creditLeft !== null ? '<p><strong>Seller Credit Balance After Buydown:</strong> ' + fmtDollarInt(s.creditLeft) + '</p>' : '')
          + '<hr style="margin:1rem 0">'
          + '<table style="width:100%;border-collapse:collapse;font-size:.85rem">'
          + '<thead><tr style="background:#0A1F3F;color:#fff"><th style="padding:.4rem .6rem;text-align:left">Mo</th><th>Rate</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Subsidy</th><th>Balance</th></tr></thead>'
          + '<tbody>'
          + rows.map(function(r){
              return '<tr style="' + (r.isBuydown ? 'background:#fdf6e3' : '') + '">'
                + '<td style="padding:.3rem .6rem">' + r.month + '</td>'
                + '<td>' + fmtPct(r.effectiveRate) + '</td>'
                + '<td>' + fmtDollarInt(r.basePmt - r.subsidy) + '</td>'
                + '<td>' + fmtDollarInt(r.interest) + '</td>'
                + '<td>' + fmtDollarInt(r.principal) + '</td>'
                + '<td>' + (r.subsidy > 0 ? fmtDollarInt(r.subsidy) : '—') + '</td>'
                + '<td>' + fmtDollarInt(r.balance) + '</td>'
                + '</tr>';
            }).join('')
          + '</tbody></table>';
      }

      /* Read all inputs and return a config object */
      function getInputs() {
        var bdType = document.querySelector('input[name="bd-type"]:checked');
        var termSel = document.getElementById('bd-term').value;
        var termYears = termSel === 'custom'
          ? Number(document.getElementById('bd-term-custom').value)
          : parseInt(termSel);
        var taxFreq = document.querySelector('input[name="bd-tax-freq"]:checked').value;
        var insFreq = document.querySelector('input[name="bd-ins-freq"]:checked').value;
        var taxRaw  = parseFloat(String(document.getElementById('bd-tax-input').value).replace(/[$,]/g, ''))  || 0;
        var insRaw  = parseFloat(String(document.getElementById('bd-ins-input').value).replace(/[$,]/g, ''))  || 0;
        var taxMo   = taxFreq === 'yr' ? taxRaw / 12 : taxRaw;
        var insMo   = insFreq === 'yr' ? insRaw / 12 : insRaw;
        var hoaMo   = parseFloat(String(document.getElementById('bd-hoa').value).replace(/[$,]/g, '')) || 0;
        return {
          bdType:      bdType ? bdType.value : '2-1',
          loanAmount:  Number(String(document.getElementById('bd-loan-input').value).replace(/[$,]/g, '')),
          noteRate:    Number(document.getElementById('bd-rate-input').value),
          termYears:   termYears,
          startDate:   document.getElementById('bd-start-date').value || new Date().toISOString().slice(0,7),
          escrowMo:    taxMo + insMo + hoaMo,
          sellerCredit: parseFloat(String(document.getElementById('bd-seller-credit').value).replace(/[$,]/g, '')) || 0
        };
      }

      /* Buydown vs. Price Reduction comparison */
      function computeComparison(inp, bdConfig, s) {
        var cost = s.totalSubsidy;
        var panel = document.getElementById('bd-comparison-panel');
        if (cost <= 0) { panel.style.display = 'none'; return; }
        panel.style.display = '';
        var reductions = bdConfig.reductions;
        var basePmt = s.basePmt;
        var buydownSavings24 = 0;
        for (var yr = 0; yr < Math.min(2, reductions.length); yr++) {
          var discPmt = pmt(inp.loanAmount, Math.max(0,inp.noteRate - reductions[yr]), inp.termYears);
          buydownSavings24 += (basePmt - discPmt) * 12;
        }
        var reducedPmt = pmt(Math.max(0, inp.loanAmount - cost), inp.noteRate, inp.termYears);
        var priceSavings24 = (basePmt - reducedPmt) * 24;
        document.getElementById('bd-comp-buydown-cost').textContent = fmtDollarInt(cost) + ' seller deposit';
        document.getElementById('bd-comp-price-cost').textContent   = fmtDollarInt(cost) + ' off purchase price';
        document.getElementById('bd-comp-buydown-savings').textContent = fmtDollarInt(buydownSavings24);
        document.getElementById('bd-comp-price-savings').textContent   = fmtDollarInt(priceSavings24);
        var buydownCard = document.getElementById('bd-comp-buydown-card');
        var priceCard   = document.getElementById('bd-comp-price-card');
        var verdict     = document.getElementById('bd-comp-verdict');
        buydownCard.classList.remove('winner'); priceCard.classList.remove('winner');
        var diff = buydownSavings24 - priceSavings24;
        if (Math.abs(diff) < 50) {
          verdict.textContent = 'Both options save roughly the same over 2 years.';
          verdict.className = 'bd-comp-verdict bd-comp-verdict--tie';
        } else if (diff > 0) {
          buydownCard.classList.add('winner');
          verdict.textContent = '\u2713 Buydown saves ' + fmtDollarInt(diff) + ' more over the first 2 years.';
          verdict.className = 'bd-comp-verdict bd-comp-verdict--buydown';
        } else {
          priceCard.classList.add('winner');
          verdict.textContent = '\u2713 Price reduction saves ' + fmtDollarInt(-diff) + ' more over the first 2 years.';
          verdict.className = 'bd-comp-verdict bd-comp-verdict--price';
        }
      }

      /* Master compute + render */
      function validateBuydownInputs(){
        var fields=[['bd-loan-input',0,2000000,true],['bd-rate-input',0,20,false],['bd-tax-input',0,Infinity,false],['bd-ins-input',0,Infinity,false],['bd-hoa',0,Infinity,false],['bd-seller-credit',0,Infinity,false]];
        if(document.getElementById('bd-term').value==='custom')fields.push(['bd-term-custom',1,40,true]);
        var valid=true;fields.forEach(function(f){var el=document.getElementById(f[0]),raw=String(el.value).replace(/[$,]/g,'').trim(),v=Number(raw),ok=/^(?:\d+\.?\d*|\.\d+)$/.test(raw)&&Number.isFinite(v)&&v>=f[1]&&v<=f[2]&&(!f[3]||v>0);if(f[0]==='bd-term-custom')ok=ok&&Number.isInteger(v);el.setAttribute('aria-invalid',String(!ok));if(!ok)valid=false;});
        var message=document.getElementById('bd-input-error');if(!message){message=document.createElement('p');message.id='bd-input-error';message.setAttribute('role','status');document.getElementById('bd-loan-input').parentElement.before(message);}
        message.textContent=valid?'Illustration only. Temporary payment rates cannot fall below 0%.':'Correct the highlighted inputs. Enter a positive loan and term, a rate from 0 to 20%, and nonnegative costs. Use 0 when a cost does not apply.';
        document.querySelectorAll('.bd-outputs-panel,.bd-charts-section,.bd-schedule-section').forEach(function(result){result.hidden=!valid;if(valid)result.style.removeProperty('display');else result.style.setProperty('display','none','important');});
        return valid;
      }
      function compute() {
        if(!validateBuydownInputs())return;
        var inp = getInputs();
        var bdConfig = BUYDOWN_TYPES[inp.bdType];
        var rows = buildSchedule(inp.loanAmount, inp.noteRate, inp.termYears, bdConfig.reductions, inp.startDate);
        var s    = computeSummary(rows, inp.noteRate, inp.escrowMo, inp.sellerCredit, bdConfig);
        var showPITI = PI_MODE === 'piti';
        renderSummaryCards(s, showPITI);
        renderAlerts(s);
        renderYearBreakdown(rows, bdConfig, showPITI, inp.escrowMo);
        renderSchedule(rows, showFullSchedule, showPITI, inp.escrowMo);
        renderChartTimeline(rows, showPITI, inp.escrowMo);
        renderChartSubsidy(rows, bdConfig);
        renderPrintSummary(s, rows, bdConfig.label);
        computeComparison(inp, bdConfig, s);
      }

      /* Build shareable URL with current inputs */
      function buildShareURL() {
        var inp = getInputs();
        var p = new URLSearchParams({
          type:   inp.bdType,
          amt:    inp.loanAmount,
          rate:   inp.noteRate,
          term:   inp.termYears,
          start:  inp.startDate,
          tax:    document.getElementById('bd-tax-input').value || 0,
          taxfreq: document.querySelector('input[name="bd-tax-freq"]:checked').value,
          ins:    document.getElementById('bd-ins-input').value || 0,
          insfreq: document.querySelector('input[name="bd-ins-freq"]:checked').value,
          hoa:    document.getElementById('bd-hoa').value || 0,
          credit: inp.sellerCredit,
          pimode: PI_MODE
        });
        return window.location.origin + window.location.pathname + '?' + p.toString();
      }

      /* Restore state from URL params on load */
      function restoreFromURL() {
        var p = new URLSearchParams(window.location.search);
        if (!p.has('amt')) return;
        var type = p.get('type') || '2-1';
        var radio = document.querySelector('input[name="bd-type"][value="' + type + '"]');
        if (radio) radio.checked = true;
        var amt  = p.get('amt');   if (amt)  { var amtClean = String(amt).replace(/[$,]/g, ''); document.getElementById('bd-loan-slider').value = amtClean; document.getElementById('bd-loan-input').value = amtClean; }
        var rate = p.get('rate');  if (rate) { document.getElementById('bd-rate-slider').value = rate; document.getElementById('bd-rate-input').value = rate; }
        var term = p.get('term');  if (term) {
          var sel = document.getElementById('bd-term');
          var opt = sel.querySelector('option[value="' + term + '"]');
          if (opt) { sel.value = term; }
          else { sel.value = 'custom'; document.getElementById('bd-term-custom').value = term; document.getElementById('bd-term-custom').style.display = 'block'; }
        }
        var start = p.get('start'); if (start) document.getElementById('bd-start-date').value = start;
        var tax = p.get('tax'); if (tax) document.getElementById('bd-tax-input').value = tax;
        var taxfreq = p.get('taxfreq'); if (taxfreq) {
          var tfr = document.querySelector('input[name="bd-tax-freq"][value="' + taxfreq + '"]');
          if (tfr) tfr.checked = true;
        }
        var ins = p.get('ins'); if (ins) document.getElementById('bd-ins-input').value = ins;
        var insfreq = p.get('insfreq'); if (insfreq) {
          var ifr = document.querySelector('input[name="bd-ins-freq"][value="' + insfreq + '"]');
          if (ifr) ifr.checked = true;
        }
        var hoa = p.get('hoa'); if (hoa) document.getElementById('bd-hoa').value = hoa;
        var credit = p.get('credit'); if (credit) document.getElementById('bd-seller-credit').value = credit;
        var pimode = p.get('pimode'); if (pimode === 'piti') {
          PI_MODE = 'piti';
          var btnPiti = document.getElementById('btn-show-piti');
          var btnPi = document.getElementById('btn-show-pi');
          btnPiti.classList.add('active');
          btnPi.classList.remove('active');
          if (btnPiti.hasAttribute('aria-pressed')) { btnPiti.setAttribute('aria-pressed','true'); btnPi.setAttribute('aria-pressed','false'); }
        }
      }

      /* Wire up all events */
      function initEvents() {
        /* Buydown type radios */
        var typeInputs = document.querySelectorAll('input[name="bd-type"]');
        for (var i = 0; i < typeInputs.length; i++) {
          typeInputs[i].addEventListener('change', compute);
        }

        /* Loan amount slider + number sync */
        var loanSlider = document.getElementById('bd-loan-slider');
        var loanInput  = document.getElementById('bd-loan-input');
        loanSlider.addEventListener('input', function(){ loanInput.value = Number(loanSlider.value).toLocaleString('en-US'); compute(); });
        loanInput.addEventListener('input',  function(){ loanSlider.value = String(loanInput.value).replace(/[$,]/g, ''); compute(); });

        /* Rate slider + number sync */
        var rateSlider = document.getElementById('bd-rate-slider');
        var rateInput  = document.getElementById('bd-rate-input');
        rateSlider.addEventListener('input', function(){ rateInput.value = parseFloat(rateSlider.value).toFixed(3); compute(); });
        rateInput.addEventListener('input',  function(){ rateSlider.value = rateInput.value; compute(); });

        /* Term select + custom field */
        var termSel    = document.getElementById('bd-term');
        var termCustom = document.getElementById('bd-term-custom');
        termSel.addEventListener('change', function(){
          termCustom.style.display = termSel.value === 'custom' ? 'block' : 'none';
          compute();
        });
        termCustom.addEventListener('input', compute);

        /* Start date */
        document.getElementById('bd-start-date').addEventListener('change', compute);

        /* Escrow / HOA inputs */
        var escrowIds = ['bd-tax-input','bd-ins-input','bd-hoa','bd-seller-credit'];
        for (var j = 0; j < escrowIds.length; j++) {
          document.getElementById(escrowIds[j]).addEventListener('input', compute);
        }

        /* Frequency toggles */
        var freqInputs = document.querySelectorAll('input[name="bd-tax-freq"], input[name="bd-ins-freq"]');
        for (var k = 0; k < freqInputs.length; k++) {
          freqInputs[k].addEventListener('change', compute);
        }

        /* PI / PITI toggle */
        document.getElementById('btn-show-pi').addEventListener('click', function(){
          PI_MODE = 'pi';
          this.classList.add('active');
          document.getElementById('btn-show-piti').classList.remove('active');
          compute();
        });
        document.getElementById('btn-show-piti').addEventListener('click', function(){
          PI_MODE = 'piti';
          this.classList.add('active');
          document.getElementById('btn-show-pi').classList.remove('active');
          compute();
        });

        /* Show full schedule */
        document.getElementById('bd-show-full-btn').addEventListener('click', function(){
          showFullSchedule = true;
          compute();
        });

        /* Share button */
        document.getElementById('bd-share-btn').addEventListener('click', function(){
          var url = buildShareURL();
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function(){
              document.getElementById('bd-share-confirm').style.display = 'inline';
              setTimeout(function(){ document.getElementById('bd-share-confirm').style.display = 'none'; }, 2500);
            });
          } else {
            prompt('Copy this link:', url);
          }
        });

        /* Print button */
        document.getElementById('bd-print-btn').addEventListener('click', function(){
          window.print();
        });
      }

      /* Init on DOM ready */
      document.addEventListener('DOMContentLoaded', function(){
        restoreFromURL();
        initEvents();
        compute();
      });

    