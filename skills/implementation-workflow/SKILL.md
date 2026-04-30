---
name: implementation-workflow
description: Plan and drive non-trivial coding work from ambiguous request to scoped implementation and verification. Use when the user asks to plan before coding, plan then implement, split work into iterations or PR-sized tasks, tackle a risky multi-file feature, refactor, migration, or recover after failed work. Do not use for simple one-step edits, commit or PR creation, pure framework/domain conventions, or repo-specific roadmap docs where a more specific planning skill applies.
---

# Implementation Workflow

Use this skill to manage the shape of non-trivial coding work. It guides discovery, planning, implementation sequencing, verification, and close-out. It does not replace project instructions or domain skills; it helps the agent use them at the right time.

## Scope

Use this skill for:

- Ambiguous implementation requests that need discovery before coding.
- Multi-file features, refactors, migrations, or bug fixes with meaningful risk.
- Requests to split work into iterations, milestones, or PR-sized tasks.
- Plan-before-coding and plan-then-implement workflows.
- Recovery work after interrupted implementation or failing checks.

Do not use this skill for:

- Simple one-step edits where planning would add ceremony.
- Commit messages, pull requests, release notes, or review summaries.
- Framework, database, testing, or UI conventions covered by a more specific skill.
- Repository-specific roadmap files when a more specific planning or documentation skill applies.

## Mode Selection

Choose the lightest useful mode:

- **Plan only**: the user asks for a plan, trade-off analysis, iteration split, or implementation strategy without code changes.
- **Plan then implement**: the user asks to start or complete work. Plan just enough to reduce risk, then continue into implementation.
- **Continue or recover**: work is already in progress, interrupted, or broken. Reconstruct current state first, then make the smallest safe move.
- **Split into independent tasks**: the user wants a sequence of shippable tasks. Keep each task independently useful and verifiable.

When the user asks for implementation, do not stop after writing a plan unless blocked or explicitly told to pause.

## Intake

Before planning deeply, identify:

- The user-visible or API-visible result.
- Evidence of the problem or need: failing tests, logs, screenshots, current behavior, or an explicit requested behavior.
- Constraints from local instructions, existing architecture, supported environments, and user requirements.
- Non-goals and work that should stay out of scope.
- Risk level and likely blast radius.
- Verification expectations and any checks already known to be relevant.

Ask questions only when the answer changes the plan or blocks implementation. If the repository can answer the question, inspect it first.

## Context Gathering

Gather context from broad to specific:

1. Read applicable local instructions and more specific skills.
2. Inspect the current working tree before editing.
3. Search for existing patterns, nearby implementations, and tests.
4. Read errors, logs, failing test output, or user-provided evidence before guessing.
5. Use domain-specific skills for framework, database, testing, UI, or documentation rules.
6. If essential answers are still missing after those steps, ask the user a small number of specific blocking questions.

Keep assumptions explicit. Do not invent requirements, supported scenarios, integrations, or future needs.

## Planning Shape

For non-trivial work, produce or maintain a concise plan with:

- **Result**: the concrete behavior or artifact after the task is done.
- **Boundaries**: what is included, what is excluded, and why.
- **Order**: the smallest safe sequence of steps, noting which can run in parallel.
- **Touched surfaces**: likely files, modules, routes, schemas, UI views, tests, or docs.
- **Verification**: checks proportional to the risk and repository instructions.
- **Residual risk**: anything intentionally deferred, unverified, or dependent on a user decision.

Avoid implementation-detail overload before a slice starts. Plans should be detailed enough to act, not so detailed that they become stale while the code is being read.

## Implementation Loop

Work in small independent slices:

1. Make the smallest change that moves the task toward a finished result.
2. Preserve user changes and unrelated work in the tree.
3. Reuse local patterns before adding new abstractions.
4. Verify after risky boundaries such as schema changes, shared utilities, public APIs, stateful UI flows, migrations, and authentication paths.
5. Update the user when the plan changes, a risk is resolved, or a blocker appears.
6. Record follow-up work only when it is backed by evidence, a failing check, or an explicit user decision.

If a slice uncovers a larger design choice, stop expanding scope by default. Capture the choice and continue only if it is necessary for the requested result.

## Verification Strategy

Select checks by blast radius and local repository instructions:

- Documentation-only changes usually need documentation linting or format checks.
- Type or UI changes usually need type checks, linting, focused unit tests, and focused browser or integration tests when user flows change.
- Shared utilities, schemas, data models, auth, persistence, and public contracts need broader tests because regressions can spread across modules.
- New browser flows should usually run the focused scenario before the full suite.
- Avoid running expensive full suites reflexively for tiny low-risk edits, but do not under-verify high-risk changes.

If the repository defines a verification matrix, follow it over generic rules.

## Boundaries With Other Skills

Use this workflow skill to decide how to move through the task. Use more specific skills for the technical substance:

- Framework and application skills for routing, data fetching, components, rendering, and build conventions.
- Database or ORM skills for migrations, query construction, and persistence semantics.
- Unit and end-to-end testing skills for test design and assertions.
- Documentation or roadmap skills for repository-specific planning files.
- Commit and pull-request skills for commit messages and PR content.

When another skill is more specific, load it and let its rules control the implementation details.

## Anti-Patterns

Avoid:

- Planning theater: long plans for tiny edits.
- Plan-only trap: stopping at a plan when the user asked for implementation.
- Speculative future-proofing, compatibility branches, or abstractions without a current need.
- Giant backlog dumps that are not ordered, independently shippable, or verifiable.
- Stale checklists that do not change as the code reveals new facts.
- Invented requirements or unsupported scenarios.
- Full-CI reflex for tiny changes and shallow verification for risky changes.
- Mixing completed work, active scope, and speculative follow-up in the same task list.

## Close-Out

Before finishing:

- Confirm the implemented result matches the newest user request.
- Summarize changed surfaces and key decisions.
- Report verification that ran and anything that could not be run.
- Call out residual risks or follow-up work only when they are concrete.
