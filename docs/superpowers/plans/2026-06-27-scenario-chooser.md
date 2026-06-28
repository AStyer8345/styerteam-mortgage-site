# Scenario Chooser Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a homepage scenario chooser that routes complex borrowers first while keeping traditional purchase and refinance borrowers clearly included.

**Architecture:** The chooser is a static HTML section on `index.html` above the existing homepage quick scenario form. A small JavaScript initializer in `script.js` sets the selected scenario type, updates form prompt text, and scrolls to the existing Netlify form without changing the lead capture backend. Styling lives in `style.css`, and the existing lead-flow regression test protects the Netlify form markers.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Netlify Forms, Netlify Functions lead intake, Node test runner.

---

### Task 1: Protect The Existing Form Contract

**Files:**
- Modify: `tests/lead-flow-regression.test.js`

- [ ] **Step 1: Add scenario chooser assertions to the existing homepage lead-flow test**

Add these assertions inside `test('homepage leads with lightweight scenario contact paths before the full application', () => { ... })` after the existing scenario form assertions:

```js
  assert.match(homepage, /class="[^"]*\bscenario-chooser\b[^"]*"/);
  assert.match(homepage, /Self-employed \/ business owner/);
  assert.match(homepage, /Investor \/ DSCR/);
  assert.match(homepage, /Complex income \/ high net worth/);
  assert.match(homepage, /Buying a primary home/);
  assert.match(homepage, /Refinance or cash-out/);
  assert.match(homepage, /Not sure where I fit/);
  assert.match(homepage, /name="scenario_type"/);
  assert.match(script, /function initScenarioChooser\(\)/);
  assert.match(script, /scenario_type/);
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
node --test tests/lead-flow-regression.test.js
```

Expected: the homepage lead-flow test fails because `.scenario-chooser`, `scenario_type`, and `initScenarioChooser()` do not exist yet.

- [ ] **Step 3: Commit the failing test if working in strict TDD, otherwise continue to Task 2**

This repo has no requirement to commit failing tests. For this implementation, continue directly to Task 2 and commit once the feature passes.

### Task 2: Add Homepage Chooser Markup

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the chooser above the existing quick form**

In `index.html`, inside `<section class="quick-contact-section" id="contact-form">`, place this block before the existing `<form id="quick-scenario-form" ...>`:

```html
          <div class="scenario-chooser" aria-labelledby="scenario-chooser-title">
            <div class="scenario-chooser-header">
              <p class="eyebrow">Start with the file, not the application</p>
              <h3 id="scenario-chooser-title">What kind of mortgage scenario are we solving?</h3>
              <p>Pick the closest lane. If it is messy, that is usually where I can help the most.</p>
            </div>
            <div class="scenario-chooser-grid" role="list">
              <button type="button" class="scenario-choice is-primary" data-scenario-type="Self-employed / business owner" data-scenario-prompt="Tell me how you earn: business type, pay structure, bank statements, K-1, 1099, P&amp;L, or anything that makes tax-return income look lower than reality." role="listitem">
                <span class="scenario-choice-label">Core niche</span>
                <strong>Self-employed / business owner</strong>
                <span>Bank statements, K-1, 1099, P&amp;L, S-corp, or write-off-heavy income.</span>
              </button>
              <button type="button" class="scenario-choice is-primary" data-scenario-type="Investor / DSCR" data-scenario-prompt="Tell me about the property: purchase or cash-out, long-term rental or STR, estimated rent, loan amount, and if the DSCR is below 1.0." role="listitem">
                <span class="scenario-choice-label">Core niche</span>
                <strong>Investor / DSCR</strong>
                <span>Rental, STR, cash-out, LLC vesting, low DSCR, or no personal income docs.</span>
              </button>
              <button type="button" class="scenario-choice is-primary" data-scenario-type="Complex income / high net worth" data-scenario-prompt="Tell me what makes the file unusual: assets, RSUs, trust income, multiple entities, jumbo size, recent liquidity event, or a bank decline." role="listitem">
                <span class="scenario-choice-label">Core niche</span>
                <strong>Complex income / high net worth</strong>
                <span>Asset depletion, jumbo, trusts, RSUs, multiple entities, or bank declined.</span>
              </button>
              <button type="button" class="scenario-choice" data-scenario-type="Buying a primary home" data-scenario-prompt="Tell me the purchase price range, location, down payment, timeline, and whether you are using conventional, FHA, VA, or jumbo financing." role="listitem">
                <span class="scenario-choice-label">Traditional lane</span>
                <strong>Buying a primary home</strong>
                <span>Conventional, FHA, VA, jumbo, first-time buyer, or move-up purchase.</span>
              </button>
              <button type="button" class="scenario-choice" data-scenario-type="Refinance or cash-out" data-scenario-prompt="Tell me your current loan balance, estimated home value, goal, and whether this is rate/payment, cash-out, debt consolidation, or renovation money." role="listitem">
                <span class="scenario-choice-label">Traditional lane</span>
                <strong>Refinance or cash-out</strong>
                <span>Lower payment, debt consolidation, home improvements, or cash-out options.</span>
              </button>
              <button type="button" class="scenario-choice" data-scenario-type="Not sure where I fit" data-scenario-prompt="Tell me the short version: what you are trying to do, what feels unusual, and whether another lender has already looked at it." role="listitem">
                <span class="scenario-choice-label">Fallback</span>
                <strong>Not sure where I fit</strong>
                <span>Send the short version. I will route it before asking for a full application.</span>
              </button>
            </div>
            <p class="scenario-chooser-note">Choose one to tailor the form below, or skip straight to the short form.</p>
          </div>
```

- [ ] **Step 2: Add the hidden field to the existing form**

Inside `<form id="quick-scenario-form" name="quick-scenario" ...>`, immediately after the existing hidden `form-name` field, add:

```html
            <input type="hidden" name="scenario_type" id="scenario-type-field" value="">
```

### Task 3: Add Chooser Styling

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add compact chooser styles near existing quick-contact styles**

Add:

```css
.scenario-chooser{margin:1.25rem 0 1.5rem;padding:1.25rem;border:1px solid rgba(15,36,64,.12);border-radius:8px;background:#fff;box-shadow:0 12px 30px rgba(15,36,64,.06)}
.scenario-chooser-header{max-width:720px;margin-bottom:1rem}
.scenario-chooser-header h3{margin:.25rem 0 .35rem;font-size:1.35rem;line-height:1.2;color:var(--color-navy)}
.scenario-chooser-header p:last-child,.scenario-chooser-note{color:var(--color-gray);margin:0}
.scenario-chooser-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem}
.scenario-choice{appearance:none;text-align:left;border:1px solid rgba(15,36,64,.14);border-radius:8px;background:#fff;padding:1rem;display:flex;flex-direction:column;gap:.4rem;min-height:150px;cursor:pointer;color:var(--color-dark);transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease}
.scenario-choice:hover,.scenario-choice:focus-visible{border-color:var(--color-gold);box-shadow:0 10px 24px rgba(15,36,64,.10);transform:translateY(-1px);outline:none}
.scenario-choice.is-selected{border-color:var(--color-gold);box-shadow:0 0 0 3px rgba(212,175,55,.18)}
.scenario-choice.is-primary{background:linear-gradient(180deg,#fff 0%,#fbf8ef 100%)}
.scenario-choice-label{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--color-gold-dark)}
.scenario-choice strong{font-size:1rem;line-height:1.2;color:var(--color-navy)}
.scenario-choice span:last-child{font-size:.9rem;line-height:1.45;color:var(--color-gray)}
.scenario-chooser-note{font-size:.9rem;margin-top:.85rem}
@media(max-width:900px){.scenario-chooser-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:620px){.scenario-chooser{padding:1rem}.scenario-chooser-grid{grid-template-columns:1fr}.scenario-choice{min-height:auto}.scenario-chooser-header h3{font-size:1.15rem}}
```

### Task 4: Add Chooser Interaction

**Files:**
- Modify: `script.js`

- [ ] **Step 1: Add `initScenarioChooser()`**

Add this function near the other homepage form initialization code:

```js
function initScenarioChooser() {
  const chooser = document.querySelector('.scenario-chooser');
  const form = document.getElementById('quick-scenario-form');
  if (!chooser || !form) return;

  const buttons = Array.from(chooser.querySelectorAll('.scenario-choice'));
  const scenarioField = form.querySelector('[name="scenario_type"]');
  const situationField = form.querySelector('[name="situation"], textarea');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('is-selected'));
      button.classList.add('is-selected');

      const scenarioType = button.dataset.scenarioType || '';
      const prompt = button.dataset.scenarioPrompt || '';
      if (scenarioField) scenarioField.value = scenarioType;
      if (situationField && prompt) situationField.setAttribute('placeholder', prompt);

      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const firstField = form.querySelector('input:not([type="hidden"]), textarea, select');
      if (firstField) {
        window.setTimeout(() => firstField.focus({ preventScroll: true }), 350);
      }
    });
  });
}
```

- [ ] **Step 2: Call the initializer**

Inside the existing `DOMContentLoaded` setup, add:

```js
  initScenarioChooser();
```

### Task 5: Verify And Commit

**Files:**
- Test: `tests/lead-flow-regression.test.js`

- [ ] **Step 1: Run the regression test**

Run:

```bash
node --test tests/lead-flow-regression.test.js
```

Expected: all tests pass.

- [ ] **Step 2: Scan for conflict markers**

Run:

```bash
rg -n "<<<<<<<|>>>>>>>|^=======$" index.html style.css script.js tests/lead-flow-regression.test.js
```

Expected: no output.

- [ ] **Step 3: Check staged diff quality**

Run:

```bash
git diff --check
```

Expected: no output.

- [ ] **Step 4: Commit**

Run:

```bash
git add index.html style.css script.js tests/lead-flow-regression.test.js docs/superpowers/plans/2026-06-27-scenario-chooser.md
git commit -m "Add homepage scenario chooser"
```
