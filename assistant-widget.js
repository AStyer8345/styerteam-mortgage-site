(function () {
  'use strict';

  var endpoint = '/api/mortgage-assistant';
  var STORAGE_KEY = 'mortgageAssistantConversationV1';
  var state = {
    conversationId: createId(),
    turns: [],
    // Total messages ever shown in this conversation. Unlike state.turns this
    // never gets trimmed, so the server can assign unique transcript sequence
    // numbers for long conversations.
    turnCount: 0,
    pendingConfirmation: null,
    pendingLeadNotification: null,
    config: null,
    salesState: null,
    busy: false,
    opened: false,
    conversationStarted: false,
    converted: false,
    abandonedTracked: false,
    abandonmentTimer: null,
    analyticsSeen: {},
    assistantMode: document.body && document.body.dataset ? (document.body.dataset.assistantMode || 'consumer') : 'consumer',
  };
  var ui = {};

  function loadStoredConversation() {
    try {
      var raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.conversationId !== 'string' || !Array.isArray(parsed.turns)) return null;
      return parsed;
    } catch (_) { return null; }
  }

  function persistConversation() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        conversationId: state.conversationId,
        turns: state.turns.slice(-24),
        turnCount: state.turnCount,
        salesState: state.salesState,
      }));
    } catch (_) {}
  }

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
    stylesheet.href = '/assistant-widget.css?v=20260830-form-alert-v1';
    document.head.appendChild(stylesheet);

    var root = document.createElement('div');
    root.className = 'mortgage-assistant';
    var professionalMode = /^(advisor|advisor_reverse|cpa)$/.test(state.assistantMode);
    root.innerHTML = [
      '<button class="ma-launcher" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="mortgage-assistant-panel">',
      '  <span class="ma-launcher-icon" aria-hidden="true">✦</span>',
      '  <span>' + (professionalMode ? 'Explore a client scenario' : 'Explore your mortgage options') + '</span>',
      '</button>',
      '<section class="ma-panel" id="mortgage-assistant-panel" role="dialog" aria-modal="true" aria-labelledby="ma-title" hidden>',
      '  <header class="ma-header">',
      '    <div><p class="ma-kicker">MORTGAGE STRATEGY ASSISTANT</p><h2 id="ma-title">' + (professionalMode ? 'Explore an anonymized client scenario' : 'Explore the numbers and your options') + '</h2></div>',
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
      '  <form class="ma-lead-form" hidden>',
      '    <p class="ma-lead-intro">Adam will receive the strategy details already discussed. Just add the best way to reach you.</p>',
      '    <label>First name<input name="firstName" maxlength="80" autocomplete="given-name" required></label>',
      '    <label>Email<input name="email" type="email" maxlength="254" autocomplete="email"></label>',
      '    <label>Phone<input name="phone" type="tel" maxlength="32" autocomplete="tel"></label>',
      '    <label>Preferred contact method<select name="preferredContact" required><option value="email">Email</option><option value="text">Text</option><option value="phone">Phone call</option></select></label>',
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
    ui.leadForm = root.querySelector('.ma-lead-form');
    ui.leadCancel = root.querySelector('.ma-lead-cancel');
    root.querySelector('#ma-disclosure').textContent = state.config.aiDisclosure;
    root.querySelector('.ma-sensitive-notice').textContent = state.config.sensitiveDataNotice;

    var stored = loadStoredConversation();
    if (stored && stored.turns.length) {
      // Continue the conversation across page navigation within this tab.
      state.conversationId = stored.conversationId;
      state.salesState = stored.salesState || null;
      stored.turns.forEach(function (turn) {
        if (turn && (turn.role === 'user' || turn.role === 'assistant') && typeof turn.text === 'string') addMessage(turn.role, turn.text);
      });
      state.turnCount = typeof stored.turnCount === 'number' && stored.turnCount >= state.turns.length ? stored.turnCount : state.turns.length;
      state.conversationStarted = state.turns.some(function (turn) { return turn.role === 'user'; });
    } else {
      addMessage('assistant', professionalMode ? 'Share the client goal without names, account numbers, documents, or other identifying details. I can help compare general mortgage paths and prepare the right questions for Adam.' : 'What are you trying to figure out? I can estimate a payment, identify potential financing options, or help you think through a complicated income or property situation.');
      addSuggestedReplies(professionalMode ? (state.assistantMode === 'cpa' ? ['Tax returns reduced qualifying income', 'Compare alternative documentation', 'Asset-based qualification'] : state.assistantMode === 'advisor_reverse' ? ['Compare reverse and forward options', 'Protect portfolio liquidity', 'Retirement income planning'] : ['Protect portfolio liquidity', 'Complex-income client', 'Retirement or asset strategy']) : ['Estimate payment and cash', 'See what may qualify', 'Explain my situation', 'Compare estimated pricing']);
      state.turnCount = 0;
    }
    ui.launcher.addEventListener('click', openPanel);
    ui.close.addEventListener('click', closePanel);
    ui.form.addEventListener('submit', submitMessage);
    ui.input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); ui.form.requestSubmit(); }
    });
    ui.confirm.addEventListener('click', confirmAction);
    ui.cancel.addEventListener('click', clearConfirmation);
    ui.leadCancel.addEventListener('click', closeLeadForm);
    ui.leadForm.addEventListener('submit', submitLeadRequest);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !ui.panel.hidden) closePanel();
      if (event.key === 'Tab' && !ui.panel.hidden) trapFocus(event);
    });
    trackAssistant('assistant_impression');
  }

  function openPanel() {
    ui.panel.hidden = false;
    ui.launcher.setAttribute('aria-expanded', 'true');
    window.setTimeout(function () { ui.input.focus(); }, 0);
    if (!state.opened) {
      state.opened = true;
      trackAssistant('assistant_opened');
    }
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
    if (!state.conversationStarted) {
      state.conversationStarted = true;
      trackAssistant('conversation_started');
    }
    var priorTurnCount = state.turnCount;
    addMessage('user', message);
    scheduleAbandonment();
    ui.input.value = '';
    setBusy(true, 'The assistant is reviewing approved information.');
    request({
      message: message,
      conversationId: state.conversationId,
      conversation: state.turns.slice(0, -1).slice(-16),
      turnCount: priorTurnCount,
      sourcePage: window.location.href.split('#')[0],
      assistantMode: state.assistantMode,
      salesState: state.salesState,
    }).then(handleResponse).catch(handleError).finally(function () { setBusy(false, ''); });
  }

  function handleResponse(data) {
    if (data.conversationId) state.conversationId = data.conversationId;
    if (data.salesState) state.salesState = data.salesState;
    addMessage('assistant', data.message || 'I could not complete that request.');
    persistConversation();
    if (Array.isArray(data.sources) && data.sources.length) addSources(data.sources);
    if (Array.isArray(data.resources)) data.resources.forEach(function (resource) {
      if (resource && resource.url && resource.label) addTrustedLink(resource.url, resource.label);
    });
    if (Array.isArray(data.suggestedReplies) && data.suggestedReplies.length) addSuggestedReplies(data.suggestedReplies);
    if (Array.isArray(data.actions) && data.actions.length) addContextActions(data.actions);
    if (data.collectContactDetails === true) openLeadForm();
    if (data.toolResult && data.toolResult.data && data.toolResult.data.applicationUrl) addTrustedLink(data.toolResult.data.applicationUrl, 'Open secure application');
    if (data.confirmation) showConfirmation(data.confirmation);
    trackResponse(data);
    scheduleAbandonment();
  }

  function handleError(error) {
    addMessage('assistant', error && error.message ? error.message : 'The assistant is temporarily unavailable. No action was completed.');
    trackAssistant('assistant_error');
  }

  function request(body, timeoutMs) {
    var fetchRequest = timeoutMs && typeof window.StyerFetchWithTimeout === 'function'
      ? window.StyerFetchWithTimeout
      : fetch;
    return fetchRequest(endpoint, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    }, timeoutMs).then(function (response) {
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
    var ownerEmailCapture = null;
    if (needsConsent && state.pendingLeadNotification) {
      var approvedNotification = state.pendingLeadNotification;
      ownerEmailCapture = Promise.resolve().then(function () {
        if (typeof window.StyerCaptureNotificationBackup !== 'function') {
          throw new Error('Owner email capture is unavailable.');
        }
        return window.StyerCaptureNotificationBackup(approvedNotification);
      });
    }
    setBusy(true, 'Confirming the requested action.');
    var actionRequest = request({
      conversationId: state.conversationId,
      confirmAction: state.pendingConfirmation.token,
      consentAccepted: needsConsent ? ui.consentInput.checked : undefined,
      turnCount: state.turnCount,
      sourcePage: window.location.href.split('#')[0],
      assistantMode: state.assistantMode,
      salesState: state.salesState,
    }, 20000);

    if (!ownerEmailCapture) {
      actionRequest.then(function (data) {
        clearConfirmation();
        // The server records two transcript pairs for a confirmed action
        // (confirmation + result), so advance past all four rows.
        state.turnCount += 3;
        handleResponse(data);
      }).catch(handleError).finally(function () { setBusy(false, ''); });
      return;
    }

    Promise.allSettled([actionRequest, ownerEmailCapture]).then(function (results) {
      var actionResult = results[0];
      var emailResult = results[1];
      if (actionResult.status === 'fulfilled') {
        var data = actionResult.value;
        if (emailResult.status === 'fulfilled' && data.toolResult && data.toolResult.data && data.toolResult.data.ownerNotified !== true) {
          data.message = 'Your contact request was saved, and a separate email alert was sent to Adam.';
        }
        clearConfirmation();
        // The server records two transcript pairs for a confirmed action
        // (confirmation + result), so advance past all four rows.
        state.turnCount += 3;
        handleResponse(data);
        return;
      }

      if (emailResult.status === 'fulfilled') {
        clearConfirmation();
        state.turnCount += 3;
        addMessage('assistant', 'Your contact request was sent to Adam by email, but the assistant could not finish saving it in the contact system. Adam can still follow up using the information you approved.');
        state.converted = true;
        trackAssistant('contact_submitted', { cta_type: 'contact' });
        return;
      }

      handleError(actionResult.reason);
    }).finally(function () { setBusy(false, ''); });
  }

  function clearConfirmation() {
    var clearingLead = state.pendingConfirmation && state.pendingConfirmation.operation === 'create_or_update_website_lead';
    state.pendingConfirmation = null;
    if (clearingLead) state.pendingLeadNotification = null;
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
    var preferredContact = String(data.get('preferredContact') || 'email');
    if (preferredContact === 'email' && !String(data.get('email') || '').trim()) preferredContact = 'text';
    if ((preferredContact === 'text' || preferredContact === 'phone') && !String(data.get('phone') || '').trim()) preferredContact = 'email';
    state.pendingLeadNotification = {
      sourceForm: 'mortgage-assistant-contact',
      name: String(data.get('firstName') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      subject: 'New mortgage assistant contact request',
      details: {
        preferred_contact: preferredContact,
        assistant_mode: state.assistantMode,
        conversation_id: state.conversationId,
        goal: state.salesState && state.salesState.goal ? state.salesState.goal : '',
        timeline: state.salesState && state.salesState.timeline ? state.salesState.timeline : '',
        property_state: state.salesState && state.salesState.propertyState ? state.salesState.propertyState : ''
      },
      sourcePage: window.location.href.split('#')[0]
    };
    setBusy(true, 'Preparing your contact request for review.');
    request({
      conversationId: state.conversationId,
      leadRequest: {
        firstName: data.get('firstName'), email: data.get('email'), phone: data.get('phone'), preferredContact: preferredContact,
        salesState: state.salesState,
      },
      sourcePage: window.location.href.split('#')[0],
      assistantMode: state.assistantMode,
    }, 15000).then(function (response) {
      closeLeadForm();
      handleResponse(response);
    }).catch(function (error) {
      state.pendingLeadNotification = null;
      handleError(error);
    }).finally(function () { setBusy(false, ''); });
  }

  function closeLeadForm() {
    ui.leadForm.hidden = true;
    ui.input.focus();
  }

  function openLeadForm() {
    prefillLeadContext();
    ui.leadForm.hidden = false;
    var target = ui.leadForm.querySelector('[name="email"]');
    var firstName = ui.leadForm.querySelector('[name="firstName"]');
    if (!firstName.value) target = firstName;
    target.focus();
    target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    trackAssistant('contact_form_opened', { cta_type: 'contact' });
  }

  function prefillLeadContext() {
    if (!state.salesState || !ui.leadForm) return;
    var firstName = ui.leadForm.querySelector('[name="firstName"]');
    if (firstName && state.salesState.visitorName && !firstName.value) firstName.value = state.salesState.visitorName;
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
    state.turnCount += 1;
    if (state.turns.length > 24) state.turns = state.turns.slice(-24);
    persistConversation();
  }

  function addSuggestedReplies(replies) {
    removeSuggestedReplies();
    var wrapper = document.createElement('div');
    wrapper.className = 'ma-suggested-replies';
    wrapper.setAttribute('aria-label', 'Suggested replies');
    replies.slice(0, 4).forEach(function (reply) {
      if (typeof reply !== 'string' || !reply.trim()) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = reply.trim();
      button.addEventListener('click', function () {
        if (['Estimate payment and cash', 'See what may qualify', 'Explain my situation', 'Compare estimated pricing'].indexOf(reply.trim()) >= 0) {
          trackAssistant('opening_choice_selected', { opening_choice: openingChoiceValue(reply.trim()) });
        }
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

  function showTypingIndicator(message) {
    if (ui.typingIndicator) return;
    var indicator = document.createElement('div');
    indicator.className = 'ma-message ma-message-assistant ma-typing-indicator';

    var label = document.createElement('span');
    label.className = 'ma-visually-hidden';
    label.textContent = message || 'Assistant is typing.';
    indicator.appendChild(label);

    var dots = document.createElement('span');
    dots.className = 'ma-typing-dots';
    dots.setAttribute('aria-hidden', 'true');
    for (var index = 0; index < 3; index += 1) {
      var dot = document.createElement('span');
      dot.className = 'ma-typing-dot';
      dots.appendChild(dot);
    }
    indicator.appendChild(dots);
    ui.typingIndicator = indicator;
    ui.messages.appendChild(indicator);
    ui.messages.scrollTop = ui.messages.scrollHeight;
  }

  function hideTypingIndicator() {
    if (!ui.typingIndicator) return;
    ui.typingIndicator.remove();
    ui.typingIndicator = null;
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
      var approvedHost = url.hostname === 'adamstyer.com' || url.hostname === 'www.adamstyer.com' || url.hostname === 'styermortgage.com' || url.hostname === 'www.styermortgage.com' || url.hostname === 'hypersmart.my1003app.com' || url.hostname === 'calendly.com';
      if (url.protocol !== 'https:' || !approvedHost) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'ma-trusted-link';
      var link = document.createElement('a');
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = label;
      link.addEventListener('click', function () { trackLinkClick(url); });
      wrapper.appendChild(link);
      ui.messages.appendChild(wrapper);
    } catch (_) {}
  }

  function addContextActions(actions) {
    var wrapper = document.createElement('div');
    wrapper.className = 'ma-context-actions';
    wrapper.setAttribute('aria-label', 'Recommended next step');
    actions.slice(0, 2).forEach(function (action) {
      if (!action || typeof action.type !== 'string' || typeof action.label !== 'string') return;
      if (action.type === 'contact') {
        var button = document.createElement('button');
        button.type = 'button';
        button.textContent = action.label;
        button.addEventListener('click', openLeadForm);
        wrapper.appendChild(button);
        return;
      }
      if (typeof action.url !== 'string') return;
      try {
        var url = new URL(action.url);
        var approved = url.protocol === 'https:' && (url.hostname === 'adamstyer.com' || url.hostname === 'www.adamstyer.com' || url.hostname === 'hypersmart.my1003app.com' || url.hostname === 'calendly.com');
        if (!approved) return;
        var link = document.createElement('a');
        link.href = url.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = action.label;
        link.addEventListener('click', function () { trackLinkClick(url); });
        wrapper.appendChild(link);
      } catch (_) {}
    });
    if (wrapper.children.length) {
      ui.messages.appendChild(wrapper);
      ui.messages.scrollTop = ui.messages.scrollHeight;
    }
  }

  function trackResponse(data) {
    var kind = String(data.responseKind || '');
    if (kind === 'estimate_started') trackAssistant('estimate_started');
    if (kind === 'estimate_completed') { trackAssistant('estimate_completed'); trackAssistant('useful_answer_delivered'); }
    if (kind === 'pricing_started') trackAssistant('estimate_started', { opening_choice: 'pricing' });
    if (kind === 'pricing_range') { trackAssistant('pricing_range_viewed'); trackAssistant('useful_answer_delivered'); }
    if (kind === 'complex_started') trackAssistant('complex_scenario_started');
    if (kind === 'scenario_assessment') { trackAssistant('scenario_assessment_completed'); trackAssistant('useful_answer_delivered'); }
    if (kind === 'useful_answer') trackAssistant('useful_answer_delivered');
    if (data.toolResult && data.toolResult.ok !== false && /saved|created|existing|completed/i.test(String(data.toolResult.status || ''))) {
      state.converted = true;
      trackAssistant('contact_submitted', { cta_type: 'contact' });
    }
  }

  function trackLinkClick(url) {
    if (url.hostname === 'hypersmart.my1003app.com') { state.converted = true; trackAssistant('application_clicked', { cta_type: 'application' }); }
    else if (url.hostname === 'calendly.com') { state.converted = true; trackAssistant('scheduling_clicked', { cta_type: 'schedule' }); }
    else if (/rate-check/.test(url.pathname)) { state.converted = true; trackAssistant('rate_review_clicked', { cta_type: 'rate_review' }); }
  }

  function trackAssistant(eventName, extra) {
    var allowedEvents = ['assistant_impression', 'assistant_opened', 'conversation_started', 'opening_choice_selected', 'useful_answer_delivered', 'estimate_started', 'estimate_completed', 'pricing_range_viewed', 'complex_scenario_started', 'scenario_assessment_completed', 'contact_form_opened', 'contact_submitted', 'application_clicked', 'scheduling_clicked', 'rate_review_clicked', 'assistant_error', 'conversation_abandoned'];
    if (allowedEvents.indexOf(eventName) < 0) return;
    var oncePerConversation = ['conversation_started', 'opening_choice_selected', 'estimate_started', 'estimate_completed', 'pricing_range_viewed', 'complex_scenario_started', 'scenario_assessment_completed', 'contact_submitted', 'application_clicked', 'scheduling_clicked', 'rate_review_clicked', 'conversation_abandoned'];
    if (oncePerConversation.indexOf(eventName) >= 0 && state.analyticsSeen[eventName]) return;
    if (oncePerConversation.indexOf(eventName) >= 0) state.analyticsSeen[eventName] = true;
    var sales = state.salesState || {};
    var strategy = sales.strategy || {};
    var payload = {
      event: eventName,
      source_page: window.location.pathname,
      opening_choice: safeAnalyticsValue(extra && extra.opening_choice || strategy.path),
      conversation_stage: safeAnalyticsValue(sales.stage),
      goal: safeAnalyticsValue(sales.goal),
      concern_category: safeAnalyticsValue(sales.concern),
      visitor_message_count: state.turns.filter(function (turn) { return turn.role === 'user'; }).length,
      cta_type: safeAnalyticsValue(extra && extra.cta_type),
    };
    Object.keys(payload).forEach(function (key) { if (payload[key] === null || payload[key] === '' || payload[key] === 'unknown') delete payload[key]; });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }

  function safeAnalyticsValue(value) {
    if (typeof value !== 'string' || !/^[a-z_]{1,40}$/.test(value)) return null;
    return value;
  }

  function openingChoiceValue(label) {
    if (/payment/.test(label.toLowerCase())) return 'payment';
    if (/qualify/.test(label.toLowerCase())) return 'qualification';
    if (/situation/.test(label.toLowerCase())) return 'complex';
    return 'pricing';
  }

  function scheduleAbandonment() {
    if (state.abandonmentTimer) window.clearTimeout(state.abandonmentTimer);
    if (!state.conversationStarted || state.converted || state.abandonedTracked) return;
    state.abandonmentTimer = window.setTimeout(trackAbandonment, 120000);
  }

  function trackAbandonment() {
    if (!state.conversationStarted || state.converted || state.abandonedTracked) return;
    state.abandonedTracked = true;
    trackAssistant('conversation_abandoned');
  }

  function trapFocus(event) {
    var focusable = Array.prototype.slice.call(ui.panel.querySelectorAll('button:not([disabled]),a[href],textarea:not([disabled]),input:not([disabled]),select:not([disabled])')).filter(function (element) { return !element.hidden && element.offsetParent !== null; });
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function setBusy(busy, message) {
    state.busy = busy;
    ui.send.disabled = busy;
    ui.input.disabled = busy;
    ui.confirm.disabled = busy;
    ui.status.textContent = message;
    ui.send.textContent = busy ? 'Wait…' : 'Send';
    if (busy) showTypingIndicator(message || 'Assistant is typing.');
    else hideTypingIndicator();
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
      var random = Math.random() * 16 | 0;
      return (character === 'x' ? random : (random & 3 | 8)).toString(16);
    });
  }
})();
