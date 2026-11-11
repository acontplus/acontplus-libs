---
ng-infrastructure: major
---

**Breaking:** `AngularHttpAdapter` was removed — it was unused public API. Consumers needing an `HttpPort` implementation can implement the `@acontplus/core` `HttpPort` interface directly.

`@acontplus/ng-infrastructure` HTTP interceptors: global toast notification modes, per-request idempotency keys, and a single error-notification path.

`HttpContextConfig` gains `notifications?: 'all' | 'errors-only' | 'off'` (default `'all'`, backward compatible) so apps can disable automatic toasts entirely or keep only error notifications. Precedence is `SKIP_NOTIFICATION` > `SHOW_NOTIFICATIONS` > global mode > automatic heuristic (mutations only, excluding read-like URLs); `SHOW_NOTIFICATIONS: true` still forces a toast even when the mode is `'off'`.

`httpContextInterceptor` gains opt-in `Idempotency-Key` support for mutation requests (POST/PUT/PATCH/DELETE): `enableIdempotency` + `idempotencyKeyHeader` config options, and a new `withIdempotencyKey(key?)` HttpContext helper that sends an explicit or auto-generated UUID key per request.

Bug fixes in `apiInterceptor`: error envelopes (`status: 'error'` inside HTTP 200) no longer produce a duplicate toast, warning envelopes without a primary `message` now show their individual `warnings[]` entries, and individual `errors[]` entries are still surfaced as detail toasts. The interceptor implementation was split into `api-response.ts` (standardization/transform) and `api-notifications.ts` (toast policy); the public API is unchanged.
