const { timingSafeEqual } = require('node:crypto');

// All externally callable content/email handlers must authorize before parsing
// input or invoking providers. Internal dispatcher/cron calls use core exports.
function requireDispatchAuth(event) {
  const secret = process.env.DISPATCH_SECRET;
  if (!secret) return { statusCode: 503, message: 'Service unavailable' };
  const header = event.headers?.authorization || event.headers?.Authorization || '';
  const token = typeof header === 'string' && header.startsWith('Bearer ') ? header.slice(7) : '';
  const actual = Buffer.from(token);
  const expected = Buffer.from(secret);
  if (!token || actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return { statusCode: 401, message: 'Unauthorized' };
  }
  return null;
}
module.exports = { requireDispatchAuth };
