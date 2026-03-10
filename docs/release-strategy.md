# Release Strategy

This monorepo uses **independent versioning with release groups** for automated,
safe releases to npm via GitHub Actions and trusted publishing (OIDC).

## Overview

```
Push to main → nx release (version + changelog + tag) → nx release publish (npm via OIDC)
```

No manual version bumps. Versions are determined automatically from
**conventional commits** since the last git tag per package.

## Release Groups

Packages are organized into three groups based on their coupling:

### Foundation

Stable, rarely changed packages with no internal dependencies.

| Package             | Internal Deps |
| ------------------- | ------------- |
| `@acontplus/utils`  | None          |
| `@acontplus/ui-kit` | None          |

### Angular Libs

Tightly coupled packages with cascading peer dependencies. When a package in
this group bumps, dependents auto-update their peer ranges.

| Package                        | Depends On                                               |
| ------------------------------ | -------------------------------------------------------- |
| `@acontplus/core`              | `utils`                                                  |
| `@acontplus/ng-config`         | `core`                                                   |
| `@acontplus/ng-notifications`  | `ui-kit`                                                 |
| `@acontplus/ng-components`     | `ui-kit`                                                 |
| `@acontplus/ng-infrastructure` | `core`, `ng-config`, `ng-notifications`, `ng-components` |
| `@acontplus/ng-auth`           | `core`, `ng-config`, `ng-infrastructure`, `ui-kit`       |

### Standalone

Independent packages with no internal dependencies.

| Package                  | Internal Deps |
| ------------------------ | ------------- |
| `@acontplus/ng-common`   | None          |
| `@acontplus/ng-customer` | None          |

## How Versioning Works

### Commit → Bump Mapping

| Commit Type                                                 | Version Bump              | Example             |
| ----------------------------------------------------------- | ------------------------- | ------------------- |
| `fix(core): ...`                                            | **patch** (1.2.3 → 1.2.4) | Bug fixes           |
| `feat(core): ...`                                           | **minor** (1.2.3 → 1.3.0) | New features        |
| `feat(core)!: ...`                                          | **major** (1.2.3 → 2.0.0) | Breaking changes    |
| `BREAKING CHANGE:` in body                                  | **major**                 | Breaking changes    |
| `chore`, `docs`, `style`, `refactor`, `test`, `ci`, `build` | **no bump**               | Non-release changes |

### Dependency Cascade (`updateDependents: auto`)

When a package bumps, Nx automatically updates peer dependency ranges in
dependent packages and gives them a patch bump:

```
fix(core): correct validation logic
  → core 1.1.4 → 1.1.5
  → ng-config peerDep "@acontplus/core" updated to ^1.1.5, bumped 2.0.3 → 2.0.4
  → ng-infrastructure peerDep updated, bumped 2.0.10 → 2.0.11
  → ng-auth peerDep updated, bumped 2.1.9 → 2.1.10
```

Packages outside the dependency chain are **not affected**.

## Tag Pattern

Each package uses its own tags for version tracking:

```
{projectName}@{version}
```

Examples: `core@1.1.5`, `ng-auth@2.1.10`, `utils@1.1.0`

Nx compares commits between tags to determine what changed per package.

## Publishing: Trusted Publishers (OIDC)

Publishing uses **npm trusted publishers** instead of long-lived tokens:

- **No `NPM_TOKEN` secret needed** — authentication via OIDC
- **Provenance attestations** generated automatically
- **Short-lived credentials** scoped to the workflow run

### Requirements

- Node.js ≥ 22.14 (npm CLI ≥ 11.5.1)
- `id-token: write` permission in the workflow
- GitHub environment: `npm-publish`
- Each package configured on npmjs.com with trusted publisher settings

### npmjs.com Configuration (per package)

Go to **npmjs.com → Package → Settings → Trusted Publisher**:

| Field             | Value            |
| ----------------- | ---------------- |
| Provider          | GitHub Actions   |
| Organization/user | `acontplus`      |
| Repository        | `acontplus-libs` |
| Workflow filename | `release.yml`    |
| Environment       | `npm-publish`    |

## GitHub Environment Setup

1. **Settings → Environments → `npm-publish`**
2. Deployment branches: restrict to `main`
3. Optional: add required reviewers for approval before publish

## Workflow Pipeline

The release workflow (`.github/workflows/release.yml`) runs on every push to `main`:

```
1. Checkout (full history for tag comparison)
2. Setup pnpm + Node.js 22.14
3. Install dependencies (frozen lockfile)
4. Configure git (for version commits)
5. nx release --skip-publish
   ├── preVersionCommand: build all packages
   ├── Detect changes per package since last tag
   ├── Bump versions (conventional commits)
   ├── Update dependent peer ranges (auto cascade)
   ├── Generate changelogs
   ├── Commit version changes
   ├── Create git tags
   └── Create GitHub releases
6. nx release publish
   ├── Publish only bumped packages
   └── Authenticate via OIDC (no token needed)
```

## Examples

### Scenario 1: Bug fix in core

```bash
# Commit
fix(core): correct tax calculation rounding

# Result
core:               1.1.4 → 1.1.5 (patch)
ng-config:          2.0.3 → 2.0.4 (peer dep updated)
ng-infrastructure:  2.0.10 → 2.0.11 (peer dep updated)
ng-auth:            2.1.9 → 2.1.10 (peer dep updated)
# utils, ui-kit, ng-common, ng-customer: unchanged
```

### Scenario 2: New feature in ng-common

```bash
# Commit
feat(ng-common): add date formatting pipe

# Result
ng-common: 1.0.12 → 1.1.0 (minor)
# All other packages: unchanged (no dependents)
```

### Scenario 3: Breaking change in ui-kit

```bash
# Commit
feat(ui-kit)!: redesign notification constants

# Result
ui-kit:             1.0.2 → 2.0.0 (major)
ng-notifications:   2.0.5 → 2.0.6 (peer dep updated)
ng-components:      2.1.30 → 2.1.31 (peer dep updated)
ng-infrastructure:  2.0.10 → 2.0.11 (transitive)
ng-auth:            2.1.9 → 2.1.10 (transitive)
```

### Scenario 4: Docs or chore (no release)

```bash
# Commit
docs(ng-auth): update README examples

# Result: no version bumps, no publish
```

## Post-Setup Checklist

- [ ] Configure trusted publisher on npmjs.com for each package
- [ ] Create `npm-publish` environment on GitHub (restrict to `main`)
- [ ] Verify first publish works via OIDC
- [ ] Restrict token access on npmjs.com ("disallow tokens")
- [ ] Revoke old `NPM_TOKEN` secret from GitHub
