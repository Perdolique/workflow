---
name: code-review
description: Review changed code and report evidence-backed findings. Use whenever the user asks for a code review or wants code inspected for problems, including pull requests and other diffs.
license: Unlicense
---

# Code review

Review code without modifying it unless the user asks for fixes.

## Scope

- Read repository instructions and relevant domain skills.
- For a diff, review changed code plus enough context to understand its behavior. Review the full repository only when requested.
- Report pre-existing problems only when the change exposes, worsens, or depends on them.
- Verify suspected issues through callers, tests, configuration, or focused checks when useful. Do not report assumptions or style preferences as defects.

## Review areas

### Correctness

Verify changed behavior against its contract. Flag reachable logic errors, broken edge cases, invalid state transitions, data loss, and regressions.

### Waste

Flag code with no current purpose: unused, dead, unreachable, or duplicate code; debug or temporary artifacts; commented-out implementations; unsupported compatibility paths; meaningless wrappers; speculative abstractions; stale TODOs; accidental generated files. Recommend deletion. A shorter alternative alone does not make code waste.

### Security

Trace untrusted and sensitive data across trust boundaries to its sinks. Check authentication, authorization, validation, encoding, injection, file and command access, deserialization, secrets, logs, sessions, cryptography, dependencies, configuration, fail-open errors, races, and resource abuse.

Require a plausible attacker path and concrete consequence. Do not claim the code has no vulnerabilities. Mention material coverage gaps. Use current official platform guidance, OWASP, and CWE when needed.

### Performance

Flag material problems in supported workloads: poor or unbounded complexity, repeated or unnecessarily serial I/O, N+1 access, repeated hot-path work, resource leaks, missing bounds or backpressure, and blocking work on latency-sensitive threads.

State the triggering workload and impact. Prefer measurements or clear complexity or I/O evidence. Do not request caching, concurrency, indexes, or micro-optimizations without a material benefit.

## Findings

- Order findings by severity: P0 critical, P1 high, P2 actionable before merge, P3 real cleanup or localized risk.
- Use one finding per root cause with the narrowest relevant `file:line`.
- Explain the trigger, impact, and smallest correction.
- If no findings exist, say `No actionable findings.` and note only material unverified areas.
