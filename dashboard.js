/* ==========================================================================
   Dashboard - Prompt Builder for Newsletter & Rate Update
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDashTabs();
  initNewsletterBuilder();
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
// NEWSLETTER PROMPT BUILDER
// ========================================================================

function initNewsletterBuilder() {
  const form = document.getElementById('newsletter-builder');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather values
    const topic = form.querySelector('#nl-topic').value.trim();
    if (!topic) {
      form.querySelector('#nl-topic').focus();
      return;
    }

    const audiences = [];
    form.querySelectorAll('input[name="audience"]:checked').forEach(cb => {
      audiences.push(cb.value === 'borrower' ? 'Borrowers / Past Clients' : 'Realtors / Partners');
    });

    const rates = buildRateString('nl');
    const articles = form.querySelector('#nl-articles').value.trim();
    const story = form.querySelector('#nl-story').value.trim();
    const photo = form.querySelector('#nl-photo').value.trim();
    const aiTool = form.querySelector('#nl-ai-tool').value.trim();
    const notes = form.querySelector('#nl-notes').value.trim();

    // Build the prompt
    let prompt = `/weekly-newsletter\n\n`;
    prompt += `Topic: ${topic}\n\n`;

    if (audiences.length) {
      prompt += `Audience: ${audiences.join(' + ')}\n\n`;
    }

    if (rates) {
      prompt += `Current Rates:\n${rates}\n\n`;
    }

    if (articles) {
      prompt += `Articles / References:\n${articles}\n\n`;
    }

    if (story) {
      prompt += `Personal Story / Anecdote:\n${story}\n\n`;
    }

    if (photo) {
      prompt += `Photo URL for personal note section: ${photo}\n\n`;
    }

    if (aiTool) {
      prompt += `AI Tool Tip for Realtor Version:\n${aiTool}\n\n`;
    }

    if (notes) {
      prompt += `Additional Notes:\n${notes}\n\n`;
    }

    prompt += `Generate both the borrower and realtor newsletter versions. Push to Jungo when done.`;

    // Show output
    const output = document.getElementById('newsletter-output');
    const promptBox = document.getElementById('newsletter-prompt-text');
    promptBox.textContent = prompt;
    output.classList.remove('hidden');
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ========================================================================
// RATE UPDATE TEXT PROMPT BUILDER
// ========================================================================

function initRateBuilder() {
  const form = document.getElementById('rate-builder');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check at least the primary rate is filled
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

    // Build the prompt
    let prompt = `Write a weekly rate update text message blast for Adam Styer (NMLS #513013, Mortgage Solutions, Austin TX).\n\n`;

    prompt += `Current Rates:\n${rates}\n\n`;

    if (direction) {
      const dirLabels = {
        'down': 'Rates dropped this week',
        'up': 'Rates went up this week',
        'flat': 'Rates are flat / unchanged',
        'volatile': 'Rates have been volatile / mixed'
      };
      prompt += `Direction: ${dirLabels[direction] || direction}\n\n`;
    }

    if (audiences.length) {
      prompt += `Audience: ${audiences.join(' + ')}\n\n`;
    }

    if (blurb) {
      prompt += `Talking Points / Blurb Ideas:\n${blurb}\n\n`;
    }

    if (notes) {
      prompt += `Additional Notes:\n${notes}\n\n`;
    }

    prompt += `Guidelines:\n`;
    prompt += `- Keep each text under 300 characters (SMS-friendly)\n`;
    prompt += `- Sound like Adam: direct, warm, confident, not salesy\n`;
    prompt += `- Include the key rate(s) in the message\n`;
    prompt += `- End with a soft CTA (call, text back, link to apply)\n`;
    prompt += `- Adam's phone: (512) 956-6010\n`;
    if (audiences.length > 1) {
      prompt += `- Generate separate versions for borrowers and realtors\n`;
      prompt += `- Borrower version: educational, what it means for them\n`;
      prompt += `- Realtor version: peer-to-peer, how to use this with clients\n`;
    }

    // Show output
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

/**
 * Build a formatted rate string from the rate table inputs.
 * prefix: 'nl' for newsletter, 'rt' for rate update
 */
function buildRateString(prefix) {
  const products = [
    { rate: `${prefix}-conv30-rate`, apr: `${prefix}-conv30-apr`, label: '30-Yr Fixed (Primary)' },
    { rate: `${prefix}-conv15-rate`, apr: `${prefix}-conv15-apr`, label: '15-Yr Fixed' },
    { rate: `${prefix}-jumbo-rate`,  apr: `${prefix}-jumbo-apr`,  label: '30-Yr Jumbo' },
    { rate: `${prefix}-va-rate`,     apr: `${prefix}-va-apr`,     label: 'VA 30-Yr' },
    { rate: `${prefix}-fha30-rate`,  apr: `${prefix}-fha30-apr`,  label: 'FHA 30-Yr' },
    { rate: `${prefix}-fha-arm-rate`,apr: `${prefix}-fha-arm-apr`,label: 'FHA 5-Yr ARM' }
  ];

  const lines = [];
  products.forEach(p => {
    const rateEl = document.getElementById(p.rate);
    const aprEl = document.getElementById(p.apr);
    const rate = rateEl ? rateEl.value.trim() : '';
    const apr = aprEl ? aprEl.value.trim() : '';

    if (rate) {
      let line = `  ${p.label}: ${rate}`;
      if (apr) line += ` | APR: ${apr}`;
      lines.push(line);
    }
  });

  return lines.join('\n');
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
      // Fallback: select the text
      const range = document.createRange();
      range.selectNodeContents(target);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });
  });
}
