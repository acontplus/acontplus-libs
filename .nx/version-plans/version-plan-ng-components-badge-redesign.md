---
ng-components: major
---

Rebuilt `AcpBadge` on native elements with the MaterialPro look and a consistent API.

- Renders a `<span>`, a native `<a>` (`routerLink` / `href`) or a native `<button>`
  (`clickable`) instead of `mat-chip`. Fixes `removed` being emitted twice, the remove click also
  emitting `clicked`, `href` not navigating and the ignored accessible name.
- Look: `tonal` (15% tint, pill, 500 weight) is the new default variant; text sizes follow the
  theme typescale.
- Renamed `danger` to `error`, `ariaLabelOverride` to `ariaLabel`; sizes are now `xs-small`,
  `small`, `medium` and `large`; removed the `soft` variant (use `tonal`), the `highlighted` input
  (use `selected`) and the `none` trend (leave `trend` unset).
- `trend` no longer adds arrow characters to the value; it announces the change to screen readers
  and supports `lowerIsBetter`. `selected` only sets `aria-pressed` when bound. `clicked` emits a
  `MouseEvent`.
- Slots are typed directives (`ACP_BADGE_SLOTS`: `acpBadgeIcon`, `acpBadgeTrailingIcon`) instead
  of `#icon` / `#trailingIcon` template references.
- New `ACP_BADGE_DEFAULT_OPTIONS` / `provideAcpBadgeDefaults()` for app-wide defaults and screen
  reader labels. `ACP_BADGE_*` value lists now define the types (`as const`).
- Theme tokens use `<color>-bg` / `-fg` / `-accent`; `TREND_CONFIGS` and `AcpBadgeTrendConfig` are
  no longer exported.
