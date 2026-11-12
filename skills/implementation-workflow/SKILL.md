---
name: implementation-workflow
description: Use for all repository edits and their planning, including simple code, documentation, configuration, and test changes. Also use to choose the next task from a tracker, continue work, recover context, or split implementation into tasks. Review-only and publication-only requests are outside this workflow.
---

# Implementation workflow

For small tasks, work directly. Use a separate plan, phases, or subagents when complexity, risk, or the user calls for them.

## Select a mode

- **Plan only**: inspect and propose without changing project files.
- **Plan and implement**: plan enough to reduce risk, then implement.
- **Continue or recover**: reconstruct the current state, then take the smallest safe step.
- For task breakdowns, state whether work is plan-only or will be executed. Make each task independently useful and verifiable.

## Choose the next task

Apply this section when asked to choose or plan the next task without a named task.

- Start with the declared primary tracker. For GitHub repositories without one, use GitHub Issues and linked Projects.
- Rank actionable tasks by priority, impact, readiness, dependencies, and current state. Choose a clear leader. For similarly viable tasks, explain why the top two or three are ready, in order, and ask the user to choose.
- If the leading task is an epic without children, stop selection and explain that it needs decomposition. If no accessible tracker yields a task, check local roadmap, TODO, or backlog documents, then ask for direction.
- Selection covers only the requested selection or planning; implement only when requested.

## Prepare the implementation

- Establish the user or business goal and trace the affected journey or workflow through relevant entry points, systems, and failure or recovery paths. Follow dependencies far enough to check that the proposed change can deliver the intended result. Scale this to the task.
- Read project instructions and inspect the working tree, current diff, relevant briefs, surrounding code and patterns, tests, decisions, and experiment records. Confirm the result, constraints, non-goals, affected areas, and verification needs before choosing an approach.
- Apply `typescript-conventions` to TypeScript, `vue-components` to Vue, `web-interface-conventions` to interface work, and `drizzle-orm` to Drizzle queries as relevant.
- Use `repository-updater` for dependency, tooling, runtime, or infrastructure updates. Use `cost-aware-development` before choices with material cost or allowance impact when its supported providers apply.
- Use `markdownlint` for Markdown lint configuration or problems.

## Plan

- For non-trivial work, cover the result, boundaries, order, affected areas, verification, and risks. Scale detail to complexity and preserve material decisions. Keep progress lists current, separating completed work, active scope, and ideas.
- Name files, modules, and interfaces when useful; a full inventory is optional. Before broad migrations or refactors, map public entry points, helpers, removed legacy paths, and shared behavior ownership.
- Resolve material choices before finalizing the plan. Leave routine names, imports, and edit details to the implementer unless they affect behavior or the approach.

1. Plans are task state. Store the full plan separately from progress checklists in re-readable native storage or a task-specific `plan.md` in the system temp directory. If writes are forbidden, present it in chat and save it when writes become allowed, before implementation.
2. Preserve the approved text, language, decisions, interfaces, boundaries, examples, verification, assumptions, and non-goals. After Plan Mode, copy the latest `<proposed_plan>` body without its tags.
3. Report the plan's location. Re-read it before the first project edit and after compaction. Replace it with the complete updated plan when decisions change.
4. Keep plans delivered as results or needed for continuation or handoff. Delete other task-created temporary plans only after completion or cancellation.

## Implement and finish

- When tracked implementation starts, assign the user if needed. Ask before replacing another assignee.
- Work in the smallest useful slices and verify after risky changes.
- For test additions, changes, or value/coverage audits, use `test-audit`. Use `vitest-unit-testing` for Vitest unit-test mechanics and `playwright-e2e-testing` for Playwright browser, E2E, and API tests, following project conventions. Running existing tests alone does not require `test-audit`.
- If the request includes an open-ended changeset review, use `code-review`; use `github-comment-reply` only for explicitly selected GitHub comments.
- Use `commit-creator`, `pr-creator`, or `github-release` for the corresponding authorized request.
- Run required checks, fix change-caused failures, and inspect the final tree and diff. Remove only unneeded task-created temporary files; preserve required outputs, pre-existing work, and retained plans. Report changes, actual checks or limits, and remaining risks.
