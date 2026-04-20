# TypeScript style examples

## Table of contents

- [No semicolons at the end of statements](#no-semicolons-at-the-end-of-statements)
- [No method calls in conditional statements](#no-method-calls-in-conditional-statements)
- [Explicit presence checks](#explicit-presence-checks)
- [No function calls as arguments](#no-function-calls-as-arguments)
- [Group one-line declarations](#group-one-line-declarations)
- [Clear local names](#clear-local-names)
- [Inline JSDoc comments](#inline-jsdoc-comments)
- [Object key ordering](#object-key-ordering)
- [Expand multi-value literals](#expand-multi-value-literals)
- [Separate multiline object values](#separate-multiline-object-values)
- [No trailing commas](#no-trailing-commas)
- [Derived data before return](#derived-data-before-return)
- [Separate multiline blocks with blank lines](#separate-multiline-blocks-with-blank-lines)
- [Flat interface structure](#flat-interface-structure)
- [Nested function calls on separate lines](#nested-function-calls-on-separate-lines)

---

## No semicolons at the end of statements

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

## No method calls in conditional statements

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
```

**❌ Wrong:**

```typescript
if (user.isAdmin()) {
  console.log('Admin access granted')
}

while (checkPermissions(user, 'write')) {
  // Do something
}
```

## Explicit presence checks

**✅ Correct:**

```typescript
if (item === undefined) {
  throw createError({ status: 404 })
}

if (property === undefined) {
  return result
}

if (slug === '') {
  throw createError({ status: 400 })
}
```

**❌ Wrong:**

```typescript
if (!item) {
  throw createError({ status: 404 })
}

if (!property) {
  return result
}

if (!slug) {
  throw createError({ status: 400 })
}
```

## No function calls as arguments

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
const result = processData(fetchUser())
const mapped = mapValues(filterItems(items))

saveToDatabase(validateInput(data))
```

## Group one-line declarations

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
// Don't separate one-line declarations with blank lines
const name = 'John'

const age = 30

const city = 'New York'

// Don't run multiline declarations together without blank lines
const complexObject = {
  id: 1,
  name: 'Product'
}
const anotherObject = {
  bar: 'baz',
  foo: 'bar'
}
```

## Clear local names

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

## Inline JSDoc comments

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

## Object key ordering

Shorthand properties come first (alphabetically), then regular properties (also alphabetically).

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
// Shorthand properties not first
const user = {
  city: 'New York',
  age,
  name,
  country: 'USA'
}

// Keys not in alphabetical order
const config = {
  isActive,
  timeout,
  baseUrl: 'https://api.example.com',
  apiKey: 'secret-key'
}
```

## Expand multi-value literals

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
```

**❌ Wrong:**

```typescript
const user = { name: 'John', age: 30 }
const items = ['first', 'second']
```

## Separate multiline object values

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

## No trailing commas

**✅ Correct:**

```typescript
const items = [
  'first',
  'second',
  'third'
]

const user = {
  age: 30,
  city: 'New York',
  name: 'John'
}
```

**❌ Wrong:**

```typescript
const items = [
  'first',
  'second',
  'third',
]

const user = {
  age: 30,
  city: 'New York',
  name: 'John',
}
```

## Derived data before return

**✅ Correct:**

```typescript
const properties = item.propertyValues.map((propertyValue) => {
  return normalizePropertyValue(propertyValue)
})

return {
  id: item.id,
  name: item.name,
  properties
}
```

**❌ Wrong:**

```typescript
return {
  ...item,
  properties: item.propertyValues.map((propertyValue) => normalizePropertyValue(propertyValue))
}
```

## Separate multiline blocks with blank lines

**✅ Correct:**

```typescript
function processUser(user: User) {
  const isValid = validateUser(user)

  if (isValid) {
    console.log('Valid user')
    saveToDatabase(user)
  }

  return isValid
}

const result = calculate()

for (const item of items) {
  processItem(item)
  updateCounter(item)
}

const total = getTotal()
```

**❌ Wrong:**

```typescript
function processUser(user: User) {
  const isValid = validateUser(user)
  if (isValid) {
    console.log('Valid user')
    saveToDatabase(user)
  }
  return isValid
}

const result = calculate()
for (const item of items) {
  processItem(item)
  updateCounter(item)
}
const total = getTotal()
```

Blank lines at the start or end of parent blocks are not needed:

```typescript
function example() {
  const value = 10

  if (value > 5) {
    doSomething()
  }
}
```

Apply the same rule to `return`: if the block already contains earlier statements, leave a blank line before the `return`. If `return` is the first statement in the block, no extra blank line is needed.

## Flat interface structure

**✅ Correct:**

```typescript
interface Brand {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
}

interface Item {
  brand: Brand;
  category: Category;
  id: string;
  name: string;
}

interface InventoryRecord {
  createdAt: Date | string;
  id: string;
  item: Item;
}
```

**❌ Wrong:**

```typescript
// Don't nest object shapes inline inside interfaces
interface InventoryRecord {
  createdAt: Date | string;
  id: string;

  item: {
    id: string;
    name: string;

    brand: {
      name: string;
      slug: string;
    };

    category: {
      name: string;
      slug: string;
    };
  };
}
```

## Nested function calls on separate lines

When a nested function call is unavoidable as an argument (see exception in SKILL.md), keep it on its own line.

**✅ Correct:**

```typescript
const schema = v.string(
  v.array()
)

const userSchema = v.object(
  v.optional(
    v.string()
  )
)

const pipeline = pipe(
  transform(config)
)

conditions.push(
  eq(equipmentCategories.slug, categorySlug)
)
```

**❌ Wrong:**

```typescript
const schema = v.string(v.array())
const userSchema = v.object(v.optional(v.string()))
const pipeline = pipe(transform(config))
conditions.push(eq(equipmentCategories.slug, categorySlug))
```
