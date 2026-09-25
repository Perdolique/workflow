---
name: test-audit
description: Use when adding or changing tests, reviewing whether tests earn their cost, or auditing existing tests and test-only production code. Apply across languages and test tools. Do not use only to run existing tests.
license: Unlicense
---

# Test audit

Keep tests that catch a distinct, credible failure of observable behavior or an independent contract. Test count, coverage, and deleted lines are not goals. Follow project test rules. This skill decides test value; tool-specific skills help with syntax and setup.

## Gate new and changed tests

Before adding a test or a new case to an existing test, answer these questions from the code and current coverage:

1. What observable behavior, invariant, or independent contract does it protect?
2. What plausible change would break that contract and make this test fail?
3. Which existing test would catch that change? If one already does, what separate risk does the new test cover?
4. What is the closest useful boundary for this contract? A public function may own a pure calculation; an API may own an HTTP contract; a browser flow may own visible behavior.

If an answer is missing, do not add the case; explain why. Prefer one test at the owning boundary. Add a table row for another input to the same contract. A second layer needs a separate transport, storage, or user risk. Small, reversible changes need no new test when existing checks cover their risk.

### Test the proof

A new test must pass these checks. For an existing test, a failed check calls for investigation, not automatic deletion.

- Remove the named behavior. Would the test still pass because it asserts no useful result or an earlier guard rejects first? Repair it.
- Trace the expected result. Did the code under test, a mock, or a fixture create it? Use an independent expectation and exercise the product's decision.
- Rename a private function or change source shape without changing behavior. Would the test fail? Keep it only when the exact name, key, path, or text is the contract.
- Remove this test. Which remaining test catches its plausible bug? Keep both only if they cover separate boundary risks.
- Trace the production path. If a test needs an export, flag, wrapper, or injection point with no production caller, test the real boundary instead. Exercise claimed capabilities, not just their flags.

Keep independent checks of required contracts, even if static or slow: public APIs, wire formats, config defaults, migrations, storage, security rules, package and release contracts, and exact user-facing keys, paths, or text. Check order and timing when users or callers observe them. Source inspection can protect an exact byte or path.

For a bug regression or replacement test, prove it fails without the protected behavior and passes with it. Use the pre-fix version or a controlled change. If proof cannot run, report that limit.

## Choose audit scope

Use the user's explicit scope first. Otherwise, choose the first available scope below:

1. All uncommitted changes, including staged, unstaged, and untracked files.
2. The current branch's changes against the fresh remote default branch.
3. The whole project when neither change set has changes, or Git comparison is unavailable.

For a change set, inspect changed tests and tests near changed behavior, even if no test file changed. Assess whether a new test covers a distinct risk. Report when there is no related test or testable behavior. Do not widen a nonempty change set into a full audit only because it has no tests.

## Audit with evidence

Read each test in scope, its production path, callers, and overlapping tests. Check setup and CI routing; use history when its purpose is unclear. Judge assertions and the actual failure path.

For each test, record its location, protected contract, actual failure it catches, and one decision: retain, repair, consolidate, or delete. Name the remaining check for each required contract. Repair tests that pass for the wrong reason. Consolidate duplicates at the owning boundary. Delete only when another check covers the contract or no contract is required. Keep uncertain tests and mark them unresolved.

For a whole-project audit, inventory every test file and declaration. Decide on each test, working in groups when useful. Track unfinished groups; call the audit complete only when every test has a decision.

A test that already fails may reveal a product defect. Investigate before editing it. Remove test-only production code during cleanup only after checking non-test callers and remaining proof.

## Validate and report

Keep audit requests read-only; edit when the user asks for cleanup. Record baseline results and remaining checks before editing. After each group of edits, compare removed assertions with remaining tests. Run focused tests and required project checks; broaden checks when the changed boundary calls for it. Prove moved or replacement tests fail without their protected behavior and pass with it.

Report scope, decisions and evidence, retained contracts, checks run, baseline product failures, and unfinished audit groups. Explain briefly why you skipped a new test.
