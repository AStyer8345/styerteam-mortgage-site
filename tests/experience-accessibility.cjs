const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
const axe=fs.readFileSync(process.env.AXE_SOURCE||require.resolve('axe-core/axe.min.js'),'utf8');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4173';
const output=process.env.REVIEW_OUTPUT||'/tmp/styer-experience-tests';
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const findings=[];try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const route of ['/','/get-preapproved.html','/investor-loans.html','/dscr-calculator.html','/referral-partners-self-employed-clients.html','/bank-statement-loans.html','/scenario.html']){
   await page.goto(base+route);await page.waitForTimeout(300);await page.evaluate(axe);
   const result=await page.evaluate(async()=>await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
   findings.push({route,width,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  }
  await page.close();
 }
 fs.mkdirSync(output,{recursive:true});fs.writeFileSync(output+'/accessibility-final.json',JSON.stringify(findings,null,2));
 assert.deepEqual(findings.filter(f=>f.violations.length),[]);console.log('14 desktop/mobile page scans: no automated WCAG A/AA violations detected.');
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1;});
