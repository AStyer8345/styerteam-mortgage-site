(function(root){
  'use strict';
  const ranges={value:[10000,100000000],payoff:[0,100000000],rent:[0,1000000],taxes:[0,1000000],insurance:[0,1000000],hoa:[0,1000000],rate:[0,25],ltv:[1,90],feePct:[0,20],fixedCosts:[0,10000000],penalty:[0,10000000],currentPI:[0,1000000],desiredCash:[0,10000000]};
  function calculate(input){
    const errors=[]; const n={};
    for(const [k,[min,max]] of Object.entries(ranges)){
      if(k==='desiredCash'&&input.mode!=='cash'){n[k]=0;continue;}
      const raw=input[k]; const val=(typeof raw==='string'&&raw.trim()==='')||raw===null||raw===undefined||typeof raw==='boolean'?NaN:Number(raw);
      if(!Number.isFinite(val)||val<min||val>max){errors.push(k);}n[k]=val;
    }
    const term=Number(input.term);if(![15,20,30].includes(term))errors.push('term');
    if(!['ltv','cash'].includes(input.mode))errors.push('mode');
    if(errors.length)return {valid:false,errors};
    const fees=n.feePct/100;const loan=input.mode==='cash'?(n.payoff+n.fixedCosts+n.penalty+n.desiredCash)/(1-fees):n.value*n.ltv/100;
    const closingCharges=loan*fees;const totalCosts=closingCharges+n.fixedCosts+n.penalty;const netCash=loan-n.payoff-totalCosts;
    const months=term*12;const r=n.rate/1200;const pi=r===0?loan/months:loan*r/(-Math.expm1(-months*Math.log1p(r)));
    const otherMonthly=n.taxes/12+n.insurance/12+n.hoa;const pitia=pi+otherMonthly;const currentPitia=n.currentPI+otherMonthly;
    return {valid:true,...n,term,mode:input.mode,loan,closingCharges,totalCosts,netCash,pi,pitia,currentPitia,paymentChange:pitia-currentPitia,dscr:pitia>0?n.rent/pitia:null,rentRemaining:n.rent-pitia,actualLtv:loan/n.value*100,exceedsLtv:loan>n.value*n.ltv/100+0.005};
  }
  const inputKeys=[...Object.keys(ranges),'term','mode'];
  function snapshot(input,at=Date.now()){
    const result=calculate(input);if(!result.valid)return null;
    const inputs=Object.fromEntries(inputKeys.map(k=>[k,input[k]??'']));
    return {version:1,kind:'dscr-cash-out',at,inputs,outputs:result,warnings:[...(result.exceedsLtv?['Target exceeds selected LTV assumption']:[]),...(result.netCash<0?['Cash needed to close']:[]),...(result.loan===0?['No new loan modeled']:[])]};
  }
  function restore(value,now=Date.now()){
    if(!value||value.version!==1||value.kind!=='dscr-cash-out'||!Number.isFinite(value.at)||value.at>now||now-value.at>7200000||!value.inputs)return null;
    return snapshot(value.inputs,value.at); // Recompute outputs; never trust a stored result.
  }
  root.CashOutCalculator={calculate,ranges,snapshot,restore,inputKeys};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.CashOutCalculator;
})(typeof window!=='undefined'?window:globalThis);
