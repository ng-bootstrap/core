import {Injectable} from '@angular/core';
import {NgbDateStruct} from '../ngb-date-struct';
import {isInteger} from '../../util/util';

export function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
  return new NgbDateStructAdapter();
}

/**
 * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
 * any provided user date model `D`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding datepicker to a form control,
 * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
 *
 * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details
 * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
 */
@Injectable({providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY})
export abstract class NgbDateAdapter<D> {
  /**
   * Converts a user-model date of type `D` to an `NgbDateStruct` for internal use.
   */
  abstract fromModel(value: D | null): NgbDateStruct | null;

  /**
   * Converts an internal `NgbDateStruct` date to a user-model date of type `D`.
   */
  abstract toModel(date: NgbDateStruct | null): D | null;
}

@Injectable()
export class NgbDateStructAdapter extends NgbDateAdapter<NgbDateStruct> {
  /**
   * Converts a NgbDateStruct value into NgbDateStruct value
   */
  fromModel(date: NgbDateStruct | null): NgbDateStruct | null {
    return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
        {year: date.year, month: date.month, day: date.day} :
        null;
  }

  /**
   * Converts a NgbDateStruct value into NgbDateStruct value
   */
  toModel(date: NgbDateStruct | null): NgbDateStruct | null {
    return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
        {year: date.year, month: date.month, day: date.day} :
        null;
  }
}
