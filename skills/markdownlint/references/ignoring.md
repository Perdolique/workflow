# Updating ignore patterns

Use when the user wants to exclude specific files or directories from linting.

## Adding ignore patterns

Use patterns for content that the project treats as generated, external, or outside the requested lint scope. Confirm that the files match that purpose before adding a broad pattern.

**Ignore generated documentation:**

```gitignore
# Add to .markdownlintignore
dist/
build/
docs/api/
```

**Ignore auto-generated files:**

```gitignore
CHANGELOG.md
*.auto.md
**/*generated*.md
```

**Ignore vendor/external content:**

```gitignore
vendor/
third-party/
node_modules/
```

**Ignore specific files:**

```gitignore
README-old.md
docs/archive/legacy.md
```

## Pattern syntax

`.markdownlintignore` uses gitignore-style patterns:

- `file.md` - Specific file in any directory
- `dir/` - Entire directory recursively
- `*.log` - Any file matching pattern
- `**/vendor/**` - Vendor directory anywhere in tree
- `!important.md` - Exception (don't ignore this)

## Verifying ignore patterns

After updating `.markdownlintignore`:

1. Run linting to see if files are still checked:

   ```bash
   pnpm run lint:markdown
   ```

2. For a file with known violations, compare the normal result with an empty ignore file. On Unix:

   ```bash
   vpx markdownlint docs/generated.md
   vpx markdownlint docs/generated.md --ignore-path /dev/null
   ```

   The second command uses an empty ignore file instead of `.markdownlintignore` and should report those violations. A successful check of a clean file alone does not prove it was ignored.

Use `--dot` when the requested lint scope includes hidden directories such as `.github`.
