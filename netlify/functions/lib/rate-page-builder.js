/**
 * Builds a full HTML page for /rates/ from rate data + AI commentary.
 * The rate table is the star — built server-side, not by the AI.
 * Includes proper compliance disclaimers and rate assumptions.
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

  <style>
    /* ── Rate Page Specific Styles ── */
    .rate-card {
      margin: 2rem 0 0.75rem;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.04);
      border: 1px solid var(--color-border);
    }
    .rate-card-header {
      background: var(--color-navy);
      padding: 1.125rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .rate-card-header h2 {
      margin: 0;
      color: #fff;
      font-family: var(--font-primary);
      font-size: 1.125rem;
      font-weight: 600;
      letter-spacing: 0.01em;
    }
    .rate-card-header .rate-date {
      color: rgba(255,255,255,0.6);
      font-size: 0.8rem;
    }
    .rate-table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
    }
    .rate-table thead th {
      padding: 0.875rem 1.5rem;
      text-align: left;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-gray);
      border-bottom: 2px solid var(--color-gold);
    }
    .rate-table thead th:not(:first-child) {
      text-align: center;
    }
    .rate-table tbody tr {
      transition: background var(--transition-fast);
    }
    .rate-table tbody tr:nth-child(even) {
      background: rgba(10, 31, 63, 0.02);
    }
    .rate-table tbody tr:hover {
      background: rgba(201, 168, 76, 0.06);
    }
    .rate-table tbody td {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--color-border);
    }
    .rate-table tbody tr:last-child td {
      border-bottom: none;
    }
    .rate-product {
      font-weight: 500;
      color: var(--color-text);
      font-size: 0.95rem;
    }
    .rate-value {
      text-align: center;
      font-size: 1.375rem;
      font-weight: 700;
      color: var(--color-navy);
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.01em;
    }
    .rate-apr {
      text-align: center;
      font-size: 0.9rem;
      color: var(--color-gray);
      font-variant-numeric: tabular-nums;
    }

    /* Assumptions box */
    .rate-assumptions {
      padding: 0.875rem 1.5rem;
      background: var(--color-light-gray);
      border-top: 1px solid var(--color-border);
      font-size: 0.775rem;
      line-height: 1.5;
      color: var(--color-gray);
    }

    /* Direction badge */
    .rate-direction-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.125rem;
      border-radius: 2rem;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    .rate-direction-badge .badge-icon {
      font-size: 1.1rem;
    }

    /* CTA card */
    .rate-cta-card {
      margin: 2rem 0;
      padding: 1.75rem 2rem;
      background: linear-gradient(135deg, rgba(10, 31, 63, 0.03) 0%, rgba(201, 168, 76, 0.06) 100%);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      text-align: center;
    }
    .rate-cta-card h3 {
      margin: 0 0 0.5rem;
      color: var(--color-navy);
      font-size: 1.125rem;
    }
    .rate-cta-card p {
      margin: 0 0 1.25rem;
      color: var(--color-gray);
      font-size: 0.95rem;
    }
    .rate-cta-buttons {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .rate-cta-buttons .btn {
      padding: 0.75rem 1.75rem;
      font-size: 0.9rem;
    }

    /* Compliance footer */
    .rate-compliance {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--color-border);
    }
    .rate-compliance p {
      font-size: 0.7rem;
      line-height: 1.6;
      color: var(--color-gray);
      margin-bottom: 0.5rem;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .rate-table thead th,
      .rate-table tbody td {
        padding: 0.75rem 1rem;
      }
      .rate-value {
        font-size: 1.125rem;
      }
      .rate-card-header {
        padding: 1rem 1.25rem;
      }
      .rate-cta-card {
        padding: 1.5rem;
      }
    }
  </style>
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

          <div class="rate-cta-card">
            <h3>Want to Know Your Rate?</h3>
            <p>Every borrower is different. Let me run the numbers for your specific situation &mdash; no obligation, no pressure.</p>
            <div class="rate-cta-buttons">
              <a href="../prequal.html" class="btn btn-primary">Get Pre-Qualified</a>
              <a href="../contact.html" class="btn btn-outline">Contact Adam</a>
            </div>
          </div>

          <p>Talk soon,<br><strong>Adam Styer</strong><br>Adam Styer | Mortgage Solutions LP<br>NMLS# 513013 | <a href="tel:+15129566010">(512) 956-6010</a></p>

          <div class="rate-compliance">
            <p><strong>Rate Assumptions:</strong> Rates shown assume a 20% down payment, 740+ credit score, owner-occupied primary residence, single-family home, and are based on a 30-day lock period. Rates are subject to change without notice and may vary based on individual circumstances.</p>
            <p><strong>Disclaimer:</strong> Rates shown are for informational purposes only and do not constitute a loan commitment or guarantee. Actual rates, terms, and availability depend on credit score, loan amount, loan-to-value ratio, property type, occupancy, and other underwriting factors. APR reflects the total cost of the loan including certain fees. Contact Adam Styer for a personalized rate quote and full disclosure of terms and costs.</p>
            <p>Mortgage Solutions, LP &middot; NMLS# 2526130 &middot; Adam Styer NMLS# 513013 &middot; Texas Licensed Mortgage Broker &middot; <a href="../texas-complaint-notice.html">TX Consumer Complaint Notice</a></p>
          </div>

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

// ══════════════════════════════════════════════════════════════
// Rate Table Builder
// ══════════════════════════════════════════════════════════════

function buildRateTable(ratesString) {
  if (!ratesString || !ratesString.trim()) return "";

  const lines = ratesString.split("\n").filter((l) => l.trim());
  if (!lines.length) return "";

  let rows = "";
  for (const line of lines) {
    const match = line.match(/^\s*(.+?):\s*(.+)/);
    if (match) {
      const product = match[1].trim();
      const rateInfo = match[2].trim();

      // Split rate and APR if pipe-separated
      const parts = rateInfo.split("|").map((s) => s.trim());
      const rate = parts[0] || "";
      const apr = parts[1] ? parts[1].replace(/^APR:\s*/i, "") : "";

      rows += `              <tr>
                <td class="rate-product">${escapeHtml(product)}</td>
                <td class="rate-value">${escapeHtml(rate)}</td>
                <td class="rate-apr">${apr ? escapeHtml(apr) : "&mdash;"}</td>
              </tr>\n`;
    }
  }

  if (!rows) return "";

  return `
          <div class="rate-card">
            <div class="rate-card-header">
              <h2>This Week&rsquo;s Rates</h2>
            </div>
            <table class="rate-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Rate</th>
                  <th>APR</th>
                </tr>
              </thead>
              <tbody>
${rows}
              </tbody>
            </table>
            <div class="rate-assumptions">
              <strong>Assumptions:</strong> 20% down payment &middot; 740+ credit score &middot; Owner-occupied primary residence &middot; Single-family home &middot; 30-day lock
            </div>
          </div>
`;
}

// ══════════════════════════════════════════════════════════════
// Direction Badge
// ══════════════════════════════════════════════════════════════

function buildDirectionBadge(direction) {
  if (!direction) return "";

  const badges = {
    down:     { label: "Rates Dropped",   color: "#059669", bg: "#ECFDF5", icon: "&#8595;" },
    up:       { label: "Rates Went Up",   color: "#DC2626", bg: "#FEF2F2", icon: "&#8593;" },
    flat:     { label: "Rates Unchanged", color: "#6B7280", bg: "#F3F4F6", icon: "&#8596;" },
    volatile: { label: "Rates Mixed",     color: "#D97706", bg: "#FFFBEB", icon: "&#8597;" },
  };

  const badge = badges[direction];
  if (!badge) return "";

  return `
          <div class="rate-direction-badge" style="background: ${badge.bg}; color: ${badge.color};">
            <span class="badge-icon">${badge.icon}</span> ${badge.label} This Week
          </div>
`;
}

// ══════════════════════════════════════════════════════════════
// Helpers
// ══════════════════════════════════════════════════════════════

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
