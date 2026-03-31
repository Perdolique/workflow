# Fixtures reference

Complete reference for fixture patterns used in Playwright E2E tests.

## Fixture file template

When creating a fixture file for a new feature domain:

```typescript
/** Fixtures for {feature-name} E2E tests */

/** Base data — minimal shape for this feature */
export const itemBase = {
  id: 'test-item-id',
  slug: 'test-slug',
  startDate: '2088-04-20T12:00:00.000Z',
  endDate: '2088-04-21T09:00:01.000Z',

  property: {
    id: 'test-property-id',
    address: 'Test Street 14',
    timezone: 'Europe/London'
  },

  customer: {
    id: 'test-customer-id',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com'
  },

  items: [],
  options: null
} as const;

/** Variant: item with some specific state */
export const itemWithProducts = {
  ...itemBase,
  items: [{
    productId: 'test-product-id',
    status: 'confirmed'
  }]
} as const;
```

### Key rules for fixture files

1. **`as const` on every export** — Narrows types and catches field name typos at compile time.
2. **Descriptive names** — `itemBase`, `itemWithProducts`, `itemUnavailable`, `availabilityNoSlots`.
3. **Spread from base** — Only override the fields your test cares about. This makes test intent clear.
4. **Use far-future dates** — Year 2088+ so fixtures never expire during test lifetime.
5. **Use clearly fake IDs** — Consistent prefixes (e.g., `test-`, `mock-`) make them easy to grep and obviously not real data.

## Variant pattern

Use for simple features where each test needs a slightly different data shape:

```typescript
export const checkoutBase = {
  id: 'test-checkout-id',
  status: 'pending',
  items: [],
  total: 0
} as const;

export const checkoutWithItem = {
  ...checkoutBase,
  items: [{ id: 'item-1', price: 100, quantity: 1 }],
  total: 100
} as const;

export const checkoutWithDiscount = {
  ...checkoutBase,
  items: [{ id: 'item-1', price: 100, quantity: 1 }],
  total: 80,
  discount: { code: 'SAVE20', amount: 20 }
} as const;
```

Each variant name describes what makes it different from the base. The spread makes the diff immediately visible.

## Factory pattern

For complex fixture domains with many permutations (e.g., access keys with different types, error codes, states), use factory functions:

```typescript
function createValidKey(options: {
  readonly id: string;
  readonly accessType: 'code' | 'remote';
  readonly type: string;
  readonly name: string;
  readonly code?: string | null;
  readonly validFrom?: string;
  readonly validTo?: string;
}) {
  return {
    id: options.id,
    accessType: options.accessType,
    type: options.type,
    name: options.name,
    code: options.code ?? null,
    validFrom: options.validFrom ?? '2024-01-01T00:00:00.000Z',
    validTo: options.validTo ?? '2099-12-31T23:59:59.000Z'
  } as const;
}

function createErrorKey(
  accessType: 'code' | 'remote',
  errorCode: 'NOT_PAID' | 'NOT_AVAILABLE_YET'
) {
  return {
    id: 'test-key',
    errorCode,
    accessType,
    type: 'door',
    name: 'Main Door',
    code: null,
    availableAt: '2088-01-01T00:00:00.000Z'
  } as const;
}
```

Factory functions stay **private** to the fixture file (not exported). Exported variants compose them:

```typescript
export const itemWithCodeAccess = {
  ...itemBase,
  keys: [createValidKey({
    id: 'key-1',
    accessType: 'code',
    type: 'door',
    name: 'Main Door',
    code: '123456'
  })]
} as const;

export const itemWithRemoteAccess = {
  ...itemBase,
  keys: [createValidKey({
    id: 'key-1',
    accessType: 'remote',
    type: 'door',
    name: 'Main Door'
  })]
} as const;

export const itemWithUnpaidKey = {
  ...itemBase,
  keys: [createErrorKey('code', 'NOT_PAID')]
} as const;
```

## Mock helper patterns

### Basic mock helper

Create reusable mock helpers that encapsulate API route patterns:

```typescript
export async function mockProduct(
  page: Page,
  response: unknown,
  productId = 'test-product-id'
): Promise<void> {
  await page.route(`**/api/products/${productId}**`, async (route) => {
    await route.fulfill({ json: response });
  });
}
```

### Mock with default response

Export a default response alongside the mock function so tests can spread-override individual fields:

```typescript
export const defaultPropertyResponse = {
  id: 'test-property-id',
  name: 'Test Property',
  isActive: true,
  timezone: 'Europe/London',
  address: 'Test Street 1',
  city: 'London',
  country: 'GB'
};

export async function mockProperty(
  page: Page,
  response: unknown = defaultPropertyResponse
): Promise<void> {
  await page.route('**/api/properties/**', async (route) => {
    await route.fulfill({ json: response });
  });
}

// In tests — override a single field:
await mockProperty(page, { ...defaultPropertyResponse, isActive: false });
```

### Successful action mock (POST + GET)

For flows that create a resource and then poll for status:

```typescript
export async function mockSuccessfulPurchase(
  page: Page,
  purchaseId: string,
  response: unknown
): Promise<void> {
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

### Stable API mocking

When a global fixture auto-mocks several stable endpoints with defaults, tests only need to mock feature-specific endpoints. If you need to override a stable endpoint:

```typescript
// Just call the helper again with custom data —
// Playwright uses last-registered-wins for route matching
await mockProperty(page, { ...defaultPropertyResponse, checkInMode: 'front-desk' });
```

For endpoints without dedicated helpers, add a test-local route:

```typescript
await page.route('**/api/product-content**', async (route) => {
  await route.fulfill({
    json: { data: [{ id: 'test-content-id' }] }
  });
});
```

### Conditional responses in one route

If the **same endpoint** needs to return different payloads during one test, use a single route handler with conditional logic:

```typescript
let callCount = 0;

await page.route('**/api/status**', async (route) => {
  callCount += 1;

  if (callCount === 1) {
    await route.fulfill({ json: { status: 'processing' } });
  } else {
    await route.fulfill({ json: { status: 'complete' } });
  }
});
```

Do not stack multiple `page.route()` calls for the same URL and expect them to rotate automatically.
