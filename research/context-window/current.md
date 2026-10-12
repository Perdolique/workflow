# Current assessment

Last research: 12 October 2026. This is an observational assessment, not a measured optimum. [Study history](history.md) preserves previous recommendations and corrections; [results.json](results.json) is the numeric record.

## Recommendation and observed state

For GPT-6.1 Sol with subscription usage, the native 500K context default is a reasonable baseline. For a modest manual increase tailored to long work, the later recommendation is **600K capacity with a 500K compaction threshold**. On 12 October, after the study, the user requested this manual setting in both the repository configuration and the active user configuration. Both files were updated and passed normal and strict configuration loading. Work outcomes under the new setting have not yet been measured. Model and reasoning effort were not changed.

| Option | Expected usable context | Compaction threshold | Space above threshold | Status |
| --- | ---: | ---: | ---: | --- |
| Previous 320K / 270K | 304K | 270K | 34K | Historical measured baseline |
| Native 500K | 475K | 450K | 25K | Recommended native option |
| Manual 600K / 500K | 570K | 500K | 70K | Applied on 12 October; work outcomes unmeasured |
| 872K capacity | 828.4K | Depends on configuration | Depends on threshold | No evidence for an everyday recommendation |

Expected values use the catalog and CLI 0.162.1 implementation checked on 12 October: 95% usable context and a default trigger at 90% of resolved capacity. An explicit trigger is capped at that 90% value. These rules may change; verify them before a later recommendation. Space above the threshold is a configuration margin, not a guarantee that every possible tool result will fit.

The manual 600K / 500K choice adds 50K, or about 11%, to the native compaction threshold. It also leaves more space for growth between checks. This is a practical preference for retaining detail, not evidence of a measured quality, latency, or quota gain. Raising capacity while keeping an old lower threshold does not postpone threshold-triggered compaction. Manual overrides also keep taking precedence if a later model default rises.

The new 500K default and subscription long-context fee statement apply to GPT-6.1 Sol. The observed catalog still lists 272K defaults for the other inspected models. A global override can affect those models too. The two research agents used GPT-6 Astra at xhigh; this was a researcher choice, not a recommendation to change the working model.

## Recent evidence

The last study selected 223 substantive root chats in a rolling month and kept supporting agents separate. Of these roots, 146 had compaction, with 407 events. The incremental slice since the preceding study contained 79 roots, 55 with compaction, and 164 events. Recorded median compaction intervals were 96.392 seconds and 147.582 seconds respectively.

Repeated compaction in one recorded engine turn was less common: 15 of 1,713 turns in the month and nine of 621 in the incremental slice. A chat can cover many tasks; an engine turn can contain several user steering messages. Compaction incidence per chat is not interruption incidence per human request.

The incremental slice had 16,210 ordinary root responses. GPT-6.1 Sol accounted for 13,171 of them and 142 of its 164 compactions. All incremental ordinary root responses reported the old 304K usable window. The last included work preceded the new-default announcement. There are no measured post-announcement or 475K-window work results in this study.

Fourteen detailed cases across 13 roots included preserved requirements, real scope or instruction errors, errors without intervening compaction, and non-context blockers. They did not establish a causal claim that compaction caused memory loss or that a larger window fixes correctness. Case details remain outside this public archive.

## How to read the numbers

An input p95 near 234K means that about 95% of individual recorded ordinary responses used at most that much input under the active compaction policy. It does not mean that 95% of complete tasks or original histories fit in 234K. A task may grow, compact, and grow again while each request remains below that value.

Summing repeated inputs also does not recover the unsummarized context a task needed. Long chats contribute more observations to a request-weighted percentile. Even a percentile of per-chat maxima is constrained by prior compaction.

Recorded compaction durations can include service and client waiting. Parallel intervals can overlap; their sum is not exclusive user time lost. Before/after cohorts differ in tasks, models, effort, clients, and instructions. The research does not establish a causal trend from a change in a percentage or median alone.

Removing a long-context surcharge does not make additional retained input free. Capacity is a ceiling, so it does not fill short requests with extra tokens. Larger actual inputs, cache reuse, reasoning, tool use, and avoided compaction work affect the final allowance use. No exact subscription multiplier or saving is inferred from these aggregates.

## Open questions for the next update

- Do new work records use the applied 600K / 500K settings and report the expected 570K usable window? A successful config check does not inspect active-thread overrides.
- Does the additional retained history reduce compactions per substantive turn, repeated work, or time to a usable result?
- Are observed omissions caused by lost requirements, misunderstood instructions, changed scope, or another failure?
- Does comparable work consume more or less attributable allowance? Report token/cache proxies when account-level attribution is unavailable.

## Product sources checked on 12 October 2026

- [Default-window announcement](https://x.com/thsottiaux/status/2109430343346581527) and [subscription fee clarification](https://x.com/thsottiaux/status/2109430894604026039). The official embed confirmed the announcement opening and the full fee reply; the full main post was not retrieved.
- [Configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference).
- [Usage factors and pricing](https://learn.chatgpt.com/docs/pricing).
- [Installed-release context calculation](https://github.com/openai/codex/blob/rust-v0.162.1/codex-rs/protocol/src/openai_models.rs) and [override precedence](https://github.com/openai/codex/blob/rust-v0.162.1/codex-rs/models-manager/src/model_info.rs).
