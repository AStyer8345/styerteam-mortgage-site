import { createHash } from 'node:crypto';
import { scanSensitiveInput } from './assistant-safety.ts';
import type { LoanOsResult } from './loanos-client.ts';

// The handoff carries its own redacted snapshot. It does not depend on the
// separate conversation store having caught up before contact capture.
export function buildHandoffDetails(context: Record<string, unknown>, conversation: unknown): string {
  const turns = Array.isArray(conversation) ? conversation : [];
  const transcript = turns.flatMap((turn) => {
    if (!turn || typeof turn !== 'object') return [];
    const item = turn as Record<string, unknown>;
    if (!['user', 'assistant'].includes(String(item.role)) || typeof item.text !== 'string') return [];
    return [`${item.role === 'user' ? 'Visitor' : 'Assistant'}: ${scanSensitiveInput(item.text).redacted}`];
  }).join('\n\n');
  const facts = Object.entries(context).filter(([, value]) => value !== null && value !== undefined).map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1')}: ${typeof value === 'object' ? JSON.stringify(value) : value}`).join('\n');
  const details = `Scenario details\n${scanSensitiveInput(facts).redacted}\n\nConversation\n${transcript || 'No conversation supplied.'}`;
  // Leave space for contact fields and JSON escaping in the 64KB intake body.
  if (Buffer.byteLength(JSON.stringify(details), 'utf8') > 48000) throw new Error('This conversation is too long to send in one request. Please contact Adam to arrange a complete review. Nothing has been sent.');
  return details;
}

export async function captureAssistantHandoff(args: Record<string, unknown>, conversationId: string, consentPolicyVersion: string): Promise<LoanOsResult> {
  const base = (Netlify.env.get('LOANOS_URL') || Netlify.env.get('LOANOS_API_URL') || '').replace(/\/$/, '');
  const secret = Netlify.env.get('LOANOS_AGENT_SECRET');
  if (!base || !secret) return { ok: false, status: 'unavailable', error: { code: 'capture_unavailable', message: 'The contact inbox is temporarily unavailable. Please try again.', retryable: true } };
  const details = String(args.handoffDetails || args.conversationSummary || '');
  const snapshotId = createHash('sha256').update(JSON.stringify([details, args.email, args.phone, args.preferredContact])).digest('hex').slice(0, 16);
  const inquiryId = `assistant:${conversationId}:${snapshotId}`;
  try {
    const response = await fetch(`${base}/api/intake/inquiries`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` }, signal: AbortSignal.timeout(8000),
      body: JSON.stringify({ org_slug: 'adam-styer-mslp', inquiry_id: inquiryId,
        first_name: args.firstName, last_name: args.lastName, email: args.email, phone: args.phone,
        loan_goal: args.leadIntent, timeline: args.timeline, preferred_follow_up: args.preferredContact,
        situation: details, source_page: args.sourcePage, assistant_mode: args.assistantMode,
        lead_source: 'Website mortgage assistant', 'form-name': 'mortgage-assistant-contact',
        tcpa_consent: true, consent_policy_version: consentPolicyVersion, consented_at: new Date().toISOString(),
      }),
    });
    const receipt = await response.json();
    if (!response.ok || receipt.captured !== true || !receipt.inquiry_id) throw new Error('Capture not confirmed');
    // The durable outbox owns delivery and retries; dispatch is only a nudge.
    try {
      await fetch(Netlify.env.get('N8N_WEB_LEAD_URL') || 'https://styer.app.n8n.cloud/webhook/web-lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(3000), body: JSON.stringify({ dispatch_inquiry_id: receipt.inquiry_id }),
      });
    } catch { /* Saved outbox remains recoverable. */ }
    return { ok: true, status: receipt.duplicate ? 'existing' : 'created', data: { inquiryId: receipt.inquiry_id, notificationsQueued: true } };
  } catch {
    return { ok: false, status: 'unavailable', error: { code: 'capture_unconfirmed', message: 'Your contact request could not be confirmed. Please retry or call or text Adam at (512) 956-6010.', retryable: true } };
  }
}
