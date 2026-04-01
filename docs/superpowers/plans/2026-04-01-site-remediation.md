# styermortgage.com Full Site Remediation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all issues identified in the adversarial site review — legal/compliance, conversion leaks, SEO, template consistency, and content gaps.

**Architecture:** This is a static HTML/CSS/JS site hosted on Netlify. No build step, no framework. Every fix is a direct file edit. The site root is `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site/`. Verification is done via grep, link checking, and preview tools — no test runner exists.

**Tech Stack:** Vanilla HTML, CSS, JS. Netlify hosting + Netlify Forms. No npm dependencies beyond Chart.js CDN.

**Parallelization:** Tasks 1-5 are independent and can run in parallel. Tasks 6-10 are independent and can run in parallel. Tasks 11-14 depend on earlier tasks completing.

---

## Workstream A: Legal & Compliance Fixes (Tasks 1-3)

### Task 1: Add TCPA Consent Checkbox to All Quick Quote Forms

**Files:**
- Modify: `index.html:275-305` (hero Quick Quote form)
- Modify: `about.html` (hero Quick Quote form — same pattern)
- Modify: `contact.html` (hero Quick Quote form — same pattern)
- Modify: `testimonials.html` (hero Quick Quote form)
- Modify: `blog.html` (hero Quick Quote form)
- Modify: `realtors.html` (hero Quick Quote form)
- Modify: `realtor-resources.html` (hero Quick Quote form)
- Modify: `products.html` (hero Quick Quote form)
- Modify: `austin-mortgage-rates.html` (hero Quick Quote form)
- Modify: `mortgage-broker-vs-bank.html` (hero Quick Quote form if present)
- Reference: `get-preapproved.html:366-379` (canonical TCPA + SMS checkbox code)

**Context:** The FCC's 2026 1:1 consent rules require prior express written consent before calling/texting leads. `get-preapproved.html` has the correct TCPA checkbox. All other forms with lead capture need it added.

- [ ] **Step 1: Identify all pages with Quick Quote forms missing TCPA**

Run:
```bash
cd /Users/adamstyer/Documents/Claude/styerteam-mortgage-site
grep -rn 'hero-quick-form' --include='*.html' -l | while read f; do
  if ! grep -q 'tcpa_consent' "$f"; then echo "MISSING TCPA: $f"; fi
done
```

Expected: List of files missing the TCPA checkbox.

- [ ] **Step 2: Add TCPA consent checkbox to each Quick Quote form**

For every file identified in Step 1, insert this block immediately before the `<div class="hero-quick-form-actions">` line:

```html
              <!-- TCPA consent -->
              <div class="hero-quick-form-field" style="grid-column:1/-1;margin-top:4px;">
                <label style="display:flex;align-items:flex-start;gap:8px;font-size:0.75rem;font-weight:400;color:var(--color-gray);cursor:pointer;line-height:1.5;">
                  <input type="checkbox" name="tcpa_consent" required style="margin-top:3px;flex-shrink:0;width:16px;height:16px;">
                  <span>I agree to be contacted by Adam Styer via phone, email, or text about mortgage options. Consent is not a condition of purchase. Msg &amp; data rates may apply. Reply STOP to opt out.</span>
                </label>
              </div>
```

- [ ] **Step 3: Verify all forms now have TCPA**

Run:
```bash
grep -rn 'hero-quick-form' --include='*.html' -l | while read f; do
  if ! grep -q 'tcpa_consent' "$f"; then echo "STILL MISSING: $f"; fi
done
```

Expected: No output (all forms have TCPA).

- [ ] **Step 4: Also add TCPA to city landing page forms**

Run:
```bash
grep -rn 'data-netlify="true"' --include='*.html' -l | while read f; do
  if ! grep -q 'tcpa_consent' "$f"; then echo "MISSING TCPA: $f"; fi
done
```

For each file found, locate the form's submit button and insert the TCPA checkbox block before it. City pages use different form structures — find the `<button type="submit"` line and insert above it.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: add TCPA consent checkbox to all lead capture forms

Adds FCC-compliant 1:1 consent checkbox to Quick Quote forms on all
pages. Previously only get-preapproved.html had it.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Fix Wrong NMLS Number, Email Addresses, and Physical Address

**Files:**
- Modify: `first-time-home-buyer.html:702` — wrong company NMLS `#1038473` → `#2526130`
- Modify: `rate-alert.html:513` — wrong address `5900 Balcones Drive Suite 100` → `5718 Sam Houston Circle`
- Modify: `buda-mortgage-lender.html:463` — email `adam@styermortgage.com` → `adam@thestyerteam.com` (standardize to majority)
- Modify: `westlake-mortgage-lender.html:463` — same email fix
- Modify: `rate-buydown-calculator.html:709` — same email fix
- Modify: `resources/first-time-buyer-guide/index.html:603` — same email fix

**Context:** NMLS number mismatch is a regulatory compliance risk. NAP (Name/Address/Phone) inconsistency hurts local SEO. Email inconsistency means leads may go to the wrong inbox.

- [ ] **Step 1: Fix NMLS on first-time-home-buyer.html**

In `first-time-home-buyer.html`, find and replace:
```
Old: NMLS #1038473
New: NMLS #2526130
```

- [ ] **Step 2: Fix address on rate-alert.html**

In `rate-alert.html` line 513, find and replace:
```
Old: 5900 Balcones Drive Suite 100, Austin TX 78731
New: 5718 Sam Houston Circle, Austin, TX 78731
```

- [ ] **Step 3: Standardize email across 4 files**

Run:
```bash
grep -rn 'adam@styermortgage\.com' --include='*.html'
```

For each result, replace `adam@styermortgage.com` with `adam@thestyerteam.com`.

- [ ] **Step 4: Verify no stale NMLS, address, or email remains**

```bash
grep -rn '1038473' --include='*.html'
grep -rn '5900 Balcones' --include='*.html'
grep -rn 'adam@styermortgage\.com' --include='*.html'
```

Expected: No output for all three.

- [ ] **Step 5: Commit**

```bash
git add first-time-home-buyer.html rate-alert.html buda-mortgage-lender.html westlake-mortgage-lender.html rate-buydown-calculator.html resources/first-time-buyer-guide/index.html
git commit -m "fix: correct NMLS number, address, and email across site

- first-time-home-buyer.html: NMLS #1038473 → #2526130
- rate-alert.html: wrong address → 5718 Sam Houston Circle
- 4 files: adam@styermortgage.com → adam@thestyerteam.com

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Fix Leander Phone Number Encoding and Patel Review Typo

**Files:**
- Modify: `leander-mortgage-lender.html:468` — fullwidth Unicode parentheses in phone number
- Modify: `testimonials.html:469` — stray `&rdquo;` mid-sentence in Patel review
- Modify: `testimonials.html` schema section — same typo in schema markup (line ~128)

- [ ] **Step 1: Fix Leander phone number**

In `leander-mortgage-lender.html`, find the fullwidth parentheses `（512）956-6010` and replace with standard ASCII `(512) 956-6010`.

```bash
# Verify the issue exists
grep -P '（|）' leander-mortgage-lender.html
```

- [ ] **Step 2: Fix Patel review typo in testimonials.html body**

In `testimonials.html` around line 469, find:
```
Old: communication was excellent &rdquo; we always knew
New: communication was excellent — we always knew
```

- [ ] **Step 3: Fix Patel review typo in testimonials.html schema**

Search for the same text pattern in the `<script type="application/ld+json">` block and apply the same fix.

- [ ] **Step 4: Verify**

```bash
grep -P '（|）' leander-mortgage-lender.html
grep 'excellent.*rdquo' testimonials.html
```

Expected: No output.

- [ ] **Step 5: Commit**

```bash
git add leander-mortgage-lender.html testimonials.html
git commit -m "fix: Leander phone encoding and Patel review typo

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Workstream B: Conversion Fixes (Tasks 4-6)

### Task 4: Add CTAs to All Calculator Pages

**Files:**
- Modify: `calculator-payment.html:90-103` — add CTA section above footer
- Modify: `calculator-affordability.html:85-97` — add CTA section above footer
- Modify: `calculator-refinance-breakeven.html:95-109` — add CTA section above footer
- Modify: `refinance-calculator.html` — add CTA section + minimal footer

**Context:** Calculator pages are high-traffic, high-intent pages with zero conversion capture. A user who just calculated they can afford a $500K home or would save $300/mo refinancing has no next step. This is the single biggest conversion leak on the site.

- [ ] **Step 1: Create the CTA HTML block**

This block will be inserted on each calculator page before the `<footer>` tag:

```html
    <!-- CTA -->
    <section style="background:var(--color-navy,#0A1F3F);padding:3rem 1.5rem;text-align:center;margin-top:2rem;">
      <div style="max-width:600px;margin:0 auto;">
        <h2 style="color:#fff;font-size:1.5rem;margin-bottom:0.5rem;">Ready to Make It Real?</h2>
        <p style="color:rgba(255,255,255,0.8);margin-bottom:1.5rem;">Get a personalized quote from Adam Styer — no obligation, no credit impact.</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
          <a href="/get-preapproved.html" class="btn btn-primary" style="background:var(--color-gold,#C9A84C);color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-weight:600;">Get Pre-Approved</a>
          <a href="tel:+15129566010" style="color:#fff;padding:0.75rem 1.5rem;border:1px solid rgba(255,255,255,0.3);border-radius:6px;text-decoration:none;">Call (512) 956-6010</a>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Insert CTA into calculator-payment.html**

In `calculator-payment.html`, insert the CTA block before line 97 (`<footer>`).

- [ ] **Step 3: Insert CTA into calculator-affordability.html**

In `calculator-affordability.html`, insert the CTA block before line 91 (`<footer>`).

- [ ] **Step 4: Insert CTA into calculator-refinance-breakeven.html**

In `calculator-refinance-breakeven.html`, insert the CTA block before line 103 (`<footer>`).

- [ ] **Step 5: Add CTA + minimal nav to refinance-calculator.html**

This page has no nav and no footer. Add a minimal header link and CTA. After the last `</div>` of the calculator content and before the closing scripts:

```html
    <!-- CTA -->
    <section style="background:var(--color-navy,#0A1F3F);padding:3rem 1.5rem;text-align:center;margin-top:2rem;">
      <div style="max-width:600px;margin:0 auto;">
        <h2 style="color:#fff;font-size:1.5rem;margin-bottom:0.5rem;">Ready to Refinance?</h2>
        <p style="color:rgba(255,255,255,0.8);margin-bottom:1.5rem;">Get a personalized refinance quote from Adam Styer.</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
          <a href="/refinance-quote.html" style="background:var(--color-gold,#C9A84C);color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-weight:600;">Get My Refi Quote</a>
          <a href="tel:+15129566010" style="color:#fff;padding:0.75rem 1.5rem;border:1px solid rgba(255,255,255,0.3);border-radius:6px;text-decoration:none;">Call (512) 956-6010</a>
        </div>
        <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin-top:1rem;"><a href="/calculators.html" style="color:rgba(255,255,255,0.6);">← All Calculators</a> · <a href="/" style="color:rgba(255,255,255,0.6);">styermortgage.com</a></p>
      </div>
    </section>
    <footer style="background:#0a1a2e;padding:1rem;text-align:center;color:rgba(255,255,255,0.5);font-size:0.75rem;">
      &copy; 2026 Mortgage Solutions, LP. NMLS# 2526130 (Company) | 513013 (Adam Styer). Equal Housing Lender.
    </footer>
```

- [ ] **Step 6: Verify all calculator pages have CTAs**

```bash
for f in calculator-payment.html calculator-affordability.html calculator-refinance-breakeven.html refinance-calculator.html; do
  if grep -q 'Get Pre-Approved\|Get My Refi Quote' "$f"; then echo "OK: $f"; else echo "MISSING CTA: $f"; fi
done
```

Expected: All OK.

- [ ] **Step 7: Commit**

```bash
git add calculator-payment.html calculator-affordability.html calculator-refinance-breakeven.html refinance-calculator.html
git commit -m "feat: add conversion CTAs to all calculator pages

Calculator pages were dead-end pages with no next step after calculation.
Now each has a Get Pre-Approved/Refi Quote CTA with phone number.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Track "Apply Now" Clicks in analytics.js

**Files:**
- Modify: `analytics.js:28-32` — add click tracking for loan application links

**Context:** The highest-value conversion action (clicking through to `mslp.my1003app.com`) is completely unmeasured. Phone clicks, form submits, and Calendly clicks are tracked, but not the actual application link.

- [ ] **Step 1: Add Apply Now tracking to analytics.js**

In `analytics.js`, after the Calendly click tracking block (after line 38), add:

```javascript

    // ── Apply Now / loan application clicks ────────────────────────
    document.querySelectorAll('a[href*="mslp.my1003app.com"]').forEach(function (link) {
      link.addEventListener('click', function () {
        track({ event: 'apply_now_click', destination: link.href });
      });
    });
```

- [ ] **Step 2: Verify the tracking fires**

```bash
grep -n 'apply_now_click' analytics.js
```

Expected: The new line appears.

- [ ] **Step 3: Commit**

```bash
git add analytics.js
git commit -m "feat: track Apply Now clicks to loan application

Adds dataLayer event for clicks to mslp.my1003app.com so Google Ads
can measure the highest-value conversion action on the site.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Fix "Read All Reviews" Button and Thank-You Page

**Files:**
- Modify: `index.html:546-548` — change button to link to `/testimonials.html`
- Modify: `script.js:487-495` — remove or repurpose `initQuickContactScroll()`
- Modify: `thank-you.html:126-127` — make headline dynamic based on form source
- Modify: `thank-you.html:146` — add company NMLS to footer

- [ ] **Step 1: Fix "Read All Reviews" button on index.html**

In `index.html`, replace the button (lines 546-548):

```html
Old:
          <button type="button" class="btn btn-outline" id="read-all-reviews-trigger">
            Read All Reviews
          </button>

New:
          <a href="/testimonials.html" class="btn btn-outline">
            Read All Reviews
          </a>
```

- [ ] **Step 2: Remove the misleading scroll function from script.js**

In `script.js`, replace `initQuickContactScroll()` (lines 487-495):

```javascript
Old:
function initQuickContactScroll() {
  const trigger = document.getElementById('read-all-reviews-trigger');
  const quickContact = document.getElementById('contact-form');
  if (!trigger || !quickContact) return;

  trigger.addEventListener('click', () => {
    quickContact.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

New:
// initQuickContactScroll removed — "Read All Reviews" now links directly to /testimonials.html
```

Also find and remove the call to `initQuickContactScroll()` in the init function (search for `initQuickContactScroll()` call).

- [ ] **Step 3: Make thank-you page headline dynamic**

In `thank-you.html`, replace the static headline and add type-based JS:

Replace line 126:
```html
Old: <h1>Your Pre-Approval Request Was Received</h1>
New: <h1 id="ty-headline">Your Request Was Received</h1>
```

Replace the existing type-detection script (lines 163-188) with an expanded version:

```html
  <script>
    (function () {
      var type = new URLSearchParams(window.location.search).get('type');
      var h1 = document.getElementById('ty-headline');
      var paras = document.querySelectorAll('.ty-hero p:not(.ty-phone-cta)');
      var phoneCta = document.querySelector('.ty-phone-cta');
      var calendlySection = document.querySelector('.ty-calendly-section');

      if (type === 'rate-alert') {
        if (h1) h1.textContent = "You're on the Austin Rate Watch List";
        if (paras.length > 0) paras[0].textContent = "Check your inbox \u2014 your first rate update arrives this Friday. If you don\u2019t see it, check your spam folder and mark us as \u201cnot spam.\u201d";
        if (phoneCta) phoneCta.innerHTML = 'While you wait: <a href="/austin-mortgage-rates.html">See current Austin mortgage rates &rarr;</a>';
        if (calendlySection) calendlySection.style.display = 'none';
      } else if (type === 'quick-quote') {
        if (h1) h1.textContent = "Your Quote Request Was Received";
      } else if (type === 'refinance') {
        if (h1) h1.textContent = "Your Refinance Quote Request Was Received";
      } else if (type === 'preapproval') {
        if (h1) h1.textContent = "Your Pre-Approval Request Was Received";
      }
    })();
  </script>
```

- [ ] **Step 4: Fix thank-you footer NMLS**

In `thank-you.html` line 146, replace:
```
Old: <p class="lp-nmls">Adam Styer | Mortgage Solutions LP | NMLS #513013 | Equal Housing Lender.</p>
New: <p class="lp-nmls">Adam Styer | Mortgage Solutions LP | NMLS #513013 | Company NMLS #2526130 | Equal Housing Lender.</p>
```

- [ ] **Step 5: Commit**

```bash
git add index.html script.js thank-you.html
git commit -m "fix: Read All Reviews links to testimonials, dynamic thank-you headline

- 'Read All Reviews' button now links to /testimonials.html instead of
  scrolling to the contact form (misleading UX)
- Thank-you page headline adapts to form type (rate-alert, quick-quote,
  refinance, preapproval) instead of always saying 'Pre-Approval'
- Added company NMLS to thank-you footer

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Workstream C: SEO Fixes (Tasks 7-10)

### Task 7: Fix OG Image Path Site-Wide

**Files:**
- Modify: All 51 HTML files containing `img/og-card.jpg`

**Context:** Every page references `https://styermortgage.com/img/og-card.jpg` but the actual file is at `/assets/og-image.png`. Every social share shows a broken preview image.

- [ ] **Step 1: Verify the correct image exists**

```bash
ls -la assets/og-image.png
```

Expected: File exists.

- [ ] **Step 2: Bulk replace OG image path**

```bash
# Find all files and replace
grep -rn 'img/og-card.jpg' --include='*.html' -l
```

For each file, replace ALL occurrences:
```
Old: https://styermortgage.com/img/og-card.jpg
New: https://styermortgage.com/assets/og-image.png
```

Use sed for bulk replacement:
```bash
find . -name '*.html' -exec grep -l 'img/og-card.jpg' {} \; | while read f; do
  sed -i '' 's|img/og-card.jpg|assets/og-image.png|g' "$f"
done
```

- [ ] **Step 3: Add og:image to westlake-mortgage-lender.html**

This page is completely missing OG image tags. Add after the existing OG tags (around line 11):

```html
  <meta property="og:image" content="https://styermortgage.com/assets/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://styermortgage.com/assets/og-image.png">
```

- [ ] **Step 4: Add twitter:image to city pages missing it**

Run:
```bash
grep -rL 'twitter:image' --include='*.html' *-mortgage-lender.html
```

For each file missing `twitter:image`, add it after the `og:image` tag:
```html
  <meta name="twitter:image" content="https://styermortgage.com/assets/og-image.png">
```

- [ ] **Step 5: Verify no stale OG image references remain**

```bash
grep -rn 'og-card.jpg' --include='*.html'
```

Expected: No output.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "fix: correct OG image path site-wide (img/og-card.jpg → assets/og-image.png)

All 51 HTML files referenced a non-existent OG image path. Fixed to
point to the actual file. Also added missing og:image to westlake
and twitter:image to city pages that lacked it.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 8: Update All Stale 2025 Year References to 2026

**Files:**
- Modify: `austin-down-payment-assistance.html` — H1 line 119, OG line 10, Twitter line 17, Schema line 42, Keywords line 8
- Modify: `closing-costs-texas.html` — OG line 10, Twitter line 17, Schema line 42
- Modify: `loans/fha.html` — FAQ schema line 104, body heading (search for "2025 FHA")
- Modify: `loans/usda.html` — FAQ schema line 99, body text (search for "2025 income")
- Modify: `loans/conventional.html` — FAQ schema question (search for "2025")
- Modify: `westlake-mortgage-lender.html` — FAQ schema (search for "$806,500" and "2025")
- Modify: `first-time-home-buyer.html` — FHA limit $524,225 → current, Conv limit $806,500 → $832,750

**Context:** 8+ pages reference 2025 data in April 2026. This signals neglect to borrowers and Google.

- [ ] **Step 1: Find all 2025 references**

```bash
grep -rn '"2025\|2025 \|2025"' --include='*.html' | grep -v 'datePublished\|dateModified\|2025-02\|2025-03\|2025\.html\|feb.*2025\|january.*2025\|march.*2025' | head -40
```

- [ ] **Step 2: Fix austin-down-payment-assistance.html**

Replace all "2025" year references with "2026" in:
- Line 8: keywords meta tag
- Line 10: OG title
- Line 17: Twitter title
- Line 42: Schema headline
- Line 119: H1 text `(2025)` → `(2026)`

- [ ] **Step 3: Fix closing-costs-texas.html**

Replace "2025" with "2026" in:
- Line 10: OG title
- Line 17: Twitter title
- Line 42: Schema headline/description

- [ ] **Step 4: Fix loans/fha.html**

- Schema FAQ: Change `"for 2025"` → `"for 2026"` in the question text
- Body: Search for "2025 FHA" and update to "2026 FHA"
- Update the FHA loan limit dollar amount if it changed for 2026

- [ ] **Step 5: Fix loans/usda.html**

- Schema FAQ line 99: Change `"2025 income limit"` → `"2026 income limit"`
- Body text: Search for "2025" income references and update

- [ ] **Step 6: Fix loans/conventional.html**

- Schema FAQ: Change `"for 2025"` → `"for 2026"` in the conforming limit question

- [ ] **Step 7: Fix westlake-mortgage-lender.html**

- Schema FAQ: Change `$806,500 (2025)` → `$832,750 (2026)`

- [ ] **Step 8: Fix first-time-home-buyer.html**

- Update FHA limit from `$524,225` to current 2026 limit
- Update Conventional limit from `$806,500` to `$832,750`

- [ ] **Step 9: Verify no stale 2025 references remain in titles/schemas**

```bash
grep -rn '"2025' --include='*.html' | grep -i 'title\|headline\|description\|limit' | grep -v 'datePublished\|dateModified\|\.html"'
```

Expected: No results (only date fields should still say 2025).

- [ ] **Step 10: Commit**

```bash
git add austin-down-payment-assistance.html closing-costs-texas.html loans/fha.html loans/usda.html loans/conventional.html westlake-mortgage-lender.html first-time-home-buyer.html
git commit -m "fix: update all stale 2025 year references and loan limits to 2026

Updates DPA, closing costs, FHA, USDA, conventional, westlake, and
first-time-buyer pages with current 2026 year references and loan limits.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 9: Fix Blog Post OG URLs and Remove Spammy FAQ Schemas

**Files:**
- Modify: `blog/2026-03-06-oil-prices-jobs-report-austin-mortgage.html:23,27-28,47` — fix OG URL, Twitter title/description
- Modify: `blog/2026-03-10-when-you-cant-control-it-surrender-it.html` — remove unrelated FAQ schema
- Modify: `blog/2026-03-18-the-ai-trap-i-walked-right-into.html` — remove unrelated FAQ schema

- [ ] **Step 1: Fix OG URL on March 6 blog post**

In `blog/2026-03-06-oil-prices-jobs-report-austin-mortgage.html`:

Line 23 — replace:
```
Old: content="https://styermortgage.com/blog/2026-03-06-temp-placeholder.html"
New: content="https://styermortgage.com/blog/2026-03-06-oil-prices-jobs-report-austin-mortgage.html"
```

Line 27 — replace:
```
Old: <meta name="twitter:title" content="Newsletter">
New: <meta name="twitter:title" content="Oil Prices, Jobs Report & Rate Volatility">
```

Line 28 — replace:
```
Old: <meta name="twitter:description" content="Newsletter — Austin mortgage insights from Adam Styer">
New: <meta name="twitter:description" content="Oil prices spiked, the jobs report came in soft, and rates whipsawed. Here's what it means for your buyers this week.">
```

Line 47 — replace:
```
Old: "url": "https://styermortgage.com/blog/2026-03-06-temp-placeholder.html"
New: "url": "https://styermortgage.com/blog/2026-03-06-oil-prices-jobs-report-austin-mortgage.html"
```

- [ ] **Step 2: Remove FAQ schema from March 10 blog post**

In `blog/2026-03-10-when-you-cant-control-it-surrender-it.html`, remove the entire `FAQPage` schema `<script type="application/ld+json">` block (the one with `"@type": "FAQPage"`). Keep the `Article` schema block.

The FAQ questions ("How long does it take to get pre-approved", "What mortgage options are available for first-time buyers", "Is now a good time to refinance") have nothing to do with an essay about Adam's car being stolen. Google may flag this as schema spam.

- [ ] **Step 3: Remove FAQ schema from March 18 blog post**

Same operation on `blog/2026-03-18-the-ai-trap-i-walked-right-into.html` — remove the `FAQPage` schema block. Keep the `Article` schema block.

- [ ] **Step 4: Verify**

```bash
grep -n 'temp-placeholder' blog/2026-03-06-oil-prices-jobs-report-austin-mortgage.html
grep -c 'FAQPage' blog/2026-03-10-when-you-cant-control-it-surrender-it.html
grep -c 'FAQPage' blog/2026-03-18-the-ai-trap-i-walked-right-into.html
```

Expected: No output for first, `0` for second and third.

- [ ] **Step 5: Commit**

```bash
git add blog/
git commit -m "fix: correct blog OG URLs and remove unrelated FAQ schema

- March 6 post: fix OG/schema URL from temp-placeholder to actual slug,
  fix Twitter card title/description from generic 'Newsletter'
- March 10 & 18 posts: remove FAQPage schema unrelated to article content

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 10: Unblock prequal.html in robots.txt and Add noindex to hero-test.html

**Files:**
- Modify: `robots.txt:13` — remove `Disallow: /prequal.html`
- Modify: `hero-test.html` — add `<meta name="robots" content="noindex, nofollow">`

**Context:** `prequal.html` is blocked in robots.txt but linked as a CTA from multiple pages (testimonials, blog, footer). Either unblock it or change all CTAs. Since it's a legitimate lead capture page, unblock it. `hero-test.html` is a prototype page that should not be indexed.

- [ ] **Step 1: Remove prequal.html from robots.txt**

In `robots.txt`, remove line 13:
```
Disallow: /prequal.html
```

- [ ] **Step 2: Add noindex to hero-test.html**

In `hero-test.html`, after `<meta name="viewport"...>` (line 5), add:
```html
  <meta name="robots" content="noindex, nofollow">
```

- [ ] **Step 3: Verify**

```bash
grep 'prequal' robots.txt
grep 'noindex' hero-test.html
```

Expected: No output for first, the noindex tag for second.

- [ ] **Step 4: Commit**

```bash
git add robots.txt hero-test.html
git commit -m "fix: unblock prequal.html in robots.txt, noindex hero-test.html

prequal.html was blocked but linked as CTA from multiple pages.
hero-test.html is a prototype that should not be indexed.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Workstream D: UX & Accessibility Fixes (Tasks 11-12)

### Task 11: Fix Gold Link Color Contrast (WCAG AA)

**Files:**
- Modify: `style.css:166` — change `var(--color-gold)` default from `#C9A84C` to a darker gold

**Context:** The gold color `#C9A84C` on white has ~3.2:1 contrast, failing WCAG AA (requires 4.5:1). This affects all default links site-wide.

- [ ] **Step 1: Update the CSS custom property**

In `style.css`, find the `:root` block where `--color-gold` is defined and change:
```
Old: --color-gold: #C9A84C;
New: --color-gold: #9A7B2D;
```

Note: `#9A7B2D` has a contrast ratio of ~5.5:1 against white, passing WCAG AA. It's still recognizably gold but darker.

- [ ] **Step 2: Verify the variable is updated**

```bash
grep 'color-gold' style.css | head -5
```

Expected: Shows `#9A7B2D`.

- [ ] **Step 3: Check that no hardcoded #C9A84C remains in style.css**

```bash
grep -n 'C9A84C' style.css
```

If any hardcoded instances exist outside the variable definition, update them to use `var(--color-gold)` or the new hex value.

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "fix: darken gold link color for WCAG AA contrast compliance

#C9A84C (3.2:1 ratio) → #9A7B2D (5.5:1 ratio) on white background.
Affects all default links site-wide.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 12: Fix Quick Quote Form Success Message

**Files:**
- Modify: `index.html:307` — add success message text
- Modify: `products.html:275` — add success message text (same issue)
- Check all pages with `hero-quick-form-success-text` for empty `<p>` tags

- [ ] **Step 1: Find all empty success messages**

```bash
grep -rn 'hero-quick-form-success-text' --include='*.html'
```

- [ ] **Step 2: Add success message to each**

For each file with an empty `<p class="hero-quick-form-success-text"></p>`, replace with:
```html
<p class="hero-quick-form-success-text">Thanks! Adam will reach out within 1 business day.</p>
```

- [ ] **Step 3: Verify**

```bash
grep -rn 'hero-quick-form-success-text">' --include='*.html' | grep -v 'Thanks'
```

Expected: No results (all success messages populated).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: add success message text to Quick Quote forms

Empty success message <p> tags meant users saw nothing after submitting.
Now shows confirmation text.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Workstream E: Template Consistency (Tasks 13-14)

### Task 13: Fix Buda and Westlake City Page Templates

**Files:**
- Modify: `buda-mortgage-lender.html` — replace broken nav anchors, add analytics.js
- Modify: `westlake-mortgage-lender.html` — replace broken nav anchors, add Playfair Display font, fix skip-link target, add OG image

**Context:** These two pages use completely different templates with nav links pointing to homepage anchors (`/#loan-programs`, `/#process`) instead of actual pages. Users arriving from Google search have no way to navigate the site.

- [ ] **Step 1: Fix Buda nav links**

In `buda-mortgage-lender.html`, find the nav section and replace anchor links with actual page URLs. Replace:
```
/#loan-programs → /products.html
/#process → /about.html
/#realtors → /realtors.html
/#contact → /contact.html
```

- [ ] **Step 2: Add analytics.js to Buda page**

Before `</body>`, add:
```html
  <script src="/analytics.js" defer></script>
```

- [ ] **Step 3: Fix Westlake nav links**

Same replacement as Buda:
```
/#loan-programs → /products.html
/#process → /about.html
/#realtors → /realtors.html
/#contact → /contact.html
```

- [ ] **Step 4: Add Playfair Display font to Westlake**

In `westlake-mortgage-lender.html` head, find the Inter font preload and add Playfair Display:
```
Old: family=Inter:wght@300;400;500;600;700
New: family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700
```

- [ ] **Step 5: Fix Westlake skip-link target**

Replace:
```
Old: href="#main-content"
New: href="#main"
```

And ensure the `<main>` element has `id="main"`.

- [ ] **Step 6: Commit**

```bash
git add buda-mortgage-lender.html westlake-mortgage-lender.html
git commit -m "fix: repair Buda and Westlake city page nav, fonts, and accessibility

- Both pages: replace homepage anchor links with actual page URLs
- Buda: add analytics.js
- Westlake: add Playfair Display font, fix skip-link target, add OG image

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 14: Populate Resources Hub Page

**Files:**
- Modify: `resources/index.html:240-266` — add calculator, blog, and tool cards

**Context:** The Resources page has one card. It should showcase all the tools and guides on the site.

- [ ] **Step 1: Add resource cards**

In `resources/index.html`, after the existing First-Time Buyer Guide card (line ~256) and before the comment block (line ~258), add:

```html
          <!-- Calculators -->
          <a href="/calculators.html" class="resource-card">
            <span class="resource-tag">Tools</span>
            <h2>Mortgage Calculators</h2>
            <p>Payment, affordability, refinance break-even, rate buydown, and WRAP mortgage calculators.</p>
          </a>

          <!-- Rate Buydown Calculator -->
          <a href="/rate-buydown-calculator.html" class="resource-card">
            <span class="resource-tag">Tool</span>
            <h2>Rate Buydown Calculator</h2>
            <p>Compare 2-1 and 1-0 temporary buydown scenarios with shareable results.</p>
          </a>

          <!-- WRAP Calculator -->
          <a href="/wrap-mortgage-calculator.html" class="resource-card">
            <span class="resource-tag">Tool</span>
            <h2>WRAP Mortgage Calculator</h2>
            <p>Analyze seller financing and wraparound mortgage scenarios for Texas properties.</p>
          </a>

          <!-- Blog -->
          <a href="/blog.html" class="resource-card">
            <span class="resource-tag">Blog</span>
            <h2>Austin Mortgage Blog</h2>
            <p>Weekly market updates, rate analysis, and homebuying insights from Adam Styer.</p>
          </a>

          <!-- Down Payment Assistance -->
          <a href="/austin-down-payment-assistance.html" class="resource-card">
            <span class="resource-tag">Guide</span>
            <h2>Down Payment Assistance Programs</h2>
            <p>Texas and Austin-area programs that can cover your down payment and closing costs.</p>
          </a>

          <!-- Closing Costs Guide -->
          <a href="/closing-costs-texas.html" class="resource-card">
            <span class="resource-tag">Guide</span>
            <h2>Texas Closing Costs Guide</h2>
            <p>What to expect for buyer and seller closing costs in Texas, with strategies to reduce them.</p>
          </a>
```

- [ ] **Step 2: Fix the H1**

Replace:
```
Old: <h1>Resources</h1>
New: <h1>Free Mortgage Resources &amp; Tools</h1>
```

- [ ] **Step 3: Add GTM to resources page**

This page is missing Google Tag Manager. Add the GTM snippet in the `<head>` and the noscript fallback after `<body>` (copy from any other page's GTM block).

- [ ] **Step 4: Commit**

```bash
git add resources/index.html
git commit -m "feat: populate resources hub with calculators, guides, and blog

Resources page had one card. Now showcases 7 resources including
calculators, DPA guide, closing costs guide, and blog. Added GTM
tracking and improved H1 for SEO.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Workstream F: Rate Page SEO (Task 15)

### Task 15: Make Latest Rate Page Indexable

**Files:**
- Modify: `rates/2026-03-24.html:16` — remove `noindex, nofollow`
- Modify: `rates/2026-03-24.html` — add Article schema

- [ ] **Step 1: Remove noindex from latest rate page**

In `rates/2026-03-24.html`, remove or comment out line 16:
```
Old: <meta name="robots" content="noindex, nofollow">
```

- [ ] **Step 2: Add Article schema**

After the existing `<head>` meta tags, add:
```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Weekly Rate Update — March 24, 2026",
    "datePublished": "2026-03-24",
    "dateModified": "2026-03-24",
    "author": {
      "@type": "Person",
      "name": "Adam Styer",
      "url": "https://styermortgage.com/about.html"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mortgage Solutions LP"
    }
  }
  </script>
```

- [ ] **Step 3: Verify**

```bash
grep 'noindex' rates/2026-03-24.html
grep 'Article' rates/2026-03-24.html
```

Expected: No noindex, Article schema present.

- [ ] **Step 4: Commit**

```bash
git add rates/2026-03-24.html
git commit -m "feat: make latest rate page indexable with Article schema

Rate pages were all noindex, wasting fresh content signals. Latest
rate page is now indexable. Older rate pages remain noindex.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task Dependency Map

```
Workstream A (Legal):     Task 1, Task 2, Task 3  — all independent
Workstream B (Conversion): Task 4, Task 5, Task 6  — all independent
Workstream C (SEO):       Task 7, Task 8, Task 9, Task 10  — all independent
Workstream D (UX):        Task 11, Task 12  — independent
Workstream E (Template):  Task 13, Task 14  — independent
Workstream F (Rate SEO):  Task 15  — independent

All 15 tasks are independent of each other and can run in any order.
```

## Parallelization Strategy

Split into two workers:

**Worker 1 (Claude):** Tasks 1, 4, 7, 11, 13, 15 (forms, calculators, OG images, CSS, templates, rates)
**Worker 2 (Codex):** Tasks 2, 3, 5, 6, 8, 9, 10, 12, 14 (data fixes, analytics, blog, robots, resources)

Final step after all tasks: `git push origin main` to trigger Vercel/Netlify deploy.
