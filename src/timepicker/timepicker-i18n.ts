import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {FormStyle, getLocaleDayPeriods, TranslationWidth} from '@angular/common';

export function NGB_TIMEPICKER_I18N_FACTORY(locale) {
  return new NgbTimepickerI18nDefault(locale);
}

/**
 * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 */
@Injectable({providedIn: 'root', useFactory: NGB_TIMEPICKER_I18N_FACTORY, deps: [LOCALE_ID]})
export abstract class NgbTimepickerI18n {
  /**
   * Returns the name for the period before midday.
   */
  abstract getMorningPeriod(): string;

  /**
   * Returns the name for the period after midday.
   */
  abstract getAfternoonPeriod(): string;
}

@Injectable()
export class NgbTimepickerI18nDefault extends NgbTimepickerI18n {
  private _periods: Readonly<[string, string]>;

  constructor(@Inject(LOCALE_ID) locale: string) {
    super();

    this._periods = getLocaleDayPeriods(locale, FormStyle.Standalone, TranslationWidth.Narrow);
  }

  getMorningPeriod(): string { return this._periods[0]; }

  getAfternoonPeriod(): string { return this._periods[1]; }
}
