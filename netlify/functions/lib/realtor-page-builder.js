/**
 * Builds a full SEO-optimized HTML page for /realtor-updates/ from AI-generated content.
 * Parallel to blog-page-builder.js but targeted at realtors:
 *   - index, follow (Google CAN see it)
 *   - Article JSON-LD structured data
 *   - Realtor-specific CTA ("Let's Partner Up")
 *   - Back link to realtor-resources.html
 *   - No rate box
 *   - Category badge from realtor categories
 */

function buildRealtorPage({ title, description, date, slug, content, category }) {
  const formattedDate = formatDate(date);
  const isoDate = date; // Already YYYY-MM-DD
  const pageUrl = `https://styermortgage.com/realtor-updates/${slug}.html`;

  // Article structured data for Google rich results
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": pageUrl,
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": {
      "@type": "Person",
      "name": "Adam Styer",
      "url": "https://styermortgage.com/about.html",
      "jobTitle": "Loan Originator",
      "worksFor": {
        "@type": "Organization",
        "name": "Kyber Mortgage Corporation dba HyperSmart Home Loans"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kyber Mortgage Corporation dba HyperSmart Home Loans",
      "url": "https://styermortgage.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://styermortgage.com/assets/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    }
  }, null, 2);

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
  <title>${escapeHtml(title)} | Adam Styer | Austin Mortgage Broker</title>
  <meta name="description" content="${escapeHtml(description)}">

  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${pageUrl}">

  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Adam Styer | HyperSmart Home Loans">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">

  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../style.css">

  <script type="application/ld+json">
  ${articleSchema}
  </script>
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
        <a href="/" class="nav-brand">
          <img src="/assets/logo.svg" alt="Adam Styer | HyperSmart Home Loans" class="nav-logo-img" width="180" height="40">
        </a>

        <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul class="nav-links">
          <li class="nav-has-dropdown"><a href="/mortgage-for-business-owners-austin.html">Loan Programs</a><ul class="nav-dropdown"><li><a href="/mortgage-for-business-owners-austin.html">Business Owners &amp; Self-Employed</a></li><li><a href="/self-employed-mortgage-austin.html">Self-Employed Mortgage</a></li><li><a href="/bank-statement-loans.html">Bank Statement Loans</a></li><li><a href="/dscr-loan-austin-tx.html">DSCR Investor Loans</a></li><li><a href="/asset-depletion-mortgage-texas.html">Asset Depletion</a></li><li><a href="/k1-income-mortgage-austin.html">K-1 Income Mortgage</a></li><li><a href="/high-net-worth-mortgage.html">High-Net-Worth</a></li><li><a href="/non-qm-loans.html">Non-QM Hub</a></li></ul></li>
          <li class="nav-has-dropdown"><a href="/resources/">Resources</a><ul class="nav-dropdown"><li><a href="/calculators.html">Calculators</a></li><li><a href="/dscr-calculator.html">DSCR Calculator</a></li><li><a href="/asset-depletion-calculator.html">Asset Depletion Calculator</a></li><li><a href="/rate-buydown-calculator.html">Buydown Calculator</a></li><li><a href="/wrap-mortgage-calculator.html">WRAP Calculator</a></li><li><a href="/mortgage-glossary.html">Mortgage Glossary</a></li><li><a href="/resources/first-time-buyer-guide/">Buyer Guide</a></li><li><a href="/scenarios.html">Scenarios</a></li><li><a href="/blog.html">Blog</a></li><li><a href="/rate-check.html">Rate Check</a></li><li><a href="/realtors.html">For Realtors</a></li></ul></li>
          <li><a href="/testimonials.html">Testimonials</a></li>
          <li class="nav-has-dropdown"><a href="/contact.html">Contact</a><ul class="nav-dropdown"><li><a href="/about.html">About Adam</a></li></ul></li>
          <li class="nav-phone-li"><a href="tel:+15129566010" class="nav-phone">(512) 956-6010</a></li><li><a href="/scenario.html" class="nav-cta">Send Your Scenario</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero hero-short">
      <div class="container">
        <div class="newsletter-issue-badge">${formattedDate}${category ? ` &middot; ${escapeHtml(category)}` : ""}</div>
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

          <hr style="margin: 2.5rem 0; border: none; border-top: 1px solid var(--color-border);">

          <p>Want to talk strategy or run scenarios for a client? Give me a call or shoot me a text. Always happy to help close the deal.</p>

          <p>Let's close some deals together,<br><strong>Adam Styer</strong><br>Adam Styer | HyperSmart Home Loans<br>NMLS# 513013 | <a href="tel:+15129566010">(512) 956-6010</a></p>

        </div>

        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
          <a href="../realtor-resources.html" style="color: var(--color-gold); text-decoration: none; font-weight: 500;">&larr; Back to partner resources</a>
        </div>
      </div>
    </section>

    <section class="section bg-primary">
      <div class="container text-center">
        <h2 data-animate>Let's Partner Up</h2>
        <p data-animate>Looking for a lending partner who communicates, closes on time, and makes you look good? Let's talk.</p>
        <div class="cta-buttons" data-animate>
          <a href="../realtors.html" class="btn btn-light">Why Partner With Adam</a>
          <a href="../contact.html" class="btn btn-outline-light">Get in Touch</a>
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
            <li><a href="../realtor-resources.html">Partner Resources</a></li>
            <li><a href="../prequal.html">Pre-Qualification</a></li>
            <li><a href="../texas-complaint-notice.html">TX Consumer Notice</a></li>
            <li><a href="../products.html#faq">FAQ</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Contact</h4>
          <p>
            <strong>Adam Styer | HyperSmart Home Loans</strong><br>
            Kyber Mortgage Corporation dba HyperSmart Home Loans
          </p>
          <p>
            <a href="tel:+15129566010">(512) 956-6010</a><br>
            <a href="mailto:adam.styer@hypersmart.loan">adam.styer@hypersmart.loan</a><br>
            Austin, TX
          </p>
        </div>

        <div class="footer-section">
          <h4>Awards &amp; Recognition</h4>
          <p>
            &#11088; 5.0 Google &middot; 4.98 Zillow<br>137+ Reviews &middot; Licensed in Texas
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
          <p>&copy; ${new Date().getFullYear()} Kyber Mortgage Corporation dba HyperSmart Home Loans. All rights reserved.</p>
          <div class="footer-nmls">
            <strong>NMLS#:</strong> 2653540 (Company) | 513013 (Adam Styer)<br>
            Kyber Mortgage Corporation dba HyperSmart Home Loans is a Licensed Mortgage Broker in Texas.
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script src="../script.js" defer></script>
</body>
</html>`;
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

module.exports = { buildRealtorPage };
