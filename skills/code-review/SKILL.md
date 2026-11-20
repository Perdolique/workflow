---
name: code-review
description: Review an existing code change set for defects, regressions, risks, and maintainability issues. Use for open-ended review requests about a diff, branch, commit, pull request, or uncommitted changes. Do not use for running tests or other checks, verifying named requirements or claims, or diagnosing a specific known failure.
license: Unlicense
---

# Code review

- Keep repository files read-only.
- Use collaboration messages for review state.

## Review entry point

- Use the [launch rules](references/launch.md) to launch one orchestrator marked `internal-review-orchestrator` with the [orchestrator instructions](references/orchestrator.md). Pass the repository or worktree, review request and scope, applicable user instructions, sourced requirements and decisions, and available validation evidence.
- Forward material review updates to the user and new requirements or decisions to the orchestrator. Use the orchestrator's report as the user-facing review. If it cannot finish, report the blocked scope and any confirmed findings.
- For an internal assignment, read the files for that assignment. The [orchestrator instructions](references/orchestrator.md) link to the three workflow steps, [specialist instructions](references/specialist.md) link to child reviews, and [validation instructions](references/validation.md) cover validator and resolver assignments.
