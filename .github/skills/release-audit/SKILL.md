---
name: release-audit
description: 'Audit and prepare monorepo packages for release. Use for: version audit, semver check, dependency cascade, release readiness, check versions, bump versions, audit peer deps, update changelogs, align documentation, pre-release check, publish preparation, version alignment. DO NOT USE FOR: publishing to npm (manual 2FA required), CI/CD pipeline changes, adding new packages.'
argument-hint: 'Which packages or what aspect? e.g. "all packages", "ng-auth only", "just check versions"'
---

# Release Audit

Comprehensive release readiness workflow for the `@acontplus` Nx monorepo. Audits package versions, peer dependencies, documentation, and changelogs — then applies corrections following strict semver and the dependency chain.

## When to Use

- Before publishing any package to npm
- After a batch of feature/fix commits across multiple packages
- When peer dependency warnings appear during `pnpm install`
- When README content may have drifted from actual exports
- Periodic release hygiene checks

## Dependency Chain

All version cascades MUST follow this order (leaf → root):

```
utils (standalone)          ui-kit (standalone)       ng-common (standalone Angular)
  └─ core                     └─ ng-notifications     ng-customer (standalone Angular)
       └─ ng-config                └─ ng-components
            ├─ ng-infrastructure (core, ng-config, ng-notifications, ng-components)
            └─ ng-auth (core, ng-config, ng-infrastructure, ui-kit)
```

**Rule**: When bumping a package, check all packages that declare it as a `peerDependency` — they may need their peer range updated and possibly a patch bump themselves.

## Procedure

### Phase 1 — Lint & Format Gate

1. Run `pnpm run lint` across the workspace
2. Fix any blocking errors (these prevent commits via Husky pre-commit hook)
3. Run `pnpm run format:check` — fix formatting issues with `pnpm run format`
4. Commit fixes separately: `fix(<scope>): resolve lint errors`

### Phase 2 — Version Audit

For each package in [dependency order](#dependency-chain):

1. Read current version from `package.json`
2. Get commit history since last version bump:
   ```
   git log --oneline -- packages/<name>/src/
   ```
3. Classify commits by conventional commit type:
   - `feat:` → **minor** bump
   - `fix:`, `perf:` → **patch** bump
   - `BREAKING CHANGE` or `!:` → **major** bump
   - `refactor:`, `style:`, `docs:`, `test:`, `chore:` → **patch** (if src changed)
4. Apply the highest-priority bump needed
5. If no src/ changes since last bump → **skip**

**Decision table:**

| Commits since last bump                          | Bump type |
| ------------------------------------------------ | --------- |
| Any `feat:`                                      | minor     |
| Only `fix:`/`perf:`/`refactor:` with src changes | patch     |
| Only `docs:`/`test:`/`chore:` (no src)           | skip      |
| Any `BREAKING CHANGE`                            | major     |

### Phase 3 — Peer Dependency Cascade

After bumping, cascade through dependents:

1. For each bumped package, find all packages that list it in `peerDependencies`
2. Update the peer range to include the new version (e.g., `^1.1.3` → `^1.1.4`)
3. If the peer range changed, apply a **patch** bump to that dependent package
4. Recurse: check if the dependent's bump requires cascading further
5. Run `pnpm install` to sync the lockfile after all changes

### Phase 4 — Documentation Audit

For each package README:

1. Compare documented exports/APIs against actual `src/index.ts` barrel exports
2. Verify class/interface/function names match actual code
3. Check that documented peer dependencies match `package.json`
4. Verify import paths in code examples are correct
5. Flag any documented features that don't exist in the codebase

For root CHANGELOG:

1. Verify package version table matches actual `package.json` versions
2. Ensure [Unreleased] section has accurate entries for uncommitted changes
3. Follow [Keep a Changelog](https://keepachangelog.com/) format

### Phase 5 — Pre-Commit Validation

1. Run `pnpm run lint` — must pass
2. Run `pnpm run format:check` — must pass
3. Run `pnpm run test` — should pass (non-blocking for docs-only changes)
4. Verify `pnpm install` produces no warnings about peer deps
5. Stage and commit:
   - Version bumps: `chore: bump package versions`
   - Doc fixes: `docs: align READMEs with codebase`

## Nx Release Integration

The workspace has `nx release` configured in `nx.json` with:

- `currentVersionResolver: "git-tag"` with `fallbackCurrentVersionResolver: "disk"`
- `preVersionCommand: "npx nx run-many -t build"`

**No git tags exist yet.** The first `nx release` invocation must use `--first-release`. After that, tags drive version resolution.

Until `nx release` is fully adopted, follow the manual procedure above.

## Publishing (Manual — Reference Only)

Publishing requires browser-based 2FA and cannot be automated:

```bash
# 1. Build for production
pnpm nx build <package-name> --configuration=production

# 2. Publish (opens browser for 2FA)
cd dist/packages/<package-name>
npm publish --access=public
cd ../../..
```

Publish in dependency order: utils → core → ui-kit → ng-config → ng-common → ng-notifications → ng-components → ng-infrastructure → ng-customer → ng-auth

## Quality Checklist

- [ ] All `feat:` commits since last bump reflected as minor bumps
- [ ] All peer dependency ranges aligned with current versions
- [ ] `pnpm-lock.yaml` synced (no uncommitted lockfile drift)
- [ ] README documented exports match actual barrel exports
- [ ] CHANGELOG [Unreleased] section has accurate version table
- [ ] Lint and format checks pass
- [ ] Commit messages follow conventional commits format
