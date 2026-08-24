---
name: cost-aware-development
description: Use when planning, implementing, or reviewing a change that can materially affect infrastructure cost, metered usage, plan allowances, or subscription requirements in a project using Cloudflare, Neon, HIBP, or GitHub Actions. Confirm the provider is actually used or proposed from repository evidence and read only its matching reference. Skip unrelated changes and projects without covered services. Preserve correctness and user experience, and present material cost trade-offs before implementation.
---

# Cost-aware development

Use the user's existing services and subscriptions as implementation context. Seek lower incremental cost when it solves the current problem cleanly, without turning every change into a cost exercise.

## Establish applicability

Apply this skill only when both conditions are true:

1. Repository instructions, configuration, dependencies, bindings, CI, existing code, or the requested design show that the project uses or is considering a covered service.
2. The task can materially change a paid resource, metered usage, an allowance, or a subscription requirement.

Do not infer provider usage from this skill's availability. If neither condition is established, stop applying the skill and continue the task without a cost report.

Covered references:

- Read [Cloudflare](references/cloudflare.md) for Workers, Service Bindings, Images, Email Sending, Workers Logs, Hyperdrive, or Workers Rate Limiting.
- Read [Neon](references/neon.md) for Postgres compute, storage, branches, or network transfer.
- Read [GitHub Actions](references/github-actions.md) for hosted runners, artifacts, caches, or custom runner images.
- Read [HIBP](references/hibp.md) for Pwned Passwords or subscription-backed HIBP APIs.

Read only the references needed for the current decision.

## Establish billing context

Before comparing designs:

1. Identify the provider account, project, repository, and plan that own the usage.
2. Determine which production, staging, preview, or development resources share an allowance.
3. Prefer current repository evidence over the personal defaults recorded in a reference. Do not assume every project uses the same account or plan.
4. Establish the relevant workload volume or express the result as a threshold. Do not invent traffic, storage, email, log, build, or compute figures.
5. Treat reference prices as a dated cache. When a recommendation depends on an exact price or allowance, verify it against the linked official source. If current verification is unavailable, identify the stale value and uncertainty instead of presenting it as current.

Do not assume that an included allowance has unused capacity. Check observable usage when practical or state that remaining headroom is unknown.

Unknown usage or possible overage alone is not an implementation blocker and does not require approval. Require a cost decision only when repository policy, a stated budget limit, or a concrete design trade-off makes the decision material.

## Compare the incremental effect

Compare the cost difference caused by the proposed change, not the provider's entire bill.

- Check whether an already subscribed service provides the needed capability without a new paid resource.
- Prefer a simpler, lower-cost design when behavior, correctness, reliability, user experience, and operational burden are materially equivalent.
- When a cheaper design adds limits, latency, complexity, weaker reliability, reduced visibility, degraded user experience, or stronger provider coupling, explain the concrete trade-off and let the user choose before implementation.
- Do not invent a behavior-changing cost-control option merely to provide an alternative. When the direct incremental cost is small and no budget pressure or scaling evidence makes it material, report the cost without manufacturing a restriction or approval decision.
- Do not add caching, batching, retention jobs, queues, sampling, quotas, or other cost controls for hypothetical usage. Recommend them only when repository evidence, expected volume, or a clear billing threshold establishes a material benefit.
- Preserve raw technical errors in telemetry while keeping user-facing errors safe; cost reduction does not justify removing necessary diagnostics.

When cost is one factor among several, keep the technical conclusion independent: reject a cheaper design that does not meet the actual requirements.

## Communicate only useful cost information

If the change has no material cost effect, stop the cost analysis and continue the task without mentioning providers, plans, billing, allowances, subscriptions, this skill, or the absence of a cost effect.

When cost can change materially, communicate only what supports the decision:

- the billing dimension and scope
- the known or estimated incremental effect
- a lower-cost option when one is practical
- the behavioral or operational trade-off
- the user decision required before implementation, if any

If no material trade-off is established, say so rather than creating one. Use ranges or break-even thresholds when exact workload data is unavailable. Label facts, estimates, assumptions, and unknowns explicitly, and avoid false precision.
