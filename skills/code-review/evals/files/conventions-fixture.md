# Formatter review context

This is a complete synthetic repository snapshot. The review adds `src/formatBadge.js` and `src/verbatim/formatCode.js`. All other files already exist. These are private pure helpers, with no external API or I/O. Focused output tests pass on the reviewed version. No lint result is available. No other project context or domain skills are supplied.

## Global user instructions

Use named exports in JavaScript modules. Default exports are not allowed.

## Root AGENTS.md

Formatter function names start with `format`. Output delimiters depend on the formatter. There is no required quote style.

## src/verbatim/AGENTS.md

Verbatim formatters preserve the input exactly. Do not use `normalizeLabel` in this directory.

## Existing src/normalizeLabel.js

```js
export function normalizeLabel(value) {
  return value.trim() || 'Untitled';
}
```

## Existing src/formatTitle.js

```js
import { normalizeLabel } from './normalizeLabel.js';

export function formatTitle(value) {
  return `[${normalizeLabel(value)}]`;
}
```

## Existing src/formatTag.js

```js
import { normalizeLabel } from './normalizeLabel.js';

export function formatTag(value) {
  return `(${normalizeLabel(value)})`;
}
```

## Added src/formatBadge.js

```js
export default function fmtBadge(value) {
  const label = value.trim() || "Untitled";
  return `<${label}>`;
}
```

## Added src/verbatim/formatCode.js

```js
export function formatCode(value) {
  return `<code>${value}</code>`;
}
```

The code formatter returns plain display text, not HTML for insertion into a document.
