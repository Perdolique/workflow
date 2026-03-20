---
name: commit-creator
description: Generate semantic commit messages following conventional commits format. Use when committing code, staging changes, writing commit messages, requesting git commit, or when user mentions commit, commit message, conventional commits, semantic commits, git commit, stage changes, create commit. Supports monorepo package version tracking.
license: Unlicense
---

# Code Committing

## Format

### Language Requirement

Always write in English only

```text
<type>(<scope>): summary
```

- **Summary**: ≤50 chars, imperative mood, no period
- **Scope**: Module/package name (monorepo: exact package name or `all`)
- **Body** (optional): Bullet list `- {emoji} {text}` (≤100 chars/line). One bullet = one logical change. Do not group multiple items on a single line.
- **Breaking**: Add `!` after type and `BREAKING CHANGE:` footer
- **Issues**: End the body with a bullet like `- Fixes #123` or `- Fixes PROJ-456`
- **No co-authorship**: Never add `Co-authored-by:`, `Co-Authored-By:`, or any attribution to Copilot, AI assistants, or automated tools at the end of commit messages

### Dependency update details

When the commit includes dependency or package version updates, spell out every updated package in the body.

- Use one bullet per updated package
- Include both old and new version for each package
- Use the format `- 📦 package-name: old-version -> new-version`
- Never collapse multiple updates into vague text like `updated dependencies` or `bump packages`
- If several packages changed, list all of them separately

**Types**: feat ✨, fix 🐛, docs 📚, style 💄, refactor ♻️, perf ⚡, test ✅, build 🔧, ci 👷, chore 🔨, revert ⏪

## Workflow

### Branch check

Before committing, check the current branch:

```bash
git branch --show-current
git remote show origin | grep "HEAD branch"
```

**If the current branch is the default branch** (e.g. `master`, `main`) **and the user has not explicitly indicated they want to commit to it**, ask the user:

- Create a new branch and commit there
- Commit directly to the current (default) branch

Wait for user's answer before proceeding.

**If the user explicitly stated the target branch in their request** (e.g. "commit to master", "commit here"), skip the question and proceed.

### Staging behavior

When both staged and unstaged changes exist in the working directory, and interaction is available:

- Ask the user whether to:
  - Stage all files before committing
  - Commit only the currently staged changes

### Running git commit

After executing `git commit`, **wait for the process to exit on its own** — do not interrupt or kill it. Pre-commit hooks (linters, type checkers, test runners) can run for a long time without producing any output. Killing the process mid-run causes an exit code 130 (SIGINT) and leaves the working tree in a dirty state.

### Commit error handling

**Exit code 130 (interrupted):**

The commit process was interrupted — this is not a validation failure. Do **not** auto-retry. Report that the commit was interrupted and ask the user whether to:

- Try again
- Cancel

**Any other non-zero exit code (validation failure):**

If the commit fails (e.g., due to pre-commit hooks, linting failures, or other validation errors):

- Report the exact error message and reasons for the failure
- Ask the user whether to:
  - Commit with `--no-verify` flag to bypass hooks
  - Attempt to fix the issues automatically
  - Let the user fix the issues manually

## Examples

**Simple feature:**

```text
feat(button): add loading state

- ✨ Add spinner icon during async operations
- 📦 @ui/icons: v1.0.0 → v1.1.0
- Fixes #42
```

**Breaking change:**

```text
feat(theme)!: redesign color tokens

- ✨ Replace RGB values with HSL format
- 💄 Update all component styles to use new tokens
- 📦 @ui/theme: v2.1.0 → v3.0.0

BREAKING CHANGE: Color token values changed from RGB to HSL format
```

For more examples, see [references/examples.md](references/examples.md)
