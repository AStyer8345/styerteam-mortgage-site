import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const destination=process.argv[2];
if(!destination||!path.isAbsolute(destination)||(fs.existsSync(destination)&&!process.argv.includes('--refresh')))throw new Error('Supply a new absolute preview directory outside the checkout (or --refresh for your generated preview).');
if(path.resolve(destination).startsWith(process.cwd()+path.sep)||path.resolve(destination)===process.cwd())throw new Error('Preview output must be outside the checkout.');
fs.mkdirSync(destination,{recursive:true});
const files=[...new Set([...execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0'),...execFileSync('git',['ls-files','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0')])];
const csp="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'";
for(const file of files){
 if(!/\.(html|css|js|svg|png|jpe?g|webp|ico|json|xml|txt|woff2?)$/.test(file)||/^(netlify|tests|scripts|run-logs|seo-data|\.git|node_modules|patches)\//.test(file)||['package-lock.json','package.json'].includes(file)||/^(dashboard|ops|loanos|marketing-|loan-dashboard|forms)\b/.test(file))continue;
 if(!fs.existsSync(file)||!fs.statSync(file).isFile())continue;
 const out=path.join(destination,file);fs.mkdirSync(path.dirname(out),{recursive:true});
 if(file.endsWith('.html')){
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/\s(?:data-netlify|netlify)="[^"]*"/g,'').replace(/\snetlify(?=[\s>])/g,'').replace(/netlify-honeypot="[^"]*"/g,'');
  if(file!=='saved-analysis.html')html=html.replace(/<head[^>]*>/,m=>m+`<meta name="robots" content="noindex,nofollow"><meta http-equiv="Content-Security-Policy" content="${csp}"><script src="/preview-guard.js"></script>`);
  // Public preview must never accept native form submissions into live Forms.
  html=html.replace(/<form\b/g,'<form data-preview-form');
  fs.writeFileSync(out,html);
 }else fs.copyFileSync(file,out);
}
fs.writeFileSync(path.join(destination,'preview-guard.js'),`(function(){var original=window.fetch;window.fetch=function(resource,options){var url=new URL(typeof resource==='string'?resource:resource.url,location.href),method=(options&&options.method||'GET').toUpperCase();if(url.origin!==location.origin)return Promise.reject(new Error('External requests disabled in preview'));if(method!=='GET'&&!['/api/saved-analysis','/.netlify/functions/lead-intake'].includes(url.pathname))return Promise.resolve(new Response(JSON.stringify({preview:true,error:'Disabled in preview'}),{status:405,headers:{'Content-Type':'application/json'}}));return original(resource,options);};document.addEventListener('submit',function(e){e.preventDefault();if(!e.target.matches('[data-journey]')){var p=document.createElement('p');p.setAttribute('role','status');p.textContent='Preview only. No message, lead or subscription was sent.';e.target.after(p);}},true);document.addEventListener('DOMContentLoaded',function(){var note=document.createElement('div');note.textContent='REVIEW PREVIEW · Submissions are simulated. No leads or emails are sent.';note.style.cssText='padding:8px 16px;text-align:center;background:#fff1cb;color:#493b13;font:500 13px/1.5 system-ui';document.body.prepend(note);});})();`);
fs.mkdirSync(path.join(destination,'functions'),{recursive:true});
fs.copyFileSync('netlify/functions/saved-analysis.ts',path.join(destination,'functions/saved-analysis.ts'));
fs.writeFileSync(path.join(destination,'functions/lead-intake.ts'),`export default async(request:Request)=>{if(request.method!=='POST')return new Response('',{status:405});let body;try{body=await request.json()}catch{return new Response('',{status:400})}return Response.json({captured:true,preview:true,inquiry_id:body.inquiry_id,ownerNotified:false,automationAccepted:false},{headers:{'Cache-Control':'no-store'}});};`);
fs.writeFileSync(path.join(destination,'package.json'),JSON.stringify({private:true,dependencies:{'@netlify/blobs':'^8.1.0'},devDependencies:{'@netlify/functions':'^5.3.0'}}));
fs.writeFileSync(path.join(destination,'netlify.toml'),`[build]\n  publish = "."\n[build.processing.html]\n  pretty_urls = false\n[functions]\n  directory = "functions"\n  node_bundler = "esbuild"\n[functions."saved-analysis"]\n  external_node_modules = ["@netlify/blobs"]\n[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n    Referrer-Policy = "no-referrer"\n    Content-Security-Policy = "${csp}"\n[[headers]]\n  for = "/saved-analysis.html"\n  [headers.values]\n    Cache-Control = "private, no-store"\n    Content-Security-Policy = "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'"\n`);
fs.writeFileSync(path.join(destination,'robots.txt'),'User-agent: *\nDisallow: /\n');
console.log(destination);
