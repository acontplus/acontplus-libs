# Contributing

Guidelines for contributing to the Acontplus Angular Libraries monorepo.

---

## Prerequisites

| Tool        | Version | Purpose                                                         |
| ----------- | ------- | --------------------------------------------------------------- |
| Node.js     | 24      | Runtime                                                         |
| pnpm        | 11.9.0  | Package manager (`packageManager` field enforces exact version) |
| Angular CLI | 22      | Code generation                                                 |

```bash
# Clone
git clone https://github.com/acontplus/acontplus-libs.git
cd acontplus-libs

# Install (reads packageManager field from package.json)
pnpm install
```

---

## Branching Strategy

| Branch                       | Purpose                               | Merges into         |
| ---------------------------- | ------------------------------------- | ------------------- |
| `main`                       | Production — triggers release on push | —                   |
| `develop`                    | Integration branch                    | `main` via PR       |
| `feat/<scope>-<description>` | New features                          | `develop` or `main` |
| `fix/<scope>-<description>`  | Bug fixes                             | `develop` or `main` |
| `chore/<description>`        | Tooling, deps, CI                     | `develop` or `main` |

All changes to `main` go through a **Pull Request**. Direct pushes are protected except for the release bot.

---

## Commit Message Convention

This repo uses **Conventional Commits** enforced by a Husky `commit-msg` hook.

### Format

```
<type>(<scope>): <description>
```

### Rules

- Single line only — no body, no bullet points
- Max **72 characters** total
- No emoji
- Lowercase type and scope
- Description between 1–50 characters

### Types and version impact

| Type       | Version bump | Example                                                  |
| ---------- | ------------ | -------------------------------------------------------- |
| `feat`     | **minor**    | `feat(ng-components): add date-range-input component`    |
| `fix`      | **patch**    | `fix(core): correct tax calculation rounding`            |
| `perf`     | **patch**    | `perf(utils): optimize decimal converter`                |
| `refactor` | **patch**    | `refactor(ng-infrastructure): extract correlation logic` |
| `revert`   | **patch**    | `revert(ng-auth): revert broken OAuth callback`          |
| `docs`     | **none**     | `docs(ng-auth): update README examples`                  |
| `chore`    | **none**     | `chore(deps): update Angular to 22.1.0`                  |
| `ci`       | **none**     | `ci: upgrade actions to Node 24`                         |
| `test`     | **none**     | `test(ng-customer): add unit tests for SRI validator`    |
| `build`    | **none**     | `build: update nx to 23.1`                               |
| `style`    | **none**     | `style: fix prettier formatting`                         |

**Breaking change** (major bump): append `!` after type or add `BREAKING CHANGE:` in footer:

```
feat(ng-auth)!: remove deprecated useCase injection pattern
```

### Commit scope reference

| Scope               | Package                        |
| ------------------- | ------------------------------ |
| `core`              | `@acontplus/core`              |
| `utils`             | `@acontplus/utils`             |
| `ui-kit`            | `@acontplus/ui-kit`            |
| `ng-auth`           | `@acontplus/ng-auth`           |
| `ng-common`         | `@acontplus/ng-common`         |
| `ng-components`     | `@acontplus/ng-components`     |
| `ng-config`         | `@acontplus/ng-config`         |
| `ng-customer`       | `@acontplus/ng-customer`       |
| `ng-infrastructure` | `@acontplus/ng-infrastructure` |
| `ng-notifications`  | `@acontplus/ng-notifications`  |
| `ci`                | GitHub Actions workflows       |
| `deps`              | Dependency updates             |
| `release`           | Release tooling                |

---

## Development Workflow

```bash
# 1. Create branch
git checkout -b feat/ng-components-new-component

# 2. Make changes

# 3. Check formatting
pnpm run format:check
pnpm run format        # fix if needed

# 4. Lint
pnpm run lint
pnpm run lint:fix      # fix auto-fixable issues

# 5. Build affected
pnpm exec nx affected -t build --parallel=3

# 6. Test affected
pnpm exec nx affected -t test --parallel=3

# 7. Commit (hook validates format)
git commit -m "feat(ng-components): add new component"

# 8. Push and open PR
git push origin feat/ng-components-new-component
```

---

## Code Quality Standards

### TypeScript

- **No `any` types** — use proper interfaces (violations are warnings, not errors, but should be resolved)
- **Unused variables**: prefix with `_` (e.g. `_unused`)
- **Strict mode** enabled: `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`
- Use `inject()` over constructor injection for standalone components (Angular 21+ style)

### Angular

- **Component selectors**: always `acp-` prefix in library packages
- **Lifecycle hooks**: implement proper interfaces (`OnInit`, `OnDestroy`, etc.)
- **Signals**: prefer `signal()` + `computed()` over Observables for local component state
- **Standalone components**: all new components must be standalone

### ESLint rules enforced

- `@angular-eslint/component-selector` — `acp-` prefix required
- `@typescript-eslint/no-unused-vars` — error
- `@typescript-eslint/no-explicit-any` — warning
- `no-console` — warning (expected in demo-app, not in libraries)

---

## PR Requirements

Before opening a PR, ensure:

- [ ] `pnpm run format:check` passes
- [ ] `pnpm run lint` passes (0 errors)
- [ ] `pnpm exec nx affected -t build` succeeds
- [ ] Commit messages follow Conventional Commits
- [ ] README updated if public API changed
- [ ] No debug `console.log` in library code

---

## Nx Useful Commands

```bash
# Build a specific library
pnpm exec nx build ng-components

# Run tests for a specific library
pnpm exec nx test core

# View dependency graph
pnpm exec nx graph

# Show affected projects
pnpm exec nx affected:graph

# Reset Nx cache
pnpm run clean

# Generate a new Angular component in ng-components
pnpm exec nx g @nx/angular:component my-component --project=ng-components
```
