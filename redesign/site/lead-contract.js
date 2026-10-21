(function(root){
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


const api={makePayload,capture};if(typeof module!=="undefined")module.exports=api;else root.PreviewLeadContract=api;
})(typeof window!=="undefined"?window:globalThis);