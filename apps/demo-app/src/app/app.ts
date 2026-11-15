import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  effect,
  inject,
} from '@angular/core';
import { Dir } from '@angular/cdk/bidi';
import { RouterModule } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { SettingsService } from './core/settings.service';

@Component({
  imports: [RouterModule, Navbar],
  selector: 'app-root',
  hostDirectives: [Dir],
  template: `
    <app-navbar />
    <router-outlet />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    const dir = inject(Dir);
    const settings = inject(SettingsService);
    // Provides the direction to Material components and overlays opened from the app
    effect(() => {
      dir.dir = settings.options().dir;
    });
  }
}
