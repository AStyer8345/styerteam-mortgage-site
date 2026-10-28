const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

test('packaged homepage preserves content, capture, analytics and CSS cascade', () => {
  const root = process.cwd();
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'homepage-performance-'));
  try {
    const original = fs.readFileSync('index.html', 'utf8');
    fs.mkdirSync(path.join(temporary, '.site-dist'));
    fs.mkdirSync(path.join(temporary, 'assets/fonts'), { recursive: true });
    fs.writeFileSync(path.join(temporary, '.site-dist/index.html'), original);
    fs.copyFileSync('assets/fonts/inter.css', path.join(temporary, 'assets/fonts/inter.css'));
    const styles = [...original.matchAll(/<link\b[^>]*href="([^"]+\.css(?:\?[^"]*)?)"[^>]*>/g)]
      .map(match => match[1].split('?')[0].replace(/^\//, ''))
      .filter(file => !file.startsWith('http'));
    for (const file of new Set(styles)) fs.copyFileSync(file, path.join(temporary, file));
    execFileSync(process.execPath, [path.join(root, 'scripts/optimize-homepage.mjs')], { cwd: temporary });
    const optimized = fs.readFileSync(path.join(temporary, '.site-dist/index.html'), 'utf8');
    assert.equal(optimized.slice(optimized.indexOf('<body')), original.slice(original.indexOf('<body')));
    for (const pattern of [/<script\b[\s\S]*?<\/script>/g, /<meta\b[^>]*>/g, /<title>.*?<\/title>/g, /<link rel="canonical"[^>]*>/g]) {
      assert.deepEqual(optimized.match(pattern), original.match(pattern));
    }
    const inlined = [...optimized.matchAll(/<style data-homepage-style="([^"]+)">([\s\S]*?)<\/style>/g)];
    assert.deepEqual(inlined.map(match => match[1]), [...new Set(styles)]);
    for (const [, file, css] of inlined) assert.equal(css, fs.readFileSync(file, 'utf8'));
    assert.ok(!optimized.includes('fonts.googleapis.com'));
    assert.ok(!optimized.includes('fonts.gstatic.com'));
    assert.match(optimized, /rel="preload" as="font"[^>]+source-serif/);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
