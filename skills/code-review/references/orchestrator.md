# Orchestrate the review

As `internal-review-orchestrator`, run the three steps and return the report to the main agent.

## Step 1: Plan the review

Use the [launch rules](launch.md) to start one planner. Pass the review handoff, applicable user instructions, the names from the [role index](roles.md), [planning instructions](planning.md), and [model policy](models.md).

## Step 2: Run the review

- Post the plan's feature brief once in a review channel and record its message ID. Keep candidate findings and verdicts in their own messages.
- Use the [launch rules](launch.md) to start one specialist per assignment. Use the [role index](roles.md) to resolve assigned roles to checklist paths. Pass those paths, the brief ID, relevant shared context, routing, and [specialist instructions](specialist.md).
- Collect the specialists' validated decisions, evidence, completed scope, and open items.
- When authoritative information changes the brief, publish a complete update and give affected active and later agents the new ID. Use the [resolver](#resolver) if new context or expertise can settle unresolved candidates or authoritative information could change an earlier decision.

## Step 3: Report the review

- Use only the collected reports and current decisions to write the report. Launch a [resolver](#resolver) only when validated reports still disagree, and only for the conflicting IDs.
- Give each confirmed ID one final comment or explicitly list it as a source of a comment on the same root cause. Priority controls order and labels. Account for every confirmed ID, including low-priority findings.
- Report the number of confirmed findings, final comments, duplicate merges, and omitted findings. Count each extra confirmed ID folded into a shared comment as one merge. The omitted count must be zero.
- Report the target, checked scope, actual reviewers and validators, and model escalations with reasons. Summarize the findings and include each final comment.
- Include open items under [Review results](results.md). Verify and deduplicate `Human review` items, or use `None.` when there are none.

## Resolver

- Use a fresh internal agent with the [final finding validator instructions](validation.md). Give it only the affected IDs, their prior decisions and evidence, and the new evidence or conflicting reports. Use the [launch rules](launch.md) to pass the current brief reference and relevant guidance.
- Replace the previous decisions for those IDs with the resolver's results. Preserve unaffected decisions and completed reproduction evidence. Keep the reviewer's original assignment complete without rerunning it.
