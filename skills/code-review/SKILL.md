---
name: code-review
description: Orchestrate evidence-based code reviews through one compact reviewer or focused specialists. Use when the user or an automated process requests a code review.
license: Unlicense
---

# Code review

Coordinate a compact reviewer or focused specialists to review an existing change set as read-only input and produce one evidence-backed report.

## Orchestrator instructions

- Spawn every reviewer fresh with `fork_turns="none"`; never reuse one for validation or resolution.
- Ignore staged versus unstaged status. Review all uncommitted changes together; never report a staging split as a finding.
- Treat review as read-only. Repository task-completion verification instructions apply to implementation work, not review.
- Use validation results available when review starts; record the validation baseline as `Unavailable` when none exist.
- Give every reviewer its assignment packet, [reviewer instructions](#reviewer-instructions), applicable mode instructions, and [review roles](#review-roles); do not ask reviewers to rediscover scope.
- Schedule or batch specialists so each specialist can spawn its required children without exceeding the available agent limit.
- Report checked scope and actual findings. Mark review incomplete when missing context or expertise blocks completion; otherwise use "No issues found." when none exist.

## Reviewer instructions

- Review only assigned behavior, following relevant code wherever needed; ignore unrelated concerns.
- Establish each finding from a cited code path with a concrete trigger and consequence supported by code, configuration, or reproduction evidence. Use supplied validation as context and return claims that code inspection cannot settle as unresolved candidates.
- Merge duplicate root causes into one candidate list, assign a stable ID to every candidate, and do not remove a supported candidate because it is low priority, cosmetic, readability-related, or easy to fix.
- Keep findings, incomplete reviews, and human-review candidates separate. Use human review for material decisions or confirmations requiring project context unavailable in the repository; use incomplete review when technical analysis is unfinished. Include the location, missing context, consequence, and required human action.

### Compact reviewer instructions

- Review one combined packet directly across all listed roles and skills; spawn no children or validators.
- Return candidates and evidence to the orchestrator; if none exist, return checked scope and "No issues found."
- Mark unfinished responsibilities incomplete with missing context or expertise and completed scope; do not guess.

### Specialist instructions

- Give each child a self-contained narrower assignment marked as internal and instruct it to work directly without invoking code-review orchestration. Do not pass these general specialist instructions or the specialist role; the specialist alone controls the child's prompt, scope, evidence contract, and lifecycle.
- Delegate one coherent responsibility, not individual checklist items, and verify child evidence before merging it into the candidate list.
- When the merged candidate list is empty, return checked scope and "No issues found." without spawning a validator.
- When the merged candidate list is nonempty, spawn exactly one fresh final finding validator with `fork_turns="none"`. Mark the assignment as internal and give it the exact candidate list with IDs, code scope, prior evidence and reproduction results, applicable repository instructions and domain skills, and [final finding validator instructions](#final-finding-validator-instructions).
- Return every validator-confirmed finding with its stable ID. Keep validator-rejected candidates out of findings, and return validator-unresolved candidates separately as an incomplete review.

### Final finding validator instructions

- Perform this internal assignment directly without invoking code-review orchestration. Review only the supplied candidates and code needed to validate them; do not search for new findings or spawn children.
- Independently establish or refute each candidate from its cited code path, concrete trigger, and consequence. Reuse supplied evidence and reproduction results; only when they have not settled a claim, run the smallest new read-only reproduction once.
- Preserve every candidate ID and return exactly one disposition for each: `Confirmed` with supporting evidence, `Rejected` with contradicting evidence, or `Unresolved` with the missing context or validation needed.
- Do not suppress or downgrade a confirmed candidate because it is low priority, cosmetic, readability-related, or easy to fix. Priority is assigned after validation.

## Workflow

### Step 1: Select review mode and assignments

- Use one subagent with `fork_turns="none"` for this internal planning task to identify review source: branch, commit, pull request, or uncommitted changes. Unless the user specifies one, review all uncommitted changes when any exist; otherwise fetch remote `master` and review the entire current branch against it.
- Select `compact` only for one clearly local, simple, low-risk, self-contained responsibility that one generalist can review from one packet. Use `specialist` for authorization, security, privacy, destructive or transactional data changes, concurrency, migrations, public or cross-system contracts, backward compatibility, infrastructure, any other material risk, or uncertain classification.
- File or line count may rule out `compact` but never justify it.
- Return the mode and reason, changed behavior or contract, entry points, validation baseline, applicable repository instructions, domain skills, [review roles](#review-roles), and packets. `compact` gets one packet covering every change; `specialist` gets one named packet per specialist, overlapping only for cross-target behavior.
- Return planning output only; do not spawn reviewers or report findings and guesses.

### Step 2: Assign reviewers and perform review

- For `compact`, spawn one fresh compact reviewer. If its candidate list is nonempty, give the candidates, their packet, and evidence to one fresh [final finding validator](#final-finding-validator-instructions). Preserve its completed and incomplete scope.
- For `specialist` mode, spawn one fresh subagent per selected specialist with its named packet, in batches when necessary to leave capacity for specialist-owned children.
- Collect validated reviewer reports and reproduction results. If new context or expertise can settle unresolved IDs, give only those IDs and all prior evidence to one fresh resolver with `fork_turns="none"`; never rerun the reviewer assignment, repeat a completed reproduction, or revisit confirmed and rejected IDs. Otherwise preserve them as an incomplete review.

### Step 3: Produce final review report to user

- Build a finding ledger from every validator-confirmed stable ID and merge IDs only when they describe the same root cause. If validated reports conflict, give only the conflicting IDs and prior evidence to one fresh resolver with `fork_turns="none"` before finalizing; resolvers follow the final finding validator instructions.
- Outside that conflict path, do not inspect code, rerun validation, or spawn agents during Step 3; deduplication alone never justifies a resolver.
- Account for every confirmed ID exactly once as its own final finding or as a source of an explicitly merged final finding. Do not omit confirmed findings because of priority, materiality, report length, readability, or ease of cleanup; priority only controls ordering and labels.
- Reconcile the ledger before responding and report a compact accounting line with confirmed review findings, final comments, duplicate merges, and omitted findings. The omitted count must be zero.
- Report review target, selected mode, actual reviewers and validators used, findings summary, every confirmed detailed comment, and a verified, deduplicated `Human review` section; use `None.` when no human review is required.

## Review roles

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
- Compact reviewers also review readability and style waste directly using applicable language, framework, and CSS skills; they do not spawn children.
- Waste specialists partition the scope into non-style and style-bearing sections without reviewing style waste directly.
- If non-style code exists, spawn one readability child for the combined scope. Give it the exact code scope, applicable repository and language or framework instructions, and [code readability reviewer instructions](#code-readability-reviewer-instructions); verify and merge its evidence.
- If style-bearing code exists, spawn one CSS child for the combined scope. Give it the exact style scope, applicable CSS skill, and [CSS waste reviewer instructions](#css-waste-reviewer-instructions); verify and merge its evidence.

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
