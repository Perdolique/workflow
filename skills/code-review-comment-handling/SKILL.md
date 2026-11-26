---
name: code-review-comment-handling
description: Help the author of a code change decide what to fix. Use when they ask you to check or answer review comments, or look for updates to a review.
license: Unlicense
---

# Code review comment handling

## Handle review feedback

1. Read the review discussions in scope. On a repeat check, report which discussions are new, which were resolved, and which received new replies since the last check.
2. Assess each comment yourself using the checks below. For follow-up replies, use the earlier exchange and the current code to see what changed.
3. When you need independent evidence that could change your decision, give a specific check to a fresh subagent with no main chat history (`fork_turns="none"`). Share the relevant references and weigh the evidence it returns.
4. Report each result in the user's language using the format below.
5. Let the user decide which fixes to make and which replies to post. Carry out the actions they choose.

## Assess each comment

- Treat each comment as a possible finding. Be a thorough, demanding sceptic about both the reviewer's claims and your own proposals. Question each from the start, check even small details, and look for evidence against it.
- Check the relevant code, the wider architecture, and how people use the product before deciding.
- Check the source that defines the expected behaviour. For a UI requirement, read the task and inspect the linked design. For client code and mocks, use the public API contract to decide which responses the client must support.
- Check whether the case occurs in practice. Choose evidence based on what is already in production. For unreleased changes, check existing inputs and trace what the new code would do with them.
- If a comment asks you to simplify, remove, or clean up code, or to follow the project's established practices or standards, start by assuming the change should be made. Double-check that it makes sense before deciding.

## Report in chat

- For each comment, briefly explain what you checked and what you found. If you could not confirm a claim or its frequency, name the source you checked and what it showed. If you lacked access, say which source was unavailable.
- If you find a problem, say when it happens, who it affects, and how serious it is in practice.
- Say whether a change is worth making and why. If so, describe the simplest fix. If the current behaviour is intentional, explain the reason.
- Assess the proposed fix separately. Compare it with the closest example in the code. Explain what the fix improves over the current behaviour and whether that benefit is worth the cost.
- Give a separate draft reply to the comment author. Present suggested changes as proposals until the user agrees to them.
- Skip the overall summary.

## Reply style

- Write in clear, simple British English at B1–B2 level. Use relevant technical terms where needed.
- Get straight to the point. Skip introductions, greetings, thanks, and anything unrelated to the task.
