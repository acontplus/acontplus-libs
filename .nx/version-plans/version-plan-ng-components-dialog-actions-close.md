---
ng-components: patch
---

`AcpDialogService` footer `actions` now close the dialog with `action.result` (or `action.key`), as
documented. Clicks were only emitted on `clickedResult`, so the dialog stayed open. Call
`event.preventDefault()` in a `clickedResult` subscriber to keep it open; a subscriber that closes
the dialog itself keeps its own result.
