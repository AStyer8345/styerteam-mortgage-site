// Calculators page: each card opens its calculator in a panel below the cards.
// The calculators are still their own pages. When one is shown inside the
// panel it hides its own header and footer and reports its height.
(function () {
  if (window.self !== window.top) {
    // Inside the panel.
    var style = document.createElement('style');
    style.textContent = 'body>header,body>footer,.site-footer,.blueprint-breadcrumb,.sticky-mobile-cta,.mobile-sticky-bar,[class*="sticky-cta"],[id*="assistant"],[class*="assistant-launcher"]{display:none!important}body{padding:0!important;margin:0!important}';
    document.head.appendChild(style);
    var base = document.createElement('base');
    base.target = '_top';
    document.head.appendChild(base);
    var report = function () {
      window.parent.postMessage({ calcHubHeight: document.documentElement.scrollHeight }, window.location.origin);
    };
    window.addEventListener('load', report);
    if (window.ResizeObserver) new ResizeObserver(report).observe(document.body);
    return;
  }

  var grid = document.querySelector('[data-calc-hub]');
  var panel = document.getElementById('calc-panel');
  if (!grid || !panel) return;
  var frame = panel.querySelector('iframe');
  var fullLink = panel.querySelector('[data-calc-full]');
  var cards = grid.querySelectorAll('a[data-calc]');

  function open(card, scroll) {
    cards.forEach(function (c) { c.setAttribute('aria-pressed', c === card ? 'true' : 'false'); });
    var href = card.getAttribute('href');
    frame.title = card.getAttribute('data-calc');
    if (frame.getAttribute('src') !== href) frame.setAttribute('src', href);
    fullLink.setAttribute('href', href);
    panel.hidden = false;
    if (scroll) panel.scrollIntoView({ block: 'start' });
  }

  cards.forEach(function (card) {
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');
    card.addEventListener('click', function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      open(card, true);
    });
  });

  window.addEventListener('message', function (event) {
    if (event.origin !== window.location.origin || !event.data || !event.data.calcHubHeight) return;
    frame.style.height = Math.max(400, event.data.calcHubHeight) + 'px';
  });

  open(cards[0], false);
})();
