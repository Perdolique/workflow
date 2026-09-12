# Design sources

## Establish the direction

- Treat explicit user requirements and approved task references as the source of truth for visible product decisions.
- Inspect nearby pages, shared layouts, components, copy patterns, and localization before creating a new pattern.
- Surface a concrete conflict when a requested or referenced design would break confirmed behavior or accessibility.
- When sources conflict, explain the concrete conflict and resolve it before implementing the affected choice.
- Separate confirmed requirements from missing decisions. Record and resolve a missing decision before it affects the implementation.

## Reuse the project language

- Reuse an existing component or layout when its behavior and visual role match the task.
- Keep one-off structure local. Add a shared primitive when several real consumers need the same behavior.
- Preserve the project's existing ownership of shared page shells and layouts.

## Control copy and assets

- Do not add product names, marketing text, catchphrases, decorative elements, or substitute assets unless an approved source supports them.
- Do not replace a missing image or illustration with invented decoration. Use an approved fallback or ask for the missing decision.
- Give informative images meaningful alternative text. Give decorative images empty alternative text and hide other purely decorative elements from assistive technology.
- Confirm that the final image, illustration, or icon content renders. An empty wrapper is not a valid asset fallback.
- Keep operational copy that tells the user what happened, what to do next, or how to recover.
- Use the project's content and localization system.
