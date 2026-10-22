# Test performance

Use this procedure when optimizing test runtime, fixtures, workers, or shards. Keep the browser behavior, network boundaries, test independence, and failure evidence that the suite protects.

## Find the cost

1. Record the effective command, test cases and outcomes, browser projects, build revision, fixture data, tool versions, workers, shards, retries, traces, and runner limits.
2. Separate build and server startup from test execution. Inspect slow tests and repeated fixture work before changing parallelism.
3. Check repeated real-time waits, broad request handlers, expensive setup, and unfinished async listeners. Apply the main skill's clock, readiness, routing, and cleanup guidance to the measured cost.

Use a glob or regular expression when narrowing interception traffic. A URL predicate can skip the handler, but Playwright still registers a catch-all interception pattern to evaluate that function in the test process. Preserve the same blocked destinations, local-origin blob URLs, scenario overrides, and diagnostic payloads. Routing still disables HTTP cache, so a narrower matcher does not restore normal browser caching.

## Compare equivalent runs

For a claim about suite speed, compare at least three full baseline and candidate runs in alternating order. Keep cases, assertions, browser projects, fixture and translation data, tool versions, and runner conditions the same except for the intended change. Use the current build for each variant, disable retries, and record any conditions you could not control.

- Report the median and observed range. Include failed, skipped, and flaky outcomes; identify any runs excluded from timing summaries and why.
- Measure builds separately. Distinguish test-step duration, time until the required result is available, and full workflow time. Use actual workflow start and finish times for a full-workflow claim; label a sum of selected stages with those stages.
- Record workers per shard, shard count, runner types, and summed job time. A shorter wait with more concurrent runners does not by itself establish lower resource use or cost. Check the runner's CPU and memory limits before increasing parallelism.
- Keep cold-cache and warm-cache comparisons separate when caching affects the result. Treat unrelated build-time changes as variation, not proof that the test change caused them.
- Ordinary test additions need focused verification and the project's required checks, not this repeated benchmark procedure.

## Keep sharded CI verifiable

- Reuse one build artifact across shards when they test the same build. Check that the combined shards run the complete intended test and browser inventory.
- Preserve the required final check name. Make its result depend on every required shard; a failed, cancelled, skipped, or missing shard cannot produce a successful overall result.
- Preserve failure diagnostics and merge per-shard reports using the installed Playwright version. Make the final check fail when a required report is missing and identify the missing report. Match trace mode to the effective retry policy.

## Sources

- [Clock](https://playwright.dev/docs/clock)
- [Routing](https://playwright.dev/docs/api/class-page#page-route)
- [Async listener cleanup](https://playwright.dev/docs/api/class-page#page-remove-all-listeners)
- [Parallelism](https://playwright.dev/docs/test-parallel)
- [Sharding and merged reports](https://playwright.dev/docs/test-sharding)
