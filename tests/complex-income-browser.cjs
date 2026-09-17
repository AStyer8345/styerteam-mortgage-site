// Controlled local preview only. Every POST is intercepted; no real lead,
// notification, analytics request or external application is allowed to leave.
// PLAYWRIGHT_MODULE=/path/to/playwright node tests/complex-income-browser.cjs
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const base = new URL(process.env.PREVIEW_URL || 'http://127.0.0.1:4173');
if (base.protocol !== 'http:' || !['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname)
    || base.username || base.password || base.pathname !== '/' || base.search || base.hash) {
  throw new Error('This regression accepts an HTTP loopback origin only. Production and remote previews are prohibited.');
}
const output = process.env.REVIEW_OUTPUT || '/tmp/styer-complex-income-browser';
fs.mkdirSync(output, { recursive: true });

const pages = [
  { file: 'self-employed-mortgage-austin.html', form: 'scenario-review', situation: 'Self-employed / business owner', rewritten: true },
  { file: 'bank-statement-loans.html', form: 'bank-statement-quote', situation: 'Self-employed / business owner', rewritten: true },
  { file: 'asset-depletion-mortgage-texas.html', form: 'scenario-review', situation: 'Substantial assets', rewritten: true },
  { file: 'high-net-worth-mortgage.html', form: 'hnw-quote', situation: 'Substantial assets', rewritten: true },
  { file: '1099-only-mortgage-texas.html', form: 'scenario-review', situation: 'Self-employed / business owner', answerFirst: true },
  { file: 'p-and-l-mortgage-texas.html', form: 'scenario-review', situation: 'Self-employed / business owner', answerFirst: true },
  { file: 'k1-income-mortgage-austin.html', form: 'scenario-review', situation: 'Self-employed / business owner', answerFirst: true },
  { file: 'non-qm-loans.html', form: 'non-qm-quote', situation: 'No special circumstance', answerFirst: true },
  { file: 'mortgage-for-business-owners-austin.html', form: 'business-owner-scenario', situation: 'Self-employed / business owner', answerFirst: true }
];
const requiredNames = ['email', 'first_name', 'last_name', 'tcpa_consent'];
const results = { origin: base.origin, checks: [], layouts: [], failures: [], pageErrors: [], externalRequestsBlocked: 0 };

async function check(name, work) {
  try { await work(); results.checks.push(name); console.log('PASS', name); }
  catch (error) { results.failures.push({ name, message: error.message }); console.error('FAIL', name, error.message); }
}

async function guard(context) {
  const state = { mode: 'reject', primary: [], backup: [], unexpected: [] };
  await context.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== base.origin) {
      results.externalRequestsBlocked++;
      return route.abort();
    }
    if (request.method() === 'GET' || request.method() === 'HEAD') return route.continue();
    if (request.method() === 'POST' && url.pathname === '/.netlify/functions/lead-intake') {
      const payload = request.postDataJSON();
      state.primary.push(payload);
      if (state.mode === 'primary') {
        await new Promise(resolve => setTimeout(resolve, 100));
        return route.fulfill({ json: { captured: true, preview: true, ownerNotified: false, inquiry_id: payload.inquiry_id } });
      }
      return route.fulfill({ status: 503, json: { captured: false, preview: true } });
    }
    if (request.method() === 'POST' && url.pathname === '/') {
      state.backup.push(Object.fromEntries(new URLSearchParams(request.postData())));
      // Keep the existing backup transport exercised, but fail it locally so
      // the mocked lead-intake receipt alone controls the success assertion.
      return route.fulfill({ status: 503, body: 'Local test: backup disabled' });
    }
    state.unexpected.push({ method: request.method(), path: url.pathname });
    return route.fulfill({ status: 405, body: 'Local test: writes disabled' });
  });
  return state;
}

async function readAuthoredContent(page) {
  return page.evaluate(() => {
    const normalize = value => value.replace(/\s+/g, ' ').trim();
    const form = document.querySelector('form[data-journey]');
    return {
      content: [...document.querySelectorAll('main section h2, main section h3, main section p, main section li')]
        .filter(node => !node.closest('.journey-hero, .journey-card, form'))
        .map(node => normalize(node.textContent)).filter(Boolean),
      questions: [...document.querySelectorAll('main details.ci-faq > summary, main #faq .accordion-button')]
        .map(node => normalize(node.textContent)),
      fields: [...form.elements].filter(field => field.name).map(field => ({ name: field.name, id: field.id, type: field.type, required: field.required })),
      formName: form.name,
      hiddenName: form.elements['form-name'].value,
      action: form.getAttribute('action'),
      canonical: document.querySelector('link[rel="canonical"]').href
    };
  });
}

async function go(page, file, query = '') {
  const response = await page.goto(new URL(file + query, base).href, { waitUntil: 'domcontentloaded' });
  assert.equal(response.status(), 200, file + ' loads');
  await page.waitForFunction(() => document.querySelector('form[data-journey]')?.dataset.journeyBound === 'true');
  await page.evaluate(() => document.fonts.ready);
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const sourceContext = await browser.newContext({ javaScriptEnabled: false });
    await guard(sourceContext);
    const sourcePage = await sourceContext.newPage();
    const authored = new Map();
    for (const spec of pages) {
      await sourcePage.goto(new URL(spec.file, base).href);
      authored.set(spec.file, await readAuthoredContent(sourcePage));
      const form = sourcePage.locator('form[data-journey]');
      assert.equal(await form.getAttribute('method'), 'POST');
      for (const name of requiredNames) assert.ok(await form.locator(`[name="${name}"]`).isVisible(), spec.file + ' native fallback ' + name);
    }
    await sourceContext.close();

    for (const width of [390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
      const state = await guard(context);
      const page = await context.newPage();
      page.setDefaultTimeout(8000);
      page.on('pageerror', error => results.pageErrors.push({ width, page: page.url(), message: error.message }));
      for (const spec of pages) {
        await check(`${width}px ${spec.file}: reading order, content and form contract`, async () => {
          await go(page, spec.file);
          const current = await readAuthoredContent(page);
          const original = authored.get(spec.file);
          assert.deepEqual(current.content, original.content, 'Enhancement preserves every authored answer and qualification');
          assert.deepEqual(current.questions, original.questions, 'All authored FAQ questions survive');
          assert.deepEqual(current.fields, original.fields, 'Field names, IDs, types and required states remain intact');
          assert.equal(current.formName, spec.form);
          assert.equal(current.hiddenName, spec.form);
          assert.equal(current.action, '/thank-you');
          assert.equal(current.canonical, 'https://styermortgage.com/' + spec.file);
          assert.deepEqual(current.fields.filter(field => field.required).map(field => field.name).sort(), requiredNames);
          const layout = await page.evaluate(() => {
            const heading = [...document.querySelectorAll('main section:not(.journey-hero):not(.ci-form-section) h2, main section:not(.journey-hero):not(.ci-form-section) p')]
              .find(node => !/^By\s/.test(node.textContent.trim()) && !node.closest('.journey-card, form'));
            const form = document.querySelector('#scenario-review');
            return {
              viewport: innerWidth,
              scrollWidth: document.documentElement.scrollWidth,
              answerY: heading ? Math.round(heading.getBoundingClientRect().top + scrollY) : null,
              formY: Math.round(form.getBoundingClientRect().top + scrollY)
            };
          });
          results.layouts.push({ file: spec.file, width, ...layout });
          assert.ok(layout.scrollWidth <= width + 1, 'No page-wide horizontal overflow');
          assert.equal(await page.locator('.program-card-summary, .program-card-details, .program-section-details').count(), 0, 'No arbitrary truncation or generated content gates');
          if (spec.rewritten || spec.answerFirst) {
            assert.ok(layout.answerY < layout.formY, 'Substantive answer precedes the form');
            if (width === 390 && spec.rewritten) assert.ok(layout.answerY <= 900, `First substantive answer starts at ${layout.answerY}px; target is <=900px`);
            for (const comparison of await page.locator('.ci-grid, .ci-example, .ci-table-wrap').all()) {
              if (await comparison.evaluate(node => !!node.closest('details'))) continue; // Deliberately optional advanced detail.
              assert.ok(await comparison.isVisible(), 'Core comparison stays visible without expanding a section');
              assert.equal(await comparison.evaluate(node => !!node.closest('[hidden]')), false);
            }
          }
          const questions = page.locator('main details.ci-faq > summary, main #faq .accordion-button');
          assert.ok(await questions.count() > 0, 'Page has discoverable FAQs');
          for (const question of await questions.all()) assert.ok(await question.isVisible(), 'Every question is discoverable, including later questions');
          for (const wrapper of await page.locator('.ci-table-wrap, .program-table-scroll').all()) {
            assert.equal(await wrapper.getAttribute('tabindex'), '0');
            assert.ok(await wrapper.getAttribute('aria-label'));
            assert.equal(await wrapper.locator(':scope > table').count(), 1);
          }
          if (width === 390 || width === 1440) await page.screenshot({ path: path.join(output, spec.file.replace('.html', '') + `-${width}.png`) });
        });
        if (spec.rewritten || spec.answerFirst) await check(`${width}px ${spec.file}: anchor and keyboard disclosure`, async () => {
          const summary = page.locator('details.ci-faq > summary').first();
          if (await summary.count()) {
            await summary.focus();
            await page.keyboard.press('Enter');
            assert.equal(await summary.evaluate(node => node.parentElement.open), true);
            await page.keyboard.press('Space');
            assert.equal(await summary.evaluate(node => node.parentElement.open), false);
          } else {
            const question = page.locator('main #faq .accordion-button').first();
            await question.focus();
            await page.keyboard.press('Enter');
            assert.equal(await question.getAttribute('aria-expanded'), 'true');
            await page.keyboard.press('Space');
            assert.equal(await question.getAttribute('aria-expanded'), 'false');
          }
          await page.locator('.journey-hero a[href="#scenario-review"]').click();
          // The site's shared smooth-scroll handler keeps the URL unchanged.
          // Verify the reached target, not an implementation-specific hash.
          await page.waitForFunction(() => document.querySelector('#scenario-review').getBoundingClientRect().top < innerHeight / 2);
          const bounds = await page.locator('#scenario-review').boundingBox();
          assert.ok(bounds.y >= -2 && bounds.y < 450, 'Hero action reaches the existing form below the sticky header');
        });
      }
      assert.deepEqual(state.primary, [], 'Read-only layout checks do not submit');
      assert.deepEqual(state.backup, [], 'Read-only layout checks do not submit backup forms');
      assert.deepEqual(state.unexpected, []);
      await context.close();
    }

    for (const spec of pages) await check(`${spec.file}: local-only form interaction and mocked receipt`, async () => {
      const context = await browser.newContext({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
      const state = await guard(context);
      const page = await context.newPage();
      page.setDefaultTimeout(8000);
      page.on('pageerror', error => results.pageErrors.push({ page: spec.file, message: error.message }));
      try {
        await go(page, spec.file, '?utm_source=local-regression&utm_campaign=complex-income');
        const form = page.locator('form[data-journey]');
        const field = name => form.locator(`[name="${name}"]`);
        assert.equal(await field('income_type').inputValue(), spec.situation);
        await form.locator('.journey-estimates > summary').click();
        await field('loan_goal').selectOption('Refinance');
        await field('current_balance').fill('450000');
        await field('loan_goal').selectOption('Purchase');
        assert.equal(await field('current_balance').isVisible(), false);
        await field('loan_goal').selectOption('Refinance');
        assert.equal(await field('current_balance').inputValue(), '450000');
        await form.locator('[data-journey-next]').click();
        await form.locator('[type="submit"]').click();
        assert.equal(state.primary.length + state.backup.length, 0, 'Required contact fields block empty submission');
        await field('first_name').fill('Local');
        await field('last_name').fill('Regression');
        await field('email').fill('local-regression@example.invalid');
        await field('tcpa_consent').check();
        await form.locator('[data-journey-back]').click();
        assert.equal(await field('current_balance').inputValue(), '450000');
        await form.locator('[data-journey-next]').click();
        assert.equal(await field('email').inputValue(), 'local-regression@example.invalid');
        await form.locator('[type="submit"]').click();
        await form.locator('.journey-status[data-tone="error"]').waitFor();
        assert.match(await form.locator('.journey-status').innerText(), /could not confirm/);
        assert.equal(await field('email').inputValue(), 'local-regression@example.invalid');
        assert.equal(await field('current_balance').inputValue(), '450000');
        assert.equal(state.primary.length, 1);
        const inquiryId = state.primary[0].inquiry_id;
        assert.ok(inquiryId);
        state.mode = 'primary';
        await form.locator('[type="submit"]').click();
        await form.evaluate(node => node.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
        await page.getByText('Preview only: your scenario was accepted', { exact: false }).waitFor();
        assert.equal(state.primary.length, 2, 'Duplicate submit while saving is ignored');
        assert.equal(state.backup.length, 2);
        for (const payload of [...state.primary, ...state.backup]) assert.equal(payload.inquiry_id, inquiryId, 'Same ID across failure, retry and backup');
        const accepted = state.primary[1];
        assert.equal(accepted['form-name'], spec.form);
        assert.equal(accepted.intent, 'refinance');
        assert.equal(accepted.tcpa_consent, true);
        assert.equal(accepted.sms_opt_in, false);
        assert.equal(accepted.utm_source, 'local-regression');
        assert.match(accepted.situation, /Current mortgage balance: 450000/);
        const events = await page.evaluate(() => window.dataLayer);
        assert.equal(events.filter(event => event.event === 'accepted_submit').length, 1);
        assert.equal(JSON.stringify(events).includes('local-regression@example.invalid'), false, 'No contact data in analytics');
        assert.equal(JSON.stringify(events).includes('450000'), false, 'No financial answers in analytics');
        assert.ok(await form.locator('.journey-confirmation').isVisible());
        assert.equal(await form.locator('fieldset:visible').count(), 0);
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.locator('.journey-confirmation').waitFor();
        assert.equal(state.primary.length, 2, 'Reload restores receipt without resubmitting');
        assert.equal(await page.evaluate(() => window.dataLayer.filter(event => event.event === 'accepted_submit').length), 0);
        assert.deepEqual(state.unexpected, []);
      } finally { await context.close(); }
    });
    assert.deepEqual(results.pageErrors, [], 'No uncaught page errors');
    assert.deepEqual(results.failures, [], 'All local regression checks pass');
  } finally {
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
