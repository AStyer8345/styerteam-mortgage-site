/* Lead-form spam guard. Honeypot and a 3 second minimum are always on.
   Turnstile renders only when a public site key is configured. See
   js/turnstile-config.js. An empty key leaves every form on today's path. */
(function (root) {
  'use strict';

  var MIN_MS = 3000;
  var SITE_KEY = String(root.STYER_TURNSTILE_SITE_KEY || "" /* turnstile-site-key */).trim();
  var SKIP_NAMES = {
    'notification-backup': true,
    'newsletter-builder': true,
    'realtor-builder': true
  };
  var turnstileLoader = null;

  function pathName() {
    return (root.location && root.location.pathname) || '';
  }

  function isLeadForm(form) {
    if (!form || form.tagName !== 'FORM') return false;
    if (form.getAttribute('data-lead-guard') === 'off') return false;
    var name = form.getAttribute('name') || '';
    if (SKIP_NAMES[name]) return false;
    if (/\/(dashboard|ops|forms|marketing-command-center|marketing-content|loan-dashboard|task-dashboard)\.html$/.test(pathName())) return false;
    return !!form.querySelector('input[type="email"], input[name="email"], input[type="tel"], input[name="phone"]');
  }

  function field(form, name) {
    return form.querySelector('[name="' + name + '"]');
  }

  function ensureHidden(form, name) {
    var input = field(form, name);
    if (input) return input;
    input = root.document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = '';
    form.appendChild(input);
    return input;
  }

  function ensureHoneypot(form) {
    var input = field(form, 'bot-field');
    if (!input) {
      var wrap = root.document.createElement('p');
      wrap.className = 'styer-hp';
      wrap.setAttribute('aria-hidden', 'true');
      wrap.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
      var label = root.document.createElement('label');
      label.appendChild(root.document.createTextNode('Leave this blank'));
      input = root.document.createElement('input');
      input.type = 'text';
      input.name = 'bot-field';
      input.tabIndex = -1;
      input.setAttribute('tabindex', '-1');
      input.setAttribute('autocomplete', 'off');
      input.value = '';
      label.appendChild(input);
      wrap.appendChild(label);
      form.appendChild(wrap);
      return;
    }
    input.type = input.type === 'hidden' ? 'text' : (input.type || 'text');
    input.tabIndex = -1;
    input.setAttribute('tabindex', '-1');
    input.setAttribute('autocomplete', 'off');
    var box = input.closest('p, div');
    if (!box || box === form) return;
    box.classList.add('styer-hp');
    box.setAttribute('aria-hidden', 'true');
    box.removeAttribute('hidden');
    box.style.position = 'absolute';
    box.style.left = '-10000px';
    box.style.width = '1px';
    box.style.height = '1px';
    box.style.overflow = 'hidden';
    if (box.style.display === 'none') box.style.display = '';
  }

  function stamp(form) {
    var rendered = ensureHidden(form, 'form_rendered_at');
    if (!rendered.value) rendered.value = String(Date.now());
  }

  function tripped(form) {
    var honeypot = field(form, 'bot-field');
    if (honeypot && String(honeypot.value || '').trim()) return true;
    var rendered = field(form, 'form_rendered_at');
    var at = rendered ? Number(rendered.value) : NaN;
    if (!Number.isFinite(at) || !at) return false;
    var elapsed = Date.now() - at;
    if (elapsed < 0) return false;
    return elapsed < MIN_MS;
  }

  function markStatus(node, text, className) {
    if (!node) return;
    node.hidden = false;
    node.textContent = text;
    if (className) node.classList.add(className);
    if (node.focus) {
      try { node.focus({ preventScroll: true }); } catch (error) { /* Status text is still in the live region. */ }
    }
  }

  function showQuietSuccess(form) {
    var doc = root.document;
    if (form.id === 'dscr-lead-form') {
      var dscr = doc.getElementById('dscr-lead-status');
      if (dscr) {
        dscr.className = 'dscr-lead-status';
        dscr.classList.add('ok');
        dscr.setAttribute('role', 'status');
        dscr.textContent = 'Thanks — Adam will follow up shortly.';
      }
      return;
    }
    if (form.id === 'adc-email-form') {
      var asset = doc.getElementById('adc-email-msg');
      if (asset) {
        asset.textContent = 'Thanks — Adam will follow up shortly.';
        asset.classList.add('adc-email-msg--ok');
      }
      return;
    }
    var journey = form.querySelector('.journey-status');
    if (journey) {
      form.querySelectorAll('fieldset').forEach(function (fieldset) { fieldset.hidden = true; });
      var progress = form.querySelector('.journey-progress');
      if (progress) progress.hidden = true;
      journey.classList.add('journey-confirmation');
      markStatus(journey, form.dataset.journeyMode === 'conversation'
        ? 'Your message has been received. Adam typically replies within one business day.'
        : 'Your scenario and contact details are saved for review. I’ll review what you shared and follow up using your contact details. I aim to respond within one business day. This is not a loan approval.');
      return;
    }
    if (form.classList.contains('professional-referral-form')) {
      root.location.href = '/thank-you.html?type=professional-referral';
      return;
    }
    if (form.classList.contains('js-quick-contact')) {
      root.location.href = '/thank-you?type=quick-contact';
      return;
    }
    if (form.classList.contains('js-hero-quote')) {
      root.location.href = '/thank-you?type=quick-quote';
      return;
    }
    if (form.id === 'prequal-form') {
      root.location.href = '/thank-you?type=prequal';
      return;
    }
    if (form.id === 'form-ftb') {
      root.location.href = form.getAttribute('action') || '/thank-you';
      return;
    }
    if (form.id === 'form-ftb-dpa-guide') {
      root.location.href = '/thank-you.html?type=ftb-dpa-guide';
      return;
    }
    if (form.id === 'form-lo-waitlist') {
      root.location.href = '/thank-you.html?type=lo-waitlist';
      return;
    }
    if (form.id === 'guide-signup-form') {
      var button = doc.getElementById('guide-submit-btn');
      var guideStatus = doc.getElementById('guide-form-status');
      if (button) button.textContent = '✓ Guide ready — opening now!';
      if (guideStatus) guideStatus.textContent = 'Check your email too — a copy is on its way.';
      return;
    }
    if (form.id === 'ty-followup-form' || form.id === 'ty-qualification-form') {
      var successId = form.id === 'ty-followup-form' ? 'ty-followup-success' : 'ty-qualification-success';
      var success = doc.getElementById(successId);
      form.hidden = true;
      if (success) success.hidden = false;
      return;
    }
    if (form.classList.contains('ma-lead-form')) {
      form.hidden = true;
      var messages = doc.querySelector('.ma-messages');
      if (messages) {
        var item = doc.createElement('div');
        item.className = 'ma-message ma-message-assistant';
        item.textContent = 'Your contact request was received.';
        messages.appendChild(item);
      }
      return;
    }
    var inline = form.querySelector('[role="status"]');
    if (inline) {
      markStatus(inline, 'Thanks — Adam will follow up shortly.');
      return;
    }
    var action = form.getAttribute('action') || '';
    if (/thank-you/i.test(action)) {
      root.location.href = action;
      return;
    }
    root.location.href = '/thank-you';
  }

  function showSendError(form) {
    var doc = root.document;
    var message = 'Something went wrong. Please try again or call Adam at (512) 956-6010.';
    if (form.id === 'dscr-lead-form') {
      var dscr = doc.getElementById('dscr-lead-status');
      if (dscr) {
        dscr.textContent = message;
        dscr.classList.add('err');
        dscr.setAttribute('role', 'alert');
      }
      return;
    }
    if (form.id === 'adc-email-form') {
      var asset = doc.getElementById('adc-email-msg');
      if (asset) {
        asset.textContent = message;
        asset.classList.add('adc-email-msg--err');
      }
      return;
    }
    var status = form.querySelector('.journey-status, .pro-form-status, [role="alert"], [role="status"]');
    if (status) {
      status.hidden = false;
      status.textContent = message;
      return;
    }
    var error = doc.createElement('p');
    error.className = 'field-error';
    error.setAttribute('role', 'alert');
    error.textContent = message;
    form.insertBefore(error, form.firstChild);
  }

  function visibleTestKey(key) {
    return key === '1x00000000000000000000AA' || key === '2x00000000000000000000AA';
  }

  function loadTurnstile() {
    if (!SITE_KEY) return Promise.resolve(null);
    if (root.turnstile) return Promise.resolve(root.turnstile);
    if (turnstileLoader) return turnstileLoader;
    turnstileLoader = new Promise(function (resolve) {
      var script = root.document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = function () { resolve(root.turnstile || null); };
      script.onerror = function () { resolve(null); };
      root.document.head.appendChild(script);
    });
    return turnstileLoader;
  }

  function mountTurnstile(form) {
    if (!SITE_KEY || form.querySelector('.styer-turnstile')) return;
    var token = ensureHidden(form, 'cf-turnstile-response');
    var holder = root.document.createElement('div');
    holder.className = 'styer-turnstile';
    form.appendChild(holder);
    loadTurnstile().then(function (api) {
      if (!api || form.dataset.turnstileId) return;
      var showWidget = visibleTestKey(SITE_KEY);
      var widgetId = api.render(holder, {
        sitekey: SITE_KEY,
        size: showWidget ? 'flexible' : 'invisible',
        appearance: showWidget ? 'always' : 'interaction-only',
        execution: 'execute',
        theme: 'light',
        callback: function (value) {
          token.value = value || '';
          try {
            form.dispatchEvent(new root.CustomEvent('styer:turnstile', { detail: token.value }));
          } catch (error) { /* The hidden field still holds the token. */ }
        },
        'error-callback': function () { token.value = ''; },
        'expired-callback': function () {
          token.value = '';
          try { api.reset(widgetId); } catch (error) { /* The next submit asks for a fresh token. */ }
        },
        'timeout-callback': function () { token.value = ''; }
      });
      form.dataset.turnstileId = widgetId;
      try { api.execute(widgetId); } catch (error) { /* Submit will execute again if the token is still empty. */ }
    });
  }

  function obtainToken(form) {
    var token = field(form, 'cf-turnstile-response');
    if (token && token.value) return Promise.resolve(token.value);
    if (!SITE_KEY) return Promise.resolve('');
    return loadTurnstile().then(function (api) {
      var widgetId = form.dataset.turnstileId;
      if (!api || !widgetId) return '';
      return new Promise(function (resolve) {
        var settled = false;
        function finish(value) {
          if (settled) return;
          settled = true;
          form.removeEventListener('styer:turnstile', onToken);
          resolve(value || '');
        }
        function onToken(event) { finish(event.detail); }
        form.addEventListener('styer:turnstile', onToken);
        try { api.execute(widgetId); } catch (error) { finish(''); }
        root.setTimeout(function () { finish(token && token.value); }, 8000);
      });
    });
  }

  function prepare(form) {
    if (!isLeadForm(form)) return;
    ensureHoneypot(form);
    stamp(form);
    if (form.dataset.styerGuardReady === '1') return;
    form.dataset.styerGuardReady = '1';
    mountTurnstile(form);
  }

  function prepareAll() {
    root.document.querySelectorAll('form').forEach(prepare);
  }

  function headerValue(headers, name) {
    if (!headers) return '';
    if (typeof headers.get === 'function') return headers.get(name) || '';
    var match = Object.keys(headers).find(function (key) { return key.toLowerCase() === name.toLowerCase(); });
    return match ? String(headers[match]) : '';
  }

  function decorate(url, options) {
    var form = root.__styerSubmittingForm;
    if (!form || !options || typeof options.body !== 'string') return options;
    var target = String(url || '');
    var intake = target.indexOf('lead-intake') !== -1;
    var formPost = headerValue(options.headers, 'content-type').toLowerCase().indexOf('application/x-www-form-urlencoded') !== -1
      && (target === '/' || target.indexOf('/?') === 0 || /\/$/.test(target.split('?')[0]));
    if (!intake && !formPost) return options;
    var rendered = field(form, 'form_rendered_at');
    var token = field(form, 'cf-turnstile-response');
    var honeypot = field(form, 'bot-field');
    if (intake && headerValue(options.headers, 'content-type').toLowerCase().indexOf('application/json') !== -1) {
      var data = JSON.parse(options.body);
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (rendered && rendered.value && !data.form_rendered_at) data.form_rendered_at = rendered.value;
        if (token && token.value && !data['cf-turnstile-response']) data['cf-turnstile-response'] = token.value;
        if (honeypot && honeypot.value && !data['bot-field']) data['bot-field'] = honeypot.value;
        return Object.assign({}, options, { body: JSON.stringify(data) });
      }
    }
    if (formPost) {
      var params = new URLSearchParams(options.body);
      if (rendered && rendered.value && !params.get('form_rendered_at')) params.set('form_rendered_at', rendered.value);
      if (token && token.value && !params.get('cf-turnstile-response')) params.set('cf-turnstile-response', token.value);
      return Object.assign({}, options, { body: params.toString() });
    }
    return options;
  }

  if (!root.document) return;

  if (typeof root.fetch === 'function' && !root.__styerFetchWrapped) {
    root.__styerFetchWrapped = true;
    var originalFetch = root.fetch.bind(root);
    root.fetch = function (url, options) {
      try { options = decorate(url, options) || options; } catch (error) { /* Send the original request if decoration fails. */ }
      return originalFetch(url, options);
    };
  }

  root.document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!isLeadForm(form)) return;
    prepare(form);
    root.__styerSubmittingForm = form;
    if (form.dataset.styerGuardPass === '1') {
      delete form.dataset.styerGuardPass;
      return;
    }
    if (tripped(form)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showQuietSuccess(form);
      return;
    }
    var token = field(form, 'cf-turnstile-response');
    if (!SITE_KEY || (token && token.value)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    obtainToken(form).then(function (value) {
      if (!value) {
        showSendError(form);
        return;
      }
      form.dataset.styerGuardPass = '1';
      if (typeof form.requestSubmit === 'function') form.requestSubmit();
      else form.dispatchEvent(new root.Event('submit', { bubbles: true, cancelable: true }));
    });
  }, true);

  if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', prepareAll);
  else prepareAll();

  if (typeof root.MutationObserver === 'function') {
    new root.MutationObserver(function () { prepareAll(); }).observe(root.document.documentElement, { childList: true, subtree: true });
  }

  root.StyerFormGuard = {
    minMs: MIN_MS,
    siteKey: SITE_KEY,
    isLeadForm: isLeadForm,
    tripped: tripped,
    prepare: prepare,
    showQuietSuccess: showQuietSuccess
  };
})(typeof window !== 'undefined' ? window : globalThis);
