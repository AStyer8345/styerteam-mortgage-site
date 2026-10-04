import { getStore } from '@netlify/blobs';
import { callLoanOs } from './loanos-client.ts';
import { scanSensitiveInput } from './assistant-safety.ts';

export type TranscriptEntry = { payload: Record<string, unknown>; idempotencyKey: string; queuedAt: number };
const STORE = 'mortgage-assistant-transcript-retries';
export const transcriptQueue = () => getStore({ name: STORE, consistency: 'strong' });
type Dependencies = { send: typeof callLoanOs; queue: typeof transcriptQueue };
const defaults: Dependencies = { send: callLoanOs, queue: transcriptQueue };

export async function persistTranscript(payload: Record<string, unknown>, idempotencyKey: string, deps: Dependencies = defaults) {
  // A private retry entry contains the same redacted text as LoanOS, never a
  // session cookie, signing credential, or sensitive blocked input.
  const safePayload = { ...payload,
    visitorMessage: scanSensitiveInput(String(payload.visitorMessage || '')).redacted,
    assistantMessage: scanSensitiveInput(String(payload.assistantMessage || '')).redacted,
    sourcePage: cleanSourcePage(payload.sourcePage),
    policyOutcome: { ...(payload.policyOutcome as Record<string, unknown> || {}), synthetic_test: isSyntheticSource(payload.sourcePage) },
  };
  let result = await deps.send('record_conversation_turn', safePayload, { idempotencyKey, timeoutMs: 3000 });
  if (!result.ok && result.error?.retryable) {
    result = await deps.send('record_conversation_turn', safePayload, { idempotencyKey, timeoutMs: 3000 });
  }
  if (result.ok) return { ...result, storageStatus: 'saved' as const };
  console.error('[mortgage-assistant] transcript save failed', {
    correlationId: payload.correlationId, conversationId: payload.conversationId,
    code: result.error?.code || result.status,
  });
  try {
    await deps.queue().setJSON(idempotencyKey, { payload: safePayload, idempotencyKey, queuedAt: Date.now() } satisfies TranscriptEntry);
    return { ...result, storageStatus: 'queued' as const };
  } catch {
    console.error('[mortgage-assistant] transcript retry queue unavailable', { correlationId: payload.correlationId });
    return { ...result, storageStatus: 'unavailable' as const };
  }
}

function isSyntheticSource(value: unknown) {
  if (typeof value !== 'string') return false;
  try { const url = new URL(value); return url.searchParams.get('assistant_test') === '1' || /\/(?:live-eval|audit-test)/.test(url.pathname); } catch { return false; }
}

function cleanSourcePage(value: unknown) {
  if (typeof value !== 'string') return undefined;
  try { const url = new URL(value); return `${url.origin}${url.pathname}`; } catch { return undefined; }
}

export async function retryTranscripts(deps: Dependencies = defaults) {
  const queue = deps.queue();
  const { blobs } = await queue.list();
  let saved = 0, pending = 0;
  const started = Date.now();
  // Sequential processing preserves turn order, and stays inside the scheduled
  // function's execution window. Idempotency keys survive every replay.
  const entries: Array<{ key: string; entry: TranscriptEntry }> = [];
  for (const { key } of blobs.slice(0, 50)) {
    const entry = await queue.get(key, { type: 'json' }) as TranscriptEntry | null;
    if (entry) entries.push({ key, entry });
  }
  entries.sort((a, b) => a.entry.queuedAt - b.entry.queuedAt || Number(a.entry.payload.sequenceStart) - Number(b.entry.payload.sequenceStart));
  for (const { key, entry } of entries) {
    if (Date.now() - started > 18000) { pending++; continue; }
    const result = await deps.send('record_conversation_turn', entry.payload, { idempotencyKey: entry.idempotencyKey, timeoutMs: 3000 });
    if (result.ok) { await queue.delete(key); saved++; }
    else { pending++; console.error('[mortgage-assistant] transcript replay failed', { correlationId: entry.payload.correlationId, code: result.error?.code || result.status }); }
  }
  const report = { saved, pending, queued: blobs.length };
  if (blobs.length) console.log('[mortgage-assistant] transcript retry health', report);
  return report;
}
