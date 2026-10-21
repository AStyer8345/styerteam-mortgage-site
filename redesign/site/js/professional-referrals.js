(function(){
  'use strict';
  function track(event,data){window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:event},data||{}));}
  function openAssistant(event){
    var link=event.target.closest('[data-open-assistant]');
    if(!link)return;
    event.preventDefault();
    var launcher=document.querySelector('.ma-launcher');
    if(launcher){launcher.click();track('professional_assistant_opened',{assistant_mode:document.body.dataset.assistantMode||'professional'});return;}
    window.setTimeout(function(){var retry=document.querySelector('.ma-launcher');if(retry)retry.click();},500);
  }
  async function submit(event){
    var form=event.target.closest('.professional-referral-form');
    if(!form)return;
    event.preventDefault();
    var button=form.querySelector('[type="submit"]');
    var status=form.querySelector('.pro-form-status');
    if(form.dataset.sending==='true')return;
    var phone=form.elements.phone;
    if(phone){phone.setCustomValidity(form.elements.preferred_follow_up.value!=='Email'&&!phone.value.trim()?'Add your phone number or choose email.':'');if(!phone.reportValidity())return;}
    form.dataset.sending='true';
    var data=new FormData(form);
    if(button){button.disabled=true;button.dataset.label=button.textContent;button.textContent='Sending…';}
    if(status)status.textContent='';
    data.set('page_url',window.location.origin+window.location.pathname);
    try{var ref=new URL(document.referrer);data.set('referrer',ref.origin+ref.pathname);}catch(ignore){data.set('referrer','');}
    try{
      var encoded=new URLSearchParams(data).toString();
      var payload=Object.fromEntries(data.entries());
      var results=await Promise.allSettled([
        window.StyerFetchWithTimeout('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:encoded},20000),
        window.StyerFetchWithTimeout('/.netlify/functions/lead-intake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)},20000).then(async function(response){return response.ok?response.json():null;})
      ]);
      var accepted=(results[0].status==='fulfilled'&&results[0].value.ok)||(results[1].status==='fulfilled'&&results[1].value&&results[1].value.captured===true);
      if(!accepted)throw new Error('capture_failed');
      try{window.sessionStorage.setItem('styer:professional-referral',JSON.stringify({propertyState:String(data.get('property_state')||''),partnerRole:String(data.get('partner_role')||''),includeReferrer:data.get('include_referrer_in_follow_up')==='yes'}));}catch(ignore){}
      track('accepted_submit',{form_name:form.getAttribute('name'),inquiry_id:data.get('inquiry_id')});
      track('generate_lead',{lead_type:'professional_referral',form_name:form.getAttribute('name'),inquiry_id:data.get('inquiry_id')});
      window.location.href='/thank-you.html?type=professional-referral';
    }catch(error){
      form.dataset.sending='false';
      if(status)status.textContent='Your request did not send. Please try again or call (512) 956-6010.';
      if(button){button.disabled=false;button.textContent=button.dataset.label||'Send Client Scenario';}
    }
  }
  document.addEventListener('click',openAssistant);
  document.addEventListener('submit',submit);
  document.addEventListener('input',function(event){if(event.target.closest('.professional-referral-form')&&event.target.name==='phone')event.target.setCustomValidity('');});
  document.addEventListener('change',function(event){var form=event.target.closest('.professional-referral-form');if(form&&event.target.name==='preferred_follow_up'&&form.elements.phone)form.elements.phone.setCustomValidity('');});
  document.addEventListener('click',function(event){var link=event.target.closest('a[href*="calendly.com"]');if(link)track('partner_call_click',{source_page:window.location.pathname});});
})();
