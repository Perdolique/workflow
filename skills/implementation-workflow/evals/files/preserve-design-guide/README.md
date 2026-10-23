# Reel

Reel helps people discover movies and series, follow titles, and track upcoming releases. Nuxt serves the web app and Hono serves the API.

The web app follows the [design specification](apps/web/DESIGN.md). Before UI changes, read it and inspect the matching images in `apps/web/designs`. Images govern composition; keep accessibility and delivered behavior, and update conflicting written guidance.

## Local development

Run `vp install`, copy `apps/api/.env.example` to `apps/api/.env`, then run `vp run dev`. Web: <http://127.0.0.1:3001>; API health: <http://127.0.0.1:8788/health>. Start local PostgreSQL with `docker compose up -d database`, copy `.env.example` to `.env` for `DATABASE_URL`, and apply migrations with `vp run db:migrate`.

## Deployment and cleanup

Production and staging use separate Neon branches and Hyperdrive bindings. Tests use a disposable local PostgreSQL database. Same-repository PRs migrate and deploy staging; pushes to `master` migrate and deploy production. GitHub Actions migrates before deploying the API and web Workers. Fork and Dependabot PRs skip migration and deployment.

Expired email requests and import previews are removed daily: 03:00 UTC in production and 03:30 UTC in staging, at most 1,000 rows per run. Inspect Worker logs for `scheduled cleanup failed` and `limitReached: true`; failures or a backlog can delay removal and later runs retry.
