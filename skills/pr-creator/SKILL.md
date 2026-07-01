---
name: pr-creator
description: Create GitHub pull requests from code changes via API or generate PR content in chat. Use when user wants to create/open/submit PR, mentions pull request/PR/merge request/code review, or asks to show/generate/display/output PR content in chat (give me PR, PR to chat, send PR to chat, etc).
license: Unlicense
---

# GitHub Pull Request

## Language Requirement

**CRITICAL**: Always write **all** PR content (title, description, comments) in **English only**, regardless of the conversation language or user's preferred language. This is a strict, non-negotiable requirement that applies in all modes.

## Writing Style

**Style Reference:**

- Always write using a similar style as this example: "This is a community for chill dudes😎👍 who love to puff on a hookah🌬 with double apple🍎🍏, know their way around bowl packs💨, aren't fans of vapers🤣, and respect their ladies👩‍🥳🙏."
- Use emojis as frequently as shown in the example
- Do not include the example message itself in PR descriptions, just use it as a style reference

Before drafting the PR description, read [references/pr-examples.md](references/pr-examples.md) and follow the `Engaging (do this)` examples.

**Style completeness rule:** Dry changelog notes are invalid PR descriptions. Avoid terse lines like `Modified validation logic`, `Updated tests`, or `Fixed edge case` unless they are expanded with concrete context and the requested expressive style.

Before creating the PR or outputting PR content, verify that the description:

- Uses the same energetic, emoji-heavy tone as the engaging examples
- Includes concrete context instead of bare action notes
- Uses emojis in the summary paragraph and most bullets
- Does not copy text from any example verbatim

## Hard PR body rules

Never add a testing-only section to PR descriptions.

Forbidden section names include:

- `Testing`
- `Tests`
- `Testing Notes`
- `Validation`
- `Verification`
- `Local Verification`
- `QA`

If tests, checks, or verification changes are part of the branch, mention them as normal branch-change bullets inside `Summary`.

If local commands were run, do not list those commands in the PR body unless the user explicitly asks for that exact content.

## Determine Mode of Operation

Identify which mode to use based on user's request:

### Mode 1: Generate PR Content in Chat

Use when user wants to see/copy PR content WITHOUT creating it on GitHub:

- Explicit requests: "show PR", "generate PR", "output PR", "give me PR", "PR to chat", "send to chat"
- Key indicators: Words like "show", "display", "output", "give", "send to chat" without "create"/"open"
- When unclear: If ambiguous (no existing PR, no clear "create" intent), default to this mode

### Mode 2: Create PR on GitHub

Use when user wants to actually create PR:

- Explicit creation: "create PR", "open PR", "make PR", "submit PR"
- Clear action: User clearly wants to create/open PR on GitHub

**Default for ambiguous requests**: Use Mode 1 (generate in chat) to show user what will be created first.

## Workflow for Creating Pull Requests

Follow this workflow systematically when creating PRs:

### Step 1: Determine the Scenario

**Which scenario applies?**

- **Scenario A: Creating PR for existing branch with commits**
  - Branch exists with commits that differ from base branch
  - Need to analyze ALL commits in the branch
  - → Use git diff/log or branch comparison tools

- **Scenario B: User has uncommitted/unstaged local changes**
  - Changes not yet committed
  - User wants to commit and create PR
  - → First help commit changes, then proceed with Scenario A

Most PR requests are Scenario A — analyzing an existing feature branch.

### Step 2: Identify Current Branch and Base Branch

First, determine what branch you're working with:

```bash
# Refresh remote refs first so the base comparison uses the latest remote state
git fetch origin --prune

# Get current branch name
git branch --show-current

# Identify the remote default branch ref (preferred)
git symbolic-ref --quiet --short refs/remotes/origin/HEAD

# Fallback: identify the remote default branch name if origin/HEAD is unavailable
git remote show origin | grep "HEAD branch"
```

Use the **remote-tracking base ref** for comparisons whenever possible (for example `origin/main`, not local `main`). `git fetch` updates remote refs, but it does **not** move your local default branch, so comparing against local `main`/`master` can miss changes or produce stale diffs.

Common base refs: `origin/master`, `origin/main`, `origin/develop`

### Step 3: Get Complete Branch Changes

Analyze all changes in the entire branch that will be merged, not just:

- ❌ The last commit
- ❌ Previous chat context
- ❌ Individual file changes mentioned earlier

**What you need to obtain:**

- Complete diff between current branch and base branch
- List of all modified files
- Full context of what changed

**How to get this information:**

**Primary approach - Git commands (universal):**

```bash
# Get full diff between branches using the remote-tracking base ref
git diff <base-ref>...<current-branch>

# Example:
git diff origin/main...feature-branch

# List changed files only:
git diff --name-status origin/main...feature-branch
```

`<base-ref>` should usually be the remote default branch ref you discovered in Step 2, such as `origin/main`.

**Alternative - Use available tools in your environment:**

Depending on your environment, you may have access to:

- IDE diff viewers or change tracking features
- Version control UI showing branch comparisons
- File comparison tools
- Any method that shows complete changeset between branches

The key is obtaining the **complete changeset**, regardless of the method.

**For uncommitted changes:**
If changes are not yet committed, first check what's uncommitted using:

- `git status` and `git diff` (for git environments)
- Your IDE's change tracker or source control panel
- Any tool showing unstaged/uncommitted modifications

**Troubleshooting "No Changes" Issue:**

If you get empty diff or "no changes":

1. ✅ Verify you're comparing the current branch against the correct **remote** base ref (`origin/main`, not stale local `main`)
2. ✅ Refresh remote refs again if needed: `git fetch origin --prune`
3. ✅ Check if current branch IS the base branch (can't PR main to main!)
4. ✅ Ensure commits exist in branch: `git log --oneline -10`
5. ✅ Try: `git log <base-ref>..<current-branch>` to see commits
6. ❌ If truly no changes, inform user PR cannot be created without changes

### Step 4: Analyze Changes Comprehensively

1. Review **every modified file** in the branch
2. Understand the **cumulative impact** of all commits
3. Identify **affected packages/modules** (important for monorepos)
4. Note any **breaking changes** or **migration requirements**

### Step 5: Generate PR Content

**LANGUAGE**: Write all content in English only — title, description, every line.

Based on complete analysis, create:

- Title that reflects the **main purpose** of ALL changes
- Summary listing **all significant modifications**
- Optional sections only from the allowed PR description section list below
- Related issues only when actual issue references are present

Testing-only sections are never supported, even when test commands were actually run.

This workflow ensures PR descriptions accurately reflect the **total scope** of changes being merged.

### Step 6: Create PR or Output to Chat

**If Mode 2 (Create PR on GitHub) - Default action:**

1. Get the current authenticated GitHub user login using available tools to retrieve the current authenticated user
2. Create the PR as a **draft by default** unless the user explicitly asked for a ready-for-review PR, a non-draft PR, or otherwise made it clear that the PR should be immediately reviewable
3. If the PR creation tool supports a draft flag or parameter, set it explicitly during creation instead of relying on implicit defaults
4. If the available PR creation tool cannot create a draft PR directly, prefer another available GitHub tool or workflow that can preserve the draft default before falling back to a non-draft PR
5. Assign the current authenticated user as an `assignee`
6. If the PR creation tool cannot set `assignees` during creation, immediately update the created PR with an issue or PR update tool that supports `assignees`
7. Never add the current authenticated user as a `reviewer` unless the user explicitly asked for reviewers or named specific reviewer logins. `reviewers` and `assignees` are different GitHub concepts and are not interchangeable.
8. After successful creation, provide user with the PR URL, mention whether it was created as draft or ready for review, and mention the assignee when one was added

Before creating or updating the PR, check the PR body:

- It has no `Testing`, `Tests`, `Testing Notes`, `Validation`, `Verification`, `Local Verification`, `QA`, or similarly named testing-only section.
- It does not list local test/lint/check commands unless the user explicitly asked for that exact content.
- Test and verification changes, if relevant, are summarized as normal branch changes inside `Summary`.

**If Mode 1 (Generate in Chat) - Fallback:**

Output the PR content in chat using the format described in "Fallback: Output Format for Chat" section.

**Skip GitHub creation if:**

- User explicitly requested text output only (Mode 1)
- Authentication/API errors occur (then fallback to Mode 1)
- Request is ambiguous (then fallback to Mode 1 to show user what will be created)

## Fallback: Output Format for Chat

**Use this format when in Mode 1 (Generate PR Content in Chat):**

- User explicitly requests viewing/copying PR content (see "Determine Mode of Operation" section above)
- Cannot create PR due to API/authentication issues
- Request is ambiguous (no clear "create" intent)
- User specifically asks not to create the PR yet

When outputting PR content to chat instead of creating it on GitHub:

Wrap the complete PR content in a markdown code block:

````markdown
[PR Title Here]

[Full PR Description Here]
````

This allows user to easily copy the entire PR content with proper formatting preserved.

Output PR content in a code block, not as rendered markdown.

## PR Title

- ≤50 characters, imperative mood ("Add feature" not "Added" or "Adds")
- Accurately reflect main purpose of changes
- Never prefix titles with `[codex]`, `Codex:`, agent names, or other tool markers unless the user explicitly asks for that exact prefix.
- No issue numbers in title (use description)
- For monorepos, consider a scoped title (e.g., `feat(scope): description`)

**Examples:**

- Add dark mode support to theme package
- Fix input validation in text field component
- Refactor build configuration for better performance

## PR Description

**Section inclusion rules:**

- Always include `Summary` with concrete changes. If you cannot identify at least one substantive change, stop and report that PR content cannot be generated from the available changes.
- Only use these optional sections when they have concrete content: `Motivation`, `Related Issues`, `Breaking Changes`, `Performance Impact`, and `Dependency updates`.
- Include `Motivation` only when the reason is supported by issue context, commit messages, user context, or a directly observable project need. Do not invent motivation.
- Include `Related Issues` only when actual issue numbers, URLs, or user-provided issue references exist.
- Include `Breaking Changes` only when the branch changes public behavior, APIs, configuration, or data formats that require migration.
- Include `Performance Impact` only when performance is directly affected and you have concrete details.
- Include `Dependency updates` only when dependency or package versions changed.
- Do not create other headings unless the user explicitly asks for them.
- Omit every section that has no concrete content. Never output placeholder headings with `N/A`, `None`, `Not applicable`, `No related issues`, or similar filler.

**Forbidden sections:**

- Do not create a `Testing`, `Tests`, `Testing Notes`, `Validation`, or similarly named testing-only section.
- When tests or verification changes are part of the branch, mention them inside `Summary` as normal branch changes.
- Do not add manual testing notes to the PR body unless the user explicitly asks for that exact content, and even then include them as bullets inside `Summary` or another supported section with concrete content.

### Dependency update details

When the branch updates dependencies or package versions, make those changes explicit in the PR description.

- List every updated package separately
- Include both old and new version for each package
- Use the format `- package-name: old-version -> new-version`
- Do not replace the package list with vague summaries like `updated some dependencies`
- Keep dependency bullets in `Summary` or in a dedicated `Dependency updates` subsection when there are many of them

**Example:**

```markdown
## Summary

Adds dark mode support to the theme package:

- Added dark color palette with semantic tokens
- Updated CSS variables for theme switching
- Added theme toggle component

## Motivation

Users requested dark mode to reduce eye strain and improve accessibility.

## Related Issues

Fixes #42
```

## Edge Cases

- **Large changesets**: Group changes by component in summary
- **Updating existing PR**: Preserve metadata, add update comment
- **Breaking changes**: Mark clearly, provide migration guide
- **Monorepo**: Clearly indicate affected packages
