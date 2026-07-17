export type ConversationTurn = { role: 'user' | 'assistant'; text: string };

const SHORT_CONTEXT_REPLIES = new Set([
  'buy', 'buying', 'purchase', 'purchasing', 'refi', 'refinance', 'refinancing',
  'primary', 'primary residence', 'second home', 'investment', 'investment property',
  'yes', 'no', 'not sure', 'unsure', 'soon', 'asap', 'this year', 'next year',
]);

export function buildContextualQuery(message: string, conversation: ConversationTurn[]): string {
  const current = normalize(message);
  if (!isContextualReply(current)) return message;

  const priorVisitorMessages = conversation
    .filter((turn) => turn.role === 'user')
    .map((turn) => turn.text.trim())
    .filter((text) => text.length >= 8 && !isContextualReply(normalize(text)))
    .slice(-2);

  if (!priorVisitorMessages.length) return message;
  return `${priorVisitorMessages.join(' ')} Follow-up answer: ${message}`;
}

export function fixedConversationReply(message: string): { message: string; suggestedReplies?: string[] } | null {
  const value = normalize(message);
  if (/^(are you|r u) (a )?(bot|robot|ai)$/.test(value) || /^(is this|am i talking to) (a )?(bot|ai)$/.test(value)) {
    return {
      message: "I am—I'm Adam's AI mortgage assistant. I can explain general mortgage topics, help you think through options, point you to the right calculator, or help you reach Adam. I won't pretend to approve a loan or quote a live rate, but I can usually get you pointed in the right direction.\n\nWhat are you trying to figure out?",
      suggestedReplies: ['Buying a home', 'Refinancing', 'Investment property'],
    };
  }
  if (/^(what can you do|how can you help|help)$/.test(value)) {
    return {
      message: "I can help with loan programs, credit and DTI basics, down payments, self-employed income, investment-property options, refinancing, and how rates and closing costs work. I can also point you to a calculator or help you connect with Adam when your exact numbers need a closer look.\n\nWhere would you like to start?",
      suggestedReplies: ['How much can I afford?', 'Compare loan programs', 'Ask about credit'],
    };
  }
  return null;
}

function isContextualReply(value: string): boolean {
  if (SHORT_CONTEXT_REPLIES.has(value)) return true;
  const words = value.split(/\s+/).filter(Boolean);
  return words.length <= 4 && value.length <= 36 && !/[?]/.test(value);
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9% ]+/g, ' ').replace(/\s+/g, ' ').trim();
}
