# Test performance

Use this procedure for a test-performance task. Preserve the protected contracts and test independence while reducing the cost of running them.

## Find the cost

1. Record the current command, test inventory, outcomes, Vitest and Node.js versions, coverage mode, pool, workers, isolation, and runner CPU and memory limits.
2. Inspect the duration breakdown and slow files. Separate test execution from imports, transforms, environment creation, and worker startup. A large setup cost needs a different change from a slow calculation or real-time wait.
3. Check the expensive boundary first. Use Node for files whose tests, imports, and setup do not need browser APIs. Keep shared setup small and use controlled timers for application delays when real elapsed time is not the contract.
4. Compare pool, cache, and worker options supported by the installed version only when they address the measured cost. `vpx vitest doctor` can help, but it runs the suite several times under different settings.

## Preserve isolation and fit the runner

- Keep the project's required isolation. A change to shared state or isolation needs checks that files still pass together and in different orders, including tests that change globals, mocks, timers, or module state.
- VM pools can reduce repeated setup, but they have different JavaScript globals and memory behavior. Check native dependencies, `instanceof` assumptions, and APIs used by the tests before choosing a pool.
- Select workers and any VM recycling limit from the runner's CPU and memory budget. Account for total memory across workers. `vmForks` and a limit measured in another repository are candidates to measure, not universal defaults.
- Inspect the current version's cache defaults before adding settings. Separate cold-cache and warm-cache measurements when caching affects the result.

## Compare equivalent runs

For a claim about suite speed, run at least three full baseline and candidate runs in alternating order. Keep test cases, assertions, input data, dependency versions, coverage, and runner conditions the same except for the intended change. Record the changed settings and any conditions you could not control.

- Report median elapsed time and the observed range for each variant. Include failed, skipped, and flaky outcomes; identify any runs excluded from timing summaries and why.
- Report worker count and observed memory alongside elapsed time. A faster run that exceeds memory limits or breaks isolation is not a usable improvement.
- Compare the test command separately from dependency installation, application builds, and the whole CI workflow. Use actual workflow start and finish times for a whole-workflow claim; label a sum of selected stages with those stages. Use summed job time and runner types when discussing resource cost; elapsed time alone does not establish lower cost.
- For a shared configuration change, verify the full affected suite after focused checks. A change to one ordinary test does not require this benchmark procedure.

## Sources

- [Vitest performance](https://vitest.dev/guide/improving-performance)
- [Test environments](https://vitest.dev/guide/environment)
- [Pools](https://vitest.dev/config/pool)
- [VM memory limit](https://vitest.dev/config/vmmemorylimit)
