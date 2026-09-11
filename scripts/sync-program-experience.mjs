import fs from 'node:fs';
import fields from './journey-fields.cjs';

// Loan pages use one rendered layout and the existing scenario capture component.
// Preserve each established form name and all educational content below the hero.
const pages=JSON.parse(fs.readFileSync('scripts/program-experience.json','utf8'));
const template=fs.readFileSync('scripts/program-review-card.template','utf8');
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const defaults={business_owner:['Not Sure Yet','Self-employed / business owner'],investment:['Invest','Rental income'],construction:['Build','No special circumstance'],assets:['Not Sure Yet','Substantial assets'],general:['Not Sure Yet','No special circumstance']};
let count=0;
for(const page of pages){
 const [goal,situation]=defaults[page.context];
 const controls=fields.map(([name,label,options,goals,situations])=>{
  const id='program-'+name,value=name==='loan_goal'?goal:name==='income_type'?situation:'';
  const condition=(goals?` data-goals="${escape(goals)}"`:'')+(situations?` data-situations="${escape(situations)}"`:'');
  const input=options?`<select id="${id}" name="${name}">${name==='loan_goal'||name==='income_type'?'':'<option value="">Choose or leave unknown</option>'}${options.map(v=>`<option value="${escape(v)}"${value===v?' selected':''}>${escape(v)}</option>`).join('')}</select>`:`<input id="${id}" name="${name}" type="text" maxlength="160" placeholder="Estimate or leave unknown">`;
  return `<div class="journey-field"${condition}><label for="${id}">${label}</label>${input}</div>`;
 }).join('\n');
 const card=template.replaceAll('business-owner-scenario',page.formName).replaceAll('business_owner',page.context)
  .replace(/<fieldset data-journey-step="1">[\s\S]*?<\/fieldset>/,`<fieldset data-journey-step="1"><legend>Your plans</legend><div class="journey-fields">${controls}</div><button type="button" class="journey-button journey-submit" data-journey-next hidden>Continue</button></fieldset>`);
 const hero=`<section class="journey-hero program-always-visible program-experience" aria-labelledby="journey-title">
 <div class="container journey-grid">
  <div class="journey-copy">
   <p class="journey-eyebrow">Texas mortgage options · Adam Styer</p>
   <h1 id="journey-title">${page.title}</h1>
   ${page.paragraphs.map(p=>`<p class="journey-intro">${p}</p>`).join('\n   ')}
   <div class="journey-actions"><a class="journey-button journey-primary" href="#scenario-review" data-track="send_scenario_click">Send Your Scenario</a><a class="journey-button journey-secondary" href="https://calendly.com/adamstyer/15minutes" target="_blank" rel="noopener">Book a Call</a></div>
   <p class="journey-contact"><a href="tel:+15129566010">Call (512) 956-6010</a> <span aria-hidden="true">·</span> <a href="sms:+15129566010">Text Adam</a></p>
   <div class="journey-path-note"><p>Tell me what you’re trying to do. I’ll review your goal, income situation, and timing. You don’t need to choose a loan program first.</p></div>
   <p class="journey-byline">Adam Styer · NMLS #513013<br>HyperSmart Home Loans · Company NMLS #2653540${page.updated?`<br>Last updated: ${page.updated}`:''}</p>
  </div>
  ${card}
 </div>
</section>`;
 const original=fs.readFileSync(page.file,'utf8');
 let html=original.replace(/<section class="(?:hero|journey-hero program-always-visible program-experience)"[^>]*>[\s\S]*?<\/section>/,hero);
 html=html.replace(/<body([^>]*)>/,(_,attrs)=>`<body${attrs.replace(/ data-situation-page="[^"]*"/,'')} data-situation-page="${page.context}">`);
 if(!html.includes('href="/situation-journeys.css"'))html=html.replace('<link rel="stylesheet" href="/experience.css">','<link rel="stylesheet" href="/situation-journeys.css">\n<link rel="stylesheet" href="/experience.css">');
 for(const src of ['/assets/utm.js','/situation-journeys.js'])if(!html.includes(`src="${src}"`))html=html.replace('<script src="/experience.js"',`<script src="${src}" defer></script>\n<script src="/experience.js"`);
 if(html!==original){count++;if(!process.argv.includes('--check'))fs.writeFileSync(page.file,html);}
}
if(process.argv.includes('--check')&&count)throw new Error(`${count} loan pages need layout sync`);
console.log(`Shared loan layout: ${pages.length} pages; ${count} ${process.argv.includes('--check')?'pending':'updated'}.`);
