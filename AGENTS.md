# Skills workflow repository

This repository contains reusable skills and assistant instructions that extend LLM capabilities with specialized knowledge and workflows.

## Project structure

- `skills/` - Reusable skills for specialized tasks (each in its own directory with SKILL.md)
- `non-standard/` - Personal coding assistant instructions and related tool configs

## General guidelines

- **Language**: Always use English for file contents and any generated content (code, documentation, commit messages, etc.)
- **Markdown titles**: Use sentence case for all markdown headings
- **Markdown line wrapping**: Do not hard-wrap prose or list items at 80 columns or any other fixed width. Keep each paragraph and list item on a single physical line unless a line break is semantically required by Markdown.
- **Nested instructions**: Some subdirectories contain their own AGENTS.md files with more specific instructions for that context. These nested files take precedence when working within those directories.

## Workflow rules

### Pre-task checklist

**STOP! Before modifying ANY file in this repository**, complete this checklist:

- [ ] **Read nested AGENTS.md**: Check if the directory you're working in (or its parents) has an AGENTS.md file and read it
- [ ] **Identify relevant skills**: Search the skills catalog for skills related to your task and read their documentation before starting work. For example, read `commit-creator` before creating commits and `pr-creator` before creating pull requests
- [ ] **Understand conventions**: Ensure you know all applicable naming, formatting, and structural conventions

**Task scope definition**: A "task" is ANY user request that modifies files, including:

- Adding/removing/modifying code or content
- Creating new files or directories
- Updating documentation
- Refactoring existing code

Even "small edits" or "quick additions" are tasks that require the pre-task checklist.

### Post-task checklist

**After completing ANY task**, review and update if needed:

- [ ] **AGENTS.md files**: Did you introduce new patterns, conventions, or important context? Update relevant AGENTS.md file(s)
- [ ] **README.md files**: Did user-facing behavior or documentation change? Update relevant README.md file(s)
- [ ] **Only update when meaningful**: Skip updates for trivial edits that don't change conventions or user experience

### Task verification

**After completing ANY task**, run verification commands to ensure quality:

- [ ] **Run markdown linting**: Execute `pnpm run lint:markdown` to verify all markdown files comply with style rules
- [ ] **Fix violations**: If linting fails, fix violations before marking task as complete
- [ ] **Task completion criteria**: A task is considered successfully completed ONLY when all verification commands pass with exit code 0

**Available verification commands:**

```bash
# Markdown linting (required for all tasks that modify .md files)
pnpm run lint:markdown
```

**Note**: These verification commands are also enforced by git pre-commit hooks (if Husky is configured), but running them manually after completing work provides faster feedback and prevents surprises during commit.
