import {ngbCompleteTransition, ngbRunTransition, NgbTransitionStartFn} from './ngbTransition';
import createSpy = jasmine.createSpy;
import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {isBrowser, isBrowserVisible} from '../../test/common';
import {reflow} from '../util';

/**
 * This is sometimes necessary only for IE when it fails to recalculate styles synchronously
 * after the 'transitionend' event was fired. To remove when not supporting IE anymore.
 */
function expectOpacity(element: HTMLElement, opacity = '0') {
  if (!isBrowser('ie')) {
    expect(window.getComputedStyle(element).opacity).toBe(opacity);
  }
}

function fadeFn({classList}: HTMLElement) {
  classList.remove('ngb-test-show');
}

if (isBrowserVisible('ngbRunTransition')) {
  describe('ngbRunTransition', () => {

    let component: ComponentFixture<TestComponent>;
    let element: HTMLElement;
    let zone: NgZone;

    beforeEach(() => {
      TestBed.configureTestingModule({declarations: [TestComponent]});

      component = TestBed.createComponent(TestComponent);
      component.detectChanges();
      element = component.componentInstance.element.nativeElement;
      reflow(element);
      spyOn(component.componentInstance, 'onTransitionEnd');

      zone = TestBed.inject(NgZone);
    });

    it(`should run specified transition on an element`, (done) => {
      element.classList.add('ngb-test-fade');

      const nextSpy = createSpy();
      const errorSpy = createSpy();

      ngbRunTransition(zone, element, fadeFn, {animation: true, runningTransition: 'continue'})
          .subscribe(nextSpy, errorSpy, () => {
            expect(component.componentInstance.onTransitionEnd).toHaveBeenCalledTimes(1);
            expect(nextSpy).toHaveBeenCalledWith(undefined);
            expect(element.classList.contains('ngb-test-show')).toBe(false);
            expect(errorSpy).not.toHaveBeenCalled();
            expectOpacity(element, '0');
            done();
          });

      expect(window.getComputedStyle(element).opacity).toBe('1');
    });

    it(`should execute callbacks in provided zone with 'animations: false'`, () => {
      element.classList.add('ngb-test-fade');

      const next = createSpy('next', (_: any) => expect(NgZone.isInAngularZone()).toBeTrue()).and.callThrough();
      const error = createSpy();
      const complete = createSpy('complete', () => expect(NgZone.isInAngularZone()).toBeTrue()).and.callThrough();

      ngbRunTransition(zone, element, fadeFn, {animation: false, runningTransition: 'continue'})
          .subscribe(next, error, complete);

      expect(next).toHaveBeenCalledWith(undefined);
      expect(error).toHaveBeenCalledTimes(0);
      expect(complete).toHaveBeenCalledTimes(1);
      expect(component.componentInstance.onTransitionEnd).not.toHaveBeenCalled();
    });


    it(`should execute callbacks in provided zone with 'animations: true'`, (done) => {
      element.classList.add('ngb-test-fade');

      const next = createSpy('next', (_: any) => expect(NgZone.isInAngularZone()).toBeTrue()).and.callThrough();
      const error = createSpy();
      const complete = createSpy('complete', () => {
                         expect(NgZone.isInAngularZone()).toBeTrue();
                         expect(next).toHaveBeenCalledWith(undefined);
                         expect(error).toHaveBeenCalledTimes(0);
                         expect(component.componentInstance.onTransitionEnd).toHaveBeenCalled();
                         done();
                       }).and.callThrough();

      ngbRunTransition(zone, element, fadeFn, {animation: true, runningTransition: 'continue'})
          .subscribe(next, error, complete);
    });

    it(`should execute callbacks in provided zone when stopping currently running transition'`, () => {
      const startFn = ({classList}: HTMLElement) => {
        classList.add('ngb-test-during');
        return () => {
          classList.remove('ngb-test-during');
          classList.add('ngb-test-after');
        };
      };

      // starting first
      const nextSpy1 = createSpy();
      const errorSpy1 = createSpy();
      const completeSpy1 = createSpy('complete', () => expect(NgZone.isInAngularZone()).toBeTrue()).and.callThrough();
      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'stop'})
          .subscribe(nextSpy1, errorSpy1, completeSpy1);

      // starting second
      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'stop'}).subscribe();

      // first transition was completed and no value was emitted
      expect(nextSpy1).not.toHaveBeenCalled();
      expect(errorSpy1).not.toHaveBeenCalled();
      expect(completeSpy1).toHaveBeenCalled();
    });

    it(`should emit 'undefined' and complete synchronously with 'animation: false'`, () => {
      element.classList.add('ngb-test-fade');
      expect(window.getComputedStyle(element).opacity).toBe('1');

      const nextSpy = createSpy();
      const errorSpy = createSpy();
      const completeSpy = createSpy();

      ngbRunTransition(zone, element, fadeFn, {animation: false, runningTransition: 'continue'})
          .subscribe(nextSpy, errorSpy, completeSpy);

      expect(element.classList.contains('ngb-test-show')).toBe(false);
      expect(window.getComputedStyle(element).opacity).toBe('1');
      expect(component.componentInstance.onTransitionEnd).not.toHaveBeenCalled();
      expect(nextSpy).toHaveBeenCalledWith(undefined);
      expect(errorSpy).not.toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it(`should emit 'undefined' and complete synchronously if transition is 'none'`, () => {
      element.classList.add('ngb-test-none');
      expect(window.getComputedStyle(element).opacity).toBe('1');

      const nextSpy = createSpy();
      const errorSpy = createSpy();
      const completeSpy = createSpy();

      ngbRunTransition(zone, element, fadeFn, {animation: true, runningTransition: 'continue'})
          .subscribe(nextSpy, errorSpy, completeSpy);

      expect(element.classList.contains('ngb-test-show')).toBe(false);
      expect(window.getComputedStyle(element).opacity).toBe('1');
      expect(component.componentInstance.onTransitionEnd).not.toHaveBeenCalled();
      expect(nextSpy).toHaveBeenCalledWith(undefined);
      expect(errorSpy).not.toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it(`should complete new transition and continue one already running with 'runningTransition: continue'`, (done) => {
      let startCalls = 0;
      let endCalls = 0;
      const startFn = ({classList}: HTMLElement) => {
        startCalls++;
        classList.add('ngb-test-during');
        return () => {
          endCalls++;
          classList.remove('ngb-test-during');
          classList.add('ngb-test-after');
        };
      };

      // starting first
      const nextSpy1 = createSpy();
      const errorSpy1 = createSpy();

      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'continue'})
          .subscribe(nextSpy1, errorSpy1, () => {
            expect(startCalls).toBe(1);
            expect(endCalls).toBe(1);
            expect(component.componentInstance.onTransitionEnd).toHaveBeenCalledTimes(1);
            expect(nextSpy1).toHaveBeenCalledWith(undefined);
            expect(errorSpy1).not.toHaveBeenCalled();
            expect(element.classList.contains('ngb-test-during')).toBe(false);
            expect(element.classList.contains('ngb-test-after')).toBe(true);
            expectOpacity(element, '0');
            done();
          });

      // first transition is on-going, start function was called
      expect(nextSpy1).not.toHaveBeenCalled();
      expect(element.classList.contains('ngb-test-during')).toBe(true);
      expect(element.classList.contains('ngb-test-after')).toBe(false);
      expect(window.getComputedStyle(element).opacity).toBe('1');

      // starting second
      const nextSpy2 = createSpy();
      const errorSpy2 = createSpy();
      const completeSpy2 = createSpy();

      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'continue'})
          .subscribe(nextSpy2, errorSpy2, completeSpy2);

      // first transition is still on-going
      expect(nextSpy1).not.toHaveBeenCalled();
      expect(element.classList.contains('ngb-test-during')).toBe(true);
      expect(element.classList.contains('ngb-test-after')).toBe(false);
      expect(window.getComputedStyle(element).opacity).toBe('1');

      // second transition was completed and no value was emitted
      expect(nextSpy2).not.toHaveBeenCalled();
      expect(errorSpy2).not.toHaveBeenCalled();
      expect(completeSpy2).toHaveBeenCalled();
    });

    it(`should run new transition and stop one already running with 'runningTransition: stop'`, (done) => {
      let startCalls = 0;
      let endCalls = 0;
      const startFn = ({classList}: HTMLElement) => {
        startCalls++;
        classList.add('ngb-test-during');
        return () => {
          endCalls++;
          classList.remove('ngb-test-during');
          classList.add('ngb-test-after');
        };
      };

      // starting first
      const nextSpy1 = createSpy();
      const errorSpy1 = createSpy();
      const completeSpy1 = createSpy();

      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'stop'})
          .subscribe(nextSpy1, errorSpy1, completeSpy1);

      // first transition is on-going, start function was called
      expect(nextSpy1).not.toHaveBeenCalled();
      expect(completeSpy1).not.toHaveBeenCalled();
      expect(element.classList.contains('ngb-test-during')).toBe(true);
      expect(element.classList.contains('ngb-test-after')).toBe(false);
      expect(window.getComputedStyle(element).opacity).toBe('1');

      // starting second
      const nextSpy2 = createSpy();
      const errorSpy2 = createSpy();

      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'stop'})
          .subscribe(nextSpy2, errorSpy2, () => {
            expect(startCalls).toBe(2);
            expect(endCalls).toBe(1);
            expect(component.componentInstance.onTransitionEnd).toHaveBeenCalledTimes(1);
            expect(nextSpy2).toHaveBeenCalledWith(undefined);
            expect(errorSpy2).not.toHaveBeenCalled();
            expect(element.classList.contains('ngb-test-during')).toBe(false);
            expect(element.classList.contains('ngb-test-after')).toBe(true);
            expectOpacity(element, '0');
            done();
          });

      // second transition should have started
      expect(nextSpy2).not.toHaveBeenCalled();
      expect(element.classList.contains('ngb-test-during')).toBe(true);
      expect(element.classList.contains('ngb-test-after')).toBe(false);
      expect(window.getComputedStyle(element).opacity).toBe('1');

      // first transition was completed and no value was emitted
      expect(nextSpy1).not.toHaveBeenCalled();
      expect(errorSpy1).not.toHaveBeenCalled();
      expect(completeSpy1).toHaveBeenCalled();
    });

    it(`should complete a transition with ngbCompleteTransition'`, () => {
      const startFn = ({classList}: HTMLElement) => {
        classList.add('ngb-test-during');
        return () => {
          classList.remove('ngb-test-during');
          classList.add('ngb-test-after');
        };
      };

      // starting first
      const nextSpy1 = createSpy();
      const errorSpy1 = createSpy();
      const completeSpy1 = createSpy();

      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'stop'})
          .subscribe(nextSpy1, errorSpy1, completeSpy1);

      // first transition is on-going, start function was called
      expect(nextSpy1).not.toHaveBeenCalled();
      expect(completeSpy1).not.toHaveBeenCalled();
      expect(element.classList.contains('ngb-test-during')).toBe(true);
      expect(element.classList.contains('ngb-test-after')).toBe(false);
      expect(window.getComputedStyle(element).opacity).toBe('1');

      ngbCompleteTransition(element);

      expect(nextSpy1).toHaveBeenCalled();
      expect(completeSpy1).toHaveBeenCalled();
      expect(element.classList.contains('ngb-test-during')).toBe(false);
      expect(element.classList.contains('ngb-test-after')).toBe(true);
      expectOpacity(element, '0');
    });

    it(`should create and allow modifying context when running a new transition`, (done) => {
      const startFn: NgbTransitionStartFn<{number}> =
          ({classList}: HTMLElement, animation: boolean, context: {number}) => {
            classList.remove('ngb-test-show');
            expect(context.number).toBe(123);
            context.number = 456;
          };

      element.classList.add('ngb-test-fade');

      const ctx = {number: 123};

      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'continue', context: ctx})
          .subscribe(() => {
            expectOpacity(element, '0');
            expect(ctx.number).toBe(456);
            done();
          });

      expect(window.getComputedStyle(element).opacity).toBe('1');
    });

    it(`should create and allow modifying context when running multiple transitions`, (done) => {
      const contextSpy = createSpy();
      const startFn: NgbTransitionStartFn<{counter?, text?}> =
          ({classList}: HTMLElement, animation: boolean, context: {counter?, text?}) => {
            classList.add('ngb-test-during');
            if (!context.counter) {
              context.counter = 0;
            }
            context.counter++;
            contextSpy({...context});

            return () => {
              classList.remove('ngb-test-during');
              classList.add('ngb-test-after');
              context.counter = 999;
              contextSpy({...context});
            };
          };

      element.classList.add('ngb-test-before');

      // first transition
      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'stop', context: {text: 'one'}})
          .subscribe(() => {}, () => {}, () => {});
      expect(contextSpy).toHaveBeenCalledWith({text: 'one', counter: 1});

      // second transiiton
      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'stop', context: {text: 'two'}})
          .subscribe(() => {
            expectOpacity(element, '0');
            expect(contextSpy).toHaveBeenCalledTimes(3);
            expect(contextSpy).toHaveBeenCalledWith({text: 'two', counter: 999});
            done();
          });
      expect(contextSpy).toHaveBeenCalledWith({text: 'two', counter: 2});

      expect(window.getComputedStyle(element).opacity).toBe('1');
    });

    it(`should pass context with 'animation: false'`, () => {
      const startFn: NgbTransitionStartFn<{flag: number}> = (_, __, context) => { expect(context.flag).toBe(42); };

      const nextSpy = createSpy();
      const errorSpy = createSpy();
      const completeSpy = createSpy();
      const startFnSpy = createSpy('startFn', startFn).and.callThrough();

      ngbRunTransition(
          zone, element, startFnSpy, {animation: false, runningTransition: 'continue', context: {flag: 42}})
          .subscribe(nextSpy, errorSpy, completeSpy);

      expect(nextSpy).toHaveBeenCalledWith(undefined);
      expect(errorSpy).not.toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
      expect(startFnSpy).toHaveBeenCalled();
    });

    it(`should complete and release the DOM element even if transition end is not fired`, (done) => {
      element.classList.add('ngb-test-fade');

      const nextSpy = createSpy();
      const errorSpy = createSpy();

      ngbRunTransition(zone, element, fadeFn, {animation: true, runningTransition: 'continue'})
          .subscribe(nextSpy, errorSpy, () => {
            expect(component.componentInstance.onTransitionEnd).not.toHaveBeenCalled();  // <-- finished with timer
            expect(nextSpy).toHaveBeenCalledWith(undefined);
            expect(errorSpy).not.toHaveBeenCalled();
            expect(element.classList.contains('ngb-test-show')).toBe(false);
            expectOpacity(element, '');  // <-- detached from DOM
            done();
          });

      // detaching transitioning element from DOM
      expect(window.getComputedStyle(element).opacity).toBe('1');
      element.parentElement !.removeChild(element);
    });

    it(`should read duration after the start function was executed`, (done) => {
      const startFn = ({classList}: HTMLElement) => classList.add('ngb-test-long-duration');

      const nextSpy = createSpy();
      const errorSpy = createSpy();

      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'continue'})
          .subscribe(nextSpy, errorSpy, () => {
            // if duration is read before the 'startFn' is executed, it will be read as 0
            expect(component.componentInstance.onTransitionEnd).toHaveBeenCalledTimes(1);
            expect(nextSpy).toHaveBeenCalledWith(undefined);
            expect(element.classList.contains('ngb-test-long-duration')).toBe(true);
            expect(errorSpy).not.toHaveBeenCalled();
            expectOpacity(element, '0');
            done();
          });

      expect(window.getComputedStyle(element).opacity).toBe('1');
      expect(element.classList.contains('ngb-test-long-duration')).toBe(true);
    });

    it(`should execute the end function if provided`, (done) => {
      const startFn = ({classList}: HTMLElement) => {
        classList.add('ngb-test-during');
        return () => {
          classList.remove('ngb-test-before');
          classList.remove('ngb-test-during');
          classList.add('ngb-test-after');
        };
      };

      element.classList.add('ngb-test-before');

      const nextSpy = createSpy();
      const errorSpy = createSpy();

      ngbRunTransition(zone, element, startFn, {animation: true, runningTransition: 'continue'})
          .subscribe(nextSpy, errorSpy, () => {
            expect(component.componentInstance.onTransitionEnd).toHaveBeenCalledTimes(1);
            expect(nextSpy).toHaveBeenCalledWith(undefined);
            expect(element.classList.contains('ngb-test-before')).toBe(false);
            expect(element.classList.contains('ngb-test-during')).toBe(false);
            expect(element.classList.contains('ngb-test-after')).toBe(true);
            expect(errorSpy).not.toHaveBeenCalled();
            expectOpacity(element, '0');
            done();
          });

      expect(window.getComputedStyle(element).opacity).toBe('1');
      expect(element.classList.contains('ngb-test-before')).toBe(true);
      expect(element.classList.contains('ngb-test-during')).toBe(true);
      expect(element.classList.contains('ngb-test-after')).toBe(false);
    });
  });

  describe('ngbRunTransition nesting', () => {

    @Component({
      template: `
      <div #outer class="ngb-test-outer" (transitionend)="onTransitionOuterEnd()">
        <div #inner class="ngb-test-inner" (transitionend)="onTransitionInnerEnd()"></div>
      </div>`,
      styles: [`
    .ngb-test-outer {
      width: 100px;
      height: 100px;
      padding: 10px;
      background-color: red;
      opacity: 1;
    }
    .ngb-test-inner {
      width: 100%;
      height: 100%;
      background-color: blue;
      opacity: 1;
    }
  `]
    })
    class TestComponentNested {
      @ViewChild('outer') outer: ElementRef<HTMLDivElement>;
      @ViewChild('inner') inner: ElementRef<HTMLDivElement>;

      onTransitionOuterEnd = () => {};
      onTransitionInnerEnd = () => {};
    }

    beforeEach(() => TestBed.configureTestingModule({declarations: [TestComponentNested]}));

    it(`should ignore all inner element transitions`, (done) => {
      const zone = TestBed.inject(NgZone);

      const fixture = TestBed.createComponent(TestComponentNested);
      fixture.detectChanges();

      reflow(fixture.nativeElement);

      const outerEl = fixture.componentInstance.outer.nativeElement;
      const innerEl = fixture.componentInstance.inner.nativeElement;

      const nextSpy = createSpy();
      const errorSpy = createSpy();

      spyOn(fixture.componentInstance, 'onTransitionInnerEnd');
      spyOn(fixture.componentInstance, 'onTransitionOuterEnd');

      ngbRunTransition(zone, outerEl, () => {
        outerEl.classList.add('ngb-test-hide-outer');
        innerEl.classList.add('ngb-test-hide-inner');
      }, {animation: true, runningTransition: 'continue'}).subscribe(nextSpy, errorSpy, () => {
        expect(fixture.componentInstance.onTransitionOuterEnd).toHaveBeenCalledTimes(2);
        expect(fixture.componentInstance.onTransitionInnerEnd).toHaveBeenCalledTimes(1);
        expectOpacity(outerEl, '0');
        expectOpacity(innerEl, '0');
        expect(nextSpy).toHaveBeenCalledWith(undefined);
        expect(errorSpy).not.toHaveBeenCalled();
        done();
      });
    });
  });
}

@Component({
  template: `
      <div #element class="ngb-test-transition ngb-test-show" (transitionend)="onTransitionEnd()"></div>`
})
class TestComponent {
  @ViewChild('element') element: ElementRef<HTMLDivElement>;

  onTransitionEnd = () => {};
}
