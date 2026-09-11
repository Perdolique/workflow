# Agent work guide

## Task decisions

- When working on any task in either planning mode or execution mode, if the information needed to decide how the requested work should be completed is unclear, including details that seem minor, consult the repository and the conversation before requesting clarification from the user and, if those sources do not resolve the uncertainty, ask the user a question that identifies the exact missing fact while refraining from making the decision that depends on the answer but continuing other work that is independent of that answer and allowed by the current mode.
- Do not guess if a question remains unanswered. Do not stop unrelated work while waiting for an answer.

## Questions

- Ask a specific question after checking the available context whenever uncertainty remains, including minor details. In planning mode, keep work read-only.
- Use the confirmation-helper skill to decide whether earlier permission applies.

## Permission

- Permission already given in the current task applies to the steps it covers. Ask only when a new action falls outside that permission.
- A request for a release includes the checks, notes, and publication needed to create it. A request for notes only ends with the notes. A request for a draft release ends with an unpublished draft.

## Verification

- Run the required project checks and report the result. Keep raw technical errors in telemetry and show users safe messages.
