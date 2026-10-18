import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {inlineScripts,fixesRoot} from './calculator-harness.mjs';
import {packagePath} from './runtime.mjs';
const sourceRoot=path.resolve(process.env.CALCULATOR_SITE_DIR||packagePath('../orchestration/site'));
if(!process.env.CALCULATOR_SITE_DIR)throw Error('Set CALCULATOR_SITE_DIR to the unmodified migration snapshot when regenerating patches.');
const patches=[],hash=s=>crypto.createHash('sha256').update(s).digest('hex');
function replace(code,old,next){if(!code.includes(old))throw Error('Missing exact patch: '+old.slice(0,100));return code.replace(old,next);}
function save(name,code){const original=inlineScripts(name)[0];fs.writeFileSync(path.join(fixesRoot,name+'.js'),code);patches.push({route:'/'+name+'.html',originalScriptSha256:hash(original),replacementFile:'components/calculator-fixes/'+name+'.js'});}
let suite=fs.readFileSync(path.join(sourceRoot,'calculator-suite.js'),'utf8');
suite=replace(suite,'      var r = annualRatePercent / 100 / 12;\n      var n = years * 12;',`      if (![principal,annualRatePercent,years].every(Number.isFinite) || principal < 0 || annualRatePercent < 0 || years <= 0) return NaN;
      var r = annualRatePercent / 100 / 12;
      var n = years * 12;`);
const amortStart=suite.indexOf('    amortize: function'),amortEnd=suite.indexOf('\n    /**',amortStart+10);
suite=suite.slice(0,amortStart)+`    amortize: function (balance, annualRatePercent, payment, months) {
      if (![balance,annualRatePercent,payment,months].every(Number.isFinite) || balance < 0 || annualRatePercent < 0 || payment < 0 || months < 0 || !Number.isInteger(months)) return {balance:NaN,interestPaid:NaN,principalPaid:NaN,totalPaid:NaN,accruedInterest:NaN};
      var r=annualRatePercent/1200,bal=balance,interestPaid=0,principalPaid=0,totalPaid=0,accruedInterest=0;
      for(var i=0;i<months&&bal>0;i++){
        var interest=bal*r,paid=Math.min(payment,bal+interest);
        accruedInterest+=interest;interestPaid+=Math.min(paid,interest);principalPaid+=Math.max(0,paid-interest);totalPaid+=paid;
        bal=Math.max(0,bal+interest-paid);
      }
      return {balance:bal,interestPaid:interestPaid,principalPaid:principalPaid,totalPaid:totalPaid,accruedInterest:accruedInterest};
    },
`+suite.slice(amortEnd);
suite=replace(suite,'      var cumeSpread = grossSpread * tMonths;','      var cumeSpread = wrapAm.totalPaid - underAm.totalPaid;');
suite=replace(suite," + config.max + '.</p>';"," + config.max + '. Results still use the last valid value until this is corrected.</p>';");
suite=suite.replaceAll('#059669','#334155').replaceAll('#9A7B2D','#64748b');
fs.writeFileSync(path.join(fixesRoot,'calculator-suite.js'),suite);

// Asset input validation is explicit: an invalid value never silently becomes $0.
let asset=inlineScripts('asset-depletion-calculator')[0];
asset=replace(asset,'    function render() {\n      var inputs = readInputs();',`    function validateAssetInputs() {
      var fields=[els.checking,els.brokerage,els.retirement,els.other,els.otherIncome,els.target,els.pctChecking,els.pctBrokerage,els.pctRetirement,els.pctOther];
      var invalid=[];
      fields.forEach(function(el){var raw=String(el.value).replace(/[$,]/g,'').trim(),value=Number(raw),isPercent=el.id.indexOf('adc-pct-')===0;
        var ok=/^(?:\\d+\\.?\\d*|\\.\\d+)$/.test(raw)&&Number.isFinite(value)&&value>=0&&(!isPercent||value<=100);
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
      var inputs = readInputs();`);
save('asset-depletion-calculator',asset);

// Refinance break-even: zero costs can break even immediately; invalid edits
// must not leave apparently current results visible.
let breakeven=inlineScripts('calculator-refinance-breakeven')[0];
breakeven=replace(breakeven,'  function update() {\n    var currentPmt',`  function update() {
    var checks=[[newRateInp,0,20],[newTermInp,1,50],[costsInp,0,1000000]],valid=true;
    checks.forEach(function(c){var raw=c[0].value.trim(),v=Number(raw),ok=raw!==''&&Number.isFinite(v)&&v>=c[1]&&v<=c[2];c[0].setAttribute('aria-invalid',String(!ok));if(!ok)valid=false;});
    if(!valid){heroSavings.textContent='—';heroBreakeven.textContent='Check inputs';outCurrent.textContent='—';outNew.textContent='—';return;}
    var currentPmt`);
breakeven=replace(breakeven,"    heroBreakeven.textContent = months > 0 ? months + ' mo' : '—';","    heroBreakeven.textContent = months > 0 ? months + ' mo' : (savings > 0 && state.costs === 0 ? '0 mo' : 'No payment break-even');");
save('calculator-refinance-breakeven',breakeven);

// Refinance closing-cost estimate: validate instead of treating typed errors
// as zero and clear auto-calculated points after a percentage is cleared.
let refi=inlineScripts('refinance-calculator')[0];
refi=replace(refi,'function calculateAll() {\n  const loanAmt',`function validateCostInputs() {
  const fields=[...document.querySelectorAll('.inputs input')].filter(el=>!el.readOnly&&!['checkbox','date','radio','hidden'].includes(el.type)&&el.id!=='computed-perdiem');
  let valid=true;
  fields.forEach(el=>{const raw=String(el.value).replace(/[$,]/g,'').trim(),n=Number(raw);const ok=raw===''||(/^(?:\\d+\\.?\\d*|\\.\\d+)$/.test(raw)&&Number.isFinite(n)&&n>=0);el.setAttribute('aria-invalid',String(!ok));if(!ok)valid=false;});
  let message=document.getElementById('refi-input-error');if(!message){message=document.createElement('p');message.id='refi-input-error';message.setAttribute('role','status');document.querySelector('.inputs').prepend(message);}
  message.textContent=valid?'':'Correct the highlighted amount. Enter a nonnegative number, or leave an optional amount blank.';
  if(!valid){document.querySelectorAll('[id^="sum-"]').forEach(el=>{if(!el.children.length)el.textContent='—';});window._lastResult=null;}
  return valid;
}
function calculateAll() {
  if(!validateCostInputs())return;
  const loanAmt`);
refi=replace(refi,'  let pointsDollar = num(\'points-dollar\');',`  let pointsDollar = num('points-dollar');
  if(!document.getElementById('points-dollar').dataset.manual && pointsPct===0){pointsDollar=0;document.getElementById('points-dollar').value='0.00';}`);
refi=replace(refi,"  let message=document.getElementById('refi-input-error');",`  const dateEl=document.getElementById('closing-date'),dateValue=getClosingDate(),dateOk=!!dateValue&&Number.isFinite(dateValue.getTime());
  dateEl.setAttribute('aria-invalid',String(!dateOk));if(!dateOk)valid=false;
  let message=document.getElementById('refi-input-error');`);
refi=replace(refi,"Correct the highlighted amount. Enter a nonnegative number, or leave an optional amount blank.","Correct the highlighted amount or date. Enter a nonnegative number, or leave an optional amount blank. A closing date is needed for interest and escrow estimates.");
refi=replace(refi,"window._lastResult=null;}","window._lastResult=null;document.getElementById('bd-content').textContent='Correct the highlighted inputs to see the breakdown.';}");
refi=replace(refi,' * Rule: if closing is on/before the 15th, first payment = next month.\n *       if closing is after the 15th, first payment = two months later.', ' * Illustration assumption: first payment is the first day of the second month after closing.');
save('refinance-calculator',refi);

// A zero PITIA denominator is undefined, not a weak DSCR score.
let dscr=inlineScripts('dscr-calculator')[0];
dscr=replace(dscr,'      var band = bandFor(dscr);',`      var band = pitia>0 ? bandFor(dscr) : {label:'No payment denominator',color:'#607168',tone:'tone-blue',msg:'PITIA is $0, so a rent-to-payment ratio cannot be calculated. Review the loan amount, taxes, insurance, and HOA inputs.'};`);
save('dscr-calculator',dscr);

// Buydown: explicit complete inputs, zero-rate support, valid term and
// floored promotional rates. No hidden substitution of example amounts.
let buy=inlineScripts('rate-buydown-calculator')[0];
buy=replace(buy,'        if (annualRatePct <= 0) return principal / (years * 12);',`        if(![principal,annualRatePct,years].every(Number.isFinite)||principal<0||annualRatePct<0||years<=0)return NaN;
        if (annualRatePct === 0) return principal / (years * 12);`);
buy=replace(buy,'        return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);','        return principal * r / -Math.expm1(-n*Math.log1p(r));');
buy=replace(buy,'          var effectiveRate = noteRate - reduction;','          var effectiveRate = Math.max(0,noteRate - reduction);');
buy=replace(buy,'pmt(inp.loanAmount, inp.noteRate - reductions[yr], inp.termYears)','pmt(inp.loanAmount, Math.max(0,inp.noteRate - reductions[yr]), inp.termYears)');
buy=replace(buy,"          ? (parseInt(document.getElementById('bd-term-custom').value) || 30)","          ? Number(document.getElementById('bd-term-custom').value)");
buy=replace(buy,"parseFloat(String(document.getElementById('bd-loan-input').value).replace(/[$,]/g, ''))  || 400000","Number(String(document.getElementById('bd-loan-input').value).replace(/[$,]/g, ''))");
buy=replace(buy,"parseFloat(document.getElementById('bd-rate-input').value)  || 6.125","Number(document.getElementById('bd-rate-input').value)");
buy=replace(buy,'      function compute() {\n        var inp = getInputs();',`      function validateBuydownInputs(){
        var fields=[['bd-loan-input',0,2000000,true],['bd-rate-input',0,20,false],['bd-tax-input',0,Infinity,false],['bd-ins-input',0,Infinity,false],['bd-hoa',0,Infinity,false],['bd-seller-credit',0,Infinity,false]];
        if(document.getElementById('bd-term').value==='custom')fields.push(['bd-term-custom',1,40,true]);
        var valid=true;fields.forEach(function(f){var el=document.getElementById(f[0]),raw=String(el.value).replace(/[$,]/g,'').trim(),v=Number(raw),ok=/^(?:\\d+\\.?\\d*|\\.\\d+)$/.test(raw)&&Number.isFinite(v)&&v>=f[1]&&v<=f[2]&&(!f[3]||v>0);if(f[0]==='bd-term-custom')ok=ok&&Number.isInteger(v);el.setAttribute('aria-invalid',String(!ok));if(!ok)valid=false;});
        var message=document.getElementById('bd-input-error');if(!message){message=document.createElement('p');message.id='bd-input-error';message.setAttribute('role','status');document.getElementById('bd-loan-input').parentElement.before(message);}
        message.textContent=valid?'Illustration only. Temporary payment rates cannot fall below 0%.':'Correct the highlighted inputs. Enter a positive loan and term, a rate from 0 to 20%, and nonnegative costs. Use 0 when a cost does not apply.';
        document.querySelectorAll('.bd-outputs-panel,.bd-charts-section,.bd-schedule-section').forEach(function(result){result.hidden=!valid;if(valid)result.style.removeProperty('display');else result.style.setProperty('display','none','important');});
        return valid;
      }
      function compute() {
        if(!validateBuydownInputs())return;
        var inp = getInputs();`);
save('rate-buydown-calculator',buy);

// Wrap: cumulative cash flow uses actual capped payments on both loans.
let wrap=inlineScripts('wrap-mortgage-calculator')[0];
wrap=replace(wrap,'    function calcWrap() {\n      var balance',`    function validateWrapInputs(){
      var ids=['w-balance','w-existing-rate','w-existing-payment','w-sale-price','w-down-pct','w-closing-pct','w-wrap-rate','w-term','w-appreciation'],invalid=[];
      ids.forEach(function(id){var el=document.getElementById(id),raw=String(el.value).replace(/[$,]/g,'').trim(),value=Number(raw),ok=/^(?:\\d+\\.?\\d*|\\.\\d+)$/.test(raw)&&Number.isFinite(value)&&value>=0;
        if(id==='w-sale-price'||id==='w-term')ok=ok&&value>0;var min=el.getAttribute('min'),max=el.getAttribute('max');if(min!==null)ok=ok&&value>=Number(min);if(max!==null)ok=ok&&value<=Number(max);if(id==='w-down-pct'||id==='w-closing-pct')ok=ok&&value<=100;if(id==='w-term')ok=ok&&value<=50&&Number.isInteger(value);if(id.indexOf('rate')>=0)ok=ok&&value<=20;
        el.setAttribute('aria-invalid',String(!ok));if(!ok)invalid.push(id);
      });
      var message=document.getElementById('wrap-input-error');if(!message){message=document.createElement('p');message.id='wrap-input-error';message.setAttribute('role','status');document.getElementById('w-sale-price').parentElement.before(message);}
      message.textContent=invalid.length?'Correct the highlighted numbers. Enter a positive sale price and term; rates and other amounts cannot be negative.':'';
      if(invalid.length){document.querySelectorAll('[id^="w-out-"],#w-seller-total').forEach(function(el){el.textContent='—';});document.getElementById('w-amort-tbody').textContent='';document.getElementById('print-scenario').textContent='Correct the highlighted inputs before using this illustration.';return false;}return true;
    }
    function calcWrap() {
      if(!validateWrapInputs())return;
      var balance`);
wrap=replace(wrap,'      var cumeSpread   = monthlySpread * spreadMonths;',`      spreadMonths=Math.min(spreadMonths,wrapTerm*12);
      var wrapCash=Suite.amortize(wrapLoan,wrapRate,wrapMonthly,spreadMonths);
      var existingCash=Suite.amortize(balance,existingRate,existingPmt,spreadMonths);
      var cumeSpread=wrapCash.totalPaid-existingCash.totalPaid;
      var notice=document.getElementById('wrap-input-error');if(existingPmt<balance*existingRate/1200)notice.textContent='The existing payment is below its first month’s interest. This illustration capitalizes unpaid interest, so the existing balance grows.';`);
wrap=replace(wrap,"      var digits = String(value).replace(/[^0-9]/g, '');\n      return digits ? Number(digits).toLocaleString('en-US') : '';",`      var raw=String(value).replace(/[$,]/g,'').trim();
      if(!/^(?:\\d+\\.?\\d*|\\.\\d+)$/.test(raw))return raw;
      var parts=raw.split('.'),integer=parts[0]||'0';
      return Number(integer).toLocaleString('en-US')+(parts.length>1?'.'+parts[1]:'');`);
wrap=replace(wrap,'var balloonMo      = selectedBalloon * 12;', 'var balloonMo      = Math.min(selectedBalloon * 12,wrapTerm * 12);');
wrap=replace(wrap,"Math.pow(1 + appreciation / 100, selectedBalloon)","Math.pow(1 + appreciation / 100, balloonMo / 12)");
wrap=replace(wrap,"set('w-seller-total', Suite.formatCurrency(cashAtClosing + cumeSpread));",`set('w-seller-total', Suite.formatCurrency(cashAtClosing + cumeSpread - existAtTerm));
        set('w-seller-total-note','* Estimated net over the '+wrapTerm+'-year wrap term: cash at closing + cumulative cash flow − any existing loan balance still owed at term end ('+Suite.formatCurrency(existAtTerm)+').');`);
wrap=replace(wrap,'var displayYears = selectedBalloon !== null ? selectedBalloon : wrapTerm;','var displayYears = Math.min(selectedBalloon !== null ? selectedBalloon : wrapTerm,wrapTerm);');
wrap=replace(wrap,'      var cume         = 0;',`      var cume         = 0;\n      var priorWrapBalance=wrapLoan;\n      var headings=document.querySelectorAll('#w-amort-table th');if(headings[3])headings[3].textContent='Average Monthly Spread in Year';`);
wrap=replace(wrap,'        cume += spread * 12;',`        var wrapYear=Suite.amortize(priorWrapBalance,wrapRate,wrapMonthly,12);
        priorWrapBalance=wrapYear.balance;
        var annualSpread=wrapYear.totalPaid-am.totalPaid;
        spread=annualSpread/12;cume+=annualSpread;`);
save('wrap-mortgage-calculator',wrap);
fs.writeFileSync(packagePath('components','calculator-fixes','patches.json'),JSON.stringify({assets:[{path:'/calculator-suite.js',replacementFile:'components/calculator-fixes/calculator-suite.js'}],inlineScripts:patches},null,2));
console.log(JSON.stringify({assets:['calculator-suite.js'],inlineOverrides:patches.map(x=>x.route)},null,2));
