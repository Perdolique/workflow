---
name: playwright-e2e-testing
description: Write and maintain Playwright browser and end-to-end tests for web apps, plus direct API tests with APIRequestContext. Use for browser or E2E coverage even when the user does not name Playwright, and for mocks, fixtures, and assertions that support Playwright tests.
license: Unlicense
---

# Browser, E2E, and API testing with Playwright

This skill provides patterns and conventions for Playwright browser, E2E, and direct API tests, including SPA-specific techniques for routing, API mocking, and async navigation.

## When to use this skill

- Writing browser or E2E tests for user flows
- Testing page routing and redirects
- Testing dialog/modal interactions
- Testing endpoints directly through Playwright's `APIRequestContext`
- Creating mocks, fixtures, and assertions for Playwright tests
- Debugging failing Playwright browser, E2E, or API tests
- Choose the testing skill from the task and the project's established test tool. Route generic requests for mocks or test data according to that context.

## Project configuration

When setting up or modifying `playwright.config.ts`, see [references/configuration.md](references/configuration.md) for conventions on web server setup, reporters, traces, screenshots, and CI behavior.

## Test imports

Check the project's test directory for a custom fixture file that extends Playwright's `test` object, commonly for API interception or shared setup. When one exists, import `test` and `expect` from it so the test receives the project's setup:

```typescript
import { test, expect } from '../fixtures/global.fixtures.ts';
```

When the project has no custom fixture, import them from Playwright:

```typescript
import { test, expect } from '@playwright/test';
```

Standalone types are always fine to import directly:

```typescript
import type { Page, Locator } from '@playwright/test';
```

Configure shared browser fixtures to fail on application `pageerror`, `console.error`, hydration warnings, and unresolved components. Preserve these checks when reusing the project's fixtures. Exclude only browser-generated resource errors that tests assert explicitly.

## Directory structure

Organize tests by feature domain. Each domain typically has its own fixture file:

```text
tests/playwright/
├── constants.ts                     # Base URLs, shared constants
├── fixtures/
│   ├── global.fixtures.ts           # Extended test/expect (if project uses one)
│   ├── core-api.fixtures.ts         # Shared API mock helpers
│   └── {feature}.fixtures.ts        # Feature-specific test data
├── {feature-domain}/
│   └── {feature}.test.ts            # Test file
└── routing/
    └── redirects.test.ts            # Router/redirect tests
```

## Writing test files

### Basic structure

```typescript
import type { Page } from '@playwright/test';
import { test, expect } from '../fixtures/global.fixtures.ts';
import { mockEndpoint } from '../fixtures/api.fixtures.ts';
import { baseFixture, variantFixture } from '../fixtures/{feature}.fixtures.ts';

// Helper functions (navigation, assertions)
async function openFeaturePage(page: Page): Promise<void> {
  await page.goto('/feature?id=test-id');
}

test.describe('Feature name', () => {
  test('description of expected behavior', async ({ page }) => {
    await mockEndpoint(page, baseFixture);
    await openFeaturePage(page);
    await expect(page.getByText('Expected text')).toBeVisible();
  });
});
```

### Helper functions

Define helper functions at the top of the test file for repeated actions. Helpers improve readability and reduce duplication:

- **Navigation helpers** — `openDialog(page)`, `gotoProductPage(page)`
- **Assertion helpers** — `expectSummary(page, options)`, `expectAvailability(page, from, to)`
- **Setup helpers** — `setupCommonMocks(page)` for test-specific mock bundles
- **Locator helpers** — `actionButtons(page)` returning a `Locator`

### Shared setup with beforeEach

When all tests in a describe block share identical mock setup:

```typescript
test.describe('Router redirects', () => {
  test.beforeEach(async ({ page }) => {
    await setupCommonMocks(page);
  });

  test('redirects when resource is not found', async ({ page }) => {
    await page.goto('/resource?id=unknown');
    await expect(page).toHaveURL(/\/error\?id=unknown$/u);
  });
});
```

### Multi-step flows with test.step()

Use named `test.step()` blocks for meaningful stages of complex user flows such as purchases and form submissions. The report then identifies the failed stage. Keep a short, cohesive test as a direct sequence of actions and assertions unless the project has a more specific convention.

```typescript
test('completes purchase flow', async ({ page }) => {
  await test.step('prepare mocks', async () => {
    await mockProduct(page, productFixture);
    await mockCheckout(page);
  });

  const purchaseRequestPromise = page.waitForRequest(
    request => request.url().includes('/purchases') && request.method() === 'POST'
  );

  await test.step('open product page', async () => {
    await gotoProductPage(page);
  });

  await test.step('select option', async () => {
    await page.getByRole('button', { name: '14:00' }).click();
  });

  await test.step('verify confirmation page', async () => {
    await expect.poll(() => new URL(page.url()).pathname).toBe('/order-confirmation');
  });

  await test.step('submit order', async () => {
    await page.getByRole('button', { name: 'Confirm' }).click();
  });

  await test.step('verify purchase request', async () => {
    const request = await purchaseRequestPromise;

    expect(request.postDataJSON()).toEqual({
      items: [{ id: 'product-1', date: '2088-04-21T11:00:00.000Z' }]
    });
  });
});
```

Key patterns in multi-step flows:

- `page.waitForRequest()` — Set up BEFORE the action that triggers the request
- `expect.poll()` — Wait for async URL changes after SPA navigation
- `satisfies` — Type-check request payload expectations without losing literal types

### localStorage setup via addInitScript

To set localStorage values before the page loads (e.g., saved state for routing tests):

```typescript
async function setSavedState(page: Page, key: string, value: unknown): Promise<void> {
  await page.addInitScript(
    ({ storageKey, data }: { storageKey: string; data: string }) => {
      localStorage.setItem(storageKey, data);
    },
    { storageKey: key, data: JSON.stringify(value) }
  );
}
```

`addInitScript` runs before the page loads, so the app reads the correct localStorage values during initialization. `page.evaluate` runs after the page loads, which is too late for route guards.

## Selector patterns

Prefer user-facing selectors in this order:

1. `page.getByRole('button', { name: 'Confirm' })` — Accessible role + name
2. `page.getByText('Expected text')` — Visible text content
3. `page.getByTestId('action-button')` — `data-testid` attribute
4. `page.getByText('text', { exact: true })` — Exact match to avoid partial hits
5. `page.getByText(/regex pattern/u)` — Regex for dynamic content

Refine a locator to the intended element by accessible role and name, relevant container, row or card, and visibility. Use `.first()` or `.nth()` when position is part of the behavior under test or the test has an established reason to select an equivalent match by position.

## Assertion patterns

```typescript
// Visibility
await expect(page.getByText('Welcome')).toBeVisible();

// Element count
await expect(page.getByRole('button', { name: /\d{2}:\d{2}/u })).toHaveCount(3);
await expect(page.getByText('Not present')).toHaveCount(0); // Assert absence

// URL matching
await expect(page).toHaveURL('http://localhost:5050/error?id=unknown');
await expect(page).toHaveURL(/\/order-success\?id=test-id$/u);

// Async URL change (SPA navigation)
await expect.poll(() => new URL(page.url()).pathname).toBe('/order-confirmation');

// Interactive state
await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

// Unicode-aware regex with explicit apostrophe variants
await expect(page.getByText(/^You(?:'|’|ʼ)re all set!$/u)).toBeVisible();
```

Always use the `/u` (unicode) flag so regular expressions are parsed in Unicode-aware mode. Express accepted apostrophe or other character variants in the pattern itself when the text can contain them.

## User-visible regression evidence

- Define the observable behavior that protects the user before choosing assertions.
- Exercise every materially changed state and transition with the relevant pointer and keyboard input.
- Make a regression test fail when the protected behavior is removed or bypassed. A test that stays green does not protect that contract.
- Assert the rendered content and geometry required by the behavior. Wrapper existence and `toBeVisible()` can still pass for empty icons, clipped children, or content outside the viewport.
- For state transitions, assert the relevant order, timing, focus, and stable content. The final state alone does not prove that the user avoided a flash, stale result, or lost focus.
- For responsive behavior, cover the smallest supported viewport, a common desktop viewport, and both sides of each changed viewport breakpoint. Exercise container-responsive components in narrow and wide containers without changing the viewport.
- Use long realistic and long unbroken content when it can affect the protected layout. Check the document and relevant child rectangles; a root `scrollWidth` check alone does not prove that a child is visible or inside the viewport.
- Keep the assertion as narrow as the contract. Do not replace focused evidence with a full-page snapshot when only one component state matters.

## API mocking with page.route()

### Basic mock

```typescript
async function mockProducts(page: Page, response: unknown): Promise<void> {
  await page.route('**/api/products**', async (route) => {
    await route.fulfill({ json: response });
  });
}
```

### Mock a create-and-poll flow

```typescript
async function mockPurchase(page: Page, purchaseId: string, response: unknown): Promise<void> {
  // Mock POST (create)
  await page.route('**/api/purchases', async (route) => {
    await route.fulfill({ json: { id: purchaseId } });
  });

  // Mock GET (status poll)
  await page.route(`**/api/purchases/${purchaseId}`, async (route) => {
    await route.fulfill({ json: response });
  });
}
```

### Control unrelated external requests

Choose the network boundary from the scenario and the project's network policy. For a test of application behavior after an external dependency responds, provide controlled responses and handle unexpected requests consistently. One common policy is to block requests outside the app:

```typescript
await page.route('**/*', async (route) => {
  const url = new URL(route.request().url());

  if (url.origin === appBaseUrl) {
    await route.continue();
  } else {
    await route.abort();
  }
});
```

When the scenario tests the external integration itself, use the configured test environment and keep that interaction real. Mock the dependencies outside the behavior being tested.

Make each mock reproduce the lifecycle that matters to the scenario, including completion, expiry, cancellation, retry, or single-use values when applicable. Do not let a mock produce a state that the real dependency cannot produce. If a safe realistic mock is not possible, use the official test mode or mark the behavior as unverified.

### Override existing mocks

Playwright uses **last-registered-wins** for route matching. Register a new route for the same pattern to override an earlier mock:

```typescript
// Global fixture mocks /api/properties with defaults
// Your test overrides with custom data:
await page.route('**/api/properties/**', async (route) => {
  await route.fulfill({ json: customPropertyData });
});
```

### Verify request cancellation

When cancellation matters, hold the stale response, register `requestfailed` before triggering its replacement, assert the abort (`ERR_ABORTED` in Chromium), then release the mock and verify only current data renders. Final UI alone does not prove transport cancellation; never fulfill an already-aborted route.

### Mock third-party dependencies

```typescript
async function setupExternalMocks(page: Page): Promise<void> {
  await page.route('https://analytics.example.com/**', async (route) => {
    await route.fulfill({ status: 200, body: '' });
  });
}
```

## Creating test data fixtures

Read [the fixture guide](references/fixtures.md) when creating or changing fixture data. It covers base objects and variants, private factories, literal types, existing contracts, scenario dates, and mock helpers.

## API request testing

For testing server-side API endpoints directly, use Playwright's `APIRequestContext` — no browser needed.

### Worker-scoped fixtures for authentication

Use worker-scoped fixtures instead of `beforeAll` + shared mutable `let` variables. Worker scope creates the context once per worker thread (same performance), eliminates shared mutable state, and integrates cleanly with Playwright's teardown lifecycle.

```typescript
// tests/playwright/fixtures.ts
import { test as base, type APIRequestContext } from '@playwright/test'
import { appBaseUrl } from './constants'

interface WorkerFixtures {
  authedRequest: APIRequestContext;
}

export const test = base.extend<Record<never, never>, WorkerFixtures>({
  authedRequest: [
    async ({ playwright }, use) => {
      const request = await playwright.request.newContext({ baseURL: appBaseUrl })
      await request.post('/api/auth/create-session')
      await use(request)
      await request.dispose()
    },
    { scope: 'worker' },
  ],
})
```

Import `test` from this file in API test files. The fixture is available as `{ authedRequest }` in the test callback.

### Type-safe JSON parsing

`APIResponse.json()` returns `Promise<any>` (Playwright's `Serializable = any`). When a test reads a JSON body, use `unknown` as the intermediate type and parse it with Valibot:

```typescript
const response = await request.get('/api/items')
const raw: unknown = await response.json()
const body = v.parse(mySchema, raw)  // Valibot accepts unknown, returns typed result
```

Valibot's `parse` checks the runtime shape and returns typed data. Keep the request, JSON read, and parse on separate lines so failures remain clear. Tests that inspect only status, headers, or an absent body should use the matching response assertions without reading JSON.

### What to assert in API tests

After Valibot validates the response shape, focus assertions on the HTTP contract and tested behavior. Remove a shape assertion only when the schema already checks the same requirement:

```typescript
// Redundant when v.parse(schema, raw) already validates this shape
expect(body).toMatchObject({ id: expect.any(Number), name: expect.any(String) })

// Tests the HTTP contract, correct data, filter logic, and auth behavior
expect(response.status()).toBe(200)
expect(body.name).toBe('MSR')
expect(body.items.length).toBeGreaterThan(0)
expect(filteredBody.items.every(item => item.category.slug === 'sleeping-pads')).toBe(true)
```

High-value API assertions: status codes, specific values (names, slugs, IDs confirming correct record), filter correctness, pagination boundaries, auth enforcement (401 without session).

### Testing 401 / unauthenticated responses

Create an anonymous context inline — never reuse the authenticated fixture for negative auth tests:

```typescript
test('returns 401 without session cookie', async ({ playwright }) => {
  const anonRequest = await playwright.request.newContext({ baseURL: appBaseUrl })
  const response = await anonRequest.get('/api/equipment/groups')

  expect(response.status()).toBe(401)

  await anonRequest.dispose()
})
```

```bash
# Run all Playwright tests
vpx playwright test

# Run a specific test file
vpx playwright test tests/playwright/product/checkout.test.ts

# Run with UI mode for debugging
vpx playwright test --ui

# Run with headed browser
vpx playwright test --headed

# Run with Playwright inspector/debug mode
vpx playwright test --debug

# Open the last HTML report
vpx playwright show-report
```

Check the project's `package.json` for available test scripts — many projects define shortcuts like `test:playwright`, `test:e2e`, or similar.

## Validation checklist

Before considering an E2E test complete, verify:

- [ ] `test` and `expect` imported from the project's fixture file when one exists; otherwise imported from `@playwright/test`
- [ ] Playwright types such as `Page` and `Locator` imported directly with `import type`
- [ ] Feature-specific fixtures use `as const` on all exported objects
- [ ] Fixtures with a known project contract use compatible `satisfies` checks; intentional invalid fixtures remain invalid for their scenarios
- [ ] Fixture dates represent the intended state; time is controlled where behavior depends on the current time or a boundary
- [ ] `test.describe()` groups related tests
- [ ] Helper functions extracted for repeated navigation/assertion patterns
- [ ] Meaningful stages of complex flows use `test.step()` blocks; short cohesive tests remain direct
- [ ] `page.waitForRequest()` set up BEFORE the triggering action
- [ ] Regex patterns use `/u` flag
- [ ] Locators identify the intended element semantically; `.first()` or `.nth()` represents an intentional positional choice
- [ ] Dependencies outside the tested behavior are controlled according to project network policy; tested integrations remain real in the configured test environment
- [ ] **API tests that read JSON**: The body enters as `unknown` and Valibot validates it; only shape assertions duplicated by the schema are removed
- [ ] **API tests without JSON reads**: Status, headers, and absent bodies use matching response assertions without an artificial schema
- [ ] **API tests**: Auth tests use inline anonymous context, not the authenticated fixture
- [ ] **API tests**: Worker-scoped fixtures used for authentication (not `beforeAll` + `let`)
- [ ] Test runs successfully

## Reference files

- [references/configuration.md](references/configuration.md) — Playwright config setup: web server, reporters, traces, screenshots, CI behavior
- [references/fixtures.md](references/fixtures.md) — Complete fixture patterns, factory functions, variant pattern details
