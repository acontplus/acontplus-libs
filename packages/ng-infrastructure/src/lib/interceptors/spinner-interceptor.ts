import {
  HttpContext,
  HttpContextToken,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { OverlayService } from '@acontplus/ng-components';

export const SHOW_SPINNER = new HttpContextToken<boolean>(() => true);

export function withoutSpinner(): HttpContext {
  return new HttpContext().set(SHOW_SPINNER, false);
}

@Injectable({ providedIn: 'root' })
export class ActiveRequestsTracker {
  private readonly requests: HttpRequest<unknown>[] = [];

  get count(): number {
    return this.requests.length;
  }

  /** Retorna true si se pasa de 0 → 1 (primera request activa). */
  add(request: HttpRequest<unknown>): boolean {
    this.requests.push(request);
    return this.requests.length === 1;
  }

  /** Retorna true si se pasa de 1 → 0 (última request completada). */
  remove(request: HttpRequest<unknown>): boolean {
    const index = this.requests.indexOf(request);
    if (index >= 0) {
      this.requests.splice(index, 1);
    }
    return this.requests.length === 0;
  }
}

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const activeRequests = inject(ActiveRequestsTracker);
  const overlayService = inject(OverlayService);

  if (!req.context.get(SHOW_SPINNER)) {
    return next(req);
  }

  // showSpinner solo cuando pasamos de 0 → 1 requests
  const isFirst = activeRequests.add(req);
  if (isFirst) {
    overlayService.showSpinner();
  }

  return next(req).pipe(
    finalize(() => {
      // hideSpinner solo cuando pasamos de 1 → 0 requests
      const isEmpty = activeRequests.remove(req);
      if (isEmpty) {
        overlayService.hideSpinner();
      }
    }),
  );
};
