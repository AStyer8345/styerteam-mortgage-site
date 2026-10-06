const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const html = fs.readFileSync('index.html', 'utf8');
const inventory = JSON.parse(fs.readFileSync('design-review/Page-Inventory.json', 'utf8'));
const baseline = execFileSync('git',['show',`${inventory.releaseBaseline || inventory.baseline}:index.html`],{encoding:'utf8'});
const match = (text,pattern) => text.match(pattern)?.[0];
test('premium homepage preserves every existing metadata tag and JSON-LD block', () => {
  for (const pattern of [/<title[^>]*>[\s\S]*?<\/title>/g,/<meta\b[^>]*>/g,/<link rel="canonical"[^>]*>/g,/<script type="application\/ld\+json">[\s\S]*?<\/script>/g]) {
    assert.deepEqual([...html.matchAll(pattern)].map(m=>m[0]),[...baseline.matchAll(pattern)].map(m=>m[0]));
  }
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
});
test('navigation, footer, inquiry markup and FAQ answers remain byte-identical', () => {
  for (const pattern of [/<header>[\s\S]*?<\/header>/,/<footer\b[\s\S]*?<\/footer>/,/<form name="contact"[\s\S]*?<\/form>/,/<section id="faq"[\s\S]*?<\/section>/]) {
    assert.ok(match(baseline,pattern));assert.equal(match(html,pattern),match(baseline,pattern));
  }
});
test('homepage retains every original link destination, paragraph and capture script', () => {
  const hrefs = text => new Set([...text.matchAll(/href="([^"]+)"/g)].map(m=>m[1]));
  const old = hrefs(baseline), current = hrefs(html);
  for(const href of old) if(!href.startsWith('/modern-homepage.css')) assert.ok(current.has(href),`Missing destination ${href}`);
  const normalize = text => text.replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
  const paragraphs = text => new Set([...text.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m=>normalize(m[1])));
  const retained=paragraphs(html);
  for(const p of paragraphs(baseline)) assert.ok(retained.has(p),`Missing paragraph: ${p.slice(0,80)}`);
  const scriptSources = text => [...text.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1]);
  for(const source of scriptSources(baseline)) assert.ok(scriptSources(html).includes(source),`Missing script ${source}`);
});
test('teaser reuses established calculator math and explains excluded costs', () => {
  const script=fs.readFileSync('premium-homepage.js','utf8');
  assert.match(script,/window\.CalcSuite\.monthlyPayment\(amount,interest,years\)/);
  assert.match(script,/rate\.value\.trim\(\) !== ''/);
  assert.match(script,/interest >= 0 && interest <= 30/);
  assert.match(html,/Taxes, insurance, HOA dues, mortgage insurance, and fees are excluded/);
  assert.match(html,/Example rate is not a quote or an offer to lend/);
  assert.doesNotMatch(script,/fetch\(|sendBeacon|sessionStorage/);
});
