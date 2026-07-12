# Architecture

## Color Palette

All diagrams use the Acontplus brand palette:

| Role                      | Color                      | Hex       |
| ------------------------- | -------------------------- | --------- |
| Level 0 — Foundation      | Maroon (brand dark)        | `#831742` |
| Level 1 — Core dependents | Magenta (brand primary)    | `#d61572` |
| Level 2 — Config layer    | Amber (brand accent)       | `#b97800` |
| Level 3 — Infrastructure  | Sky blue (brand secondary) | `#0a7db5` |
| Level 4 — Auth / feature  | Brand green                | `#0a8f64` |

---

## Package Dependency Map

How the 10 npm packages depend on each other — built from actual `peerDependencies` in `package.json` files.

```mermaid
---
config:
  htmlLabels: false
---
flowchart TD
  subgraph l0["`**Level 0** — no internal dependencies`"]
    direction LR
    utils["`**@acontplus/utils**
    Converters, Formatters
    Validators, Helpers`"]
    uikit["`**@acontplus/ui-kit**
    SVG Icons, Design Tokens
    Report Formats`"]
    ngcommon["`**@acontplus/ng-common**
    WhatsApp Cloud API
    Reports, Printing`"]
    ngcustomer["`**@acontplus/ng-customer**
    Customer Management
    SRI Integration`"]
  end

  subgraph l1["`**Level 1** — depend on Level 0`"]
    direction LR
    core["`**@acontplus/core**
    Domain Models, Result Pattern
    Pricing Engine, HTTP Adapters`"]
    ngnotif["`**@acontplus/ng-notifications**
    Toast, SweetAlert2
    Material Snackbar`"]
    ngcomp["`**@acontplus/ng-components**
    DataGrid, Theme Toggle
    DateRangeInput, Dialogs`"]
  end

  subgraph l2["`**Level 2** — depend on Level 1`"]
    ngconfig["`**@acontplus/ng-config**
    DI Tokens, ENVIRONMENT
    Repository Interfaces`"]
  end

  subgraph l3["`**Level 3** — depend on Level 2`"]
    nginfra["`**@acontplus/ng-infrastructure**
    HTTP Interceptors
    GenericRepository, CQRS`"]
  end

  subgraph l4["`**Level 4** — depend on Level 3`"]
    ngauth["`**@acontplus/ng-auth**
    JWT Auth, Route Guards
    OAuth/SSO, Login UI`"]
  end

  utils --> core
  uikit --> ngnotif
  uikit --> ngcomp
  core --> ngconfig
  ngconfig --> nginfra
  nginfra --> ngauth

  classDef l0 fill:#831742,color:#fff,stroke:#6a1235
  classDef l1 fill:#d61572,color:#fff,stroke:#b01260
  classDef l2 fill:#b97800,color:#fff,stroke:#9a6400
  classDef l3 fill:#0a7db5,color:#fff,stroke:#085e8a
  classDef l4 fill:#0a8f64,color:#fff,stroke:#087550

  class utils,uikit,ngcommon,ngcustomer l0
  class core,ngnotif,ngcomp l1
  class ngconfig l2
  class nginfra l3
  class ngauth l4
```

### Key observations

- **`utils` and `ui-kit`** are fully framework-agnostic — zero Angular dependencies. Safe to use in React, Vue, Node, or any JS/TS project.
- **`ng-common` and `ng-customer`** are standalone Angular packages — no internal `@acontplus` peer dependencies, independently upgradable.
- **`ng-auth`** is the deepest dependent — transitively pulls `core → ng-config → ng-infrastructure`. When `core` bumps, the cascade reaches `ng-auth` last.
- **Never install both `ng-infrastructure` and wire repositories manually** — the infrastructure layer handles all interceptor and repository registration.

---

## Release Groups (Nx Independent Versioning)

Packages are organized into three release groups in `nx.json`. Each group is versioned independently — a commit to `utils` does not force a release of `ng-auth`.

| Group            | Packages                                                                                 | Strategy           |
| ---------------- | ---------------------------------------------------------------------------------------- | ------------------ |
| **foundation**   | `utils`, `ui-kit`                                                                        | Versioned together |
| **angular-libs** | `core`, `ng-config`, `ng-notifications`, `ng-components`, `ng-infrastructure`, `ng-auth` | Independent        |
| **standalone**   | `ng-common`, `ng-customer`                                                               | Independent        |

---

## CI/CD Pipeline

```mermaid
sequenceDiagram
  autonumber
  participant Dev as Developer
  participant GH as GitHub PR
  participant CI as ci.yml
  participant Release as release.yml
  participant npm as npm Registry

  Dev->>GH: Open PR (feat/fix branch)
  GH->>CI: nx affected -t lint, build
  CI-->>GH: checks pass

  Dev->>GH: Merge PR to main
  GH->>Release: triggered automatically

  Release->>Release: nx release --skip-publish
  Note over Release: preVersionCommand builds dist/<br/>conventional commits determine bump<br/>CHANGELOG updated + git tag created

  Release->>GH: Push version commit + tags
  Release->>Release: npm install -g npm@latest
  Note over Release: Requires npm >= 11.5.1 for OIDC
  Release->>npm: npm publish dist/packages/* via OIDC
  npm-->>Release: Published with provenance attestation
```

---

## HTTP Request/Response Flow

How `@acontplus/ng-infrastructure` standardizes all API responses automatically.

```mermaid
flowchart LR
  comp([Component]) --> repo[GenericRepository]
  repo --> intercept[apiInterceptor]
  intercept --> api[(Backend API)]
  api --ApiResponse--> intercept
  intercept --unwrapped data--> repo
  intercept -.->|toast notification| notif[NotificationService]
  repo --> comp

  classDef layer fill:#d61572,color:#fff,stroke:#b01260
  classDef ext fill:#831742,color:#fff,stroke:#6a1235
  class intercept,repo layer
  class api,notif ext
```

All HTTP responses are automatically transformed to `ApiResponse<T>`. Use `SKIP_NOTIFICATION` HttpContext token to suppress toasts for silent operations. See [[API-Response-Handling]].
