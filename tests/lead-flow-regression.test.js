const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const script = fs.readFileSync('script.js', 'utf8');
const thankYou = fs.readFileSync('thank-you.html', 'utf8');
const leadIntake = fs.readFileSync('netlify/functions/lead-intake.js', 'utf8');
const analytics = fs.readFileSync('analytics.js', 'utf8');
const generateRateUpdate = fs.readFileSync('netlify/functions/generate-rate-update.js', 'utf8');
const ratesJsonUpdater = fs.readFileSync('netlify/functions/lib/rates-json-updater.js', 'utf8');
const austinRates = fs.readFileSync('austin-mortgage-rates.html', 'utf8');
const homepage = fs.readFileSync('index.html', 'utf8');
const scenarioPage = fs.readFileSync('scenario.html', 'utf8');
const nonQmPage = fs.readFileSync('non-qm-loans.html', 'utf8');
const preapprovalGuide = fs.readFileSync('mortgage-pre-approval-austin.html', 'utf8');
const stylesheet = fs.readFileSync('style.css', 'utf8');
const formsRegistry = fs.readFileSync('forms.html', 'utf8');
const subscribeLo = fs.readFileSync('netlify/functions/subscribe-lo.js', 'utf8');
const dpaGuide = fs.readFileSync('ftb-dpa-guide.html', 'utf8');
const rateAlert = fs.readFileSync('rate-alert.html', 'utf8');
const buyerGuide = fs.readFileSync('resources/first-time-buyer-guide/index.html', 'utf8');
const loWaitlist = fs.readFileSync('loanos-waitlist.html', 'utf8');
const rateCheckPages = [
  'rate-check.html',
  'rate-check-buda-kyle.html',
  'rate-check-cedar-park.html',
  'rate-check-georgetown.html',
  'rate-check-new-braunfels.html',
  'rate-check-round-rock.html',
].map((file) => [file, fs.readFileSync(file, 'utf8')]);

test('quick quote redirect does not put contact details in the URL', () => {
  assert.doesNotMatch(script, /tyParams\.set\('(email|name|phone)'/);
  assert.doesNotMatch(thankYou, /URLSearchParams\(window\.location\.search\)\.get\('(email|name|phone)'\)/);
});

test('lead forms only report success after a capture endpoint accepts the lead', () => {
  assert.match(script, /function hasSuccessfulCapture\(results\)/);
  assert.match(script, /if \(!hasSuccessfulCapture\(captureResults\)\)/);
  assert.match(script, /if \(!hasSuccessfulCapture\(quoteCaptureResults\)\)/);
});

test('legacy hero quote flow binds only explicitly designated quote forms', () => {
  assert.match(script, /document\.querySelector\('form\.js-hero-quote'\)/);
  assert.doesNotMatch(script, /querySelector\(['"]form\[data-netlify/);

  const intendedQuotePages = [
    'austin-area-mortgage-lender.html',
    'bank-statement-loans.html',
    'buda-mortgage-lender.html',
    'cedar-park-mortgage-lender.html',
    'dscr-loan-austin-tx.html',
    'high-net-worth-mortgage.html',
    'kyle-mortgage-lender.html',
    'westlake-mortgage-lender.html',
    'loans/construction.html',
    'loans/conventional.html',
    'loans/fha.html',
    'loans/investment.html',
    'loans/jumbo.html',
    'loans/refinance.html',
    'loans/usda.html',
    'loans/va.html',
  ];
  intendedQuotePages.forEach((file) => {
    assert.match(fs.readFileSync(file, 'utf8'), /<form[^>]+class="[^"]*\bjs-hero-quote\b[^"]*"[^>]*>/, file);
  });

  ['ftb-dpa-guide.html', 'loanos-waitlist.html', 'prequal.html', 'rate-alert.html', 'resources/first-time-buyer-guide/index.html', 'thank-you.html'].forEach((file) => {
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /\bjs-hero-quote\b/, file);
  });
});

test('FAQ accordions toggle hidden panels open and closed', () => {
  assert.match(script, /nextElementSibling\.hidden = true/);
  assert.match(script, /nextElementSibling\.hidden = isActive/);
});

test('Non-QM quote form uses primary notification capture path', () => {
  assert.match(nonQmPage, /<form[^>]+name="non-qm-quote"[^>]+class="[^"]*\bjs-quick-contact\b[^"]*"/);
  assert.match(nonQmPage, /<input type="hidden" name="form-name" value="non-qm-quote">/);
  assert.match(nonQmPage, /\/script\.js\?v=20260721-assistant-main-v1/);
  assert.match(script, /'form-name': formData\.get\('form-name'\) \|\| form\.getAttribute\('name'\) \|\| ''/);
});

test('homepage prioritizes the short scenario review and preserves the secure application', () => {
  const heroCtas = homepage.match(/<div class="hero-ctas">([\s\S]*?)<\/div>/)?.[1] || '';
  const heroButtonLabels = Array.from(heroCtas.matchAll(/class="[^"]*\bhero-cta-btn\b[^"]*"[^>]*>([^<]+)<\/a>/g)).map((match) => match[1]);
  const introActions = homepage.match(/<div id="quick-scenario-form" class="quick-contact-actions"[^>]*>([\s\S]*?)<\/div>/)?.[1] || '';
  const introActionLabels = Array.from(introActions.matchAll(/class="[^"]*\bbtn\b[^"]*"[^>]*>([^<]+)<\/a>/g)).map((match) => match[1]);

  assert.match(homepage, /href="\/get-preapproved\.html\?intent=scenario&amp;source=homepage_hero"[^>]*data-source="homepage_hero"[^>]*>Send Your Scenario<\/a>/);
  assert.match(homepage, /data-track="secure_application_click"[^>]*data-source="homepage_hero_secondary"[^>]*>Start Secure Application<\/a>/);
  assert.deepEqual(heroButtonLabels, ['Send Your Scenario', 'Start Secure Application']);
  assert.deepEqual(introActionLabels, ['Send Your Scenario', 'Start Secure Application']);
  assert.match(homepage, /id="quick-scenario-form"/);
  assert.doesNotMatch(homepage, /name="quick-scenario"/);
  assert.doesNotMatch(homepage, /Strong-fit scenarios can schedule immediately/);
  assert.doesNotMatch(homepage, /Book 15-Min Call/);
  assert.doesNotMatch(homepage, /Email Adam Instead/);
  assert.doesNotMatch(homepage, /Start Full Loan Application/);
  assert.doesNotMatch(homepage, /Start Loan Application/);
  assert.doesNotMatch(homepage, /Start Here/);
  assert.match(homepage, /Complex mortgage\. Clear path forward\./);
  assert.match(homepage, /Austin business owners · investors · move-up buyers/);
  assert.match(homepage, /href="tel:\+15129566010"/);
  assert.match(homepage, /href="\/get-preapproved\.html\?intent=scenario&amp;source=homepage_sticky_mobile"[^>]*data-source="homepage_sticky_mobile"/);
  assert.match(homepage, /document\.body\.classList\.add\('sticky-mobile-bar-active'\)/);
  assert.match(stylesheet, /\.home-pilot\.sticky-mobile-bar-active \.mortgage-assistant\{bottom:calc\(5\.75rem \+ env\(safe-area-inset-bottom\)\)\}/);
  assert.match(homepage, /<footer[\s\S]*href="\/texas-complaint-notice\.html"[\s\S]*Texas Complaint Notice[\s\S]*<\/footer>/);
});

test('pre-approval guide routes pre-approval and application CTAs by intent', () => {
  assert.match(preapprovalGuide, /href="\/get-preapproved\.html\?source=preapproval_guide_hero"[^>]*>Get Pre-Approved Now<\/a>/);
  assert.doesNotMatch(preapprovalGuide, /href="\/scenario\.html"[^>]*>(?:Get|Start)[^<]*(?:Pre-Approved|Application)/i);
  assert.match(preapprovalGuide, /href="https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279"[^>]*data-source="preapproval_guide_documents"[^>]*>Start Your Application<\/a>/);
  assert.doesNotMatch(preapprovalGuide, /register\?time=[^"']*\?time=/);
});

test('homepage hero keeps Adam’s portrait compact and avoids the oversized photo treatment', () => {
  const hero = homepage.match(/<section class="hero">([\s\S]*?)<\/section>/)?.[1] || '';
  assert.match(hero, /<img class="home-hero-photo"[^>]*src="\/assets\/adam-cutout-900\.webp"[^>]*width="88"[^>]*height="96"/);
  assert.doesNotMatch(hero, /<picture/);
  assert.match(homepage, /class="hero-glass-card home-hero-layout"/);
  assert.match(homepage, /\.home-pilot \.hero\{[^}]*background-image:none/);
  assert.match(homepage, /\.home-pilot \.home-hero-photo\{[^}]*width:88px;[^}]*height:96px/);
});

test('scenario page puts the short conversion form first and keeps the secure portal secondary', () => {
  assert.match(scenarioPage, /Tell me what you’re trying to accomplish/);
  assert.match(scenarioPage, /id="scenario-form"/);
  assert.match(scenarioPage, /name="scenario-review"/);
  assert.match(scenarioPage, /id="form-scenario-review" class="js-quick-contact"/);
  assert.match(scenarioPage, /<button type="submit" class="btn btn-primary">Send My Scenario/);
  assert.match(scenarioPage, /name="loanGoal"/);
  assert.match(scenarioPage, /name="email" type="email"/);
  assert.match(scenarioPage, /name="situation"/);
  assert.match(scenarioPage, /name="tcpa_consent"/);
  assert.match(scenarioPage, /class="nav-has-dropdown"/);
  assert.match(scenarioPage, /class="mobile-menu-toggle"/);
  assert.match(scenarioPage, /Start Secure Application/);
  assert.match(scenarioPage, /https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279/);
  assert.ok(scenarioPage.indexOf('Send My Scenario') < scenarioPage.indexOf('Start Secure Application'));
  assert.doesNotMatch(scenarioPage, /lp-header \.nav-links/);
  assert.doesNotMatch(scenarioPage, /Answer the basics/);
  assert.doesNotMatch(scenarioPage, /lead_type: 'scenario_review'/);
  assert.doesNotMatch(scenarioPage, /"@type": "FAQPage"/);
});

test('thank-you page offers portal as an efficient next step without application-first wording', () => {
  assert.match(thankYou, /Answer a few questions in my secure online portal/);
  assert.match(thankYou, /usually takes 7-9 minutes/);
  assert.match(thankYou, /first call more efficient/);
  assert.match(thankYou, /https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279/);
  assert.match(thankYou, /type === 'quick-contact'[\s\S]*ty-alt-paths/);
  assert.doesNotMatch(thankYou, /Start the full application/);
  assert.doesNotMatch(thankYou, /full 1003/);
});

test('thank-you page lets GTM load the Google Ads library', () => {
  const adsLoaderMatches = thankYou.match(
    /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=AW-18028490942/g
  ) || [];

  assert.equal(adsLoaderMatches.length, 0);
});

test('thank-you page strips legacy contact parameters before GTM initializes', () => {
  const scrubIndex = thankYou.indexOf('strip legacy contact parameters');
  const gtmIndex = thankYou.indexOf('<!-- Google Tag Manager -->');

  assert.notEqual(scrubIndex, -1);
  assert.ok(scrubIndex < gtmIndex);
  assert.match(thankYou, /\['email', 'name', 'phone'\]/);
  assert.match(thankYou, /history\.replaceState/);
});

test('lead-intake restores the active web lead acknowledgment automation', () => {
  assert.match(leadIntake, /N8N_WEB_LEAD_URL/);
  assert.match(leadIntake, /styer\.app\.n8n\.cloud\/webhook\/web-lead/);
  assert.match(leadIntake, /notifyWebLeadAutomation/);
  assert.match(leadIntake, /form_name: p\.formName/);
  assert.match(leadIntake, /const data = \{/);
  assert.match(leadIntake, /\n\s+data,/);
  assert.doesNotMatch(leadIntake, /ftb-guide-email/);
});

test('owner notification failures are not reported as successful API responses', () => {
  assert.match(leadIntake, /handoffAccepted \? 200 : 502/);
  assert.match(leadIntake, /success:\s+handoffAccepted/);
  assert.doesNotMatch(leadIntake, /return respond\(200, \{\s*success:\s+true/);
  assert.match(subscribeLo, /n8nOk \? 200 : 502/);
  assert.match(subscribeLo, /success:\s+n8nOk/);
});

test('custom notification routes have a registered Netlify email fallback', () => {
  assert.match(formsRegistry, /name="notification-backup"/);
  assert.match(formsRegistry, /name="form-name" value="notification-backup"/);
  assert.match(script, /window\.StyerCaptureNotificationBackup = captureNotificationBackup/);
  assert.match(script, /window\.StyerCaptureRateCheckNotificationBackup = captureRateCheckNotificationBackup/);
  assert.match(script, /window\.StyerFetchWithTimeout = fetchWithTimeout/);

  for (const [file, html] of rateCheckPages) {
    assert.match(html, /StyerCaptureRateCheckNotificationBackup\(form,\s*''\)/, file);
    assert.match(html, /StyerFetchWithTimeout\(WEBHOOK_URL,[\s\S]*30000\)/, file);
    assert.match(html, /adam@thestyerteam\.com/, file);
  }
  assert.match(dpaGuide, /sourceForm: 'ftb-dpa-guide-form'/);
  assert.match(rateAlert, /sourceForm: 'rate-alert-form'/);
  assert.match(buyerGuide, /sourceForm: 'first-time-buyer-guide'/);
  assert.match(loWaitlist, /sourceForm: 'loanos-waitlist'/);
});

test('custom owner-notification requests have bounded network waits', () => {
  assert.match(script, /fetchWithTimeout\('\/forms\.html',[\s\S]*12000\)/);
  for (const [file, html] of [
    ['ftb-dpa-guide.html', dpaGuide],
    ['rate-alert.html', rateAlert],
    ['resources/first-time-buyer-guide/index.html', buyerGuide],
    ['loanos-waitlist.html', loWaitlist],
  ]) {
    assert.match(html, /StyerFetchWithTimeout\([\s\S]*15000\)/, file);
  }
});

test('owner notification routes default to the forwarding-safe Styer Team inbox', () => {
  assert.match(leadIntake, /ADAM_NOTIFICATION_EMAIL[\s\S]*adam@thestyerteam\.com/);
  assert.match(subscribeLo, /ADAM_NOTIFICATION_EMAIL[\s\S]*adam@thestyerteam\.com/);
});

test('inline lead handlers reject non-2xx responses before redirecting', () => {
  for (const [file, html] of [
    ['ftb-dpa-guide.html', dpaGuide],
    ['rate-alert.html', rateAlert],
    ['resources/first-time-buyer-guide/index.html', buyerGuide],
  ]) {
    assert.match(html, /if \(!res\.ok\) throw/, file);
  }
  assert.match(thankYou, /if \(!res\.ok\) throw new Error\('Netlify form returned '/);
});

test('subscription funnels distinguish confirmed enrollment from manual recovery', () => {
  assert.match(dpaGuide, /data\.mailchimp !== 'ok'/);
  assert.match(dpaGuide, /type=form-recovery&request=dpa-guide/);
  assert.match(rateAlert, /data\.mailchimp !== 'ok'/);
  assert.match(rateAlert, /type=form-recovery&request=rate-alert/);
  assert.match(loWaitlist, /type=form-recovery&request=loanos-waitlist/);
  assert.match(thankYou, /type === 'form-recovery'/);
  assert.match(thankYou, /automated signup or delivery could not be confirmed/);
});

test('analytics.js does not duplicate lead or phone events already emitted by script.js', () => {
  assert.doesNotMatch(analytics, /styer:lead-submitted/);
  assert.doesNotMatch(analytics, /phone_click/);
  assert.doesNotMatch(analytics, /a\[href\^="tel:"\]/);
});

test('required complex-mortgage routes and metadata exist', () => {
  const buyBeforeSell = fs.readFileSync('buy-before-you-sell-austin.html', 'utf8');
  const businessOwner = fs.readFileSync('resources/mortgage-options-for-business-owners.html', 'utf8');
  const realtor = fs.readFileSync('realtors.html', 'utf8');
  const notFound = fs.readFileSync('404.html', 'utf8');
  assert.match(buyBeforeSell, /<link rel="canonical" href="https:\/\/styermortgage\.com\/buy-before-you-sell-austin\.html">/);
  assert.match(buyBeforeSell, /Bridge financing/);
  assert.match(businessOwner, /"@type":"Article"/);
  assert.match(businessOwner, /Bank-statement programs/);
  assert.match(realtor, /name="realtor-scenario"/);
  assert.match(realtor, /netlify-honeypot="bot-field"/);
  assert.doesNotMatch(realtor, /license nationwide/i);
  assert.match(notFound, /<meta name="robots" content="noindex">/);
});

test('direct rate publishing endpoint requires the dispatch secret', () => {
  assert.match(generateRateUpdate, /requireDispatchAuth\(event\)/);
  assert.match(generateRateUpdate, /DISPATCH_SECRET/);
  assert.match(generateRateUpdate, /Unauthorized/);
  assert.match(generateRateUpdate, /timingSafeEqual/);
  assert.match(generateRateUpdate, /Content-Type, Authorization/);
});

test('rate JSON updater refuses to stamp incomplete pasted rates as fresh', () => {
  assert.match(generateRateUpdate, /validateRequiredRates\(rates\)/);
  assert.match(ratesJsonUpdater, /missingKeys/);
  assert.match(ratesJsonUpdater, /missing required products/);
  assert.doesNotMatch(ratesJsonUpdater, /fall back to previous rates\.json/);
  assert.doesNotMatch(ratesJsonUpdater, /prev\.adam_rate \?\? null/);
});

test('Austin rates page handles stale public rate data honestly', () => {
  assert.match(austinRates, /"dateModified": "2026-08-28"/);
  assert.match(austinRates, /Austin Mortgage Rate Snapshot/);
  assert.match(austinRates, /Rate Δ/);
  assert.match(austinRates, /daysSince/);
  assert.match(austinRates, /Call for quote/);
  assert.match(austinRates, /Rate snapshot from/);
  assert.doesNotMatch(austinRates, /Today's Austin Mortgage Rates/);
  assert.doesNotMatch(austinRates, /delivered every Friday/);
});
