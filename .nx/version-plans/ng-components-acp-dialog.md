---
ng-components: minor
---

Introduce `AcpDialogService` (formerly `AcpDialog`), a reusable, strongly-typed
dialog service built on Angular Material. Add `AcpDialog`, `AcpDialogContent`,
`AcpDialogTitlebar` and `AcpDialogActions` as declarative layout components.
Includes `AcpDialogContainer`, `AcpDialogRef`, `ACP_DIALOG_DATA` and
`provideAcpDialogDefaults`. Supports reactive `disabled`/`loading` action
states (boolean, `Signal` or `Observable`), a shared action-click stream between
caller and content, configurable and declarative header/footer components,
content `bindings`, and sizing, focus and close behavior.

**BREAKING CHANGE**: The service class `AcpDialog` has been renamed to
`AcpDialogService` to free the `acp-dialog` selector for the new declarative
wrapper component. Update call sites from `inject(AcpDialog)` to
`inject(AcpDialogService)`.
