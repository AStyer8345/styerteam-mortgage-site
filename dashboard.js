/* ==========================================================================
   Dashboard - Newsletter Automation + Rate Update Automation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDashTabs();
  initNewsletterAutomation();
  initRateBuilder();
  initRealtorBuilder();
  initCopyButtons();
  initFormPersistence();
});

// ========================================================================
// TAB SWITCHING
// ========================================================================

function initDashTabs() {
  const tabs = document.querySelectorAll('.dash-tab');
  const panels = document.querySelectorAll('.dash-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

// ========================================================================
// NEWSLETTER AUTOMATION (calls Netlify function)
// ========================================================================

function initNewsletterAutomation() {
  const form = document.getElementById('newsletter-builder');
  if (!form) return;

  const submitBtn = document.getElementById('nl-submit-btn');
  const progressEl = document.getElementById('newsletter-progress');
  const resultEl = document.getElementById('newsletter-result');
  const errorEl = document.getElementById('newsletter-error');
  const statusEl = document.getElementById('newsletter-status');
  const retryBtn = document.getElementById('nl-retry-btn');

  // Helper: update submit button text based on source + mode
  function updateNlButtonText() {
    const src = form.querySelector('input[name="nl-source"]:checked')?.value || 'ai';
    const m = form.querySelector('input[name="nl-mode"]:checked')?.value || 'preview';
    if (src === 'paste') {
      submitBtn.textContent = m === 'live' ? '🚀 Paste & Publish Newsletter' : '👁 Preview Paste Content';
    } else {
      submitBtn.textContent = m === 'live' ? '🚀 Generate & Send Newsletter' : '👁 Preview Newsletter';
    }
  }

  // Mode toggle handling (Preview / Live)
  const modeOptions = form.querySelectorAll('.dash-mode-option[data-mode]');
  modeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      modeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      opt.querySelector('input[type="radio"]').checked = true;
      updateNlButtonText();
    });
  });

  // Source toggle handling (AI Generate / Paste & Publish)
  const sourceOptions = form.querySelectorAll('.dash-mode-option[data-source]');
  sourceOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      sourceOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      opt.querySelector('input[type="radio"]').checked = true;

      const source = opt.dataset.source;
      document.getElementById('nl-ai-fields').classList.toggle('hidden', source === 'paste');
      document.getElementById('nl-paste-fields').classList.toggle('hidden', source === 'ai');
      updateNlButtonText();
    });
  });

  // "Looks Good — Go Live" button in preview results
  const goLiveBtn = document.getElementById('preview-go-live-btn');
  if (goLiveBtn) {
    goLiveBtn.addEventListener('click', () => {
      // Switch to live mode
      modeOptions.forEach(o => o.classList.remove('active'));
      const liveOpt = form.querySelector('.dash-mode-option[data-mode="live"]');
      if (liveOpt) {
        liveOpt.classList.add('active');
        liveOpt.querySelector('input[type="radio"]').checked = true;
      }
      submitBtn.textContent = '🚀 Generate & Send Newsletter';

      // Hide preview result
      resultEl.classList.add('hidden');

      // Scroll to submit button and auto-submit
      submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => submitBtn.click(), 400);
    });
  }

  // "Edit & Regenerate" button
  const editBtn = document.getElementById('preview-edit-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      resultEl.classList.add('hidden');
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      errorEl.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get current mode
    const modeRadio = form.querySelector('input[name="nl-mode"]:checked');
    const mode = modeRadio ? modeRadio.value : 'preview';

    // Determine source mode
    const source = form.querySelector('input[name="nl-source"]:checked')?.value || 'ai';
    const isPaste = source === 'paste';

    // Get schedule time (both modes)
    const scheduleRaw = form.querySelector('#nl-schedule').value;
    const scheduleTime = scheduleRaw ? new Date(scheduleRaw).toISOString() : null;

    // Validate based on source
    if (isPaste) {
      const title = form.querySelector('#nl-paste-title').value.trim();
      const emailHtml = form.querySelector('#nl-paste-email').value.trim();
      const webContent = form.querySelector('#nl-paste-web').value.trim();
      if (!title) { form.querySelector('#nl-paste-title').focus(); return; }
      if (!emailHtml) { form.querySelector('#nl-paste-email').focus(); return; }
      if (!webContent) { form.querySelector('#nl-paste-web').focus(); return; }
    } else {
      const topic = form.querySelector('#nl-topic').value.trim();
      if (!topic) { form.querySelector('#nl-topic').focus(); return; }
    }

    // Gather audiences
    const audiences = [];
    form.querySelectorAll('input[name="audience"]:checked').forEach(cb => {
      audiences.push(cb.value);
    });

    if (!audiences.length) {
      alert('Please select at least one audience (Borrowers or Realtors).');
      return;
    }

    // Confirm if live mode
    if (mode === 'live') {
      const audienceLabel = audiences.map(a => a === 'borrower' ? 'Borrower' : 'Realtor').join(' and ');
      let msg;
      if (scheduleTime) {
        const when = new Date(scheduleRaw).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
        msg = 'This will publish the page NOW and SCHEDULE emails to your ' + audienceLabel + ' list(s) for ' + when + '. Continue?';
      } else {
        msg = 'This will publish a page and send emails to your ' + audienceLabel + ' list(s). Continue?';
      }
      if (!confirm(msg)) return;
    }

    // Gather form data
    let formData;
    if (isPaste) {
      formData = {
        source: 'paste',
        title: form.querySelector('#nl-paste-title').value.trim(),
        description: form.querySelector('#nl-paste-description').value.trim(),
        subject: form.querySelector('#nl-paste-subject').value.trim(),
        preheader: form.querySelector('#nl-paste-preheader').value.trim(),
        photo: form.querySelector('#nl-paste-photo').value.trim(),
        emailHtml: form.querySelector('#nl-paste-email').value.trim(),
        webContent: form.querySelector('#nl-paste-web').value.trim(),
        audiences,
        mode,
        scheduleTime,
      };
    } else {
      formData = {
        topic: form.querySelector('#nl-topic').value.trim(),
        audiences,
        mode,
        rates: buildRateString('nl'),
        articles: form.querySelector('#nl-articles').value.trim(),
        story: form.querySelector('#nl-story').value.trim(),
        photo: form.querySelector('#nl-photo').value.trim(),
        aiTool: form.querySelector('#nl-ai-tool').value.trim(),
        notes: form.querySelector('#nl-notes').value.trim(),
        scheduleTime,
      };
    }

    // Reset UI
    progressEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Scroll to progress
    progressEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Set initial step
    if (isPaste) {
      setProgressStep('publish');
      setStatus('Publishing pasted content...');
    } else {
      setProgressStep('generate');
      setStatus('Generating content with AI... this takes about 30 seconds.');
    }

    try {
      const response = await fetch('/.netlify/functions/generate-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Handle non-JSON responses (e.g. timeout HTML pages)
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('The server took too long to respond. Please try again — it usually works on the second attempt.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      if (data.mode === 'preview') {
        // PREVIEW MODE — show content for review
        setProgressStep('done');
        setStatus('Preview ready!');

        await sleep(300);
        progressEl.classList.add('hidden');
        resultEl.classList.remove('hidden');

        // Hide live card, show preview card
        document.getElementById('result-card-live').classList.add('hidden');
        const previewCard = document.getElementById('result-card-preview');
        previewCard.classList.remove('hidden');

        // Fill in preview data
        const p = data.preview;
        setText('preview-page-title', p.pageTitle || formData.topic || formData.title);
        setText('preview-page-url', data.pageUrl);

        // Web content
        const webEl = document.getElementById('preview-web-content');
        if (webEl && p.webContent) webEl.innerHTML = p.webContent;

        // Borrower email
        const borrowerSection = document.getElementById('preview-borrower-section');
        if (p.borrowerEmailHtml) {
          borrowerSection.classList.remove('hidden');
          setText('preview-borrower-subject', p.borrowerSubject || '');
          setText('preview-borrower-preheader', p.borrowerPreheader || '');
          const bEl = document.getElementById('preview-borrower-html');
          if (bEl) bEl.innerHTML = p.borrowerEmailHtml;
        } else {
          borrowerSection.classList.add('hidden');
        }

        // Realtor email
        const realtorSection = document.getElementById('preview-realtor-section');
        if (p.realtorEmailHtml) {
          realtorSection.classList.remove('hidden');
          setText('preview-realtor-subject', p.realtorSubject || '');
          setText('preview-realtor-preheader', p.realtorPreheader || '');
          const rEl = document.getElementById('preview-realtor-html');
          if (rEl) rEl.innerHTML = p.realtorEmailHtml;
        } else {
          realtorSection.classList.add('hidden');
        }

        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      } else {
        // LIVE MODE — show sent confirmation
        setProgressStep('publish');
        setStatus('Page published at ' + data.pageUrl);

        await sleep(500);

        if (data.campaigns && data.campaigns.length > 0) {
          setProgressStep('send');
          const isScheduled = data.campaigns.some(c => c.status === 'scheduled');
          if (isScheduled) {
            const when = new Date(data.campaigns[0].scheduledFor).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
            setStatus('Emails scheduled for ' + when);
          } else {
            setStatus('Emails sent to ' + data.campaigns.map(c => c.audience).join(' and ') + '.');
          }
          await sleep(500);
        }

        setProgressStep('done');
        setStatus('All done!');

        await sleep(300);
        progressEl.classList.add('hidden');
        resultEl.classList.remove('hidden');

        // Show live card, hide preview card
        document.getElementById('result-card-live').classList.remove('hidden');
        document.getElementById('result-card-preview').classList.add('hidden');

        const pageUrlEl = document.getElementById('result-page-url');
        pageUrlEl.href = data.pageUrl;
        pageUrlEl.textContent = data.pageUrl;

        const campaignsEl = document.getElementById('result-campaigns');
        campaignsEl.innerHTML = '';
        if (data.campaigns && data.campaigns.length > 0) {
          data.campaigns.forEach(c => {
            const el = document.createElement('p');
            const statusBadge = c.status === 'scheduled'
              ? '<span style="color: #d4a017;">(Scheduled for ' + new Date(c.scheduledFor).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ')</span>'
              : '<span style="color: var(--color-success);">(Sent)</span>';
            el.innerHTML = '<strong>' + capitalize(c.audience) + ' Email:</strong> ' +
              escapeHtml(c.subject) + ' ' + statusBadge;
            campaignsEl.appendChild(el);
          });
        }

        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

    } catch (err) {
      console.error('Newsletter automation error:', err);
      progressEl.classList.add('hidden');
      errorEl.classList.remove('hidden');
      document.getElementById('newsletter-error-msg').textContent = err.message;
      errorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

// Helper: set text content by ID
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Progress step helper (scoped to a container)
function setProgressStep(activeStep, containerId) {
  const container = document.getElementById(containerId || 'newsletter-progress');
  if (!container) return;
  const steps = container.querySelectorAll('.dash-progress-step');
  const order = ['generate', 'publish', 'send', 'done'];
  const activeIndex = order.indexOf(activeStep);

  steps.forEach((step) => {
    const stepName = step.dataset.step;
    const stepIndex = order.indexOf(stepName);

    step.classList.remove('active', 'completed');
    if (stepIndex < activeIndex) {
      step.classList.add('completed');
    } else if (stepIndex === activeIndex) {
      step.classList.add('active');
    }
  });
}

function setStatus(msg, statusId) {
  const el = document.getElementById(statusId || 'newsletter-status');
  if (el) el.textContent = msg;
}

// ========================================================================
// RATE UPDATE AUTOMATION (calls Netlify function)
// ========================================================================

function initRateBuilder() {
  const form = document.getElementById('rate-builder');
  if (!form) return;

  const submitBtn = document.getElementById('rt-submit-btn');
  const progressEl = document.getElementById('rate-progress');
  const resultEl = document.getElementById('rate-result');
  const errorEl = document.getElementById('rate-error');
  const retryBtn = document.getElementById('rt-retry-btn');

  // Mode toggle handling
  const modeOptions = form.querySelectorAll('.dash-mode-option');
  modeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      modeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      opt.querySelector('input[type="radio"]').checked = true;

      const mode = opt.dataset.mode;
      submitBtn.textContent = mode === 'live' ? '\u{1F680} Generate & Send Rate Update' : '\u{1F441} Preview Rate Update';
    });
  });

  // "Looks Good — Go Live" button in preview results
  const goLiveBtn = document.getElementById('rt-preview-go-live-btn');
  if (goLiveBtn) {
    goLiveBtn.addEventListener('click', () => {
      modeOptions.forEach(o => o.classList.remove('active'));
      const liveOpt = form.querySelector('.dash-mode-option[data-mode="live"]');
      if (liveOpt) {
        liveOpt.classList.add('active');
        liveOpt.querySelector('input[type="radio"]').checked = true;
      }
      submitBtn.textContent = '\u{1F680} Generate & Send Rate Update';

      resultEl.classList.add('hidden');
      submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => submitBtn.click(), 400);
    });
  }

  // "Edit & Regenerate" button
  const editBtn = document.getElementById('rt-preview-edit-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      resultEl.classList.add('hidden');
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      errorEl.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const modeRadio = form.querySelector('input[name="rt-mode"]:checked');
    const mode = modeRadio ? modeRadio.value : 'preview';

    // Validate rates
    const primaryRate = form.querySelector('#rt-conv30-rate').value.trim();
    if (!primaryRate) {
      form.querySelector('#rt-conv30-rate').focus();
      return;
    }

    // Gather audiences
    const audiences = [];
    form.querySelectorAll('input[name="rt-audience"]:checked').forEach(cb => {
      audiences.push(cb.value);
    });

    if (!audiences.length) {
      alert('Please select at least one audience (Borrowers or Realtors).');
      return;
    }

    // Confirm if live mode
    if (mode === 'live') {
      const msg = 'This will publish a rate page and send emails to your ' +
        audiences.map(a => a === 'borrower' ? 'Borrower' : 'Realtor').join(' and ') +
        ' list(s). Continue?';
      if (!confirm(msg)) return;
    }

    // Gather form data
    const formData = {
      rates: buildRateString('rt'),
      direction: form.querySelector('#rt-direction').value,
      blurb: form.querySelector('#rt-blurb').value.trim(),
      notes: form.querySelector('#rt-notes').value.trim(),
      audiences,
      mode,
    };

    // Reset UI
    progressEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    progressEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setProgressStep('generate', 'rate-progress');
    setStatus('Generating rate update with AI... this takes about 20 seconds.', 'rate-status');

    try {
      const response = await fetch('/.netlify/functions/generate-rate-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('The server took too long to respond. Please try again.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      if (data.mode === 'preview') {
        // PREVIEW MODE
        setProgressStep('done', 'rate-progress');
        setStatus('Preview ready!', 'rate-status');

        await sleep(300);
        progressEl.classList.add('hidden');
        resultEl.classList.remove('hidden');

        document.getElementById('rt-result-card-live').classList.add('hidden');
        const previewCard = document.getElementById('rt-result-card-preview');
        previewCard.classList.remove('hidden');

        const p = data.preview;
        setText('rt-preview-page-title', p.pageTitle || 'Weekly Rate Update');
        setText('rt-preview-page-url', data.pageUrl);

        const webEl = document.getElementById('rt-preview-web-content');
        if (webEl && p.webContent) webEl.innerHTML = p.webContent;

        // Borrower email
        const borrowerSection = document.getElementById('rt-preview-borrower-section');
        if (p.borrowerEmailHtml) {
          borrowerSection.classList.remove('hidden');
          setText('rt-preview-borrower-subject', p.borrowerSubject || '');
          setText('rt-preview-borrower-preheader', p.borrowerPreheader || '');
          const bEl = document.getElementById('rt-preview-borrower-html');
          if (bEl) bEl.innerHTML = p.borrowerEmailHtml;
        } else {
          borrowerSection.classList.add('hidden');
        }

        // Realtor email
        const realtorSection = document.getElementById('rt-preview-realtor-section');
        if (p.realtorEmailHtml) {
          realtorSection.classList.remove('hidden');
          setText('rt-preview-realtor-subject', p.realtorSubject || '');
          setText('rt-preview-realtor-preheader', p.realtorPreheader || '');
          const rEl = document.getElementById('rt-preview-realtor-html');
          if (rEl) rEl.innerHTML = p.realtorEmailHtml;
        } else {
          realtorSection.classList.add('hidden');
        }

        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      } else {
        // LIVE MODE
        setProgressStep('publish', 'rate-progress');
        setStatus('Rate page published at ' + data.pageUrl, 'rate-status');

        await sleep(500);

        if (data.campaigns && data.campaigns.length > 0) {
          setProgressStep('send', 'rate-progress');
          setStatus('Emails sent to ' + data.campaigns.map(c => c.audience).join(' and ') + '.', 'rate-status');
          await sleep(500);
        }

        setProgressStep('done', 'rate-progress');
        setStatus('All done!', 'rate-status');

        await sleep(300);
        progressEl.classList.add('hidden');
        resultEl.classList.remove('hidden');

        document.getElementById('rt-result-card-live').classList.remove('hidden');
        document.getElementById('rt-result-card-preview').classList.add('hidden');

        const pageUrlEl = document.getElementById('rt-result-page-url');
        pageUrlEl.href = data.pageUrl;
        pageUrlEl.textContent = data.pageUrl;

        const campaignsEl = document.getElementById('rt-result-campaigns');
        campaignsEl.innerHTML = '';
        if (data.campaigns && data.campaigns.length > 0) {
          data.campaigns.forEach(c => {
            const el = document.createElement('p');
            el.innerHTML = '<strong>' + capitalize(c.audience) + ' Email:</strong> ' +
              escapeHtml(c.subject) + ' <span style="color: var(--color-success);">(Sent)</span>';
            campaignsEl.appendChild(el);
          });
        }

        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

    } catch (err) {
      console.error('Rate update automation error:', err);
      progressEl.classList.add('hidden');
      errorEl.classList.remove('hidden');
      document.getElementById('rate-error-msg').textContent = err.message;
      errorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

// ========================================================================
// REALTOR CONTENT AUTOMATION (calls generate-realtor-content)
// ========================================================================

function initRealtorBuilder() {
  const form = document.getElementById('realtor-builder');
  if (!form) return;

  const submitBtn = document.getElementById('rl-submit-btn');
  const progressEl = document.getElementById('realtor-progress');
  const resultEl = document.getElementById('realtor-result');
  const errorEl = document.getElementById('realtor-error');
  const retryBtn = document.getElementById('rl-retry-btn');

  // Helper: update submit button text based on source + mode
  function updateRlButtonText() {
    const src = form.querySelector('input[name="rl-source"]:checked')?.value || 'ai';
    const m = form.querySelector('input[name="rl-mode"]:checked')?.value || 'preview';
    if (src === 'paste') {
      submitBtn.textContent = m === 'live' ? '\u{1F680} Paste & Publish Realtor Content' : '\u{1F441} Preview Paste Content';
    } else {
      submitBtn.textContent = m === 'live' ? '\u{1F680} Generate & Send Realtor Content' : '\u{1F441} Preview Realtor Content';
    }
  }

  // Mode toggle handling (Preview / Live)
  const modeOptions = form.querySelectorAll('.dash-mode-option[data-mode]');
  modeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      modeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      opt.querySelector('input[type="radio"]').checked = true;
      updateRlButtonText();
    });
  });

  // Source toggle handling (AI Generate / Paste & Publish)
  const sourceOptions = form.querySelectorAll('.dash-mode-option[data-source]');
  sourceOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      sourceOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      opt.querySelector('input[type="radio"]').checked = true;

      const source = opt.dataset.source;
      document.getElementById('rl-ai-fields').classList.toggle('hidden', source === 'paste');
      document.getElementById('rl-paste-fields').classList.toggle('hidden', source === 'ai');
      updateRlButtonText();
    });
  });

  // "Looks Good — Go Live" button in preview results
  const goLiveBtn = document.getElementById('rl-preview-go-live-btn');
  if (goLiveBtn) {
    goLiveBtn.addEventListener('click', () => {
      modeOptions.forEach(o => o.classList.remove('active'));
      const liveOpt = form.querySelector('.dash-mode-option[data-mode="live"]');
      if (liveOpt) {
        liveOpt.classList.add('active');
        liveOpt.querySelector('input[type="radio"]').checked = true;
      }
      updateRlButtonText();

      resultEl.classList.add('hidden');
      submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => submitBtn.click(), 400);
    });
  }

  // "Edit & Regenerate" button
  const editBtn = document.getElementById('rl-preview-edit-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      resultEl.classList.add('hidden');
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      errorEl.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const modeRadio = form.querySelector('input[name="rl-mode"]:checked');
    const mode = modeRadio ? modeRadio.value : 'preview';

    // Determine source mode
    const source = form.querySelector('input[name="rl-source"]:checked')?.value || 'ai';
    const isPaste = source === 'paste';

    // Get schedule time (both modes)
    const scheduleRaw = form.querySelector('#rl-schedule').value;
    const scheduleTime = scheduleRaw ? new Date(scheduleRaw).toISOString() : null;

    // Validate based on source
    if (isPaste) {
      const title = form.querySelector('#rl-paste-title').value.trim();
      const emailHtml = form.querySelector('#rl-paste-email').value.trim();
      const webContent = form.querySelector('#rl-paste-web').value.trim();
      if (!title) { form.querySelector('#rl-paste-title').focus(); return; }
      if (!emailHtml) { form.querySelector('#rl-paste-email').focus(); return; }
      if (!webContent) { form.querySelector('#rl-paste-web').focus(); return; }
    } else {
      const topic = form.querySelector('#rl-topic').value.trim();
      if (!topic) { form.querySelector('#rl-topic').focus(); return; }
    }

    // Confirm if live mode
    if (mode === 'live') {
      let msg;
      if (scheduleTime) {
        const when = new Date(scheduleRaw).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
        msg = 'This will publish the article NOW and SCHEDULE the email to your Realtor list for ' + when + '. Continue?';
      } else {
        msg = 'This will publish an article and send an email to your Realtor list. Continue?';
      }
      if (!confirm(msg)) return;
    }

    // Gather form data
    let formData;
    if (isPaste) {
      formData = {
        source: 'paste',
        title: form.querySelector('#rl-paste-title').value.trim(),
        description: form.querySelector('#rl-paste-description').value.trim(),
        category: form.querySelector('#rl-paste-category').value,
        subject: form.querySelector('#rl-paste-subject').value.trim(),
        preheader: form.querySelector('#rl-paste-preheader').value.trim(),
        photo: form.querySelector('#rl-paste-photo').value.trim(),
        emailHtml: form.querySelector('#rl-paste-email').value.trim(),
        webContent: form.querySelector('#rl-paste-web').value.trim(),
        mode,
        scheduleTime,
      };
    } else {
      formData = {
        topic: form.querySelector('#rl-topic').value.trim(),
        category: form.querySelector('#rl-category').value,
        articles: form.querySelector('#rl-articles').value.trim(),
        story: form.querySelector('#rl-story').value.trim(),
        aiTool: form.querySelector('#rl-ai-tool').value.trim(),
        notes: form.querySelector('#rl-notes').value.trim(),
        mode,
        scheduleTime,
      };
    }

    // Reset UI
    progressEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    progressEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (isPaste) {
      setProgressStep('publish', 'realtor-progress');
      setStatus('Publishing pasted content...', 'realtor-status');
    } else {
      setProgressStep('generate', 'realtor-progress');
      setStatus('Generating realtor content with AI... this takes about 30 seconds.', 'realtor-status');
    }

    try {
      const response = await fetch('/.netlify/functions/generate-realtor-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('The server took too long to respond. Please try again — it usually works on the second attempt.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      if (data.mode === 'preview') {
        // PREVIEW MODE
        setProgressStep('done', 'realtor-progress');
        setStatus('Preview ready!', 'realtor-status');

        await sleep(300);
        progressEl.classList.add('hidden');
        resultEl.classList.remove('hidden');

        document.getElementById('rl-result-card-live').classList.add('hidden');
        const previewCard = document.getElementById('rl-result-card-preview');
        previewCard.classList.remove('hidden');

        const p = data.preview;
        setText('rl-preview-page-title', p.pageTitle || formData.topic || formData.title);
        setText('rl-preview-category', p.category || formData.category || '');
        setText('rl-preview-page-url', data.pageUrl);

        // Web content
        const webEl = document.getElementById('rl-preview-web-content');
        if (webEl && p.webContent) webEl.innerHTML = p.webContent;

        // Realtor email
        const emailSection = document.getElementById('rl-preview-email-section');
        if (p.realtorEmailHtml) {
          emailSection.classList.remove('hidden');
          setText('rl-preview-email-subject', p.realtorSubject || '');
          setText('rl-preview-email-preheader', p.realtorPreheader || '');
          const eEl = document.getElementById('rl-preview-email-html');
          if (eEl) eEl.innerHTML = p.realtorEmailHtml;
        } else {
          emailSection.classList.add('hidden');
        }

        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      } else {
        // LIVE MODE
        setProgressStep('publish', 'realtor-progress');
        setStatus('Article published at ' + data.pageUrl, 'realtor-status');

        await sleep(500);

        if (data.campaigns && data.campaigns.length > 0) {
          setProgressStep('send', 'realtor-progress');
          const isScheduled = data.campaigns.some(c => c.status === 'scheduled');
          if (isScheduled) {
            const when = new Date(data.campaigns[0].scheduledFor).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
            setStatus('Email scheduled for ' + when, 'realtor-status');
          } else {
            setStatus('Email sent to your Realtor list.', 'realtor-status');
          }
          await sleep(500);
        }

        setProgressStep('done', 'realtor-progress');
        setStatus('All done!', 'realtor-status');

        await sleep(300);
        progressEl.classList.add('hidden');
        resultEl.classList.remove('hidden');

        document.getElementById('rl-result-card-live').classList.remove('hidden');
        document.getElementById('rl-result-card-preview').classList.add('hidden');

        const pageUrlEl = document.getElementById('rl-result-page-url');
        pageUrlEl.href = data.pageUrl;
        pageUrlEl.textContent = data.pageUrl;

        const campaignsEl = document.getElementById('rl-result-campaigns');
        campaignsEl.innerHTML = '';
        if (data.campaigns && data.campaigns.length > 0) {
          data.campaigns.forEach(c => {
            const el = document.createElement('p');
            const statusBadge = c.status === 'scheduled'
              ? '<span style="color: #d4a017;">(Scheduled for ' + new Date(c.scheduledFor).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ')</span>'
              : '<span style="color: var(--color-success);">(Sent)</span>';
            el.innerHTML = '<strong>Realtor Email:</strong> ' +
              escapeHtml(c.subject) + ' ' + statusBadge;
            campaignsEl.appendChild(el);
          });
        }

        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

    } catch (err) {
      console.error('Realtor content automation error:', err);
      progressEl.classList.add('hidden');
      errorEl.classList.remove('hidden');
      document.getElementById('realtor-error-msg').textContent = err.message;
      errorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

// ========================================================================
// HELPERS
// ========================================================================

function buildRateString(prefix) {
  const products = [
    { rate: prefix + '-conv30-rate', apr: prefix + '-conv30-apr', label: '30-Yr Fixed (Primary)' },
    { rate: prefix + '-conv15-rate', apr: prefix + '-conv15-apr', label: '15-Yr Fixed' },
    { rate: prefix + '-jumbo-rate',  apr: prefix + '-jumbo-apr',  label: '30-Yr Jumbo' },
    { rate: prefix + '-va-rate',     apr: prefix + '-va-apr',     label: 'VA 30-Yr' },
    { rate: prefix + '-fha30-rate',  apr: prefix + '-fha30-apr',  label: 'FHA 30-Yr' },
    { rate: prefix + '-fha-arm-rate',apr: prefix + '-fha-arm-apr',label: 'FHA 5-Yr ARM' }
  ];

  const lines = [];
  products.forEach(p => {
    const rateEl = document.getElementById(p.rate);
    const aprEl = document.getElementById(p.apr);
    const rate = rateEl ? rateEl.value.trim() : '';
    const apr = aprEl ? aprEl.value.trim() : '';

    if (rate) {
      let line = '  ' + p.label + ': ' + rate;
      if (apr) line += ' | APR: ' + apr;
      lines.push(line);
    }
  });

  return lines.join('\n');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ========================================================================
// COPY TO CLIPBOARD
// ========================================================================

function initCopyButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.dash-copy-btn');
    if (!btn) return;

    const targetId = btn.dataset.target;
    const target = document.getElementById(targetId);
    if (!target) return;

    const text = target.textContent;

    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      const range = document.createRange();
      range.selectNodeContents(target);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });
  });
}

// ========================================================================
// FORM PERSISTENCE — auto-save/restore form data via sessionStorage
// ========================================================================

function initFormPersistence() {
  // Newsletter form persistence
  persistForm({
    storageKey: 'nl-form-data',
    formId: 'newsletter-builder',
    textFields: [
      'nl-topic', 'nl-articles', 'nl-story', 'nl-photo', 'nl-ai-tool', 'nl-notes',
      'nl-conv30-rate', 'nl-conv30-apr', 'nl-conv15-rate', 'nl-conv15-apr',
      'nl-jumbo-rate', 'nl-jumbo-apr', 'nl-va-rate', 'nl-va-apr',
      'nl-fha30-rate', 'nl-fha30-apr', 'nl-fha-arm-rate', 'nl-fha-arm-apr',
      'nl-paste-title', 'nl-paste-description', 'nl-paste-subject', 'nl-paste-preheader',
      'nl-paste-photo', 'nl-paste-email', 'nl-paste-web', 'nl-schedule'
    ],
    checkboxName: 'audience',
    checkboxKey: 'audiences',
    radioFields: [{ name: 'nl-source', key: 'nlSource' }],
  });

  // Rate form persistence
  persistForm({
    storageKey: 'rt-form-data',
    formId: 'rate-builder',
    textFields: [
      'rt-conv30-rate', 'rt-conv30-apr', 'rt-conv15-rate', 'rt-conv15-apr',
      'rt-jumbo-rate', 'rt-jumbo-apr', 'rt-va-rate', 'rt-va-apr',
      'rt-fha30-rate', 'rt-fha30-apr', 'rt-fha-arm-rate', 'rt-fha-arm-apr',
      'rt-blurb', 'rt-notes'
    ],
    selectFields: ['rt-direction'],
    checkboxName: 'rt-audience',
    checkboxKey: 'rtAudiences',
  });

  // Realtor content form persistence
  persistForm({
    storageKey: 'rl-form-data',
    formId: 'realtor-builder',
    textFields: [
      'rl-topic', 'rl-articles', 'rl-story', 'rl-ai-tool', 'rl-notes',
      'rl-paste-title', 'rl-paste-description', 'rl-paste-subject', 'rl-paste-preheader',
      'rl-paste-photo', 'rl-paste-email', 'rl-paste-web', 'rl-schedule'
    ],
    selectFields: ['rl-category', 'rl-paste-category'],
    radioFields: [{ name: 'rl-source', key: 'rlSource' }],
  });
}

function persistForm({ storageKey, formId, textFields, selectFields, checkboxName, checkboxKey, radioFields }) {
  const form = document.getElementById(formId);
  if (!form) return;

  // Restore saved data on page load
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (saved) {
      textFields.forEach(id => {
        const el = document.getElementById(id);
        if (el && saved[id] !== undefined && saved[id] !== '') {
          el.value = saved[id];
        }
      });

      if (selectFields) {
        selectFields.forEach(id => {
          const el = document.getElementById(id);
          if (el && saved[id] !== undefined) {
            el.value = saved[id];
          }
        });
      }

      if (saved[checkboxKey]) {
        document.querySelectorAll('input[name="' + checkboxName + '"]').forEach(cb => {
          cb.checked = saved[checkboxKey].includes(cb.value);
        });
      }

      // Restore radio button groups and trigger UI update
      if (radioFields) {
        radioFields.forEach(({ name, key }) => {
          if (saved[key]) {
            const radio = form.querySelector('input[name="' + name + '"][value="' + saved[key] + '"]');
            if (radio) {
              radio.checked = true;
              // Click the parent .dash-mode-option to trigger toggle UI (show/hide fields)
              const parentOption = radio.closest('.dash-mode-option');
              if (parentOption) parentOption.click();
            }
          }
        });
      }
    }
  } catch (e) { /* ignore parse errors */ }

  // Save on every input change
  function saveForm() {
    const data = {};
    textFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) data[id] = el.value;
    });

    if (selectFields) {
      selectFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) data[id] = el.value;
      });
    }

    if (checkboxName && checkboxKey) {
      data[checkboxKey] = [];
      document.querySelectorAll('input[name="' + checkboxName + '"]:checked').forEach(cb => {
        data[checkboxKey].push(cb.value);
      });
    }

    // Save radio button groups
    if (radioFields) {
      radioFields.forEach(({ name, key }) => {
        const checked = form.querySelector('input[name="' + name + '"]:checked');
        if (checked) data[key] = checked.value;
      });
    }

    try {
      sessionStorage.setItem(storageKey, JSON.stringify(data));
    } catch (e) { /* storage full or unavailable */ }
  }

  form.addEventListener('input', saveForm);
  form.addEventListener('change', saveForm);
}
