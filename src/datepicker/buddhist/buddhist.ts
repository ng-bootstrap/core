import {NgbDate} from '../ngb-date';

/**
 * Returns the equivalent JS date value for a give input Buddhist date.
 * `date` is an Buddhist date to be converted to Gregorian.
 */
export function toGregorian(date: NgbDate): Date {
  return new Date(date.year - 543, date.month - 1, date.day);
}

/**
 * Returns the equivalent Buddhist date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to Buddhist.
 * utc to local
 */
export function fromGregorian(gdate: Date): NgbDate {
  return new NgbDate(gdate.getFullYear() + 543, gdate.getMonth() + 1, gdate.getDate());
}
