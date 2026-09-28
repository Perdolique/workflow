---
name: commit-creator
description: Create or amend English conventional commits and commit messages from the current changes. Use when the user wants to commit or amend code, asks for a commit message, or needs monorepo scopes and dependency updates represented accurately.
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
git fetch origin --prune
git branch --show-current
git ls-remote --symref origin HEAD
```

- Before committing, report if the current branch is behind or diverged from its upstream or the fresh remote default; do not merge or rebase automatically.
- If the current branch is the default branch and the user did not explicitly ask to commit there, ask whether to create a branch or commit to the default branch. If the user named the target branch or said to commit on the current branch, proceed without asking again.
- When creating a branch for a known task, follow the project's naming conventions and include the tracker ID with its original case, for example `feat/gh-42-session-cache` or `fix/APP-123-token-refresh`. Include the repository or project when the ID would otherwise be ambiguous.

- Respect existing staging:

- Use an already confirmed commit scope without asking again. For disjoint task files, use a path-limited commit and add only task files that are untracked; preserve unrelated staging. Ask before committing when task and unrelated edits overlap within a file and the intended result is unclear.
- With only staged changes and no narrower scope, commit the staged changes.
- With only unstaged changes and no narrower scope, stage all current changes.
- With both staged and unstaged changes and no confirmed scope, ask whether to commit only the staged changes or stage everything.
- Never unstage or restage user-staged files unless explicitly asked.
- When a change fixes work in an existing commit, prefer amending the relevant commit. Use a new commit for separate work.

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
- Resolve the task from the request, branch name, or repository context. Reuse task requirements and diff analysis from the current session when they cover the current commit; read missing context from the correct tracker. Ask about missing task evidence or unclear completion before choosing a closing reference.
- When the commit completes a verified GitHub issue, include a closing reference in the body: `Fixes #42` in the same repository or `Fixes owner/repo#42` in another repository. Add it without asking the user to confirm the known task again.
- For a partial solution, use a normal reference such as `Refs #42`. For a task in another tracker, include its verified key and URL.

- Use these types:

- `feat` ✨, `fix` 🐛, `docs` 📚, `style` 💄, `refactor` ♻️, `perf` ⚡, `test` ✅, `build` 🔧, `ci` 👷, `chore` 🔨, `revert` ⏪

### Dependency updates

List every changed dependency separately with its old and new version:

```text
- 📦 package-name: old-version -> new-version
```

Do not replace the list with a vague dependency-update bullet.

## Create the commit

- Do not run extra project checks solely for a commit-only request. Run them when the user asks, the same task changed files and repository instructions require verification, or a failed hook needs diagnosis.
- Use one `-m` for the summary and one for the complete body, or use `git commit -F-` when multiline quoting is awkward.
- Do not pass one `-m` per bullet because Git turns each one into a separate paragraph.
- Do not set an execution timeout for `git commit`. Wait until Git and all hooks exit naturally. Git hooks can run silently for several minutes, so a timeout may terminate required checks before they finish.
- Report the exact error and offer to fix it, leave it for the user, or use `--no-verify`.
- Never bypass hooks without explicit user approval.
- See [references/examples.md](references/examples.md) when an example is useful.
