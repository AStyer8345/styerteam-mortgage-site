import type { Config, Context } from '@netlify/functions';
import { createHash, createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { scanSensitiveInput, isPromptInjection, safeSensitiveNotice, safeUnsupportedReply, validateAssistantOutput } from './_shared/assistant-safety.ts';
import { retrieveApprovedKnowledge } from './_shared/knowledge.ts';
import { createGeneralMortgageResponse, createMortgageResponse, createSalesConversationResponse } from './_shared/openai-responses.ts';
import { createSessionToken, verifySessionToken } from './_shared/session.ts';
import { callLoanOs } from './_shared/loanos-client.ts';
import { checkPersistentRateLimit } from './_shared/rate-limit.ts';
import { conversionResources, recommendApprovedResources, resolveAssistantActions } from './_shared/assistant-resources.ts';
import { buildContextualQuery, computeSequenceStart, fixedConversationReply } from './_shared/conversation-context.ts';
import { deriveSalesState, generalAnswerFollowUp, guidedConversationReply, salesNextStepReply, salesStateSummary } from './_shared/sales-conversation.ts';
import { allowsResourceRecommendation, checkDiscoveryLanguage, checkGeneralAnswerLanguage } from './_shared/conversation-policy.ts';
import { buildStructuredLeadContext, strategyConversationReply } from './_shared/mortgage-strategy.ts';
import { loadEstimateAssumptions, loadRateMarketConfig } from './_shared/rate-market.ts';

const COOKIE = 'mortgage_assistant_session';
const MUTATING = new Set(['create_or_update_website_lead', 'create_follow_up_task', 'schedule_consultation', 'escalate_to_adam']);
const TOOL_NAMES = new Set(['create_or_update_website_lead', 'create_follow_up_task', 'send_application_link', 'get_available_call_times', 'schedule_consultation', 'escalate_to_adam']);
const POLICY_VERSION = 'privacy-contact-2026-07-15-v1';

export default async function handler(request: Request, context: Context): Promise<Response> {
  const correlationId = context.requestId || randomUUID();
  const headers = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json', 'X-Correlation-Id': correlationId };

  if (request.method === 'GET') return handleConfig(context, headers);
  if (request.method !== 'POST') return json({ error: { code: 'method_not_allowed', message: 'Method not allowed.' } }, 405, headers);
  if (Netlify.env.get('MORTGAGE_ASSISTANT_ENABLED') !== 'true') return json({ error: { code: 'disabled', message: 'Assistant is not enabled.' } }, 404, headers);
  if (!sameOrigin(request)) return json({ error: { code: 'invalid_origin', message: 'Request origin is not allowed.' } }, 403, headers);
  if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) return json({ error: { code: 'invalid_content_type', message: 'JSON is required.' } }, 415, headers);
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 24_000) return json({ error: { code: 'request_too_large', message: 'Request is too large.' } }, 413, headers);

  const secret = Netlify.env.get('MORTGAGE_ASSISTANT_SESSION_SECRET');
  if (!secret) return json({ error: { code: 'not_configured', message: 'Assistant configuration is incomplete.' } }, 503, headers);
  const token = context.cookies.get(COOKIE) || '';
  const session = verifySessionToken(secret, token);
  if (!session) return json({ error: { code: 'session_expired', message: 'Please reopen the assistant and try again.' } }, 401, headers);

  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; } catch { return json({ error: { code: 'invalid_json', message: 'Invalid request.' } }, 400, headers); }
  const conversationId = validUuid(body.conversationId) ? String(body.conversationId) : randomUUID();
  try {
    const ipLimit = await checkPersistentRateLimit(`ip:${context.ip || 'unknown'}`, 20, 60_000);
    const sessionLimit = await checkPersistentRateLimit(`session:${session.id}`, 40, 10 * 60_000);
    const conversationLimit = await checkPersistentRateLimit(`conversation:${conversationId}`, 30, 10 * 60_000);
    if (!ipLimit.allowed || !sessionLimit.allowed || !conversationLimit.allowed) return json({ error: { code: 'rate_limited', message: 'Please wait a moment before sending another message.' } }, 429, headers);
  } catch {
    return json({ error: { code: 'safety_service_unavailable', message: 'The assistant is temporarily unavailable.' } }, 503, headers);
  }

  if (typeof body.confirmAction === 'string') return handleConfirmedAction(body.confirmAction, body, secret, conversationId, correlationId, session.id, headers);
  if (body.leadRequest && typeof body.leadRequest === 'object') return handleLeadRequest(body.leadRequest as Record<string, unknown>, secret, conversationId, headers, body);

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message || message.length > 4000) return json({ error: { code: 'invalid_message', message: 'Enter a message between 1 and 4,000 characters.' } }, 400, headers);
  const priorTurns = parseConversation(body.conversation);
  const sequenceStart = computeSequenceStart(body.turnCount, priorTurns.length);
  const salesState = deriveSalesState(message, priorTurns, body.salesState);
  const scan = scanSensitiveInput(message);
  if (scan.blocked) {
    const answer = safeSensitiveNotice();
    await recordTurn(conversationId, correlationId, session.id, scan.redacted, answer, [], { sensitive_input_blocked: true }, undefined, sequenceStart);
    return json({ conversationId, message: answer, sources: [], salesState, sensitiveInputDetected: true, canEscalate: true }, 200, headers);
  }
  if (isPromptInjection(message)) {
    const answer = 'I can help with mortgage information supported by the approved website materials, or help you reach Adam. I can’t follow requests to reveal or override system instructions.';
    await recordTurn(conversationId, correlationId, session.id, '[PROMPT_INJECTION_REDACTED]', answer, [], { prompt_injection_blocked: true }, undefined, sequenceStart);
    return json({ conversationId, message: answer, sources: [], salesState, canEscalate: true }, 200, headers);
  }
  if (isGreeting(message)) {
    const answer = "Hi! I’m here to make the mortgage side of things feel a little less complicated. Ask me anything about loan programs or the process, and I’ll give you the clearest answer I can. One quick note: please don’t send Social Security numbers, full birth dates, account or card numbers, passwords, codes, or ID documents here.";
    await recordTurn(conversationId, correlationId, session.id, message, answer, [], { fixed_operational_text: true }, undefined, sequenceStart);
    return json({ conversationId, message: answer, sources: [], suggestedReplies: ['Buying a home', 'Refinancing', 'Investment property'], salesState, aiDisclosure: true }, 200, headers);
  }

  if (/\b(?:adam(?:['’]s)?|his)\s+(?:team\s+)?(?:to\s+)?(?:review|look at)|\b(?:have|ask)\s+adam\b|\bcontact me\b/i.test(message)) {
    const name = salesState.visitorName ? `, ${salesState.visitorName}` : '';
    const answer = `Absolutely${name}. Add an email address or phone number below so Adam’s team has a way to respond. You’ll review the privacy notice before anything is saved. The conversation will stay attached to this request, so you won’t need to repeat the scenario.`;
    await recordTurn(conversationId, correlationId, session.id, message, answer, [], { contact_details_requested: true }, undefined, sequenceStart);
    return json({ conversationId, message: answer, sources: [], collectContactDetails: true, salesState }, 200, headers);
  }

  if (/\b(?:text|email|schedule|book|calendly|apply|application|contact)\b.*\b(?:adam|call|loan|mortgage|me)?\b/i.test(message)) {
    const resources = conversionResources(salesState.stage, message);
    if (resources.length) {
      const answer = /\btext\b/i.test(message)
        ? 'You can text Adam directly at (512) 956-6010. You can also email adam.styer@hypersmart.loan, schedule a 15-minute call, or use the secure application when you’re ready.'
        : /\bemail\b/i.test(message)
          ? 'You can email Adam directly at adam.styer@hypersmart.loan. If scheduling or applying is easier, those options are available too.'
          : /\b(?:schedule|book|calendly|call)\b/i.test(message)
            ? 'Absolutely—you can choose a convenient time on Adam’s calendar below. You can also call or text him at (512) 956-6010.'
            : 'When you’re ready, use the secure application below. If you would rather talk first, text Adam at (512) 956-6010 or email adam.styer@hypersmart.loan.';
      await recordTurn(conversationId, correlationId, session.id, message, answer, [], { direct_conversion_option: true }, undefined, sequenceStart);
      return json({ conversationId, message: answer, sources: [], resources, salesState }, 200, headers);
    }
  }

  const fixedReply = fixedConversationReply(message);
  if (fixedReply) {
    await recordTurn(conversationId, correlationId, session.id, message, fixedReply.message, [], { fixed_operational_text: true }, undefined, sequenceStart);
    return json({ conversationId, message: fixedReply.message, sources: [], suggestedReplies: fixedReply.suggestedReplies || [], salesState, aiDisclosure: true }, 200, headers);
  }

  const strategyReply = strategyConversationReply(message, salesState.strategy, {
    market: loadRateMarketConfig(),
    assumptions: loadEstimateAssumptions(),
  });
  if (strategyReply) {
    const nextState = { ...salesState, strategy: strategyReply.strategy };
    if (strategyReply.strategy.propertyUse !== 'unknown') nextState.propertyUse = strategyReply.strategy.propertyUse;
    if (strategyReply.strategy.timeline !== 'unknown') nextState.timeline = strategyReply.strategy.timeline;
    if (strategyReply.strategy.targetPrice !== null) nextState.purchasePrice = strategyReply.strategy.targetPrice;
    if (strategyReply.strategy.availableCash !== null) nextState.cashAvailable = strategyReply.strategy.availableCash;
    await recordTurn(conversationId, correlationId, session.id, message, strategyReply.message, [], {
      mortgage_strategy: true,
      response_kind: strategyReply.responseKind,
      strategy_path: strategyReply.strategy.path || 'unknown',
    }, undefined, sequenceStart);
    return json({
      conversationId,
      message: strategyReply.message,
      sources: [],
      resources: [],
      actions: resolveAssistantActions(strategyReply.actions),
      suggestedReplies: strategyReply.suggestedReplies,
      salesState: nextState,
      responseKind: strategyReply.responseKind,
    }, 200, headers);
  }

  const nextStepReply = salesNextStepReply(message, salesState);
  if (nextStepReply) {
    await recordTurn(conversationId, correlationId, session.id, message, nextStepReply.message, [], { fixed_sales_guidance: true, sales_stage: salesState.stage, intent_score: String(salesState.intentScore) }, undefined, sequenceStart);
    return json({ conversationId, message: nextStepReply.message, sources: [], suggestedReplies: nextStepReply.suggestedReplies, actions: salesState.stage === 'ready' ? resolveAssistantActions(['contact']) : [], salesState }, 200, headers);
  }

  const previousPending = body.salesState && typeof body.salesState === 'object' && !Array.isArray(body.salesState)
    ? ((body.salesState as { pendingQuestion?: import('./_shared/sales-conversation.ts').SalesConversationState['pendingQuestion'] }).pendingQuestion || null)
    : null;
  const guidedReply = guidedConversationReply(message, salesState, previousPending);
  if (guidedReply) {
    let answer = guidedReply.message;
    let suggestedReplies = guidedReply.suggestedReplies;
    let responseId: string | undefined;
    const nextState = { ...guidedReply.salesState };
    try {
      const modelTurns = priorTurns.map((turn) => ({ role: turn.role, text: scanSensitiveInput(turn.text).redacted }));
      const model = await createSalesConversationResponse({ message, conversation: modelTurns, salesState, requiredQuestion: guidedReply.salesState.pendingQuestion });
      const validation = validateAssistantOutput(model.text);
      if (!validation.safe) throw new Error(`Unsafe sales output: ${validation.reason}`);
      const policy = checkDiscoveryLanguage(model.text, guidedReply.salesState.pendingQuestion);
      if (!policy.safe) throw new Error(`Sales process violation: ${policy.reason}`);
      answer = model.text;
      responseId = model.responseId;
    } catch (error) {
      console.error('[mortgage-assistant] sales conversation generation failed', { correlationId, reason: error instanceof Error ? error.message.slice(0, 240) : 'unknown_error' });
    }
    await recordTurn(conversationId, correlationId, session.id, message, answer, [], { guided_sales_conversation: true, model_led_sales: Boolean(responseId) }, responseId, sequenceStart);
    return json({ conversationId, message: answer, sources: [], resources: [], suggestedReplies, salesState: nextState }, 200, headers);
  }

  const contextualQuery = buildContextualQuery(message, priorTurns);
  const retrieval = await retrieveApprovedKnowledge(contextualQuery);
  if (!retrieval.results.length) {
    const followUp = generalAnswerFollowUp(salesState);
    try {
      const modelTurns = priorTurns.map((turn) => ({ role: turn.role, text: scanSensitiveInput(turn.text).redacted }));
      const model = await createGeneralMortgageResponse({ message, conversation: modelTurns, salesState, requiredQuestion: followUp.question });
      const validation = validateAssistantOutput(model.text);
      if (!validation.safe) throw new Error(`Unsafe general answer: ${validation.reason}`);
      const policy = checkGeneralAnswerLanguage(model.text, followUp.question);
      if (!policy.safe) throw new Error(`General answer policy violation: ${policy.reason}`);
      await recordTurn(conversationId, correlationId, session.id, message, model.text, [], { general_educational_answer: true }, model.responseId, sequenceStart, retrieval.version);
      return json({ conversationId, message: model.text, sources: [], resources: [...(allowResourceRecommendation(message) ? recommendApprovedResources(contextualQuery).slice(0, 1) : []), ...conversionResources(salesState.stage, message)].slice(0, 3), suggestedReplies: followUp.suggestedReplies, salesState, responseKind: 'useful_answer' }, 200, headers);
    } catch (error) {
      console.error('[mortgage-assistant] general answer failed', { correlationId, reason: error instanceof Error ? error.message.slice(0, 240) : 'unknown_error' });
      const answer = `Let’s work through it from the decision you’re trying to make.\n\n${followUp.question}`;
      await recordTurn(conversationId, correlationId, session.id, message, answer, [], { general_answer_fallback: true }, undefined, sequenceStart, retrieval.version);
      return json({ conversationId, message: answer, sources: [], resources: [], suggestedReplies: followUp.suggestedReplies, salesState, responseKind: 'useful_answer' }, 200, headers);
    }
  }

  try {
    // Prior turns come from the browser and may predate the sensitive-input
    // block, so redact them again before they reach the model.
    const modelTurns = priorTurns.map((turn) => ({ role: turn.role, text: scanSensitiveInput(turn.text).redacted }));
    const model = await createMortgageResponse({ message, sources: retrieval.results, conversation: modelTurns, salesState });
    if (model.toolCalls.length) {
      const proposed = model.toolCalls[0];
      if (!TOOL_NAMES.has(proposed.name)) throw new Error('Unauthorized model tool call');
      if (proposed.name === 'create_or_update_website_lead') {
        const firstName = typeof proposed.arguments.firstName === 'string' && proposed.arguments.firstName.trim();
        const email = typeof proposed.arguments.email === 'string' && proposed.arguments.email.trim();
        const phone = typeof proposed.arguments.phone === 'string' && proposed.arguments.phone.trim();
        if (!firstName || (!email && !phone)) {
          const answer = firstName
            ? 'Add an email address or phone number below so Adam’s team has a way to respond. You’ll review the privacy notice before anything is submitted.'
            : 'I need a name and either an email address or phone number before I can save a contact request. Add them below, then you’ll review the privacy notice before anything is submitted.';
          await recordTurn(conversationId, correlationId, session.id, message, answer, [], { incomplete_lead_tool_blocked: true }, model.responseId, sequenceStart, retrieval.version);
          return json({ conversationId, message: answer, sources: [], collectContactDetails: true, salesState }, 200, headers);
        }
      }
      if (!MUTATING.has(proposed.name)) {
        const result = await executeTool(proposed.name, proposed.arguments, conversationId, correlationId, body, proposed.id);
        const answer = toolResultMessage(proposed.name, result);
        await recordTurn(conversationId, correlationId, session.id, message, answer, [], { tool_executed: proposed.name, tool_status: result.status }, model.responseId, sequenceStart, retrieval.version);
        return json({ conversationId, message: answer, sources: [], toolResult: result }, 200, headers);
      }
      const confirmation = createConfirmationToken(secret, { name: proposed.name, args: proposed.arguments, conversationId, toolCallId: proposed.id, expiresAt: Date.now() + 10 * 60_000 });
      const prompt = confirmationPrompt(proposed.name);
      await recordTurn(conversationId, correlationId, session.id, message, prompt, [], { tool_confirmation_required: proposed.name }, model.responseId, sequenceStart, retrieval.version);
      return json({ conversationId, message: prompt, sources: [], confirmation: { token: confirmation, operation: proposed.name, summary: safeActionSummary(proposed.name, proposed.arguments) } }, 200, headers);
    }
    if (!model.supportAdequate) throw new Error('Insufficient model support');
    const allowedSources = new Set(retrieval.results.map((item) => `${item.source}#${item.section}`));
    if (!model.citedSources.length || model.citedSources.some((source) => !allowedSources.has(source))) throw new Error('Invalid model sources');
    const validation = validateAssistantOutput(model.text);
    if (!validation.safe) throw new Error(`Unsafe model output: ${validation.reason}`);
    await recordTurn(conversationId, correlationId, session.id, message, model.text, model.citedSources, { grounded: true }, model.responseId, sequenceStart, retrieval.version);
    return json({ conversationId, message: model.text, sources: model.citedSources.map(parseSourceRef), resources: allowResourceRecommendation(message) ? model.recommendedResources.slice(0, 1) : [], suggestedReplies: model.suggestedReplies, salesState, responseKind: 'useful_answer' }, 200, headers);
  } catch (error) {
    console.error('[mortgage-assistant] response generation failed', {
      correlationId,
      reason: error instanceof Error ? error.message.slice(0, 300) : 'unknown_error',
    });
    const followUp = generalAnswerFollowUp(salesState);
    try {
      const modelTurns = priorTurns.map((turn) => ({ role: turn.role, text: scanSensitiveInput(turn.text).redacted }));
      const general = await createGeneralMortgageResponse({ message, conversation: modelTurns, salesState, requiredQuestion: followUp.question });
      const validation = validateAssistantOutput(general.text);
      if (!validation.safe) throw new Error(`Unsafe general answer: ${validation.reason}`);
      const policy = checkGeneralAnswerLanguage(general.text, followUp.question);
      if (!policy.safe) throw new Error(`General answer policy violation: ${policy.reason}`);
      await recordTurn(conversationId, correlationId, session.id, message, general.text, [], { grounded_fallback_to_general: true }, general.responseId, sequenceStart, retrieval.version);
      return json({ conversationId, message: general.text, sources: [], resources: allowResourceRecommendation(message) ? recommendApprovedResources(contextualQuery).slice(0, 1) : [], suggestedReplies: followUp.suggestedReplies, salesState, responseKind: 'useful_answer' }, 200, headers);
    } catch (generalError) {
      console.error('[mortgage-assistant] general fallback failed', { correlationId, reason: generalError instanceof Error ? generalError.message.slice(0, 240) : 'unknown_error' });
      const answer = `Here’s the useful way to approach it: start with the decision and the tradeoffs, then add only the numbers that change the answer.\n\n${followUp.question}`;
      await recordTurn(conversationId, correlationId, session.id, message, answer, [], { final_safe_fallback: true }, undefined, sequenceStart, retrieval.version);
      return json({ conversationId, message: answer, sources: [], resources: [], suggestedReplies: followUp.suggestedReplies, salesState, responseKind: 'useful_answer' }, 200, headers);
    }
  }
}

function handleConfig(context: Context, headers: Record<string, string>): Response {
  const enabled = Netlify.env.get('MORTGAGE_ASSISTANT_ENABLED') === 'true';
  const secret = Netlify.env.get('MORTGAGE_ASSISTANT_SESSION_SECRET');
  if (enabled && secret) {
    context.cookies.set({ name: COOKIE, value: createSessionToken(secret, randomUUID()), httpOnly: true, secure: true, sameSite: 'Lax', path: '/api/mortgage-assistant', maxAge: 86_400 });
  }
  return json({
    enabled: enabled && Boolean(secret),
    aiDisclosure: "You’re chatting with an AI mortgage strategy assistant. It can provide general education and planning estimates, but it cannot approve a loan or quote live pricing; Adam can verify your scenario.",
    sensitiveDataNotice: "Don’t send Social Security numbers, full birth dates, financial account or card numbers, passwords, authentication codes, or ID documents.",
    consentPolicyVersion: POLICY_VERSION,
    consentText: 'By submitting this request, I agree that Adam Styer or his team may contact me by phone, email, or text regarding my mortgage inquiry. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out. I understand this assistant is not a secure place to submit Social Security numbers, full birth dates, financial account information, passwords, authentication codes, or identification documents. See the Privacy Policy at styermortgage.com/privacy.html for more information.',
  }, 200, headers);
}

function handleLeadRequest(value: Record<string, unknown>, secret: string, conversationId: string, headers: Record<string, string>, requestBody: Record<string, unknown>): Response {
  const firstName = boundedText(value.firstName, 80);
  const email = boundedText(value.email, 254, false)?.toLowerCase();
  const phone = boundedText(value.phone, 32, false);
  const preferredContact = typeof value.preferredContact === 'string' && ['email', 'phone', 'text'].includes(value.preferredContact) ? value.preferredContact : (email ? 'email' : 'phone');
  if (!firstName || (!email && !phone)) return json({ error: { code: 'invalid_lead_request', message: 'First name and a valid email address or phone number are required.' } }, 400, headers);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: { code: 'invalid_email', message: 'Enter a valid email address.' } }, 400, headers);
  if (phone && !/^\+?[0-9() .-]{10,20}$/.test(phone)) return json({ error: { code: 'invalid_phone', message: 'Enter a valid phone number.' } }, 400, headers);
  if (preferredContact === 'email' && !email) return json({ error: { code: 'preferred_contact_missing', message: 'Enter an email address or choose phone or text.' } }, 400, headers);
  if ((preferredContact === 'phone' || preferredContact === 'text') && !phone) return json({ error: { code: 'preferred_contact_missing', message: 'Enter a phone number or choose email.' } }, 400, headers);
  const leadSalesState = deriveSalesState('', [], value.salesState);
  const leadIntent = ['purchase', 'refinance', 'investment'].includes(leadSalesState.goal) ? leadSalesState.goal : 'information';
  const timeline = leadSalesState.timeline === 'unknown' ? 'unsure' : leadSalesState.timeline;
  const structuredContext = buildStructuredLeadContext(leadSalesState, typeof requestBody.sourcePage === 'string' ? requestBody.sourcePage : undefined);
  const conversationSummary = JSON.stringify(structuredContext).slice(0, 1000);
  const args = { firstName, lastName: null, email: email || null, phone: phone || null, leadIntent, timeline, preferredContact, conversationSummary };
  const token = createConfirmationToken(secret, { name: 'create_or_update_website_lead', args, conversationId, toolCallId: `structured-lead-${randomUUID()}`, expiresAt: Date.now() + 10 * 60_000 });
  return json({ conversationId, message: 'Please review the privacy notice and confirm before I save this contact request.', sources: [], confirmation: { token, operation: 'create_or_update_website_lead', summary: `Save a contact request for ${firstName}` } }, 200, headers);
}

async function handleConfirmedAction(token: string, body: Record<string, unknown>, secret: string, conversationId: string, correlationId: string, sessionId: string, headers: Record<string, string>) {
  const confirmation = verifyConfirmationToken(secret, token);
  if (!confirmation || confirmation.conversationId !== conversationId || !MUTATING.has(confirmation.name)) return json({ error: { code: 'invalid_confirmation', message: 'That confirmation expired or is invalid.' } }, 400, headers);
  if (confirmation.name === 'create_or_update_website_lead' && body.consentAccepted !== true) return json({ error: { code: 'consent_required', message: 'Please review and accept the privacy notice before submitting contact information.' } }, 400, headers);
  // Confirmations previously recorded at a fixed sequence, which collided with
  // the conversation's first turn and was silently dropped by the idempotency
  // cache. Use the widget's running turn count so the confirmation and result
  // land after the visible conversation.
  const confirmationSequence = computeSequenceStart(body.turnCount, 0);
  const recordedConfirmation = await recordTurn(conversationId, correlationId, sessionId, '[CONFIRMED_ACTION]', 'The visitor confirmed the requested action.', [], { confirmed_tool: confirmation.name, confirmation_recorded: true }, undefined, confirmationSequence);
  if (!recordedConfirmation.ok) return json({ error: { code: 'conversation_unavailable', message: 'The request could not be safely recorded. Please try again.' } }, 502, headers);
  const result = await executeTool(confirmation.name, confirmation.args, conversationId, correlationId, body, confirmation.toolCallId);
  const answer = toolResultMessage(confirmation.name, result);
  await recordTurn(conversationId, correlationId, sessionId, '[ACTION_RESULT]', answer, [], { confirmed_tool: confirmation.name, tool_status: result.status }, undefined, confirmationSequence + 2);
  return json({ conversationId, message: answer, sources: [], toolResult: result }, result.ok ? 200 : 502, headers);
}

async function executeTool(name: string, args: Record<string, unknown>, conversationId: string, correlationId: string, requestBody: Record<string, unknown>, toolCallId: string) {
  const payload: Record<string, unknown> = { ...args, conversationId, correlationId, toolInvocationId: toolCallId };
  if (name === 'create_or_update_website_lead') {
    payload.consents = [{ type: 'privacy', status: requestBody.consentAccepted === true ? 'granted' : 'denied', policyVersion: POLICY_VERSION, consentedAt: requestBody.consentAccepted === true ? new Date().toISOString() : undefined }];
    payload.sourcePage = typeof requestBody.sourcePage === 'string' ? requestBody.sourcePage.slice(0, 500) : undefined;
    if (typeof payload.conversationSummary !== 'string') payload.conversationSummary = salesStateSummary(deriveSalesState('', [], requestBody.salesState));
  }
  return callLoanOs(name, payload, { idempotencyKey: `${conversationId}:${toolCallId}` });
}

async function recordTurn(conversationId: string, correlationId: string, sessionId: string, visitorMessage: string, assistantMessage: string, sources: string[], policyOutcome: Record<string, boolean | string>, modelRequestId: string | undefined, sequenceStart: number, knowledgeVersion?: string) {
  const sessionHash = createHash('sha256').update(sessionId).digest('hex');
  const sequence = Math.max(1, sequenceStart);
  return callLoanOs('record_conversation_turn', {
    conversationId, correlationId, sessionHash, visitorMessage, assistantMessage,
    sequenceStart: sequence, knowledgeVersion, sourceRefs: sources,
    policyOutcome, modelRequestId,
  }, { idempotencyKey: `${conversationId}:turn:${sequence}` });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const url = new URL(request.url);
  return origin === url.origin;
}

function parseConversation(value: unknown): Array<{ role: 'user' | 'assistant'; text: string }> {
  if (!Array.isArray(value)) return [];
  return value.slice(-16).flatMap((turn) => {
    if (!turn || typeof turn !== 'object') return [];
    const item = turn as Record<string, unknown>;
    if ((item.role !== 'user' && item.role !== 'assistant') || typeof item.text !== 'string' || item.text.length > 4000) return [];
    return [{ role: item.role, text: item.text }];
  });
}

function createConfirmationToken(secret: string, value: Record<string, unknown>): string {
  const body = Buffer.from(JSON.stringify(value), 'utf8').toString('base64url');
  const signature = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${signature}`;
}

function verifyConfirmationToken(secret: string, token: string): { name: string; args: Record<string, unknown>; conversationId: string; toolCallId: string; expiresAt: number } | null {
  const [body, supplied] = token.split('.');
  if (!body || !supplied) return null;
  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  const left = Buffer.from(expected); const right = Buffer.from(supplied);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!parsed.name || !parsed.args || !parsed.conversationId || !parsed.toolCallId || parsed.expiresAt < Date.now()) return null;
    return parsed;
  } catch { return null; }
}

export function toolResultMessage(name: string, result: { ok: boolean; status: string; data?: Record<string, unknown>; error?: { message: string } }): string {
  if (!result.ok) return result.error?.message || 'That action could not be completed. I have not claimed it succeeded.';
  if (name === 'send_application_link' && typeof result.data?.applicationUrl === 'string') return `Here is the approved secure application link: ${result.data.applicationUrl}`;
  if (name === 'create_or_update_website_lead') {
    const saved = result.status === 'existing' ? 'Your request was added to the existing contact record.' : 'Your contact request was saved.';
    if (result.data?.ownerNotified !== true) return `${saved} The email notification could not be sent, so Adam may not see it immediately. Please call or text (512) 956-6010.`;
    if (result.data?.visitorAcknowledged === true) return `${saved} Adam was notified, and a confirmation email is on its way.`;
    return `${saved} Adam was notified, but the confirmation email could not be sent.`;
  }
  if (name === 'create_follow_up_task') return 'A follow-up task was created for Adam.';
  if (name === 'schedule_consultation') return 'Your consultation was scheduled.';
  if (name === 'escalate_to_adam') return 'A follow-up task was created for Adam.';
  return 'The requested operation completed.';
}

function confirmationPrompt(name: string): string {
  if (name === 'create_or_update_website_lead') return 'I can save your contact request for Adam. Please review the privacy notice and confirm before I do that.';
  if (name === 'schedule_consultation') return 'I can request that appointment. Please confirm the displayed time and contact details first.';
  if (name === 'escalate_to_adam') return 'I can create a follow-up task for Adam. Would you like me to do that?';
  return 'This action changes a record. Please confirm before I continue.';
}

function safeActionSummary(name: string, args: Record<string, unknown>): string {
  if (name === 'create_or_update_website_lead') return `Save a contact request for ${String(args.firstName || 'this visitor')}`;
  if (name === 'schedule_consultation') return `Request a consultation at ${String(args.startAt || 'the selected time')}`;
  if (name === 'escalate_to_adam') return 'Create a follow-up task for Adam';
  return 'Create a follow-up task';
}

function parseSourceRef(value: string) {
  const [file, section = ''] = value.split('#');
  return { file, section };
}
function isGreeting(value: string) { return /^(?:hi|hello|hey|howdy|hi there|hey there|hello there|good (?:morning|afternoon|evening))[!. ]*$/i.test(value); }
const allowResourceRecommendation = allowsResourceRecommendation;
function validUuid(value: unknown) { return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value); }
function boundedText(value: unknown, max: number, required = true) {
  if (value == null || value === '') return required ? null : undefined;
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean && clean.length <= max && !/[\u0000-\u001F]/.test(clean) ? clean : null;
}
function json(body: unknown, status: number, headers: Record<string, string>) { return new Response(JSON.stringify(body), { status, headers }); }

export const config: Config = { path: '/api/mortgage-assistant', method: ['GET', 'POST'] };
