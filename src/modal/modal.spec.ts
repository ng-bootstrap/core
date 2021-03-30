import {CommonModule} from '@angular/common';
import {Component, Injectable, Injector, NgModule, OnDestroy, ViewChild} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NgbModalConfig} from './modal-config';
import {NgbActiveModal, NgbModal, NgbModalModule, NgbModalRef} from './modal.module';
import {createKeyEvent, isBrowser, isBrowserVisible} from '../test/common';
import {NgbConfig} from '..';
import {NgbConfigAnimation} from '../test/ngb-config-animation';
import createSpy = jasmine.createSpy;
import {Key} from 'src/util/key';

const NOOP = () => {};

@Injectable()
class SpyService {
  called = false;
}

@Injectable()
class CustomSpyService {
  called = false;
}

describe('ngb-modal', () => {

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    jasmine.addMatchers({
      toHaveModal: function(util, customEqualityTests) {
        return {
          compare: function(actual, content?, selector?) {
            const allModalsContent = document.querySelector(selector || 'body').querySelectorAll('.modal-content');
            let pass = true;
            let errMsg;

            if (!content) {
              pass = allModalsContent.length > 0;
              errMsg = 'at least one modal open but found none';
            } else if (Array.isArray(content)) {
              pass = allModalsContent.length === content.length;
              errMsg = `${content.length} modals open but found ${allModalsContent.length}`;
            } else {
              pass = allModalsContent.length === 1 && allModalsContent[0].textContent.trim() === content;
              errMsg = `exactly one modal open but found ${allModalsContent.length}`;
            }

            return {pass: pass, message: `Expected ${actual.outerHTML} to have ${errMsg}`};
          },
          negativeCompare: function(actual) {
            const allOpenModals = actual.querySelectorAll('ngb-modal-window');

            return {
              pass: allOpenModals.length === 0,
              message: `Expected ${actual.outerHTML} not to have any modals open but found ${allOpenModals.length}`
            };
          }
        };
      }
    });

    jasmine.addMatchers({
      toHaveBackdrop: function(util, customEqualityTests) {
        return {
          compare: function(actual) {
            return {
              pass: document.querySelectorAll('ngb-modal-backdrop').length === 1,
              message: `Expected ${actual.outerHTML} to have exactly one backdrop element`
            };
          },
          negativeCompare: function(actual) {
            const allOpenModals = document.querySelectorAll('ngb-modal-backdrop');

            return {
              pass: allOpenModals.length === 0,
              message: `Expected ${actual.outerHTML} not to have any backdrop elements`
            };
          }
        };
      }
    });
  });

  afterEach(() => {
    // detect left-over modals and report errors when found

    const remainingModalWindows = document.querySelectorAll('ngb-modal-window');
    if (remainingModalWindows.length) {
      fail(`${remainingModalWindows.length} modal windows were left in the DOM.`);
    }

    const remainingModalBackdrops = document.querySelectorAll('ngb-modal-backdrop');
    if (remainingModalBackdrops.length) {
      fail(`${remainingModalBackdrops.length} modal backdrops were left in the DOM.`);
    }
  });

  describe('default configuration', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [NgbModalTestModule]});
      fixture = TestBed.createComponent(TestComponent);
    });

    describe('basic functionality', () => {

      it('should open and close modal with default options', () => {
        const modalInstance = fixture.componentInstance.open('foo');
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');

        const modalEl = document.querySelector('ngb-modal-window') as HTMLElement;
        expect(modalEl).not.toHaveClass('fade');
        expect(modalEl).toHaveClass('show');

        modalInstance.close('some result');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should open and close modal from a TemplateRef content', () => {
        const modalInstance = fixture.componentInstance.openTpl();
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('Hello, World!');

        modalInstance.close('some result');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should properly destroy TemplateRef content', () => {
        const spyService = fixture.debugElement.injector.get(SpyService);
        const modalInstance = fixture.componentInstance.openDestroyableTpl();
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('Some content');
        expect(spyService.called).toBeFalsy();

        modalInstance.close('some result');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
        expect(spyService.called).toBeTruthy();
      });

      it('should open and close modal from a component type', () => {
        const spyService = fixture.debugElement.injector.get(SpyService);
        const modalInstance = fixture.componentInstance.openCmpt(DestroyableCmpt);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('Some content');
        expect(spyService.called).toBeFalsy();

        modalInstance.close('some result');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
        expect(spyService.called).toBeTruthy();
      });

      it('should inject active modal ref when component is used as content', () => {
        fixture.componentInstance.openCmpt(WithActiveModalCmpt);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('Close');

        (<HTMLElement>document.querySelector('button.closeFromInside')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should expose component used as modal content', () => {
        const modalInstance = fixture.componentInstance.openCmpt(WithActiveModalCmpt);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('Close');
        expect(modalInstance.componentInstance instanceof WithActiveModalCmpt).toBeTruthy();

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
        expect(modalInstance.componentInstance).toBe(undefined);
      });

      it('should open and close modal from inside', () => {
        fixture.componentInstance.openTplClose();
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#close')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should open and dismiss modal from inside', () => {
        fixture.componentInstance.openTplDismiss().result.catch(NOOP);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#dismiss')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should open and close modal from template implicit context', () => {
        fixture.componentInstance.openTplImplicitContext();
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#close')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should open and dismiss modal from template implicit context', () => {
        fixture.componentInstance.openTplImplicitContext().result.catch(NOOP);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#dismiss')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it(`should emit 'closed' on close`, () => {
        const closedSpy = createSpy();
        fixture.componentInstance.openTplClose().closed.subscribe(closedSpy);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#close')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();

        expect(closedSpy).toHaveBeenCalledWith('myResult');
      });

      it(`should emit 'dismissed' on dismissal`, () => {
        const dismissSpy = createSpy();
        fixture.componentInstance.openTplDismiss().dismissed.subscribe(dismissSpy);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#dismiss')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();

        expect(dismissSpy).toHaveBeenCalledWith('myReason');
      });

      it('should resolve result promise on close', () => {
        let resolvedResult;
        fixture.componentInstance.openTplClose().result.then((result) => resolvedResult = result);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#close')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();

        fixture.whenStable().then(() => { expect(resolvedResult).toBe('myResult'); });
      });

      it('should reject result promise on dismiss', () => {
        let rejectReason;
        fixture.componentInstance.openTplDismiss().result.catch((reason) => rejectReason = reason);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#dismiss')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();

        fixture.whenStable().then(() => { expect(rejectReason).toBe('myReason'); });
      });

      it(`should emit 'shown' and 'hidden' events`, () => {
        const shownSpy = createSpy();
        const hiddenSpy = createSpy();
        const modalRef = fixture.componentInstance.openTplClose();
        modalRef.shown.subscribe(shownSpy);
        modalRef.hidden.subscribe(hiddenSpy);
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();
        expect(shownSpy).toHaveBeenCalledWith(undefined);

        (<HTMLElement>document.querySelector('button#close')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
        expect(hiddenSpy).toHaveBeenCalledWith(undefined);
      });

      it('should add / remove "modal-open" class to body when modal is open', fakeAsync(() => {
           const modalRef = fixture.componentInstance.open('bar');
           fixture.detectChanges();
           expect(fixture.nativeElement).toHaveModal();
           expect(document.body).toHaveCssClass('modal-open');

           modalRef.close('bar result');
           fixture.detectChanges();
           tick();
           expect(fixture.nativeElement).not.toHaveModal();
           expect(document.body).not.toHaveCssClass('modal-open');
         }));

      it('should not throw when close called multiple times', () => {
        const modalInstance = fixture.componentInstance.open('foo');
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');

        modalInstance.close('some result');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();

        modalInstance.close('some result');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should dismiss with dismissAll', () => {
        fixture.componentInstance.open('foo');
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');

        fixture.componentInstance.dismissAll('dismissAllArg');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should not throw when dismissAll called with no active modal', () => {
        expect(fixture.nativeElement).not.toHaveModal();

        fixture.componentInstance.dismissAll();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should not throw when dismiss called multiple times', () => {
        const modalRef = fixture.componentInstance.open('foo');
        modalRef.result.catch(NOOP);

        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');

        modalRef.dismiss('some reason');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();

        modalRef.dismiss('some reason');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should indicate if there are open modal windows', fakeAsync(() => {
           fixture.componentInstance.open('foo');
           fixture.detectChanges();
           expect(fixture.nativeElement).toHaveModal('foo');
           expect(fixture.componentInstance.modalService.hasOpenModals()).toBeTruthy();

           fixture.componentInstance.dismissAll();
           fixture.detectChanges();
           tick();
           expect(fixture.nativeElement).not.toHaveModal();
           expect(fixture.componentInstance.modalService.hasOpenModals()).toBeFalsy();
         }));
    });

    describe('backdrop options', () => {

      it('should have backdrop by default', () => {
        const modalInstance = fixture.componentInstance.open('foo');
        fixture.detectChanges();

        expect(fixture.nativeElement).toHaveModal('foo');
        expect(fixture.nativeElement).toHaveBackdrop();

        modalInstance.close('some reason');
        fixture.detectChanges();

        expect(fixture.nativeElement).not.toHaveModal();
        expect(fixture.nativeElement).not.toHaveBackdrop();
      });

      it('should open and close modal without backdrop', () => {
        const modalInstance = fixture.componentInstance.open('foo', {backdrop: false});
        fixture.detectChanges();

        expect(fixture.nativeElement).toHaveModal('foo');
        expect(fixture.nativeElement).not.toHaveBackdrop();

        modalInstance.close('some reason');
        fixture.detectChanges();

        expect(fixture.nativeElement).not.toHaveModal();
        expect(fixture.nativeElement).not.toHaveBackdrop();
      });

      it('should open and close modal without backdrop from template content', () => {
        const modalInstance = fixture.componentInstance.openTpl({backdrop: false});
        fixture.detectChanges();

        expect(fixture.nativeElement).toHaveModal('Hello, World!');
        expect(fixture.nativeElement).not.toHaveBackdrop();

        modalInstance.close('some reason');
        fixture.detectChanges();

        expect(fixture.nativeElement).not.toHaveModal();
        expect(fixture.nativeElement).not.toHaveBackdrop();
      });

      it('should not dismiss on clicks that result in detached elements', () => {
        const modalInstance = fixture.componentInstance.openTplIf({});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#if')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });
    });

    describe('beforeDismiss options', () => {

      it('should not dismiss when the callback returns false', () => {
        const modalInstance = fixture.componentInstance.openTplDismiss({beforeDismiss: () => { return false; }});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#dismiss')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should dismiss when the callback does not return false', () => {
        fixture.componentInstance.openTplDismiss({beforeDismiss: () => {}});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#dismiss')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should not dismiss when the returned promise is resolved with false', fakeAsync(() => {
           const modalInstance =
               fixture.componentInstance.openTplDismiss({beforeDismiss: () => Promise.resolve(false)});
           fixture.detectChanges();
           expect(fixture.nativeElement).toHaveModal();

           (<HTMLElement>document.querySelector('button#dismiss')).click();
           fixture.detectChanges();
           tick();
           expect(fixture.nativeElement).toHaveModal();

           modalInstance.close();
           fixture.detectChanges();
           tick();
           expect(fixture.nativeElement).not.toHaveModal();
         }));

      it('should not dismiss when the returned promise is rejected', fakeAsync(() => {
           const modalInstance =
               fixture.componentInstance.openTplDismiss({beforeDismiss: () => Promise.reject('error')});
           fixture.detectChanges();
           expect(fixture.nativeElement).toHaveModal();

           (<HTMLElement>document.querySelector('button#dismiss')).click();
           fixture.detectChanges();
           tick();
           expect(fixture.nativeElement).toHaveModal();

           modalInstance.close();
           fixture.detectChanges();
           tick();
           expect(fixture.nativeElement).not.toHaveModal();
         }));

      it('should dismiss when the returned promise is not resolved with false', fakeAsync(() => {
           fixture.componentInstance.openTplDismiss({beforeDismiss: () => Promise.resolve()});
           fixture.detectChanges();
           expect(fixture.nativeElement).toHaveModal();

           (<HTMLElement>document.querySelector('button#dismiss')).click();
           fixture.detectChanges();
           tick();
           expect(fixture.nativeElement).not.toHaveModal();
         }));

      it('should dismiss when the callback is not defined', () => {
        fixture.componentInstance.openTplDismiss({});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal();

        (<HTMLElement>document.querySelector('button#dismiss')).click();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });
    });

    describe('container options', () => {

      it('should attach window and backdrop elements to the specified container', () => {
        const modalInstance = fixture.componentInstance.open('foo', {container: '#testContainer'});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo', '#testContainer');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should attach window and backdrop elements to the specified container DOM element', () => {
        const containerDomEl = document.querySelector('div#testContainer');
        const modalInstance = fixture.componentInstance.open('foo', {container: containerDomEl});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo', '#testContainer');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should throw when the specified container element doesn\'t exist', () => {
        const brokenSelector = '#notInTheDOM';
        expect(() => {
          fixture.componentInstance.open('foo', {container: brokenSelector});
        }).toThrowError(`The specified modal container "${brokenSelector}" was not found in the DOM.`);
      });
    });

    describe('size options', () => {

      it('should render modals with specified size', () => {
        const modalInstance = fixture.componentInstance.open('foo', {size: 'sm'});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');
        expect(document.querySelector('.modal-dialog')).toHaveCssClass('modal-sm');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should accept any strings as modal size', () => {
        const modalInstance = fixture.componentInstance.open('foo', {size: 'ginormous'});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');
        expect(document.querySelector('.modal-dialog')).toHaveCssClass('modal-ginormous');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

    });

    describe('window custom class options', () => {

      it('should render modals with the correct window custom classes', () => {
        const modalInstance = fixture.componentInstance.open('foo', {windowClass: 'bar'});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');
        expect(document.querySelector('ngb-modal-window')).toHaveCssClass('bar');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

    });

    describe('backdrop custom class options', () => {

      it('should render modals with the correct backdrop custom classes', () => {
        const modalInstance = fixture.componentInstance.open('foo', {backdropClass: 'my-fancy-backdrop'});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');
        expect(document.querySelector('ngb-modal-backdrop')).toHaveCssClass('my-fancy-backdrop');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

    });

    describe('custom injector option', () => {

      it('should render modal with a custom injector', () => {
        const customInjector =
            Injector.create({providers: [{provide: CustomSpyService, useClass: CustomSpyService, deps: []}]});
        const modalInstance = fixture.componentInstance.openCmpt(CustomInjectorCmpt, {injector: customInjector});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('Some content');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

    });

    describe('focus management', () => {

      describe('initial focus', () => {
        it('should focus the proper specified element when [ngbAutofocus] is used', () => {
          fixture.detectChanges();
          const modal = fixture.componentInstance.openCmpt(WithAutofocusModalCmpt);
          fixture.detectChanges();

          expect(document.activeElement).toBe(document.querySelector('button.withNgbAutofocus'));
          modal.close();
        });

        it('should focus the first focusable element when [ngbAutofocus] is not used', () => {
          fixture.detectChanges();
          const modal = fixture.componentInstance.openCmpt(WithFirstFocusableModalCmpt);
          fixture.detectChanges();

          expect(document.activeElement).toBe(document.querySelector('button.firstFocusable'));
          modal.close();
          fixture.detectChanges();
        });

        it('should skip element with tabindex=-1 when finding the first focusable element', () => {
          fixture.detectChanges();
          const modal = fixture.componentInstance.openCmpt(WithSkipTabindexFirstFocusableModalCmpt);
          fixture.detectChanges();

          expect(document.activeElement).toBe(document.querySelector('button.other'));
          modal.close();
          fixture.detectChanges();
        });

        it('should focus modal window as a default fallback option', () => {
          fixture.detectChanges();
          const modal = fixture.componentInstance.open('content');
          fixture.detectChanges();

          expect(document.activeElement).toBe(document.querySelector('ngb-modal-window'));
          modal.close();
          fixture.detectChanges();
        });
      });
    });

    describe('window element ordering', () => {
      it('should place newer windows on top of older ones', () => {
        const modalInstance1 = fixture.componentInstance.open('foo', {windowClass: 'window-1'});
        fixture.detectChanges();

        const modalInstance2 = fixture.componentInstance.open('bar', {windowClass: 'window-2'});
        fixture.detectChanges();

        let windows = document.querySelectorAll('ngb-modal-window');
        expect(windows.length).toBe(2);
        expect(windows[0]).toHaveCssClass('window-1');
        expect(windows[1]).toHaveCssClass('window-2');

        modalInstance2.close();
        modalInstance1.close();
        fixture.detectChanges();
      });

      it('should iterate over multiple modal instances', fakeAsync(() => {
           let n;
           const observable = fixture.componentInstance.activeInstances;
           observable.subscribe(list => { n = list.length; });
           expect(n).toBeUndefined();
           fixture.componentInstance.open('foo', {windowClass: 'window-1'});
           fixture.detectChanges();
           expect(n).toBe(1);

           fixture.componentInstance.open('bar', {windowClass: 'window-2'});
           fixture.detectChanges();
           expect(n).toBe(2);

           let windows = document.querySelectorAll('ngb-modal-window');
           expect(windows.length).toBe(2);
           expect(windows[0]).toHaveCssClass('window-1');
           expect(windows[1]).toHaveCssClass('window-2');

           fixture.componentInstance.dismissAll();
           fixture.detectChanges();
           tick();

           expect(fixture.nativeElement).not.toHaveModal();
           expect(n).toBe(0);
         }));
    });

    describe('vertically centered', () => {

      it('should render modals vertically centered', () => {
        const modalInstance = fixture.componentInstance.open('foo', {centered: true});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');
        expect(document.querySelector('.modal-dialog')).toHaveCssClass('modal-dialog-centered');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });
    });

    describe('scrollable content', () => {

      it('should render scrollable content modals', () => {
        const modalInstance = fixture.componentInstance.open('foo', {scrollable: true});
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveModal('foo');
        expect(document.querySelector('.modal-dialog')).toHaveCssClass('modal-dialog-scrollable');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should add specific styling to content component host', () => {
        const modalInstance = fixture.componentInstance.openCmpt(DestroyableCmpt, {scrollable: true});
        fixture.detectChanges();
        expect(document.querySelector('destroyable-cmpt')).toHaveCssClass('component-host-scrollable');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });
    });

    describe('accessibility', () => {

      it('should support aria-labelledby', () => {
        const id = 'aria-labelledby-id';

        const modalInstance = fixture.componentInstance.open('foo', {ariaLabelledBy: id});
        fixture.detectChanges();

        const modalElement = <HTMLElement>document.querySelector('ngb-modal-window');
        expect(modalElement.getAttribute('aria-labelledby')).toBe(id);

        modalInstance.close('some result');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should support aria-describedby', () => {
        const id = 'aria-describedby-id';

        const modalInstance = fixture.componentInstance.open('foo', {ariaDescribedBy: id});
        fixture.detectChanges();

        const modalElement = <HTMLElement>document.querySelector('ngb-modal-window');
        expect(modalElement.getAttribute('aria-describedby')).toBe(id);

        modalInstance.close('some result');
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should have aria-modal attribute', () => {
        const a11yFixture = TestBed.createComponent(TestA11yComponent);
        const modalInstance = a11yFixture.componentInstance.open();
        a11yFixture.detectChanges();

        const modalElement = <HTMLElement>document.querySelector('ngb-modal-window');
        expect(modalElement.getAttribute('aria-modal')).toBe('true');

        modalInstance.close();
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveModal();
      });

      it('should add aria-hidden attributes to siblings when attached to body', fakeAsync(() => {
           const a11yFixture = TestBed.createComponent(TestA11yComponent);
           const modalInstance = a11yFixture.componentInstance.open();
           a11yFixture.detectChanges();

           const modal = document.querySelector('ngb-modal-window') !;
           const backdrop = document.querySelector('ngb-modal-backdrop') !;
           const application = document.querySelector('div[ng-version]') !;
           let ariaHidden = document.querySelectorAll('[aria-hidden]');

           expect(ariaHidden.length).toBeGreaterThan(2);  // 2 exist in the DOM initially
           expect(document.body.hasAttribute('aria-hidden')).toBe(false);
           expect(application.getAttribute('aria-hidden')).toBe('true');
           expect(backdrop.getAttribute('aria-hidden')).toBe('true');
           expect(modal.hasAttribute('aria-hidden')).toBe(false);

           modalInstance.close();
           fixture.detectChanges();
           tick();

           ariaHidden = document.querySelectorAll('[aria-hidden]');

           expect(ariaHidden.length).toBe(2);  // 2 exist in the DOM initially
           expect(a11yFixture.nativeElement).not.toHaveModal();
         }));

      it('should add aria-hidden attributes to siblings when attached to a container', fakeAsync(() => {
           const a11yFixture = TestBed.createComponent(TestA11yComponent);
           const modalInstance = a11yFixture.componentInstance.open({container: '#container'});
           a11yFixture.detectChanges();

           const modal = document.querySelector('ngb-modal-window') !;
           const backdrop = document.querySelector('ngb-modal-backdrop') !;
           const application = document.querySelector('div[ng-version]') !;
           const ariaRestoreTrue = document.querySelector('.to-restore-true') !;
           const ariaRestoreFalse = document.querySelector('.to-restore-false') !;

           expect(document.body.hasAttribute('aria-hidden')).toBe(false);
           expect(application.hasAttribute('aria-hidden')).toBe(false);
           expect(modal.hasAttribute('aria-hidden')).toBe(false);
           expect(backdrop.getAttribute('aria-hidden')).toBe('true');
           expect(ariaRestoreTrue.getAttribute('aria-hidden')).toBe('true');
           expect(ariaRestoreFalse.getAttribute('aria-hidden')).toBe('true');

           Array.from(document.querySelectorAll('.to-hide')).forEach(element => {
             expect(element.getAttribute('aria-hidden')).toBe('true');
           });

           Array.from(document.querySelectorAll('.not-to-hide')).forEach(element => {
             expect(element.hasAttribute('aria-hidden')).toBe(false);
           });

           modalInstance.close();
           fixture.detectChanges();
           tick();

           const ariaHidden = document.querySelectorAll('[aria-hidden]');

           expect(ariaHidden.length).toBe(2);  // 2 exist in the DOM initially
           expect(ariaRestoreTrue.getAttribute('aria-hidden')).toBe('true');
           expect(ariaRestoreFalse.getAttribute('aria-hidden')).toBe('false');
           expect(a11yFixture.nativeElement).not.toHaveModal();
         }));

      it('should add aria-hidden attributes with modal stacks', fakeAsync(() => {
           const a11yFixture = TestBed.createComponent(TestA11yComponent);
           const firstModalInstance = a11yFixture.componentInstance.open();
           const secondModalInstance = a11yFixture.componentInstance.open();
           a11yFixture.detectChanges();

           let modals = document.querySelectorAll('ngb-modal-window');
           let backdrops = document.querySelectorAll('ngb-modal-backdrop');
           let ariaHidden = document.querySelectorAll('[aria-hidden]');

           const hiddenElements = ariaHidden.length;
           expect(hiddenElements).toBeGreaterThan(2);  // 2 exist in the DOM initially

           expect(modals.length).toBe(2);
           expect(backdrops.length).toBe(2);

           expect(modals[0].hasAttribute('aria-hidden')).toBe(true);
           expect(backdrops[0].hasAttribute('aria-hidden')).toBe(true);

           expect(modals[1].hasAttribute('aria-hidden')).toBe(false);
           expect(backdrops[1].hasAttribute('aria-hidden')).toBe(true);

           secondModalInstance.close();
           fixture.detectChanges();
           tick();

           ariaHidden = document.querySelectorAll('[aria-hidden]');
           expect(document.querySelectorAll('ngb-modal-window').length).toBe(1);
           expect(document.querySelectorAll('ngb-modal-backdrop').length).toBe(1);

           expect(ariaHidden.length).toBe(hiddenElements - 2);

           expect(modals[0].hasAttribute('aria-hidden')).toBe(false);
           expect(backdrops[0].hasAttribute('aria-hidden')).toBe(true);

           firstModalInstance.close();
           fixture.detectChanges();
           tick();

           ariaHidden = document.querySelectorAll('[aria-hidden]');

           expect(ariaHidden.length).toBe(2);  // 2 exist in the DOM initially
           expect(a11yFixture.nativeElement).not.toHaveModal();
         }));
    });

  });

  describe('custom global configuration', () => {

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbModalTestModule], providers: [{provide: NgbModalConfig, useValue: {size: 'sm'}}]});
      fixture = TestBed.createComponent(TestComponent);
    });

    it('should accept global configuration under the NgbModalConfig token', () => {
      const modalInstance = fixture.componentInstance.open('foo');
      fixture.detectChanges();

      expect(fixture.nativeElement).toHaveModal('foo');
      expect(document.querySelector('.modal-dialog')).toHaveCssClass('modal-sm');

      modalInstance.close('some reason');
      fixture.detectChanges();
    });

    it('should override global configuration with local options', () => {
      const modalInstance = fixture.componentInstance.open('foo', {size: 'lg'});
      fixture.detectChanges();

      expect(fixture.nativeElement).toHaveModal('foo');
      expect(document.querySelector('.modal-dialog')).toHaveCssClass('modal-lg');
      expect(document.querySelector('.modal-dialog')).not.toHaveCssClass('modal-sm');

      modalInstance.close('some reason');
      fixture.detectChanges();
    });
  });

  if (isBrowserVisible('ngb-modal animations')) {
    describe('ngb-modal animations', () => {

      @Component({
        template: `
          <ng-template #content let-close="close" let-dismiss="dismiss">
            <div id="inside-div">Bla bla</div>
            <button class="btn btn-primary" id="close" (click)="close('myResult')">Close me</button>
          </ng-template>
        `
      })
      class TestAnimationComponent {
        @ViewChild('content', {static: true}) content;

        constructor(private modalService: NgbModal) {}

        open(backdrop: boolean | 'static' = true, keyboard = true) {
          return this.modalService.open(this.content, {backdrop, keyboard});
        }
      }

      beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [TestAnimationComponent],
          imports: [NgbModalModule],
          providers: [{provide: NgbConfig, useClass: NgbConfigAnimation}]
        });
      });

      afterEach(() => document.body.classList.remove('ngb-reduce-motion'));

      [true, false].forEach(reduceMotion => {

        // this test is flaky in IE in CI
        if (!isBrowser('ie')) {
          it(`should run fade transition when opening/closing modal (force-reduced-motion = ${reduceMotion})`,
             (done) => {
               if (reduceMotion) {
                 document.body.classList.add('ngb-reduce-motion');
               }
               const component = TestBed.createComponent(TestAnimationComponent);
               component.detectChanges();

               const modalRef = component.componentInstance.open();
               let modalEl: HTMLElement | null = null;

               modalRef.shown.subscribe(() => {
                 modalEl = document.querySelector('ngb-modal-window') as HTMLElement;
                 const closeButton = document.querySelector('button#close') as HTMLButtonElement;

                 expect(window.getComputedStyle(modalEl).opacity).toBe('1');
                 expect(modalEl).toHaveClass('fade');
                 expect(modalEl).toHaveClass('show');
                 closeButton.click();
               });

               modalRef.hidden.subscribe(() => {
                 modalEl = document.querySelector('ngb-modal-window');
                 expect(modalEl).toBeNull();
                 done();
               });

               component.detectChanges();
               modalEl = document.querySelector('ngb-modal-window');
               // if reducedMotion is true, modal would be opened and closed already at this point
               if (modalEl) {
                 expect(window.getComputedStyle(modalEl).opacity).toBe('0');
               }
             });
        }

        it(`should bump modal window if backdrop is static (force-reduced-motion = ${reduceMotion})`, (done) => {
          if (reduceMotion) {
            document.body.classList.add('ngb-reduce-motion');
          }
          const component = TestBed.createComponent(TestAnimationComponent);
          component.detectChanges();

          const modalRef = component.componentInstance.open('static');
          let modalEl: HTMLElement | null = null;

          modalRef.shown.subscribe(() => {
            modalEl = document.querySelector('ngb-modal-window') as HTMLElement;

            modalEl.click();
            component.detectChanges();
            if (reduceMotion) {
              expect(modalEl).not.toHaveClass('modal-static');
            } else {
              expect(modalEl).toHaveClass('modal-static');
            }

            const closeButton = document.querySelector('button#close') as HTMLButtonElement;
            closeButton.click();
          });

          modalRef.hidden.subscribe(() => { done(); });
          component.detectChanges();
        });
      });

      it(`should not bump modal window on click if backdrop is not static`, (done) => {
        const component = TestBed.createComponent(TestAnimationComponent);
        component.detectChanges();

        const modalRef = component.componentInstance.open();
        let modalEl: HTMLElement | null = null;

        modalRef.shown.subscribe(() => {
          modalEl = document.querySelector('ngb-modal-window') as HTMLElement;

          modalEl.click();
          component.detectChanges();
          expect(modalEl).not.toHaveClass('modal-static');

          const closeButton = document.querySelector('button#close') as HTMLButtonElement;
          closeButton.click();
        });

        modalRef.hidden.subscribe(() => { done(); });
        component.detectChanges();
      });

      it(`should not bump modal window if backdrop is static and modal itself is clicked)`, (done) => {
        const component = TestBed.createComponent(TestAnimationComponent);
        component.detectChanges();

        const modalRef = component.componentInstance.open('static');
        let modalEl: HTMLElement | null = null;

        modalRef.shown.subscribe(() => {
          modalEl = document.querySelector('ngb-modal-window') as HTMLElement;
          const insideDiv = document.querySelector('#inside-div') as HTMLElement;

          insideDiv.click();
          component.detectChanges();
          expect(modalEl).not.toHaveClass('modal-static');

          const closeButton = document.querySelector('button#close') as HTMLButtonElement;
          closeButton.click();
        });

        modalRef.hidden.subscribe(() => { done(); });
        component.detectChanges();
      });

      it(`should bump modal window on Escape if backdrop is static`, (done) => {
        const component = TestBed.createComponent(TestAnimationComponent);
        component.detectChanges();

        // currently, to keep backward compatibility, the modal is closed on escape if keyboard is true,
        // even if backdrop is static. This will be fixed in the future.
        const modalRef = component.componentInstance.open('static', false);
        let modalEl: HTMLElement | null = null;

        modalRef.shown.subscribe(() => {
          modalEl = document.querySelector('ngb-modal-window') as HTMLElement;

          const event = createKeyEvent(Key.Escape, {type: 'keydown'});
          modalEl.dispatchEvent(event);

          component.detectChanges();
          expect(modalEl).toHaveClass('modal-static');

          const closeButton = document.querySelector('button#close') as HTMLButtonElement;
          closeButton.click();
        });

        modalRef.hidden.subscribe(() => { done(); });
        component.detectChanges();
      });

      it(`should not bump modal window on Escape if backdrop is not static`, (done) => {
        const component = TestBed.createComponent(TestAnimationComponent);
        component.detectChanges();

        const modalRef = component.componentInstance.open();
        let modalEl: HTMLElement | null = null;

        modalRef.shown.subscribe(() => {
          modalEl = document.querySelector('ngb-modal-window') as HTMLElement;

          const event = createKeyEvent(Key.Escape, {type: 'keydown'});
          modalEl.dispatchEvent(event);

          component.detectChanges();
          expect(modalEl).not.toHaveClass('modal-static');

          const closeButton = document.querySelector('button#close') as HTMLButtonElement;
          closeButton.click();
        });

        modalRef.hidden.subscribe(() => { done(); });
        component.detectChanges();
      });
    });
  }
});



@Component({selector: 'custom-injector-cmpt', template: 'Some content'})
export class CustomInjectorCmpt implements OnDestroy {
  constructor(private _spyService: CustomSpyService) {}

  ngOnDestroy(): void { this._spyService.called = true; }
}

@Component({selector: 'destroyable-cmpt', template: 'Some content'})
export class DestroyableCmpt implements OnDestroy {
  constructor(private _spyService: SpyService) {}

  ngOnDestroy(): void { this._spyService.called = true; }
}

@Component(
    {selector: 'modal-content-cmpt', template: '<button class="closeFromInside" (click)="close()">Close</button>'})
export class WithActiveModalCmpt {
  constructor(public activeModal: NgbActiveModal) {}

  close() { this.activeModal.close('from inside'); }
}

@Component(
    {selector: 'modal-autofocus-cmpt', template: `<button class="withNgbAutofocus" ngbAutofocus>Click Me</button>`})
export class WithAutofocusModalCmpt {
}

@Component({
  selector: 'modal-firstfocusable-cmpt',
  template: `
  <button class="firstFocusable close">Close</button>
  <button class="other">Other button</button>
`
})
export class WithFirstFocusableModalCmpt {
}

@Component({
  selector: 'modal-skip-tabindex-firstfocusable-cmpt',
  template: `
  <button tabindex="-1" class="firstFocusable close">Close</button>
  <button class="other">Other button</button>
`
})
export class WithSkipTabindexFirstFocusableModalCmpt {
}

@Component({
  selector: 'test-cmpt',
  template: `
    <div id="testContainer"></div>
    <ng-template #content>Hello, {{name}}!</ng-template>
    <ng-template #destroyableContent><destroyable-cmpt></destroyable-cmpt></ng-template>
    <ng-template #contentWithClose let-close="close">
      <button id="close" (click)="close('myResult')">Close me</button>
    </ng-template>
    <ng-template #contentWithDismiss let-dismiss="dismiss">
      <button id="dismiss" (click)="dismiss('myReason')">Dismiss me</button>
    </ng-template>
    <ng-template #contentWithImplicitContext let-modal>
      <button id="close" (click)="modal.close('myResult')">Close me</button>
      <button id="dismiss" (click)="modal.dismiss('myReason')">Dismiss me</button>
    </ng-template>
    <ng-template #contentWithIf>
      <ng-template [ngIf]="show">
        <button id="if" (click)="show = false">Click me</button>
      </ng-template>
    </ng-template>
    <button id="open" (click)="open('from button')">Open</button>
    <div id="open-no-focus" (click)="open('from non focusable element')">Open</div>
    <div
      id="open-no-focus-ie"
      (click)="open('from non focusable element but stored as activeElement on IE')"
      style="display: inline-block;"
    >Open</div>
  `
})
class TestComponent {
  name = 'World';
  openedModal: NgbModalRef;
  show = true;
  @ViewChild('content', {static: true}) tplContent;
  @ViewChild('destroyableContent', {static: true}) tplDestroyableContent;
  @ViewChild('contentWithClose', {static: true}) tplContentWithClose;
  @ViewChild('contentWithDismiss', {static: true}) tplContentWithDismiss;
  @ViewChild('contentWithImplicitContext', {static: true}) tplContentWithImplicitContext;
  @ViewChild('contentWithIf', {static: true}) tplContentWithIf;

  constructor(public modalService: NgbModal) {}

  open(content: string, options?: Object) {
    this.openedModal = this.modalService.open(content, options);
    return this.openedModal;
  }
  close() {
    if (this.openedModal) {
      this.openedModal.close('ok');
    }
  }
  dismissAll(reason?: any) { this.modalService.dismissAll(reason); }
  openTpl(options?: Object) { return this.modalService.open(this.tplContent, options); }
  openCmpt(cmptType: any, options?: Object) { return this.modalService.open(cmptType, options); }
  openDestroyableTpl(options?: Object) { return this.modalService.open(this.tplDestroyableContent, options); }
  openTplClose(options?: Object) { return this.modalService.open(this.tplContentWithClose, options); }
  openTplDismiss(options?: Object) { return this.modalService.open(this.tplContentWithDismiss, options); }
  openTplImplicitContext(options?: Object) {
    return this.modalService.open(this.tplContentWithImplicitContext, options);
  }
  openTplIf(options?: Object) { return this.modalService.open(this.tplContentWithIf, options); }
  get activeInstances() { return this.modalService.activeInstances; }
}

@Component({
  selector: 'test-a11y-cmpt',
  template: `
    <div class="to-hide to-restore-true" aria-hidden="true">
      <div class="not-to-hide"></div>
    </div>
    <div class="not-to-hide">
      <div class="to-hide">
        <div class="not-to-hide"></div>
      </div>

      <div class="not-to-hide" id="container"></div>

      <div class="to-hide">
        <div class="not-to-hide"></div>
      </div>
    </div>
    <div class="to-hide to-restore-false" aria-hidden="false">
      <div class="not-to-hide"></div>
    </div>
  `
})
class TestA11yComponent {
  constructor(private modalService: NgbModal) {}

  open(options?: any) { return this.modalService.open('foo', options); }
}

@NgModule({
  declarations: [
    TestComponent, CustomInjectorCmpt, DestroyableCmpt, WithActiveModalCmpt, WithAutofocusModalCmpt,
    WithFirstFocusableModalCmpt, WithSkipTabindexFirstFocusableModalCmpt, TestA11yComponent
  ],
  exports: [TestComponent, DestroyableCmpt],
  imports: [CommonModule, NgbModalModule],
  entryComponents: [
    CustomInjectorCmpt, DestroyableCmpt, WithActiveModalCmpt, WithAutofocusModalCmpt, WithFirstFocusableModalCmpt,
    WithSkipTabindexFirstFocusableModalCmpt
  ],
  providers: [SpyService]
})
class NgbModalTestModule {
}
