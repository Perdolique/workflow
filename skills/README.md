# Personal agent skills 🎯

This repository contains custom skills that extend LLM capabilities with specialized knowledge and workflows.

> [!NOTE]
> Mostly opinionated and sometimes funny skills created for personal use. Feel free to explore and adapt them as needed.

## Available skills 📚

| Skill | Description | License |
|-------|-------------|---------|
| [code-committing](./code-committing/SKILL.md) | Generate semantic commit messages following conventional commits format. Supports monorepo package version tracking. Use when committing code, staging changes, or writing commit messages. | Unlicense |
| [github-pull-request](./github-pull-request/SKILL.md) | Create GitHub pull requests directly via API from code changes. Analyzes branch commits, generates PR titles and descriptions, and creates PRs on GitHub. Use when creating or updating pull requests. | Unlicense |

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

## Resources 🔗

- [Vercel Skills CLI](https://github.com/vercel-labs/skills) - Tool for managing skills
- [Anthropic's Official Skills](https://github.com/anthropics/skills) - Collection of official skills including skill-creator

---

**License**: Unlicense (unless otherwise specified for individual skills)
