# Cache diagnostics

`traceCacheHit` writes a label and a cache key to the local developer console. `readCache` calls it only in development mode. These messages are not parsed, sent to telemetry, or shown in the product UI. Their exact wording is not a supported contract.

The project has no test setup. Its `check` script validates the diagnostic module's JavaScript syntax.
