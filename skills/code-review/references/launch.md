# Launch review agents

- Launch every agent fresh with `fork_turns="none"` and the [model settings](models.md). Give agents that can delegate the paths to the launch and model rules.
- Pass the agent its assignment, scope, evidence, applicable guidance with sources and scope, and the read-only and collaboration constraints for the review.
- In each internal handoff, give the paths to the code-review instructions for that assignment. Tell the agent to use those files and their relevant references without opening any installed or bundled code-review `SKILL.md`.
- Give reviewers, review children, validators, and resolvers the [shared review rules](review.md) and the brief's message ID. Tell them to read the assigned instructions and full brief before opening source files or evidence that contains code.
- Keep the responsibility and relevant code in the assignment packet. Put roles, skills, and model settings in separate routing. Add execution instructions only to the launch message.
