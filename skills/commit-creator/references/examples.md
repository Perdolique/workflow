# Commit message examples

Use only facts supported by the actual diff and task context.

## Feature

```text
feat(button): add loading state

- ✨ Show a spinner while the action is pending
- ✅ Cover disabled and pending interactions
- Fixes #42
```

## Bug fix

```text
fix(text-input): prevent duplicate focus events

- 🐛 Ignore repeated focus notifications from the same interaction
- ✅ Cover keyboard and pointer focus paths
```

## Dependency update

```text
chore(deps): update test packages

- 📦 vitest: 4.1.9 -> 4.1.10
- 📦 @vitest/ui: 4.1.9 -> 4.1.10
- 🔨 Refresh the lockfile
```

## Breaking change

```text
feat(theme)!: rename color tokens

- ✨ Replace legacy token names in the public theme API
- 📚 Document the required token migration

BREAKING CHANGE: Consumers must replace the removed legacy token names.
```

## Documentation

```text
docs(readme): clarify installation

- 📚 Add the supported package-manager command
- 📝 Document the required runtime version
```
