import {Injectable} from '@angular/core';
import {NgbTimeStruct} from './ngb-time-struct';
import {isInteger} from '../util/util';

export function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
  return new NgbTimeStructAdapter();
}

/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
@Injectable({providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY})
export abstract class NgbTimeAdapter<T> {
  /**
   * Converts a user-model time of type `T` to an `NgbTimeStruct` for internal use.
   */
  abstract fromModel(value: T | null): NgbTimeStruct | null;

  /**
   * Converts an internal `NgbTimeStruct` time to a user-model time of type `T`.
   */
  abstract toModel(time: NgbTimeStruct | null): T | null;
}

@Injectable()
export class NgbTimeStructAdapter extends NgbTimeAdapter<NgbTimeStruct> {
  /**
   * Converts a NgbTimeStruct value into NgbTimeStruct value
   */
  fromModel(time: NgbTimeStruct | null): NgbTimeStruct | null {
    return (time && isInteger(time.hour) && isInteger(time.minute)) ?
        {hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : <any>null} :
        null;
  }

  /**
   * Converts a NgbTimeStruct value into NgbTimeStruct value
   */
  toModel(time: NgbTimeStruct | null): NgbTimeStruct | null {
    return (time && isInteger(time.hour) && isInteger(time.minute)) ?
        {hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : <any>null} :
        null;
  }
}
