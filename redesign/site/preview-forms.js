(() => {
  'use strict';
  const form=document.querySelector('#preview-contact'), dialog=document.querySelector('#contact');
  const status=form.querySelector('.form-status'), submit=form.querySelector('[type=submit]');
  const control=document.querySelector('#capture-simulation'), receipt=document.querySelector('#test-receipt');
  let busy=false, completed=false, inquiryId='', attribution={}, ctaLabel='', started=false;
  const clickParams=new URLSearchParams(location.search);
  let firstClick=clickParams.get('gclid')||clickParams.get('gbraid')||clickParams.get('wbraid')||clickParams.get('msclkid')||'';
  try{firstClick=sessionStorage.getItem('styer:preview:click-id')||firstClick;if(firstClick)sessionStorage.setItem('styer:preview:click-id',firstClick);}catch(_){}
  const events=[]; // Preview-only event buffer. Never forwarded to dataLayer or a tag manager.
  const clean=()=>location.origin+location.pathname;
  function event(name,intent='general') {
    const detail={event:name,form_name:'contact',intent,page_path:location.pathname,test_mode:true};
    if(inquiryId)detail.inquiry_id=inquiryId;
    events.push(detail);
    receipt.textContent='Preview tracking: '+events.map(e=>e.event).join(' → ');
  }
  document.addEventListener('styer:attribution-ready',()=>{
    for(const field of form.querySelectorAll('input[type=hidden]'))attribution[field.name]=field.value;
  });
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-contact],#stage-contact');
    if(!b)return;ctaLabel=b.textContent.trim().replace(/\s+/g,' ');
    started=false;event('qualification_funnel_view');
  });
  form.addEventListener('focusin',()=>{if(!started){started=true;event('form_start');}});
  form.addEventListener('input',e=>e.target.setCustomValidity?.(''));
  window.resetPreviewForm=()=>{busy=false;completed=false;inquiryId='';status.textContent='';submit.disabled=false;submit.textContent='Test inquiry →';};
  form.querySelector('fieldset').disabled=false;
  form.addEventListener('submit',async e=>{
    e.preventDefault();if(busy||completed)return;
    const name=form.elements.name,phone=form.elements.phone;
    name.setCustomValidity(name.value.trim()?'':'Please enter your name.');
    const digits=phone.value.replace(/\D/g,'');phone.setCustomValidity(!phone.value.trim()||(digits.length>=10&&digits.length<=15)?'':'Enter a phone number with area code.');
    if(!form.reportValidity())return;
    if(form.elements['bot-field'].value){status.textContent='Preview: spam check blocked this submission.';return;}
    busy=true;submit.disabled=true;submit.textContent='Testing…';status.textContent='Testing local capture…';
    inquiryId ||= 'preview-'+crypto.randomUUID();
    const data=new FormData(form);
    for(const [key,value] of Object.entries(attribution))if(/^(utm_|first_touch_|entry_referrer|referrer)/.test(key))data.set(key,value);
    const goal=data.get('goal');
    const mapping={'Buy a home':['Purchase','purchase'],'Refinance or access equity':['Refinance','refinance'],'Finance an investment property':['Invest','investment']};
    const [loanGoal,intent]=mapping[goal]||['','general'];
    data.set('loan_goal',loanGoal);data.set('inquiry_id',inquiryId);data.set('test_mode','true');
    data.set('page_url',clean());data.set('cta_source_page',clean());data.set('cta_label',ctaLabel);
    data.set('source','preview_'+location.pathname.split('/').pop().replace('.html',''));
    data.set('situation',goal==='Talk with Adam'||goal==='Talk with Tiffany'?'Requested team contact: '+goal.replace('Talk with ',''):'');
    if(data.get('message'))data.set('situation',[data.get('situation'),data.get('message').trim()].filter(Boolean).join('\n'));
    const params=new URLSearchParams(location.search);data.set('click_id',params.get('gclid')||params.get('gbraid')||params.get('wbraid')||params.get('msclkid')||firstClick);
    const payload=PreviewLeadContract.makePayload(data,[],intent,clean());
    data.set('situation',payload.situation);data.set('intent',intent);
    const attempts=[];const simulation=control.value;
    // Hardwired no-network transport. There is deliberately no live-mode switch.
    const request=async(path,options)=>{
      if(!['/','/.netlify/functions/lead-intake'].includes(path))throw Error('Unexpected destination');
      const decoded=path==='/'?Object.fromEntries(new URLSearchParams(options.body)):JSON.parse(options.body);
      if(decoded.test_mode!=='true'||decoded.inquiry_id!==inquiryId)throw Error('Test contract mismatch');
      attempts.push(path==='/'?'Netlify backup':'lead intake');
      const ok=simulation==='success'||(simulation==='backup'&&path==='/')||(simulation==='primary'&&path!=='/');
      return {ok,redirected:false,json:async()=>({captured:ok,preview:true})};
    };
    try{
      const result=await PreviewLeadContract.capture(payload,data,request);
      completed=true;event('accepted_submit',intent);event('generate_lead',intent);
      receipt.textContent+=' · '+attempts.join(' + ')+' simulated; '+(result.primary?'primary':'backup')+' accepted. No network requests. First-touch source: '+(payload.first_touch_utm_source||payload.first_touch_source||'(direct)')+'. Intent: '+intent+'.';
      form.reset();form.hidden=true;dialog.querySelector('.confirmation').hidden=false;
      dialog.querySelector('.close-action').focus();
    }catch(_){status.textContent='Test capture failed. Your entries are still here. Choose a successful test result and retry.';status.focus();submit.disabled=false;submit.textContent='Retry test →';}
    finally{busy=false;}
  });
})();
