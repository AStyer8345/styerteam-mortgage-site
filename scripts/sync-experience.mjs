import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Additive, repeatable publishing rule. Keeps the page body, URLs and SEO intact.
const application = 'https://hypersmart.my1003app.com/513013/register?time=1779291829279';
const apply = `<li><a href="${application}" class="nav-cta nav-apply" target="_blank" rel="noopener" aria-label="Apply Now — opens the secure application portal">Apply Now</a></li>`;
const style = '<link rel="stylesheet" href="/experience.css">';
const behavior = '<script src="/experience.js" defer></script>';
const files = execFileSync('git', ['ls-files','-z'], { encoding:'utf8' }).split('\0').filter(f=>f.endsWith('.html') || /netlify\/functions\/lib\/(blog|realtor|rate)?-?page-builder\.js$/.test(f));
let changed = 0;
export function refine(html) {
  if (!/class="nav-links"|class="site-header lp-header"/.test(html)) return html;
  if (!html.includes('/experience.css')) html = html.replace('</head>', style+'\n</head>');
  if (!html.includes('/experience.js')) html = html.replace('</body>', behavior+'\n</body>');
  html = html.replace(/<a\b([^>]*href="https:\/\/[^" ]*my1003app\.com[^" ]*"[^>]*)>([\s\S]*?)<\/a>/g, (_, attrs, content) => `<a${attrs.replace(/aria-label="[^"]*"/g,'').trimEnd()} aria-label="Apply Now — opens the secure application portal">${/<h3/.test(content)?content.replace(/(<h3[^>]*>)[\s\S]*?(<\/h3>)/,'$1Apply Now$2').replace(/(<span class="ty-alt-card-cta">)[\s\S]*?(<\/span>)/,'$1Open secure portal →$2'):'Apply Now'}</a>`);
  html = html.replace(/<a\b([^>]*href="https:\/\/calendly\.com\/adamstyer\/15minutes[^" ]*"[^>]*)>([\s\S]*?)<\/a>/g, (_, attrs, content) => `<a${attrs}>${/<h3/.test(content)?content.replace(/(<h3[^>]*>)[\s\S]*?(<\/h3>)/,'$1Book a Call$2'):'Book a Call'}</a>`);
  html = html.replace(/(<a\b[^>]*href="tel:[^"]+"[^>]*>)([\s\S]*?)(<\/a>)/g, (_,a,b,c)=>a+b.replace(/Call or Text/gi,'Call')+c);
  html = html.replace(/aria-label="Call or Text Adam"/g,'aria-label="Call Adam"');
  html = html.replace(/<a href="\/scenario.html" class="nav-cta">Send Your Scenario<\/a>/g,'<a href="/get-preapproved.html?intent=scenario" class="nav-cta">Send Your Scenario</a>');
  if (html.includes('class="nav-links"') && !html.includes('class="nav-cta nav-apply"')) {
    const start=html.indexOf('<ul class="nav-links"'), end=html.indexOf('</nav>',start), close=html.lastIndexOf('</ul>',end);
    html=html.slice(0,close)+apply+'\n'+html.slice(close);
  }
  if (html.includes('class="site-header lp-header"') && !html.includes('class="experience-header-actions"')) {
    html=html.replace('</nav>',`<div class="experience-header-actions"><a href="tel:+15129566010">Call Adam</a><a href="${application}" class="nav-cta nav-apply" target="_blank" rel="noopener" aria-label="Apply Now — opens the secure application portal">Apply Now</a></div></nav>`);
  }
  return html;
}
for(const file of files){const original=fs.readFileSync(file,'utf8');const updated=refine(original);if(original!==updated){changed++;if(!process.argv.includes('--check'))fs.writeFileSync(file,updated);}}
if(process.argv.includes('--check') && changed){console.error(`${changed} public pages or templates need experience sync`);process.exitCode=1;}
else console.log(`Experience sync: ${changed} files ${process.argv.includes('--check')?'need updates':'updated'}.`);
