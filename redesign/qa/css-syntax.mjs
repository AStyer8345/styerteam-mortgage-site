import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';import {parseHTML,packagePath} from './runtime.mjs';
const require=createRequire(import.meta.url),CSSOM=require('cssom');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const errors=[];let blocks=0;
function check(css,file){blocks++;try{CSSOM.parse(css);}catch(e){errors.push({file,error:e.message});}}
for(const f of walk(packagePath('site'))){if(f.endsWith('.css'))check(fs.readFileSync(f,'utf8'),path.relative(packagePath('site'),f));if(f.endsWith('.html')){const d=parseHTML(fs.readFileSync(f,'utf8')).document;for(const s of d.querySelectorAll('style'))check(s.textContent,path.relative(packagePath('site'),f)+'#inline');}}
const report={stylesheetsAndInlineBlocks:blocks,errors,scope:'CSS syntax parsing; browser review verifies cascade and layout.'};fs.writeFileSync(packagePath('qa','css-syntax-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
