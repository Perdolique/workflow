# Browser verification snapshot

This is a planning snapshot, not a runnable checkout. The application uses Vite and Playwright 1.64.1. Its package scripts are `build: vite build`, `preview: vite preview`, and `test:browser: playwright test`.

The current checkout has application edits made after its last production build. Another worktree already serves an older build on port 4173. The shared `appBaseUrl` is `http://127.0.0.1:4173`; the preview command and tests both use it.

The team requires production-build verification in Chromium and WebKit, zero test retries, and a trace from the original failing run. The relevant cases include a dialog height transition and saved browser state across navigation.

The current configuration contains:

```typescript
export default defineConfig({
  retries: 0,
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'WebKit', use: { browserName: 'webkit' } }
  ],
  use: {
    baseURL: appBaseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: appBaseUrl,
    reuseExistingServer: true
  }
})
```
