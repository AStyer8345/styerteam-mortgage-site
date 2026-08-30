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

// Transcript sequence numbers must stay unique for the life of a conversation.
// The prior-turn list the browser sends is capped, so it cannot be the source of
// truth; the widget reports its full running turn count instead and the capped
// list is only a fallback for clients that omit it.
export function computeSequenceStart(reportedTurnCount: unknown, priorTurnCount: number): number {
  const fallback = Math.max(0, priorTurnCount) + 1;
  if (typeof reportedTurnCount !== 'number' || !Number.isInteger(reportedTurnCount)) return fallback;
  if (reportedTurnCount < 0 || reportedTurnCount > 4000) return fallback;
  return Math.max(reportedTurnCount, priorTurnCount) + 1;
}

export function fixedConversationReply(message: string): { message: string; suggestedReplies?: string[] } | null {
  const value = normalize(message);
  if (/\b(?:who does adam work for|where does adam work|who is adam (?:with|affiliated with)|what (?:company|lender|brokerage) does adam work for|what (?:company|lender|brokerage) is adam with|what (?:company|mortgage company|brokerage) is this|who is your (?:company|brokerage)|who employs adam|adam s employer|is this hypersmart(?: home loans)?)\b/.test(value)) {
    return {
      message: 'Adam Styer is a Texas-licensed mortgage loan originator with Kyber Mortgage Corporation, doing business as HyperSmart Home Loans. Adam’s NMLS number is 513013, and the company NMLS number is 2653540. He works as a mortgage broker, so he can compare options from multiple wholesale lenders rather than offering only one lender’s products.',
      suggestedReplies: ['What loans do you offer?', 'How do I contact Adam?'],
    };
  }
  if (/^(?:who is adam|tell me about adam|who is adam styer|is adam a (?:broker|lender|loan officer|mortgage broker))$/.test(value)) {
    return {
      message: 'Adam Styer is a Texas-licensed mortgage loan originator and mortgage broker with Kyber Mortgage Corporation dba HyperSmart Home Loans. His NMLS number is 513013. He helps Texas borrowers compare mortgage strategies and loan options, including conventional, government-backed, self-employed, investor, and other complex-income scenarios.',
      suggestedReplies: ['What loans do you offer?', 'How do I contact Adam?'],
    };
  }
  if (/\b(?:what is|whats|what s|give me|verify|show me).{0,18}(?:adam s|adams|company|your) nmls\b|\b(?:nmls|license number).{0,18}(?:adam|company|yours?)\b/.test(value)) {
    return {
      message: 'Adam Styer’s NMLS number is 513013. Kyber Mortgage Corporation dba HyperSmart Home Loans has NMLS number 2653540. Adam is licensed to help with Texas mortgage scenarios through this website.',
    };
  }
  if (/\b(?:what states? (?:does|can) adam|where (?:does|can) adam (?:lend|work|do loans)|are you licensed|do you lend outside texas|what areas? do you serve)\b/.test(value)) {
    return {
      message: 'This website assistant and Adam’s public mortgage offering here are set up for Texas properties. I won’t imply that Adam can originate a loan in another state. For a Texas property, tell me the city, county, or ZIP code and I can help with the next step.',
    };
  }
  if (/^(?:thanks|thank you|thanks so much|thank you so much|ty|appreciate it|that helps|that helped|great thanks|perfect thanks)$/.test(value)) {
    return {
      message: "You're welcome—happy to help. If anything else comes up while you're thinking it over, just ask. And whenever you want real numbers for your situation, Adam or his team can take a look.",
    };
  }
  if (/^(?:bye|goodbye|good bye|see you|thats all|that s all|no thats it|no that s it|im good|i m good|im all set|i m all set)$/.test(value)) {
    return {
      message: "Sounds good. I'll be right here if another question comes up—good luck with everything!",
    };
  }
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
