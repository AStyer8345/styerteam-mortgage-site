import assert from 'node:assert/strict';
import test from 'node:test';
import { buildHandoffDetails, captureAssistantHandoff } from '../../netlify/functions/_shared/assistant-handoff.ts';

test('handoff retains early and late facts beyond the model history window and redacts sensitive text', () => {
  const turns = Array.from({ length: 30 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', text: `Fact ${i}` }));
  turns[0].text = '1099 income $300,000 per year; four years in business; large deductions';
  turns[28].text = 'Monthly debts $2,000, credit 740, Austin, $150,000 down';
  const details = buildHandoffDetails({ incomeType: '1099_variable' }, turns);
  assert.match(details, /300,000.*four years/);
  assert.match(details, /Monthly debts.*150,000/);
  assert.match(details, /Assistant: Fact 29/);
  assert.doesNotMatch(buildHandoffDetails({}, [{ role: 'user', text: 'My SSN is 123-45-6789' }]), /123-45-6789/);
  assert.throws(() => buildHandoffDetails({}, [{ role: 'user', text: 'x'.repeat(50000) }]), /too long/);
});

test('contact capture carries its own scenario despite unavailable transcript storage and retries with one inquiry ID', async () => {
  const originalFetch = globalThis.fetch;
  const originalNetlify = globalThis.Netlify;
  const bodies: Record<string, unknown>[] = [];
  (globalThis as any).Netlify = { env: { get: (key: string) => ({ LOANOS_URL: 'https://loanos.invalid', LOANOS_AGENT_SECRET: 'test', N8N_WEB_LEAD_URL: 'https://dispatch.invalid' }[key]) } };
  globalThis.fetch = async (url, options) => {
    if (String(url).includes('/api/intake/inquiries')) {
      const body = JSON.parse(String(options?.body)); bodies.push(body);
      return Response.json({ captured: true, inquiry_id: body.inquiry_id, duplicate: bodies.length > 1 });
    }
    throw new Error('Dispatcher offline');
  };
  try {
    const args = { firstName: 'Test', email: 'test@example.invalid', handoffDetails: 'Visitor: $300,000 1099; $2,000 debts; 740 credit', sourcePage: 'https://styermortgage.com/' };
    const first = await captureAssistantHandoff(args, 'test-conversation', 'policy-test');
    const second = await captureAssistantHandoff(args, 'test-conversation', 'policy-test');
    assert.equal(first.ok, true); assert.equal(first.data?.notificationsQueued, true);
    assert.equal(second.status, 'existing');
    assert.equal(bodies[0].situation, args.handoffDetails);
    assert.equal(bodies[0].inquiry_id, bodies[1].inquiry_id);
    assert.equal(bodies[0].tcpa_consent, true);
    await captureAssistantHandoff({ ...args, handoffDetails: args.handoffDetails + '; additional property details' }, 'test-conversation', 'policy-test');
    assert.notEqual(bodies[0].inquiry_id, bodies[2].inquiry_id);
  } finally { globalThis.fetch = originalFetch; (globalThis as any).Netlify = originalNetlify; }
});
