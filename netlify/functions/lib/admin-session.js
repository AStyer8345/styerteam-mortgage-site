const { createHmac, timingSafeEqual, randomBytes } = require('node:crypto');
const COOKIE = '__Host-styer-admin';
const TTL = 8 * 60 * 60;
function equal(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
function signature(value) {
  return createHmac('sha256', process.env.MCC_PASS).update('admin-session-v1:' + value).digest('base64url');
}
function issueSession(now = Date.now()) {
  if (!process.env.MCC_PASS) throw new Error('Admin access unavailable');
  const value = `${Math.floor(now / 1000) + TTL}.${randomBytes(24).toString('base64url')}`;
  return `${value}.${signature(value)}`;
}
function validSession(headers = {}, now = Date.now()) {
  if (!process.env.MCC_PASS) return false;
  const cookie = headers.cookie || headers.Cookie || '';
  const token = cookie.split(';').map(v => v.trim()).find(v => v.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || !/^\d+$/.test(parts[0]) || !/^[\w-]{32}$/.test(parts[1])) return false;
  const expiry = Number(parts[0]), seconds = Math.floor(now / 1000);
  if (expiry <= seconds || expiry > seconds + TTL) return false;
  return equal(parts[2], signature(`${parts[0]}.${parts[1]}`));
}
function sameOrigin(event) {
  const headers = event.headers || {};
  const origin = headers.origin || headers.Origin;
  if (!origin) return false;
  try { return new URL(event.rawUrl || event.rawURL).origin === origin; } catch { return false; }
}
function sessionAuthorization(event) {
  if (!validSession(event.headers)) return false;
  return ['GET', 'HEAD'].includes(event.httpMethod) || sameOrigin(event);
}
function cookieHeader(token) {
  return `${COOKIE}=${token}; Path=/; Max-Age=${token ? TTL : 0}; HttpOnly; Secure; SameSite=Strict`;
}
module.exports = { equal, issueSession, validSession, sameOrigin, sessionAuthorization, cookieHeader };
