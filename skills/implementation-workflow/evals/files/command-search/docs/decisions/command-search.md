# Command search decision

The command palette contains 120 command records in a local array. A lookup runs after each edit to the query. The current implementation scans the array once and returns matching records in configuration order.

## Required behavior

- Match the query anywhere within a command label, not only at the start.
- Compare ASCII letters without case sensitivity. Characters outside ASCII compare exactly; there is no Unicode case conversion.
- Keep query whitespace. Do not trim the query or labels.
- Return all commands for an empty query.
- Preserve configuration order. Do not sort by label, relevance, or match position.
- Keep separate records with equal labels. Command IDs identify records; labels do not.

## Contract examples

Given these records in this order:

| ID | Label |
| --- | --- |
| folder | Open Folder |
| close | Close Tab |
| file | Open File |
| recent | Open File |

The query `OPEN` returns `folder`, `file`, and `recent`, in that order. The query `pen` returns the same records. A query with one leading space followed by `open` returns none. An empty query returns all four records in the listed order.

## Scope of this input

This record supplies the behavior and current approach for a planning task. Implementation source and a runnable test suite are not included. Timing claims need a separate measurement; this file provides no benchmark results.
