const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=process.cwd(), out='/tmp/modern-homepage-review';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});
for(const width of [390,1440])for(const mode of ['both','primary','backup','failure','nojs']){
 const ctx=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:mode!=='nojs',reducedMotion:'reduce'}),page=await ctx.newPage();let calls=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{const r=route.request(),u=new URL(r.url());if(u.hostname!=='styermortgage.com')return route.abort();if(r.method()==='POST'){calls.push({path:u.pathname,body:r.postData()});const ok=mode==='both'||mode==='nojs'||(mode==='primary'&&u.pathname.includes('lead-intake'))||(mode==='backup'&&u.pathname==='/');return route.fulfill({status:ok?200:502,contentType:mode==='nojs'?'text/html':'application/json',body:mode==='nojs'?'<h1>Preview received</h1>':JSON.stringify({captured:ok})});}const local=root+(u.pathname==='/'?'/index.html':u.pathname);if(fs.existsSync(local)&&fs.statSync(local).isFile())return route.fulfill({path:local});return route.abort();});
 await page.goto('https://styermortgage.com/?utm_source=local-check');
 assert.equal(await page.locator('h1').innerText(),'Your next move.\nThoughtfully financed.');
 await page.locator('#loan-goal').selectOption('Build');await page.locator('#name').fill('Local Test');await page.locator('#email').fill('local@example.invalid');await page.locator('[name=tcpa_consent]').check({force:mode==='nojs'});
 if(mode==='both'){await page.screenshot({path:out+`/homepage-${width}.png`,fullPage:true});}
 await page.locator('#form-homepage-contact [type=submit]').click();
 if(mode==='nojs'){assert(calls.some(c=>c.path==='/contact-thank-you.html'));assert.equal(new URLSearchParams(calls[0].body).get('loan_goal'),'Build');}
 else {await page.waitForFunction(()=>{const s=document.querySelector('.journey-status');return !s.hidden&&s.dataset.tone!=='sending'});
 const text=await page.locator('.journey-status').innerText();if(mode==='failure'){assert.match(text,/could not confirm/);assert.equal(await page.locator('#loan-goal').inputValue(),'Build');assert.equal(await page.locator('#name').inputValue(),'Local Test');const id=await page.locator('[name=inquiry_id]').inputValue();await page.locator('#form-homepage-contact [type=submit]').click();await page.waitForTimeout(100);assert.equal(await page.locator('[name=inquiry_id]').inputValue(),id);}
 else {assert.match(text,mode==='backup'?/backup inbox/:/saved/);assert.equal(calls.length,2);const primary=JSON.parse(calls.find(c=>c.path.includes('lead-intake')).body),backup=new URLSearchParams(calls.find(c=>c.path==='/').body);assert.equal(primary.loan_goal,'Build');assert.equal(primary.intent,'construction');assert.match(primary.situation,/Financing goal: Build/);assert.equal(primary.inquiry_id,backup.get('inquiry_id'));assert.equal(primary.utm_source,'local-check');assert.equal(backup.get('situation'),primary.situation);await page.reload();assert(await page.locator('.journey-status').isVisible());assert.equal(calls.length,2);}
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);}
 console.log('PASS',width,mode);await ctx.close();}
 await browser.close();})();
