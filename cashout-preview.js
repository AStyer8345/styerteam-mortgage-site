/* Same-page cash-out context uses the established inquiry narrative contract.
   Calculation context stays out of URLs and analytics. Existing capture owns submission. */
(function(){
  'use strict';
  const core=window.CashOutCalculator, calc=document.getElementById('cashout-inputs');
  if(!core||!calc)return;
  const key='styer:cashout-review:v1', inquiry=document.getElementById('form-cashout-review');
  const byId=id=>document.getElementById(id), money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const labels={value:'Estimated property value',payoff:'All lien payoffs',rent:'Estimated monthly rent',taxes:'Annual taxes',insurance:'Annual insurance',hoa:'Monthly HOA / assessments',rate:'Illustrative rate (%)',ltv:'Selected LTV assumption (%)',feePct:'Charges (% of new loan)',fixedCosts:'Other costs / prepaids',penalty:'Additional payoff penalty',currentPI:'Current monthly payments on replaced liens',desiredCash:'Desired net cash',term:'Term (years)',mode:'Scenario approach'};
  const defaults=Object.fromEntries(core.inputKeys.map(k=>[k,calc.elements[k].value]));
  let attached=false, latest=null, timer;
  const read=()=>Object.fromEntries(core.inputKeys.map(k=>[k,calc.elements[k].value]));
  function storageWrite(snapshot){try{if(snapshot)sessionStorage.setItem(key,JSON.stringify(snapshot));else sessionStorage.removeItem(key);}catch(_){byId('cashout-storage-note').hidden=false;}}
  function context(){
    // makePayload prioritizes situation over message. Include the visitor's notes explicitly.
    const notes=inquiry.elements.message.value.trim();
    inquiry.elements.situation.value='Texas rental cash-out review'+(attached&&latest?'\nCash-out estimate snapshot (illustration only): '+JSON.stringify(latest):'')+(notes?'\nBorrower notes: '+notes:'');
  }
  function review(){
    const panel=byId('cashout-carried'), list=byId('cashout-assumptions');
    panel.hidden=!attached||!latest;list.replaceChildren();
    if(attached&&latest){
      for(const k of core.inputKeys){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=labels[k];dd.textContent=k==='mode'?(latest.inputs.mode==='cash'?'Target net cash':'Selected LTV'):k==='desiredCash'&&latest.inputs.mode!=='cash'?latest.inputs[k]+' (inactive in selected-LTV mode)':['rate','ltv','feePct'].includes(k)?latest.inputs[k]+'%':k==='term'?latest.inputs[k]+' years':money(Number(latest.inputs[k]));list.append(dt,dd);}
      byId('cashout-carried-output').textContent=(latest.outputs.netCash<0?'Estimated cash needed: ':'Estimated cash received: ')+money(Math.abs(latest.outputs.netCash))+' · Loan '+money(latest.outputs.loan)+' · PITIA '+money(latest.outputs.pitia)+'/mo · LTV '+latest.outputs.actualLtv.toFixed(2)+'% · '+(latest.outputs.dscr===null?'DSCR unavailable':latest.outputs.dscr.toFixed(2)+'× DSCR')+'. '+latest.warnings.join('. ');
    }
    context();
  }
  function update(){
    clearTimeout(timer);
    const raw=read(), result=core.calculate(raw), errors=byId('cashout-errors');
    calc.elements.desiredCash.disabled=raw.mode!=='cash';
    byId('cashout-desired-field').hidden=raw.mode!=='cash';
    for(const k of core.inputKeys){const field=calc.elements[k],bad=!result.valid&&result.errors.includes(k);field.setAttribute('aria-invalid',String(bad));byId('error-'+k)?.setAttribute('hidden','');if(bad)byId('error-'+k)?.removeAttribute('hidden');}
    errors.hidden=result.valid;errors.textContent=result.valid?'':'Complete the highlighted fields with numbers in the shown ranges. Enter 0 when an expense does not apply.';
    byId('cashout-mini').hidden=!result.valid;byId('cashout-results-values').hidden=!result.valid;byId('cashout-empty').hidden=result.valid;
    byId('cashout-carry').disabled=!result.valid;
    latest=core.snapshot(raw);
    if(!result.valid){if(attached)storageWrite(null);review();return;}
    const r=result;
    const vals={cash:money(Math.abs(r.netCash)),loan:money(r.loan),payoff:money(r.payoff),costs:money(r.totalCosts),pi:money(r.pi),taxes:money(r.taxes/12),insurance:money(r.insurance/12),hoa:money(r.hoa),pitia:money(r.pitia),dscr:r.dscr===null?'Unavailable':r.dscr.toFixed(2)+'×',current:money(r.currentPitia),change:r.loan===0?'No new loan modeled':(r.paymentChange>=0?'+':'−')+money(Math.abs(r.paymentChange)),remaining:money(r.rentRemaining),ltv:r.actualLtv.toFixed(2)+'%'};
    for(const [name,val]of Object.entries(vals))byId('cashout-'+name).textContent=val;
    document.querySelectorAll('[data-co-value]').forEach(e=>e.textContent=vals[e.dataset.coValue]);
    byId('cashout-cash-label').textContent=r.netCash<0?'Estimated cash needed to close':'Estimated cash received';
    document.querySelector('[data-co-label]').textContent=byId('cashout-cash-label').textContent;
    const miniWarning=byId('cashout-mini-warning');miniWarning.hidden=!latest.warnings.length;miniWarning.textContent=latest.warnings.join('. ');
    const warning=byId('cashout-warning');warning.hidden=!latest.warnings.length;warning.textContent=latest.warnings.join('. ')+(r.exceedsLtv?'. This is a mathematical target, not an available loan amount.':'');
    if(attached)storageWrite(latest);review();
    clearTimeout(timer);timer=setTimeout(()=>{byId('cashout-live').textContent=(r.netCash<0?'Cash needed ':'Cash received ')+vals.cash+'. New monthly payment '+vals.pitia+'. Estimated coverage '+vals.dscr+'. '+latest.warnings.join('. ');},500);
  }
  function focus(id){const target=byId(id);target.focus({preventScroll:true});target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
  calc.addEventListener('input',update);calc.addEventListener('change',update);calc.addEventListener('submit',e=>e.preventDefault());
  inquiry.elements.message.addEventListener('input',context);
  byId('cashout-carry').addEventListener('click',()=>{update();if(!latest)return;attached=true;storageWrite(latest);review();focus('review');});
  byId('cashout-edit').addEventListener('click',()=>focus('calculator'));
  byId('cashout-remove').addEventListener('click',()=>{attached=false;storageWrite(null);review();byId('cashout-review-status').textContent='Estimate removed. Your inquiry can continue without these numbers.';});
  byId('cashout-reset').addEventListener('click',()=>{for(const k of core.inputKeys)calc.elements[k].value=defaults[k];attached=false;storageWrite(null);update();byId('cashout-live').textContent='Example restored. No estimate is attached to your inquiry.';});
  try{const saved=core.restore(JSON.parse(sessionStorage.getItem(key)||'null'));if(saved){for(const k of core.inputKeys)calc.elements[k].value=saved.inputs[k];attached=true;}else sessionStorage.removeItem(key);}catch(_){}
  update();
})();
