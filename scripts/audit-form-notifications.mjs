import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ignoredDirectories = new Set(['.git', 'node_modules']);
const operationalPages = new Set(['dashboard.html', 'marketing-command-center.html', 'ops.html', 'forms.html']);
const failures = [];
let auditedForms = 0;
let netlifyForms = 0;
let customForms = 0;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function fail(file, formName, message) {
  failures.push(`${file} [${formName}]: ${message}`);
}

const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));

for (const absolute of htmlFiles) {
  const file = path.relative(root, absolute).split(path.sep).join('/');
  if (operationalPages.has(file)) continue;

  const html = fs.readFileSync(absolute, 'utf8');
  const forms = html.match(/<form\b[\s\S]*?<\/form>/gi) || [];

  for (const form of forms) {
    const startTag = form.match(/<form\b[^>]*>/i)?.[0] || '';
    const formName = startTag.match(/\bname="([^"]+)"/i)?.[1]
      || startTag.match(/\bid="([^"]+)"/i)?.[1]
      || 'unnamed';
    const collectsContact = /\b(?:name|id)="[^"]*(?:email|phone)[^"]*"/i.test(form)
      || /\btype="(?:email|tel)"/i.test(form);
    if (!collectsContact) continue;

    auditedForms += 1;
    const isNetlify = /\s(?:data-netlify|netlify)(?:=|\s|>)/i.test(startTag);

    if (isNetlify) {
      netlifyForms += 1;
      const declaredName = startTag.match(/\bname="([^"]+)"/i)?.[1];
      const hiddenName = form.match(/<input\b[^>]*\bname="form-name"[^>]*\bvalue="([^"]+)"[^>]*>/i)?.[1];
      if (!declaredName) fail(file, formName, 'Netlify form is missing a name attribute.');
      if (!hiddenName) fail(file, formName, 'Netlify form is missing its hidden form-name field.');
      if (declaredName && hiddenName && declaredName !== hiddenName) {
        fail(file, formName, `form name (${declaredName}) does not match hidden form-name (${hiddenName}).`);
      }
      continue;
    }

    customForms += 1;
    if (file === 'asset-depletion-calculator.html' && formName === 'adc-email-form') {
      if (!/id="adc-email"\s+hidden/i.test(html) || !/var WEBHOOK_URL = "";/.test(html)) {
        fail(file, formName, 'inactive calculator email form is unexpectedly visible or enabled.');
      }
      continue;
    }

    if (/^rate-check(?:-[a-z-]+)?\.html$/.test(file) && formName === 'rate-check-form') {
      if (!/window\.StyerCaptureRateCheckNotificationBackup\(form,\s*''\)/.test(html)) {
        fail(file, formName, 'custom rate-check webhook has no independent Netlify owner-email capture.');
      }
      if (!/notification_email/.test(html) || !/recipient_email/.test(html)) {
        fail(file, formName, 'custom rate-check webhook is missing server-workflow recipient metadata.');
      }
      if (!/StyerFetchWithTimeout\(WEBHOOK_URL,[\s\S]*30000\)/.test(html)) {
        fail(file, formName, 'custom rate-check webhook has no bounded primary request.');
      }
      continue;
    }

    fail(file, formName, 'contact form is neither a registered Netlify form nor an approved custom route with a backup alert.');
  }
}

const registry = fs.readFileSync(path.join(root, 'forms.html'), 'utf8');
const sharedScript = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const leadIntake = fs.readFileSync(path.join(root, 'netlify/functions/lead-intake.js'), 'utf8');
const subscribeLo = fs.readFileSync(path.join(root, 'netlify/functions/subscribe-lo.js'), 'utf8');
const subscribeLead = fs.readFileSync(path.join(root, 'netlify/functions/subscribe-lead.js'), 'utf8');
const dscrCalculator = fs.readFileSync(path.join(root, 'dscr-calculator.html'), 'utf8');
const assistantWidget = fs.readFileSync(path.join(root, 'assistant-widget.js'), 'utf8');

// The mortgage-assistant contact form is rendered at runtime, so it is not
// visible to the static HTML walk above. Count and audit it explicitly.
auditedForms += 1;
customForms += 1;

const requiredOwnerEmailCaptures = new Map([
  ['ftb-dpa-guide.html', /StyerCaptureNotificationBackup\(\{[\s\S]*sourceForm: 'ftb-dpa-guide-form'/],
  ['rate-alert.html', /StyerCaptureNotificationBackup\(\{[\s\S]*sourceForm: 'rate-alert-form'/],
  ['resources/first-time-buyer-guide/index.html', /StyerCaptureNotificationBackup\(\{[\s\S]*sourceForm: 'first-time-buyer-guide'/],
  ['loanos-waitlist.html', /StyerCaptureNotificationBackup\(\{[\s\S]*sourceForm: 'loanos-waitlist'/],
]);

if (!/name="notification-backup"[\s\S]*name="form-name" value="notification-backup"/.test(registry)) {
  failures.push('forms.html: notification-backup is not registered with Netlify.');
}
if (!/window\.StyerCaptureNotificationBackup = captureNotificationBackup/.test(sharedScript)) {
  failures.push('script.js: global notification backup helper is missing.');
}
if (!/window\.StyerFetchWithTimeout = fetchWithTimeout/.test(sharedScript)) {
  failures.push('script.js: bounded form-request helper is missing.');
}
if (!leadIntake.includes('/api/intake/inquiries') || !leadIntake.includes('captured: false') || !leadIntake.includes('pending-recovery') || !leadIntake.includes('ownerNotified: null')) {
  failures.push('lead-intake.js: durable capture, pending recovery or truthful delivery state is missing.');
}
if (!/n8nOk \? 200 : 502/.test(subscribeLo) || /success:\s+true/.test(subscribeLo)) {
  failures.push('subscribe-lo.js: notification failures can still be reported as successful.');
}
for (const [file, source] of [
  ['netlify/functions/lead-intake.js', leadIntake],
  ['netlify/functions/subscribe-lo.js', subscribeLo],
  ['netlify/functions/subscribe-lead.js', subscribeLead],
]) {
  if (!/ADAM_NOTIFICATION_EMAIL[\s\S]*adam@thestyerteam\.com/.test(source)) {
    failures.push(`${file}: owner-notification fallback is not adam@thestyerteam.com.`);
  }
}
if (!/id="dscr-lead" hidden/.test(dscrCalculator) || !/var WEBHOOK_URL = "";/.test(dscrCalculator)) {
  failures.push('dscr-calculator.html: dormant lead capture is unexpectedly visible or enabled without notification coverage.');
}
if (!/class="ma-lead-form"/.test(assistantWidget)
  || !/pendingLeadNotification/.test(assistantWidget)
  || !/StyerCaptureNotificationBackup\(approvedNotification\)/.test(assistantWidget)) {
  failures.push('assistant-widget.js: dynamic contact form has no independent Netlify owner-email capture.');
}
if (!/if \(needsConsent && !ui\.consentInput\.checked\)[\s\S]*if \(needsConsent && state\.pendingLeadNotification\)/.test(assistantWidget)) {
  failures.push('assistant-widget.js: owner-email capture is not gated behind explicit lead consent.');
}
if (!/actionRequest = request\([\s\S]*}, 20000\)/.test(assistantWidget)) {
  failures.push('assistant-widget.js: confirmed contact action has no bounded primary request.');
}

for (const [file, backupPattern] of requiredOwnerEmailCaptures) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  if (!backupPattern.test(html)) failures.push(`${file}: custom submit handler has no independent Netlify owner-email capture.`);
  if (!/Promise\.allSettled/.test(html)) failures.push(`${file}: custom submit handler does not wait for its independent notification paths.`);
  if (!/StyerFetchWithTimeout/.test(html)) failures.push(`${file}: custom submit handler has no bounded primary request.`);
  if (!/if \(!res\.ok\) throw/.test(html)) failures.push(`${file}: custom submit handler does not reject a non-2xx primary response.`);
}

for (const file of ['get-preapproved.html', 'refinance-quote.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  if (!/Promise\.allSettled/.test(html) || !/netlifyAccepted/.test(html) || !/leadAccepted/.test(html)) {
    failures.push(`${file}: dual capture does not verify that at least one endpoint accepted the lead.`);
  }
}

const thankYou = fs.readFileSync(path.join(root, 'thank-you.html'), 'utf8');
if (!/Netlify form returned/.test(thankYou)) {
  failures.push('thank-you.html: quick-quote follow-up can report success for a rejected Netlify response.');
}

if (failures.length) {
  console.error(`Form notification audit failed with ${failures.length} issue(s):`);
  for (const issue of failures) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Form notification audit passed: ${auditedForms} contact forms (${netlifyForms} Netlify, ${customForms} approved custom).`);
