// Rendered regression: inspect the destinations a visitor actually finds in the header.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4173';
if(!/^http:\/\/127\.0\.0\.1:4173$|^https:\/\/[\w-]+--shiny-paprenjak-c7e741\.netlify\.app$/.test(base))throw Error('Controlled preview required');
const output=process.env.REVIEW_OUTPUT||'/tmp/styer-navigation';fs.mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1050}});const results=[];
try{
 await page.goto(base+'/');const routes=await page.locator('header .nav-links a[href^="/"]').evaluateAll(els=>[...new Set(els.map(e=>e.getAttribute('href')))]);
 const expected=await page.locator('header .nav-links>li>a').allTextContents();
 for(const width of [1440,2100,1240,1024,390]){
  await page.setViewportSize({width,height:width===390?900:1050});
  for(const route of routes){
   await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);
   assert.deepEqual(await page.locator('header .nav-links>li>a').allTextContents(),expected,route+' header labels');
   const data=await page.evaluate(()=>{const h=document.querySelector('h1'),c=document.querySelector('.journey-copy'),card=document.querySelector('.journey-card'),hero=h?.closest('section');return {clipped:document.documentElement.scrollWidth>innerWidth+1,header:document.querySelector('header nav').getBoundingClientRect().toJSON(),copy:c?.getBoundingClientRect().toJSON(),card:card?.getBoundingClientRect().toJSON(),background:hero&&getComputedStyle(hero).backgroundColor,font:h&&getComputedStyle(h).fontFamily,size:h&&getComputedStyle(h).fontSize,logo:getComputedStyle(document.querySelector('.nav-logo-img')).content}});
   assert.equal(data.clipped,false,route+' clipped at '+width);assert.match(data.logo,/logo-light/);
   for(const button of await page.locator('.journey-actions>a').all()){const bounds=await button.boundingBox();assert.ok(bounds.height>=44&&bounds.height<=80,route+' action height at '+width);}
   const toggle=page.locator('.mobile-menu-toggle');if(await toggle.isVisible()){await toggle.click();assert.ok(await page.locator('header .nav-apply').isVisible());await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');}
   const file=route.replace(/[^a-zA-Z0-9]+/g,'-').slice(0,85)+'-'+width+'.png';if([1440,390].includes(width))await page.screenshot({path:output+'/'+file});
   results.push({route,width,file,...data});
  }
  const a=results.find(r=>r.width===width&&r.route==='/self-employed-mortgage-austin.html'),b=results.find(r=>r.width===width&&r.route==='/bank-statement-loans.html');
  for(const field of ['background','font','size'])assert.equal(a[field],b[field],field+' must match');
  for(const field of ['x','y','width']){assert.ok(Math.abs(a.copy[field]-b.copy[field])<=1,'copy '+field);if(width>900)assert.ok(Math.abs(a.card[field]-b.card[field])<=1,'form '+field);}
 }
 await page.setViewportSize({width:1440,height:1050});
 // Follow actual menu links, then complete both shared forms using the preview service.
 for(const [route,formName] of [['/self-employed-mortgage-austin.html','scenario-review'],['/bank-statement-loans.html','bank-statement-quote']]){
  await page.goto(base+'/');await page.locator('header .nav-has-dropdown').first().hover();await page.locator('header a[href="'+route+'"]').click();await page.waitForURL(base+route);
  const form=page.locator('form[data-journey]');assert.equal(await page.locator('main form').count(),1);assert.equal(await form.getAttribute('name'),formName);
  assert.equal(await form.locator('[name=income_type]').inputValue(),'Self-employed / business owner');assert.equal(await form.locator('[name=loan_goal]').inputValue(),'Not Sure Yet');
  assert.equal(await form.locator('.journey-estimates').getAttribute('open'),null);await form.locator('[name=loan_goal]').selectOption('Refinance');await form.locator('.journey-estimates summary').click();await form.locator('[name=current_balance]').fill('320000');
  await form.locator('[data-journey-next]').click();await form.locator('[name=first_name]').fill('Preview');await form.locator('[name=last_name]').fill('Layout');await form.locator('[name=email]').fill('layout@example.invalid');await form.locator('[data-journey-back]').click();assert.equal(await form.locator('[name=current_balance]').inputValue(),'320000');await form.locator('[data-journey-next]').click();await form.locator('[name=tcpa_consent]').check();
  let payload;await page.route('**/.netlify/functions/lead-intake',async route=>{payload=route.request().postDataJSON();await route.fulfill({json:{captured:true,preview:true}})});await form.locator('[type=submit]').click();await page.getByText('Preview only: your scenario was accepted',{exact:false}).waitFor();assert.equal(payload['form-name'],formName);assert.match(payload.situation,/320000/);assert.equal(payload.intent,'refinance');await page.unroute('**/.netlify/functions/lead-intake');
 }
 fs.writeFileSync(output+'/navigation-visual-audit.json',JSON.stringify(results,null,2));
 console.log(`${routes.length} navigation destinations at five widths passed header, logo, mobile menu and overflow checks. Self-employed and bank-statement layouts match; both preserve scenario details through Back and submission.`);
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
