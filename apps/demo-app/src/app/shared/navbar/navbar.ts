import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggle, ThemeSwitcher } from '@acontplus/ng-components';
import { Customizer } from '../../components/customizer/customizer';

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
    ThemeToggle,
    Customizer,
  ],
})
export class Navbar {
  private themeSwitcher = inject(ThemeSwitcher);

  skipLinkHref: string | null | undefined;
  skipLinkHidden = true;

  isDarkMode$ = this.themeSwitcher.isDarkMode$;
  showCustomizer = false;
}
