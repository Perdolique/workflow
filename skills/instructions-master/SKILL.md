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

- Rewrite the affected section as a whole when local patches would add repetition or complex conditions. Merge rules with the same purpose and resolve conflicts across applicable instructions in priority order.
- Add rules for confirmed, lasting needs. Preserve established user and project preferences. Broaden a rule only when confirmed needs support it, not from one example or an imagined scenario.
- Place each rule at the narrowest level that reaches its audience. Repeat it only when separate audiences or enforcement layers need it independently. Before removing a rule covered by automation, verify that the checks enforce the same behavior.
- Make each skill work on its own. Include its core procedure and bundle required references in its package. Other installed skills may add optional guidance.
- Preserve user control. Change descriptions and triggers only when the scope changes or observed selection errors show a need. Edit related files only when their own requirements or behavior are affected.

## Write clearly

- State what to do and when. Split chains of conditions and actions into clear steps. Add a brief reason or example when it helps explain a non-obvious goal, trade-off, or boundary.
- Use lists for consecutive standalone instructions, with one main idea per item. Use numbered lists when order matters. Keep introductions, explanations, and example lead-ins as prose where that reads naturally.
- Keep each rule understandable from the loaded document and its linked materials. Keep useful examples, correct grammar, and necessary articles when shortening text.
- Address recurring mistakes by improving positive guidance first. Add explicit prohibitions or exceptions for repeated, observed mistakes only when positive guidance cannot resolve them.

## Evaluate proportionally

- For a narrow wording change, review the full final document and diff, then run required repository checks.
- Read [the evaluation method](references/evaluation.md) when the user requests evaluation or a change materially affects behavior, skill selection, or how instructions work together.

## Finish

- Read the full result alongside the other applicable instructions. Check B1 wording, repetition, conflicts, and hidden dependencies. Confirm that the agreed behavior, scope, and needed exceptions remain intact.
- Keep only files and wording needed for the requested change. Justify any repeated rules that remain.
- Report the checks performed and any behavior that could not be verified.
