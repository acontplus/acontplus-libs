<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly.
- Use Nx workspace/project inspection tools when available. If they are unavailable, inspect the checked-in `nx.json` and the relevant `project.json` before assuming a target exists.
- For Nx configuration or project-graph errors, inspect the workspace configuration and report the exact error; do not guess at configuration changes.

<!-- nx configuration end-->

# Acontplus Libraries

## Scope and structure

- This is a pnpm (`pnpm@11.9.0`) + Nx 23.1 monorepo on Angular 22.1 and TypeScript 6. It ships public TypeScript and Angular libraries; changes to `packages/*` are potentially published to npm.
- `packages/core`, `packages/utils`, and `packages/ui-kit` are TypeScript libraries built with `@nx/js:tsc`. `packages/ng-*` are Angular libraries built with `@nx/angular:package`.
- `apps/demo-app` is the component/library showcase. `apps/acontplus-erp` is an application consumer. Their Playwright projects are `demo-app-e2e` and `acontplus-erp-e2e`.
- The public API of every library is its `packages/<name>/src/index.ts`. Do not expose an internal symbol, add a deep-import path, or change an exported API without treating it as a release-impacting change. Update the package README when its public usage changes.
- Read the relevant package README and `project.json` before changing a library. Use the established architecture: domain/core contracts and use cases are separate from Angular infrastructure (adapters, repositories, interceptors) and UI.

## Implementation conventions

- Write strict TypeScript. The base config enables `strict`, `noImplicitReturns`, `noImplicitOverride`, `noFallthroughCasesInSwitch`, and `noPropertyAccessFromIndexSignature`; resolve type errors rather than suppressing them.
- Follow nearby code for Angular patterns. The workspace uses standalone components, `inject()`, Angular Material, SCSS, and explicit `ChangeDetectionStrategy` (usually `Eager`, sometimes `OnPush`). Do not make a cross-cutting style migration as part of a feature or fix.
- Preserve the package boundary: consumers should import from `@acontplus/<package>`, not another package's `src/` files. Keep provider/configuration changes backward compatible where practical.
- Prettier is authoritative: 100-character width and single quotes; HTML uses the Angular parser. Do not hand-format generated output.
- Do not add dependencies, change peer-dependency ranges, edit lockfiles, or alter generated `dist/` output unless the task requires it. Never commit credentials or private keys.

## Development and validation

- Install with `pnpm install --frozen-lockfile` when reproducing CI; CI uses Node 24 (packages declare Node 18+ compatibility).
- Prefer focused Nx commands from the repository root:
  - Inspect projects/targets: `pnpm exec nx show projects` and `pnpm exec nx show project <project>`.
  - Lint: `pnpm exec nx lint <project>`.
  - Unit test: `pnpm exec nx test <project>`.
  - Build: `pnpm exec nx build <project>`.
  - End-to-end: `pnpm exec nx e2e demo-app-e2e` or `pnpm exec nx e2e acontplus-erp-e2e`.
  - Changed-workspace validation: `pnpm exec nx affected -t lint,test,build --base=origin/main --head=HEAD` (adapt the base/head refs to the checkout).
- Run the smallest relevant checks first; for a library public API, packaging, dependency, or shared-infrastructure change, also build the affected library and its consumers when feasible. CI currently runs affected lint, unit tests, and build (excluding `demo-app`) on pull requests.
- Unit testing uses Vitest. Angular projects run it through Angular's native `@angular/build:unit-test` builder; TypeScript-only packages use the official `@nx/vitest` inferred target. Do not introduce Jest configuration or imports.
- Before handoff, run `pnpm run format:check` for changed source/docs. The pre-commit hook runs workspace lint and this formatting check, so fix failures rather than bypassing hooks.

## Releases, commits, and documentation

- Releases are independent per package and use Nx Release with conventional commits. Nx resolves the current version from `{projectName}@{version}` tags and updates both the source and `dist` manifests on a versioned release. Before release work, use `pnpm exec nx release --dry-run` and review its output. Allowed commit types are `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, and `test`; use `<type>(<scope>): <description>` with a description of 50 characters or fewer.
- A supported Angular-major change is breaking for every affected Angular package: use a SemVer major and a Conventional Commit `!` marker plus `BREAKING CHANGE:` footer. Preview explicit major selections with `pnpm exec nx release version --specifier major --projects=<affected-projects> --dry-run`.
- Internal dependencies released together may use `workspace:^` in source manifests. Preserve that protocol; the release workflow runs `tools/prepare-dist-package-manifest.mjs` immediately before npm publishing to materialize npm-compatible versions in `dist/`.
- Do not manually publish, change versions, create release tags, or edit generated changelogs unless explicitly asked. The `main` release workflow builds, versions, tags, and publishes packages.
- Keep documentation focused: update a package README for a user-visible library change; update `docs/wiki/` only for wiki content. Changes under `docs/wiki/` publish to the GitHub wiki, so avoid unrelated edits there.
