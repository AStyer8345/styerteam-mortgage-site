// Local, intercepted traffic only: never submits fixtures to production.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.REVIEW_BASE || 'http://127.0.0.1:4173';
async function fillRequired(form) {
  for (const field of await form.locator('[required]').all()) {
    if (!await field.isVisible()) continue;
    const type = await field.getAttribute('type');
    const tag = await field.evaluate(el => el.tagName);
    if (type === 'checkbox') await field.check();
    else if (tag === 'SELECT') {
      if (!await field.inputValue()) await field.selectOption(await field.locator('option').evaluateAll(options => options.find(o => o.value).value));
    } else if (type === 'email') await field.fill('fixture@example.invalid');
    else if (type === 'tel') await field.fill('5125550100');
    else await field.fill('Local attribution fixture');
  }
}
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  let cases = 0;
  try {
    for (const javaScriptEnabled of [true, false]) {
      for (const path of ['/', '/contact.html', '/get-preapproved.html', '/austin-area-mortgage-lender.html']) {
        for (const answer of ['', 'Gemini']) {
          const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
          const calls = [];
          await context.route('**/*', async route => {
            const req = route.request();
            if (!req.url().startsWith(base + '/')) return route.abort();
            if (req.method() !== 'POST') return route.continue();
            const primary = req.url().includes('/.netlify/functions/lead-intake');
            const data = primary ? req.postDataJSON() : Object.fromEntries(new URLSearchParams(req.postData()));
            calls.push({ primary, data });
            return route.fulfill(primary ? { status: 200, json: { captured: true, preview: true, inquiry_id: data.inquiry_id } } : { status: 200, body: 'Captured by local test only' });
          });
          const page = await context.newPage();
          await page.goto(base + path + '?utm_source=google');
          const form = page.locator('form.journey-form, form.js-hero-quote').first();
          if (javaScriptEnabled) {
            const next = form.locator('[data-journey-next]');
            if (await next.count() && await next.isVisible()) { await fillRequired(form); await next.click(); }
          }
          const source = form.locator('[name=self_reported_source]');
          assert.equal(await source.inputValue(), '');
          assert.equal(await source.getAttribute('required'), null);
          await fillRequired(form);
          if (answer) await source.selectOption(answer);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path + ': mobile overflow');
          await form.locator('[type=submit]').click();
          for (let i = 0; i < 80 && calls.length < (javaScriptEnabled ? 2 : 1); i++) await new Promise(resolve => setTimeout(resolve, 100));
          assert.equal(calls.length, javaScriptEnabled ? 2 : 1, path + ': capture count');
          for (const { data } of calls) {
            assert.equal(data.self_reported_source, answer, path);
            if (javaScriptEnabled) {
              // Legacy backup forms do not carry all automatic fields; primary
              // and modern journeys do, and none may overwrite them with Gemini.
              if (data.first_touch_source) assert.equal(data.first_touch_source, 'google');
              assert.equal((data.situation || '').includes('How I first heard about Adam (self-reported): Gemini'), Boolean(answer));
            }
          }
          if (javaScriptEnabled) assert.equal(calls[0].data.inquiry_id, calls[1].data.inquiry_id);
          cases++;
          await context.close();
        }
      }
    }
    // The mobile drawer embeds the same statically registered journey form.
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.route('**/*', route => route.request().url().startsWith(base + '/') && route.request().method() === 'GET' ? route.continue() : route.abort());
    const page = await context.newPage();
    await page.goto(base + '/asset-depletion-mortgage-texas.html');
    await page.locator('.advisory-contact-bar [data-scenario-panel]').click();
    const frame = page.frameLocator('.advisory-panel-frame');
    const source = frame.locator('[name=self_reported_source]');
    await source.waitFor({ state: 'attached' });
    assert.equal(await source.count(), 1);
    await frame.locator('[data-journey-next]').click();
    assert.equal(await source.isVisible(), true);
    assert.equal(await source.inputValue(), '');
    await source.selectOption('ChatGPT');
    assert.equal(await source.inputValue(), 'ChatGPT');
    await context.close();
    console.log(`Inquiry attribution browser checks passed: ${cases} selected/blank JavaScript/native submissions plus mobile drawer; all traffic intercepted.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
