import assert from 'node:assert/strict';
import test from 'node:test';
import { persistTranscript, retryTranscripts, type TranscriptEntry } from '../../netlify/functions/_shared/transcript-store.ts';
import type { callLoanOs } from '../../netlify/functions/_shared/loanos-client.ts';
import { deriveStrategyState, EMPTY_STRATEGY_STATE } from '../../netlify/functions/_shared/mortgage-strategy.ts';
import { recommendApprovedResources } from '../../netlify/functions/_shared/assistant-resources.ts';

function harness(responses: Array<{ ok: boolean; status: string; error?: { code: string; message: string; retryable: boolean } }>) {
  const entries = new Map<string, TranscriptEntry>();
  const calls: Array<{ payload: Record<string, unknown>; key?: string }> = [];
  const send: typeof callLoanOs = async (_operation, payload, options) => {
    calls.push({ payload, key: options?.idempotencyKey });
    return responses.shift() || { ok: true, status: 'recorded' };
  };
  const queue = () => ({
    setJSON: async (key: string, value: TranscriptEntry) => { entries.set(key, value); },
    list: async () => ({ blobs: [...entries.keys()].map(key => ({ key })) }),
    get: async (key: string) => entries.get(key),
    delete: async (key: string) => { entries.delete(key); },
  }) as any;
  return { deps: { send, queue }, entries, calls };
}
const failure = { ok: false, status: 'unavailable', error: { code: 'unavailable', message: 'Unavailable', retryable: true } };
const payload = { conversationId: 'test', correlationId: 'test-request', visitorMessage: 'hello', assistantMessage: 'Hi', sequenceStart: 1 };

test('successful save does not queue; transient retry keeps the same idempotency key', async () => {
  const h = harness([failure, { ok: true, status: 'recorded' }]);
  const result = await persistTranscript(payload, 'test:turn:1', h.deps);
  assert.equal(result.storageStatus, 'saved');
  assert.equal(h.entries.size, 0);
  assert.deepEqual(h.calls.map(c => c.key), ['test:turn:1', 'test:turn:1']);
});

test('failed save queues redacted text and replays without changing the key', async () => {
  const h = harness([failure, failure]);
  const result = await persistTranscript({ ...payload, visitorMessage: 'SSN 123-45-6789', sourcePage: 'https://styermortgage.com/?email=private@example.com#secret' }, 'test:turn:1', h.deps);
  assert.equal(result.ok, false); // Queued is not a confirmed durable LoanOS save.
  assert.equal(result.storageStatus, 'queued');
  const entry = h.entries.get('test:turn:1')!;
  assert.doesNotMatch(String(entry.payload.visitorMessage), /123-45-6789/);
  assert.equal(entry.payload.sourcePage, 'https://styermortgage.com/');
  const report = await retryTranscripts(h.deps);
  assert.equal(report.saved, 1);
  assert.equal(h.entries.size, 0);
  assert.equal(h.calls[2].key, 'test:turn:1');
});

test('unavailable queue is reported honestly; unsuccessful replays retain entries', async () => {
  const h = harness([failure, failure]);
  h.deps.queue = (() => ({ setJSON: async () => { throw new Error('offline'); } })) as any;
  assert.equal((await persistTranscript(payload, 'test:turn:1', h.deps)).storageStatus, 'unavailable');
  const replay = harness([failure]);
  replay.entries.set('test:turn:1', { payload, idempotencyKey: 'test:turn:1', queuedAt: Date.now() });
  assert.equal((await retryTranscripts(replay.deps)).pending, 1);
  assert.equal(replay.entries.size, 1);
});

test('natural current-rate questions switch paths while preserving known scenario facts', () => {
  const state = deriveStrategyState('What are current mortgage rates?', { ...EMPTY_STRATEGY_STATE, path: 'complex', valueDelivered: true, targetPrice: 600000, propertyUse: 'primary', complexFlags: ['self_employed'] });
  assert.equal(state.path, 'pricing');
  assert.equal(state.targetPrice, 600000);
  assert.equal(state.propertyUse, 'primary');
});

test('borrowers get relevant clickable guides rather than CPA pages', () => {
  const links = recommendApprovedResources('I am self-employed and my tax returns show low income. Help me find a guide');
  assert.ok(links.some(link => link.url.endsWith('/self-employed-mortgage-austin.html')));
  assert.ok(links.every(link => !link.url.includes('cpas')));
  assert.equal(recommendApprovedResources('What are current mortgage rates?')[0].url, 'https://styermortgage.com/rate-check.html');
});
