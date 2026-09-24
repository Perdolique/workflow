---
name: vue-components
description: Build, refactor, or review Vue 3.5+ SFCs and composables with idiomatic TypeScript. Use for Vue component mechanics in components, framework pages, and layouts, including public contracts, template logic, lifecycle handling, and CSS Module bindings. Use other skills for framework-specific APIs and framework-independent interface work.
license: Unlicense
---

# Vue component conventions

Use this skill for Vue 3.5+ SFC and composable mechanics, including Vue code in framework pages and layouts. Apply web interface conventions to framework-independent HTML, CSS, accessibility, content, and user behavior when available. Project-local instructions, `AGENTS.md`, lint rules, and nearby components take priority.

## First pass

- Before editing, inspect the target SFC or composable, relevant callers or children, and a similar nearby file when available.
- Decide whether the change belongs in an SFC, composable, route, store, or test. Keep this skill focused on Vue mechanics in SFCs and composables.
- Preserve public props, emits, slots, and Vue-specific styling hooks unless the requested task requires changing them.
- Reuse existing local composables and matching Vue component APIs before adding a new Vue abstraction.
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
- Use reactive props destructuring with defaults for optional props:

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

- Keep component-wide derived rendering values, including conditions, collection checks, and formatting, in named computed state or view-model fields.
- For rendering logic that depends on template-local bindings, such as `v-for` aliases or slot props, use a named side-effect-free helper with those bindings as arguments. Reuse existing derived fields when available. Keep the current component and state structure when a helper alone expresses the local rendering logic.
- Keep comparisons, formatting, and other derived logic inside the named computed value, view-model field, or helper. Vue binding syntax such as `item in items` and slot bindings stays inline. These rendering rules are separate from event-handler conventions.

Wrong:

```vue
<button :disabled="isSaving || items.length === 0">
  Save
</button>
```

Right:

```vue
<template>
  <button :disabled="isSaveDisabled">
    Save
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const isSaveDisabled = computed(
    () => isSaving.value || items.value.length === 0
  )
</script>
```

- Prefer direct template markup for a small, known set of elements. Use config-driven rendering only for genuinely dynamic or repeated structures.
- Use full, readable names for props, state, classes, and variants. Avoid ad-hoc abbreviations such as `cnt`, `curr`, `md`, or `sm` unless they are part of an existing design-token API.

## Template refs and browser APIs

- Prefer `useTemplateRef('name')` for static refs; do not pass a generic unless inference fails.
- Use `useId()` instead of hard-coded IDs for component-internal element relationships such as `for`, `form`, `list`, `popovertarget`, and ARIA references. Bind the generated ID to the target `id` and each reference so component instances remain unique and SSR hydration stays stable.
- Do not access `document`, `window`, `navigator`, or element refs during setup in SSR/test-sensitive code.
- Prefer lifecycle-safe composables for DOM work. Use VueUse helpers when the project already uses VueUse.
- For newly standardized HTML elements, verify that Vue treats the tag as native during SSR and hydration. If Vue resolves it as a component, configure `compilerOptions.isCustomElement` and cover hydration or unresolved-component warnings in the browser console; typecheck and DOM assertions are insufficient.

## Styling

- Use `<style module>`, never `<style scoped>`.
- Use `.component` as the root class for every styled component.

### CSS modules class bindings

Bind one `$style.*` structural class per styled template element directly in the template. Express transient state with an attribute or a literal global state class, not another `$style.*` class. Match a global state class on the same element as its structural class with `&:global(...)`.

Use `$style` directly for classes bound in the template. Use `useCssModule()` in setup when script code must pass module class names to another API, such as a render callback or table column configuration. Do not add it only to build a simple template class list. When you own a component and callers need to style its rendered markup, expose a slot instead of adding a presentation-only class option.

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

## Component boundaries

- Apply this skill to the Vue template, script, and CSS Module mechanics of `.vue` Nuxt pages and layouts. Use a Nuxt-specific skill or local Nuxt conventions for plugins, middleware, Nitro handlers, routing, `useFetch`, `useAsyncData`, `$fetch`, and runtime config.
- For Pinia state shape, async store actions, store HMR, or cross-store dependencies, use a Pinia/store-specific skill when available.
- For unit/component tests, use the repository's test conventions or a unit-testing skill if one is available.
- For E2E/browser flows, use the repository's E2E conventions or an E2E/browser skill if one is available.

## Final pass

- Review every changed `.vue` file, including pages and layouts. Scan its full template for derived rendering logic. Check changed props, emits, models, slots, template refs, CSS Module bindings, and new `useCssModule()` calls against this skill. Fix confirmed violations within the task scope.
