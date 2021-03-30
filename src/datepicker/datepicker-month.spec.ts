import {TestBed, ComponentFixture} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component, Injectable} from '@angular/core';

import {NgbDatepickerModule} from './datepicker.module';
import {NgbDatepicker, NgbDatepickerContent} from './datepicker';
import {NgbDatepickerKeyboardService} from './datepicker-keyboard-service';
import {NgbDatepickerService} from './datepicker-service';
import {NgbDatepickerMonth} from './datepicker-month';
import {NgbDate} from './ngb-date';
import {NgbDateStruct} from './ngb-date-struct';
import {NgbDatepickerDayView} from './datepicker-day-view';

const createTestComponent = () => createGenericTestComponent(
    `
  <ngb-datepicker #dp
                  [dayTemplate]="dt"
                  [showWeekdays]="showWeekdays"
                  [showWeekNumbers]="showWeekNumbers"
                  [outsideDays]="outsideDays"
                  (dateSelect)="onClick($event)">
    <ng-template #dt let-date="date">{{ date.day }}</ng-template>
  </ngb-datepicker>
`,
    TestComponent) as ComponentFixture<TestComponent>;

function getWeekNumbers(element: HTMLElement): HTMLElement[] {
  return <HTMLElement[]>Array.from(element.querySelectorAll('.ngb-dp-week-number'));
}

function getDates(element: HTMLElement): HTMLElement[] {
  return <HTMLElement[]>Array.from(element.querySelectorAll('.ngb-dp-day'));
}

function getWeekLabel(element: HTMLElement): HTMLElement | null {
  return element.querySelector('.ngb-dp-showweek');
}

function expectWeekNumbers(element: HTMLElement, weeknumbers: string[]) {
  const result = getWeekNumbers(element).map(td => td.innerText.trim());
  expect(result).toEqual(weeknumbers);
}

function expectDates(element: HTMLElement, dates: string[]) {
  const result = getDates(element).map(td => td.innerText.trim());
  expect(result).toEqual(dates);
}

function expectWeekLabel(element: HTMLElement, weekLabel: string) {
  const weekLabelElement = getWeekLabel(element);
  const result = weekLabelElement ? weekLabelElement.innerText.trim() : '';
  expect(result).toEqual(weekLabel);
}

@Injectable()
class MockDatepickerService extends NgbDatepickerService {
  getMonth(struct: NgbDateStruct) {
    return {
      firstDate: new NgbDate(2016, 8, 1),
      lastDate: new NgbDate(2016, 8, 31),
      year: 2016,
      number: 8,
      weekdays: ['Mo', 'Tu'],
      weeks: [
        // month: 7, 8
        {
          number: 1,
          days: [
            {
              date: new NgbDate(2016, 7, 4),
              context: {
                currentMonth: 8,
                currentYear: 2016,
                $implicit: new NgbDate(2016, 7, 4),
                date: new NgbDate(2016, 7, 4),
                disabled: false,
                focused: false,
                selected: false,
                today: false
              },
              tabindex: -1,
              ariaLabel: 'Monday',
              hidden: true
            },
            {
              date: new NgbDate(2016, 8, 1),
              context: {
                currentMonth: 8,
                currentYear: 2016,
                $implicit: new NgbDate(2016, 8, 1),
                date: new NgbDate(2016, 8, 1),
                disabled: false,
                focused: false,
                selected: false,
                today: false
              },
              tabindex: -1,
              ariaLabel: 'Monday',
              hidden: false
            }
          ],
          collapsed: false
        },
        // month: 8, 8
        {
          number: 2,
          days: [
            {
              date: new NgbDate(2016, 8, 2),
              context: {
                currentMonth: 8,
                currentYear: 2016,
                $implicit: new NgbDate(2016, 8, 2),
                date: new NgbDate(2016, 8, 2),
                disabled: true,
                focused: false,
                selected: false,
                today: true
              },
              tabindex: -1,
              ariaLabel: 'Friday',
              hidden: false
            },
            {
              date: new NgbDate(2016, 8, 3),
              context: {
                currentMonth: 8,
                currentYear: 2016,
                $implicit: new NgbDate(2016, 8, 3),
                date: new NgbDate(2016, 8, 3),
                disabled: false,
                focused: false,
                selected: false,
                today: false
              },
              tabindex: -1,
              ariaLabel: 'Saturday',
              hidden: false
            }
          ],
          collapsed: false
        },
        // month: 8, 9
        {
          number: 3,
          days: [
            {
              date: new NgbDate(2016, 8, 4),
              context: {
                currentMonth: 8,
                currentYear: 2016,
                $implicit: new NgbDate(2016, 8, 4),
                date: new NgbDate(2016, 8, 4),
                disabled: false,
                focused: false,
                selected: false,
                today: false
              },
              tabindex: -1,
              ariaLabel: 'Sunday',
              hidden: false
            },
            {
              date: new NgbDate(2016, 9, 1),
              context: {
                currentMonth: 8,
                currentYear: 2016,
                $implicit: new NgbDate(2016, 9, 1),
                date: new NgbDate(2016, 9, 1),
                disabled: false,
                focused: false,
                selected: false,
                today: false
              },
              tabindex: -1,
              ariaLabel: 'Saturday',
              hidden: true
            }
          ],
          collapsed: false
        },
        // month: 9, 9 -> to collapse
        {
          number: 4,
          days: [
            {
              date: new NgbDate(2016, 9, 2),
              context: {
                currentMonth: 8,
                currentYear: 2016,
                $implicit: new NgbDate(2016, 9, 2),
                date: new NgbDate(2016, 9, 2),
                disabled: false,
                focused: false,
                selected: false,
                today: false
              },
              tabindex: -1,
              ariaLabel: 'Sunday',
              hidden: true
            },
            {
              date: new NgbDate(2016, 9, 3),
              context: {
                currentMonth: 8,
                currentYear: 2016,
                $implicit: new NgbDate(2016, 9, 3),
                date: new NgbDate(2016, 9, 3),
                disabled: false,
                focused: false,
                selected: false,
                today: false
              },
              tabindex: -1,
              ariaLabel: 'Monday',
              hidden: true
            }
          ],
          collapsed: true
        }
      ]
    };
  }
}

describe('ngb-datepicker-month', () => {

  beforeEach(() => {
    TestBed.overrideModule(
        NgbDatepickerModule,
        {set: {exports: [NgbDatepicker, NgbDatepickerContent, NgbDatepickerMonth, NgbDatepickerDayView]}});
    TestBed.overrideComponent(NgbDatepicker, {
      add: {
        providers: [{provide: NgbDatepickerService, useClass: MockDatepickerService}, NgbDatepickerKeyboardService]
      }
    });
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NgbDatepickerModule],
      providers: [{provide: NgbDatepickerService, useClass: MockDatepickerService}]
    });
  });

  it('should show/hide week numbers', () => {
    const fixture = createTestComponent();

    expectWeekNumbers(fixture.nativeElement, ['1', '2', '3']);
    expectWeekLabel(fixture.nativeElement, '');

    fixture.componentInstance.showWeekNumbers = false;
    fixture.detectChanges();

    expectWeekNumbers(fixture.nativeElement, []);
    expectWeekLabel(fixture.nativeElement, '');
  });

  it('should use custom template to display dates', () => {
    const fixture = createTestComponent();
    expectDates(fixture.nativeElement, ['', '1', '2', '3', '4', '']);
  });

  it('should use "date" as an implicit value for the template', () => {
    const fixture = createTestComponent();
    expectDates(fixture.nativeElement, ['', '1', '2', '3', '4', '']);
  });

  it('should send date selection events', () => {
    const fixture = createTestComponent();

    spyOn(fixture.componentInstance, 'onClick');

    const dates = getDates(fixture.nativeElement);
    dates[1].click();

    expect(fixture.componentInstance.onClick).toHaveBeenCalledWith(new NgbDate(2016, 8, 1));
  });

  it('should not send date selection events for hidden and disabled dates', () => {
    const fixture = createTestComponent();

    spyOn(fixture.componentInstance, 'onClick');

    const dates = getDates(fixture.nativeElement);
    dates[0].click();  // hidden
    dates[2].click();  // disabled

    expect(fixture.componentInstance.onClick).not.toHaveBeenCalled();
  });

  it('should set cursor to pointer or default', () => {
    const fixture = createTestComponent();

    const dates = getDates(fixture.nativeElement);
    // hidden
    expect(window.getComputedStyle(dates[0]).getPropertyValue('cursor')).toBe('default');
    // normal
    expect(window.getComputedStyle(dates[1]).getPropertyValue('cursor')).toBe('pointer');
    // disabled
    expect(window.getComputedStyle(dates[2]).getPropertyValue('cursor')).toBe('default');
  });

  it('should apply correct CSS classes to days', () => {
    const fixture = createTestComponent();

    let dates = getDates(fixture.nativeElement);
    // hidden
    expect(dates[0]).toHaveCssClass('hidden');
    expect(dates[0]).not.toHaveCssClass('disabled');
    expect(dates[0]).not.toHaveCssClass('ngb-dp-today');
    // normal
    expect(dates[1]).not.toHaveCssClass('hidden');
    expect(dates[1]).not.toHaveCssClass('disabled');
    expect(dates[1]).not.toHaveCssClass('ngb-dp-today');
    // disabled
    expect(dates[2]).not.toHaveCssClass('hidden');
    expect(dates[2]).toHaveCssClass('disabled');
    expect(dates[2]).toHaveCssClass('ngb-dp-today');
  });

  it('should not display collapsed weeks', () => {
    const fixture = createTestComponent();

    expectDates(fixture.nativeElement, ['', '1', '2', '3', '4', '']);
  });

  it('should add correct aria-label attribute', () => {
    const fixture = createTestComponent();

    let dates = getDates(fixture.nativeElement);
    expect(dates[0].getAttribute('aria-label')).toBe('Monday');
  });

  it('should render custom month layout', () => {
    const fixture = createGenericTestComponent(
        `
      <ngb-datepicker #dp
                      [showWeekdays]="showWeekdays"
                      [showWeekNumbers]="showWeekNumbers"
                      [outsideDays]="outsideDays"
                      (select)="onClick($event)">
        <ng-template ngbDatepickerContent>
          <ngb-datepicker-month [month]="{month: 8, year: 2016}"></ngb-datepicker-month>
        </ng-template>
      </ngb-datepicker>`,
        TestComponent) as ComponentFixture<TestComponent>;
    expectDates(fixture.nativeElement, ['', '1', '2', '3', '4', '']);
  });

  it('should render custom month template', () => {
    const fixture = createGenericTestComponent(
        `
      <ngb-datepicker #dp
                      [showWeekdays]="showWeekdays"
                      [showWeekNumbers]="showWeekNumbers"
                      [outsideDays]="outsideDays"
                      (select)="onClick($event)">
        <ng-template ngbDatepickerContent><div class="customClass">Custom Content</div></ng-template>
      </ngb-datepicker>
    `,
        TestComponent) as ComponentFixture<TestComponent>;
    expectDates(fixture.nativeElement, []);
    expect(fixture.nativeElement.querySelectorAll('.customClass').length).toEqual(1);
    expect(fixture.nativeElement.querySelectorAll('.customClass')[0].innerText.trim()).toEqual('Custom Content');
  });

  it('should handle keyboard events with custom month template', () => {
    const fixture = createGenericTestComponent(
        `
      <ngb-datepicker #dp
                      [showWeekdays]="showWeekdays"
                      [showWeekNumbers]="showWeekNumbers"
                      [outsideDays]="outsideDays"
                      (select)="onClick($event)">
        <ng-template ngbDatepickerContent><div class="customClass">Custom Content</div></ng-template>
      </ngb-datepicker>
    `,
        TestComponent) as ComponentFixture<TestComponent>;
    expectDates(fixture.nativeElement, []);
    expect(fixture.nativeElement.querySelectorAll('.customClass').length).toEqual(1);
    expect(fixture.nativeElement.querySelectorAll('.customClass')[0].innerText.trim()).toEqual('Custom Content');
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  showWeekdays = true;
  showWeekNumbers = true;
  outsideDays = 'visible';

  onClick = (event) => {};
}
