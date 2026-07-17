import type { ConversationTurn } from './conversation-context.ts';

export type SalesConversationState = {
  goal: 'purchase' | 'refinance' | 'investment' | 'explore' | 'unknown';
  propertyUse: 'primary' | 'second_home' | 'investment' | 'unknown';
  timeline: 'within_30_days' | '31_to_90_days' | 'more_than_90_days' | 'unsure' | 'unknown';
  concern: 'credit' | 'income' | 'payment' | 'rates' | 'down_payment' | 'property_transition' | 'documents' | 'unknown';
  location: string | null;
  intentScore: number;
  stage: 'discover' | 'educate' | 'evaluate' | 'ready';
};

export const EMPTY_SALES_STATE: SalesConversationState = {
  goal: 'unknown', propertyUse: 'unknown', timeline: 'unknown', concern: 'unknown', location: null, intentScore: 0, stage: 'discover',
};

export function deriveSalesState(message: string, conversation: ConversationTurn[], supplied: unknown): SalesConversationState {
  const base = parseSuppliedState(supplied);
  const visitorText = [...conversation.filter((turn) => turn.role === 'user').map((turn) => turn.text), message].join(' ').toLowerCase();
  const state = { ...base };

  if (/\b(?:buy|buying|purchase|purchasing|homebuyer)\b/.test(visitorText)) state.goal = 'purchase';
  if (/\b(?:refi|refinance|refinancing|cash.?out)\b/.test(visitorText)) state.goal = 'refinance';
  if (/\b(?:investment property|investor|dscr|rental property)\b/.test(visitorText)) state.goal = 'investment';
  if (/\b(?:primary|live in|owner occupied)\b/.test(visitorText)) state.propertyUse = 'primary';
  if (/\bsecond home\b/.test(visitorText)) state.propertyUse = 'second_home';
  if (/\b(?:investment property|rental property|dscr)\b/.test(visitorText)) state.propertyUse = 'investment';
  if (/\b(?:asap|right away|under contract|this month|within 30|next 30)\b/.test(visitorText)) state.timeline = 'within_30_days';
  else if (/\b(?:31.?90|60 days|90 days|two months|three months)\b/.test(visitorText)) state.timeline = '31_to_90_days';
  else if (/\b(?:more than 90|later this year|next year|just planning|not ready)\b/.test(visitorText)) state.timeline = 'more_than_90_days';
  if (/\b(?:credit|fico|score|bankruptcy|foreclosure)\b/.test(visitorText)) state.concern = 'credit';
  else if (/\b(?:self employed|tax return|income|1099|bank statement)\b/.test(visitorText)) state.concern = 'income';
  else if (/\b(?:afford|payment|monthly budget)\b/.test(visitorText)) state.concern = 'payment';
  else if (/\b(?:rate|rates|apr|pricing)\b/.test(visitorText)) state.concern = 'rates';
  else if (/\b(?:down payment|cash to close|closing cost)\b/.test(visitorText)) state.concern = 'down_payment';
  else if (/\b(?:buy before|sell my|bridge|current home)\b/.test(visitorText)) state.concern = 'property_transition';
  else if (/\b(?:documents|paperwork|paystub|w-2|w2)\b/.test(visitorText)) state.concern = 'documents';

  const stateMatch = visitorText.match(/\b(?:in|moving to|property in)\s+(texas|tx|california|ca|florida|florida|colorado|georgia|tennessee|arizona|north carolina|south carolina|virginia)\b/i);
  if (stateMatch) state.location = stateMatch[1].toUpperCase() === 'TX' ? 'Texas' : titleCase(stateMatch[1]);

  let score = 0;
  if (state.goal !== 'unknown' && state.goal !== 'explore') score += 2;
  if (state.propertyUse !== 'unknown') score += 1;
  if (state.timeline !== 'unknown' && state.timeline !== 'unsure') score += state.timeline === 'within_30_days' ? 3 : 2;
  if (state.concern !== 'unknown') score += 2;
  if (state.location) score += 1;
  if (/\b(?:pre.?approv|apply|application|offer|under contract|call me|contact me|talk to adam|text me)\b/.test(visitorText)) score += 4;
  state.intentScore = Math.min(10, Math.max(base.intentScore, score));
  state.stage = state.intentScore >= 7 ? 'ready' : state.intentScore >= 4 ? 'evaluate' : state.intentScore >= 2 ? 'educate' : 'discover';
  return state;
}

export function salesStateSummary(state: SalesConversationState): string {
  return [
    state.goal !== 'unknown' ? `Goal: ${state.goal}` : null,
    state.propertyUse !== 'unknown' ? `Property use: ${state.propertyUse.replace('_', ' ')}` : null,
    state.timeline !== 'unknown' ? `Timeline: ${state.timeline.replaceAll('_', ' ')}` : null,
    state.concern !== 'unknown' ? `Primary concern: ${state.concern.replace('_', ' ')}` : null,
    state.location ? `Location: ${state.location}` : null,
    `Engagement stage: ${state.stage}`,
  ].filter(Boolean).join('; ');
}

export function salesNextStepReply(message: string, state: SalesConversationState): { message: string; suggestedReplies: string[] } | null {
  if (!/\b(?:what should i do next|what do i do next|next step|where do i start|how do i start|ready to move forward)\b/i.test(message)) return null;
  if (state.stage === 'ready') {
    const context = state.concern !== 'unknown' ? `, especially with the ${state.concern.replace('_', ' ')} question you mentioned` : '';
    return {
      message: `The best next step is a quick scenario review${context}. That lets Adam or his team look at the full picture securely and tell you which path is worth pursuing before you make a commitment. Use “Have Adam contact me” below and the form will already remember the goal and timeline you shared.`,
      suggestedReplies: [],
    };
  }
  if (state.goal === 'unknown') return { message: 'Let’s start with the goal so I can point you in the right direction. Are you buying, refinancing, or looking at an investment property?', suggestedReplies: ['Buying a home', 'Refinancing', 'Investment property'] };
  if (state.timeline === 'unknown') return { message: 'The next useful step is to match the advice to your timing. Roughly when are you hoping to move forward?', suggestedReplies: ['Within 30 days', '31–90 days', 'More than 90 days'] };
  return { message: 'The next useful step is to identify the biggest question standing between you and a decision. What are you most concerned about right now?', suggestedReplies: ['Monthly payment', 'Credit', 'Income documentation'] };
}

function parseSuppliedState(value: unknown): SalesConversationState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { ...EMPTY_SALES_STATE };
  const item = value as Record<string, unknown>;
  const state = { ...EMPTY_SALES_STATE };
  if (['purchase', 'refinance', 'investment', 'explore', 'unknown'].includes(String(item.goal))) state.goal = item.goal as SalesConversationState['goal'];
  if (['primary', 'second_home', 'investment', 'unknown'].includes(String(item.propertyUse))) state.propertyUse = item.propertyUse as SalesConversationState['propertyUse'];
  if (['within_30_days', '31_to_90_days', 'more_than_90_days', 'unsure', 'unknown'].includes(String(item.timeline))) state.timeline = item.timeline as SalesConversationState['timeline'];
  if (['credit', 'income', 'payment', 'rates', 'down_payment', 'property_transition', 'documents', 'unknown'].includes(String(item.concern))) state.concern = item.concern as SalesConversationState['concern'];
  // The state is serialized into model instructions, so a client-supplied
  // location must stay a plain place name — never free-form text.
  if (typeof item.location === 'string' && /^[A-Za-z][A-Za-z .'-]{1,39}$/.test(item.location)) state.location = item.location;
  if (Number.isInteger(item.intentScore)) state.intentScore = Math.min(10, Math.max(0, Number(item.intentScore)));
  return state;
}

function titleCase(value: string) { return value.replace(/\b\w/g, (letter) => letter.toUpperCase()); }
