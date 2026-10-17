---
name: implementation-workflow
description: Use for all repository edits and their planning, including simple code, documentation, configuration, and test changes. Also use to choose the next task from a tracker, continue work, recover context, or split implementation into tasks. Review-only and publication-only requests are outside this workflow.
---

# Implementation workflow

- Follow local project instructions and conventions. Combine available domain skills when relevant; this workflow also works without them.
- For a small task, work directly: read the relevant context and current diff, make the edit, run the required checks, inspect the final diff, and report the result. Use a separate plan, phases, or subagents when complexity, risk, or the user's request calls for them.

## Select a mode

- **Plan only**: inspect and propose without changing project files.
- **Plan and implement**: plan enough to reduce risk, then continue into code.
- **Continue or recover**: reconstruct current state, then make the smallest safe move.
- When asked to split work, make each task independently useful and verifiable. State whether the split is plan-only or will be executed.
- When the user requests implementation, continue through verification and delivery of the result. Pause only the work that depends on a missing answer, an actual blocker, or a user instruction to pause.

## Choose the next task

- When the user asks to choose or plan the next task without naming one, inspect the repository's declared primary work tracker first. For a GitHub repository with no other declared source of truth, use GitHub Issues and any linked GitHub Project.
- Rank actionable candidates using evidence about priority, impact, readiness, dependencies, and current repository state. Select a clear leader and continue the requested planning. When several candidates are similarly viable, present the top two or three in order, explain briefly why each is ready now, and ask the user to choose.
- If the leading candidate is an epic without child tasks, stop selection and explain that it needs planning and decomposition into actionable tasks first. If no accessible tracker yields a task, inspect explicit local roadmap, TODO, or backlog documents, then ask the user for direction.
- Task selection authorizes the requested selection or planning. Implement the selected task when the user's request also covers implementation.
- When implementation starts on a tracked task, assign the user in its tracker if they are not already assigned. Ask before replacing another person's assignment.

## Establish scope

Before planning or editing:

1. Read local instructions, project conventions, and any available relevant domain skills.
2. Inspect the working tree, nearby patterns, tests, and available evidence, including relevant project decision and experiment records.
3. Identify the result, constraints, non-goals, blast radius, and verification needs.

- Inspect the repository and conversation before asking questions they can answer. Ask narrow clarification questions whenever uncertainty about the task remains, even about minor details, in every mode and throughout the task.
- Wait for the answer before making the affected decision. Continue independent parts of the current task allowed by the selected mode. Treat explicit defaults, established conventions, and information or authorization already provided as settled answers.
- Keep facts, conditional estimates, and unknowns distinct. Derive requirements, integrations, supported scenarios, and compatibility needs from the request and repository evidence.

## Research and test the approach

- Separate the required result and hard constraints from proposed implementation methods. Treat proposed methods as candidates, including your own suggestions.
- During planning, research current online sources before choosing a technical approach or editing code. Cover implementation details, credible alternatives, relevant optimizations, and good practices. Scale the depth to the decision's impact and uncertainty. For a local correction fully settled by repository evidence, such as a typo, keep preparation local.
- Start with official documentation, release notes, and relevant research papers. Check what is current as of the task date, source dates, and whether the advice fits the project's versions, platforms, constraints, and workload. Include hardware when it affects the decision.
- Use other reliable technical sources to find ideas and different results. Verify key claims with original sources or local checks. Link the sources that support the plan or task report, and state any limits that leave important claims unverified.
- Check assumptions, gaps, and credible alternatives against this research and repository evidence. Compare correctness, simplicity, readability, maintenance, risk, performance, memory use, and verification where relevant. Use a focused check or measurement when an unresolved claim could change the choice. Follow the project's requirements for experiments and records.
- If the proposed approach holds up, endorse it and proceed. If it does not, explain the concrete issue and resolve the decision before finalizing the plan or editing.

## Explain decisions before asking

Before asking the user to choose an approach:

1. Connect the current situation and goal to the decision. Explain where it fits in the workflow, what remains open, and which earlier decisions still hold. Reuse relevant context instead of repeating the whole discussion.
2. Explain how each option works and what it changes for the user or project. Explain unfamiliar terms; use a concrete example when a label alone does not make the behavior clear.
3. Compare each option's practical benefits, downsides, and concrete consequences or risks. Include costs such as extra user steps, maintenance, or limits on supported environments when relevant. Explain the effect on later changes only when it matters to this decision.
4. Recommend one option using confirmed task facts and the user's needs. State its relevant cost or limitation and why that trade-off fits this task. Keep unknowns distinct from facts.
5. Put this explanation in chat before the question. Cover every decision in a batch, then ask with the same option names and order. The explanation must stand on its own without picker descriptions.

Scale detail to what the user needs to decide. Ask factual clarifications directly, explaining why the fact matters when needed; they do not need invented alternatives or trade-offs.

## Plan

- Keep a plan for non-trivial work. Cover the result, boundaries, order, affected areas, verification, and remaining risks. Scale detail to complexity and preserve every material decision.
- Name files, modules, and interfaces when they clarify the change or prevent a mistake. A complete file inventory is not required.
- Keep completed work, active scope, and ideas distinct in progress lists. Update them as work advances.

1. Store the full plan separately from progress checklists. Use re-readable native storage that preserves the full plan, or a task-specific `plan.md` in the system temp directory. If the current instructions forbid file writes, present the full plan in chat and defer file storage until writes are allowed, before implementation.
2. Preserve the complete approved text, language, decisions, interfaces, boundaries, examples, verification, assumptions, and non-goals. After Plan Mode, copy the latest `<proposed_plan>` body without its tags. This is task state, not repository content.
3. Report where the plan is available and re-read it before the first project edit and after compaction.
4. Replace it with the complete updated plan when decisions change.
5. Keep plans delivered as results or needed for continuation or handoff. Delete other task-created temporary plan files only after the work they support is complete or cancelled.

- For broad migrations or refactors, map public entry points, internal helpers, removed legacy paths, and shared behavior ownership before editing.
- Resolve material decisions within the agreed scope before finalizing the plan. Add requirements only when the task or evidence supports them.
- Leave routine details to the implementer, such as variable names, exact edit locations, and imports. Specify them only when they affect the agreed approach or behavior.

## Implement

- When creating a branch for a known task, include its tracker ID so another session can recover the task. Follow the project's branch naming conventions and preserve the key's case, for example `feat/gh-42-session-cache` or `fix/APP-123-token-refresh`. Use the project's tracker context to identify the repository or project; include that context in the name when the ID alone is ambiguous.
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

1. Inspect the final working tree and diff. Remove task-created temporary files that are no longer needed. Preserve required outputs, including generated files, and pre-existing changes.
2. Confirm the result matches the agreed task and latest user clarifications.
3. Report changed surfaces, verification run, checks not run, and concrete residual risk.
