import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {createGenericTestComponent, isBrowser, isBrowserVisible, triggerEvent} from '../test/common';

import {By} from '@angular/platform-browser';
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  Injectable,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  AfterViewInit,
  NgZone
} from '@angular/core';

import {NgbPopoverModule} from './popover.module';
import {NgbPopoverWindow, NgbPopover} from './popover';
import {NgbPopoverConfig} from './popover-config';
import {NgbTooltip, NgbTooltipModule} from '..';
import {NgbConfig} from '../ngb-config';
import {NgbConfigAnimation} from '../test/ngb-config-animation';

@Injectable()
class SpyService {
  called = false;
}

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const createOnPushTestComponent =
    (html: string) => <ComponentFixture<TestOnPushComponent>>createGenericTestComponent(html, TestOnPushComponent);

function getWindow(element) {
  return element.querySelector('ngb-popover-window');
}

describe('ngb-popover-window', () => {
  beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbPopoverModule]}); });

  afterEach(() => {
    // Cleaning elements, because of a TestBed issue with the id attribute
    Array.from(document.body.children).map((element: HTMLElement) => {
      if (element.tagName.toLocaleLowerCase() === 'div') {
        element.parentNode !.removeChild(element);
      }
    });
  });

  it('should render popover on top by default', () => {
    const fixture = TestBed.createComponent(NgbPopoverWindow);
    fixture.componentInstance.title = 'Test title';
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveCssClass('popover');
    expect(fixture.nativeElement).not.toHaveCssClass('show');
    expect(fixture.nativeElement).not.toHaveCssClass('fade');
    expect(fixture.nativeElement).not.toHaveCssClass('bs-popover-top');
    expect(fixture.nativeElement.getAttribute('role')).toBe('tooltip');
    expect(fixture.nativeElement.querySelector('.popover-header').textContent).toBe('Test title');
  });

  it('should optionally have a custom class', () => {
    const fixture = TestBed.createComponent(NgbPopoverWindow);
    fixture.detectChanges();

    expect(fixture.nativeElement).not.toHaveCssClass('my-custom-class');

    fixture.componentInstance.popoverClass = 'my-custom-class';
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveCssClass('my-custom-class');
  });
});

describe('ngb-popover', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TestOnPushComponent, DestroyableCmpt, TestHooksComponent],
      imports: [NgbPopoverModule],
      providers: [SpyService]
    });
  });

  describe('basic functionality', () => {

    it('should open and close a popover - default settings and content as string', () => {
      const fixture =
          createTestComponent(`<div ngbPopover="Great tip!" popoverTitle="Title" style="margin-top: 100px;"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      const id = windowEl.getAttribute('id');

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('bs-popover-top');
      expect(windowEl).toHaveCssClass('show');
      expect(windowEl).not.toHaveCssClass('fade');
      expect(windowEl.textContent.trim()).toBe('TitleGreat tip!');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.parentNode).toBe(fixture.nativeElement);
      expect(directive.nativeElement.getAttribute('aria-describedby')).toBe(id);

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(directive.nativeElement.getAttribute('aria-describedby')).toBeNull();
    });

    it('should open and close a popover - default settings and content from a template', () => {
      const fixture = createTestComponent(`
          <ng-template #t>Hello, {{name}}!</ng-template>
          <div [ngbPopover]="t" popoverTitle="Title" style="margin-top: 100px;"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      const id = windowEl.getAttribute('id');

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('bs-popover-top');
      expect(windowEl.textContent.trim()).toBe('TitleHello, World!');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.parentNode).toBe(fixture.nativeElement);
      expect(directive.nativeElement.getAttribute('aria-describedby')).toBe(id);

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(directive.nativeElement.getAttribute('aria-describedby')).toBeNull();
    });

    it('should open and close a popover - default settings, content from a template and context supplied', () => {
      const fixture = createTestComponent(`
          <ng-template #t let-name="name">Hello, {{name}}!</ng-template>
          <div [ngbPopover]="t" popoverTitle="Title" style="margin-top: 100px;"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      directive.context.popover.open({name: 'John'});
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      const id = windowEl.getAttribute('id');

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('bs-popover-top');
      expect(windowEl.textContent.trim()).toBe('TitleHello, John!');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.parentNode).toBe(fixture.nativeElement);
      expect(directive.nativeElement.getAttribute('aria-describedby')).toBe(id);

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(directive.nativeElement.getAttribute('aria-describedby')).toBeNull();
    });

    it('should open and close a popover - default settings and custom class', () => {
      const fixture = createTestComponent(`
        <div ngbPopover="Great tip!" popoverTitle="Title" popoverClass="my-custom-class" style="margin-top: 100px;"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      const id = windowEl.getAttribute('id');

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('bs-popover-top');
      expect(windowEl).toHaveCssClass('my-custom-class');
      expect(windowEl.textContent.trim()).toBe('TitleGreat tip!');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.parentNode).toBe(fixture.nativeElement);
      expect(directive.nativeElement.getAttribute('aria-describedby')).toBe(id);

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(directive.nativeElement.getAttribute('aria-describedby')).toBeNull();
    });

    it('should propagate popoverClass changes to the window', () => {
      const fixture =
          createTestComponent(`<div ngbPopover="Great tip!" popoverTitle="Title" [popoverClass]="popoverClass"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      expect(windowEl).not.toHaveCssClass('my-popover-class');

      fixture.componentInstance.popoverClass = 'my-popover-class';
      fixture.detectChanges();
      expect(windowEl).toHaveCssClass('my-popover-class');
    });

    it('should accept a template for the title and properly destroy it when closing', () => {
      const fixture = createTestComponent(`
          <ng-template #t>Hello, {{name}}! <destroyable-cmpt></destroyable-cmpt></ng-template>
          <div ngbPopover="Body" [popoverTitle]="t"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));
      const spyService = fixture.debugElement.injector.get(SpyService);

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      expect(windowEl.textContent.trim()).toBe('Hello, World! Some contentBody');
      expect(spyService.called).toBeFalsy();

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(spyService.called).toBeTruthy();
    });

    it('should pass the context to the template for the title', () => {
      const fixture = createTestComponent(`
          <ng-template #t let-greeting="greeting">{{greeting}}, {{name}}!</ng-template>
          <div ngbPopover="!!" [popoverTitle]="t"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      fixture.componentInstance.name = 'tout le monde';
      fixture.componentInstance.popover.open({greeting: 'Bonjour'});
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      expect(windowEl.textContent.trim()).toBe('Bonjour, tout le monde!!!');

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should properly destroy TemplateRef content', () => {
      const fixture = createTestComponent(`
          <ng-template #t><destroyable-cmpt></destroyable-cmpt></ng-template>
          <div [ngbPopover]="t" popoverTitle="Title"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));
      const spyService = fixture.debugElement.injector.get(SpyService);

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
      expect(spyService.called).toBeFalsy();

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(spyService.called).toBeTruthy();
    });

    it('should not show a header if title is empty', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" popoverTitle=""></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      expect(windowEl.querySelector('.popover-header')).toBeNull();
    });

    it('should not show a header if title is falsy', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      expect(windowEl.querySelector('.popover-header')).toBeNull();
    });

    it('should not open a popover if content and title are empty', () => {
      const fixture = createTestComponent(`<div [ngbPopover]="" [popoverTitle]=""></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toBeNull();
    });

    it('should not open a popover if [disablePopover] flag', () => {
      const fixture = createTestComponent(`<div [ngbPopover]="Disabled!" [disablePopover]="true"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toBeNull();
    });

    it('should close the popover if content and title become empty', () => {
      const fixture = createTestComponent(`<div [ngbPopover]="name" [popoverTitle]="title"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      fixture.componentInstance.name = '';
      fixture.componentInstance.title = '';
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should open the popover if content is empty but title has value', () => {
      const fixture = createTestComponent(`<div [ngbPopover]="" popoverTitle="title"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).not.toBeNull();
    });

    it('should not close the popover if content becomes empty but title has value', () => {
      const fixture = createTestComponent(`<div [ngbPopover]="name" popoverTitle="title"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      fixture.componentInstance.name = '';
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
    });

    it('should allow re-opening previously closed popovers', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" popoverTitle="Title"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
    });

    it('should not leave dangling popovers in the DOM', () => {
      const fixture = createTestComponent(
          `<ng-template [ngIf]="show"><div ngbPopover="Great tip!" popoverTitle="Title"></div></ng-template>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      fixture.componentInstance.show = false;
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should properly cleanup popovers with manual triggers', () => {
      const fixture = createTestComponent(`<ng-template [ngIf]="show">
                                            <div ngbPopover="Great tip!" triggers="manual" #p="ngbPopover" (mouseenter)="p.open()"></div>
                                        </ng-template>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'mouseenter');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      fixture.componentInstance.show = false;
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should open popover from hooks', () => {
      const fixture = TestBed.createComponent(TestHooksComponent);
      fixture.detectChanges();

      const popoverWindow = fixture.debugElement.query(By.directive(NgbPopoverWindow));
      expect(popoverWindow.nativeElement).toHaveCssClass('popover');
    });
  });


  describe('positioning', () => {

    it('should use requested position', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" placement="left"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('bs-popover-left');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should properly position popovers when a component is using the OnPush strategy', () => {
      const fixture = createOnPushTestComponent(`<div ngbPopover="Great tip!" placement="left"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('bs-popover-left');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should have proper arrow placement', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" placement="right-top"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('bs-popover-right');
      expect(windowEl).toHaveCssClass('bs-popover-right-top');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should accept placement in array (second value of the array should be applied)', () => {
      const fixture = createTestComponent(
          `<div ngbPopover="Great tip!" [placement]="['left-top','top-left']" style="margin-top: 100px;"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('bs-popover-top');
      expect(windowEl).toHaveCssClass('bs-popover-top-left');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should accept placement with space separated values (second value should be applied)', () => {
      const fixture = createTestComponent(
          `<div ngbPopover="Great tip!" placement="left-top top-left" style="margin-top: 100px;"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('bs-popover-top');
      expect(windowEl).toHaveCssClass('bs-popover-top-left');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should apply auto placement', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" placement="auto"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      // actual placement with auto is not known in advance, so use regex to check it
      expect(windowEl.getAttribute('class')).toMatch('bs-popover-\.');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

  });

  describe('container', () => {

    it('should be appended to the element matching the selector passed to "container"', () => {
      const selector = 'body';
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" container="` + selector + `"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(getWindow(window.document.querySelector(selector))).not.toBeNull();
    });

    it('should properly destroy popovers when the "container" option is used', () => {
      const selector = 'body';
      const fixture =
          createTestComponent(`<div *ngIf="show" ngbPopover="Great tip!" container="` + selector + `"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();

      expect(getWindow(document.querySelector(selector))).not.toBeNull();
      fixture.componentRef.instance.show = false;
      fixture.detectChanges();
      expect(getWindow(document.querySelector(selector))).toBeNull();
    });

  });

  describe('visibility', () => {
    it('should emit events when showing and hiding popover', () => {
      const fixture = createTestComponent(
          `<div ngbPopover="Great tip!" triggers="click" (shown)="shown()" (hidden)="hidden()"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      let shownSpy = spyOn(fixture.componentInstance, 'shown').and.callThrough();
      let hiddenSpy = spyOn(fixture.componentInstance, 'hidden').and.callThrough();

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
      expect(shownSpy).toHaveBeenCalled();

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(hiddenSpy).toHaveBeenCalled();
    });

    it('should not emit close event when already closed', () => {
      const fixture = createTestComponent(
          `<div ngbPopover="Great tip!" triggers="manual" (shown)="shown()" (hidden)="hidden()"></div>`);

      let shownSpy = spyOn(fixture.componentInstance, 'shown');
      let hiddenSpy = spyOn(fixture.componentInstance, 'hidden');

      fixture.componentInstance.popover.open();
      fixture.detectChanges();

      fixture.componentInstance.popover.open();
      fixture.detectChanges();

      expect(getWindow(fixture.nativeElement)).not.toBeNull();
      expect(shownSpy).toHaveBeenCalled();
      expect(shownSpy.calls.count()).toEqual(1);
      expect(hiddenSpy).not.toHaveBeenCalled();
    });

    it('should not emit open event when already opened', () => {
      const fixture = createTestComponent(
          `<div ngbPopover="Great tip!" triggers="manual" (shown)="shown()" (hidden)="hidden()"></div>`);

      let shownSpy = spyOn(fixture.componentInstance, 'shown');
      let hiddenSpy = spyOn(fixture.componentInstance, 'hidden');

      fixture.componentInstance.popover.close();
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(shownSpy).not.toHaveBeenCalled();
      expect(hiddenSpy).not.toHaveBeenCalled();
    });

    it('should report correct visibility', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" triggers="manual"></div>`);
      fixture.detectChanges();

      expect(fixture.componentInstance.popover.isOpen()).toBeFalsy();

      fixture.componentInstance.popover.open();
      fixture.detectChanges();
      expect(fixture.componentInstance.popover.isOpen()).toBeTruthy();

      fixture.componentInstance.popover.close();
      fixture.detectChanges();
      expect(fixture.componentInstance.popover.isOpen()).toBeFalsy();
    });
  });

  describe('triggers', () => {
    beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbPopoverModule]}); });

    it('should support toggle triggers', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" triggers="click"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should non-default toggle triggers', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" triggers="mouseenter:click"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'mouseenter');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should support multiple triggers', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" triggers="mouseenter:mouseleave click"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'mouseenter');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      triggerEvent(directive, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should not use default for manual triggers', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" triggers="manual"></div>`);
      const directive = fixture.debugElement.query(By.directive(NgbPopover));

      triggerEvent(directive, 'mouseenter');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should allow toggling for manual triggers', () => {
      const fixture = createTestComponent(`
                <div ngbPopover="Great tip!" triggers="manual" #t="ngbPopover"></div>
                <button (click)="t.toggle()">T</button>`);
      const button = fixture.nativeElement.querySelector('button');

      triggerEvent(button, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      triggerEvent(button, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should allow open / close for manual triggers', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!" triggers="manual" #t="ngbPopover"></div>
                <button (click)="t.open()">O</button>
                <button (click)="t.close()">C</button>`);
      const buttons = fixture.nativeElement.querySelectorAll('button');

      triggerEvent(buttons[0], 'click');  // open
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      triggerEvent(buttons[1], 'click');  // close
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should not throw when open called for manual triggers and open popover', () => {
      const fixture = createTestComponent(`
                <div ngbPopover="Great tip!" triggers="manual" #t="ngbPopover"></div>
                <button (click)="t.open()">O</button>`);
      const button = fixture.nativeElement.querySelector('button');

      triggerEvent(button, 'click');  // open
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      triggerEvent(button, 'click');  // open
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
    });

    it('should not throw when closed called for manual triggers and closed popover', () => {
      const fixture = createTestComponent(`
                <div ngbPopover="Great tip!" triggers="manual" #t="ngbPopover"></div>
                <button (click)="t.close()">C</button>`);
      const button = fixture.nativeElement.querySelector('button');

      triggerEvent(button, 'click');  // close
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });
  });

  describe('Custom config', () => {
    let config: NgbPopoverConfig;

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [NgbPopoverModule]});
      TestBed.overrideComponent(TestComponent, {set: {template: `<div ngbPopover="Great tip!"></div>`}});
    });

    beforeEach(inject([NgbPopoverConfig], (c: NgbPopoverConfig) => {
      config = c;
      config.placement = 'bottom';
      config.triggers = 'hover';
      config.container = 'body';
      config.popoverClass = 'my-custom-class';
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const popover = fixture.componentInstance.popover;

      expect(popover.placement).toBe(config.placement);
      expect(popover.triggers).toBe(config.triggers);
      expect(popover.container).toBe(config.container);
      expect(popover.popoverClass).toBe(config.popoverClass);
    });
  });

  describe('Custom config as provider', () => {
    let config = new NgbPopoverConfig(new NgbConfig());
    config.placement = 'bottom';
    config.triggers = 'hover';
    config.popoverClass = 'my-custom-class';

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbPopoverModule], providers: [{provide: NgbPopoverConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = createTestComponent(`<div ngbPopover="Great tip!"></div>`);
      const popover = fixture.componentInstance.popover;

      expect(popover.placement).toBe(config.placement);
      expect(popover.triggers).toBe(config.triggers);
      expect(popover.popoverClass).toBe(config.popoverClass);
    });
  });

  describe('non-regression', () => {

    /**
     * Under very specific conditions ngOnDestroy can be invoked without calling ngOnInit first.
     * See discussion in https://github.com/ng-bootstrap/ng-bootstrap/issues/2199 for more details.
     */
    it('should not try to call listener cleanup function when no listeners registered', () => {
      const fixture = createTestComponent(`
         <ng-template #tpl><div ngbPopover="Great tip!"></div></ng-template>
         <button (click)="createAndDestroyTplWithAPopover(tpl)"></button>
       `);
      const buttonEl = fixture.debugElement.query(By.css('button'));
      triggerEvent(buttonEl, 'click');
    });
  });
});

describe('popover-tooltip', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbPopoverModule, NgbTooltipModule]});
  });

  it(`should work when attached on the same element and container='body'`, () => {
    const fixture = createTestComponent(`<button ngbPopover="Popover" ngbTooltip="Tooltip" container="body"></button>`);
    const button = fixture.nativeElement.querySelector('button');
    const tooltip = fixture.debugElement.query(By.directive(NgbTooltip)).injector.get(NgbTooltip);
    const popover = fixture.debugElement.query(By.directive(NgbPopover)).injector.get(NgbPopover);

    tooltip.open();
    expect(tooltip.isOpen()).toBe(true);
    expect(popover.isOpen()).toBe(false);

    // this should open the popover and have produced the "Error: Failed to execute 'insertBefore' on 'Node':
    // The node before which the new node is to be inserted is not a child of this node." exception with ivy
    button.click();
  });
});

if (isBrowserVisible('ngb-popover animations')) {
  describe('ngb-popover animations', () => {

    @Component({
      template: `<button ngbPopover="Great tip!" triggers="click" (shown)="shown()" (hidden)="hidden()"></button>`,
      host: {'[class.ngb-reduce-motion]': 'reduceMotion'}
    })
    class TestAnimationComponent {
      reduceMotion = true;
      shown = () => {};
      hidden = () => {};
    }

    function expectPopover(el: HTMLElement, classes: string[], noClasses: string[], opacity: string) {
      classes.forEach(c => expect(el).toHaveCssClass(c));
      noClasses.forEach(c => expect(el).not.toHaveCssClass(c));
      if (!isBrowser('ie')) {
        expect(window.getComputedStyle(el).opacity).toBe(opacity);
      }
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestAnimationComponent],
        imports: [NgbPopoverModule],
        providers: [{provide: NgbConfig, useClass: NgbConfigAnimation}]
      });
    });

    it(`should run transition when toggling popover (force-reduced-motion = true)`, () => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = true;
      fixture.detectChanges();

      const buttonEl = fixture.nativeElement.querySelector('button');
      expect(getWindow(fixture.nativeElement)).toBeNull();

      const shownSpy = spyOn(fixture.componentInstance, 'shown');
      const hiddenSpy = spyOn(fixture.componentInstance, 'hidden');

      // 1. Opening popover
      buttonEl.click();
      fixture.detectChanges();

      expect(shownSpy).toHaveBeenCalledTimes(1);
      expect(hiddenSpy).not.toHaveBeenCalled();
      expectPopover(getWindow(fixture.nativeElement), ['show', 'fade'], [], '1');

      // 2. Closing popover
      buttonEl.click();
      fixture.detectChanges();

      expect(shownSpy).toHaveBeenCalledTimes(1);
      expect(hiddenSpy).toHaveBeenCalledTimes(1);
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it(`should run transition when toggling popover (force-reduced-motion = false)`, (done) => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = false;
      fixture.detectChanges();

      const buttonEl = fixture.nativeElement.querySelector('button');
      expect(getWindow(fixture.nativeElement)).toBeNull();

      spyOn(fixture.componentInstance, 'shown').and.callFake(() => {
        expectPopover(getWindow(fixture.nativeElement), ['show', 'fade'], [], '1');

        // 2. Closing popover
        buttonEl.click();
        fixture.detectChanges();

        expectPopover(getWindow(fixture.nativeElement), ['fade'], ['show'], '1');
      });

      spyOn(fixture.componentInstance, 'hidden').and.callFake(() => {
        expect(getWindow(fixture.nativeElement)).toBeNull();
        done();
      });

      // 1. Opening popover
      buttonEl.click();
      fixture.detectChanges();

      expectPopover(getWindow(fixture.nativeElement), ['show', 'fade'], [], '0');
    });

    it(`should revert popover opening`, (done) => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = false;
      fixture.detectChanges();

      const buttonEl = fixture.nativeElement.querySelector('button');
      expect(getWindow(fixture.nativeElement)).toBeNull();

      const shownSpy = spyOn(fixture.componentInstance, 'shown');

      // 3. Popover is closed
      spyOn(fixture.componentInstance, 'hidden').and.callFake(() => {
        expect(getWindow(fixture.nativeElement)).toBeNull();
        expect(shownSpy).not.toHaveBeenCalled();
        done();
      });

      // 1. Opening popover
      buttonEl.click();
      fixture.detectChanges();

      expectPopover(getWindow(fixture.nativeElement), ['show', 'fade'], [], '0');

      // 2. Reverting popover opening
      buttonEl.click();
      fixture.detectChanges();

      expectPopover(getWindow(fixture.nativeElement), ['fade'], ['show'], '0');
    });
  });
}

@Component({selector: 'test-cmpt', template: ``})
export class TestComponent {
  name = 'World';
  show = true;
  title: string;
  placement: string;
  popoverClass: string;

  @ViewChild(NgbPopover, {static: true}) popover: NgbPopover;

  constructor(private _vcRef: ViewContainerRef) {}

  createAndDestroyTplWithAPopover(tpl: TemplateRef<any>) {
    this._vcRef.createEmbeddedView(tpl, {}, 0);
    this._vcRef.remove(0);
  }

  shown() { expect(NgZone.isInAngularZone()).toBe(true, `'shown' should run inside the Angular zone`); }
  hidden() { expect(NgZone.isInAngularZone()).toBe(true, `'hidden' should run inside the Angular zone`); }
}

@Component({selector: 'test-onpush-cmpt', changeDetection: ChangeDetectionStrategy.OnPush, template: ``})
export class TestOnPushComponent {
}

@Component({selector: 'destroyable-cmpt', template: 'Some content'})
export class DestroyableCmpt implements OnDestroy {
  constructor(private _spyService: SpyService) {}

  ngOnDestroy(): void { this._spyService.called = true; }
}

@Component({selector: 'test-hooks', template: `<div ngbPopover="popover"></div>`})
export class TestHooksComponent implements AfterViewInit {
  @ViewChild(NgbPopover, {static: true}) popover;

  ngAfterViewInit() { this.popover.open(); }
}
