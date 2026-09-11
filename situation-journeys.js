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
    var details = questions.filter(function (q) { return data.get(q.name); }).map(function (q) {
      return q.label + ': ' + data.get(q.name);
    });
    if (data.get('situation')) details.push('Additional context: ' + data.get('situation'));
    payload.situation = details.join('\n');
    payload.intent = intent;
    payload.page_url = pageUrl;
    payload.lead_source = 'Website Situation Review';
    payload.tag = 'scenario-review';
    payload.tcpa_consent = data.get('tcpa_consent') === 'on';
    payload.sms_opt_in = data.get('sms_opt_in') === 'on';
    return payload;
  }

  async function capture(payload, data, request) {
    var results = await Promise.allSettled([
      request('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() }, 20000),
      request('/.netlify/functions/lead-intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }, 20000)
        .then(async function (response) { return response.ok ? response.json() : null; })
    ]);
    var netlifyAccepted = results[0].status === 'fulfilled' && results[0].value.ok;
    var leadAccepted = results[1].status === 'fulfilled' && results[1].value && results[1].value.captured === true;
    if (!netlifyAccepted && !leadAccepted) throw new Error('No capture accepted');
    return { captured: true, primary: Boolean(leadAccepted), receipt: leadAccepted ? results[1].value : null };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { makePayload: makePayload, capture: capture };
  if (!root.document) return;

  function init(form) {
    var intent = form.dataset.journey;
    var first = form.querySelector('[data-journey-step="1"]');
    var second = form.querySelector('[data-journey-step="2"]');
    var next = form.querySelector('[data-journey-next]');
    var back = form.querySelector('[data-journey-back]');
    var progress = form.querySelector('.journey-progress');
    var status = form.querySelector('.journey-status');
    var submit = form.querySelector('[type="submit"]');
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
    var draftKey = 'styer:journey-draft:' + form.name + ':' + root.location.pathname;
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
        var show=(!wrapper.dataset.goals || wrapper.dataset.goals.split('|').includes(goal.value)) && (!wrapper.dataset.situations || wrapper.dataset.situations.split('|').includes(situation.value));
        wrapper.hidden=!show;wrapper.querySelectorAll('input,select').forEach(function(field) { field.disabled=!show; });
      });
      intent = ({Purchase:'purchase',Refinance:'refinance','Access equity':'equity',Invest:'investment',Build:'construction','Buy before selling':'move_up'})[goal.value] || 'general';
      form.elements.intent.value=intent;
    }
    if (goal && situation) {
      conditions(); goal.addEventListener('change',conditions); situation.addEventListener('change',conditions);
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
    if (grid && !first.querySelector('.journey-estimates')) {
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
    var questions = Array.from(first.querySelectorAll('input,select')).filter(function (field) { return field.type !== 'hidden'; }).map(function (field) {
      var label = first.querySelector('label[for="' + field.id + '"]');
      return { name: field.name, label: label.textContent.replace(/ \*$/, '') };
    });

    // Events deliberately contain only fixed intent/form identifiers and a clean
    // page path. Financial answers, contact data and arbitrary URL text stay out.
    function attributionEvent(name, inquiryId) {
      root.dataLayer = root.dataLayer || [];
      root.dataLayer.push({ event: name, form_name: form.name, intent: intent, page_path: root.location.pathname, ...(inquiryId ? {inquiry_id:inquiryId}: {}) });
    }
    function showStep(value, focus) {
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
        if (field.required && field.type === 'text') field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
        if (!field.checkValidity()) { field.reportValidity(); return false; }
      }
      return true;
    }
    function advance() {
      if (!valid(first)) return;
      if (!completed) { attributionEvent('step_1_complete'); completed = true; }
      showStep(2, true);
    }
    next.hidden = false;
    back.hidden = false;
    form.noValidate = true;
    showStep(1, false);
    attributionEvent('qualification_funnel_view');
    form.addEventListener('focusin', function () {
      if (!started) { attributionEvent('form_start'); started = true; }
    });
    next.addEventListener('click', advance);
    back.addEventListener('click', function () { showStep(1, true); });
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (busy) return;
      if (step === 1) { advance(); return; }
      if (!valid(first)) { showStep(1, true); return; }
      if (!valid(second)) return;
      if (form.elements.preferred_follow_up && form.elements.preferred_follow_up.value === 'Phone' && !form.elements.phone.value.trim()) {
        form.elements.phone.setCustomValidity('Add your phone number or choose email.');form.elements.phone.reportValidity();return;
      }
      busy = true;
      submit.disabled = true;
      back.disabled = true;
      submit.textContent = 'Sending…';
      status.hidden = true;
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
        delete status.dataset.tone;
        var receiptKey='styer:accepted:'+payload.inquiry_id;
        if (!storageRead(receiptKey)) {
          attributionEvent('accepted_submit',payload.inquiry_id);
          attributionEvent('generate_lead',payload.inquiry_id);
          try { root.sessionStorage.setItem(receiptKey,'true'); } catch (_) {}
        }
        try { root.sessionStorage.removeItem(draftKey); } catch (_) {}
        form.querySelectorAll('fieldset').forEach(function (fieldset) { fieldset.hidden = true; });
        progress.hidden = true;
        status.textContent = (result.primary ? 'Your scenario and contact details are saved for review.' : 'Your scenario is saved in our backup inbox. Delivery to the review system is still pending.') + (analysis ? ' Your calculator assumptions and results are included.' : '') + ' I’ll review what you shared and follow up using your contact details. I aim to respond within one business day. This is not a loan approval.';
        if (result.receipt && result.receipt.preview) status.textContent='Preview only: your scenario was accepted by the test service. No lead, email, or marketing subscription was created.';
        var actions=root.document.createElement('div');actions.className='journey-next-actions';
        var book=root.document.createElement('a');book.href='https://calendly.com/adamstyer/15minutes';book.target='_blank';book.rel='noopener';book.textContent='Book a Call';actions.appendChild(book);
        var helper=root.document.createElement('p');helper.textContent='You can choose a time to discuss this scenario. If timing is tight, call or text (512) 956-6010. Apply Now remains available above when you’re ready for the secure application.';actions.appendChild(helper);status.appendChild(actions);
        status.hidden = false;
        status.focus();
      } catch (_) {
        status.dataset.tone='error';
        status.textContent = 'We could not confirm that your scenario was saved. Please try again, or call (512) 956-6010. Your answers are still here.';
        status.hidden = false;
        submit.disabled = false;
        back.disabled = false;
        submit.textContent = 'Send Your Scenario';
        busy = false;
        status.focus();
      }
    });
    form.elements.phone.addEventListener('input',function(){this.setCustomValidity('');});
    if(form.elements.preferred_follow_up) form.elements.preferred_follow_up.addEventListener('change',function(){form.elements.phone.setCustomValidity('');});
  }
  root.document.querySelectorAll('form[data-journey]').forEach(init);
})(typeof window !== 'undefined' ? window : globalThis);
