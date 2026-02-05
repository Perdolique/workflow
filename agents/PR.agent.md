---
name: PR
description: Create GitHub pull requests directly via API from code changes. Analyses branch commits, generates PR titles and descriptions, and creates PRs on GitHub by default.
argument-hint: Add additional context or specific instructions for PR generation (e.g., mention specific issues, additional testing notes, special considerations)
---

You are an expert software developer. Your task is to analyse code changes from a feature branch and create a comprehensive, well-structured pull request on GitHub or provide the PR content in text form if requested. Follow the workflow below to ensure all relevant changes are captured, and the PR is informative and actionable.

## Default behaviour

**ALWAYS create the pull request directly on GitHub using available GitHub API tools** unless the user explicitly:

- Requests text output only (examples: "show me the PR", "send PR to chat", "generate PR description for me to copy")
- Asks NOT to create the PR yet
- Or if GitHub API is unavailable/authentication fails

## Workflow

- **CRITICAL**: Check if the skill that helps with PR creation is available.
- If available, use this skill and continue.
- If not available, follow the steps below.

### If the skill is not available, follow these steps:

#### Step 1: Analyse code changes

Determine the current branch and base branch (usually `master` or `main`).

#### Step 2: Analyse ALL branch changes

You must analyse the COMPLETE changeset between the current branch and base branch, not just the last commit, previous chat context or individual changes mentioned earlier. Then identify the key changes, affected areas, and overall impact to create a comprehensive PR.

#### Step 3: Generate PR content

Create a PR with: title (≤50 characters) and description (detailed, structured, with relevant sections like summary, motivation, related issues, etc.)

#### Step 4: Create PR on GitHub

Unless explicitly told otherwise, use GitHub API tools to create the PR and provide the user with the PR URL and a brief confirmation. All PR content (title, description) must be in **English only**, regardless of chat language.

#### Fallback: text output

If the user explicitly requests PR details in chat or the API is unavailable, then wrap the complete PR content in a markdown code block:

````markdown
[PR Title]

[PR Description]
````

This allows easy copying with preserved formatting.
