# Initial setup

Complete workflow for setting up markdownlint from scratch in a Node.js project.

## Step 1: Check project setup

1. Read existing lint scripts, config, ignore patterns, and project instructions.
2. Check the core library and CLI separately. An installed `markdownlint` library does not provide the `markdownlint` command.
3. Use the project's package manager for any needed install. If installation needs a new `package.json`, ask whether to initialize a Node.js project.

## Step 2: Install dependencies

Keep the project's existing CLI when configured. For a setup using `markdownlint-cli`, add only missing dev dependencies:

- `markdownlint` — the core linting library with configuration schemas
- `markdownlint-cli` — the command-line interface for running checks

Use `pnpm add -D markdownlint markdownlint-cli` when both are missing, or name only the missing package.

Wait for installation to complete before proceeding.

## Step 3: Configure rules

Update the existing config in its current format. For a new config, use the [default in the main skill](../SKILL.md#new-configuration-default) unless project or user requirements specify other rules. Ask only about unresolved style choices. Common customizations include:

- `no-inline-html: false` — allow HTML in markdown (useful for advanced formatting)
- `no-duplicate-heading: false` — allow duplicate headings across the document
- `first-line-heading: false` — don't require documents to start with a heading

## Step 4: Create ignore file

Preserve existing exclusions. For a new `.markdownlintignore`, start with external dependencies:

**Default ignore patterns:**

```gitignore
node_modules
```

Add other patterns only when they match the project's content:

- `dist/` or `build/` — generated documentation
- `CHANGELOG.md` — if generated
- `vendor/` — third-party markdown files

## Step 5: Add npm script

Keep a working lint script if one exists. Otherwise, add a `lint:markdown` script to `package.json`:

```json
"scripts": {
  "lint:markdown": "markdownlint '**/*.md'"
}
```

This script checks Markdown recursively, except hidden paths and files matched by `.markdownlintignore`. Add `--dot` if hidden directories are part of the requested scope. Use the same script locally, in hooks, and in CI.

## Step 6: Test the setup

Run the linting script to verify everything works:

```bash
pnpm run lint:markdown
```

Fix violations within the authorized scope using [the fixing reference](fixing.md) and rerun linting. Report remaining errors and ask only if their treatment is unresolved.

## Step 7: Add verification to AGENTS.md

Document the lint command and its scope in the project's AGENTS.md, preserving existing checks and applicable instructions. Use its verification section, add that section if missing, or create a short titled file when AGENTS.md is absent.

Use the project's actual package-manager command in this template:

```markdown
- After a complete group of changes to Markdown, the lint configuration, ignore patterns, or the lint command, run `pnpm run lint:markdown`.
- Fix reported violations and verify the final state before marking the work complete.
- Follow the project's broader verification requirements.
```

This gives future contributors the command and its scope without adding a separate general workflow for the project.

## Step 8: Integrate with Husky (if applicable)

Check `.husky/`, dev dependencies, and the `prepare` script. If Husky is already used and hook integration remains open, offer it. When integration is requested, add the lint command to the existing pre-commit hook.

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

Installing Husky affects the project's Git workflow. If no hook tool exists, settle that choice before adding one.

## Step 9: Document the setup

After completing the setup, briefly explain to the user:

- How to run linting: `pnpm run lint:markdown`
- Where to customize rules: the actual config path
- How to ignore files: `.markdownlintignore`
- Where verification is documented: `AGENTS.md` (if created/updated)
- Whether Husky integration was added
