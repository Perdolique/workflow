# Project configuration

Conventions for setting up `playwright.config.ts`.

## Base URL and constants

Extract the app base URL into a shared constants file (`tests/playwright/constants.ts`) and import it in both the config and test helpers. This avoids hardcoded URLs scattered across files.

```typescript
// tests/playwright/constants.ts
export const appBaseUrl = 'http://localhost:8888';
```

## Web server

Configure `webServer` for local browser checks so tests can start their own server. For production-build checks, run the project's build script for the current checkout before starting preview, and rebuild after application changes. A preview command serves existing output; it does not build the app.

Reuse a local server only when you have established that it serves this checkout's current build. If the port belongs to another app or worktree, choose a free port and use it in both the server command and the shared base URL. This example starts its own preview after the build step; adapt the command to the project:

```typescript
import { appBaseUrl } from './tests/playwright/constants.ts';

const previewPort = new URL(appBaseUrl).port;

export default defineConfig({
  webServer: {
    command: `npm run preview -- --port ${previewPort} --strictPort`,
    url: appBaseUrl,
    reuseExistingServer: false,
    timeout: 120_000
  }
});
```

Production-build checks catch build-only issues. Keep the project's required server mode when another mode is part of the test contract. Set the startup timeout from the server's needs; the build step has its own timing.

## Reporters

Use HTML reporter locally (with `open: 'never'` to avoid auto-opening the browser after every run) and add the GitHub reporter in CI for inline annotations on PRs:

```typescript
import type { ReporterDescription } from '@playwright/test';

const reporters: ReporterDescription[] = [
  ['html', { open: 'never' }]
];

if (isCI) {
  reporters.unshift(['github']);
}
```

## Traces and screenshots

Choose traces together with the effective retry policy, including command-line overrides:

- `on-first-retry` records the first retry, so it needs at least one retry. It does not capture the original failure or produce any trace when retries are zero.
- `retain-on-failure` records every run and keeps failed runs. It supports diagnosis with zero retries, but recording still costs time on passing runs.
- `screenshot: 'only-on-failure'` keeps a screenshot when a test fails; it does not provide the action history in a trace.

For a run that needs first-failure traces without retries:

```typescript
export default defineConfig({
  retries: 0,
  use: {
    baseURL: appBaseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  }
});
```

## CI behavior

Keep the project's retry policy. Verify changed scenarios without retries before relying on repeated CI attempts, and report tests that pass only after a retry as flaky. Use `forbidOnly` in CI to catch accidentally focused tests:

```typescript
const isCI = Boolean(process.env.CI);

export default defineConfig({
  // Fail the build if test.only was accidentally left in the source code
  forbidOnly: isCI
});
```

Read [the performance guide](performance.md) when changing workers or shards. Preserve the required final check and failure artifacts across that change.

## Sources

- [Web server configuration](https://playwright.dev/docs/test-webserver)
- [Trace options](https://playwright.dev/docs/api/class-testoptions#test-options-trace)
- [Retries](https://playwright.dev/docs/test-retries)
