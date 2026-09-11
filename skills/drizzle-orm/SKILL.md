---
name: drizzle-orm
description: Drizzle ORM 1.0 query patterns for the user's projects using Relations v2 and Relational Query Builder v2. Use when writing, reviewing, or debugging Drizzle queries, including dynamic filters, SQL builder fallbacks, relation loading, query-shape type mismatches, and non-trivial query construction during review.
---

# Drizzle ORM patterns

The user's projects use Drizzle 1.0, Relations v2, and Relational Query Builder v2. Use this established API generation: `db.query.*` is the v2 API and relations are defined with `defineRelations`. Treat this as settled project context. Resolve concrete type errors, driver limits, and API details from the relevant code and package documentation when needed.

For formatting of relational queries and SQL builder chains, especially when a query mixes `columns`, `where`, and `with` or builder helpers like `.select()` and `.where()`, read [references/formatting.md](references/formatting.md). Use that layout consistently in generated examples and code review suggestions because deep Drizzle configs get hard to scan when everything is packed onto a few lines.

## API conventions

- Use these Drizzle 1.0 patterns:

- Use `defineRelations(schema, (relationBuilder) => ...)` from `drizzle-orm`.
- Pass the resulting relations object to `drizzle(client, { relations })`.
- Use `db.query.table.findMany()` and `db.query.table.findFirst()` for RQB v2.
- Use object-shaped `where` and `orderBy` in relational queries.
- Keep new relational queries in the v2 shape. Add compatibility code only for a reproduced project need within the requested task.

## Driver caveats

- Identify the client before suggesting a transaction, including when reviewing writes that must succeed or fail together.
- With `drizzle-orm/neon-http`, identify atomicity gaps and verify a supported solution; this driver does not support `db.transaction(async (tx) => ...)` callbacks.
- With `drizzle-orm/neon-serverless` using WebSocket or `Pool`, `db.transaction(...)` is supported and can make related writes atomic.

## Relations v2 setup

Define relations in one place with `defineRelations`. The `relationBuilder` callback parameter exposes schema tables plus relation helpers such as `one`, `many`, and `through`.

```typescript
import { defineRelations } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

export const relations = defineRelations(schema, (relationBuilder) => ({
  posts: {
    author: relationBuilder.one.users({
      from: relationBuilder.posts.authorId,
      to: relationBuilder.users.id
    })
  },

  users: {
    posts: relationBuilder.many.posts()
  }
}))

export const db = drizzle(client, { relations })
```

- Use these relation options only when they solve a real schema need:

- `from` and `to` connect local relation columns to target relation columns.
- `alias` is useful when two tables have multiple relations between them.
- `optional: false` makes the relation required at the type level; use it only when the related row is guaranteed to exist.
- `where` in relation definitions creates predefined relation filters. It can filter only columns on the target `to` table.

### Many-to-many through junction tables

Use `through` to expose the target table directly instead of querying a junction table and mapping it out manually.

```typescript
export const relations = defineRelations(schema, (relationBuilder) => ({
  users: {
    groups: relationBuilder.many.groups({
      from: relationBuilder.users.id.through(
        relationBuilder.usersToGroups.userId
      ),

      to: relationBuilder.groups.id.through(
        relationBuilder.usersToGroups.groupId
      )
    })
  },

  groups: {
    participants: relationBuilder.many.users()
  }
}))

const users = await db.query.users.findMany({
  with: {
    groups: true
  }
})
```

### Predefined relation filters

Use predefined filters when a named relation always needs the same target-table filter.

```typescript
export const relations = defineRelations(schema, (relationBuilder) => ({
  groups: {
    verifiedUsers: relationBuilder.many.users({
      from: relationBuilder.groups.id.through(
        relationBuilder.usersToGroups.groupId
      ),

      to: relationBuilder.users.id.through(
        relationBuilder.usersToGroups.userId
      ),

      where: {
        verified: true
      }
    })
  }
}))

const groups = await db.query.groups.findMany({
  with: {
    verifiedUsers: true
  }
})
```

## Relational API vs SQL builder

Drizzle has two distinct query APIs. Choosing the wrong one causes TypeScript errors or forces awkward query shapes.

**Use the relational API** (`db.query.table.findFirst/findMany`) when:

- Fetching a single record or a simple list.
- Loading nested relations in one query.
- Filtering with object-shaped RQB v2 filters.
- Using relation filters, predefined relation filters, nested `limit`, or nested `offset`.

**Use the SQL builder** (`db.select().from().where()`) when:

- Building arbitrary `WHERE` conditions dynamically at runtime.
- Running aggregations (`count()`, `sum()`, etc.).
- The query needs explicit joins or selected fields from unrelated tables.

## Relational query builder v2

### `where` takes an object

Use object-shaped filters in RQB v2. A plain property value means equality; use operator objects for non-equality conditions.

```typescript
const item = await db.query.items.findFirst({
  where: {
    id
  }
})

const approved = await db.query.items.findMany({
  where: {
    status: 'approved',

    price: {
      gt: 0
    }
  }
})
```

Do not pass SQL helper expressions directly to relational `where`.

```typescript
// Wrong in RQB v2: use this shape in the SQL builder instead.
const item = await db.query.items.findFirst({
  where: eq(items.id, id)
})
```

### Complex filters

RQB v2 filters support `AND`, `OR`, `NOT`, column operators, `RAW`, and relation filters.

```typescript
import { sql } from 'drizzle-orm'

const users = await db.query.users.findMany({
  where: {
    AND: [
      {
        id: {
          gt: 10
        }
      },
      {
        OR: [
          {
            email: {
              ilike: '%@example.com'
            }
          },
          {
            RAW: (table) => sql`${table.lastLogin} is not null`
          }
        ]
      },
      {
        posts: {
          title: {
            like: 'Release%'
          }
        }
      }
    ]
  }
})
```

Use `RAW` only for cases the object operators cannot express, and still route user input through parameterized `sql` expressions.

### Select columns and load nested relations

Use `columns` to restrict selected fields and `with` to load related rows.

```typescript
const brand = await db.query.brands.findFirst({
  columns: {
    id: true,
    name: true,
    slug: true
  },

  where: {
    slug
  },

  with: {
    items: {
      columns: {
        id: true,
        name: true
      },

      where: {
        status: 'approved'
      },

      orderBy: {
        id: 'asc'
      },

      limit: 10,
      offset: 0,

      with: {
        category: {
          columns: {
            name: true,
            slug: true
          }
        }
      }
    }
  }
})
```

When `columns` contains both `true` and `false`, the `false` entries are redundant because the included `true` fields already define the result shape.

### Order related data

Prefer object-shaped `orderBy` for normal ordering. Use callback/custom SQL ordering only when the object form cannot express the requirement.

```typescript
const posts = await db.query.posts.findMany({
  orderBy: {
    createdAt: 'desc'
  },

  with: {
    comments: {
      orderBy: {
        id: 'asc'
      }
    }
  }
})
```

### Add computed fields with `extras`

Use `extras` for per-row computed fields. Do not put aggregations in `extras`; use core queries or an explicit supported subquery pattern such as `db.$count` when the project already uses it.

```typescript
const posts = await db.query.posts.findMany({
  extras: {
    contentLength: (table, { sql }) => sql<number>`length(${table.content})`
  },

  with: {
    comments: {
      extras: {
        commentLength: (table, { sql }) => sql<number>`length(${table.content})`
      }
    }
  }
})
```

## SQL builder

### Dynamic WHERE conditions

Build conditions into an array, then spread into `and()`:

```typescript
import { and, eq, ilike } from 'drizzle-orm'

const conditions = [
  eq(items.status, 'approved')
]

if (categoryId) {
  conditions.push(eq(items.categoryId, categoryId))
}

if (search) {
  const escaped = search
    .replaceAll('%', String.raw`\%`)
    .replaceAll('_', String.raw`\_`)

  conditions.push(
    ilike(items.name, `%${escaped}%`)
  )
}

const results = await db
  .select({
    id: items.id,
    name: items.name
  })
  .from(items)
  .where(and(...conditions))
  .limit(limit)
  .offset((page - 1) * limit)
```

Always escape user input before passing to `ilike()` because `%` and `_` are wildcards in SQL LIKE patterns.

### Count query

`count()` returns exactly one row at runtime, but with `noUncheckedIndexedAccess` TypeScript still treats indexed access as possibly `undefined`. Avoid array destructuring here and read the first row safely.

```typescript
import { count } from 'drizzle-orm'

const countRows = await db
  .select({ total: count() })
  .from(items)
  .where(
    and(...conditions)
  )

const total = countRows[0]?.total ?? 0
```

### Parallel data and count queries

Run independent queries with `Promise.all` to avoid sequential round-trips.

```typescript
const [rows, countRows] = await Promise.all([
  db
    .select()
    .from(items)
    .where(
      and(...conditions)
    )
    .limit(limit)
    .offset(offset),

  db
    .select({ total: count() })
    .from(items)
    .where(
      and(...conditions)
    )
])

const total = countRows[0]?.total ?? 0

return {
  items: rows,
  total,
  page,
  limit
}
```

### Joins in the SQL builder

```typescript
import { eq } from 'drizzle-orm'

const results = await db
  .select({
    brandName: brands.name,
    id: items.id,
    name: items.name
  })
  .from(items)
  .innerJoin(brands, eq(items.brandId, brands.id))
  .where(
    eq(items.status, 'approved')
  )
```
