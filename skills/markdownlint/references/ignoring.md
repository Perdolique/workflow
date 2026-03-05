# Updating ignore patterns

Use when user wants to exclude specific files or directories from linting.

**Note:** This guide uses `pnpm` in examples. Replace with your project's package manager (npm/yarn/bun).

## Adding ignore patterns

Common scenarios:

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
.github/
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

2. To verify a specific file is ignored, add `--verbose` flag (requires updating npm script):

   ```json
   "lint:markdown:debug": "markdownlint '**/*.md' --verbose"
   ```
