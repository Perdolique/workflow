---
name: vue-components
description: Vue 3 + TypeScript component conventions for `.vue` SFC work. Use for Vue UI tasks that change component APIs/templates/styling/accessibility/composables/template refs/v-model or related component behavior. For Nuxt/Pinia/routing/E2E/Vitest tasks apply only to component-layer code and combine with the more specific local skill.
license: Unlicense
---

# Vue component conventions

Use this skill for concrete, idiomatic Vue component work. Project-local instructions, `AGENTS.md`, lint rules, nearby components, and framework-specific skills take priority.

## First pass

- Inspect the target component, its parent/children, and at least one similar nearby component before editing.
- Decide whether the change belongs in a component, composable, page, route, store, or test. Keep this skill focused on the component layer.
- Preserve public props, emits, slots, styling hooks, and visual behavior unless the requested task requires changing them.
- Reuse existing base components, dialog/overlay primitives, design tokens, and local composables before adding a new primitive.
- Keep static UI static. Do not introduce config arrays, `v-for`, extra computed state, or generic abstractions for a small fixed set of known elements.

## Single-file component shape

- Match the local SFC block order; otherwise use `<template>`, `<script>`, `<style>`.
- Use `<script setup lang="ts">` for component logic unless the project uses a different established pattern.
- Put exported types needed by other files in a separate non-setup `<script lang="ts">` block above the setup block.
- In setup code, group imports, local types, compiler macros, state/computed/composables/hooks, then methods. Match the local macro order when one exists.

## Imports and TypeScript

- Prefer explicit imports for Vue APIs unless the repository intentionally uses auto-imports.
- Import Vue APIs such as `ref`, `computed`, `watch`, `onMounted`, and `useTemplateRef` from `vue` when explicit imports are used.
- Import VueUse helpers from `@vueuse/core` only when the project already uses VueUse or has it installed.
- Follow the path aliases and import ordering already used by the owning feature.
- For typed helpers, object shaping, guards, and non-component TypeScript, use the local TypeScript conventions or a TypeScript skill if one is available.

## Props

- Use a named `Props` interface or type for non-trivial prop sets.
- Do not add `readonly` to prop interface fields unless the local codebase already requires it.
- Prefer type-based `defineProps<Props>()` for TypeScript components.
- For Vue 3.5+ projects or repositories already using reactive props destructure, use destructuring defaults for optional props:

```ts
interface Props {
  label: string;
  tone?: 'neutral' | 'danger';
}

const {
  tone = 'neutral',
  label
} = defineProps<Props>()
```

- Avoid `= false` for optional Boolean props; absent Boolean props are already `false` in Vue.
- In Vue 3.4 or older projects, or where the codebase standardizes on it, preserve `withDefaults(defineProps<Props>(), { ... })`.
- For object or array defaults with `withDefaults`, use factory functions.

## Composables

- Extract a composable only for reusable behavior, real stateful logic, or a component that is becoming hard to scan. Keep one-off code inline.
- Name composables with the Vue convention: camelCase starting with `use`. Example: `useDisclosure()`, `useForm()`, `useTooltip()`.
- Keep markup, slots, and styling in the component. Put reusable state, derived values, event handling, effects, or DOM coordination in the composable.
- Return a plain object containing refs, computed refs, and functions. This keeps destructuring in components reactive:

```ts
const { isOpen, close, triggerId } = useDisclosure()
```

- Accept plain values, refs, or getters only when callers need that flexibility. Normalize them with `toValue()`.
- Prefer passing named options objects when a composable takes more than one or two inputs. Avoid positional argument lists that become hard to read at call sites.
- If a composable owns side effects such as event listeners, observers, timers, or subscriptions, it must also own cleanup with Vue lifecycle hooks or the cleanup API provided by the helper it uses.
- Keep composable return names concrete. Prefer `isPanelOpen`, `selectedId`, `openPanel`, and `closePanel` over vague names such as `state`, `data`, or `handler`.

## Emits and models

- Use a named `Emits` type or interface for non-trivial emits.
- Use a union call signature when events share one simple shape:

```ts
type Emits = (event: 'confirm' | 'cancel') => void
```

- Use an interface or named tuple style when events have different payloads:

```ts
interface Emits {
  change: [value: string];
  submit: [data: FormData, validated: boolean];
}
```

- Use `defineModel()` only for actual two-way `v-model` contracts.
- Use `defineEmits()` for regular events such as `submit`, `cancel`, or analytics notifications.
- Avoid casual `defineModel({ default: ... })`; it can desync from an undefined parent value.

## Template logic

- Keep template bindings simple: identifiers, refs, props, and named computed values.
- Move ternaries, boolean chains, route comparisons, formatting, and repeated conditions into computed values or small helpers.
- Prefer direct template markup for a small, known set of elements. Use config-driven rendering only for genuinely dynamic or repeated structures.
- Keep text and labels in the project's i18n or copy system. Avoid dynamic translation keys when local tooling depends on literals.
- Use full, readable names for props, state, classes, and variants. Avoid ad-hoc abbreviations such as `cnt`, `curr`, `md`, or `sm` unless they are part of an existing design-token API.

## Template refs and browser APIs

- In Vue 3.5+ projects, prefer `useTemplateRef('name')` for static refs; do not pass a generic unless inference fails.
- In older Vue projects, preserve the existing `ref<T | null>(null)` template ref pattern instead of forcing an upgrade-specific API.
- Do not access `document`, `window`, `navigator`, or element refs during setup in SSR/test-sensitive code.
- Prefer lifecycle-safe composables for DOM work. Use VueUse helpers when the project already uses VueUse.

## Accessibility

- Treat accessibility as component correctness, not polish.
- Prefer semantic HTML before adding manual ARIA roles.
- Ensure interactive elements are keyboard accessible and have visible focus states.
- Give icon-only buttons, custom controls, and form fields accessible names via visible labels, `aria-label`, or `aria-labelledby`.
- Hide decorative elements from assistive technology with `aria-hidden="true"`; give informative images meaningful `alt` text.
- Do not rely on color alone for meaning, validation, or state.
- When building a custom control, match the native equivalent's keyboard, focus, and ARIA behavior.

## Styling

- Follow the repository's styling system first: CSS Modules, scoped CSS, SCSS, utility classes, design tokens, and component libraries are project-specific.
- Do not switch between `<style module>`, `<style scoped>`, plain CSS, or SCSS just because this skill mentions a pattern. Match nearby components. Otherwise, prefer `<style module>` because of its encapsulation and maintainability benefits.
- Prefer existing design tokens, CSS custom properties, typography surfaces, and spacing/color helpers over ad-hoc values.
- Put a root `.component` class on styled components when that is the local convention or when it clarifies style ownership.
- For CSS-specific patterns, refer to a styling/CSS skill if one is available.

### CSS modules class bindings

For CSS Modules, bind one `$style.*` class per styled template element. Use
literal global classes for variants and state, then define those modifiers
nested under the module class with `:global(.modifier)`.

Wrong:

```vue
<template>
  <button :class="[$style.button, $style.active, $style.disabled]">
    Save
  </button>
</template>
```

Right:

```vue
<template>
  <button :class="[$style.button, { isActive, isDisabled }]">
    Save
  </button>
</template>

<style module>
  .button {
    color: var(--text-primary);

    &:global(.isActive) {
      color: var(--accent);
    }

    &:global(.isDisabled) {
      opacity: 0.5;
    }
  }
</style>
```

This keeps the component-owned class scoped while making state modifiers visible
in template bindings. Do not stack module-local state classes such as
`[$style.button, $style.active, $style.disabled]` on one element.

- Prefer component-owned class selectors over broad nested tag selectors when styling owned markup.
- Use modern CSS features when the repository's browser baseline supports them; do not add legacy fallbacks without a current supported scenario.

## Component boundaries

- For Nuxt pages, layouts, plugins, middleware, Nitro handlers, `useFetch`, `useAsyncData`, `$fetch`, or runtime config, use a Nuxt-specific skill or the local Nuxt conventions. This skill covers only the Vue component surface.
- For Pinia state shape, async store actions, store HMR, or cross-store dependencies, use a Pinia/store-specific skill when available.
- For unit/component tests, use the repository's test conventions or a unit-testing skill if one is available.
- For E2E/browser flows, use the repository's E2E conventions or an E2E/browser skill if one is available.
