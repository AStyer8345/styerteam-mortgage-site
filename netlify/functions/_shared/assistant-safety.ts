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
  /\b(?:guarantee|guaranteed|definitely|certainly)\b.{0,50}\b(?:rate|payment|closing|approval|qualification)\b/i,
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

export function safeUnsupportedNotice(): string {
  return "I don't have enough approved information to answer that accurately. I can help you connect with Adam for a reviewed answer.";
}
