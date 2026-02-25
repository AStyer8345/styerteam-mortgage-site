/**
 * Builds a full HTML page for /rates/ from rate data + AI commentary.
 * Simpler than the newsletter page — rate table is the star.
 */

function buildRatePage({ title, description, date, rates, direction, commentary }) {
  const formattedDate = formatDate(date);
  const rateTable = buildRateTable(rates);
  const directionBadge = buildDirectionBadge(direction);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Adam Styer | Mortgage Solutions LP</title>
  <meta name="description" content="${escapeHtml(description)}">

  <meta name="robots" content="noindex, nofollow">

  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Adam Styer | Mortgage Solutions LP">

  <meta name="twitter:card" content="summary">
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
        <p class="hero-subtitle" data-animate>Current mortgage rates from Adam Styer at Mortgage Solutions LP</p>
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

${directionBadge}

${rateTable}

          ${commentary || ""}

          <hr style="margin: 2.5rem 0; border: none; border-top: 1px solid var(--color-border);">

          <p style="font-size: 0.75rem; color: var(--color-gray);">Rates shown are for informational purposes only and are subject to change without notice. Actual rates depend on credit score, loan amount, property type, occupancy, and other factors. Contact Adam Styer for a personalized rate quote. Mortgage Solutions, LP NMLS# 2526130. Adam Styer NMLS# 513013.</p>

          <p>Talk soon,<br><strong>Adam Styer</strong><br>Adam Styer | Mortgage Solutions LP<br>NMLS# 513013 | <a href="tel:+15129566010">(512) 956-6010</a></p>

        </div>
      </div>
    </section>

    <section class="section bg-primary">
      <div class="container text-center">
        <h2 data-animate>Want to Know Your Rate?</h2>
        <p data-animate>Every borrower is different. Let Adam run the numbers for your specific situation — no obligation, no pressure.</p>
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

function buildRateTable(ratesString) {
  if (!ratesString || !ratesString.trim()) return "";

  const lines = ratesString.split("\n").filter((l) => l.trim());
  if (!lines.length) return "";

  let rows = "";
  let rowIndex = 0;
  for (const line of lines) {
    const match = line.match(/^\s*(.+?):\s*(.+)/);
    if (match) {
      const product = match[1].trim();
      const rateInfo = match[2].trim();

      // Split rate and APR if pipe-separated
      const parts = rateInfo.split("|").map((s) => s.trim());
      const rate = parts[0] || "";
      const apr = parts[1] ? parts[1].replace(/^APR:\s*/i, "") : "";

      const stripeBg = rowIndex % 2 === 1 ? "background: rgba(10, 31, 63, 0.03);" : "";
      rows += `            <tr style="${stripeBg}">
              <td style="padding: 1rem 1.25rem; font-weight: 500; color: #374151;">${escapeHtml(product)}</td>
              <td style="padding: 1rem 1.25rem; text-align: center; font-size: 1.25rem; font-weight: 700; color: var(--color-navy);">${escapeHtml(rate)}</td>
              <td style="padding: 1rem 1.25rem; text-align: center; font-size: 0.95rem; color: #6B7280;">${apr ? escapeHtml(apr) : "&mdash;"}</td>
            </tr>\n`;
      rowIndex++;
    }
  }

  if (!rows) return "";

  return `
          <div style="margin: 2rem 0 2.5rem; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);">
            <div style="background: var(--color-navy); padding: 1rem 1.25rem;">
              <h2 style="margin: 0; color: #fff; font-size: 1.25rem; font-weight: 600; letter-spacing: 0.01em;">This Week's Rates</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; background: #fff;">
              <thead>
                <tr style="border-bottom: 2px solid var(--color-gold);">
                  <th style="padding: 0.875rem 1.25rem; text-align: left; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6B7280;">Product</th>
                  <th style="padding: 0.875rem 1.25rem; text-align: center; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6B7280;">Rate</th>
                  <th style="padding: 0.875rem 1.25rem; text-align: center; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6B7280;">APR</th>
                </tr>
              </thead>
              <tbody>
${rows}
              </tbody>
            </table>
          </div>
`;
}

function buildDirectionBadge(direction) {
  if (!direction) return "";

  const badges = {
    down: { label: "Rates Dropped", color: "#059669", bg: "#ECFDF5", icon: "&#8595;" },
    up: { label: "Rates Went Up", color: "#DC2626", bg: "#FEF2F2", icon: "&#8593;" },
    flat: { label: "Rates Unchanged", color: "#6B7280", bg: "#F3F4F6", icon: "&#8596;" },
    volatile: { label: "Rates Mixed", color: "#D97706", bg: "#FFFBEB", icon: "&#8597;" },
  };

  const badge = badges[direction];
  if (!badge) return "";

  return `
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 2rem; background: ${badge.bg}; color: ${badge.color}; font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">
            <span style="font-size: 1.1rem;">${badge.icon}</span> ${badge.label} This Week
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

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = { buildRatePage };
