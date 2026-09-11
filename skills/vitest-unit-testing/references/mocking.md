# Mocking guide

Use mocks to isolate external collaborators and control inputs that the test cannot produce directly. Keep the code under test real, and choose the smallest mock that expresses the contract.

## Module mocking

### Basic module mock

Use the typed dynamic-import signature so the factory's export types stay checked. The factory can provide only the exports needed by the test.

```typescript
import { vi } from 'vitest';

vi.mock(import('./utils/logging'), () => ({
  logException: vi.fn(),
  logError: vi.fn(),
  logWarning: vi.fn()
}));
```

`vi.mock`, `vi.unmock`, and `vi.hoisted` are hoisted and must appear at module level in Vitest 5. Place them outside suites, tests, hooks, functions, and blocks so the source shows when they execute.

### Shared hoisted mocks

Use `vi.hoisted()` when a module factory and the tests need the same mock functions:

```typescript
import { expect, test, vi } from 'vitest';
import { formatReport } from '../report';

const mocks = vi.hoisted(() => ({
  convertDate: vi.fn(),
  formatDate: vi.fn()
}));

vi.mock(import('../strings'), () => ({
  convertDate: mocks.convertDate,
  formatDate: mocks.formatDate
}));

test('formats the report date', () => {
  mocks.convertDate.mockReturnValue('2026-09');

  const report = formatReport();

  expect(report).toContain('2026-09');
});
```

The hoisted factory cannot use regular imported values because it runs before imports are evaluated.

### Partial module mock

Return only the replaced exports when the test does not use the rest of the module. The typed signature keeps exports optional, so an incomplete factory does not need `@ts-expect-error`:

```typescript
vi.mock(import('../language'), () => ({
  getDefaultLanguageCode: vi.fn(() => 'en-GB')
}));
```

Use `importOriginal` when the test needs other exports to keep their real behavior:

```typescript
vi.mock(import('../language'), async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    getDefaultLanguageCode: vi.fn(() => 'en-GB')
  };
});
```

### Per-test module behavior

Use `vi.doMock` for a non-hoisted mock that affects the next dynamic import. Modules imported earlier keep their existing value.

```typescript
test('loads the preview formatter', async () => {
  vi.doMock(import('../formatter'), () => ({
    format: () => 'preview'
  }));
  onTestFinished(() => vi.doUnmock(import('../formatter')));

  const { format } = await import('../formatter');
  const formatted = format();

  expect(formatted).toBe('preview');
});
```

Dispose the handle returned by `vi.doMock` or call `vi.doUnmock` when later dynamic imports must be real. Use the project's module-isolation strategy when the imported module cache also needs to be reset.

## Spying on properties

### Object methods

Spy on a method when the test needs the original object identity or must verify how a caller used it:

```typescript
test('reads the saved token', () => {
  const storage = {
    getItem: (_key: string) => null as string | null
  };

  const getItemSpy = vi.spyOn(storage, 'getItem').mockReturnValue('test-token');
  const token = readToken(storage);

  expect(token).toBe('test-token');
  expect(getItemSpy).toHaveBeenCalledWith('auth_token');
});
```

### Getters

Use a controlled object for a getter example. Host objects such as `window.location` can have environment-specific descriptors.

```typescript
test('reads a custom hostname', () => {
  const location = {
    get hostname() {
      return 'app.example.com';
    }
  };

  const hostnameSpy = vi.spyOn(location, 'hostname', 'get').mockReturnValue('custom.example.com');

  expect(location.hostname).toBe('custom.example.com');
  expect(hostnameSpy).toHaveBeenCalledOnce();
});
```

### Setters

Pass `'set'` when observing a real setter:

```typescript
test('sets the selected theme', () => {
  const preferences = {
    currentTheme: 'light',
    set theme(value: string) {
      this.currentTheme = value;
    }
  };

  const themeSpy = vi.spyOn(preferences, 'theme', 'set');

  preferences.theme = 'dark';

  expect(themeSpy).toHaveBeenCalledWith('dark');
  expect(preferences.currentTheme).toBe('dark');
});
```

## Mock return behavior

### Stable and sequential values

Use one stable value when arguments do not change behavior:

```typescript
const format = vi.fn().mockReturnValue('formatted');
```

Use `mockReturnValueOnce` or `mockResolvedValueOnce` when call order is the contract:

```typescript
const loadStatus = vi.fn()
  .mockResolvedValueOnce({ status: 'loading' })
  .mockResolvedValueOnce({ status: 'ready' });
```

Use `mockRejectedValue` with an `Error` when the collaborator rejects:

```typescript
const loadUser = vi.fn().mockRejectedValue(new Error('API error'));
```

### Argument-specific behavior with vi.when

Use `vi.when` when the result depends on arguments. It keeps argument matching visible and avoids manual branching inside `mockImplementation`.

```typescript
test('returns user data for known ids', async () => {
  const findById = vi.fn<(id: number) => Promise<{ id: number; name: string }>>();

  vi.when(findById)
    .calledWith(1)
    .thenResolve({ id: 1, name: 'Ella' })
    .calledWith(2)
    .thenResolve({ id: 2, name: 'Gracie' });

  const firstUser = findById(1);
  const secondUser = findById(2);

  await expect(firstUser).resolves.toStrictEqual({ id: 1, name: 'Ella' });
  await expect(secondUser).resolves.toStrictEqual({ id: 2, name: 'Gracie' });
});
```

Keep `mockReturnValue`, `mockResolvedValue`, and their `Once` variants for simpler stable or sequential behavior.

## Time mocking

### Fixed system time

Install fake timers before setting time and restore real timers in `afterEach`. The hook still runs when an assertion fails.

```typescript
describe(isDateInPast, () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-11T10:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('returns true for an earlier date', () => {
    const date = new Date('2026-09-10T10:00:00.000Z');
    const isPast = isDateInPast(date);

    expect(isPast).toBe(true);
  });

  test('returns false for a later date', () => {
    const date = new Date('2026-09-12T10:00:00.000Z');
    const isPast = isDateInPast(date);

    expect(isPast).toBe(false);
  });
});
```

Vitest 5 fake timers also mock `Temporal` when the runtime provides it. Include `Temporal` in the test only when its behavior belongs to the contract, and configure `toNotFake` when the project needs the real API.

### Synchronous timer callbacks

Use the synchronous timer API when callbacks do not schedule promises:

```typescript
describe(debounce, () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('calls the callback once after the delay', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const debounced = debounce(callback, 1_000);

    debounced();
    debounced();

    vi.advanceTimersByTime(1_000);

    expect(callback).toHaveBeenCalledOnce();
  });
});
```

### Async timer callbacks

Use and await `vi.advanceTimersByTimeAsync()` when a timer callback schedules promises. It advances the clock and runs asynchronous timers and their microtasks.

```typescript
describe(withMinimumDelay, () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('waits for the minimum delay before resolving', async () => {
    vi.useFakeTimers();
    const promise = withMinimumDelay(Promise.resolve('result'), 500);
    let resolved = false;
    void promise.then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(499);
    expect(resolved).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    expect(resolved).toBe(true);
    await expect(promise).resolves.toBe('result');
  });
});
```

### Rejections triggered by timers

Create the rejection assertion before advancing the clock. This attaches a rejection handler before the timer settles the promise.

```typescript
const request = requestWithTimeout();
const rejection = expect(request).rejects.toThrow('timed out');

await vi.advanceTimersByTimeAsync(500);
await rejection;
```

Await every async assertion. Vitest 5 fails `resolves`, `rejects`, `expect.poll`, and async snapshot assertions that are not awaited.

## Cleanup

Inspect the project's Vitest version and active configuration before adding hooks. Vitest 5 uses these defaults:

| Setting | Default | Before each test |
| --- | --- | --- |
| `clearMocks` | `true` | Clears call, result, instance, and context history while keeping implementations |
| `mockReset` | `false` | Clears history and resets mock implementations when enabled |
| `restoreMocks` | `false` | Restores original descriptors of manual `vi.spyOn` spies when enabled |

- Choose cleanup by the state the test changes:

- Let `clearMocks: true` isolate call history. Calls recorded at module level or in `beforeAll` are cleared before a test can assert them.
- Reset a persistent mock after each test when tests replace its implementation and `mockReset` is disabled.
- Restore manual spies after each test when `restoreMocks` is disabled. `vi.restoreAllMocks()` affects spies created with `vi.spyOn`; it does not restore automocked or factory-created module mocks, and it does not clear history or reset their implementations.
- Restore real timers in `afterEach` for a suite that uses fake timers.
- Use `afterAll` for resources shared for the whole suite, rather than state that must be isolated between tests.

### Clear, reset, and restore

The methods have different contracts:

```typescript
mockFn.mockClear();
vi.clearAllMocks();
// Clear recorded history and keep implementations.

mockFn.mockReset();
vi.resetAllMocks();
// Clear history and reset implementations and one-time behavior.

spy.mockRestore();
vi.restoreAllMocks();
// Restore original object descriptors for vi.spyOn spies.
```

In Vitest 5, resetting a mock created with `vi.fn()` leaves an empty implementation that returns `undefined`. Resetting one created with `vi.fn(implementation)` returns it to that original implementation.

### Focused spy cleanup

When the runtime supports explicit resource management, `using` can restore a spy at block exit. This is an optional scoped form, not a required convention:

```typescript
test('writes a debug message', () => {
  using logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

  debug('message');

  expect(logSpy).toHaveBeenCalledWith('message');
});
```

Use `onTestFinished` for inline cleanup when the environment does not support `using` or when cleanup belongs clearly to one test:

```typescript
test('writes a debug message', () => {
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  onTestFinished(() => logSpy.mockRestore());

  debug('message');

  expect(logSpy).toHaveBeenCalledWith('message');
});
```

A suite-level `afterEach(() => vi.restoreAllMocks())` is simpler when most tests create manual spies.

## Assertions on mocks

Assert the interaction that belongs to the contract:

```typescript
expect(mockFn).toHaveBeenCalled();
expect(mockFn).not.toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(3);
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenLastCalledWith('last-arg');
expect(mockFn).toHaveBeenNthCalledWith(2, 'second-call-arg');
```

Inspect the complete call list or results when their order or returned values are part of the behavior:

```typescript
expect(mockFn.mock.calls).toStrictEqual([
  ['first', 'call'],
  ['second', 'call']
]);
expect(mockFn.mock.results[0]?.value).toBe('first result');
```

## Common dependency patterns

### API client

Prefer the project's client interface or adapter over a large mock of a third-party package:

```typescript
const apiClient = {
  get: vi.fn().mockResolvedValue({ data: [] }),
  post: vi.fn().mockResolvedValue({ data: { id: 1 } }),
  put: vi.fn().mockResolvedValue({ data: { id: 1 } }),
  delete: vi.fn().mockResolvedValue({ data: null })
};
```

### API errors

Use a real `Error` instance when production code checks `instanceof Error`:

```typescript
const notFoundError = Object.assign(new Error('Resource not found'), {
  errorCode: 'not-found' as const,
  name: 'ApiError'
});

vi.mocked(service.getItem).mockRejectedValue(notFoundError);
```

### Transform functions

Keep a small implementation when the caller depends on the transformed shape:

```typescript
vi.mock(import('../../transforms/user'), () => ({
  transformUser: vi.fn((user) => ({
    id: user.id,
    name: user.name
  }))
}));
```

### Project composables

Return only the contract used by the component or store under test:

```typescript
vi.mock(import('./composables/use-auth'), () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: ref(true),
    user: ref({ id: 1, name: 'Test User' }),
    login: vi.fn(),
    logout: vi.fn()
  }))
}));
```

Keep these module calls at top level. When a dependency exposes a large return type, prefer a project adapter or an existing typed fixture instead of suppressing incompatible mock types.
