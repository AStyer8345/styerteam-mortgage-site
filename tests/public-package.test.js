const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const packager = fs.readFileSync(path.join(__dirname, '../scripts/package-public-site.mjs'));
function fixture(fn) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'styer-package-'));
  const put = (name, value) => { const file = path.join(root, name); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, value); };
  try {
    put('scripts/package-public-site.mjs', packager);
    put('scripts/admin-paths.json', '["dashboard.html"]');
    put('scripts/public-release-files.json', '["editorial-polish.css"]');
    put('index.html', '<link href="/editorial-polish.css" rel="stylesheet">');
    put('editorial-polish.css', 'body{color:black}');
    put('dashboard.html', 'PRIVATE');
    put('.env', 'PRIVATE');
    put('local-draft.html', 'UNREVIEWED');
    execFileSync('git', ['init', '-q'], { cwd: root });
    execFileSync('git', ['add', 'index.html', 'dashboard.html', '.env'], { cwd: root });
    fn({ root, put, run: () => spawnSync(process.execPath, ['scripts/package-public-site.mjs'], { cwd: root, encoding: 'utf8' }) });
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
}
test('packages explicitly reviewed files while excluding private and unreviewed files', () => fixture(({root, run}) => {
  assert.equal(run().status, 0);
  assert(fs.existsSync(path.join(root, '.site-dist/editorial-polish.css')));
  for (const name of ['dashboard.html', '.env', 'local-draft.html', 'scripts']) assert(!fs.existsSync(path.join(root, '.site-dist', name)));
}));
test('missing release file fails before replacing an existing package', () => fixture(({root, put, run}) => {
  put('.site-dist/sentinel.txt', 'previous package');
  fs.unlinkSync(path.join(root, 'editorial-polish.css'));
  const result = run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Required public release file/);
  assert.equal(fs.readFileSync(path.join(root, '.site-dist/sentinel.txt'), 'utf8'), 'previous package');
}));
test('unpackaged referenced assets fail the build', () => fixture(({put, run}) => {
  put('index.html', '<script defer src="/missing.js?v=1"></script>');
  const result = run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Public asset missing from package/);
}));
