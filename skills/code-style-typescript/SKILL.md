---
name: code-style-typescript
description: TypeScript style rules for writing, reviewing, and refactoring `.ts` code. Use when working on TypeScript formatting, semicolon conventions, object layout, or function call structure.
license: Unlicense
---

# TypeScript Code Style Guide

## When to Apply

- When writing new TypeScript code
- During code review of `.ts` files
- When refactoring existing code
- When generating code snippets, examples, or documentation for TypeScript
- When working with TypeScript-related blocks in Markdown, Vue.js, etc.
- When formatting or cleaning up code

## Rules

For additional examples covering trailing commas, multiline block spacing, and nested call exceptions, see [references/examples.md](references/examples.md).

### Rule: No semicolons at the end of statements

**No semicolons** at the end of statements.

**Exception**: TypeScript interfaces, types, and similar type definitions **MUST use semicolons** as property separators.

### Examples 1

**✅ Correct:**

```typescript
// Statements - no semicolons
const result = calculateValue()

function greet(name: string) {
  return `Hello, ${name}`
}

// Interfaces - semicolons required
interface User {
  id: number;
}

type Config = {
  timeout: number;
}

// Classes - no semicolons
class UserService {
  private users: User[]

  constructor() {
    this.users = []
  }

  addUser(user: User) {
    this.users.push(user)
  }
}
```

**❌ Wrong:**

```typescript
// Don't add semicolons to statements
const foo = 'bar';

function greet(name: string) {
  return `Hello, ${name}`;
}

// Don't omit semicolons in interfaces
interface User {
  id: number
}

type Config = {
  apiKey: string
}
```

### Rule: No method calls in conditional statements

**Extract method calls** to separate variables before using them in conditional statements (`if`, `while`, `for`, etc.).

### Rule: Use explicit presence checks in typed code

When checking whether a typed value exists, use **explicit comparisons** such as `value === undefined`, `value !== undefined`, `value === null`, or `value === ''`.

Do not rely on truthy/falsy narrowing for presence checks in normal application code.

### Examples 2

**✅ Correct:**

```typescript
const isAdmin = user.isAdmin()

if (isAdmin) {
  console.log('Admin access granted')
}

const hasPermission = checkPermissions(user, 'write')

while (hasPermission) {
  // Do something
}

const property = item.property

if (property === undefined) {
  return result
}

if (itemId === '') {
  throw new Error('Missing item id')
}
```

**❌ Wrong:**

```typescript
// Don't call methods directly in conditions
if (user.isAdmin()) {
  console.log('Admin access granted')
}

while (checkPermissions(user, 'write')) {
  // Do something
}

if (!item.property) {
  return result
}

if (!itemId) {
  throw new Error('Missing item id')
}
```

### Rule: No function calls as arguments

**Extract function calls** to separate variables before using them as arguments to other functions.

**Exception**: See "Nested function calls as arguments on separate lines" rule for rare cases.

### Examples 3

**✅ Correct:**

```typescript
const userData = fetchUser()
const result = processData(userData)
const filtered = filterItems(items)
const mapped = mapValues(filtered)
const validation = validateInput(data)

saveToDatabase(validation)
```

**❌ Wrong:**

```typescript
// Don't call functions directly in arguments
const result = processData(fetchUser())
const mapped = mapValues(filterItems(items))

saveToDatabase(validateInput(data))
```

### Rule: Group one-line declarations together, separate multiline declarations

**One-line `const` and `let` declarations** should stay together without blank lines. Add a blank line when moving between one-line and multiline declarations, or between separate multiline declarations.

### Examples 4

**✅ Correct:**

```typescript
const age = 30
const city = 'New York'
const name = 'John'

const complexObject = {
  id: 1,

  metadata: {
    created: new Date(),
    updated: new Date()
  },

  name: 'Product'
}

const anotherSimple = 'value'
const moreSimple = 42
```

**❌ Wrong:**

```typescript
// Don't separate one-line declarations
const name = 'John'

const age = 30

const city = 'New York'

// Don't keep multiline declarations together
const complexObject = {
  id: 1,
  name: 'Product'
}
const anotherObject = {
  bar: 'baz',
  foo: 'bar'
}
```

### Rule: No unclear abbreviations in local names

Use **clear local variable names**. Avoid non-obvious abbreviations such as `pv`, `prop`, `cat`, or `cfg` when a full word is short and clearer.

Well-known technical identifiers such as `id`, `db`, `URL`, and `HTML` are fine.

### Examples 4a

**✅ Correct:**

```typescript
const category = categories[0]
const property = propertyValue.property
const userConfig = loadUserConfig()
```

**❌ Wrong:**

```typescript
const cat = categories[0]
const prop = pv.property
const cfg = loadUserConfig()
```

### Rule: Inline JSDoc comments on one line

**One-line JSDoc comments** should be on the same line with `/**` and `*/`.

### Examples 5

**✅ Correct:**

```typescript
/** User ID */
const userId = 123

/** Calculates the total price */
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

/**
 * Complex function with detailed documentation
 * @param name - User name
 * @returns Greeting message
 */
function greet(name: string): string {
  return `Hello, ${name}`
}
```

**❌ Wrong:**

```typescript
/**
 * User ID
 */
const userId = 123

/**
 * Calculates the total price
 */
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

### Rule: Object key ordering - shorthand properties first

**Shorthand properties** in objects should be ordered before regular properties.

### Examples 6

**✅ Correct:**

```typescript
const user = {
  age,
  name,
  city: 'New York',
  country: 'USA'
}

const config = {
  isActive,
  timeout,
  apiKey: 'secret-key',
  baseUrl: 'https://api.example.com'
}
```

**❌ Wrong:**

```typescript
// Don't mix shorthand and regular properties
const user = {
  city: 'New York',
  age,
  name,
  country: 'USA'
}

const config = {
  apiKey: 'secret-key',
  isActive,
  baseUrl: 'https://api.example.com',
  timeout
}
```

### Rule: Object keys alphabetically ordered

**Object keys** should be ordered alphabetically, with **shorthand properties** grouped first (also alphabetically).

### Examples 7

**✅ Correct:**

```typescript
const user = {
  age,
  name,
  city: 'New York',
  country: 'USA'
}

const config = {
  isActive,
  timeout,
  apiKey: 'secret-key',
  baseUrl: 'https://api.example.com'
}
```

**❌ Wrong:**

```typescript
// Keys not in alphabetical order
const user = {
  name,
  age,
  country: 'USA',
  city: 'New York'
}
```

### Rule: Expand multi-value object and array literals

**Single-key objects** and **single-item arrays** may stay on one line. **Objects with more than one key** and **arrays with more than one item** should use one entry per line.

### Examples 8

**✅ Correct:**

```typescript
// Single value - can stay on one line
const point = { x: 10 }
const statuses = ['active']

// Multiple values - separate lines
const user = {
  age: 30,
  name: 'John'
}

const items = [
  'first',
  'second'
]

const config = {
  apiKey: 'secret',
  timeout: 5000
}
```

**❌ Wrong:**

```typescript
// Don't put multiple values on one line
const user = { name: 'John', age: 30 }
const items = ['first', 'second']

const config = { apiKey: 'secret', timeout: 5000 }
```

### Rule: Separate multiline object values with blank lines

**Multiline values** in objects should be separated by blank lines.

### Examples 9

**✅ Correct:**

```typescript
const config = {
  another: 42,
  lastSimple: 'end',
  simple: 'value',

  array: [
    'item1',
    'item2'
  ],

  complex: {
    deep: 'value',
    nested: true
  }
}
```

**❌ Wrong:**

```typescript
// Don't keep multiline values together
const config = {
  another: 42,
  lastSimple: 'end',
  simple: 'value',
  array: [
    'item1',
    'item2'
  ],
  complex: {
    deep: 'value',
    nested: true
  }
}
```

### Rule: No trailing commas

**Never use trailing commas** in arrays, objects, or other structures.

See [references/examples.md](references/examples.md) for examples.

### Rule: Compute derived data before `return`

When a handler or function needs derived data, compute it in a separate variable first and keep the final `return` simple and explicit.

Avoid rebuilding objects through `...spread` just to replace one field when an explicit object is clearer.

### Examples 9a

**✅ Correct:**

```typescript
const properties = category.properties.map((property) => normalizeProperty(property))

return {
  id: category.id,
  name: category.name,
  properties
}
```

**❌ Wrong:**

```typescript
return {
  ...category,
  properties: category.properties.map((property) => normalizeProperty(property))
}
```

### Rule: Separate multiline blocks and trailing returns with blank lines

**Multiline blocks** (if/else, loops, try/catch, functions, etc.) should be separated from other code with blank lines, unless they are at the start or end of a parent block. Add the same blank line before `return` when earlier statements appear in the same block.

See [references/examples.md](references/examples.md) for examples.

### Rule: Nested function calls as arguments on separate lines

**Exception to the "No function calls as arguments" rule**: In **rare cases** (e.g., validator schemas, DSL configurations, query builders, matcher APIs) when using a function call as an argument is necessary for readability, keep the nested call on separate lines.

Prefer extracting to variables in most cases. Use this exception sparingly. See [references/examples.md](references/examples.md) for examples.
