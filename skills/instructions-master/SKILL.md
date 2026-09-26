---
name: instructions-master
description: Create, edit, review, or evaluate reusable skills and other agent instructions. Use when changing what an agent should do, when guidance should apply, or how instruction sets interact. Do not use merely to follow existing instructions or edit ordinary documentation.
---

# Instructions master

- Write English instructions at B1 level: use common words, short sentences, and correct grammar. Keep needed technical terms and explain unfamiliar ones.
- Make the full instruction set clear and consistent. Preserve working behavior, scope, and useful exceptions; rewrite the wording as needed.
- This skill controls authoring and evaluation when skills disagree. Follow higher-priority instructions and explicit user direction. Use domain sources for domain facts.

## Establish the contract

- Read the full target and the instructions that apply to it. Identify its audience, scope, priority, and how it is loaded.
- Map the rules by meaning before editing: what each rule requires, when it applies, and where rules overlap or conflict. Separate confirmed requirements from assumptions and proposals.
- Check related instructions, history, and automated checks when they can affect the decision.
- Use context and settled user or project conventions to resolve uncertainty first. Ask about remaining uncertainty before the affected decision; continue independent work while waiting.

## Reshape the rules

- Build the normal procedure first: what to do, when to do it, and what result to produce.
- Base each rule on a confirmed user or project requirement, a tool constraint, or an observed problem. Treat explicit requirements and tool constraints as sufficient grounds for their boundaries.
- For each added constraint, exception, or clarification, identify its source and the decision it changes. Keep it when it adds needed guidance beyond the normal procedure. Carry settled decisions into the procedure; use the task report for the history of discarded alternatives.
- Address observed mistakes by making the required action or decision clearer first. Use targeted prohibitions or exceptions for repeated, observed mistakes that remain after this clarification. Keep each exception with the rule whose scope it changes.
- Rewrite the affected section as a whole when local patches would add repetition or complex conditions. Merge rules with the same purpose and resolve conflicts across applicable instructions in priority order.
- Preserve established user and project preferences. Extend a rule to new situations only when confirmed needs support that scope.
- Place each rule at the narrowest level that reaches its audience. Repeat it only when separate audiences or enforcement layers need it independently. Before removing a rule covered by automation, verify that the checks enforce the same behavior.
- Make each skill work on its own. Include its core procedure and bundle required references in its package. Other installed skills may add optional guidance.
- Preserve user control. Change descriptions and triggers only when the scope changes or observed selection errors show a need. Edit related files only when their own requirements or behavior are affected.

## Write clearly

- Split chains of conditions and actions into clear steps. Add a brief reason or example when it helps explain a non-obvious goal, trade-off, or boundary.
- Use lists for consecutive standalone instructions, with one main idea per item. Use numbered lists when order matters. Keep introductions, explanations, and example lead-ins as prose where that reads naturally.
- Keep each rule understandable from the loaded document and its linked materials. Keep useful examples, correct grammar, and necessary articles when shortening text.

## Evaluate proportionally

- For a narrow wording change, review the full final document and diff, then run required repository checks.
- Read [the evaluation method](references/evaluation.md) when the user requests evaluation or a change materially affects behavior, skill selection, or how instructions work together.

## Finish

- Read the full result alongside the other applicable instructions. Check B1 wording, repetition, conflicts, and hidden dependencies. Confirm that the agreed behavior, scope, and needed exceptions remain intact.
- Recheck each constraint, exception, and clarification against its source and the procedure. Remove wording that adds no needed decision or explanation. Justify any repeated rules that remain and keep only files needed for the requested change.
- Report the checks performed and any behavior that could not be verified.
