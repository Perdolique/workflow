---
name: code-review
description: Orchestrate evidence-based code reviews across focused subagents. Use when a code review is requested by the user or triggered by automated analysis.
license: Unlicense
---

# Code review

Coordinate focused subagents to review code changes and produce one verified review report.

## Workflow

Strictly follow the workflow below to ensure a consistent and high-quality review process.

### Step 1: Target and identify specialists

On this step your goal is to identify high-level review targets and their associated specialists using one separate subagent, just for this purpose. You don't need to perform any code review yet on this stage, just identify targets and specialists and report them to the orchestrator.

The subagent should:

- Identify code changes to be reviewed, including branch, commit, or pull request. Ask the user for clarification if needed.
- Identify high-level review targets from code changes and specialists required for each target from the [Specialist roles](#specialist-roles) section.
- Report identified review targets and associated specialists to the orchestrator.

### Step 2: Assign specialists and perform review

On this step your goal is to assign specialists to each review target and perform code review using one separate subagent per specialist. Each subagent should strictly focus on their assigned target and produce a review report to the orchestrator.

The orchestrator should:

- Assign specialists to each review target based on the report from Step 1.
- Collect review reports from each specialist subagent.

### Step 3: Produce final review report

On this step your goal is to produce the final review report based on collected review reports from Step 2. Verify the reported evidence against the code, merge duplicate findings by root cause, and reject unsupported claims before assigning final priorities. You should strictly follow the format below and provide clear and actionable feedback.

Each review report should include:

- Review target
- Assigned specialist
- Summary of findings
- Detailed comments and suggestions

## Specialist roles

### Behavioral and contract

**Primary responsibility:** behavioral logic, state transitions, cross-file behavior, regressions, API contracts, and backward compatibility. Does code do what it is supposed to do on the surface, and does it continue to do so in the future?

### Data and concurrency

**Primary responsibility:** data loss, invalid lifecycle transitions, transaction boundaries, idempotency, races, and production-data assumptions. Does code handle data correctly and safely in a concurrent environment?

### Security and vulnerability

**Primary responsibility:** concrete attacker paths, authorization mistakes, unsafe data exposure, and security consequences. Does code introduce security vulnerabilities or unsafe data exposure?

### Privacy and data protection

**Primary responsibility:** privacy violations, data leaks, and unsafe data handling. Does code handle sensitive data in a privacy-preserving way?

### Performance and resource usage

**Primary responsibility:** time and space complexity, algorithmic efficiency, caching, and resource management. Does code perform efficiently and use resources wisely under supported workloads?

### Test and regressions

**Primary responsibility:** whether tests protect intended contract, fail when that contract is removed, and cover material negative cases.

### Waste and maintainability

**Primary responsibility:** dead, duplicate, temporary, speculative, or unnecessarily complex code and artifacts.

### Frontend and user experience

**Primary responsibility:** user-visible states, accessibility, interaction behavior, layout risks, and visual regressions. Does code provide a comfortable, consistent, and up-to-date user experience?
