import {Injectable, Inject, InjectionToken, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';



// usefulness (and default value) of delay documented in Material's CDK
// https://github.com/angular/material2/blob/6405da9b8e8532a7e5c854c920ee1815c275d734/src/cdk/a11y/live-announcer/live-announcer.ts#L50
export type ARIA_LIVE_DELAY_TYPE = number | null;
export const ARIA_LIVE_DELAY = new InjectionToken<ARIA_LIVE_DELAY_TYPE>(
    'live announcer delay', {providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY});
export function ARIA_LIVE_DELAY_FACTORY(): number {
  return 100;
}


function getLiveElement(document: any, lazyCreate = false): HTMLElement | null {
  let element = document.body.querySelector('#ngb-live') as HTMLElement;

  if (element == null && lazyCreate) {
    element = document.createElement('div');

    element.setAttribute('id', 'ngb-live');
    element.setAttribute('aria-live', 'polite');
    element.setAttribute('aria-atomic', 'true');

    element.classList.add('sr-only');

    document.body.appendChild(element);
  }

  return element;
}



@Injectable({providedIn: 'root'})
export class Live implements OnDestroy {
  constructor(@Inject(DOCUMENT) private _document: any, @Inject(ARIA_LIVE_DELAY) private _delay: any) {}

  ngOnDestroy() {
    const element = getLiveElement(this._document);
    if (element) {
      // if exists, it will always be attached to the <body>
      element.parentElement !.removeChild(element);
    }
  }

  say(message: string) {
    const element = getLiveElement(this._document, true);
    const delay = this._delay;

    if (element != null) {
      element.textContent = '';
      const setText = () => element.textContent = message;
      if (delay === null) {
        setText();
      } else {
        setTimeout(setText, delay);
      }
    }
  }
}
