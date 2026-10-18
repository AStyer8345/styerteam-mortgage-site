import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';
import {parseHTML,packagePath} from './runtime.mjs';
const root=path.resolve(process.argv[2]||packagePath('site')),issues=[],seen=new Set();
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]);
function check(raw,file,kind){if(!raw||raw.startsWith('#')||/^(data:|blob:|https?:|\/\/)/i.test(raw))return;
 let url;try{url=new URL(raw,'https://local.test/'+path.relative(root,file));}catch{return;}
 if(url.hostname!=='local.test')return;const target=path.join(root,decodeURIComponent(url.pathname));
 if(!fs.existsSync(target))issues.push({file:path.relative(root,file),kind,url:raw});seen.add(target);
}
for(const file of walk(root)){
 if(file.endsWith('.html')){const d=parseHTML(fs.readFileSync(file,'utf8')).document;for(const e of d.querySelectorAll('script[src],img[src],source[src],video[src],audio[src],iframe[src],link[rel="stylesheet"][href],link[rel="icon"][href]'))check(e.getAttribute('src')||e.getAttribute('href'),file,'asset');}
 if(file.endsWith('.css'))for(const match of fs.readFileSync(file,'utf8').matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g))check(match[1],file,'css-url');
}
const result={root,assetsChecked:seen.size,issues};fs.writeFileSync(packagePath('qa','asset-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));process.exitCode=issues.length?1:0;
