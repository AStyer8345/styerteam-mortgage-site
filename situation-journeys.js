(function (root) {
  'use strict';

  function cleanUrl(value) {
    try {
      var url = new URL(value, root.location.origin);
      return /^https?:$/.test(url.protocol) ? url.origin + url.pathname : '';
    } catch (_) { return ''; }
  }

  // Keep the established intake contract: all situation-specific answers also
  // travel in its supported situation field, so no backend rollout is needed.
  function makePayload(data, questions, intent, pageUrl) {
    var payload = Object.fromEntries(data.entries());
    // The Contact form keeps its established name/message fields for Forms.
    // Normalize them for the same primary intake used by the specialist forms.
    if (data.get('name') && !payload.first_name) {
      var names = data.get('name').trim().split(/\s+/);
      payload.first_name = names.shift();
      payload.last_name = names.join(' ');
    }
    var details = questions.filter(function (q) { return data.get(q.name); }).map(function (q) {
      return q.label + ': ' + data.get(q.name);
    });
    if (data.get('loan_goal') && !questions.some(function (q) { return q.name === 'loan_goal'; })) details.unshift('Financing goal: ' + data.get('loan_goal'));
    if (data.get('situation')) details.push('Additional context: ' + data.get('situation'));
    else if (data.get('message')) details.push('What I am trying to accomplish: ' + data.get('message').trim());
    if (data.get('self_reported_source')) details.push('How I first heard about Adam (self-reported): ' + data.get('self_reported_source'));
    payload.situation = details.join('\n');
    payload.intent = intent;
    payload.page_url = pageUrl;
    payload.lead_source = data.get('form-name') === 'contact' ? 'Website Contact' : 'Website Situation Review';
    payload.tag = 'scenario-review';
    payload.tcpa_consent = data.get('tcpa_consent') === 'on';
    payload.sms_opt_in = data.get('sms_opt_in') === 'on';
    return payload;
  }

  async function capture(payload, data, request) {
    // Confirm immediately on the first durable acceptance. The other transport
    // continues with the same ID, including during navigation after confirmation.
    // LoanOS deduplicates that ID.
    return new Promise(function (resolve, reject) {
      var accepted = false;
      function accept(result) { accepted = true; resolve(result); }
      var netlify = Promise.resolve().then(function () {
        return request('/', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() }, 20000);
      }).then(function (response) {
        var netlifyAccepted = response.ok && !response.redirected;
        if (netlifyAccepted) accept({ captured: true, primary: false, receipt: null });
      });
      var primary = Promise.resolve().then(function () {
        return request('/.netlify/functions/lead-intake', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }, 20000);
      }).then(async function (response) {
        var receipt = response.ok ? await response.json() : null;
        var leadAccepted = receipt && receipt.captured === true;
        if (leadAccepted) accept({ captured: true, primary: true, receipt: receipt });
      });
      Promise.allSettled([netlify, primary]).then(function () {
        if (!accepted) reject(new Error('No capture accepted'));
      });
    });
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { makePayload: makePayload, capture: capture };
  if (!root.document) return;

  function init(form) {
    // If shared JavaScript failed to load, leave the native POST operational.
    if (typeof root.StyerInquiryId !== 'function' || typeof root.StyerFetchWithTimeout !== 'function') return;
    if (form.dataset.journeyBound) return;
    form.dataset.journeyBound = 'true';
    var formName = form.getAttribute('name');
    var singleStep = form.dataset.journeyMode === 'conversation';
    var intent = form.dataset.journey;
    var first = form.querySelector('[data-journey-step="1"]') || form.querySelector('[data-journey-step="2"]');
    var second = form.querySelector('[data-journey-step="2"]');
    var next = form.querySelector('[data-journey-next]');
    var back = form.querySelector('[data-journey-back]');
    var progress = form.querySelector('.journey-progress');
    var status = form.querySelector('.journey-status');
    var submit = form.querySelector('[type="submit"]');
    var submitLabel = submit.textContent;
    var step = 1;
    var busy = false;
    var started = false;
    var completed = false;
    var params = new URLSearchParams(root.location.search);
    var goal = form.elements.loan_goal;
    var situation = form.elements.income_type;
    function setKnown(field, value) {
      if (field && value && Array.from(field.options || []).some(function(o) { return o.value === value; })) field.value = value;
    }
    setKnown(goal, ({purchase:'Purchase',refinance:'Refinance',investment:'Invest',construction:'Build',move_up:'Buy before selling'})[params.get('intent')]);
    setKnown(goal, params.get('goal'));
    setKnown(situation, params.get('situation'));
    var draftKey = 'styer:journey-draft:' + formName + ':' + root.location.pathname;
    var analysis = null;
    function storageRead(key) { try { return JSON.parse(root.sessionStorage.getItem(key) || 'null'); } catch (_) { return null; } }
    var draft = storageRead(draftKey);
    // Explicit entry context wins over a prior journey; Back and reload restore it.
    if (draft && Date.now() - draft.at < 2 * 60 * 60 * 1000 && draft.entry === root.location.search) {
      Object.keys(draft.values).forEach(function(name) { var field=form.elements[name]; if(field && field.type!=='checkbox') field.value=draft.values[name]; });
    }
    function remember() {
      var values={};Array.from(form.elements).forEach(function(field) { if(field.name && field.type!=='checkbox' && field.type!=='submit') values[field.name]=field.value; });
      try { root.sessionStorage.setItem(draftKey,JSON.stringify({at:Date.now(),entry:root.location.search,values:values})); } catch (_) {}
    }
    function conditions() {
      first.querySelectorAll('[data-goals],[data-situations]').forEach(function(wrapper) {
        var show=(!wrapper.dataset.goals || wrapper.dataset.goals.split('|').includes(goal.value)) && (!wrapper.dataset.situations || wrapper.dataset.situations.split('|').includes(situation ? situation.value : ''));
        wrapper.hidden=!show;wrapper.querySelectorAll('input,select').forEach(function(field) { field.disabled=!show; });
      });
      intent = ({Purchase:'purchase',Refinance:'refinance','Access equity':'equity',Invest:'investment',Build:'construction','Buy before selling':'move_up'})[goal.value] || 'general';
      form.elements.intent.value=intent;
    }
    if (goal) {
      conditions(); goal.addEventListener('change',conditions); if (situation) situation.addEventListener('change',conditions);
    }
    form.addEventListener('input',remember);form.addEventListener('change',remember);
    // Calculator details travel through same-tab storage, never query strings.
    if (params.get('context') === 'calculator') {
      analysis=storageRead('styer:calculator-review');
      if (!analysis || Date.now()-analysis.at > 2*60*60*1000 || !['dscr','refinance'].includes(analysis.kind)) analysis=null;
      if (analysis && root.StyerAnalysis) { try { analysis=root.StyerAnalysis.normalize(analysis); } catch (_) { analysis=null; } }
    }
    if (analysis && root.StyerAnalysis) {
      var panel=root.document.createElement('div');panel.className='journey-summary';
      root.StyerAnalysis.render(panel,analysis);
      var edit=root.document.createElement('a');edit.href=analysis.kind==='dscr'?'/dscr-calculator.html?restore=review':'/calculator-refinance-breakeven.html?restore=review';edit.textContent='Edit these numbers';panel.appendChild(edit);
      var remove=root.document.createElement('button');remove.type='button';remove.className='journey-back';remove.textContent='Remove analysis';remove.addEventListener('click',function(){analysis=null;panel.remove();try{root.sessionStorage.removeItem('styer:calculator-review');}catch(_){}});panel.appendChild(remove);
      first.before(panel);
      var mapped=analysis.kind==='dscr'?{property_value:analysis.inputs.price,down_payment:analysis.inputs.down+(analysis.inputs.downMode==='pct'?'%':' dollars'),monthly_rent:analysis.inputs.rent}:{current_balance:analysis.inputs.balance,current_rate:analysis.inputs.currentRate};
      Object.keys(mapped).forEach(function(name){if(form.elements[name]) form.elements[name].value=String(mapped[name]);});
      // These answers are already in the editable calculator summary.
      Object.keys(mapped).forEach(function(name){if(form.elements[name]) form.elements[name].closest('.journey-field').hidden=true;});
    } else if (params.get('context') === 'calculator') {
      var missing=root.document.createElement('p');missing.className='journey-hint';missing.textContent='Your calculator numbers could not be restored. Go back to the calculator and choose review again, or share the estimates you know below.';first.before(missing);
    }
    function reconcileSource() {
      if (form.id === 'form-homepage-contact') {
        form.elements.cta_source_page.value = cleanUrl(root.location.href);
        return;
      }
      if (singleStep && /^homepage_(hero|options|case_studies|scenario_section|footer|sticky_mobile)$/.test(params.get('source') || '')) {
        form.elements.cta_source_page.value = root.location.origin + '/';
        form.elements.cta_label.value = 'Get My Mortgage Options';
        return;
      }
      // The five homepage choices are not legacy preapproval CTA clicks. Do not
      // let a stale saved click from another page replace this entry point.
      if (new URLSearchParams(root.location.search).get('source') === 'homepage_situations') {
        form.elements.cta_source_page.value = root.location.origin + '/';
        form.elements.cta_label.value = 'Start with your situation';
      } else if (root.document.referrer) {
        form.elements.cta_source_page.value = cleanUrl(root.document.referrer);
      }
    }
    reconcileSource();
    root.document.addEventListener('styer:attribution-ready', reconcileSource, { once: true });
    // Keep the first decision short; estimates stay available without obscuring
    // the goal, situation and readiness choices. Values survive Back and edits.
    var grid = first.querySelector('.journey-fields');
    if (!singleStep && grid && !first.querySelector('.journey-estimates')) {
      var estimates = root.document.createElement('details');
      estimates.className = 'journey-estimates';
      var summary = root.document.createElement('summary');
      summary.textContent = 'Add estimates or details (optional)';
      var extraFields = root.document.createElement('div');
      extraFields.className = 'journey-fields';
      Array.from(grid.children).forEach(function (wrapper) {
        if (!wrapper.querySelector('[name="loan_goal"],[name="income_type"],[name="readiness"]')) extraFields.appendChild(wrapper);
      });
      estimates.appendChild(summary); estimates.appendChild(extraFields); grid.after(estimates);
    }
    var questions = singleStep ? [] : Array.from(first.querySelectorAll('input,select')).filter(function (field) { return field.type !== 'hidden'; }).map(function (field) {
      var label = first.querySelector('label[for="' + field.id + '"]');
      return { name: field.name, label: label.textContent.replace(/ \*$/, '') };
    });

    // Events deliberately contain only fixed intent/form identifiers and a clean
    // page path. Financial answers, contact data and arbitrary URL text stay out.
    function attributionEvent(name, inquiryId) {
      root.dataLayer = root.dataLayer || [];
      root.dataLayer.push({ event: name, form_name: formName, intent: intent, page_path: root.location.pathname, ...(inquiryId ? {inquiry_id:inquiryId}: {}) });
    }
    function showStep(value, focus) {
      if (singleStep) { step = 2; second.hidden = false; progress.hidden = true; return; }
      step = value;
      first.hidden = step !== 1;
      second.hidden = step !== 2;
      progress.textContent = step === 1 ? 'Step 1 of 2 · Your plans' : 'Step 2 of 2 · Contact & context';
      if (focus) {
        var field = (step === 1 ? first : second).querySelector('input:not([type="hidden"]),select,textarea');
        if (field) field.focus();
      }
    }
    function valid(section) {
      var fields = Array.from(section.querySelectorAll('input,select,textarea'));
      for (var field of fields) {
        // Native required checks allow whitespace-only names; reject those too.
        if (field.required && (field.type === 'text' || field.tagName === 'TEXTAREA')) field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
        if (!field.checkValidity()) { field.reportValidity(); return false; }
      }
      return true;
    }
    function advance() {
      if (!valid(first)) return;
      if (!completed) { attributionEvent('step_1_complete'); completed = true; }
      showStep(2, true);
    }
    if (next) next.hidden = false;
    if (back) back.hidden = false;
    form.noValidate = true;
    showStep(1, false);
    attributionEvent('qualification_funnel_view');
    form.addEventListener('focusin', function () {
      if (!started) { attributionEvent('form_start'); started = true; }
    });
    if (next) next.addEventListener('click', advance);
    if (back) back.addEventListener('click', function () { showStep(1, true); });
    if (singleStep) {
      function contactPreference() {
        var phone = form.elements.phone;
        phone.required = form.elements.preferred_follow_up.value === 'Phone';
        form.querySelector('label[for="' + phone.id + '"]').textContent = phone.required ? 'Phone *' : 'Phone (optional)';
        phone.setCustomValidity('');
      }
      form.elements.preferred_follow_up.addEventListener('change', contactPreference);
      contactPreference();
    }
    function showConfirmation(result) {
      busy = true;
      delete status.dataset.tone;
      form.querySelectorAll('fieldset').forEach(function (fieldset) { fieldset.hidden = true; });
      progress.hidden = true;
      status.textContent = (result.primary ? 'Your scenario and contact details are saved for review.' : 'Your scenario is saved in our backup inbox. Delivery to the review system is still pending.') + (analysis ? ' Your calculator assumptions and results are included.' : '') + ' I’ll review what you shared and follow up using your contact details. I aim to respond within one business day. This is not a loan approval.';
      if (singleStep) {
        var card = form.closest('.journey-card');
        if (card) {
          card.classList.add('journey-confirmed');
          var heading = card.querySelector('h2');
          if (heading) heading.textContent = 'Thank you — your message is received.';
          card.querySelectorAll('.journey-form-intro, .journey-hint').forEach(function (element) { element.hidden = true; });
        }
        status.textContent = result.primary ? 'Your request is saved for Adam to review. He’ll follow up using your contact details, typically within one business day.' : 'Your request is saved in our backup inbox. Delivery to Adam’s review system is still pending. You can also call or text Adam using the links below.';
      }
      if (result.receipt && result.receipt.preview) status.textContent='Preview only: your scenario was accepted by the test service. No lead, email, or marketing subscription was created.';
      status.classList.add('journey-confirmation');
      var helper=root.document.createElement('p');helper.className='journey-confirmation-intro';helper.textContent='Want to connect sooner? Call or text Adam at (512) 956-6010, or choose a time that works for you.';status.appendChild(helper);
      var actions=root.document.createElement('div');actions.className='journey-next-actions';
      [['Call Adam','tel:+15129566010'],['Text Adam','sms:+15129566010'],['Schedule a Call','https://calendly.com/adamstyer/15minutes']].forEach(function(item){
        var link=root.document.createElement('a');link.href=item[1];link.textContent=item[0];
        if(item[1].indexOf('https:')===0){link.target='_blank';link.rel='noopener';}
        actions.appendChild(link);
      });
      status.appendChild(actions);
      var application=root.document.createElement('div');application.className='journey-application';
      var title=root.document.createElement('h3');title.textContent='Want to get a head start?';application.appendChild(title);
      var detail=root.document.createElement('p');detail.textContent='You can complete a secure online loan application to help make your first conversation more efficient. Your credit will not be run automatically. This step is entirely optional — it’s fine to wait and talk with Adam first.';application.appendChild(detail);
      var apply=root.document.createElement('a');apply.href='https://hypersmart.my1003app.com/513013/register?time=1779291829279';apply.target='_blank';apply.rel='noopener';apply.className='journey-application-link';apply.textContent='Start a Secure Loan Application';application.appendChild(apply);status.appendChild(application);
      var another = root.document.createElement('button');
      another.type = 'button'; another.className = 'journey-back'; another.textContent = 'Send another request';
      another.addEventListener('click', function () {
        try { root.sessionStorage.removeItem(draftKey + ':receipt'); root.sessionStorage.removeItem(draftKey); } catch (_) {}
        form.reset(); root.location.reload();
      });
      status.appendChild(another);
      status.hidden = false;
      status.focus({ preventScroll: true });
      (form.closest('.journey-card') || status).scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (busy) return;
      if (step === 1) { advance(); return; }
      if (singleStep && form.elements.phone.value.trim()) {
        var digits = form.elements.phone.value.replace(/\D/g, '');
        form.elements.phone.setCustomValidity(digits.length >= 10 && digits.length <= 15 ? '' : 'Please enter a phone number with area code.');
      }
      if (!valid(first)) { showStep(1, true); return; }
      if (!valid(second)) return;
      if (form.elements.preferred_follow_up && form.elements.preferred_follow_up.value === 'Phone' && !form.elements.phone.value.trim()) {
        form.elements.phone.setCustomValidity('Add your phone number or choose email.');form.elements.phone.reportValidity();return;
      }
      busy = true;
      submit.disabled = true;
      if (back) back.disabled = true;
      submit.textContent = 'Sending…';
      status.dataset.tone = 'sending';
      status.textContent = 'Sending your request… Please keep this page open.';
      status.hidden = false;
      try {
        // Reuse the site's stable ID and bounded transport for both captures.
        form.elements.inquiry_id.value = root.StyerInquiryId(form);
        remember();
        var data = new FormData(form);
        var payload = makePayload(data, questions, intent, cleanUrl(root.location.href));
        if (analysis && root.StyerAnalysis) payload.situation += '\n\n' + root.StyerAnalysis.summary(analysis);
        if (payload.preferred_follow_up) payload.situation += '\nPreferred follow-up: ' + payload.preferred_follow_up;
        ['page_url', 'entry_referrer', 'first_touch_page', 'first_touch_referrer', 'cta_source_page'].forEach(function (key) {
          payload[key] = payload[key] ? cleanUrl(payload[key]) : '';
          data.set(key, payload[key]);
        });
        data.set('intent', intent);
        data.set('situation', payload.situation);
        var result=await capture(payload, data, root.StyerFetchWithTimeout);
        // Persist only a receipt, never contact details. Back/reload must not
        // submit an already accepted inquiry or fire another conversion.
        try {
          root.sessionStorage.setItem(draftKey + ':receipt', JSON.stringify({ at: Date.now(), inquiryId: payload.inquiry_id, primary: result.primary }));
          root.sessionStorage.removeItem(draftKey);
        } catch (_) {}
        showConfirmation(result);
        var receiptKey = 'styer:accepted:' + payload.inquiry_id;
        if (!storageRead(receiptKey)) {
          try {
            root.sessionStorage.setItem(receiptKey, 'true');
          } catch (_) {}
          try {
            attributionEvent('accepted_submit', payload.inquiry_id);
            attributionEvent('generate_lead', payload.inquiry_id);
          } catch (_) { /* Analytics must not hide a saved request. */ }
        }
      } catch (_) {
        status.dataset.tone='error';
        status.textContent = 'We could not confirm that your scenario was saved. Please try again, or call (512) 956-6010. Your answers are still here.';
        if (singleStep) status.textContent = 'We could not confirm that your message was saved. Please try again, or call (512) 956-6010. Your message is still here.';
        status.hidden = false;
        submit.disabled = false;
        if (back) back.disabled = false;
        submit.textContent = submitLabel;
        busy = false;
        status.focus({ preventScroll: true });
        (form.closest('.journey-card') || status).scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
    var savedReceipt = storageRead(draftKey + ':receipt');
    if (savedReceipt && Date.now() - savedReceipt.at < 2 * 60 * 60 * 1000) {
      form.elements.inquiry_id.value = savedReceipt.inquiryId;
      showConfirmation({ primary: savedReceipt.primary });
    }
    form.elements.phone.addEventListener('input',function(){this.setCustomValidity('');});
    if(form.elements.preferred_follow_up) form.elements.preferred_follow_up.addEventListener('change',function(){form.elements.phone.setCustomValidity('');});
  }
  root.document.querySelectorAll('form[data-journey]').forEach(init);
})(typeof window !== 'undefined' ? window : globalThis);
