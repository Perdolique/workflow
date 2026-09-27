---
name: repository-updater
description: Analyze repositories for available dependency, tooling, runtime, and infrastructure updates, aggregate changelogs across every version from the current version through each target, and report every direct candidate in structured Markdown with major-release highlights and repository-specific impact. Use for update discovery, dependency update analysis, release-impact and breaking-change review, or requests to update repository dependencies, tooling, runtimes, or infrastructure versions.
---

# Repository updater

Write the full report directly in the final chat response in both analysis and apply modes.

## Determine the request mode

- Use **analysis mode** by default. Requests to inspect, check, list, review, or otherwise discuss available updates do not authorize repository changes.
- Use **apply mode** only when the user explicitly asks to update, upgrade, install, apply, or make changes. Respect the requested packages, version ranges, ecosystems, and other limits.
- For mixed requests, analyze first and apply only the authorized candidates. Those version targets need no repeated approval. Resolve any material adaptation decision separately.

## Inspect the repository

- Identify the dependency, tooling, runtime, and infrastructure ecosystems in use. Follow the Node.js subsection when it applies.
- For unlisted ecosystems, choose an approach from repository evidence and established conventions. Ask a specific question whenever uncertainty about the requested task remains, including minor details. Treat explicit defaults and earlier answers as settled information, and continue independent analysis while awaiting a needed answer.

For every candidate, establish:

- the current and target versions
- why the target matches the repository's update policy and the user's conditions
- where and how the repository uses the affected package, runtime, tool, or infrastructure

### Node.js

When Node.js powers the application or tooling, inspect package update workflows in this order:

1. Update-related scripts.
2. Installed dependency updaters such as `taze`.

- Determine whether each candidate reports or applies updates before running it. In analysis mode, use a non-writing command. If no updater is available, use `vpx taze <mode> --json --include-locked` to report package updates without writing. Check `vpx taze --help` first and choose a supported mode matching the requested range; omit `<mode>` to respect declared ranges.

Inspect the repository's Taze configuration and package-manager release-age policy to understand the ordinary result, but always run the same non-writing Taze analysis twice with `--force`:

1. Omit `--maturity-period` to preserve the repository and Taze defaults.
2. Add `--maturity-period 0` to expose newly published versions that those defaults may hide.

- Do not skip either run based on configuration, package-manager defaults, help text, or an expectation that the results will match. Only the comparison establishes whether fresher candidates exist.
- Compare the results by package and target version. Treat the ordinary result as updates within repository policy. Treat a package as an additional newly published candidate when it appears only in the zero-maturity result or receives a newer target there. List the same package in both groups when the target versions differ so the safer and fresher choices remain explicit.
- The maturity override does not widen the requested version range. Use the same `<mode>` and other filters for both runs.
- If `.node-version` exists, compare its value with the official [Node.js release index](https://nodejs.org/dist/index.json). Follow the repository's Node release policy or the user's requested range. If the choice between LTS and Current remains unresolved, ask the user before choosing the target.

## Analyze release impact

Discovering the current and target versions is not a complete update analysis. For every direct update candidate:

1. Enumerate every released version after the current version through and including the target version.
2. Read the official release notes or changelog entries for that entire version range. Follow redirects and retrieve missing sections when a result is truncated. Do not inspect only the target release when intermediate versions exist.
3. Select the changes worth highlighting across the complete range according to their release significance and impact.
4. Combine the selected findings into one candidate-level list describing the difference between the current and target versions. Do not emit a version-by-version changelog dump.

- Research release impact only for direct candidates. Prefer upstream sources or local package changelogs over generic search results. For report-only requests, use the supplied findings and carry forward the coverage limits shown by that research.
- If source content remains unavailable, name the uncovered versions or topics and mark that part of the analysis as incomplete. Apply this to release notes, migration guides, and current documentation.
- For transitive changes, record only the package name, change type, and available old and new resolved versions from the lockfile. Skip changelog research and impact summaries.

Select changes using these priorities:

- For every major version crossed, include its headline public features and behavior changes even when the repository does not currently use them.
- For minor releases, include notable public capabilities and behavior or compatibility changes when they are important enough to affect the update decision; use repository relevance as a strong signal.
- For patch releases and individual bug fixes, include only material security, data-integrity, regression, stability, or compatibility fixes.
- Across every release type, include required migrations, relevant deprecations, and breaking changes that affect APIs, configuration, commands, runtimes, platforms, or behavior the repository actually uses.
- Keep general release highlights separate from repository impact. A headline breaking change does not always affect this repository.
- Verify any claimed repository impact against current files and usage. Under `Nuances`, name the affected area, expected impact, and required response for applicable breaking changes, migrations, required actions or decisions, and important limits.
- Exclude documentation-only changes, internal refactors, routine fixes, and other changelog noise from the final report. This importance filter applies to changelog details, not update candidates: report every direct candidate even when no change is worth highlighting across its complete version range.

## Evaluate update-driven adaptations

For every direct update:

1. Read official migration guides and current upstream documentation alongside release notes. Identify notable new features, flags, APIs, and supported approaches in the update range, including those the repository does not use yet.
2. Search the entire repository for affected usage, deprecated or replaced APIs, unnecessary compatibility code, and usage that an announced migration will soon make legacy. Compare the existing approach with what the update now supports.
3. Match promising capabilities to concrete repository needs or maintenance costs, even when existing checks pass. Verify the affected API or behavior against upstream evidence and local files. State the expected maintenance, performance, reliability, or development benefit, the affected code or configuration, and the integration or refactoring work.
4. Assess behavior changes, risk, and trade-offs. Treat a needed refactor as part of this assessment; its size informs the user decision below. An improvement can be useful even when it is not needed to complete the version update.

An adaptation is update-driven only when the target release removes, deprecates, supersedes, fixes, or newly enables the relevant behavior. Do not use an update to refactor unrelated parts of the stack.

- Keep required migrations under `Nuances` and apply them automatically in apply mode.

For non-required adaptations:

- Apply an adaptation automatically when repository and upstream evidence establish a concrete benefit, it preserves expected public behavior, it is low risk, and it has no meaningful trade-off.
- Before editing, ask the user when an adaptation changes public behavior, materially expands the requested work, has a meaningful trade-off, or has uncertain benefit. Explain the affected repository surface, why the update enables the change, the expected benefit, the downsides, and the recommended choice.
- If the user declines an adaptation, continue the version update and record the decision and remaining outdated usage.
- In analysis mode, report adaptations without applying them. In apply mode, resolve material adaptation decisions after analysis and before editing, then apply every automatic or approved adaptation across all causally affected usage and verification surfaces.
- If a selected adaptation hits a check failure or another obstacle, investigate it against the actual project requirements and resolve it within the authorized scope. If a material trade-off remains, explain the obstacle and ask for that decision. Track unfinished work separately from a user decline.

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

- Use the exact package, runtime, tool, or infrastructure name as the heading. Leave a blank line after the version line, then render the selected changes as top-level bullets. If no change is worth highlighting, render the single bullet `No material changes worth highlighting.`
- Add `Nuances` only when the candidate has an applicable breaking impact, migration, required action or decision, important limitation, or incomplete release-note coverage. In apply mode, distinguish completed actions from work that remains.
- Add `Adaptations` to every card after `Nuances`, or after the change bullets when `Nuances` is absent. Keep required migrations in `Nuances` only.
- In analysis mode, label entries `Recommended` or `Decision required`.
- In apply mode, use `Applied` for completed adaptations and `Declined` for adaptations the user declined. Describe unfinished work and its obstacle under `Nuances`; use `Decision required` when a user choice still blocks completion.
- Each entry describes a non-required update-driven change, its affected repository surface, and its concrete benefit. `Decision required` also states the downside and recommended choice. Report checks that unrelated files stayed unchanged with the verification results.
- When the reviewed opportunities yield no supported adaptation, use the single bullet `No applicable adaptations identified.` State any limits on that assessment under `Nuances`.
- Always finish each card with official source links covering the analyzed release range and supporting any reported adaptation.
- In the applied report, retain major-release highlights and any unresolved source-coverage limits from the analysis, alongside the completed actions and verification results.

## Report analysis

In analysis mode, do not modify files. Report the result in this form:

### Update analysis

**Mode:** `analysis-only`

#### Updates within repository policy

Render one direct update card for every candidate in the ordinary result.

#### Additional newly published updates

- Render one direct update card for every candidate added or changed by `--maturity-period 0`.
- A package belongs in both sections when the two runs produce different targets. If a section has no candidates, say `None`.

## Apply updates

1. Complete the same update, release-impact, and adaptation analysis before editing.
2. Resolve every material adaptation decision before editing.
3. Apply targets from the ordinary result unless the user explicitly requests newly published releases or accepts bypassing the maturity period; in that case, apply the matching targets from the zero-maturity result.
4. Apply required migrations and every automatic or user-approved adaptation across all causally affected usage.
5. Prefer the discovered repository workflow; otherwise use the ecosystem's standard update method.
6. Keep affected manifests, lockfiles, and version pins consistent.
7. After updating declared Node.js dependencies, run `vp update` to update transitive dependencies in the lockfile.
8. Run relevant repository checks after all update and adaptation steps.
9. Inspect the final diff and every lockfile change to confirm that every selected direct update and adaptation was applied, identify every transitive version that changed and every package resolution that was added or removed, and verify that the resulting manifest, lockfile, and version-pin changes are consistent.

Finish with this form:

### Applied updates

**Mode:** `applied`

#### Direct updates

Render one direct update card for every direct version that actually changed. Say `None` only when there are no direct updates.

#### Notable transitive changes

| Change | Package | Old version | New version |
| --- | --- | --- | --- |
| Major | `package` | `old version` | `new version` |

Derive the transitive list from resolved lockfile changes without a corresponding declaration change. Include only these changes:

- `Major`: stable SemVer replacements where the major version differs.
- `Added`: one row for every added package resolution.
- `Removed`: one row for every removed package resolution.

Omit all other transitive version replacements, including minor, patch, prerelease, and non-SemVer changes, without listing or counting them. Do not add changelog details, impact summaries, breaking-change notes, or sources. If no reportable transitive dependency changed, say `None` instead of rendering the table. Then report the verification commands and results, plus any explicitly requested update that could not be applied.
