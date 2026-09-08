---
ng-components: minor
---

Fix dialog configuration handling in `AdvancedDialogService` and `DialogWrapper`: preserve the
`full-screen-dialog` panel class when using `size: 'full'` or mobile full-screen, honor the
`minHeight`, `restoreFocus`, and `escapeKeyClosable` options (Escape and backdrop click can now be
configured independently), support signal inputs when passing `data` to wrapped content components,
and add the `closeAriaLabel` option for accessible close-button labels.
