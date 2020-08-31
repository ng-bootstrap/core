import {NgZone} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {takeUntil, throttleTime} from 'rxjs/operators';


export function ngbWindowResize(zone: NgZone, callback: () => void, unsubscribe$: Observable<any>) {
  zone.runOutsideAngular(() => {
    fromEvent(window, 'resize').pipe(takeUntil(unsubscribe$), throttleTime(10)).subscribe(() => callback());
  });
}
