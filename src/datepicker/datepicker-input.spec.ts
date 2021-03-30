import {TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {createGenericTestComponent} from '../test/common';

import {Component, Injectable} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';

import {NgbDateAdapter, NgbDatepickerModule} from './datepicker.module';
import {NgbInputDatepicker} from './datepicker-input';
import {NgbDatepicker} from './datepicker';
import {NgbDateStruct} from './ngb-date-struct';
import {NgbDate} from './ngb-date';
import {positionService} from 'src/util/positioning';
import {NgbInputDatepickerConfig} from './datepicker-input-config';

const createTestCmpt = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const createTestNativeCmpt = (html: string) =>
    createGenericTestComponent(html, TestNativeComponent) as ComponentFixture<TestNativeComponent>;

function expectSameValues(inputDatepicker: NgbInputDatepicker, config: NgbInputDatepickerConfig) {
  ['autoClose', 'container', 'positionTarget', 'placement'].forEach(
      field => expect(inputDatepicker[field]).toEqual(config[field], field));
}

function customizeConfig(config: NgbInputDatepickerConfig) {
  config.autoClose = 'outside';
  config.container = 'body';
  config.positionTarget = 'positionTarget';
  config.placement = ['bottom-left', 'top-right'];
}

describe('NgbInputDatepicker', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbDatepickerModule, FormsModule]});
  });

  it('should initialize inputs with provided datepicker config', () => {
    const defaultConfig = new NgbInputDatepickerConfig();
    const fixture = createTestCmpt(`<input ngbDatepicker>`);

    const inputDatepicker =
        fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
    expectSameValues(inputDatepicker, defaultConfig);
  });

  it('should initialize inputs with provided config', () => {
    // overrideComponent should happen before any injections, so createTestCmpt will fail here
    TestBed.overrideComponent(TestComponent, {set: {template: '<input ngbDatepicker>'}});
    const config = TestBed.inject(NgbInputDatepickerConfig);
    customizeConfig(config);
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const inputDatepicker =
        fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
    expectSameValues(inputDatepicker, config);
  });

  it('should work when wrapped in the <label> and toggled with (click)', () => {
    const fixture = createTestCmpt(`
      <label>
        <input ngbDatepicker #d="ngbDatepicker" [startDate]="{year: 2018, month: 3}" (click)="d.toggle()">
      </label>`);

    const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

    // open
    dpInput.open();
    fixture.detectChanges();

    // click on a date
    fixture.nativeElement.querySelectorAll('.ngb-dp-day')[3].click();  // 1 MAR 2018
    fixture.detectChanges();

    expect(dpInput.isOpen()).toBe(false);
  });

  describe('Custom config as provider', () => {
    const config = new NgbInputDatepickerConfig();
    customizeConfig(config);

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbDatepickerModule], providers: [{provide: NgbInputDatepickerConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker>`);

      const inputDatepicker =
          fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
      expectSameValues(inputDatepicker, config);
    });
  });

  describe('open, close and toggle', () => {

    it('should allow controlling datepicker popup from outside', () => {
      const fixture = createTestCmpt(`
          <input ngbDatepicker #d="ngbDatepicker">
          <button (click)="open(d)">Open</button>
          <button (click)="close(d)">Close</button>
          <button (click)="toggle(d)">Toggle</button>`);

      const buttons = fixture.nativeElement.querySelectorAll('button');

      buttons[0].click();  // open
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();

      buttons[1].click();  // close
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngb-datepicker')).toBeNull();

      buttons[2].click();  // toggle
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();

      buttons[2].click();  // toggle
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ngb-datepicker')).toBeNull();
    });

    it('should support the "position" option',
       () => { createTestCmpt(`<input ngbDatepicker #d="ngbDatepicker" [placement]="'bottom-right'">`); });
  });

  describe('ngModel interactions', () => {
    it('should not change again the value in the model on a change coming from the model (popup closed)',
       fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbDatepicker [(ngModel)]="date">`);
         fixture.detectChanges();

         const input = fixture.nativeElement.querySelector('input');

         const value = new NgbDate(2018, 8, 29);
         fixture.componentInstance.date = value;

         fixture.detectChanges();
         tick();
         expect(fixture.componentInstance.date).toBe(value);
         expect(input.value).toBe('2018-08-29');
       }));

    it('should not change again the value in the model on a change coming from the model (popup opened)',
       fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbDatepicker [(ngModel)]="date" #d="ngbDatepicker">
      <button (click)="open(d)">Open</button>`);
         fixture.detectChanges();

         const button = fixture.nativeElement.querySelector('button');
         const input = fixture.nativeElement.querySelector('input');

         button.click();  // open
         tick();
         fixture.detectChanges();

         const value = new NgbDate(2018, 8, 29);
         fixture.componentInstance.date = value;
         fixture.detectChanges();
         tick();
         expect(fixture.componentInstance.date).toBe(value);
         expect(input.value).toBe('2018-08-29');
       }));


    it('should format bound date as ISO (by default) in the input field', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbDatepicker [ngModel]="date">`);
         const input = fixture.nativeElement.querySelector('input');

         fixture.componentInstance.date = {year: 2016, month: 10, day: 10};
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('2016-10-10');

         fixture.componentInstance.date = {year: 2016, month: 10, day: 15};
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('2016-10-15');
       }));

    it('should parse user-entered date as ISO (by default)', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [(ngModel)]="date">`);
      const inputDebugEl = fixture.debugElement.query(By.css('input'));

      inputDebugEl.triggerEventHandler('input', {target: {value: '2016-09-10'}});
      expect(fixture.componentInstance.date).toEqual({year: 2016, month: 9, day: 10});
    });

    it('should not update the model twice with the same value on input and on change', fakeAsync(() => {
         const fixture =
             createTestCmpt(`<input ngbDatepicker [(ngModel)]="date" (ngModelChange)="onModelChange($event)">`);
         const componentInstance = fixture.componentInstance;
         const inputDebugEl = fixture.debugElement.query(By.css('input'));
         spyOn(componentInstance, 'onModelChange');

         tick();
         fixture.detectChanges();

         inputDebugEl.triggerEventHandler('input', {target: {value: '2018-08-29'}});
         tick();
         fixture.detectChanges();

         const value = componentInstance.date;
         expect(value).toEqual({year: 2018, month: 8, day: 29});
         expect(componentInstance.onModelChange).toHaveBeenCalledTimes(1);
         expect(componentInstance.onModelChange).toHaveBeenCalledWith(value);

         inputDebugEl.triggerEventHandler('change', {target: {value: '2018-08-29'}});

         tick();
         fixture.detectChanges();

         expect(fixture.componentInstance.date).toBe(value);

         // the value is still the same, there should not be new calls of onModelChange:
         expect(componentInstance.onModelChange).toHaveBeenCalledTimes(1);
       }));

    it('should set only valid dates', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbDatepicker [ngModel]="date">`);
         const input = fixture.nativeElement.querySelector('input');

         fixture.componentInstance.date = <any>{};
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = <any>null;
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = <any>new Date();
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = <any>undefined;
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbDate(300000, 1, 1);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbDate(2017, 2, <any>null);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbDate(2017, <any>null, 5);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbDate(<any>null, 2, 5);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');

         fixture.componentInstance.date = new NgbDate(<any>'2017', <any>'03', <any>'10');
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('');
       }));

    it('should propagate disabled state', fakeAsync(() => {
         const fixture = createTestCmpt(`
        <input ngbDatepicker [(ngModel)]="date" #d="ngbDatepicker" [disabled]="isDisabled">
        <button (click)="open(d)">Open</button>`);
         fixture.componentInstance.isDisabled = true;
         fixture.detectChanges();

         const button = fixture.nativeElement.querySelector('button');
         const input = fixture.nativeElement.querySelector('input');

         button.click();  // open
         tick();
         fixture.detectChanges();
         const buttonInDatePicker = fixture.nativeElement.querySelector('ngb-datepicker button');

         expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();
         expect(input.disabled).toBeTruthy();
         expect(buttonInDatePicker.disabled).toBeTruthy();

         const dayElements = fixture.nativeElement.querySelectorAll('ngb-datepicker-month .ngb-dp-day');
         expect(dayElements[1]).toHaveCssClass('disabled');
         expect(dayElements[11]).toHaveCssClass('disabled');
         expect(dayElements[21]).toHaveCssClass('disabled');

         fixture.componentInstance.isDisabled = false;
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();
         expect(input.disabled).toBeFalsy();
         expect(buttonInDatePicker.disabled).toBeFalsy();

         const dayElements2 = fixture.nativeElement.querySelectorAll('ngb-datepicker-month .ngb-dp-day');
         expect(dayElements2[1]).not.toHaveCssClass('disabled');
         expect(dayElements2[11]).not.toHaveCssClass('disabled');
         expect(dayElements2[21]).not.toHaveCssClass('disabled');
       }));

    it('should propagate disabled state without form control', () => {
      const fixture = createTestCmpt(`
        <input ngbDatepicker #d="ngbDatepicker" [disabled]="isDisabled">
        <button (click)="open(d)">Open</button>`);
      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      const input = fixture.nativeElement.querySelector('input');

      expect(input.disabled).toBeTruthy();

      button.click();  // open
      fixture.detectChanges();
      const buttonInDatePicker = fixture.nativeElement.querySelector('ngb-datepicker button');

      expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();
      expect(input.disabled).toBeTruthy();
      expect(buttonInDatePicker.disabled).toBeTruthy();

      const dayElements = fixture.nativeElement.querySelectorAll('ngb-datepicker-month .ngb-dp-day');
      expect(dayElements[1]).toHaveCssClass('disabled');
      expect(dayElements[11]).toHaveCssClass('disabled');
      expect(dayElements[21]).toHaveCssClass('disabled');

      fixture.componentInstance.isDisabled = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngb-datepicker')).not.toBeNull();
      expect(input.disabled).toBeFalsy();
      expect(buttonInDatePicker.disabled).toBeFalsy();

      const dayElements2 = fixture.nativeElement.querySelectorAll('ngb-datepicker-month .ngb-dp-day');
      expect(dayElements2[1]).not.toHaveCssClass('disabled');
      expect(dayElements2[11]).not.toHaveCssClass('disabled');
      expect(dayElements2[21]).not.toHaveCssClass('disabled');
    });

    it('should propagate touched state on (blur)', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbDatepicker [(ngModel)]="date">`);
         const inputDebugEl = fixture.debugElement.query(By.css('input'));

         expect(inputDebugEl.classes['ng-touched']).toBeFalsy();

         inputDebugEl.triggerEventHandler('blur', {});
         tick();
         fixture.detectChanges();

         expect(inputDebugEl.classes['ng-touched']).toBeTruthy();
       }));

    it('should propagate touched state when setting a date', fakeAsync(() => {
         const fixture = createTestCmpt(`
      <input ngbDatepicker [(ngModel)]="date" #d="ngbDatepicker">
      <button (click)="open(d)">Open</button>`);

         const buttonDebugEl = fixture.debugElement.query(By.css('button'));
         const inputDebugEl = fixture.debugElement.query(By.css('input'));

         expect(inputDebugEl.classes['ng-touched']).toBeFalsy();

         buttonDebugEl.triggerEventHandler('click', {});  // open
         inputDebugEl.triggerEventHandler('change', {target: {value: '2016-09-10'}});
         tick();
         fixture.detectChanges();

         expect(inputDebugEl.classes['ng-touched']).toBeTruthy();
       }));

    it('should update model with updateOnBlur when selecting a date', fakeAsync(() => {
         const fixture = createTestCmpt(`
      <input ngbDatepicker [startDate]="{year: 2018, month: 3}" [(ngModel)]="date" #d="ngbDatepicker"
             [ngModelOptions]="{updateOn: 'blur'}">`);

         fixture.detectChanges();
         const inputDebugEl = fixture.debugElement.query(By.css('input'));
         const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

         // open
         dpInput.open();
         fixture.detectChanges();
         expect(inputDebugEl.classes['ng-touched']).toBeFalsy();
         expect(fixture.componentInstance.date).toBeUndefined();

         // select date
         fixture.nativeElement.querySelectorAll('.ngb-dp-day')[3].click();  // 1 MAR 2018
         fixture.detectChanges();
         expect(fixture.componentInstance.date).toEqual({year: 2018, month: 3, day: 1});
         expect(inputDebugEl.nativeElement.value).toBe('2018-03-01');
         expect(inputDebugEl.classes['ng-touched']).toBeTruthy();
       }));
  });

  describe('manual data entry', () => {

    it('should reformat value entered by a user when it is valid', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbDatepicker (ngModelChange)="date">`);
         const inputDebugEl = fixture.debugElement.query(By.css('input'));

         inputDebugEl.triggerEventHandler('change', {target: {value: '2016-9-1'}});
         tick();
         fixture.detectChanges();

         expect(inputDebugEl.nativeElement.value).toBe('2016-09-01');
       }));

    it('should retain value entered by a user if it is not valid', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbDatepicker (ngModelChange)="date">`);
         const inputDebugEl = fixture.debugElement.query(By.css('input'));

         inputDebugEl.nativeElement.value = '2016-09-aa';
         inputDebugEl.triggerEventHandler('change', {target: {value: inputDebugEl.nativeElement.value}});
         tick();
         fixture.detectChanges();

         expect(inputDebugEl.nativeElement.value).toBe('2016-09-aa');
       }));

  });

  describe('validation', () => {

    describe('values set from model', () => {

      it('should not return errors for valid model', fakeAsync(() => {
           const fixture = createTestCmpt(
               `<form><input ngbDatepicker [ngModel]="{year: 2017, month: 04, day: 04}" name="dp"></form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();
           expect(form.control.hasError('ngbDate', ['dp'])).toBeFalsy();
         }));

      it('should not return errors for empty model', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbDatepicker [ngModel]="date" name="dp"></form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();
         }));

      it('should return "invalid" errors for invalid model', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbDatepicker [ngModel]="5" name="dp"></form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
           expect(form.control.getError('ngbDate', ['dp']).invalid).toBe(5);
         }));

      it('should return "minDate" errors for dates before minimal date', fakeAsync(() => {
           const fixture = createTestCmpt(`<form>
          <input ngbDatepicker [ngModel]="{year: 2017, month: 04, day: 04}" [minDate]="{year: 2017, month: 6, day: 4}" name="dp">
        </form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
           expect(form.control.getError('ngbDate', ['dp']).minDate)
               .toEqual({minDate: {year: 2017, month: 6, day: 4}, actual: {year: 2017, month: 4, day: 4}});
         }));

      it('should return "maxDate" errors for dates after maximal date', fakeAsync(() => {
           const fixture = createTestCmpt(`<form>
          <input ngbDatepicker [ngModel]="{year: 2017, month: 04, day: 04}" [maxDate]="{year: 2017, month: 2, day: 4}" name="dp">
        </form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
           expect(form.control.getError('ngbDate', ['dp']).maxDate)
               .toEqual({maxDate: {year: 2017, month: 2, day: 4}, actual: {year: 2017, month: 4, day: 4}});
         }));

      it('should update validity status when model changes', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbDatepicker [ngModel]="date" name="dp"></form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.componentRef.instance.date = <any>'invalid';
           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();

           fixture.componentRef.instance.date = {year: 2015, month: 7, day: 3};
           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();
         }));

      it('should update validity status when minDate changes', fakeAsync(() => {
           const fixture = createTestCmpt(`<form>
          <input ngbDatepicker [ngModel]="{year: 2017, month: 2, day: 4}" [minDate]="date" name="dp">
        </form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();

           fixture.componentRef.instance.date = {year: 2018, month: 7, day: 3};
           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
         }));

      it('should update validity status when maxDate changes', fakeAsync(() => {
           const fixture = createTestCmpt(`<form>
          <input ngbDatepicker [ngModel]="{year: 2017, month: 2, day: 4}" [maxDate]="date" name="dp">
        </form>`);
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();

           fixture.componentRef.instance.date = {year: 2015, month: 7, day: 3};
           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
         }));

      it('should update validity for manually entered dates', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbDatepicker [(ngModel)]="date" name="dp"></form>`);
           const inputDebugEl = fixture.debugElement.query(By.css('input'));
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           inputDebugEl.triggerEventHandler('input', {target: {value: '2016-09-10'}});
           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();

           inputDebugEl.triggerEventHandler('input', {target: {value: 'invalid'}});
           fixture.detectChanges();
           tick();
           expect(form.control.invalid).toBeTruthy();
         }));

      it('should consider empty strings as valid', fakeAsync(() => {
           const fixture = createTestCmpt(`<form><input ngbDatepicker [(ngModel)]="date" name="dp"></form>`);
           const inputDebugEl = fixture.debugElement.query(By.css('input'));
           const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

           inputDebugEl.triggerEventHandler('change', {target: {value: '2016-09-10'}});
           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();

           inputDebugEl.triggerEventHandler('change', {target: {value: ''}});
           fixture.detectChanges();
           tick();
           expect(form.control.valid).toBeTruthy();
         }));
    });

  });

  describe('options', () => {

    it('should propagate the "dayTemplate" option', () => {
      const fixture = createTestCmpt(`<ng-template #t></ng-template><input ngbDatepicker [dayTemplate]="t">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.dayTemplate).toBeDefined();
    });

    it('should propagate the "dayTemplateData" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [dayTemplateData]="noop">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.dayTemplateData).toBeDefined();
    });

    it('should propagate the "displayMonths" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [displayMonths]="3">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.displayMonths).toBe(3);
    });

    it('should propagate the "firstDayOfWeek" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [firstDayOfWeek]="5">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.firstDayOfWeek).toBe(5);
    });

    it('should propagate the "footerTemplate" option', () => {
      const fixture = createTestCmpt(`<ng-template #t></ng-template><input ngbDatepicker [footerTemplate]="t">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.footerTemplate).toBeDefined();
    });

    it('should propagate the "markDisabled" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [markDisabled]="noop">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.markDisabled).toBeDefined();
    });

    it('should propagate the "minDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [minDate]="{year: 2016, month: 9, day: 13}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.minDate).toEqual({year: 2016, month: 9, day: 13});
    });

    it('should propagate the "maxDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [maxDate]="{year: 2016, month: 9, day: 13}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.maxDate).toEqual({year: 2016, month: 9, day: 13});
    });

    it('should dynamically propagate the "minDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [minDate]="minDate">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
      fixture.componentRef.instance.minDate = {year: 2018, month: 12, day: 31};

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.minDate).toEqual({year: 2018, month: 12, day: 31});

      fixture.componentRef.instance.minDate = {year: 2019, month: 11, day: 14};
      fixture.detectChanges();
      expect(dp.minDate).toEqual({year: 2019, month: 11, day: 14});
    });

    it('should dynamically propagate the "maxDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [maxDate]="maxDate">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
      fixture.componentRef.instance.maxDate = {year: 2019, month: 12, day: 31};

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.maxDate).toEqual({year: 2019, month: 12, day: 31});

      fixture.componentRef.instance.maxDate = {year: 2019, month: 12, day: 14};
      fixture.detectChanges();
      expect(dp.maxDate).toEqual({year: 2019, month: 12, day: 14});
    });

    it('should dynamically propagate the "maxDate" and "minDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [minDate]="minDate" [maxDate]="maxDate">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
      fixture.componentRef.instance.minDate = {year: 2019, month: 11, day: 14};
      fixture.componentRef.instance.maxDate = {year: 2019, month: 12, day: 31};

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.minDate).toEqual({year: 2019, month: 11, day: 14});
      expect(dp.maxDate).toEqual({year: 2019, month: 12, day: 31});

      fixture.componentRef.instance.minDate = {year: 2019, month: 10, day: 14};
      fixture.componentRef.instance.maxDate = {year: 2019, month: 12, day: 14};
      fixture.detectChanges();

      expect(dp.minDate).toEqual({year: 2019, month: 10, day: 14});
      expect(dp.maxDate).toEqual({year: 2019, month: 12, day: 14});
    });

    it('should propagate the "outsideDays" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker outsideDays="collapsed">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.outsideDays).toEqual('collapsed');
    });

    it('should propagate the "navigation" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker navigation="none">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.navigation).toBe('none');
    });

    it('should propagate the "showWeekdays" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [showWeekdays]="true">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.showWeekdays).toBeTruthy();
    });

    it('should propagate the "weekdays" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [weekdays]="false">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.weekdays).toBeFalse();
    });

    it('should propagate the "showWeekNumbers" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [showWeekNumbers]="true">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.showWeekNumbers).toBeTruthy();
    });

    it('should propagate the "startDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [startDate]="{year: 2016, month: 9}">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.startDate).toEqual({year: 2016, month: 9});
    });

    it('should propagate model as "startDate" option when "startDate" not provided', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbDatepicker [ngModel]="{year: 2016, month: 9, day: 13}">`);
         const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

         tick();
         fixture.detectChanges();
         dpInput.open();
         fixture.detectChanges();

         const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
         expect(dp.startDate).toEqual(new NgbDate(2016, 9, 13));
       }));

    it('should relay the "navigate" event', () => {
      const fixture =
          createTestCmpt(`<input ngbDatepicker [startDate]="{year: 2016, month: 9}" (navigate)="onNavigate($event)">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      spyOn(fixture.componentInstance, 'onNavigate');

      dpInput.open();
      fixture.detectChanges();
      expect(fixture.componentInstance.onNavigate)
          .toHaveBeenCalledWith({current: null, next: {year: 2016, month: 9}, preventDefault: jasmine.any(Function)});

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      dp.navigateTo({year: 2018, month: 4});
      expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith({
        current: {year: 2016, month: 9},
        next: {year: 2018, month: 4},
        preventDefault: jasmine.any(Function)
      });
    });

    it('should relay the "closed" event', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker (closed)="onClose()">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      spyOn(fixture.componentInstance, 'onClose');

      // open
      dpInput.open();
      fixture.detectChanges();

      // close
      dpInput.close();
      expect(fixture.componentInstance.onClose).toHaveBeenCalledTimes(1);
    });

    it('should emit both "dateSelect" and "onModelChange" events', () => {
      const fixture = createTestCmpt(`
          <input ngbDatepicker ngModel [startDate]="{year: 2018, month: 3}"
          (ngModelChange)="onModelChange($event)" (dateSelect)="onDateSelect($event)">`);

      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
      spyOn(fixture.componentInstance, 'onDateSelect');
      spyOn(fixture.componentInstance, 'onModelChange');

      // open
      dpInput.open();
      fixture.detectChanges();

      // click on a date
      fixture.nativeElement.querySelectorAll('.ngb-dp-day')[3].click();  // 1 MAR 2018
      fixture.detectChanges();
      expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledTimes(1);
      expect(fixture.componentInstance.onModelChange).toHaveBeenCalledTimes(1);

      // open again
      dpInput.open();
      fixture.detectChanges();

      // click the same date
      fixture.nativeElement.querySelectorAll('.ngb-dp-day')[3].click();  // 1 MAR 2018
      fixture.detectChanges();
      expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledTimes(2);
      expect(fixture.componentInstance.onModelChange).toHaveBeenCalledTimes(1);

      expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledWith(new NgbDate(2018, 3, 1));
      expect(fixture.componentInstance.onModelChange).toHaveBeenCalledWith({year: 2018, month: 3, day: 1});
    });

    it('should add custom popup class via "popupClass" input', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker #d="ngbDatepicker" [datepickerClass]="popupClass">`);
      fixture.detectChanges();
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
      dpInput.open();

      // initial value
      let element = document.querySelector('ngb-datepicker') as HTMLElement;
      expect(element).not.toBeNull();
      expect(element).toHaveCssClass('my-datepicker-popup');
      expect(element).not.toHaveCssClass('my-another-datepicker-popup');

      // empty value
      fixture.componentInstance.popupClass = '';
      fixture.detectChanges();
      expect(element).not.toHaveCssClass('my-datepicker-popup');
      expect(element).not.toHaveCssClass('my-another-datepicker-popup');

      // another value
      fixture.componentInstance.popupClass = 'my-another-datepicker-popup';
      fixture.detectChanges();
      expect(element).not.toHaveCssClass('my-datepicker-popup');
      expect(element).toHaveCssClass('my-another-datepicker-popup');
    });
  });

  describe('container', () => {

    it('should be appended to the element matching the selector passed to "container"', () => {
      const selector = 'body';
      const fixture = createTestCmpt(`
          <input ngbDatepicker #d="ngbDatepicker" container="${selector}">
          <button (click)="open(d)">Open</button>
      `);

      // open date-picker
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngb-datepicker')).toBeNull();
      expect(document.querySelector(selector) !.querySelector('ngb-datepicker')).not.toBeNull();
    });

    it('should properly destroy datepicker window when the "container" option is used', () => {
      const selector = 'body';
      const fixture = createTestCmpt(`
          <input ngbDatepicker #d="ngbDatepicker" container="${selector}">
          <button (click)="open(d)">Open</button>
          <button (click)="close(d)">Close</button>
      `);

      // open date-picker
      const buttons = fixture.nativeElement.querySelectorAll('button');
      buttons[0].click();  // open button
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngb-datepicker')).toBeNull();
      expect(document.querySelector(selector) !.querySelector('ngb-datepicker')).not.toBeNull();

      // close date-picker
      buttons[1].click();  // close button
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ngb-datepicker')).toBeNull();
      expect(document.querySelector(selector) !.querySelector('ngb-datepicker')).toBeNull();
    });

    it('should add .ngb-dp-body class when attached to body', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker #d="ngbDatepicker" [container]="container">`);
      fixture.detectChanges();
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

      // No container specified
      dpInput.open();

      let element = document.querySelector('ngb-datepicker') as HTMLElement;
      expect(element).not.toBeNull();
      expect(element).not.toHaveCssClass('ngb-dp-body');

      // Body
      dpInput.close();
      fixture.componentInstance.container = 'body';
      fixture.detectChanges();
      dpInput.open();

      element = document.querySelector('ngb-datepicker') as HTMLElement;
      expect(element).not.toBeNull();
      expect(element).toHaveCssClass('ngb-dp-body');
    });
  });

  describe('positionTarget', () => {

    let positionElementsSpy: jasmine.Spy;

    beforeEach(() => { positionElementsSpy = spyOn(positionService, 'position').and.callThrough(); });

    it('should position popup by input if no target provided (default)', () => {
      const fixture = createTestCmpt(`
          <input ngbDatepicker #d="ngbDatepicker">
          <button (click)="open(d)">Open</button>
      `);
      const input = fixture.nativeElement.querySelector('input');

      // open date-picker
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();

      expect(positionElementsSpy).toHaveBeenCalled();
      expect(positionElementsSpy.calls.argsFor(0)[0]).toBe(input);
    });

    it('should position popup by html element', () => {
      const fixture = createTestCmpt(`
          <input ngbDatepicker #d="ngbDatepicker" [positionTarget]="myButton">
          <button #myButton (click)="open(d)">Open</button>
      `);

      // open date-picker
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();

      expect(positionElementsSpy).toHaveBeenCalled();
      expect(positionElementsSpy.calls.argsFor(0)[0]).toBe(button);
    });

    it('should position popup by css selector', () => {
      const selector = '#myButton';
      const fixture = createTestCmpt(`
          <input ngbDatepicker #d="ngbDatepicker" positionTarget="${selector}">
          <button id="myButton" (click)="open(d)">Open</button>
      `);

      // open date-picker
      const button = fixture.nativeElement.querySelector(selector);
      button.click();
      fixture.detectChanges();

      expect(positionElementsSpy).toHaveBeenCalled();
      expect(positionElementsSpy.calls.argsFor(0)[0]).toBe(button);
    });

    it('should throw error if target element does not exists', fakeAsync(() => {
         const fixture = createTestCmpt(`<input ngbDatepicker #d="ngbDatepicker" positionTarget="#nobody">`);
         const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);

         dpInput.open();
         fixture.detectChanges();

         expect(() => tick())
             .toThrowError('ngbDatepicker could not find element declared in [positionTarget] to position against.');
       }));
  });

  describe('focus restore', () => {

    function open(fixture: ComponentFixture<TestComponent>) {
      const dp = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
      dp.open();
      fixture.detectChanges();
    }

    function selectDateAndClose(fixture: ComponentFixture<TestComponent>) {
      fixture.nativeElement.querySelectorAll('.ngb-dp-day')[3].click();  // 1 MAR 2018
      fixture.detectChanges();
    }

    it('should focus previously focused element', () => {
      const fixture = createTestCmpt(`
        <div tabindex="0" id="focusable"></div>
        <input ngbDatepicker [startDate]="{year: 2018, month: 3}"/>
      `);

      // initial focus
      const focusableEl = fixture.nativeElement.querySelector('#focusable');
      focusableEl.focus();
      expect(document.activeElement).toBe(focusableEl);

      open(fixture);
      expect(document.activeElement).not.toBe(focusableEl);

      selectDateAndClose(fixture);
      expect(document.activeElement).toBe(focusableEl);
    });

    it('should focus using selector provided via [restoreFocus]', () => {
      const fixture = createTestCmpt(`
        <div tabindex="0" id="focusable"></div>
        <input ngbDatepicker restoreFocus="#focusable" [startDate]="{year: 2018, month: 3}"/>
      `);

      const focusableEl = fixture.nativeElement.querySelector('#focusable');
      expect(document.activeElement).not.toBe(focusableEl);

      open(fixture);
      expect(document.activeElement).not.toBe(focusableEl);

      selectDateAndClose(fixture);
      expect(document.activeElement).toBe(focusableEl);
    });

    it('should focus using element provided via [restoreFocus]', () => {
      const fixture = createTestCmpt(`
        <div #el tabindex="0" id="focusable"></div>
        <input ngbDatepicker [restoreFocus]="el" [startDate]="{year: 2018, month: 3}"/>
      `);

      const focusableEl = fixture.nativeElement.querySelector('#focusable');
      expect(document.activeElement).not.toBe(focusableEl);

      open(fixture);
      expect(document.activeElement).not.toBe(focusableEl);

      selectDateAndClose(fixture);
      expect(document.activeElement).toBe(focusableEl);
    });

    it('should fallback to body if [restoreFocus] selector is invalid', () => {
      const fixture = createTestCmpt(`
        <div tabindex="0" id="focusable"></div>
        <input ngbDatepicker restoreFocus=".invalid-element" [startDate]="{year: 2018, month: 3}"/>
      `);

      const focusableEl = fixture.nativeElement.querySelector('#focusable');
      focusableEl.focus();
      expect(document.activeElement).toBe(focusableEl);

      open(fixture);
      expect(document.activeElement).not.toBe(focusableEl);

      selectDateAndClose(fixture);
      expect(document.activeElement).toBe(document.body);
    });

    it('should fallback to body if [restoreFocus] value is falsy', () => {
      const fixture = createTestCmpt(`
        <div tabindex="0" id="focusable"></div>
        <input ngbDatepicker [restoreFocus]="null" [startDate]="{year: 2018, month: 3}"/>
      `);

      const focusableEl = fixture.nativeElement.querySelector('#focusable');
      focusableEl.focus();
      expect(document.activeElement).toBe(focusableEl);

      open(fixture);
      expect(document.activeElement).not.toBe(focusableEl);

      selectDateAndClose(fixture);
      expect(document.activeElement).toBe(document.body);
    });

    it('should fallback to body if [restoreFocus] value is truthy', () => {
      const fixture = createTestCmpt(`
        <div tabindex="0" id="focusable"></div>
        <input ngbDatepicker [restoreFocus]="true" [startDate]="{year: 2018, month: 3}"/>
      `);

      const focusableEl = fixture.nativeElement.querySelector('#focusable');
      focusableEl.focus();
      expect(document.activeElement).toBe(focusableEl);

      open(fixture);
      expect(document.activeElement).not.toBe(focusableEl);

      selectDateAndClose(fixture);
      expect(document.activeElement).toBe(document.body);
    });
  });

  describe('Native adapter', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestNativeComponent],
        imports: [NgbDatepickerModule, FormsModule],
        providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
      });
    });

    it('should format bound date as ISO (by default) in the input field', fakeAsync(() => {
         const fixture = createTestNativeCmpt(`<input ngbDatepicker [ngModel]="date">`);
         const input = fixture.nativeElement.querySelector('input');

         fixture.componentInstance.date = new Date(2018, 0, 3);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('2018-01-03');

         fixture.componentInstance.date = new Date(2018, 10, 13);
         fixture.detectChanges();
         tick();
         expect(input.value).toBe('2018-11-13');
       }));

    it('should parse user-entered date as ISO (by default)', () => {
      const fixture = createTestNativeCmpt(`<input ngbDatepicker [(ngModel)]="date">`);
      const inputDebugEl = fixture.debugElement.query(By.css('input'));

      inputDebugEl.triggerEventHandler('input', {target: {value: '2018-01-03'}});
      expect(fixture.componentInstance.date).toEqual(new Date(2018, 0, 3));
    });

    it('should dynamically propagate the "maxDate" and "minDate" option', () => {
      const fixture = createTestCmpt(`<input ngbDatepicker [minDate]="minDate" [maxDate]="maxDate">`);
      const dpInput = fixture.debugElement.query(By.directive(NgbInputDatepicker)).injector.get(NgbInputDatepicker);
      fixture.componentRef.instance.minDate = {year: 2019, month: 11, day: 14};
      fixture.componentRef.instance.maxDate = {year: 2019, month: 12, day: 31};

      dpInput.open();
      fixture.detectChanges();

      const dp = fixture.debugElement.query(By.css('ngb-datepicker')).injector.get(NgbDatepicker);
      expect(dp.minDate).toEqual({year: 2019, month: 11, day: 14});
      expect(dp.maxDate).toEqual({year: 2019, month: 12, day: 31});

      fixture.componentRef.instance.minDate = {year: 2019, month: 10, day: 14};
      fixture.componentRef.instance.maxDate = {year: 2019, month: 12, day: 14};
      fixture.detectChanges();

      expect(dp.minDate).toEqual({year: 2019, month: 10, day: 14});
      expect(dp.maxDate).toEqual({year: 2019, month: 12, day: 14});
    });
  });
});

@Injectable()
class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
  fromModel(date: Date): NgbDateStruct | null {
    return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} :
                                        null;
  }

  toModel(date: NgbDateStruct): Date | null { return date ? new Date(date.year, date.month - 1, date.day) : null; }
}

@Component({selector: 'test-native-cmp', template: ''})
class TestNativeComponent {
  date: Date;
}

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  container;
  date: NgbDateStruct;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  isDisabled;
  popupClass = 'my-datepicker-popup';

  onNavigate(params) {}

  onDateSelect(date) {}

  onModelChange(value) {}

  onClose() {}

  open(d: NgbInputDatepicker) { d.open(); }

  close(d: NgbInputDatepicker) { d.close(); }

  toggle(d: NgbInputDatepicker) { d.toggle(); }

  noop() {}
}
