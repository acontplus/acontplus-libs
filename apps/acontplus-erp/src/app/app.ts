import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreloaderService } from '@core';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class App implements AfterViewInit {
  private readonly preloader = inject(PreloaderService);

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
