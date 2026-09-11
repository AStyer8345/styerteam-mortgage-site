// Full public-route review against a controlled preview. No forms are submitted.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
if (!/^http:\/\/127\.0\.0\.1:4173$|^https:\/\/[\w-]+--shiny-paprenjak-c7e741\.netlify\.app$/.test(base)) throw Error('Controlled preview required');
const out = process.env.REVIEW_OUTPUT;
if (!out) throw Error('REVIEW_OUTPUT required');
fs.mkdirSync(out, { recursive: true });
const inventory = JSON.parse(fs.readFileSync(process.env.REVIEW_INVENTORY));
const axe = fs.readFileSync(process.env.AXE_SOURCE || require.resolve('axe-core/axe.min.js'), 'utf8');
const filter = process.env.REVIEW_ROUTES?.split(',');
const jobs = inventory.filter(p => p.public && (!filter || filter.includes(p.route))).flatMap(p => [1440, 390].map(width => ({route:p.route,width})));
const findings = [];
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    await Promise.all(Array.from({length:4}, async () => {
      const page = await browser.newPage();
      // Keep visual review deterministic and avoid external advertising/capture calls.
      await page.route('**/*', route => {
        const u = new URL(route.request().url());
        return u.origin === base || ['fonts.googleapis.com','fonts.gstatic.com'].includes(u.hostname) || route.request().resourceType() === 'image' ? route.continue() : route.abort();
      });
      for (;;) {
        const job = jobs.shift(); if (!job) break;
        const errors = []; const onError = e => errors.push(e.message); page.on('pageerror', onError);
        try {
          await page.setViewportSize({width:job.width,height:960});
          const response = await page.goto(base+'/'+job.route, {waitUntil:'domcontentloaded', timeout:20000});
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(150);
          const metrics = await page.evaluate(() => {
            const visible = e => e.getBoundingClientRect().width && e.getBoundingClientRect().height && getComputedStyle(e).visibility !== 'hidden';
            const info = e => {const s=getComputedStyle(e),r=e.getBoundingClientRect();return {tag:e.tagName,cls:e.className,text:e.textContent.trim().replace(/\s+/g,' ').slice(0,180),size:s.fontSize,color:s.color,background:s.backgroundColor,width:Math.round(r.width)}};
            return {
              title:document.title, h1:[...document.querySelectorAll('h1')].filter(visible).map(info),
              overflow:document.documentElement.scrollWidth>innerWidth+1,
              overflowElements:[...document.querySelectorAll('main *')].filter(e=>visible(e)&&e.getBoundingClientRect().right>innerWidth+2&&!e.closest('[style*="overflow"],.editorial-table-scroll,.experience-table-scroll,.schedule-table-wrap')).slice(0,10).map(info),
              smallText:[...document.querySelectorAll('main p,main label,main li,main td')].filter(e=>visible(e)&&parseFloat(getComputedStyle(e).fontSize)<14).slice(0,15).map(info),
              longParagraphs:[...document.querySelectorAll('main p,article p')].filter(e=>visible(e)&&e.textContent.trim().split(/\s+/).length>110).map(info),
              wideParagraphs:[...document.querySelectorAll('article p,.blog-post p,.article-content p')].filter(e=>visible(e)&&e.getBoundingClientRect().width>850).slice(0,5).map(info),
              brokenImages:[...document.images].filter(e=>e.complete&&!e.naturalWidth&&!e.closest('noscript')).map(e=>e.getAttribute('src')),
              links:[...document.querySelectorAll('a[href]')].map(e=>({href:e.href,text:e.textContent.trim().replace(/\s+/g,' ').slice(0,100)})),
              header:document.querySelector('body>header')?.textContent.trim().replace(/\s+/g,' '),
              height:document.documentElement.scrollHeight
            };
          });
          const toggle=page.locator('body>header .mobile-menu-toggle');
          let menu=null;
          if(await toggle.count() && await toggle.isVisible()) {
            await toggle.click(); menu={expanded:await toggle.getAttribute('aria-expanded'),apply:await page.locator('body>header .nav-apply').isVisible()};
            await page.keyboard.press('Escape'); menu.closed=await toggle.getAttribute('aria-expanded')==='false';
          }
          await page.evaluate(axe);
          const result=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
          const stem=job.route.replace(/\.html$/,'').replaceAll('/','__')+'-'+job.width;
          // Menu focus restoration and anchor scrolling can still be animating.
          // Stabilize scroll before capture so Chromium does not stitch duplicate tiles.
          // The private analysis page intentionally disallows inline styles and
          // already uses immediate scrolling. Preserve that security boundary.
          if(job.route!=='saved-analysis.html') await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
          await page.evaluate(()=>window.scrollTo({top:0,left:0,behavior:'instant'}));
          await page.waitForTimeout(250);
          const height=await page.evaluate(()=>document.documentElement.scrollHeight);
          const target=path.join(out,stem+'-full.png');
          if(height<=8000) await page.screenshot({path:target,fullPage:true});
          else {
            // Tall mobile documents can exceed Chrome's compositor texture limit.
            // Capture bounded page-coordinate tiles and assemble the evidence image.
            const parts=[];
            for(let y=0;y<height;y+=8000){const file=path.join(out,stem+'-part-'+y+'.png');parts.push(file);await page.screenshot({path:file,fullPage:true,clip:{x:0,y,width:job.width,height:Math.min(8000,height-y)}});}
            execFileSync('python3',['-c',"from PIL import Image; import sys; parts=[Image.open(p) for p in sys.argv[2:]]; result=Image.new('RGB',(parts[0].width,sum(p.height for p in parts))); y=0\nfor p in parts: result.paste(p,(0,y)); y+=p.height\nresult.save(sys.argv[1])",target,...parts]);
            for(const file of parts)fs.unlinkSync(file);
          }
          const record={...job,status:response.status(),...metrics,menu,errors,violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))}))};
          findings.push(record); fs.appendFileSync(path.join(out,'results.jsonl'),JSON.stringify(record)+'\n');
          if(findings.length%20===0) console.log(`${findings.length} page/width reviews complete`);
        } catch (error) {const record={...job,error:String(error)}; findings.push(record);fs.appendFileSync(path.join(out,'results.jsonl'),JSON.stringify(record)+'\n');}
        finally {page.off('pageerror',onError);}
      }
      await page.close();
    }));
  } finally {await browser.close();}
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(findings,null,2));
  console.log(JSON.stringify({reviewed:findings.length,errors:findings.filter(r=>r.error).length,overflow:findings.filter(r=>r.overflow).length,accessibility:findings.filter(r=>r.violations?.length).length}));
})().catch(e=>{console.error(e);process.exitCode=1});
