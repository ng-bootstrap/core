import {NgZone} from '@angular/core';
import {fromEvent, Observable, race} from 'rxjs';
import {delay, filter, map, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {Key} from './key';
import {closest} from './util';

const isContainedIn = (element: HTMLElement, array?: HTMLElement[]) =>
    array ? array.some(item => item.contains(element)) : false;

const matchesSelectorIfAny = (element: HTMLElement, selector?: string) =>
    !selector || closest(element, selector) != null;

// we have to add a more significant delay to avoid re-opening when handling (click) on a toggling element
// TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
const isMobile = (() => {
  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  const isAndroid = () => /Android/.test(navigator.userAgent);

  return typeof navigator !== 'undefined' ? !!navigator.userAgent && (isIOS() || isAndroid()) : false;
})();

// setting 'ngbAutoClose' synchronously on mobile results in immediate popup closing
// when tapping on the triggering element
const wrapAsyncForMobile = fn => isMobile ? () => setTimeout(() => fn(), 100) : fn;

export const enum SOURCE {ESCAPE, CLICK}

export function ngbAutoClose(
    zone: NgZone, document: any, type: boolean | 'inside' | 'outside', close: (source: SOURCE) => void,
    closed$: Observable<any>, insideElements: HTMLElement[], ignoreElements?: HTMLElement[], insideSelector?: string) {
  // closing on ESC and outside clicks
  if (type) {
    zone.runOutsideAngular(wrapAsyncForMobile(() => {

      const shouldCloseOnClick = (event: MouseEvent) => {
        const element = event.target as HTMLElement;
        if (event.button === 2 || isContainedIn(element, ignoreElements)) {
          return false;
        }
        if (type === 'inside') {
          return isContainedIn(element, insideElements) && matchesSelectorIfAny(element, insideSelector);
        } else if (type === 'outside') {
          return !isContainedIn(element, insideElements);
        } else /* if (type === true) */ {
          return matchesSelectorIfAny(element, insideSelector) || !isContainedIn(element, insideElements);
        }
      };

      const escapes$ = fromEvent<KeyboardEvent>(document, 'keydown')
                           .pipe(
                               takeUntil(closed$),
                               // tslint:disable-next-line:deprecation
                               filter(e => e.which === Key.Escape), tap(e => e.preventDefault()));


      // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown',
      // because on 'mouseup' DOM nodes might be detached
      const mouseDowns$ =
          fromEvent<MouseEvent>(document, 'mousedown').pipe(map(shouldCloseOnClick), takeUntil(closed$));

      const closeableClicks$ = fromEvent<MouseEvent>(document, 'mouseup')
                                   .pipe(
                                       withLatestFrom(mouseDowns$), filter(([_, shouldClose]) => shouldClose), delay(0),
                                       takeUntil(closed$)) as Observable<MouseEvent>;


      race<SOURCE>([
        escapes$.pipe(map(_ => SOURCE.ESCAPE)), closeableClicks$.pipe(map(_ => SOURCE.CLICK))
      ]).subscribe((source: SOURCE) => zone.run(() => close(source)));
    }));
  }
}
