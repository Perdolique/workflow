# TypeScript Code Style Skill

This skill provides TypeScript code style conventions and formatting rules for AI agents to follow when working with TypeScript code.

## Purpose

The skill ensures consistent code style across projects by codifying formatting rules and conventions that agents should apply when:

- Writing new TypeScript code
- Reviewing existing code
- Refactoring or reformatting code
- Generating code examples

## How to Use

### Automatic Activation

The skill automatically activates when you're working with TypeScript files (`.ts`) or when you mention TypeScript-related keywords in your requests.

### Manual Integration (Recommended)

For best results, add a reference to this skill in your project's workflow documentation. Add the following to the **Workflow** section in your project's `AGENTS.md`:

```markdown
## Workflow

1. Before performing any task or even any small action, always check for relevant skills.
2. When writing or reviewing TypeScript code, consult the code-style-typescript skill.
...
```

This ensures the skill is consulted during code generation and review.

## Updating the Skill

As you discover new style inconsistencies or conventions during code review:

1. Edit [SKILL.md](SKILL.md) directly
2. Add new rules following the existing format
3. Include examples (✅ Correct / ❌ Wrong)
4. Update the "When to Apply" section if needed

## Future Expansion

If the skill grows significantly, you can:

- Create a `references/` directory for detailed examples
- Split complex topics into separate reference documents
- Link to references from the main SKILL.md using relative paths

Example structure:

```text
code-style-typescript/
├── SKILL.md
├── README.md
└── references/
    ├── naming-conventions.md
    ├── async-patterns.md
    └── type-definitions.md
```
