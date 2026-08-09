---
name: typescript-conventions
description: TypeScript coding conventions for writing, reviewing, and refactoring typed code. Use when working on `.ts`, `.tsx`, or files that embed TypeScript such as Vue, Astro, or Svelte components. Also use for TypeScript snippets, typed refactors, and review comments about code organization or function structure.
license: Unlicense
---

# TypeScript coding conventions

Apply conventions from the documentation, AGENTS.md files, lint rules, and configuration of the repository containing the active file first. Then use this skill for general TypeScript guidance, including TypeScript embedded in other file formats. Combine it with more specific framework, testing, or library-focused skills when needed.

## Avoid `return undefined`

Do not use `return undefined`. When exiting a function without a value, use a bare `return`.

```typescript
if (item) {
  return
}
```

## Prefer named intermediate values

- Keep each statement's primary action easy to identify and arrange dependent steps in execution order: resolve input, transform it, then consume the result.
- Extract calls, awaited values, chained transforms, inline conditionals, fallbacks, and other derived expressions into clearly named `const` values when they obscure intent or execution order. Apply this to arguments, conditions, loop inputs, spreads, and literal properties.
- Keep identifiers, property access, literals, simple comparisons, and already-clear expressions inline.
- Allow nested declarative validator or schema-builder DSL calls when the schema shape is the primary focus.
- Preserve behavior and algorithmic complexity; do not add intermediate collections or passes solely for formatting.

```typescript
const properties = categoryDetail.value?.properties ?? []

for (const property of properties) {
  const enumOptions = property.enumOptions ?? []
  const selectableOptions = enumOptions.map(toOption)
  const options = [defaultOption, ...selectableOptions]

  groups.push({
    name: property.name,
    options
  })
}
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

## Keep wrapper contracts source-owned when possible

When wrapping a typed API, reuse source types and inference first. Add local named types only when the wrapper owns a narrower contract or typecheck proves inference is insufficient.

If the wrapper changes return/error shape, lifecycle, validation, mapping, or side effects, name that owned contract and test it.

## Prefer explicit property lists when shaping objects

When creating a new runtime object from an existing object, list each property explicitly instead of spreading the source object into the result. This keeps the final object shape visible at the construction site, improves readability during review, and prevents unrelated properties from being copied into the new value.

Apply this when returning view models, API payloads, or other reshaped objects in production code. Prefer explicit property selection even when most fields currently match the source object.

This rule is intentionally scoped to durable application code. In tests, fixtures, and other low-risk support code, use the form that keeps setup and assertions easiest to read. Object spread is fine there when it keeps the example concise.

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

## Comment shared utility roles

For exported helpers, composables, services, and other shared utilities, add a short role-level comment only when nearby layers make the purpose easy to confuse. Explain what contract the utility owns.

Avoid line-by-line comments in straightforward code; improve naming or split the function instead.
