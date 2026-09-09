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
    return { captured: true, primary: Boolean(leadAccepted) };
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
    var questions = Array.from(first.querySelectorAll('input,select')).filter(function (field) { return field.type !== 'hidden'; }).map(function (field) {
      var label = first.querySelector('label[for="' + field.id + '"]');
      return { name: field.name, label: label.textContent.replace(/ \*$/, '') };
    });

    // Events deliberately contain only fixed intent/form identifiers and a clean
    // page path. Financial answers, contact data and arbitrary URL text stay out.
    function attributionEvent(name) {
      root.dataLayer = root.dataLayer || [];
      root.dataLayer.push({ event: name, form_name: form.name, intent: intent, page_path: root.location.pathname });
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
      busy = true;
      submit.disabled = true;
      back.disabled = true;
      submit.textContent = 'Sending…';
      status.hidden = true;
      try {
        // Reuse the site's stable ID and bounded transport for both captures.
        form.elements.inquiry_id.value = root.StyerInquiryId(form);
        var data = new FormData(form);
        var payload = makePayload(data, questions, intent, cleanUrl(root.location.href));
        ['page_url', 'entry_referrer', 'first_touch_page', 'first_touch_referrer', 'cta_source_page'].forEach(function (key) {
          payload[key] = payload[key] ? cleanUrl(payload[key]) : '';
          data.set(key, payload[key]);
        });
        data.set('intent', intent);
        data.set('situation', payload.situation);
        await capture(payload, data, root.StyerFetchWithTimeout);
        attributionEvent('accepted_submit');
        attributionEvent('generate_lead');
        form.querySelectorAll('fieldset').forEach(function (fieldset) { fieldset.hidden = true; });
        progress.hidden = true;
        status.textContent = 'Your scenario has been saved for review. Adam or his team will follow up using the contact details you provided. This is not a loan approval.';
        status.hidden = false;
        status.focus();
      } catch (_) {
        status.textContent = 'We could not confirm that your scenario was saved. Please try again, or call (512) 956-6010. Your answers are still here.';
        status.hidden = false;
        submit.disabled = false;
        back.disabled = false;
        submit.textContent = 'Send Your Scenario';
        busy = false;
        status.focus();
      }
    });
  }
  root.document.querySelectorAll('form[data-journey]').forEach(init);
})(typeof window !== 'undefined' ? window : globalThis);
