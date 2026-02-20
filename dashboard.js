/* ==========================================================================
   Dashboard - Newsletter Automation + Rate Update Prompt Builder
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDashTabs();
  initNewsletterAutomation();
  initRateBuilder();
  initCopyButtons();
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

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      errorEl.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate topic
    const topic = form.querySelector('#nl-topic').value.trim();
    if (!topic) {
      form.querySelector('#nl-topic').focus();
      return;
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

    // Gather form data
    const formData = {
      topic,
      audiences,
      rates: buildRateString('nl'),
      articles: form.querySelector('#nl-articles').value.trim(),
      story: form.querySelector('#nl-story').value.trim(),
      photo: form.querySelector('#nl-photo').value.trim(),
      aiTool: form.querySelector('#nl-ai-tool').value.trim(),
      notes: form.querySelector('#nl-notes').value.trim(),
    };

    // Reset UI
    progressEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Scroll to progress
    progressEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Set initial step
    setProgressStep('generate');
    setStatus('Generating content with AI... this takes about 30 seconds.');

    try {
      const response = await fetch('/.netlify/functions/generate-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      // Show completion steps
      setProgressStep('publish');
      setStatus('Page published at ' + data.pageUrl);

      await sleep(500);

      if (data.campaigns && data.campaigns.length > 0) {
        setProgressStep('send');
        setStatus('Emails sent to ' + data.campaigns.map(c => c.audience).join(' and ') + '.');
        await sleep(500);
      }

      setProgressStep('done');
      setStatus('All done!');

      // Show results
      await sleep(300);
      progressEl.classList.add('hidden');
      resultEl.classList.remove('hidden');

      const pageUrlEl = document.getElementById('result-page-url');
      pageUrlEl.href = data.pageUrl;
      pageUrlEl.textContent = data.pageUrl;

      const campaignsEl = document.getElementById('result-campaigns');
      campaignsEl.innerHTML = '';
      if (data.campaigns && data.campaigns.length > 0) {
        data.campaigns.forEach(c => {
          const p = document.createElement('p');
          p.innerHTML = '<strong>' + capitalize(c.audience) + ' Email:</strong> ' +
            escapeHtml(c.subject) + ' <span style="color: var(--color-success);">(Sent)</span>';
          campaignsEl.appendChild(p);
        });
      }

      resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

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

// Progress step helper
function setProgressStep(activeStep) {
  const steps = document.querySelectorAll('.dash-progress-step');
  const order = ['generate', 'publish', 'send', 'done'];
  const activeIndex = order.indexOf(activeStep);

  steps.forEach((step, i) => {
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

function setStatus(msg) {
  const el = document.getElementById('newsletter-status');
  if (el) el.textContent = msg;
}

// ========================================================================
// RATE UPDATE TEXT PROMPT BUILDER (stays as copy-paste)
// ========================================================================

function initRateBuilder() {
  const form = document.getElementById('rate-builder');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const primaryRate = form.querySelector('#rt-conv30-rate').value.trim();
    if (!primaryRate) {
      form.querySelector('#rt-conv30-rate').focus();
      return;
    }

    const rates = buildRateString('rt');
    const direction = form.querySelector('#rt-direction').value;
    const blurb = form.querySelector('#rt-blurb').value.trim();
    const notes = form.querySelector('#rt-notes').value.trim();

    const audiences = [];
    form.querySelectorAll('input[name="rt-audience"]:checked').forEach(cb => {
      audiences.push(cb.value === 'borrower' ? 'Borrowers / Past Clients' : 'Realtors / Partners');
    });

    let prompt = 'Write a weekly rate update text message blast for Adam Styer (NMLS #513013, Mortgage Solutions, Austin TX).\n\n';
    prompt += 'Current Rates:\n' + rates + '\n\n';

    if (direction) {
      const dirLabels = {
        'down': 'Rates dropped this week',
        'up': 'Rates went up this week',
        'flat': 'Rates are flat / unchanged',
        'volatile': 'Rates have been volatile / mixed'
      };
      prompt += 'Direction: ' + (dirLabels[direction] || direction) + '\n\n';
    }

    if (audiences.length) {
      prompt += 'Audience: ' + audiences.join(' + ') + '\n\n';
    }

    if (blurb) {
      prompt += 'Talking Points / Blurb Ideas:\n' + blurb + '\n\n';
    }

    if (notes) {
      prompt += 'Additional Notes:\n' + notes + '\n\n';
    }

    prompt += 'Guidelines:\n';
    prompt += '- Keep each text under 300 characters (SMS-friendly)\n';
    prompt += '- Sound like Adam: direct, warm, confident, not salesy\n';
    prompt += '- Include the key rate(s) in the message\n';
    prompt += '- End with a soft CTA (call, text back, link to apply)\n';
    prompt += "- Adam's phone: (512) 956-6010\n";
    if (audiences.length > 1) {
      prompt += '- Generate separate versions for borrowers and realtors\n';
      prompt += '- Borrower version: educational, what it means for them\n';
      prompt += '- Realtor version: peer-to-peer, how to use this with clients\n';
    }

    const output = document.getElementById('rate-output');
    const promptBox = document.getElementById('rate-prompt-text');
    promptBox.textContent = prompt;
    output.classList.remove('hidden');
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
