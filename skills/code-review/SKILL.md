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
- Report pre-existing problems only when the change exposes, worsens, or depends on them.
- Verify suspected defects through callers, tests, configuration, or focused checks.
- Do not report unverified assumptions as confirmed defects.

## Review areas

### Correctness

- Check changed behavior against its contract.
- Flag reachable logic errors.
- Flag broken edge cases.
- Flag invalid state transitions.
- Flag data loss or corruption.
- Flag behavioral regressions.

### Style

- Check repository conventions and relevant language or framework idioms.
- Flag inconsistent naming, formatting, structure, and patterns.
- Flag unclear control flow, excessive nesting, and misleading abstractions.
- Flag code that is harder to read or maintain than necessary.
- Explain the violated convention or concrete readability cost.
- Label purely subjective suggestions as style preferences.

### Waste

- Flag unused, dead, unreachable, or duplicate code.
- Flag debug, temporary, or commented-out code.
- Flag unsupported compatibility paths.
- Flag meaningless wrappers and speculative abstractions.
- Flag stale TODOs and accidental generated files.
- Recommend deletion when code has no current purpose.
- Do not treat a shorter alternative alone as evidence of waste.

### Security

- Trace untrusted and sensitive data across trust boundaries to its sinks.
- Check authentication and authorization.
- Check validation, encoding, and injection risks.
- Check file access, command execution, and deserialization.
- Check secrets, logs, sessions, and cryptography.
- Check dependencies, configuration, and fail-open behavior.
- Check races and resource abuse.
- Require a plausible attacker path and concrete consequence.
- Mention material security coverage gaps.
- Do not claim the code has no vulnerabilities.
- Consult current official guidance, OWASP, or CWE when needed.

### Performance

- Require a material impact in supported workloads.
- Flag poor or unbounded complexity.
- Flag repeated or unnecessarily serial I/O.
- Flag N+1 access and repeated hot-path work.
- Flag resource leaks and missing bounds or backpressure.
- Flag blocking work on latency-sensitive threads.
- State the triggering workload and impact.
- Prefer measurements or clear complexity or I/O evidence.
- Require material benefit before suggesting caching, concurrency, indexes, or micro-optimizations.

## Findings

- Order findings by severity:
  - P0: critical.
  - P1: high.
  - P2: actionable before merge.
  - P3: real cleanup or localized risk.
- Use one finding per root cause.
- Point to the narrowest relevant `file:line`.
- Explain the trigger and impact.
- Suggest the smallest correction.
- If no findings exist, say `No actionable findings.`
- Note only material unverified areas.
