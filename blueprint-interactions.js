/* No transport or persistence: allowlisted interaction evidence for local review. */
(() => {
  'use strict';
  const local = ['127.0.0.1', 'localhost'].includes(location.hostname);
  if (!local) return;
  const events = [];
  Object.defineProperty(window, 'styerPreviewEvents', {value: events});
  function record(name, parameters = {}) {
    events.push({name, page_path: location.pathname, ...parameters});
    if (events.length > 100) events.shift();
  }
  const hubs = {'/self-employed-mortgage-austin.html':'self_employed','/high-net-worth-mortgage.html':'assets','/investor-loans.html':'investor','/first-time-home-buyer.html':'homebuyer'};
  document.addEventListener('click', e => {
    const a=e.target.closest('a[href]'); if (!a) return;
    const url=new URL(a.href,location.href);
    if(url.origin===location.origin && hubs[url.pathname]) record('borrower_hub_select',{borrower_hub:hubs[url.pathname]});
    if(url.protocol==='tel:') record('click_call');
    if(url.protocol==='sms:') record('click_text');
    if(url.hostname==='calendly.com') record('booking_click');
    if(url.pathname==='/apply-now/' || url.pathname==='/apply-now' || url.pathname==='/contact.html') record('application_click');
  });
  const started=new WeakSet();
  document.addEventListener('input',e=>{
    const form=e.target.closest('form');if(!form || started.has(form))return;
    // Count only contact forms; calculator inputs remain anonymous local math.
    if(!form.querySelector('[type="email"]'))return;
    started.add(form);record('scenario_form_start');
  });
  document.addEventListener('styer-preview-submit',e=>record(e.detail.error?'scenario_submit_error':'scenario_submit_simulated',{error_category:e.detail.error||'none'}));

  /* Whole-card click delegation for cards and mandate items */
  document.addEventListener('click', e => {
    const card = e.target.closest('.pwe-audience-col, .pwe-mandate-item');
    if (!card) return;
    if (e.target.closest('a')) return;
    const link = card.querySelector('a.pwe-card-link, a.pwe-mandate-action');
    if (link) link.click();
  });
})();
/* Progressive enhancement: every library destination is present before JS runs. */
(() => {
  const search=document.getElementById('blueprint-search'),topic=document.getElementById('blueprint-topic');
  if(!search||!topic)return;
  const items=[...document.querySelectorAll('.blueprint-library li')];
  function filter(){
    const terms=search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);let count=0;
    for(const item of items){const matches=(!topic.value||item.dataset.libraryTopic===topic.value)&&terms.every(t=>item.textContent.toLowerCase().includes(t));item.hidden=!matches;if(matches)count++;}
    document.getElementById('blueprint-results').textContent=count+' of '+items.length+' resources';
    document.getElementById('blueprint-empty').hidden=count!==0;
  }
  search.addEventListener('input',filter);topic.addEventListener('change',filter);
  document.getElementById('blueprint-reset').addEventListener('click',()=>{search.value='';topic.value='';filter();search.focus()});
})();
/* Optional reviewer console: nonsensitive event evidence stays in this page. */
(() => {
  if(!['127.0.0.1','localhost'].includes(location.hostname)||!new URLSearchParams(location.search).has('preview_events'))return;
  const panel=document.createElement('details');panel.className='blueprint-event-console';
  const summary=document.createElement('summary');summary.textContent='Local event verification';panel.append(summary);
  const note=document.createElement('p');note.textContent='Events remain in this page only. No form values, financial inputs or identifiers are recorded.';panel.append(note);
  const output=document.createElement('pre');output.setAttribute('aria-live','polite');panel.append(output);
  const refresh=document.createElement('button');refresh.type='button';refresh.textContent='Refresh event log';refresh.addEventListener('click',()=>{output.textContent=JSON.stringify(window.styerPreviewEvents||[],null,2)});panel.append(refresh);
  const container=document.querySelector('main')||document.body;container.append(panel);output.textContent='No events displayed yet. Use the page, then refresh the log.';
})();
