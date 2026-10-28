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

test('generated page footers use the About page review count', () => {
  for (const builder of builders) {
    const source = fs.readFileSync(
      path.join(__dirname, '..', 'netlify', 'functions', 'lib', builder),
      'utf8',
    );

    assert.match(source, />144 Reviews</, `${builder} should use 144 Reviews`);
    assert.doesNotMatch(source, />137\+ Reviews</, `${builder} should not regress to 137+ Reviews`);
  }
});
