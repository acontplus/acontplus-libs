import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AcpDrawer } from '@acontplus/ng-components';
import { Customizer } from '../../components/customizer/customizer';
import { SettingsService } from '../../core/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    NgTemplateOutlet,
  ],
})
export class Navbar {
  private readonly drawer = inject(AcpDrawer);
  private readonly settings = inject(SettingsService);

  skipLinkHref: string | null | undefined;
  skipLinkHidden = true;

  readonly isDark = computed(() => {
    const theme = this.settings.options().theme;
    return theme === 'auto'
      ? globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches === true
      : theme === 'dark';
  });

  toggleDarkMode() {
    this.settings.setTheme(this.isDark() ? 'light' : 'dark');
  }

  openCustomizer() {
    this.drawer.open(Customizer, { position: 'right', width: '340px' });
  }
}
