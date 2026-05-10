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
const value = getValue()

runTask(value)

// Avoid hiding async work inside another call
const dataPromise = loadData()

await withMinimumDelay(dataPromise, splashDelay)

// Avoid complex inline conditionals as arguments
const target = hasValue ? routes.primary : routes.fallback

replaceRoute(target)

// Allowed: declarative validator DSL
const reservationSchema = v.object({
  slug: v.string(),
  startDate: v.string(),
  endDate: v.string()
})
```

## Avoid meaningless pass-through wrapper functions

Do not create a function whose only job is to call another function and immediately return its result or await it without adding any behavior. If the wrapper does not name a real concept and does not own logic such as validation, branching, retries, mapping, instrumentation, or error handling, inline the call at the usage site or rename the underlying function instead.

Use a wrapper only when it creates a clearer domain boundary or adds behavior that the caller should not repeat.

```typescript
// Avoid wrappers that add no behavior
function getPath() : string {
  return buildPath()
}

const path = buildPath()

replaceRoute(path)

// Allowed: wrapper adds real behavior
async function loadUser() : Promise<User> {
  const user = await fetchUser()

  trackLoad('user')

  return user
}
```

## Prefer explicit property lists when shaping objects

When creating a new runtime object from an existing object, list each property explicitly instead of spreading the source object into the result. This keeps the final object shape visible at the construction site, improves readability during review, and prevents unrelated properties from being copied into the new value.

Apply this when returning view models, API payloads, or other reshaped objects. Prefer explicit property selection even when most fields currently match the source object.

```typescript
// Avoid hiding the resulting shape behind a spread
const payload = {
  ...formState
}

// Prefer explicit object construction
const payload = {
  description: formState.description,
  isArchived: formState.isArchived,
  name: formState.name
}
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
