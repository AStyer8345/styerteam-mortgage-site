import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { refineAdvisoryDesign } from '../netlify/functions/lib/refine-advisory-design.js';
const check = process.argv.includes('--check');
let changed = 0;
for (const file of execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(f=>f.endsWith('.html'))) {
  const before=fs.readFileSync(file,'utf8'),after=refineAdvisoryDesign(before);
  if(before===after)continue;
  changed++;
  if(!check)fs.writeFileSync(file,after);
}
if(check&&changed)throw new Error(`${changed} pages need advisory design sync`);
console.log(`Advisory design: ${changed} ${check?'pending':'updated'} pages.`);
