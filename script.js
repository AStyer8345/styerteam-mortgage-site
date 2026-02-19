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
// 6. MORTGAGE CALCULATORS
// ========================================================================

/** Build a calculator output row as a DOM element */
function createOutputRow(label, value, modifier) {
  const row = document.createElement('div');
  row.className = 'output-row';
  if (modifier) row.classList.add(modifier);

  const labelSpan = document.createElement('span');
  labelSpan.className = 'output-label';
  if (modifier === 'output-row--total') labelSpan.classList.add('output-label--bold');
  labelSpan.textContent = label;

  const valueSpan = document.createElement('span');
  valueSpan.className = 'output-value';
  if (modifier === 'output-row--total' || modifier === 'output-row--highlight') {
    valueSpan.classList.add('highlight');
  }
  if (modifier === 'output-row--positive') valueSpan.classList.add('output-value--positive');
  if (modifier === 'output-row--negative') valueSpan.classList.add('output-value--negative');
  valueSpan.textContent = value;

  row.appendChild(labelSpan);
  row.appendChild(valueSpan);
  return row;
}

function createDisclaimer(text) {
  const p = document.createElement('p');
  p.className = 'calculator-disclaimer';
  p.textContent = text;
  return p;
}

function createOutputWrapper(modifier) {
  const wrapper = document.createElement('div');
  wrapper.className = 'calculator-output';
  if (modifier) wrapper.classList.add(modifier);
  return wrapper;
}

function showPlaceholder(container, message) {
  container.textContent = '';
  const p = document.createElement('p');
  p.className = 'calculator-placeholder';
  p.textContent = message;
  container.appendChild(p);
}

// ---- Monthly Payment Calculator ----
function initMonthlyPaymentCalculator() {
  const calculator = document.getElementById('monthly-payment-calc');
  if (!calculator) return;

  const loanAmountInput = calculator.querySelector('input[name="loan-amount"]');
  const rateInput = calculator.querySelector('input[name="interest-rate"]');
  const termInput = calculator.querySelector('input[name="loan-term"]');
  const propertyTaxInput = calculator.querySelector('input[name="property-tax"]');
  const insuranceInput = calculator.querySelector('input[name="homeowners-insurance"]');
  const pmiInput = calculator.querySelector('input[name="pmi"]');
  const outputContainer = calculator.querySelector('[data-output="payment"]');

  function calculate() {
    const principal = parseFloat(loanAmountInput.value) || 0;
    const monthlyRate = (parseFloat(rateInput.value) || 0) / 100 / 12;
    const months = (parseFloat(termInput.value) || 30) * 12;
    const propertyTax = parseFloat(propertyTaxInput.value) || 0;
    const insurance = parseFloat(insuranceInput.value) || 0;
    const pmi = parseFloat(pmiInput.value) || 0;

    if (principal <= 0 || monthlyRate < 0 || months <= 0) {
      showPlaceholder(outputContainer, 'Enter valid values to calculate');
      return;
    }

    let principalAndInterest = 0;
    if (monthlyRate === 0) {
      principalAndInterest = principal / months;
    } else {
      principalAndInterest = principal *
        (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const propertyTaxMonthly = propertyTax / 12;
    const insuranceMonthly = insurance / 12;
    const totalMonthly = principalAndInterest + propertyTaxMonthly + insuranceMonthly + pmi;

    const wrapper = createOutputWrapper();
    wrapper.appendChild(createOutputRow('Principal & Interest', `$${principalAndInterest.toFixed(2)}`));
    wrapper.appendChild(createOutputRow('Property Tax (monthly)', `$${propertyTaxMonthly.toFixed(2)}`));
    wrapper.appendChild(createOutputRow('Homeowners Insurance (monthly)', `$${insuranceMonthly.toFixed(2)}`));
    wrapper.appendChild(createOutputRow('PMI (monthly)', `$${pmi.toFixed(2)}`));
    wrapper.appendChild(createOutputRow('Total Monthly Payment', `$${totalMonthly.toFixed(2)}`, 'output-row--total'));
    wrapper.appendChild(createDisclaimer('This is an estimate. Actual payments may vary based on factors like taxes, insurance, HOA fees, and interest rate locks.'));

    outputContainer.textContent = '';
    outputContainer.appendChild(wrapper);
  }

  const debouncedCalc = debounce(calculate, 250);
  [loanAmountInput, rateInput, termInput, propertyTaxInput, insuranceInput, pmiInput]
    .forEach(input => input.addEventListener('input', debouncedCalc));
}

// ---- Affordability Calculator ----
function initAffordabilityCalculator() {
  const calculator = document.getElementById('affordability-calc');
  if (!calculator) return;

  const incomeInput = calculator.querySelector('input[name="annual-income"]');
  const debtsInput = calculator.querySelector('input[name="monthly-debts"]');
  const downPaymentInput = calculator.querySelector('input[name="down-payment"]');
  const rateInput = calculator.querySelector('input[name="interest-rate"]');
  const termInput = calculator.querySelector('input[name="loan-term"]');
  const outputContainer = calculator.querySelector('[data-output="affordability"]');

  function calculate() {
    const annualIncome = parseFloat(incomeInput.value) || 0;
    const monthlyDebts = parseFloat(debtsInput.value) || 0;
    const downPayment = parseFloat(downPaymentInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;
    const term = parseFloat(termInput.value) || 30;

    if (annualIncome <= 0 || downPayment < 0) {
      showPlaceholder(outputContainer, 'Enter valid values to calculate');
      return;
    }

    const monthlyIncome = annualIncome / 12;
    const maxFrontEndPayment = monthlyIncome * 0.28;
    const maxBackEndPayment = monthlyIncome * 0.36 - monthlyDebts;
    const maxMonthlyPayment = Math.min(maxFrontEndPayment, maxBackEndPayment);

    if (maxMonthlyPayment <= 0) {
      const wrapper = createOutputWrapper('calculator-output--warning');
      const msg = document.createElement('p');
      msg.className = 'calculator-warning';
      msg.textContent = 'Your debt-to-income ratio is too high. Consider paying down existing debts first.';
      wrapper.appendChild(msg);
      wrapper.appendChild(createDisclaimer('Maximum debt-to-income ratio is typically 36-43%.'));

      outputContainer.textContent = '';
      outputContainer.appendChild(wrapper);
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const months = term * 12;
    let maxLoanAmount = 0;

    if (monthlyRate === 0) {
      maxLoanAmount = maxMonthlyPayment * months;
    } else {
      maxLoanAmount = maxMonthlyPayment *
        (Math.pow(1 + monthlyRate, months) - 1) /
        (monthlyRate * Math.pow(1 + monthlyRate, months));
    }

    const maxHomePrice = maxLoanAmount + downPayment;

    const wrapper = createOutputWrapper();
    wrapper.appendChild(createOutputRow('Maximum Home Price', `$${maxHomePrice.toFixed(0)}`, 'output-row--highlight'));
    wrapper.appendChild(createOutputRow('Down Payment', `$${downPayment.toFixed(0)}`));
    wrapper.appendChild(createOutputRow('Maximum Loan Amount', `$${maxLoanAmount.toFixed(0)}`));
    wrapper.appendChild(createOutputRow('Estimated Monthly Payment', `$${maxMonthlyPayment.toFixed(2)}`));
    wrapper.appendChild(createDisclaimer('This is an estimate based on standard lending ratios (28/36). Actual qualification depends on credit score, employment history, and other factors. Speak with Adam for a personalized pre-approval.'));

    outputContainer.textContent = '';
    outputContainer.appendChild(wrapper);
  }

  const debouncedCalc = debounce(calculate, 250);
  [incomeInput, debtsInput, downPaymentInput, rateInput, termInput]
    .forEach(input => input.addEventListener('input', debouncedCalc));
}

// ---- Refinance Calculator ----
function initRefinanceCalculator() {
  const calculator = document.getElementById('refinance-calc');
  if (!calculator) return;

  const balanceInput = calculator.querySelector('input[name="current-balance"]');
  const currentRateInput = calculator.querySelector('input[name="current-rate"]');
  const currentPaymentInput = calculator.querySelector('input[name="current-payment"]');
  const newRateInput = calculator.querySelector('input[name="new-rate"]');
  const newTermInput = calculator.querySelector('input[name="new-term"]');
  const closingCostsInput = calculator.querySelector('input[name="closing-costs"]');
  const outputContainer = calculator.querySelector('[data-output="refinance"]');

  function calculate() {
    const balance = parseFloat(balanceInput.value) || 0;
    const currentPayment = parseFloat(currentPaymentInput.value) || 0;
    const newRate = parseFloat(newRateInput.value) || 0;
    const newTerm = parseFloat(newTermInput.value) || 30;
    const closingCosts = parseFloat(closingCostsInput.value) || 0;

    if (balance <= 0 || currentPayment <= 0) {
      showPlaceholder(outputContainer, 'Enter valid values to calculate');
      return;
    }

    const monthlyRate = newRate / 100 / 12;
    const months = newTerm * 12;
    let newPayment = 0;

    if (monthlyRate === 0) {
      newPayment = balance / months;
    } else {
      newPayment = balance *
        (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const monthlySavings = currentPayment - newPayment;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;
    const totalSavings = (monthlySavings * months) - closingCosts;

    const wrapper = createOutputWrapper();
    wrapper.appendChild(createOutputRow('Current Monthly Payment', `$${currentPayment.toFixed(2)}`));
    wrapper.appendChild(createOutputRow('New Monthly Payment', `$${newPayment.toFixed(2)}`, 'output-row--highlight'));

    if (monthlySavings > 0) {
      wrapper.appendChild(createOutputRow('Monthly Savings', `$${monthlySavings.toFixed(2)}`, 'output-row--positive'));
      wrapper.appendChild(createOutputRow('Breakeven Point', `${breakEvenMonths} months`));
      wrapper.appendChild(createOutputRow(`Total Savings (over ${newTerm} years)`, `$${totalSavings.toFixed(0)}`, 'output-row--positive'));
    } else {
      wrapper.appendChild(createOutputRow('Monthly Difference', `$${Math.abs(monthlySavings).toFixed(2)} more`, 'output-row--negative'));
    }

    wrapper.appendChild(createDisclaimer('This is an estimate. Actual savings depend on your specific situation, credit score, and available rates. Contact Adam for a personalized refinance analysis.'));

    outputContainer.textContent = '';
    outputContainer.appendChild(wrapper);
  }

  const debouncedCalc = debounce(calculate, 250);
  [balanceInput, currentRateInput, currentPaymentInput, newRateInput, newTermInput, closingCostsInput]
    .forEach(input => input.addEventListener('input', debouncedCalc));
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
  initMonthlyPaymentCalculator();
  initAffordabilityCalculator();
  initRefinanceCalculator();
  initTestimonialFilter();
  initPrequalForm();
});
