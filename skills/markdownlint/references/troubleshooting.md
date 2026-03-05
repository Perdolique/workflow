# Troubleshooting

Common markdownlint issues and their solutions.

**Note:** This guide uses `pnpm` in examples. Replace with your project's package manager (npm/yarn/bun).

## Too many linting errors in existing markdown files

**Solution:** Start with a permissive configuration and gradually enable rules. Suggest running `pnpm run lint:markdown` first to see what fails, then offer to disable the most common failing rules temporarily.

**Quick fix:** Disable problematic rules:

```yaml
line-length: false
no-trailing-spaces: false
no-multiple-blanks: false
```

Then gradually re-enable and fix one rule at a time.

## Line-length rule conflicts with generated content

**Solution:** This is already handled in the default config by disabling `line-length`. If other generated-content issues appear, add specific files to `.markdownlintignore` rather than disabling more rules globally.

## Markdown files in subdirectories aren't being checked

**Solution:** The glob pattern `'**/*.md'` should catch all files unless they're in ignored directories. Verify `.markdownlintignore` isn't too aggressive and check for shell expansion issues (the single quotes around the glob are important).

**Debug steps:**

1. Run with explicit path: `markdownlint docs/subfolder/file.md`
2. Check if file is in `.markdownlintignore`
3. Verify npm script uses quotes: `"markdownlint '**/*.md'"`

## Pre-commit hook fails in CI or on other machines

**Solution:** Ensure `husky` is installed as a devDependency and the `prepare` script runs `husky` (or `husky install` for older versions). Also verify the hook file has executable permissions in git: `git add --chmod=+x .husky/pre-commit`.

## Config file changes not taking effect

**Solution:**

1. Verify `.markdownlint.yaml` syntax is correct (proper YAML format)
2. Check for typos in rule names
3. Ensure file is in project root, not subdirectory
4. Try running with explicit config: `markdownlint '**/*.md' --config .markdownlint.yaml`

## "Cannot find module 'markdownlint'" error

**Solution:**

1. Verify packages are installed: `ls node_modules/markdownlint`
2. Install if missing: `pnpm add -D markdownlint markdownlint-cli`
3. Check if running in correct directory (where package.json is)
4. Clear and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`

## Linting is too slow in large repositories

**Solutions:**

1. **Add more to ignore file** - Exclude generated docs, vendor files
2. **Use staged files only** in Husky - Only check changed files
3. **Split by directory** - Create separate scripts for different doc areas:

   ```json
   "lint:docs": "markdownlint 'docs/**/*.md'",
   "lint:readme": "markdownlint '*.md'"
   ```

4. **Cache in CI** - Use cache actions to speed up CI runs

## VS Code extension conflicts with CLI config

**Solution:** Both should use `.markdownlint.yaml` automatically, but if they differ:

1. Verify VS Code extension is installed: `DavidAnson.vscode-markdownlint`
2. Check workspace settings don't override config
3. Reload VS Code window after config changes
4. Ensure no `.markdownlintrc` or other config formats exist (use only `.markdownlint.yaml`)
