# Update the context-window research

Use this procedure when the user asks to supplement or refresh this archive. The normal result is a new dated aggregate entry and an updated assessment. The user should only need this repository and the local Codex history; no old chat, ZIP, or private registry is required.

## Read the retained state

1. Read [current.md](current.md), [history.md](history.md), and [results.json](results.json). Reuse their findings and open questions. Treat earlier recommendations as hypotheses, not fixed answers.
2. Follow the repository's instructions before editing. Keep new analysis work files in the system temporary directory, outside the repository.
3. Inspect current model, effort, client version, catalog capacity, compaction settings, and relevant official product documentation. Read only the fields needed for the study. Record observed values separately from proposed settings and code-derived defaults. A research request does not authorize a configuration change.

## Identify the local corpus

A corpus is one local collection of session history. Public labels such as `corpus-a` identify research datasets, not people, computer names, or device fingerprints.

Read the ignored checkout-local file `.research-local/context-window.json` if it exists. Its complete content is only `schema_version` and `corpus_id`; the latter refers to `corpora` in results.json. This association is a convenience for later updates in the same checkout. It contains no session records and is not copied to another computer.

- With a valid marker and the same local history, continue from that corpus's completed coverage boundary.
- Without a marker, use a new anonymous corpus label, unless the user or reliable local evidence identifies an existing corpus. Do not apply another computer's cutoff to this history. Create the ignored marker after a successful study, using the corpus label recorded in results.json.
- A copied marker, restored history, or imported old sessions does not prove continuity. Treat an uncertain source as a separate corpus or supplemental slice with unknown overlap. Do not silently skip it or merge its totals into an existing source.

For a new corpus, default to the most recent month unless the user requests another period. Retain its findings separately even when its dates overlap previous studies. Local identifiers may be used temporarily to check duplicates when both sources are available, but none belong in the public archive. Without both sources, exact overlap can remain unknown; that does not block adding a separate report.

## Choose the work that needs analysis

For a known corpus, the normal interval is **after its latest completed cutoff through a new fixed cutoff**, with an exclusive lower bound and inclusive upper bound. Use execution timestamps, not chat creation dates or filenames. A chat created earlier may contain new work and must remain eligible.

Check the saved coverage ranges, not only their maximum date. A known gap is a separate supplemental slice. Do not mark periods before the earliest documented coverage as analyzed. Metadata scans to locate new or changed work are allowed; they are not a new qualitative analysis of every old chat.

Inspect older material only when needed to understand a resumed task, recover counting state at the boundary, check a suspected duplicate, or investigate a concrete error in a previous result. Keep that carried context out of new workload counts. Newly imported historical work may need an overlapping supplemental slice. Timestamp-only cutoffs cannot guarantee detection of all historical imports.

Use the established content selection: substantive programming, analytics, and research. Exclude ordinary automation, guardian/permission reviews, micro/admin work, empty starts, and context-window research itself. A previously excluded chat can become substantive later. For mixed chats, select only the human substantive work ranges. Keep supporting agents separate from roots and exclude inherited parent execution.

For a substantive research update, keep selection, analysis, and final interpretation separate. The established research preference is one GPT-6 Astra xhigh agent for selection, another GPT-6 Astra xhigh agent for analysis, and an independent parent check. This is not a working-model recommendation. Honor the user's current model instructions and report unavailable requested models before substituting. Give the analyst the selected new work and the aggregate archive; do not ask it to reselect the whole historical corpus.

## Count and interpret consistently

- Prefer usage records with distinct `response_id` values. Count each model response once. Use older usage snapshots only when they describe additional model work.
- Remove duplicate notifications, copied parent history, and startup counters that repeat old usage. Exclude zero-input records created by a context reset. Read earlier metadata and counters when needed at the cutoff. A notification after the cutoff must not count a response that happened before it.
- Measure ordinary per-response input separately from compaction-service usage. Cumulative counters and repeated input sums are not context requirements or invoices.
- Count actual compaction records. Do not assume every event was automatic. Match timing records when possible; report how many intervals were measured and how boundary-spanning intervals were handled.
- Report root and supporting work separately. Record sessions with zero, one, and repeated compaction, plus repeated compaction per recorded engine turn when the format supports it. Explain that an engine turn can contain several human messages and a chat can span several tasks.
- Use recorded model and effort per event or turn. Current settings do not relabel older work. Compare cohorts with different models, clients, scope, or selection rules as observational data.
- Explain request p95 as a distribution under the active compaction policy. Do not translate it into the fraction of whole tasks that fit. Do not reconstruct an exact unsummarized history by summing overlapping inputs or positive context growth.
- Examine actual requirement handling around compactions, with examples that have no compaction and successful continuation as controls. Separate changed scope, misunderstanding, tool failures, and access blockers from evidence of forgetting. Publish only generic findings and counts.

## Preserve separate results

Add a study entry to results.json with its date, corpus label, selection/method version, exact interval bounds, role as full snapshot or incremental/supplemental slice, aggregate metrics, limitations, and relation to earlier entries. Use `null` for a metric that was not measured, rather than zero. Store only the aggregates needed to compare the studies.

Update the corpus coverage only after selection and analysis finish successfully. Coverage records the interval inspected, not the timestamp of the last active session. Do not extend it across a gap. Add historical imports or corrections as explicitly described slices or revisions.

State whether corpora overlap or whether this is unknown. The same long chat can appear in two separate time periods, so adding their chat counts does not give a unique-chat total. Do not add or average saved medians, p95 values, percentages, or cache-use ratios to produce a combined value. These need the underlying observations or suitable counts and totals. The archived rolling months also overlap each other. Publish a combined result only when the source data and duplicate checks support it.

If the user specifically requests a new rolling month, calculate that interval from local observations where needed; saved monthly p95 values cannot be combined or trimmed into a new one. Reuse prior qualitative findings and recount only the required data range. If the necessary raw history is unavailable, report the separate saved snapshots instead of fabricating a merged result.

Add the dated findings and recommendation to history.md. Update current.md to reflect the latest evidence and distinguish proposed, applied, and measured settings. Preserve the reasoning behind older advice and explicit corrections. A numeric correction may revise an existing entry, but must state what changed and why; Git retains the previous value.

## Keep the public output small and anonymous

Publish aggregate numbers, generic methods and findings, anonymous corpus labels, dates, model/client/settings information, and public product documentation links. Build these fields from an explicit allowlist rather than copying whole private reports or JSON objects.

Exclude session titles and IDs, individual-session hashes or fingerprints, source filenames and local paths, machine/account identifiers, employer and project details, issue/PR links, message excerpts, raw logs, credentials, and per-session rows. Do not add a ZIP or private evidence bundle to this repository. The ignored marker is the only persistent local helper required by this procedure.

## Verify and report

1. Check the new aggregate values against the local calculation, its denominators, and boundary handling. Reconcile meaningful differences with an independent count where possible.
2. Parse results.json, check referenced study/corpus labels and intervals, and make sure current.md and history.md match the numeric record. Verify that the local marker is ignored and absent from the tracked diff.
3. Inspect the complete proposed public diff for private details, including newly added files. Run the repository's required formatting and Markdown checks.
4. Report the new period, evidence that changed the recommendation, material unknowns, and whether any setting actually changed. The user can commit and push the research through their normal Git workflow; do not infer permission to publish or change configuration from a research request.
