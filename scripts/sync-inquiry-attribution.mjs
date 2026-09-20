import fs from 'node:fs';
import path from 'node:path';

// Render the optional question in HTML so Netlify and browsers without JS retain
// the same answer. Never preselect or infer it from automatic attribution.
const check = process.argv.includes('--check');
const ignored = new Set(['.git', '.netlify', '.site-dist', 'node_modules', 'Claude outputs']);
const options = ['ChatGPT', 'Gemini', 'Other AI assistant', 'Google Search', 'Referral', 'Other / not sure'];
const version = '20260920';
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (ignored.has(entry.name)) return [];
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
let changed = 0, count = 0;
for (const file of walk('.').filter(file => file.endsWith('.html') || file === 'scripts/program-review-card.template')) {
  const original = fs.readFileSync(file, 'utf8');
  let html = original.replace(/<form\b[\s\S]*?<\/form>/gi, form => {
    const start = form.match(/<form\b[^>]*>/i)[0];
    if (!/class="[^"]*\b(?:journey-form|js-hero-quote|js-quick-contact)\b/.test(start) || /\bhidden(?:\s|>)/.test(start)) return form;
    count++;
    // Legacy JS also includes the labeled answer in situation; register that
    // summary with Netlify so its independent capture does not discard it.
    if (/\b(?:js-hero-quote|js-quick-contact)\b/.test(start) && !/name="situation"/.test(form)) form = form.replace(start, start + '\n<input type="hidden" name="situation" value="">');
    form = form.replace(/<div class="journey-field journey-full form-group self-reported-source-field">[\s\S]*?<\/div>\n?/, '');
    const name = start.match(/\b(?:id|name)="([^"]+)"/)[1];
    const id = name + '-heard-about';
    const question = `<div class="journey-field journey-full form-group self-reported-source-field"><label for="${id}">How did you first hear about Adam? (optional)</label><select id="${id}" name="self_reported_source"><option value="">Choose if you remember</option>${options.map(value => `<option value="${value}">${value}</option>`).join('')}</select></div>\n`;
    if (/<label class="journey-consent"/.test(form)) return form.replace(/<label class="journey-consent"/, question + '<label class="journey-consent"');
    if (/<div class="hero-quick-form-actions"/.test(form)) return form.replace(/<div class="hero-quick-form-actions"/, question + '<div class="hero-quick-form-actions"');
    return form.replace(/<(?:button|input)\b[^>]*\btype="submit"/, match => question + match);
  });
  html = html.replace(/(src=["'][^"']*assets\/utm\.js)(?:\?[^"']*)?(["'])/g, `$1?v=${version}$2`);
  if (html !== original) { changed++; if (!check) fs.writeFileSync(file, html); }
}
if (check && changed) throw new Error(`${changed} pages/templates need node scripts/sync-inquiry-attribution.mjs`);
console.log(`Inquiry attribution: ${count} forms checked; ${changed} ${check ? 'pending' : 'updated'} files.`);
