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
    assert.equal(matchRequest(config, { path: destination }), null, `${destination} must not redirect again`);
    assert.ok(fs.existsSync(path.join(root, destination)), `${destination} must exist`);
    assert.ok(!retired[destination], `${destination} must not be retired`);
    assert.ok(!sitemap.includes(`https://styerteam.com${page}<`), `${page} must leave the sitemap`);
  }
});

test('retired pages are left out of the public package', () => {
  const packager = fs.readFileSync(path.join(root, 'scripts/package-public-site.mjs'), 'utf8');
  assert.match(packager, /retiredPages\.has\(file\)\) return false/);
});
