import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { timer } from 'rxjs';
import {
  AcpFileUpload,
  AcpFileUploadHandlerEvent,
  acpFileUploadFormatSize,
} from '@acontplus/ng-components';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

@Component({
  selector: 'app-file-upload-overview',
  imports: [AcpFileUpload, ReactiveFormsModule, MatCardModule, DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>File Upload</app-doc-heading>
      <p class="docs-component-description">
        File picker and uploader similar to PrimeNG FileUpload: toolbar, drag and drop, image
        previews, progress, validation of type, size and number of files, a basic single-button
        mode, custom upload and form support. Uploads go through <code>HttpClient</code>, so app
        interceptors apply.
      </p>

      <h2>Advanced</h2>
      <p>
        Images and PDF up to 1 MB, at most 5 files. Drop files on the area or use Choose. The upload
        is simulated with progress.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <acp-file-upload
            class="advanced-upload"
            url="/demo-upload"
            [multiple]="true"
            accept="image/*,.pdf"
            [maxFileSize]="1048576"
            [fileLimit]="5"
            (filesSelect)="log('select: ' + $event.files.length + ' file(s)')"
            (uploadProgress)="progressLog.set($event.progress)"
            (uploadSuccess)="log('uploaded: ' + $event.files.length + ' file(s)')"
            (uploadError)="log('error: ' + $event.error.status)"
            (filesClear)="log('clear')"
          />
          <p class="event-log">Progress: {{ progressLog() }}% · {{ events().join(' → ') }}</p>
        </mat-card-content>
      </mat-card>

      <h2>Basic, automatic</h2>
      <p>A single button that uploads as soon as an XML file is chosen.</p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <acp-file-upload
            class="basic-upload"
            mode="basic"
            url="/demo-upload"
            accept=".xml"
            [auto]="true"
            chooseLabel="Cargar XML"
            (uploadSuccess)="basicResult.set($event.files[0].name + ' subido')"
          />
          <p class="event-log">{{ basicResult() }}</p>
        </mat-card-content>
      </mat-card>

      <h2>Upload error</h2>
      <p>The endpoint answers 500: files stay pending and <code>uploadError</code> is emitted.</p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <acp-file-upload
            class="error-upload"
            url="/demo-upload/error"
            (uploadError)="errorResult.set('Error ' + $event.error.status)"
          />
          <p class="event-log">{{ errorResult() }}</p>
        </mat-card-content>
      </mat-card>

      <h2>Custom upload</h2>
      <p>
        With <code>customUpload</code> the component emits <code>uploadHandler</code>; your code
        uploads the files (e.g. through your API service) and calls <code>completeUpload()</code>.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <acp-file-upload
            #custom
            class="custom-upload"
            [customUpload]="true"
            [multiple]="true"
            (uploadHandler)="onCustomUpload($event)"
          >
            <ng-template #empty>
              <p class="custom-empty">Drop your invoices here</p>
            </ng-template>
          </acp-file-upload>
        </mat-card-content>
      </mat-card>

      <h2>Reactive form</h2>
      <p>The value is the list of pending files (<code>File[]</code>) or <code>null</code>.</p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <acp-file-upload class="form-upload" [formControl]="attachments" [multiple]="true" />
          <p class="event-log">
            Valid: {{ attachments.valid }} · Value:
            {{ attachmentNames() }}
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    .docs-component-viewer-content {
      padding: 24px;
      max-width: 860px;
    }
    .event-log {
      margin: 12px 0 0;
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.875rem;
    }
    .custom-empty {
      margin: 32px 0;
      text-align: center;
      color: var(--mat-sys-on-surface-variant);
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class FileUploadOverview {
  private readonly custom = viewChild.required<AcpFileUpload>('custom');

  readonly events = signal<string[]>([]);
  readonly progressLog = signal(0);
  readonly basicResult = signal('');
  readonly errorResult = signal('');
  readonly attachments = new FormControl<File[] | null>(null, Validators.required);

  log(event: string): void {
    this.events.update(events => [...events.slice(-4), event]);
  }

  attachmentNames(): string {
    const files = this.attachments.value;
    return files?.length
      ? files.map(file => `${file.name} (${acpFileUploadFormatSize(file.size)})`).join(', ')
      : 'null';
  }

  /** Simulates uploading through an app service, then marks the files as uploaded. */
  onCustomUpload(event: AcpFileUploadHandlerEvent): void {
    timer(600).subscribe(() => this.custom().completeUpload(event.files));
  }
}
