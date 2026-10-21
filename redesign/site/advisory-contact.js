// Contact layer shared by every public page.
// 1. On phones, a slim bar pinned to the bottom: Call · Text · Send scenario.
// 2. "See My Options" links open the real scenario form in a slide-over
//    panel instead of leaving the page. The panel embeds /get-preapproved.html
//    (the Netlify form, its JS, attribution and confirmation stay unchanged),
//    so no form markup is duplicated and the link still works without JS.
// 3. When this script runs inside that embed (?embed=1), it trims the page to
//    the form itself.
(function () {
  'use strict';
  var d = document, b = d.body;
  if (!b || !b.classList.contains('advisory-site')) return;
  var params = new URLSearchParams(location.search);
  var FORM_PATH = '/get-preapproved.html';
  var PHONE = '+15129566010';

  // ── Embedded mode ──────────────────────────────────────────────────────────
  if (params.get('embed') === '1') {
    b.classList.add('advisory-embed');
    // Links inside the embed that leave the form open in the parent window.
    d.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || a.target || /^(#|javascript:|mailto:|tel:|sms:)/.test(a.getAttribute('href'))) return;
      a.target = '_top';
    });
    return;
  }

  // Reading measure: paragraphs are capped at 68ch by advisory-design.css.
  // A capped paragraph inside centered copy is re-centered here, since CSS
  // cannot see computed text-align.
  try {
    var main = d.querySelector('main');
    if (main) main.querySelectorAll('p').forEach(function (p) {
      if (getComputedStyle(p).textAlign === 'center') p.classList.add('advisory-centered');
    });
  } catch (e) {}

  // Pages that ARE the form get no bar and no panel.
  var formPages = /^\/(get-preapproved|contact|scenario|prequal|refinance-quote|rate-check[^/]*|rate-alert)\.html$/;
  if (formPages.test(location.pathname)) return;

  // ── Slide-over panel ───────────────────────────────────────────────────────
  var panel = null, frame = null, lastFocus = null, backgroundState = [], closeTimer = null, backgroundObserver = null;
  function buildPanel() {
    panel = d.createElement('div');
    panel.className = 'advisory-panel';
    panel.hidden = true;
    panel.innerHTML =
      '<div class="advisory-panel-backdrop" data-close></div>' +
      '<div class="advisory-panel-sheet" role="dialog" aria-modal="true" aria-label="See my options">' +
        '<div class="advisory-panel-head"><span>See my options</span>' +
        '<button type="button" class="advisory-panel-close" data-close aria-label="Close">&times;</button></div>' +
        '<iframe class="advisory-panel-frame" title="See my options form" loading="lazy"></iframe>' +
        '<p class="advisory-panel-foot">Prefer to talk? <a href="tel:' + PHONE + '">Call</a> or <a href="sms:' + PHONE + '">text</a> (512) 956-6010.</p>' +
      '</div>';
    frame = panel.querySelector('iframe');
    // Escape also works while the visitor is typing in the same-origin embed.
    frame.addEventListener('load', function () {
      try { frame.contentDocument.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !panel.hidden) { e.preventDefault(); closePanel(); }
      }); } catch (_) {}
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var first = panel.querySelector('.advisory-panel-close');
      var links = panel.querySelectorAll('.advisory-panel-foot a');
      var last = links[links.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    panel.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closePanel(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) closePanel(); });
    b.appendChild(panel);
  }
  function isolateBackground(element) {
    if (element === panel || backgroundState.some(function (item) { return item.element === element; })) return;
    backgroundState.push({ element: element, inert: element.inert });
    element.inert = true;
  }
  function openPanel(href) {
    if (!panel) buildPanel();
    var url = new URL(href, location.origin);
    url.searchParams.set('embed', '1');
    if (frame.getAttribute('src') !== url.pathname + url.search) frame.src = url.pathname + url.search;
    clearTimeout(closeTimer);
    lastFocus = d.activeElement;
    if (!backgroundState.length) {
      Array.prototype.forEach.call(b.children, isolateBackground);
      backgroundObserver = new MutationObserver(function () {
        Array.prototype.forEach.call(b.children, isolateBackground);
      });
      backgroundObserver.observe(b, { childList: true });
    }
    panel.hidden = false;
    b.classList.add('advisory-panel-open');
    requestAnimationFrame(function () { panel.classList.add('is-open'); panel.querySelector('.advisory-panel-close').focus(); });
    try { (window.dataLayer = window.dataLayer || []).push({ event: 'scenario_panel_open', page_path: location.pathname }); } catch (_) {}
  }
  function closePanel() {
    panel.classList.remove('is-open');
    b.classList.remove('advisory-panel-open');
    if (backgroundObserver) backgroundObserver.disconnect();
    backgroundState.forEach(function (item) { item.element.inert = item.inert; });
    backgroundState = [];
    closeTimer = setTimeout(function () { panel.hidden = true; }, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  d.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    var url;
    try { url = new URL(a.getAttribute('href'), location.origin); } catch (_) { return; }
    if (url.origin !== location.origin || url.pathname !== FORM_PATH) return;
    if (url.searchParams.get('intent') !== 'scenario' && !a.hasAttribute('data-scenario-panel')) return;
    e.preventDefault();
    openPanel(url.href);
  });

  // ── Mobile contact bar ─────────────────────────────────────────────────────
  var bar = d.createElement('nav');
  bar.className = 'advisory-contact-bar';
  bar.setAttribute('aria-label', 'Contact Adam');
  bar.innerHTML =
    '<a href="tel:' + PHONE + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"/></svg>Call</a>' +
    '<a href="sms:' + PHONE + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>Text</a>' +
    '<a href="' + FORM_PATH + '?intent=scenario" class="advisory-contact-bar-primary" data-scenario-panel>See my options</a>';
  b.appendChild(bar);
  b.classList.add('has-advisory-contact-bar');
})();
