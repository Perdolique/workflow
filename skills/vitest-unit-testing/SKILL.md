---
name: vitest-unit-testing
description: Write and maintain Vitest unit tests for TypeScript code. Use when the user needs unit coverage for utilities, services, or stores, or asks for Vitest-based tests with mocks, spies, and assertions.
license: Unlicense
---

# Unit testing with Vitest

This skill provides patterns and conventions for writing comprehensive unit tests in TypeScript projects using Vitest.

## When to use this skill

- Writing unit tests for TypeScript utilities, services, or API clients
- Testing stores (Pinia, Zustand, etc.)
- Testing API transforms and services
- Adding test coverage to existing code
- Debugging failing tests

## Test file structure

### Location and naming

- Place tests in `__tests__/` directory next to the file being tested
- Name test files with `.test.ts` suffix matching the source file name
- Example: `config.ts` → `__tests__/config.test.ts`

### Basic structure

```typescript
import { describe, test, expect, vi, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { functionToTest } from '../module';

describe('Module name or function group', () => {
  describe(functionName, () => {
    test('should do something specific', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = functionToTest(input);

      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

## Core testing patterns

### AAA pattern (Arrange, Act, Assert)

Always structure tests with clear AAA sections:

```typescript
test('should calculate total price correctly', () => {
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
```

### Parametrized tests with test.each

Use `test.each` for testing multiple scenarios:

```typescript
describe(getBaseUrl, () => {
  test.each([
    ['production', 'prod', 'https://app.example.com'],
    ['staging', 'staging', 'https://staging.example.com'],
    ['development', 'dev', 'http://localhost:3000']
  ])('returns correct URL for environment %s', (_name, env, expected) => {
    vi.spyOn(envUtils, 'getEnvironment').mockReturnValue(env);

    const url = getBaseUrl();

    expect(url).toBe(expected);
  });
});
```

### Lifecycle hooks

```typescript
describe('Test suite', () => {
  beforeAll(() => {
    // Runs once before all tests
  });

  beforeEach(() => {
    // Runs before each test
  });

  afterEach(() => {
    // Runs after each test — restore mocks here
    vi.restoreAllMocks();
  });

  afterAll(() => {
    // Runs once after all tests
    vi.useRealTimers();
  });
});
```

## Mocking

See [references/mocking.md](references/mocking.md) for the comprehensive mocking guide.

### Quick reference

```typescript
// Mock entire module
vi.mock(import('./utils/logging'), () => ({
  logException: vi.fn()
}));

// Spy on function
vi.spyOn(module, 'functionName').mockReturnValue('result');

// Spy on getter
vi.spyOn(window.location, 'hostname', 'get').mockReturnValue('test.com');

// Fake timers
vi.useFakeTimers();
vi.setSystemTime(new Date('2024-01-01'));
vi.advanceTimersByTimeAsync(1000); // Use async version for promise-based timers

// Cleanup
vi.restoreAllMocks();
vi.useRealTimers();
```

## Best practices

### Test naming

Use descriptive test names explaining expected behavior. Start with "should" or describe the outcome. Be specific about the scenario being tested.

```typescript
// Good
test('should return empty array when no items match filter', () => {});
test('throws error when user ID is invalid', () => {});

// Bad
test('works correctly', () => {});
test('test filter', () => {});
```

### Grouping tests

Use nested `describe` blocks for organization:

```typescript
describe('UserService', () => {
  describe(getUser, () => {
    test('should fetch user by ID', () => {});
    test('should handle missing user', () => {});
  });

  describe(updateUser, () => {
    test('should update user data', () => {});
    test('should validate input before update', () => {});
  });
});
```

### Test coverage

Always test:

- Expected/happy path behavior
- Error conditions
- Edge cases (null, undefined, empty values)
- Boundary conditions

### Mock management

- Always restore mocks after tests using `afterEach` or `afterAll`
- Use `vi.hoisted()` for shared mocks referenced in module mocks
- Be specific with mock return values relevant to the test
- Only mock external dependencies, not the code under test

### Assertions

Prefer specific matchers:

```typescript
// Good — specific matchers
expect(result).toBe(true);
expect(array).toHaveLength(3);
expect(object).toStrictEqual({ id: 1, name: 'test' });
expect(fn).toHaveBeenCalledWith('expected-arg');
expect(fn).toHaveBeenCalledTimes(1);

// Less specific but sometimes necessary
expect(result).toBeTruthy();
expect(result).toBeFalsy();
```

## Running tests

Always use the `runTests` tool instead of running tests manually in terminal. The tool automatically runs tests in non-interactive mode and provides structured output for validation.

If you must use terminal commands, use the CI/non-interactive mode of the project's test script (e.g., `vitest run` or the project's equivalent). Never use a command that starts interactive watch mode.

```bash
# ❌ NEVER use watch mode
npx vitest

# ✅ Use run mode for specific test files
npx vitest run src/utils/__tests__/config.test.ts

# Run with coverage
npx vitest run --coverage

# Run all tests in CI mode
npx vitest run
```

Check the project's `package.json` for available test scripts — many projects define shortcuts like `test:unit`, `test:unit:ci`, or similar.

## Common pitfalls to avoid

1. **Don't forget to restore mocks** — Always use `afterEach` or `afterAll` with `vi.restoreAllMocks()`
2. **Don't test implementation details** — Test behavior, not internal workings
3. **Don't create interdependent tests** — Each test should be independent
4. **Don't mock everything** — Only mock external dependencies, not the code under test
5. **Don't write tests that pass without assertions** — Every test needs at least one `expect()`
6. **Don't use real timers when testing time-dependent code** — Use `vi.useFakeTimers()`

## TypeScript considerations

- Use `// @ts-expect-error` when intentionally passing invalid types to test error handling
- Use `vi.mocked()` for type-safe access to mocked functions
- Use `satisfies` for type-checked assertion payloads without losing literal types

## Reference files

- [references/mocking.md](references/mocking.md) — Comprehensive mocking guide covering module mocks, spying, time mocking, async mocks, cleanup, and mock assertions
