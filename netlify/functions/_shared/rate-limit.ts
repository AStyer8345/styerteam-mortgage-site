import { getStore } from '@netlify/blobs';

type Counter = { count: number; resetAt: number };

export async function checkPersistentRateLimit(key: string, limit: number, windowMs: number): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const store = getStore({ name: 'mortgage-assistant-rate-limits', consistency: 'strong' });
  const now = Date.now();
  const safeKey = key.replace(/[^A-Za-z0-9._:-]/g, '_').slice(0, 180);
  let counter = await store.get(safeKey, { type: 'json' }).catch(() => null) as Counter | null;
  if (!counter || counter.resetAt <= now) counter = { count: 0, resetAt: now + windowMs };
  if (counter.count >= limit) return { allowed: false, remaining: 0, resetAt: counter.resetAt };
  counter.count += 1;
  await store.setJSON(safeKey, counter).catch(() => {
    throw new Error('Rate-limit store unavailable');
  });
  return { allowed: true, remaining: Math.max(0, limit - counter.count), resetAt: counter.resetAt };
}
