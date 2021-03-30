import {DebugElement} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Key} from '../util/key';



export function createGenericTestComponent<T>(
    html: string, type: {new (...args: any[]): T}, detectChanges = true): ComponentFixture<T> {
  TestBed.overrideComponent(type, {set: {template: html}});
  const fixture = TestBed.createComponent(type);
  if (detectChanges) {
    fixture.detectChanges();
  }
  return fixture as ComponentFixture<T>;
}

export type Browser = 'ie9' | 'ie10' | 'ie11' | 'ie' | 'edge' | 'chrome' | 'safari' | 'firefox';

export function getBrowser(ua = window.navigator.userAgent) {
  // IE < 11
  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    return 'ie' + parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  // IE 11
  if (ua.indexOf('Trident/') > 0) {
    let rv = ua.indexOf('rv:');
    return 'ie' + parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  // Edge
  if (ua.indexOf('Edge/') > 0) {
    return 'edge';
  }

  // Chrome
  if (ua.indexOf('Chrome/') > 0) {
    return 'chrome';
  }

  // Safari
  if (ua.indexOf('Safari/') > 0) {
    return 'safari';
  }

  // Firefox
  if (ua.indexOf('Firefox/') > 0) {
    return 'firefox';
  }

  throw new Error('Browser detection failed for: ' + ua);
}

export function isBrowser(browsers: Browser | Browser[], ua = window.navigator.userAgent) {
  let browsersStr = Array.isArray(browsers) ? (browsers as Browser[]).map(x => x.toString()) : [browsers.toString()];
  let browser = getBrowser(ua);

  if (browsersStr.indexOf('ie') > -1 && browser.startsWith('ie')) {
    return true;
  } else {
    return browsersStr.indexOf(browser) > -1;
  }
}

export function isBrowserVisible(suiteName: string) {
  if (document.hidden) {
    console.warn(`${suiteName} tests were skipped because browser tab running these tests is hidden or inactive`);
    return false;
  }
  return true;
}

export function createKeyEvent(key: Key, options: {type: 'keyup' | 'keydown'} = {
  type: 'keyup'
}) {
  const event = document.createEvent('KeyboardEvent') as any;
  let initEvent = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
  initEvent(options.type, true, true, window, 0, 0, 0, 0, 0, key);
  Object.defineProperties(event, {which: {get: () => key}});

  return event;
}

export function triggerEvent(element: DebugElement | HTMLElement, eventName: string) {
  const evt = document.createEvent('Event');
  evt.initEvent(eventName, true, false);
  (element instanceof DebugElement ? element.nativeElement : element).dispatchEvent(evt);
}
