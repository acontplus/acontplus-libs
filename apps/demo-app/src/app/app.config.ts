import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { environment } from '../environments/environment';
import { initHttpFactory } from './init-http-factory';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './providers';

import { ENVIRONMENT } from '@acontplus/ng-config';
import {
  apiInterceptor,
  httpContextInterceptor,
  spinnerInterceptor,
} from '@acontplus/ng-infrastructure';
import { csrfInterceptor } from '@acontplus/ng-auth';
import { provideNotifications } from '../../../../packages/ng-notifications/src/lib/providers';
import { companyCustomerProvider } from './modules/company-customer/company-customer-provider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    // Core Angular providers
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true,
    }),
    provideRouter(appRoutes),

    // Enable hydration with timeout handling
    //  provideClientHydration(withEventReplay()), // App initialization
    provideAppInitializer(initHttpFactory()),

    // HTTP configuration
    provideHttpClient(
      withInterceptors([
        apiInterceptor,
        spinnerInterceptor,
        csrfInterceptor,
        httpContextInterceptor,
      ]),
      withFetch(),
    ),

    // Authentication
    //  ...authProviders,

    ...companyCustomerProvider,

    // Internationalization
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        missingHandler: {
          useFallbackTranslation: true,
        },
      },
      loader: TranslocoHttpLoader,
    }),

    // Notifications
    provideNotifications({
      defaultProvider: 'sweetalert',
    }),

    // Environment
    { provide: ENVIRONMENT, useValue: environment },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,

      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
  ],
};
