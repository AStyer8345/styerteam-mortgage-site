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

  if (/\b(?:afford|affordability|price range|how much house|home budget)\b/.test(normalized)) {
    return "That’s a smart place to start. The useful number isn’t just the most a lender might approve—it’s a payment that still leaves room for the rest of your life. The affordability calculator can help you test a price range using income, monthly debts, down payment, taxes, and insurance.\n\nWhat monthly payment would feel comfortable to you, before utilities and maintenance?";
  }

  if (/\b(?:rate|rates|interest|apr)\b/.test(normalized)) {
    return "Great question—and honestly, rates are a moving target. They can change during the day, so tossing out one number here could be stale before you finish reading it.\n\nThe rate you’d actually see depends on things like the loan type, whether it’s a home or investment property, your down payment or equity, your general credit profile, and whether you’re buying or refinancing. Share those basics—nothing sensitive—and I can help you make sense of what drives the quote. For a real today-number, Adam or his team can price out the options with you.";
  }

  if (/\b(?:dti|debt.to.income|debt income)\b/.test(normalized)) {
    return "DTI is the percentage of qualifying gross monthly income used for the new housing payment and other counted debts. Conventional limits depend on the agency path and underwriting result, so there isn't one number that works for every file; lower DTI generally gives the application more room.\n\nIs this for a home you plan to live in or an investment property?";
  }

  if (/\b(?:credit|fico|score)\b/.test(normalized)) {
    return "Credit score matters, but it isn't the whole approval decision. The useful benchmark depends on the loan program, and lenders can set standards above an agency baseline; payment history, balances, down payment, and the full underwriting result matter too.\n\nWhich program are you considering—conventional, FHA, or VA?";
  }

  if (/\b(?:self employed|self employment|tax returns?|bank statements?|business income)\b/.test(normalized)) {
    return "Self-employed income often needs a different look than a W-2 salary. Depending on the program, the review may use tax returns and business cash flow, or explore alternatives such as bank statements, a profit-and-loss statement, assets, or rental-property cash flow.\n\nWill this be your primary home or an investment property?";
  }

  return "I don't want to bluff my way through that one. I can still help narrow it down or point you to the right next step without collecting private financial details.\n\nWhat outcome are you hoping for?";
}
