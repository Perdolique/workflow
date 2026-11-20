# Test and regressions

- Check that tests protect the intended contract and fail when the required behavior is removed or broken.
- Check that tests cover material negative cases.
- Check that fixtures, mocks, and shared guards exercise the changed code path.
- Check that assertions distinguish the required behavior from plausible wrong outcomes.
- Apply `test-audit` to checks that expect something to be absent. Flag the check if either condition is missing.
  - A current requirement says it must be absent.
  - A plausible failure in the remaining code could break that requirement.
