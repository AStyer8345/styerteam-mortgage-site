// Run against the controlled preview only. Never submit these fixtures on live.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base=process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
if(!/127\.0\.0\.1|--shiny-paprenjak-c7e741\.netlify\.app/.test(base)||base.includes('styermortgage.com'))throw new Error('Controlled preview required');
const output=process.env.REVIEW_OUTPUT||'/tmp/styer-experience-tests';fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
 const findings=[],errors=[];page.on('pageerror',error=>errors.push(error.message));
 const go=async p=>{await page.goto(base+p);await page.waitForLoadState('domcontentloaded');await page.waitForTimeout(200);};
 const field=n=>page.locator('form[data-journey] [name="'+n+'"]');
 const mark=s=>{findings.push(s);console.log(s);};
 try{
  await go('/get-preapproved.html?intent=scenario');
  assert.equal(await field('loan_goal').inputValue(),'Not Sure Yet');
  assert.equal(await page.locator('header a.nav-apply').isVisible(),true);
  assert.match(await page.locator('header a.nav-apply').getAttribute('href'),/^https:\/\/hypersmart.my1003app.com\/513013\/register\?time=1779291829279$/);
  await page.locator('.journey-estimates summary').click();await field('loan_goal').selectOption('Refinance');await field('current_balance').fill('350000');await field('income_type').selectOption('Self-employed / business owner');
  assert.equal(await field('time_in_business').isVisible(),true);
  await field('loan_goal').selectOption('Purchase');assert.equal(await field('current_balance').isVisible(),false);
  await field('loan_goal').selectOption('Refinance');assert.equal(await field('current_balance').inputValue(),'350000');
  await page.locator('[data-journey-next]').click();await field('first_name').fill('Preview');await field('last_name').fill('Fixture');await field('email').fill('fixture@example.invalid');await field('tcpa_consent').check();
  await page.locator('[data-journey-back]').click();assert.equal(await field('current_balance').inputValue(),'350000');await page.locator('[data-journey-next]').click();
  let payloads=[];await page.route('**/.netlify/functions/lead-intake',async route=>{payloads.push(route.request().postDataJSON());await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({captured:false})});});
  await page.locator('form[data-journey] [type=submit]').click();await page.getByText('We could not confirm that your scenario was saved.',{exact:false}).waitFor();
  assert.equal(await field('email').inputValue(),'fixture@example.invalid');const id=payloads[0].inquiry_id;
  await page.unroute('**/.netlify/functions/lead-intake');
  await page.route('**/.netlify/functions/lead-intake',async route=>{payloads.push(route.request().postDataJSON());await new Promise(r=>setTimeout(r,100));await route.fulfill({json:{captured:true,preview:true,inquiry_id:id}});});
  await page.locator('form[data-journey] [type=submit]').dblclick();await page.getByText('Preview only: your scenario was accepted',{exact:false}).waitFor();
  assert.equal(payloads.length,2);assert.equal(payloads[1].inquiry_id,id);assert.match(payloads[1].situation,/Current mortgage balance: 350000/);assert.match(payloads[1].situation,/Self-employed/);assert.equal(payloads[1].sms_opt_in,false);
  const events=await page.evaluate(()=>window.dataLayer.filter(e=>e.event==='accepted_submit'));assert.equal(events.length,1);assert.equal(JSON.stringify(await page.evaluate(()=>window.dataLayer)).includes('fixture@example.invalid'),false);
  mark('General goal changes, Back, retained estimates, failed capture, same-ID retry, double-click and PII-free accepted events passed.');
  await page.unroute('**/.netlify/functions/lead-intake');
  for(const [entry,goal,situation] of [
   ['/bank-statement-loans.html','Not Sure Yet','Self-employed / business owner'],
   ['/blog/what-delays-closing-when-you-switch-lenders.html','Not Sure Yet','Difficulty with another lender'],
   ['/one-time-close-construction-loan-texas.html','Build','No special circumstance']]){
   await go(entry);const a=page.locator('a[href*="get-preapproved"]').first();await a.click();await page.waitForURL('**/get-preapproved.html**');await page.waitForTimeout(100);
   assert.equal(await field('loan_goal').inputValue(),goal);assert.equal(await field('income_type').inputValue(),situation);
   if(goal==='Build'||situation==='Difficulty with another lender')await page.locator('.journey-estimates summary').click();
   if(goal==='Build')assert.equal(await field('lot_status').isVisible(),true);
   if(situation==='Difficulty with another lender')assert.equal(await field('closing_date').isVisible(),true);
  }
  mark('Bank-statement, switching-lender and construction entry suggestions passed.');
  await go('/buy-before-you-sell-austin.html');await page.locator('.journey-estimates summary').click();assert.equal(await field('loan_goal').inputValue(),'Buy before selling');assert.equal(await field('listing_status').isVisible(),true);
  await go('/investor-loans.html');await page.locator('.journey-estimates summary').click();assert.equal(await field('loan_goal').inputValue(),'Invest');assert.equal(await field('investment_action').isVisible(),true);
  await go('/referral-partners-self-employed-clients.html');assert.equal(await page.locator('form.professional-referral-form').count(),1);
  await page.locator('#p-name').fill('Preview Partner');await page.locator('#p-email').fill('partner@example.invalid');await page.locator('#p-role').selectOption('CPA / tax advisor');await page.locator('#p-state').selectOption('Texas');await page.locator('#p-goal').selectOption('Purchase');await page.locator('#p-time').selectOption('Exploring');await page.locator('#p-cat').selectOption('Tax returns / self-employed income');
  let partnerPayload;await page.route('**/.netlify/functions/lead-intake',async route=>{partnerPayload=route.request().postDataJSON();await route.fulfill({json:{captured:true,preview:true}});});await page.locator('.professional-referral-form [type=submit]').click();await page.waitForURL('**/thank-you.html?type=professional-referral');assert.equal(partnerPayload.partner_role,'CPA / tax advisor');assert.equal(partnerPayload.email,'partner@example.invalid');assert.ok(partnerPayload.inquiry_id);await page.unroute('**/.netlify/functions/lead-intake');
  mark('Buy-before-selling, investor plan and existing professional-referral form passed.');
  await go('/bank-statement-loans.html');const calendar=page.locator('a[href*="calendly.com"]').first();
  await page.evaluate(()=>{window.openedCalendars=[];document.addEventListener('click',e=>{if(e.target.closest('a[href*="calendly.com"]')){window.openedCalendars.push(e.defaultPrevented);e.preventDefault();}},false);});
  await calendar.click();assert.deepEqual(await page.evaluate(()=>window.openedCalendars),[false]);assert.equal(await page.evaluate(()=>window.dataLayer.filter(e=>e.event==='book_call_click').length),1);assert.match(page.url(),/bank-statement/);
  mark('Book a Call reaches its calendar target without an intake interception or booking claim.');
  await go('/dscr-calculator.html');await page.locator('#dscr-rent').fill('4500');await page.locator('#dscr-rent').dispatchEvent('input');const original=await page.locator('#dscr-score').innerText();
  await page.locator('[data-review-calculator]').first().click();await page.waitForURL('**/investor-loans.html**');assert.match(await page.locator('.journey-summary').innerText(),/\$4,500/);assert.match(await page.locator('.journey-summary').innerText(),new RegExp(original.replace('.','\\.')));
  await page.getByText('Edit these numbers',{exact:true}).click();await page.waitForURL('**/dscr-calculator.html**');assert.equal((await page.locator('#dscr-rent').inputValue()).replaceAll(',',''),'4500');
  await page.locator('[data-save-analysis]').click();await page.waitForURL('**/saved-analysis.html');await page.locator('#workspace:visible').waitFor();
  let envelopes=[];page.on('request',req=>{if(req.url().endsWith('/api/saved-analysis')&&req.method()==='POST')envelopes.push(req.postDataJSON());});
  await page.locator('#save').click();await page.locator('#saved:visible').waitFor();const returnLink=await page.locator('#return-link').inputValue();assert.match(returnLink,/#[-_A-Za-z0-9]{43}\.[-_A-Za-z0-9]{43}$/);assert.equal(JSON.stringify(envelopes).includes('4500'),false);
  const second=await browser.newContext();const reopened=await second.newPage();await reopened.goto(returnLink);await reopened.locator('#saved:visible').waitFor();assert.match(await reopened.locator('#summary').innerText(),/\$4,500/);
  await reopened.locator('#editor summary').click();await reopened.locator('#edit-rent').fill('4700');await reopened.locator('#save').click();await reopened.getByText('Your analysis is saved.',{exact:false}).waitFor();await reopened.reload();await reopened.locator('#saved:visible').waitFor();assert.match(await reopened.locator('#summary').innerText(),/\$4,700/);
  await reopened.locator('#review').click();await reopened.waitForURL('**/investor-loans.html**');assert.match(await reopened.locator('.journey-summary').innerText(),/\$4,700/);
  const tampered=returnLink.slice(0,-1)+(returnLink.endsWith('a')?'b':'a');await reopened.goto(tampered);await reopened.waitForTimeout(200);assert.equal(await reopened.locator('#workspace').isVisible(),false);
  await second.close();
  mark('DSCR review carries exact values; Back restores them; encrypted save, fresh-browser return, update, review and tampered-key protection passed.');
  await go('/calculator-refinance-breakeven.html');await page.locator('#new-rate').fill('5.5');await page.locator('#new-rate').dispatchEvent('input');await page.locator('[data-review-calculator]').click();await page.waitForURL('**/refinance-quote.html**');assert.match(await page.locator('.journey-summary').innerText(),/5.5 %/);await page.getByText('Edit these numbers',{exact:true}).click();await page.waitForURL('**/calculator-refinance-breakeven.html**');assert.equal(await page.locator('#new-rate').inputValue(),'5.5');
  mark('Refinance comparison and Back retain the entered rate and results.');
  for(const width of [1440,1024,390]){
   await page.setViewportSize({width,height:900});
   for(const entry of ['/','/get-preapproved.html','/bank-statement-loans.html','/investor-loans.html','/dscr-calculator.html','/one-time-close-construction-loan-texas.html','/buy-before-you-sell-austin.html','/referral-partners-self-employed-clients.html','/calculator-refinance-breakeven.html']){
    await go(entry);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+' '+entry+' clipping');
    const toggle=page.locator('.mobile-menu-toggle');if(await toggle.count()&&await toggle.isVisible()){await toggle.click();assert.equal(await page.locator('header a.nav-apply').isVisible(),true);await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');}
    if(['/', '/get-preapproved.html','/dscr-calculator.html'].includes(entry))await page.screenshot({path:output+'/'+(entry==='/'?'home':entry.slice(1,-5))+'-'+width+'.png',fullPage:false});
   }
  }
  mark('Nine representative page types pass desktop, tablet and 390px mobile width and menu checks.');
  assert.deepEqual(errors,[]);fs.writeFileSync(output+'/browser-results.json',JSON.stringify({findings,errors},null,2));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
