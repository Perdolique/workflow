---
name: github-release
description: Create or draft GitHub releases from existing tags and repository history. Use this whenever the user asks to publish a GitHub release, create release notes for a new version, mirror previous GitHub releases, release a tag/version, or says they have already released a new package version and need the matching GitHub release.
---

# GitHub release workflow

Use this skill to create GitHub releases from existing tags and repository history.

The goal is to publish release notes that match the style of recent releases while staying grounded in verified changes.

## Required checks

Start by verifying the release target:

```sh
git status --short --branch
gh repo view --json nameWithOwner -q .nameWithOwner
git fetch --tags origin
git tag --list '<target-tag>'
git ls-remote --tags origin '<target-tag>'
gh release list --limit 20
```

If the project has a machine-readable version file, inspect it too. Examples:

```sh
node -p "require('./package.json').version"
cargo metadata --no-deps --format-version 1
```

If the working tree is dirty, do not edit or commit anything as part of release creation unless the user explicitly asks for that separate work. A GitHub release should normally be created from an existing tag.

If the project version is `1.2.3`, the release tag is usually `v1.2.3`, but verify the repository's existing tag naming convention before assuming the `v` prefix.

After checking the repository's tag convention, use the verified tag name as `<target-tag>` in later commands. Stop and ask the user before publishing if the target tag does not exist on the remote.

## Inspect existing GitHub releases

Always inspect the releases already published on GitHub before drafting or creating a new release. This is useful because it reveals:

- the latest stable release
- prerelease naming patterns
- whether the target tag already has a GitHub release
- whether recent releases are marked as latest, draft, or prerelease
- the note structure users already expect in that repository

Use the table view for a quick human scan:

```sh
gh release list --limit 20
```

Use JSON when you need reliable fields for reasoning:

```sh
gh release list --limit 20 \
  --json tagName,name,isDraft,isPrerelease,isLatest,publishedAt
```

Treat the latest non-draft, non-prerelease release as the default previous stable release for changelog comparisons unless the user gives a different base tag.

## Inspect previous releases

Read at least the latest two stable releases before drafting notes:

```sh
gh release view <latest-tag> --json tagName,name,isDraft,isPrerelease,publishedAt,targetCommitish,body
gh release view <previous-tag> --json tagName,name,isDraft,isPrerelease,publishedAt,targetCommitish,body
```

Use their structure as guidance, but do not copy text blindly. Common release note shapes include:

- `## What's Changed`
- `## Summary`, `## Added ...`, `## Dependency updates`, `## Notes`

Prefer the simpler shape that fits the actual diff. Include only sections with concrete content.

If the repository has fewer than two stable releases, inspect every stable release that exists. If there is no previous stable release, compare the target tag against the first commit or use `gh release create --generate-notes --notes-start-tag <base-tag>` only when the repository has an explicit base tag.

## Gather release facts

Compare the previous stable tag to the target tag:

```sh
git log --oneline <previous-tag>..<target-tag>
git diff --stat <previous-tag>..<target-tag>
repo=$(gh repo view --json nameWithOwner -q .nameWithOwner)
gh api "repos/$repo/compare/<previous-tag>...<target-tag>" \
  --jq '{files: [.files[] | {filename, status}], commits: [.commits[] | {sha: .sha[0:7], message: .commit.message}]}'
```

Use the compare output, commits, and changed files as the source of truth.

Do not invent motivations, breaking changes, migration notes, or dependency changes. Only include them when the diff, commit body, package files, or previous conversation clearly supports them.

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

Use nested bullets inside generated release notes when they make the GitHub release easier to read.

## Create the release

If the remote tag exists and no release exists yet, create a stable release:

```sh
gh release create <target-tag> \
  --title <target-tag> \
  --notes-file <notes-file> \
  --latest \
  --verify-tag
```

Create a prerelease only when the tag itself is a prerelease version such as `v1.2.0-beta.1`, or when the user explicitly asks for a prerelease:

```sh
gh release create <target-tag> \
  --title <target-tag> \
  --notes-file <notes-file> \
  --prerelease \
  --verify-tag
```

Use a temporary notes file and remove it after the command finishes.

Avoid shell variable names that can be read-only in `zsh`, such as `status`. Use names like `release_rc` if command status needs to be preserved.

## Verify after publishing

After creating the release, verify it:

```sh
gh release view <target-tag> --json url,name,tagName,isDraft,isPrerelease,isLatest,publishedAt
```

Report the release URL, tag, and whether it is stable/latest or prerelease.

## If a release already exists

If `gh release create` fails because the release already exists, inspect it:

```sh
gh release view <target-tag> --json url,name,tagName,isDraft,isPrerelease,isLatest,body
```

Then tell the user it already exists and summarize whether it matches the target version. Do not overwrite release notes unless the user asks to update them.
