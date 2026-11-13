---
ng-components: minor
---

Added tree mode to `DataGrid` (`acp-data-grid`), similar to PrimeNG's TreeTable.

- `treeChildren` (field or function) renders nested rows; `data` holds the root nodes.
  The `treeToggle` column option chooses the column with the indentation and toggle.
- Expanded state in `expandedTreeKeys` (two-way binding), with `isTreeNodeExpanded`,
  `toggleTreeNode`, `expandAll`, `collapseAll` and the `treeNodeExpand`/`treeNodeCollapse` outputs.
- Paging counts root nodes; sorting sorts siblings on each level.
- Multiple selection propagates to descendants and ancestors, with indeterminate parents
  (`treePropagateSelection`).
- Lazy loading with `treeHasChildren`, a loading spinner and `refreshTree()`.
- `role="treegrid"`, `aria-level`, `aria-expanded`, and ←/→ keys with `keyboardNavigation`.

Fixed: the row selection is no longer reset when an unrelated input changes (for example
`loading`); it is rebuilt only when `rowSelected`, `rowSelectable`, `multiSelectable` or `data`
change.
