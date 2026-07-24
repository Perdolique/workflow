---
name: pr-creator
description: Create or update GitHub pull requests from complete branch changes, or generate copyable PR content in chat. Use for requests to create, open, submit, show, draft, or write a PR or merge request.
license: Unlicense
---

# GitHub pull requests

## Core contract

Write every PR title, description, and comment in English.

Use only facts supported by the branch diff, commits, issue context, or the user's request. Do not invent motivation, user demand, metrics, verification, issue references, or future plans.

Use this sentence as the style reference:

> Это сообщество для ровных пацанчиков😎👍, которые любят попыхать кальджубасик🌬 на двойном яблочке 🍎🍏, разбираются в забивочках💨, не жалуют вейперов🤣 и уважают своих кралечек 👩‍🦳🙏.

Match its relaxed slang, rhythm, playful confidence, and emoji frequency without copying its subject matter into the PR. Before drafting, read [references/pr-examples.md](references/pr-examples.md) for concise PR-specific examples.

## Determine the action

- Create or update the PR on GitHub when the user says to create, open, make, or submit it.
- Output copyable content in chat when the user asks to show, draft, generate, or send the PR text to chat.
- If the request is genuinely ambiguous, output the content in chat instead of causing an external change.

## Prepare the branch

Inspect the repository state first:

```bash
git status --short --branch
git fetch origin --prune
git branch --show-current
git symbolic-ref --quiet --short refs/remotes/origin/HEAD
```

Use `git remote show origin` only when `origin/HEAD` is unavailable.

Then:

1. If relevant changes are uncommitted and the user asked to create the PR, use the `commit-creator` skill to commit them before continuing.
2. Stop if the current branch is the base branch.
3. Check whether the current branch already has an open PR. Update that PR instead of creating a duplicate.
4. For GitHub creation, ensure the branch has an upstream and push its current commits when needed.

Use the remote-tracking default branch as the base. A local `main` or `master` can be stale even after fetching.

## Analyze the complete changeset

Review the entire branch, not only the last commit or the current conversation:

```bash
git diff --name-status <base-ref>...HEAD
git diff <base-ref>...HEAD
git log --oneline <base-ref>..HEAD
```

Read every changed file needed to understand the cumulative behavior. Identify affected packages, dependency versions, breaking changes, migration needs, and supported issue references.

If the branch has no changes from the base, stop and report that a PR cannot be created. For text-only requests involving uncommitted work, clearly distinguish working-tree changes from changes already present in the branch.

## Draft the content

### Title

- Use 50 characters or fewer.
- Use imperative mood.
- Reflect the main purpose of the complete changeset.
- Use a conventional scope for a monorepo when it adds clarity.
- Do not add issue numbers, agent names, or tool prefixes.

### Description

Always include `Summary` with a short, engaging introduction and concrete bullets. Use emojis in the introduction and most bullets, but keep technical claims precise.

Add only sections with evidence-backed content:

- `Motivation`
- `Related issues`
- `Breaking changes`
- `Migration`
- `Performance impact`
- `Dependency updates`

Omit empty sections and placeholders such as `None` or `N/A`. Do not add other headings unless the user explicitly requests them.

Apply these rules once:

- Never add a testing-only section such as `Testing`, `Tests`, `Validation`, `Verification`, `Local verification`, or `QA`.
- Do not list local test, lint, or check commands unless the user explicitly asks for them in the PR body.
- Mention test or verification code changes as normal `Summary` bullets.
- Include issue references only when they are present in the task or repository context.
- For dependency changes, list every package separately as `package-name: old-version -> new-version`.
- For breaking changes, explain the impact and include concrete migration steps when they are known.

## Deliver the PR

### Create or update on GitHub

1. Get the authenticated GitHub login.
2. Create new PRs as drafts unless the user explicitly requests a ready PR.
3. Set the authenticated user as the assignee. If creation cannot set the assignee, update the PR immediately afterward.
4. Add reviewers only when the user explicitly requests them. An assignee is not a reviewer.
5. When updating an existing PR, preserve unrelated metadata and its current draft state unless the user requests a change.
6. Report the PR URL, draft or ready state, and assignee after the operation succeeds.

If authentication or the creation API fails, say that the PR was not created and fall back to copyable content in chat.

### Output in chat

Wrap the title and full description in one markdown code block so the formatting can be copied without changes:

````markdown
[PR title]

[PR description]
````
