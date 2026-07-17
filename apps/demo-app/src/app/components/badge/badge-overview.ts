import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AcpBadge } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-badge-overview',
  imports: [AcpBadge, MatCardModule, MatDividerModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Badge</app-doc-heading>

      <p class="docs-component-description">
        Versatile badge and chip component built on top of Angular Material <code>mat-chip</code>.
        Use it for status, labels, filters, KPIs, notifications and calendar metadata.
      </p>

      <!-- KPI BADGES -->
      <h2>KPI Badges</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Trend Indicators</mat-card-title>
          <mat-card-subtitle>Automatic color and icon based on trend</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="badge-row">
          <acp-badge label="Revenue" value="9.3%" trend="up" variant="soft" />
          <acp-badge label="Churn" value="1.9%" trend="down" variant="soft" />
          <acp-badge label="Conversion" value="0.6%" trend="neutral" variant="soft" />
        </mat-card-content>
      </mat-card>

      <!-- STATUS BADGES -->
      <h2>Status Badges</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Status Indicators</mat-card-title>
          <mat-card-subtitle>Different states and colors</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="badge-row">
          <acp-badge label="Active" color="success" />
          <acp-badge label="Pending" color="warning" />
          <acp-badge label="Connected" color="info" />
          <acp-badge label="Live" color="danger" />
          <acp-badge label="Production" color="primary" />
          <acp-badge label="Closed" color="neutral" />
          <acp-badge label="Cancelled" color="danger" variant="outlined" />
        </mat-card-content>
      </mat-card>

      <!-- FILTER CHIPS -->
      <h2>Filter Chips</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Removable Filters</mat-card-title>
          <mat-card-subtitle>Click the X to remove</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="badge-row">
          <acp-badge
            label="Status"
            value="Active"
            color="primary"
            [removable]="true"
            (removed)="onRemoved('Status')"
          />
          <acp-badge
            label="Region"
            value="United States"
            color="secondary"
            [removable]="true"
            (removed)="onRemoved('Region')"
          />
          <acp-badge
            label="Sales Volume"
            value="$100K–5M"
            color="tertiary"
            [removable]="true"
            (removed)="onRemoved('Sales Volume')"
          />
        </mat-card-content>
      </mat-card>

      <!-- NOTIFICATION CHIPS -->
      <h2>Notification Chips</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Clickable Actions</mat-card-title>
          <mat-card-subtitle>Interactive chips with trailing icons</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="badge-row">
          <acp-badge
            label="Updates"
            trailingIcon="arrow_forward"
            color="info"
            [clickable]="true"
            (clicked)="onClick('Updates')"
          />
          <acp-badge
            label="Read"
            trailingIcon="arrow_forward"
            color="neutral"
            [clickable]="true"
            (clicked)="onClick('Read')"
          />
          <acp-badge
            label="Edit"
            trailingIcon="edit"
            color="primary"
            [clickable]="true"
            (clicked)="onClick('Edit')"
          />
        </mat-card-content>
      </mat-card>

      <!-- EVENT & CALENDAR CHIPS -->
      <h2>Event & Calendar Chips</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Calendar Metadata</mat-card-title>
          <mat-card-subtitle>Date, time, location, and event details</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="badge-row wrap">
          <acp-badge icon="event" label="Oct 24" value="09:00 AM" color="primary" />
          <acp-badge icon="schedule" label="Duration" value="1h 30m" color="secondary" />
          <acp-badge icon="place" label="New York" color="tertiary" />
          <acp-badge icon="videocam" label="Zoom" color="info" variant="outlined" />
          <acp-badge icon="people" label="12 participants" color="success" variant="tonal" />
          <acp-badge icon="repeat" label="Weekly" color="neutral" variant="text" />
        </mat-card-content>
      </mat-card>

      <!-- LABELS -->
      <h2>Labels</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Role & Category Labels</mat-card-title>
          <mat-card-subtitle>Simple text labels</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="badge-row">
          <acp-badge label="Admin" color="primary" />
          <acp-badge label="User" color="secondary" />
          <acp-badge label="Guest" color="tertiary" />
          <acp-badge label="Beta" color="warning" variant="outlined" />
          <acp-badge label="New" color="success" variant="soft" />
        </mat-card-content>
      </mat-card>

      <!-- ALL COLORS -->
      <h2>All Colors</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Color Palette</mat-card-title>
          <mat-card-subtitle>All available colors with filled variant</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="badge-row">
          <acp-badge label="Primary" color="primary" variant="filled" />
          <acp-badge label="Secondary" color="secondary" variant="filled" />
          <acp-badge label="Tertiary" color="tertiary" variant="filled" />
          <acp-badge label="Success" color="success" variant="filled" />
          <acp-badge label="Warning" color="warning" variant="filled" />
          <acp-badge label="Danger" color="danger" variant="filled" />
          <acp-badge label="Info" color="info" variant="filled" />
          <acp-badge label="Neutral" color="neutral" variant="filled" />
        </mat-card-content>
      </mat-card>

      <!-- VARIANTS -->
      <h2>Variants</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Visual Styles</mat-card-title>
          <mat-card-subtitle>Different appearance options</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="variant-section">
            <h3>Filled (Default)</h3>
            <div class="badge-row">
              <acp-badge label="Filled" variant="filled" color="primary" />
              <acp-badge label="Filled" variant="filled" color="success" />
              <acp-badge label="Filled" variant="filled" color="warning" />
            </div>
          </div>
          <div class="variant-section">
            <h3>Outlined</h3>
            <div class="badge-row">
              <acp-badge label="Outlined" variant="outlined" color="primary" />
              <acp-badge label="Outlined" variant="outlined" color="success" />
              <acp-badge label="Outlined" variant="outlined" color="warning" />
            </div>
          </div>
          <div class="variant-section">
            <h3>Soft</h3>
            <div class="badge-row">
              <acp-badge label="Soft" variant="soft" color="primary" />
              <acp-badge label="Soft" variant="soft" color="success" />
              <acp-badge label="Soft" variant="soft" color="warning" />
            </div>
          </div>
          <div class="variant-section">
            <h3>Tonal</h3>
            <div class="badge-row">
              <acp-badge label="Tonal" variant="tonal" color="primary" />
              <acp-badge label="Tonal" variant="tonal" color="success" />
              <acp-badge label="Tonal" variant="tonal" color="warning" />
            </div>
          </div>
          <div class="variant-section">
            <h3>Text</h3>
            <div class="badge-row">
              <acp-badge label="Text" variant="text" color="primary" />
              <acp-badge label="Text" variant="text" color="success" />
              <acp-badge label="Text" variant="text" color="warning" />
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- SIZES -->
      <h2>Sizes</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Size Options</mat-card-title>
          <mat-card-subtitle>Extra small to large</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="badge-row align-center">
          <acp-badge label="xs" size="xs" color="success" />
          <acp-badge label="sm" size="sm" color="success" />
          <acp-badge label="md" size="md" color="success" />
          <acp-badge label="lg" size="lg" color="success" />
        </mat-card-content>
      </mat-card>

      <!-- SHAPES -->
      <h2>Shapes</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Border Radius</mat-card-title>
          <mat-card-subtitle>Rounded, pill, and square shapes</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="badge-row">
          <acp-badge label="Rounded" shape="rounded" color="primary" />
          <acp-badge label="Pill" shape="pill" color="info" />
          <acp-badge label="Square" shape="square" color="info" variant="outlined" />
        </mat-card-content>
      </mat-card>

      <!-- STATES -->
      <h2>States</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Interactive States</mat-card-title>
          <mat-card-subtitle>Loading, disabled, and selected</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="state-section">
            <h3>Default</h3>
            <div class="badge-row">
              <acp-badge label="Default" color="primary" />
            </div>
          </div>
          <div class="state-section">
            <h3>Loading</h3>
            <div class="badge-row">
              <acp-badge label="Loading" color="primary" [loading]="true" />
            </div>
          </div>
          <div class="state-section">
            <h3>Disabled</h3>
            <div class="badge-row">
              <acp-badge label="Disabled" color="primary" [disabled]="true" />
            </div>
          </div>
          <div class="state-section">
            <h3>Selected</h3>
            <div class="badge-row">
              <acp-badge label="Selected" color="primary" [selected]="true" [clickable]="true" />
            </div>
          </div>
          <div class="state-section">
            <h3>Highlighted</h3>
            <div class="badge-row">
              <acp-badge label="Highlighted" color="primary" [highlighted]="true" />
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- WITH ICONS -->
      <h2>With Icons</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Leading & Trailing Icons</mat-card-title>
          <mat-card-subtitle>Material icons support</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="variant-section">
            <h3>Leading Icon</h3>
            <div class="badge-row">
              <acp-badge icon="star" label="Favorite" color="warning" />
              <acp-badge icon="check_circle" label="Verified" color="success" />
              <acp-badge icon="error" label="Error" color="danger" />
            </div>
          </div>
          <div class="variant-section">
            <h3>Trailing Icon</h3>
            <div class="badge-row">
              <acp-badge label="Open" trailingIcon="open_in_new" color="primary" />
              <acp-badge label="Download" trailingIcon="download" color="info" />
              <acp-badge label="Settings" trailingIcon="settings" color="secondary" />
            </div>
          </div>
          <div class="variant-section">
            <h3>Both Icons</h3>
            <div class="badge-row">
              <acp-badge
                icon="notifications"
                label="Alerts"
                trailingIcon="arrow_forward"
                color="warning"
              />
              <acp-badge icon="people" label="Team" trailingIcon="arrow_forward" color="primary" />
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- COMBINATIONS -->
      <h2>Advanced Combinations</h2>
      <mat-card class="docs-example-card">
        <mat-card-header>
          <mat-card-title>Complex Examples</mat-card-title>
          <mat-card-subtitle>Real-world use cases</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="variant-section">
            <h3>User Status with Icon</h3>
            <div class="badge-row">
              <acp-badge icon="account_circle" label="John Doe" value="Online" color="success" />
              <acp-badge icon="account_circle" label="Jane Smith" value="Away" color="warning" />
              <acp-badge
                icon="account_circle"
                label="Bob Johnson"
                value="Offline"
                color="neutral"
              />
            </div>
          </div>
          <div class="variant-section">
            <h3>Priority Levels</h3>
            <div class="badge-row">
              <acp-badge icon="flag" label="Critical" color="danger" variant="filled" />
              <acp-badge icon="flag" label="High" color="warning" variant="filled" />
              <acp-badge icon="flag" label="Medium" color="info" variant="filled" />
              <acp-badge icon="flag" label="Low" color="success" variant="filled" />
            </div>
          </div>
          <div class="variant-section">
            <h3>Version Tags</h3>
            <div class="badge-row">
              <acp-badge label="v1.0.0" color="primary" variant="outlined" shape="pill" />
              <acp-badge label="v2.0.0" color="success" variant="outlined" shape="pill" />
              <acp-badge label="beta" color="warning" variant="soft" shape="pill" />
              <acp-badge label="alpha" color="danger" variant="soft" shape="pill" />
            </div>
          </div>
          <div class="variant-section">
            <h3>Department Tags</h3>
            <div class="badge-row">
              <acp-badge icon="engineering" label="Engineering" color="primary" size="lg" />
              <acp-badge icon="business" label="Business" color="secondary" size="lg" />
              <acp-badge icon="design_services" label="Design" color="tertiary" size="lg" />
              <acp-badge icon="marketing" label="Marketing" color="info" size="lg" />
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    .badge-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
    }

    .badge-row.wrap {
      gap: 16px;
    }

    .badge-row.align-center {
      align-items: center;
    }

    .variant-section {
      margin-bottom: 24px;

      h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
      }
    }

    .state-section {
      margin-bottom: 20px;

      h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
      }
    }

    h2 {
      margin-top: 32px;
      margin-bottom: 12px;
      font-size: 20px;
      font-weight: 500;
    }

    mat-card {
      margin-bottom: 24px;
    }

    mat-card-header {
      margin-bottom: 16px;
    }

    mat-card-title {
      font-size: 16px;
      font-weight: 500;
    }

    mat-card-subtitle {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeOverview {
  onClick(context: string): void {
    // eslint-disable-next-line no-console
    console.log('Badge clicked:', context);
  }

  onRemoved(context: string): void {
    // eslint-disable-next-line no-console
    console.log('Badge removed:', context);
  }
}
