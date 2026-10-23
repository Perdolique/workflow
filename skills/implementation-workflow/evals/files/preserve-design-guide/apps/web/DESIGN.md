# Reel design specification

## Reference images and priority

Inspect the [dark desktop home](designs/dark/desktop/home.svg) and [light mobile home](designs/light/mobile/home.svg) references before relevant UI work. These synthetic schematics describe composition; they are not production artwork. This fixture includes these two references only.

Accessibility and delivered behavior come first, then reference images, this written guide, and existing components. Update conflicting written visual rules to match the images. Omit controls for features that are not implemented.

## Responsive layout

| Mode | Width | Navigation and layout |
| --- | --- | --- |
| Mobile | Below `40rem` | One column, at least `16px` gutters, compact top bar and four-item bottom navigation; horizontal poster scrolling |
| Tablet | `40rem` to below `64rem` | `80px` navigation rail; use a second column only when it stays at least `240px` wide |
| Desktop | `64rem` and above | `224px` labeled sidebar, readable main column, optional `320px` secondary rail |

Keep safe-area space below fixed navigation. Auth pages omit authenticated navigation. Focused import pages hide mobile account and bottom bars. Home puts the featured title first, then trending titles and upcoming releases.

## Tokens and themes

Components use semantic CSS tokens rather than raw colors.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-canvas` | `#F7F7F4` | `#0B0D12` |
| `--color-surface` | `#FFFFFF` | `#151922` |
| `--color-text-primary` | `#15171A` | `#F7F8F4` |
| `--color-accent` | `#667F00` | `#D7FF55` |
| `--color-focus` | `#667F00` | `#D7FF55` |

Define paired colors with `light-dark()` in one token layer. Support light, dark, and system preferences with `color-scheme`. Persist explicit preference in a cookie so SSR paints the correct theme before hydration. Theme changes keep the same information and interactions. Do not recolor posters.

## Typography and components

Use Inter with system sans-serif fallback: body `16/24px`, metadata `14/20px`, and headings `28/32px` on mobile or `36/42px` on larger screens. Use sentence case, a `4px` spacing unit, and `18px` card radius.

Primary actions use lime fill and dark text; destructive actions use danger styling. Use one primary action per local decision. Inputs keep visible accessible labels and place validation text beside the field. A selected toggle keeps its label and adds a non-color state cue.

Data components need loading, loaded, empty, retryable error, and permission-limited states. Skeletons preserve geometry. A failed optimistic action restores the previous value and shows an error. Poster cards keep a stable `2:3` box with a placeholder for missing artwork.

## Accessibility and verification

Keep semantic controls, keyboard access, text contrast of at least `4.5:1`, visible `2px` focus with `2px` offset, and preferably `44px` targets. Mark active navigation with `aria-current="page"`. Dialogs restore focus after closing. Do not convey state by color alone and respect reduced motion.

Check both themes, all three responsive modes, long titles, keyboard navigation, and 200% zoom. Use focused semantic and geometry checks rather than pixel snapshots of the generated references. Markdown changes use `vp run lint:markdown`.
