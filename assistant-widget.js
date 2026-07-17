(function () {
  'use strict';

  var endpoint = '/api/mortgage-assistant';
  var state = {
    conversationId: createId(),
    turns: [],
    pendingConfirmation: null,
    config: null,
    busy: false,
  };
  var ui = {};

  fetch(endpoint, { credentials: 'same-origin', headers: { Accept: 'application/json' } })
    .then(function (response) { return response.ok ? response.json() : Promise.reject(new Error('disabled')); })
    .then(function (config) {
      if (!config || config.enabled !== true) return;
      state.config = config;
      renderWidget();
    })
    .catch(function () {});

  function renderWidget() {
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/assistant-widget.css?v=20260716-conversation-v1';
    document.head.appendChild(stylesheet);

    var root = document.createElement('div');
    root.className = 'mortgage-assistant';
    root.innerHTML = [
      '<button class="ma-launcher" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="mortgage-assistant-panel">',
      '  <span class="ma-launcher-icon" aria-hidden="true">✦</span>',
      '  <span>Ask a mortgage question</span>',
      '</button>',
      '<section class="ma-panel" id="mortgage-assistant-panel" role="dialog" aria-modal="false" aria-labelledby="ma-title" hidden>',
      '  <header class="ma-header">',
      '    <div><p class="ma-kicker">AI ASSISTANT</p><h2 id="ma-title">Mortgage questions, grounded answers</h2></div>',
      '    <button class="ma-close" type="button" aria-label="Close mortgage assistant">×</button>',
      '  </header>',
      '  <div class="ma-disclosure" id="ma-disclosure"></div>',
      '  <div class="ma-messages" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation"></div>',
      '  <div class="ma-confirmation" hidden>',
      '    <p class="ma-confirmation-summary"></p>',
      '    <label class="ma-consent" hidden><input type="checkbox"> <span></span></label>',
      '    <div class="ma-confirmation-actions"><button type="button" class="ma-confirm">Confirm</button><button type="button" class="ma-cancel">Cancel</button></div>',
      '  </div>',
      '  <form class="ma-form">',
      '    <label for="ma-input" class="ma-visually-hidden">Message the mortgage assistant</label>',
      '    <textarea id="ma-input" rows="2" maxlength="4000" placeholder="Ask a general mortgage question…" required></textarea>',
      '    <button type="submit" class="ma-send">Send<span class="ma-visually-hidden"> message</span></button>',
      '  </form>',
      '  <div class="ma-next-actions">',
      '    <button type="button" class="ma-lead-toggle">Have Adam contact me</button>',
      '    <a class="ma-application-link" href="https://hypersmart.my1003app.com/513013/register" target="_blank" rel="noopener noreferrer">Start my application</a>',
      '  </div>',
      '  <form class="ma-lead-form" hidden>',
      '    <div class="ma-lead-grid"><label>First name<input name="firstName" maxlength="80" required></label><label>Last name<input name="lastName" maxlength="100"></label></div>',
      '    <label>Email<input name="email" type="email" maxlength="254" autocomplete="email"></label>',
      '    <label>Phone<input name="phone" type="tel" maxlength="32" autocomplete="tel"></label>',
      '    <div class="ma-lead-grid"><label>What can Adam help with?<select name="leadIntent" required><option value="">Choose one</option><option value="purchase">Purchase</option><option value="refinance">Refinance</option><option value="investment">Investment property</option><option value="information">General information</option><option value="other">Other</option></select></label><label>Timeline<select name="timeline" required><option value="">Choose one</option><option value="within_30_days">Within 30 days</option><option value="31_to_90_days">31–90 days</option><option value="more_than_90_days">More than 90 days</option><option value="unsure">Not sure</option></select></label></div>',
      '    <div class="ma-lead-actions"><button type="submit" class="ma-lead-submit">Review request</button><button type="button" class="ma-lead-cancel">Cancel</button></div>',
      '  </form>',
      '  <p class="ma-sensitive-notice"></p>',
      '  <div class="ma-status ma-visually-hidden" role="status" aria-live="polite"></div>',
      '</section>',
    ].join('');
    document.body.appendChild(root);

    ui.root = root;
    ui.launcher = root.querySelector('.ma-launcher');
    ui.panel = root.querySelector('.ma-panel');
    ui.close = root.querySelector('.ma-close');
    ui.messages = root.querySelector('.ma-messages');
    ui.form = root.querySelector('.ma-form');
    ui.input = root.querySelector('#ma-input');
    ui.send = root.querySelector('.ma-send');
    ui.status = root.querySelector('.ma-status');
    ui.confirmation = root.querySelector('.ma-confirmation');
    ui.confirmationSummary = root.querySelector('.ma-confirmation-summary');
    ui.consent = root.querySelector('.ma-consent');
    ui.consentInput = root.querySelector('.ma-consent input');
    ui.consentText = root.querySelector('.ma-consent span');
    ui.confirm = root.querySelector('.ma-confirm');
    ui.cancel = root.querySelector('.ma-cancel');
    ui.leadToggle = root.querySelector('.ma-lead-toggle');
    ui.leadForm = root.querySelector('.ma-lead-form');
    ui.leadCancel = root.querySelector('.ma-lead-cancel');
    root.querySelector('#ma-disclosure').textContent = state.config.aiDisclosure;
    root.querySelector('.ma-sensitive-notice').textContent = state.config.sensitiveDataNotice;

    addMessage('assistant', 'Hi! I’m here to make mortgages a little easier. Ask me a question, or choose an option below whenever you’re ready for the next step.');
    ui.launcher.addEventListener('click', openPanel);
    ui.close.addEventListener('click', closePanel);
    ui.form.addEventListener('submit', submitMessage);
    ui.input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); ui.form.requestSubmit(); }
    });
    ui.confirm.addEventListener('click', confirmAction);
    ui.cancel.addEventListener('click', clearConfirmation);
    ui.leadToggle.addEventListener('click', function () { ui.leadForm.hidden = false; ui.leadToggle.hidden = true; ui.leadForm.querySelector('input').focus(); });
    ui.leadCancel.addEventListener('click', closeLeadForm);
    ui.leadForm.addEventListener('submit', submitLeadRequest);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !ui.panel.hidden) closePanel();
    });
  }

  function openPanel() {
    ui.panel.hidden = false;
    ui.launcher.setAttribute('aria-expanded', 'true');
    window.setTimeout(function () { ui.input.focus(); }, 0);
  }

  function closePanel() {
    ui.panel.hidden = true;
    ui.launcher.setAttribute('aria-expanded', 'false');
    ui.launcher.focus();
  }

  function submitMessage(event) {
    event.preventDefault();
    if (state.busy) return;
    var message = ui.input.value.trim();
    if (!message) return;
    clearConfirmation();
    addMessage('user', message);
    ui.input.value = '';
    setBusy(true, 'The assistant is reviewing approved information.');
    request({
      message: message,
      conversationId: state.conversationId,
      conversation: state.turns.slice(0, -1).slice(-8),
      sourcePage: window.location.href.split('#')[0],
    }).then(handleResponse).catch(handleError).finally(function () { setBusy(false, ''); });
  }

  function handleResponse(data) {
    if (data.conversationId) state.conversationId = data.conversationId;
    addMessage('assistant', data.message || 'I could not complete that request.');
    if (Array.isArray(data.sources) && data.sources.length) addSources(data.sources);
    if (Array.isArray(data.resources)) data.resources.forEach(function (resource) {
      if (resource && resource.url && resource.label) addTrustedLink(resource.url, resource.label);
    });
    if (Array.isArray(data.suggestedReplies) && data.suggestedReplies.length) addSuggestedReplies(data.suggestedReplies);
    if (data.toolResult && data.toolResult.data && data.toolResult.data.applicationUrl) addTrustedLink(data.toolResult.data.applicationUrl, 'Open secure application');
    if (data.confirmation) showConfirmation(data.confirmation);
  }

  function handleError(error) {
    addMessage('assistant', error && error.message ? error.message : 'The assistant is temporarily unavailable. No action was completed.');
  }

  function request(body) {
    return fetch(endpoint, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (data) {
        if (!response.ok) throw new Error(data.error && data.error.message ? data.error.message : 'The request could not be completed.');
        return data;
      });
    });
  }

  function showConfirmation(confirmation) {
    state.pendingConfirmation = confirmation;
    ui.confirmationSummary.textContent = confirmation.summary || 'Confirm this action?';
    var needsConsent = confirmation.operation === 'create_or_update_website_lead';
    ui.consent.hidden = !needsConsent;
    ui.consentInput.checked = false;
    ui.consentText.textContent = state.config.consentText;
    ui.confirmation.hidden = false;
    ui.confirm.focus();
  }

  function confirmAction() {
    if (!state.pendingConfirmation || state.busy) return;
    var needsConsent = state.pendingConfirmation.operation === 'create_or_update_website_lead';
    if (needsConsent && !ui.consentInput.checked) {
      ui.status.textContent = 'Please review and accept the privacy notice before confirming.';
      ui.consentInput.focus();
      return;
    }
    setBusy(true, 'Confirming the requested action.');
    request({
      conversationId: state.conversationId,
      confirmAction: state.pendingConfirmation.token,
      consentAccepted: needsConsent ? ui.consentInput.checked : undefined,
      sourcePage: window.location.href.split('#')[0],
    }).then(function (data) {
      clearConfirmation();
      handleResponse(data);
    }).catch(handleError).finally(function () { setBusy(false, ''); });
  }

  function clearConfirmation() {
    state.pendingConfirmation = null;
    if (!ui.confirmation) return;
    ui.confirmation.hidden = true;
    ui.consentInput.checked = false;
  }

  function submitLeadRequest(event) {
    event.preventDefault();
    if (state.busy) return;
    var data = new FormData(ui.leadForm);
    if (!String(data.get('email') || '').trim() && !String(data.get('phone') || '').trim()) {
      ui.status.textContent = 'Enter an email address or phone number.';
      ui.leadForm.querySelector('[name="email"]').focus();
      return;
    }
    setBusy(true, 'Preparing your contact request for review.');
    request({
      conversationId: state.conversationId,
      leadRequest: {
        firstName: data.get('firstName'), lastName: data.get('lastName'), email: data.get('email'), phone: data.get('phone'),
        leadIntent: data.get('leadIntent'), timeline: data.get('timeline'),
      },
      sourcePage: window.location.href.split('#')[0],
    }).then(function (response) { closeLeadForm(); handleResponse(response); }).catch(handleError).finally(function () { setBusy(false, ''); });
  }

  function closeLeadForm() {
    ui.leadForm.hidden = true;
    ui.leadToggle.hidden = false;
    ui.leadToggle.focus();
  }

  function addMessage(role, text) {
    if (role === 'user') removeSuggestedReplies();
    var item = document.createElement('div');
    item.className = 'ma-message ma-message-' + role;
    var label = document.createElement('span');
    label.className = 'ma-visually-hidden';
    label.textContent = role === 'user' ? 'You: ' : 'AI assistant: ';
    item.appendChild(label);
    if (role === 'assistant') appendFormattedAnswer(item, text);
    else item.appendChild(document.createTextNode(text));
    ui.messages.appendChild(item);
    ui.messages.scrollTop = ui.messages.scrollHeight;
    state.turns.push({ role: role, text: text });
    if (state.turns.length > 16) state.turns = state.turns.slice(-16);
  }

  function addSuggestedReplies(replies) {
    removeSuggestedReplies();
    var wrapper = document.createElement('div');
    wrapper.className = 'ma-suggested-replies';
    wrapper.setAttribute('aria-label', 'Suggested replies');
    replies.slice(0, 3).forEach(function (reply) {
      if (typeof reply !== 'string' || !reply.trim()) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = reply.trim();
      button.addEventListener('click', function () {
        ui.input.value = reply.trim();
        ui.form.requestSubmit();
      });
      wrapper.appendChild(button);
    });
    if (wrapper.children.length) {
      ui.messages.appendChild(wrapper);
      ui.messages.scrollTop = ui.messages.scrollHeight;
    }
  }

  function removeSuggestedReplies() {
    if (!ui.messages) return;
    ui.messages.querySelectorAll('.ma-suggested-replies').forEach(function (item) { item.remove(); });
  }

  function addSources(sources) {
    var box = document.createElement('details');
    box.className = 'ma-sources';
    var summary = document.createElement('summary');
    summary.textContent = 'Sources used (' + sources.length + ')';
    var list = document.createElement('ul');
    sources.forEach(function (source) {
      var item = document.createElement('li');
      item.textContent = source.section || String(source.file || '').replace(/\.md$/, '').replace(/-/g, ' ');
      list.appendChild(item);
    });
    box.appendChild(summary);
    box.appendChild(list);
    ui.messages.appendChild(box);
  }

  function appendFormattedAnswer(container, text) {
    var content = document.createElement('div');
    content.className = 'ma-message-content';
    String(text || '').trim().split(/\n{2,}/).forEach(function (block) {
      var lines = block.split('\n').map(function (line) { return line.trim(); }).filter(Boolean);
      if (!lines.length) return;
      var bullets = lines.every(function (line) { return /^[-*•]\s+/.test(line); });
      var numbered = lines.every(function (line) { return /^\d+[.)]\s+/.test(line); });
      if (bullets || numbered) {
        var list = document.createElement(numbered ? 'ol' : 'ul');
        lines.forEach(function (line) {
          var item = document.createElement('li');
          item.textContent = line.replace(bullets ? /^[-*•]\s+/ : /^\d+[.)]\s+/, '');
          list.appendChild(item);
        });
        content.appendChild(list);
        return;
      }
      var paragraph = document.createElement('p');
      lines.forEach(function (line, index) {
        if (index) paragraph.appendChild(document.createElement('br'));
        paragraph.appendChild(document.createTextNode(line));
      });
      content.appendChild(paragraph);
    });
    container.appendChild(content);
  }

  function addTrustedLink(value, label) {
    try {
      var url = new URL(value);
      var approvedHost = url.hostname === 'adamstyer.com' || url.hostname === 'www.adamstyer.com' || url.hostname === 'styermortgage.com' || url.hostname === 'www.styermortgage.com' || url.hostname === 'hypersmart.my1003app.com';
      if (url.protocol !== 'https:' || !approvedHost) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'ma-trusted-link';
      var link = document.createElement('a');
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = label;
      wrapper.appendChild(link);
      ui.messages.appendChild(wrapper);
    } catch (_) {}
  }

  function setBusy(busy, message) {
    state.busy = busy;
    ui.send.disabled = busy;
    ui.input.disabled = busy;
    ui.confirm.disabled = busy;
    ui.status.textContent = message;
    ui.send.textContent = busy ? 'Wait…' : 'Send';
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
      var random = Math.random() * 16 | 0;
      return (character === 'x' ? random : (random & 3 | 8)).toString(16);
    });
  }
})();
