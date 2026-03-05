# Initial setup

Complete workflow for setting up markdownlint from scratch in a Node.js project.

**Note:** This guide uses `pnpm` in examples. Replace with your project's package manager (npm/yarn/bun) as detected in the main skill file.

## Step 1: Check project setup

Before making changes, verify the project structure:

1. Check if `package.json` exists — if not, ask whether to initialize a Node.js project first
2. Confirm pnpm is being used (look for `pnpm-lock.yaml` or `packageManager` field in package.json)
3. Check if markdownlint is already installed — if so, skip installation and only update configuration files

## Step 2: Install dependencies

Add markdownlint packages as dev dependencies. We need both packages because:

- `markdownlint` — the core linting library with configuration schemas
- `markdownlint-cli` — the command-line interface for running checks

```bash
pnpm add -D markdownlint markdownlint-cli
```

Wait for installation to complete before proceeding.

## Step 3: Create configuration file

Create `.markdownlint.yaml` in the project root. This file defines which rules to enable or disable.

**Default configuration:**

```yaml
$schema: ./node_modules/markdownlint/schema/markdownlint-config-schema.json

line-length: false # Autowraping should be handled in editors/viewers
```

**Why disable line-length?** Modern editors and markdown viewers handle text wrapping automatically, so enforcing a fixed line length often creates unnecessary friction without improving readability. Focus on semantic issues instead of presentation.

If the user has specific style requirements, ask them which rules they want to customize. Common customizations include:

- `no-inline-html: false` — allow HTML in markdown (useful for advanced formatting)
- `no-duplicate-heading: false` — allow duplicate headings across the document
- `first-line-heading: false` — don't require documents to start with a heading

## Step 4: Create ignore file

Create `.markdownlintignore` in the project root to exclude generated files and external dependencies from linting.

**Default ignore patterns:**

```gitignore
node_modules
```

Common additional patterns to suggest if relevant:

- `dist/` or `build/` — generated documentation
- `CHANGELOG.md` — often auto-generated and shouldn't be manually linted
- `*.log` — log files that might use .md extension
- `vendor/` — third-party markdown files

## Step 5: Add npm script

Add a `lint:markdown` script to `package.json` for easy execution. Place it in the `scripts` section:

```json
"scripts": {
  "lint:markdown": "markdownlint '**/*.md'"
}
```

This script checks all markdown files in the project recursively. The `.markdownlintignore` file prevents checking unwanted directories.

**Why use a script instead of running markdownlint directly?**

- Works the same way across all environments (CI, local, hooks)
- Easier to remember and document (`pnpm run lint:markdown` vs remembering CLI flags)
- Can be extended with additional flags if needed later

## Step 6: Test the setup

Run the linting script to verify everything works:

```bash
pnpm run lint:markdown
```

If linting fails with actual issues in markdown files, show the user the errors and ask whether to:

1. Fix the issues automatically (if possible)
2. Fix them manually later
3. Adjust the configuration to be less strict

## Step 7: Add verification to AGENTS.md

Update the project's AGENTS.md file to include markdown linting in the verification workflow. This ensures the linting command is run after every task.

### Check if AGENTS.md exists

#### If AGENTS.md exists

Look for existing verification/quality/task verification sections. Common section names:

- "Task verification"
- "Verification"
- "Quality checks"
- "Post-task checklist"

**Add the command to existing section:**

```markdown
### Task verification

**After completing ANY task**, run verification commands to ensure quality:

- **Run markdown linting**: Execute `pnpm run lint:markdown` to verify all markdown files comply with style rules
- **Fix violations**: If linting fails, fix violations before marking task as complete

**Available verification commands:**

    # Markdown linting (required for all tasks that modify .md files)
    pnpm run lint:markdown
```

**If no verification section exists**, add a new section at the end of AGENTS.md (or after workflow/task sections if they exist).

#### If AGENTS.md does NOT exist

Create a minimal AGENTS.md in the project root with basic verification workflow:

```markdown
# Project workflow

## Task verification

**After completing ANY task**, run verification commands to ensure quality:

- **Run markdown linting**: Execute `pnpm run lint:markdown` to verify all markdown files comply with style rules
- **Fix violations**: If linting fails, fix violations before marking task as complete
- **Task completion criteria**: A task is considered successfully completed ONLY when all verification commands pass with exit code 0

**Available verification commands:**

    # Markdown linting (required for all tasks that modify .md files)
    pnpm run lint:markdown
```

**Why this matters:** This documentation helps AI coding assistants and human developers know that markdown linting should be run as part of the task completion workflow, not just before commits.

## Step 8: Integrate with Husky (if applicable)

Check if Husky is already configured in the project by looking for:

- `.husky/` directory
- `husky` in devDependencies
- `prepare` script in package.json

**Only if Husky exists**, offer to add markdown linting to the pre-commit hook. This prevents committing markdown with linting errors.

Add or update `.husky/pre-commit`:

```bash
#!/bin/sh
# ... existing hooks ...
pnpm run lint:markdown
```

If creating a new pre-commit hook file, make it executable:

```bash
chmod +x .husky/pre-commit
```

**Why not always set up Husky?** Installing and configuring Husky is a separate decision that affects the entire git workflow. Only integrate with it if the user has already made that choice. If Husky doesn't exist but the user wants pre-commit linting, suggest setting up Husky separately first.

## Step 9: Document the setup

After completing the setup, briefly explain to the user:

- How to run linting: `pnpm run lint:markdown`
- Where to customize rules: `.markdownlint.yaml`
- How to ignore files: `.markdownlintignore`
- Where verification is documented: `AGENTS.md` (if created/updated)
- Whether Husky integration was added
