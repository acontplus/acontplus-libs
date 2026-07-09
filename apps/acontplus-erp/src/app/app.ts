import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { PreloaderService, SettingsService } from '@core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: ` <router-outlet /> `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterOutlet],
})
export class App implements OnInit, AfterViewInit {
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);

  ngOnInit() {
    this.settings.setDirection();
    this.settings.setTheme();
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
