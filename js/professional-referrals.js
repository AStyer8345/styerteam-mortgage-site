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
    var data=new FormData(form);
    if(button){button.disabled=true;button.dataset.label=button.textContent;button.textContent='Sending…';}
    if(status)status.textContent='';
    data.set('page_url',window.location.href.split('#')[0]);
    data.set('referrer',document.referrer||'');
    try{
      var encoded=new URLSearchParams(data).toString();
      var payload=Object.fromEntries(data.entries());
      var results=await Promise.allSettled([
        fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:encoded}),
        fetch('/.netlify/functions/lead-intake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      ]);
      var accepted=results.some(function(result){return result.status==='fulfilled'&&result.value.ok;});
      if(!accepted)throw new Error('capture_failed');
      try{window.sessionStorage.setItem('styer:professional-referral',JSON.stringify({propertyState:String(data.get('property_state')||''),partnerRole:String(data.get('partner_role')||''),includeReferrer:data.get('include_referrer_in_follow_up')==='yes'}));}catch(ignore){}
      track('generate_lead',{lead_type:'professional_referral',form_name:form.getAttribute('name'),audience_type:data.get('audience_type'),scenario_category:data.get('scenario_category'),property_state:data.get('property_state')});
      window.location.href='/thank-you.html?type=professional-referral';
    }catch(error){
      if(status)status.textContent='Your request did not send. Please try again or call (512) 956-6010.';
      if(button){button.disabled=false;button.textContent=button.dataset.label||'Send Client Scenario';}
    }
  }
  document.addEventListener('click',openAssistant);
  document.addEventListener('submit',submit);
  document.addEventListener('click',function(event){var link=event.target.closest('a[href*="calendly.com"]');if(link)track('partner_call_click',{source_page:window.location.pathname});});
})();
