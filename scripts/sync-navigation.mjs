import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const checkOnly = process.argv.includes('--check');

const loanPrograms = '<li class="nav-has-dropdown"><a href="/mortgage-for-business-owners-austin.html">Loan Programs</a><ul class="nav-dropdown"><li><a href="/mortgage-for-business-owners-austin.html">Business Owners &amp; Self-Employed</a></li><li><a href="/self-employed-mortgage-austin.html">Self-Employed Mortgage</a></li><li><a href="/bank-statement-loans.html">Bank Statement Loans</a></li><li><a href="/dscr-loan-austin-tx.html">DSCR Investor Loans</a></li><li><a href="/asset-depletion-mortgage-texas.html">Asset Depletion</a></li><li><a href="/reverse-mortgage-texas.html">HECM / Reverse Mortgage</a></li><li><a href="/k1-income-mortgage-austin.html">K-1 Income Mortgage</a></li><li><a href="/high-net-worth-mortgage.html">High-Net-Worth</a></li><li><a href="/non-qm-loans.html">Non-QM Hub</a></li></ul></li>';
const resources = '<li class="nav-has-dropdown"><a href="/resources/">Resources</a><ul class="nav-dropdown"><li><a href="/blog.html">Blog</a></li><li><a href="/resources/first-time-buyer-guide/">Buyer Guide</a></li><li><a href="/scenarios.html">Scenarios</a></li><li><a href="/rate-check.html">Rate Check</a></li><li><a href="/realtors.html">For Realtors</a></li><li><a href="/mortgage-resources-for-cpas-texas.html">For CPAs</a></li><li><a href="/mortgage-strategies-financial-advisors-texas.html">For Financial Advisors</a></li><li><a href="/mortgage-glossary.html">Mortgage Glossary</a></li></ul></li>';
const calculators = '<li class="nav-has-dropdown"><a href="/calculators.html">Calculators</a><ul class="nav-dropdown"><li><a href="/calculators.html">All Calculators</a></li><li><a href="/dscr-calculator.html">DSCR Calculator</a></li><li><a href="/asset-depletion-calculator.html">Asset Depletion Calculator</a></li><li><a href="/rate-buydown-calculator.html">Buydown Calculator</a></li><li><a href="/wrap-mortgage-calculator.html">WRAP Calculator</a></li></ul></li>';
const leadingItems = [loanPrograms, resources, calculators];
const defaultTailItems = [
  '<li><a href="/testimonials.html">Testimonials</a></li>',
  '<li class="nav-has-dropdown"><a href="/contact.html">Contact</a><ul class="nav-dropdown"><li><a href="/about.html">About Adam</a></li></ul></li>',
  '<li class="nav-phone-li"><a href="tel:+15129566010" class="nav-phone">(512) 956-6010</a></li><li><a href="/get-preapproved.html?intent=scenario" class="nav-cta">Send Your Scenario</a></li>',
];

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(absolute);
    return entry.isFile() && entry.name.endsWith('.html') ? [absolute] : [];
  });
}

const changed = [];
const malformed = [];
let navigationCount = 0;

for (const file of htmlFiles(root)) {
  const html = fs.readFileSync(file, 'utf8');
  const navStart = html.indexOf('<ul class="nav-links"');
  if (navStart === -1) continue;
  navigationCount += 1;

  const openEnd = html.indexOf('>', navStart);
  const navEnd = html.indexOf('</nav>', openEnd);
  const listEnd = html.lastIndexOf('</ul>', navEnd);
  if (openEnd === -1 || navEnd === -1 || listEnd < openEnd) {
    malformed.push(path.relative(root, file));
    continue;
  }

  const existingItems = html.slice(openEnd + 1, listEnd);
  const tailMarker = '<li><a href="/testimonials.html">Testimonials</a></li>';
  const tailStart = existingItems.indexOf(tailMarker);
  const rawTail = tailStart === -1
    ? defaultTailItems.join('\n          ')
    : existingItems.slice(tailStart).trim();
  const tail = rawTail.replaceAll(
    '<a href="/scenario.html" class="nav-cta">Send Your Scenario</a>',
    '<a href="/get-preapproved.html?intent=scenario" class="nav-cta">Send Your Scenario</a>',
  );
  const replacement = `\n${leadingItems.map((item) => `          ${item}`).join('\n')}\n          ${tail}\n        `;
  const updated = `${html.slice(0, openEnd + 1)}${replacement}${html.slice(listEnd)}`;
  if (updated === html) continue;
  changed.push(path.relative(root, file));
  if (!checkOnly) fs.writeFileSync(file, updated);
}

if (malformed.length) {
  console.error(`Malformed navigation in ${malformed.length} file(s):\n${malformed.join('\n')}`);
  process.exitCode = 1;
} else if (checkOnly && changed.length) {
  console.error(`Navigation is out of sync in ${changed.length} of ${navigationCount} file(s):\n${changed.join('\n')}`);
  process.exitCode = 1;
} else if (checkOnly) {
  console.log(`Navigation check passed for ${navigationCount} HTML files.`);
} else {
  console.log(`Synchronized navigation in ${changed.length} of ${navigationCount} HTML files.`);
}
