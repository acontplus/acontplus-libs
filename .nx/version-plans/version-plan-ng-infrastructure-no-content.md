---
ng-infrastructure: patch
---

`apiInterceptor` no longer shows the generic "Operation completed successfully" toast for responses
without a body (for example `204 No Content`). The consumer now receives `null` as the body instead
of a synthesized `ApiResponse` envelope.
