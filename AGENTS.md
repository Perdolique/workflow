# Skills workflow repository

This repository contains reusable skills and assistant instructions that extend LLM capabilities with specialized knowledge and workflows.

## Project structure

- `skills/` - Reusable skills for specialized tasks (each in its own directory with SKILL.md)
- `non-standard/` - Personal coding assistant instructions and related tool configs

## General guidelines

- **Language**: Always use English for repository files and generated project content (code, documentation, commit messages, etc.). A task-specific plan in the system temp directory is task state, not project content; preserve the approved plan's language unless the user requests translation.
- **Markdown titles**: Use sentence case for all markdown headings
- **Markdown line wrapping**: Do not hard-wrap prose or list items at 80 columns or any other fixed width. Keep each paragraph and list item on a single physical line unless a line break is semantically required by Markdown.
- **README scope**: Keep READMEs focused on the repository overview, a short skill catalog, setup, and links. Keep each skill description to one short sentence about its purpose. Put skill behavior and workflow rules in the skill.
- **Nested instructions**: Some subdirectories contain their own AGENTS.md files with more specific instructions for that context. These nested files take precedence when working within those directories.

## Workflow rules

- The usual setup installs the global instructions and all repository skills together. Keep shared policies in `non-standard/codex/AGENTS.md` and preserve requirements across the set.
- Skills should work without this repository's specific global instruction file. References to standard instruction files such as a project's `AGENTS.md` are allowed. Refer to other skills by name.
- Before any repository edit, including a small one, read the applicable AGENTS.md files and relevant skills and follow the established naming, formatting, and structural conventions.
- For creating, editing, reviewing, or evaluating skills or other agent instructions, use [instructions-master](skills/instructions-master/SKILL.md). It controls authoring scope and evaluation, including tasks that only inspect instructions.
- This project publishes directly from `master`. When the user asks to push, commit all uncommitted changes and push `master` to `origin`.

### Task verification

After each complete group of repository edits, run all four checks below and verify the final state before finishing, including for documentation-only changes.

- Complete any required dependency installation first. If TypeScript files changed, run `pnpm exec worsier --write <changed-files>` before validation.
- Run independent checks in parallel when safe; keep dependent steps sequential.

```bash
pnpm exec worsier --check .
pnpm run lint:markdown
pnpm run lint:skills
pnpm test
```

- Wait for every check to finish, inspect each result, and require exit code 0 from all four before marking the task complete. Fix failures and rerun affected checks.
- Use intermediate checks when they help diagnose a problem, and repeat affected checks after further edits.
- Run these checks before finishing even when a pre-commit hook also runs them. Skill lint validates the package structure; behavioral evaluation follows instructions-master.

## Context-window research

When asked to continue, supplement, or refresh the Codex context-window research, start with [the research archive](research/context-window/README.md) and follow [its update procedure](research/context-window/update.md).
