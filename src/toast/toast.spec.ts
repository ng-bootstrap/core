import {Component} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {createGenericTestComponent, isBrowserVisible} from '../test/common';
import {NgbToastModule} from './toast.module';

import {NgbConfig} from '../ngb-config';
import {NgbConfigAnimation} from '../test/ngb-config-animation';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const getElementWithSelector = (element: HTMLElement, className) => element.querySelector(className);

const getToastElement = (element: HTMLElement): Element => getElementWithSelector(element, 'ngb-toast');
const getToastHeaderElement = (element: HTMLElement): Element =>
    getElementWithSelector(element, 'ngb-toast .toast-header');
const getToastBodyElement = (element: HTMLElement): Element => getElementWithSelector(element, 'ngb-toast .toast-body');

describe('ngb-toast', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbToastModule]}); });

  describe('via declarative usage', () => {
    it('should be instantiable declaratively', () => {
      const fixture = createTestComponent(`<ngb-toast header="header">body</ngb-toast>`);
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should have default classnames', () => {
      const fixture = createTestComponent(`<ngb-toast header="header">body</ngb-toast>`);
      // Below getter are using Bootstrap classnames
      const toast = getToastElement(fixture.nativeElement);
      const header = getToastHeaderElement(fixture.nativeElement);
      const body = getToastBodyElement(fixture.nativeElement);

      expect(toast).toBeDefined();
      expect(toast).toHaveCssClass('toast');
      expect(toast).not.toHaveCssClass('fade');
      expect(toast).toHaveCssClass('show');
      expect(header).toBeDefined();
      expect(body).toBeDefined();
    });

    it('should not generate a header element when header input is not specified', () => {
      const fixture = createTestComponent(`<ngb-toast>body</ngb-toast>`);
      const toastHeader = getToastHeaderElement(fixture.nativeElement);
      expect(toastHeader).toBeNull();
    });

    it('should contain a close button when header is specified', () => {
      const fixture = createTestComponent(`<ngb-toast header="header">body</ngb-toast>`);
      const toastHeader = getToastHeaderElement(fixture.nativeElement);
      expect(toastHeader.querySelector('button.close')).toBeDefined();
    });

    it('should contain a close button when ngbToastHeader is used', () => {
      const fixture = createTestComponent(`<ngb-toast>
        <ng-template ngbToastHeader>{{header}}</ng-template>
        body
      </ngb-toast>`);
      const toastHeader = getToastHeaderElement(fixture.nativeElement);
      expect(toastHeader.querySelector('button.close')).toBeDefined();
    });

    it('should emit hide output when close is clicked', () => {
      const fixture =
          createTestComponent(`<ngb-toast header="header" [autohide]="false" (hidden)="hide()">body</ngb-toast>`);

      const toast = getToastElement(fixture.nativeElement);
      const closeButton = toast.querySelector('button.close') as HTMLElement;
      closeButton.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.hide).toHaveBeenCalled();
    });

    it('should emit hide output after default delay (500ms)', fakeAsync(() => {
         const fixture = createTestComponent(`<ngb-toast header="header" (hidden)="hide()">body</ngb-toast>`);
         tick(499);
         fixture.detectChanges();
         expect(fixture.componentInstance.hide).not.toHaveBeenCalled();
         tick(500);
         fixture.detectChanges();
         expect(fixture.componentInstance.hide).toHaveBeenCalledTimes(1);
       }));

    it('should emit hide output after a custom delay in ms', fakeAsync(() => {
         const fixture =
             createTestComponent(`<ngb-toast header="header" [delay]="10000" (hidden)="hide()">body</ngb-toast>`);
         tick(9999);
         fixture.detectChanges();
         expect(fixture.componentInstance.hide).not.toHaveBeenCalled();
         tick(10000);
         fixture.detectChanges();
         expect(fixture.componentInstance.hide).toHaveBeenCalledTimes(1);
       }));

    it('should emit hide only one time regardless of autohide toggling', fakeAsync(() => {
         const fixture =
             createTestComponent(`<ngb-toast header="header" [autohide]="autohide" (hidden)="hide()">body</ngb-toast>`);
         tick(250);
         fixture.componentInstance.autohide = false;
         fixture.detectChanges();
         tick(250);
         fixture.detectChanges();
         expect(fixture.componentInstance.hide).not.toHaveBeenCalled();
         fixture.componentInstance.autohide = true;
         fixture.detectChanges();
         tick(500);
         fixture.detectChanges();
         expect(fixture.componentInstance.hide).toHaveBeenCalledTimes(1);
       }));
  });
});

if (isBrowserVisible('ngb-toast animations')) {
  describe('ngb-toast animations', () => {

    @Component({
      template: `
        <ngb-toast header="Hello" [autohide]="false" (shown)="onShown()" (hidden)="onHidden()">Cool!</ngb-toast>`,
      host: {'[class.ngb-reduce-motion]': 'reduceMotion'}
    })
    class TestAnimationComponent {
      reduceMotion = true;
      onShown = () => {};
      onHidden = () => {};
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestAnimationComponent],
        imports: [NgbToastModule],
        providers: [{provide: NgbConfig, useClass: NgbConfigAnimation}]
      });
    });

    [true, false].forEach(reduceMotion => {

      it(`should run the transition when creating a toast (force-reduced-motion = ${reduceMotion})`, () => {
        const fixture = TestBed.createComponent(TestAnimationComponent);
        fixture.componentInstance.reduceMotion = reduceMotion;
        fixture.detectChanges();

        const toastEl = getToastElement(fixture.nativeElement);

        spyOn(fixture.componentInstance, 'onShown').and.callFake(() => {
          expect(window.getComputedStyle(toastEl).opacity).toBe('1');
          expect(toastEl).not.toHaveCssClass('showing');
          expect(toastEl).toHaveCssClass('show');
          expect(toastEl).toHaveCssClass('fade');
        });

        expect(toastEl).toHaveCssClass('fade');
        if (reduceMotion) {
          expect(window.getComputedStyle(toastEl).opacity).toBe('1');
          expect(toastEl).toHaveCssClass('show');
        } else {
          expect(window.getComputedStyle(toastEl).opacity).toBe('0');
          expect(toastEl).not.toHaveCssClass('show');
          expect(toastEl).toHaveCssClass('showing');
        }
      });

      it(`should run the transition when closing a toast (force-reduced-motion = ${reduceMotion})`, () => {
        const fixture = TestBed.createComponent(TestAnimationComponent);
        fixture.componentInstance.reduceMotion = reduceMotion;
        fixture.detectChanges();

        const toastEl = getToastElement(fixture.nativeElement);
        const buttonEl = fixture.nativeElement.querySelector('button');

        spyOn(fixture.componentInstance, 'onShown').and.callFake(() => {
          expect(window.getComputedStyle(toastEl).opacity).toBe('1');
          expect(toastEl).toHaveCssClass('show');
          expect(toastEl).toHaveCssClass('fade');

          buttonEl.click();
        });

        spyOn(fixture.componentInstance, 'onHidden').and.callFake(() => {
          expect(window.getComputedStyle(toastEl).opacity).toBe('0');
          expect(toastEl).not.toHaveCssClass('show');
          expect(toastEl).toHaveCssClass('fade');
          expect(toastEl).toHaveCssClass('hide');
        });
      });
    });
  });
}



@Component({selector: 'test-cmp', template: ''})
export class TestComponent {
  visible = true;
  autohide = true;
  hide = jasmine.createSpy('hideSpy');
}
