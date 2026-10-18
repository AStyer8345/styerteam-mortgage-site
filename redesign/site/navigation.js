/* Shared progressive navigation. Independent of .mobile-menu / #nav in interaction.js.
   Native details and all links remain available when this script does not run. */
(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const drawer = header?.querySelector('#site-nav-drawer');
  const toggle = header?.querySelector('.nav-toggle');
  if (!header || !drawer || !toggle || header.dataset.navigationReady === 'true') return;
  header.dataset.navigationReady = 'true';
  const groups = [...drawer.querySelectorAll('.sm-nav-group')];
  const desktop = window.matchMedia('(min-width: 1101px)');

  const closeGroup = (group, restoreFocus = false) => {
    group.open = false;
    if (restoreFocus) group.querySelector('summary')?.focus();
  };
  const closeGroups = () => groups.forEach(group => closeGroup(group));
  const closeDrawer = (restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    drawer.hidden = !desktop.matches;
    closeGroups();
    if (restoreFocus && !desktop.matches) toggle.focus();
  };
  const openDrawer = () => {
    drawer.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    drawer.querySelector('summary, a')?.focus();
  };
  const measureHeader = () => {
    const height = header.getBoundingClientRect().height;
    header.style.setProperty('--sm-header-height', `${height}px`);
    document.documentElement.style.setProperty('--sm-nav-scroll-offset', `${height + 16}px`);
  };
  const syncViewport = () => {
    const activeInDrawer = drawer.contains(document.activeElement);
    const activeWasToggle = document.activeElement === toggle;
    toggle.hidden = desktop.matches;
    closeDrawer(!desktop.matches && activeInDrawer);
    if (desktop.matches && activeWasToggle) drawer.querySelector('summary, a')?.focus();
    measureHeader();
  };

  header.classList.add('nav-enhanced');
  syncViewport();
  desktop.addEventListener('change', syncViewport);
  if ('ResizeObserver' in window) {
    new ResizeObserver(measureHeader).observe(header);
  }
  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') closeDrawer(true);
    else openDrawer();
  });
  for (const group of groups) {
    group.addEventListener('toggle', () => {
      if (group.open) groups.filter(other => other !== group).forEach(other => closeGroup(other));
    });
  }
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const group = event.target.closest('.sm-nav-group[open]');
    if (group) {
      event.preventDefault();
      closeGroup(group, true);
    } else if (!desktop.matches && toggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      closeDrawer(true);
    }
  });
  document.addEventListener('pointerdown', event => {
    if (header.contains(event.target)) {
      groups.filter(group => !group.contains(event.target)).forEach(group => closeGroup(group));
    } else closeDrawer();
  });
  document.addEventListener('focusin', event => {
    groups.filter(group => !group.contains(event.target)).forEach(group => closeGroup(group));
    if (!header.contains(event.target)) closeDrawer();
  });
  drawer.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // A mobile contact link can leave the document in place; return focus to the control.
    closeDrawer(!desktop.matches);
  });

  const canonicalPath = path => {
    let result = path.replace(/\/index\.html$/, '/');
    if (result === '/apply.html') result = '/apply-now/';
    return result === '/' ? result : result.replace(/\/$/, '');
  };
  const currentPath = canonicalPath(window.location.pathname);
  let activeGroup = header.dataset.activeNav || document.body.dataset.activeNav;
  for (const link of header.querySelectorAll('a[href^="/"]')) {
    const target = new URL(link.getAttribute('href'), window.location.href);
    if (canonicalPath(target.pathname) !== currentPath) continue;
    link.setAttribute('aria-current', 'page');
    activeGroup ||= link.closest('[data-nav-section]')?.dataset.navSection;
  }
  groups.forEach(group => group.classList.toggle('is-current', group.dataset.navSection === activeGroup));
})();
