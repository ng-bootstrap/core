import {Injectable} from '@angular/core';
import {NgbDateStruct} from '../ngb-date-struct';
import {NgbDateNativeAdapter} from './ngb-date-native-adapter';

/**
 * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
 *
 * @since 3.2.0
 */
@Injectable()
export class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
  protected _fromNativeDate(date: Date): NgbDateStruct {
    return {year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate()};
  }

  protected _toNativeDate(date: NgbDateStruct): Date {
    const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
    // avoid 30 -> 1930 conversion
    jsDate.setUTCFullYear(date.year);
    return jsDate;
  }
}
