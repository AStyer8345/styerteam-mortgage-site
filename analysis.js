(function(root){
 'use strict';
 var dscrFields=[['price','Purchase price','$'],['down','Down payment','down'],['rate','Interest rate','%'],['years','Loan term','years'],['tax','Annual property taxes','$'],['ins','Annual insurance','$'],['hoa','Monthly HOA','$'],['rent','Monthly gross rent','$']];
 var refiFields=[['balance','Current balance','$'],['currentRate','Current rate','%'],['currentYears','Current term','years'],['newRate','New rate','%'],['newYears','New term','years'],['costs','Closing costs paid in cash','$']];
 function payment(loan,rate,years){var n=years*12;if(loan<=0||n<=0)return 0;if(rate===0)return loan/n;var r=rate/1200,p=Math.pow(1+r,n);return loan*r*p/(p-1);}
 function calculate(inputs,kind){
  if(kind==='dscr'){var loan=inputs.price-(inputs.downMode==='pct'?inputs.price*inputs.down/100:inputs.down);var pi=payment(loan,inputs.rate,inputs.years);var pitia=pi+inputs.tax/12+inputs.ins/12+inputs.hoa;return {loan:loan,pi:pi,pitia:pitia,dscr:pitia>0?inputs.rent/pitia:0,remaining:inputs.rent-pitia};}
  var current=payment(inputs.balance,inputs.currentRate,inputs.currentYears),proposed=payment(inputs.balance,inputs.newRate,inputs.newYears),savings=current-proposed;return {current:current,proposed:proposed,savings:savings,months:savings>0?Math.ceil(inputs.costs/savings):null};
 }
 function normalize(value){
  if(!value||!['dscr','refinance'].includes(value.kind)||!value.inputs)throw new Error('Analysis format is not supported.');
  var fields=value.kind==='dscr'?dscrFields:refiFields,inputs={};
  fields.forEach(function(f){var n=value.inputs[f[0]];if(typeof n!=='number'||!Number.isFinite(n)||n<0||n>1e9)throw new Error('Check the calculator estimates before saving.');inputs[f[0]]=n;});
  if(value.kind==='dscr'){
   inputs.downMode=value.inputs.downMode;if(!['pct','dollar'].includes(inputs.downMode)||inputs.price<=0||inputs.years<=0||inputs.years>50||inputs.rate>20||inputs.down>=(inputs.downMode==='pct'?100:inputs.price))throw new Error('Check the price, down payment, rate and term.');
  }else if(inputs.balance<=0||inputs.currentYears<=0||inputs.newYears<=0||inputs.currentYears>50||inputs.newYears>50||inputs.currentRate>20||inputs.newRate>20)throw new Error('Check the balance, rates and terms.');
  return {version:1,kind:value.kind,at:Number.isFinite(value.at)?value.at:Date.now(),inputs:inputs,results:calculate(inputs,value.kind)};
 }
 function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);}
 function rows(value){var a=normalize(value);var data=(a.kind==='dscr'?dscrFields:refiFields).map(function(f){var unit=f[2]==='down'?(a.inputs.downMode==='pct'?'%':'$'):f[2];return [f[1],unit==='$'?money(a.inputs[f[0]]):a.inputs[f[0]]+' '+unit];});
  if(a.kind==='dscr')data.push(['Loan amount',money(a.results.loan)],['Monthly principal & interest',money(a.results.pi)],['Monthly PITIA',money(a.results.pitia)],['Estimated DSCR',a.results.dscr.toFixed(2)],['Rent remaining after PITIA',money(a.results.remaining)]);
  else data.push(['Current monthly P&I',money(a.results.current)],['Proposed monthly P&I',money(a.results.proposed)],['Monthly payment difference',money(a.results.savings)],['Simple break-even',a.results.months===null?'No payment-based break-even':a.results.months+' months']);
  return data;
 }
 function caveat(kind){return kind==='dscr'?'PITIA includes principal, interest, property taxes, insurance and HOA. Rent remaining excludes vacancy, repairs, management, utilities, capital expenses and other operating costs. This is not net operating cash flow. Estimates only; no rate quote or loan approval.':'Compares principal and interest only. Assumes closing costs paid in cash. Excludes taxes, insurance and changes to mortgage insurance. A new term restarts amortization; lower payments can mean more total interest. Estimates only; no rate quote or loan approval.';}
 function summary(value){var a=normalize(value);return (a.kind==='dscr'?'DSCR property analysis':'Refinance comparison')+' · '+new Date(a.at).toISOString()+'\n'+rows(a).map(function(r){return r[0]+': '+r[1];}).join('\n')+'\n'+caveat(a.kind);}
 function render(el,value){var a=normalize(value);el.replaceChildren();var title=root.document.createElement('h3');title.textContent=a.kind==='dscr'?'Your property analysis':'Your refinance comparison';el.appendChild(title);var dl=root.document.createElement('dl');rows(a).forEach(function(row){var dt=root.document.createElement('dt'),dd=root.document.createElement('dd');dt.textContent=row[0];dd.textContent=row[1];dl.append(dt,dd);});el.appendChild(dl);var note=root.document.createElement('p');note.textContent=caveat(a.kind);el.appendChild(note);}
 var api={normalize:normalize,calculate:calculate,rows:rows,summary:summary,render:render,fields:dscrFields,caveat:caveat};root.StyerAnalysis=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
