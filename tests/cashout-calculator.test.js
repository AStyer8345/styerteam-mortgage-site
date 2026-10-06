const {test}=require('node:test');const assert=require('node:assert/strict');const {calculate}=require('../cashout-calculator-core.js');
const example={value:600000,payoff:300000,rent:4800,taxes:7500,insurance:2100,hoa:0,rate:7.5,ltv:75,feePct:2.5,fixedCosts:1500,penalty:0,currentPI:1700,desiredCash:100000,term:30,mode:'ltv'};
const near=(a,b,tolerance=.01)=>assert.ok(Math.abs(a-b)<=tolerance,`${a} versus ${b}`);
test('cash proceeds reconcile and PITIA uses annual taxes/insurance',()=>{const c=calculate(example);assert.equal(c.valid,true);assert.equal(c.loan,450000);assert.equal(c.netCash,137250);near(c.pi,3146.47);near(c.pitia,3946.47);near(c.dscr,1.2163,.0001);assert.equal(c.currentPitia,2500);near(c.paymentChange,1446.47);near(c.rentRemaining,853.53);});
test('zero interest uses principal divided by number of payments',()=>{const c=calculate({...example,rate:0});assert.equal(c.pi,1250);assert.equal(c.pitia,2050);});
test('near-zero positive rates stay finite and match zero-rate limit',()=>{for(const rate of [1e-8,1e-12,1e-15,1e-100,1e-320]){const c=calculate({...example,rate});assert.equal(c.valid,true);assert.ok(Number.isFinite(c.pi));near(c.pi,1250,.001);}});
test('target-cash scenario solves after percentage closing charges',()=>{const c=calculate({...example,mode:'cash',desiredCash:100000});near(c.loan,411794.87179487);near(c.netCash,100000);assert.equal(c.exceedsLtv,false);});
test('cash target above LTV assumption remains visibly flagged',()=>{const c=calculate({...example,mode:'cash',desiredCash:200000});assert.equal(c.exceedsLtv,true);near(c.netCash,200000);assert.ok(c.actualLtv>75);});
test('negative proceeds retain cash needed to close',()=>{const c=calculate({...example,payoff:500000});assert.equal(c.netCash,-62750);});
test('existing penalty and other costs reduce proceeds dollar for dollar',()=>{const c=calculate({...example,penalty:12000,fixedCosts:5000});assert.equal(c.netCash,121750);});
test('monthly HOA counts in PITIA and current payment, not closing costs',()=>{const c=calculate({...example,hoa:200});near(c.pitia,4146.47);assert.equal(c.netCash,137250);assert.equal(c.currentPitia,2700);});
test('zero rent is retained, not treated as a missing field',()=>{const c=calculate({...example,rent:0});assert.equal(c.valid,true);assert.equal(c.dscr,0);assert.ok(c.rentRemaining<0);});
test('blank, negative and nonfinite values do not produce available results',()=>{for(const patch of [{value:''},{payoff:-1},{rate:Infinity},{rent:NaN},{ltv:101},{term:0},{mode:'other'}])assert.equal(calculate({...example,...patch}).valid,false);});
test('no desired cash is necessary in selected-LTV mode',()=>{const x={...example};delete x.desiredCash;assert.equal(calculate(x).valid,true);assert.equal(calculate({...x,mode:'cash'}).valid,false);});
test('ad field limits are respected',()=>{const assets=require('../design-review/Campaign-Ad-Assets.json');for(const c of Object.values(assets)){for(const h of c.heads)assert.ok(h.length<=30,h);for(const d of c.descs)assert.ok(d.length<=90,d);for(const l of c.links)assert.ok(l.length<=25,l);for(const p of c.path.split(' › '))assert.ok(p.length<=15,p);}});
const {snapshot,restore,inputKeys}=require('../cashout-calculator-core.js');
const fs=require('node:fs'), path=require('node:path');
test('cash-out payments match independent discounted-payment oracle across terms and rates',()=>{
 for(const rate of [0,1e-15,.25,7.5,25])for(const term of [15,20,30]){
  const c=calculate({...example,rate,term});let sum=0;for(let k=1;k<=term*12;k++)sum+=Math.pow(1+rate/1200,-k);
  near(c.pi,c.loan/sum,.000001);
 }
});
test('whitespace, malformed numbers and booleans are invalid rather than zero',()=>{
 for(const val of [' ','12bad',false,true,Infinity,NaN])assert.equal(calculate({...example,payoff:val}).valid,false);
});
test('snapshot retains every editable input and calculated result without identity data',()=>{
 const input={...example,mode:'cash',desiredCash:200000,name:'Not stored',email:'not-stored@example.com'};const s=snapshot(input,1234);
 assert.deepEqual(Object.keys(s.inputs),inputKeys);assert.equal(s.inputs.ltv,75);assert.equal(s.inputs.desiredCash,200000);assert.equal(s.inputs.mode,'cash');assert.equal(s.outputs.actualLtv,calculate(input).actualLtv);
 assert.equal(s.version,1);assert.equal(s.kind,'dscr-cash-out');assert.equal(s.at,1234);assert.ok(s.warnings.includes('Target exceeds selected LTV assumption'));
 assert.doesNotMatch(JSON.stringify(s),/Not stored|not-stored/);
});
test('stored results are recomputed and invalid/expired snapshots cannot restore',()=>{
 const s=snapshot(example,1000);s.outputs.netCash=999999;assert.equal(restore(s,2000).outputs.netCash,137250);
 for(const bad of [{...s,version:2},{...s,kind:'dscr'},{...s,at:3000},{...s,inputs:{...s.inputs,value:''}},null])assert.equal(restore(bad,2000),null);
 assert.equal(restore(s,7201001),null);assert.equal(snapshot({...example,value:''}),null);
});
test('cash needed and zero-loan target have neutral explicit warnings',()=>{
 assert.ok(snapshot({...example,payoff:500000}).warnings.includes('Cash needed to close'));
 const s=snapshot({...example,mode:'cash',desiredCash:0,payoff:0,feePct:0,fixedCosts:0,penalty:0,taxes:0,insurance:0,hoa:0});
 assert.equal(s.outputs.loan,0);assert.equal(s.outputs.dscr,null);assert.ok(s.warnings.includes('No new loan modeled'));
});
test('cash-out FAQ markup matches visible answers and retains established form contracts',()=>{
 const html=fs.readFileSync('dscr-cash-out-refinance-texas.html','utf8');
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
 const faq=graph.find(n=>n['@type']==='FAQPage');
 const decode=s=>s.replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
 assert.deepEqual([...html.matchAll(/<details><summary>([^<]*)<\/summary><p>([^<]*)<\/p><\/details>/g)].map(m=>[decode(m[1]),decode(m[2])]),faq.mainEntity.map(q=>[q.name,q.acceptedAnswer.text]));
 for(const token of ['name="contact"','name="inquiry_id"','name="email" required','name="tcpa_consent" required','name="utm_source"','name="first_touch_page"','name="self_reported_source"','/situation-journeys.js','/assets/utm.js','GTM-PQQ6PGLR'])assert.ok(html.includes(token),token);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.ok(html.includes('href="https://styermortgage.com/dscr-cash-out-refinance-texas.html"'));
 assert.doesNotMatch(html,/<meta[^>]*name="robots"[^>]*noindex/);
});
test('cash-out and ad destinations resolve to local public pages and valid anchors',()=>{
 const assets=require('../design-review/Campaign-Ad-Assets.json');
 assert.equal(assets.dscr.pinHeadline1,'Texas DSCR Cash-Out Refinance');
 for(const a of Object.values(assets))for(const url of [a.url,...a.sitelinks.map(s=>s.url)]){
  const [route,anchor]=url.split('#');assert.ok(fs.existsSync('.'+route));if(anchor)assert.ok(fs.readFileSync('.'+route,'utf8').includes('id="'+anchor+'"'),url);
 }
 const html=fs.readFileSync('dscr-cash-out-refinance-texas.html','utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'unique IDs');
 for(const [,href]of html.matchAll(/href="([^"]+)"/g)){if(href.startsWith('#'))assert.ok(ids.includes(href.slice(1)));else if(href.startsWith('/')){let file=href.split('?')[0].split('#')[0];if(file.endsWith('/'))file+='index.html';assert.ok(fs.existsSync('.'+file),href);}}
});
test('internal campaign dashboard cannot enter the public package or sitemap',()=>{
 const sitemap=fs.readFileSync('sitemap.xml','utf8');assert.doesNotMatch(sitemap,/__review|campaign-index|Campaign-Ad-Assets/);
 assert.ok(sitemap.includes('<loc>https://styermortgage.com/dscr-cash-out-refinance-texas.html</loc>'));
 const internal=fs.readFileSync('design-review/campaign-index.html','utf8');assert.match(internal,/noindex,nofollow/);assert.doesNotMatch(internal,/googletagmanager|analytics\.js|<form/);
 if(fs.existsSync('.site-dist')){assert.equal(fs.existsSync('.site-dist/design-review'),false);assert.equal(fs.existsSync('.site-dist/campaign-index.html'),false);}
});
