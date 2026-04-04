# Additional TypeScript style examples

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

## Nested function calls on separate lines

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
