import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpInterceptorFn,
  HttpResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { Routes } from '@angular/router';
import { concat, interval, map, Observable, of, take, throwError } from 'rxjs';
import { FileUploadOverview } from './file-upload-overview';

/**
 * Simulates an upload endpoint so the demo exercises the real HttpClient path (progress
 * events included) without a backend. `/demo-upload/error` answers 500.
 */
const demoUploadInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/demo-upload')) {
    return next(req);
  }
  const progress: Observable<HttpEvent<unknown>> = interval(120).pipe(
    take(5),
    map(i => ({ type: HttpEventType.UploadProgress, loaded: (i + 1) * 20, total: 100 })),
  );
  const result: Observable<HttpEvent<unknown>> = req.url.endsWith('/error')
    ? throwError(
        () => new HttpErrorResponse({ status: 500, statusText: 'Server Error', url: req.url }),
      )
    : of(new HttpResponse({ status: 200, body: { ok: true } }));
  return concat(of({ type: HttpEventType.Sent } as HttpEvent<unknown>), progress, result);
};

export const routes: Routes = [
  {
    path: '',
    component: FileUploadOverview,
    // Route-level HttpClient with the simulated endpoint (demo only).
    providers: [provideHttpClient(withInterceptors([demoUploadInterceptor]))],
  },
];
