---
name: commit-creator
description: Create English conventional commit messages and commits from the current changes. Use when the user wants to commit code, asks for a commit message, or needs monorepo scopes and dependency updates represented accurately.
license: Unlicense
---

# Commit creation

## Inspect the changes

Base the message on the repository state, not conversation memory alone:

```bash
git status --short --branch
git diff --cached
git diff
```

Identify the concrete behavior, files, packages, issue references, and version changes that belong to the requested commit. If there is no substantive change, stop instead of inventing a message.

## Choose the branch and scope

Check the current branch and, when available, the remote default branch:

```bash
git branch --show-current
git symbolic-ref --quiet --short refs/remotes/origin/HEAD
```

Use `git remote show origin` only as a fallback when `origin/HEAD` is unavailable.

If the current branch is the default branch and the user did not explicitly ask to commit there, ask whether to create a branch or commit to the default branch. If the user named the target branch or said to commit on the current branch, proceed without asking again.

Respect existing staging:

- With only staged changes, commit the staged changes.
- With only unstaged changes and no narrower scope, stage all current changes.
- With both staged and unstaged changes, ask whether to commit only the staged changes or stage everything.
- Never unstage or restage user-staged files unless explicitly asked.

## Write the message

Write the complete message in English:

```text
<type>(<scope>): summary

- {emoji} concrete change
- {emoji} concrete change
```

- Keep the summary at 50 characters or fewer, in imperative mood, without a period.
- Use the exact package or module as the scope; use `all` only for a genuinely cross-package change.
- Include at least one concrete body bullet unless the user explicitly asks for a subject-only message.
- Keep one logical change per bullet and avoid empty lines between bullets.
- Add `!` and a `BREAKING CHANGE:` footer only for an actual breaking change.
- Add issue-closing bullets only for issue references supported by the task or repository context.

Use these types:

`feat` ✨, `fix` 🐛, `docs` 📚, `style` 💄, `refactor` ♻️, `perf` ⚡, `test` ✅, `build` 🔧, `ci` 👷, `chore` 🔨, `revert` ⏪

### Dependency updates

List every changed dependency separately with its old and new version:

```text
- 📦 package-name: old-version -> new-version
```

Do not replace the list with a vague dependency-update bullet.

## Create the commit

Do not run extra project checks solely for a commit-only request. Run them when the user asks, the same task changed files and repository instructions require verification, or a failed hook needs diagnosis.

Use one `-m` for the summary and one for the complete body, or use `git commit -F-` when multiline quoting is awkward. Do not pass one `-m` per bullet because Git turns each one into a separate paragraph.

After starting `git commit`, wait for it to exit naturally. Hooks can remain silent for a long time.

Handle failures without hiding them:

- Report the exact error and offer to fix it, leave it for the user, or use `--no-verify`.
- Never bypass hooks without explicit user approval.

See [references/examples.md](references/examples.md) when an example is useful.
