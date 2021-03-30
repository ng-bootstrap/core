import createSpy = jasmine.createSpy;
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {isBrowserVisible, createGenericTestComponent} from '../test/common';
import {By} from '@angular/platform-browser';

import {Component} from '@angular/core';

import {NgbAlertModule} from './alert.module';
import {NgbAlert} from './alert';
import {NgbAlertConfig} from './alert-config';

import {NgbConfig} from '../ngb-config';
import {NgbConfigAnimation} from '../test/ngb-config-animation';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getAlertElement(element: HTMLElement): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.alert');
}

function getCloseButton(element: HTMLElement): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

function getCloseButtonIcon(element: HTMLElement): HTMLSpanElement {
  return <HTMLSpanElement>element.querySelector('button > span');
}

describe('ngb-alert', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbAlertModule]}); });

  it('should initialize inputs with default values', () => {
    const defaultConfig = new NgbAlertConfig(new NgbConfig());
    const alertCmp = TestBed.createComponent(NgbAlert).componentInstance;
    expect(alertCmp.dismissible).toBe(defaultConfig.dismissible);
    expect(alertCmp.type).toBe(defaultConfig.type);
  });

  it('should apply those default values to the template', () => {
    const fixture = createTestComponent('<ngb-alert>Cool!</ngb-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl.getAttribute('role')).toEqual('alert');
    expect(alertEl).toHaveCssClass('alert-warning');
    expect(alertEl).toHaveCssClass('alert-dismissible');
    expect(alertEl).toHaveCssClass('show');
    expect(alertEl).not.toHaveCssClass('fade');
  });

  it('should allow specifying alert type', () => {
    const fixture = createTestComponent('<ngb-alert type="success">Cool!</ngb-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl.getAttribute('role')).toEqual('alert');
    expect(alertEl).toHaveCssClass('alert-success');
  });

  it('should allow changing alert type', () => {
    const fixture = createTestComponent('<ngb-alert [type]="type">Cool!</ngb-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl).toHaveCssClass('alert-success');
    expect(alertEl).not.toHaveCssClass('alert-warning');

    fixture.componentInstance.type = 'warning';
    fixture.detectChanges();
    expect(alertEl).not.toHaveCssClass('alert-success');
    expect(alertEl).toHaveCssClass('alert-warning');
  });

  it('should allow adding custom CSS classes', () => {
    const fixture = createTestComponent('<ngb-alert type="success" class="myClass">Cool!</ngb-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl).toHaveCssClass('alert');
    expect(alertEl).toHaveCssClass('alert-success');
    expect(alertEl).toHaveCssClass('myClass');
  });

  it('should render close button when dismissible', () => {
    const fixture = createTestComponent('<ngb-alert [dismissible]="true">Watch out!</ngb-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);
    const buttonEl = getCloseButton(alertEl);
    const buttonIconEl = getCloseButtonIcon(alertEl);

    expect(alertEl).toHaveCssClass('alert-dismissible');
    expect(buttonEl).toBeTruthy();
    expect(buttonEl.getAttribute('class')).toContain('close');
    expect(buttonEl.getAttribute('aria-label')).toBe('Close');
    expect(buttonIconEl.getAttribute('aria-hidden')).toBe('true');
    expect(buttonIconEl.textContent).toBe('×');
  });

  it('should not render the close button if it is not dismissible', () => {
    const fixture = createTestComponent(`<ngb-alert [dismissible]="false">Don't close!</ngb-alert>`);
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl).not.toHaveCssClass('alert-dismissible');
    expect(getCloseButton(alertEl)).toBeFalsy();
  });

  it('should fire an event after closing a dismissible alert', () => {
    const fixture =
        createTestComponent('<ngb-alert [dismissible]="true" (closed)="closed = true">Watch out!</ngb-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);
    const buttonEl = getCloseButton(alertEl);

    expect(fixture.componentInstance.closed).toBe(false);
    buttonEl.click();
    expect(alertEl).not.toHaveCssClass('show');
    expect(alertEl).not.toHaveCssClass('fade');
    expect(fixture.componentInstance.closed).toBe(true);
  });

  it('should fire an event after closing a dismissible alert imperatively', () => {
    const fixture =
        createTestComponent('<ngb-alert [dismissible]="true" (closed)="closed = true">Watch out!</ngb-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);
    const alert = fixture.debugElement.query(By.directive(NgbAlert)).injector.get(NgbAlert);

    const closedSpy = createSpy();
    expect(fixture.componentInstance.closed).toBe(false);
    alert.close().subscribe(closedSpy);
    fixture.detectChanges();

    expect(fixture.componentInstance.closed).toBe(true);
    expect(closedSpy).toHaveBeenCalledTimes(1);
    expect(alertEl).not.toHaveCssClass('show');
    expect(alertEl).not.toHaveCssClass('fade');
  });

  it('should project the content given into the component', () => {
    const fixture = createTestComponent('<ngb-alert>Cool!</ngb-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl.textContent).toContain('Cool!');
  });

  it('should project content before the closing button for a11y/screen readers', () => {
    const fixture = createTestComponent('<ngb-alert [dismissible]="true"><span>Cool!</span></ngb-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    const childElements = Array.from(alertEl.children).map(node => node.tagName.toLowerCase());
    expect(childElements).toEqual(['span', 'button']);
  });

  describe('Custom config', () => {
    let config: NgbAlertConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [NgbAlertModule]}); });

    beforeEach(inject([NgbAlertConfig], (c: NgbAlertConfig) => {
      config = c;
      config.dismissible = false;
      config.type = 'success';
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(NgbAlert);
      fixture.detectChanges();

      const alert = fixture.componentInstance;
      expect(alert.dismissible).toBe(config.dismissible);
      expect(alert.type).toBe(config.type);
    });
  });

  describe('Custom config as provider', () => {
    let config = new NgbAlertConfig(new NgbConfig());
    config.dismissible = false;
    config.type = 'success';

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbAlertModule], providers: [{provide: NgbAlertConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(NgbAlert);
      fixture.detectChanges();

      const alert = fixture.componentInstance;
      expect(alert.dismissible).toBe(config.dismissible);
      expect(alert.type).toBe(config.type);
    });
  });
});

if (isBrowserVisible('ngb-alert animations')) {
  describe('ngb-alert animations', () => {

    @Component({
      template: `
        <ngb-alert type="success" (close)="onClose()">Cool!</ngb-alert>`,
      host: {'[class.ngb-reduce-motion]': 'reduceMotion'}
    })
    class TestAnimationComponent {
      reduceMotion = true;
      onClose = () => {};
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestAnimationComponent],
        imports: [NgbAlertModule],
        providers: [{provide: NgbConfig, useClass: NgbConfigAnimation}]
      });
    });

    [true, false].forEach(reduceMotion => {

      it(`should run fade transition when closing alert (force-reduced-motion = ${reduceMotion})`, () => {
        const fixture = TestBed.createComponent(TestAnimationComponent);
        fixture.componentInstance.reduceMotion = reduceMotion;
        fixture.detectChanges();

        const alertEl = getAlertElement(fixture.nativeElement);
        const buttonEl = fixture.nativeElement.querySelector('button');

        spyOn(fixture.componentInstance, 'onClose').and.callFake(() => {
          expect(window.getComputedStyle(alertEl).opacity).toBe('0');
          expect(alertEl).not.toHaveCssClass('show');
          expect(alertEl).toHaveCssClass('fade');
        });

        expect(window.getComputedStyle(alertEl).opacity).toBe('1');
        expect(alertEl).toHaveCssClass('show');
        expect(alertEl).toHaveCssClass('fade');
        buttonEl.click();
      });
    });
  });
}

@Component({selector: 'test-cmp', template: '', entryComponents: [NgbAlert]})
class TestComponent {
  name = 'World';
  closed = false;
  type = 'success';
}
