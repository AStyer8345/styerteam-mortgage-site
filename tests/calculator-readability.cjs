const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4173';
if(!/^http:\/\/127\.0\.0\.1:4173$|^https:\/\/[\w-]+--shiny-paprenjak-c7e741\.netlify\.app$/.test(base))throw Error('Controlled preview required');
const out=process.env.REVIEW_OUTPUT||'/tmp/calculator-readability';fs.mkdirSync(out,{recursive:true});
const axe=fs.readFileSync(process.env.AXE_SOURCE||'/tmp/styer-experience-a11y/node_modules/axe-core/axe.min.js','utf8');
const routes=['calculators.html','calculator-payment.html','calculator-affordability.html','calculator-refinance-breakeven.html','refinance-calculator.html','dscr-calculator.html','asset-depletion-calculator.html','rate-buydown-calculator.html','wrap-mortgage-calculator.html'];
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage();const findings=[];try{
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:960});
  for(const route of routes){
   await page.goto(base+'/'+route);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,route+' overflow');
   if(await page.locator('body>header').count()){
    assert.match(await page.locator('body>header').evaluate(e=>getComputedStyle(e).backgroundColor),/^rgb\((?:16, 36, 64|13, 35, 66)\)$/);
    const toggle=page.locator('.mobile-menu-toggle');if(await toggle.isVisible()){await toggle.click();assert.ok(await page.locator('header .nav-apply').isVisible());await page.keyboard.press('Escape');}
   }
   if(route==='asset-depletion-calculator.html'){
    const heading=page.locator('#adc-calculator header');assert.equal(await heading.evaluate(e=>getComputedStyle(e).position),'static');assert.equal(await heading.evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0)');
    const initial=await page.locator('#adc-hero-amount').textContent();await page.locator('#adc-checking').fill('350000');await page.locator('#adc-checking').dispatchEvent('input');assert.notEqual(await page.locator('#adc-hero-amount').textContent(),initial);await page.locator('[data-period-card="84"]').click();assert.match(await page.locator('#adc-hero-period').textContent(),/84/);await page.reload();await page.waitForTimeout(100);
   }
   await page.evaluate(axe);const result=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
   findings.push({route,width,violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
   await page.screenshot({path:out+'/'+route.replace('.html','')+'-'+width+'-full.png',fullPage:true});
   const height=await page.evaluate(()=>document.documentElement.scrollHeight);for(const [label,y] of [['top',0],['middle',Math.max(0,(height-960)/2)],['bottom',height-960]]){await page.evaluate(y=>scrollTo(0,y),y);await page.screenshot({path:out+'/'+route.replace('.html','')+'-'+width+'-'+label+'.png'});}
  }
 }
 const articles=fs.readdirSync('blog').filter(f=>f.endsWith('.html')&&(fs.readFileSync(path.join('blog',f),'utf8').match(/<header\b/g)||[]).length>1);
 for(const file of articles){await page.goto(base+'/blog/'+file);const headers=await page.locator('header:not(body>header)').evaluateAll(els=>els.map(e=>({position:getComputedStyle(e).position,background:getComputedStyle(e).backgroundColor})));for(const h of headers){assert.ok(['static','relative'].includes(h.position),file+' section header became sticky');assert.notEqual(h.background,'rgb(16, 36, 64)',file+' section header inherited navigation background');}}
 fs.writeFileSync(out+'/results.json',JSON.stringify({findings,articleHeadersChecked:articles.length},null,2));
 assert.deepEqual(findings.filter(f=>f.violations.length),[]);console.log(`${routes.length} full calculator pages at desktop/mobile widths passed; ${articles.length} article headers remain independent of navigation styles. Asset inputs and period controls update results.`);
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
