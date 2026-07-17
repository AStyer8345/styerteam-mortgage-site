export type PolicyCheck = { safe: true } | { safe: false; reason: string };

// Discovery language is deliberately narrower than grounded mortgage answers.
// The director may collect or clarify facts, but it may not smuggle a product,
// calculation, or conversion step into the conversation.
export function checkDiscoveryLanguage(text: string, requiredQuestion: string | null): PolicyCheck {
  if (!text.trim()) return { safe: false, reason: 'empty_response' };
  const questions = (text.match(/\?/g) || []).length;
  if (requiredQuestion && questions !== 1) return { safe: false, reason: 'required_single_question_missing' };
  if (!requiredQuestion && questions > 0) return { safe: false, reason: 'unplanned_question' };
  if (/\b(?:FHA|VA loan|USDA|conventional loan|jumbo|DSCR|bank.?statement loan|non.?QM)\b/i.test(text)) return { safe: false, reason: 'ungated_product' };
  if (/\b(?:calculator|calculate|application|apply now|contact Adam|call Adam|book a call|schedule a call)\b/i.test(text)) return { safe: false, reason: 'ungated_resource_or_cta' };
  if (/\b\d+(?:\.\d+)?%/.test(text)) return { safe: false, reason: 'unsupported_numeric_claim' };
  return { safe: true };
}

export function allowsResourceRecommendation(message: string): boolean {
  return /\b(?:calculator|calculate|estimate (?:my|the|a)|run the numbers|what would (?:my|the) payment|how much (?:house|home) can i afford|break.?even calculator|dscr calculator)\b/i.test(message);
}
