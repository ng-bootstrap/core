import {NgZone} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {takeUntil, throttleTime} from 'rxjs/operators';


const getScrolledParent = (element, includeHidden = false) => {
  let style = getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

  if (style.position !== 'fixed') {
    for (let parent = element; parent = parent.parentElement;) {
      style = getComputedStyle(parent);
      if (excludeStaticParent && style.position === 'static') {
        continue;
      }
      if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
        return parent;
      }
    }
  }

  return null;
};

export function ngbScroll(zone: NgZone, hostElement: HTMLElement, callback: () => void, closed$: Observable<any>) {
  zone.runOutsideAngular(() => {
    let scrolledParent = getScrolledParent(hostElement);
    while (scrolledParent) {
      fromEvent(scrolledParent, 'scroll').pipe(takeUntil(closed$), throttleTime(10)).subscribe(() => { callback(); });
      scrolledParent = getScrolledParent(scrolledParent);
    }
  });
}
