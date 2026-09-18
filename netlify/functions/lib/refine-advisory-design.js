// Shared by the migration and every publishing template. Content stays in HTML.
const fs = require('node:fs');
const path = require('node:path');
// One footer for every public page. Edit site-footer.html, then run
// `node scripts/sync-advisory-design.mjs` to propagate it.
const SITE_FOOTER = fs.readFileSync(path.join(__dirname, 'site-footer.html'), 'utf8').trim();
function refineAdvisoryDesign(html) {
  if (!/class="nav-links"|class="site-header lp-header"/.test(html)) return html;
  const classes = ['advisory-site'];
  if (/class="[^"]*(?:blog-post|article-body|blog-article)/.test(html)) classes.push('advisory-article');
  if (/id="blog-grid"/.test(html)) classes.push('advisory-blog-index');
  if (/class="[^"]*legacy-loan-page/.test(html)) classes.push('advisory-product');
  if (/class="[^"]*contact-conversation/.test(html)) classes.push('advisory-contact');
  if (/class="[^"]*calculator-page|id="dscr-calc-main"|id="bd-calc-main"/.test(html)) classes.push('advisory-calculator');
  html = html.replace(/<body\b([^>]*)>/, (tag, attributes) => {
    const present = attributes.match(/class="([^"]*)"/);
    const combined = [...new Set([...(present ? present[1].split(/\s+/) : []), ...classes])].filter(Boolean).join(' ');
    return '<body' + (present ? attributes.replace(present[0], `class="${combined}"`) : attributes + ` class="${combined}"`) + '>';
  });
  if (!html.includes('/advisory-design.css')) html = html.replace('</head>', '<link rel="stylesheet" href="/advisory-design.css?v=20260917">\n</head>');
  if (!html.includes('/advisory-contact.js')) html = html.replace('</head>', '<script src="/advisory-contact.js?v=20260917" defer></script>\n</head>');
  html = html.replace(/Awards &amp; Recognition|Awards & Recognition/g, 'Client Reviews');
  html = html.replace(/<footer\b[\s\S]*?<\/footer>/, () => SITE_FOOTER);
  // A mobile contents disclosure retains all links; script.js opens it on desktop.
  html = html.replace(/<nav class="page-contents"([^>]*)><p class="page-contents-title">On this page<\/p>([\s\S]*?)<\/nav>/g,
    '<details class="advisory-contents"><summary>On this page</summary><nav class="page-contents"$1>$2</nav></details>');
  return html;
}
module.exports = { refineAdvisoryDesign };
