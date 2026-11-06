---
name: instructions-master
description: Create, edit, review, or evaluate reusable skills and other agent instructions. Use when changing what an agent should do, when guidance should apply, or how instruction sets interact. Do not use merely to follow existing instructions or edit ordinary documentation.
---

# Instructions master

Use short, direct B1 English with correct grammar. Keep needed technical terms and explain unfamiliar ones.

This skill controls authoring and evaluation when skills disagree. Follow higher-priority instructions and explicit user direction. Use domain sources for domain facts.

## Establish the contract

- Read the full target and the instructions that apply to it. Identify its audience, scope, priority, and how it is loaded.
- List required behavior, triggers, scope, and useful exceptions in a short checklist. Separate confirmed requirements from assumptions and proposals. Check related rules, history, and automation where relevant.
- Use context and settled conventions first. Ask about remaining uncertainty before the affected decision; continue independent work while waiting.

## Draft compact instructions

- State when to act, what to do, and the expected result. Prefer a positive procedure.
- Base each rule on a confirmed need, tool limit, or observed problem. Keep details only when they change a decision or prevent a misunderstanding. Put task history in the report.
- Clarify the required action before adding a ban. A ban needs an explicit requirement, a tool limit, or evidence that clearer positive guidance still fails. Keep it with the rule it qualifies.
- Preserve user and project preferences. Extend scope only for confirmed needs. Change descriptions and triggers only for scope changes or observed selection errors; edit related files only when their requirements or behavior change.
- Place rules at the narrowest level that reaches their audience. Repeat them only for audiences or enforcement layers that need them independently. Before removing a rule covered by automation, verify equivalent behavior.
- Keep each skill self-contained: include its core procedure and bundle required references. Other skills may add optional guidance.
- Use lists for standalone instructions, one main idea per item. Number steps when order matters.

## Shorten and validate

1. Write a shorter draft of each section containing a changed rule. Include unchanged rules in that section; merge repetition while preserving behavior. Leave unrelated sections alone.
2. Check the draft against every checklist item and related instructions, including permissions and hidden dependencies. Resolve conflicts by instruction priority.
3. Keep the shortest clear version that passes. Retain examples and extra wording only when they add needed guidance or avoid a specific ambiguity.

## Evaluate proportionally

For wording changes, review the full final text and diff, then run required checks. For evaluation requests or material changes to behavior, selection, or instruction interactions, use [the evaluation method](references/evaluation.md).

## Finish

After the final edit to any skill or other agent instructions, apply this skill again to the complete final state before finishing. Use one fresh independent subagent with `fork_turns="none"` when available. Otherwise, run the final check yourself and report this limit.

- Give the checker the task, checklist, original text, shorter draft, complete final instructions, diff, and related instructions. Ask for a direct read-only check of meaning, B1 wording, repetition, conflicts, and dependencies, with shorter replacements for wordy rules.
- Read the full result and recheck each added rule's source and purpose. Fix supported issues, keep only needed files, and repeat the check after further edits.
- Report the checks performed and any behavior that could not be verified.
