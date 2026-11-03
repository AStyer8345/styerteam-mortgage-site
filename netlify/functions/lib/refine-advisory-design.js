// Shared by the migration and every publishing template. Content stays in HTML.
// One footer for every public page. Edit site-footer.html, then run
// `node scripts/sync-advisory-design.mjs` to propagate it.
// Bump when advisory-design.css, advisory-contact.js or calculator-sticky-result.js change.
const ASSET_VERSION = '20260918';
const SITE_FOOTER = require('./site-footer-content');
const BUSINESS_LICENSE_NOTE = `<div class="site-footer-contact page-license-note">
<p class="site-footer-name"><strong>Adam Styer</strong> | Senior Loan Officer</p>
<p><a href="mailto:adamstyer@gorascal.com">adamstyer@gorascal.com</a></p>
<p class="site-footer-hours">Mon–Fri: 8:00 AM – 6:00 PM<br/>Sat: 9:00 AM – 3:00 PM</p>
<p class="site-footer-social"><a href="https://www.linkedin.com/in/thestyerteam" rel="noopener" target="_blank">LinkedIn<span class="gorascal-visually-hidden"> (opens in a new tab)</span></a> • <a href="https://www.facebook.com/styerteam/" rel="noopener" target="_blank">Facebook<span class="gorascal-visually-hidden"> (opens in a new tab)</span></a></p>
</div>
<div class="site-footer-legal page-license-note">
<p><strong>Licensing notice:</strong> Based in Austin, Texas. Mortgage financing for Texas property is available through Go Rascal Inc., NMLS #2072896, licensed in Texas. Adam Styer, Senior Loan Officer, Individual NMLS #513013. Equal Housing Lender.</p>
<p>For Texas borrowers: <a href="/texas-complaint-notice.html">Texas SML Recovery Fund Notice &amp; Complaint Procedure</a>. This is an informational website and does not constitute a commitment to lend. All loans subject to credit approval, property appraisal, and lender guidelines.</p>
<p><a href="tel:+15129566010">(512) 956-6010</a> · <a href="sms:+15129566010">Text: (512) 956-6010</a></p>
<p>© 2026 The Styer Team, Powered by Go Rascal Inc. All rights reserved. <a href="/privacy.html">Privacy Policy</a> · <a href="/terms.html">Terms of Use</a></p>
</div>
`;
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
  // The homepage ships advisory-design.css inside /assets/homepage.css.
  if (!html.includes('/advisory-design.css') && !html.includes('/assets/homepage.css')) html = html.replace('</head>', `<link rel="stylesheet" href="/advisory-design.css?v=${ASSET_VERSION}">\n</head>`);
  if (!html.includes('/advisory-contact.js')) html = html.replace('</head>', `<script src="/advisory-contact.js?v=${ASSET_VERSION}" defer></script>\n</head>`);
  html = html.replace(/\/(advisory-design\.css|advisory-contact\.js|calculator-sticky-result\.js)\?v=\d+/g, `/$1?v=${ASSET_VERSION}`);
  // The display serif is self-hosted (advisory-design.css). Google Fonts serves Inter only.
  html = html.replace(/(&amp;|&)family=Playfair\+Display:[^&"']*/g, '');
  html = html.replace(/Awards &amp; Recognition|Awards & Recognition/g, 'Client Reviews');
  html = html.replace(/<footer\b[\s\S]*?<\/footer>/, () => SITE_FOOTER);
  html = html.replace(/<section aria-label="Office and licensing details"><footer class="site-footer" id="site-footer-details">[\s\S]*?<\/footer><\/section>\s*/g, '');
  if (/<link href="https:\/\/styerteam\.com\/resources\/mortgage-options-for-business-owners\.html" rel="canonical"\/>/.test(html) && !html.includes('page-license-note')) {
    html = html.replace('</footer>', `${BUSINESS_LICENSE_NOTE}</footer>`);
  }
  // A mobile contents disclosure retains all links; script.js opens it on desktop.
  html = html.replace(/<nav class="page-contents"([^>]*)><p class="page-contents-title">On this page<\/p>([\s\S]*?)<\/nav>/g,
    '<details class="advisory-contents"><summary>On this page</summary><nav class="page-contents"$1>$2</nav></details>');
  return html;
}
module.exports = { refineAdvisoryDesign };
