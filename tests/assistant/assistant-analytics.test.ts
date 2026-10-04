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

// Exercise the actual dispatcher: a plain custom dataLayer object is not a
// Google Analytics event until it is forwarded by a tag or a gtag command.
import vm from 'node:vm';
test('production assistant events reach the existing Google tag without transcript data', () => {
  const events: unknown[] = [];
  const context = { state: { analyticsSeen: {}, salesState: {}, turns: [] }, window: { location: { pathname: '/bank-statement-loans.html', hostname: 'styermortgage.com', search: '' }, dataLayer: events } };
  const functions = browser.slice(browser.indexOf('function trackAssistant'), browser.indexOf('function openingChoiceValue'));
  vm.runInNewContext(functions + '\ntrackAssistant("assistant_opened");', context);
  assert.equal(events.length, 2);
  const command = events[1] as IArguments;
  assert.equal(command[0], 'event');
  assert.equal(command[1], 'assistant_opened');
  assert.equal(command[2].send_to, 'G-DDY0H0319S');
  assert.equal(command[2].source_page, '/bank-statement-loans.html');
  assert.equal(command[2].event, undefined);
});

test('synthetic tests are excluded from production Google Analytics', () => {
  const events: unknown[] = [];
  const context = { state: { analyticsSeen: {}, salesState: {}, turns: [] }, window: { location: { pathname: '/', hostname: 'styermortgage.com', search: '?assistant_test=1' }, dataLayer: events } };
  const functions = browser.slice(browser.indexOf('function trackAssistant'), browser.indexOf('function openingChoiceValue'));
  vm.runInNewContext(functions + '\ntrackAssistant("assistant_opened");', context);
  assert.equal(events.length, 1);
});
