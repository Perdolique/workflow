---
name: web-interface-conventions
description: Build or review framework-independent user-facing web interfaces. Use when a task changes their HTML and accessibility, CSS and responsive behavior, visual content and forms, or synchronous and asynchronous interaction states.
license: Unlicense
---

# Web interface conventions

This skill owns framework-independent interface behavior and presentation. Framework skills own framework APIs and component mechanics.

## Prepare the work

1. Inspect the task, approved design references, and the existing project UI before making visible decisions.
2. Identify the affected user journeys, states, transitions, content extremes, viewports, themes, and input methods. Cover only the variants that the task can change.
3. Read the references that match the task before making the affected decisions:
   - [design sources](references/design-sources.md) for visual direction, copy, assets, shared components, or localization;
   - [semantics and accessibility](references/semantics-and-accessibility.md) for document structure, page titles, landmarks, reading order, or native HTML meaning;
   - [styling foundations](references/styling-foundations.md) for CSS, browser support, resets, tokens, themes, selectors, or custom properties;
   - [responsive layout](references/responsive-layout.md) for page or component layout, queries, intrinsic sizing, breakpoints, or overflow;
   - [forms](references/forms.md) for fields, validation, authentication, selection, or file input;
   - [interaction states](references/interaction-states.md) for controls, focus, feedback, dialogs, icons, or visual states;
   - [async feedback](references/async-feedback.md) for network work, loading, retry, cancellation, or third-party UI.
4. Ask the user when a visible product decision remains unclear and the available sources do not settle it. Continue work that does not depend on that choice.

## Build the interface

- Follow every applicable domain reference as one interface contract. Resolve conflicts from product requirements, approved sources, browser support, and existing project conventions before implementing the affected choice.
- Treat accessibility as interface correctness, not optional polish.

## Finish the interface

- Compare the completed interface with the approved sources and the required states, transitions, content, and responsive behavior.
- Route browser interaction, rendered-output assertions, mocks, screenshots, and regression-test mechanics to the project's browser or E2E testing skill.
- Report any required product decision or user-visible result that remains unresolved.
