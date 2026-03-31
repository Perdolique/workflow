# Mocking guide

Comprehensive guide to mocking in Vitest.

## Module mocking

### Basic module mock

Mock an entire module with custom implementation:

```typescript
vi.mock(import('./utils/logging'), () => ({
  logException: vi.fn(),
  logError: vi.fn(),
  logWarning: vi.fn()
}));
```

### Mock with hoisting

Use `vi.hoisted()` when you need to reference mock functions in module mocks:

```typescript
const mocks = vi.hoisted(() => ({
  convertDate: vi.fn(),
  formatDate: vi.fn()
}));

vi.mock(import('../strings'), () => ({
  convertDate: mocks.convertDate,
  formatDate: mocks.formatDate
}));

// Now you can use mocks in tests
test('uses date converter', () => {
  mocks.convertDate.mockReturnValue('2024-01');
  // ... test code
});
```

### Partial module mock

Keep some original exports while mocking others:

```typescript
vi.mock(import('../constants'), async (importOriginal) => {
  const actual = await importOriginal<typeof import('../constants')>();

  return {
    ...actual,
    defaultLanguageCode: 'en-GB' // Override only this
  };
});
```

### Dynamic import mocking

When using dynamic imports with `vi.mock(import(...))`, TypeScript may expect a complete module implementation. Use `@ts-expect-error` to bypass:

```typescript
// @ts-expect-error — Mocking only the exports used in tests
vi.mock(import('@floating-ui/vue'), () => ({
  autoUpdate: vi.fn()
}));
```

This is useful when:

- You only need to mock specific exports that your tests use
- TypeScript demands types for all module exports
- Providing a full implementation would be unnecessarily verbose

### Mock external libraries

```typescript
vi.mock(import('axios'), () => ({
  default: {
    create: vi.fn().mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: {} }),
      post: vi.fn().mockResolvedValue({ data: {} }),
      put: vi.fn().mockResolvedValue({ data: {} }),
      delete: vi.fn().mockResolvedValue({ data: {} })
    })
  }
}));
```

## Spying on functions

### Spy on exported functions

```typescript
import * as envUtils from '../utils/environment';

test('uses correct environment', () => {
  vi.spyOn(envUtils, 'getEnvironment').mockReturnValue('production');

  const config = getConfig();

  expect(config.environment).toBe('production');
});
```

### Spy on object methods

```typescript
import Cookies from 'js-cookie';

test('reads cookie value', () => {
  vi.spyOn(Cookies, 'get').mockReturnValue('test-token');

  const token = getAuthToken();

  expect(token).toBe('test-token');
  expect(Cookies.get).toHaveBeenCalledWith('auth_token');
});
```

### Spy on getters

```typescript
test('detects custom domain', () => {
  const windowLocation = window.location;

  vi.spyOn(windowLocation, 'hostname', 'get').mockReturnValue('custom.domain.com');

  expect(isCustomDomain()).toBe(true);
});
```

### Spy on setters

```typescript
test('sets localStorage item', () => {
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  saveToStorage('key', 'value');

  expect(setItemSpy).toHaveBeenCalledWith('key', 'value');
});
```

## Mock return values

### Simple return value

```typescript
const mockFn = vi.fn().mockReturnValue('result');
```

### Different returns for sequential calls

```typescript
const mockFn = vi.fn()
  .mockReturnValueOnce('first')
  .mockReturnValueOnce('second')
  .mockReturnValue('default');

mockFn(); // 'first'
mockFn(); // 'second'
mockFn(); // 'default'
mockFn(); // 'default'
```

### Async resolved value

```typescript
const mockFn = vi.fn().mockResolvedValue({ id: 1, name: 'Test' });
```

### Async rejected value

```typescript
const mockFn = vi.fn().mockRejectedValue(new Error('API Error'));
```

### Different async returns

```typescript
const mockFn = vi.fn()
  .mockResolvedValueOnce({ status: 'loading' })
  .mockResolvedValueOnce({ status: 'success' });
```

### Custom implementation

```typescript
const mockFn = vi.fn((x: number) => x * 2);

expect(mockFn(5)).toBe(10);
```

## Time mocking

### Fake timers

```typescript
describe('isDateInPast', () => {
  beforeAll(() => {
    const systemTime = new Date('2023-11-13T10:00:00.000Z');

    vi.useFakeTimers();
    vi.setSystemTime(systemTime);
  });

  afterAll(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('detects past date correctly', () => {
    const pastDate = new Date('2023-10-01');

    expect(isDateInPast(pastDate)).toBe(true);
  });

  test('detects future date correctly', () => {
    const futureDate = new Date('2023-12-01');

    expect(isDateInPast(futureDate)).toBe(false);
  });
});
```

### Advance timers

```typescript
test('debounce works correctly', () => {
  vi.useFakeTimers();

  const callback = vi.fn();
  const debounced = debounce(callback, 1000);

  debounced();
  debounced();
  debounced();

  expect(callback).not.toHaveBeenCalled();

  vi.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalledTimes(1);

  vi.useRealTimers();
});
```

## Cleanup

### Restore after each test

```typescript
describe('Test suite', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('first test', () => {
    vi.spyOn(module, 'fn').mockReturnValue('mock1');
    // test code
  });

  test('second test', () => {
    vi.spyOn(module, 'fn').mockReturnValue('mock2');
    // test code — mock from first test is cleaned up
  });
});
```

### Restore after all tests

```typescript
describe('Test suite', () => {
  afterAll(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // tests
});
```

### Clear vs restore

```typescript
// clearAllMocks — clears call history but keeps mock implementation
vi.clearAllMocks();

// resetAllMocks — clears call history and resets implementation to return undefined
vi.resetAllMocks();

// restoreAllMocks — restores original implementation (use this!)
vi.restoreAllMocks();
```

## Assertions on mocks

### Check if called

```typescript
expect(mockFn).toHaveBeenCalled();
expect(mockFn).not.toHaveBeenCalled();
```

### Check call count

```typescript
expect(mockFn).toHaveBeenCalledTimes(3);
```

### Check call arguments

```typescript
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenLastCalledWith('last-arg');
expect(mockFn).toHaveBeenNthCalledWith(2, 'second-call-arg');
```

### Check all calls

```typescript
expect(mockFn.mock.calls).toEqual([
  ['first', 'call'],
  ['second', 'call']
]);
```

### Access call results

```typescript
const results = mockFn.mock.results;
expect(results[0].value).toBe('first result');
```

## Common mock patterns

### Mock API client

```typescript
const mockClient = {
  get: vi.fn().mockResolvedValue({ data: [] }),
  post: vi.fn().mockResolvedValue({ data: { id: 1 } }),
  put: vi.fn().mockResolvedValue({ data: { id: 1 } }),
  delete: vi.fn().mockResolvedValue({ data: null })
};
```

### Mock thrown API errors

When API errors need to be `Error` instances (e.g., for `instanceof` checks), use `Object.assign`:

```typescript
const networkError = Object.assign(new Error(), {
  errorCode: 'network' as const,
  name: 'ApiError' as const
});

const notFoundError = Object.assign(new Error('Resource not found'), {
  errorCode: 'not-found' as const,
  message: 'Resource not found',
  name: 'ApiError' as const
});
```

Use these as `mockRejectedValue` arguments:

```typescript
vi.mocked(service.getItem).mockRejectedValue(notFoundError);
```

The key point: pass a real `Error` instance, not a plain object — many error-checking utilities use `instanceof Error`.

### Mock transform functions

```typescript
vi.mock(import('../../transforms/user'), () => ({
  transformUser: vi.fn((user) => ({
    id: user.id,
    name: user.name
  }))
}));
```

### Mock composables

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

### Mock Vue Router

```typescript
vi.mock(import('vue-router'), () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn()
  })),
  useRoute: vi.fn(() => ({
    params: { id: '123' },
    query: {},
    path: '/test'
  }))
}));
```

### Mock i18n

```typescript
// @ts-expect-error — Mocking only the used export
vi.mock(import('vue-i18n'), () => ({
  useI18n() {
    return {
      t(key: string) {
        return key;
      }
    };
  }
}));
```
