---
name: github-release
description: Create or draft GitHub releases from existing tags and repository history. Use this whenever the user asks to publish a GitHub release, create release notes for a new version, mirror previous GitHub releases, release a tag/version, or says they have already released a new package version and need the matching GitHub release.
---

# GitHub release workflow

- Write release notes from verified changes and match the style of recent releases.
- A request to make a GitHub release includes checks, notes, and creation without separate confirmations. Honor explicit limits: return text for notes-only requests and create an unpublished GitHub draft for a draft-release request.
- Ask when a required fact or decision remains unclear after checking context.

## Required checks

Start by verifying the release target:

```sh
git status --short --branch
gh repo view --json nameWithOwner -q .nameWithOwner
git fetch --tags origin
git tag --list '<target-tag>'
git ls-remote --tags origin '<target-tag>'
```

If the project has a machine-readable version file, inspect it too. Examples:

```sh
node -p "require('./package.json').version"
cargo metadata --no-deps --format-version 1
```

- If the working tree is dirty, do not edit or commit anything as part of release creation unless the user explicitly asks for that separate work. A GitHub release should normally be created from an existing tag.
- If the project version is `1.2.3`, the release tag is usually `v1.2.3`, but verify the repository's existing tag naming convention before assuming the `v` prefix.
- After checking the repository's tag convention, use the verified tag name as `<target-tag>` in later commands. Stop and ask the user before publishing if the target tag does not exist on the remote.

## Inspect existing GitHub releases

Before drafting or creating a release, inspect existing GitHub releases. Identify the latest stable release, prerelease naming patterns, and any release for the target tag.
Read the release list once in JSON. Reuse it to check which releases are latest, drafts, or prereleases:

```sh
gh release list --limit 20 \
  --json tagName,name,isDraft,isPrerelease,isLatest,publishedAt
```

- Use an explicit comparison base supplied by the user. Otherwise, choose the predecessor from the target's tag history and release line. Read more history if the first page does not establish it.
- Decide separately whether the target should become latest. Check version order and the project's active release line. Resolve unclear release-line choices before publication.

For example, when adding a missing v1.5 release after v2.0 exists, compare v1.5 with its own predecessor. Keep v2.0 as latest unless the user or an established release policy says otherwise.

## Inspect previous releases

Read at least the latest two stable releases before drafting notes:

```sh
gh release view <latest-tag> --json tagName,name,isDraft,isPrerelease,publishedAt,targetCommitish,body
gh release view <previous-tag> --json tagName,name,isDraft,isPrerelease,publishedAt,targetCommitish,body
```

- Use their structure as guidance, but do not copy text blindly. Common release note shapes include:
  - `## What's Changed`
  - `## Summary`, `## Added ...`, `## Dependency updates`, `## Notes`
- Prefer the simpler shape that fits the actual diff. Include only sections with concrete content.
- If the repository has fewer than two stable releases, inspect every stable release that exists. For a first release with no predecessor, inspect the target tree and history including the initial commit. Use an explicit comparison base or `--notes-start-tag` when the repository provides one.

## Gather release facts

Compare the verified predecessor tag to the target tag:

```sh
git log --oneline <previous-tag>..<target-tag>
git diff --stat <previous-tag>..<target-tag>
repo=$(gh repo view --json nameWithOwner -q .nameWithOwner)
gh api "repos/$repo/compare/<previous-tag>...<target-tag>" \
  --jq '{files: [.files[] | {filename, status}], commits: [.commits[] | {sha: .sha[0:7], message: .commit.message}]}'
```

- Use the compare output, commits, and changed files as the source of truth.
- Do not invent motivations, breaking changes, migration notes, or dependency changes. Only include them when the diff, commit body, package files, or previous conversation clearly supports them.

## Dependency updates

When dependency manifests or lockfiles change between tags, list dependency updates explicitly when the old and new versions are clear. Include both old and new versions.

Use this format:

```md
## Dependency updates

- `package-name`: `old-version` -> `new-version`
```

Include package manager changes too:

```md
- `packageManager`: `npm@old` -> `npm@new`
```

Do not replace the package list with vague wording like "updated dependencies".

## Release notes style

Use English for release titles and release notes.

Keep release notes concise and concrete:

```md
## What's Changed

- Added the new release-facing feature or configuration change.
- Updated related tests, fixtures, or documentation that verify the change.
- Removed or replaced outdated behavior when the diff clearly shows it.

## Dependency updates

- `package-name`: `old-version` -> `new-version`

**Full Changelog**: https://github.com/<owner>/<repo>/compare/<previous-tag>...<target-tag>
```

- Describe only substantive changes between the compared tags. Even if previous releases contain one, do not add a bullet whose only information is the project, package, or workspace version bump represented by the release tag; the title and tag already identify the version.
- Use nested bullets inside generated release notes when they make the GitHub release easier to read.

## Create the release

- Create the requested release only from the verified remote tag when no release already exists.
- For an explicit draft request, use the command below with `--draft`, omit the latest flags, and keep the result unpublished. Add `--prerelease` too when the target is a prerelease.

For a published stable release selected to become latest:

```sh
gh release create <target-tag> \
  --title <target-tag> \
  --notes-file <notes-file> \
  --latest \
  --verify-tag
```

For an older or separate-line stable release that should leave the current latest unchanged, use `--latest=false` in place of `--latest`.

Create a prerelease only when the tag itself is a prerelease version such as `v1.2.0-beta.1`, or when the user explicitly asks for a prerelease:

```sh
gh release create <target-tag> \
  --title <target-tag> \
  --notes-file <notes-file> \
  --prerelease \
  --verify-tag
```

- Use a temporary notes file and remove it after the command finishes.
- Avoid shell variable names that can be read-only in `zsh`, such as `status`. Use names like `release_rc` if command status needs to be preserved.

## Verify the result

After creating the release, verify it:

```sh
gh release view <target-tag> --json url,name,tagName,isDraft,isPrerelease,publishedAt
```

- For a draft, verify `isDraft: true` and report the draft URL and tag. For a published release, verify `isDraft: false` and the intended stable or prerelease state.
- For a published release, read the latest stable tag with `gh release view --json tagName -q .tagName` and check the intended latest state. A prerelease-only repository may have no latest stable release. `isLatest` is available in `gh release list`, not `gh release view` JSON.
- Report the URL, tag, and draft, stable/latest, or prerelease state.

## If a release already exists

If `gh release create` fails because the release already exists, inspect it:

```sh
gh release view <target-tag> --json url,name,tagName,isDraft,isPrerelease,body
```

Then tell the user it already exists and summarize whether it matches the target version. Do not overwrite release notes unless the user asks to update them.
