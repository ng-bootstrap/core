import {Observable, merge} from 'rxjs';
import {share, filter, delay, map} from 'rxjs/operators';
import {Renderer2} from '@angular/core';

export class Trigger {
  constructor(public open: string, public close?: string) {
    if (!close) {
      this.close = open;
    }
  }

  isManual() { return this.open === 'manual' || this.close === 'manual'; }
}

const DEFAULT_ALIASES = {
  'hover': ['mouseenter', 'mouseleave'],
  'focus': ['focusin', 'focusout'],
};

export function parseTriggers(triggers: string, aliases = DEFAULT_ALIASES): Trigger[] {
  const trimmedTriggers = (triggers || '').trim();

  if (trimmedTriggers.length === 0) {
    return [];
  }

  const parsedTriggers = trimmedTriggers.split(/\s+/).map(trigger => trigger.split(':')).map((triggerPair) => {
    let alias = aliases[triggerPair[0]] || triggerPair;
    return new Trigger(alias[0], alias[1]);
  });

  const manualTriggers = parsedTriggers.filter(triggerPair => triggerPair.isManual());

  if (manualTriggers.length > 1) {
    throw 'Triggers parse error: only one manual trigger is allowed';
  }

  if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
    throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
  }

  return parsedTriggers;
}

export function observeTriggers(
    renderer: Renderer2, nativeElement: HTMLElement, triggers: Trigger[], isOpenedFn: () => boolean) {
  return new Observable<boolean>(subscriber => {
    const listeners: Function[] = [];
    const openFn = () => subscriber.next(true);
    const closeFn = () => subscriber.next(false);
    const toggleFn = () => subscriber.next(!isOpenedFn());

    triggers.forEach((trigger: Trigger) => {
      if (trigger.open === trigger.close) {
        listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
      } else {
        listeners.push(
            renderer.listen(nativeElement, trigger.open, openFn),
            renderer.listen(nativeElement, trigger.close !, closeFn));
      }
    });

    return () => { listeners.forEach(unsubscribeFn => unsubscribeFn()); };
  });
}

const delayOrNoop = <T>(time: number) => time > 0 ? delay<T>(time) : (a: Observable<T>) => a;

export function triggerDelay(openDelay: number, closeDelay: number, isOpenedFn: () => boolean) {
  return (input$: Observable<boolean>) => {
    let pending: {open: boolean} | null = null;
    const filteredInput$ = input$.pipe(
        map(open => ({open})), filter(event => {
          const currentlyOpen = isOpenedFn();
          if (currentlyOpen !== event.open && (!pending || pending.open === currentlyOpen)) {
            pending = event;
            return true;
          }
          if (pending && pending.open !== event.open) {
            pending = null;
          }
          return false;
        }),
        share());
    const delayedOpen$ = filteredInput$.pipe(filter(event => event.open), delayOrNoop(openDelay));
    const delayedClose$ = filteredInput$.pipe(filter(event => !event.open), delayOrNoop(closeDelay));
    return merge(delayedOpen$, delayedClose$)
        .pipe(
            filter(event => {
              if (event === pending) {
                pending = null;
                return event.open !== isOpenedFn();
              }
              return false;
            }),
            map(event => event.open));
  };
}

export function listenToTriggers(
    renderer: Renderer2, nativeElement: HTMLElement, triggers: string, isOpenedFn: () => boolean, openFn: Function,
    closeFn: Function, openDelay = 0, closeDelay = 0) {
  const parsedTriggers = parseTriggers(triggers);

  if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
    return () => {};
  }

  const subscription = observeTriggers(renderer, nativeElement, parsedTriggers, isOpenedFn)
                           .pipe(triggerDelay(openDelay, closeDelay, isOpenedFn))
                           .subscribe(open => (open ? openFn() : closeFn()));

  return () => subscription.unsubscribe();
}
