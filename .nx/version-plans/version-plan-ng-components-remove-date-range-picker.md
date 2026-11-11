---
ng-components: major
---

Removed `DateRangePicker` and its `ngx-datex` dependency.

- Deleted the `date-range-picker` component (`DateRangePicker`,
  `DateRangePickerOptions`, `DateRangeValue`) and its re-exports of
  `ngx-datex` symbols (`NgxDatex`, `SPANISH_LOCALE`, `MATERIAL_LIGHT_THEME`
  and related types).
- Removed the `ngx-datex` and `@formkit/tempo` peer dependencies.
- Apps that need date-range selection should use `AcpDateRangeInput`
  (`date-range-input`) instead.
