const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert/strict');

const script = fs.readFileSync('script.js', 'utf8');

test('contact-intent events carry a page path and no typed values', () => {
  for (const name of ['call_click', 'text_click', 'calendly_click', 'apply_click', 'form_start', 'form_submit']) {
    assert.match(script, new RegExp(`['"]${name}['"]`), name);
  }
  const block = script.slice(script.indexOf('// GA4 contact-intent events'), script.indexOf('// ====', script.indexOf('// GA4 contact-intent events')));
  assert.match(block, /page_path: window\.location\.pathname/);
  assert.doesNotMatch(block, /\.value\b|email|phone|textContent/);
});

test('form_submit fires only from the confirmed-capture path', () => {
  assert.equal((script.match(/event: 'form_submit'/g) || []).length, 1);
  const submit = script.indexOf("event: 'form_submit'");
  assert.ok(submit > script.indexOf('function dispatchLeadSubmitted') && submit < script.indexOf('window.StyerTrackGenerateLead = dispatchLeadSubmitted'));
  assert.match(script.slice(submit - 200, submit + 120), /form_name: params\.form_name \|\| '', page_path: params\.page_path/);
});

test('videos load from YouTube only after a click', () => {
  const pages = require('node:child_process').execFileSync('git', ['ls-files', '*.html'], { encoding: 'utf8' }).split('\n')
    .filter((file) => file && !/^(?:_archive|run-logs|design-review|docs|audits|tasks|resources\/detailed-guides)\//.test(file));
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(html, /<iframe[^>]+youtube/i, `${file} embeds YouTube directly`);
    if (html.includes('"VideoObject"')) assert.match(html, /class="video-facade"/, `${file} has VideoObject schema without a video`);
  }
});
