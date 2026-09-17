(function () {
  'use strict';

  // Preserve every authored qualification, example and link. Native details
  // elements control optional depth; word counts never control visibility.

  function cardifyHeadingGroups(container) {
    var children = Array.from(container.children);
    var headings = children.filter(function (child) { return child.tagName === 'H3'; });
    if (headings.length < 3 || headings.length > 8) return;

    var grid = document.createElement('div');
    grid.className = 'program-option-grid';
    container.insertBefore(grid, headings[0]);

    headings.forEach(function (heading) {
      var card = document.createElement('article');
      card.className = 'program-option-card';
      grid.appendChild(card);
      var sibling = heading.nextElementSibling;
      card.appendChild(heading);
      while (sibling && sibling.tagName !== 'H3' && sibling.tagName !== 'H2') {
        var next = sibling.nextElementSibling;
        card.appendChild(sibling);
        sibling = next;
      }

    });
  }

  function enhanceTables(section) {
    section.querySelectorAll('table').forEach(function (table) {
      if (table.closest('.program-table-scroll, .experience-table-scroll, .ci-table-wrap')) return;
      // Wrap only the table, not its surrounding answers and headings.
      var wrapper = document.createElement('div');
      wrapper.className = 'program-table-scroll';
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('aria-label', table.caption ? table.caption.textContent : 'Mortgage program comparison');
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function init() {
    if (!document.body.classList.contains('program-page-modern')) return;
    document.querySelectorAll('main section:not(.hero):not(.journey-hero)').forEach(function (section) {
      enhanceTables(section);
      // Authored guides already choose their cards and optional details.
      if (document.body.hasAttribute('data-complex-income')) return;
      var container = section.querySelector(':scope > .container');
      if (!container || section.classList.contains('cta-spotlight')) return;
      section.classList.add('program-content-section');
      cardifyHeadingGroups(container);
      var list = Array.from(container.children).find(function (child) { return child.tagName === 'UL' && child.children.length >= 4; });
      if (list) list.classList.add('program-list-grid');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
