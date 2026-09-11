# Evaluate instructions

Test behavior, skill selection, or how instructions work together when a wording review cannot give enough confidence.

## Evaluation data

Use an existing `evals/evals.json` when available. It contains `skill_name` and an `evals` array.

Each case contains:

- `id`: unique case identifier.
- `prompt`: realistic task given to the executor.
- `expected_output`: concise description of success.
- `files`: input paths relative to the evaluated skill directory.
- `expectations`: independently verifiable statements about the result or actions.

Preserve existing cases unless the intended behavior changes. Add or revise a case only for an important requirement that the current set does not test.

## Design useful cases

- Derive cases from the intended behavior, observed failures, and close alternatives that must remain valid.
- Include ordinary matching tasks, boundary cases, and likely near-misses when testing selection.
- Make each expectation capable of detecting a regression. Do not grade wording, headings, or file size unless they are the actual contract.
- Avoid telling the executor the desired solution, suspected failure, or grading expectations.

## Run comparable executions

Use the same case, inputs, model, permissions, and environment for every compared version.

- For a new skill, compare execution with the skill against execution without it.
- For an update, preserve the original version and compare it against the candidate.
- Give the executor only the task, input files, applicable instructions, and output location.
- Capture the final response, produced artifacts, relevant actions, errors, and unavailable evidence.
- Keep generated evaluation work outside the repository, preferably in a task-specific temporary directory.

Use an independent executor when the environment supports one. Otherwise, label the result as an editorial check. It does not prove behavior.

## Test selection separately

- Test automatic selection through the target agent's real skill discovery mechanism. Include realistic matching prompts and close non-matching prompts.
- Supplying the skill directly tests instruction following. It does not test automatic selection.

- Limit selection claims to the tested agent, version, configuration, and available skill set. Test other setups before making claims about them.

## Grade from evidence

Give the grader the prompt, expectations, execution record, and output artifacts. Keep the intended verdict hidden.

For every expectation, report:

- `pass` when direct evidence demonstrates the expectation.
- `fail` when direct evidence contradicts it.
- `unverified` when the available record cannot establish either result.
- Evidence identifying the relevant output, artifact, or action; explain what is missing for `unverified`.

- Inspect artifacts directly when possible. An executor's claim that a check passed is not proof.
- Keep failures with different causes separate. Count each cause once.

## Decide and iterate

- Compare the results, material regressions, unnecessary actions, and execution cost. Prefer the simplest version that meets the requirements and preserves important boundaries.

- Revise instructions only for causes supported by the results. Rerun affected cases after a material correction or an unclear result.
- Stop when the candidate meets the requirements, remaining differences do not matter, or further progress needs evidence that is unavailable.
