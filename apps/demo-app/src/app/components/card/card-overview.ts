import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AcpCard, AcpButton } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

@Component({
  selector: 'app-card-overview',
  imports: [
    AcpCard,
    AcpButton,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    DocHeading,
  ],
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
          <mat-card-header>
            <mat-card-title>Basic Card</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>This is a basic card with default appearance and elevation 1.</p>
          </mat-card-content>
        </acp-card>
      </div>

      <h2>Outlined Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="outlined" [elevation]="0">
          <mat-card-header>
            <mat-card-title>Outlined Card</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>This card has an outlined appearance with no elevation.</p>
          </mat-card-content>
        </acp-card>
      </div>

      <h2>Elevated Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="elevated" [elevation]="3">
          <mat-card-header>
            <mat-card-title>Elevated Card</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>This card has elevated appearance with higher elevation.</p>
          </mat-card-content>
        </acp-card>
      </div>

      <h2>Filled Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="filled" [elevation]="0">
          <mat-card-header>
            <mat-card-title>Filled Card</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>This card has a filled background with no elevation.</p>
          </mat-card-content>
        </acp-card>
      </div>

      <h2>Interactive Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="interactive" clickable="true" hover="true">
          <mat-card-header>
            <mat-card-title>Interactive Card</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>This card is clickable and has hover effects. Try clicking it!</p>
          </mat-card-content>
        </acp-card>
      </div>

      <h2>Product Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="elevated" [elevation]="2" [rounded]="true">
          <img
            mat-card-image
            src="https://via.placeholder.com/400x200/1b84ff/ffffff?text=Product+Image"
            alt="Product"
          />
          <mat-card-header>
            <mat-card-title>Premium Widget</mat-card-title>
            <mat-card-subtitle>$99.99</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>A high-quality widget with premium features and excellent performance.</p>
          </mat-card-content>
          <mat-card-actions>
            <acp-button appearance="filled" color="primary">Add to Cart</acp-button>
            <acp-button appearance="filled" color="info">Details</acp-button>
          </mat-card-actions>
        </acp-card>
      </div>

      <h2>User Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="outlined" [elevation]="1" [rounded]="true">
          <mat-card-header>
            <div
              mat-card-avatar
              style="width: 48px; height: 48px; border-radius: 50%; background: var(--mat-sys-primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500;"
            >
              JD
            </div>
            <mat-card-title>John Doe</mat-card-title>
            <mat-card-subtitle>Software Engineer</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>
              Experienced developer specializing in Angular and TypeScript. Passionate about
              building great user experiences.
            </p>
          </mat-card-content>
          <mat-card-actions>
            <acp-button appearance="filled" color="success">Follow</acp-button>
            <acp-button appearance="filled" color="primary">Message</acp-button>
          </mat-card-actions>
        </acp-card>
      </div>

      <h2>Statistics Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="filled" [elevation]="0" [rounded]="true">
          <mat-card-header>
            <mat-card-title>Total Revenue</mat-card-title>
            <mat-icon>trending_up</mat-icon>
          </mat-card-header>
          <mat-card-content>
            <h2 style="margin: 0; font-size: 32px; font-weight: 600;">$124,500</h2>
            <p style="color: var(--mat-sys-primary); margin: 8px 0 0 0;">+12.5% from last month</p>
          </mat-card-content>
          <mat-card-footer>
            <p>Updated 2 hours ago</p>
          </mat-card-footer>
        </acp-card>
      </div>

      <h2>News Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="default" [elevation]="1" [rounded]="true">
          <img
            mat-card-image
            src="https://via.placeholder.com/400x200/0a7ea4/ffffff?text=News+Image"
            alt="News"
          />
          <mat-card-header>
            <mat-card-title>Breaking: New Framework Released</mat-card-title>
            <mat-card-subtitle>Technology</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>
              A revolutionary new framework has been released that promises to change the way we
              build web applications.
            </p>
          </mat-card-content>
          <mat-card-footer>
            <p>Published 5 hours ago</p>
          </mat-card-footer>
        </acp-card>
      </div>

      <h2>Image Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="elevated" [elevation]="2" [rounded]="true" imageRatio="16:9">
          <img
            mat-card-image
            src="https://via.placeholder.com/400x225/fa896b/ffffff?text=Beautiful+Image"
            alt="Gallery"
          />
          <mat-card-header>
            <mat-card-title>Mountain Landscape</mat-card-title>
            <mat-card-subtitle>A stunning view of the mountains at sunset.</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <acp-button variant="icon" color="error" icon="favorite" />
            <acp-button variant="icon" color="success" icon="share" />
          </mat-card-actions>
        </acp-card>
      </div>

      <h2>Pricing Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="outlined" [elevation]="1" [rounded]="true">
          <mat-card-header>
            <mat-card-title>Pro Plan</mat-card-title>
            <mat-card-subtitle style="font-size: 24px; font-weight: 600;"
              >$29<span style="font-size: 14px; font-weight: 400;">/month</span></mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Unlimited projects</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
              <li>Custom integrations</li>
            </ul>
          </mat-card-content>
          <mat-card-actions>
            <acp-button appearance="elevated" color="success" style="width: 100%;"
              >Get Started</acp-button
            >
          </mat-card-actions>
        </acp-card>
      </div>

      <h2>Profile Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="elevated" [elevation]="2" [rounded]="true">
          <mat-card-header>
            <div
              mat-card-avatar
              style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: 600;"
            >
              AS
            </div>
            <mat-card-title>Alex Smith</mat-card-title>
            <mat-card-subtitle>@alexsmith</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>
              Full-stack developer and UI/UX designer. Building beautiful and functional web
              applications.
            </p>
          </mat-card-content>
          <mat-card-actions>
            <acp-button appearance="filled" color="primary">Follow</acp-button>
            <acp-button appearance="filled" color="accent">View Profile</acp-button>
          </mat-card-actions>
        </acp-card>
      </div>

      <h2>Dashboard Widget</h2>
      <div class="docs-example-card">
        <acp-card appearance="filled" [elevation]="0" [rounded]="true" [fullHeight]="true">
          <mat-card-header>
            <mat-card-title>Active Users</mat-card-title>
            <acp-button variant="icon" color="warning" icon="more_vert" />
          </mat-card-header>
          <mat-card-content>
            <h2 style="margin: 0; font-size: 36px; font-weight: 600;">2,847</h2>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px;">
              <mat-icon style="color: var(--mat-sys-primary); font-size: 20px;"
                >arrow_upward</mat-icon
              >
              <span style="color: var(--mat-sys-primary);">+18.2%</span>
              <span style="color: var(--mat-sys-on-surface-variant);">vs last week</span>
            </div>
          </mat-card-content>
        </acp-card>
      </div>

      <h2>Simple Information Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="default" [elevation]="1" [rounded]="true" padding="small">
          <mat-card-content>
            <div style="display: flex; align-items: center; gap: 12px;">
              <mat-icon color="primary">info</mat-icon>
              <p style="margin: 0;">This is a simple information card with minimal padding.</p>
            </div>
          </mat-card-content>
        </acp-card>
      </div>

      <h2>Disabled State</h2>
      <div class="docs-example-card">
        <acp-card appearance="outlined" [elevation]="1" [rounded]="true" [disabled]="true">
          <mat-card-header>
            <mat-card-title>Disabled Card</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>This card is disabled and cannot be interacted with.</p>
          </mat-card-content>
          <mat-card-actions>
            <acp-button appearance="filled" color="error" disabled>Action</acp-button>
          </mat-card-actions>
        </acp-card>
      </div>

      <h2>Compact Card</h2>
      <div class="docs-example-card">
        <acp-card appearance="compact" [elevation]="0" [rounded]="true" padding="small">
          <mat-card-content>
            <p style="margin: 0;">A compact card for tight spaces.</p>
          </mat-card-content>
        </acp-card>
      </div>

      <h2>Custom Border Radius</h2>
      <div class="docs-example-card">
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <acp-card appearance="elevated" [elevation]="1" [rounded]="4" padding="small">
            <mat-card-content>
              <p style="margin: 0;">4px radius</p>
            </mat-card-content>
          </acp-card>
          <acp-card appearance="elevated" [elevation]="1" [rounded]="8" padding="small">
            <mat-card-content>
              <p style="margin: 0;">8px radius</p>
            </mat-card-content>
          </acp-card>
          <acp-card appearance="elevated" [elevation]="1" [rounded]="16" padding="small">
            <mat-card-content>
              <p style="margin: 0;">16px radius</p>
            </mat-card-content>
          </acp-card>
          <acp-card appearance="elevated" [elevation]="1" [rounded]="24" padding="small">
            <mat-card-content>
              <p style="margin: 0;">24px radius</p>
            </mat-card-content>
          </acp-card>
        </div>
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
        color: var(--mat-sys-on-surface-variant);
      }

      [cardImage] img {
        width: 100%;
        height: auto;
        display: block;
      }
    `,
  ],
})
export class CardOverview {}
