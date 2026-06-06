# Workflow - AI Coding Agents & Skills

A collection of custom AI coding agents and reusable skills that extend LLM capabilities with specialized knowledge and workflows.

## What's inside

### 🤖 Agents

Custom AI coding agents for specific development workflows. Each agent specializes in a particular task:

- **Commit** - Generate a conventional commit message from the current changes and create the commit
- **PR** - Analyze branch changes and create or update a GitHub pull request, or provide the PR content in chat

[Explore agents →](./agents/)

### 🎯 Skills

Reusable skills that provide specialized knowledge and capabilities:

| Skill | Description |
| --- | --- |
| [commit-creator](./skills/commit-creator/) | Create English conventional commit messages for the current changes |
| [drizzle-orm](./skills/drizzle-orm/) | Drizzle ORM query patterns for TypeScript, including relational queries, SQL builder usage, and query-shape fixes |
| [markdownlint](./skills/markdownlint/) | Configure, manage, and troubleshoot markdownlint in projects |
| [playwright-e2e-testing](./skills/playwright-e2e-testing/) | Write and maintain Playwright end-to-end tests for web apps |
| [pr-creator](./skills/pr-creator/) | Create GitHub pull requests from code changes or generate PR content in chat |
| [typescript-conventions](./skills/typescript-conventions/) | TypeScript coding conventions for typed code in `.ts`, `.tsx`, and embedded TypeScript files |
| [vitest-unit-testing](./skills/vitest-unit-testing/) | Write and maintain Vitest unit tests for TypeScript code |

## Quick start

### Using skills

Bootstrap the global skills and Playwright CLI setup used with this repository:

```bash
pnpm run setup:skills
```

The bootstrap command expects Vite+ `vpx` and `vp` commands on `PATH`. It installs
skills from this repository and selected third-party skills from their latest
upstream sources, installs `@playwright/cli@latest`, and downloads the Playwright
CLI Chromium browser binary without OS dependencies. It creates
`~/.playwright/cli.config.json` only when the file is missing and leaves an
existing Playwright CLI config untouched.

To install only the skills from this repository:

```bash
vpx skills add perdolique/workflow --global --skill '*' --agent universal --yes
```

### Using agents

Agents are typically invoked through your AI coding assistant. Refer to your assistant's documentation for specific usage instructions.

### Non-standard coding assistant instructions

This repository includes my personal custom instructions for coding assistants.
The canonical file is `non-standard/codex/AGENTS.md`; Copilot-specific files
point to it where that setup is useful for my tools.

| File | Target | Description |
| --- | --- | --- |
| [AGENTS.md](./non-standard/codex/AGENTS.md) | Codex | Role, communication style, and code development principles |
| [copilot-instructions.md](./non-standard/copilot/copilot-instructions.md) | GitHub Copilot CLI | Symlink to the canonical Codex instructions |

#### Codex global instructions

Codex reads my global guidance from `~/.codex/AGENTS.md`.

```bash
mkdir -p ~/.codex
ln -s /path/to/workflow/non-standard/codex/AGENTS.md ~/.codex/AGENTS.md
```

#### GitHub Copilot CLI instructions

GitHub Copilot CLI reads local user instructions from
`$HOME/.copilot/copilot-instructions.md`.

```bash
mkdir -p ~/.copilot
ln -s /path/to/workflow/non-standard/copilot/copilot-instructions.md ~/.copilot/copilot-instructions.md
```

#### GitHub Copilot in VS Code

VS Code can use repository-wide instructions from `.github/copilot-instructions.md`
or `AGENTS.md`. For my user-level prompt instructions, VS Code can also read
`.instructions.md` files from `~/.copilot/instructions/`. Those files need
`applyTo` frontmatter to apply automatically, so do not symlink the Codex
`AGENTS.md` file directly as a VS Code instructions file.

```bash
mkdir -p ~/.copilot/instructions
{
  printf '%s\n' '---' 'applyTo: "**"' '---' ''
  cat /path/to/workflow/non-standard/codex/AGENTS.md
} > ~/.copilot/instructions/global.instructions.md
```

Replace `/path/to/workflow` with the actual path to this repository.

Official references:

- [Codex AGENTS.md guidance](https://developers.openai.com/codex/codex-manual.md#custom-instructions-with-agentsmd)
- [GitHub Copilot CLI custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [GitHub Copilot custom instructions support](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

> [!WARNING]
> These instructions override assistant defaults and contain opinionated
> communication style preferences. Review the file before installing.

### LSP configuration

The repository includes an LSP (Language Server Protocol) configuration for GitHub Copilot CLI's `/lsp` command. This configuration enables language-specific features and autocompletion by specifying LSP servers for different file types.

**Configuration file**: [non-standard/copilot/lsp-config.json](./non-standard/copilot/lsp-config.json)

**Supported language servers**:

- TypeScript/JavaScript - `typescript-language-server`
- Vue - `vue-language-server`

#### Installation

Place the configuration file in your Copilot directory:

```bash
cp /path/to/workflow/non-standard/copilot/lsp-config.json ~/.copilot/lsp-config.json
```

Or symlink it:

```bash
ln -s /path/to/workflow/non-standard/copilot/lsp-config.json ~/.copilot/lsp-config.json
```

Replace `/path/to/workflow` with the actual path to this repository.

#### Prerequisites

Install the required language servers globally:

```bash
npm install -g typescript-language-server typescript
npm install -g @vue/language-server
```

Make sure the language servers are available in your PATH before using the configuration.

## License

Unlicense (unless otherwise specified for individual components)

---

> [!NOTE]
> This is a personal collection of opinionated and sometimes quirky agents and skills. Feel free to explore, use, and adapt them for your own projects.
