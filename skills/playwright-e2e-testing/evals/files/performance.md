# Browser suite measurements

Both variants cover 648 outcomes across Chromium and WebKit with the same assertions, fixtures, translations, tool versions, and application build inputs. Each shard has its own runner of the same CPU and memory capacity as the baseline runner. Runners have enough memory for four workers. Billing rates are unavailable.

The baseline runs one shard with four workers. The candidate runs two shards with four workers each, shares one build artifact, and merges reports in a final job with the original required check name. Both listed configurations use zero retries. The following runs were performed in alternating order:

| Run | Baseline test step | Candidate longest test step | Baseline required result after build | Candidate required result after build | Baseline summed E2E job time | Candidate summed E2E job time |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 480 s | 300 s | 530 s | 370 s | 520 s | 660 s |
| 2 | 500 s | 330 s | 550 s | 405 s | 550 s | 710 s |
| 3 | 472 s | 305 s | 522 s | 376 s | 512 s | 669 s |

The summed job time includes setup, tests, teardown, and report merging. All listed runs passed with the full inventory. One additional baseline run failed a WebKit case and is not in the timing table.

The unchanged build step took 90, 50, and 70 seconds for baseline runs and 48, 51, and 50 seconds for candidate runs. Runner load varied during this period. No experiment has separated the effects of extra parallelism from other setup changes. Workflow start/finish times and timings for jobs outside this build and E2E path are not included.

The candidate's final check has only been observed when both shards succeed. Cancellation, a failed shard, and a missing report have not been checked.
