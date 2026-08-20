import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggle, ThemeSwitcher, AcpDrawer, AcpDrawerRef } from '@acontplus/ng-components';
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
  private readonly themeSwitcher = inject(ThemeSwitcher);
  private readonly drawer = inject(AcpDrawer);

  skipLinkHref: string | null | undefined;
  skipLinkHidden = true;

  isDarkMode$ = this.themeSwitcher.isDarkMode$;
  drawerRef: AcpDrawerRef<Customizer> | null = null;

  openCustomizer() {
    this.drawerRef = this.drawer.open(Customizer, {
      position: 'right',
      width: '320px',
    });
  }

  closeCustomizer() {
    if (this.drawerRef) {
      this.drawerRef.dismiss();
      this.drawerRef = null;
    }
  }
}
