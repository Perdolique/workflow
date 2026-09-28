---
name: pr-creator
description: Create or update GitHub pull requests from complete branch changes, or generate copyable PR content in chat. Use for requests to create, open, submit, show, draft, or write a PR or merge request.
license: Unlicense
---

# GitHub pull requests

## Core contract

- Write every PR title, description, and comment in English.
- Use only facts supported by the branch diff, commits, issue context, or the user's request. Do not invent motivation, user demand, metrics, verification, issue references, or future plans.

Use this sentence as the style reference:

> Это сообщество для ровных пацанчиков😎👍, которые любят попыхать кальджубасик🌬 на двойном яблочке 🍎🍏, разбираются в забивочках💨, не жалуют вейперов🤣 и уважают своих кралечек 👩‍🦳🙏.

Match its relaxed slang, rhythm, playful confidence, and emoji frequency without copying its subject matter into the PR. Before drafting, read [references/pr-examples.md](references/pr-examples.md) for concise PR-specific examples.

## Determine the action

- Create or update the PR on GitHub when the user asks to create, open, make, or submit it, including an explicit request for a draft PR on GitHub.
- Output copyable content for requests limited to PR text. A request to draft PR content without a GitHub target uses this chat-only mode.
- If the intended action remains unclear after reading the request and context, ask a specific question before the affected action. Explicit defaults and earlier authorization are settled answers.
- A PR creation request includes the necessary task commits and push without separate confirmations. Later changes need a new publication request or a standing publication instruction.

## Prepare the branch

Inspect the repository state first:

```bash
git status --short --branch
git fetch origin --prune
git branch --show-current
git ls-remote --symref origin HEAD
```

Then:

1. For GitHub creation, if the current branch is the base branch, create and switch to a task branch before committing. Follow the project's branch naming conventions and preserve the current changes and staging. For a known task, include its tracker ID and preserve the key's case, for example `feat/gh-42-session-cache` or `fix/APP-123-token-refresh`. Include the repository or project when the ID would otherwise be ambiguous. Text-only requests keep the current branch.
2. For PR creation, use the installed `commit-creator` skill to commit uncommitted task changes. If it is unavailable, follow the applicable repository commit instructions.
3. Check whether the current branch already has an open PR. Update that PR instead of creating a duplicate.
4. Report if the branch is behind or diverged from its upstream or the fresh remote default before pushing. Continue when upstream changes do not affect the task or safe publication; ask about a dependent decision when they do. Merge, rebase, or rewrite history only with user authorization.
5. Review the complete changeset below before pushing.

Use the fresh remote-tracking ref for the requested or existing PR target as the base; otherwise use the remote default branch. A local `main` or `master` can be stale even after fetching.

## Analyze the complete changeset

Cover the entire branch, not only the last commit. After checking the current Git state, reuse a complete changeset analysis and check results from this session when the base, head, and working-tree state are unchanged. Read new or unresolved parts; when no matching analysis is available, inspect the full changeset:

```bash
git diff --name-status <base-ref>...HEAD
git diff <base-ref>...HEAD
git log --format=fuller <base-ref>..HEAD
```

- Read every changed file needed to understand the cumulative behavior. Identify affected packages, dependency versions, breaking changes, migration needs, and supported issue references.
- Confirm that every outgoing commit belongs to the authorized publication scope. Resolve unrelated or unclear committed work before pushing; a branch or PR request does not authorize publishing someone else's changes.
- For GitHub creation, if the branch has no changes from the base, stop and report that a PR cannot be created. For text-only requests involving uncommitted work, inspect those changes and clearly distinguish them from changes already present in the branch.

## Recover and verify the task

1. Inspect the user's request, branch name, existing PR, and full commit messages for explicit task IDs or links. Use the project's tracker configuration and repository context to resolve each reference. A bare number is not unique across repositories or trackers.
2. Read each task's requirements and relevant comments from its tracker, reusing task details already read in this session. Compare them with the changeset analysis above. Use the branch ID to identify the intended task and the requirements check to decide whether it is complete.
3. When the task and full solution are clear, add the appropriate reference without asking the user to confirm the same task again. If references conflict, the task cannot be read, or completion is unclear, explain the specific problem and ask before choosing a closing reference. Continue independent PR preparation while waiting.
4. Before publishing, check existing PR links and outgoing commit messages for closing references that conflict with the verified scope. Resolve those conflicts before publication; ask before rewriting existing commits.

Use `Related issues` in the description:

- For a fully resolved GitHub issue in a PR targeting the default branch, use `Closes #42` in the same repository or `Closes owner/repo#42` in another repository. GitHub closes the issue when the PR is merged. See [GitHub's linking rules](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue).
- For a confirmed partial solution or a target other than the default branch, keep the issue open with a plain reference such as `Related to #42`. State what remains for partial work.
- For Jira or another tracker, include the task's verified key and URL. A configured Jira integration can link the PR through its source branch key; task status changes depend on the project's automation. See [Jira's reference rules](https://support.atlassian.com/jira-software-cloud/docs/reference-issues-in-your-development-work/).

## Draft the content

### Title

- Use 50 characters or fewer.
- Use imperative mood.
- Reflect the main purpose of the complete changeset.
- Use a conventional scope for a monorepo when it adds clarity.
- Do not add issue numbers, agent names, or tool prefixes.

### Description

- Always include `Summary` with a short, engaging introduction and concrete bullets. Use emojis in the introduction and most bullets, but keep technical claims precise.
- Focus `Summary` bullets on changed behavior and important implementation details.
- Add only sections with evidence-backed content:
  - `Motivation`
  - `Related issues`
  - `Breaking changes`
  - `Migration`
  - `Performance impact`
  - `Dependency updates`
- Omit empty sections and placeholders such as `None` or `N/A`. Do not add other headings unless the user explicitly requests them.
- Never add a testing-only section such as `Testing`, `Tests`, `Validation`, `Verification`, `Local verification`, or `QA`.
- Do not list local test, lint, or check commands unless the user explicitly asks for them in the PR body.
- Use the verified task references from the recovery step; omit `Related issues` when there are none.
- For dependency changes, list every package separately as `package-name: old-version -> new-version`.
- For breaking changes, explain the impact and include concrete migration steps when they are known.

## Deliver the PR

### Create or update on GitHub

1. After reviewing the complete changeset, push the verified branch commits when needed and establish its upstream. Get the authenticated GitHub login.
2. Create new PRs as drafts unless the user explicitly requests a ready PR.
3. Set the authenticated user as the assignee. If creation cannot set the assignee, update the PR immediately afterward.
4. Add reviewers only when the user explicitly requests them. An assignee is not a reviewer.
5. When updating an existing PR, preserve unrelated metadata and its current draft state unless the user requests a change.
6. Read back the saved description and available linked-issue metadata to verify the intended task references. Report the PR URL, draft or ready state, assignee, and whether each task is set to close on merge or is only referenced. Report only link and status outcomes supported by the available evidence.

If authentication or the creation API fails, say that the PR was not created and fall back to copyable content in chat.

### Output in chat

Wrap the title and full description in one markdown code block so the formatting can be copied without changes:

````markdown
[PR title]

[PR description]
````
