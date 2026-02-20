# Workflow - AI Coding Agents & Skills

A collection of custom AI coding agents and reusable skills that extend LLM capabilities with specialized knowledge and workflows.

## What's inside

### 🤖 Agents

Custom AI coding agents for specific development workflows. Each agent specializes in a particular task:

- **Commit** - Generate semantic commit messages and create commits following conventional commits format
- **PR** - Create and manage GitHub pull requests with automated analysis and descriptions

[Explore agents →](./agents/)

### 🎯 Skills

Reusable skills that provide specialized knowledge and capabilities:

| Skill | Description |
|-------|-------------|
| [code-style-typescript](./skills/code-style-typescript/) | TypeScript code style guide and formatting conventions |
| [commit-creator](./skills/commit-creator/) | Semantic commit message generation with monorepo support |
| [pr-creator](./skills/pr-creator/) | GitHub pull request creation via API with automated analysis |

## Quick start

### Using skills

Install skills from this repository using the Vercel Skills CLI:

```bash
pnpx skills add Perdolique/workflow
```

### Using agents

Agents are typically invoked through your AI coding assistant. Refer to your assistant's documentation for specific usage instructions.

### Non-standard Copilot instructions

The repository includes custom GitHub Copilot instructions in `non-standard/copilot/instructions/`. Individual instruction files can be symlinked into Copilot's instructions directories — either globally or per project.

| File | Applies to | Description |
|------|------------|-------------|
| [global.instructions.md](./non-standard/copilot/instructions/global.instructions.md) | `**` | Role, communication style, and code development principles |

#### Global (applies to all projects)

```bash
ln -s /path/to/workflow/non-standard/copilot/instructions/global.instructions.md ~/.copilot/instructions/global.instructions.md
```

#### Per project (applies only to that project)

```bash
ln -s /path/to/workflow/non-standard/copilot/instructions/global.instructions.md /your/project/.copilot/instructions/global.instructions.md
```

Replace `/path/to/workflow` with the actual path to this repository.

> [!WARNING]
> These instructions override Copilot's default behavior and contain opinionated communication style preferences. Review the file before installing.

## License

Unlicense (unless otherwise specified for individual components)

---

> [!NOTE]
> This is a personal collection of opinionated and sometimes quirky agents and skills. Feel free to explore, use, and adapt them for your own projects.
