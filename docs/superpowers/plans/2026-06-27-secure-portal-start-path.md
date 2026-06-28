# Secure Portal Start Path Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a clearer secure portal path that invites ready borrowers to answer questions online while preserving the lower-friction scenario path.

**Architecture:** This is a static-site content and layout update. The existing `/scenario.html` page becomes the two-path start page, while `index.html` and `thank-you.html` add stronger portal prompts using the existing portal URL and button/card patterns.

**Tech Stack:** Static HTML, existing CSS utility classes, existing Node test file `tests/lead-flow-regression.test.js`, local `python3 -m http.server`, Playwright browser verification.

---

### Task 1: Add Regression Coverage

**Files:**
- Modify: `tests/lead-flow-regression.test.js`

- [ ] **Step 1: Update scenario page test expectations**

Replace the existing `scenario page uses portal language and keeps a short note fallback` assertions with checks for:

```js
assert.match(scenarioPage, /Choose the easiest way to start/);
assert.match(scenarioPage, /Send Adam the short version/);
assert.match(scenarioPage, /Answer a few questions in my secure online portal/);
assert.match(scenarioPage, /usually takes 7-9 minutes/);
assert.match(scenarioPage, /make our first call more efficient/);
assert.match(scenarioPage, /https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279/);
assert.match(scenarioPage, /id="scenario-note-form"/);
assert.match(scenarioPage, /name="scenario-note"/);
assert.doesNotMatch(scenarioPage, /Start Secure Loan Application/);
assert.doesNotMatch(scenarioPage, /Start Your Loan Application/);
assert.doesNotMatch(scenarioPage, /Start the full application/);
```

- [ ] **Step 2: Update homepage test expectations**

In `homepage leads with lightweight scenario contact paths before the full application`, keep the hero CTA assertions and replace the portal-specific assertions with:

```js
assert.match(homepage, /Answer a few questions in my secure online portal/);
assert.match(homepage, /usually takes 7-9 minutes/);
assert.match(homepage, /make our first call more efficient/);
assert.match(homepage, /<a href="https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279"[^>]*target="_blank"[^>]*>Open Secure Portal<\/a>/);
assert.doesNotMatch(homepage, /Start Full Loan Application/);
assert.doesNotMatch(homepage, /Start Loan Application/);
```

- [ ] **Step 3: Update thank-you test expectations**

Add a new test:

```js
test('thank-you page offers portal as an efficient next step without application-first wording', () => {
  assert.match(thankYou, /Answer a few questions in my secure online portal/);
  assert.match(thankYou, /usually takes 7-9 minutes/);
  assert.match(thankYou, /first call more efficient/);
  assert.match(thankYou, /https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279/);
  assert.doesNotMatch(thankYou, /Start the full application/);
  assert.doesNotMatch(thankYou, /full 1003/);
});
```

- [ ] **Step 4: Run tests and confirm they fail before implementation**

Run:

```bash
node --test tests/lead-flow-regression.test.js
```

Expected: FAIL on the new portal wording assertions until the HTML is updated.

---

### Task 2: Reframe `/scenario.html` As A Two-Path Start Page

**Files:**
- Modify: `scenario.html`

- [ ] **Step 1: Update hero copy**

Change the hero heading and subhead to:

```html
<h1>Choose the easiest way to start.</h1>
<p class="lp-subhead">Send me the short version if you want guidance first, or answer a few questions in my secure online portal if you are ready to move. The portal usually takes 7-9 minutes and helps make our first call more efficient.</p>
```

- [ ] **Step 2: Update portal card copy**

Change the portal card heading, intro, steps, and CTA text to use:

```html
<h2>Answer a few questions in my secure online portal</h2>
<p class="lp-form-intro">Best if you are ready to get the file moving. It usually takes 7-9 minutes and keeps everything in the secure system I use for pricing, documents, and pre-approval.</p>
```

Use these step headings:

```html
<h3>Answer the basics</h3>
<h3>I review it personally</h3>
<h3>Our first call gets sharper</h3>
```

Change the CTA to:

```html
Answer Questions in the Secure Portal &rarr;
```

- [ ] **Step 3: Update the short-scenario bridge copy**

Change the byline callout and form intro so the lower-friction option stays clear:

```html
<strong>Want me to look first?</strong>
Send Adam the short version instead: name, phone, email, and a few sentences about the file.
```

```html
<h2>Send Adam the short version</h2>
<p class="lp-form-intro">Not sure whether the portal is the right next step? Send your contact info and a few sentences. Plain English is fine.</p>
```

---

### Task 3: Strengthen Homepage Portal Option

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Keep hero CTA unchanged**

Confirm the homepage hero still contains only:

```html
Send Your Scenario
Book 15-Min Call
```

- [ ] **Step 2: Update the portal trust section after the homepage form**

Replace the current "Already talked with Adam..." copy with:

```html
<p class="form-trust-line"><strong>Ready to move faster?</strong></p>
<p class="text-center" style="margin-top:var(--spacing-sm);">
  Answer a few questions in my secure online portal. It usually takes 7-9 minutes and helps make our first call more efficient.<br>
  <a href="https://hypersmart.my1003app.com/513013/register?time=1779291829279" target="_blank" rel="noopener">Open Secure Portal</a>
</p>
```

---

### Task 4: Strengthen Thank-You Portal Next Step

**Files:**
- Modify: `thank-you.html`

- [ ] **Step 1: Update alternate path card**

Replace the first `.ty-alt-card` heading, copy, and CTA with:

```html
<h3>Answer a few questions in my secure online portal</h3>
<p>Ready to move faster? It usually takes 7-9 minutes and helps make our first call more efficient.</p>
<span class="ty-alt-card-cta">Open secure portal &rarr;</span>
```

- [ ] **Step 2: Update DPA guide dynamic link copy**

Replace `Or start your application &rarr;` inside the DPA guide branch with:

```html
Or answer a few portal questions &rarr;
```

---

### Task 5: Verify And Commit

**Files:**
- Test: `tests/lead-flow-regression.test.js`
- Verify: `scenario.html`, `index.html`, `thank-you.html`

- [ ] **Step 1: Run regression tests**

Run:

```bash
node --test tests/lead-flow-regression.test.js
```

Expected: all tests pass.

- [ ] **Step 2: Run whitespace check**

Run:

```bash
git diff --check
```

Expected: no output and exit code 0.

- [ ] **Step 3: Browser-check the edited pages**

Run:

```bash
python3 -m http.server 8092
```

Open:

```text
http://localhost:8092/scenario.html
http://localhost:8092/index.html#contact-form
http://localhost:8092/thank-you.html?type=quick-contact
```

Expected: the scenario page shows both start paths, the homepage keeps scenario/call primary with a portal option below the form, and the thank-you page uses the softer portal wording.

- [ ] **Step 4: Commit**

Run:

```bash
git add scenario.html index.html thank-you.html tests/lead-flow-regression.test.js docs/superpowers/plans/2026-06-27-secure-portal-start-path.md
git commit -m "Add secure portal start path"
```
