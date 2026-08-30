const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const MY1003 = 'https://hypersmart.my1003app.com/513013/register?time=1779291829279';

function listHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (['.git', '_deliverables', 'node_modules'].includes(entry.name)) return [];
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? listHtmlFiles(file) : file.endsWith('.html') ? [file] : [];
  });
}

function visibleLabel(markup) {
  return markup
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:rarr|#8594);/gi, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const scenarioLabel = /^(?:send|share)\s+(?:(?:your|my|a)\s+)?(?:mortgage\s+)?scenario(?:\s+(?:instead|here|now))?(?:\s*[→›])?$/i;
const preapprovalLabel = /^(?:get|start|begin)(?:\s+(?:your|my|a|the))?(?:\s+[\w-]+){0,3}\s+pre-approv(?:al|ed)(?:\s+(?:now|today|here|fast|online))?(?:\s*[—–-].*)?(?:\s*[→›])?$/i;
const applicationLabel = /^(?:start|begin)(?:\s+(?:your|my|a|the))?(?:\s+(?:secure|full|loan|online)){0,3}\s+application(?:\s+(?:now|today|here|online))?(?:\s*[→›])?$/i;
const scenarioPage = /^(?:\.?\.?)?\/?scenario\.html(?:[?#].*)?$/;

test('public conversion CTA labels route to the matching destination', () => {
  const failures = [];

  listHtmlFiles('.').forEach((file) => {
    // The proven pre-approval form is intentionally frozen; its in-page fallback
    // remains outside this routing-only change.
    if (file === 'get-preapproved.html') return;

    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
      const href = match[1].match(/href=["']([^"']+)["']/i)?.[1] || '';
      const label = visibleLabel(match[2]);
      const line = html.slice(0, match.index).split('\n').length;

      if (scenarioLabel.test(label) && (scenarioPage.test(href) || href === '#contact-form')) {
        failures.push(`${file}:${line} scenario CTA routes to ${href}`);
      }
      if (preapprovalLabel.test(label) && (scenarioPage.test(href) || href.startsWith('https://hypersmart.my1003app.com/'))) {
        failures.push(`${file}:${line} pre-approval CTA routes to ${href}`);
      }
      if (applicationLabel.test(label) && scenarioPage.test(href)) {
        failures.push(`${file}:${line} application CTA routes to ${href} instead of ${MY1003}`);
      }
    }
  });

  assert.deepEqual(failures, []);
});

