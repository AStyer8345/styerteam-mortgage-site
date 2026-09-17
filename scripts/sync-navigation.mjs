import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const checkOnly = process.argv.includes('--check');

const mortgageOptions = '<li class="nav-has-dropdown"><a href="/products.html">Mortgage Options</a><ul class="nav-dropdown"><li><a href="/products.html">All Mortgage Options</a></li><li><a href="/self-employed-mortgage-austin.html">Self-Employed Mortgages</a></li><li><a href="/asset-depletion-mortgage-texas.html">Assets &amp; Retirement</a></li><li><a href="/high-net-worth-mortgage.html">High-Net-Worth &amp; Complex Income</a></li><li><a href="/mortgage-for-business-owners-austin.html">Business-Owner Planning</a></li><li><a href="/investor-loans.html">Investment Properties</a></li><li><a href="/first-time-home-buyer.html">Buying a Home</a></li><li><a href="/buy-before-you-sell-austin.html">Buy Before You Sell</a></li><li><a href="/loans/construction.html">Building a Home</a></li><li><a href="/loans/refinance.html">Refinancing</a></li><li><a href="/home-equity-loans-texas.html">Home Equity &amp; HELOCs</a></li></ul></li>';
const toolsAndGuides = '<li class="nav-has-dropdown"><a href="/resources/">Tools &amp; Guides</a><ul class="nav-dropdown"><li><a href="/resources/">All Tools &amp; Guides</a></li><li><a href="/calculators.html">All Calculators</a></li><li><a href="/dscr-calculator.html">DSCR Calculator</a></li><li><a href="/asset-depletion-calculator.html">Asset Depletion Calculator</a></li><li><a href="/wrap-mortgage-calculator.html">WRAP Calculator</a></li><li><a href="/self-employed-mortgage-austin.html">Self-Employed Qualification Guide</a></li><li><a href="/resources/first-time-buyer-guide/">First-Time Buyer Guide</a></li><li><a href="/rate-check.html">Compare a Mortgage Offer</a></li><li><a href="/blog.html">Articles &amp; Market Updates</a></li><li><a href="/mortgage-glossary.html">Mortgage Glossary</a></li></ul></li>';
const partners = '<li class="nav-has-dropdown"><a href="/referral-partners-self-employed-clients.html">For Partners</a><ul class="nav-dropdown"><li><a href="/realtors.html">For Realtors</a></li><li><a href="/mortgage-resources-for-cpas-texas.html">For CPAs</a></li><li><a href="/mortgage-strategies-financial-advisors-texas.html">For Financial Advisors</a></li><li><a href="/mortgage-case-studies-for-advisors-cpas.html">Partner Case Studies</a></li></ul></li>';
const about = '<li class="nav-has-dropdown"><a href="/about.html">About Adam</a><ul class="nav-dropdown"><li><a href="/about.html">Meet Adam</a></li><li><a href="/testimonials.html">Client Reviews</a></li><li><a href="/contact.html">Contact Adam</a></li></ul></li>';
const leadingItems = [mortgageOptions, toolsAndGuides, '<li><a href="/scenarios.html">Real Scenarios</a></li>', partners, about];

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || ['node_modules', '.netlify', '.site-dist'].includes(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(absolute);
    return entry.isFile() && entry.name.endsWith('.html') ? [absolute] : [];
  });
}

const changed = [];
const malformed = [];
let navigationCount = 0;

// The article builders must produce the same navigation as the existing pages.
const templateFiles = ['blog-page-builder.js', 'realtor-page-builder.js', 'page-builder.js', 'rate-page-builder.js'].map(file => 'netlify/functions/lib/' + file).map(file => path.join(root, file));
for (const file of [...htmlFiles(root), ...templateFiles]) {
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
  const actionStart = existingItems.indexOf('<li class="nav-phone-li">');
  if (actionStart === -1) {
    malformed.push(path.relative(root, file));
    continue;
  }
  const rawTail = existingItems.slice(actionStart).trim();
  const tail = rawTail.replaceAll(
    '<a href="/scenario.html" class="nav-cta">Send Your Scenario</a>',
    '<a href="/get-preapproved.html?intent=scenario" class="nav-cta">Send Your Scenario</a>',
  );
  const replacement = `\n${leadingItems.map((item) => `          ${item}`).join('\n')}\n          ${tail}\n        `;
  const updated = `${html.slice(0, openEnd + 1)}${replacement}${html.slice(listEnd)}`
    .replaceAll('<a href="/mortgage-for-business-owners-austin.html">Loan Programs</a>', '<a href="/products.html">Mortgage Options</a>')
    .replaceAll('<a href="/products.html">Loan Programs</a>', '<a href="/products.html">Mortgage Options</a>');
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
