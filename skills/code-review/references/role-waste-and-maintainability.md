# Waste and maintainability

- Review assigned non-style dead, duplicate, temporary, or speculative code and artifacts directly.
- Look for an existing component, utility, or shared implementation that serves the same purpose. Compare its behavior and requirements with the changed code.
- Suggest reuse when it meets the new requirements. Suggest a small extension if it meets them and preserves the behavior existing callers rely on.
- The Waste specialist divides its scope into non-style code and code that contains styles. The CSS child reviews style waste.
  - Launch one child with the [readability checks](role-readability.md) for all assigned non-style code, if any.
  - Launch one child with the [CSS checks](role-css-waste.md) for all assigned styles, if any.
