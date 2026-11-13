# Integration management

Use when the user wants to modify existing integrations (npm scripts, git hooks, CI).

## Updating npm scripts

**Add additional flags:**

```json
"scripts": {
  "lint:markdown": "markdownlint '**/*.md'",
  "lint:markdown:fix": "markdownlint '**/*.md' --fix",
  "lint:markdown:json": "markdownlint '**/*.md' --json"
}
```

**Change file patterns:**

```json
"scripts": {
  "lint:markdown": "markdownlint 'docs/**/*.md' 'README.md'"
}
```

**Set an explicit config:**

```json
"scripts": {
  "lint:markdown": "markdownlint '**/*.md' --config .markdownlint.yaml"
}
```

## Updating Husky hooks

**Add to existing pre-commit:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Existing checks
npm run test:unit

# Add markdown linting
pnpm run lint:markdown
```

**Make it only check staged files (faster):**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Lint only staged markdown files
git diff --cached --name-only --diff-filter=ACM -z -- '*.md' | xargs -0 -r vpx markdownlint
```

**Remove from Husky:**
Just delete or comment out the `pnpm run lint:markdown` line.

## CI integration

**GitHub Actions example:**

```yaml
# .github/workflows/lint.yml
name: Lint Markdown
on: [push, pull_request]

jobs:
  markdown:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run lint:markdown
```

**GitLab CI example:**

```yaml
# .gitlab-ci.yml
lint:markdown:
  stage: test
  image: node:18
  before_script:
    - npm install -g pnpm
    - pnpm install
  script:
    - pnpm run lint:markdown
```

## VS Code integration (optional)

Suggest `DavidAnson.vscode-markdownlint` for linting in the editor. Use the project's existing config and check workspace settings if editor and CLI results differ.
