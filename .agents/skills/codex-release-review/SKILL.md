---
name: codex-release-review
description: Review Codex CLI releases in depth and audit this repository's Codex configuration. Use for Codex changelog analysis, version comparisons, source diffs, redundant flags, changed defaults, and new experimental features. General dependency updates and unrelated OpenAI questions use their own workflows.
---

# Codex release review

Explain what changed in Codex CLI and what it means for this repository's configuration and daily use. Give the full report in the final chat response. Treat upgrading Codex as the user's settled choice; do not recommend whether or when to upgrade. Focus recommendations on configuration and feature use. Edit configuration or install a version only when the user requests that action.

## Establish the comparison

1. Read the repository instructions and its Codex setup in the README. Start the configuration audit at `non-standard/codex/config.toml`. Inspect related rules, agent instructions, hooks, or custom approval policies when a release change affects them.
2. Record the review date and the installed CLI version, if available. Identify the tracked configuration, any project overrides, and the active configuration used for local checks. A tracked template and an active user configuration may differ.
3. Honor a named target version or release channel. Otherwise, resolve the latest stable CLI release from the official upstream release list; check its tag, publication date, and prerelease status.
4. Honor a named baseline. For an upgrade analysis, use the installed version when it is known and older than the target. For a review of one release, use its previous release in the same channel. If the request leaves the baseline open, use the previous stable release and state that choice. Ask when the available evidence cannot resolve the intended range.
5. Verify both upstream tags or commit IDs. List every release after the baseline through the target, including intermediate releases in the requested channel. Keep the installed version separate when it differs from this comparison.

## Research the complete release range

Use official OpenAI documentation and the [openai/codex repository](https://github.com/openai/codex) as primary sources. Open the actual pages or files. Search snippets and release titles are discovery aids.

1. Read the official changelog and every release entry in the range. Follow linked pull requests when they clarify a change, its limits, or its purpose.
2. Inspect the complete commit list and changed-file list between the verified refs. Retrieve later pages and truncated content. Look for changes missing from the release summary, especially configuration, feature flags, defaults, CLI commands, and user-visible behavior.
3. Read the relevant source diff and the target files. For configuration claims, trace the setting from its accepted key through defaults and loading rules to the code that uses it. Inspect related tests when they explain conditions or edge cases.
4. Compare the feature registry and configuration schema at both refs. Include new, renamed, removed, ignored, or deprecated keys, changed defaults, maturity changes, and changes to profiles or configuration precedence. A schema may omit an internal flag; check its parser, registry, and consumer before deciding whether it is accepted or useful.
5. Use current documentation for explanations, then verify version-specific behavior against the pinned release source. Resolve conflicts explicitly; documentation for a later version and code on `main` do not establish behavior in the target release.

Cover every release-note entry and every additional user-facing change found in the diff. Explain bug fixes and features even when they do not affect the current setup. Group related build, test, dependency, documentation, and internal refactor changes by purpose and explain their practical effect. Keep individual user-facing capabilities visible within those groups.

When source retrieval is incomplete, name the missing releases, files, or diff pages. Continue supported analysis and keep affected conclusions open.

## Audit the repository configuration

Inventory the explicit options in the tracked configuration, including nested feature tables, profiles, agent settings, and non-feature settings. Compare them with the target version. Group unchanged options only when their purpose and recommendation stay clear.

For each option or group, establish:

- Its configured value and purpose.
- Its accepted key and status in the target: supported, renamed, deprecated, removed, accepted but ignored, or unknown.
- Its target default and any change from the baseline. Note platform, provider, model, account, build, or server conditions when they affect that default.
- Relevant lower and higher configuration layers, selected profiles, command-line overrides, and managed requirements.
- The recommended action: **keep**, **remove**, **migrate**, or **unresolved**, with the behavior after that action and supporting evidence.

Treat equality with a built-in default as a removal candidate. Verify what value would take effect after deleting the explicit setting. Another configuration layer may supply a different value, and an explicit value may be an intentional pin for other versions. Preserve explicit opt-outs when the feature now defaults to enabled. Distinguish a deprecated alias from a removed setting and from a compatibility key that is accepted but ignored.

Use `codex features list` as evidence of the installed CLI's effective state and maturity labels. Check its help when needed. Establish built-in defaults from pinned source or a controlled configuration environment; effective state alone cannot prove them. The installed CLI may be older than the target and unable to validate new keys.

Provide a minimal proposed TOML snippet or diff for each concrete cleanup or migration. Explain any change in behavior, compatibility, or future reliance on defaults. If acceptance or behavior cannot be verified, describe the uncertainty instead of presenting a speculative edit as ready to apply.

## Explain features and experiments

For each new or changed user-facing capability, including one the user should skip for now, explain:

1. What it does, why it exists, and how it differs from the baseline.
2. Who can use it: release and maturity, supported platforms and surfaces, required models or providers, account access, and server-side gates where relevant.
3. Its state in this setup: already active, available to try, unavailable here, internal only, or unverified. Connect that verdict to the local configuration and source evidence.
4. How to use it, with the exact supported command or configuration key when one exists. For internal or server-controlled behavior, explain the control and the evidence needed to establish access.
5. Its expected benefit, material limitations, and relevant costs, privacy effects, or permission changes. Explain why it is useful here or why it is not a useful experiment now.

For an available experiment, give a small trial, an observable result, and a way to undo it. Prefer a supported one-run override when that is enough. A local flag does not by itself prove account access or a completed server rollout. Verify dependencies and the activation path before proposing a runnable command.

## Deliver the report

Lead with the comparison, installed version, configuration files reviewed, and the main practical conclusions. Then include:

- **Release details:** explain the changes across the complete range, including low-relevance capabilities and grouped maintenance work. Link each substantive claim to its release entry, pull request, or pinned source.
- **Configuration audit:** show configured values, target defaults or status, recommended actions, and reasons. Distinguish removal that preserves current behavior from migration that changes it. Include the proposed snippets or diffs alongside the relevant rows.
- **Experiments and other opportunities:** give the detailed explanations and trial plans above, with a clear recommendation for each capability. Cross-reference a release explanation instead of repeating it.
- **Coverage and verification:** list the releases and source areas actually reviewed, local commands and their outcomes, unavailable evidence, and conclusions that remain uncertain. State when the source review supports a recommendation but no target-version runtime check was possible.

Keep the full coverage and explanations even when the result is to leave the configuration unchanged. If the user also requests edits, apply only the authorized changes, follow the repository's configuration validation rules, and report the final diff and checks.
