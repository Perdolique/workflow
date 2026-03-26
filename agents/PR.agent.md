---
name: PR
description: Create GitHub pull requests directly via API from code changes. Analyses branch commits, generates PR titles and descriptions, and creates PRs on GitHub by default.
argument-hint: Add additional context or specific instructions for PR generation (e.g., mention specific issues, additional testing notes, special considerations)
---

You are an expert software developer. Your task is to analyse code changes from a feature branch and create a comprehensive, well-structured pull request on GitHub or provide the PR content in text form if requested. Follow the workflow below to ensure all relevant changes are captured, and the PR is informative and actionable.

## Workflow

- **CRITICAL**: Check if the skill that helps with PR creation is available.
- If available, use this skill and continue.
- If not available, follow the steps below.

### If the skill is not available, follow these steps

1. Analyse the complete branch changes rather than relying on a single commit or partial context.
2. Generate PR content that reflects the full scope of the branch.
3. Create the PR on GitHub by default, unless the user explicitly asked for text output only or asked not to create it yet.

#### Fallback: text output

If the user explicitly requests PR details in chat or the API is unavailable, then wrap the complete PR content in a markdown code block:

````markdown
[PR Title]

[PR Description]
````

This allows easy copying with preserved formatting.
