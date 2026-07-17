# Conversational mortgage assistant: three-pass implementation plan

Date: 2026-07-16

## Plan V1 — repair the obvious failures

1. Improve retrieval for DTI, credit-score, VA, conventional, and self-employed questions.
2. Rewrite the model instructions to sound warmer and ask useful follow-up questions.
3. Add regression tests for the failed questions in the supplied screenshots.
4. Deploy and test the live widget.

### Self-check 1

This plan is necessary but not sufficient. It assumes every visitor message is a complete question. In the failed conversation, `buy` was an answer to the assistant's prior question, but retrieval treated it as a new search. Prompt changes alone also do not protect the experience when retrieval returns nothing or model generation fails. The plan needs explicit conversation resolution and dependable non-model behavior.

## Plan V2 — make the conversation coherent and resilient

1. Build a deterministic conversation resolver that combines short replies with the visitor's recent topic.
2. Handle identity, capability, greeting, and other operational questions directly.
3. Expand approved knowledge and retrieval synonyms for high-frequency mortgage questions.
4. Replace the single generic fallback with topic-aware recovery.
5. Add multi-turn tests and live scripted evaluations.

### Self-check 2

This version should answer more questions, but accuracy and continuity alone do not make it a sales assistant. It could still interrogate visitors, ask several questions at once, recommend irrelevant links, or answer without guiding the visitor toward a useful next step. It also offers no low-friction way to answer a follow-up question. The final version needs an explicit sales conversation policy and visible reply choices.

## Plan V3 — final execution plan

1. **Answer first:** give the useful general answer before requesting more context.
2. **Remember context:** resolve short replies such as `buy`, `primary`, `yes`, and timelines against recent visitor turns before retrieval.
3. **Ask one thing:** end with at most one relevant question that advances the current topic; never repeat a question already answered.
4. **Offer easy replies:** return up to three safe suggested replies and render them as buttons in the widget.
5. **Use a value-first sales path:** understand the goal, identify the important constraint, explain a practical option, and recommend one proportionate next step. Do not force an application or contact request.
6. **Ground mortgage claims:** use approved, date-reviewed material; distinguish agency baselines, lender overlays, and individual approval.
7. **Recover gracefully:** directly answer operational questions and use varied, topic-specific fallback guidance instead of repeating one generic paragraph.
8. **Prove the behavior:** unit-test context resolution and retrieval, run the full build and test suite, then run the screenshot conversations against the deployed endpoint.
9. **Deploy deliberately:** commit only scoped files, preserve unrelated worktree changes, push the website branch, update production through the existing deployment workflow, and verify both public domains.

## Acceptance criteria

- `what is the max dti on a conventional loan` receives a useful general answer, not the generic fallback.
- `what is a good credit score on a va loan` explains that VA has no universal minimum and that lender standards vary.
- `are you a bot` receives a direct, friendly disclosure.
- After a self-employed answer asks whether the visitor is buying or refinancing, `buy` is understood as the answer and the conversation advances.
- The assistant never asks more than one question in a response and does not repeat an already answered question.
- Relevant calculator or application/contact actions are offered only when they fit the visitor's intent.
- Suggested reply buttons are keyboard accessible and treated exactly like typed visitor messages.
- Existing safety, consent, transcript recording, and server-side credential protections continue to pass.
