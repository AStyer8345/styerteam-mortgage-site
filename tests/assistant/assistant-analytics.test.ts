import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const browser = fs.readFileSync('assistant-widget.js', 'utf8');
const analyticsFunction = browser.slice(browser.indexOf('function trackAssistant'), browser.indexOf('function safeAnalyticsValue'));

test('assistant analytics includes the required funnel events', () => {
  for (const event of [
    'assistant_impression', 'assistant_opened', 'conversation_started', 'opening_choice_selected', 'useful_answer_delivered',
    'estimate_started', 'estimate_completed', 'pricing_range_viewed', 'complex_scenario_started', 'scenario_assessment_completed',
    'contact_form_opened', 'contact_submitted', 'preapproval_clicked', 'application_clicked', 'scheduling_clicked', 'rate_review_clicked', 'assistant_error', 'conversation_abandoned',
  ]) assert.match(browser, new RegExp(event));
});

test('analytics payload contains only non-sensitive conversation properties', () => {
  assert.match(analyticsFunction, /source_page/);
  assert.match(analyticsFunction, /opening_choice/);
  assert.match(analyticsFunction, /conversation_stage/);
  assert.match(analyticsFunction, /goal/);
  assert.match(analyticsFunction, /concern_category/);
  assert.match(analyticsFunction, /visitor_message_count/);
  assert.match(analyticsFunction, /cta_type/);
  assert.doesNotMatch(analyticsFunction, /email|phone|firstName|visitorName|gross|income|debt|creditRange|message\.text|turn\.text/);
});

test('conversation abandonment is emitted only after a conversation and before conversion', () => {
  assert.match(browser, /!state\.conversationStarted \|\| state\.converted \|\| state\.abandonedTracked/);
  assert.match(browser, /window\.setTimeout\(trackAbandonment, 120000\)/);
  assert.doesNotMatch(browser, /pagehide.*trackAbandonment/);
});
