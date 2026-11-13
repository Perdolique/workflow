---
name: markdownlint
description: Configure, manage, and troubleshoot markdownlint in projects. Use when the user wants to set up, install, or configure markdownlint, add/remove/modify linting rules, fix markdown validation issues, customize .markdownlint.yaml, update ignore patterns, integrate with tools (Husky, CI), or troubleshoot markdown linting errors. Use even when the user mentions markdown formatting problems, quality issues, or style consistency without explicitly saying "markdownlint".
license: Unlicense
---

# Markdownlint

## Working approach

- Use the requested scope and existing project rules, config format, ignore patterns, and scripts. Fix authorized violations under that policy. Change rules or exclusions when requested or required by settled project conventions. Ask only about decisions that remain open.
- Before package operations, identify the package manager from `packageManager`, lockfiles (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, `bun.lock`, or `bun.lockb`), and project instructions. Ask if the choice remains unclear and is needed for the work.
- Package commands below use `pnpm` as an example; adapt them to the project's package manager. Prefer existing scripts. Use `vpx` for direct package CLI commands.

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

## New configuration default

When no project config or style requirement exists, create `.markdownlint.yaml` with the standard rules and disable `line-length`. Editors and viewers handle wrapping.

```yaml
$schema: ./node_modules/markdownlint/schema/markdownlint-config-schema.json

line-length: false
```
