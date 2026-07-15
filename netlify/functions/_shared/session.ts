import { createHmac, timingSafeEqual } from 'node:crypto';

type SessionPayload = { id: string; issuedAt: number; expiresAt: number };

function encode(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

export function createSessionToken(secret: string, id: string, now = Date.now()): string {
  const payload: SessionPayload = { id, issuedAt: now, expiresAt: now + 24 * 60 * 60_000 };
  const body = encode(JSON.stringify(payload));
  const signature = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${signature}`;
}

export function verifySessionToken(secret: string, token: string, now = Date.now()): SessionPayload | null {
  const [body, supplied] = token.split('.');
  if (!body || !supplied) return null;
  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  const left = Buffer.from(expected);
  const right = Buffer.from(supplied);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
    if (!payload.id || payload.expiresAt < now || payload.issuedAt > now + 60_000) return null;
    return payload;
  } catch {
    return null;
  }
}
