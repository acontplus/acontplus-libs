---
ng-components: patch
---

`AcpTabulator`: if Tabulator rejects the latest data update, the next `data` change replaces all
rows instead of applying incremental updates against rows the table never received.
