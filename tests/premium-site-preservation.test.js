const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const inventory = JSON.parse(fs.readFileSync('design-review/Page-Inventory.json', 'utf8'));
const pages = inventory.pages.filter(page => page.family !== 'utility' && page.path !== 'index.html');
const baseline = file => execFileSync('git', ['show', `${inventory.releaseBaseline || inventory.baseline}:${file}`], { encoding: 'utf8' });
const blocks = (html, pattern) => [...html.matchAll(pattern)].map(match => match[0]);
const text = html => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

test('interior design rollout preserves metadata, structured data, lead forms and shared navigation', () => {
  assert.ok(pages.length > 150, 'The audit must cover the established public site, not one template');
  for (const { path } of pages) {
    const original = baseline(path), current = fs.readFileSync(path, 'utf8');
    for (const pattern of [
      /<title\b[^>]*>[\s\S]*?<\/title>/g,
      /<meta\b[^>]*>/g,
      /<link\b[^>]*rel="canonical"[^>]*>/g,
      /<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g,
      /<form\b[\s\S]*?<\/form>/g,
      /<header\b[\s\S]*?<\/header>/g,
      /<footer\b[\s\S]*?<\/footer>/g
    ]) assert.deepEqual(blocks(current, pattern), blocks(original, pattern), `${path}: protected contract changed`);
  }
});

test('interior design rollout retains original prose, headings, destinations and capture script references', () => {
  for (const { path } of pages) {
    const original = baseline(path), current = fs.readFileSync(path, 'utf8');
    for (const pattern of [/<p\b[^>]*>[\s\S]*?<\/p>/g, /<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/g]) {
      const retained = new Set(blocks(current, pattern).map(text));
      for (const value of blocks(original, pattern).map(text)) assert.ok(retained.has(value), `${path}: original content missing`);
    }
    const destinations = new Set([...current.matchAll(/\bhref="([^"]+)"/g)].map(match => match[1]));
    for (const match of original.matchAll(/\bhref="([^"]+)"/g)) assert.ok(destinations.has(match[1]), `${path}: original destination missing`);
    const sources = new Set([...current.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match => match[1]));
    for (const match of original.matchAll(/<script\b[^>]*src="([^"]+)"/g)) assert.ok(sources.has(match[1]), `${path}: script reference missing`);
  }
});
