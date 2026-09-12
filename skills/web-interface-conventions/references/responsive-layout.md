# Responsive layout

## Choose the dependency

- Use media queries for page and application layouts when their available space follows the viewport or the condition depends on the device or user preference.
- Use container queries for reusable components that must adapt to the space given by a parent, independent of the viewport.
- Choose from the real layout dependency, not from DOM nesting. A nested element can still depend on the viewport, and a top-level component can still live in a constrained container.
- Set `container-type` at the nearest stable component boundary. Add `container-name` when several ancestors could own the query.
- Keep the base layout usable before conditional rules apply. Add a breakpoint when content or an approved design needs a different arrangement.

## Control size constraints

- Prefer intrinsic sizing and natural content flow before adding explicit size bounds.
- Before adding `min-width`, `max-width`, `min-height`, `max-height`, or their logical equivalents, identify the required state and the layout, content, or interaction failure that the declaration prevents.
- Use `min-inline-size: 0` or `min-block-size: 0` to resolve demonstrated intrinsic overflow, Grid or Flex shrinking, native-control overflow, or `0fr` disclosure collapse.

## Protect content

- Let content wrap or shrink according to its meaning. When a design intentionally clips content, keep that clipping at the element that owns it.
- Keep layouts usable with long realistic values and long unbroken values in fields, labels, file names, navigation, and status text when the interface can show them.
- Prevent unintended page-level horizontal scrolling at the smallest supported width. When content requires horizontal scrolling, contain it in the element that owns it and keep that region and its controls usable.
