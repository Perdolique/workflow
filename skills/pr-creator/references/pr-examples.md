# PR description examples

These examples demonstrate tone and structure only. Replace every claim with facts supported by the actual branch and task context.

## Focused bug fix

```markdown
## Summary

Stops duplicate focus events without disturbing normal keyboard behavior 🐛⌨️ The fix stays narrow and keeps the existing component API intact 😎👍

- 🐛 Ignore repeated notifications from the same focus interaction
- ♿ Preserve keyboard and pointer focus behavior
- ✅ Cover the reproduced duplicate-event scenario

## Motivation

The existing regression test reproduces two events for one focus interaction. This change restores the documented single-event contract 🎯

## Related issues

Fixes #156
```

## Dependency update

```markdown
## Summary

Keeps the test toolchain on one compatible patch release 📦🧪 No mystery bumps hiding in the lockfile 😎

- 📦 Update the affected package manifests
- 🔧 Refresh the lockfile for the selected versions

## Dependency updates

- `vitest`: 4.1.9 -> 4.1.10
- `@vitest/ui`: 4.1.9 -> 4.1.10
```

## Breaking change

```markdown
## Summary

Renames the public theme tokens and removes the legacy aliases 🎨⚠️ The new names now match the documented semantic palette across the package 💪

- ✨ Expose the new token names from the public theme API
- 🗑️ Remove the legacy aliases
- 📚 Update consumer examples to the new names

## Breaking changes

Consumers using the removed token names must update before upgrading.

## Migration

Replace each removed legacy token with its documented semantic equivalent 🧭
```
