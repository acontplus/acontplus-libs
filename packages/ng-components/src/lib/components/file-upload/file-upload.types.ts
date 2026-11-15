import { HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';

/** `advanced`: toolbar, drop zone and file list. `basic`: a single button. */
export type AcpFileUploadMode = 'advanced' | 'basic';

export type AcpFileUploadMethod = 'post' | 'put';

export type AcpFileUploadHeaders = HttpHeaders | Record<string, string | string[]>;

/** State of a file shown in the list. */
export type AcpFileUploadStatus = 'pending' | 'uploaded';

/** Why a chosen file was rejected. */
export type AcpFileUploadRejection = 'size' | 'type' | 'limit';

export interface AcpFileUploadRejectedFile {
  file: File;
  reason: AcpFileUploadRejection;
  message: string;
}

export interface AcpFileUploadSelectEvent {
  originalEvent: Event;
  /** Valid files added by this selection. */
  files: File[];
  /** Every pending file after the selection. */
  currentFiles: File[];
  /** Files rejected by `accept`, `maxFileSize` or `fileLimit`. */
  rejected: AcpFileUploadRejectedFile[];
}

export interface AcpFileUploadBeforeUploadEvent {
  /** Body of the request; append extra fields here. */
  formData: FormData;
}

export interface AcpFileUploadUploadEvent {
  originalEvent: HttpEvent<unknown>;
  files: File[];
}

export interface AcpFileUploadErrorEvent {
  error: HttpErrorResponse;
  files: File[];
}

export interface AcpFileUploadProgressEvent {
  originalEvent: HttpEvent<unknown>;
  /** 0-100. */
  progress: number;
}

export interface AcpFileUploadHandlerEvent {
  files: File[];
}

export interface AcpFileUploadRemoveEvent {
  file: File;
}

/** Context of the `#file` template. */
export interface AcpFileUploadFileContext {
  $implicit: File;
  file: File;
  index: number;
  status: AcpFileUploadStatus;
  /** Object URL of an image file, or `null`. */
  preview: string | null;
  /** Human readable size, e.g. `1.2 MB`. */
  size: string;
  remove: () => void;
}
