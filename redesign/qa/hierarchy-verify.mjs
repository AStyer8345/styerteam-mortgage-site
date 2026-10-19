// Migration-level checks: all new page links, retained underwriting prose,
// canonical page ownership and the approved separation of audiences/programs.
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {parseHTML,packagePath} from './runtime.mjs';
const h=JSON.parse(fs.readFileSync(packagePath('hierarchy-manifest.json'),'utf8'));
const root=packagePath('site'),issues=[],norm=s=>s.replace(/\s+/g,' ').trim();
const fileFor=r=>path.join(root,r==='/'?'index.html':r.replace(/^\//,'')+(r.endsWith('/')?'index.html':''));
const read=p=>parseHTML(fs.readFileSync(p,'utf8')).document;
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
let proseChecked=0,linksChecked=0;const pages=[];
for(const p of h.preserved_depth){
 const source=read(packagePath(p.preserved_file)),dest=read(fileFor(p.guide));
 const before=source.querySelector('main').cloneNode(true);
 for(const node of before.querySelectorAll('.migration-links,.migration-parent,.ledger-breadcrumb'))node.remove();
 const after=norm(dest.querySelector('main').textContent);
 for(const n of before.querySelectorAll('p,li,dd,dt,th,td')){const text=norm(n.textContent);if(text.length<40)continue;proseChecked++;if(!after.includes(text))issues.push({type:'missing-preserved-prose',source:p.route,guide:p.guide,text:text.slice(0,160)});}
 if(dest.querySelector('link[rel=canonical]')?.getAttribute('href')!=='https://styermortgage.com'+p.guide)issues.push({type:'guide-canonical',route:p.guide});
}
for(const route of [...h.programs,...h.audiences]){
 const d=read(fileFor(route)),main=d.querySelector('.hi-main');
 if(!main||d.querySelectorAll('h1').length!==1)issues.push({type:'short-template-or-heading',route});
 if(d.querySelectorAll('.hi-faq details').length!==3)issues.push({type:'short-template-faq',route});
 if(!d.querySelector('a[data-contact]'))issues.push({type:'scenario-trigger',route});
 const clone=main.cloneNode(true);for(const n of clone.querySelectorAll('.migration-links'))n.remove();
 const words=norm(clone.textContent).split(' ').length;pages.push({route,words});
 if(words>700)issues.push({type:'landing-page-length',route,words});
 for(const a of main.querySelectorAll('a[href]'))if(h.excluded_from_promotion.includes(a.getAttribute('href')))issues.push({type:'excluded-program-promoted',route,href:a.getAttribute('href')});
 const canonical=d.querySelector('link[rel=canonical]')?.getAttribute('href');if(canonical!=='https://styermortgage.com'+route)issues.push({type:'landing-canonical',route,canonical});
}
for(const file of walk(root).filter(f=>f.endsWith('.html'))){
 const d=read(file);
 for(const a of d.querySelectorAll('a[href]')){
  const href=a.getAttribute('href');if(!href.startsWith('/')||href.startsWith('//'))continue;
  const u=new URL(href,'https://styermortgage.com');if(['/apply-now/','/apply-now'].includes(u.pathname))continue;
  let target=fileFor(u.pathname);if(!fs.existsSync(target)&&!path.extname(target)&&fs.existsSync(target+'.html'))target+='.html';
  if(!fs.existsSync(target)){issues.push({type:'new-graph-broken-route',file:path.relative(root,file),href});continue;}
  linksChecked++;if(u.hash&&target.endsWith('.html')&&!read(target).getElementById(decodeURIComponent(u.hash.slice(1))))issues.push({type:'new-graph-broken-fragment',file:path.relative(root,file),href});
 }
}
const result={programPages:h.programs.length,audiencePages:h.audiences.length,preservedGuides:h.preserved_depth.length,preservedProseBlocks:proseChecked,internalLinksChecked:linksChecked,pages,issues};
fs.writeFileSync(packagePath('qa','hierarchy-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));assert.equal(issues.length,0,'Hierarchy and preservation checks failed');
