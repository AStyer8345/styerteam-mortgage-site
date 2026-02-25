/**
 * Builds a full HTML page for /updates/ from AI-generated content.
 * Matches the existing template structure (see updates/2026-02-19-austin-buyer-window.html).
 */

function buildWebPage({ title, description, date, content, rates }) {
  const formattedDate = formatDate(date);
  const pageUrl = `https://styermortgage.com/updates/${date}-${slugify(title)}.html`;

  // Build optional rate box
  let rateBox = "";
  if (rates) {
    rateBox = buildRateBox(rates);
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PQQ6PGLR');</script>
  <!-- End Google Tag Manager -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Adam Styer | Mortgage Solutions LP</title>
  <meta name="description" content="${escapeHtml(description)}">

  <meta name="robots" content="noindex, nofollow">

  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Adam Styer | Mortgage Solutions LP">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../style.css">

  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png">
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQQ6PGLR"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <a href="#main" class="skip-link">Skip to main content</a>

  <header>
    <div class="container">
      <nav>
        <a href="../index.html" class="nav-brand">
          <img src="../assets/logo.svg" alt="Adam Styer | Mortgage Solutions LP" class="nav-logo-img" width="180" height="40">
        </a>

        <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul class="nav-links">
          <li><a href="../products.html">Loan Programs</a></li>
          <li><a href="../calculators.html">Calculators</a></li>
          <li><a href="../blog.html">Resources</a></li>
          <li><a href="../testimonials.html">Testimonials</a></li>
          <li><a href="../about.html">About Adam</a></li>
          <li><a href="../realtors.html">For Realtors</a></li>
          <li><a href="../contact.html">Contact</a></li>
          <li><a href="https://mslp.my1003app.com/513013/register" class="nav-cta" target="_blank" rel="noopener">Apply Now</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero hero-short">
      <div class="container">
        <div class="newsletter-issue-badge">${formattedDate}</div>
        <h1 data-animate>${escapeHtml(title)}</h1>
        <p class="hero-subtitle" data-animate>${escapeHtml(description)}</p>
      </div>
    </section>

    <section class="section">
      <div class="container container-narrow">
        <div class="article-body">

          <div class="newsletter-author-bar">
            <div class="testimonial-avatar" style="width:48px;height:48px;font-size:1.125rem;">A</div>
            <div>
              <strong style="color: var(--color-navy);">Adam Styer</strong><br>
              <span style="font-size: 0.875rem; color: var(--color-gray);">Loan Originator, NMLS# 513013 &middot; ${formattedDate}</span>
            </div>
          </div>

          ${content}

${rateBox}

          <hr style="margin: 2.5rem 0; border: none; border-top: 1px solid var(--color-border);">

          <p>Have questions? Want to know what your options look like right now? Give me a call or shoot me a text. Happy to run the numbers for you.</p>

          <p>Talk soon,<br><strong>Adam Styer</strong><br>Adam Styer | Mortgage Solutions LP<br>NMLS# 513013 | <a href="tel:+15129566010">(512) 956-6010</a></p>

        </div>
      </div>
    </section>

    <section class="section bg-primary">
      <div class="container text-center">
        <h2 data-animate>Ready to Make a Move?</h2>
        <p data-animate>Whether you're buying, refinancing, or just exploring your options, Adam Styer is here to help.</p>
        <div class="cta-buttons" data-animate>
          <a href="../prequal.html" class="btn btn-light">Get Pre-Qualified</a>
          <a href="../contact.html" class="btn btn-outline-light">Contact Adam</a>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="../index.html">Home</a></li>
            <li><a href="../products.html">Loan Programs</a></li>
            <li><a href="../calculators.html">Calculators</a></li>
            <li><a href="../about.html">About Adam</a></li>
            <li><a href="../testimonials.html">Testimonials</a></li>
            <li><a href="../contact.html">Contact</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="../blog.html">Mortgage Resources</a></li>
            <li><a href="../realtors.html">For Realtors</a></li>
            <li><a href="../prequal.html">Pre-Qualification</a></li>
            <li><a href="../texas-complaint-notice.html">TX Consumer Notice</a></li>
            <li><a href="../calculators.html">Payment Calculator</a></li>
            <li><a href="../products.html#faq">FAQ</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Contact</h4>
          <p>
            <strong>Adam Styer | Mortgage Solutions LP</strong><br>
            Mortgage Solutions, LP
          </p>
          <p>
            <a href="tel:+15129566010">(512) 956-6010</a><br>
            <a href="mailto:adam@thestyerteam.com">adam@thestyerteam.com</a><br>
            Austin, TX
          </p>
        </div>

        <div class="footer-section">
          <h4>Awards &amp; Recognition</h4>
          <p>
            &#11088; 5.0 Stars &middot; 91 Google Reviews<br>
            &#11088; 4.98 Stars &middot; 45 Zillow Reviews
          </p>
          <div class="social-links">
            <a href="https://www.facebook.com/styerteam/" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/styerteam/" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
            <a href="https://www.linkedin.com/in/adamstyerloans/" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            <a href="https://www.zillow.com/lender-profile/adamstyer/" target="_blank" rel="noopener" aria-label="Zillow">Z</a>
          </div>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <div>
          <p>&copy; ${new Date().getFullYear()} Mortgage Solutions, LP. All rights reserved.</p>
          <div class="footer-nmls">
            <strong>NMLS#:</strong> 2526130 (Company) | 513013 (Adam Styer)<br>
            Mortgage Solutions, LP is a Licensed Mortgage Broker in Texas.
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script src="../script.js" defer></script>
</body>
</html>`;
}

function buildRateBox(ratesString) {
  if (!ratesString || !ratesString.trim()) return "";

  const lines = ratesString.split("\n").filter((l) => l.trim());
  if (!lines.length) return "";

  let rows = "";
  for (const line of lines) {
    const match = line.match(/^\s*(.+?):\s*(.+)/);
    if (match) {
      const product = match[1].trim();
      const rateInfo = match[2].trim();
      rows += `            <tr>
              <td style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--color-border); font-weight: 500;">${escapeHtml(product)}</td>
              <td style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--color-border); text-align: center;">${escapeHtml(rateInfo)}</td>
            </tr>\n`;
    }
  }

  if (!rows) return "";

  return `
          <div class="newsletter-rate-box" style="margin: 2rem 0; padding: 1.5rem; background: var(--color-light-gray); border-radius: var(--radius-lg); border-left: 4px solid var(--color-gold);">
            <h3 style="margin-bottom: 1rem; color: var(--color-navy);">This Week's Rates</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="padding: 0.5rem 1rem; text-align: left; border-bottom: 2px solid var(--color-navy); color: var(--color-navy);">Product</th>
                  <th style="padding: 0.5rem 1rem; text-align: center; border-bottom: 2px solid var(--color-navy); color: var(--color-navy);">Rate | APR</th>
                </tr>
              </thead>
              <tbody>
${rows}
              </tbody>
            </table>
            <p style="font-size: 0.75rem; color: var(--color-gray); margin-top: 0.75rem; margin-bottom: 0;">Rates are subject to change. Contact Adam for a personalized quote based on your situation.</p>
          </div>
`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50)
    .replace(/-+$/, "");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = { buildWebPage };
