# Personal agent skills 🎯

This repository contains custom skills that extend LLM capabilities with specialized knowledge and workflows.

> [!NOTE]
> Mostly opinionated and sometimes funny skills created for personal use. Feel free to explore and adapt them as needed.

## Available skills 📚

| Skill | Description | License |
| --- | --- | --- |
| [typescript-conventions](./typescript-conventions/SKILL.md) | TypeScript coding conventions for writing, reviewing, refactoring, and debugging TypeScript code. Use when working on TypeScript in any file format, including `.ts`, `.tsx`, and typed sections inside files such as Vue or Astro, as well as TypeScript snippets, type-driven refactors, and general code organization. | Unlicense |
| [commit-creator](./commit-creator/SKILL.md) | Create English conventional commit messages for the current changes. Use when the user wants to commit code, asks for a commit message, or needs monorepo scopes and version updates handled correctly. | Unlicense |
| [drizzle-orm](./drizzle-orm/SKILL.md) | Drizzle ORM query patterns for TypeScript. Use when writing, reviewing, or debugging Drizzle queries, especially when choosing between relational queries and the SQL builder, building dynamic filters, loading relations, or fixing Drizzle query-shape and type mismatches. Also apply during code review when a file contains non-trivial query construction with `drizzle-orm`. | Unlicense |
| [markdownlint](./markdownlint/SKILL.md) | Configure, manage, and troubleshoot markdownlint in projects. Use when user wants to setup/install/configure markdownlint, add/remove/modify linting rules, fix markdown validation issues, customize .markdownlint.yaml, update ignore patterns, integrate with tools (Husky, CI), or troubleshoot markdown linting errors. Use even when user mentions markdown formatting problems, quality issues, or style consistency without explicitly saying "markdownlint". | Unlicense |
| [playwright-e2e-testing](./playwright-e2e-testing/SKILL.md) | Write and maintain Playwright end-to-end tests for web apps. Use when the user asks for browser or E2E coverage, navigation flow tests, API mocking, fixtures, or Playwright-specific assertions. | Unlicense |
| [pr-creator](./pr-creator/SKILL.md) | Create GitHub pull requests from code changes via API or generate PR content in chat. Use when user wants to create/open/submit PR, mentions pull request/PR/merge request/code review, or asks to show/generate/display/output PR content in chat (give me PR, PR to chat, send PR to chat, etc). | Unlicense |
| [vitest-unit-testing](./vitest-unit-testing/SKILL.md) | Write and maintain Vitest unit tests for TypeScript code. Use when the user needs unit coverage for utilities, services, or stores, or asks for Vitest-based tests with mocks, spies, and assertions. | Unlicense |

## Installation 📦

To install all skills from this repository:

```bash
pnpx skills add Perdolique/workflow
```

## For developers 👨‍💻

### Creating or updating skills

When you need to create a new skill or update an existing one, make sure you have the `skill-creator` skill installed:

```bash
pnpx skills add anthropics/skills --skill skill-creator
```

This skill provides comprehensive guidance for creating effective skills with proper structure, metadata, and best practices.

### Local validation

Install `skill-validator` before working on skills locally:

```bash
brew tap agent-ecosystem/tap
brew install skill-validator
```

Or install it with Go:

```bash
go install github.com/agent-ecosystem/skill-validator/cmd/skill-validator@latest
```

Run the local validator after changing anything under `skills/`:

```bash
pnpm run lint:skills
```

## Resources 🔗

- [Vercel Skills CLI](https://github.com/vercel-labs/skills) - Tool for managing skills
- [Anthropic's Official Skills](https://github.com/anthropics/skills) - Collection of official skills including skill-creator

---

**License**: Unlicense (unless otherwise specified for individual skills)
