# 0001: Service stack

> Snapshot excerpt of the accepted record. Unrelated database, domain, and future release sections are omitted.

Status: Accepted on 2026-10-19, including the release and operating profile. Covers D1 and the initial E1 part of D10.

Tracking: [E1](https://github.com/example-maintainer/pantry-api/issues/201), [decision #216](https://github.com/example-maintainer/pantry-api/issues/216).

## Confirmed stack

The owner selected each entry after reviewing alternatives and package dependencies. Hono and Drizzle ORM add no external runtime dependencies; Drizzle's `pg` adapter uses the approved driver and types. [Decision #216](https://github.com/example-maintainer/pantry-api/issues/216) records the reviewed package sets.

| Area | Choice | Status |
| --- | --- | --- |
| Runtime and HTTP | Existing Cloudflare Workers Paid account, TypeScript, `hono@4.13.13` | Confirmed |
| Package manager | `pnpm@12.14.0` and its reviewed platform distribution | Confirmed |
| Local runtime | Node.js `26.12.0` for development and CI | Confirmed; Current status accepted |
| Type checking | `typescript@7.0.2`; direct `@types/node@26.6.5` from the already approved package set | Conditional upgrade authorized by owner; selected-stack experiment passed |
| Worker tooling | `cf@1.0.0-beta.18`, `wrangler@4.151.1`, and TypeScript configuration in `cloudflare.config.ts`; Wrangler provides the build tool | Confirmed; prerelease dependencies accepted |
| Lint | `oxlint@1.88.0`, `eslint-config-greenpie@17.15.0`, and `oxlint-tsgolint@7.0.2004`; use the Oxlint JSON preset | Confirmed |
| Formatting | `worsier@3.10.1` with default settings | Confirmed |
| Markdown verification | `markdownlint-cli2@0.23.3`; preserve existing root and issue-template configuration | Confirmed; reviewed 87 new dev packages accepted |
| Unused code and dependency checks | `knip@6.42.0` as a required CI check | Confirmed; 13 new Linux x64 packages and all-platform inventory accepted |
| CI platform | GitHub Actions on standard GitHub-hosted Linux x64, explicit `ubuntu-26.04` label; GitHub Free account | Confirmed |

## Reasons and trade-offs

The owner selected GitHub-hosted Linux x64 over a self-hosted runner, then explicitly chose `ubuntu-26.04`. GitHub manages the runner's system updates; pin project tools separately. The owner confirmed GitHub Free: this private repository shares the account's 2,000 monthly minutes, with remaining usage unknown. Standard two-core Linux x64 overage currently costs $0.006/minute. See [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) and [runner image policy](https://github.com/actions/runner-images).

The owner authorized using suitable [personal automations](https://github.com/example-maintainer/automations). Reuse its `setup-pnpm` composite, which reads the chosen Node.js and pnpm versions from the project. #216 records its exact reviewed composition. Pinning the outer composite does not pin its nested major-version tags. The current pnpm Action uses a JavaScript pnpm 11.19.0 bootstrap; a disposable check under Node.js 26.12.0 successfully installed and verified pnpm 12.14.0. This checks the transition, not the complete Action. Use a Pantry-specific release workflow: the existing shared deploy workflow's PR/staging and master/production mapping does not match our accepted environments and migration ordering. No changes to the automations repository are required.

Generate Worker types before type-aware checks. [Technical debt](../technical-debt.md) records temporary integration settings. The experiment did not deploy to Cloudflare/Neon or execute GitHub Actions, and tested no other OS/architecture. Implementation tasks must verify hosted Hyperdrive, cold readiness, cloud diagnostics, migrations, preview lifecycle, and recovery. Auth (D2), recipe writes/deduplication (remaining D3), numeric rules, search, and media remain with their epics.
