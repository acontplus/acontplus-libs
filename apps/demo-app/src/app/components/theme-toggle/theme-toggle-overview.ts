import { Component } from '@angular/core';

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

      <h2>Theme Switcher Service</h2>
      <p class="section-description">
        The ThemeSwitcher service manages application theme (dark/light mode) with persistence to
        localStorage. It automatically applies the theme class to the document element.
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

      .features-list li {
        padding: 12px 0;
        border-bottom: 1px solid var(--mat-sys-outline-variant);
        font-size: 16px;
        line-height: 1.6;
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

  serviceCode = `import { ThemeSwitcher } from '@acontplus/ng-components';

export class AppComponent {
  private themeSwitcher = inject(ThemeSwitcher);

  ngOnInit() {
    // Get current theme
    const currentTheme = this.themeSwitcher.currentTheme();
    console.log('Current theme:', currentTheme);

    // Listen to theme changes
    effect(() => {
      console.log('Theme changed to:', this.themeSwitcher.currentTheme());
    });
  }

  toggleTheme() {
    this.themeSwitcher.toggleTheme();
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeSwitcher.setTheme(theme);
  }
}`;

  usageCode = `// In your component
import { Component, inject } from '@angular/core';
import { ThemeToggle, ThemeSwitcher } from '@acontplus/ng-components';

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
export class HeaderComponent {
  private themeSwitcher = inject(ThemeSwitcher);

  // Access current theme
  get isDarkMode() {
    return this.themeSwitcher.currentTheme() === 'dark';
  }

  // Programmatically toggle
  toggleTheme() {
    this.themeSwitcher.toggleTheme();
  }
}`;
}
