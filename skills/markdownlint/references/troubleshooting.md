# Troubleshooting

Common markdownlint issues and their solutions.

## Too many linting errors in existing markdown files

Run the project's lint command to see which files and rules fail. Fix authorized violations in small groups under the existing policy, using automatic fixes where safe. Report work outside the requested scope. Change rules or exclusions only when that change is part of the request or settled project requirements.

## Line-length rule conflicts with generated content

Check the active rule and how the project handles generated files. If exclusion is appropriate within the requested scope, ignore the specific generated files. Preserve the rule for maintained content.

## Markdown files in subdirectories aren't being checked

Check the quoted glob, ignore patterns, and working directory. Hidden directories need `--dot` or explicit paths.

**Debug steps:**

1. Run with an explicit path: `vpx markdownlint docs/subfolder/file.md`
2. Check if file is in `.markdownlintignore`
3. Verify npm script uses quotes: `"markdownlint '**/*.md'"`

## Pre-commit hook fails in CI or on other machines

Check that Husky is installed and initialized for the project's version. Inspect the tracked hook mode with `git ls-files --stage .husky/pre-commit` (`100755` means executable), and its working-tree permissions with `ls -l .husky/pre-commit`. If the hook needs executable permissions, use `chmod +x .husky/pre-commit` and leave the change for review.

## Config file changes not taking effect

**Solution:**

1. Check the existing config's syntax in its current format
2. Check for typos in rule names
3. Check the CLI's working directory and config discovery
4. Run with the actual config path, for example: `vpx markdownlint '**/*.md' --config .markdownlint.jsonc`

## "Cannot find module 'markdownlint'" error

**Solution:**

1. Check the failing command's working directory and the relevant package or workspace.
2. Compare its declared dependencies with the installed core library and CLI.
3. If a declared dependency is missing, run the project's install command using its existing lockfile. Add only a package that is actually missing from the required dependency declarations.
4. If the error remains, inspect package resolution and the install error before choosing a targeted repair. Keep the lockfile and unrelated dependencies.

## Linting is too slow in large repositories

**Solutions:**

1. **Review exclusions** - Exclude confirmed generated docs and vendor files within the requested scope
2. **Use staged files only** in Husky - Only check changed files
3. **Split by directory** - Create separate scripts for different doc areas:

   ```json
   "lint:docs": "markdownlint 'docs/**/*.md'",
   "lint:readme": "markdownlint '*.md'"
   ```

4. **Cache in CI** - Use cache actions to speed up CI runs

## VS Code extension conflicts with CLI config

1. Check the installed extension (`DavidAnson.vscode-markdownlint`) and its workspace settings.
2. Compare the config loaded by the editor with the CLI's config and working directory.
3. Align both with the project's existing config, keeping its format and intended rules. Remove a duplicate config only after confirming it is unused or conflicting.
4. Reload the editor after changing its settings or config.
