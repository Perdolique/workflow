# PR Description Examples

This file contains examples of boring vs engaging PR descriptions to demonstrate the preferred writing style.

## Example 1: Email Validation Fix

### 😴 Boring (don't do this)

```markdown
## Summary

Modified validation logic.
Updated tests.
Fixed edge case.
```

### 🎉 Engaging (do this)

```markdown
## Summary

Rewrote the email validation to handle all those weird edge cases we kept hitting! 🎯💪 This thing is SOLID now 😎👍

- ✅ Now supports plus addressing (user+tag@example.com) 📧
- ✅ Handles international domains correctly 🌍💯
- ✅ Added 15 new test cases for the tricky stuff 🧪🔥
- 🐛 Fixed the bug where empty strings were passing validation (oops!) 🤣

## Why This Matters

Users were getting frustrated when their perfectly valid emails were rejected 😤 Turns out our regex from 2015 wasn't cutting it anymore 🙈 This brings us up to RFC 5322 compliance and should handle 99% of real-world email formats 🚀 No more angry support tickets! 🎉

## The Tricky Part

International domain names were a pain 💀 Had to use punycode conversion. Not the prettiest solution, but it works reliably across all browsers 💪 Sometimes you gotta do what you gotta do 😎

Fixes #156
```

## Example 2: Feature - Dark Mode

### 😴 Boring

```markdown
Added dark mode.
Created toggle component.
Updated theme variables.
```

### 🎉 Engaging

```markdown
## Summary

Finally bringing dark mode to life! 🌙✨ Been waiting for this FOREVER 😎🔥

The community has been asking for this since day one, and it's ready to ship 🚀💯:

- 🎨 Complete dark color palette with semantic tokens 🖌️👌
- 🔄 Smooth theme switching with CSS variable swaps ⚡
- 💾 Persists user preference to localStorage 📦
- ♿ Respects system prefers-color-scheme 🙏
- 📦 New `<ThemeToggle>` component anyone can drop in 🎁

## How It Works

Instead of duplicating styles, we're using CSS custom properties that swap values based on a `[data-theme="dark"]` attribute on the root element 🧠 This means zero runtime overhead and instant theme switching! 💨 Pretty neat, right? 😏

## What's Next

This lays the groundwork for user-customizable themes in the future 🎨🚀 Right now it's just light/dark, but the architecture supports any number of themes 💪 Sky's the limit! ✨

Fixes #42
```

## Example 3: Performance Optimization

### 😴 Boring (Performance)

```markdown
Optimized table rendering.
Implemented virtual scrolling.
```

### 🎉 Engaging (Performance)

```markdown
## Summary

Massively improved table performance for large datasets! ⚡💪 This thing FLIES now 🚀😎

- 📊 Virtual scrolling now handles 10k+ rows smoothly 💯
- 🎯 Reduced initial render time by 60% 🔥
- 🧪 Added performance benchmarks to prevent regressions 👍

## The Problem

Users with large datasets were experiencing 3-5 second load times and janky scrolling 😤💀 Not a great experience when you're trying to analyze data quickly! Had to fix this ASAP 🏃‍♂️

## The Solution

Implemented virtual scrolling using a windowing technique 🧠✨ We only render rows visible in the viewport plus a small buffer. As you scroll, rows are recycled instead of created from scratch 🔄 Smart, right? 😏

## Benchmarks

Before: ~4200ms to render 5000 rows 🐌
After: ~180ms to render 5000 rows ⚡

That's a 23x improvement! 🚀🔥 Absolutely crushing it 💪😎

Fixes #234
```

## Example 4: Refactoring

### 😴 Boring (Refactoring)

```markdown
Refactored authentication code.
Moved functions to utilities.
```

### 🎉 Engaging (Refactoring)

```markdown
## Summary

Cleaned up the authentication flow and made it way more maintainable 🧹✨ Code quality is FIRE now 🔥😎

- ♻️ Extracted token validation into reusable utilities 📦💪
- 🎯 Reduced code duplication across 5 different modules 🎉
- ✅ Added comprehensive unit tests (coverage went from 40% to 95%) 📈🚀

## Why This Refactor

The auth code was scattered across multiple files 🤦‍♂️ Making it hard to track down bugs and add new features 😤 Every time we needed to validate a token, we were copy-pasting the same logic 🙈 Not cool! Had to clean this mess up 💪

## What Changed

Created a central `auth-utils` module that handles all the token validation, refresh logic, and expiry checks 🧠✨ Now all modules use the same battle-tested code 💯 DRY principles for the win! 🎯👍

## No Breaking Changes

This is purely internal refactoring 🔧 The public API remains unchanged 🙏 All existing tests still pass plus we added a bunch more 🧪 Zero risk, all gains 😎🔥
```

## Example 5: Breaking Change

### 😴 Boring (Breaking)

```markdown
Changed API endpoints.
Updated authentication.
```

### 🎉 Engaging (Breaking)

```markdown
## Summary

⚠️ **BREAKING CHANGE**: Redesigned authentication flow 🔥

This is a significant change that affects how authentication works across the entire app 💪😎:

- 🔐 Switched from session-based to JWT token authentication 🎯
- 🔄 Added refresh token rotation for better security 🛡️💯
- 📦 New `/api/auth/token` endpoint replaces `/api/auth/login` ✨
- 🗑️ Removed deprecated `/api/auth/session` endpoint 👋

## Why The Breaking Change

Session-based auth was causing scaling issues 😤 And didn't work well with our microservices architecture 🤦‍♂️ JWT tokens allow for stateless authentication and make it easier to scale horizontally 🚀 Had to rip the band-aid off and do this right! 💪🔥

## Migration Guide

If you're currently using the old authentication 👇:

1. Replace login calls:

   ```diff
   - POST /api/auth/login
   + POST /api/auth/token
   ```

1. Update token storage:

   ```diff
   - Store session cookie
   + Store JWT token in localStorage or httpOnly cookie
   ```

2. Add token refresh logic:

   ```javascript
   // Refresh token before expiry
   await refreshToken(currentToken);
   ```

Full migration docs: [link to docs] 📚

## Testing

- ✅ All unit tests updated 🧪
- ✅ Integration tests pass ✨
- ✅ Tested migration path with staging environment 🎯

BREAKING CHANGE: Authentication now uses JWT tokens instead of sessions 🔐 See migration guide above 👆

Fixes #567

```markdown

## Example 6: Draft/WIP PR

```markdown
## Summary

🚧 **[WIP] Work in progress** - New dashboard implementation

This is a draft PR to get early feedback on the dashboard architecture. Not ready to merge yet!

What's done:
- ✅ Basic layout structure
- ✅ Chart components scaffolding
- ✅ Data fetching hooks

Still TODO:
- ⏳ Implement actual chart rendering
- ⏳ Add filters and controls
- ⏳ Write tests
- ⏳ Optimize performance

## Questions for Reviewers

1. Does this component structure make sense?
2. Should we use library X or library Y for charts?
3. Any concerns about the data fetching approach?

Feel free to leave comments even though it's not complete!
```

## Example 7: Monorepo PR

```markdown
## Summary

Update button components across all packages 🎨

This PR updates button styling and adds new variants across the monorepo:

**Packages affected:**
- `@ui/button` - Core button component
- `@ui/forms` - Form button integrations
- `@marketing/landing` - Landing page buttons

Changes:
- 💄 New outlined and ghost button variants
- ♿ Improved focus states for accessibility
- 📦 @ui/button: v2.1.0 → v2.2.0
- 📦 @ui/forms: v1.5.3 → v1.5.4
- 📦 @marketing/landing: v0.8.0 → v0.8.1

## Motivation

Design team requested new button variants to match the updated design system. These changes ensure consistency across all our packages.

## Testing

- ✅ Visual regression tests passed
- ✅ Storybook updated with new variants
- ✅ Accessibility audit completed

Fixes #789
```
