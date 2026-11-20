const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const builders = [
  'page-builder.js',
  'blog-page-builder.js',
  'rate-page-builder.js',
  'realtor-page-builder.js',
];

test('generated page footers use the total on the reviews page', () => {
  const reviews = fs.readFileSync(path.join(__dirname, '..', 'testimonials.html'), 'utf8');
  const total = reviews.match(/(\d+) total published reviews/)?.[1];
  assert.ok(total, 'the reviews page should report the combined review count');
  for (const builder of builders) {
    const source = fs.readFileSync(
      path.join(__dirname, '..', 'netlify', 'functions', 'lib', builder),
      'utf8',
    );

    const count = source.match(/>(\d+) Reviews</)?.[1];
    assert.equal(count, total, `${builder} should use the current published review total`);
  }
});
