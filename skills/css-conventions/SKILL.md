---
name: css-conventions
description: CSS conventions for authoring and reviewing CSS, SCSS, CSS Modules, design tokens, and responsive layouts. Use whenever a task changes or reviews styling, regardless of framework.
license: Unlicense
---

# CSS conventions

Follow the target repository's browser baseline, styling system, resets, tokens, and nearby patterns first.

## Browser support

- Inspect `.browserslistrc`, the `browserslist` field in `package.json`, and relevant build configuration before choosing CSS features, prefixes, polyfills, or fallbacks.
- Treat the repository's declared browser targets as the compatibility boundary. Do not add workarounds for older browsers outside that boundary, and do not use unsupported features without the fallback required by browsers inside it.

## Existing styles and tokens

- Inspect global reset and base styles before adding local resets. Do not repeat `margin`, `padding`, or `list-style` resets already applied to the target element.
- Reuse existing semantic design tokens and verify each referenced custom property is declared. Do not invent a token or a new size for every literal value.

## Intrinsic sizing

- Add `min-inline-size: 0` or `min-block-size: 0` only for demonstrated intrinsic overflow, Grid/Flex shrinking, native-control overflow, or `0fr` disclosure collapse.
- Explain non-obvious intrinsic sizing constraints with a short CSS comment at the declaration.

## CSS Modules and selector ownership

- Keep the element's structural class local to the module. Express transient state with a state class or attribute instead of stacking module-local state classes.
- Prefer local class selectors over broad nested element selectors.
- Nest ancestor-state selectors under the class they style: `.title { .card:hover & { ... } }`, not `.card:hover .title`.

## Scoped custom properties

- Create a semantic custom property only when multiple related selectors share a non-trivial value that must change together.
- Define it at the narrowest shared scope and derive its raw value from existing tokens when available.
- Do not create a custom property for a one-off value or coincidental repetition.

```css
.menu {
  --entry-padding: 0 var(--spacing-16);
}

.item {
  padding: var(--entry-padding);
}

.emptyState {
  padding: var(--entry-padding);
}
```
