# Modifying rules

Use this reference when user wants to add, remove, or change specific markdownlint rules.

**Note:** This guide uses `pnpm` in examples. Replace with your project's package manager (npm/yarn/bun).

## Adding rules (enabling disabled rules)

When user wants to enable a rule that's currently disabled or add a new rule:

1. **Find the rule name** - User might mention the error message or describe the issue. Common rules:
   - `line-length` - Enforce maximum line length
   - `no-inline-html` - Disallow HTML tags in markdown
   - `no-duplicate-heading` - Prevent duplicate headings
   - `first-line-heading` - Require documents to start with heading
   - `heading-style` - Enforce heading format (ATX vs Setext)
   - `ul-style` - Enforce unordered list marker style
   - `code-block-style` - Enforce fenced vs indented code blocks

2. **Update `.markdownlint.yaml`** - Add or modify the rule:
   ```yaml
   # Enable a boolean rule
   no-duplicate-heading: true

   # Configure a rule with options
   heading-style:
     style: "atx"

   # Set numeric limit
   line-length:
     line_length: 120
   ```

3. **Test the change** - Run linting to verify:
   ```bash
   pnpm run lint:markdown
   ```

4. **Show impact** - If new errors appear, explain what files are affected and ask if user wants to:
   - Fix the violations now
   - Adjust the rule to be less strict
   - Add exceptions to `.markdownlintignore`

## Removing rules (disabling rules)

When linting produces too many errors or user disagrees with a rule:

1. **Identify the rule** - Look at the error message. Format is usually: `MD### rule-name Description`
   - Example: `MD013/line-length Line length [Expected: 80, Actual: 125]`
   - Rule name is `line-length` or `MD013`

2. **Disable in `.markdownlint.yaml`**:
   ```yaml
   # Disable completely
   line-length: false

   # Or keep but make more permissive
   line-length:
     line_length: 200
     code_blocks: false
   ```

3. **Verify** - Run linting again to confirm errors are gone

## Configuring rule options

Many rules have configurable parameters. Common scenarios:

**Heading style preference:**
```yaml
heading-style:
  style: "atx"  # Use # headings, not underlined
```

**List marker style:**
```yaml
ul-style:
  style: "dash"  # Use - instead of * for lists
```

**Allow trailing punctuation in headings:**
```yaml
no-trailing-punctuation:
  punctuation: ".,;:"  # Still allow ! and ?
```

**Code block style:**
```yaml
code-block-style:
  style: "fenced"  # Require ``` blocks, not indentation
```

Check [markdownlint rules documentation](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) for full list of options.
