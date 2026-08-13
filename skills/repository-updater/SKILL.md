---
name: repository-updater
description: Inspect repositories for available dependency, tooling, runtime, and infrastructure updates, explain release changes, and apply requested updates. Use for repository update discovery or any request to update dependencies, tooling, runtimes, or infrastructure versions.
---

# Repository updater

## Determine the request mode

Treat requests to inspect or list updates as discovery and make no changes. Treat requests to update as apply and change only the explicitly authorized scope. For mixed requests, discover first, then apply only authorized candidates.

## Discover updates

Identify all ecosystems in use and follow each matching subsection. Covered ecosystems:

- Node.js

For unlisted ecosystems, choose an evidence-based approach. Ask only when ambiguity materially changes the result or risk.

Report each candidate with its current version, target version, and evidence source.

### Node.js

When Node.js powers the application or tooling, inspect package update workflows in this order:

1. Update-related scripts.
2. Installed dependency updaters such as `taze`.

Determine whether each candidate reports or applies updates before running it. If none is available, use `vpx taze <mode> --json --include-locked` to report package updates without writing. Check `vpx taze --help` first and choose a supported mode matching the requested range; omit `<mode>` to respect declared ranges.

If `.node-version` exists, compare its value with the official [Node.js release index](https://nodejs.org/dist/index.json). Follow the repository's Node release policy or the user's requested range; ask only when choosing between LTS and Current materially changes the result.

## Research release changes

When the user asks what an update contains, review official release notes for every version between the current and target versions. Summarize breaking changes, migrations, deprecations, and relevant fixes.

## Apply updates

- Prefer the discovered repository workflow; otherwise use the ecosystem's standard update method. Keep affected manifests, lockfiles, and version pins consistent.
- After updating declared Node.js dependencies, run `vp update` to update transitive dependencies in the lockfile.
- Run relevant repository checks after all update steps.
- Report every updated direct and transitive package as a bullet in the form `package: old version → new version`.
