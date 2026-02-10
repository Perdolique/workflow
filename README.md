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

- **code-style-typescript** - TypeScript code style guide and formatting conventions
- **commit-creator** - Semantic commit message generation with monorepo support
- **pr-creator** - GitHub pull request creation via API with automated analysis

[Explore skills →](./skills/)

## Quick start

### Using skills

Install skills from this repository using the Vercel Skills CLI:

```bash
pnpx skills add Perdolique/workflow
```

### Using agents

Agents are typically invoked through your AI coding assistant. Refer to your assistant's documentation for specific usage instructions.

### Non-standard Copilot instructions

The repository includes custom GitHub Copilot instructions located in `non-standard/.copilot/copilot-instructions.md`.

#### For GitHub Copilot CLI

Create a symbolic link to use these instructions with CLI:

```bash
ln -s /path/to/workflow/non-standard/.copilot/copilot-instructions.md ~/.copilot/copilot-instructions.md
```

Replace `/path/to/workflow` with the actual path to this repository.

#### For VSCode extension

1. Open Command Palette and run `Chat: New Instructions File...`
2. Create a new file (e.g., `global.instructions.md`) in **User Data**

3. Add frontmatter to apply globally:

   ```markdown
   ---
   applyTo: '**'
   ---
   ```

4. Copy the content from `non-standard/.copilot/copilot-instructions.md` into this file

> [!WARNING]
> These instructions override Copilot's default behavior globally and contain opinionated communication style preferences. Review the file before installing.

## License

Unlicense (unless otherwise specified for individual components)

---

> [!NOTE]
> This is a personal collection of opinionated and sometimes quirky agents and skills. Feel free to explore, use, and adapt them for your own projects.
