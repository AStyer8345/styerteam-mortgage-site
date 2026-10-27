/* Preserve deep links when reference content or a referral form is collapsed. */
(function () {
  function reveal(hash) {
    if (!hash || hash === '#') return;
    var id; try { id = decodeURIComponent(hash.slice(1)); } catch (_) { return; }
    var target = document.getElementById(id); if (!target) return;
    var node = target;
    while (node) { if (node.tagName === 'DETAILS') node.open = true; node = node.parentElement; }
    requestAnimationFrame(function () { target.scrollIntoView({block: 'start', behavior: 'instant'}); });
  }
  document.addEventListener('click', function (event) {
    var a = event.target.closest('a[href]'); if (!a) return;
    var url = new URL(a.href, location.href);
    if (url.origin === location.origin && url.pathname === location.pathname && url.hash) reveal(url.hash);
  });
  window.addEventListener('hashchange', function () { reveal(location.hash); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { reveal(location.hash); });
  else reveal(location.hash);
})();
