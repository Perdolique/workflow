# Skills workflow repository

This repository contains reusable skills and assistant instructions that extend LLM capabilities with specialized knowledge and workflows.

## Project structure

- `skills/` - Reusable skills for specialized tasks (each in its own directory with SKILL.md)
- `non-standard/` - Personal coding assistant instructions and related tool configs

## General guidelines

- **Language**: Always use English for repository files and generated project content (code, documentation, commit messages, etc.). A task-specific plan in the system temp directory is task state, not project content; preserve the approved plan's language unless the user requests translation.
- **Markdown titles**: Use sentence case for all markdown headings
- **Markdown line wrapping**: Do not hard-wrap prose or list items at 80 columns or any other fixed width. Keep each paragraph and list item on a single physical line unless a line break is semantically required by Markdown.
- **Nested instructions**: Some subdirectories contain their own AGENTS.md files with more specific instructions for that context. These nested files take precedence when working within those directories.

## Workflow rules

- Before any repository edit, including a small one, read the applicable AGENTS.md files and relevant skills and follow the established naming, formatting, and structural conventions.
- For creating, editing, reviewing, or evaluating skills or other agent instructions, use [instructions-master](skills/instructions-master/SKILL.md). It controls authoring scope and evaluation, including tasks that only inspect instructions.
- When a change affects established conventions, important project context, or documented user-facing behavior, update the relevant AGENTS.md or README.md. Make those updates according to the information that actually changed.

### Task verification

Run verification after a complete group of repository edits and verify the final state before finishing. Use intermediate checks when they help diagnose a problem; repeat affected checks after further edits.

| Check | When to run |
| --- | --- |
| `pnpm exec worsier --write <changed-files>` | Before final checks when TypeScript files changed; rerun relevant tests after formatting |
| `pnpm exec worsier --check .` | For every task that changes repository files |
| `pnpm run lint:markdown` | For every task that changes repository files |
| `pnpm run lint:skills` | When files under `skills/` changed |

Fix verification failures and require exit code 0 from all applicable commands before marking the task complete. Run these checks before finishing even when a pre-commit hook also runs them. Skill lint validates the package structure; behavioral evaluation follows instructions-master.
