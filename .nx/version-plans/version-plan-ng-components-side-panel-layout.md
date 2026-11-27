---
ng-components: minor
---

Add `acp-side-panel-layout` (`AcpSidePanelLayout`): a page section with a list of options on the
side and the content of the selected one, in the MaterialPro apps style. Inputs `title`, `items`
(`AcpSidePanelItem`: `id`, `label`, `icon`, `description`, `disabled`, `badge`), `[(selected)]`,
`panelWidth`, `compactQuery`, `position` (`start` / `end`), `showHeading`, `labels`, `toggleable`
and `[(panelOpened)]`. Below `compactQuery` (default 992px) the panel floats over the content and
opens with the menu button; with `toggleable` that button also hides and shows the panel on wide
screens. Slots `acpSidePanelActions`, `acpSidePanelHeader` and `acpSidePanelFooter`, custom items
with `<ng-template acpSidePanelItem>`, app-wide defaults with `provideAcpSidePanelDefaults` and
styling through `--acp-side-panel-*` (acontpluspro sets border, radius, active item and badge from
the theme).

`acp-customizer`: returning from the top navigation to the side one no longer leaves a collapsed and
closed sidenav without a toggle to open it. The customizer keeps the sidenav state it had on load
and sends it back with every change.
