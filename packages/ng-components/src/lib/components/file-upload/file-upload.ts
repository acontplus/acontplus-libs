import { NgTemplateOutlet } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  forwardRef,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';
import {
  AcpFileUploadBeforeUploadEvent,
  AcpFileUploadErrorEvent,
  AcpFileUploadFileContext,
  AcpFileUploadHandlerEvent,
  AcpFileUploadHeaders,
  AcpFileUploadMethod,
  AcpFileUploadMode,
  AcpFileUploadProgressEvent,
  AcpFileUploadRejectedFile,
  AcpFileUploadRemoveEvent,
  AcpFileUploadSelectEvent,
  AcpFileUploadStatus,
  AcpFileUploadUploadEvent,
} from './file-upload.types';

/** Human readable size: `0 B`, `512 B`, `1.5 KB`, `12 MB`. */
export function acpFileUploadFormatSize(bytes: number): string {
  if (!bytes || bytes < 0) {
    return '0 B';
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** i;
  return `${i === 0 ? value : value.toFixed(value < 10 ? 1 : 0)} ${units[i]}`;
}

/**
 * Whether a file matches an `accept` list (as in `<input type="file">`): extensions (`.pdf`),
 * exact MIME types (`application/pdf`) or wildcards (`image/*`). An empty list accepts all.
 */
export function acpFileUploadAccepts(file: File, accept: string): boolean {
  const tokens = accept
    .split(',')
    .map(token => token.trim().toLowerCase())
    .filter(Boolean);
  if (!tokens.length) {
    return true;
  }
  const name = file.name.toLowerCase();
  const type = (file.type || '').toLowerCase();
  return tokens.some(token =>
    token.startsWith('.')
      ? name.endsWith(token)
      : token.endsWith('/*')
        ? type.startsWith(token.slice(0, -1))
        : type === token,
  );
}

const format = (template: string, ...args: (string | number)[]): string =>
  args.reduce<string>((text, arg, i) => text.replaceAll(`{${i}}`, `${arg}`), template);

/** Same criteria as PrimeNG: a file with the same name, type and size is already chosen. */
const sameFile = (a: File, b: File): boolean =>
  a.name === b.name && a.size === b.size && a.type === b.type;

interface FileItem {
  file: File;
  status: AcpFileUploadStatus;
  context: AcpFileUploadFileContext;
}

/**
 * File picker and uploader, similar to PrimeNG's FileUpload.
 *
 * - `advanced` mode: toolbar (choose, upload, cancel), drag-and-drop zone, file list with image
 *   previews and upload progress. `basic` mode: a single button.
 * - Uploads the pending files to `url` with `HttpClient` (multipart, `name` field), so app
 *   interceptors apply. With `customUpload` (or no `url`) it emits `uploadHandler` instead.
 * - Validates `accept`, `maxFileSize` and `fileLimit`, and works with `ngModel` and reactive
 *   forms: the value is the list of pending files (`File[]`) or `null`.
 */
@Component({
  selector: 'acp-file-upload',
  exportAs: 'acpFileUpload',
  imports: [NgTemplateOutlet, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'acp-file-upload',
    '[class.acp-file-upload--basic]': "mode() === 'basic'",
    '[class.acp-file-upload--disabled]': 'isDisabled()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcpFileUpload),
      multi: true,
    },
  ],
})
export class AcpFileUpload implements ControlValueAccessor, OnDestroy {
  private readonly http = inject(HttpClient, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  // Behavior
  readonly mode = input<AcpFileUploadMode>('advanced');
  /** Endpoint that receives the files. Without it, `uploadHandler` is emitted. */
  readonly url = input<string | null>(null);
  readonly method = input<AcpFileUploadMethod>('post');
  /** Multipart field name of each file. */
  readonly name = input('files');
  readonly headers = input<AcpFileUploadHeaders | null>(null);
  readonly withCredentials = input(false, { transform: booleanAttribute });
  readonly multiple = input(false, { transform: booleanAttribute });
  /** Same format as the `accept` attribute: `.pdf,.xml`, `image/*`, `application/pdf`. */
  readonly accept = input('');
  /** Maximum size of each file, in bytes. */
  readonly maxFileSize = input<number | null>(null);
  /** Maximum number of files, counting the ones already uploaded. */
  readonly fileLimit = input<number | null>(null);
  /** Uploads as soon as files are chosen. */
  readonly auto = input(false, { transform: booleanAttribute });
  /** Emits `uploadHandler` with the files instead of uploading them to `url`. */
  readonly customUpload = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly showUploadButton = input(true, { transform: booleanAttribute });
  readonly showCancelButton = input(true, { transform: booleanAttribute });
  /** Width of the image previews, in pixels. */
  readonly previewWidth = input(50, { transform: numberAttribute });

  // Texts
  readonly chooseLabel = input('Elegir');
  readonly uploadLabel = input('Subir');
  readonly cancelLabel = input('Cancelar');
  readonly removeLabel = input('Quitar');
  readonly emptyText = input('Arrastra y suelta los archivos aquí.');
  readonly pendingLabel = input('Pendiente');
  readonly uploadedLabel = input('Subido');
  readonly dismissLabel = input('Cerrar');
  /** `{0}`: file name, `{1}`: maximum size. */
  readonly invalidFileSizeMessage = input('{0}: supera el tamaño máximo de {1}.');
  /** `{0}`: file name, `{1}`: accepted types. */
  readonly invalidFileTypeMessage = input('{0}: tipo de archivo no permitido. Se aceptan {1}.');
  /** `{0}`: file limit. */
  readonly invalidFileLimitMessage = input('Se permite un máximo de {0} archivos.');

  // Events
  readonly filesSelect = output<AcpFileUploadSelectEvent>();
  readonly fileRemove = output<AcpFileUploadRemoveEvent>();
  readonly filesClear = output<void>();
  readonly beforeUpload = output<AcpFileUploadBeforeUploadEvent>();
  readonly uploadProgress = output<AcpFileUploadProgressEvent>();
  readonly uploadSuccess = output<AcpFileUploadUploadEvent>();
  readonly uploadError = output<AcpFileUploadErrorEvent>();
  /** Emitted on upload with `customUpload` or without `url`. Call `completeUpload()` when done. */
  readonly uploadHandler = output<AcpFileUploadHandlerEvent>();

  // Templates
  /** `<ng-template #file let-file let-status="status" let-remove="remove">`. */
  readonly fileTemplate = contentChild<TemplateRef<AcpFileUploadFileContext>>('file');
  /** `<ng-template #empty>`: content of the drop zone without files. */
  readonly emptyTemplate = contentChild<TemplateRef<unknown>>('empty');
  /** `<ng-template #toolbar>`: extra content at the end of the toolbar. */
  readonly toolbarTemplate = contentChild<TemplateRef<unknown>>('toolbar');

  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  /** Files chosen and not uploaded yet. */
  readonly files = signal<File[]>([]);
  /** Files uploaded by this component (shown as uploaded). */
  readonly uploadedFiles = signal<File[]>([]);
  /** Validation messages of the last selection. */
  readonly messages = signal<string[]>([]);
  /** Upload progress, 0-100. */
  readonly progress = signal(0);
  readonly uploading = signal(false);

  protected readonly dragOver = signal(false);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly hasFiles = computed(() => this.files().length > 0);
  protected readonly canChoose = computed(() => {
    const limit = this.fileLimit();
    const count = this.files().length + this.uploadedFiles().length;
    return !this.isDisabled() && !this.uploading() && (limit == null || count < limit);
  });
  protected readonly basicLabel = computed(() => {
    const files = this.files();
    return files.length ? files.map(file => file.name).join(', ') : this.chooseLabel();
  });
  protected readonly items = computed<FileItem[]>(() => [
    ...this.files().map((file, index) => this.item(file, index, 'pending')),
    ...this.uploadedFiles().map((file, index) => this.item(file, index, 'uploaded')),
  ]);

  private readonly previews = new Map<File, string>();
  private uploadSubscription: Subscription | null = null;
  private onChange: (value: File[] | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  /** Opens the file dialog. */
  choose(): void {
    if (this.canChoose()) {
      this.fileInput()?.nativeElement.click();
    }
  }

  /** Uploads the pending files (or emits `uploadHandler`). */
  upload(): void {
    const files = this.files();
    if (!files.length || this.uploading() || this.isDisabled()) {
      return;
    }
    const url = this.url();
    if (this.customUpload() || !url) {
      this.uploadHandler.emit({ files });
      return;
    }
    if (!this.http) {
      throw new Error(
        'AcpFileUpload: uploading to `url` requires provideHttpClient(); or use `customUpload`.',
      );
    }

    const formData = new FormData();
    files.forEach(file => formData.append(this.name(), file, file.name));
    this.beforeUpload.emit({ formData });

    const headers = this.headers();
    this.uploading.set(true);
    this.progress.set(0);
    this.uploadSubscription = this.http
      .request(this.method().toUpperCase(), url, {
        body: formData,
        headers: headers instanceof HttpHeaders ? headers : new HttpHeaders(headers ?? {}),
        reportProgress: true,
        observe: 'events',
        withCredentials: this.withCredentials(),
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: event => {
          if (event.type === HttpEventType.UploadProgress) {
            const progress = event.total ? Math.round((event.loaded * 100) / event.total) : 0;
            this.progress.set(progress);
            this.uploadProgress.emit({ originalEvent: event, progress });
          } else if (event.type === HttpEventType.Response) {
            this.uploadSubscription = null;
            this.completeUpload(files);
            this.uploadSuccess.emit({ originalEvent: event, files });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.uploadSubscription = null;
          this.uploading.set(false);
          this.progress.set(0);
          this.uploadError.emit({ error, files });
        },
      });
  }

  /**
   * Marks files as uploaded: they leave the pending list and show as uploaded. Called
   * automatically after a successful upload to `url`; call it after a `customUpload`.
   */
  completeUpload(files: File[] = this.files()): void {
    this.uploading.set(false);
    this.progress.set(100);
    this.uploadedFiles.update(uploaded => [...uploaded, ...files]);
    this.setFiles(this.files().filter(file => !files.includes(file)));
  }

  /** Cancels an upload in progress and removes the pending files. */
  clear(): void {
    this.uploadSubscription?.unsubscribe();
    this.uploadSubscription = null;
    this.uploading.set(false);
    this.progress.set(0);
    this.messages.set([]);
    this.files().forEach(file => this.revokePreview(file));
    this.setFiles([]);
    this.filesClear.emit();
  }

  /** Removes a pending file. */
  remove(file: File): void {
    if (this.uploading()) {
      return;
    }
    this.revokePreview(file);
    this.setFiles(this.files().filter(item => item !== file));
    this.fileRemove.emit({ file });
  }

  /** Removes an uploaded file from the list (it is not deleted on the server). */
  removeUploaded(file: File): void {
    this.revokePreview(file);
    this.uploadedFiles.update(files => files.filter(item => item !== file));
  }

  protected onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addFiles(event, Array.from(input.files ?? []));
    // Allows choosing the same file again after removing it.
    input.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.isDisabled()) {
      this.dragOver.set(true);
    }
  }

  protected onDragLeave(event: DragEvent): void {
    const zone = event.currentTarget as HTMLElement;
    if (!zone.contains(event.relatedTarget as Node | null)) {
      this.dragOver.set(false);
    }
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(false);
    if (!this.canChoose()) {
      return;
    }
    const dropped = Array.from(event.dataTransfer?.files ?? []);
    this.addFiles(event, this.multiple() ? dropped : dropped.slice(0, 1));
  }

  protected dismissMessage(index: number): void {
    this.messages.update(messages => messages.filter((_, i) => i !== index));
  }

  private addFiles(event: Event, incoming: File[]): void {
    if (!incoming.length) {
      return;
    }
    this.onTouched();
    const multiple = this.multiple();
    const current = multiple ? this.files() : [];
    const accepted: File[] = [];
    const rejected: AcpFileUploadRejectedFile[] = [];

    for (const file of multiple ? incoming : incoming.slice(0, 1)) {
      if ([...current, ...accepted].some(item => sameFile(item, file))) {
        continue;
      }
      const maxSize = this.maxFileSize();
      if (maxSize != null && file.size > maxSize) {
        rejected.push({
          file,
          reason: 'size',
          message: format(
            this.invalidFileSizeMessage(),
            file.name,
            acpFileUploadFormatSize(maxSize),
          ),
        });
      } else if (!acpFileUploadAccepts(file, this.accept())) {
        rejected.push({
          file,
          reason: 'type',
          message: format(this.invalidFileTypeMessage(), file.name, this.acceptText()),
        });
      } else {
        accepted.push(file);
      }
    }

    const limit = this.fileLimit();
    if (limit != null) {
      const room = Math.max(limit - this.uploadedFiles().length - current.length, 0);
      const message = format(this.invalidFileLimitMessage(), limit);
      accepted.splice(room).forEach(file => rejected.push({ file, reason: 'limit', message }));
    }

    if (!multiple && accepted.length) {
      this.files().forEach(file => this.revokePreview(file));
    }
    const next = multiple ? [...current, ...accepted] : accepted.length ? accepted : this.files();
    this.messages.set([...new Set(rejected.map(item => item.message))]);
    this.setFiles(next);
    this.filesSelect.emit({ originalEvent: event, files: accepted, currentFiles: next, rejected });

    if (this.auto() && accepted.length) {
      this.upload();
    }
  }

  private acceptText(): string {
    return this.accept()
      .split(',')
      .map(token => token.trim())
      .filter(Boolean)
      .join(', ');
  }

  private setFiles(files: File[]): void {
    this.files.set(files);
    this.onChange(files.length ? files : null);
  }

  private item(file: File, index: number, status: AcpFileUploadStatus): FileItem {
    const preview = this.preview(file);
    const remove = status === 'pending' ? () => this.remove(file) : () => this.removeUploaded(file);
    return {
      file,
      status,
      context: {
        $implicit: file,
        file,
        index,
        status,
        preview,
        size: acpFileUploadFormatSize(file.size),
        remove,
      },
    };
  }

  private preview(file: File): string | null {
    if (!file.type.startsWith('image/') || typeof URL.createObjectURL !== 'function') {
      return null;
    }
    let url = this.previews.get(file);
    if (!url) {
      url = URL.createObjectURL(file);
      this.previews.set(file, url);
    }
    return url;
  }

  private revokePreview(file: File): void {
    const url = this.previews.get(file);
    if (url) {
      URL.revokeObjectURL(url);
      this.previews.delete(file);
    }
  }

  // ControlValueAccessor
  writeValue(value: File[] | File | null): void {
    const files = value == null ? [] : Array.isArray(value) ? value : [value];
    this.files().forEach(file => {
      if (!files.includes(file)) {
        this.revokePreview(file);
      }
    });
    this.files.set(files);
  }

  registerOnChange(fn: (value: File[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  ngOnDestroy(): void {
    this.previews.forEach(url => URL.revokeObjectURL(url));
    this.previews.clear();
  }
}
