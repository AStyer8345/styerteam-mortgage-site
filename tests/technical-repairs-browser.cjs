// Every request is fulfilled locally or mocked; no production lead is created.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = process.env.SITE_ROOT || path.join(process.cwd(), '.site-dist');
const menus = ['products', 'austin-down-payment-assistance', 'closing-costs-texas', 'fixed-vs-adjustable', 'how-to-buy-a-house-in-austin-tx', 'how-much-house-can-i-afford-austin', 'improve-credit-score', 'mortgage-pre-approval-austin'];
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [320, 390, 768, 1440]) {
      for (const slug of menus) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.route('**/*', route => {
          const request = route.request(), url = new URL(request.url());
          if (url.hostname !== 'fixture.invalid' || request.method() !== 'GET') return route.abort();
          const file = path.join(root, url.pathname);
          return fs.existsSync(file) && fs.statSync(file).isFile() ? route.fulfill({ path: file }) : route.fulfill({ status: 404, body: 'Missing fixture' });
        });
        await page.goto(`https://fixture.invalid/${slug}.html`);
        const toggle = page.locator('header .mobile-menu-toggle').first();
        if (await toggle.isVisible()) {
          await toggle.click();
          assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
          assert(await page.locator('header .nav-links').evaluate(e => e.getBoundingClientRect().height > 0));
          await page.keyboard.press('Escape');
          assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        }
        assert.deepEqual(errors, [], `${slug} ${width}`);
        await page.close();
      }
      for (const slug of ['loans/jumbo.html', 'self-employed-mortgage-austin.html']) {
        for (const mode of ['both', 'primary', 'backup', 'failure']) {
          const page = await browser.newPage({ viewport: { width, height: 900 } });
          const calls = [], errors = [];
          page.on('pageerror', e => errors.push(e.message));
          await page.route('**/*', route => {
            const request = route.request(), url = new URL(request.url());
            if (url.hostname !== 'fixture.invalid') return route.abort();
            if (request.method() === 'POST') {
              calls.push({ path: url.pathname, body: request.postData() });
              const primary = url.pathname.includes('lead-intake');
              const ok = mode === 'both' || mode === 'primary' && primary || mode === 'backup' && !primary;
              return route.fulfill({ status: ok ? 200 : 502, contentType: 'application/json', body: JSON.stringify({ captured: ok, inquiry_id: 'mock-only' }) });
            }
            const file = path.join(root, url.pathname);
            return fs.existsSync(file) && fs.statSync(file).isFile() ? route.fulfill({ path: file }) : route.fulfill({ status: 404, body: 'Missing fixture' });
          });
          await page.goto(`https://fixture.invalid/${slug}?utm_source=qa`);
          const form = page.locator('form[data-journey-mode="conversation"]').first();
          await form.locator('[name=loan_goal]').selectOption('Purchase');
          await form.locator('[name=name]').fill('Local Test');
          await form.locator('[name=email]').fill('local@example.invalid');
          await form.locator('[name=message]').fill('Local test only');
          await form.locator('[name=tcpa_consent]').check();
          await form.locator('[type=submit]').click();
          await page.waitForFunction(() => {
            const status = document.querySelector('form[data-journey-mode="conversation"] .journey-status');
            return !status.hidden && status.dataset.tone !== 'sending';
          });
          const text = await form.locator('.journey-status').innerText();
          assert.equal(calls.length, 2);
          if (mode === 'failure') {
            assert.match(text, /could not confirm/);
            assert.equal(await form.locator('[name=message]').inputValue(), 'Local test only');
            assert(await form.locator('[type=submit]').isEnabled());
          } else {
            assert.match(text, mode === 'both' ? /has been (saved|received)/ : mode === 'backup' ? /has been saved/ : /has been received/);
            const primary = calls.find(c => c.path.includes('lead-intake'));
            const backup = calls.find(c => !c.path.includes('lead-intake'));
            assert.equal(JSON.parse(primary.body).inquiry_id, new URLSearchParams(backup.body).get('inquiry_id'));
            assert.equal(JSON.parse(primary.body).utm_source, 'qa');
          }
          assert.deepEqual(errors, [], `${slug} ${width} ${mode}`);
          console.log('PASS form', width, slug, mode);
          await page.close();
        }
      }
      console.log('PASS menus', width);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
