---
name: code-review
description: Orchestrate evidence-based code reviews across focused subagents. Use when a code review is requested by the user or triggered by automated analysis.
license: Unlicense
---

# Code review

Coordinate focused subagents to review code changes and produce one verified review report.

## General instructions

- Ignore staged versus unstaged status. Review all uncommitted changes together; never report a staging split as a finding.
- Review only assigned behavior, following relevant code wherever needed; ignore unrelated concerns.
- Report checked scope and actual findings. Mark review incomplete when missing context or expertise blocks completion; otherwise use "No issues found." when none exist.

## Workflow

### Step 1: Target and identify specialists

- Use one subagent to identify review source: branch, commit, pull request, or uncommitted changes. Ask user when source is unclear.
- Split changes into assignment packets containing behavior or contract, changed entry points, and [specialists](#specialist-roles). Cover every change; overlap only for cross-target behavior.
- Return packets only; do not report findings or guesses.

### Step 2: Assign specialists and perform review

- Spawn one subagent per specialist. Give assigned packets, [general instructions](#general-instructions), and role instructions; do not ask specialists to rediscover scope.
- Collect reports. Resolve incomplete reviews before Step 3 by supplying missing context or expertise and rerunning affected specialists.

### Step 3: Produce final review report to user

- Verify evidence against code, merge duplicate root causes, reject unsupported claims, and assign final priorities.
- Report review target, specialist, findings summary, and detailed comments.

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

Review dead, duplicate, temporary, speculative, or unnecessarily complex code and artifacts.

### Frontend and user experience

Review user-visible states, accessibility, interaction behavior, layout risks, and visual regressions.
