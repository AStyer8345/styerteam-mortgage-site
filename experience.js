(function () {
 'use strict';
 var path=location.pathname;
 // Suggestions come only from known page context; visitors can correct them.
 function suggestion(){
  if(/switch.*lender|lender.*switch/.test(path))return {situation:'Difficulty with another lender'};
  if(/bank-statement|self-employed|business-owner|1099|k1-income|p-and-l/.test(path))return {situation:'Self-employed / business owner'};
  if(/construction/.test(path))return {goal:'Build'};
  if(/buy-before|move-up/.test(path))return {goal:'Buy before selling'};
  if(/dscr|invest/.test(path))return {goal:'Invest',situation:'Rental income'};
  if(/refinance/.test(path))return {goal:'Refinance'};
  if(/asset-depletion|high-net-worth/.test(path))return {situation:'Substantial assets'};
  return {};
 }
 document.querySelectorAll('a[href*="get-preapproved"],a[href="/scenario.html"]').forEach(function(a){
  var url=new URL(a.href,location.href);if(url.origin!==location.origin)return;
  var defaults=suggestion();Object.keys(defaults).forEach(function(k){if(!url.searchParams.has(k))url.searchParams.set(k,defaults[k]);});
  a.href=url.pathname+url.search+url.hash;
 });
 // Separate calling and texting; the mobile menu is roomy when expanded.
 var nav=document.querySelector('header .nav-links');
 if(nav&&!nav.querySelector('a[href^="sms:"]')){
  var li=document.createElement('li');li.className='experience-mobile-text';var text=document.createElement('a');text.href='sms:+15129566010';text.textContent='Text Adam';li.appendChild(text);nav.appendChild(li);
 }
 // Navigation state and Escape handling are owned by script.js.
 document.querySelectorAll('main table').forEach(function(table){
  if(table.closest('.experience-table-scroll, .program-table-scroll, .ci-table-wrap'))return;
  var wrapper=document.createElement('div');wrapper.className='experience-table-scroll';wrapper.tabIndex=0;wrapper.setAttribute('role','region');wrapper.setAttribute('aria-label',(table.caption&&table.caption.textContent)||'Comparison table — scroll horizontally if needed');table.before(wrapper);wrapper.appendChild(table);
 });
 document.querySelectorAll('.journey-actions').forEach(function(actions){if(!actions.querySelector('a[href*="my1003app"]')||actions.parentElement.querySelector('.journey-path-note'))return;var p=document.createElement('p');p.className='experience-portal-note';p.textContent='Apply Now opens the secure application portal.';actions.after(p);});
})();
