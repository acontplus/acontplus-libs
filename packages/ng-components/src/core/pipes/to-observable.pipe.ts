import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, isObservable } from 'rxjs';

@Pipe({ name: 'toObservable' })
export class AcpToObservablePipe implements PipeTransform {
  transform<T>(value: T | Observable<T>): Observable<T> {
    return isObservable(value) ? value : of(value);
  }
}
