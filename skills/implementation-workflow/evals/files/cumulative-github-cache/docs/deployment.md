# Deployment

PRs to `master` create protected Previews. The `deploy:staging` label deploys shared staging after a successful build. Pushes to `master` deploy production after CI passes. Fork PRs cannot deploy.

## Configuration

GitHub Actions uses `CLOUDFLARE_WORKERS_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Worker secret values are separate for each environment. Staging and Previews disable Slack intake and classification.

## GitHub repositories

Relay uses one shared [relay-app](https://github.com/organizations/example-team/settings/apps/relay-app) installation for **example-team**. Managers do not sign in to GitHub individually. Listing available installation repositories requires no additional repository permissions; no Actions data is collected.

`GITHUB_APP_ID` is already `123456`. Generate a private key in the App's settings and store the downloaded PEM once as the `GITHUB_APP_PRIVATE_KEY` Worker secret, separately for each environment. For example:

```sh
vpx wrangler secret put GITHUB_APP_PRIVATE_KEY --env production < /path/to/downloaded-key.pem
```

Setting a Worker secret deploys a new version. For local work, use ignored `.dev.vars` for the quoted PEM key. Missing credentials leave GitHub settings in the server setup state. The installation ID is discovered automatically and saved in D1; there is no installation ID to configure.

Grant **Manage GitHub repositories** in **Settings → Access**. This permission opens **Settings → GitHub**. Click **Connect GitHub** to install the App with **Only select repositories** in a new tab. GitHub requires an organization owner or a repository administrator with sufficient rights to approve this step. Return to Relay to select repositories; it refreshes the shared connection automatically. Every Relay manager with this permission sees the same connections, regardless of their personal GitHub access. GitHub access is checked again before each connection. Disconnecting works during a GitHub outage and retains saved records and the actor/time history; it does not change the GitHub App's access. Refresh the list after changing access on GitHub.

## Migrations and recovery

CI applies migrations before deployment and saves a D1 recovery bookmark as an Actions artifact for 30 days. Inspect it before repairing a failed deployment. Previews share staging D1; a PR migration changes that shared database.
