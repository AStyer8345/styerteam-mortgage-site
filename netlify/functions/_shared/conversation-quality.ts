import type { ConversationTurn } from './conversation-context.ts';

export type ConversationQuality = {
  score: number;
  flags: string[];
  visitorMessages: number;
  assistantMessages: number;
};

export function evaluateConversation(turns: ConversationTurn[]): ConversationQuality {
  const flags: string[] = [];
  const visitor = turns.filter((turn) => turn.role === 'user');
  const assistant = turns.filter((turn) => turn.role === 'assistant');
  const assistantTexts = assistant.map((turn) => turn.text.trim());

  if (assistantTexts.some((text) => (text.match(/\?/g) || []).length > 1)) flags.push('multiple_questions');
  if (new Set(assistantTexts.map(normalize)).size < assistantTexts.length) flags.push('repeated_answer');
  if (assistantTexts.some((text) => /not enough approved information/i.test(text))) flags.push('generic_fallback');
  if (assistantTexts.filter((text) => /Adam or (?:his|someone on his) team/i.test(text)).length > Math.max(1, Math.ceil(assistantTexts.length / 2))) flags.push('overuses_handoff');
  if (assistantTexts.some((text) => text.length > 2200)) flags.push('overlong_answer');
  if (visitor.length >= 3 && assistant.length >= 3 && !assistantTexts.some((text) => /calculator|application|contact|text Adam|review your/i.test(text))) flags.push('no_next_step');

  return { score: Math.max(0, 100 - flags.length * 15), flags, visitorMessages: visitor.length, assistantMessages: assistant.length };
}

function normalize(value: string) { return value.toLowerCase().replace(/\s+/g, ' ').trim(); }
