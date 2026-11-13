const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const { gtmSnippet } = require('../scripts/gtm-snippet.cjs');
const html = fs.readFileSync('index.html', 'utf8');
test('the shared GTM snippet is what production pages and page builders use', () => {
  assert.ok(html.includes(gtmSnippet));
  for (const file of ['netlify/functions/lib/page-builder.js', 'netlify/functions/lib/blog-page-builder.js', 'netlify/functions/lib/rate-page-builder.js', 'netlify/functions/lib/realtor-page-builder.js']) {
    assert.ok(fs.readFileSync(file, 'utf8').includes(gtmSnippet), file);
  }
});
const code = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((source) => source.includes('StyerAfterGoogleTag'));

function run(hostname, { pathname = '/', readyState = 'loading' } = {}) {
  const scripts = [];
  const dataLayer = [];
  const listeners = {};
  const timers = [];
  const sandbox = {
    location: { hostname, pathname },
    window: {},
    document: {
      readyState,
      getElementsByTagName: () => [{ parentNode: { insertBefore: (node) => scripts.push(node) } }],
      createElement: () => ({}),
    },
    addEventListener: (type, fn) => { (listeners[type] = listeners[type] || []).push(fn); },
    removeEventListener: (type, fn) => { listeners[type] = (listeners[type] || []).filter((item) => item !== fn); },
    setTimeout: (fn, ms) => { timers.push({ fn, ms }); },
    setInterval,
    clearInterval,
  };
  sandbox.window = sandbox;
  sandbox.window.dataLayer = dataLayer;
  vm.runInNewContext(code, sandbox);
  const fire = (type) => (listeners[type] || []).slice().forEach((fn) => fn());
  return { scripts, dataLayer, listeners, timers, fire, window: sandbox.window };
}

test('production pages queue events at once and load GTM late, only once', () => {
  const first = run('styerteam.com');
  assert.equal(first.scripts.length, 0, 'GTM must not load before first paint');
  assert.ok(Array.isArray(first.window.dataLayer));
  assert.equal(typeof first.window.StyerAfterGoogleTag, 'function');
  first.fire('load');
  assert.deepEqual(first.timers.map((timer) => timer.ms), [2500]);
  first.timers[0].fn();
  assert.equal(first.scripts.length, 1);
  assert.equal(first.scripts[0].src, 'https://www.googletagmanager.com/gtm.js?id=GTM-PQQ6PGLR');
  assert.equal(first.scripts[0].async, true);
  assert.equal(first.dataLayer[0].event, 'gtm.js');
  first.timers[0].fn();
  vm.runInNewContext(code, first.window);
  assert.equal(first.scripts.length, 1);
});

test('the first interaction loads GTM without waiting for the timer', () => {
  for (const type of ['pointerdown', 'keydown', 'touchstart', 'scroll']) {
    const page = run('styerteam.com');
    page.fire(type);
    assert.equal(page.scripts.length, 1, type);
    assert.equal(page.listeners[type].length, 0, `${type} listener is removed`);
  }
});

test('events pushed before GTM loads stay queued ahead of the container', () => {
  const page = run('styerteam.com');
  page.dataLayer.push({ event: 'call_click' });
  page.fire('pointerdown');
  assert.deepEqual(page.dataLayer.map((entry) => entry.event), ['call_click', 'gtm.js']);
});

test('thank-you pages load GTM immediately', () => {
  const page = run('styerteam.com', { pathname: '/contact-thank-you.html' });
  assert.equal(page.scripts.length, 1);
});

test('preview hosts do not load GTM or queue a bare Google tag', () => {
  const preview = run('styerteam-site-git-preview.vercel.app');
  assert.equal(preview.scripts.length, 0);
  assert.equal(preview.dataLayer.length, 0);
  assert.equal(preview.window.StyerAfterGoogleTag, undefined);
});

test('direct tag commands wait until GTM has finished the initial page view', async () => {
  const page = run('www.styerteam.com');
  let sent = 0;
  page.window.StyerAfterGoogleTag(() => { sent += 1; });
  await new Promise((resolve) => setTimeout(resolve, 70));
  assert.equal(sent, 0);
  page.dataLayer.push({ event: 'gtm.load' });
  await new Promise((resolve) => setTimeout(resolve, 70));
  assert.equal(sent, 1);
});
