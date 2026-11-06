---
ng-components: major
---

AcpDataGrid: implement `small`, `medium` and `large` sizes (`medium` is the new default; `normal` is deprecated and maps to `medium`), translate the default column menu button text to Spanish, and fix `currency` columns rendering a `null` prefix when `typeParameter.display` is not set.

Context menu fixes: selections and close events are emitted only by the instance that opened the menu (previously every `acpContextMenu`/`acp-contextmenu` on the page emitted), `acp-contextmenu` now opens on right-click of its `target`, keyboard navigation skips separators and disabled items, `closeOnEscape: false` is respected, `contextMenuClosed`/`hide` fire however the menu closes, `AcpContextMenuRef.updateItems`/`updateData` now update the open panel, and right-clicking outside an open menu opens the menu of the element underneath. `AcpContextMenuService` adds `itemSelectedFor$()`, `closedFor$()` and an optional `owner` argument to `open()`.

AcpDataGrid keyboard navigation (PrimeNG-style): `keyboardNavigation` is now implemented and on by default. Rows use a roving tabindex (one Tab stop) and support arrows, Home/End, PageUp/PageDown, Enter (row click), Space (toggle selection) and Ctrl+A (select all). `highlightedRowIndex` and `focusedRowChange` now work. New `acpGridNavigationFor` directive lets a search input drive the grid rows while keeping the focus. New public grid members: `gridId`, `renderedRows`, `activeRow`, `activeRowIndex`, `setActiveRow()`, `moveActiveRow()`, `activateActiveRow()`, `nextPage()`, `previousPage()`. `KeyboardNavigationService` and `FocusableElement` were removed.

AcpAlert rework: new `variant` (`soft`, `outlined`, `filled`), `heading`, per-type `icon` (`showIcon` to hide it), `[acpAlertActions]` slot, `closeLabel` (default `Cerrar`), and `close()`/`open()`/`isOpen()`. The close button now hides the alert. Colors were reworked to match `acp-badge` (warning is now orange) and to stay subtle in both light and dark themes; soft text uses the theme text color and every combination meets WCAG AA. `role` is `alert` for warnings and errors and `status` otherwise. Inputs are now signal inputs and the built-in `margin-bottom` was removed.

AcpBadge colors: semantic colors (`success`, `warning`, `danger`, `info`) are softened in dark mode, like `acp-alert`, instead of the saturated Material tone 80. `tonal` text is darkened in light mode and `neutral` uses `on-surface-variant` as text outside `filled`, so every color and variant now meets WCAG AA contrast (previously `tonal` was 4.2:1 and `soft`/`text` neutral 1.1:1).
