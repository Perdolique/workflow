# Offline Codex release snapshot

All releases, feature names, and source extracts below are synthetic evaluation data. They are not facts about real Codex releases. Use these saved sources only; network retrieval is unavailable. The extracts are complete for the stated range.

## S1: Repository and installed state

The saved review date is 2030-06-15. The user runs the standalone CLI on Linux. The installed version is `codex-cli 0.700.0`. The tracked configuration below also supplies the active user configuration. No profiles, project overrides, launch overrides, or enforced requirements apply. One lower managed-default layer sets `features.shadow_override = false`. No other lower layer supplies the listed keys.

Saved `non-standard/codex/config.toml`:

```toml
model_verbosity = "medium"

[features]
native_search = true
session_cache = false
shadow_override = true
legacy_titles = true
undocumented_tools = true

[tui]
mouse_scroll_speed = 3
```

Saved `codex features list` output from the installed CLI reports `native_search stable true`, `session_cache stable false`, `shadow_override stable true`, and `undocumented_tools experimental true`. The saved CLI help supports `-c key=value` for one-run configuration overrides. No command has been run during this review.

## S2: Official release list and release entries

The verified tags are `rust-v0.700.0`, `rust-v0.701.0`, `rust-v0.702.0`, and `rust-v0.703.0-alpha.1`. Their publication dates are June 1, June 5, June 12, and June 14, 2030. Only the last tag is a prerelease.

Release `0.701.0` makes native search and the session cache stable and enabled by default. Native search uses the local index instead of the old per-query scan. The session cache stores local command results for reuse in the same session; disabling it preserves the old fresh-result behavior. This release also fixes cancellation of a resumed command: interrupting it now stops the child process instead of leaving it running.

Release `0.702.0` adds `windows_preview`, an experimental panel for inspecting Windows sandbox permissions. It adds an account-gated relay preview for remote sessions and a desktop app tray menu for reopening the last task. The tray menu is controlled by the app and has no standalone CLI toggle. This release also fixes wrapped terminal links losing their destinations.

Release `0.703.0-alpha.1` announces relay preview enabled by default for eligible accounts. It is outside the stable upgrade range.

## S3: Complete commit and changed-file inventory

The full `rust-v0.700.0...rust-v0.702.0` inventory contains these changes: native search and cache graduation, resumed-command cancellation, Windows preview, relay preview, desktop tray support, wrapped link repair, ignored legacy title flag, copy-link configuration, and a test-helper module rename. The last three changes are absent from the release summaries. There are no missing pages or omitted files.

Changed source areas are the feature registry, configuration parser and schema, configuration loader, search and cache consumers, command cancellation, Windows permission UI, relay session gating, desktop tray integration, terminal links, copy-link UI, and test helpers.

## S4: Pinned baseline and target registry, parser, and consumers

These facts are extracted from the registry, parser, and consumers at the two verified tags.

| Key | Default at 0.700.0 | Default at 0.702.0 | Target status and consumer |
| --- | --- | --- | --- |
| `features.native_search` | `false` | `true` | Stable, accepted, selects indexed local search |
| `features.session_cache` | `false` | `true` | Stable, accepted, enables local command-result reuse |
| `features.shadow_override` | `true` | `true` | Stable, accepted, enables the alternate preview display |
| `features.legacy_titles` | `false` | Ignored | Accepted only for compatibility; its consumer was removed |
| `features.undocumented_tools` | `false` | `false` | Experimental, accepted by the feature parser and registry; exposes local tool descriptions when true |
| `features.windows_preview` | Absent | `false` | Experimental, accepted; its only consumer is built for Windows |
| `features.relay_preview` | Absent | `false` | Experimental, accepted; remote relay consumer also requires account enrollment |

The target schema lists all these feature keys except `undocumented_tools`. The target parser reads feature keys through the registry, including `undocumented_tools`; its consumer checks the flag. All stated defaults are the same on Linux and Windows unless the consumer column says otherwise.

## S5: Pinned configuration loader and non-feature options

At both tags, the relevant loading order is built-in defaults, then managed defaults, then user configuration, then command-line overrides. A later layer wins for these scalar options. The current user configuration therefore overrides the managed `shadow_override = false` value. Removing the explicit user value would turn that feature off.

`model_verbosity = "medium"` is accepted at both tags. The built-in value is unset, which follows the selected model's default. This explicit value pins medium verbosity.

The target accepts `tui.mouse_scroll_speed` and defaults to `3`; the baseline defaults to `1`. Removing the explicit `3` preserves target scrolling but changes baseline scrolling.

The source-only `tui.copy_links` option is new in `0.702.0`, accepted by the target parser and schema, and defaults to `false`. Its consumer adds a Copy link action to terminal-link menus when true. The menu is available in the Linux CLI. Running the target with `codex -c 'tui.copy_links=true'` makes that action visible. Exiting that process undoes the override. This control is separate from the wrapped-link bug fix.

The relay preview requires both `features.relay_preview = true` and account enrollment. This account is not enrolled; the sources provide no self-service enrollment path. The relay sends command metadata, including the repository path, through the service. The snapshot states no pricing or general availability date.

The test-helper module rename changes imports in test files only. It adds no runtime behavior or configuration setting.

## S6: Later live documentation

The fetched live docs describe `0.703.0-alpha.1` behavior and say relay preview defaults to true for eligible accounts. They are not documentation pinned to the stable target. They do not change the pinned `0.702.0` registry facts above.
