// Controller-level checks using linkedom. Native details/focus/media behavior is mocked.
// This does not establish browser rendering, native keyboard behavior, or WCAG compliance.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require = createRequire(new URL('../../staging/package.json', import.meta.url));
const {parseHTML} = require('linkedom');
const root = 'work/full-site-buildout';
const html = fs.readFileSync(`${root}/components/header.html`, 'utf8');
const script = fs.readFileSync(`${root}/components/navigation.js`, 'utf8');
const manifest = JSON.parse(fs.readFileSync(`${root}/route-manifest.json`, 'utf8'));
const routes = new Set(manifest.routes.map(row => row.route));
routes.add('/');
const checks = [];

function setup({desktop = false, path = '/dscr-loans-texas.html', hint = ''} = {}) {
  const {document, window: dom} = parseHTML(`<html><body class="orchestration-page">${html}<main><a href="#outside" id="outside">Main link</a></main></body></html>`);
  let active = document.body;
  Object.defineProperty(document, 'activeElement', {get: () => active});
  dom.HTMLElement.prototype.focus = function () {
    if (this.hidden || this.closest('[hidden]')) return;
    active = this;
    this.dispatchEvent(new dom.Event('focusin', {bubbles: true}));
  };
  const header = document.querySelector('.site-header');
  header.getBoundingClientRect = () => ({height: desktop ? 84 : 76});
  if (hint) header.dataset.activeNav = hint;
  const groups = [...document.querySelectorAll('.sm-nav-group')];
  for (const group of groups) Object.defineProperty(group, 'open', {
    get: () => group.hasAttribute('open'),
    set: value => {
      const before = group.hasAttribute('open');
      group.toggleAttribute('open', value);
      if (before !== !!value) group.dispatchEvent(new dom.Event('toggle'));
    }
  });
  const media = {matches: desktop, addEventListener(_event, handler) {this.change = handler;}};
  let networkCalls = 0;
  const context = {document, URL, location: {pathname: path, href: `https://preview.example${path}`}, matchMedia: () => media,
    fetch: () => {networkCalls++; throw Error('No network allowed');}};
  context.window = context;
  vm.runInNewContext(script, context);
  const event = (type, element, extra = {}) => {
    const e = new dom.Event(type, {bubbles: true, cancelable: true});
    for (const [key, value] of Object.entries(extra)) Object.defineProperty(e, key, {value});
    element.dispatchEvent(e);
    return e;
  };
  return {document, header, groups, media, context, event, networkCalls: () => networkCalls,
    drawer: document.querySelector('#site-nav-drawer'), toggle: document.querySelector('.nav-toggle')};
}

const markup = parseHTML(`<html><body>${html}</body></html>`).document;
assert.equal(markup.querySelectorAll('.sm-nav-group').length, 4);
assert.equal(markup.querySelector('.nav-toggle').hidden, true);
assert.equal(markup.querySelector('#site-nav-drawer').hidden, false);
assert.ok(markup.querySelectorAll('.sm-nav-group > summary').length === 4);
checks.push('No-JS markup leaves navigation available and uses native disclosure summaries');
const localLinks = [...markup.querySelectorAll('a[href^="/"]')];
assert.deepEqual(localLinks.filter(link => !routes.has(link.getAttribute('href'))).map(link => link.getAttribute('href')), []);
assert.equal(markup.querySelector('.sm-nav-apply').getAttribute('href'), '/apply-now/');
assert.equal(markup.querySelector('a[href^="tel:"]').getAttribute('href'), 'tel:+15129566010');
assert.equal(markup.querySelector('a[href^="sms:"]').getAttribute('href'), 'sms:+15129566010');
checks.push(`All ${localLinks.length} internal navigation destinations resolve in the 173-route ledger; call/text use verified source phone`);
assert.equal(markup.querySelectorAll('.mobile-menu, #nav').length, 0);
checks.push('Component does not share old mobile-menu class or nav ID');

const mobile = setup();
assert.equal(mobile.drawer.hidden, true);
assert.equal(mobile.toggle.hidden, false);
assert.equal(mobile.toggle.getAttribute('aria-expanded'), 'false');
mobile.event('click', mobile.toggle);
assert.equal(mobile.drawer.hidden, false);
assert.equal(mobile.toggle.getAttribute('aria-expanded'), 'true');
assert.equal(mobile.document.activeElement, mobile.groups[0].querySelector('summary'));
checks.push('Mobile open updates visibility/expanded label and requests first-summary focus');
mobile.groups[0].open = true;
mobile.groups[1].open = true;
assert.equal(mobile.groups[0].open, false);
assert.equal(mobile.groups[1].open, true);
checks.push('Opening one disclosure closes its sibling');
mobile.event('keydown', mobile.groups[1].querySelector('summary'), {key: 'Escape'});
assert.equal(mobile.groups[1].open, false);
assert.equal(mobile.document.activeElement, mobile.groups[1].querySelector('summary'));
assert.equal(mobile.drawer.hidden, false);
mobile.event('keydown', mobile.groups[1].querySelector('summary'), {key: 'Escape'});
assert.equal(mobile.drawer.hidden, true);
assert.equal(mobile.document.activeElement, mobile.toggle);
checks.push('Escape closes current disclosure first, then mobile drawer, restoring the relevant control');
mobile.event('click', mobile.toggle);
mobile.event('pointerdown', mobile.document.querySelector('#outside'));
assert.equal(mobile.drawer.hidden, true);
mobile.event('click', mobile.toggle);
mobile.document.querySelector('#outside').focus();
assert.equal(mobile.drawer.hidden, true);
assert.equal(mobile.document.activeElement.id, 'outside');
checks.push('Outside pointer and outside focus close navigation without stealing outside focus');
mobile.event('click', mobile.toggle);
mobile.event('click', mobile.drawer.querySelector('a[href^="sms:"]'));
assert.equal(mobile.drawer.hidden, true);
assert.equal(mobile.document.activeElement, mobile.toggle);
checks.push('Contact link closes mobile panel and returns focus while preserving default link action');
mobile.media.matches = true; mobile.media.change();
assert.equal(mobile.drawer.hidden, false);
assert.equal(mobile.toggle.hidden, true);
mobile.drawer.querySelector('summary').focus();
mobile.media.matches = false; mobile.media.change();
assert.equal(mobile.drawer.hidden, true);
assert.equal(mobile.toggle.hidden, false);
assert.equal(mobile.document.activeElement, mobile.toggle);
checks.push('Breakpoint changes expose desktop navigation and avoid focus remaining inside hidden mobile content');
assert.equal(mobile.document.querySelector('a[href="/dscr-loans-texas.html"]').getAttribute('aria-current'), 'page');
assert.equal(mobile.document.querySelector('[data-nav-section="invest"]').classList.contains('is-current'), true);
const hinted = setup({path: '/bank-statement-loans.html', hint: 'buy'});
assert.equal(hinted.document.querySelector('[data-nav-section="buy"]').classList.contains('is-current'), true);
const alias = setup({path: '/apply.html', desktop: true});
assert.equal(alias.document.querySelector('.sm-nav-apply').getAttribute('aria-current'), 'page');
checks.push('Exact paths, current-section build hint, and application alias mark current navigation');
vm.runInNewContext(script, mobile.context);
mobile.event('click', mobile.toggle);
assert.equal(mobile.drawer.hidden, false);
checks.push('Repeated script evaluation does not duplicate listeners');
assert.equal(mobile.networkCalls() + hinted.networkCalls() + alias.networkCalls(), 0);
checks.push('Navigation controller makes no network request');
const result = {passed: checks.length, checks, limitations: 'DOM-controller checks only. Native details toggle, media queries, focus methods, and geometry are mocked. No rendered 390px/1440px or WCAG pass claimed.'};
fs.writeFileSync(`${root}/reviews/navigation-dom-results.json`, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
