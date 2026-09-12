# Interaction states

## Define the changed states

- List the applicable initial, filled, hover, active, keyboard-focus, pointer-focus, selected, invalid, and disabled states.
- Include transitions that add, remove, move, or replace visible content.
- Include only states that apply to the interface contract.

## Keep the interface stable

- Do not change control dimensions when borders, outlines, labels, validation, or icons change state.
- Use `:focus-visible` for custom keyboard-focus styling. Do not replace native focus behavior with pointer-tracking JavaScript.
- Keep every interactive element keyboard accessible and give each icon-only control an accessible name.
- When a custom control is required, match the native equivalent's keyboard, focus, and ARIA behavior.
- If a transition removes the focused element, move or restore focus to a useful target.
- Make icon variants use a stable box and alignment.

## Make feedback perceivable

- Announce each important state change once. Do not expose the same error through competing live regions.
- Communicate meaning with text, shape, iconography, or accessible state in addition to color.
- Measure contrast in every changed normal, focus, disabled, error, image-background, and supported theme state. Use the project's required target or the applicable accessibility target.

## Complete dialog behavior

- Give a dialog a clear accessible name and an initial focus target.
- Support the close action and the platform's expected keyboard dismissal when cancellation is allowed.
- On close, cancel or detach work owned by the dialog and restore focus to the control that opened it.
- Keep errors and retry actions inside the dialog while it remains the active task.
