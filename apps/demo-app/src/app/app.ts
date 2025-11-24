import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';

@Component({
  imports: [RouterModule, Navbar],
  selector: 'app-root',
  template: `
    <app-navbar />
    <router-outlet />
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './app.scss',
})
export class App {
  protected title = 'demo-app';
  isActive = true;
}
