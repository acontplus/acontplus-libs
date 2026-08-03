# Release Strategy

This monorepo uses Nx Release version plans for independent, package-level
releases. A reviewed plan merged to `main` runs the release workflow, which
versions only the listed packages, creates project changelogs and tags, then
publishes built packages to npm.

## Release flow

```text
code change + version plan → CI plan check → merge to main → nx release --skip-publish → npm publish dist/packages/*
```

The release workflow builds libraries before versioning. On a versioned release,
Nx updates both `packages/<name>/package.json` and
`dist/packages/<name>/package.json`; npm publishes only from `dist/`.

## Version source and dry runs

Each package resolves its current version from a tag matching:

```text
{projectName}@{version}
```

Examples: `core@1.1.6`, `ng-auth@2.3.0`, and `utils@1.1.2`.

Before investigating or changing release behavior, run:

```bash
pnpm exec nx release --dry-run
```

The dry run reports the tag used, detected changes, planned manifest updates,
and changelog entries without changing files, commits, tags, remotes, or npm.
If it reports no conventional changes, it intentionally leaves source and dist
manifests untouched.

## Version plans

Conventional Commits remain the repository's commit convention, but they do
not select package versions. Each releasable change needs a tracked Markdown
plan in `.nx/version-plans/`; CI runs `nx release plan:check` on pull requests
to enforce this. The plan's YAML front matter maps exact project names to
`major`, `minor`, or `patch`, and its Markdown body becomes the changelog entry.
Test-only changes are exempt from the check.

## Framework compatibility releases

A change to an Angular library's supported Angular major is a breaking public
contract. When moving the Angular peer range from one major to the next,
release every affected `ng-*` package with a SemVer major, even when its API
source has not otherwise changed. Create one plan containing all affected
projects, for example:

```md
---
ng-auth: major
ng-common: major
---

Angular 22 compatibility release.
```

Use `pnpm exec nx release plan` to generate a plan interactively, or add one
manually. The release workflow remains the authority for version fields, tags,
changelogs, and publishing; do not hand-edit generated output.

## Release groups and dependency updates

The packages are organized as `foundation`, `angular-libs`, and `standalone`
release groups. Versions remain independent. With `updateDependents: "auto"`,
Nx updates affected internal dependency ranges and releases dependents when
necessary.

Source manifests may use `workspace:^` for internal dependencies that are
released together. Before publishing, the release workflow materializes those
references in each `dist/packages/*/package.json` using the versions selected
by Nx Release. This is required because npm publishing does not accept the
`workspace:` protocol. Keep the source protocol intact and let
`tools/prepare-dist-package-manifest.mjs` perform the conversion immediately
before `npm publish`; never manually maintain the generated range in `dist/`.

Project changelogs are enabled; there is no workspace changelog because a
single workspace version is not meaningful with multiple independent groups.

## Publishing and security

Publishing occurs only in `.github/workflows/release.yml` after Nx has created
the release commit and tags. npm OIDC trusted publishing is the primary method,
with provenance enabled. The workflow retains an `NPM_TOKEN` fallback for the
documented scoped-package OIDC failure path; it must remain a GitHub secret and
must never be committed.

Do not manually edit package versions, generated project changelogs, tags, or
`dist/` manifests. Use the dry run to validate expected changes and let the
release workflow perform the publish.

## Interrupted publish recovery

The workflow has one deliberately narrow manual recovery operation:
`publish-angular-22-majors`. Use it only when the Angular 22 release was
versioned and tagged successfully but its npm publish job was cancelled or
failed. It rebuilds and publishes the existing versions of `ng-auth`,
`ng-common`, `ng-components`, `ng-config`, `ng-customer`,
`ng-infrastructure`, and `ng-notifications`. It checks npm first and skips a
package that was already published, so retrying it is safe. It does not run Nx
versioning, create tags, update changelogs, or change source manifests.

## Release validation

For release, peer-dependency, package-boundary, or build-configuration
changes, validate formatting and run the relevant Nx targets before merging:

```bash
pnpm run format:check
pnpm exec nx run-many -t lint
pnpm exec nx run-many -t test --exclude=demo-app
pnpm exec nx run-many -t build --exclude=demo-app,acontplus-erp
```

Use focused targets for smaller changes and add E2E coverage when an
application behavior is affected.
