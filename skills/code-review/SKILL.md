---
name: code-review
description: Orchestrate evidence-based code reviews across focused subagents. Use when the user or an automated process requests a code review.
license: Unlicense
---

# Code review

Coordinate focused subagents to review an existing change set as read-only input and produce one evidence-backed report.

## Orchestrator instructions

- Treat each review specialist as single-use. Spawn a fresh specialist for every initial assignment; never resume one for follow-up validation or resolution.
- Spawn every review specialist with `fork_turns="none"`.
- Ignore staged versus unstaged status. Review all uncommitted changes together; never report a staging split as a finding.
- Treat review as read-only. Repository task-completion verification instructions apply to implementation work, not review.
- Use validation results available when review starts; record the validation baseline as `Unavailable` when none exist.
- Give every review specialist its assignment packet, [specialist instructions](#specialist-instructions), and applicable [specialist role](#specialist-roles); do not ask specialists to rediscover scope.
- Schedule or batch specialists so each specialist can spawn its required children without exceeding the available agent limit.
- Report checked scope and actual findings. Mark review incomplete when missing context or expertise blocks completion; otherwise use "No issues found." when none exist.

## Specialist instructions

- Review only assigned behavior, following relevant code wherever needed; ignore unrelated concerns.
- Establish each finding from a cited code path with a concrete trigger and consequence. Use supplied validation as context and return claims that code inspection cannot settle as unresolved candidates.
- Give each child a self-contained narrower assignment marked as internal and instruct it to work directly without invoking code-review orchestration. Do not pass these general specialist instructions or the specialist role; the specialist alone controls the child's prompt, scope, evidence contract, and lifecycle.
- Delegate one coherent responsibility, not individual checklist items. Verify child evidence and merge duplicate root causes into one candidate list, but do not remove a supported candidate because it is low priority, cosmetic, readability-related, or easy to fix.
- Assign a stable finding ID to every candidate after merging the specialist's own work and its children's work.
- When the merged candidate list is empty, return checked scope and "No issues found." without spawning a validator.
- When the merged candidate list is nonempty, spawn exactly one fresh final finding validator with `fork_turns="none"`. Mark the assignment as internal and give it the exact candidate list with IDs, code scope, prior evidence and reproduction results, applicable repository instructions and domain skills, and [final finding validator instructions](#final-finding-validator-instructions).
- Return every validator-confirmed finding with its stable ID. Keep validator-rejected candidates out of findings, and return validator-unresolved candidates separately as an incomplete review.
- Keep findings, incomplete reviews, and human-review candidates separate. Use human review for material decisions or confirmations requiring project context unavailable in the repository; use incomplete review when technical analysis is unfinished. Include the location, missing context, consequence, and required human action.

### Final finding validator instructions

- Perform this internal assignment directly without invoking code-review orchestration. Review only the supplied candidates and code needed to validate them; do not search for new findings or spawn children.
- Independently establish or refute each candidate from its cited code path, concrete trigger, and consequence. Reuse supplied evidence and reproduction results; only when they have not settled a claim, run the smallest new read-only reproduction once.
- Preserve every candidate ID and return exactly one disposition for each: `Confirmed` with supporting evidence, `Rejected` with contradicting evidence, or `Unresolved` with the missing context or validation needed.
- Do not suppress or downgrade a confirmed candidate because it is low priority, cosmetic, readability-related, or easy to fix. Priority is assigned after validation.

## Workflow

### Step 1: Target and identify specialists

- Use one subagent with `fork_turns="none"` for this internal planning task to identify review source: branch, commit, pull request, or uncommitted changes. Unless the user specifies one, review all uncommitted changes when any exist; otherwise fetch remote `master` and review the entire current branch against it.
- Split changes into assignment packets containing behavior or contract, changed entry points, recorded validation baseline, and [specialists](#specialist-roles). Cover every change; overlap only for cross-target behavior.
- Return packets only; do not report findings or guesses.

### Step 2: Assign specialists and perform review

- Spawn one fresh subagent per specialist, in batches when necessary to leave capacity for specialist-owned children.
- Collect validated specialist reports and reproduction results. If new context or expertise can settle unresolved IDs, give only those IDs and all prior evidence to one fresh resolver with `fork_turns="none"`; never rerun the specialist assignment, repeat a completed reproduction, or revisit confirmed and rejected IDs. Otherwise preserve them as an incomplete review.

### Step 3: Produce final review report to user

- Build a finding ledger from every validator-confirmed stable ID and merge IDs only when they describe the same root cause. If validated reports conflict, give only the conflicting IDs and prior evidence to one fresh resolver with `fork_turns="none"` before finalizing; resolvers follow the final finding validator instructions.
- Outside that conflict path, do not inspect code, rerun validation, or spawn agents during Step 3; deduplication alone never justifies a resolver.
- Account for every confirmed ID exactly once as its own final finding or as a source of an explicitly merged final finding. Do not omit confirmed findings because of priority, materiality, report length, readability, or ease of cleanup; priority only controls ordering and labels.
- Reconcile the ledger before responding and report a compact accounting line with confirmed specialist findings, final comments, duplicate merges, and omitted findings. The omitted count must be zero.
- Report review target, specialists, findings summary, every confirmed detailed comment, and a verified, deduplicated `Human review` section; use `None.` when no human review is required.

## Specialist roles

### Behavioral and contract

Review behavioral logic, state transitions, cross-file behavior, regressions, API contracts, and backward compatibility.

### Data and concurrency

Review data loss, invalid lifecycle transitions, transaction boundaries, idempotency, races, and production-data assumptions.

### Security and vulnerability

Review concrete attacker paths, authorization mistakes, unsafe data exposure, and security consequences.

### Privacy and data protection

Review privacy violations, data leaks, and unsafe data handling.

### Performance and resource usage

Review time and space complexity, algorithmic efficiency, caching, and resource management under supported workloads.

### Test and regressions

Review whether tests protect intended contract, fail when that contract is removed, and cover material negative cases.

### Waste and maintainability

- Review assigned non-style dead, duplicate, temporary, or speculative code and artifacts directly.
- Partition the assigned scope into non-style code and style-bearing sections without reviewing style waste directly.
- If non-style code exists, collect its exact scope and spawn one fresh readability-focused child with `fork_turns="none"` for the combined scope. Spawn at most one readability child per specialist assignment.
- Give the child a self-contained assignment containing the exact code scope, applicable repository instructions and language or framework skills, and [code readability reviewer instructions](#code-readability-reviewer-instructions). Verify its evidence and merge its findings into the specialist report.
- If style-bearing code exists, collect its exact scope and spawn one fresh CSS-focused child with `fork_turns="none"` for the combined scope. Spawn at most one CSS child per specialist assignment, not one per file.
- Give the child a self-contained assignment containing the exact style scope, applicable CSS skill, and [CSS waste reviewer instructions](#css-waste-reviewer-instructions). The child owns style waste review; verify its evidence and merge its findings into the specialist report.

#### Code readability reviewer instructions

- Perform this internal assignment directly without invoking code-review orchestration or spawning children; review only the supplied code scope.
- Follow the supplied repository and applicable language or framework instructions.
- Find code whose intent or execution order is materially obscured by dense expressions, nesting, mixed abstraction levels, misleading names, or unnecessary indirection. Treat these as signals, not an exhaustive checklist.
- Recommend the smallest correction that preserves behavior and supported performance characteristics; do not report formatting preferences or clear simple code.
- Report checked scope and actual findings with exact locations and supporting evidence; return "No issues found." when none exist.

#### CSS waste reviewer instructions

- Perform this internal assignment directly without invoking code-review orchestration or spawning children; review only the supplied style scope.
- Follow the applicable CSS skill and repository browser targets, build configuration, resets, and nearby styling context.
- Find dead or duplicate selectors and declarations.
- Find declarations proven ineffective by the cascade, inheritance, or layout context.
- Find repeated global or base styles and compatibility workarounds outside declared browser targets.
- Report checked scope and actual findings with exact locations and supporting evidence; return "No issues found." when none exist.

### Frontend and user experience

Review user-visible states, accessibility, interaction behavior, layout risks, and visual regressions.
