# Contributing to acontplus-libs

Thank you for your interest in contributing to acontplus-libs! This document
provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Versioning](#versioning)

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for
all contributors. Please be respectful and considerate of others when
participating in this project.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/acontplus-libs.git
   cd acontplus-libs
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Set up the upstream remote**:
   ```bash
   git remote add upstream https://github.com/acontplus/acontplus-libs.git
   ```

## Development Workflow

1. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   or

   ```bash
   git checkout -b fix/issue-description
   ```

2. **Make your changes** following the [coding standards](#coding-standards).

3. **Run affected tests** to ensure your changes don't break existing
   functionality:

   ```bash
   pnpm exec nx affected -t test
   ```

4. **Run affected linting** to check code quality:

   ```bash
   pnpm exec nx affected -t lint
   ```

5. **Build affected projects** to verify your changes compile:

   ```bash
   pnpm exec nx affected -t build
   ```

6. **Format code** if needed:

   ```bash
   pnpm run format
   ```

7. **Commit your changes** with a descriptive commit message:

   ```bash
   git add .
   git commit -m "feat: add new feature" # for features
   git commit -m "fix: resolve issue with component" # for bug fixes
   git commit -m "docs: update documentation" # for documentation changes
   git commit -m "refactor: improve code structure" # for code refactoring
   git commit -m "test: add tests for component" # for adding tests
   ```

8. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

9. **Create a pull request** from your fork to the main repository.

### Nx-Specific Workflow Tips

- **Use affected commands** to only run operations on projects affected by your
  changes
- **Check the dependency graph** with `pnpm exec nx graph` to understand project
  relationships
- **Use Nx Console** in VS Code for visual command execution
- **Run the affected test suite** before submitting a PR:
  `pnpm exec nx affected -t test --base=origin/main --head=HEAD`
- **Build all libraries** before submitting: `npm run build:libs`

## Pull Request Process

1. **Update the README.md** with details of changes if applicable.
2. **Do not edit generated package changelogs manually.** Nx Release creates
   project changelog entries for versioned releases.
3. **Ensure all tests pass** and your code follows the project's coding
   standards.
4. **Add appropriate labels** to your pull request.
5. **Request a review** from one of the project maintainers.
6. **Address any feedback** provided during the review process.
7. **Once approved**, your pull request will be merged by a maintainer.

## Coding Standards

We follow the [Angular Style Guide](https://angular.io/guide/styleguide) for
this project. Additionally:

- Use TypeScript features like strong typing, interfaces, and access modifiers.
- Document public APIs with JSDoc comments.
- Follow the project's [style guide](docs/style-guide.md) for component design
  and usage.
- Use consistent naming conventions:
  - Components: `kebab-case` for selectors, `PascalCase` for class names
  - Services: `PascalCase` for class names
  - Interfaces: `PascalCase` with descriptive names
  - Files: `kebab-case.type.ts` (e.g., `user-profile.component.ts`)

## Testing Guidelines

- Write unit tests for new behavior and regressions; place them beside the code as
  `*.spec.ts` or `*.test.ts`.
- Use `pnpm exec nx test <project>` for the smallest relevant test target.
- Cover error paths and public behavior. Prioritize authentication, authorization,
  calculations, persistence, and public package APIs.
- Do not add Jest configuration or imports. This workspace uses Vitest; see the
  [testing strategy](docs/wiki/Testing.md).

## Documentation Guidelines

- Document all public APIs with JSDoc comments.
- Update the README.md file with any new features or changes.
- Add usage examples for new components or services.
- Update the component API documentation in docs/component-api.md.
- Follow the documentation style in the existing codebase.

## Versioning

We use [Semantic Versioning](https://semver.org/) for this project:

- MAJOR version for incompatible API changes (X.y.z)
- MINOR version for adding functionality in a backward-compatible manner (x.Y.z)
- PATCH version for backward-compatible bug fixes (x.y.Z)

---

Thank you for contributing to acontplus-libs! Your efforts help make this
project better for everyone.
