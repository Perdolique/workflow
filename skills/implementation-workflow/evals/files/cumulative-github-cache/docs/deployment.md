# Deployment

| Trigger | Target |
| --- | --- |
| PR to `master` | Protected Preview; URL in the PR comment |
| Add `deploy:staging` to a PR | [Shared staging](https://relay.staging.example.test) |
| Push to `master` | [Production](https://relay.example.test) after CI passes |

Staging requires a successful build of the current PR commit and a branch that includes current `master`. The label is removed after the attempt. Fork PRs cannot deploy.

## Configuration

- GitHub Actions uses organization secret `CLOUDFLARE_WORKERS_API_TOKEN` and variable `CLOUDFLARE_ACCOUNT_ID`.
- `wrangler.jsonc` defines domains, D1 databases, Workflows, Access settings, modes, and required secret names. Set secret values separately for each Worker environment.
- Cloudflare Access allows Example Team Google sign-in. Its Bypass must cover only `/integrations/slack/events` on the app host.
- Staging and Previews disable Slack intake and classification. The production config enables both intake and the classifier classification and requires `TYPESAFE_API_KEY`. See [Slack setup](slack/intake.md) before changing modes.

## User permissions

Users get no permissions by default. Access managers can open **Settings → Access**, select a user, and save their permissions. **Update request fields**, **Manage requests**, **Manage GitHub repositories**, and **Manage access** are independent. GitHub and request management can be removed. Once saved, **Manage access** cannot be removed through the app or its API.

The access migration gives `owner-one@example.test` and `owner-two@example.test` **Manage access** only. Other users appear after their first sign-in; grant their permissions through **Access**.

The local developer account also starts without permissions. After opening the local app once, grant local access with:

```sh
vpx wrangler d1 execute relay-local --local --command "INSERT INTO user_permissions (email, permission) VALUES ('local-developer@example.test', 'access.manage'), ('local-developer@example.test', 'requests.reclassify') ON CONFLICT DO NOTHING"
```

## GitHub repositories

Relay uses one shared [relay-app](https://github.com/organizations/example-team/settings/apps/relay-app) installation for **example-team**. Managers do not sign in to GitHub individually. Listing available installation repositories requires no additional repository permissions; no Actions data is collected.

`GITHUB_APP_ID` is already `123456`. Generate a private key in the App's settings and store the downloaded PEM once as the `GITHUB_APP_PRIVATE_KEY` Worker secret, separately for each environment. For example:

```sh
vpx wrangler secret put GITHUB_APP_PRIVATE_KEY --env production < /path/to/downloaded-key.pem
```

Setting a Worker secret deploys a new version. For local work, use ignored `.dev.vars` for the quoted PEM key. Missing credentials leave GitHub settings in the server setup state. The installation ID is discovered automatically and saved in D1; there is no installation ID to configure.

Grant **Manage GitHub repositories** in **Settings → Access**. This permission opens **Settings → GitHub**. Click **Connect GitHub** to install the App with **Only select repositories** in a new tab. GitHub requires an organization owner or a repository administrator with sufficient rights to approve this step. Return to Relay to select repositories; it refreshes the shared connection automatically. Every Relay manager with this permission sees the same connections, regardless of their personal GitHub access. GitHub access is checked again before each connection. Disconnecting works during a GitHub outage and retains saved records and the actor/time history; it does not change the GitHub App's access. Refresh the list after changing access on GitHub.

## Migrations and recovery

CI applies migrations before deployment and saves a D1 recovery bookmark as an Actions artifact for 30 days. Inspect that bookmark before repairing a failed deployment.

Previews share staging D1 and the deployed staging Workflow. A PR migration changes that shared database; each PR must include migrations already applied there. A Preview does not run its own Workflow code.

The `20260927084642_slack_documents` migration clears Slack tables and preserves `users`. Disable intake and finish or terminate old Workflow instances before applying it. Restore the previous intake mode only after the new Worker is deployed.

For a local production artifact check without deploying:

```sh
vp run build:production
bash scripts/verify-deployment-artifact.sh production
vpx wrangler deploy --config dist/relay/wrangler.json --dry-run
```
