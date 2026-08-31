---
name: implementation-workflow
description: Use when non-trivial coding work needs discovery or phased execution. Trigger for risky multi-file features, cross-cutting fixes, refactors, migrations, recovery, iteration plans, and PR-sized task splits. Skip simple edits and publication-only or review-only requests. Domain conventions belong to a more specific skill.
---

# Implementation workflow

Manage task flow. Local instructions and domain skills remain authoritative.

## Select a mode

- **Plan only**: inspect and propose without changing files.
- **Plan and implement**: plan enough to reduce risk, then continue into code.
- **Continue or recover**: reconstruct current state, then make the smallest safe move.

When asked to split work, make each task independently useful and verifiable. State whether the split is plan-only or will be executed.

Do not stop at a plan when the user asked for implementation unless blocked or told to pause.

## Establish scope

Before planning:

1. Read local instructions and relevant domain skills.
2. Inspect the working tree, nearby patterns, tests, and available evidence.
3. Identify the result, constraints, non-goals, blast radius, and verification needs.

Inspect the repository before asking questions it can answer. Ask only when the answer changes scope, UX, data shape, risk, or verification.

Ask narrow questions whenever material uncertainty appears, not only during intake. Continue only work allowed by the selected mode; plan-only work stays read-only.

Keep assumptions explicit. Never invent requirements, integrations, or supported scenarios.

## Pressure-test the approach

Separate the desired result from the user's proposed approach. Treat the approach as a hypothesis regardless of how confidently it is presented.

Before planning or editing, use repository evidence to check material assumptions, omissions, and credible alternatives. Compare alternatives only when they could materially change correctness, scope, risk, simplicity, or verification.

If the proposed approach holds up, endorse it and proceed. If it does not, explain the concrete issue and resolve the decision before finalizing the plan or editing.

## Explain decisions before asking

Before asking the user to choose between approaches, explain each option in chat:
how it works, pros, cons, and concrete consequences or risks. Recommend one with
a reason. Only then ask using the same option names and order. Do not rely on picker
descriptions for the analysis. Ask factual clarifications directly without
inventing alternatives.

## Plan

Maintain a concise plan for non-trivial work. Cover the result, boundaries, order, touched surfaces, verification, and residual risk.

- Keep the approved plan separate from progress checklists such as `update_plan`. Use native plan storage only when it preserves the complete plan and can be re-read; otherwise save it to a task-specific `plan.md` in the system temp directory.
- Persist the complete current approved plan, not a summary. After Plan Mode, copy the latest `<proposed_plan>` body without its tags; preserve its language and every material decision, interface, boundary, example, verification step, assumption, and non-goal. The temporary plan is task state, not repository content.
- Report the path and re-read the plan before the first project edit and after compaction. Replace it with the complete updated plan when decisions change, then delete it when the task completes or is cancelled. If Plan Mode forbids writes, create it immediately after leaving Plan Mode and before implementation.

For broad migrations or refactors, map public entry points, internal helpers, removed legacy paths, and shared behavior ownership before editing.

Avoid low-level detail before its slice starts. Update the plan when evidence changes it.

## Implement

- Work in the smallest useful slices.
- Inspect existing changes before touching an overlapping file.
- Reuse local patterns before adding abstractions.
- Verify after risky boundaries such as schemas, shared utilities, public APIs, stateful UI, migrations, and authentication.
- Update the user when scope changes, a risk is resolved, or a blocker appears.

Unrelated dirty state is not a blocker. Never revert or overwrite unrelated user changes. If overlapping changes make safe progress impossible, show the conflict and ask.

If a slice exposes a larger design choice, stop expanding scope. Continue only when the choice is required for the requested result.

If review feedback repeats around naming, types, wrappers, or plumbing, fix the shared cause before applying one-off patches.

Record follow-up work only when backed by evidence, a failing check, or an explicit user decision.

## Use parallel work selectively

Use subagents only when independent work can run concurrently and the benefit exceeds coordination cost. Prefer read-only research, risk analysis, test discovery, and architecture comparison.

Give each subagent a narrow objective, exact evidence to inspect, boundaries, edit permission, and required output. Avoid overlapping edits. The orchestrator integrates decisions and runs final verification.

## Verify and finish

Follow the repository's verification matrix. Otherwise choose checks by blast radius:

- Documentation changes need relevant lint or format checks.
- Type or UI changes need type checks, lint, focused tests, and browser coverage when flows change.
- Shared utilities, schemas, data models, authentication, persistence, and public contracts need broader tests.
- New browser flows should run the focused scenario before the full suite.

Do not run a full suite reflexively for a tiny change. Do not under-verify a risky change.

If a check fails, determine whether the change caused it. Fix change-caused failures. Do not mark the task complete while an in-scope check fails; report unrelated or pre-existing failures with evidence.

Before finishing:

1. Inspect the final working tree and diff. Remove task-created debug or generated files; preserve pre-existing changes.
2. Confirm the result matches the newest user request.
3. Report changed surfaces, verification run, checks not run, and concrete residual risk.

## Combine with domain skills

This skill controls task flow. More specific skills control framework, database, testing, UI, and documentation details. Use both when a domain task still needs non-trivial planning or sequencing. Use commit and pull-request skills for publication work.

## Avoid

- Long plans for tiny edits.
- Stopping after planning when implementation was requested.
- Speculative compatibility, abstractions, or backlog items.
- Stale task lists that mix completed work, active scope, and ideas.
- Generic warnings without a concrete failure condition or recovery action.
