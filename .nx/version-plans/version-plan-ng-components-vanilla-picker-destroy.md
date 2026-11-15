---
ng-components: patch
---

Fixed `AcpVanillaDateRangePicker` leaving its dropdown in the page after the component is destroyed
(closing a dialog or leaving the page showed the ranges list at the bottom of the page).

- The component now removes the picker on destroy. The picker container is appended to `<body>`,
  outside the component, and its styles are removed with the component.
- `DateRangePicker.remove()` now detaches the container from the DOM (it only dropped the
  reference) and removes the window `resize` listener (it added it again).
