---
name: playwright-e2e-testing
description: Create and maintain Playwright E2E tests for web applications. Use when the user asks to write E2E tests, create Playwright tests, test user flows, test page navigation, mock API responses for E2E, create test fixtures, or mentions Playwright, E2E, end-to-end testing, integration tests, browser tests, page tests, or anything related to testing user-facing flows in the browser. Do NOT use for Vitest unit tests — use the vitest-unit-testing skill instead.
license: Unlicense
---

# E2E testing with Playwright

This skill provides patterns and conventions for writing Playwright E2E tests for web applications, including SPA-specific techniques for routing, API mocking, and async navigation.

## When to use this skill

- Writing E2E/browser tests for user flows
- Testing page routing and redirects
- Testing dialog/modal interactions
- Creating test data fixtures for a new feature
- Mocking API endpoints for E2E tests
- Debugging failing Playwright tests

## Test imports

If the project has a custom fixture file that extends Playwright's `test` object (common for API interception, shared setup, etc.), always import `test` and `expect` from that fixture — not from `@playwright/test` directly. Check the project's test directory for a `fixtures/` folder or `global.fixtures.ts`.

```typescript
// ✅ If project has custom fixtures — import from there
import { test, expect } from '../fixtures/global.fixtures.ts';

// ❌ Bypasses any project-level request interception or setup
import { test, expect } from '@playwright/test';
```

Standalone types are always fine to import directly:

```typescript
import type { Page, Locator } from '@playwright/test';
```

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

For complex user flows (purchases, form submissions), use `test.step()` blocks. Playwright reports show which step failed, making debugging much faster.

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

Use `.first()` when multiple identical elements exist on the page (e.g., text duplicated for mobile/desktop viewports).

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

// Regex with unicode flag (for apostrophes, special chars)
await expect(page.getByText(/^You.re all set!$/u)).toBeVisible();
```

Always use the `/u` (unicode) flag on regex patterns to correctly handle special characters.

## API mocking with page.route()

### Basic mock

```typescript
async function mockProducts(page: Page, response: unknown): Promise<void> {
  await page.route('**/api/products**', async (route) => {
    await route.fulfill({ json: response });
  });
}
```

### Mock with different HTTP methods

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

### Block external requests

A common pattern is to block all external requests and only allow requests to the app itself:

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

### Override existing mocks

Playwright uses **last-registered-wins** for route matching. Register a new route for the same pattern to override an earlier mock:

```typescript
// Global fixture mocks /api/properties with defaults
// Your test overrides with custom data:
await page.route('**/api/properties/**', async (route) => {
  await route.fulfill({ json: customPropertyData });
});
```

### Mock third-party services

```typescript
async function setupExternalMocks(page: Page): Promise<void> {
  await page.route('https://analytics.example.com/**', async (route) => {
    await route.fulfill({ status: 200, body: '' });
  });

  await page.route('https://cdn.example.com/**', async (route) => {
    await route.fulfill({ status: 200, body: '', contentType: 'image/jpeg' });
  });
}
```

## Creating test data fixtures

See [references/fixtures.md](references/fixtures.md) for detailed patterns.

### Variant pattern (simple features)

Use a base const object + spread for variants. Each test gets exactly the data shape it needs, and you can see what differs from the base at a glance:

```typescript
export const itemBase = {
  id: 'test-item-id',
  name: 'Test Item',
  status: 'active',
  items: []
} as const;

export const itemWithProducts = {
  ...itemBase,
  items: [{
    productId: 'test-product-id',
    status: 'confirmed'
  }]
} as const;
```

### Factory pattern (complex features)

When fixtures need many permutations with computed fields:

```typescript
function createAccessKey(options: {
  readonly id: string;
  readonly type: 'code' | 'remote';
  readonly name: string;
  readonly code?: string | null;
}) {
  return {
    id: options.id,
    type: options.type,
    name: options.name,
    code: options.code ?? null,
    validFrom: '2024-01-01T00:00:00.000Z',
    validTo: '2099-12-31T23:59:59.000Z'
  } as const;
}
```

Factory functions stay private to the fixture file. Exported variants compose them.

### Fixture data conventions

| Convention | Why |
| --- | --- |
| Use `as const` on every exported object | TypeScript narrows the type, catches typos |
| Use far-future dates in fixtures (e.g., year 2088) | Won't expire during test lifetime |
| Use clearly fake IDs with consistent prefixes | Easy to grep, obviously not real data |
| Spread from base, override only what matters | Makes test intent clear |

## Running tests

```bash
# Run all Playwright tests
npx playwright test

# Run a specific test file
npx playwright test tests/playwright/product/checkout.test.ts

# Run with UI mode for debugging
npx playwright test --ui

# Run with headed browser
npx playwright test --headed

# Run with Playwright inspector/debug mode
npx playwright test --debug

# Open the last HTML report
npx playwright show-report
```

Check the project's `package.json` for available test scripts — many projects define shortcuts like `test:playwright`, `test:e2e`, or similar.

## Validation checklist

Before considering an E2E test complete, verify:

- [ ] `test` and `expect` imported from the project's fixture file (if one exists)
- [ ] Only types imported from `@playwright/test` (e.g., `type Page`, `type Locator`)
- [ ] Feature-specific fixtures use `as const` on all exported objects
- [ ] Future dates used in fixture data
- [ ] `test.describe()` groups related tests
- [ ] Helper functions extracted for repeated navigation/assertion patterns
- [ ] Multi-step flows use `test.step()` blocks
- [ ] `page.waitForRequest()` set up BEFORE the triggering action
- [ ] Regex patterns use `/u` flag
- [ ] `.first()` used when multiple matching elements exist
- [ ] No external services left unmocked (check console for blocked request warnings)
- [ ] Test runs successfully

## Reference files

- [references/fixtures.md](references/fixtures.md) — Complete fixture patterns, factory functions, variant pattern details
