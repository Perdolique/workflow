# Personal agent skills 🎯

This repository contains custom skills that extend LLM capabilities with specialized knowledge and workflows.

> [!NOTE]
> Mostly opinionated and sometimes funny skills created for personal use. Feel free to explore and adapt them as needed.

## Available skills 📚

See the [repository skill catalog](../README.md#skills) for the complete list. Each linked skill defines its detailed scope and usage.

## Installation 📦

Bootstrap the global skill setup used with this repository:

```bash
pnpm run setup:skills
```

The command expects Vite+ `vpx` and `vp` commands on `PATH`. It installs skills from this repository and selected third-party skills from their latest upstream sources, installs `@playwright/cli@latest`, and downloads the Playwright CLI Chromium browser binary without OS dependencies. It creates `~/.playwright/cli.config.json` only when the file is missing and leaves an existing Playwright CLI config untouched.

To install only the skills from this repository:

```bash
vpx skills add perdolique/workflow --global --skill '*' --agent universal --yes
```

## For developers 👨‍💻

### Creating or updating skills

Use the `instructions-master` skill when creating, updating, reviewing, or evaluating skills.

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

Run the local validator after a complete group of changes under `skills/` and verify the final state before finishing:

```bash
pnpm run lint:skills
```

## Resources 🔗

- [Vercel Skills CLI](https://github.com/vercel-labs/skills) - Tool for managing skills

---

**License**: Unlicense (unless otherwise specified for individual skills)
