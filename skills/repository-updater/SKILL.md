---
name: repository-updater
description: Analyze repositories for available dependency, tooling, runtime, and infrastructure updates, aggregate changelogs across every version from the current version through each target, and summarize every direct candidate's most important repository-relevant changes. Use for update discovery, dependency update analysis, release-impact and breaking-change review, or requests to update repository dependencies, tooling, runtimes, or infrastructure versions.
---

# Repository updater

## Determine the request mode

Use **analysis mode** by default. Requests to inspect, check, list, review, or otherwise discuss available updates do not authorize repository changes.

Use **apply mode** only when the user explicitly asks to update, upgrade, install, apply, or make the changes. Respect any requested package, version range, ecosystem, or other scope condition. For mixed requests, analyze first and then apply only the explicitly authorized candidates without asking for approval a second time.

## Inspect the repository

Identify the dependency, tooling, runtime, and infrastructure ecosystems in use and follow each matching subsection. Covered ecosystems:

- Node.js

For unlisted ecosystems, choose an evidence-based approach. Ask only when ambiguity materially changes the result or risk.

For every candidate, establish:

- the current and target versions
- why the target matches the repository's update policy and the user's conditions
- where and how the repository uses the affected package, runtime, tool, or infrastructure

### Node.js

When Node.js powers the application or tooling, inspect package update workflows in this order:

1. Update-related scripts.
2. Installed dependency updaters such as `taze`.

Determine whether each candidate reports or applies updates before running it. In analysis mode, use a non-writing command. If no updater is available, use `vpx taze <mode> --json --include-locked` to report package updates without writing. Check `vpx taze --help` first and choose a supported mode matching the requested range; omit `<mode>` to respect declared ranges.

Inspect the repository's Taze configuration and package-manager release-age policy to understand the ordinary result, but always run the same non-writing Taze analysis twice with `--force`:

1. Omit `--maturity-period` to preserve the repository and Taze defaults.
2. Add `--maturity-period 0` to expose newly published versions that those defaults may hide.

Do not skip either run based on configuration, package-manager defaults, help text, or an expectation that the results will match. Only the comparison establishes whether fresher candidates exist.

Compare the results by package and target version. Treat the ordinary result as updates within repository policy. Treat a package as an additional newly published candidate when it appears only in the zero-maturity result or receives a newer target there. List the same package in both groups when the target versions differ so the safer and fresher choices remain explicit.

The maturity override does not widen the requested version range. Use the same `<mode>` and other filters for both runs.

If `.node-version` exists, compare its value with the official [Node.js release index](https://nodejs.org/dist/index.json). Follow the repository's Node release policy or the user's requested range; ask only when choosing between LTS and Current materially changes the result.

## Analyze release impact

Discovering the current and target versions is not a complete update analysis. For every direct update candidate:

1. Enumerate every released version after the current version through and including the target version.
2. Review the official release notes or changelog entries for that entire version range. Do not inspect only the target release when intermediate versions exist.
3. Combine the material findings from all covered versions into one candidate-level summary of the difference between the current and target versions. Do not emit a version-by-version changelog dump.
4. Confirm that the summary includes the most important repository-relevant changes from the complete range before reporting the candidate.

Apply this release-impact research only to direct update candidates. For transitive dependency changes, capture only the package name and old and new resolved versions from the lockfile; do not research changelogs or summarize their impact. Prefer exact upstream sources or local package changelogs over generic search results. If official notes for part of a direct candidate's version range cannot be found, identify the uncovered versions and report the analysis as incomplete instead of implying that the target-only notes cover the whole update.

Summarize only the most important changes for this repository:

- breaking changes that affect APIs, configuration, commands, runtimes, platforms, or behavior the repository actually uses
- required migrations and relevant deprecations
- material security, behavior, stability, or compatibility changes
- notable features that the repository can directly use or benefit from

Do not report a breaking change merely because upstream labels it as breaking. Verify it against the repository's current files and usage. For each applicable breaking change, state the affected repository surface, the expected impact, and the required migration or decision. Omit breaking changes that do not apply to this repository.

Exclude minor bug fixes, documentation changes, internal refactors, and other changelog noise from the final summary. This importance filter applies to changelog details, not update candidates: report every direct candidate even when no material repository-relevant change is established across its complete version range. In that case, say `No material repository-relevant changes` instead of omitting the candidate or inventing importance.

## Report analysis

In analysis mode, do not modify files. Report the result in this form:

### Update analysis

**Mode:** `analysis-only`

#### Updates within repository policy

- `package: current version → target version` — concise summary of the most important repository-relevant changes.
  - `Breaking impact:` affected surface, impact, and required action. Include this only when an applicable breaking change exists.
  - `Sources:` official release-note or changelog links.

#### Additional newly published updates

- `package: current version → fresh target version` — concise summary of the most important repository-relevant changes.
  - `Breaking impact:` affected surface, impact, and required action. Include this only when an applicable breaking change exists.
  - `Sources:` official release-note or changelog links.

Populate the second section only with candidates added or changed by `--maturity-period 0`. A package belongs in both sections when the two runs produce different targets. Include every direct candidate in the applicable section and give each one a summary, using `No material repository-relevant changes` when the importance filter removes all changelog details. Keep every summary short and omit details that do not materially affect the update decision. If a section has no candidates, say `None`.

## Apply updates

1. Complete the same update and release-impact analysis before editing.
2. Apply targets from the ordinary result unless the user explicitly requests newly published releases or accepts bypassing the maturity period; in that case, apply the matching targets from the zero-maturity result.
3. Prefer the discovered repository workflow; otherwise use the ecosystem's standard update method.
4. Keep affected manifests, lockfiles, and version pins consistent.
5. After updating declared Node.js dependencies, run `vp update` to update transitive dependencies in the lockfile.
6. Run relevant repository checks after all update steps.
7. Inspect the final diff and lockfile changes to confirm that every selected direct update was applied, identify every transitive package version that changed, and verify that the resulting manifest, lockfile, and version-pin changes are consistent.

Finish with this form:

### Applied updates

**Mode:** `applied`

#### Direct updates

- `package: old version → new version` — concise summary of the most important repository-relevant changes.
  - `Breaking impact:` affected surface, impact, and completed or still-required action. Include this only when an applicable breaking change exists.

Use one top-level bullet for every direct version that actually changed and give each one a summary, using `No material repository-relevant changes` when the importance filter removes all changelog details. Say `None` only when there are no direct updates. Keep summaries focused on material changes.

#### Transitive updates

| Package | Old version | New version |
| --- | --- | --- |
| `package` | `old version` | `new version` |

Derive the transitive list from resolved lockfile changes without a corresponding declaration change. Include one row for every distinct transitive version change. Do not add changelog details, impact summaries, breaking-change notes, or sources. If no transitive dependency changed, say `None` instead of rendering the table. Then report the verification commands and results, plus any explicitly requested update that could not be applied.
