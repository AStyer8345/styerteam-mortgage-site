/* ==========================================================================
   Mortgage Solutions - Main JavaScript
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

// ========================================================================
// 1. NAVIGATION & HEADER
// ========================================================================

function initNavigation() {
  const header = document.querySelector('header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 0);
  });

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked (event delegation)
    navLinks.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
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
// 2. INTERSECTION OBSERVER - ANIMATIONS ON SCROLL
// ========================================================================

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
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
        }
      });
    }

    // Toggle current item
    button.classList.toggle('active', !isActive);
    button.setAttribute('aria-expanded', String(!isActive));
    button.nextElementSibling.classList.toggle('active', !isActive);
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
  const value = input.value.trim();
  let errorContainer = input.parentElement.querySelector('.error-message');

  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.setAttribute('role', 'alert');
    input.parentElement.appendChild(errorContainer);
  }

  let isValid = true;
  let errorMessage = '';

  if (input.hasAttribute('required') && !value) {
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

function submitForm(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log('Form submitted:', data);

  const successMessage = document.createElement('div');
  successMessage.className = 'alert alert-success';
  successMessage.setAttribute('role', 'status');
  successMessage.textContent = "Thank you! We'll be in touch soon.";

  form.insertBefore(successMessage, form.firstChild);

  setTimeout(() => {
    form.reset();
    successMessage.remove();
  }, 3000);
}

function initFormValidation() {
  const form = document.querySelector('form');
  if (!form) return;

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

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    // Show success message
    const formCard = form.closest('.card') || form.parentElement;
    const success = document.createElement('div');
    success.className = 'alert alert-success';
    success.setAttribute('role', 'status');
    success.innerHTML = '';

    const heading = document.createElement('h3');
    heading.textContent = 'Pre-Qualification Submitted!';
    success.appendChild(heading);

    const msg = document.createElement('p');
    msg.textContent = 'Thank you! Adam will review your information and reach out within 24 hours to discuss your options.';
    success.appendChild(msg);

    form.style.display = 'none';
    const progress = document.querySelector('.prequal-progress');
    if (progress) progress.style.display = 'none';
    formCard.appendChild(success);
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
  initScrollAnimations();
  initAccordion();
  initTabs();
  initFormValidation();
  initTestimonialFilter();
  initPrequalForm();
});
