const test = require('node:test');
const assert = require('node:assert/strict');

const page = '<html class="js"><head></head><body class="guide"><header id="top"><a class="logo">x</a></header><main>'
  + '<section class="hero"><h1>T</h1><p class="lead">L</p></section><section class="second"><h2>S</h2></section>'
  + '<section class="third"><table class="rates"><tr><td>1</td></tr></table></section></main><footer class="foot"></footer></body></html>';

test('minifyCss strips comments and spare whitespace but never edits strings', async () => {
  const { minifyCss } = await import('../scripts/critical-css.mjs');
  assert.equal(minifyCss('/* a */ .a , .b { color : red ; }\n.c::after{content:"a  ;  b"}'), '.a ,.b{color : red}.c::after{content:"a  ;  b"}');
  assert.equal(minifyCss('.a{width:calc(1px + 2px)}'), '.a{width:calc(1px + 2px)}');
});

test('criticalCss keeps first-screen rules in order and drops the rest', async () => {
  const { criticalCss } = await import('../scripts/critical-css.mjs');
  const css = ':root{--x:1}.hero{a:1}.third{a:2}.hero .lead,.rates td{a:3}table{a:4}.foot{a:5}'
    + '@media (min-width:1px){.second h2{a:6}.third{a:7}}@media print{.hero{a:8}}@keyframes k{from{a:9}}'
    + '@font-face{font-family:F;src:url(/f.woff2)}.hero:not(.dark):hover{a:10}body.guide .hero:has(.missing){a:11}#top a.logo{a:12}#gone{a:13}';
  assert.equal(criticalCss(css, page),
    ':root{--x:1}.hero{a:1}.hero .lead{a:3}@media (min-width:1px){.second h2{a:6}}'
    + '@font-face{font-family:F;src:url(/f.woff2)}.hero:not(.dark):hover{a:10}body.guide .hero:has(.missing){a:11}#top a.logo{a:12}');
});

test('criticalCss declines pages it cannot read', async () => {
  const { criticalCss } = await import('../scripts/critical-css.mjs');
  assert.equal(criticalCss('.a{b:c}', '<p>fragment</p>'), null);
});
