# Personal agent skills 🎯

This repository contains custom skills that extend LLM capabilities with specialized knowledge and workflows.

> [!NOTE]
> Mostly opinionated and sometimes funny skills created for personal use. Feel free to explore and adapt them as needed.

## Available skills 📚

| Skill | Description | License |
| --- | --- | --- |
| [code-style-typescript](./code-style-typescript/SKILL.md) | TypeScript code style guide and formatting conventions. Enforces semicolon usage rules and formatting standards. Use when writing or reviewing TypeScript code. | Unlicense |
| [commit-creator](./commit-creator/SKILL.md) | Generate semantic commit messages following conventional commits format. Supports monorepo package version tracking. Use when committing code, staging changes, or writing commit messages. | Unlicense |
| [markdownlint](./markdownlint/SKILL.md) | Configure, manage, and troubleshoot markdownlint in projects. Use when setting up, configuring rules, fixing violations, or integrating with tools (Husky, CI). Includes reference guides for all common operations. | Unlicense |
| [playwright-e2e-testing](./playwright-e2e-testing/SKILL.md) | Create and maintain Playwright E2E tests for web applications. Covers selectors, assertions, API mocking, test data fixtures, and SPA-specific patterns. Use when writing browser/E2E tests. | Unlicense |
| [pr-creator](./pr-creator/SKILL.md) | Create GitHub pull requests directly via API from code changes. Analyzes branch commits, generates PR titles and descriptions, and creates PRs on GitHub. Use when creating or updating pull requests. | Unlicense |
| [vitest-unit-testing](./vitest-unit-testing/SKILL.md) | Create and maintain unit tests using Vitest for TypeScript projects. Covers mocking, assertions, parametrized tests, and best practices. Use when writing unit tests. | Unlicense |

## Installation 📦

To install all skills from this repository:

```bash
pnpx skills add Perdolique/skills
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
