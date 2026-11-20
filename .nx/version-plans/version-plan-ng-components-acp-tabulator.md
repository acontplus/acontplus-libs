---
ng-components: minor
---

Add `AcpTabulator` (`acp-tabulator`), a signal-driven Tabulator table: `data` synced by `index`
(edited rows update alone, so an editor open in another row survives), declarative row `actions`
(theme colors, `filled` or `tonal`, automatic width), `readonly`, `rowNumbers`, `maxRows`,
`groupBy`, `editCell(key, field)`, and `cellEdited` with `revert()`. Tabulator runs outside the
Angular zone. Column helpers `AcpColumns.text/number/money/list` with `acpTextEditor`,
`acpNumberEditor` and `acpMoneyFormatter`. acontpluspro skin for the table, popups, group rows,
frozen columns and actions.

`acp-tabulator-table` and `acp-tabulator` share `registerAcpTabulatorModules`, which now also
registers ResizeColumns, ResizeTable, Filter, FrozenColumns, FrozenRows, GroupRows, Keybindings,
Menu, Mutator and Accessor: resizable columns, header filters, grouping, frozen columns and keyboard
navigation work without extra setup. Heavy modules are opt-in with
`provideAcpTabulator({ modules })`.

`TabulatorTable` (`acp-tabulator-table`) is marked legacy and `@deprecated` in favor of
`AcpTabulator`; it keeps working for existing screens.
