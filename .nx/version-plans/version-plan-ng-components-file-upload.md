---
ng-components: minor
---

Added `AcpFileUpload` (`acp-file-upload`), a file picker and uploader similar to PrimeNG's
FileUpload.

- `advanced` mode with toolbar, drag-and-drop zone, image previews and progress; `basic` mode with
  a single button; `auto` upload.
- Uploads with `HttpClient` (`multipart/form-data`) to `url`, with `beforeUpload`,
  `uploadProgress`, `uploadSuccess` and `uploadError`; or `customUpload` with `uploadHandler` and
  `completeUpload()`.
- Validation of `accept`, `maxFileSize` and `fileLimit` with configurable Spanish messages.
- Works with `ngModel` and reactive forms (value: `File[]` or `null`).
- `#file`, `#empty` and `#toolbar` templates.
