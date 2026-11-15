---
ng-components: minor
---

Added `acontpluspro`, the global look inspired by MaterialPro:
`@use '@acontplus/ng-components/acontpluspro';` after the prebuilt themes.

- Typography (Poppins, 14px body, 400-weight buttons), elevations (`--mat-sys-level1/2` as soft
  shadows), 10px corners, borders and white surfaces on a blue-gray background, applied through
  tokens to Material components (card, dialog, menu, select, autocomplete, datepicker, form field,
  expansion, table, paginator, sidenav, list, FAB, tooltip, button toggle) and to acontplus
  components (card, grid, KPI card, popover, drawer, dialog, side menu, top menu, sidebar header,
  user panel). The top menu becomes a white bar with pill items aligned with the header to the
  boxed width.
- Compact menus and select options: menu items 36px high with 13px text, 12px sides and 18px icons
  (Material menu tokens), menu panels 160-320px wide, select options 33px high with ~14px text.
  The panels of the acontplus widgets keep their own sizes.
- Configurable with `acontpluspro-apply($overrides)` and `$acontpluspro-palette`; exposes
  `--acp-skin-*` variables and the `acp-card-border`, `acp-boxed` and `acp-page-boxed` classes.
- Removed `global-variables` (`@acontplus/ng-components/global-variables` and its `_index`
  forward): acontpluspro is the single global style layer and emits every variable it defined
  (layout sizes, body, code, link, header, top menu, side menu, user panel). Remove the
  `@use '@acontplus/ng-components/global-variables'` import. Layout components read the sizes
  with defaults from `acp-system.$layout` (`acp-system-layout()`), and colors with Material
  fallbacks, so they work without acontpluspro. Dropped the unused `--acp-topmenu-background-color`
  and the toolbar height overrides (they equal Material's defaults).
- Text scale from MaterialPro: `--acp-sys-text-<xs|sm|base|lg|xl|2xl|3xl>-size` / `-line-height`
  and `--acp-sys-font-weight-<normal|medium|semibold|bold>`, with the `.acp-text-*` and
  `.acp-font-*` utility classes (`acontpluspro-utilities($prefix)` generates them with another
  prefix, e.g. `''` for Tailwind names).
