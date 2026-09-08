---
name: repository-updater
description: Analyze repositories for available dependency, tooling, runtime, and infrastructure updates, aggregate changelogs across every version from the current version through each target, and report every direct candidate in structured Markdown with major-release highlights and repository-specific impact. Use for update discovery, dependency update analysis, release-impact and breaking-change review, or requests to update repository dependencies, tooling, runtimes, or infrastructure versions.
---

# Repository updater

## Determine the request mode

Use **analysis mode** by default. Requests to inspect, check, list, review, or otherwise discuss available updates do not authorize repository changes.

Use **apply mode** only when the user explicitly asks to update, upgrade, install, apply, or make the changes. Respect any requested package, version range, ecosystem, or other scope condition. For mixed requests, analyze first and then apply only the explicitly authorized candidates without asking for approval of those version targets a second time. This does not waive a material adaptation decision.

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
3. Select the changes worth highlighting across the complete range according to their release significance and impact.
4. Combine the selected findings into one candidate-level list describing the difference between the current and target versions. Do not emit a version-by-version changelog dump.

Apply this release-impact research only to direct update candidates. For transitive dependency changes, capture only the package name and old and new resolved versions from the lockfile; do not research changelogs or summarize their impact. Prefer exact upstream sources or local package changelogs over generic search results. If official notes for part of a direct candidate's version range cannot be found, identify the uncovered versions and report the analysis as incomplete instead of implying that the target-only notes cover the whole update.

Select changes using these priorities:

- For every major version crossed, include its headline public features and behavior changes even when the repository does not currently use them.
- For minor releases, include notable public capabilities and behavior or compatibility changes when they are important enough to affect the update decision; use repository relevance as a strong signal.
- For patch releases and individual bug fixes, include only material security, data-integrity, regression, stability, or compatibility fixes.
- Across every release type, include required migrations, relevant deprecations, and breaking changes that affect APIs, configuration, commands, runtimes, platforms, or behavior the repository actually uses.

Keep general release highlights distinct from repository impact. A major-release breaking change may appear as a headline change without implying that it affects the repository. When a change creates an applicable breaking impact, migration, required action or decision, or important limitation, verify it against the repository's current files and usage, then state the affected surface, expected impact, and required response under `Nuances`.

Exclude documentation-only changes, internal refactors, routine fixes, and other changelog noise from the final report. This importance filter applies to changelog details, not update candidates: report every direct candidate even when no change is worth highlighting across its complete version range.

## Evaluate update-driven adaptations

Treat every direct update as an opportunity to leave its causally affected repository usage on the current supported approach, not only to make the new version pass. Review official migration guides and current upstream documentation in addition to the release notes, then inspect the entire repository for:

- deprecated, legacy, or superseded APIs and configuration
- compatibility code and workarounds made unnecessary by the target release
- newly available capabilities with a concrete repository-specific maintenance, performance, reliability, or developer-experience benefit
- usage that an announced upstream migration has placed on a near-term legacy path

An adaptation is update-driven only when the target release removes, deprecates, supersedes, fixes, or newly enables the relevant behavior. Do not use an update to refactor unrelated parts of the stack.

Keep required migrations under `Nuances` and apply them automatically in apply mode. For non-required adaptations:

- Apply an adaptation automatically when repository and upstream evidence establish a concrete benefit, it preserves expected public behavior, it is low risk, and it has no meaningful trade-off.
- Before editing, ask the user when an adaptation changes public behavior, materially expands the requested work, has a meaningful trade-off, or has uncertain benefit. Explain the affected repository surface, why the update enables the change, the expected benefit, the downsides, and the recommended choice.
- If the user declines an adaptation, continue the version update and record the decision and remaining outdated usage.

In analysis mode, report adaptations without applying them. In apply mode, resolve material adaptation decisions after analysis and before editing, then apply every automatic or approved adaptation across all causally affected usage and verification surfaces.

## Format direct update cards

Use this card for every direct candidate in both analysis and apply modes:

```markdown
##### `package-or-tool`

**Version:** `current` → `target`

- First material change.
- Second material change.

**Nuances:**

- Repository-specific migration, required action, or important limitation.
- Incomplete release-note coverage when applicable.

**Adaptations:**

- **Recommended:** Repository-specific modernization and its concrete benefit.
- **Decision required:** Affected surface, expected benefit, downside, and recommended choice.

**Sources:** [Official release notes](...), [Official changelog](...)
```

Use the exact package, runtime, tool, or infrastructure name as the heading. Leave a blank line after the version line, then render the selected changes as top-level bullets. If no change is worth highlighting, render the single bullet `No material changes worth highlighting.`

Add `Nuances` only when the candidate has an applicable breaking impact, migration, required action or decision, important limitation, or incomplete release-note coverage. In apply mode, distinguish completed actions from work that remains.

Add `Adaptations` to every card after `Nuances` when it is present and otherwise after the change bullets. Do not duplicate required migrations from `Nuances`. In analysis mode, label applicable entries `Recommended` or `Decision required`. In apply mode, label them `Applied` or `Declined`; use `Decision required` only when the task remains incomplete pending a user choice. Each entry must identify the affected repository surface and concrete benefit. A `Decision required` entry must also state its downside and the recommended choice. Do not list unchanged unrelated surfaces as adaptations. When no non-required update-driven adaptation applies, render the single bullet `No applicable adaptations identified.`

Always finish each card with official source links covering the analyzed release range and supporting any reported adaptation.

## Report analysis

In analysis mode, do not modify files. Report the result in this form:

### Update analysis

**Mode:** `analysis-only`

#### Updates within repository policy

Render one direct update card for every candidate in the ordinary result.

#### Additional newly published updates

Render one direct update card for every candidate added or changed by `--maturity-period 0`.

A package belongs in both sections when the two runs produce different targets. If a section has no candidates, say `None`.

## Apply updates

1. Complete the same update, release-impact, and adaptation analysis before editing.
2. Resolve every material adaptation decision before editing.
3. Apply targets from the ordinary result unless the user explicitly requests newly published releases or accepts bypassing the maturity period; in that case, apply the matching targets from the zero-maturity result.
4. Apply required migrations and every automatic or user-approved adaptation across all causally affected usage.
5. Prefer the discovered repository workflow; otherwise use the ecosystem's standard update method.
6. Keep affected manifests, lockfiles, and version pins consistent.
7. After updating declared Node.js dependencies, run `vp update` to update transitive dependencies in the lockfile.
8. Run relevant repository checks after all update and adaptation steps.
9. Inspect the final diff and lockfile changes to confirm that every selected direct update and adaptation was applied, identify every transitive package version that changed, and verify that the resulting manifest, lockfile, and version-pin changes are consistent.

Finish with this form:

### Applied updates

**Mode:** `applied`

#### Direct updates

Render one direct update card for every direct version that actually changed. Say `None` only when there are no direct updates.

#### Transitive updates

| Package | Old version | New version |
| --- | --- | --- |
| `package` | `old version` | `new version` |

Derive the transitive list from resolved lockfile changes without a corresponding declaration change. Include one row for every distinct transitive version change. Do not add changelog details, impact summaries, breaking-change notes, or sources. If no transitive dependency changed, say `None` instead of rendering the table. Then report the verification commands and results, plus any explicitly requested update that could not be applied.
