# Agents instructions

## General guidelines

- Always use English for file contents and generations.
- Titles in markdown files should use sentence case.
- Rewrite the affected section as a whole instead of appending instructions: merge new requirements into existing rules, remove superseded or duplicated text, and state only behavior-changing details in concise, direct imperative language.
- Keep articles when needed for grammar, specificity, or quantity; omit them only when meaning remains clear.

## Skill workflow guidelines

- After every change in `skills/`, run `pnpm run lint:skills`.
- After every change in skills, thoroughly review the entire skill using the `skill-creator` skill.
