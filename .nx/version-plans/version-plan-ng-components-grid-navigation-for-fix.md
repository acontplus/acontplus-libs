---
ng-components: patch
---

Fixed `acpGridNavigationFor` keyboard navigation from a search input.

- It no longer requires `keyboardNavigation` on the grid; the directive alone enables it.
- ArrowDown/ArrowUp wrap around within the page (last row to first and vice versa).
- PageDown on the last page activates the last row; PageUp on the first page activates the first
  row (also with the grid's own keyboard navigation).
- When the results change, the grid goes back to the first page.
- Ignores keys with Ctrl/Meta and during IME composition.
- Accepts a grid that is not rendered yet (`null`/`undefined`), so the grid can live in an overlay
  `ng-template` for an autocomplete; the first row becomes active when the grid appears.
