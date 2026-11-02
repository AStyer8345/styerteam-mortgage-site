/**
 * Calculator → review handoff. Not part of `npm test`.
 * Run: NODE_PATH=/tmp/pw/node_modules node tests/e2e/dscr-review-handoff.mjs
 * Uses system Chrome via playwright-core. Network posts are stubbed.
 */
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const port = process.env.PORT || '8766';
const origin = `http://127.0.0.1:${port}`;
const outDir = process.env.SHOTS || '/opt/cursor/artifacts/dscr-review';
fs.mkdirSync(outDir, { recursive: true });

function contrast(fg, bg) {
  const parse = (c) => {
    const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return null;
    const lin = (n) => { const s = n / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
    const [r, g, b, a] = [lin(+m[1]), lin(+m[2]), lin(+m[3]), c.startsWith('rgba') ? +c.split(',')[3] : 1];
    return { L: 0.2126 * r + 0.7152 * g + 0.0722 * b, a: Number.isFinite(a) ? a : 1 };
  };
  const A = parse(fg), B = parse(bg);
  if (!A || !B) return null;
  const lighter = Math.max(A.L, B.L), darker = Math.min(A.L, B.L);
  return (lighter + 0.05) / (darker + 0.05);
}

async function axe(page, include) {
  await page.evaluate(axeSource);
  return page.evaluate(async (include) => {
    const result = await window.axe.run(include ? { include } : document, { resultTypes: ['violations'] });
    return result.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 5).map((n) => n.target.join(' ')) }));
  }, include);
}

async function handoff(page, width) {
  await page.setViewportSize(width);
  await page.goto(`${origin}/dscr-calculator.html`, { waitUntil: 'domcontentloaded' });
  await page.fill('#dscr-price', '640000');
  await page.fill('#dscr-down', '25');
  await page.fill('#dscr-rent', '4321');
  await page.fill('#dscr-tax', '8100');
  await page.locator('[data-calculator-actions] [data-review-calculator]').click();
  await page.waitForURL(/investor-loans\.html\?goal=Invest&context=calculator/);
  await page.locator('#scenario-review').waitFor();
  await page.locator('.journey-summary').waitFor();
  return page.evaluate(() => {
    const form = document.querySelector('#form-investment-property-scenario');
    const label = document.querySelector('label[for="investment-loan_goal"]');
    const card = document.querySelector('#quick-options .u-cta-card');
    const legend = form.querySelector('legend');
    const fieldset = legend.closest('fieldset');
    const button = form.querySelector('[data-journey-next]');
    const summary = document.querySelector('.journey-summary');
    const cs = (el) => getComputedStyle(el);
    return {
      message: document.body.innerText.includes('could not be restored'),
      summaryTitle: summary.querySelector('h3')?.textContent || '',
      summaryText: summary.innerText,
      price: form.elements.property_value.value,
      down: form.elements.down_payment.value,
      rent: form.elements.monthly_rent.value,
      goal: form.elements.loan_goal.value,
      labelTransform: cs(label).textTransform,
      labelColor: cs(label).color,
      labelBg: cs(card).backgroundColor,
      cardBg: cs(card).backgroundColor,
      sectionBg: cs(document.querySelector('#quick-options')).backgroundColor,
      legendBorder: cs(fieldset).borderTopWidth,
      buttonText: button.textContent.trim(),
      buttonTransform: cs(button).textTransform,
      buttonBg: cs(button).backgroundColor,
      buttonColor: cs(button).color,
      progress: document.querySelector('.journey-progress').textContent,
      edit: !!summary.querySelector('a.journey-summary-edit'),
      honeypot: !!form.querySelector('[name="bot-field"]')
    };
  });
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME || '/usr/local/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

const posts = [];
const page = await browser.newPage();
await page.route('**/*', async (route) => {
  const req = route.request();
  const url = req.url();
  if (req.method() === 'POST') {
    posts.push({ url, body: req.postData() || '' });
    if (!url.includes('lead-intake')) {
      await route.fulfill({ status: 404, contentType: 'text/plain', body: 'stubbed' });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{"captured":true,"preview":true}'
    });
    return;
  }
  if (!url.startsWith(origin) && !url.startsWith('data:')) {
    posts.push({ blocked: url });
    await route.abort();
    return;
  }
  await route.continue();
});

const desktop = await handoff(page, { width: 1280, height: 900 });
console.log('desktop', JSON.stringify(desktop, null, 2));
await page.locator('#quick-options').screenshot({ path: `${outDir}/after-form-desktop.png` });
const desktopAxe = await axe(page, ['#quick-options']);
console.log('desktop axe', JSON.stringify(desktopAxe, null, 2));

const ratios = await page.evaluate(() => {
  const pairs = [
    ['label', 'label[for="investment-loan_goal"]', '#quick-options .u-cta-card'],
    ['intro', '#investment-step-help', '#quick-options .u-cta-card'],
    ['button', '[data-journey-next]', '[data-journey-next]'],
    ['summary title', '.journey-summary h3', '.journey-summary'],
    ['summary term', '.journey-summary dt', '.journey-summary'],
    ['progress', '.journey-progress', '.journey-progress']
  ];
  return pairs.map(([name, fgSel, bgSel]) => {
    const fg = document.querySelector(fgSel);
    const bg = document.querySelector(bgSel);
    return { name, color: getComputedStyle(fg).color, background: name === 'button' ? getComputedStyle(fg).backgroundColor : getComputedStyle(bg).backgroundColor };
  });
});
console.log('contrast inputs', ratios.map((row) => ({ ...row, ratio: contrast(row.color, row.background) })));

await page.locator('.journey-summary-edit').click();
await page.waitForURL(/dscr-calculator\.html\?restore=review/);
const restored = await page.locator('#dscr-price').inputValue();
const rentRestored = await page.locator('#dscr-rent').inputValue();
console.log('edited back', { restored, rentRestored });

const mobilePage = await browser.newPage();
await mobilePage.route('**/*', async (route) => {
  const req = route.request();
  if (req.method() === 'POST') {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"captured":true,"preview":true}' });
    return;
  }
  if (!req.url().startsWith(origin) && !req.url().startsWith('data:')) { await route.abort(); return; }
  await route.continue();
});
const mobile = await handoff(mobilePage, { width: 390, height: 844 });
console.log('mobile message', mobile.message, 'summary', mobile.summaryTitle, 'rent', mobile.rent);
await mobilePage.locator('#quick-options').screenshot({ path: `${outDir}/after-form-mobile.png` });
const mobileAxe = await axe(mobilePage, ['#quick-options']);
console.log('mobile axe', JSON.stringify(mobileAxe, null, 2));
await mobilePage.locator('[data-journey-next]').scrollIntoViewIfNeeded();
const buttonBox = await mobilePage.locator('[data-journey-next]').boundingBox();
const barVisible = await mobilePage.locator('.advisory-contact-bar').isVisible().catch(() => false);
const overlap = await mobilePage.evaluate(() => {
  const button = document.querySelector('[data-journey-next]');
  const rect = button.getBoundingClientRect();
  const x = Math.min(window.innerWidth - 2, Math.max(2, rect.left + rect.width / 2));
  const y = Math.min(window.innerHeight - 2, Math.max(2, rect.top + rect.height / 2));
  const top = document.elementFromPoint(x, y);
  return {
    rect: { top: rect.top, height: rect.height, width: rect.width },
    viewport: { w: window.innerWidth, h: window.innerHeight },
    covered: !(top === button || (top && button.contains(top))),
    top: top && (top.id || top.className || top.tagName)
  };
});
console.log('mobile button overlap', { barVisible, buttonBox, ...overlap });

const refi = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await refi.route('**/*', async (route) => {
  if (route.request().method() === 'POST') {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"captured":true,"preview":true}' });
    return;
  }
  if (!route.request().url().startsWith(origin) && !route.request().url().startsWith('data:')) { await route.abort(); return; }
  await route.continue();
});
await refi.goto(`${origin}/calculator-refinance-breakeven.html`, { waitUntil: 'domcontentloaded' });
await refi.locator('[data-review-calculator]').click();
await refi.waitForURL(/contact\.html\?goal=Refinance&context=calculator/);
await refi.locator('.journey-summary').waitFor();
const refiState = await refi.evaluate(() => ({
  message: document.body.innerText.includes('could not be restored'),
  title: document.querySelector('.journey-summary h3')?.textContent,
  text: document.querySelector('.journey-summary')?.innerText.slice(0, 400),
  goal: document.querySelector('#loan_goal')?.value
}));
console.log('refi', refiState);
await refi.locator('#contact-form').screenshot({ path: `${outDir}/after-refi-desktop.png` });

await page.goto(`${origin}/dscr-calculator.html`, { waitUntil: 'domcontentloaded' });
await page.fill('#dscr-rent', '4321');
await page.locator('[data-calculator-actions] [data-review-calculator]').click();
await page.locator('.journey-summary').waitFor();
await page.locator('[data-journey-next]').click();
await page.fill('#investment-first', 'Riley');
await page.fill('#investment-last', 'Example');
await page.fill('#investment-email', 'riley@example.invalid');
await page.locator('input[name="tcpa_consent"]').check();
await page.locator('#form-investment-property-scenario [type="submit"]').click();
await page.waitForTimeout(600);
const lead = posts.find((item) => item.url && item.url.includes('lead-intake'));
console.log('lead host', lead && new URL(lead.url).host);
console.log('lead has rent', !!(lead && lead.body.includes('4321')));
console.log('lead has price', !!(lead && (lead.body.includes('640000') || lead.body.includes('500000') || lead.body.includes('Purchase price'))));
console.log('external posts', posts.filter((item) => item.url && !item.url.startsWith(origin)).map((item) => item.url));
console.log('confirmation', await page.locator('.journey-status').innerText());

const problems = [];
if (desktop.message) problems.push('desktop still shows restore error');
if (desktop.summaryTitle !== 'Your calculator numbers') problems.push('missing summary title');
if (!desktop.summaryText.includes('640,000') && !desktop.summaryText.includes('640000')) problems.push('price missing from summary');
if (!desktop.summaryText.includes('4,321') && !desktop.summaryText.includes('4321')) problems.push('rent missing from summary');
if (desktop.price !== '640000' || desktop.rent !== '4321' || desktop.down !== '25%') problems.push('fields not prefilled ' + JSON.stringify({ price: desktop.price, rent: desktop.rent, down: desktop.down }));
if (desktop.labelTransform !== 'none') problems.push('labels still transformed ' + desktop.labelTransform);
if (desktop.legendBorder !== '0px') problems.push('fieldset border ' + desktop.legendBorder);
if (desktop.buttonTransform !== 'none') problems.push('button transform ' + desktop.buttonTransform);
if (!desktop.honeypot) problems.push('honeypot missing');
if (mobile.message || mobile.rent !== '4321') problems.push('mobile handoff failed');
if (overlap.covered) problems.push('mobile continue covered by ' + overlap.top);
if (restored.replace(/[$,]/g, '') !== '640000' || rentRestored.replace(/[$,]/g, '') !== '4321') problems.push('edit did not restore calculator ' + restored + ' ' + rentRestored);
if (refiState.message || refiState.title !== 'Your calculator numbers' || refiState.goal !== 'Refinance') problems.push('refi handoff failed ' + JSON.stringify(refiState));
if (!lead || !lead.body.includes('4321')) problems.push('submitted payload dropped calculator rent');
if (posts.some((item) => item.url && !item.url.startsWith(origin))) problems.push('posted off origin');
const badAxe = [...desktopAxe, ...mobileAxe].filter((v) => ['critical', 'serious'].includes(v.impact));
if (badAxe.length) problems.push('axe ' + JSON.stringify(badAxe));
for (const row of ratios) {
  const ratio = contrast(row.color, row.background);
  if (ratio != null && ratio < 4.5) problems.push(`${row.name} contrast ${ratio.toFixed(2)}`);
}
if (!/Preview only/.test(await page.locator('.journey-status').innerText())) problems.push('confirmation was not the stubbed preview');

await browser.close();
if (problems.length) {
  console.error('PROBLEMS\n' + problems.join('\n'));
  process.exit(1);
}
console.log('PASS');
