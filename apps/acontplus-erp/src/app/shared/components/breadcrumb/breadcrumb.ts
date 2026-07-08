import {
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from '@core/bootstrap/menu.service';
import { filter, startWith } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatIconModule],
})
export class Breadcrumb implements OnInit {
  private readonly router = inject(Router);
  private readonly menu = inject(MenuService);

  readonly nav = input<string[]>([]);

  navItems: string[] = [];

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this.router),
      )
      .subscribe(() => {
        this.genBreadcrumb();
      });
  }

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    if (this.nav().length > 0) {
      this.navItems = [...this.nav()];
    } else {
      this.navItems = this.menu.getLevel(routes);
      this.navItems.unshift('home');
    }
  }
}
