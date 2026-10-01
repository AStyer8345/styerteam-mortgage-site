"""Homepage polish (2026-10-01): proof band with count-up, 'Mortgages your bank
said no to' examples, review ticker restored, photo in Meet Adam."""
import re
p = "index.html"; h = open(p).read()
old_track = open("/tmp/claude-0/cmp/old_track.html").read()

# 1. Proof band replaces the small stats strip
s = h.index('<section class="stats-strip home-proof-strip"')
e = h.index('</section>', s) + len('</section>')
band = '''<section class="proof-band" aria-label="Track record">
      <div class="container">
        <div class="proof-band-grid">
          <div class="proof-stat"><span class="proof-num" data-count="1000" data-suffix="+">1,000+</span><span class="proof-label">Loans closed</span></div>
          <a class="proof-stat" href="https://www.google.com/maps/search/?api=1&amp;query=Adam%20Styer%20Mortgage&amp;query_place_id=ChIJYy5uEFPKRIYRmF-k_5gPk74" target="_blank" rel="noopener"><span class="proof-num" data-count="5.0" data-decimals="1" data-suffix=" ★">5.0 ★</span><span class="proof-label">Google · 99 reviews</span></a>
          <a class="proof-stat" href="https://www.zillow.com/lender-profile/adamstyer/" target="_blank" rel="noopener"><span class="proof-num" data-count="4.98" data-decimals="2" data-suffix=" ★">4.98 ★</span><span class="proof-label">Zillow · 45 reviews</span></a>
          <div class="proof-stat"><span class="proof-num" data-count="40" data-suffix="+">40+</span><span class="proof-label">Capital partners</span></div>
        </div>
      </div>
    </section>'''
h = h[:s] + band + h[e:]

# 2. Bank-said-no examples, right after the proof band
said_no = '''
    <section class="said-no" id="bank-said-no" aria-labelledby="said-no-title">
      <div class="container">
        <p class="said-no-kicker">Real files · Austin</p>
        <h2 id="said-no-title">Mortgages your bank said no to.</h2>
        <p class="said-no-intro">Being declined by one bank rarely means you can&rsquo;t get a mortgage. It usually means you were sent down the wrong path. A few recent examples:</p>
        <div class="said-no-grid">
          <article class="said-no-card">
            <p class="said-no-tag">Self-employed jumbo</p>
            <h3>$1.2M Westlake purchase after 3 banks declined</h3>
            <p><strong>The problem:</strong> An S-corp owner whose write-offs shrank his tax-return income. Banks saw low W-2 wages and said no.</p>
            <p><strong>The fix:</strong> A 24-month bank statement loan that counted real business deposits instead of taxable income.</p>
            <p class="said-no-result">Closed within 0.25% of conventional pricing.</p>
          </article>
          <article class="said-no-card">
            <p class="said-no-tag">DSCR investor</p>
            <h3>4 Austin short-term rentals, no personal income docs</h3>
            <p><strong>The problem:</strong> An investor scaling past the conventional limit on financed properties, with tax returns that couldn&rsquo;t support it.</p>
            <p><strong>The fix:</strong> DSCR loans qualified on each property&rsquo;s rent, titled in an LLC.</p>
            <p class="said-no-result">Three closed in 60 days; the fourth the next month.</p>
          </article>
          <article class="said-no-card">
            <p class="said-no-tag">Move-up buyer</p>
            <h3>Their home&rsquo;s sale fell apart. They still closed.</h3>
            <p><strong>The problem:</strong> The buyers of their current home walked away mid-transaction, taking the down payment and the payment exclusion with them.</p>
            <p><strong>The fix:</strong> A guaranteed backup contract on the old home, plus a 75-20-5 structure so they closed with 5% down and pay off the second loan when the home sells.</p>
            <p class="said-no-result">Closed on the new home without waiting to sell.</p>
          </article>
        </div>
        <p class="said-no-note">Composite scenarios based on files Adam has closed; names and exact figures changed for privacy. Every file depends on full underwriting.</p>
        <p class="said-no-cta"><a class="btn btn-primary" href="#contact-form" data-track="scenario_review_click" data-source="homepage_said_no">See My Options</a> <a href="/scenarios.html">More real scenarios →</a></p>
      </div>
    </section>'''
h = h.replace(band, band + said_no, 1)

# 3. Restore the moving review ticker (5 reviews + duplicate set for a seamless loop)
s = h.index('<div class="testimonial-marquee-track">')
e = h.index('<div class="text-center mt-3xl">', s)
new_track = old_track[:old_track.index('<div class="text-center mt-3xl">')]
# keep the 'Read review on Google' proof links that exist in the current cards
h = h[:s] + new_track.rstrip() + "\n\n        " + h[e:]
h = h.replace('class="testimonial-marquee-wrap"', 'class="testimonial-marquee-wrap is-ticker"', 1)

# 4. Photo in Meet Adam
old_about = re.search(r'<section id="about-adam"><div class="container">(.*?)</div></section>', h, re.S)
inner = old_about.group(1)
h = h.replace(old_about.group(0),
  '<section id="about-adam" class="about-adam-photo"><div class="container about-adam-grid"><figure class="about-adam-figure"><img src="/assets/family.webp" width="600" height="800" loading="lazy" decoding="async" alt="Adam Styer with his wife and kids on a hike in the Texas Hill Country"></figure><div>'
  + inner + '</div></div></section>', 1)

# 5. Count-up script (respects reduced motion)
js = '''<script>
(function(){var els=document.querySelectorAll('.proof-num[data-count]');if(!els.length||!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
function run(el){var t=parseFloat(el.dataset.count),d=+(el.dataset.decimals||0),s=el.dataset.suffix||'',start=null,dur=1400;
function f(ts){if(!start)start=ts;var k=Math.min(1,(ts-start)/dur),v=t*(1-Math.pow(1-k,3));el.textContent=(d?v.toFixed(d):Math.round(v).toLocaleString())+s;if(k<1)requestAnimationFrame(f);}requestAnimationFrame(f);}
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){run(x.target);io.unobserve(x.target);}});},{threshold:.4});els.forEach(function(el){io.observe(el);});})();
</script>
</body>'''
h = h.replace("</body>", js, 1)
open(p, "w").write(h)
print("homepage ok")
