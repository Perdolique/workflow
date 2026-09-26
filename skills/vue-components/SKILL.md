---
name: vue-components
description: Build, refactor, or review Vue 3.5+ SFCs and composables with idiomatic TypeScript. Use for Vue component mechanics in components, framework pages, and layouts, including public contracts, template logic, lifecycle handling, and CSS Module bindings. Use other skills for framework-specific APIs and framework-independent interface work.
license: Unlicense
---

# Vue component conventions

Target Vue 3.5+ SFCs and composables, including framework pages and layouts. Follow explicit project instructions and enforced lint rules when they differ from this skill. Use nearby code for details that instructions leave open.

Apply web interface conventions to framework-independent HTML, CSS, accessibility, content, and user behavior when available.

## First pass

- Before editing, inspect the target SFC or composable, relevant callers or children, and a similar nearby file when available.
- Decide whether the change belongs in an SFC, composable, route, store, or test. Keep this skill focused on Vue mechanics in SFCs and composables.
- Identify which props the script needs and which rendering values can be prepared before rendering.
- Preserve public props, defaults, emits, models, slots, and Vue-specific styling hooks unless the task requires changing them.
- Reuse existing local composables and matching Vue component APIs before adding a new Vue abstraction.
- Use direct template markup for a small, fixed set of elements. Use data-driven rendering for dynamic or repeated structures.

## Single-file component shape

- Use `<template>`, `<script>`, and `<style>` in that order unless project instructions require another order. Match local block attributes and indentation.
- Use `<script setup lang="ts">` for component logic.
- Put exported types needed by other files in a separate non-setup `<script lang="ts">` block above the setup block.
- In setup code, put imports first, then component-only types, `Props`, and `Emits`. Follow with props and emits macros, then models. Group reactive state, composables, and computed values before lifecycle hooks and functions.

## Imports and TypeScript

- Prefer explicit imports for Vue APIs unless the repository intentionally uses auto-imports.
- Import Vue APIs such as `ref`, `computed`, `watch`, `onMounted`, and `useTemplateRef` from `vue` when explicit imports are used.
- Import VueUse helpers from `@vueuse/core` only when the project already uses VueUse or has it installed.
- Follow the path aliases and import ordering already used by the owning feature.
- For typed helpers, object shaping, guards, and non-component TypeScript, use the local TypeScript conventions or a TypeScript skill if one is available.

## Props

- Use a named `Props` interface or type for non-trivial prop sets.
- Do not add `readonly` to prop interface fields unless project instructions require it.
- Prefer type-based `defineProps<Props>()` for TypeScript components.
- When props are used only in the template and need no custom defaults, call `defineProps<Props>()` without assigning its result.
- When script code needs individual props or custom defaults, destructure directly from `defineProps()`. Bind only fields used in script or given a default. Resolve local name collisions without losing reactivity.
- Keep the whole `props` object when an existing API needs that object or its dynamic keys.
- In templates, access the component's declared props by name. Objects supplied by scoped slots keep their own API.
- Set custom defaults in reactive props destructuring. Use direct array and object values for these defaults. Preserve runtime prop declarations when an existing whole-object API or validation contract requires them.
- Use Vue's implicit `false` for absent Boolean props. Keep an explicit default when it changes required behavior, including how an explicit `undefined` is handled.
- When a watcher or composable must track a destructured prop, pass a getter or another reactive source accepted by that API. Passing its current value loses future updates. Keep the callee's input contract intact.

## Composables

- Extract a composable only for reusable behavior, real stateful logic, or a component that is becoming hard to scan. Keep one-off code inline.
- Name composables in camelCase starting with `use`.
- Keep markup, slots, and styling in the component. Put reusable state, derived values, event handling, effects, or DOM coordination in the composable.
- Return a plain object containing refs, computed refs, and functions so destructuring in components stays reactive.
- Accept plain values, refs, or getters only when callers need that flexibility. Normalize them with `toValue()`.
- Prefer passing named options objects when a composable takes more than one or two inputs.
- If a composable owns side effects such as event listeners, observers, timers, or subscriptions, it must also own cleanup with Vue lifecycle hooks or the cleanup API provided by the helper it uses.
- Keep composable return names concrete. Prefer `isPanelOpen`, `selectedId`, `openPanel`, and `closePanel` over vague names such as `state`, `data`, or `handler`.

## Emits and models

- For every new or changed `defineEmits()`, declare a named `Emits` type or interface and use `defineEmits<Emits>()`, even for one event. Leave unrelated legacy declarations alone.
- Use a union call signature when events share one simple shape. Use an interface with named tuples when their payloads differ.
- Use `defineModel()` for actual two-way `v-model` contracts, including named models. Keep props for one-way data.
- Use `defineEmits()` for regular events such as `submit`, `cancel`, or analytics notifications.
- When setting a `defineModel()` default, keep the parent and child values in sync. An undefined parent value can otherwise differ from the child default.

## Template logic

- Put component-wide derived rendering values in named computed values or prepared view-model fields. This includes comparisons, combined conditions, collection checks, formatting, and derived class state.
- When the component owns a list and its rows need derived display values, prepare those fields in a computed view model. Reuse existing display fields before adding more.
- When required data is available only in a scoped slot or another template-local binding, use a small named, side-effect-free helper with that data as arguments. Keep the existing component structure and slot API when the helper alone handles the rendering logic.
- Check that changing inputs are reactive before caching a rendering value in `computed`. Properties of `useSlots()` and `useAttrs()` are not reactive dependencies. Check slot presence during rendering: keep a direct presence check inline or use a named pure helper for a combined condition.
- Keep direct bindings, simple flags, `v-for` and slot syntax, and class objects that bind ready state inline.
- Keep simple translation calls with literal keys and direct arguments in the template when used only there. Prepare derived arguments and decisions that choose copy in script, following the project's translation rules.
- Keep `v-model`, direct event-handler calls, and event forwarding in the template. Put state assignments and multi-step event logic in named handlers.
- Use full, readable names for props, state, classes, and variants. Keep names defined by an existing design-token API.

## Template refs and browser APIs

- Use `useTemplateRef('name')` for static refs. Let it infer the type; add a generic only when typecheck shows that inference is missing or too broad.
- Use `useId()` instead of hard-coded IDs for component-internal element relationships such as `for`, `form`, `list`, `popovertarget`, and ARIA references. Bind the generated ID to the target `id` and each reference so component instances remain unique and SSR hydration stays stable.
- Do not access `document`, `window`, `navigator`, or element refs during setup in SSR/test-sensitive code.
- Prefer lifecycle-safe composables for DOM work. Use VueUse helpers when the project already uses VueUse.
- For newly standardized HTML elements, verify that Vue treats the tag as native during SSR and hydration. If Vue resolves it as a component, configure `compilerOptions.isCustomElement` and cover hydration or unresolved-component warnings in the browser console; typecheck and DOM assertions are insufficient.

## Styling

- Use `<style module>`.
- Use `.component` as the root class for every styled component.

### CSS modules class bindings

- Bind one `$style.*` structural class per styled template element directly in the template. Keep independent structural classes in CSS Modules.
- For temporary visual state owned by the component, add a literal global state class. Match it on the same element under its structural class with `&:global(...)`.
- Keep semantic attributes, test hooks, and state attributes supplied by UI libraries. Check existing consumers before changing an attribute or selector.
- Use `$style` directly for simple template class bindings. Use `useCssModule()` when script code needs compiled module class names, such as a render callback or table column configuration.
- Preserve existing styling APIs. When designing a component API for callers to style rendered markup, expose a slot.

## Component boundaries

- Apply this skill to the Vue template, script, and CSS Module mechanics of `.vue` Nuxt pages and layouts. Use a Nuxt-specific skill or local Nuxt conventions for plugins, middleware, Nitro handlers, routing, `useFetch`, `useAsyncData`, `$fetch`, and runtime config.
- For Pinia state shape, async store actions, store HMR, or cross-store dependencies, use a Pinia/store-specific skill when available.
- For unit/component tests, use the repository's test conventions or a unit-testing skill if one is available.
- For E2E/browser flows, use the repository's E2E conventions or an E2E/browser skill if one is available.

## Final pass

1. List every SFC and composable changed by the task, including new files, pages, and layouts. Review each complete template and the affected script and style contracts.
2. Check props use and defaults, reactive sources, named `Emits`, models, prepared rendering values, slot checks, event handlers, template refs, and CSS Module bindings. Inspect declarations and template expressions in context, including script access and slot-provided objects.
3. Run the project checks. When a refactor affects reactive inputs or conditional slots, verify updates after mounting, including parent prop replacement and slot appearance or removal as applicable.
4. Fix confirmed violations within the task scope. Report any unresolved violation or behavior that could not be checked.
