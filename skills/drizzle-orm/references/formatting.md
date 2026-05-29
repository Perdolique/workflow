# Formatting Drizzle v1 beta queries

Use this layout when a Relational Query Builder v2 config contains more than
one top-level block, any nested `with` tree, or a SQL builder chain with a
non-trivial `.select()` or `.where()` call.

## Why this layout helps

Deep Drizzle queries become hard to review when `columns`, `where`, `orderBy`,
`extras`, `with`, or builder arguments are compressed together. A vertical
layout makes it easier to verify four things quickly:

- Which fields and computed fields are selected
- Which filters apply at each level
- Which ordering and pagination apply at each level
- Which relations are loaded and where nested filters live

That matters during code review because relational queries often look correct
at a glance while hiding the wrong filter or the wrong nested relation.

## Relational query rules

1. Use the RQB v2 object config shape. Put SQL helper expressions such as
   `eq()`, `ilike()`, `and()`, and `or()` in SQL builder examples, not in
   relational `where` examples.
2. Prefer the order `columns`, `where`, `orderBy`, `limit`, `offset`, `extras`,
   `with` when those blocks coexist.
3. Expand `where` and `orderBy` objects to multiline form inside relational
   queries, even if they contain one property.
4. Separate multiline `columns`, `where`, `orderBy`, `extras`, and `with` blocks
   with a blank line.
5. Apply the same layout recursively inside nested relations.
6. Use a generic `db` handle in examples unless documenting a specific
   application integration.

## Preferred relational query example

```typescript
const brands = await db.query.brands.findMany({
  columns: {
    id: true,
    name: true,
    slug: true
  },

  where: {
    status: 'active'
  },

  orderBy: {
    name: 'asc'
  },

  limit: 20,
  offset: 0,

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

## Relation filter example

Keep relation filters visibly inside the `where` block. They are easy to miss
when compressed beside selected fields or `with`.

```typescript
const users = await db.query.users.findMany({
  columns: {
    id: true,
    name: true
  },

  where: {
    posts: {
      content: {
        like: 'Release%'
      }
    }
  },

  with: {
    posts: {
      columns: {
        id: true,
        content: true
      }
    }
  }
})
```

## Extras example

Put `extras` before `with` so computed fields are reviewed with the selected
row shape before the relation tree starts. Do not put aggregations in `extras`;
use core queries or an explicit supported subquery pattern for those.

```typescript
const posts = await db.query.posts.findMany({
  columns: {
    id: true,
    content: true
  },

  extras: {
    contentLength: (table, { sql }) => sql<number>`length(${table.content})`
  },

  with: {
    comments: {
      columns: {
        id: true,
        content: true
      },

      extras: {
        commentLength: (table, { sql }) => sql<number>`length(${table.content})`
      }
    }
  }
})
```

## Avoid packed formatting for nested relation configs

```typescript
const brand = await db.query.brands.findFirst({
  columns: { id: true, name: true, slug: true },
  where: { slug },
  with: {
    items: {
      columns: { id: true, name: true },
      where: { status: 'approved' },
      with: {
        category: {
          columns: { name: true, slug: true }
        }
      }
    }
  }
})
```

Use the packed version only for trivial one-block examples. Once the query
config has nested relations, filters, computed fields, ordering, pagination, or
multiple top-level sections, switch to the expanded layout.

## SQL builder formatting

Use the same vertical style in SQL builder chains when a builder step contains
structure that deserves scanning on its own. SQL builder examples should use
Drizzle SQL helper functions such as `eq()` and `ilike()` because those helpers
belong in core SQL queries, not in RQB v2 object-shaped `where` blocks.

## SQL builder rules

1. Expand `.select({ ... })` to multiline form when selecting more than one
   field.
2. Put the argument to `.where()` on the next line when it contains a helper
   call such as `eq()`, `ilike()`, `and()`, or `or()`.
3. Keep the chain readable from top to bottom so reviewers can scan selected
   fields before filters.

## Preferred SQL builder example

```typescript
import { ilike } from 'drizzle-orm'

const matchingBrands = await db
  .select({
    id: brands.id,
    name: brands.name
  })
  .from(brands)
  .where(
    ilike(brands.name, '%acme%')
  )
```

## Avoid packed SQL builder formatting

```typescript
const matchingBrands = await db
  .select({
    id: brands.id,
    name: brands.name
  })
  .from(brands)
  .where(ilike(brands.name, '%acme%'))
```
