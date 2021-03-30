import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {ChangeDetectionStrategy, Component, DebugElement, Injectable} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {NgbTimepickerModule} from './timepicker.module';
import {NgbTimepickerConfig} from './timepicker-config';
import {NgbTimepicker} from './timepicker';
import {NgbTimepickerI18n} from './timepicker-i18n';
import {NgbTimeAdapter, NgbTimeStructAdapter} from './ngb-time-adapter';
import {NgbTimeStruct} from './ngb-time-struct';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const createOnPushTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponentOnPush) as ComponentFixture<TestComponentOnPush>;

function getTimepicker(el: HTMLElement) {
  return el.querySelector('ngb-timepicker');
}

function getInputs(el: HTMLElement) {
  return el.querySelectorAll('input');
}

function getButtons(nativeEl: HTMLElement) {
  return nativeEl.querySelectorAll('button.btn-link');
}

function getFieldsetElement(element: HTMLElement): HTMLFieldSetElement {
  return <HTMLFieldSetElement>element.querySelector('fieldset');
}

function getMeridianButton(nativeEl: HTMLElement) {
  return nativeEl.querySelector('button.btn-outline-primary') !;
}

function createChangeEvent(value: string) {
  return {target: {value: value}};
}

function expectToDisplayTime(el: HTMLElement, time: string) {
  const inputs = getInputs(el);
  const timeParts = time.split(':');
  let timeInInputs: string[] = [];

  expect(inputs.length).toBe(timeParts.length);

  for (let i = 0; i < inputs.length; i++) {
    timeInInputs.push((<HTMLInputElement>inputs[i]).value);
  }

  expect(timeInInputs.join(':')).toBe(time);
}

function expectSameValues(timepicker: NgbTimepicker, config: NgbTimepickerConfig) {
  expect(timepicker.meridian).toBe(config.meridian);
  expect(timepicker.spinners).toBe(config.spinners);
  expect(timepicker.seconds).toBe(config.seconds);
  expect(timepicker.hourStep).toBe(config.hourStep);
  expect(timepicker.minuteStep).toBe(config.minuteStep);
  expect(timepicker.secondStep).toBe(config.secondStep);
  expect(timepicker.disabled).toBe(config.disabled);
  expect(timepicker.readonlyInputs).toBe(config.readonlyInputs);
  expect(timepicker.size).toBe(config.size);
}

function customizeConfig(config: NgbTimepickerConfig) {
  config.meridian = true;
  config.spinners = false;
  config.seconds = true;
  config.hourStep = 2;
  config.minuteStep = 3;
  config.secondStep = 4;
  config.disabled = true;
  config.readonlyInputs = true;
}

describe('ngb-timepicker', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TestComponentOnPush],
      imports: [NgbTimepickerModule, FormsModule, ReactiveFormsModule]
    });
  });

  describe('initialization', () => {
    it('should initialize inputs with provided config', () => {
      const defaultConfig = new NgbTimepickerConfig();
      const timepicker =
          new NgbTimepicker(new NgbTimepickerConfig(), new NgbTimeStructAdapter(), <any>null, new TestI18n());
      expectSameValues(timepicker, defaultConfig);
    });
  });

  describe('rendering based on model', () => {

    it('should render hour and minute inputs', fakeAsync(() => {
         const html = `<ngb-timepicker [ngModel]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 30};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30');
       }));

    it('should update inputs value on model change', fakeAsync(() => {
         const html = `<ngb-timepicker [ngModel]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 30};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30');

         fixture.componentInstance.model = {hour: 14, minute: 40};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '14:40');
       }));

    it('should render hour and minute inputs with padding', fakeAsync(() => {
         const html = `<ngb-timepicker [ngModel]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 1, minute: 3};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '01:03');
       }));

    it('should render hour, minute and seconds inputs with padding', fakeAsync(() => {
         const html = `<ngb-timepicker [ngModel]="model" [seconds]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 3, second: 4};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:03:04');
       }));

    it('should render invalid or empty hour and minute as blank string', fakeAsync(() => {
         const html = `<ngb-timepicker [ngModel]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: undefined, minute: 'aaa'};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, ':');
       }));

    it('should render invalid or empty second as blank string', fakeAsync(() => {
         const html = `<ngb-timepicker [ngModel]="model" [seconds]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 20, second: false};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:20:');
       }));

    it('should render empty fields on null model', fakeAsync(() => {
         const html = `<ngb-timepicker [ngModel]="model" [seconds]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = null;
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '::');
       }));
  });


  describe('model updates in response to increment / decrement button clicks', () => {

    it('should increment / decrement hours', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[0]).click();  // H+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '11:30');
         expect(fixture.componentInstance.model).toEqual({hour: 11, minute: 30, second: 0});


         (<HTMLButtonElement>buttons[1]).click();  // H-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should wrap hours', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 23, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '23:30');
         expect(fixture.componentInstance.model).toEqual({hour: 23, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[0]).click();  // H+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '00:30');
         expect(fixture.componentInstance.model).toEqual({hour: 0, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[1]).click();  // H-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '23:30');
         expect(fixture.componentInstance.model).toEqual({hour: 23, minute: 30, second: 0});
       }));

    it('should increment / decrement minutes', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[2]).click();  // M+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:31');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 31, second: 0});

         (<HTMLButtonElement>buttons[3]).click();  // M-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should wrap minutes', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 22, minute: 59, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '22:59');
         expect(fixture.componentInstance.model).toEqual({hour: 22, minute: 59, second: 0});

         (<HTMLButtonElement>buttons[2]).click();  // M+
         fixture.detectChanges();
         expect(fixture.componentInstance.model).toEqual({hour: 23, minute: 0, second: 0});

         (<HTMLButtonElement>buttons[3]).click();  // M-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '22:59');
         expect(fixture.componentInstance.model).toEqual({hour: 22, minute: 59, second: 0});
       }));

    it('should increment / decrement seconds', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[4]).click();  // S+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:01');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 1});

         (<HTMLButtonElement>buttons[5]).click();  // S-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should wrap seconds', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 59};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30:59');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 59});

         (<HTMLButtonElement>buttons[4]).click();  // S+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:31:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 31, second: 0});

         (<HTMLButtonElement>buttons[5]).click();  // S-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:59');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 59});
       }));
  });

  describe('increment/decrement keyboard bindings', () => {

    function getDebugInputs(fixture: ComponentFixture<TestComponent>): Array<DebugElement> {
      return fixture.debugElement.queryAll(By.css('input'));
    }

    it('should increment / decrement hours', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         const hourInput = getDebugInputs(fixture)[0];

         hourInput.triggerEventHandler('keydown.ArrowUp', {preventDefault: () => {}});  // H+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '11:30');
         expect(fixture.componentInstance.model).toEqual({hour: 11, minute: 30, second: 0});

         hourInput.triggerEventHandler('keydown.ArrowDown', {preventDefault: () => {}});  // H-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should increment / decrement minutes', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         const minuteInput = getDebugInputs(fixture)[1];

         minuteInput.triggerEventHandler('keydown.ArrowUp', {preventDefault: () => {}});  // M+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:31');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 31, second: 0});

         minuteInput.triggerEventHandler('keydown.ArrowDown', {preventDefault: () => {}});  // M-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should increment / decrement seconds', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         const secondInput = getDebugInputs(fixture)[2];

         secondInput.triggerEventHandler('keydown.ArrowUp', {preventDefault: () => {}});  // S+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:01');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 1});

         secondInput.triggerEventHandler('keydown.ArrowDown', {preventDefault: () => {}});  // S-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));
  });

  describe('model updates in response to input field changes', () => {

    it('should update hours', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const inputs = fixture.debugElement.queryAll(By.css('input'));

         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         inputs[0].triggerEventHandler('change', createChangeEvent('11'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '11:30');
         expect(fixture.componentInstance.model).toEqual({hour: 11, minute: 30, second: 0});

         inputs[0].triggerEventHandler('change', createChangeEvent(`${24 + 11}`));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '11:30');
         expect(fixture.componentInstance.model).toEqual({hour: 11, minute: 30, second: 0});

         inputs[0].triggerEventHandler('change', createChangeEvent('aa'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, ':30');
         expect(fixture.componentInstance.model).toEqual(null);
       }));

    it('should update minutes', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const inputs = fixture.debugElement.queryAll(By.css('input'));

         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         inputs[1].triggerEventHandler('change', createChangeEvent('40'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:40');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 40, second: 0});

         inputs[1].triggerEventHandler('change', createChangeEvent('70'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '11:10');
         expect(fixture.componentInstance.model).toEqual({hour: 11, minute: 10, second: 0});

         inputs[1].triggerEventHandler('change', createChangeEvent('aa'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '11:');
         expect(fixture.componentInstance.model).toEqual(null);
       }));

    it('should update seconds', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const inputs = fixture.debugElement.queryAll(By.css('input'));

         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         inputs[2].triggerEventHandler('change', createChangeEvent('40'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:40');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 40});

         inputs[2].triggerEventHandler('change', createChangeEvent('70'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:31:10');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 31, second: 10});

         inputs[2].triggerEventHandler('change', createChangeEvent('aa'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:31:');
         expect(fixture.componentInstance.model).toEqual(null);
       }));
  });

  describe('meridian', () => {

    beforeEach(
        () => { TestBed.configureTestingModule({providers: [{provide: NgbTimepickerI18n, useClass: TestI18n}]}); });

    it('should render meridian button with proper value', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 30, second: 0};
         const meridianButton = getMeridianButton(fixture.nativeElement);
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '01:30:00');
         expect(meridianButton.textContent).toBe('afternoon');

         fixture.componentInstance.model = {hour: 1, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '01:30:00');
         expect(meridianButton.textContent).toBe('morning');
       }));

    it('should render 12 PM/AM as 12:mm and meridian button with proper value', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 12, minute: 30, second: 0};
         const meridianButton = getMeridianButton(fixture.nativeElement);
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '12:30:00');
         expect(meridianButton.textContent).toBe('afternoon');

         fixture.componentInstance.model = {hour: 0, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '12:30:00');
         expect(meridianButton.textContent).toBe('morning');
       }));

    it('should update model on meridian click', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 30, second: 0};
         const meridianButton = <HTMLButtonElement>getMeridianButton(fixture.nativeElement);
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '01:30:00');
         expect(meridianButton.textContent).toBe('afternoon');

         meridianButton.click();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '01:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 1, minute: 30, second: 0});
         expect(meridianButton.textContent).toBe('morning');
       }));


    it('should respect meridian when propagating model (PM)', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 14, minute: 30};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const inputs = fixture.debugElement.queryAll(By.css('input'));
         inputs[0].triggerEventHandler('change', createChangeEvent('3'));
         expect(fixture.componentInstance.model).toEqual({hour: 15, minute: 30, second: 0});
       }));

    it('should respect meridian when propagating model (AM)', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 9, minute: 30};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const inputs = fixture.debugElement.queryAll(By.css('input'));
         inputs[0].triggerEventHandler('change', createChangeEvent('10'));
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should interpret 12 as midnight (00:00) when meridian is set to AM', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 9, minute: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const inputs = fixture.debugElement.queryAll(By.css('input'));
         inputs[0].triggerEventHandler('change', createChangeEvent('12'));
         expect(fixture.componentInstance.model).toEqual({hour: 0, minute: 0, second: 0});
       }));

    it('should interpret 12 as noon (12:00) when meridian is set to PM', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 18, minute: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const inputs = fixture.debugElement.queryAll(By.css('input'));
         inputs[0].triggerEventHandler('change', createChangeEvent('12'));
         expect(fixture.componentInstance.model).toEqual({hour: 12, minute: 0, second: 0});
       }));

    it('should interpret hour more than 12 as 24h value (AM)', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 7, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const inputs = fixture.debugElement.queryAll(By.css('input'));
         const meridianButton = <HTMLButtonElement>getMeridianButton(fixture.nativeElement);

         inputs[0].triggerEventHandler('change', createChangeEvent('22'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(meridianButton.textContent).toBe('afternoon');
         expect(fixture.componentInstance.model).toEqual({hour: 22, minute: 30, second: 0});
       }));

    it('should interpret hour more than 12 as 24h value (PM)', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 15, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const inputs = fixture.debugElement.queryAll(By.css('input'));
         const meridianButton = <HTMLButtonElement>getMeridianButton(fixture.nativeElement);

         inputs[0].triggerEventHandler('change', createChangeEvent('22'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(meridianButton.textContent).toBe('afternoon');
         expect(fixture.componentInstance.model).toEqual({hour: 22, minute: 30, second: 0});
       }));

    it('should use remainder of division by 24 as a value in 24h format when hour > 24 (AM)', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 7, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const inputs = fixture.debugElement.queryAll(By.css('input'));
         const meridianButton = <HTMLButtonElement>getMeridianButton(fixture.nativeElement);

         inputs[0].triggerEventHandler('change', createChangeEvent(`${24 + 9}`));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '09:30');
         expect(meridianButton.textContent).toBe('morning');
         expect(fixture.componentInstance.model).toEqual({hour: 9, minute: 30, second: 0});
       }));

    it('should use remainder of division by 24 as a value in 24h format when hour > 24 (PM)', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [meridian]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 15, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const inputs = fixture.debugElement.queryAll(By.css('input'));
         const meridianButton = <HTMLButtonElement>getMeridianButton(fixture.nativeElement);

         inputs[0].triggerEventHandler('change', createChangeEvent(`${24 + 9}`));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '09:30');
         expect(meridianButton.textContent).toBe('morning');
         expect(fixture.componentInstance.model).toEqual({hour: 9, minute: 30, second: 0});
       }));

  });

  describe('forms', () => {

    it('should work with template-driven form validation', fakeAsync(() => {
         const html = `
          <form>
            <ngb-timepicker [(ngModel)]="model" name="control" required></ngb-timepicker>
          </form>`;

         const fixture = createTestComponent(html);
         const compiled = fixture.nativeElement;
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expect(getTimepicker(compiled)).toHaveCssClass('ng-invalid');
         expect(getTimepicker(compiled)).not.toHaveCssClass('ng-valid');

         fixture.componentInstance.model = {hour: 12, minute: 0, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expect(getTimepicker(compiled)).toHaveCssClass('ng-valid');
         expect(getTimepicker(compiled)).not.toHaveCssClass('ng-invalid');
       }));

    it('should work with template-driven form validation when meridian is true', fakeAsync(() => {
         const html = `
          <form>
            <ngb-timepicker [(ngModel)]="model" name="control"></ngb-timepicker>
          </form>`;

         const fixture = createTestComponent(html);
         const compiled = fixture.nativeElement;
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expect(getTimepicker(compiled)).toHaveCssClass('ng-valid');
         expect(getTimepicker(compiled)).not.toHaveCssClass('ng-invalid');

         fixture.componentInstance.model = {hour: 11, minute: 0, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expect(getTimepicker(compiled)).toHaveCssClass('ng-valid');
         expect(getTimepicker(compiled)).not.toHaveCssClass('ng-invalid');
       }));

    it('should work with model-driven form validation', () => {
      const html = `
          <form [formGroup]="form">
            <ngb-timepicker formControlName="control" required></ngb-timepicker>
          </form>`;

      const fixture = createTestComponent(html);
      const compiled = fixture.nativeElement;
      fixture.detectChanges();
      const inputs = fixture.debugElement.queryAll(By.css('input'));

      expect(getTimepicker(compiled)).toHaveCssClass('ng-invalid');
      expect(getTimepicker(compiled)).not.toHaveCssClass('ng-valid');

      inputs[0].triggerEventHandler('change', createChangeEvent('12'));
      inputs[1].triggerEventHandler('change', createChangeEvent('15'));
      fixture.detectChanges();
      expect(getTimepicker(compiled)).toHaveCssClass('ng-valid');
      expect(getTimepicker(compiled)).not.toHaveCssClass('ng-invalid');
    });

    it('should propagate model changes only if valid - no seconds', () => {
      const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

      const fixture = createTestComponent(html);
      fixture.componentInstance.model = {hour: 12, minute: 0};
      fixture.detectChanges();

      const inputs = fixture.debugElement.queryAll(By.css('input'));
      inputs[0].triggerEventHandler('change', createChangeEvent('aa'));
      fixture.detectChanges();

      expect(fixture.componentInstance.model).toBeNull();
    });

    it('should propagate model changes only if valid - with seconds', () => {
      const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true"></ngb-timepicker>`;

      const fixture = createTestComponent(html);
      fixture.componentInstance.model = {hour: 12, minute: 0, second: 0};
      fixture.detectChanges();

      const inputs = fixture.debugElement.queryAll(By.css('input'));
      inputs[2].triggerEventHandler('change', createChangeEvent('aa'));
      fixture.detectChanges();

      expect(fixture.componentInstance.model).toBeNull();
    });

    it('should not submit form when spinners clicked', fakeAsync(() => {
         const html = `<form (ngSubmit)="onSubmit()">
           <ngb-timepicker name="control" [(ngModel)]="model"></ngb-timepicker>
           </form>`;

         const fixture = createTestComponent(html);
         const compiled = fixture.nativeElement;
         const buttons = getButtons(compiled);
         const button = buttons[0] as HTMLButtonElement;

         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         button.click();
         fixture.detectChanges();
         expect(fixture.componentInstance.submitted).toBeFalsy();
       }));
  });

  describe('disabled', () => {

    it('should not change the value on button click, when it is disabled', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true" [disabled]="disabled"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[0]).click();  // H+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[1]).click();  // H-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[2]).click();  // M+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[3]).click();  // M-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[4]).click();  // S+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[5]).click();  // S-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});
       }));

    it('should have disabled class, when it is disabled', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true" [disabled]="disabled"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         let fieldset = getFieldsetElement(fixture.nativeElement);
         expect(fieldset.hasAttribute('disabled')).toBeTruthy();

         fixture.componentInstance.disabled = false;
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         fieldset = getFieldsetElement(fixture.nativeElement);
         expect(fieldset.hasAttribute('disabled')).toBeFalsy();
       }));

    it('should have disabled attribute when it is disabled using reactive forms', () => {
      const html = `<form [formGroup]="disabledForm"><ngb-timepicker formControlName="control"></ngb-timepicker></form>`;

      const fixture = createTestComponent(html);
      fixture.detectChanges();
      let fieldset = getFieldsetElement(fixture.nativeElement);
      expect(fieldset.hasAttribute('disabled')).toBeTruthy();
    });
  });

  describe('readonly', () => {

    it('should change the value on button click, when it is readonly', fakeAsync(() => {
         const html =
             `<ngb-timepicker [(ngModel)]="model" [seconds]="true" [readonlyInputs]="readonly"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[0]).click();  // H+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '14:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 14, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[1]).click();  // H-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[2]).click();  // M+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:31:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 31, second: 0});

         (<HTMLButtonElement>buttons[3]).click();  // M-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[4]).click();  // S+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:01');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 1});

         (<HTMLButtonElement>buttons[5]).click();  // S-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 30, second: 0});
       }));

    it('should not change value on input change, when it is readonly', () => {
      const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true" [readonlyInputs]="readonly"></ngb-timepicker>`;

      const fixture = createTestComponent(html);
      fixture.detectChanges();

      let inputs = getInputs(fixture.nativeElement);
      expect(inputs[0].hasAttribute('readonly')).toBeTruthy();
      expect(inputs[1].hasAttribute('readonly')).toBeTruthy();
      expect(inputs[2].hasAttribute('readonly')).toBeTruthy();

      fixture.componentInstance.readonly = false;
      fixture.detectChanges();
      inputs = getInputs(fixture.nativeElement);
      expect(inputs[0].hasAttribute('readonly')).toBeFalsy();
      expect(inputs[1].hasAttribute('readonly')).toBeFalsy();
      expect(inputs[2].hasAttribute('readonly')).toBeFalsy();
    });
  });

  describe('spinners', () => {

    it('should not have spinners if configured so', () => {
      const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true" [spinners]="false"></ngb-timepicker>`;

      const fixture = createTestComponent(html);
      const buttons = getButtons(fixture.nativeElement);
      expect(buttons.length).toBe(0);
    });
  });

  describe('size', () => {

    it('should add appropriate CSS classes to buttons and inputs when size is small', () => {
      const html = `<ngb-timepicker size="small"></ngb-timepicker>`;

      const fixture = createTestComponent(html);
      const buttons = getButtons(fixture.nativeElement);
      const inputs = getInputs(fixture.nativeElement);
      for (let i = 0; i < buttons.length; i++) {
        expect(buttons[i]).toHaveCssClass('btn-sm');
      }
      for (let i = 0; i < inputs.length; i++) {
        expect(inputs[i]).toHaveCssClass('form-control-sm');
      }
    });

    it('should add appropriate CSS classes to buttons and inputs when size is large', () => {
      const html = `<ngb-timepicker size="large"></ngb-timepicker>`;

      const fixture = createTestComponent(html);
      const buttons = getButtons(fixture.nativeElement);
      const inputs = getInputs(fixture.nativeElement);
      for (let i = 0; i < buttons.length; i++) {
        expect(buttons[i]).toHaveCssClass('btn-lg');
      }
      for (let i = 0; i < inputs.length; i++) {
        expect(inputs[i]).toHaveCssClass('form-control-lg');
      }
    });

    it('should not add special CSS classes to buttons and inputs when size is medium', () => {
      const html = `<ngb-timepicker size="medium"></ngb-timepicker>`;

      const fixture = createTestComponent(html);
      const buttons = getButtons(fixture.nativeElement);
      const inputs = getInputs(fixture.nativeElement);
      for (let i = 0; i < buttons.length; i++) {
        expect(buttons[i]).not.toHaveCssClass('btn-lg');
      }
      for (let i = 0; i < inputs.length; i++) {
        expect(inputs[i]).not.toHaveCssClass('form-control-lg');
      }
    });

    it('should not add special CSS classes to buttons and inputs when no size is specified', () => {
      const html = `<ngb-timepicker></ngb-timepicker>`;

      const fixture = createTestComponent(html);
      const buttons = getButtons(fixture.nativeElement);
      const inputs = getInputs(fixture.nativeElement);
      for (let i = 0; i < buttons.length; i++) {
        expect(buttons[i]).not.toHaveCssClass('btn-lg');
      }
      for (let i = 0; i < inputs.length; i++) {
        expect(inputs[i]).not.toHaveCssClass('form-control-lg');
      }
    });
  });

  describe('Custom config', () => {
    let config: NgbTimepickerConfig;

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [NgbTimepickerModule]});
      TestBed.overrideComponent(NgbTimepicker, {set: {template: ''}});
    });

    beforeEach(inject([NgbTimepickerConfig], (c: NgbTimepickerConfig) => {
      config = c;
      customizeConfig(config);
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(NgbTimepicker);

      const timepicker = fixture.componentInstance;
      expectSameValues(timepicker, config);
    });
  });

  describe('Custom config as provider', () => {
    const config = new NgbTimepickerConfig();
    customizeConfig(config);

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbTimepickerModule], providers: [{provide: NgbTimepickerConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = createGenericTestComponent('', NgbTimepicker);

      const timepicker = fixture.componentInstance;
      expectSameValues(timepicker, config);
    });
  });

  describe('accessibility', () => {

    it('should have text for screen readers on buttons', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expect((<HTMLButtonElement>buttons[0]).querySelector('.sr-only') !.textContent).toBe('Increment hours');
         expect((<HTMLButtonElement>buttons[1]).querySelector('.sr-only') !.textContent).toBe('Decrement hours');
         expect((<HTMLButtonElement>buttons[2]).querySelector('.sr-only') !.textContent).toBe('Increment minutes');
         expect((<HTMLButtonElement>buttons[3]).querySelector('.sr-only') !.textContent).toBe('Decrement minutes');
         expect((<HTMLButtonElement>buttons[4]).querySelector('.sr-only') !.textContent).toBe('Increment seconds');
         expect((<HTMLButtonElement>buttons[5]).querySelector('.sr-only') !.textContent).toBe('Decrement seconds');
       }));

    it('should have aria-label for inputs', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="true"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const inputs = getInputs(fixture.nativeElement);

         expect(inputs[0].getAttribute('aria-label')).toBe('Hours');
         expect(inputs[1].getAttribute('aria-label')).toBe('Minutes');
         expect(inputs[2].getAttribute('aria-label')).toBe('Seconds');
       }));
  });

  describe('Custom steps', () => {
    const config = new NgbTimepickerConfig();
    config.seconds = true;
    config.hourStep = 2;
    config.minuteStep = 3;
    config.secondStep = 4;

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbTimepickerModule], providers: [{provide: NgbTimepickerConfig, useValue: config}]});
    });

    it('should increment / decrement hours by 6', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [hourStep]="6"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[0]).click();  // H+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '16:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 16, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[1]).click();  // H-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should increment / decrement hours to default value if step set to undefined', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [hourStep]="undefined"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[0]).click();  // H+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '12:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 12, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[1]).click();  // H-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should increment / decrement minutes by 7', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [minuteStep]="7"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[2]).click();  // M+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:37:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 37, second: 0});

         (<HTMLButtonElement>buttons[3]).click();  // M-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should increment / decrement minutes to default value if step set to undefined', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [minuteStep]="undefined"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[2]).click();  // M+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:33:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 33, second: 0});

         (<HTMLButtonElement>buttons[3]).click();  // M-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should increment / decrement seconds by 8', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [secondStep]="8"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[4]).click();  // S+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:08');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 8});

         (<HTMLButtonElement>buttons[5]).click();  // S-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));

    it('should increment / decrement seconds to default value if step set to undefined', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [secondStep]="undefined"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 0};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const buttons = getButtons(fixture.nativeElement);

         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});

         (<HTMLButtonElement>buttons[4]).click();  // S+
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:04');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 4});

         (<HTMLButtonElement>buttons[5]).click();  // S-
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:00');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));
  });

  describe('Seconds handling', () => {
    it('should propagate seconds to 0 in model if seconds not shown and no second in initial model', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="false"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const inputs = fixture.debugElement.queryAll(By.css('input'));

         inputs[1].triggerEventHandler('change', createChangeEvent('40'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:40');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 40, second: 0});
       }));

    it('should propagate second as 0 in model if seconds not shown and null initial model', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="false"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const inputs = fixture.debugElement.queryAll(By.css('input'));

         inputs[0].triggerEventHandler('change', createChangeEvent('10'));
         inputs[1].triggerEventHandler('change', createChangeEvent('40'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:40');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 40, second: 0});
       }));

    it('should leave second as is in model if seconds not shown and second present in initial model', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="false"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: 30};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         const inputs = fixture.debugElement.queryAll(By.css('input'));

         inputs[1].triggerEventHandler('change', createChangeEvent('40'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:40');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 40, second: 30});
       }));

    it('should reset the second to 0 if invalid when seconds are hidden', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model" [seconds]="showSeconds"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 10, minute: 30, second: null};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30:');

         fixture.componentInstance.showSeconds = false;
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '10:30');
         expect(fixture.componentInstance.model).toEqual({hour: 10, minute: 30, second: 0});
       }));
  });

  describe('Custom adapter', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [NgbTimepickerModule, FormsModule],
        providers: [{provide: NgbTimeAdapter, useClass: StringTimeAdapter}]
      });
    });

    it('should display the right time when model is a string parsed by a custom time adapter', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;
         const fixture = createTestComponent(html);

         fixture.componentInstance.model = null;
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, ':');

         fixture.componentInstance.model = '09:25:00';
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '09:25');
       }));

    it('should write the entered value as a string formatted by a custom time adapter', fakeAsync(() => {
         const html = `<ngb-timepicker [(ngModel)]="model"></ngb-timepicker>`;

         const fixture = createTestComponent(html);
         fixture.componentInstance.model = null;
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         const inputs = fixture.debugElement.queryAll(By.css('input'));
         inputs[0].triggerEventHandler('change', createChangeEvent('11'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '11:');
         expect(fixture.componentInstance.model).toBeNull();

         inputs[1].triggerEventHandler('change', createChangeEvent('5'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '11:05');
         expect(fixture.componentInstance.model).toEqual('11:05:00');

         inputs[0].triggerEventHandler('change', createChangeEvent('aa'));
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, ':05');
         expect(fixture.componentInstance.model).toBeNull();
       }));
  });

  describe('on push', () => {

    it('should render initial model value', fakeAsync(() => {
         const fixture =
             createOnPushTestComponent(`<ngb-timepicker [ngModel]="{hour: 13, minute: 30}"></ngb-timepicker>`);
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expectToDisplayTime(fixture.nativeElement, '13:30');
       }));
  });
});


@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  model;
  disabled = true;
  readonly = true;
  form = new FormGroup({control: new FormControl('', Validators.required)});
  disabledForm = new FormGroup({control: new FormControl({value: '', disabled: true})});
  submitted = false;

  showSeconds = true;

  onSubmit() { this.submitted = true; }
}

@Component({selector: 'test-cmp-on-push', template: '', changeDetection: ChangeDetectionStrategy.OnPush})
class TestComponentOnPush {
}

@Injectable()
class StringTimeAdapter extends NgbTimeAdapter<string> {
  fromModel(value: string): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {hour: parseInt(split[0], 10), minute: parseInt(split[1], 10), second: parseInt(split[2], 10)};
  }

  toModel(time: NgbTimeStruct): string | null {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string { return i < 10 ? `0${i}` : `${i}`; }
}

@Injectable()
class TestI18n extends NgbTimepickerI18n {
  getMorningPeriod(): string { return 'morning'; }
  getAfternoonPeriod(): string { return 'afternoon'; }
}
