import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './providers';

import { ENVIRONMENT } from '@acontplus/ng-config';
import {
  apiInterceptor,
  httpContextInterceptor,
  spinnerInterceptor,
  provideHttpContext,
} from '@acontplus/ng-infrastructure';
import { authProviders, csrfInterceptor } from '@acontplus/ng-auth';
import { provideNotifications } from '@acontplus/ng-notifications';
import { companyCustomerProvider } from './modules/company-customer/company-customer-provider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SettingsService } from './core/settings.service';

import {
  WHATSAPP_MESSAGING_PORT,
  MetaWhatsAppAdapter,
  REPORT_PORT,
  ReportAdapter,
} from '@acontplus/ng-common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true,
    }),
    provideRouter(appRoutes),

    provideHttpClient(
      withInterceptors([
        httpContextInterceptor,
        apiInterceptor,
        spinnerInterceptor,
        csrfInterceptor,
      ]),
    ),

    provideHttpContext({
      enableLanguageHeader: true,
    }),

    ...authProviders,

    ...companyCustomerProvider,

    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        missingHandler: {
          useFallbackTranslation: true,
        },
      },
      loader: TranslocoHttpLoader,
    }),

    provideNotifications({
      defaultProvider: 'sweetalert',
    }),

    { provide: ENVIRONMENT, useValue: environment },
    SettingsService,

    { provide: WHATSAPP_MESSAGING_PORT, useClass: MetaWhatsAppAdapter },
    { provide: REPORT_PORT, useClass: ReportAdapter },

    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
  ],
};
