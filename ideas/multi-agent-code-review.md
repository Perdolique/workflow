# Multi-agent code review orchestration

## Status

Idea for later evaluation. This document does not define active repository instructions or an implemented skill.

## Motivation

Coding agents can generate changes faster than a human reviewer can inspect them. A single general-purpose review agent may also lose coverage when a large diff, many review criteria, repository context, tool output, and intermediate reasoning compete for the same context window.

The proposed solution is to evolve the existing [code-review skill](../skills/code-review/SKILL.md) into an orchestrator that delegates independent review areas to focused subagents. The objective is not to maximize the number of review comments. It is to improve recall for material defects while preserving evidence quality, restraint, and useful human oversight.

## Core recommendation

Use one subagent per coherent class of risk, not one subagent per small checklist item. Very fine-grained delegation can create duplicate repository exploration, high token cost, noisy results, and blind spots between adjacent responsibilities.

The main agent should coordinate the review, select only applicable specialists, verify and deduplicate their findings, and produce the final report. Specialist outputs should be treated as candidates that require evidence, not as conclusions accepted by vote.

## Proposed review flow

1. Resolve the exact review target, such as a branch diff, commit, pull request, or uncommitted changes.
2. Read applicable repository instructions and identify relevant domain skills.
3. Map the changed surfaces, affected contracts, and material risk signals.
4. Select only the specialist reviews that apply to the change.
5. Spawn the selected specialists in parallel and wait for all results.
6. Verify evidence, merge findings with the same root cause, reject unsupported claims, and assign final priorities.
7. Produce actionable findings, critical human-review questions, and a short coverage summary that explains which specialist reviews ran or were skipped.

## Candidate specialist roles

| Specialist | When to use | Primary responsibility |
| --- | --- | --- |
| Behavior and contracts | Almost every non-trivial change | Reachable logic, state transitions, cross-file behavior, regressions, API contracts, and backward compatibility |
| Tests and regressions | Behavior or tests changed | Whether tests protect the intended contract, fail when that contract is removed, and cover material negative cases |
| Security and privacy | Authentication, authorization, untrusted input, network access, files, secrets, or sensitive logging changed | Concrete attacker paths, authorization mistakes, unsafe data exposure, and security consequences |
| Data and concurrency | Database access, migrations, caches, queues, jobs, transactions, or asynchronous state changed | Data loss, invalid lifecycle transitions, transaction boundaries, idempotency, races, and production-data assumptions |
| Frontend experience | Components, templates, styles, accessibility, responsive behavior, or browser interactions changed | User-visible states, accessibility, interaction behavior, layout risks, and visual regressions |
| Waste and maintainability | Refactors, new abstractions, generated code, or substantial structural changes | Dead, duplicate, temporary, speculative, or unnecessarily complex code and artifacts |
| Performance and operations | Hot paths, queries, large collections, deployment configuration, or production resource usage changed | Material performance or operational problems under supported workloads |

The behavior-and-contracts specialist also provides a cross-cutting view so that defects spanning several categories do not fall between narrowly scoped specialists.

## Adaptive applicability

The orchestrator should not spawn every specialist for every review. A backend-only change should normally skip frontend and CSS review, while a presentation-only change should normally skip database and migration review.

Applicability should be inferred from changed paths, imports, repository instructions, configuration, and behavior rather than file extensions alone. For example, a TypeScript file can contain rendered HTML, database access, authorization policy, or an external wire contract.

When applicability is uncertain and the potential impact is material, the orchestrator should run a short specialist applicability check instead of silently skipping the category. The final coverage summary should make the decision visible, for example:

```text
Ran: behavior and contracts, data and concurrency, tests and regressions
Skipped: frontend experience - no user interface or rendered output changed
Skipped: security and privacy - no trust boundary, authorization, untrusted input, secret, or sensitive data handling changed
```

## Specialist output contract

Each specialist should receive the same exact review target and a clearly bounded responsibility. It should read only the changed code and the context required to understand it, plus applicable repository instructions and domain skills.

Each specialist should:

- Report only verified issues introduced, exposed, or worsened by the change.
- Use one finding per root cause at the narrowest relevant `file:line`.
- Explain the triggering scenario, impact, evidence, and smallest correction.
- Avoid speculative findings, generic advice, and comments already enforced deterministically by CI.
- Return no findings when no actionable issue exists.
- Keep unresolved human judgment questions separate from verified defects.

## Aggregation and verification

The main agent should not concatenate specialist responses. It should verify the strongest claims against the code, combine duplicates by root cause, resolve conflicting priorities, and discard findings that lack a reachable trigger or material impact.

Agreement between several agents is not evidence by itself because agents using the same model can make correlated mistakes. Findings should be supported by code paths, contracts, tests, current documentation, focused non-mutating reproductions, or other concrete evidence.

For a very large or high-risk review with many candidate findings, a separate verifier subagent may challenge the candidates before final synthesis. Its responsibility should be validation rather than another broad search for new issues.

## Human attention

Each specialist may nominate human-attention candidates, but the main agent should decide which candidates appear in the final report. The main agent has the broadest view of the requested change, specialist findings, skipped coverage, and interactions between subsystems.

A human-attention item should contain:

1. The exact file and location.
2. A concrete decision or question.
3. Why the repository and available evidence cannot answer it.
4. The consequence of choosing incorrectly.
5. What the human reviewer should inspect, decide, or confirm.

Human attention is most valuable for changes involving undocumented product semantics, external consumers absent from the repository, authorization policy, irreversible data migrations, real production-data properties, rollout assumptions, operational trade-offs, or visual product judgment.

The section must not become a place for unverified bug reports or generic advice such as "check the business logic." It should contain only a few critical, concrete questions and may be empty when no expert decision is required.

Example:

```text
server/orders/cancel.ts:84

Confirm whether cancelling a captured order must issue a refund. The repository contains no product rule for this state, while the new code only removes the local order. If refunds are required, customers can remain charged after cancellation.
```

## Responsibility boundaries

The global code-review skill should own the reusable review workflow, applicability routing, evidence requirements, aggregation rules, and report format.

Domain skills should own technology-specific guidance for TypeScript, Vue, CSS, Drizzle, Cloudflare, Playwright, Vitest, and other platforms. The orchestrator should load only the domain skills relevant to the current change instead of copying every framework checklist into one large review skill.

Root and nested `AGENTS.md` files should own repository-specific and service-specific invariants, such as compatibility guarantees, data boundaries, lifecycle requirements, external consumers, and recurring product constraints.

CI should own deterministic mechanical checks such as formatting and ordinary lint violations. Review agents should focus on judgment that cannot be expressed reliably as a deterministic check.

## Benefits

- Separate context budgets reduce interference between unrelated review criteria.
- Focused prompts can improve depth and consistency for each material risk class.
- Independent read-heavy work can run in parallel.
- Explicit coverage makes skipped review areas visible.
- Specialist performance can be evaluated and improved independently.
- Domain skills and scoped repository instructions allow the global workflow to adapt across different codebases.

## Risks and trade-offs

- Token usage and duplicated repository exploration increase with the number of specialists.
- Excessive specialization can miss defects at category boundaries.
- Specialists can generate duplicate or contradictory findings.
- Agents using the same model may share the same incorrect assumptions.
- The applicability decision can incorrectly skip a relevant specialist.
- Aggregation can overload the main context if specialist outputs are not concise.
- Small or mechanical changes may cost more to orchestrate than to review with one agent.
- Huge diffs may require decomposition by subsystem before decomposition by risk category.

## Evaluation plan

Compare the orchestrated skill against the current single-agent code-review skill on representative real or seeded diffs. The evaluation set should include:

1. A known correctness defect.
2. A safe counterexample that must not produce a finding.
3. A backend-only change that should skip frontend review.
4. A cross-category defect spanning an API contract and data behavior.
5. A change containing an undocumented product decision that should produce a human-attention question rather than a speculative finding.
6. A small clean diff that should use minimal delegation and produce no actionable findings.

Measure:

- Recall for known material defects.
- False-positive rate.
- Unsupported-claim rate.
- Duplicate-finding rate.
- Usefulness and precision of human-attention items.
- Token usage and review duration.
- Correct specialist selection and skip decisions.

More comments should not count as a better review. The target is higher material-defect recall without unacceptable noise or cost.

## Suggested first version

1. Extend the existing code-review skill instead of creating a second overlapping review skill.
2. Add change mapping and adaptive specialist selection.
3. Use a small set of coherent specialist roles with one cross-cutting behavior reviewer.
4. Require a compact, evidence-based output contract from every specialist.
5. Keep verification, deduplication, prioritization, and final human-attention selection with the main agent.
6. Evaluate the workflow against the existing skill before creating permanent named custom agents or assigning different models to roles.

## References

- [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [Build skills](https://learn.chatgpt.com/docs/build-skills)
- [Custom Code Review rules for Codex](https://developers.openai.com/blog/custom-code-review-rules-for-codex)
