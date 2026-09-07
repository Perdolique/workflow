---
name: instructions-master
description: Create, edit, review, or evaluate reusable skills and other agent instructions. Use when changing what an agent should do, when guidance should apply, or how instruction sets interact. Do not use merely to follow existing instructions or edit ordinary documentation.
---

# Instructions master

Manage instruction authoring. This skill governs authoring scope and evaluation when skill-level guidance conflicts. Follow higher-priority instructions and explicit user direction; use domain sources for domain facts.

Keep the complete applicable instruction set short, clear, and consistent. Optimize for unambiguous behavior, not the fewest words; preserve necessary scope and exceptions.

## Establish the contract

- Read the complete target and applicable instructions; identify existing rules that already cover or conflict with the requested behavior.
- Identify the intended behavior, audience, loading mechanism, instruction hierarchy, and existing scope.
- Inspect only related instructions, history, and automated enforcement that can change the decision. Distinguish established requirements from assumptions and proposals.
- Resolve material uncertainty about the intended contract before making an irreversible or broad change.

## Edit coherently

- Revise, merge, or remove existing rules before adding more. Resolve semantic duplication and conflicts across applicable instructions, not just within the edited file, while respecting their priority.
- Add only durable, non-obvious information that changes behavior. Do not turn one example, failure, preference, or unsupported scenario into a universal rule.
- Preserve established scope, meaningful exceptions, and user control. Change descriptions or triggers only when applicability changes or observed selection behavior proves they are wrong.
- Change related instructions, metadata, evaluations, references, scripts, or user documentation only when their own contract is affected.
- Place each rule at the narrowest stable level that reaches its audience. Repeat it only when separate audiences or enforcement layers need it independently. Remove guidance covered by automation only after verifying equivalent enforcement.
- Use short, plain, grammatically complete instructions. Remove examples, rationale, and repeated wording unless they resolve a real ambiguity. Keep rules self-contained within the loaded document and its explicitly linked materials.

## Evaluate proportionally

For a narrow editorial change, review the complete final document and diff, then run required repository checks. Read [the evaluation method](references/evaluation.md) when the user requests evaluation or when a change materially affects behavior, skill selection, or interaction between instructions.

## Finish

- Review the final text against the other applicable instructions: remove unnecessary wording, resolve conflicts, and justify any retained duplication. Confirm that scope and necessary exceptions remain intact.
- Justify every changed file from the requested behavior and remove incidental changes.
- Report the checks performed and any behavior that could not be verified.
