import {TestBed, ComponentFixture, inject, fakeAsync, tick} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';
import {getMonthSelect, getYearSelect, getNavigationLinks} from '../test/datepicker/common';

import {Component, TemplateRef, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';

import {NgbDatepickerModule, NgbDatepickerNavigateEvent} from './datepicker.module';
import {NgbDate} from './ngb-date';
import {NgbDatepickerConfig} from './datepicker-config';
import {NgbDatepicker, NgbDatepickerState} from './datepicker';
import {DayTemplateContext} from './datepicker-day-template-context';
import {NgbDateStruct} from './ngb-date-struct';
import {NgbDatepickerMonth} from './datepicker-month';
import {NgbDatepickerDayView} from './datepicker-day-view';
import {NgbDatepickerKeyboardService} from './datepicker-keyboard-service';
import {NgbDatepickerNavigationSelect} from './datepicker-navigation-select';
import {NgbDatepickerNavigation} from './datepicker-navigation';
import {TranslationWidth} from '@angular/common';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getDates(element: HTMLElement): HTMLElement[] {
  return <HTMLElement[]>Array.from(element.querySelectorAll('.ngb-dp-day'));
}

function getDay(element: HTMLElement, index: number): HTMLElement {
  return getDates(element)[index].querySelector('div') as HTMLElement;
}

function getDatepicker(element: HTMLElement): HTMLElement {
  return element.querySelector('ngb-datepicker') as HTMLElement;
}

function getFocusableDays(element: DebugElement): DebugElement[] {
  return <DebugElement[]>Array.from(element.queryAll(By.css('div.ngb-dp-day[tabindex="0"]')));
}

function getSelectedDays(element: DebugElement): DebugElement[] {
  return <DebugElement[]>Array.from(element.queryAll(By.css('div.ngb-dp-day > div.bg-primary')));
}

function getWeekdays(element: HTMLElement): string[] {
  return (<HTMLElement[]>Array.from(element.querySelectorAll('.ngb-dp-weekday')) || [])
      .map(el => el.textContent !.trim());
}

function focusDay() {
  const element = document.querySelector('div.ngb-dp-day[tabindex="0"]') as HTMLElement;
  const evt = document.createEvent('Event');
  evt.initEvent('focusin', true, false);
  element.dispatchEvent(evt);
  element.focus();
}

function triggerKeyDown(element: DebugElement, keyCode: number, shiftKey = false) {
  let event = {
    which: keyCode,
    shiftKey: shiftKey,
    defaultPrevented: false,
    propagationStopped: false,
    stopPropagation: function() { this.propagationStopped = true; },
    preventDefault: function() { this.defaultPrevented = true; }
  };
  expect(document.activeElement !.classList.contains('ngb-dp-day'))
      .toBeTruthy('You must focus day before triggering key events');
  element.triggerEventHandler('keydown', event);
  return event;
}

function getMonthContainer(datepicker: DebugElement) {
  return datepicker.query(By.css('ngb-datepicker-month'));
}

function expectSelectedDate(element: DebugElement, selectedDate: NgbDate | null) {
  // checking we have 1 day with .selected class
  const days = getSelectedDays(element);

  if (selectedDate) {
    expect(days.length).toBe(1);

    // checking it corresponds to our date
    const day = days[0];
    const dayView = day.parent !.query(By.directive(NgbDatepickerDayView)).componentInstance as NgbDatepickerDayView;
    expect(NgbDate.from(dayView.date)).toEqual(selectedDate);
  } else {
    expect(days.length).toBe(0);
  }
}

function expectFocusedDate(element: DebugElement, focusableDate: NgbDate, isFocused = true) {
  // checking we have 1 day with tabIndex 0
  const days = getFocusableDays(element);
  expect(days.length).toBe(1);

  const day = days[0];

  // checking it corresponds to our date
  const dayView = day.query(By.directive(NgbDatepickerDayView)).componentInstance as NgbDatepickerDayView;
  expect(NgbDate.from(dayView.date)).toEqual(focusableDate);

  // checking the active class
  // Unable to test it because of unknown failure (works when tested manually)
  // expect(day.queryAll(By.css('div.active')).length).toEqual(1, `The day must have a single element with the active
  // class`);

  // checking it is focused by the browser
  if (isFocused) {
    expect(document.activeElement).toBe(day.nativeElement, `Date HTML element for ${focusableDate} is not focused`);
  } else {
    expect(document.activeElement)
        .not.toBe(day.nativeElement, `Date HTML element for ${focusableDate} must not be focused`);
  }
}


function expectSameValues(datepicker: NgbDatepicker, config: NgbDatepickerConfig) {
  expect(datepicker.dayTemplate).toBe(config.dayTemplate);
  expect(datepicker.dayTemplateData).toBe(config.dayTemplateData);
  expect(datepicker.displayMonths).toBe(config.displayMonths);
  expect(datepicker.firstDayOfWeek).toBe(config.firstDayOfWeek);
  expect(datepicker.footerTemplate).toBe(config.footerTemplate);
  expect(datepicker.markDisabled).toBe(config.markDisabled);
  expect(datepicker.minDate).toEqual(config.minDate);
  expect(datepicker.maxDate).toEqual(config.maxDate);
  expect(datepicker.navigation).toBe(config.navigation);
  expect(datepicker.outsideDays).toBe(config.outsideDays);
  expect(datepicker.showWeekdays).toBe(config.showWeekdays);
  expect(datepicker.showWeekNumbers).toBe(config.showWeekNumbers);
  expect(datepicker.startDate).toEqual(config.startDate);
  expect(datepicker.weekdays).toBe(config.weekdays);
}

function customizeConfig(config: NgbDatepickerConfig) {
  config.dayTemplate = {} as TemplateRef<DayTemplateContext>;
  config.dayTemplateData = (date, current) => 42;
  config.firstDayOfWeek = 2;
  config.footerTemplate = {} as TemplateRef<any>;
  config.markDisabled = (date, current) => false;
  config.minDate = {year: 2000, month: 1, day: 1};
  config.maxDate = {year: 2030, month: 12, day: 31};
  config.navigation = 'none';
  config.outsideDays = 'collapsed';
  config.showWeekdays = false;
  config.showWeekNumbers = true;
  config.startDate = {year: 2015, month: 1};
  config.weekdays = TranslationWidth.Abbreviated;
}

describe('ngb-datepicker', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [TestComponent], imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule]});
  });

  it('should initialize inputs with provided config', () => {
    const defaultConfig = new NgbDatepickerConfig();
    const datepicker = TestBed.createComponent(NgbDatepicker).componentInstance;
    expectSameValues(datepicker, defaultConfig);
  });

  it('should display current month if no date provided', () => {
    const fixture = createTestComponent(`<ngb-datepicker></ngb-datepicker>`);

    const today = new Date();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(`${today.getMonth() + 1}`);
    expect(getYearSelect(fixture.nativeElement).value).toBe(`${today.getFullYear()}`);
  });

  it('should throw if max date is before min date', () => {
    expect(() => {
      createTestComponent('<ngb-datepicker [minDate]="maxDate" [maxDate]="minDate"></ngb-datepicker>');
    }).toThrowError();
  });

  it('should allow changing min/max dates at the same time', () => {
    const fixture = createTestComponent('<ngb-datepicker [minDate]="minDate" [maxDate]="maxDate"></ngb-datepicker>');

    expect(() => {
      fixture.componentInstance.minDate = {year: 2110, month: 1, day: 1};
      fixture.componentInstance.maxDate = {year: 2120, month: 12, day: 31};
      fixture.detectChanges();

      fixture.componentInstance.minDate = {year: 2010, month: 1, day: 1};
      fixture.componentInstance.maxDate = {year: 2020, month: 12, day: 31};
      fixture.detectChanges();
    }).not.toThrowError();
  });

  it('should handle incorrect startDate values', () => {
    const fixture = createTestComponent(`<ngb-datepicker [startDate]="date"></ngb-datepicker>`);
    const today = new Date();
    const currentMonth = `${today.getMonth() + 1}`;
    const currentYear = `${today.getFullYear()}`;

    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.date = <any>null;
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);

    fixture.componentInstance.date = <any>undefined;
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);

    fixture.componentInstance.date = <any>{};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);

    fixture.componentInstance.date = <any>new Date();
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);

    fixture.componentInstance.date = new NgbDate(3000000, 1, 1);
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe(currentMonth);
    expect(getYearSelect(fixture.nativeElement).value).toBe(currentYear);
  });

  it(`should display weekdays by default`, () => {
    const fixture = createTestComponent(`<ngb-datepicker [startDate]="date"></ngb-datepicker>`);
    expect(getWeekdays(fixture.nativeElement)).toEqual(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
  });

  it(`should allow customizing the way weekdays are displayed (showWeekdays)`, () => {
    const fixture =
        createTestComponent(`<ngb-datepicker [startDate]="date" [showWeekdays]="showWeekdays"></ngb-datepicker>`);
    expect(getWeekdays(fixture.nativeElement)).toEqual(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);

    fixture.componentInstance.showWeekdays = false;
    fixture.detectChanges();
    expect(getWeekdays(fixture.nativeElement)).toEqual([]);
  });

  it(`should allow cusotmizing the way weekdays are displayed (weekdays)`, () => {
    const fixture = createTestComponent(`<ngb-datepicker [startDate]="date" [weekdays]="weekdays"></ngb-datepicker>`);
    expect(getWeekdays(fixture.nativeElement)).toEqual(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);

    fixture.componentInstance.weekdays = false;
    fixture.detectChanges();
    expect(getWeekdays(fixture.nativeElement)).toEqual([]);

    fixture.componentInstance.weekdays = TranslationWidth.Narrow;
    fixture.detectChanges();
    expect(getWeekdays(fixture.nativeElement)).toEqual(['M', 'T', 'W', 'T', 'F', 'S', 'S']);
  });

  it(`should allow navigation work when startDate value changes`, () => {
    const fixture = createTestComponent(`<ngb-datepicker [startDate]="getDate()"></ngb-datepicker>`);

    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    const navigation = getNavigationLinks(fixture.nativeElement);

    // JUL 2016
    navigation[0].click();
    fixture.detectChanges();

    expect(getMonthSelect(fixture.nativeElement).value).toBe('7');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');
  });

  it('should allow infinite navigation when min/max dates are not set', () => {
    const fixture = createTestComponent(`<ngb-datepicker [startDate]="date"></ngb-datepicker>`);

    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.date = {year: 1066, month: 2};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('2');
    expect(getYearSelect(fixture.nativeElement).value).toBe('1066');

    fixture.componentInstance.date = {year: 3066, month: 5};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('3066');
  });

  it('should allow setting minDate separately', () => {
    const fixture = createTestComponent(`<ngb-datepicker [minDate]="minDate" [startDate]="date"></ngb-datepicker>`);

    fixture.componentInstance.minDate = {year: 2000, month: 5, day: 20};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.date = {year: 1000, month: 2};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2000');

    fixture.componentInstance.date = {year: 3000, month: 5};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('3000');
  });

  it('should allow setting maxDate separately', () => {
    const fixture = createTestComponent(`<ngb-datepicker [maxDate]="maxDate" [startDate]="date"></ngb-datepicker>`);

    fixture.componentInstance.maxDate = {year: 2050, month: 5, day: 20};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.date = {year: 3000, month: 2};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2050');

    fixture.componentInstance.date = {year: 1000, month: 5};
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('5');
    expect(getYearSelect(fixture.nativeElement).value).toBe('1000');
  });

  it('should handle minDate edge case values', () => {
    const fixture = createTestComponent(`<ngb-datepicker [minDate]="minDate" [startDate]="date"></ngb-datepicker>`);
    const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker)).injector.get(NgbDatepicker);

    function expectMinDate(year: number, month: number) {
      datepicker.navigateTo({year: 1000, month: 1});
      fixture.detectChanges();
      expect(getMonthSelect(fixture.nativeElement).value).toBe(`${month}`);
      expect(getYearSelect(fixture.nativeElement).value).toBe(`${year}`);
    }

    expectMinDate(2010, 1);

    // resetting
    fixture.componentInstance.minDate = <any>{};
    fixture.detectChanges();
    expectMinDate(1000, 1);

    // resetting
    fixture.componentInstance.minDate = <any>new Date();
    fixture.detectChanges();
    expectMinDate(1000, 1);

    // resetting
    fixture.componentInstance.minDate = new NgbDate(3000000, 1, 1);
    fixture.detectChanges();
    expectMinDate(1000, 1);

    // resetting
    fixture.componentInstance.minDate = <any>null;
    fixture.detectChanges();
    expectMinDate(1000, 1);

    // resetting
    fixture.componentInstance.minDate = <any>undefined;
    fixture.detectChanges();
    expectMinDate(1000, 1);
  });

  it('should handle maxDate edge case values', () => {
    const fixture = createTestComponent(`<ngb-datepicker [maxDate]="maxDate" [startDate]="date"></ngb-datepicker>`);
    const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker)).injector.get(NgbDatepicker);

    function expectMaxDate(year: number, month: number) {
      datepicker.navigateTo({year: 10000, month: 1});
      fixture.detectChanges();
      expect(getMonthSelect(fixture.nativeElement).value).toBe(`${month}`);
      expect(getYearSelect(fixture.nativeElement).value).toBe(`${year}`);
    }

    expectMaxDate(2020, 12);

    // resetting
    fixture.componentInstance.maxDate = <any>{};
    fixture.detectChanges();
    expectMaxDate(10000, 1);

    // resetting
    fixture.componentInstance.maxDate = <any>new Date();
    fixture.detectChanges();
    expectMaxDate(10000, 1);

    // resetting
    fixture.componentInstance.maxDate = new NgbDate(3000000, 1, 1);
    fixture.detectChanges();
    expectMaxDate(10000, 1);

    // resetting
    fixture.componentInstance.maxDate = <any>null;
    fixture.detectChanges();
    expectMaxDate(10000, 1);

    // resetting
    fixture.componentInstance.maxDate = <any>undefined;
    fixture.detectChanges();
    expectMaxDate(10000, 1);
  });

  it('should support disabling dates via min/max dates', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate"></ngb-datepicker>`);

    fixture.componentInstance.minDate = {year: 2016, month: 8, day: 20};
    fixture.componentInstance.maxDate = {year: 2016, month: 8, day: 25};
    fixture.detectChanges();

    // 19 AUG 2016
    expect(getDay(fixture.nativeElement, 18)).toHaveCssClass('text-muted');
    // 20 AUG 2016
    expect(getDay(fixture.nativeElement, 19)).not.toHaveCssClass('text-muted');
    // 25 AUG 2016
    expect(getDay(fixture.nativeElement, 24)).not.toHaveCssClass('text-muted');
    // 26 AUG 2016
    expect(getDay(fixture.nativeElement, 25)).toHaveCssClass('text-muted');
  });

  it('should support disabling dates via callback', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [markDisabled]="markDisabled"></ngb-datepicker>`);

    // 22 AUG 2016
    expect(getDay(fixture.nativeElement, 21)).toHaveCssClass('text-muted');
  });

  it('should support passing custom data to the day template', () => {
    const fixture = createTestComponent(`
      <ng-template #dt let-date="date" let-data="data"><div>{{ date.day }}{{ data }}</div></ng-template>
      <ngb-datepicker [startDate]="date" [dayTemplate]="dt" [dayTemplateData]="dayTemplateData"></ngb-datepicker>
    `);

    // 22 AUG 2016
    expect(getDay(fixture.nativeElement, 21).innerText).toBe('22!');
  });

  it('should display multiple months', () => {
    const fixture = createTestComponent(`<ngb-datepicker [displayMonths]="displayMonths"></ngb-datepicker>`);

    let months = fixture.debugElement.queryAll(By.directive(NgbDatepickerMonth));
    expect(months.length).toBe(1);

    fixture.componentInstance.displayMonths = 3;
    fixture.detectChanges();
    months = fixture.debugElement.queryAll(By.directive(NgbDatepickerMonth));
    expect(months.length).toBe(3);
  });

  it('should reuse DOM elements when changing month (single month display)', () => {
    const fixture = createTestComponent(`<ngb-datepicker [startDate]="date"></ngb-datepicker>`);

    // AUG 2016
    const oldDates = getDates(fixture.nativeElement);
    const navigation = getNavigationLinks(fixture.nativeElement);
    expect(oldDates[0].innerText.trim()).toBe('1');

    // JUL 2016
    navigation[0].click();
    fixture.detectChanges();

    const newDates = getDates(fixture.nativeElement);
    expect(newDates[0].innerText.trim()).toBe('27');

    expect(oldDates).toEqual(newDates);
  });

  it('should reuse DOM elements when changing month (multiple months display)', () => {
    const fixture = createTestComponent(`<ngb-datepicker [displayMonths]="2" [startDate]="date"></ngb-datepicker>`);

    // AUG 2016 and SEP 2016
    const oldDates = getDates(fixture.nativeElement);
    const oldAugDates = oldDates.slice(0, 42);
    const oldSepDates = oldDates.slice(42);

    const navigation = getNavigationLinks(fixture.nativeElement);
    expect(oldAugDates[0].innerText.trim()).toBe('1');
    expect(oldSepDates[3].innerText.trim()).toBe('1');

    // JUL 2016 and AUG 2016
    navigation[0].click();
    fixture.detectChanges();

    const newDates = getDates(fixture.nativeElement);
    const newJulDates = newDates.slice(0, 42);
    const newAugDates = newDates.slice(42);

    expect(newJulDates[0].innerText.trim()).toBe('27');
    expect(newAugDates[0].innerText.trim()).toBe('1');

    // DOM elements were reused:
    expect(newAugDates).toEqual(oldAugDates);
    expect(newJulDates).toEqual(oldSepDates);
  });

  it('should switch navigation types', () => {
    const fixture = createTestComponent(`<ngb-datepicker [navigation]="navigation"></ngb-datepicker>`);

    expect(fixture.debugElement.query(By.directive(NgbDatepickerNavigationSelect))).not.toBeNull();
    expect(fixture.debugElement.query(By.directive(NgbDatepickerNavigation))).not.toBeNull();

    fixture.componentInstance.navigation = 'arrows';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(NgbDatepickerNavigationSelect))).toBeNull();
    expect(fixture.debugElement.query(By.directive(NgbDatepickerNavigation))).not.toBeNull();

    fixture.componentInstance.navigation = 'none';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(NgbDatepickerNavigationSelect))).toBeNull();
    expect(fixture.debugElement.query(By.directive(NgbDatepickerNavigation))).toBeNull();
  });

  it('should toggle month names display for a single month', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker [startDate]="date" [displayMonths]="1" [navigation]="navigation"></ngb-datepicker>`);

    let months = fixture.debugElement.queryAll(By.css('.ngb-dp-month-name'));
    expect(months.length).toBe(0);

    fixture.componentInstance.navigation = 'arrows';
    fixture.detectChanges();
    months = fixture.debugElement.queryAll(By.css('.ngb-dp-month-name'));
    expect(months.length).toBe(1);
    expect(months.map(c => c.nativeElement.innerText.trim())).toEqual(['August 2016']);

    fixture.componentInstance.navigation = 'none';
    fixture.detectChanges();
    months = fixture.debugElement.queryAll(By.css('.ngb-dp-month-name'));
    expect(months.length).toBe(1);
    expect(months.map(c => c.nativeElement.innerText.trim())).toEqual(['August 2016']);
  });

  it('should always display month names for multiple months', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker [startDate]="date" [displayMonths]="3" [navigation]="navigation"></ngb-datepicker>`);

    let months = fixture.debugElement.queryAll(By.css('.ngb-dp-month-name'));
    expect(months.length).toBe(3);
    expect(months.map(c => c.nativeElement.innerText.trim())).toEqual([
      'August 2016', 'September 2016', 'October 2016'
    ]);

    fixture.componentInstance.navigation = 'arrows';
    fixture.detectChanges();
    months = fixture.debugElement.queryAll(By.css('.ngb-dp-month-name'));
    expect(months.length).toBe(3);
    expect(months.map(c => c.nativeElement.innerText.trim())).toEqual([
      'August 2016', 'September 2016', 'October 2016'
    ]);
  });

  it('should emit navigate event when startDate is defined', () => {
    TestBed.overrideComponent(
        TestComponent,
        {set: {template: `<ngb-datepicker [startDate]="date" (navigate)="onNavigate($event)"></ngb-datepicker>`}});
    const fixture = TestBed.createComponent(TestComponent);

    spyOn(fixture.componentInstance, 'onNavigate');
    fixture.detectChanges();

    expect(fixture.componentInstance.onNavigate)
        .toHaveBeenCalledWith({current: null, next: {year: 2016, month: 8}, preventDefault: jasmine.any(Function)});
  });

  it('should emit navigate event without startDate defined', () => {
    TestBed.overrideComponent(
        TestComponent, {set: {template: `<ngb-datepicker (navigate)="onNavigate($event)"></ngb-datepicker>`}});
    const fixture = TestBed.createComponent(TestComponent);
    const now = new Date();

    spyOn(fixture.componentInstance, 'onNavigate');
    fixture.detectChanges();

    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith({
      current: null,
      next: {year: now.getFullYear(), month: now.getMonth() + 1},
      preventDefault: jasmine.any(Function)
    });
  });

  it('should emit navigate event using built-in navigation arrows', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker [startDate]="date" (navigate)="onNavigate($event)"></ngb-datepicker>`);

    spyOn(fixture.componentInstance, 'onNavigate');
    const navigation = getNavigationLinks(fixture.nativeElement);

    // JUL 2016
    navigation[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith({
      current: {year: 2016, month: 8},
      next: {year: 2016, month: 7},
      preventDefault: jasmine.any(Function)
    });
  });

  it('should emit navigate event using navigateTo({date})', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker #dp [startDate]="date" (navigate)="onNavigate($event)"></ngb-datepicker>
       <button id="btn"(click)="dp.navigateTo({year: 2015, month: 6})"></button>`);

    spyOn(fixture.componentInstance, 'onNavigate');
    const button = fixture.nativeElement.querySelector('button#btn');
    button.click();

    fixture.detectChanges();
    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith({
      current: {year: 2016, month: 8},
      next: {year: 2015, month: 6},
      preventDefault: jasmine.any(Function)
    });
  });

  it('should prevent navigation when calling preventDefault()', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker #dp [startDate]="date" (navigate)="onPreventableNavigate($event)"></ngb-datepicker>
       <button id="btn" (click)="dp.navigateTo({year: 2015, month: 7})"></button>`);

    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');
    expect(getDay(fixture.nativeElement, 0).innerText).toBe('1');

    const button = fixture.nativeElement.querySelector('button#btn');
    button.click();
    fixture.detectChanges();

    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');
    expect(getDay(fixture.nativeElement, 0).innerText).toBe('1');
  });

  it('should not focus day initially', () => {
    const fixture = createTestComponent('<ngb-datepicker #dp [startDate]="date"></ngb-datepicker>');
    const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));
    expectFocusedDate(datepicker, new NgbDate(2016, 8, 1), false);
  });

  it('should remove focus day on blur', () => {
    const fixture =
        createTestComponent('<ngb-datepicker #dp [startDate]="date"></ngb-datepicker><input id="focusout" >');
    const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));

    // focus in
    focusDay();
    fixture.detectChanges();
    expectFocusedDate(datepicker, new NgbDate(2016, 8, 1), true);

    // focus out
    (document.querySelector('#focusout') as HTMLElement).focus();

    fixture.detectChanges();
    expectFocusedDate(datepicker, new NgbDate(2016, 8, 1), false);
    expectSelectedDate(datepicker, null);

  });

  it('should emit select event when select date', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker #dp [startDate]="date" (dateSelect)="onDateSelect($event)"></ngb-datepicker>`);

    spyOn(fixture.componentInstance, 'onDateSelect');
    let dates = getDates(fixture.nativeElement);
    dates[11].click();

    fixture.detectChanges();
    expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledTimes(1);
  });

  it('should emit select event twice when select same date twice', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker #dp [startDate]="date" (dateSelect)="onDateSelect($event)"></ngb-datepicker>`);

    spyOn(fixture.componentInstance, 'onDateSelect');
    let dates = getDates(fixture.nativeElement);

    dates[11].click();
    fixture.detectChanges();

    dates[11].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledTimes(2);
  });

  it('should emit select event twice when press enter key twice', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker #dp [startDate]="date" (dateSelect)="onDateSelect($event)"></ngb-datepicker>`);
    const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));

    spyOn(fixture.componentInstance, 'onDateSelect');

    focusDay();
    fixture.detectChanges();

    triggerKeyDown(getMonthContainer(datepicker), 13 /* enter */);
    fixture.detectChanges();

    triggerKeyDown(getMonthContainer(datepicker), 13 /* enter */);
    fixture.detectChanges();
    expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledTimes(2);
  });

  it('should emit select event twice when press space key twice', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker #dp [startDate]="date" (dateSelect)="onDateSelect($event)"></ngb-datepicker>`);
    const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));

    spyOn(fixture.componentInstance, 'onDateSelect');

    focusDay();
    fixture.detectChanges();

    triggerKeyDown(getMonthContainer(datepicker), 32 /* space */);
    fixture.detectChanges();

    triggerKeyDown(getMonthContainer(datepicker), 32 /* space */);
    fixture.detectChanges();
    expect(fixture.componentInstance.onDateSelect).toHaveBeenCalledTimes(2);
  });

  it('should insert an embedded view for footer when `footerTemplate` provided', () => {
    const fixture = createTestComponent(`<ngb-datepicker #dp [footerTemplate]="footerTemplate"></ngb-datepicker>
      <ng-template #footerTemplate><span id="myDatepickerFooter">My footer</span></ng-template>`);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#myDatepickerFooter')).not.toBeNull();
  });

  describe('ngModel', () => {

    it('should update model based on calendar clicks', () => {
      const fixture = createTestComponent(
          `<ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngb-datepicker>`);

      const dates = getDates(fixture.nativeElement);
      dates[0].click();  // 1 AUG 2016
      expect(fixture.componentInstance.model).toEqual({year: 2016, month: 8, day: 1});

      dates[1].click();
      expect(fixture.componentInstance.model).toEqual({year: 2016, month: 8, day: 2});
    });

    it('should not update model based on calendar clicks when disabled', fakeAsync(() => {
         const fixture = createTestComponent(
             `<ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model" [disabled]="true">
              </ngb-datepicker>`);

         tick();
         fixture.detectChanges();

         const dates = getDates(fixture.nativeElement);
         dates[0].click();  // 1 AUG 2016
         expect(fixture.componentInstance.model).toBeFalsy();

         dates[1].click();
         expect(fixture.componentInstance.model).toBeFalsy();
       }));

    it('select calendar date based on model updates', fakeAsync(() => {
         const fixture = createTestComponent(
             `<ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngb-datepicker>`);

         fixture.componentInstance.model = {year: 2016, month: 8, day: 1};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expect(getDay(fixture.nativeElement, 0)).toHaveCssClass('bg-primary');

         fixture.componentInstance.model = {year: 2016, month: 8, day: 2};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expect(getDay(fixture.nativeElement, 0)).not.toHaveCssClass('bg-primary');
         expect(getDay(fixture.nativeElement, 1)).toHaveCssClass('bg-primary');
       }));

    it('should switch month when clicked on the date outside of current month', fakeAsync(() => {
         const fixture = createTestComponent(
             `<ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngb-datepicker>`);
         fixture.detectChanges();
         tick();
         let dates = getDates(fixture.nativeElement);

         dates[31].click();  // 1 SEP 2016
         expect(fixture.componentInstance.model).toEqual({year: 2016, month: 9, day: 1});

         // month changes to SEP
         fixture.detectChanges();
         expect(getDay(fixture.nativeElement, 0).innerText).toBe('29');          // 29 AUG 2016
         expect(getDay(fixture.nativeElement, 3)).toHaveCssClass('bg-primary');  // 1 SEP still selected
       }));

    it('should switch month on prev/next navigation click', () => {
      const fixture = createTestComponent(
          `<ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngb-datepicker>`);

      let dates = getDates(fixture.nativeElement);
      const navigation = getNavigationLinks(fixture.nativeElement);

      dates[0].click();  // 1 AUG 2016
      expect(fixture.componentInstance.model).toEqual({year: 2016, month: 8, day: 1});

      // PREV
      navigation[0].click();
      fixture.detectChanges();
      dates = getDates(fixture.nativeElement);
      dates[4].click();  // 1 JUL 2016
      expect(fixture.componentInstance.model).toEqual({year: 2016, month: 7, day: 1});

      // NEXT
      navigation[1].click();
      fixture.detectChanges();
      dates = getDates(fixture.nativeElement);
      dates[0].click();  // 1 AUG 2016
      expect(fixture.componentInstance.model).toEqual({year: 2016, month: 8, day: 1});
    });

    it('should switch month using navigateTo({date})', () => {
      const fixture = createTestComponent(
          `<ngb-datepicker #dp [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model"></ngb-datepicker>
       <button id="btn" (click)="dp.navigateTo({year: 2015, month: 6})"></button>`);

      const button = fixture.nativeElement.querySelector('button#btn');
      button.click();

      fixture.detectChanges();
      expect(getMonthSelect(fixture.nativeElement).value).toBe('6');
      expect(getYearSelect(fixture.nativeElement).value).toBe('2015');

      const dates = getDates(fixture.nativeElement);
      dates[0].click();  // 1 JUN 2015
      expect(fixture.componentInstance.model).toEqual({year: 2015, month: 6, day: 1});
    });

    it('should switch to current month using navigateTo() without arguments', () => {
      const fixture = createTestComponent(`
        <ngb-datepicker #dp [startDate]="date"></ngb-datepicker>
        <button id="btn" (click)="dp.navigateTo()"></button>
      `);

      const button = fixture.nativeElement.querySelector('button#btn');
      button.click();

      fixture.detectChanges();
      const today = new Date();
      expect(getMonthSelect(fixture.nativeElement).value).toBe(`${today.getMonth() + 1}`);
      expect(getYearSelect(fixture.nativeElement).value).toBe(`${today.getFullYear()}`);
    });

    it('should support disabling all dates and navigation via the disabled attribute', fakeAsync(() => {
         const fixture = createTestComponent(
             `<ngb-datepicker [(ngModel)]="model" [startDate]="date" [disabled]="true"></ngb-datepicker>`);
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         for (let index = 0; index < 31; index++) {
           expect(getDay(fixture.nativeElement, index)).toHaveCssClass('text-muted');
         }

         const links = getNavigationLinks(fixture.nativeElement);
         expect(links[0].hasAttribute('disabled')).toBeTruthy();
         expect(links[1].hasAttribute('disabled')).toBeTruthy();
         expect(getYearSelect(fixture.nativeElement).disabled).toBeTruthy();
         expect(getMonthSelect(fixture.nativeElement).disabled).toBeTruthy();
       }));
  });

  describe('aria attributes', () => {
    const template = `<ngb-datepicker #dp
        [startDate]="date"></ngb-datepicker>
        `;

    it('should contains aria-label on the days', () => {
      const fixture = createTestComponent(template);

      const dates = getDates(fixture.nativeElement);

      dates.forEach(function(date) {
        expect(date.getAttribute('aria-label')).toBeDefined('Missing aria-label attribute on a day');
      });
    });
  });

  describe('keyboard navigation', () => {

    const template = `<ngb-datepicker #dp
        [startDate]="date" [minDate]="minDate"
        [maxDate]="maxDate" [displayMonths]="2"
        [markDisabled]="markDisabled"></ngb-datepicker>
        <input id="focusout">
        `;

    it('should move focus with arrow keys', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));

      // focus in
      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 40 /* down arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 8));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 39 /* right arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 9));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 38 /* up arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 2));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 37 /* left arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 1));
      expectSelectedDate(datepicker, null);
    });

    it('should select focused date with enter or space', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));

      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 32 /* space */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 1));
      expectSelectedDate(datepicker, new NgbDate(2016, 8, 1));

      triggerKeyDown(getMonthContainer(datepicker), 40 /* down arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 8));
      expectSelectedDate(datepicker, new NgbDate(2016, 8, 1));

      triggerKeyDown(getMonthContainer(datepicker), 13 /* enter */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 8));
      expectSelectedDate(datepicker, new NgbDate(2016, 8, 8));
    });

    it('should select first and last dates of the view with home/end', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));

      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 35 /* end */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 9, 30));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 36 /* home */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 1));
      expectSelectedDate(datepicker, null);
    });

    it('should select min and max dates with shift+home/end', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));

      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 35 /* end */, true /* shift */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2020, 12, 31));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 40 /* down arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2020, 12, 31));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 36 /* home */, true /* shift */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2010, 1, 1));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 38 /* up arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2010, 1, 1));
      expectSelectedDate(datepicker, null);
    });

    it('should navigate between months with pageUp/Down', () => {
      const fixture = createTestComponent(template);

      let datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));

      focusDay();

      triggerKeyDown(getMonthContainer(datepicker), 39 /* right arrow */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 2));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 33 /* page up */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 7, 2));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 34 /* page down */);
      fixture.detectChanges();
      expectFocusedDate(datepicker, new NgbDate(2016, 8, 2));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 34 /* page down */);
      fixture.detectChanges();

      expectFocusedDate(datepicker, new NgbDate(2016, 9, 2));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 34 /* page down */);
      fixture.detectChanges();
      datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));
      expectFocusedDate(datepicker, new NgbDate(2016, 10, 2));
      expectSelectedDate(datepicker, null);
    });

    it('should navigate between years with shift+pageUp/Down', () => {
      const fixture = createTestComponent(template);

      const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));
      focusDay();

      getMonthContainer(datepicker).triggerEventHandler('focus', {});
      fixture.detectChanges();

      expectFocusedDate(datepicker, new NgbDate(2016, 8, 1));
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 33 /* page up */, true /* shift */);
      fixture.detectChanges();

      expectFocusedDate(datepicker, new NgbDate(2015, 8, 1), true);
      expectSelectedDate(datepicker, null);

      triggerKeyDown(getMonthContainer(datepicker), 34 /* page down */, true /* shift */);
      fixture.detectChanges();

      expectFocusedDate(datepicker, new NgbDate(2016, 8, 1));
      expectSelectedDate(datepicker, null);
    });

    it(`shouldn't be focusable when disabled`, fakeAsync(() => {
         const fixture =
             createTestComponent(`<ngb-datepicker #dp [(ngModel)]="model" [disabled]="true"></ngb-datepicker>`);
         tick();
         fixture.detectChanges();

         const datepicker = fixture.debugElement.query(By.directive(NgbDatepicker));

         const days = getFocusableDays(datepicker);

         expect(days.length).toEqual(0, 'A focusable day has been found');

       }));
  });

  describe('forms', () => {

    it('should work with template-driven form validation', fakeAsync(() => {
         const fixture = createTestComponent(`
        <form>
          <ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model" name="date" required>
          </ngb-datepicker>
        </form>
      `);

         const compiled = fixture.nativeElement;
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expect(getDatepicker(compiled)).toHaveCssClass('ng-invalid');
         expect(getDatepicker(compiled)).not.toHaveCssClass('ng-valid');

         fixture.componentInstance.model = {year: 2016, month: 8, day: 1};
         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expect(getDatepicker(compiled)).toHaveCssClass('ng-valid');
         expect(getDatepicker(compiled)).not.toHaveCssClass('ng-invalid');
       }));

    it('should work with model-driven form validation', () => {
      const html = `
          <form [formGroup]="form">
            <ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" formControlName="control" required></ngb-datepicker>
          </form>`;

      const fixture = createTestComponent(html);
      const compiled = fixture.nativeElement;
      fixture.detectChanges();
      const dates = getDates(fixture.nativeElement);

      expect(getDatepicker(compiled)).toHaveCssClass('ng-invalid');
      expect(getDatepicker(compiled)).not.toHaveCssClass('ng-valid');

      dates[0].click();
      fixture.detectChanges();
      expect(getDatepicker(compiled)).toHaveCssClass('ng-valid');
      expect(getDatepicker(compiled)).not.toHaveCssClass('ng-invalid');
    });

    it('should be disabled with reactive forms', () => {
      const html = `<form [formGroup]="disabledForm">
            <ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" formControlName="control">
            </ngb-datepicker>
        </form>`;

      const fixture = createTestComponent(html);
      fixture.detectChanges();
      const dates = getDates(fixture.nativeElement);
      dates[0].click();  // 1 AUG 2016
      expect(fixture.componentInstance.disabledForm.controls['control'].value).toBeFalsy();
      for (let index = 0; index < 31; index++) {
        expect(getDay(fixture.nativeElement, index)).toHaveCssClass('text-muted');
      }
      expect(fixture.nativeElement.querySelector('ngb-datepicker').getAttribute('tabindex')).toBeFalsy();
    });

    it('should not change again the value in the model on a change coming from the model (template-driven form)',
       () => {
         const html = `<form>
             <ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="model" name="date">
             </ngb-datepicker>
           </form>`;

         const fixture = createTestComponent(html);
         fixture.detectChanges();

         const value = new NgbDate(2018, 7, 28);
         fixture.componentInstance.model = value;
         fixture.detectChanges();
         expect(fixture.componentInstance.model).toBe(value);
       });

    it('should not change again the value in the model on a change coming from the model (reactive form)', () => {
      const html = `<form [formGroup]="form">
             <ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate" formControlName="control">
             </ngb-datepicker>
           </form>`;

      const fixture = createTestComponent(html);

      const formChangeSpy = jasmine.createSpy('form change');
      const form = fixture.componentInstance.form;
      form.valueChanges.subscribe(formChangeSpy);

      const controlValue = new NgbDate(2018, 7, 28);
      form.setValue({control: controlValue});
      expect(formChangeSpy).toHaveBeenCalledTimes(1);
      expect(form.value.control).toBe(controlValue);
    });

  });

  describe('Custom config', () => {
    let config: NgbDatepickerConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [NgbDatepickerModule]}); });

    beforeEach(inject([NgbDatepickerConfig], (c: NgbDatepickerConfig) => {
      config = c;
      customizeConfig(config);
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(NgbDatepicker);

      const datepicker = fixture.componentInstance;
      expectSameValues(datepicker, config);
    });
  });

  describe('Custom config as provider', () => {
    const config = new NgbDatepickerConfig();
    customizeConfig(config);

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbDatepickerModule], providers: [{provide: NgbDatepickerConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(NgbDatepicker);

      const datepicker = fixture.componentInstance;
      expectSameValues(datepicker, config);
    });
  });

  describe('NgbDatepicker', () => {

    let mockState: NgbDatepickerState;
    let dp: NgbDatepicker;
    let mv: NgbDatepickerMonth;
    const mockKeyboardService: Partial<NgbDatepickerKeyboardService> = {
      processKey(event: KeyboardEvent, datepicker: NgbDatepicker) { mockState = datepicker.state; }
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NgbDatepickerModule],
        providers: [{provide: NgbDatepickerKeyboardService, useValue: mockKeyboardService}]
      });
      const fixture = createTestComponent(
          `<ngb-datepicker [startDate]="date" [minDate]="minDate" [maxDate]="maxDate"></ngb-datepicker>`);
      fixture.detectChanges();
      dp = <NgbDatepicker>fixture.debugElement.query(By.directive(NgbDatepicker)).componentInstance;
      mv = fixture.debugElement.query(By.css('ngb-datepicker-month')).injector.get(NgbDatepickerMonth);
    });

    it('should provide an defensive copy of minDate', () => {
      mv.onKeyDown(<KeyboardEvent>{});
      expect(mockState.firstDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 1}) !);
      expect(mockState.lastDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 31}) !);
      expect(mockState.minDate).toEqual(NgbDate.from({year: 2010, month: 1, day: 1}));
      expect(mockState.maxDate).toEqual(NgbDate.from({year: 2020, month: 12, day: 31}));
      Object.assign(mockState, {minDate: undefined});
      mv.onKeyDown(<KeyboardEvent>{});
      expect(dp.model.minDate).toEqual(NgbDate.from({year: 2010, month: 1, day: 1}));
    });

    it('should provide an defensive copy of maxDate', () => {
      mv.onKeyDown(<KeyboardEvent>{});
      expect(mockState.firstDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 1}) !);
      expect(mockState.lastDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 31}) !);
      expect(mockState.minDate).toEqual(NgbDate.from({year: 2010, month: 1, day: 1}));
      expect(mockState.maxDate).toEqual(NgbDate.from({year: 2020, month: 12, day: 31}));
      Object.assign(mockState, {maxDate: undefined});
      mv.onKeyDown(<KeyboardEvent>{});
      expect(dp.model.maxDate).toEqual(NgbDate.from({year: 2020, month: 12, day: 31}));
    });

    it('should provide an defensive copy of firstDate', () => {
      mv.onKeyDown(<KeyboardEvent>{});
      expect(mockState.firstDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 1}) !);
      expect(mockState.lastDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 31}) !);
      expect(mockState.minDate).toEqual(NgbDate.from({year: 2010, month: 1, day: 1}));
      expect(mockState.maxDate).toEqual(NgbDate.from({year: 2020, month: 12, day: 31}));
      Object.assign(mockState, {firstDate: undefined});
      mv.onKeyDown(<KeyboardEvent>{});
      expect(dp.model.firstDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 1}));
    });

    it('should provide an defensive copy of lastDate', () => {
      mv.onKeyDown(<KeyboardEvent>{});
      expect(mockState.firstDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 1}) !);
      expect(mockState.lastDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 31}) !);
      expect(mockState.minDate).toEqual(NgbDate.from({year: 2010, month: 1, day: 1}));
      expect(mockState.maxDate).toEqual(NgbDate.from({year: 2020, month: 12, day: 31}));
      Object.assign(mockState, {lastDate: undefined});
      mv.onKeyDown(<KeyboardEvent>{});
      expect(dp.model.lastDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 31}));
    });

    it('should provide an defensive copy of focusedDate', () => {
      mv.onKeyDown(<KeyboardEvent>{});
      expect(mockState.focusedDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 1}) !);
      Object.assign(mockState, {focusedDate: undefined});
      mv.onKeyDown(<KeyboardEvent>{});
      expect(dp.model.focusDate).toEqual(NgbDate.from({year: 2016, month: 8, day: 1}));
    });

    it('should prevent overriding of calendar', () => {
      try {
        (<any>dp)['calendar'] = null;
      } catch (e) {
      }
      expect(dp.calendar).toBeTruthy();
    });
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  date = {year: 2016, month: 8};
  displayMonths = 1;
  navigation = 'select';
  minDate: NgbDateStruct = {year: 2010, month: 1, day: 1};
  maxDate: NgbDateStruct = {year: 2020, month: 12, day: 31};
  form = new FormGroup({control: new FormControl('', Validators.required)});
  disabledForm = new FormGroup({control: new FormControl({value: null, disabled: true})});
  model;
  showWeekdays = true;
  weekdays: boolean | TranslationWidth = true;
  dayTemplateData = () => '!';
  markDisabled = (date: NgbDateStruct) => { return NgbDate.from(date) !.equals(new NgbDate(2016, 8, 22)); };
  onNavigate = (event) => {};
  onDateSelect = () => {};
  getDate = () => ({year: 2016, month: 8});
  onPreventableNavigate = (event: NgbDatepickerNavigateEvent) => event.preventDefault();
}
