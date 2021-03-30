import {TestBed, ComponentFixture} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';
import {getMonthSelect, getYearSelect} from '../test/datepicker/common';

import {Component} from '@angular/core';

import {NgbDatepickerModule} from './datepicker.module';
import {NgbDatepickerNavigationSelect} from './datepicker-navigation-select';
import {NgbDate} from './ngb-date';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const getOptions = (element: HTMLSelectElement): HTMLOptionElement[] => Array.from(element.options);
const getOptionValues = (element: HTMLSelectElement): string[] => getOptions(element).map(x => x.value);

function changeSelect(element: HTMLSelectElement, value: string) {
  element.value = value;
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('change', true, true);
  element.dispatchEvent(evt);
}

describe('ngb-datepicker-navigation-select', () => {

  beforeEach(() => {
    TestBed.overrideModule(NgbDatepickerModule, {set: {exports: [NgbDatepickerNavigationSelect]}});
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbDatepickerModule]});
  });

  it('should generate month options correctly', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [months]="months" [years]="years">`);
    expect(getOptionValues(getMonthSelect(fixture.nativeElement))).toEqual([
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
    ]);

    fixture.componentInstance.months = [1, 2, 3];
    fixture.detectChanges();
    expect(getOptionValues(getMonthSelect(fixture.nativeElement))).toEqual(['1', '2', '3']);
  });

  it('should generate year options correctly', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [months]="months" [years]="years">`);

    const yearSelect = getYearSelect(fixture.nativeElement);
    expect(getOptionValues(yearSelect)).toEqual(['2015', '2016', '2017']);

    fixture.componentInstance.years = [2001, 2002, 2003];
    fixture.detectChanges();
    expect(getOptionValues(yearSelect)).toEqual(['2001', '2002', '2003']);
  });

  it('should send date selection events', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker-navigation-select [date]="date" [months]="months" [years]="years" (select)="onSelect($event)">`);

    const monthSelect = getMonthSelect(fixture.nativeElement);
    const yearSelect = getYearSelect(fixture.nativeElement);
    spyOn(fixture.componentInstance, 'onSelect');

    changeSelect(monthSelect, '2');
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledWith(new NgbDate(2016, 2, 1));

    changeSelect(monthSelect, '10');
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledWith(new NgbDate(2016, 10, 1));

    changeSelect(yearSelect, '2017');
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledWith(new NgbDate(2017, 8, 1));

    // out of range
    changeSelect(yearSelect, '2000');
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledWith(new NgbDate(NaN, 8, 1));
  });

  it('should select months and years when date changes', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [months]="months" [years]="years">`);

    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.date = new NgbDate(2017, 9, 22);
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('9');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2017');

    // out of range
    fixture.componentInstance.date = new NgbDate(2222, 22, 22);
    fixture.detectChanges();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('');
    expect(getYearSelect(fixture.nativeElement).value).toBe('');
  });

  it('should have disabled select boxes when disabled', () => {
    const fixture = createTestComponent(
        `<ngb-datepicker-navigation-select [disabled]="true" [date]="date" [months]="months" [years]="years">`);

    expect(getMonthSelect(fixture.nativeElement).disabled).toBe(true);
    expect(getYearSelect(fixture.nativeElement).disabled).toBe(true);
  });

  it('should have correct aria attributes on select options', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [months]="[7, 8, 9]" [years]="years">`);

    getOptions(getMonthSelect(fixture.nativeElement)).forEach((option, index) => {
      expect(option.getAttribute('aria-label')).toBe(fixture.componentInstance.ariaMonths[index]);
    });
  });

  it('should have correct aria attributes on select elements', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [months]="[7, 8, 9]" [years]="years">`);

    expect(getMonthSelect(fixture.nativeElement).getAttribute('aria-label')).toBe('Select month');
    expect(getYearSelect(fixture.nativeElement).getAttribute('aria-label')).toBe('Select year');

  });

  it('should have correct title attributes on select elements', () => {
    const fixture =
        createTestComponent(`<ngb-datepicker-navigation-select [date]="date" [months]="[7, 8, 9]" [years]="years">`);

    expect(getMonthSelect(fixture.nativeElement).getAttribute('title')).toBe('Select month');
    expect(getYearSelect(fixture.nativeElement).getAttribute('title')).toBe('Select year');

  });

});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  date = new NgbDate(2016, 8, 22);
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ariaMonths = ['July', 'August', 'September'];
  years = [2015, 2016, 2017];

  onSelect = (event) => {};
}
