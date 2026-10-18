/* Enhance native disclosures and a review marquee; all content works without JS. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('#faq details, .editorial-faq details, details.ci-faq').forEach(details => {
    const summary = details.querySelector(':scope > summary');
    if (!summary || typeof details.animate !== 'function') return;
    let animation;
    summary.addEventListener('click', event => {
      if (reduced.matches || event.target.closest('a')) return;
      event.preventDefault();
      if (animation) return;
      const closing = details.open;
      const start = details.getBoundingClientRect().height;
      if (!closing) details.open = true;
      const end = closing ? summary.getBoundingClientRect().height : details.getBoundingClientRect().height;
      details.style.overflow = 'hidden';
      animation = details.animate([{height: `${start}px`}, {height: `${end}px`}], {duration: 180, easing: 'ease-out'});
      animation.onfinish = () => { if (closing) details.open = false; details.style.overflow = ''; animation = null; };
      animation.oncancel = () => { details.style.overflow = ''; animation = null; };
    });
  });
  const track = document.querySelector('.sm-review-track');
  const pause = document.querySelector('[data-reviews-pause]');
  if (track && pause && !track.hasAttribute('data-review-ready')) {
    const set = document.createElement('div'); set.className = 'sm-review-set';
    while (track.firstChild) set.append(track.firstChild);
    track.append(set);
    const copy = set.cloneNode(true);
    copy.setAttribute('data-review-clone', ''); copy.setAttribute('aria-hidden', 'true'); copy.setAttribute('inert', '');
    copy.querySelectorAll('a,button,[tabindex]').forEach(node => node.setAttribute('tabindex', '-1'));
    track.append(copy); track.setAttribute('data-review-ready', '');
    pause.setAttribute('aria-controls', track.id);
    pause.addEventListener('click', () => {
      const paused = !track.hasAttribute('data-paused');
      track.toggleAttribute('data-paused', paused);
      pause.setAttribute('aria-pressed', String(paused));
      pause.textContent = paused ? 'Play reviews' : 'Pause reviews';
    });
    // Keyboard users see all original cards, without a moving target.
    track.addEventListener('focusin', () => track.setAttribute('data-keyboard-review', ''));
    track.addEventListener('focusout', event => { if (!track.contains(event.relatedTarget)) track.removeAttribute('data-keyboard-review'); });
  }
})();
