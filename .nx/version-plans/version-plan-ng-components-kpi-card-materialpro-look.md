---
ng-components: major
---

Redesigned `AcpKpiCard` (MaterialPro look) and cleaned up its API.

- Look: `variant="default"` is a raised surface with a soft shadow, a dark value and the icon in a
  15% tinted tile of `color`; `elevated`, `outlined` (neutral border) and `tonal` (15% tint) sit on
  a surface; `filled` is the solid `color` container. Text sizes follow the theme typescale,
  corners use `corner-small` and the delta badge is a light tinted pill.
- Renamed `percentage` / `percentageFormat` to `delta` / `deltaFormat`.
- Sizes are now `xs-small`, `small`, `medium` and `large` (same scale as `acp-data-grid`).
- Removed the `success-light`, `warning-light`, `error-light`, `info-light` and `surface` colors:
  use `variant="tonal"` with the base color, or the default variant.
- `routerLink` renders a native link and `clickable` a native button stretched over the card, so
  keyboard activation, Ctrl+click and screen readers work; the menu and footer stay clickable.
  `selected` only sets `aria-pressed` when bound.
- Title is plain text by default; `headingLevel` renders it as a heading.
- Slots are now typed directives (`ACP_KPI_CARD_SLOTS`: `acpKpiCardIcon`, `acpKpiCardAvatar`,
  `acpKpiCardFooter`, `acpKpiCardActions`) instead of `#icon`-style template references.
- New `ACP_KPI_CARD_DEFAULT_OPTIONS` / `provideAcpKpiCardDefaults()` for app-wide defaults and
  screen reader labels (`increase`, `decrease`, `noChange`, `moreOptions`).
- Theme tokens use `-fg` for content colors (`<color>-fg`, `delta-*-fg`); `KPI_CARD_TREND_CONFIGS`
  and `inferKpiTrend` are no longer exported.
