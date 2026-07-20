/* ==========================================================================
   HyperSmart Home Loans - Main JavaScript
   ========================================================================== */

// ========================================================================
// UTILITIES
// ========================================================================

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const notification = document.createElement('div');
    notification.textContent = 'Copied!';
    notification.className = 'toast toast--success';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  }).catch(() => {
    console.error('Failed to copy');
  });
}

function dispatchLeadSubmitted(detail, options) {
  document.dispatchEvent(new CustomEvent('styer:lead-submitted', { detail }));
  // Feed GTM/Google Ads: standard GA4 lead conversion event. Pushes to the
  // dataLayer (GTM's public input) — does NOT touch the GTM container snippet.
  window.dataLayer = window.dataLayer || [];
  const eventPayload = Object.assign({ event: 'generate_lead' }, detail || {});

  if (!options || options.waitForTags !== true) {
    window.dataLayer.push(eventPayload);
    return Promise.resolve();
  }

  const timeoutMs = Number.isFinite(options.timeoutMs) ? options.timeoutMs : 1200;

  return new Promise((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    window.dataLayer.push(Object.assign(eventPayload, {
      eventCallback: done,
      eventTimeout: timeoutMs,
    }));

    setTimeout(done, timeoutMs + 250);
  });
}

// ========================================================================
// 1. NAVIGATION & HEADER
// ========================================================================

function initNavigation() {
  const header = document.querySelector('header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuToggle && navLinks) {
    if (!navLinks.id) navLinks.id = 'site-nav-links';
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-controls', navLinks.id);
  }

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked (event delegation)
    // Skip: dropdown parent links (they toggle the sub-menu instead)
    navLinks.addEventListener('click', (e) => {
      if (e.target.matches('a') && !e.target.closest('.nav-has-dropdown > a')) {
        navLinks.classList.remove('active');
        navLinks.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('open'));
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile dropdown toggle (click on parent link)
  if (navLinks) {
    navLinks.addEventListener('click', (e) => {
      const dropdownParent = e.target.closest('.nav-has-dropdown');
      if (dropdownParent && window.innerWidth <= 768) {
        // Only intercept the parent <a> click, not the child dropdown links
        if (e.target.closest('.nav-dropdown')) return;
        e.preventDefault();
        const isOpen = dropdownParent.classList.toggle('open');
        // Close other open dropdowns
        navLinks.querySelectorAll('.nav-has-dropdown').forEach(el => {
          if (el !== dropdownParent) el.classList.remove('open');
        });
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navLinks.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('open'));
      if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Smooth scroll for anchor links (event delegation on document)
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (href !== '#') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}

// ========================================================================
// 3. ACCORDION FUNCTIONALITY
// ========================================================================

function initAccordion() {
  // Generate unique IDs for ARIA relationships
  document.querySelectorAll('.accordion').forEach((accordion, aIdx) => {
    accordion.querySelectorAll('.accordion-button').forEach((button, bIdx) => {
      const panel = button.nextElementSibling;
      if (!panel) return;

      const id = `accordion-${aIdx}-panel-${bIdx}`;
      panel.id = id;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', `${id}-btn`);

      button.id = `${id}-btn`;
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', id);
    });
  });

  // Event delegation — single listener for all accordion buttons
  document.addEventListener('click', (e) => {
    const button = e.target.closest('.accordion-button');
    if (!button) return;

    const accordion = button.closest('.accordion');
    const isActive = button.classList.contains('active');

    // Close all other items in the same accordion
    if (accordion) {
      accordion.querySelectorAll('.accordion-button.active').forEach(btn => {
        if (btn !== button) {
          btn.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          btn.nextElementSibling.classList.remove('active');
          btn.nextElementSibling.hidden = true;
        }
      });
    }

    // Toggle current item
    button.classList.toggle('active', !isActive);
    button.setAttribute('aria-expanded', String(!isActive));
    button.nextElementSibling.classList.toggle('active', !isActive);
    button.nextElementSibling.hidden = isActive;
  });

  // Keyboard navigation within accordions
  document.addEventListener('keydown', (e) => {
    const button = e.target.closest('.accordion-button');
    if (!button) return;

    const accordion = button.closest('.accordion');
    if (!accordion) return;

    const buttons = [...accordion.querySelectorAll('.accordion-button')];
    const index = buttons.indexOf(button);

    let next;
    if (e.key === 'ArrowDown') {
      next = buttons[(index + 1) % buttons.length];
    } else if (e.key === 'ArrowUp') {
      next = buttons[(index - 1 + buttons.length) % buttons.length];
    } else if (e.key === 'Home') {
      next = buttons[0];
    } else if (e.key === 'End') {
      next = buttons[buttons.length - 1];
    }

    if (next) {
      e.preventDefault();
      next.focus();
    }
  });
}

// ========================================================================
// 4. TABS FUNCTIONALITY
// ========================================================================

function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((tabGroup, gIdx) => {
    const buttons = tabGroup.querySelectorAll('.tab-button');
    const panels = tabGroup.querySelectorAll('.tab-content');

    // Set ARIA roles
    const tabList = tabGroup.querySelector('.tabs-wrapper') || tabGroup.querySelector('.calculator-tabs');
    if (tabList) {
      tabList.setAttribute('role', 'tablist');
    }

    buttons.forEach((button, bIdx) => {
      const tabId = button.getAttribute('data-tab');
      const panel = tabGroup.querySelector(`[data-tab-content="${tabId}"]`);

      // Set ARIA attributes
      const btnId = `tab-${gIdx}-${bIdx}`;
      const panelId = `tabpanel-${gIdx}-${bIdx}`;

      button.setAttribute('role', 'tab');
      button.id = btnId;
      button.setAttribute('aria-selected', bIdx === 0 ? 'true' : 'false');
      button.setAttribute('tabindex', bIdx === 0 ? '0' : '-1');

      if (panel) {
        panel.setAttribute('role', 'tabpanel');
        panel.id = panelId;
        button.setAttribute('aria-controls', panelId);
        panel.setAttribute('aria-labelledby', btnId);
      }

      // Set first tab active by default
      if (bIdx === 0) {
        button.classList.add('active');
        if (panel) panel.classList.add('active');
      }
    });

    // Click handler via event delegation
    tabGroup.addEventListener('click', (e) => {
      const button = e.target.closest('.tab-button');
      if (!button) return;

      // Deactivate all
      buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
      });
      panels.forEach(panel => panel.classList.remove('active'));

      // Activate clicked
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      button.setAttribute('tabindex', '0');

      const tabId = button.getAttribute('data-tab');
      const panel = tabGroup.querySelector(`[data-tab-content="${tabId}"]`);
      if (panel) panel.classList.add('active');
    });

    // Keyboard navigation within tabs
    tabGroup.addEventListener('keydown', (e) => {
      const button = e.target.closest('.tab-button');
      if (!button) return;

      const btnArr = [...buttons];
      const index = btnArr.indexOf(button);
      let next;

      if (e.key === 'ArrowRight') {
        next = btnArr[(index + 1) % btnArr.length];
      } else if (e.key === 'ArrowLeft') {
        next = btnArr[(index - 1 + btnArr.length) % btnArr.length];
      } else if (e.key === 'Home') {
        next = btnArr[0];
      } else if (e.key === 'End') {
        next = btnArr[btnArr.length - 1];
      }

      if (next) {
        e.preventDefault();
        next.focus();
        next.click();
      }
    });
  });
}

// ========================================================================
// 5. FORM VALIDATION
// ========================================================================

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^(\+\d{1,2}\s?)?\(?-?\d{3}\)?-?\d{3}-?\d{4}$/.test(phone.replace(/\s/g, ''));
}

function validateField(input) {
  const value = typeof input.value === 'string' ? input.value.trim() : '';
  let errorContainer = input.parentElement.querySelector('.error-message');

  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.setAttribute('role', 'alert');
    input.parentElement.appendChild(errorContainer);
  }

  let isValid = true;
  let errorMessage = '';

  if (input.type === 'checkbox') {
    if (input.required && !input.checked) {
      isValid = false;
      errorMessage = 'Please check this box to continue';
    }
  } else if (input.type === 'radio') {
    const radioGroup = document.querySelectorAll(`input[type="radio"][name="${input.name}"]`);
    if (input.required && ![...radioGroup].some((radio) => radio.checked)) {
      isValid = false;
      errorMessage = 'Please select an option';
    }
  } else if (input.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  } else if (input.type === 'email' && value && !validateEmail(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid email address';
  } else if (input.type === 'tel' && value && !validatePhone(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid phone number';
  } else if (input.type === 'number' && input.min && value && parseFloat(value) < parseFloat(input.min)) {
    isValid = false;
    errorMessage = `Value must be at least ${input.min}`;
  }

  input.classList.toggle('form-error', !isValid);
  input.setAttribute('aria-invalid', String(!isValid));
  errorContainer.textContent = isValid ? '' : errorMessage;

  return isValid;
}

function showQuickContactSuccess(form) {
  const successMessage = document.createElement('div');
  successMessage.className = 'alert alert-success quick-contact-success';
  successMessage.setAttribute('role', 'status');
  successMessage.textContent = "Thank you! We'll be in touch soon.";

  form.insertBefore(successMessage, form.firstChild);

  successMessage.style.opacity = '0';
  successMessage.style.transition = 'opacity 220ms ease-out';

  requestAnimationFrame(() => {
    successMessage.style.opacity = '1';
  });

  dispatchLeadSubmitted({ lead_type: 'quick_contact', form_name: form.getAttribute('name') || form.id || 'quick-contact' });

  setTimeout(() => {
    form.reset();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      successMessage.remove();
    } else {
      successMessage.style.transition = 'opacity 160ms ease-in';
      successMessage.style.opacity = '0';
      setTimeout(() => successMessage.remove(), 180);
    }
  }, 2600);
}

function hasSuccessfulCapture(results) {
  return results.some((result) => result.status === 'fulfilled' && result.value && result.value.ok);
}

function showQuickContactError(form) {
  let errorMessage = form.querySelector('.quick-contact-submit-error');
  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-error quick-contact-submit-error';
    errorMessage.setAttribute('role', 'alert');
    errorMessage.style.cssText = 'background:#FEE2E2;color:#991B1B;padding:1rem;border-radius:.5rem;margin-bottom:1rem;border-left:4px solid #EF4444;';
    form.insertBefore(errorMessage, form.firstChild);
  }
  errorMessage.textContent = 'Something went wrong. Please try again or call Adam at (512) 956-6010.';
}

async function submitForm(form) {
  const formData = new FormData(form);
  const fullName = (formData.get('name') || '').trim();
  const nameParts = fullName.split(' ');
  const fname = nameParts[0] || '';
  const lname = nameParts.slice(1).join(' ') || '';
  const email = formData.get('email') || '';
  const phone = formData.get('phone') || '';
  const loanGoal = formData.get('loanGoal') || '';
  const params = new URLSearchParams(window.location.search);

  const captureResults = await Promise.allSettled([
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    }),
    fetch('/.netlify/functions/lead-intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, fname, lname, phone,
        tag: 'quick-contact-lead',
        loan_goal: loanGoal,
        lead_source: 'Quick Contact',
        'form-name': formData.get('form-name') || form.getAttribute('name') || '',
        purchase_price: formData.get('purchase_price') || formData.get('loan_amount') || '',
        down_payment: formData.get('down_payment') || '',
        credit_score: formData.get('credit_score') || '',
        income_type: formData.get('income_type') || '',
        property_use: formData.get('property_use') || '',
        target_city: formData.get('target_city') || formData.get('property_location') || '',
        timeline: formData.get('timeline') || '',
        lender_status: formData.get('lender_status') || '',
        documentation_issue: formData.get('documentation_issue') || '',
        situation: formData.get('situation') || formData.get('notes') || '',
        tcpa_consent: formData.get('tcpa_consent') === 'on',
        sms_opt_in: formData.get('sms_opt_in') === 'on',
        page_url: window.location.href,
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
      }),
    }),
  ]);

  if (!hasSuccessfulCapture(captureResults)) {
    showQuickContactError(form);
    return;
  }

  // Fire GA4 lead event (waits briefly for tags), then land on /thank-you so the
  // Google Ads conversion (thank_you_page_view) counts this submission.
  await dispatchLeadSubmitted(
    { lead_type: 'quick_contact', form_name: form.getAttribute('name') || form.id || 'quick-contact' },
    { waitForTags: true }
  );
  window.location.href = '/thank-you?type=quick-contact';
}

function initFormValidation() {
  // Bind every quick-contact form on the page (hero compact form + full form).
  document.querySelectorAll('.js-quick-contact').forEach(bindQuickContactForm);
}

function bindQuickContactForm(form) {
  if (!form) return;

  // Skip forms that submit to external services (e.g., Mailchimp)
  try {
    const formAction = new URL(form.action, window.location.href);
    if (formAction.origin !== window.location.origin) return;
  } catch (e) { /* proceed if URL parsing fails */ }

  form.addEventListener('blur', (e) => {
    if (e.target.matches('input, textarea, select')) {
      validateField(e.target);
    }
  }, true);

  form.addEventListener('input', (e) => {
    if (e.target.matches('.form-error')) {
      validateField(e.target);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) isValid = false;
    });

    if (isValid) submitForm(form);
  });
}

// ========================================================================
// 6. HERO QUICK QUOTE FORM (Netlify + success message)
// ========================================================================

function initHeroQuickForm() {
  // Primary: standard hero-quick-form with success elements
  let form = document.getElementById('hero-quick-form');
  let wrap = document.getElementById('hero-quick-form-wrap');
  let successEl = document.getElementById('hero-quick-form-success');
  let successText = successEl && successEl.querySelector('.hero-quick-form-success-text');

  // Fallback: any data-netlify form without hero-quick-form id (suburb pages like buda, westlake)
  if (!form) {
    form = document.querySelector('form[data-netlify="true"]:not(.js-quick-contact)');
    if (!form) return;
    // Create minimal wrapper/success elements dynamically
    wrap = form.parentElement;
    if (!successEl) {
      successEl = document.createElement('div');
      successEl.hidden = true;
      successText = document.createElement('p');
      successText.textContent = 'Thanks! Adam will reach out within 1 business day.';
      successEl.appendChild(successText);
      form.parentElement.appendChild(successEl);
    }
  }
  if (!form || !wrap) return;

  form.addEventListener('blur', (e) => {
    if (e.target.matches('input, select, textarea')) validateField(e.target);
  }, true);
  form.addEventListener('input', (e) => {
    if (e.target.matches('.form-error')) validateField(e.target);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) isValid = false;
    });
    if (!isValid) return;

    const formData = new FormData(form);
    const fullName = (formData.get('name') || '').trim();
    const nameParts = fullName.split(' ');
    const fname = nameParts[0] || '';
    const lname = nameParts.slice(1).join(' ') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const loanGoal = formData.get('loanGoal') || '';
    const params = new URLSearchParams(window.location.search);

    const leadTracking = dispatchLeadSubmitted(
      { lead_type: 'quick_quote', form_name: form.getAttribute('name') || 'hero-quick-form' },
      { waitForTags: true, timeoutMs: 1200 }
    );

    const quoteCaptureResults = await Promise.allSettled([
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      }),
      fetch('/.netlify/functions/lead-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, fname, lname, phone,
          tag: 'quick-quote-lead',
          loan_goal: loanGoal,
          lead_source: 'Quick Quote',
          'form-name': formData.get('form-name') || form.getAttribute('name') || '',
          purchase_price: formData.get('purchase_price') || formData.get('loan_amount') || '',
          down_payment: formData.get('down_payment') || '',
          credit_score: formData.get('credit_score') || '',
          income_type: formData.get('income_type') || '',
          property_use: formData.get('property_use') || '',
          target_city: formData.get('target_city') || formData.get('property_location') || '',
          timeline: formData.get('timeline') || '',
          lender_status: formData.get('lender_status') || '',
          documentation_issue: formData.get('documentation_issue') || '',
          situation: formData.get('situation') || formData.get('notes') || '',
          tcpa_consent: formData.get('tcpa_consent') === 'on',
          sms_opt_in: formData.get('sms_opt_in') === 'on',
          page_url: window.location.href,
          utm_source: params.get('utm_source') || '',
          utm_medium: params.get('utm_medium') || '',
          utm_campaign: params.get('utm_campaign') || '',
        }),
      }),
    ]);

    if (!hasSuccessfulCapture(quoteCaptureResults)) {
      showQuickContactError(form);
      return;
    }

    await leadTracking;

    var tyParams = new URLSearchParams({ type: 'quick-quote' });
    try {
      sessionStorage.setItem('styer:quick-quote-contact', JSON.stringify({
        email: email,
        name: [fname, lname].filter(Boolean).join(' '),
        phone: phone,
      }));
    } catch (err) {
      console.warn('[quick-quote] session storage unavailable:', err.message);
    }
    window.location.href = '/thank-you?' + tyParams.toString();
  });
}

// ========================================================================
// 7. QUICK CONTACT SCROLL TRIGGER
// ========================================================================

// initQuickContactScroll removed — "Read All Reviews" now links directly to /testimonials.html

// ========================================================================
// TESTIMONIAL FILTER
// ========================================================================

function initTestimonialFilter() {
  const filterContainer = document.querySelector('.testimonial-filter');
  if (!filterContainer) return;

  const testimonials = document.querySelectorAll('.testimonials-grid .testimonial');
  if (!testimonials.length) return;

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.testimonial-filter-btn');
    if (!btn) return;

    // Update active button
    filterContainer.querySelectorAll('.testimonial-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    testimonials.forEach(t => {
      const categories = t.dataset.category || '';
      if (filter === 'all' || categories.includes(filter)) {
        t.classList.remove('hidden');
        t.style.animation = 'fadeIn 300ms ease-in-out';
      } else {
        t.classList.add('hidden');
      }
    });
  });

  // Keyboard support for filter buttons
  filterContainer.addEventListener('keydown', (e) => {
    const btn = e.target.closest('.testimonial-filter-btn');
    if (!btn) return;
    const buttons = [...filterContainer.querySelectorAll('.testimonial-filter-btn')];
    const index = buttons.indexOf(btn);

    if (e.key === 'ArrowRight' && index < buttons.length - 1) {
      e.preventDefault();
      buttons[index + 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      buttons[index - 1].focus();
    }
  });
}


// ========================================================================
// PRE-QUALIFICATION MULTI-STEP FORM
// ========================================================================

function initPrequalForm() {
  const form = document.getElementById('prequal-form');
  if (!form) return;

  const fieldsets = form.querySelectorAll('.prequal-fieldset');
  const steps = document.querySelectorAll('.prequal-step');
  const progressFill = document.querySelector('.prequal-progress-fill');
  const progressBar = document.querySelector('.prequal-progress');
  let currentStep = 1;
  const totalSteps = fieldsets.length;

  function showStep(step) {
    fieldsets.forEach((fs, i) => {
      fs.classList.toggle('hidden', i + 1 !== step);
    });

    steps.forEach((s, i) => {
      s.classList.remove('active', 'completed');
      if (i + 1 < step) s.classList.add('completed');
      if (i + 1 === step) s.classList.add('active');
    });

    if (progressFill) {
      progressFill.style.width = `${(step / totalSteps) * 100}%`;
    }
    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', step);
    }

    // Focus the first input in the current step
    const currentFieldset = form.querySelector(`.prequal-fieldset[data-step="${step}"]`);
    if (currentFieldset) {
      const firstInput = currentFieldset.querySelector('input, select, textarea');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  function validateStep(step) {
    const currentFieldset = form.querySelector(`.prequal-fieldset[data-step="${step}"]`);
    if (!currentFieldset) return true;

    const requiredFields = currentFieldset.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      // Clear previous errors
      field.classList.remove('form-error');
      field.removeAttribute('aria-invalid');
      const existingError = field.parentElement.querySelector('.error-message');
      if (existingError) existingError.remove();

      if (!field.value.trim()) {
        valid = false;
        field.classList.add('form-error');
        field.setAttribute('aria-invalid', 'true');
        const error = document.createElement('span');
        error.className = 'error-message';
        error.setAttribute('role', 'alert');
        error.textContent = 'This field is required';
        field.parentElement.appendChild(error);
      }

      // Email validation
      if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
          valid = false;
          field.classList.add('form-error');
          field.setAttribute('aria-invalid', 'true');
          const error = document.createElement('span');
          error.className = 'error-message';
          error.setAttribute('role', 'alert');
          error.textContent = 'Please enter a valid email address';
          field.parentElement.appendChild(error);
        }
      }

      // Phone validation
      if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!phoneRegex.test(field.value.trim())) {
          valid = false;
          field.classList.add('form-error');
          field.setAttribute('aria-invalid', 'true');
          const error = document.createElement('span');
          error.className = 'error-message';
          error.setAttribute('role', 'alert');
          error.textContent = 'Please enter a valid phone number';
          field.parentElement.appendChild(error);
        }
      }
    });

    return valid;
  }

  // Event delegation for Next/Prev buttons
  form.addEventListener('click', (e) => {
    if (e.target.closest('.prequal-next')) {
      e.preventDefault();
      if (validateStep(currentStep) && currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    }

    if (e.target.closest('.prequal-prev')) {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    }
  });

  // Form submission — sends data to Mailchimp + LoanOS via lead-intake function
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting…'; }

    const get = (name) => {
      const el = form.querySelector(`[name="${name}"]`);
      return el ? el.value.trim() : '';
    };

    const params = new URLSearchParams(window.location.search);
    const payload = {
      fname:        get('first_name'),
      lname:        get('last_name'),
      email:        get('email'),
      phone:        get('phone'),
      tag:          'prequal-lead',
      loan_goal:    get('loan_purpose'),
      lead_source:  'Pre-Approval Funnel',
      purchase_price: get('property_value'),
      down_payment: get('down_payment'),
      credit_score: get('credit_score'),
      income_type: get('employment_status'),
      property_use: get('property_type'),
      target_city: get('property_location'),
      situation: get('additional_notes'),
      tcpa_consent: form.querySelector('[name="tcpa_consent"]')?.checked || false,
      sms_opt_in:   form.querySelector('[name="sms_opt_in"]')?.checked || false,
      utm_source:   params.get('utm_source') || '',
      utm_medium:   params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      page_url:     window.location.href,
    };

    try {
      // Post to Netlify Forms first (backup capture), then the lead-intake pipeline.
      const results = await Promise.allSettled([
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString(),
        }),
        fetch('/.netlify/functions/lead-intake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
      ]);
      if (!hasSuccessfulCapture(results)) throw new Error('all capture endpoints failed');
    } catch (err) {
      console.error('[prequal] lead capture failed:', err);
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Pre-Qualification'; }
      showQuickContactError(form);
      return;
    }

    // Fire GA4 lead event, then land on /thank-you so the Google Ads
    // conversion (thank_you_page_view) counts this submission.
    await dispatchLeadSubmitted(
      { lead_type: 'prequal', form_name: form.getAttribute('name') || 'prequal' },
      { waitForTags: true }
    );
    window.location.href = '/thank-you?type=prequal';
  });

  // Clear errors on input
  form.addEventListener('input', (e) => {
    const field = e.target;
    if (field.classList.contains('form-error')) {
      field.classList.remove('form-error');
      field.removeAttribute('aria-invalid');
      const error = field.parentElement.querySelector('.error-message');
      if (error) error.remove();
    }
  });
}


// ========================================================================
// INIT - Single DOMContentLoaded entry point
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAccordion();
  initTabs();
  initFormValidation();
  initHeroQuickForm();
  // initQuickContactScroll(); — removed, no longer needed
  initTestimonialFilter();
  initPrequalForm();
  initCityToggle();
  initMortgageAssistant();
});

function initMortgageAssistant() {
  if (document.querySelector('script[data-mortgage-assistant]')) return;
  var script = document.createElement('script');
  script.src = '/assistant-widget.js?v=20260720-typing-indicator-v1';
  script.defer = true;
  script.dataset.mortgageAssistant = 'true';
  document.head.appendChild(script);
}

function initCityToggle() {
  var btn = document.getElementById('show-all-cities');
  var overflow = document.getElementById('city-cards-overflow');
  if (!btn || !overflow) return;
  btn.addEventListener('click', function () {
    var hidden = overflow.style.display === 'none';
    overflow.style.display = hidden ? '' : 'none';
    btn.innerHTML = hidden ? 'Show Fewer Cities &uarr;' : 'Show All 24 Cities &darr;';
  });
}

// ========================================================================
// PHONE CLICK TRACKING
// Global delegated listener — fires for every tel: link click on any page
// ========================================================================
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="tel:"]');
  if (link) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'phone_click' });
  }
});
