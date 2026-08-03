# Acontplus Libraries

A pnpm and Nx monorepo of publishable TypeScript and Angular libraries for
enterprise applications. The workspace uses strict TypeScript 6, Angular 22.1,
Nx 23.1, Vitest, Playwright, and Nx Release.

## Workspace

| Area                 | Projects                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Foundation libraries | `core`, `utils`, `ui-kit`                                                                                    |
| Angular libraries    | `ng-auth`, `ng-common`, `ng-components`, `ng-config`, `ng-customer`, `ng-infrastructure`, `ng-notifications` |
| Applications         | `demo-app`, `acontplus-erp`                                                                                  |
| End-to-end tests     | `demo-app-e2e`, `acontplus-erp-e2e`                                                                          |

Each library's public API is defined by `packages/<name>/src/index.ts`. See its
package README for installation and usage information.

## Prerequisites

- Node.js 24 for CI compatibility (published packages support Node 18+ where
  declared)
- pnpm 11.9.0

```bash
pnpm install
pnpm start          # demo-app at https://localhost:4200
pnpm start:erp      # acontplus-erp at https://localhost:4300
```

The application development servers use Angular's native `--ssl` option. No
certificate or private key is stored in this repository.

## Development

Use Nx through pnpm from the workspace root:

```bash
# Inspect the workspace
pnpm exec nx show projects
pnpm exec nx show project ng-auth

# Focused validation
pnpm exec nx lint ng-auth
pnpm exec nx test ng-auth
pnpm exec nx build ng-auth
pnpm exec nx e2e demo-app-e2e

# Validate changed projects
pnpm exec nx affected -t lint,test,build --base=origin/main --head=HEAD

# Formatting
pnpm run format:check
pnpm run format
```

CI runs affected lint, unit tests, and builds on pull requests. Playwright E2E
tests are available locally and should be run for relevant application changes.

## Quality conventions

- Prettier formats all supported files with `pnpm run format`.
- ESLint uses flat configuration with project-specific Angular selectors.
- Write unit tests alongside changed behavior using `*.spec.ts` or `*.test.ts`.

See [the testing strategy](docs/wiki/Testing.md) for runner choices, local commands,
and the coverage policy.

- Keep imports at package boundaries: consumers import from
  `@acontplus/<package>`, never another package's `src/` directory.
- Follow Conventional Commits. The Husky hook accepts `build`, `chore`, `ci`,
  `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, and `test`.
- Treat a supported Angular-major change as breaking for every affected Angular
  package. Put `major` for each affected `ng-*` package in one version plan.

## Releases

Packages release independently through Nx Release version plans. The current
version comes from tags in the `{projectName}@{version}` form. A reviewed plan
under `.nx/version-plans/` selects the exact packages and SemVer bump; merging
it triggers the release workflow. A release updates both the source package
manifest and the manifest under `dist/`; only `dist/packages/*` is published.

Preview release decisions without writing anything:

```bash
pnpm exec nx release --dry-run
```

The `main` workflow performs versioning, project changelogs, tags, and npm
publishing only when a version plan is merged. Do not manually edit versions,
generated changelogs, tags, or `dist/` manifests. Packages released together
may use `workspace:^` internally; the workflow converts those values to
npm-compatible ranges in `dist/` just before publishing. Read the
[release strategy](docs/wiki/Release-Strategy.md) before working on release
behavior.

## Documentation

- [Architecture](docs/wiki/Architecture.md)
- [Contributing](docs/wiki/Contributing.md)
- [Release strategy](docs/wiki/Release-Strategy.md)
- [Style guide](docs/wiki/Style-Guide.md)
