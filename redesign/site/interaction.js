/* Shared interactions. No third-party scripts, analytics, or persistent contact data.
 * Optional production adapter: window.StyerInquiryTransport = {
 *   mode: 'live', submit: async (payload, {signal}) => ({accepted:true,inquiryId:'…'})
 * };
 * Adapter must preserve server-side intake validation/consent and return accepted
 * only after durable capture. Preview CSP intentionally forbids network capture.
 * QA can inject the same interface with mode:'preview'; no test controls ship.
 */
(() => {
  'use strict';
  const contact=document.querySelector('#contact');
  const info=document.querySelector('#info');
  const form=contact?.querySelector('[data-inquiry-form]');
  const openers=new WeakMap();
  const menu=document.querySelector('.mobile-menu');
  const nav=document.querySelector('#nav');
  let pending=null,requestId=null;
  const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const syncModalClass=()=>document.body.classList.toggle('modal-open',!!document.querySelector('dialog[open]'));
  const closeMenu=(restore=false)=>{if(!menu||!nav)return;menu.setAttribute('aria-expanded','false');nav.classList.remove('open');if(restore)menu.focus();};
  function resetContact(){
    pending?.abort();pending=null;requestId=null;
    if(!form)return;
    form.reset();form.removeAttribute('aria-busy');
    form.querySelector('fieldset').disabled=false;
    form.querySelector('[data-inquiry-submit]').disabled=false;
    form.querySelector('[data-form-status]').textContent='';
    form.querySelector('[data-form-error]').textContent='';
    contact.querySelector('[data-contact-entry]').hidden=false;
    contact.querySelector('[data-contact-confirmation]').hidden=true;
  }
  function openDialog(dialog,opener=document.activeElement){
    if(!dialog)return;
    openers.set(dialog,opener);dialog.showModal();syncModalClass();
    const initial=dialog.querySelector('h2[tabindex="-1"],h2');
    if(initial){initial.tabIndex=-1;initial.focus({preventScroll:true});}
  }
  function closeDialog(dialog){if(dialog?.open)dialog.close();}
  function start(goal,opener=document.activeElement){
    if(!contact||!form)return;
    resetContact();
    const field=form.elements.namedItem('goal');
    field.value=[...field.options].some(x=>x.value===goal)?goal:'Review my scenario';
    const live=window.StyerInquiryTransport?.mode==='live';
    contact.querySelector('#contact-preview-note').textContent=live?'This is a request to discuss your situation. It is not a loan application or a credit authorization.':'Preview only. Use sample details. Nothing is sent or saved.';
    form.querySelector('[data-inquiry-submit]').textContent=live?'Send my scenario review →':'Preview my scenario review →';
    openDialog(contact,opener);
  }
  function showInfo(eyebrow,title,body,opener,withPurchase=false){
    if(!info)return;
    const content=info.querySelector('#info-content');content.replaceChildren();
    const kicker=document.createElement('p');kicker.className='eyebrow';kicker.textContent=eyebrow;
    const heading=document.createElement('h2');heading.id='info-title';heading.tabIndex=-1;heading.textContent=title;
    const paragraph=document.createElement('p');paragraph.textContent=body;
    content.append(kicker,heading,paragraph);
    if(withPurchase){const button=document.createElement('button');button.type='button';button.className='button green';button.textContent='Talk about my purchase →';button.addEventListener('click',()=>{const original=openers.get(info);closeDialog(info);start('Buy a home',original);});content.append(button);}
    openDialog(info,opener);
  }
  const stages={
    'Just Exploring':['Start with a comfortable payment.','Talk through your budget, available funds, and how you earn income. I’ll explain what to review before you start shopping.'],
    'Ready to Buy':['Shop with a financing plan.','We’ll compare your purchase goals with the documentation and lender review needed for preapproval.'],
    'Found a Home':['Let’s work through the details.','We’ll review the property, offer timeline, available funds, and financing approach.']
  };
  const topics={
    'Refinance & Equity':'Start with what you want to change: the payment, loan term, or access to equity. We’ll compare costs and the time needed to recover them.',
    'Invest':'We’ll review the property’s rent, expenses, financing costs, and your plans before comparing loan options.',
    'About the Team':'Adam handles loan strategy and lender comparison. Tiffany manages documents, file execution, and client communication.',
    'Resources':'Use the resource hub for complete loan guides, calculators, and borrower scenarios.'
  };
  document.addEventListener('click',event=>{
    const trigger=event.target.closest('button,a');if(!trigger)return;
    if(trigger.matches('[data-contact]')){event.preventDefault();start(trigger.dataset.contact,trigger);}
    if(trigger.matches('.close,.close-action'))closeDialog(trigger.closest('dialog'));
    if(trigger===menu&&nav){const expanded=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(expanded));nav.classList.toggle('open',expanded);}
    if(trigger.matches('[data-stage]')&&stages[trigger.dataset.stage]){const [title,body]=stages[trigger.dataset.stage];showInfo(trigger.dataset.stage,title,body,trigger,true);}
    if(trigger.matches('[data-topic]'))showInfo('YOUR NEXT STEP',trigger.dataset.topic,topics[trigger.dataset.topic]||'Tell us what you want to understand, and we’ll start there.',trigger);
    if(trigger.matches('[data-notes]'))showInfo('DESIGN PREVIEW','Review this preview.','The scenario form demonstrates the flow without sending or saving contact details. Guides, calculators, and scenarios remain available at their established addresses.',trigger);
  });
  for(const dialog of [contact,info].filter(Boolean)){
    dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog(dialog);});
    dialog.addEventListener('close',()=>{if(dialog===contact)resetContact();syncModalClass();const opener=openers.get(dialog);if(opener?.isConnected&&!document.querySelector('dialog[open]'))opener.focus({preventScroll:true});});
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);});
  }
  nav?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('open')&&!document.querySelector('dialog[open]'))closeMenu(true);});
  const desktop=window.matchMedia('(min-width: 901px)');desktop.addEventListener('change',event=>{if(event.matches)closeMenu();});
  if(form){
    form.querySelector('fieldset').disabled=false;
    form.elements.namedItem('name').addEventListener('input',event=>event.target.setCustomValidity(''));
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      const name=form.elements.namedItem('name');name.setCustomValidity(name.value.trim()?'':'Enter your name.');
      if(pending||!form.reportValidity())return;
      const status=form.querySelector('[data-form-status]'),error=form.querySelector('[data-form-error]'),submit=form.querySelector('[data-inquiry-submit]');
      error.textContent='';status.textContent='Reviewing the request…';submit.disabled=true;form.setAttribute('aria-busy','true');
      const controller=new AbortController();pending=controller;
      requestId=requestId||(window.crypto?.randomUUID?.()||'request-'+Date.now());
      const fields=Object.fromEntries([...new FormData(form)].map(([key,value])=>[key,typeof value==='string'?value.trim():value]));
      const payload={...fields,'form-name':'contact',inquiry_id:requestId,intent:'scenario_review',page_url:location.origin+location.pathname,preferred_follow_up:'Email',tcpa_consent:false,sms_opt_in:false};
      const adapter=window.StyerInquiryTransport;
      const live=adapter?.mode==='live';
      const timeout=setTimeout(()=>controller.abort(),12000);
      try{
        if(adapter&&!['live','preview'].includes(adapter.mode))throw Error('Unknown inquiry transport mode');
        if(live&&typeof adapter.submit!=='function')throw Error('Live inquiry transport is not configured');
        if(adapter?.submit!=null&&typeof adapter.submit!=='function')throw Error('Invalid inquiry transport');
        const work=typeof adapter?.submit==='function'?Promise.resolve().then(()=>adapter.submit(payload,{signal:controller.signal})):Promise.resolve({accepted:true});
        const aborted=new Promise((_,reject)=>controller.signal.addEventListener('abort',()=>reject(new DOMException('Request stopped','AbortError')),{once:true}));
        const result=await Promise.race([work,aborted]);
        if(controller.signal.aborted)return;
        if(result?.accepted!==true)throw Error('Capture not accepted');
        const confirmation=contact.querySelector('[data-contact-confirmation]');
        confirmation.querySelector('h3').textContent=live?'Your request was received.':'Preview complete.';
        confirmation.querySelector('[data-confirmation-copy]').textContent=live?'We received your scenario review request. This is not a loan approval or a credit inquiry.':'Nothing was sent or saved. This shows the next step after a scenario review request.';
        contact.querySelector('[data-contact-entry]').hidden=true;confirmation.hidden=false;form.reset();confirmation.focus();
      }catch(cause){
        if(!contact.open)return;
        error.textContent=live?'The request was not confirmed. Your details are still here. Try again, or use the call or email link on the page.':'The preview could not complete. Nothing was sent or saved. Your sample details are still here; try again.';
        error.focus();
      }finally{
        clearTimeout(timeout);if(pending===controller)pending=null;submit.disabled=false;form.removeAttribute('aria-busy');status.textContent='';
      }
    });
  }
  // Native details retain all guide text in the HTML and work without JavaScript.
  function revealHash(){
    if(!location.hash)return;let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    const target=document.getElementById(id);if(!target)return;
    for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;
  }
  window.addEventListener('hashchange',revealHash);revealHash();
  // Existing review collections remain usable; the user controls movement.
  const track=document.querySelector('.review-slides');
  if(track){
    const carousel=track.closest('.review-carousel'),status=carousel?.querySelector('.review-position'),count=track.children.length;
    const advance=step=>{const index=Math.round(track.scrollLeft/Math.max(track.clientWidth,1));track.scrollTo({left:((index+step+count)%count)*track.clientWidth,behavior:reduced()?'instant':'smooth'});};
    carousel?.querySelectorAll('[data-review-step]').forEach(button=>button.addEventListener('click',()=>advance(Number(button.dataset.reviewStep))));
    track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();advance(event.key==='ArrowRight'?1:-1);}});
    track.addEventListener('scroll',()=>{if(status)status.textContent=`${Math.round(track.scrollLeft/Math.max(track.clientWidth,1))+1} / ${count}`;},{passive:true});
  }
})();
