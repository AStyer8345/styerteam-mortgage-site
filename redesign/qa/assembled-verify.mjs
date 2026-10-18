import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';import {createRequire} from 'node:module';
import {parseHTML,packagePath} from './runtime.mjs';
const root=path.resolve(packagePath('site')),issues=[],verificationFiles=[];let pages=0,scripts=0,schemas=0;
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
function syntax(code,file){scripts++;try{new vm.Script(code,{filename:file});}catch(e){issues.push({type:'script-syntax',file,error:e.message});}}
for(const file of walk(root)){
 const rel=path.relative(root,file);
 if(file.endsWith('.js')){syntax(fs.readFileSync(file,'utf8'),rel);continue;}
 if(!file.endsWith('.html'))continue;const html=fs.readFileSync(file,'utf8');if(/^google-site-verification:/.test(html.trim())){verificationFiles.push(rel);continue;}pages++;const d=parseHTML(html).document;
 const ids=new Set();for(const e of d.querySelectorAll('[id]')){if(ids.has(e.id))issues.push({type:'duplicate-id',file:rel,id:e.id});ids.add(e.id);}
 for(const selector of ['.site-header','.site-footer','#contact']){const n=d.querySelectorAll(selector).length;if(n!==1)issues.push({type:'shared-component-count',file:rel,selector,count:n});}
 const csp=d.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute('content')||'';
 if(!csp.includes("connect-src 'none'")||!csp.includes("form-action 'none'"))issues.push({type:'preview-network-policy',file:rel});
 for(const script of d.querySelectorAll('script')){
  if(script.getAttribute('type')==='application/ld+json'){try{JSON.parse(script.textContent);schemas++;}catch(e){issues.push({type:'schema-json',file:rel,error:e.message});}continue;}
  if(script.getAttribute('src'))continue;
  if(script.getAttribute('type')&&!['text/javascript','application/javascript','module'].includes(script.getAttribute('type')))continue;
  syntax(script.textContent,rel+'#inline');
 }
 if(d.querySelector('script[src*="calculator-journey"]'))issues.push({type:'preview-journey-script',file:rel});
 const links=[...d.querySelectorAll('a[href]')];for(const a of links){const h=a.getAttribute('href');if(h.startsWith('#')&&h.length>1&&!ids.has(decodeURIComponent(h.slice(1))))issues.push({type:'local-fragment',file:rel,href:h});}
}
const result={pages,verificationFiles,scriptsParsed:scripts,schemaBlocksParsed:schemas,issues,scope:'Static source parse and component safety; no computed rendering or browser runtime claims.'};fs.writeFileSync(path.resolve(packagePath('qa','assembled-results.json')),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));if(issues.length)process.exitCode=1;
