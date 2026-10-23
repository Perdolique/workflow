---
name: implementation-workflow
description: Use for all repository edits and their planning, including simple code, documentation, configuration, and test changes. Also use to choose the next task from a tracker, continue work, recover context, or split implementation into tasks. Review-only and publication-only requests are outside this workflow.
---

# Implementation workflow

- Follow local project instructions and conventions. Combine available domain skills when relevant; this workflow also works without them.
- For a small task, work directly: read the relevant context and current diff, make the edit, run the required checks, inspect the final diff, and report the result. Use a separate plan, phases, or subagents when complexity, risk, or the user's request calls for them.

## Select a mode

- **Plan only**: inspect and propose without changing files.
- **Plan and implement**: plan enough to reduce risk, then continue into code.
- **Continue or recover**: reconstruct current state, then make the smallest safe move.
- When asked to split work, make each task independently useful and verifiable. State whether the split is plan-only or will be executed.
- When the user requests implementation, continue through verification and delivery of the result. Pause only the work that depends on a missing answer, an actual blocker, or a user instruction to pause.

## Choose the next task

- When the user asks to choose or plan the next task without naming one, inspect the repository's declared primary work tracker first. For a GitHub repository with no other declared source of truth, use GitHub Issues and any linked GitHub Project.
- Rank actionable candidates using evidence about priority, impact, readiness, dependencies, and current repository state. Select a clear leader and continue the requested planning. When several candidates are similarly viable, present the top two or three in order, explain briefly why each is ready now, and ask the user to choose.
- If the leading candidate is an epic without child tasks, stop selection and explain that it needs planning and decomposition into actionable tasks first. If no accessible tracker yields a task, inspect explicit local roadmap, TODO, or backlog documents, then ask the user for direction.
- Task selection authorizes the requested selection or planning. Implement the selected task when the user's request also covers implementation.

## Establish scope

Before planning or editing:

1. Read local instructions, project conventions, and any available relevant domain skills.
2. Inspect the working tree, nearby patterns, tests, and available evidence.
3. Identify the result, constraints, non-goals, blast radius, and verification needs.

- Inspect the repository and conversation before asking questions they can answer. Ask narrow clarification questions whenever uncertainty about the task remains, even about minor details, in every mode and throughout the task.
- Wait for the answer before making the affected decision. Continue independent parts of the current task allowed by the selected mode; plan-only work stays read-only. Treat explicit defaults, established conventions, and information or authorization already provided as settled answers.
- Keep facts, conditional estimates, and unknowns distinct. Derive requirements, integrations, supported scenarios, and compatibility needs from the request and repository evidence.

## Pressure-test the approach

- Separate the desired result from the user's proposed approach. Treat the approach as a hypothesis regardless of how confidently it is presented.
- Before planning or editing, check assumptions, omissions, and credible alternatives against repository evidence and established conventions. Compare relevant alternatives for correctness, scope, risk, simplicity, and verification, with detail proportional to the decision.
- If the proposed approach holds up, endorse it and proceed. If it does not, explain the concrete issue and resolve the decision before finalizing the plan or editing.

## Explain decisions before asking

- Before asking the user to choose an approach, explain each option in chat: how it works, its benefits, downsides, and concrete consequences or risks. Recommend one with a reason.
- Then ask using the same option names and order. The chat explanation must stand on its own, without picker descriptions.
- Ask factual clarifications directly; they do not need invented alternatives.

## Plan

- Keep a plan for non-trivial work. Cover the result, boundaries, order, affected areas, verification, and remaining risks. Scale detail to complexity and preserve every material decision.
- Name files, modules, and interfaces when they clarify the change or prevent a mistake. A complete file inventory is not required.
- Keep completed work, active scope, and ideas distinct in progress lists. Update them as work advances.

1. Store the approved plan separately from progress checklists. Use re-readable native storage that preserves the full plan, or a task-specific `plan.md` in the system temp directory.
2. Preserve the complete approved text, language, decisions, interfaces, boundaries, examples, verification, assumptions, and non-goals. After Plan Mode, copy the latest `<proposed_plan>` body without its tags. If writes are forbidden, create it immediately after leaving Plan Mode, before implementation. This is task state, not repository content.
3. Report its location and re-read it before the first project edit and after compaction.
4. Replace it with the complete updated plan when decisions change.
5. Delete it when the task completes or is cancelled.

- For broad migrations or refactors, map public entry points, internal helpers, removed legacy paths, and shared behavior ownership before editing.
- Resolve material decisions within the agreed scope before finalizing the plan. Add requirements only when the task or evidence supports them.
- Leave routine details to the implementer, such as variable names, exact edit locations, and imports. Specify them only when they affect the agreed approach or behavior.

## Implement

- Work in the smallest useful slices.
- Reuse local patterns. Add abstractions only for confirmed needs.
- Verify after risky boundaries such as schemas, shared utilities, public APIs, stateful UI, migrations, and authentication.
- Update the user when scope changes, a risk is resolved, or a blocker appears. For warnings, name the concrete failure condition or recovery action.
- Preserve user changes and their staging state. Continue normal work when changes are unrelated.
- Before editing an overlapping file, inspect its current diff. If the edit could overwrite the user's work and the correct result is unclear, show the conflict and ask before that edit.
- If a slice exposes a larger design choice, stop expanding scope. Continue only when the choice is required for the requested result.
- If review feedback repeats around naming, types, wrappers, or plumbing, fix the shared cause before applying one-off patches.
- Record follow-up work only when backed by evidence, a failing check, or an explicit user decision.

## Use parallel work selectively

- Use subagents only when independent work can run concurrently and the benefit exceeds coordination cost. Prefer read-only research, risk analysis, test discovery, and architecture comparison.
- Give each subagent a narrow objective, exact evidence to inspect, boundaries, edit permission, and required output. Avoid overlapping edits. The orchestrator integrates decisions and runs final verification.

## Verify and finish

- Follow the repository's verification matrix. Otherwise choose checks by the scope of possible effects:
  - Documentation changes need relevant lint or format checks.
  - Type or UI changes need type checks, lint, focused tests, and browser coverage when flows change.
  - Shared utilities, schemas, data models, authentication, persistence, and public contracts need broader tests.
  - New browser flows should run the focused scenario before the full suite.
- Do not run a full suite reflexively for a tiny change. Do not under-verify a risky change.
- If a check fails, determine whether the change caused it. Fix change-caused failures. Do not mark the task complete while an in-scope check fails; report unrelated or pre-existing failures with evidence.

Before finishing:

1. Inspect the final working tree and diff. Remove task-created debug or generated files; preserve pre-existing changes.
2. Confirm the result matches the agreed task and latest user clarifications.
3. Report changed surfaces, verification run, checks not run, and concrete residual risk.
