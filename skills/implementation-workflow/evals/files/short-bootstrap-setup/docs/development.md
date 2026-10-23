# Development guide

Development is tracked in the private [Pantry API Project][project], [GitHub Issues][issues], and [repository milestones][milestones].

## Plan and current scope

[The initial plan](initial-plan.md) is the detailed baseline. It separates confirmed product requirements from technical proposals and future ideas. Requirements R01–R18 describe the product; A01–A36 guide acceptance checks; D1–D10 identify decisions needed before dependent implementation.

Issues hold the current agreed work scope. Accepted architecture decision records (ADRs) belong in `docs/decisions/`. Compare the plan, current issues, accepted ADRs, and actual code before starting an epic. Update affected planning documents and issues when an agreed decision changes the roadmap.

[Technical debt](technical-debt.md) records confirmed problems, temporary solutions, and the checks needed to remove them.

The [service stack](decisions/0001-service-stack.md) records the owner's accepted choices and operating profile. The [shared API contract](decisions/0002-api-contract.md) records the accepted E1 profile. Authentication and remaining domain decisions stay open; proposed routes and schemas in the initial plan are not final choices.

The owner chooses every library and tool used in this project, including runtime, build, test, and development dependencies. Before selecting, adding, or replacing one, explain its purpose, useful alternatives, limits, and the effort needed to replace it later. Show all packages the installation would add, including dependencies of dependencies, before asking for the owner's choice. Get the owner's explicit choice and record it; existing experience and skill recommendations do not establish approval. Keep unapproved choices marked as proposals.

## Milestones

| Milestone | Verified outcome | Main epics |
| --- | --- | --- |
| [M1][m1] | Private recipe book through the API | E1, E2, E3 |
| [M2][m2] | Shopping and cooking calculations | E4 |
| [M3][m3] | Complete API contract for the first client | E5, E6 |
| [M4][m4] | Deployed backend v1 with tested recovery | E7 |

M3 also checks the client contract from E3 and E4. Tests, documentation, access checks, migrations, and diagnostics start in M1. M4 verifies the complete service, including recovery of database records and image bytes. No dates are committed. Client application delivery is outside these backend milestones.

## Epics and dependencies

| Epic | Outcome | Direct prerequisite |
| --- | --- | --- |
| [E1][e1] | Service foundation and shared API contract | None; D1 accepted |
| [E2][e2] | Accounts, private access, and capabilities | E1 |
| [E3][e3] | Composite recipes and safe editing | E2 |
| [E4][e4] | Temporary scaling and shopping quantities | E3 |
| [E5][e5] | Private search and ingredient matching | E3 |
| [E6][e6] | One private dish photo | E3 |
| [E7][e7] | Release and operational verification | E4, E5, E6 |

Native blocked-by relationships record these prerequisites. Earlier dependencies also apply through the chain. E4, E5, and E6 can proceed independently after the shared recipe contract and their own decisions are ready. Each epic describes its specific decisions, scope, and acceptance criteria.

## Plan tasks when an epic starts

1. Read the epic, current code, open and closed issues, roadmap, and accepted ADRs. Identify completed work, changed assumptions, and actual blockers.
2. Resolve the decisions needed for the next work. Keep short ADRs for choices that affect the API, data, or service operation. State the choice, reason, and main trade-offs; link to existing details and update an existing ADR when it covers the decision. Settle product questions with the owner before dependent implementation.
3. Update the epic's scope, acceptance criteria, and dependencies where needed.
4. Create small, useful, verifiable tasks as native sub-issues. Use the [task template](../.github/ISSUE_TEMPLATE/task.md) for outcomes, contracts, errors, acceptance, checks, and migration or compatibility needs.
5. Add each task to this Project and its milestone. Add real blocked-by links. When an epic spans stages, give each task the milestone it actually delivers.
6. Verify acceptance before closing work. Close an epic only when its complete outcome is delivered, even if all currently listed tasks are already closed.

E1 is split into [six implementation tasks][e1]. [Decision #216](https://github.com/example-maintainer/pantry-api/issues/216) records the accepted choices and compatibility evidence. Start with [#217](https://github.com/example-maintainer/pantry-api/issues/217), which is Ready. E1 remains open until the deployed foundation meets acceptance.

## Project workflow

The status sequence is Backlog → Ready → In progress → Done.

- **Backlog:** planned work whose details may still need decisions.
- **Ready:** a task has clear scope, accepted decisions, and met prerequisites.
- **In progress:** work has started; an epic may span several active child tasks.
- **Done:** acceptance is verified. Close the issue and keep Project status aligned.

Keep epics in Backlog until selected for planning or delivery. The **Epics** view shows the backend outcomes. **Board** shows v1 work by status. **Ideas** shows future candidates separately. Native issue labels define `epic`, `task`, and `idea`; add `decision` to a task that resolves a needed decision.

[Future ideas F1–F8][ideas] have no v1 milestone or implementation tasks. Review their value and agree their scope before selecting them for a later iteration.

[project]: https://github.com/users/example-maintainer/projects/206
[issues]: https://github.com/example-maintainer/pantry-api/issues
[milestones]: https://github.com/example-maintainer/pantry-api/milestones
[ideas]: https://github.com/example-maintainer/pantry-api/issues?q=is%3Aissue%20label%3Aidea
[m1]: https://github.com/example-maintainer/pantry-api/milestone/201
[m2]: https://github.com/example-maintainer/pantry-api/milestone/202
[m3]: https://github.com/example-maintainer/pantry-api/milestone/203
[m4]: https://github.com/example-maintainer/pantry-api/milestone/204
[e1]: https://github.com/example-maintainer/pantry-api/issues/201
[e2]: https://github.com/example-maintainer/pantry-api/issues/202
[e3]: https://github.com/example-maintainer/pantry-api/issues/203
[e4]: https://github.com/example-maintainer/pantry-api/issues/204
[e5]: https://github.com/example-maintainer/pantry-api/issues/205
[e6]: https://github.com/example-maintainer/pantry-api/issues/206
[e7]: https://github.com/example-maintainer/pantry-api/issues/207
