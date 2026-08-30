(function () {
  'use strict';

  function makeToggle(label, expandedLabel, targets, className) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = className || 'program-disclosure-toggle';
    button.textContent = label;
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      targets.forEach(function (target) { target.hidden = expanded; });
      button.setAttribute('aria-expanded', String(!expanded));
      button.textContent = expanded ? label : expandedLabel;
    });
    return button;
  }

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
      compactCard(card);
    });
  }

  function compactCard(card) {
    var paragraphs = Array.from(card.querySelectorAll(':scope > p'));
    var text = paragraphs.map(function (paragraph) { return paragraph.textContent.trim(); }).join(' ');
    var words = text.split(/\s+/);
    if (words.length <= 24) return;

    var details = document.createElement('div');
    details.className = 'program-card-details';
    details.hidden = true;
    paragraphs.forEach(function (paragraph) { details.appendChild(paragraph); });

    var summary = document.createElement('p');
    summary.className = 'program-card-summary';
    summary.textContent = words.slice(0, 22).join(' ') + (words.length > 22 ? '…' : '');
    card.appendChild(summary);
    card.appendChild(details);

    var links = Array.from(details.querySelectorAll('a')).slice(-2);
    if (links.length) {
      var actions = document.createElement('div');
      actions.className = 'program-card-actions';
      links.forEach(function (link) { actions.appendChild(link.cloneNode(true)); });
      card.appendChild(actions);
    }

    card.appendChild(makeToggle('Details', 'Hide details', [details], 'program-card-toggle'));
  }

  function enhanceList(container, headingText) {
    var list = Array.from(container.children).find(function (child) {
      return child.tagName === 'UL' && child.children.length >= 4;
    });
    if (!list) return;
    list.classList.add('program-list-grid');

    if (list.children.length > 6) {
      var hiddenItems = Array.from(list.children).slice(6);
      hiddenItems.forEach(function (item) { item.hidden = true; });
      var related = /related/i.test(headingText);
      container.appendChild(makeToggle(related ? 'View all related guides' : 'View all items', related ? 'Show fewer guides' : 'Show fewer items', hiddenItems));
    }
  }

  function enhanceFaq(section) {
    var items = Array.from(section.querySelectorAll('.accordion-item'));
    if (items.length <= 5) return;
    var hiddenItems = items.slice(5);
    hiddenItems.forEach(function (item) { item.hidden = true; });
    var accordion = section.querySelector('.accordion');
    accordion.insertAdjacentElement('afterend', makeToggle('View all FAQs', 'Show fewer FAQs', hiddenItems));
  }

  function limitExistingGrids(container) {
    container.querySelectorAll(':scope > .grid').forEach(function (grid) {
      var items = Array.from(grid.children);
      if (items.length <= 6) return;
      var hiddenItems = items.slice(6);
      hiddenItems.forEach(function (item) { item.hidden = true; });
      grid.insertAdjacentElement('afterend', makeToggle('View all options', 'Show fewer options', hiddenItems));
    });
  }

  function collapseLongSection(container) {
    if (container.closest('.program-always-visible')) return;
    if (container.querySelector('.accordion, .program-option-grid, .program-list-grid')) return;
    var words = container.textContent.trim().split(/\s+/).length;
    if (words < 220) return;
    var children = Array.from(container.children);
    var headingIndex = children.findIndex(function (child) { return child.tagName === 'H2'; });
    if (headingIndex < 0) return;
    var keepThrough = headingIndex + 1;
    if (children[keepThrough] && children[keepThrough].tagName === 'P') keepThrough += 1;
    var remainder = children.slice(keepThrough);
    if (!remainder.length) return;

    var details = document.createElement('div');
    details.className = 'program-section-details';
    details.hidden = true;
    remainder.forEach(function (child) { details.appendChild(child); });
    container.appendChild(details);
    container.appendChild(makeToggle('Continue', 'Show less', [details]));
  }

  function enhanceTables(section) {
    section.querySelectorAll('table').forEach(function (table) {
      var parent = table.parentElement;
      if (parent.classList.contains('program-table-scroll')) return;
      parent.classList.add('program-table-scroll');
      parent.setAttribute('role', 'region');
      parent.setAttribute('tabindex', '0');
      parent.setAttribute('aria-label', 'Mortgage program comparison');
    });
  }

  function init() {
    if (!document.body.classList.contains('program-page-modern')) return;
    document.querySelectorAll('main section:not(.hero)').forEach(function (section) {
      var container = section.querySelector(':scope > .container');
      if (!container || section.classList.contains('cta-spotlight')) return;
      section.classList.add('program-content-section');
      var heading = container.querySelector(':scope > h2');
      var headingText = heading ? heading.textContent : '';
      cardifyHeadingGroups(container);
      enhanceList(container, headingText);
      limitExistingGrids(container);
      enhanceTables(section);
      if (section.id === 'faq' || /FAQ/i.test(headingText)) enhanceFaq(section);
      collapseLongSection(container);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
