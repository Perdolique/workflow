# Technical debt

Record confirmed problems and temporary solutions here. Keep each entry short: affected versions, current handling, evidence, and the condition for removing it. Remove resolved entries after verification.

These entries were found in the E1 compatibility experiment on 2026-10-19. Application implementation has not started.

## TD-01: pg-cloudflare socket shutdown

`pg@8.23.1` uses `pg-cloudflare@1.4.1` in Workers. After `client.end()`, the adapter can emit `This socket has been closed.` as an unhandled error. This was reproduced in workerd tests; see [upstream issue #3805](https://github.com/brianc/node-postgres/issues/3805) and [proposed fix #3806](https://github.com/brianc/node-postgres/pull/3806).

Use request-scoped clients with Hyperdrive and its [documented automatic cleanup](https://developers.cloudflare.com/hyperdrive/get-started/). Do not add a Worker-side pool or suppress client errors. Node migration tools still close their own connections. Before closing this entry, verify a released fix, explicit shutdown, and real connection failures in local Workers tests and deployed Hyperdrive. Automatic cleanup remains a valid design after the fix.

## TD-02: pg loading in Workers tests

With Vitest 5.0.5, Vite 8.3.4, and `@cloudflare/vitest-plugin@1.4.4`, direct loading of `pg` failed with `Cannot use import statement outside a module`. The experiment passed with SSR dependency optimization for `pg`, leaving Node built-ins and `cloudflare:` imports external in Rolldown. This adds no packages; see [Cloudflare's module-resolution guidance](https://developers.cloudflare.com/workers/testing/vitest-integration/known-issues/#module-resolution).

Keep this focused configuration in the test setup. Recheck it when updating these tools; remove it only when Worker/PostgreSQL tests pass without it.

## TD-03: GreenPie peer metadata

The selected Oxlint JSON preset in `eslint-config-greenpie@17.15.0` does not use its ESLint/Vue peers. A version-specific pnpm `packageExtensions` entry marks `eslint`, `@stylistic/eslint-plugin`, `eslint-plugin-vue`, and `typescript-eslint` optional, avoiding an unselected second lint stack. See [decision #216](https://github.com/example-maintainer/pantry-api/issues/216).

Recheck package metadata when updating GreenPie. Remove the adjustment when installation without it preserves the approved dependency set and typed Oxlint checks pass.
