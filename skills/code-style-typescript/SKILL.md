---
name: code-style-typescript
description: TypeScript code style guide and formatting conventions. Use when writing TypeScript code, reviewing TypeScript files, refactoring .ts code, formatting TypeScript, or when working with TypeScript interfaces, classes, functions, or any .ts files. Apply these rules during code generation, code review, and when user mentions TypeScript style, formatting, conventions, semicolons, or code quality.
---

# TypeScript Code Style Guide

## When to Apply

- When writing new TypeScript code
- During code review of `.ts` files
- When refactoring existing code
- When generating code snippets, examples, or documentation for TypeScript
- When working with TypeScript-related blocks in Markdown, Vue.js, etc.
- When formatting or cleaning up code

## Rules

### Rule: No semicolons at the end of statements

**No semicolons** at the end of statements.

**Exception**: TypeScript interfaces, types, and similar type definitions **MUST use semicolons** as property separators.

### Examples

**✅ Correct:**

```typescript
// Statements - no semicolons
const result = calculateValue()

function greet(name: string) {
  return `Hello, ${name}`
}

// Interfaces - semicolons required
interface User {
  id: number;
}

type Config = {
  timeout: number;
}

// Classes - no semicolons
class UserService {
  private users: User[]

  constructor() {
    this.users = []
  }

  addUser(user: User) {
    this.users.push(user)
  }
}
```

**❌ Wrong:**

```typescript
// Don't add semicolons to statements
const foo = 'bar';

function greet(name: string) {
  return `Hello, ${name}`;
}

// Don't omit semicolons in interfaces
interface User {
  id: number
}

type Config = {
  apiKey: string
}
```
