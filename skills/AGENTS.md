# Agents instructions

## General guidelines

- Always use English for file contents and generations.
- Titles in markdown files should use sentence case.
- Keep skills focused, complete, and concise. Prefer rewording or removing existing instructions before adding new ones.
- Prefer concise imperative phrasing in generated instructions. Omit articles only when grammar and meaning stay clear; keep them when needed for correctness, specificity, or quantity.

## Skill workflow guidelines

- After every change in `skills/`, run `pnpm run lint:skills`.
- After every change in skills, thoroughly review the entire skill using the `skill-creator` skill.
