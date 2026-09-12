# Semantics and accessibility

## Structure the document

- Give each page a title that identifies its current content or task. Update the document title when client-side navigation changes the page.
- Use native landmark elements to identify major page regions. Put the primary document content in `main`, and keep separate application chrome outside it.
- Keep DOM, reading, visual, and keyboard order aligned unless a different order is required and remains understandable.

## Use native meaning

- Choose HTML elements for their meaning, not their default display. Use CSS to control presentation.
- Use a button for an action and a link for navigation. Keep their behavior clear when their visual styles are similar.
- Prefer native semantics before manual ARIA roles and states.
- Use a native `dialog` when it meets the required modal or non-modal behavior. When a custom dialog is required, provide the equivalent semantics and interaction behavior.
