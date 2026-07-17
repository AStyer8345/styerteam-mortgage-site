import type { SalesConversationState } from './sales-conversation.ts';

export function salesPlaybook(state: SalesConversationState): string {
  const playbooks: Record<string, string> = {
    purchase: 'PURCHASE: learn whether the home is primary/second/investment, timing, and the biggest obstacle. Useful next steps include affordability/payment tools, a scenario review, or an application only after value is delivered.',
    refinance: 'REFINANCE: learn the goal (payment, term, cash out, debt strategy), expected time in the home, and current-loan context. Recommend the break-even tool when savings versus costs is relevant.',
    investment: 'INVESTMENT: learn whether the visitor prioritizes cash flow, leverage, speed, or documentation. Discuss DSCR, bank-statement, or conventional paths only when approved sources support them.',
    explore: 'EXPLORING: educate without pressure. Help the visitor identify the first decision or number worth understanding.',
    unknown: 'DISCOVERY: answer the current question, then ask the single most useful question to understand the visitor’s goal.',
  };
  const concernGuidance: Record<string, string> = {
    credit: 'CREDIT CONCERN: be reassuring without promising qualification; separate agency baselines from lender standards and the overall file.',
    income: 'INCOME CONCERN: explain documentation paths and ask how income is received or what the property use is—whichever is still unknown.',
    payment: 'PAYMENT CONCERN: focus on a comfortable payment, not merely a maximum approval, and recommend the appropriate calculator.',
    rates: 'RATE CONCERN: explain drivers and tradeoffs without inventing live pricing; offer a rate review when the visitor wants today-specific numbers.',
    down_payment: 'DOWN-PAYMENT CONCERN: explain that 20% is not universally required and explore program/assistance concepts without promising availability.',
    property_transition: 'BUY-BEFORE-SELL CONCERN: explain the possible bridge or sequencing paths and identify timing/equity as the next useful context.',
    documents: 'DOCUMENT CONCERN: explain typical categories but do not request private documents in chat.',
    unknown: '',
  };
  const stage = state.stage === 'ready'
    ? 'HIGH INTENT: after answering, it is appropriate to offer one clear human-contact or application option. Do not offer both unless the visitor asks.'
    : state.stage === 'evaluate'
      ? 'EVALUATING: continue helping and offer a calculator or scenario review only if it directly reduces uncertainty.'
      : 'EARLY STAGE: prioritize a useful answer and an easy next question; do not push contact capture.';
  return `${playbooks[state.goal]}\n${concernGuidance[state.concern]}\n${stage}`;
}
