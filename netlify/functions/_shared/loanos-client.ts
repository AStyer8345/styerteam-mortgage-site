import { createHash, createHmac, randomBytes, randomUUID } from 'node:crypto';

type LoanOsResult = { ok: boolean; status: string; data?: Record<string, unknown>; error?: { code: string; message: string; retryable: boolean } };

export async function callLoanOs(operation: string, payload: Record<string, unknown>, options?: { idempotencyKey?: string }): Promise<LoanOsResult> {
  const baseUrl = Netlify.env.get('LOANOS_ASSISTANT_URL')?.replace(/\/$/, '');
  const keyId = Netlify.env.get('LOANOS_ASSISTANT_KEY_ID');
  const secret = Netlify.env.get('LOANOS_ASSISTANT_SIGNING_SECRET');
  if (!baseUrl || !keyId || !secret) return { ok: false, status: 'not_configured', error: { code: 'loanos_not_configured', message: 'Secure lead operations are not configured.', retryable: false } };

  const path = `/api/v1/website-assistant/${operation}`;
  const body = JSON.stringify(payload);
  const timestamp = Date.now().toString();
  const nonce = randomBytes(18).toString('base64url');
  const digest = createHash('sha256').update(body, 'utf8').digest('hex');
  const canonical = ['POST', path, timestamp, nonce, digest].join('\n');
  const signature = `sha256=${createHmac('sha256', secret).update(canonical, 'utf8').digest('hex')}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Assistant-Key-Id': keyId,
        'X-Assistant-Timestamp': timestamp,
        'X-Assistant-Nonce': nonce,
        'X-Assistant-Signature': signature,
        'X-Idempotency-Key': options?.idempotencyKey || randomUUID(),
        'X-Correlation-Id': String(payload.correlationId || randomUUID()),
      },
      body,
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null) as LoanOsResult | null;
    if (!result) return { ok: false, status: 'invalid_response', error: { code: 'invalid_response', message: 'LoanOS returned an invalid response.', retryable: true } };
    return result;
  } catch {
    return { ok: false, status: 'unavailable', error: { code: 'loanos_unavailable', message: 'LoanOS is temporarily unavailable.', retryable: true } };
  } finally {
    clearTimeout(timer);
  }
}
