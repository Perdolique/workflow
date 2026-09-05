# Evaluate instructions

Use evaluation to test behavior, selection, or instruction interaction when an editorial review cannot provide enough confidence.

## Evaluation data

Use an existing `evals/evals.json` when available. The supported structure contains `skill_name` and an `evals` array. Each case contains:

- `id`: unique case identifier.
- `prompt`: realistic task given to the executor.
- `expected_output`: concise description of success.
- `files`: input paths relative to the evaluated skill directory.
- `expectations`: independently verifiable statements about the result or actions.

Preserve existing cases unless the intended behavior changes. Add or revise a case only when it covers a material contract that the current set does not test.

## Design useful cases

- Derive cases from the intended behavior, observed failures, and close alternatives that must remain valid.
- Include ordinary matching tasks, boundary cases, and likely near-misses when testing selection.
- Make each expectation capable of detecting a regression. Do not grade wording, headings, or file size unless they are the actual contract.
- Avoid telling the executor the desired solution, suspected failure, or grading expectations.

## Run comparable executions

Run the same case with the same inputs, model, permissions, and environment for every compared version.

- For a new skill, compare execution with the skill against execution without it.
- For an update, preserve the original version and compare it against the candidate.
- Give the executor only the task, input files, applicable instructions, and output location.
- Capture the final response, produced artifacts, relevant actions, errors, and unavailable evidence.
- Keep generated evaluation work outside the repository, preferably in a task-specific temporary directory.

Use an independent executor when the environment supports one. If independent execution is unavailable, perform a clearly labelled editorial check and do not present it as behavioral validation.

## Test selection separately

Test automatic selection through the target agent's real skill discovery mechanism. Include realistic matching prompts and close non-matching prompts. Explicitly supplying the skill tests instruction following, not automatic selection.

A selection result applies only to the tested agent, version, configuration, and available skill set. Do not generalize it to other agents without running them.

## Grade from evidence

The grader receives the prompt, expectations, execution record, and output artifacts. It does not receive the intended verdict.

For every expectation, report:

- `pass` when direct evidence demonstrates the expectation.
- `fail` when direct evidence contradicts it.
- `unverified` when the available record cannot establish either result.
- Evidence identifying the relevant output, artifact, or action; explain what is missing for `unverified`.

Inspect artifacts directly when possible. Do not accept the executor's claim that a check passed as evidence that it passed. Keep distinct failures separate and avoid counting the same cause more than once.

## Decide and iterate

Compare expectation results, material regressions, unnecessary actions, and execution cost. Prefer the simplest version that satisfies the contract without weakening important boundaries.

Revise instructions only for causes supported by evaluation evidence. Rerun affected cases after a material correction or an ambiguous result; stop when the candidate satisfies the intended contract, remaining differences are immaterial, or further progress requires unavailable evidence.
