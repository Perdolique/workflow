---
name: code-style-typescript
description: TypeScript style rules for writing, reviewing, and refactoring `.ts` code. Use when working on TypeScript formatting, semicolon conventions, object layout, function call structure, or interface definitions. Also use when reviewing or writing TypeScript interfaces, type aliases, or any nested object type shapes.
license: Unlicense
---

# TypeScript Code Style Guide

## When to apply

- When writing new TypeScript code
- During code review of `.ts` files
- When refactoring existing code
- When generating code snippets, examples, or documentation for TypeScript
- When working with TypeScript-related blocks in Markdown, Vue.js, etc.
- When formatting or cleaning up code

## Rules

Full code examples for all rules are in [references/examples.md](references/examples.md).

### Rule: No semicolons at the end of statements

**No semicolons** at the end of statements.

**Exception**: TypeScript interfaces, types, and similar type definitions **MUST use semicolons** as property separators.

```typescript
// Statements - no semicolons
const result = calculateValue()

// Interfaces - semicolons required
interface User {
  id: number;
}

type Config = {
  timeout: number;
}
```

See [examples → No semicolons](references/examples.md#no-semicolons-at-the-end-of-statements) for more.

### Rule: No method calls in conditional statements

**Extract method calls** to separate variables before using them in conditional statements (`if`, `while`, `for`, etc.).

See [examples → No method calls](references/examples.md#no-method-calls-in-conditional-statements).

### Rule: Use explicit presence checks in typed code

When checking whether a typed value exists, use **explicit comparisons** such as `value === undefined`, `value !== undefined`, `value === null`, or `value === ''`.

Do not rely on truthy/falsy narrowing for presence checks in normal application code.

See [examples → Explicit presence checks](references/examples.md#explicit-presence-checks).

### Rule: No function calls as arguments

**Extract function calls** to separate variables before using them as arguments to other functions.

**Exception**: In **rare cases** (e.g., validator schemas, DSL configurations, query builders, matcher APIs) when a nested call is necessary for readability, keep it on separate lines. See [examples → Nested function calls](references/examples.md#nested-function-calls-on-separate-lines).

See [examples → No function calls as arguments](references/examples.md#no-function-calls-as-arguments).

### Rule: Group one-line declarations together, separate multiline declarations

**One-line `const` and `let` declarations** should stay together without blank lines. Add a blank line when moving between one-line and multiline declarations, or between separate multiline declarations.

See [examples → Group one-line declarations](references/examples.md#group-one-line-declarations).

### Rule: No unclear abbreviations in local names

Use **clear local variable names**. Avoid non-obvious abbreviations such as `pv`, `prop`, `cat`, or `cfg` when a full word is short and clearer.

Well-known technical identifiers such as `id`, `db`, `URL`, and `HTML` are fine.

See [examples → Clear local names](references/examples.md#clear-local-names).

### Rule: Inline JSDoc comments on one line

**One-line JSDoc comments** should be on the same line with `/**` and `*/`.

See [examples → Inline JSDoc comments](references/examples.md#inline-jsdoc-comments).

### Rule: Object key ordering

**Shorthand properties** come first, then regular properties. Both groups are ordered **alphabetically**.

```typescript
const config = {
  isActive,
  timeout,
  apiKey: 'secret-key',
  baseUrl: 'https://api.example.com'
}
```

See [examples → Object key ordering](references/examples.md#object-key-ordering) for full examples.

### Rule: Expand multi-value object and array literals

**Single-key objects** and **single-item arrays** may stay on one line. **Objects with more than one key** and **arrays with more than one item** should use one entry per line.

See [examples → Expand multi-value literals](references/examples.md#expand-multi-value-literals).

### Rule: Separate multiline object values with blank lines

**Multiline values** in objects should be separated by blank lines.

See [examples → Separate multiline object values](references/examples.md#separate-multiline-object-values).

### Rule: No trailing commas

**Never use trailing commas** in arrays, objects, or other structures.

See [examples → No trailing commas](references/examples.md#no-trailing-commas).

### Rule: Compute derived data before `return`

When a handler or function needs derived data, compute it in a separate variable first and keep the final `return` simple and explicit.

Avoid rebuilding objects through `...spread` just to replace one field when an explicit object is clearer.

See [examples → Derived data before return](references/examples.md#derived-data-before-return).

### Rule: Separate multiline blocks and trailing returns with blank lines

**Multiline blocks** (if/else, loops, try/catch, functions, etc.) should be separated from other code with blank lines, unless they are at the start or end of a parent block. Add the same blank line before `return` when earlier statements appear in the same block.

See [examples → Separate multiline blocks](references/examples.md#separate-multiline-blocks-with-blank-lines).

### Rule: Flat interface structure

Every `interface` (and named `type` alias) must have **only one level** of named properties. If a property's type is an object shape, extract it as a separate named interface.

```typescript
// ✅ Correct - extracted interfaces
interface Brand {
  name: string;
  slug: string;
}

interface Item {
  brand: Brand;
  id: string;
  name: string;
}

// ❌ Wrong - nested object shapes inline
interface Item {
  id: string;
  brand: { name: string; slug: string; };
  name: string;
}
```

See [examples → Flat interface structure](references/examples.md#flat-interface-structure) for a deeply nested example.
