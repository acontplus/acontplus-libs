import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { BASE_URL } from '@core/interceptors/base-url-interceptor';
import { environment } from '@env/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptors } from '@core/interceptors';
import { StartupService } from '@core';
import { NgxPermissionsModule } from 'ngx-permissions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      withComponentInputBinding(),
    ),
    { provide: BASE_URL, useValue: environment.baseUrl },
    provideAppInitializer(() => inject(StartupService).load()),
    provideHttpClient(withInterceptors(interceptors)),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
  ],
};
