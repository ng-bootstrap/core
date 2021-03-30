import {TestBed} from '@angular/core/testing';
import {NgbDate} from '../ngb-date';
import {NgbDatepickerI18nHebrew} from './datepicker-i18n-hebrew';

describe('datepicker-i18n-hebrew', () => {

  let i18n: NgbDatepickerI18nHebrew;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [NgbDatepickerI18nHebrew]});
    i18n = TestBed.inject(NgbDatepickerI18nHebrew);
  });

  it('should return abbreviated month name', () => {
    expect(i18n.getMonthShortName(0, 5778)).toBe('');
    expect(i18n.getMonthShortName(1, 5778)).toBe('תשרי');
    expect(i18n.getMonthShortName(6, 5778)).toBe('אדר');
    expect(i18n.getMonthShortName(7, 5778)).toBe('ניסן');
    expect(i18n.getMonthShortName(12, 5778)).toBe('אלול');
    expect(i18n.getMonthShortName(13, 5778)).toBe('');
  });

  it('should return abbreviated month name (leap year)', () => {
    expect(i18n.getMonthShortName(0, 5779)).toBe('');
    expect(i18n.getMonthShortName(1, 5779)).toBe('תשרי');
    expect(i18n.getMonthShortName(6, 5779)).toBe('אדר א׳');
    expect(i18n.getMonthShortName(7, 5779)).toBe('אדר ב׳');
    expect(i18n.getMonthShortName(12, 5779)).toBe('אב');
    expect(i18n.getMonthShortName(13, 5779)).toBe('אלול');
    expect(i18n.getMonthShortName(14, 5779)).toBe('');
  });

  it('should return wide month name', () => {
    expect(i18n.getMonthFullName(0, 5778)).toBe('');
    expect(i18n.getMonthFullName(1, 5778)).toBe('תשרי');
    expect(i18n.getMonthFullName(6, 5778)).toBe('אדר');
    expect(i18n.getMonthFullName(7, 5778)).toBe('ניסן');
    expect(i18n.getMonthFullName(12, 5778)).toBe('אלול');
    expect(i18n.getMonthFullName(13, 5778)).toBe('');
  });

  it('should return wide month name (leap year)', () => {
    expect(i18n.getMonthFullName(0, 5779)).toBe('');
    expect(i18n.getMonthFullName(1, 5779)).toBe('תשרי');
    expect(i18n.getMonthFullName(6, 5779)).toBe('אדר א׳');
    expect(i18n.getMonthFullName(7, 5779)).toBe('אדר ב׳');
    expect(i18n.getMonthFullName(12, 5779)).toBe('אב');
    expect(i18n.getMonthFullName(13, 5779)).toBe('אלול');
    expect(i18n.getMonthFullName(14, 5779)).toBe('');
  });

  it('should return weekday name', () => {
    expect(i18n.getWeekdayShortName(0)).toBe('');
    expect(i18n.getWeekdayShortName(1)).toBe('שני');
    expect(i18n.getWeekdayShortName(7)).toBe('ראשון');
    expect(i18n.getWeekdayShortName(8)).toBe('');
  });

  it('should generate aria label for a date',
     () => { expect(i18n.getDayAriaLabel(new NgbDate(5778, 10, 8))).toBe('ח׳ תמוז תשע״ח'); });

  it('should generate week number numerals', () => {
    expect(i18n.getWeekNumerals(1)).toBe('א׳');
    expect(i18n.getWeekNumerals(50)).toBe('נ׳');
  });

  it('should generate day numerals', () => {
    expect(i18n.getDayNumerals(new NgbDate(5778, 10, 1))).toBe('א׳');
    expect(i18n.getDayNumerals(new NgbDate(5778, 10, 29))).toBe('כ״ט');
  });

  it('should generate year numerals', () => {
    expect(i18n.getYearNumerals(0)).toBe('');
    expect(i18n.getYearNumerals(5778)).toBe('תשע״ח');
  });
});
