---
name: code-review
description: Review changed code and report evidence-backed findings. Use whenever the user asks for a code review or wants code inspected for problems, including pull requests and other diffs.
license: Unlicense
---

# Code review

Review code without modifying it unless the user asks for fixes.

## Scope

- Read repository instructions and relevant domain skills.
- Review changed code and only the context needed to understand it.
- Review the full repository only when requested.
- Do not run repository linters, type checks, builds, or tests during review; use focused non-mutating reproductions only to verify specific issues.
- Report only verified issues introduced, exposed, or worsened by the change, including pre-existing issues it depends on.

## Review areas

### Correctness

- Flag contract violations, reachable logic errors, broken edge cases, invalid state transitions, data loss, and regressions.

### Style

- Flag violations of project conventions and concrete readability or consistency problems.
- Include subjective style suggestions, clearly labeled as preferences.

### Waste

- Flag unused, dead, duplicate, temporary, or speculative code and artifacts.
- Recommend deletion when they have no current purpose.

### Security

- Flag plausible vulnerabilities with a concrete attacker path and consequence.

### Performance

- Flag material problems in supported workloads and state the triggering workload and impact.
- Do not suggest optimizations without a material benefit.

## Findings

- Use one finding per root cause at the narrowest relevant `file:line`.
- Explain the trigger, impact, and smallest correction.
- If no findings exist, say `No actionable findings.`
