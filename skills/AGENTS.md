# Agents instructions

## General guidelines

- Always use English for file contents and generations.
- Titles in markdown files should use sentence case.
- Before editing skill instructions:
  - Read the complete affected skill and applicable instructions.
  - Revise or remove existing text before appending.
  - Rewrite the affected section as one coherent set of instructions.
  - Merge overlapping requirements and remove superseded, duplicated, or conflicting guidance.
- When writing skill instructions:
  - State the desired behavior directly and explain why it matters.
  - Use negative instructions only when they define a necessary boundary that positive wording would not preserve.
  - Keep each rule precise, behavior-changing, and within the skill's established scope.
- Keep articles when needed for grammar, specificity, or quantity; omit them only when meaning remains clear.

## Skill workflow guidelines

- After every change in `skills/`, run `pnpm run lint:skills`.
- After every skill change:
  - Use the `skill-creator` workflow to review the entire skill.
  - Finish with a read-only pass by a separate agent.
  - Give the reviewer the complete final skill and diff.
  - Require the reviewer to identify duplicated or superseded guidance, unnecessary context growth, diluted scope, unclear or indirect instructions, and avoidable negative phrasing.
  - Resolve material findings and rerun relevant checks before completion.
