const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const guide = fs.readFileSync('resources/detailed-guides/how-much-house-can-i-afford-austin.html', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');

test('the affordability guide canonical points at the program page and leaves the sitemap', () => {
  assert.match(guide, /<link href="https:\/\/styerteam\.com\/how-much-house-can-i-afford-austin\.html" rel="canonical"\/>/);
  assert.doesNotMatch(guide, /rel="canonical"[^>]+detailed-guides\/how-much-house/);
  assert.doesNotMatch(sitemap, /detailed-guides\/how-much-house-can-i-afford-austin\.html/);
  assert.match(sitemap, /<loc>https:\/\/styerteam\.com\/how-much-house-can-i-afford-austin\.html<\/loc>/);
});

function headings(html) {
  const visible = html.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  return [...visible.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
  }));
}

test('the business-owner licensing block is a styled footer inside one landmark, and USDA has a honeypot', () => {
  const page = fs.readFileSync('resources/mortgage-options-for-business-owners.html', 'utf8');
  const body = page.split('</body>')[0];
  assert.equal((body.match(/<footer\b/g) || []).length, 2);
  assert.match(body, /<section aria-label="Office and licensing details"><footer class="site-footer" id="site-footer-details">[\s\S]*Licensing notice/);
  assert.match(body, /<footer class="site-footer" id="site-footer">/);
  const usda = fs.readFileSync('loans/usda.html', 'utf8');
  assert.match(usda, /<form[^>]*id="hero-quick-form"[^>]*netlify-honeypot="bot-field"/);
  assert.match(usda, /name="bot-field"/);
});

test('every blog post has one H1 and it is the visible post title', () => {
  const dir = 'blog';
  const files = fs.readdirSync(dir).filter((name) => name.endsWith('.html'));
  assert.ok(files.length > 40);
  for (const name of files) {
    const html = fs.readFileSync(path.join(dir, name), 'utf8');
    const tags = headings(html);
    const h1s = tags.filter((tag) => tag.level === 1);
    assert.equal(h1s.length, 1, name);
    assert.ok(h1s[0].text.length > 8, name);
    const main = html.split('<main').slice(1).join('<main');
    assert.match(main, /<h1\b/, name);
    const first = tags[0];
    assert.equal(first.level, 1, `${name} starts at h${first.level}`);
  }
});
