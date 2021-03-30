import {NgbTimepickerI18nDefault} from './timepicker-i18n';
import {TestBed} from '@angular/core/testing';

describe('ngb-timepicker-i18n-default', () => {

  let i18n: NgbTimepickerI18nDefault;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [NgbTimepickerI18nDefault]});
    i18n = TestBed.inject(NgbTimepickerI18nDefault);
  });

  it('should return morning period', () => { expect(i18n.getMorningPeriod()).toBe('AM'); });

  it('should return afternoon period', () => { expect(i18n.getAfternoonPeriod()).toBe('PM'); });
});
