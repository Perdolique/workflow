---
name: vitest-unit-testing
description: Write and maintain Vitest 5 unit tests for TypeScript utilities, services, stores, and API clients. Use for unit coverage, related mocks and fixtures, and Vitest review or debugging. Adapt guidance to the project's version. Browser flows and Playwright tests use the project's browser or E2E test setup.
license: Unlicense
---

# Unit testing with Vitest

Write focused TypeScript unit tests with Vitest 5. Test observable contracts, keep each test independent, and follow the target project's established conventions.

## Establish the project context

Before editing tests, inspect the target project's:

- Vitest version and supported Node.js version
- package scripts, test root, configuration files, and named projects
- test environment, such as Node, jsdom, or Browser Mode
- cleanup settings, especially `clearMocks`, `mockReset`, and `restoreMocks`
- local naming, file placement, fixtures, helpers, and assertion style

This skill targets Vitest 5. Adapt APIs and defaults when the project uses an older version. A request to change tests does not by itself authorize a dependency upgrade.

## Choose unit-test scope

- Use this skill for TypeScript unit tests of utilities, services, stores, transforms, and API clients, including the mocks and fixtures used by those tests. Choose the test tool from the task and the project's existing setup; generic requests about mocks or fixtures do not establish the tool by themselves.
- Test behavior through the public contract. Mock external collaborators when isolation helps the test, while running the code under test normally. Keep tests independent and deterministic.

## Place and name tests

Follow the project's existing structure. When the project has no stronger convention:

- Place tests in an adjacent `__tests__/` directory.
- Name each file after its source with a `.test.ts` suffix, such as `config.ts` and `__tests__/config.test.ts`.
- Group related behavior with `describe` and write a specific outcome in each test name.

## Structure tests with AAA

Structure every test with clear Arrange, Act, and Assert sections.

```typescript
import { describe, expect, test } from 'vitest';

import { calculateTotal } from '../calculate-total';

describe(calculateTotal, () => {
  test('returns the total price for all item quantities', () => {
    // Arrange
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 }
    ];

    // Act
    const total = calculateTotal(items);

    // Assert
    expect(total).toBe(250);
  });
});
```

Use `test.each` when the same contract applies to several inputs:

```typescript
test.each([
  ['production', 'https://app.example.com'],
  ['staging', 'https://staging.example.com'],
  ['development', 'http://localhost:3000']
])('returns the base URL for %s', (environment, expected) => {
  const url = getBaseUrl(environment);

  expect(url).toBe(expected);
});
```

## Select contract cases

- Cover the normal behavior and every applicable error, edge, and boundary branch in the contract. Include `null`, `undefined`, empty values, and invalid types when the code owns validation of those inputs, such as at an external-data boundary. For internal typed code that receives already validated values, use supported inputs and do not invent unsupported cases.
- A useful replacement test fails when the protected behavior is removed. Give every test at least one assertion of its outcome, directly or through an assertion helper. Prefer exact assertions such as `toBe`, `toStrictEqual`, `toHaveLength`, `toHaveBeenCalledWith`, and `toHaveBeenCalledTimes` when they express the contract.

## Mock and clean up deliberately

Read [the mocking guide](references/mocking.md) for module mocks, spies, conditional behavior, timers, async failures, and cleanup.

In Vitest 5, `clearMocks` defaults to `true`, so call history is cleared before each test while mock implementations remain. `mockReset` and `restoreMocks` default to `false`.
Inspect the active configuration and add only the cleanup required by state that the test changes:

- Reset a mock when a test changes an implementation that later tests must not inherit.
- Restore a manual `vi.spyOn` spy when `restoreMocks` is disabled.
- Return to real timers after a test or suite uses fake timers.

- Place hoisted `vi.mock`, `vi.unmock`, and `vi.hoisted` calls at module level. Vitest 5 rejects these calls inside functions, blocks, hooks, and test or suite callbacks. Use `vi.doMock` or `vi.doUnmock` only when the test needs the non-hoisted behavior for a later dynamic import.

## Handle asynchronous behavior

Await asynchronous assertions, including `resolves`, `rejects`, `expect.poll`, and async snapshot matchers. Vitest 5 fails unawaited async assertions.

Use async timer controls when timer callbacks schedule promises:

```typescript
await vi.advanceTimersByTimeAsync(1_000);
```

When a timer triggers a rejection, create the rejection assertion before advancing time, then await both operations. This attaches the rejection handler before the promise settles.

## Keep TypeScript checks useful

- Use `vi.mocked()` for type-safe access to mocked functions.
- Use `satisfies` to check fixtures and expected payloads against known contracts without widening literal types.
- Use `@ts-expect-error` when a test deliberately passes an invalid type to verify runtime validation.
- Use the typed `vi.mock(import(...))` signature for partial module factories; its exports are optional and their returned types stay checked.

## Run the relevant tests

Use the target project's package script when it defines the correct unit-test command. Run Vitest in non-interactive mode, from the project root that owns its configuration. If the project has no suitable script, run the package directly with `vpx vitest run`.

```bash
# Project script, with a focused file when the script forwards arguments
pnpm run test:unit -- src/utils/__tests__/config.test.ts

# Direct package execution from the root that owns the config
vpx vitest run src/utils/__tests__/config.test.ts --config ./vitest.config.ts --project unit
```

- Choose the file, directory, or named project that covers the changed contract and its related mocks or fixtures. Broaden the run when the change can affect more tests. Vitest 5 does not search parent directories for configuration, so run from the correct root or pass `--config` explicitly and scope discovery as needed.
- Use coverage when the task needs coverage evidence. Use `--repeats` to investigate a suspected flaky test. Use `vpx vitest doctor` only for a test-performance investigation because it runs the suite several times under alternative configurations.

## Reference files

- [references/mocking.md](references/mocking.md) — Module mocks, spies, return behavior, timers, cleanup, assertions, and common dependency patterns
