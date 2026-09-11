(function(){
 'use strict';
 var dscr=!!document.getElementById('dscr-calculator');var kind=dscr?'dscr':'refinance';
 var key='styer:calculator-review';
 var ids=dscr?{price:'dscr-price',down:'dscr-down',rate:'dscr-rate',years:'dscr-term',tax:'dscr-tax',ins:'dscr-ins',hoa:'dscr-hoa',rent:'dscr-rent'}:{balance:'balance',currentRate:'current-rate',currentYears:'current-term',newRate:'new-rate',newYears:'new-term',costs:'costs'};
 var actions=document.querySelector('[data-calculator-actions]');if(!actions)return;
 var status=document.createElement('p');status.className='experience-calculator-error';status.setAttribute('role','status');actions.after(status);
 function snapshot(){var inputs={};Object.keys(ids).forEach(function(k){inputs[k]=Number(document.getElementById(ids[k]).value.replace(/[$,]/g,''));});if(dscr)inputs.downMode=document.getElementById('dscr-down-pct-btn').classList.contains('is-active')?'pct':'dollar';return window.StyerAnalysis.normalize({kind:kind,at:Date.now(),inputs:inputs});}
 function restore(a){if(a.kind!==kind)return;Object.keys(ids).forEach(function(k){var input=document.getElementById(ids[k]);input.value=a.inputs[k];input.dispatchEvent(new Event('input',{bubbles:true}));});if(dscr){document.getElementById(a.inputs.downMode==='pct'?'dscr-down-pct-btn':'dscr-down-dollar-btn').click();document.getElementById('dscr-down').value=a.inputs.down;document.getElementById('dscr-down').dispatchEvent(new Event('input',{bubbles:true}));}document.getElementById(dscr?'dscr-term':'new-term').dispatchEvent(new Event('change',{bubbles:true}));}
 var params=new URLSearchParams(location.search);
 if(params.get('restore')==='review'){try{var saved=JSON.parse(sessionStorage.getItem(key)||'null');if(saved)restore(window.StyerAnalysis.normalize(saved));}catch(_){status.textContent='The previous numbers could not be restored. You can still enter new estimates.';}}
 function transfer(destination,storageKey){try{var a=snapshot();sessionStorage.setItem(storageKey,JSON.stringify(a));location.href=destination;}catch(error){status.textContent=error instanceof DOMException?'Your browser cannot carry these numbers to the next page. Allow site storage, or contact Adam with your estimates.':error.message;}}
 document.querySelectorAll('[data-review-calculator]').forEach(function(link){link.addEventListener('click',function(e){e.preventDefault();transfer(dscr?'/investor-loans.html?goal=Invest&context=calculator':'/refinance-quote.html?goal=Refinance&context=calculator',key);});});
 var save=document.querySelector('[data-save-analysis]');if(save)save.addEventListener('click',function(){transfer('/saved-analysis.html','styer:analysis-to-save');});
})();
