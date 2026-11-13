# API authentication project

The project uses Playwright 1.64.1 for direct API tests. The shared test file is `tests/playwright/fixtures.ts`; no fixture exists yet. Tests must import both `test` and `expect` from that file. The base URL is exported as `appBaseUrl` from `./constants`.

`POST /api/auth/create-session` sets the session cookie. `GET /api/equipment/groups` returns HTTP 200 with a session cookie and HTTP 401 without it. The tests need to verify only these status codes. Authenticated reads do not change authentication or server data, so their context can be shared within a worker. A test of missing authentication must start without that session cookie.
