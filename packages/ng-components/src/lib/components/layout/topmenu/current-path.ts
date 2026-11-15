import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { menuPath } from '../menu';

/** Current router path (without query or fragment) as a signal. Call in an injection context. */
export function injectCurrentPath() {
  const router = inject(Router);
  return toSignal(
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => menuPath(router.url)),
    ),
    { initialValue: menuPath(router.url) },
  );
}
