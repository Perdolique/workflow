# Unit suite measurements

The project uses Vitest 5.0.5 on Node.js 24. Its CI runner has four CPUs and a 4 GiB memory limit. The suite has 120 files and 600 cases. It requires independent file state: some files replace globals and hold module-level caches.

The baseline uses `forks`, four workers, and `isolate: true`. Its duration breakdown is 45% imports, 25% environment setup, 15% tests, 10% workers, and 5% transforms. Forty files are pure calculations with no browser APIs in their imports or setup; all files currently use happy-dom.

Recorded candidates use the same case inventory, assertions, fixtures, dependencies, coverage, and runner. The completed comparison runs used alternating order. These are test-command times, not full CI times.

| Variant | Elapsed seconds | Outcome | Peak total memory |
| --- | --- | --- | --- |
| Baseline | 61, 60, 70 | 600 passed each run | 2.0 GiB |
| Isolated VM pool, four workers, measured recycling limit | 39, 38, 45 | 600 passed each run, including different file orders | 2.6 GiB |
| Eight workers | 34, 33, terminated | Two complete runs; one out-of-memory termination | 4.8 GiB |
| Four workers, isolation disabled | 28, 27, 29 | A module-state case fails in two file orders | 1.8 GiB |

No results exist for moving the forty pure files to Node. Cache state was held constant during the recorded comparison. There are no billing rates or whole-workflow measurements in this snapshot.
