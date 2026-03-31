# Project configuration

Conventions for setting up `playwright.config.ts`.

## Base URL and constants

Extract the app base URL into a shared constants file (`tests/playwright/constants.ts`) and import it in both the config and test helpers. This avoids hardcoded URLs scattered across files.

```typescript
// tests/playwright/constants.ts
export const appBaseUrl = 'http://localhost:8888';
```

## Web server

Always configure `webServer` so tests can run without a manually started dev server. Use `reuseExistingServer` to avoid restarting the server when one is already running locally, while forcing a fresh start in CI:

```typescript
import { appBaseUrl } from './tests/playwright/constants.ts';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  webServer: {
    command: 'npm run preview',
    url: appBaseUrl,
    reuseExistingServer: !isCI,
    timeout: 120_000
  }
});
```

Key decisions:

- **Test against the production build** (`preview`) rather than the dev server — it catches build-only issues and is closer to what users experience.
- **`reuseExistingServer: !isCI`** — locally it reuses a running server for fast iteration; in CI it always starts a fresh one for reliability.
- **`timeout: 120_000`** — building + starting the server can take time, especially on CI runners.

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

Enable `trace` and `screenshot` to capture debugging data only when tests fail — no overhead on passing tests, but invaluable for diagnosis:

```typescript
use: {
  baseURL: appBaseUrl,
  trace: 'on-first-retry',
  screenshot: 'only-on-failure'
}
```

## CI behavior

```typescript
const isCI = Boolean(process.env.CI);

export default defineConfig({
  // Fail the build if test.only was accidentally left in the source code
  forbidOnly: isCI,

  // Retry flaky tests in CI only
  retries: isCI ? 2 : 0
});
```
