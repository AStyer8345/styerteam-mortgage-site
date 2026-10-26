const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {execFileSync} = require('node:child_process');

test('public pages, assets and publishing responses do not restore the former affiliation', () => {
  const publicDirs = new Set(['assets','css','js','blog','loans','rates','realtor-updates','resources','scenarios','updates','downloads']);
  const privateFiles = new Set(JSON.parse(fs.readFileSync('scripts/admin-paths.json','utf8')));
  const files = execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
  const issues = [];
  for (const file of files) {
    if (privateFiles.has(file) || file.includes('/originals/') || file.includes('_TEMPLATE')) continue;
    const parts = file.split('/');
    const published = parts.length === 1 || publicDirs.has(parts[0]) || file.startsWith('netlify/functions/') || file.startsWith('ai-knowledge/');
    if (!published || (!/\.(?:html|js|ts|mts|css|json|svg|xml|txt|toml)$/.test(file) && file !== '_redirects')) continue;
    if (parts.length === 1 && !/\.(?:html|js|css|svg|xml|txt|toml)$/.test(file) && file !== '_redirects') continue;
    const content = fs.readFileSync(file,'utf8');
    if (/hyper.?smart|kyber|2653540/i.test(content)) issues.push(file + ': former employer identity');
    if (/https?:\/\/[^"'<>\r\n]*my1003app\.com/i.test(content)) issues.push(file + ': retired application host');
  }
  assert.deepEqual(issues, []);
  for (const file of ['index.html','contact.html','scenario.html','thank-you.html']) {
    const html=fs.readFileSync(file,'utf8');
    assert.ok(html.includes('https://styermortgage.com/contact.html'),file);
    assert.ok(html.includes('513013'),file);
  }
});
