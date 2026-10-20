const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const code = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .find(match => match[1].includes('function loadGTM'))[1];
function harness() {
  const frames = [], idle = [], timers = [], listeners = {}, scripts = [];
  const window = { dataLayer: [{ event: 'generate_lead', fixture: true }],
    requestIdleCallback: fn => idle.push(fn),
    addEventListener: (event, fn) => { listeners[event] = fn; } };
  vm.runInNewContext(code, { window, document: {
    getElementsByTagName: () => [{ parentNode: { insertBefore: node => scripts.push(node) } }],
    createElement: () => ({})
  }, requestAnimationFrame: fn => frames.push(fn),
  requestIdleCallback: window.requestIdleCallback, setTimeout: (fn, delay) => timers.push({ fn, delay }) });
  return { window, frames, idle, timers, listeners, scripts };
}
test('GTM yields for paint, keeps queued conversions and loads only once', () => {
  const h = harness();
  assert.equal(h.scripts.length, 0);
  h.frames.shift()();
  assert.equal(h.idle.length, 0);
  h.frames.shift()();
  h.idle.shift()();
  h.listeners.click();
  h.timers[0].fn();
  assert.equal(h.scripts.length, 1);
  assert.equal(h.scripts[0].src, 'https://www.googletagmanager.com/gtm.js?id=GTM-PQQ6PGLR');
  assert.equal(h.window.dataLayer[0].event, 'generate_lead');
  assert.equal(h.window.dataLayer[1].event, 'gtm.js');
});
test('first interaction loads immediately and background tabs retain the deadline', () => {
  const interaction = harness();
  interaction.listeners.touchstart();
  assert.equal(interaction.scripts.length, 1);
  const background = harness();
  assert.equal(background.timers[0].delay, 3500);
  background.timers[0].fn();
  assert.equal(background.scripts.length, 1);
});
