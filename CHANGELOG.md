# Changelog

All notable changes to the acontplus-libs project will be documented in this
file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Current Package Versions

| Package                      | Version |
| ---------------------------- | ------- |
| @acontplus/utils             | 1.1.0   |
| @acontplus/core              | 1.1.4   |
| @acontplus/ui-kit            | 1.0.2   |
| @acontplus/ng-common         | 1.0.12  |
| @acontplus/ng-config         | 2.0.3   |
| @acontplus/ng-components     | 2.1.28  |
| @acontplus/ng-notifications  | 2.0.5   |
| @acontplus/ng-infrastructure | 2.0.8   |
| @acontplus/ng-customer       | 2.1.0   |
| @acontplus/ng-auth           | 2.1.7   |

### Added

- **ng-customer**: Customer form configuration, SRI integration enhancements,
  company customer add/edit dialog, customer validators, and form components
- **ng-auth**: Multi-tenant OAuth / Enterprise SSO support, CSRF interceptor,
  OAuth callback component, domain discovery
- **ng-components**: DateRangePicker, DataGrid, AlertDialog, Drawer, Popover,
  AutocompleteWrapper components
- **ng-common**: WhatsApp Cloud API facade, report generation facade, printer
  facade, builders and utilities
- **ng-infrastructure**: CQRS pattern with Command and Query abstractions,
  repository factory pattern
- **core**: Pricing engine with discount, tax, profit, and line item calculators
- **utils**: DecimalConverter with chain operations and financial calculations

### Changed

- **Documentation**: Aligned all README files with actual codebase exports and
  API surfaces
- **Versioning**: Corrected historical version gaps across all packages following
  strict semver based on commit history
- **Peer dependencies**: Aligned all peer dependency ranges across the
  dependency chain (utils → core → ng-config → ng-infrastructure → ng-auth)

### Fixed

- **ng-customer**: Resolved lint errors (no-useless-assignment) across multiple
  files
