const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const root = path.join(__dirname, '..');
const retired = JSON.parse(fs.readFileSync(path.join(root, 'scripts/retired-pages.json'), 'utf8'));

test('every retired page returns exactly one 301 to a live page', async () => {
  const { buildConfig, matchRequest } = await import('../scripts/vercel-config.mjs');
  const config = buildConfig();
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  for (const [page, destination] of Object.entries(retired)) {
    for (const source of [page, page.replace(/\.html$/, '')]) {
      const hop = matchRequest(config, { path: source });
      assert.deepEqual(hop && [hop.status, hop.destination], [301, destination], source);
    }
    const [target, anchor] = destination.split('#');
    assert.equal(matchRequest(config, { path: target }), null, `${target} must not redirect again`);
    assert.ok(fs.existsSync(path.join(root, target)), `${target} must exist`);
    assert.ok(!retired[target], `${target} must not be retired`);
    if (anchor) assert.match(fs.readFileSync(path.join(root, target), 'utf8'), new RegExp(`id="${anchor}"`), `${destination} anchor must exist`);
    assert.ok(!sitemap.includes(`https://styerteam.com${page}<`), `${page} must leave the sitemap`);
  }
});

test('no other redirect lands on a retired page, and no public page links to one', async () => {
  const { buildConfig } = await import('../scripts/vercel-config.mjs');
  for (const rule of buildConfig().redirects) {
    assert.ok(!retired[rule.destination.replace(/^https:\/\/styerteam\.com/, '').split('#')[0]], `${rule.source} -> ${rule.destination}`);
  }
  const { execFileSync } = require('node:child_process');
  const pages = execFileSync('git', ['ls-files', '*.html'], { cwd: root, encoding: 'utf8' }).split('\n')
    .filter((file) => file && !retired[`/${file}`] && !/^(?:_archive|run-logs|design-review|docs|audits|tasks)\//.test(file));
  for (const file of pages) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    for (const page of Object.keys(retired)) {
      assert.ok(!html.includes(`href="${page}"`) && !html.includes(`href="${page}#`), `${file} links to retired ${page}`);
    }
  }
});

test('retired pages are left out of the public package', () => {
  const packager = fs.readFileSync(path.join(root, 'scripts/package-public-site.mjs'), 'utf8');
  assert.match(packager, /retiredPages\.has\(file\)\) return false/);
});
