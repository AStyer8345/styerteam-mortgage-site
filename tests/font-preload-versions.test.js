const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

function preloadHref(html) {
  return html.match(/<link\b[^>]*rel=["']preload["'][^>]*>/i)[0].match(/href=["']([^"']+)["']/i)[1];
}

function fontUrls(css) {
  return [...css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi)].map(match => match[2].trim());
}

test('published font preloads use the same versioned URL as the shipped CSS', () => {
  const root = process.cwd();
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'font-preload-'));
  const dist = path.join(temporary, '.site-dist');
  try {
    fs.mkdirSync(path.join(dist, 'assets/fonts'), { recursive: true });
    fs.writeFileSync(path.join(dist, 'assets/fonts/inter-normal-6.woff2'), 'font-bytes');
    fs.writeFileSync(path.join(dist, 'assets/fonts/site-fonts.css'), '@font-face{font-family:Inter;src:url(/assets/fonts/inter-normal-6.woff2) format("woff2")}');
    for (const name of ['a.css', 'b.css', 'c.css']) fs.writeFileSync(path.join(dist, name), 'body{color:#111}');
    fs.writeFileSync(path.join(dist, 'rates.html'), `<!DOCTYPE html><html><head>
<link rel="preload" href="/assets/fonts/inter-normal-6.woff2" as="font" type="font/woff2" crossorigin="">
<link href="/a.css" rel="stylesheet">
<link href="/b.css" rel="stylesheet">
<link href="/c.css" rel="stylesheet">
<link href="/assets/fonts/site-fonts.css" rel="stylesheet">
</head><body></body></html>`);
    fs.writeFileSync(path.join(dist, 'inline.html'), `<!DOCTYPE html><html><head>
<link rel="preload" href="/assets/fonts/inter-normal-6.woff2" as="font" type="font/woff2" crossorigin="">
<style>@font-face{font-family:Inter;src:url(/assets/fonts/inter-normal-6.woff2) format("woff2")}</style>
</head><body></body></html>`);

    execFileSync(process.execPath, [path.join(root, 'scripts/optimize-published-assets.mjs')], { cwd: temporary });

    const rates = fs.readFileSync(path.join(dist, 'rates.html'), 'utf8');
    const bundleHref = rates.match(/href="(\/assets\/bundles\/styles-[^"]+\.css[^"]*)"/)[1].split('?')[0];
    const bundle = fs.readFileSync(path.join(dist, bundleHref.slice(1)), 'utf8');
    const ratesPreload = preloadHref(rates);
    assert.match(ratesPreload, /^\/assets\/fonts\/inter-normal-6\.woff2\?v=[0-9a-f]{10}$/);
    assert.ok(fontUrls(bundle).includes(ratesPreload), bundle);

    const inline = fs.readFileSync(path.join(dist, 'inline.html'), 'utf8');
    const inlinePreload = preloadHref(inline);
    assert.equal(inlinePreload, ratesPreload);
    assert.ok(fontUrls(inline).includes(inlinePreload), inline);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
