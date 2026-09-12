# Styling foundations

## Support the target browsers

- Inspect `.browserslistrc`, the `browserslist` field in `package.json`, and relevant build configuration before choosing CSS features, prefixes, polyfills, or fallbacks.
- Treat the repository's declared browser targets as the compatibility boundary. Choose features and fallbacks that work in those targets.

## Use plain CSS by default

- Use plain CSS unless the task, repository, or a framework-specific instruction explicitly requires another styling system.
- Use native CSS nesting when nesting makes selector ownership clearer. Keep selectors flat when nesting does not improve readability.
- In native CSS nesting, use `&` when a nested selector must refer to the parent selector. Selector concatenation provided by preprocessors is not part of native CSS syntax.

## Use established styles and tokens

- Inspect global reset and base styles before adding local rules.
- Preserve shared base styles when removing feature-specific CSS.
- Reuse existing semantic design tokens and confirm that every referenced custom property exists.

## Keep declarations purposeful

- Make each CSS declaration serve an approved visual requirement, a defined state, a layout or content constraint, a browser compatibility need, or a shared styling contract.
- Before adding a defensive declaration, inspect the existing cascade and computed result, then identify the observable problem it prevents.
- Remove a declaration that is overridden, duplicates an effective base rule, has no computed effect, or changes no required state.
- Keep obvious declarations self-explanatory. Add a short CSS comment for a non-obvious invariant or workaround; individual declarations do not need separate tests.

## Support color schemes

- Follow the project's established theme contract, including a deliberate single color scheme.
- When neither the requirements nor the project define a theme contract, support both light and dark schemes according to the user's preference.
- Declare every supported scheme with `color-scheme` so browser-owned controls, scrollbars, and system colors use the same scheme as the page.
- Store scheme-dependent style values in semantic CSS custom properties or design tokens at a shared scope. Components consume those tokens instead of defining their own theme branches.
- Prefer `light-dark()` for token values when the browser targets support it. Otherwise, change the same token values at a shared scope with `prefers-color-scheme`.

## Keep selector ownership clear

- Prefer local class selectors over broad nested element selectors.
- Nest ancestor-state selectors under the class they style: `.title { .card:hover & { ... } }`, not `.card:hover .title`.

## Scope shared custom properties

- Create a semantic custom property when several related selectors share a non-trivial value that must change together.
- Define it at the narrowest shared scope and derive its raw value from existing tokens when available.

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
