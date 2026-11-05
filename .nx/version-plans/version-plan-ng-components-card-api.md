---
ng-components: major
ng-customer: patch
---

Reworked `AcpCard` props: `title`/`subtitle` inputs, `color`, `hoverable`, `loading`, `actionsAlign`, `clicked` output with keyboard support, typed slot directives (`acpCardTitle`, `acpCardActions`, ...) and `provideAcpCardDefaults()`. `appearance`, `elevation`, `imageRatio` and `padding="none"` now take effect.

Reworked `AcpKpiCard`: locale-aware `Intl.NumberFormat` formatting (`valueFormat`, `locale`, `prefix`, `suffix`), trend inferred from `percentage`, sentiment-colored delta badge with `lowerIsBetter`, `trendLabel` and optional trend icon (`showTrendIcon`), `align` (`start` | `center` | `end`), working `size` variants, readable `outlined`/`tonal` variants, keyboard support for `clickable`, and a value of `0` is now displayed.

`ng-customer` now uses `AcpCard` in the customer form, so section titles render.

BREAKING CHANGE: removed `DynamicCard` (`acp-dynamic-card`); use `AcpCard`. `AcpCard`: removed `backgroundColor` (use `color`), `hover` (use `hoverable`) and `outlined` (use `appearance="outlined"`) inputs; removed the `default`, `interactive` and `compact` appearances; removed the `AcpCardBadge` and `AcpCardBackgroundColor` types; `AcpCardConfig` no longer accepts per-instance state. `AcpKpiCard`: removed `href` and the `actionClicked` output (both unused), the `white` color (use `surface`), `KPI_CARD_TOKENS`, `AcpKpiCardLayout`, `formatValue` and the `color` field of `AcpKpiCardTrendConfig`; the header icon is no longer replaced by the trend icon; the `kpi-card-container-height` and `kpi-card-container-elevation` theme tokens were removed.
