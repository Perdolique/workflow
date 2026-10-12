# Study history

These are retained findings from earlier investigations, not newly repeated analyses. Older studies used different selection and counting methods. Their cohorts overlap; do not add their totals. Exact private source locations, session names, and quotations are intentionally omitted. The numeric record is [results.json](results.json).

## 19 August 2026: initial increase

The initial report counted 101 root sessions with 79 compactions over seven days, 151 with 124 over 14 days, and 295 with 200 over 30 days. The respective numbers of roots with compaction were 29, 44, and 81. Subagents and the study itself were excluded, but the later substantive-work selection method was not yet used. Exact interval endpoints were not preserved in the public source summary.

The recommendation was 320K capacity / 270K compaction, providing about 304K usable context and 34K space above the trigger. The change was reported applied and configuration validation passed on 19 August. The source report described the old effective window as 258.4K.

The report also simulated about 34% fewer compactions at about 12% more input. These were model estimates, not observed causal effects. Later studies did not validate them. An early discussion also confused advertised near-million model capacity with the client configuration limit; later catalog inspection established an 872K client maximum. Neither the old simulation nor the near-million example is current guidance.

## 23 August 2026: short follow-up

The weekly report covered 78 roots, 77 with token metrics, and 67 compactions in 30 roots. A 46-root post-change subset had 33 compactions in 19 roots. The new settings had been active for only about three and a half days.

The advice was to retain 320K / 270K and consider 400K / 340K later. The report described a drop from 2.72 to 1.74 compactions per affected session as an improvement. The expanded September analysis rejected a causal interpretation: workload and observation lengths differed. Replay estimates for larger windows are historical hypotheses, not reusable measurements of avoided compactions.

## 3 September 2026: expanded comparison

This study restricted usage to one working model and separated old-window, new-window, and recent-week cohorts.

| Metric | Before, seven days | After, about 15 days | Recent seven days |
| --- | ---: | ---: | ---: |
| Measured roots | 87 | 145 | 62 |
| Ordinary usage samples | 10,375 | 21,287 | 7,905 |
| Roots with compaction | 30 | 71 | 28 |
| Compactions | 80 | 179 | 65 |
| Compactions per 100 samples | 0.771 | 0.841 | 0.822 |

The extra room was used: 139 responses across 19 roots exceeded the earlier 258.4K usable window. That establishes capacity use, not better answers or avoided compactions. Input grew by about 13.8% on average while mean uncached input was nearly unchanged; this was not a measured subscription-cost increase.

Nineteen of 65 recent compactions had matched timing, with a 100.62-second median. Two of 21,287 post-change responses exceeded 272K input. The 270K trigger is therefore not a hard cap on the next request's input.

The initial recommendation retained 320K / 270K and proposed 400K / 340K for long work. A later clarification allowed a global trial: short tasks do not become larger merely because the configured ceiling rises. No 400K trial was shown as applied in the retained result.

## 10 September 2026: trigger accounting

A focused diagnosis confirmed that internal active-context usage had crossed the configured compaction threshold. The last ordinary response reported a lower value. These measurements describe different states; tool output and other additions can arrive between them.

The full-window boundary had not triggered. This supported the interpretation that the explicit compaction setting worked. The general lesson is retained here; individual event measurements are omitted from the public aggregate archive.

## 30 September 2026: first full content-selected month

The study covered 30 August to 30 September. It selected 282 substantive roots and separately analyzed 1,931 supporting agents plus one managed continuation. Two separate GPT-6 Astra xhigh researchers selected and analyzed the data; a parent audit checked metrics and cases.

There were 55,826 ordinary root usage observations, including identified responses and legacy snapshots, and 422 compactions in 167 roots. Of all roots, 115 had no compaction, 74 had one, and 93 had two or more. Median recorded compaction time was 68.96 seconds; input p95 was 233,947.25 tokens.

The main correction was interpretive: request p95 does not describe the space needed for a whole unsummarized task. Qualitative checks found both successful continuation and real requirement errors, including errors before any compaction. A historical experimental context feature was a separate source of reported trouble.

The advice kept 320K / 270K as the baseline and proposed a 400K / 300K trial with more growth margin. It did not establish an optimum or apply the candidate. Later discussion also corrected overly broad billing caution: API prices alone do not determine subscription usage, but explicit product statements about subscription long-context charging are relevant evidence.

## 12 October 2026: new default and latest month

The study covered 12 September to 12 October and separately measured an incremental slice from the preceding study cutoff. The content-selected corpus had 223 roots and 1,402 supporting agents. Two separate GPT-6 Astra xhigh researchers performed selection and analysis, followed by an independent parent audit.

| Metric | Rolling month | Incremental slice |
| --- | ---: | ---: |
| Roots | 223 | 79 |
| Ordinary root responses | 48,758 | 16,210 |
| Roots with compaction | 146 | 55 |
| Roots with at least two compactions | 85 | 36 |
| Compactions | 407 | 164 |
| Median compaction interval, seconds | 96.392 | 147.582 |
| Recorded engine turns | 1,713 | 621 |
| Turns with repeated compaction | 15 | 9 |
| Input p95, tokens | 234,237.3 | 236,205.8 |

Supporting work had 26,429 ordinary responses and 11 compactions in ten sessions. It was not added to the root context. One completed root compaction began before the monthly cutoff; its event was counted, but its full duration was excluded from the 406 wholly in-window timing intervals.

Validation removed a mirrored response before the cutoff and an inherited startup counter with no new inference. Independent parsers agreed after these corrections. Three empty review starts were removed from selection. The final source-line validation checked 76,958 distinct lines without errors. The public archive retains the results, not those private lines.

The qualitative pass covered bounded visible excerpts from all 223 roots and 14 deep cases across 13 roots. Errors after compaction did not isolate memory loss as the cause; negative controls showed errors without compaction. Many compactions per root accumulated across separate turns.

The new GPT-6.1 Sol default was 500K, with an announcement removing long-context fees for subscription usage. The current override still held the observed usable window at 304K. No selected work followed the announcement, so no new-default outcome was measured.

The first recommendation was to remove both old overrides and use native 500K, expected to give 475K usable context and a 450K trigger in the checked client. The follow-up considered a modest manual increase and recommended **600K / 500K** as an alternative for long work: 570K usable context, 70K margin, and a trigger about 11% above native. Both recommendations remained unapplied and unmeasured in this study. The manual option does not replace the native option with a proven optimum.

## 12 October 2026: manual setting applied

After the research was archived, the user explicitly requested 600K capacity and a 500K compaction threshold in both the repository configuration and the active user configuration. Only these two settings changed. Existing model and effort choices were preserved.

Both configurations passed `codex doctor --json` and `codex --strict-config doctor --json` with `config.load` equal to `ok`. The repository file was loaded through a temporary Codex home. That temporary home had no authentication credentials, so its overall doctor result also reported an unrelated authentication failure. No active-thread override or new work outcome was verified. The expected 570K usable window remains a code-derived value until confirmed in new work records.
