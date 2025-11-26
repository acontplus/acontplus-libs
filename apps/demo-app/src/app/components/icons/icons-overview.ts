import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIcon, IconRegistryService } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-icons-overview',
  imports: [CommonModule, SvgIcon, MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Icons</app-doc-heading>

      <p class="docs-component-description">
        Type-safe SVG icon system with registry service, fallback support, and online icon loading.
        Features tree-shakable icons, SSR-friendly design, and signal-based reactive primitives.
      </p>

      <h2>Basic Icons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="icon-grid">
            @for (icon of defaultIcons; track icon) {
              <div class="icon-item">
                <acp-svg-icon [name]="icon" size="32px" />
                <span class="icon-name">{{ icon }}</span>
              </div>
            }
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="basicIconCode" [language]="'typescript'" />

      <h2>Icon Sizes</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="icon-sizes">
            <div class="icon-size-item">
              <acp-svg-icon name="home" size="16px" />
              <span>16px</span>
            </div>
            <div class="icon-size-item">
              <acp-svg-icon name="home" size="24px" />
              <span>24px</span>
            </div>
            <div class="icon-size-item">
              <acp-svg-icon name="home" size="32px" />
              <span>32px</span>
            </div>
            <div class="icon-size-item">
              <acp-svg-icon name="home" size="48px" />
              <span>48px</span>
            </div>
            <div class="icon-size-item">
              <acp-svg-icon name="home" size="64px" />
              <span>64px</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="sizeIconCode" [language]="'typescript'" />

      <h2>Colored Icons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="icon-colors">
            <acp-svg-icon name="heart" size="48px" color="#e91e63" />
            <acp-svg-icon name="star" size="48px" color="#ffc107" />
            <acp-svg-icon name="check" size="48px" color="#4caf50" />
            <acp-svg-icon name="info" size="48px" color="#2196f3" />
            <acp-svg-icon name="warning" size="48px" color="#ff9800" />
            <acp-svg-icon name="error" size="48px" color="#f44336" />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="colorIconCode" [language]="'typescript'" />

      <h2>Custom Dimensions</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="icon-dimensions">
            <acp-svg-icon name="menu" width="20px" height="40px" />
            <acp-svg-icon name="menu" width="40px" height="20px" />
            <acp-svg-icon name="menu" width="60px" height="30px" />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="dimensionsIconCode" [language]="'typescript'" />

      <h2>Registry Configuration</h2>
      <p class="section-description">
        The icon registry allows you to register custom icons, configure fallbacks, and load icons
        from URLs.
      </p>

      <app-code-example [code]="registryCode" [language]="'typescript'" />
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      .docs-component-description,
      .section-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 24px;
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

      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 24px;
      }

      .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        border-radius: 8px;
        transition: background-color 0.2s;
      }

      .icon-item:hover {
        background-color: var(--mat-sys-surface-container-highest);
      }

      .icon-name {
        font-size: 12px;
        color: var(--mat-sys-on-surface-variant);
        text-align: center;
      }

      .icon-sizes {
        display: flex;
        align-items: flex-end;
        gap: 32px;
        flex-wrap: wrap;
      }

      .icon-size-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .icon-size-item span {
        font-size: 12px;
        color: var(--mat-sys-on-surface-variant);
      }

      .icon-colors {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
      }

      .icon-dimensions {
        display: flex;
        gap: 24px;
        align-items: center;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class IconsOverview implements OnInit {
  private iconRegistry = inject(IconRegistryService);

  defaultIcons = [
    'home',
    'user',
    'settings',
    'search',
    'close',
    'check',
    'arrow-right',
    'arrow-left',
    'menu',
    'info',
    'warning',
    'error',
    'heart',
    'star',
  ];

  basicIconCode = `<!-- Basic usage -->
<acp-svg-icon name="home" />

<!-- With size -->
<acp-svg-icon name="user" size="32px" />`;

  sizeIconCode = `<acp-svg-icon name="home" size="16px" />
<acp-svg-icon name="home" size="24px" />
<acp-svg-icon name="home" size="32px" />
<acp-svg-icon name="home" size="48px" />`;

  colorIconCode = `<acp-svg-icon name="heart" size="48px" color="#e91e63" />
<acp-svg-icon name="star" size="48px" color="#ffc107" />
<acp-svg-icon name="check" size="48px" color="#4caf50" />`;

  dimensionsIconCode = `<acp-svg-icon name="menu" width="20px" height="40px" />
<acp-svg-icon name="menu" width="40px" height="20px" />`;

  registryCode = `import { IconRegistryService } from '@acontplus/ng-components';

export class AppComponent implements OnInit {
  private iconRegistry = inject(IconRegistryService);

  ngOnInit() {
    // Configure registry
    this.iconRegistry.configure({
      fallbackIcon: \`<svg>...</svg>\`,
      showWarnings: true,
      iconBaseUrl: 'https://cdn.example.com/icons'
    });

    // Register custom icon
    this.iconRegistry.registerIcon(
      'custom-icon',
      \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10l10 5 10-5V7z"/>
      </svg>\`
    );

    // Load icon from URL
    await this.iconRegistry.loadIconFromUrl(
      'github',
      'https://example.com/github.svg'
    );
  }
}`;

  ngOnInit() {
    // Register some additional custom icons for demo
    this.iconRegistry.registerIcons([
      {
        name: 'heart',
        data: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`,
      },
      {
        name: 'star',
        data: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>`,
      },
    ]);
  }
}
