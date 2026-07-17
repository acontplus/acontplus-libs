import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AcpButton } from '@acontplus/ng-components';
import { REPORT_FORMAT } from '@acontplus/ui-kit';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-button-overview',
  imports: [
    AcpButton,
    MatCardModule,
    MatTabsModule,
    DocHeading,
    CodeExample,
    MatButtonToggleModule,
  ],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Button</app-doc-heading>

      <p class="docs-component-description">
        Flexible button component with multiple Material Design variants and built-in report format
        support. Supports all Material button styles including filled, elevated, outlined, text, and
        FAB variants.
      </p>

      <h2>Filled Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="filled" color="primary"> Primary </acp-button>
            <acp-button appearance="filled" color="secondary"> Secondary </acp-button>
            <acp-button appearance="filled" color="accent"> Accent </acp-button>
            <acp-button appearance="filled" color="error"> Error </acp-button>
            <acp-button appearance="filled" color="success"> Success </acp-button>
            <acp-button appearance="filled" color="warning"> Warning </acp-button>
            <acp-button appearance="filled" color="info"> Info </acp-button>
            <acp-button appearance="filled" color="dark"> Dark </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Elevated Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="elevated" color="primary"> Primary </acp-button>
            <acp-button appearance="elevated" color="secondary"> Secondary </acp-button>
            <acp-button appearance="elevated" color="accent"> Accent </acp-button>
            <acp-button appearance="elevated" color="error"> Error </acp-button>
            <acp-button appearance="elevated" color="success"> Success </acp-button>
            <acp-button appearance="elevated" color="warning"> Warning </acp-button>
            <acp-button appearance="elevated" color="info"> Info </acp-button>
            <acp-button appearance="elevated" color="dark"> Dark </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Outlined Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="outlined" color="primary"> Primary </acp-button>
            <acp-button appearance="outlined" color="secondary"> Secondary </acp-button>
            <acp-button appearance="outlined" color="accent"> Accent </acp-button>
            <acp-button appearance="outlined" color="error"> Error </acp-button>
            <acp-button appearance="outlined" color="success"> Success </acp-button>
            <acp-button appearance="outlined" color="warning"> Warning </acp-button>
            <acp-button appearance="outlined" color="info"> Info </acp-button>
            <acp-button appearance="outlined" color="dark"> Dark </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Text Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="text" color="primary"> Primary </acp-button>
            <acp-button appearance="text" color="secondary"> Secondary </acp-button>
            <acp-button appearance="text" color="accent"> Accent </acp-button>
            <acp-button appearance="text" color="error"> Error </acp-button>
            <acp-button appearance="text" color="success"> Success </acp-button>
            <acp-button appearance="text" color="warning"> Warning </acp-button>
            <acp-button appearance="text" color="info"> Info </acp-button>
            <acp-button appearance="text" color="dark"> Dark </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Tonal Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="tonal" color="primary"> Primary </acp-button>
            <acp-button appearance="tonal" color="secondary"> Secondary </acp-button>
            <acp-button appearance="tonal" color="accent"> Accent </acp-button>
            <acp-button appearance="tonal" color="error"> Error </acp-button>
            <acp-button appearance="tonal" color="success"> Success </acp-button>
            <acp-button appearance="tonal" color="warning"> Warning </acp-button>
            <acp-button appearance="tonal" color="info"> Info </acp-button>
            <acp-button appearance="tonal" color="dark"> Dark </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Square Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="filled" color="primary" square> Primary </acp-button>
            <acp-button appearance="filled" color="secondary" square> Secondary </acp-button>
            <acp-button appearance="filled" color="accent" square> Accent </acp-button>
            <acp-button appearance="filled" color="error" square> Error </acp-button>
            <acp-button appearance="filled" color="success" square> Success </acp-button>
            <acp-button appearance="filled" color="warning" square> Warning </acp-button>
            <acp-button appearance="filled" color="info" square> Info </acp-button>
            <acp-button appearance="filled" color="dark" square> Dark </acp-button>
            <acp-button appearance="filled" square> Default </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Medium Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="filled" color="primary" size="medium"> Primary </acp-button>
            <acp-button appearance="filled" color="secondary" size="medium"> Secondary </acp-button>
            <acp-button appearance="filled" color="accent" size="medium"> Accent </acp-button>
            <acp-button appearance="filled" color="error" size="medium"> Error </acp-button>
            <acp-button appearance="filled" color="success" size="medium"> Success </acp-button>
            <acp-button appearance="filled" color="warning" size="medium"> Warning </acp-button>
            <acp-button appearance="filled" color="info" size="medium"> Info </acp-button>
            <acp-button appearance="filled" color="dark" size="medium"> Dark </acp-button>
            <acp-button appearance="filled" size="medium"> Default </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Small Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="filled" color="primary" size="small"> Primary </acp-button>
            <acp-button appearance="filled" color="secondary" size="small"> Secondary </acp-button>
            <acp-button appearance="filled" color="accent" size="small"> Accent </acp-button>
            <acp-button appearance="filled" color="error" size="small"> Error </acp-button>
            <acp-button appearance="filled" color="success" size="small"> Success </acp-button>
            <acp-button appearance="filled" color="warning" size="small"> Warning </acp-button>
            <acp-button appearance="filled" color="info" size="small"> Info </acp-button>
            <acp-button appearance="filled" color="dark" size="small"> Dark </acp-button>
            <acp-button appearance="filled" size="small"> Default </acp-button>
          </div>
        </mat-card-content>
      </mat-card>
      <h2>Buttons with Icons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="filled" color="primary" icon="add"> Add </acp-button>
            <acp-button appearance="filled" color="secondary" icon="edit"> Edit </acp-button>
            <acp-button appearance="filled" color="error" icon="delete"> Delete </acp-button>
            <acp-button appearance="filled" color="success" icon="save"> Save </acp-button>
            <acp-button appearance="filled" color="warning" icon="download"> Download </acp-button>
            <acp-button appearance="filled" color="info" icon="upload"> Upload </acp-button>
            <acp-button appearance="filled" color="dark" icon="settings"> Settings </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Buttons with Icons (Outlined)</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="outlined" color="primary" icon="add"> Add </acp-button>
            <acp-button appearance="outlined" color="secondary" icon="edit"> Edit </acp-button>
            <acp-button appearance="outlined" color="error" icon="delete"> Delete </acp-button>
            <acp-button appearance="outlined" color="success" icon="save"> Save </acp-button>
            <acp-button appearance="outlined" color="warning" icon="download">
              Download
            </acp-button>
            <acp-button appearance="outlined" color="info" icon="upload"> Upload </acp-button>
            <acp-button appearance="outlined" color="dark" icon="settings"> Settings </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Buttons with Icons (Text)</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="text" color="primary" icon="add"> Add </acp-button>
            <acp-button appearance="text" color="secondary" icon="edit"> Edit </acp-button>
            <acp-button appearance="text" color="error" icon="delete"> Delete </acp-button>
            <acp-button appearance="text" color="success" icon="save"> Save </acp-button>
            <acp-button appearance="text" color="warning" icon="download"> Download </acp-button>
            <acp-button appearance="text" color="info" icon="upload"> Upload </acp-button>
            <acp-button appearance="text" color="dark" icon="settings"> Settings </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Buttons with Icons (Tonal)</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="tonal" color="primary" icon="add"> Add </acp-button>
            <acp-button appearance="tonal" color="secondary" icon="edit"> Edit </acp-button>
            <acp-button appearance="tonal" color="error" icon="delete"> Delete </acp-button>
            <acp-button appearance="tonal" color="success" icon="save"> Save </acp-button>
            <acp-button appearance="tonal" color="warning" icon="download"> Download </acp-button>
            <acp-button appearance="tonal" color="info" icon="upload"> Upload </acp-button>
            <acp-button appearance="tonal" color="dark" icon="settings"> Settings </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Buttons with Suffix Icons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="filled" color="primary" suffixIcon="arrow_forward">
              Next
            </acp-button>
            <acp-button appearance="filled" color="secondary" suffixIcon="expand_more">
              Expand
            </acp-button>
            <acp-button appearance="filled" color="error" suffixIcon="delete"> Remove </acp-button>
            <acp-button appearance="filled" color="success" suffixIcon="check">
              Confirm
            </acp-button>
            <acp-button appearance="filled" color="warning" suffixIcon="warning">
              Alert
            </acp-button>
            <acp-button appearance="filled" color="info" suffixIcon="info"> Details </acp-button>
            <acp-button appearance="filled" color="dark" suffixIcon="more_vert"> More </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Buttons with Both Icons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button
              appearance="filled"
              color="primary"
              icon="person_add"
              suffixIcon="arrow_forward"
            >
              Add User
            </acp-button>
            <acp-button appearance="filled" color="secondary" icon="edit" suffixIcon="save">
              Edit & Save
            </acp-button>
            <acp-button appearance="filled" color="error" icon="delete" suffixIcon="delete_forever">
              Delete Forever
            </acp-button>
            <acp-button appearance="filled" color="success" icon="cloud_upload" suffixIcon="check">
              Upload
            </acp-button>
            <acp-button appearance="filled" color="warning" icon="download" suffixIcon="warning">
              Download
            </acp-button>
            <acp-button appearance="filled" color="info" icon="search" suffixIcon="arrow_forward">
              Search
            </acp-button>
            <acp-button appearance="filled" color="dark" icon="settings" suffixIcon="more_vert">
              Settings
            </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Icon Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button variant="icon" color="primary" icon="add" square />
            <acp-button variant="icon" color="secondary" icon="edit" square />
            <acp-button variant="icon" color="error" icon="delete" />
            <acp-button variant="icon" color="success" icon="save" />
            <acp-button variant="icon" color="warning" icon="download" />
            <acp-button variant="icon" color="info" icon="upload" />
            <acp-button variant="icon" color="dark" icon="settings" />
          </div>
        </mat-card-content>
      </mat-card>

      <h2>FAB Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button variant="fab" color="primary" icon="add" />
            <acp-button variant="fab" color="secondary" icon="edit" />
            <acp-button variant="fab" color="error" icon="delete" />
            <acp-button variant="fab" color="success" icon="save" />
            <acp-button variant="fab" color="warning" icon="download" />
            <acp-button variant="fab" color="info" icon="upload" />
            <acp-button variant="fab" color="dark" icon="settings" />
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Mini FAB Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button variant="mini-fab" color="primary" icon="add" />
            <acp-button variant="mini-fab" color="secondary" icon="edit" />
            <acp-button variant="mini-fab" color="error" icon="delete" />
            <acp-button variant="mini-fab" color="success" icon="save" />
            <acp-button variant="mini-fab" color="warning" icon="download" />
            <acp-button variant="mini-fab" color="info" icon="upload" />
            <acp-button variant="mini-fab" color="dark" icon="settings" />
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Extended FAB Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button variant="fab" color="primary" icon="add" extended> Create </acp-button>
            <acp-button variant="fab" color="secondary" icon="edit" extended> Edit </acp-button>
            <acp-button variant="fab" color="error" icon="delete" extended> Delete </acp-button>
            <acp-button variant="fab" color="success" icon="save" extended> Save </acp-button>
            <acp-button variant="fab" color="warning" icon="download" extended>
              Download
            </acp-button>
            <acp-button variant="fab" color="info" icon="upload" extended> Upload </acp-button>
            <acp-button variant="fab" color="dark" icon="settings" extended> Settings </acp-button>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Group Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <mat-button-toggle-group
              name="fontStyle"
              aria-label="Font Style"
              class="contrast small"
            >
              <mat-button-toggle value="bold">Bold</mat-button-toggle>
              <mat-button-toggle value="italic">Italic</mat-button-toggle>
              <mat-button-toggle value="underline">Underline</mat-button-toggle>
            </mat-button-toggle-group>
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Event Handlers</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button appearance="filled" color="primary" (clicked)="onButtonClick()">
              Click Me
            </acp-button>
            <acp-button appearance="filled" color="secondary" (focused)="onButtonFocus()">
              Focus Me
            </acp-button>
            <acp-button appearance="filled" color="accent" (blurred)="onButtonBlur()">
              Blur Me
            </acp-button>
            <acp-button
              appearance="filled"
              color="success"
              (clicked)="onButtonClick()"
              (focused)="onButtonFocus()"
              (blurred)="onButtonBlur()"
            >
              All Events
            </acp-button>
          </div>
          @if (eventLog) {
            <p class="event-log">{{ eventLog }}</p>
          }
        </mat-card-content>
      </mat-card>

      <!-- <h2>Basic Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button [text]="'Primary'" [variant]="'primary'" [matStyle]="'filled'" />
            <acp-button [text]="'Secondary'" [variant]="'secondary'" [matStyle]="'filled'" />
            <acp-button [text]="'Success'" [variant]="'success'" [matStyle]="'filled'" />
            <acp-button [text]="'Danger'" [variant]="'danger'" [matStyle]="'filled'" />
            <acp-button [text]="'Warning'" [variant]="'warning'" [matStyle]="'filled'" />
            <acp-button [text]="'Info'" [variant]="'info'" [matStyle]="'filled'" />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="basicButtonCode" [language]="'typescript'" />


      <h2>Icon Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button [variant]="'primary'" [matStyle]="'filled'" [icon]="'add'" />
            <acp-button [variant]="'secondary'" [matStyle]="'filled'" [icon]="'add'" />
            <acp-button [variant]="'success'" [matStyle]="'filled'" [icon]="'add'" />
            <acp-button [variant]="'danger'" [matStyle]="'filled'" [icon]="'add'" />
            <acp-button [variant]="'warning'" [matStyle]="'filled'" [icon]="'add'" />
            <acp-button [variant]="'info'" [matStyle]="'filled'" [icon]="'add'" />
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Material Button Styles</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button [text]="'Filled'" [variant]="'primary'" [matStyle]="'filled'" />
            <acp-button [text]="'Elevated'" [variant]="'primary'" [matStyle]="'elevated'" />
            <acp-button [text]="'Outlined'" [variant]="'primary'" [matStyle]="'outlined'" />
            <acp-button [text]="'Text'" [variant]="'primary'" [matStyle]="'text'" />
            <acp-button [text]="'Tonal'" [variant]="'primary'" [matStyle]="'tonal'" />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="materialStylesCode" [language]="'typescript'" />

      <h2>Buttons with Icons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button
              [text]="'Save'"
              [icon]="'save'"
              [variant]="'primary'"
              [matStyle]="'filled'"
            />
            <acp-button
              [text]="'Delete'"
              [icon]="'delete'"
              [variant]="'danger'"
              [matStyle]="'filled'"
            />
            <acp-button
              [text]="'Edit'"
              [icon]="'edit'"
              [variant]="'secondary'"
              [matStyle]="'outlined'"
            />
            <acp-button
              [icon]="'add'"
              [variant]="'primary'"
              [matStyle]="'fab'"
              [title]="'Add Item'"
            />
            <acp-button
              [icon]="'settings'"
              [variant]="'secondary'"
              [matStyle]="'mini-fab'"
              [title]="'Settings'"
            />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="iconButtonsCode" [language]="'typescript'" />

      <h2>Report Format Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button
              [reportFormat]="REPORT_FORMAT.PDF"
              [text]="'Export PDF'"
              (handleClick)="onExport('PDF')"
            />
            <acp-button
              [reportFormat]="REPORT_FORMAT.EXCEL"
              [text]="'Export Excel'"
              (handleClick)="onExport('Excel')"
            />
            <acp-button
              [reportFormat]="REPORT_FORMAT.WORD"
              [text]="'Export Word'"
              (handleClick)="onExport('Word')"
            />
            <acp-button
              [reportFormat]="REPORT_FORMAT.CSV"
              [text]="'Export CSV'"
              (handleClick)="onExport('CSV')"
            />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="reportButtonsCode" [language]="'typescript'" />

      <h2>Disabled State</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button [text]="'Enabled'" [variant]="'primary'" [disabled]="false" />
            <acp-button [text]="'Disabled'" [variant]="'primary'" [disabled]="true" />
            <acp-button
              [text]="'Disabled'"
              [icon]="'save'"
              [variant]="'success'"
              [disabled]="true"
            />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="disabledButtonsCode" [language]="'typescript'" /> -->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      .docs-component-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 32px;
        color: var(--mat-sys-on-surface-variant);
      }

      h2 {
        font-size: 24px;
        font-weight: 500;
        margin: 32px 0 16px;
        color: var(--mat-sys-on-surface);
      }

      .docs-example-card {
        margin-bottom: 16px;
      }

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }

      .event-log {
        margin-top: 16px;
        padding: 8px 12px;
        background-color: var(--mat-sys-primary-container);
        color: var(--mat-sys-on-primary-container);
        border-radius: 4px;
        font-size: 14px;
      }
    `,
  ],
})
export class ButtonOverview {
  REPORT_FORMAT = REPORT_FORMAT;

  basicButtonCode = `<acp-button
  [text]="'Primary'"
  [variant]="'primary'"
  [matStyle]="'filled'"
/>
<acp-button
  [text]="'Secondary'"
  [variant]="'secondary'"
  [matStyle]="'filled'"
/>`;

  materialStylesCode = `<acp-button
  [text]="'Filled'"
  [variant]="'primary'"
  [matStyle]="'filled'"
/>
<acp-button
  [text]="'Elevated'"
  [variant]="'primary'"
  [matStyle]="'elevated'"
/>
<acp-button
  [text]="'Outlined'"
  [variant]="'primary'"
  [matStyle]="'outlined'"
/>`;

  iconButtonsCode = `<acp-button
  [text]="'Save'"
  [icon]="'save'"
  [variant]="'primary'"
  [matStyle]="'filled'"
/>
<acp-button
  [icon]="'add'"
  [variant]="'primary'"
  [matStyle]="'fab'"
  [title]="'Add Item'"
/>`;

  reportButtonsCode = `import { REPORT_FORMAT } from '@acontplus/ng-components';

<acp-button
  [reportFormat]="REPORT_FORMAT.PDF"
  [text]="'Export PDF'"
  (handleClick)="onExport('PDF')"
/>
<acp-button
  [reportFormat]="REPORT_FORMAT.EXCEL"
  [text]="'Export Excel'"
  (handleClick)="onExport('Excel')"
/>`;

  disabledButtonsCode = `<acp-button
  [text]="'Enabled'"
  [variant]="'primary'"
  [disabled]="false"
/>
<acp-button
  [text]="'Disabled'"
  [variant]="'primary'"
  [disabled]="true"
/>`;

  onExport(format: string) {
    alert(`Exporting ${format}...`);
  }

  eventLog = '';

  onButtonClick() {
    this.eventLog = 'Button clicked!';
    setTimeout(() => (this.eventLog = ''), 2000);
  }

  onButtonFocus() {
    this.eventLog = 'Button focused!';
    setTimeout(() => (this.eventLog = ''), 2000);
  }

  onButtonBlur() {
    this.eventLog = 'Button blurred!';
    setTimeout(() => (this.eventLog = ''), 2000);
  }
}
