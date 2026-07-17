import type { ConversationTurn } from './conversation-context.ts';

export type SalesConversationState = {
  goal: 'purchase' | 'refinance' | 'investment' | 'explore' | 'unknown';
  propertyUse: 'primary' | 'second_home' | 'investment' | 'unknown';
  timeline: 'within_30_days' | '31_to_90_days' | 'more_than_90_days' | 'unsure' | 'unknown';
  concern: 'credit' | 'income' | 'payment' | 'rates' | 'down_payment' | 'property_transition' | 'documents' | 'unknown';
  location: string | null;
  intentScore: number;
  stage: 'discover' | 'educate' | 'evaluate' | 'ready';
  shoppingStage: 'exploring' | 'price_range' | 'actively_shopping' | 'property_identified' | 'under_contract' | 'unknown';
  pendingQuestion: 'shopping_stage' | 'property_use' | 'timeline' | 'price_range' | 'cash_strategy' | 'cash_amount' | 'priority' | 'refinance_goal' | 'investment_goal' | null;
  purchasePrice: number | null;
  cashAvailable: number | null;
  priority: 'preserve_cash' | 'lowest_payment' | 'lowest_total_cost' | 'strongest_offer' | 'compare_options' | 'unknown';
};

export const EMPTY_SALES_STATE: SalesConversationState = {
  goal: 'unknown', propertyUse: 'unknown', timeline: 'unknown', concern: 'unknown', location: null, intentScore: 0, stage: 'discover',
  shoppingStage: 'unknown', pendingQuestion: null, purchasePrice: null, cashAvailable: null, priority: 'unknown',
};

export function deriveSalesState(message: string, conversation: ConversationTurn[], supplied: unknown): SalesConversationState {
  const base = parseSuppliedState(supplied);
  const visitorText = [...conversation.filter((turn) => turn.role === 'user').map((turn) => turn.text), message].join(' ').toLowerCase();
  const state = { ...base };
  const current = message.trim().toLowerCase();
  let followUpPending: SalesConversationState['pendingQuestion'] = null;

  // Short replies belong to the question the assistant just asked. This is
  // intentionally resolved before broad keyword inference so "more than three
  // months" and "primary residence" advance the conversation instead of
  // falling into generic retrieval.
  if (base.pendingQuestion === 'shopping_stage') {
    if (/under contract/.test(current)) state.shoppingStage = 'under_contract';
    else if (/(found|specific|particular|have|identified).*(home|house|property)|have an address/.test(current)) state.shoppingStage = 'property_identified';
    else if (/looking|shopping|touring|realtor/.test(current)) state.shoppingStage = 'actively_shopping';
    else if (/price|range|budget|around \$|\$[\d,.]+/.test(current)) state.shoppingStage = 'price_range';
    else if (/explor|figuring|starting|not sure|early/.test(current)) state.shoppingStage = 'exploring';
  }
  if (base.pendingQuestion === 'property_use') {
    if (/primary|live in|my home/.test(current)) state.propertyUse = 'primary';
    else if (/second|vacation/.test(current)) state.propertyUse = 'second_home';
    else if (/investment|rental/.test(current)) state.propertyUse = 'investment';
  }
  if (base.pendingQuestion === 'timeline') {
    if (/asap|right away|under contract|this month|within (?:30|a month)/.test(current)) state.timeline = 'within_30_days';
    else if (/31|60|90|two months|three months|1.?3 months/.test(current)) state.timeline = '31_to_90_days';
    else if (/more than (?:3|three) months|over (?:3|three) months|later this year|next year|no rush/.test(current)) state.timeline = 'more_than_90_days';
    else if (/not sure|unsure|don't know/.test(current)) state.timeline = 'unsure';
  }
  const money = parseMoney(current);
  if (base.pendingQuestion === 'price_range' && money) state.purchasePrice = money;
  if (base.pendingQuestion === 'cash_strategy') {
    if (money) state.cashAvailable = money;
    else if (/amount in mind|know.*amount/.test(current)) followUpPending = 'cash_amount';
    else if (/preserve|keep.*cash|liquid/.test(current)) state.priority = 'preserve_cash';
    else if (/compare|options|not sure/.test(current)) state.priority = 'compare_options';
  }
  if (base.pendingQuestion === 'cash_amount') {
    if (money) state.cashAvailable = money;
    else followUpPending = 'cash_amount';
  }
  if (base.pendingQuestion === 'priority') {
    if (/preserve|liquid|keep.*cash/.test(current)) state.priority = 'preserve_cash';
    else if (/lowest.*payment|payment down/.test(current)) state.priority = 'lowest_payment';
    else if (/total cost|least interest|long.?term/.test(current)) state.priority = 'lowest_total_cost';
    else if (/strong.*offer|competitive/.test(current)) state.priority = 'strongest_offer';
    else if (/compare|show.*options|not sure/.test(current)) state.priority = 'compare_options';
  }
  if (base.pendingQuestion === 'refinance_goal') {
    if (/cash|debt|renovat|equity/.test(current)) state.concern = 'down_payment';
    else if (/payment|monthly|cash flow/.test(current)) state.concern = 'payment';
    else if (/rate|interest/.test(current)) state.concern = 'rates';
  }
  if (base.pendingQuestion === 'investment_goal') {
    if (/cash flow|payment|income/.test(current)) state.concern = 'payment';
    else if (/leverage|cash|down/.test(current)) state.concern = 'down_payment';
    else if (/document|tax|income/.test(current)) state.concern = 'income';
  }

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
  state.pendingQuestion = followUpPending;
  return state;
}

export type GuidedConversationReply = { message: string; suggestedReplies: string[]; salesState: SalesConversationState };

export function guidedConversationReply(message: string, state: SalesConversationState, previousPending: SalesConversationState['pendingQuestion'] = null): GuidedConversationReply | null {
  const text = message.trim();
  const isQuestion = /\?$/.test(text) || /^(?:what|why|when|where|who|how|can|could|would|should|do|does|did|is|are|am|will|tell me|explain)\b/i.test(text);
  const isInformationRequest = isQuestion || /\b(?:want|need|trying) to (?:know|understand|figure out|learn)|\b(?:minimum|maximum|max|credit score|dti|rate|rates|down payment|closing cost|qualify|qualification|eligible|eligibility)\b/i.test(text);
  const isGoalChoice = /^(?:buy(?:ing)?(?: a home)?|purchase|refinanc(?:e|ing)|investment property)$/i.test(text);
  const isPendingAnswer = previousPending !== null && !isInformationRequest && text.length <= 160;
  if (isInformationRequest && !isGoalChoice) return null;
  // A goal choice that answers a topical question (self-employed income,
  // credit, rates) belongs to the knowledge path so the visitor's concern
  // stays the subject; the director only takes over concern-free conversations.
  if (isGoalChoice && state.concern !== 'unknown') return null;
  if (!isGoalChoice && !isPendingAnswer) return null;

  const next = { ...state };
  if (state.pendingQuestion === 'cash_amount') {
    next.pendingQuestion = 'cash_amount';
    return reply('Sure—roughly how much cash are you considering using? A ballpark is enough.', [], next);
  }
  if (state.goal === 'refinance' && state.concern === 'unknown') {
    next.pendingQuestion = 'refinance_goal';
    return reply('What would you want a refinance to accomplish?', ['Lower my monthly payment', 'Access equity or consolidate debt', 'Pay the home off sooner', 'Compare my options'], next);
  }
  if (state.goal === 'refinance' && state.propertyUse === 'unknown') {
    next.pendingQuestion = 'property_use';
    return reply('How do you use the property today?', ['My primary residence', 'A second home', 'An investment property'], next);
  }
  if (state.goal === 'investment' && state.concern === 'unknown') {
    next.pendingQuestion = 'investment_goal';
    return reply('What matters most for this investment—cash flow, preserving capital, easier documentation, or building the portfolio quickly?', ['Monthly cash flow', 'Preserve more cash', 'Simpler income documentation', 'Portfolio growth'], next);
  }
  if (state.goal === 'investment' && state.shoppingStage === 'unknown') {
    next.pendingQuestion = 'shopping_stage';
    return reply('Where are you with the property itself?', ['I have a property identified', 'I’m actively looking', 'I’m still exploring'], next);
  }
  if (state.goal === 'purchase' && state.shoppingStage === 'unknown') {
    next.pendingQuestion = 'shopping_stage';
    return reply("Absolutely. Let’s start with where you are—not with a loan program. Are you already looking at a particular home or price range, or are you still figuring out what makes sense?", ['I have a property in mind', 'I know my price range', 'I’m still figuring it out'], next);
  }
  if (state.goal === 'purchase' && state.propertyUse === 'unknown') {
    next.pendingQuestion = 'property_use';
    return reply('Got it. Will this be a home you plan to live in, a second home, or an investment property?', ['My primary residence', 'A second home', 'An investment property'], next);
  }
  if (state.goal === 'purchase' && state.purchasePrice === null && ['price_range', 'property_identified', 'actively_shopping', 'under_contract'].includes(state.shoppingStage)) {
    next.pendingQuestion = 'price_range';
    return reply("That helps. What purchase price or general range are you considering? A rough number is plenty—I’m just trying to frame the right tradeoffs.", [], next);
  }
  if (state.goal === 'purchase' && state.timeline === 'unknown') {
    next.pendingQuestion = 'timeline';
    return reply('And how soon do you realistically want to make a move?', ['Within 30 days', '1–3 months', 'More than 3 months from now', 'I’m not sure yet'], next);
  }
  if (state.goal === 'purchase' && state.purchasePrice !== null && state.cashAvailable === null && state.priority === 'unknown') {
    next.pendingQuestion = 'cash_strategy';
    return reply("Have you thought about roughly how much cash you’d want to use, or would you rather compare a few cash-versus-payment options? There isn’t one universally “right” down payment.", ['I have an amount in mind', 'I want to preserve cash', 'I’d like to compare options'], next);
  }
  if (state.cashAvailable !== null && state.priority === 'unknown') {
    next.pendingQuestion = 'priority';
    return reply('That gives us meaningful flexibility. Which matters most to you: keeping more cash available, getting the monthly payment down, minimizing long-term cost, or seeing a side-by-side comparison?', ['Preserve more cash', 'Lower monthly payment', 'Lowest total cost', 'Compare the options'], next);
  }
  if (isGoalChoice || isPendingAnswer) {
    return reply("Perfect—that gives me a better picture. What would be most useful to work through next?", ['Monthly payment strategy', 'Cash and down payment', 'Loan options', 'What I should do next'], next);
  }
  return null;
}

function reply(message: string, suggestedReplies: string[], salesState: SalesConversationState): GuidedConversationReply {
  return { message, suggestedReplies, salesState };
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
  if (['exploring', 'price_range', 'actively_shopping', 'property_identified', 'under_contract', 'unknown'].includes(String(item.shoppingStage))) state.shoppingStage = item.shoppingStage as SalesConversationState['shoppingStage'];
  if (['shopping_stage', 'property_use', 'timeline', 'price_range', 'cash_strategy', 'cash_amount', 'priority', 'refinance_goal', 'investment_goal'].includes(String(item.pendingQuestion))) state.pendingQuestion = item.pendingQuestion as SalesConversationState['pendingQuestion'];
  if (typeof item.purchasePrice === 'number' && item.purchasePrice > 0 && item.purchasePrice < 100_000_000) state.purchasePrice = item.purchasePrice;
  if (typeof item.cashAvailable === 'number' && item.cashAvailable >= 0 && item.cashAvailable < 100_000_000) state.cashAvailable = item.cashAvailable;
  if (['preserve_cash', 'lowest_payment', 'lowest_total_cost', 'strongest_offer', 'compare_options', 'unknown'].includes(String(item.priority))) state.priority = item.priority as SalesConversationState['priority'];
  return state;
}

function parseMoney(value: string): number | null {
  const match = value.match(/\$?([\d,.]+)\s*(k|m|thousand|million)?\b/i);
  if (!match) return null;
  const suffix = match[2]?.toLowerCase();
  const amount = Number(match[1].replaceAll(',', '')) * (suffix === 'm' || suffix === 'million' ? 1_000_000 : suffix === 'k' || suffix === 'thousand' ? 1_000 : 1);
  return Number.isFinite(amount) && amount >= 10_000 ? amount : null;
}

function titleCase(value: string) { return value.replace(/\b\w/g, (letter) => letter.toUpperCase()); }
