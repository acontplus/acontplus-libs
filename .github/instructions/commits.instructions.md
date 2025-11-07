---
applyTo: '**'
---

# Commit Message Guidelines

When generating commit messages, follow these rules strictly:

## Format

Generate ONLY a single-line commit message in Conventional Commits format:

```
<type>(scope): <description>
```

## Rules

- **Single line only** - no body, no bullet points, no additional paragraphs
- Maximum 72 characters total length
- **No emoji** - plain text only
- **No line breaks** - everything on one line
- Description should be between 1-50 characters after the type and scope

## Types

Use one of these types only:

- `feat` - new features or significant additions
- `fix` - bug fixes
- `docs` - documentation changes
- `style` - code style/formatting (no logic changes)
- `refactor` - code restructuring (no functionality changes)
- `test` - adding or modifying tests
- `chore` - maintenance, build, tooling updates
- `perf` - performance improvements
- `ci` - CI/CD configuration changes
- `build` - build system or dependency changes
- `revert` - reverting previous commits

## Scope

- Use the affected component/library name in parentheses
- Examples: `ng-auth`, `ng-components`, `core`, `utils`, `ng-config`
- Omit scope only if the change affects the entire workspace
- Use lowercase for scope names

## Valid Examples

```
feat(ng-auth): add JWT refresh token support
fix(core): correct tax calculation rounding
docs(ng-components): update usage examples
refactor(utils): simplify date converters
chore: update dependencies to latest versions
test(ng-customer): add unit tests for service
perf(ng-infrastructure): optimize data loading
```

## Invalid Examples (DO NOT GENERATE)

```
❌ Refactor workspace verification script and tidy TypeScript configuration
❌ feat(ng-auth): add JWT refresh 🔐
❌ fix: resolve issue

   - Updated logic
   - Fixed bug
❌ feat: this is a very long description that exceeds the character limit and will fail validation
```

## Remember

The commit message MUST pass this regex validation:

```regex
^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\(.+\))?(!)?: .{1,50}
```
