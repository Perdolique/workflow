# Fixing violations

Use when the user has markdownlint errors and wants to fix them.

## Understanding error messages

Markdownlint errors follow this format:

```text
path/to/file.md:15 MD009/no-trailing-spaces Trailing spaces [Expected: 0, Actual: 2]
```

Breaking it down:

- `path/to/file.md` - File with issue
- `:15` - Line number
- `MD009` - Rule code
- `no-trailing-spaces` - Rule name
- Description and details

## Auto-fixing violations

Many violations can be auto-fixed:

```bash
# Fix all auto-fixable issues
vpx markdownlint '**/*.md' --fix

# Fix specific file
vpx markdownlint docs/README.md --fix
```

**After auto-fix:**

1. Review changes with `git diff`.
2. Manually fix remaining violations within the requested scope.
3. Run the project's lint command and required checks, then report the changes and any remaining errors.

## Common violations and manual fixes

**MD009 - Trailing spaces:**

- Issue: Lines end with spaces
- Fix: Remove trailing whitespace
- Editor: Enable "trim trailing whitespace on save"

**MD012 - Multiple blank lines:**

- Issue: More than one consecutive blank line
- Fix: Reduce to single blank line

**MD022 - Headings need blank lines:**

- Issue: No blank line before/after heading
- Fix: Add blank lines around headings

**MD031 - Fenced code blocks need blank lines:**

- Issue: No blank lines around code blocks
- Fix: Add blank lines before/after ``` blocks

**MD040 - Code blocks need language:**

- Issue: Fenced code block missing language
- Fix: Add language after opening ``` (e.g., ```bash, ```typescript)

**MD041 - First line should be heading:**

- Issue: File doesn't start with # heading
- Fix: Add a meaningful first heading when the project requires one; follow existing policy for document fragments

## Fixing by file vs by rule

**Focus on specific file:**

```bash
# See errors for one file
vpx markdownlint docs/guide.md

# Fix one file
vpx markdownlint docs/guide.md --fix
```

**Focus on specific rule:**

```bash
# Find all files with MD009 errors
vpx markdownlint '**/*.md' 2>&1 | rg MD009
```

Use filtered output to locate violations. Run the full lint command to verify the result under the existing rules.
