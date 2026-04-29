/* ==========================================================================
   Scroll Effects
   Subtle reveal, header, stat counter, and divider animations.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 768px)').matches;

  function addReveal(el) {
    if (el) el.classList.add('reveal');
  }

  function addRevealAll(selector, root) {
    Array.prototype.forEach.call((root || document).querySelectorAll(selector), addReveal);
  }

  function addStagger(container, childSelector, delay) {
    if (!container) return;
    container.classList.add('reveal-stagger');
    Array.prototype.forEach.call(container.querySelectorAll(childSelector), function (child, index) {
      addReveal(child);
      child.style.setProperty('--reveal-delay', (index * delay).toFixed(2) + 's');
    });
  }

  function decorateReveals() {
    addRevealAll('[data-animate]');
    addRevealAll('main section h1, main section h2');
    addRevealAll('.hero-subtitle, .city-subtitle, .section-subtitle, .product-desc, .cta-subtitle, .quick-contact-subtitle');
    addRevealAll('.hero-trust-badge, .hero-trust, .review-aggregate-bar, .quick-contact-card, .disclosure-box');
    addRevealAll('.testimonial, .testimonial-card, .testimonial-marquee-card');

    Array.prototype.forEach.call(document.querySelectorAll('.stats-strip .stats-grid'), function (grid) {
      addStagger(grid, '.stat-item', 0.1);
    });

    Array.prototype.forEach.call(document.querySelectorAll('.loan-program-grid, .loan-options-grid, .product-features, .grid'), function (grid) {
      addStagger(grid, '.loan-program-card, .loan-option-card, .feature-item, .card', 0.08);
    });

    Array.prototype.forEach.call(document.querySelectorAll('.product-section'), function (section, index) {
      addReveal(section);
      section.style.setProperty('--reveal-delay', ((index % 4) * 0.08).toFixed(2) + 's');
    });

    Array.prototype.forEach.call(document.querySelectorAll('a[href*="realtors"], a[href*="realtor"]'), function (link) {
      var section = link.closest('section');
      if (section) addRevealAll('h2, p, .btn, .realtor-cta-image', section);
    });

    if (/-mortgage-lender\.html$/.test(window.location.pathname)) {
      addRevealAll('.city-hero h1, .city-hero .city-subtitle, .hero h1, .hero .hero-subtitle');
      var firstIntro = document.querySelector('main section:not(.hero):not(.city-hero) .container p');
      addReveal(firstIntro);
      addRevealAll('.why-city-stats, .stat-card');
    }
  }

  function initNavState() {
    var header = document.querySelector('header');
    if (!header) return;
    var ticking = false;

    function update() {
      header.classList.toggle('scrolled', window.scrollY > 70);
      ticking = false;
    }

    update();
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
  }

  function parseCounterText(text) {
    var trimmed = text.trim();
    var match = trimmed.match(/^([^0-9.-]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
    if (!match) return null;
    return {
      prefix: match[1] || '',
      value: parseFloat(match[2].replace(/,/g, '')),
      suffix: match[3] || '',
      decimals: match[2].indexOf('.') >= 0 ? match[2].split('.')[1].length : 0,
      commas: match[2].indexOf(',') >= 0
    };
  }

  function formatNumber(value, decimals, commas) {
    if (commas) {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    return decimals > 0 ? value.toFixed(decimals) : String(Math.floor(value));
  }

  function initCounters() {
    var counters = Array.prototype.slice.call(document.querySelectorAll('.stats-strip .stat-number'));
    if (!counters.length) return;

    counters.forEach(function (counter) {
      var parsed = counter.hasAttribute('data-count') ? {
        prefix: counter.dataset.countPrefix || '',
        value: parseFloat(counter.dataset.count),
        suffix: counter.dataset.countSuffix || '',
        decimals: counter.dataset.count.indexOf('.') >= 0 ? 1 : 0,
        commas: counter.dataset.countCommas === 'true'
      } : parseCounterText(counter.textContent);

      if (!parsed || !Number.isFinite(parsed.value)) return;
      counter.dataset.counterPrefix = parsed.prefix;
      counter.dataset.counterValue = String(parsed.value);
      counter.dataset.counterSuffix = parsed.suffix;
      counter.dataset.counterDecimals = String(parsed.decimals);
      counter.dataset.counterCommas = String(parsed.commas);
      counter.textContent = parsed.prefix + '0' + parsed.suffix;
    });

    if (reduceMotion) {
      counters.forEach(function (counter) {
        var value = parseFloat(counter.dataset.counterValue);
        if (!Number.isFinite(value)) return;
        counter.textContent = counter.dataset.counterPrefix +
          formatNumber(value, parseInt(counter.dataset.counterDecimals, 10), counter.dataset.counterCommas === 'true') +
          counter.dataset.counterSuffix;
      });
      return;
    }

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function animateCounter(counter) {
      var target = parseFloat(counter.dataset.counterValue);
      if (!Number.isFinite(target)) return;

      var prefix = counter.dataset.counterPrefix || '';
      var suffix = counter.dataset.counterSuffix || '';
      var decimals = parseInt(counter.dataset.counterDecimals, 10) || 0;
      var commas = counter.dataset.counterCommas === 'true';
      var duration = 1500;
      var start = performance.now();

      function tick(now) {
        var progress = Math.min((now - start) / duration, 1);
        var current = easeOutQuart(progress) * target;
        counter.textContent = prefix + formatNumber(current, decimals, commas) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    counters.forEach(function (counter) {
      if (counter.dataset.counterValue) observer.observe(counter);
    });
  }

  function initReveals() {
    var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!revealItems.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initDividerDraw() {
    var dividers = Array.prototype.slice.call(document.querySelectorAll('hr, .footer-divider'));
    if (!dividers.length) return;

    dividers.forEach(function (divider) {
      divider.classList.add('divider-draw');
    });

    if (reduceMotion || isMobile || !('IntersectionObserver' in window)) {
      dividers.forEach(function (divider) {
        divider.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    dividers.forEach(function (divider) {
      observer.observe(divider);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    decorateReveals();
    initNavState();
    initCounters();
    initReveals();
    initDividerDraw();
  });
})();
