# Plan the review

The planner prepares and returns only the review plan without launching agents.

For code-review instructions, use only this file and the [model policy](models.md).

1. Identify the exact target and entry points.
   - Honor an explicit target.
   - Otherwise, review all uncommitted changes together, including staged, unstaged, and untracked files. The staging split does not count as a finding.
   - If there are no uncommitted changes, fetch the remote default branch and review the whole current branch against its fresh remote-tracking ref.
2. Prepare the [feature brief](#feature-brief). Record `Available validation evidence` for the exact target and actual status of each known check. Use `Unavailable` when none exists.
3. Collect applicable global and repository instructions, including nested ones, relevant docs and tool configuration, domain skills, and patterns in nearby code and shared helpers. Record each source, scope, and exception. Resolve conflicts by instruction priority.
4. Give every applicable role from the supplied list an owner.
   - Combine compatible roles for a small, coherent assignment.
   - Split independent responsibilities. Reviewers with different responsibilities may share code context.
   - For substantial UI or state changes with substantial tests, separate product behavior from test protection. Cover frontend interaction where applicable.
5. Return three parts.
   - Shared context with the source and target, feature brief, changed behavior or contracts, entry points, validation evidence, and applicable guidance.
   - Reviewer routing with each assignment's role names as supplied, applicable skills, model settings, and any escalation reason.
   - One named packet per specialist with only the responsibility and relevant code or context.

## Feature brief

- Write one short brief for the whole change set. Include the target, goal, expected behavior, how the main changes connect, key contracts and constraints, and gaps in the available context. Cite the sources of requirements and accepted decisions. Distinguish stated requirements, observed behavior, and inferred intent.
