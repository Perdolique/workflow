---
name: test-audit
description: Use when adding or changing tests, reviewing whether tests earn their cost, or auditing existing tests and test-only production code. Apply across languages and test tools. Do not use only to run existing tests.
license: Unlicense
---

# Test audit

Keep a small set of tests that protects important current behavior and independent contracts. Test count, coverage, and deleted lines are not goals. Follow project test rules. This skill decides test value; tool-specific skills help with syntax and setup.

## Choose the smallest useful change

Use this order for implementation and audits. Keep audits read-only unless the user asks for cleanup.

1. **Confirm the current requirement.** Use the task, active contracts, and production callers to identify behavior that must remain, change, or go away. An old test or unused helper does not by itself make behavior required. Public contracts may have external callers that are not in this repository.
2. **Find the existing protection.** Follow the relevant entry point and its callers to related tests, including table rows, shared fixtures, and tests at other layers. Read their inputs, assertions, and mocks; check that the tests run in the relevant setup or CI job. Compare the actual failures they catch, not their names or file locations.
3. **Reuse sufficient tests.** If existing tests already catch the relevant failure, run them; no new case is needed for that risk.
4. **Strengthen the same scenario first.** When an existing test claims the behavior but misses the bug, improve its inputs, setup, or assertions. Preserve the other required behavior it proves. For example, use mixed-case input in an existing normalization test instead of adding a second test while leaving the original weak.
5. **Add only important missing protection.** Name the supported scenario, the concrete harm to a user or caller, and a plausible wrong change that existing tests would miss. Compare that risk with the test's setup, runtime, and maintenance cost. Add a table row for a useful input variant; use a separate test when different state or a separate contract needs it. Small, reversible changes need no new test when no important risk justifies one.
6. **Remove obsolete and duplicate proof.** Delete tests of retired requirements. Consolidate tests that catch the same failure and leave a named check for every required contract. Keep separate tests when they protect distinct failures or boundary risks. Keep uncertain tests and mark them unresolved.

Choose the closest useful boundary for missing protection. A public function may own a pure calculation; an API may own an HTTP contract; a browser flow may own visible behavior. A second layer needs a concrete separate risk, such as incorrect HTTP mapping, storage behavior, or focus after navigation. A regression label or a new source branch alone does not justify another case.

### Remove a feature

Keep checks of shared behavior and required negative outcomes, such as denying access. Remove unused fixtures, but preserve data differences that prove the remaining contract, even if the remaining code does not read those fields. For example, after removing repository and feature options from usage totals, keep rows from different repositories and features, plus another environment, to prove that the total covers the whole requested environment.

An absence check needs a current requirement and a credible failure in remaining code, such as shared controls appearing on the wrong tab. Confirm its value before proving a regression: restoring deleted code to make a test fail only proves that it detects that change.

### Test the proof

A new test must pass these checks. For an existing test, a failed check calls for investigation, not automatic deletion.

- Make the target decision observable: satisfy unrelated prerequisites and choose inputs that distinguish the required result from a plausible wrong one. For ordering, cancellation or pending-state guards, keep work pending through the competing action and release it in a controlled order. Repair a test that still passes when its protected behavior is removed.
- Trace the expected result. Did the code under test, a mock, or a fixture create it? Use an independent expectation and exercise the product's decision.
- Rename a private function or change source shape without changing behavior. Would the test fail? Keep it only when the exact name, key, path, or text is the contract.
- Trace the production path. If a test needs an export, flag, wrapper, or injection point with no production caller, test the real boundary instead. Exercise claimed capabilities, not just their flags.

Keep independent checks of required contracts, even if static or slow: public APIs, wire formats, config defaults, migrations, storage, security rules, package and release contracts, and exact user-facing keys, paths, or text. Check order and timing when users or callers observe them. Source inspection can protect an exact byte or path.

For a bug regression, moved test, or replacement test, prove it fails without the protected behavior and passes with it. Use the pre-fix version or a controlled change. If proof cannot run, report that limit.

## Choose audit scope

Use the user's explicit scope first. Otherwise, choose the first available scope below:

1. All uncommitted changes, including staged, unstaged, and untracked files.
2. The current branch's changes against the fresh remote default branch.
3. The whole project when neither change set has changes, or Git comparison is unavailable.

For a change set, inspect changed tests and tests near changed behavior, even if no test file changed. Assess whether a new test covers a distinct risk. Report when there is no related test or testable behavior. Do not widen a nonempty change set into a full audit only because it has no tests.

## Audit with evidence

Read each test in scope, its production path, callers, and overlapping tests. Check setup and CI routing; use history when its purpose is unclear. Judge assertions and the actual failure path.

For each test, record its location, current contract, actual failure it catches, and one decision: retain, repair, consolidate, or delete. Apply the procedure above and name the remaining check for each required contract.

For a whole-project audit, inventory every test file and declaration. Decide on each test, working in groups when useful. Track unfinished groups; call the audit complete only when every test has a decision.

A test that already fails may reveal a product defect. Investigate before editing it. Remove test-only production code during cleanup only after checking non-test callers and remaining proof.

## Validate and report

Record baseline results and remaining checks before editing. After each group of edits, compare removed assertions and fixture differences with the remaining proof. Run focused tests and required project checks; broaden checks when the changed boundary calls for it. Running broader checks does not by itself require writing more tests.

Report scope, decisions and evidence, retained contracts, checks run, baseline product failures, and unfinished audit groups. Explain which important gap a new case fills, or why no new case is needed.
