const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process');
const analysis=require('../analysis.js');
test('saved DSCR preserves calculator math including zero interest and dollar down payments',()=>{
 const inputs={price:500000,down:20,downMode:'pct',rate:7.5,years:30,tax:9000,ins:2500,hoa:0,rent:4500};const a=analysis.normalize({kind:'dscr',inputs});assert.ok(Math.abs(a.results.dscr-1.19853)<.001);assert.equal(a.results.remaining,inputs.rent-a.results.pitia);const zero=analysis.normalize({kind:'dscr',inputs:{...inputs,down:100000,downMode:'dollar',rate:0}});assert.equal(zero.results.pi,400000/360);assert.match(analysis.summary(a),/excludes vacancy, repairs, management/);assert.throws(()=>analysis.normalize({kind:'dscr',inputs:{...inputs,down:100}}));
});
test('refinance review preserves comparison and does not invent a break-even with negative savings',()=>{
 const inputs={balance:350000,currentRate:7,currentYears:30,newRate:8,newYears:30,costs:6000};const a=analysis.normalize({kind:'refinance',inputs});assert.equal(a.results.months,null);assert.ok(a.results.savings<0);assert.match(analysis.summary(a),/more total interest/);
});
test('saved analysis strips unrecognized and contact data from its format',()=>{
 const a=analysis.normalize({kind:'dscr',email:'private@example.invalid',inputs:{price:500000,down:20,downMode:'pct',rate:7.5,years:30,tax:9000,ins:2500,hoa:0,rent:4500,email:'private@example.invalid'}});assert.equal(JSON.stringify(a).includes('private@example.invalid'),false);
});
test('established sitemap, robots and canonical destinations are preserved',()=>{
 const baseline='51b16fb745133bd7919f6528a2291d428427bffb';
 const robots=cp.execFileSync('git',['show',baseline+':robots.txt'],{encoding:'utf8'});assert.equal(fs.readFileSync('robots.txt','utf8'),robots);
 const beforeSitemap=cp.execFileSync('git',['show',baseline+':sitemap.xml'],{encoding:'utf8'}),afterSitemap=fs.readFileSync('sitemap.xml','utf8');
 const entries=s=>new Map([...s.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>[m[1].match(/<loc>([^<]+)<\/loc>/)[1],m[1].replace(/<lastmod>[^<]+<\/lastmod>/g,'<lastmod/>')]));
 const previous=entries(beforeSitemap),current=entries(afterSitemap);
 for(const [url,entry] of previous)assert.equal(current.get(url),entry,url+' must preserve its existing sitemap entry');
 for(const url of current.keys()){if(previous.has(url))continue;const path=new URL(url).pathname;assert.ok(path.startsWith('/scenarios/'),url);const html=fs.readFileSync('.'+path,'utf8');assert.ok(html.includes('href="'+url+'"'),url+' must be canonical');assert.doesNotMatch(html,/<meta[^>]*name="robots"[^>]*noindex/);}
 const changed=cp.execFileSync('git',['diff','4ba6c443a8f34972b15d38c5a399a5c74dcb5ed2','--name-only','--diff-filter=M'],{encoding:'utf8'}).trim().split('\n').filter(f=>f.endsWith('.html'));for(const file of changed){const before=cp.execFileSync('git',['show','4ba6c443a8f34972b15d38c5a399a5c74dcb5ed2:'+file],{encoding:'utf8'});const after=fs.readFileSync(file,'utf8');const canonical=before.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0];if(canonical)assert.ok(after.includes(canonical),file);}
});
test('private page never loads analytics or public assistant and blocks injected third-party scripts',()=>{
 const html=fs.readFileSync('saved-analysis.html','utf8');assert.match(html,/noindex, nofollow/);assert.match(html,/script-src 'self'/);assert.doesNotMatch(html,/analytics\.js|script\.js|googletagmanager|assistant-widget|experience\.js/);assert.doesNotMatch(fs.readFileSync('sitemap.xml','utf8'),/saved-analysis/);
});
test('public templates include shared styling, behavior and Apply Now',()=>{
 for(const file of ['blog-page-builder.js','realtor-page-builder.js','page-builder.js','rate-page-builder.js']){const s=fs.readFileSync('netlify/functions/lib/'+file,'utf8');assert.match(s,/experience\.css/);assert.match(s,/experience\.js/);assert.match(s,/class="nav-cta nav-apply"/);}
});
