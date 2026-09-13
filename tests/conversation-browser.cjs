// Controlled browser-to-intake verification. Never sends fixtures to production.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base='http://127.0.0.1:4173';
const output=process.env.REVIEW_OUTPUT||'/tmp/styer-conversation-review';fs.mkdirSync(output,{recursive:true});
process.env.LOANOS_URL='https://loanos.example.invalid';process.env.LOANOS_AGENT_SECRET='controlled-test';process.env.N8N_WEB_LEAD_URL='https://dispatch.example.invalid';
const {handler}=require('../netlify/functions/lead-intake.js');
const captured=[];
global.fetch=async(url,options)=>{
 if(url==='https://loanos.example.invalid/api/intake/inquiries'){
  const payload=JSON.parse(options.body);captured.push(payload);
  return {ok:true,json:async()=>({captured:true,inquiry_id:payload.inquiry_id,contact_id:'controlled-contact',task_id:'controlled-task',duplicate:false})};
 }
 if(url==='https://dispatch.example.invalid')return {ok:true};
 throw new Error('Unexpected external destination: '+url);
};
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();
 const errors=[],findings=[];page.on('pageerror',e=>errors.push(e.message));
 const mark=s=>{findings.push(s);console.log(s)};
 const f=n=>page.locator('#form-contact [name="'+n+'"]');
 let mode='failure',primary=[],backup=[];
 await context.route('**/.netlify/functions/lead-intake',async route=>{
  const body=route.request().postDataJSON();primary.push(body);
  if(mode==='failure'||mode==='backup')return route.fulfill({status:503,json:{captured:false}});
  const result=await handler({httpMethod:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  assert.equal(result.statusCode,200);return route.fulfill({status:result.statusCode,json:{...JSON.parse(result.body),preview:true}});
 });
 await context.route(base+'/',async route=>{
  if(route.request().method()!=='POST')return route.continue();
  backup.push(Object.fromEntries(new URLSearchParams(route.request().postData())));
  return route.fulfill({status:mode==='backup'?200:503,body:mode==='backup'?'Accepted in test backup':'Test capture unavailable'});
 });
 try{
  await page.goto(base+'/?utm_source=google&utm_medium=organic');
  await page.locator('.home-conversation-button').click();await page.waitForURL('**/contact.html?source=homepage_options#contact-form');
  await page.locator('#form-contact').waitFor();
  assert.equal(await f('loan_goal').count(),0);assert.equal(await f('income_type').count(),0);
  assert.equal(await page.locator('[data-journey-next]').count(),0);
  const submit=page.locator('#form-contact [type=submit]');
  await submit.click();assert.equal(primary.length,0);
  await f('message').fill('   ');await f('name').fill('Preview Borrower');await f('email').fill('fixture@example.invalid');await f('tcpa_consent').check();
  await submit.click();assert.equal(primary.length,0);
  const message='I want to build on land I own, but I do not know where to start.';
  await f('message').fill(message);await f('name').fill('  Preview  Borrower  ');await f('email').fill('not-an-email');
  await submit.click();assert.equal(primary.length,0);await f('email').fill('fixture@example.invalid');
  await f('preferred_follow_up').selectOption('Phone');await submit.click();assert.equal(primary.length,0);
  await f('phone').fill('123');await submit.click();assert.equal(primary.length,0);
  await f('phone').fill('(512) 555-0100');
  await submit.click();await page.getByText('We could not confirm that your message was saved.',{exact:false}).waitFor();
  assert.equal(await f('message').inputValue(),message);assert.equal(await f('email').inputValue(),'fixture@example.invalid');
  assert.equal(backup.length,1);assert.equal(primary.length,1);const id=primary[0].inquiry_id;
  assert.equal(primary[0].first_name,'Preview');assert.equal(primary[0].last_name,'Borrower');
  assert.equal(primary[0]['form-name'],'contact');assert.equal(primary[0].intent,'general');
  assert.equal(primary[0].source,'homepage_options');assert.equal(primary[0].cta_source_page,base+'/');
  assert.equal(primary[0].cta_label,'Talk through my options');assert.equal(primary[0].first_touch_utm_source,'google');
  assert.equal(primary[0].sms_opt_in,false);assert.ok(primary[0].situation.includes(message));assert.ok(primary[0].situation.includes('Preferred follow-up: Phone'));
  assert.equal(backup[0].situation,primary[0].situation);assert.equal(backup[0].message,message);assert.equal(backup[0].inquiry_id,id);
  assert.equal(await page.evaluate(()=>dataLayer.filter(e=>e.event==='generate_lead').length),0);
  mode='success';await submit.dblclick();await page.getByText('Preview only: your scenario was accepted',{exact:false}).waitFor();
  assert.equal(primary.length,2);assert.equal(primary[1].inquiry_id,id);assert.equal(captured.length,1);
  assert.equal(captured[0].first_name,'Preview');assert.equal(captured[0].last_name,'Borrower');assert.equal(captured[0]['form-name'],'contact');assert.equal(captured[0].lead_source,'Website Contact');
  assert.equal(captured[0].preferred_follow_up,'Phone');assert.equal(captured[0].situation,primary[1].situation);assert.equal(captured[0].cta_source_page,base+'/');
  const events=await page.evaluate(()=>dataLayer);assert.equal(events.filter(e=>e.event==='generate_lead').length,1);assert.equal(events.filter(e=>e.event==='accepted_submit').length,1);
  assert.equal(JSON.stringify(events).includes('fixture@example.invalid'),false);assert.equal(JSON.stringify(events).includes(message),false);
  assert.equal(await page.getByRole('link',{name:'Book a Call',exact:true}).last().getAttribute('href'),'https://calendly.com/adamstyer/15minutes');
  mark('Homepage → simple form → real intake handler → controlled LoanOS/dispatch passed with exact message, name, reply preference and attribution.');
  mark('Required/whitespace/email/phone-choice validation, no premature conversion, failed capture, same-ID retry and duplicate-click protection passed.');
  // Backup-only is acknowledged honestly and email does not require a phone.
  mode='backup';await page.goto(base+'/contact.html?source=homepage_hero#contact-form');
  await f('message').fill('Can you help me understand what I can afford?');await f('name').fill('Preview Email');await f('email').fill('email@example.invalid');await f('tcpa_consent').check();
  await submit.click();await page.getByText('Your message is saved in our backup inbox.',{exact:false}).waitFor();
  assert.equal(primary.at(-1).preferred_follow_up,'Email');assert.equal(primary.at(-1).phone,'');
  mark('Backup-only confirmation is distinct; email-first inquiry works without a phone number.');
  for(const width of [1440,1024,390,320]){
   await page.setViewportSize({width,height:900});
   for(const path of ['/','/contact.html?source=homepage_options#contact-form']){
    await page.goto(base+path);await page.waitForTimeout(250);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),path+' overflow at '+width);
    const menu=page.locator('.mobile-menu-toggle');if(await menu.isVisible()){await menu.click();assert.equal(await page.locator('header .nav-apply').isVisible(),true);await page.keyboard.press('Escape');}
    if(path==='/'){
     const panel=page.locator('.home-conversation');await panel.scrollIntoViewIfNeeded();
     assert.ok(parseFloat(await panel.locator('h2').evaluate(el=>getComputedStyle(el).fontSize))<=30);
     await panel.screenshot({path:output+'/panel-'+width+'.png'});
     assert.equal(await panel.getByRole('link',{name:'Call Adam'}).getAttribute('href'),'tel:+15129566010');assert.equal(await panel.getByRole('link',{name:'Text Adam'}).getAttribute('href'),'sms:+15129566010');
    }else await page.locator('#contact-form').screenshot({path:output+'/form-'+width+'.png'});
    await page.screenshot({path:output+'/'+(path==='/'?'home':'contact')+'-'+width+'.png'});
   }
  }
  mark('Homepage and form pass desktop, tablet, 390px and 320px mobile layouts, heading size, contact destinations and mobile Apply Now.');
  // Native HTML remains a usable backup when scripts are unavailable.
  const native=await browser.newContext({javaScriptEnabled:false,reducedMotion:'reduce'});const nojs=await native.newPage();let nativeData;
  await nojs.route(base+'/contact.html',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync('contact.html','utf8')}));
  await nojs.route(base+'/thank-you',r=>{nativeData=Object.fromEntries(new URLSearchParams(r.request().postData()));return r.fulfill({body:'Controlled native form capture'});});
  await nojs.goto(base+'/contact.html');await nojs.locator('[name=message]').fill('Native fallback inquiry');await nojs.locator('[name=name]').fill('Preview Native');await nojs.locator('[name=email]').fill('native@example.invalid');await nojs.locator('[name=tcpa_consent]').check();await nojs.locator('#form-contact [type=submit]').click();await nojs.waitForURL('**/thank-you');
  assert.equal(nativeData['form-name'],'contact');assert.equal(nativeData.message,'Native fallback inquiry');assert.equal(nativeData.name,'Preview Native');await native.close();
  mark('JavaScript-disabled form submits its registered contact schema and message to the native fallback.');
  assert.deepEqual(errors,[]);fs.writeFileSync(output+'/conversation-results.json',JSON.stringify({findings,errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
