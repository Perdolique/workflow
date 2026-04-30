---
name: typescript-conventions
description: TypeScript coding conventions for writing, reviewing, and refactoring typed code. Use when working on `.ts`, `.tsx`, or files that embed TypeScript such as Vue, Astro, or Svelte components. Also use for TypeScript snippets, typed refactors, and review comments about code organization or function structure.
license: Unlicense
---

# TypeScript coding conventions

Apply conventions from the documentation, AGENTS.md files, lint rules, and configuration of the repository containing the active file first. Then use this skill for general TypeScript guidance, including TypeScript embedded in other file formats. Combine it with more specific framework, testing, or library-focused skills when needed.

## Prefer named intermediate values for function arguments

Do not pass function calls or other non-trivial expressions directly as arguments to another function. If an argument would be a call, awaited value, chained transform, inline conditional, or other derived expression, assign it to a clearly named `const` first and pass that variable instead.

Passing simple values directly is fine:

- identifiers
- property access
- primitive literals
- enum members and named constants
- simple object or array literals assembled from existing values

Only allow nesting for declarative validator or schema-builder DSL calls where the schema shape is the primary focus of the code. For example, Valibot calls such as `v.string()`, `v.number()`, `v.optional(...)`, `v.object(...)`, and `v.pipe(...)` are allowed to remain nested.

```typescript
// Avoid nested calls in arguments
const activeReservation = getRedirectReservation()

navigateToReservation(activeReservation)

// Avoid hiding async work inside another call
const reservationPromise = getRedirectReservation()

await withMinimumDelay(reservationPromise, splashDelay)

// Avoid complex inline conditionals as arguments
const redirectTarget = hasReservation ? routes.stay : routes.checkIn

replaceRoute(redirectTarget)

// Allowed: declarative validator DSL
const reservationSchema = v.object({
  slug: v.string(),
  startDate: v.string(),
  endDate: v.string()
})
```

## Prefer flat interface structures

Keep `interface` declarations and named object `type` aliases to one level of named properties. When a property needs an object shape, extract that shape into a separate named interface and reference it from the parent type.

Apply this to direct object properties, arrays of objects, and nullable or union forms such as `brand: { ... }`, `items: { ... }[]`, and `brand: { ... } | null`.

This rule covers type declarations only. It does not apply to runtime object literals, validator schemas, framework configuration objects, or library DSL values where the object shape is executable configuration rather than a reusable type contract.

```typescript
// Avoid inline object shapes in interfaces
interface ItemDetailResponse {
  brand: {
    id: number;
    name: string;
  };
  id: string;
}

// Prefer named nested contracts
interface ItemDetailBrand {
  id: number;
  name: string;
}

interface ItemDetailResponse {
  brand: ItemDetailBrand;
  id: string;
}
```
