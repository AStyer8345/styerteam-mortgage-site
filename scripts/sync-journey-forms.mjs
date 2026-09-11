import fs from 'node:fs';
import fields from './journey-fields.cjs';
const pages=[['get-preapproved.html','general','Not Sure Yet','No special circumstance'],['scenario.html','general','Not Sure Yet','No special circumstance'],['refinance-quote.html','refinance','Refinance','No special circumstance'],['mortgage-for-business-owners-austin.html','business_owner','Not Sure Yet','Self-employed / business owner'],['investor-loans.html','investment','Invest','Rental income'],['buy-before-you-sell-austin.html','move_up','Buy before selling','No special circumstance']];
const esc=v=>String(v).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
for(const [file,intent,goal,situation] of pages){
 let html=fs.readFileSync(file,'utf8');
 html=html.replace(/<input type="hidden" name="loan_goal"[^>]*>/g,'');
 const controls=fields.map(([name,label,options,goals,situations])=>{
  const id=intent+'-'+name;const value=name==='loan_goal'?goal:name==='income_type'?situation:'';
  const condition=(goals?` data-goals="${esc(goals)}"`:'')+(situations?` data-situations="${esc(situations)}"`:'');
  const input=options?`<select id="${id}" name="${name}">${name==='loan_goal'||name==='income_type'?'':'<option value="">Choose or leave unknown</option>'}${options.map(v=>`<option value="${esc(v)}"${value===v?' selected':''}>${esc(v)}</option>`).join('')}</select>`:`<input id="${id}" name="${name}" type="text" maxlength="160" placeholder="Estimate or leave unknown">`;
  return `<div class="journey-field"${condition}><label for="${id}">${label}</label>${input}</div>`;
 }).join('\n');
 html=html.replace(/data-journey="[^"]+"/,`data-journey="${intent}"`).replace(/name="intent" value="[^"]+"/,`name="intent" value="${intent}"`);
 html=html.replace(/<fieldset data-journey-step="1">[\s\S]*?<\/fieldset>/,`<fieldset data-journey-step="1"><legend>Your plans</legend><div class="journey-fields">${controls}</div><button type="button" class="journey-button journey-submit" data-journey-next hidden>Continue</button></fieldset>`);
 // Contact preference is operational, never treated as marketing enrollment.
 if(!html.includes('name="preferred_follow_up"')) html=html.replace('<div class="journey-form-actions">',`<div class="journey-field"><label for="${intent}-follow-up">How would you prefer to hear from me?</label><select id="${intent}-follow-up" name="preferred_follow_up"><option value="Email">Email</option><option value="Phone">Phone</option></select><p class="journey-hint">For a time-sensitive question, you can also <a href="sms:+15129566010">text Adam</a>.</p></div><div class="journey-form-actions">`);
 if(file==='get-preapproved.html') html=html.replace('Buying a home in Texas','Your mortgage plans · Texas').replace('Buying a home in Austin? Start here.','Tell me what you’re working toward.').replace('Start with a purchase scenario review, whether this is your first home, your next home, or the house you already rent. A pre-approval letter requires a separate application, credit review, and verification.','Buying, refinancing, investing, building, or still sorting it out? Share your goal and what makes your situation different. I’ll help you work through the next step. You do not need to choose a loan program.').replace('understand your purchase plans','understand your mortgage plans');
 html=html.replace('The secure My1003 application collects the details for a formal loan review.','Apply Now opens the secure My1003 portal for a formal loan review.');
 fs.writeFileSync(file,html);
}
