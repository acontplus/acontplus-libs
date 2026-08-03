# Testing strategy

## Standard

This workspace keeps unit tests. Jest has been removed in favor of Vitest:

- Angular applications and Angular libraries run Vitest through the native
  `@angular/build:unit-test` builder provided by Angular 22.
- TypeScript-only packages use inferred targets from the official `@nx/vitest`
  plugin.
- Playwright remains the end-to-end test runner for the applications.

Use Nx for every task:

```bash
# One project
pnpm exec nx test ng-infrastructure

# A single Vitest test file in a TypeScript-only package
pnpm exec nx test core -- src/path/to/file.spec.ts

# Changed projects, as CI does
pnpm exec nx affected -t test --base=origin/main --head=HEAD
```

The configured test targets do not watch by default, which makes local commands and
CI deterministic. Pass the runner's watch option only when working interactively.
Only projects with test files expose a native Angular test target. This keeps CI
meaningful while the suite grows; when adding the first Angular test to a package,
add the same `@angular/build:unit-test` target used by `ng-infrastructure` and point
it to a dedicated `@angular/build:ng-packagr` `test-build` target. TypeScript-only
packages already expose an inferred Vitest target and accept an empty suite.

## Test design

- Keep tests beside the implementation and name them `*.spec.ts` or `*.test.ts`.
- Test observable behavior and edge cases, rather than implementation details.
- Start with public APIs, security-sensitive paths, calculations, persistence, and
  regressions. Add E2E coverage when a flow crosses application boundaries.
- Use `vi` from `vitest` for mocks and spies when they are necessary. Do not use
  Jest globals or Jest-specific configuration.

## Coverage

Coverage is available on demand; it is not a blocking global percentage because the
existing suite is still being built out. Run `pnpm exec nx test <project> --coverage`
when assessing a meaningful change, then raise thresholds only after the relevant
package has stable, representative coverage.
