const SENSITIVE_RULES: Array<{ type: string; pattern: RegExp }> = [
  { type: 'routing_number', pattern: /\b\d{9}\b/g },
  { type: 'ssn', pattern: /\b(?!000|666|9\d\d)\d{3}[- .]\d{2}[- .]\d{4}\b/g },
  { type: 'full_dob', pattern: /\b(?:0?[1-9]|1[0-2])[\/-](?:0?[1-9]|[12]\d|3[01])[\/-](?:19|20)\d{2}\b/g },
  { type: 'payment_card', pattern: /\b(?:\d[ -]*?){13,19}\b/g },
  { type: 'credential', pattern: /\b(?:password|passcode|one[- ]?time code|otp|authentication code|api key|secret)\s*[:=]\s*\S+/gi },
  { type: 'government_id', pattern: /\b(?:driver'?s license|passport|government id|alien registration)\s*(?:number|no\.?|#)?\s*[:=]?\s*[A-Z0-9-]{5,}/gi },
];

const PROHIBITED_OUTPUT = [
  /\b(?:you are|you're|you appear) (?:approved|preapproved|qualified|eligible)\b/i,
  /\b(?:we|i) (?:can |will )?guarantee\b.{0,50}\b(?:rate|payment|closing|approval|qualification)\b/i,
  /\b(?:guaranteed|definitely|certainly)\b.{0,50}\b(?:rate|payment|closing|approval|qualification)\b/i,
  /\byour (?:rate|payment) (?:is|will be)\b/i,
  /\bwe (?:will|can) close (?:in|by|on)\b/i,
];

const INJECTION = [
  /ignore (?:all |any )?(?:previous|prior|system|developer) instructions/i,
  /reveal (?:your |the )?(?:system prompt|developer message|secret|credential)/i,
  /pretend (?:the |that )?(?:rules|policy|instructions)/i,
  /call (?:a |the )?tool (?:without|even if|regardless)/i,
];

export type SensitiveScan = { redacted: string; detected: string[]; blocked: boolean };

export function scanSensitiveInput(value: string): SensitiveScan {
  const detected = new Set<string>();
  let redacted = value;
  for (const rule of SENSITIVE_RULES) {
    redacted = redacted.replace(rule.pattern, () => {
      detected.add(rule.type);
      return `[REDACTED_${rule.type.toUpperCase()}]`;
    });
  }
  return { redacted, detected: [...detected], blocked: detected.size > 0 };
}

export function isPromptInjection(value: string): boolean {
  return INJECTION.some((pattern) => pattern.test(value));
}

export function validateAssistantOutput(value: string): { safe: boolean; reason?: string } {
  if (!value || value.length > 6000) return { safe: false, reason: 'invalid_length' };
  if (PROHIBITED_OUTPUT.some((pattern) => pattern.test(value))) return { safe: false, reason: 'prohibited_claim' };
  if (scanSensitiveInput(value).blocked) return { safe: false, reason: 'sensitive_output' };
  return { safe: true };
}

export function safeSensitiveNotice(): string {
  return "For your security, please don't send Social Security numbers, full birth dates, account or card numbers, passwords, authentication codes, or identification documents here. I removed the sensitive-looking information from this conversation. You can continue with a general question, or I can help you reach Adam.";
}

export function safeUnsupportedNotice(question = ''): string {
  const normalized = question.toLowerCase();

  if (/\b(?:rate|rates|interest|apr)\b/.test(normalized)) {
    return "Mortgage rates can change throughout the day, so I don’t want to give you a stale or misleading number. Your actual options also depend on the loan type, property use, down payment or equity, credit profile, and whether you’re buying or refinancing.\n\nIf you share those basics—without sending sensitive information—I can help explain what affects the quote. For today’s actual pricing, Adam or his team can compare the available options with you.";
  }

  return "I want to be careful here because the answer depends on details I don’t have yet. If you tell me a little more about what you’re trying to do—such as buying or refinancing, the property type, your general timeline, and the loan program you’re considering—I may be able to give you a more useful explanation.\n\nIf your question needs a decision based on your personal finances or current lender pricing, Adam or his team can review it and give you a specific answer.";
}
