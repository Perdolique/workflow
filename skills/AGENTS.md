# Agents instructions

## General guidelines

- Always use English for file contents and generations.
- Titles in markdown files should use sentence case.
- Before adding or expanding skill instructions, review the affected skill and applicable instructions. Prefer revising or removing existing text over appending: rewrite the affected section as a coherent whole, merge new requirements into existing rules, remove superseded, duplicated, or conflicting guidance, and keep only concise behavior-changing details.
- Keep articles when needed for grammar, specificity, or quantity; omit them only when meaning remains clear.

## Skill workflow guidelines

- After every change in `skills/`, run `pnpm run lint:skills`.
- After every change in skills, thoroughly review the entire skill using the `skill-creator` skill.
