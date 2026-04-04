# Formatting nested relational queries

Use this layout when a relational query config contains more than one top-level block or any nested `with` tree.

## Why this layout helps

Deep Drizzle query objects become hard to review when `columns`, `where`, and `with` are compressed together. A vertical layout makes it easier to verify three things quickly:

- Which fields are selected
- Which filters apply at each level
- Which relations are loaded and where nested filters live

That matters during code review because relational queries often look correct at a glance while hiding the wrong filter or the wrong nested relation.

## Formatting rules

1. Put each major top-level block on its own multiline section.
2. Prefer the order `columns`, `where`, `with` when those blocks coexist.
3. Expand `where` objects to multiline form inside relational queries, even if they contain one property.
4. Separate multiline `columns`, `where`, and `with` blocks with a blank line.
5. Apply the same layout recursively inside nested relations.

## Preferred example

```typescript
const brand = await event.context.dbHttp.query.brands.findFirst({
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

## Additional example: `findMany()` with sibling and nested relations

Use the same spacing when one relation stays shallow and another relation nests deeper. The goal is to keep each relation boundary obvious during review.

```typescript
const items = await db.query.items.findMany({
  columns: {
    id: true,
    name: true,
    slug: true
  },

  where: {
    status: 'approved'
  },

  with: {
    brand: {
      columns: {
        id: true,
        name: true,
        slug: true
      }
    },

    category: {
      columns: {
        id: true,
        name: true,
        slug: true
      },

      with: {
        properties: {
          columns: {
            dataType: true,
            id: true,
            name: true
          }
        }
      }
    }
  }
})
```

## Avoid packed formatting for nested relation configs

```typescript
const brand = await event.context.dbHttp.query.brands.findFirst({
  columns: { id: true, name: true, slug: true },
  where: { slug },
  with: {
    items: {
      columns: { id: true, name: true },
      where: { status: 'approved' },
      with: {
        category: { columns: { name: true, slug: true } }
      }
    }
  }
})
```

Use the packed version only for trivial one-block examples. Once the query config has nested relations or multiple top-level sections, switch to the expanded layout.
