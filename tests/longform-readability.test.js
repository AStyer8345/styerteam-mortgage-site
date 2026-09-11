const test = require('node:test');
const assert = require('node:assert/strict');
const { refineLongform } = require('../netlify/functions/lib/refine-longform');
const { buildBlogPage } = require('../netlify/functions/lib/blog-page-builder');

test('long guides gain working jump links without changing existing heading IDs', () => {
  const source='<main><article class="blog-post"><header class="blog-post-header"><h1>Guide</h1><p>Introduction</p></header><h2 id="income">Income</h2><p>Details</p><h2>Costs</h2><h2>Documents</h2><h2>Timing</h2></article></main>';
  const result=refineLongform(source);
  assert.match(result,/href="#income"/);
  for(const match of result.matchAll(/href="#([^"]+)"/g))assert.ok(result.includes(`id="${match[1]}"`));
  assert.equal(refineLongform(result),result);
  assert.match(result,/<h2 id="income">Income<\/h2>/);
});

test('paragraph splitting preserves every word and keeps inline links intact', () => {
  const sentence='A borrower can compare costs and consider the next step before deciding. ';
  const body=sentence.repeat(12)+'<a href="/contact.html">Talk with Adam.</a>';
  const source='<main><p>'+body+'</p></main>';
  const result=refineLongform(source);
  const words=value=>value.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
  assert.equal(words(result),words(source));
  assert.ok((result.match(/<p>/g)||[]).length>1);
  assert.match(result,/<a href="\/contact.html">Talk with Adam\.<\/a>/);
});

test('newly published articles receive the same readability treatment', () => {
  const result=buildBlogPage({title:'Example guide',description:'Example',date:'2026-09-11',slug:'example',category:'Guide',content:'<h2>Income</h2><p>Details</p><h2>Costs</h2><h2>Documents</h2><h2>Timing</h2>'});
  assert.match(result,/class="page-contents"/);
  assert.match(result,/href="#guide-income"/);
  assert.match(result,/src="\/assets\/logo-light.svg"/);
});
