import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AcpCard, AcpButton, DataGrid, DataGridColumn } from '@acontplus/ng-components';
import { MatIconModule } from '@angular/material/icon';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-overview',
  imports: [AcpCard, AcpButton, DataGrid, MatIconModule, DocHeading, MatCardModule],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Card</app-doc-heading>

      <p class="docs-component-description">
        A flexible, reusable card component based on Material Design 3. Supports multiple
        appearances, elevations, and content projection for maximum flexibility. Can be used as a
        base component for product cards, user profiles, statistics, news items, pricing tables, and
        more.
      </p>

      <h2>Basic Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="default" [elevation]="1">
          <ng-template #title>Basic Card</ng-template>
          <p>This is a basic card with default appearance and elevation 1.</p>
        </acp-card>
      </div>

      <h2>Outlined Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="outlined" [elevation]="0">
          <ng-template #title>Outlined Card</ng-template>
          <p>This card has an outlined appearance with no elevation.</p>
        </acp-card>
      </div>

      <h2>Elevated Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="elevated" [elevation]="3">
          <ng-template #title>Elevated Card</ng-template>
          <p>This card has elevated appearance with higher elevation.</p>
        </acp-card>
      </div>

      <h2>Filled Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="filled" [elevation]="0">
          <ng-template #title>Filled Card</ng-template>
          <p>This card has a filled background with no elevation.</p>
        </acp-card>
      </div>

      <h2>Interactive Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="interactive" clickable="true" hover="true">
          <ng-template #title>Interactive Card</ng-template>
          <p>This card is clickable and has hover effects. Try clicking it!</p>
        </acp-card>
      </div>

      <h2>Product Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="elevated" [elevation]="2" [rounded]="true">
          <ng-template #media>
            <img
              mat-card-image
              src="https://via.placeholder.com/400x200/1b84ff/ffffff?text=Product+Image"
              alt="Product"
            />
          </ng-template>
          <ng-template #title>Premium Widget</ng-template>
          <ng-template #subtitle>$99.99</ng-template>
          <p>A high-quality widget with premium features and excellent performance.</p>
          <ng-template #actions>
            <acp-button appearance="filled" color="primary">Add to Cart</acp-button>
            <acp-button appearance="filled" color="info">Details</acp-button>
          </ng-template>
        </acp-card>
      </div>

      <h2>User Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="outlined" [elevation]="1" [rounded]="true">
          <ng-template #avatar>
            <div
              style="width: 48px; height: 48px; border-radius: 50%; background: var(--mat-sys-primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500;"
            >
              JD
            </div>
          </ng-template>
          <ng-template #title>John Doe</ng-template>
          <ng-template #subtitle>Software Engineer</ng-template>
          <p>
            Experienced developer specializing in Angular and TypeScript. Passionate about building
            great user experiences.
          </p>
          <ng-template #actions>
            <acp-button appearance="filled" color="success">Follow</acp-button>
            <acp-button appearance="filled" color="primary">Message</acp-button>
          </ng-template>
        </acp-card>
      </div>

      <h2>Statistics Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="filled" [elevation]="0" [rounded]="true">
          <ng-template #title>Total Revenue</ng-template>
          <h2 style="margin: 0; font-size: 32px; font-weight: 600;">$124,500</h2>
          <p style="color: var(--mat-sys-primary); margin: 8px 0 0 0;">+12.5% from last month</p>
          <ng-template #footer>
            <p>Updated 2 hours ago</p>
          </ng-template>
        </acp-card>
      </div>

      <h2>News Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="default" [elevation]="1" [rounded]="true">
          <ng-template #media>
            <img
              mat-card-image
              src="https://via.placeholder.com/400x200/0a7ea4/ffffff?text=News+Image"
              alt="News"
            />
          </ng-template>
          <ng-template #title>Breaking: New Framework Released</ng-template>
          <ng-template #subtitle>Technology</ng-template>
          <p>
            A revolutionary new framework has been released that promises to change the way we build
            web applications.
          </p>
          <ng-template #footer>
            <p>Published 5 hours ago</p>
          </ng-template>
        </acp-card>
      </div>

      <h2>Image Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="elevated" [elevation]="2" [rounded]="true" imageRatio="16:9">
          <ng-template #media>
            <img
              mat-card-image
              src="https://via.placeholder.com/400x225/fa896b/ffffff?text=Beautiful+Image"
              alt="Gallery"
            />
          </ng-template>
          <ng-template #title>Mountain Landscape</ng-template>
          <ng-template #subtitle>A stunning view of the mountains at sunset.</ng-template>
          <ng-template #actions>
            <acp-button variant="icon" color="error" icon="favorite" />
            <acp-button variant="icon" color="success" icon="share" />
          </ng-template>
        </acp-card>
      </div>

      <h2>Pricing Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="outlined" [elevation]="1" [rounded]="true">
          <ng-template #title>Pro Plan</ng-template>
          <ng-template #subtitle>
            $29<span style="font-size: 14px; font-weight: 400;">/month</span>
          </ng-template>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Unlimited projects</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
            <li>Custom integrations</li>
          </ul>
          <ng-template #actions>
            <acp-button appearance="elevated" color="success" style="width: 100%;"
              >Get Started</acp-button
            >
          </ng-template>
        </acp-card>
      </div>

      <h2>Profile Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="elevated" [elevation]="2" [rounded]="true">
          <ng-template #avatar>
            <div
              style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: 600;"
            >
              AS
            </div>
          </ng-template>
          <ng-template #title>Alex Smith</ng-template>
          <ng-template #subtitle>@alexsmith</ng-template>
          <p>
            Full-stack developer and UI/UX designer. Building beautiful and functional web
            applications.
          </p>
          <ng-template #actions>
            <acp-button appearance="filled" color="primary">Follow</acp-button>
            <acp-button appearance="filled" color="accent">View Profile</acp-button>
          </ng-template>
        </acp-card>
      </div>

      <h2>Dashboard Widget</h2>
      <div class="docs-example-card">
        <acp-card appearance="filled" [elevation]="0" [rounded]="true" [fullHeight]="true">
          <ng-template #header>
            <div
              style="display: flex; justify-content: space-between; align-items: center; width: 100%;"
            >
              <span>Active Users</span>
              <acp-button variant="icon" color="warning" icon="more_vert" />
            </div>
          </ng-template>
          <h2 style="margin: 0; font-size: 36px; font-weight: 600;">2,847</h2>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px;">
            <mat-icon style="color: var(--mat-sys-primary); font-size: 20px;"
              >arrow_upward</mat-icon
            >
            <span style="color: var(--mat-sys-primary);">+18.2%</span>
            <span style="color: var(--mat-sys-on-surface-variant);">vs last week</span>
          </div>
        </acp-card>
      </div>

      <h2>Simple Information Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="default" [elevation]="1" [rounded]="true" padding="small">
          <div style="display: flex; align-items: center; gap: 12px;">
            <mat-icon color="primary">info</mat-icon>
            <p style="margin: 0;">This is a simple information card with minimal padding.</p>
          </div>
        </acp-card>
      </div>

      <h2>Disabled State</h2>
      <div class="docs-example-card">
        <acp-card appearance="outlined" [elevation]="1" [rounded]="true" [disabled]="true">
          <ng-template #title>Disabled Card</ng-template>
          <p>This card is disabled and cannot be interacted with.</p>
          <ng-template #actions>
            <acp-button appearance="filled" color="error" disabled>Action</acp-button>
          </ng-template>
        </acp-card>
      </div>

      <h2>Compact Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="compact" [elevation]="0" [rounded]="true" padding="small">
          <p style="margin: 0;">A compact card for tight spaces.</p>
        </acp-card>
      </div>

      <h2>Custom Border Radius</h2>
      <div class="docs-example-card">
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <acp-card appearance="elevated" [elevation]="1" [rounded]="4" padding="small">
            <p style="margin: 0;">4px radius</p>
          </acp-card>
          <acp-card appearance="elevated" [elevation]="1" [rounded]="8" padding="small">
            <p style="margin: 0;">8px radius</p>
          </acp-card>
          <acp-card appearance="elevated" [elevation]="1" [rounded]="16" padding="small">
            <p style="margin: 0;">16px radius</p>
          </acp-card>
          <acp-card appearance="elevated" [elevation]="1" [rounded]="24" padding="small">
            <p style="margin: 0;">24px radius</p>
          </acp-card>
        </div>
      </div>

      <h2>Card with Title Group and Image</h2>
      <div class="docs-example-card">
        <acp-card appearance="outlined" [elevation]="1" [rounded]="true">
          <ng-template #header>
            <mat-card-title-group>
              <mat-card-title>Shiba Inu</mat-card-title>
              <mat-card-subtitle>Medium</mat-card-subtitle>
              <img
                mat-card-md-image
                src="https://material.angular.dev/assets/img/examples/shiba2.jpg"
                alt="Image of a Shiba Inu"
              />
            </mat-card-title-group>
          </ng-template>
          <p>
            The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from
            Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu
            was originally bred for hunting.
          </p>
        </acp-card>
      </div>

      <h2>Background Color Variants</h2>
      <div class="docs-example-card">
        <h3>Primary</h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
          <acp-card backgroundColor="primary" [rounded]="true" padding="small">
            <p style="margin: 0;">Primary</p>
          </acp-card>
          <acp-card backgroundColor="primary-container" [rounded]="true" padding="small">
            <p style="margin: 0;">Primary Container</p>
          </acp-card>
        </div>

        <h3>Secondary</h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
          <acp-card backgroundColor="secondary" [rounded]="true" padding="small">
            <p style="margin: 0;">Secondary</p>
          </acp-card>
          <acp-card backgroundColor="secondary-container" [rounded]="true" padding="small">
            <p style="margin: 0;">Secondary Container</p>
          </acp-card>
        </div>

        <h3>Error</h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
          <acp-card backgroundColor="error" [rounded]="true" padding="small">
            <p style="margin: 0;">Error</p>
          </acp-card>
          <acp-card backgroundColor="error-container" [rounded]="true" padding="small">
            <p style="margin: 0;">Error Container</p>
          </acp-card>
        </div>

        <h3>Surfaces</h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
          <acp-card backgroundColor="surface" [rounded]="true" padding="small">
            <p style="margin: 0;">Surface</p>
          </acp-card>
          <acp-card backgroundColor="surface-variant" [rounded]="true" padding="small">
            <p style="margin: 0;">Surface Variant</p>
          </acp-card>
          <acp-card backgroundColor="surface-container-highest" [rounded]="true" padding="small">
            <p style="margin: 0;">Surface Container Highest</p>
          </acp-card>
          <acp-card backgroundColor="surface-container-high" [rounded]="true" padding="small">
            <p style="margin: 0;">Surface Container High</p>
          </acp-card>
          <acp-card backgroundColor="surface-container" [rounded]="true" padding="small">
            <p style="margin: 0;">Surface Container</p>
          </acp-card>
          <acp-card backgroundColor="surface-container-low" [rounded]="true" padding="small">
            <p style="margin: 0;">Surface Container Low</p>
          </acp-card>
          <acp-card backgroundColor="surface-container-lowest" [rounded]="true" padding="small">
            <p style="margin: 0;">Surface Container Lowest</p>
          </acp-card>
          <acp-card backgroundColor="inverse-surface" [rounded]="true" padding="small">
            <p style="margin: 0;">Inverse Surface</p>
          </acp-card>
        </div>

        <h3>Disabled</h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <acp-card backgroundColor="disabled-bg" [rounded]="true" padding="small">
            <p style="margin: 0;">Disabled</p>
          </acp-card>
        </div>
      </div>

      <h2>Card with Data Grid</h2>
      <div class="docs-example-card">
        <acp-card [rounded]="true" padding="medium">
          <ng-template #title>User List</ng-template>
          <ng-template #subtitle>Manage your users</ng-template>
          <acp-data-grid
            [data]="users"
            [columns]="userColumns"
            [displayedColumns]="['name', 'email', 'role', 'status']"
            [showPaginator]="false"
            size="small"
          >
          </acp-data-grid>
        </acp-card>
      </div>
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

      .docs-example-card acp-card {
        max-width: 400px;
      }

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
      }

      p {
        margin: 0;
      }

      [cardImage] img {
        width: 100%;
        height: auto;
        display: block;
      }
    `,
  ],
})
export class CardOverview {
  users = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  ];

  userColumns: DataGridColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'status', header: 'Status' },
  ];
}
