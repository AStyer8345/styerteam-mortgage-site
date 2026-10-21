const contact=document.querySelector('#contact'),info=document.querySelector('#info');let opener;
function open(d){opener=document.activeElement;d.showModal();document.body.classList.add('modal-open')}
function close(d){d.close();document.body.classList.remove('modal-open');opener?.focus()}
function start(goal){contact.querySelector('form').reset();contact.querySelector('form').hidden=false;contact.querySelector('.confirmation').hidden=true;window.resetPreviewForm?.();const select=contact.querySelector('select');select.value=[...select.options].some(o=>o.value===goal)?goal:'Talk through my options';open(contact)}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.matches('[data-contact]'))start(b.dataset.contact);if(b.matches('.close,.close-action'))close(b.closest('dialog'));if(b.matches('.mobile-menu')){const expanded=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(expanded));document.querySelector('#nav').classList.toggle('open',expanded)}if(b.matches('[data-notes]')){document.querySelector('#info-content').innerHTML='<p class="eyebrow">PRIVATE DESIGN PREVIEW</p><h2>The approved design, brought into the browser.</h2><p>All six pages share the approved visual direction. Borrower goals lead the navigation, with non-QM expertise prominent throughout. Resources link to existing guides, calculators, and loan content.</p><p>Adam’s Home and Buy portraits now come from his existing site. Ellery Wren’s review and the 5.0 Google rating across 99 reviews were checked directly on Google on October 16, 2026. The review belongs to the existing Adam Styer | HyperSmart Home Loans listing, not a new GoRascal business. The mockup’s 500+ families and Since 2013 claims were removed. Architectural and buyer imagery remains illustrative; photo rights are not independently documented. Tiffany’s existing headshot was retained from her previously sourced public profile and was not verified on StyerMortgage.com. GoRascal branding remains provisional pending the transition.</p><p>Forms use local test captures with the existing intake contract. No contact details are sent or saved; attribution metadata uses isolated preview storage. Resource links open the existing site in a new tab. Old staging and production have not been changed.</p>';open(info)}if(b.matches('[data-stage]')){const content={'Just Exploring':['Start with a comfortable payment.','Talk through your budget, available funds, and how you earn income. We’ll help you understand the next step before you start shopping.'],'Ready to Buy':['Shop with a financing plan.','We’ll discuss your purchase goals and the documentation needed for a preapproval review, including alternatives for complex income.'],'Found a Home':['Let’s work through the details.','Review the property, offer timeline, available funds, and financing approach with the team.']};const [title,text]=content[b.dataset.stage];document.querySelector('#info-content').innerHTML=`<p class="eyebrow">${b.dataset.stage}</p><h2>${title}</h2><p>${text}</p><button class="button green" id="stage-contact">Talk About My Purchase →</button>`;open(info);document.querySelector('#stage-contact').onclick=()=>{close(info);start('Buy a home')}}if(b.matches('[data-topic]')){const topic=b.dataset.topic;const descriptions={'Refinance & Equity':'Explore refinancing, cash-out, or access to equity. We’ll start with what you want to accomplish and evaluate the available approaches.','Invest':'Discuss financing for an investment property, including cash-flow-based and other non-QM approaches where appropriate.','About the Team':'Adam Styer and Tiffany Garcia. Personal mortgage guidance, complex-income expertise, and hands-on support from first conversation through closing.','Resources':'Detailed loan guides, calculators, and educational content will remain available in the full site. This preview covers Home, Buy, Refinance & Equity, Invest, About the Team, and Resources.'};document.querySelector('#info-content').innerHTML=`<p class="eyebrow">${topic}</p><h2>${topic==='About the Team'?'People who know your story.':topic}</h2><p>${descriptions[topic]}</p><p class="preview-notice">This section is not built in this six-page preview.</p>`;open(info)}});
for(const d of [contact,info]){d.addEventListener('cancel',()=>{document.body.classList.remove('modal-open')});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close(d)}})}

const menuButton=document.querySelector('.mobile-menu'),navigation=document.querySelector('#nav');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('open')}
navigation.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus()}});
for(const modal of [contact,info])modal.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(modal===contact)modal.querySelector('form').reset()});

const reviewTrack=document.querySelector('.review-slides');
if(reviewTrack){
 const carousel=reviewTrack.closest('.review-carousel'),status=carousel.querySelector('.review-position');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const toggle=document.createElement('button');
 toggle.type='button';toggle.className='review-autoplay';
 carousel.querySelector('.review-controls').append(toggle);
 let timer,frame,hovered=false,touching=false,paused=reduced.matches;
 const count=reviewTrack.children.length;
 function updateToggle(){toggle.textContent=paused?'▶':'Ⅱ';toggle.setAttribute('aria-label',paused?'Play automatic reviews':'Pause automatic reviews')}
 function schedule(){
  clearTimeout(timer);
  const stopped=paused||reduced.matches||hovered||touching||document.hidden||carousel.contains(document.activeElement);
  status.setAttribute('aria-live',stopped?'polite':'off');
  if(!stopped)timer=setTimeout(()=>{advance(1);schedule()},6000);
 }
 function advance(step){const index=Math.round(reviewTrack.scrollLeft/reviewTrack.clientWidth);reviewTrack.scrollTo({left:((index+step+count)%count)*reviewTrack.clientWidth,behavior:reduced.matches?'instant':'smooth'})}
 reviewTrack.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{status.textContent=`${Math.round(reviewTrack.scrollLeft/reviewTrack.clientWidth)+1} / ${count}`});schedule()},{passive:true});
 carousel.querySelectorAll('[data-review-step]').forEach(button=>button.addEventListener('click',()=>{advance(Number(button.dataset.reviewStep));schedule()}));
 toggle.addEventListener('click',()=>{paused=!paused;updateToggle();schedule()});
 carousel.addEventListener('mouseenter',()=>{hovered=true;schedule()});
 carousel.addEventListener('mouseleave',()=>{hovered=false;schedule()});
 carousel.addEventListener('focusin',schedule);
 carousel.addEventListener('focusout',()=>setTimeout(schedule,0));
 reviewTrack.addEventListener('pointerdown',()=>{touching=true;schedule()});
 window.addEventListener('pointerup',()=>{touching=false;schedule()});
 window.addEventListener('pointercancel',()=>{touching=false;schedule()});
 document.addEventListener('visibilitychange',schedule);
 reduced.addEventListener('change',()=>{if(reduced.matches)paused=true;updateToggle();schedule()});
 updateToggle();schedule();
}
