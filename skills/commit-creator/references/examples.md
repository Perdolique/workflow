# Commit Message Examples

For commits created by an AI agent or automated coding tool, append the active tool's real `Co-authored-by` trailer after the message body or other trailers. Do not copy placeholder values literally, and do not attribute a commit to a different agent.

## Simple Feature

```text
feat(button): add loading state

- ✨ Add spinner icon during async operations
- 📦 @ui/icons: v1.0.0 → v1.1.0
- Fixes #42

Co-authored-by: <current-agent-name> <current-agent-email>
```

## Bug Fix

```text
fix(text-input): prevent double focus events

- 🐛 Debounce focus handler to avoid duplicate calls
- ⚡ Improves performance by reducing event handler calls
- Fixes #156
```

## Accessibility Improvement

```text
feat(collapsible): add aria-expanded attribute

- ♿ Improve screen reader support for collapsed state
- 🎯 Fixes accessibility issue where panel state wasn't announced
- Fixes #234
```

## Documentation

```text
docs(readme): update installation instructions

- 📚 Add npm install command
- 📝 Include prerequisites section
```

## Multi-Package Updates (Monorepo)

```text
feat(all): upgrade to React 19

- ⬆️ Update React dependencies across all packages
- 📦 react: v18.2.0 → v19.0.0
- 📦 react-dom: v18.2.0 → v19.0.0
- ✅ Update all component tests for new API
```

## Refactoring

```text
refactor(auth): extract token validation logic

- ♻️ Move validation to separate utility module
- 🎯 Improve code reusability across services
- 🧪 Add unit tests for extracted logic
```

## Performance Improvement

```text
perf(table): optimize rendering for large datasets

- ⚡ Implement virtual scrolling
- 📊 Reduces initial render time by 60%
- 🎯 Handles 10k+ rows without lag
```

## Breaking Change with Migration Guide

```text
feat(api)!: redesign authentication flow

- ✨ Replace session-based auth with JWT tokens
- 🔐 Improve security with refresh token rotation
- 📦 @auth/core: v2.5.0 → v3.0.0

BREAKING CHANGE: Authentication now requires JWT tokens instead of session cookies.
Migrate by updating login flow to use /api/auth/token endpoint.
```

## Build Configuration

```text
build(webpack): add code splitting for routes

- 🔧 Configure dynamic imports for route components
- 📦 Reduces initial bundle size by 40%
- ⚡ Improves page load performance
```

## CI/CD

```text
ci(github): add automated release workflow

- 👷 Create release on version tag push
- 📦 Publish packages to npm automatically
- 📝 Generate changelog from commits
```

## Chore (Maintenance)

```text
chore(deps): update development dependencies

- 🔨 Update eslint to v9.0.0
- 📦 prettier: v2.8.0 → v3.0.0
- 🔧 Update lint configurations for new versions
```

## Multiple Issues Fixed

```text
fix(form): resolve validation edge cases

- 🐛 Handle empty array fields correctly
- 🐛 Fix date validation for leap years
- ✅ Add test coverage for edge cases
- Fixes #123
- Fixes #145
- Fixes #167
```

## WIP Commit (Development Only)

```text
chore(feature-x): WIP implementing new dashboard

- 🚧 Add basic layout structure
- 🚧 Placeholder components for charts
- Note: Not ready for production
```
