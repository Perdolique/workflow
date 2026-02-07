# Agents and skills workflow repository

This repository contains custom AI coding agents and skills that extend LLM capabilities with specialized knowledge and workflows.

## Project structure

- `agents/` - Custom AI coding agents (*.agent.md files)
- `skills/` - Reusable skills for specialized tasks (each in its own directory with SKILL.md)

## General guidelines

- **Language**: Always use English for file contents and any generated content (code, documentation, commit messages, etc.)
- **Markdown titles**: Use sentence case for all markdown headings
- **Nested instructions**: Some subdirectories contain their own AGENTS.md files with more specific instructions for that context. These nested files take precedence when working within those directories.

## Workflow rules

### Pre-task checklist

**STOP! Before modifying ANY file in this repository**, complete this checklist:

- [ ] **Read nested AGENTS.md**: Check if the directory you're working in (or its parents) has an AGENTS.md file and read it
- [ ] **Identify relevant skills**: Search the skills catalog for skills related to your task and read their documentation
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

