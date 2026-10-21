import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {parseHTML,packagePath} from './runtime.mjs';
const [buildArg=packagePath('site'),ledgerArg=packagePath('styer-mortgage-migration-ledger-1.md'),outputArg=packagePath('qa','static-results.json'),baselineArg]=process.argv.slice(2);
if(!buildArg)throw Error('Usage: node static-verify.mjs BUILD [LEDGER] [OUTPUT] [BASELINE]');
const root=path.resolve(buildArg), issues=[], warnings=[], rows=[];
const text=n=>(n?.textContent||'').replace(/\s+/g,' ').trim();
const norm=s=>s.replace(/\s+/g,' ').trim().toLowerCase();
for(const line of fs.readFileSync(ledgerArg,'utf8').split('\n')){
 const cols=line.split('|').slice(1,-1).map(x=>x.trim());
 if(cols.length!==6||!cols[0].startsWith('['))continue;
 const url=cols[0].match(/\]\((https:\/\/styermortgage\.com[^)]+)\)/)?.[1];
 if(!url)continue;
 const parent=cols[3].match(/Parent:\s*\[[^\]]*\]\((https:\/\/styermortgage\.com[^)]+)\)/)?.[1];
 rows.push({route:new URL(url).pathname,role:cols[2],parent:parent?new URL(parent).pathname:null,anchor:cols[5],action:cols[4]});
}
if(rows.length!==173)issues.push({type:'ledger-count',expected:173,actual:rows.length});
// The ledger retains historical URLs; the approved hierarchy supersedes its proposed parents.
const hierarchyPath=packagePath('hierarchy-manifest.json');
if(fs.existsSync(hierarchyPath)){const hierarchy=JSON.parse(fs.readFileSync(hierarchyPath,'utf8'));for(const row of rows){if(hierarchy.parents[row.route]){row.parent=hierarchy.parents[row.route];row.anchor=hierarchy.labels[row.route]||row.anchor;}}}
const duplicateRoutes=rows.map(x=>x.route).filter((x,i,a)=>a.indexOf(x)!==i);
if(duplicateRoutes.length)issues.push({type:'duplicate-ledger-routes',routes:duplicateRoutes});
const config=fs.existsSync(path.join(root,'vercel.json'))?JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8')):{};
const rules=[...(config.redirects||[]).map(x=>({...x,kind:'redirect'})),...(config.rewrites||[]).map(x=>({...x,kind:'rewrite'}))];
if(fs.existsSync(path.join(root,'_redirects')))for(const line of fs.readFileSync(path.join(root,'_redirects'),'utf8').split('\n')){
 const parts=line.trim().split(/\s+/);if(parts.length>=2&&!parts[0].startsWith('#'))rules.push({source:parts[0],destination:parts[1],kind:parts[2]==='200'?'rewrite':'redirect'});
}
function resolveRoute(route,base=root,seen=new Set()){
 if(seen.has(route))return {loop:true};seen.add(route);
 const rule=rules.find(r=>r.source===route);
 if(rule){if(/^https?:/.test(rule.destination))return {external:rule.destination,rule};return {...resolveRoute(new URL(rule.destination,'https://styermortgage.com').pathname,base,seen),rule};}
 const file=path.join(base,decodeURIComponent(route).replace(/^\//,''));
 if(fs.existsSync(file)&&fs.statSync(file).isFile())return {file};
 if(fs.existsSync(path.join(file,'index.html')))return {file:path.join(file,'index.html')};
 if(!path.extname(file)&&config.cleanUrls&&fs.existsSync(file+'.html'))return {file:file+'.html'};
 return {missing:true};
}
const docs=new Map();
function doc(file){if(!docs.has(file))docs.set(file,parseHTML(fs.readFileSync(file,'utf8')).document);return docs.get(file);}
function canonicalOf(d){return d.querySelector('link[rel="canonical"]')?.getAttribute('href');}
function urlOf(href,from){try{return new URL(href,'https://styermortgage.com'+from)}catch{return null}}
const results=[];
for(const row of rows){
 const resolved=resolveRoute(row.route);const record={...row,...resolved};delete record.rule;results.push(record);
 if(resolved.missing||resolved.loop){issues.push({type:resolved.loop?'route-loop':'missing-route',route:row.route});continue;}
 if(resolved.external){warnings.push({type:'external-route-not-fetched',route:row.route,target:resolved.external});continue;}
 const d=doc(resolved.file), canonical=canonicalOf(d);record.canonical=canonical;
 if(!canonical)issues.push({type:'missing-canonical',route:row.route});
 if(row.parent){
  const parent=resolveRoute(row.parent);
  if(parent.file){const links=[...doc(parent.file).querySelectorAll('a[href]')];
   const target=canonical?new URL(canonical).pathname:row.route;
   const acceptedTargets=new Set([row.route,target]);
   if(acceptedTargets.has('/')||acceptedTargets.has('/index.html')){acceptedTargets.add('/');acceptedTargets.add('/index.html');}
   const matches=links.filter(a=>acceptedTargets.has(urlOf(a.getAttribute('href'),row.parent)?.pathname));
   if(!matches.length)issues.push({type:'missing-parent-link',route:row.route,parent:row.parent,target});
   else if(!matches.some(a=>norm(text(a))===norm(row.anchor)))issues.push({type:'parent-anchor-mismatch',route:row.route,parent:row.parent,expected:row.anchor,found:matches.map(text)});
  }
  if(row.route!=='/'&&!d.querySelector(`a[href="${row.parent}"]`)&&![...d.querySelectorAll('a[href]')].some(a=>urlOf(a.getAttribute('href'),row.route)?.pathname===row.parent))issues.push({type:'missing-parent-backlink',route:row.route,parent:row.parent});
 }
 if(baselineArg){
  const prior=resolveRoute(row.route,path.resolve(baselineArg));
  if(prior.file){const old=doc(prior.file);
   if(canonicalOf(old)!==canonical)issues.push({type:'canonical-changed',route:row.route,before:canonicalOf(old),after:canonical});
   const newText=norm(text(d.querySelector('main')||d.body));
   const paragraphs=[...old.querySelectorAll('main p, main li, main th, main td')].map(text).filter(x=>x.length>45);
   const missing=paragraphs.filter(x=>!newText.includes(norm(x)));
   if(missing.length)warnings.push({type:'baseline-prose-review-required',route:row.route,missingCount:missing.length,samples:missing.slice(0,8)});
   const oldTypes=[...old.querySelectorAll('script[type="application/ld+json"]')].flatMap(x=>{try{return JSON.parse(x.textContent)}catch{return []}});
   record.baselineSchemaBlocks=oldTypes.length;
  }
 }
}
for(const [file,d] of docs){if(!file.startsWith(root+path.sep))continue;
 const route='/'+path.relative(root,file).split(path.sep).join('/');
 const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);
 for(const id of new Set(ids.filter((x,i)=>ids.indexOf(x)!==i)))issues.push({type:'duplicate-id',route,id});
 for(const block of d.querySelectorAll('script[type="application/ld+json"]'))try{JSON.parse(block.textContent)}catch(e){issues.push({type:'invalid-jsonld',route,message:e.message})}
 for(const el of d.querySelectorAll('img:not([alt])'))issues.push({type:'image-alt-missing',route,src:el.getAttribute('src')});
 for(const a of d.querySelectorAll('a[href]')){
  const href=a.getAttribute('href'),u=urlOf(href,route);if(!u||!['http:','https:'].includes(u.protocol))continue;
  if(u.hostname!=='styermortgage.com')continue;
  const target=resolveRoute(u.pathname);
  if(target.missing||target.loop){issues.push({type:'broken-internal-link',route,href});continue;}
  if(u.hash&&target.file&&/\.html?$/.test(target.file)){
   const td=doc(target.file),id=decodeURIComponent(u.hash.slice(1));
   if(!td.getElementById(id)&&![...td.querySelectorAll('a[name]')].some(x=>x.getAttribute('name')===id))issues.push({type:'broken-fragment',route,href});
  }
 }
}
const counts={};for(const i of issues)counts[i.type]=(counts[i.type]||0)+1;
const report={build:root,ledger:ledgerArg,routeCount:rows.length,resolved:results.filter(x=>x.file||x.external).length,issueCount:issues.length,counts,issues,warnings,routes:results};
fs.mkdirSync(path.dirname(outputArg),{recursive:true});fs.writeFileSync(outputArg,JSON.stringify(report,null,2));
console.log(JSON.stringify({routeCount:report.routeCount,resolved:report.resolved,issueCount:report.issueCount,counts,warningCount:warnings.length,output:outputArg},null,2));
process.exitCode=issues.length?1:0;
