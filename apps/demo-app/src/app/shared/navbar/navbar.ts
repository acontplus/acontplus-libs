import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggle, ThemeSwitcher } from '@acontplus/ng-components';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    NgTemplateOutlet,
    ThemeToggle,
  ],
})
export class Navbar {
  private themeSwitcher = inject(ThemeSwitcher);

  skipLinkHref: string | null | undefined;
  skipLinkHidden = true;

  isDarkMode$ = this.themeSwitcher.isDarkMode$;
}
