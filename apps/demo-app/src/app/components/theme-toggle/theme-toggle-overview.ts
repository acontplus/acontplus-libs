import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ThemeToggle } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-theme-toggle-overview',
  imports: [ThemeToggle, MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Theme Toggle</app-doc-heading>

      <p class="docs-component-description">
        Dark/light mode toggle component for theme switching. Provides an easy way for users to
        switch between light and dark themes with automatic persistence of the user's preference.
      </p>

      <h2>Basic Theme Toggle</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="toggle-demo">
            <p>Click the toggle to switch between light and dark themes:</p>
            <acp-theme-toggle />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="basicToggleCode" [language]="'typescript'" />

      <h2>Layout Settings</h2>
      <p class="section-description">
        The toggle reads and changes the theme through <code>AcpLayoutSettings</code>, the same
        state used by <code>acp-layout</code> and <code>acp-customizer</code>. It is persisted to
        localStorage and applied as <code>color-scheme</code> and <code>theme-dark</code> on the
        document element.
      </p>

      <app-code-example [code]="serviceCode" [language]="'typescript'" />

      <h2>Features</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <ul class="features-list">
            <li>🌓 Seamless dark/light mode switching</li>
            <li>💾 Automatic theme preference persistence to localStorage</li>
            <li>🔄 Signal-based reactive state management</li>
            <li>🎨 Material Design 3 theme integration</li>
            <li>⚡ Instant theme application without page reload</li>
            <li>📱 Responsive to system theme preferences</li>
            <li>♿ Fully accessible with ARIA labels and keyboard support</li>
            <li>🎛️ Customizable icons and labels for i18n</li>
            <li>🧪 Test ID support for automated testing</li>
          </ul>
        </mat-card-content>
      </mat-card>

      <h2>Usage Examples</h2>
      <app-code-example [code]="usageCode" [language]="'typescript'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      .docs-component-description,
      .docs-example-card {
        margin-bottom: 16px;
      }

      .toggle-demo {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
        padding: 24px;
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .features-list li:last-child {
        border-bottom: none;
      }
    `,
  ],
})
export class ThemeToggleOverview {
  basicToggleCode = `<!-- Simply add the component to your template -->
<acp-theme-toggle />`;

  serviceCode = `import { AcpLayoutSettings } from '@acontplus/ng-components';

export class AppComponent {
  private settings = inject(AcpLayoutSettings);

  // Effective dark mode (Signal<boolean>)
  readonly isDark = this.settings.isDark;

  setTheme(theme: 'light' | 'dark' | 'auto') {
    this.settings.set({ theme });
  }
}`;

  usageCode = `// In your component
import { Component, inject } from '@angular/core';
import { ThemeToggle } from '@acontplus/ng-components';

@Component({
  selector: 'app-header',
  template: \`
    <header>
      <h1>My App</h1>
      <acp-theme-toggle />
    </header>
  \`,
  imports: [ThemeToggle]
})
export class HeaderComponent {}`;
}
