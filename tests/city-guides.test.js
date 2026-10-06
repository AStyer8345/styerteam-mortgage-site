const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const decode = s => s.replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const home = fs.readFileSync('index.html','utf8');
const sitemap = fs.readFileSync('sitemap.xml','utf8');
for (const city of ['dallas','san-antonio']) {
  const filename = `${city}-mortgage-lender.html`;
  const html = fs.readFileSync(filename,'utf8');
  test(`${city} guide is discoverable and has accurate, visible structured answers`, () => {
    const url = `https://styermortgage.com/${filename}`;
    assert.ok(home.includes(`href="/${filename}"`));
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`));
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const service = graph.find(n=>n['@type']==='Service');
    assert.equal(service.provider['@id'],'https://styermortgage.com/#business');
    assert.equal(service.areaServed['@type'],'City');
    assert.equal(service.address,undefined);
    assert.equal(service.geo,undefined);
    assert.equal(service.provider.address,undefined);
    const faq = graph.find(n=>n['@type']==='FAQPage').mainEntity.map(n=>[n.name,n.acceptedAnswer.text]);
    const visible = [...html.matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(m=>[decode(m[1]),decode(m[2])]);
    assert.deepEqual(visible,faq);
    assert.ok(html.includes('Austin-based'));
  });
  test(`${city} guide keeps a valid path to existing intake and real local content targets`, () => {
    assert.ok(html.includes('href="/get-preapproved.html?intent=scenario"'));
    assert.equal((html.match(/<form\b/g)||[]).length,0,'Reuse established intake rather than creating an unverified form');
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
    for(const [,href] of html.matchAll(/href="([^"]+)"/g)) {
      if(href.startsWith('#')) {assert.ok(ids.has(href.slice(1)),`Missing anchor ${href}`);continue;}
      if(!href.startsWith('/'))continue;
      const pathname = new URL(decode(href),'https://styermortgage.com').pathname;
      const file = pathname.endsWith('/') ? pathname+'index.html' : pathname;
      assert.ok(fs.existsSync(path.join(process.cwd(),file.slice(1))),`Missing local destination ${href}`);
    }
  });
}
