---
name: markdownlint
description: Configure, manage, and troubleshoot markdownlint in projects. Use when user wants to setup/install/configure markdownlint, add/remove/modify linting rules, fix markdown validation issues, customize .markdownlint.yaml, update ignore patterns, integrate with tools (Husky, CI), or troubleshoot markdown linting errors. Use even when user mentions markdown formatting problems, quality issues, or style consistency without explicitly saying "markdownlint".
license: Unlicense
---

# Markdownlint

## Package manager detection

**Before any operation**, detect which package manager the project uses:

1. Check for lock files:
   - `pnpm-lock.yaml` → use `pnpm`
   - `yarn.lock` → use `yarn`
   - `package-lock.json` → use `npm`
   - `bun.lockb` → use `bun`

2. Check `packageManager` field in package.json:

   ```json
   "packageManager": "pnpm@8.0.0"
   ```

3. If no indicators, ask the user which package manager they prefer

**Throughout this skill**, commands use `pnpm` as examples. Replace with the detected package manager:

- `pnpm add -D` → `npm install --save-dev` / `yarn add -D` / `bun add -d`
- `pnpm run` → `npm run` / `yarn run` / `bun run`
- `pnpm install` → `npm install` / `yarn install` / `bun install`

## Operation selection guide

Read the reference matching the requested work:

| Operation | Reference |
| --- | --- |
| Installation, configuration files, scripts, and verification instructions | [Setup](references/setup.md) |
| Rule names, codes, options, enabling, or disabling rules | [Rules](references/rules.md) |
| Ignored files, folders, patterns, and checking exclusions | [Ignoring](references/ignoring.md) |
| Diagnosing violations, automatic fixes, and remaining manual fixes | [Fixing](references/fixing.md) |
| Scripts, hooks, CI, and editor integration | [Integration](references/integration.md) |
| Missing files, failed hooks, installation errors, or performance problems | [Troubleshooting](references/troubleshooting.md) |

For a request spanning several operations, read the main reference first, then the related references needed to complete and verify the setup.

## Quick reference: Common commands

```bash
# Install
pnpm add -D markdownlint markdownlint-cli

# Run linting
pnpm run lint:markdown

# Auto-fix issues
vpx markdownlint '**/*.md' --fix

# Lint specific file
vpx markdownlint README.md

# Lint specific directory
vpx markdownlint 'docs/**/*.md'
```

## Quick reference: Config file basics

`.markdownlint.yaml` in project root:

```yaml
$schema: ./node_modules/markdownlint/schema/markdownlint-config-schema.json

# Disable a rule
line-length: false

# Enable a rule
no-duplicate-heading: true

# Configure a rule
heading-style:
  style: "atx"
```

`.markdownlintignore` in project root (gitignore syntax):

```gitignore
node_modules
dist/
build/
CHANGELOG.md
```

## Default configuration philosophy

When setting up markdownlint, use this opinionated default configuration:

```yaml
$schema: ./node_modules/markdownlint/schema/markdownlint-config-schema.json

line-length: false # Modern editors handle wrapping
```

Keep the standard rules enabled and disable `line-length` in this default configuration because:

- Modern editors and viewers handle text wrapping automatically
- Fixed line length creates unnecessary friction in most projects
- Semantic issues are more valuable to catch than presentation issues

Customize other rules when the user requests it or established project requirements call for it.
