---
ng-components: minor
---

AcpDataGrid: implement `small`, `medium` and `large` sizes (`medium` is the new default; `normal` is deprecated and maps to `medium`), translate the default column menu button text to Spanish, and fix `currency` columns rendering a `null` prefix when `typeParameter.display` is not set.

Context menu fixes: selections and close events are emitted only by the instance that opened the menu (previously every `acpContextMenu`/`acp-contextmenu` on the page emitted), `acp-contextmenu` now opens on right-click of its `target`, keyboard navigation skips separators and disabled items, `closeOnEscape: false` is respected, `contextMenuClosed`/`hide` fire however the menu closes, `AcpContextMenuRef.updateItems`/`updateData` now update the open panel, and right-clicking outside an open menu opens the menu of the element underneath. `AcpContextMenuService` adds `itemSelectedFor$()`, `closedFor$()` and an optional `owner` argument to `open()`.
