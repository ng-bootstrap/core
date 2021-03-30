import {NgbDate} from './ngb-date';
import {Injectable} from '@angular/core';
import {isInteger} from '../util/util';

export function fromJSDate(jsDate: Date) {
  return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
export function toJSDate(date: NgbDate) {
  const jsDate = new Date(date.year, date.month - 1, date.day, 12);
  // this is done avoid 30 -> 1930 conversion
  if (!isNaN(jsDate.getTime())) {
    jsDate.setFullYear(date.year);
  }
  return jsDate;
}

export type NgbPeriod = 'y' | 'm' | 'd';

export function NGB_DATEPICKER_CALENDAR_FACTORY() {
  return new NgbCalendarGregorian();
}

/**
 * A service that represents the calendar used by the datepicker.
 *
 * The default implementation uses the Gregorian calendar. You can inject it in your own
 * implementations if necessary to simplify `NgbDate` calculations.
 */
@Injectable({providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY})
export abstract class NgbCalendar {
  /**
   * Returns the number of days per week.
   */
  abstract getDaysPerWeek(): number;

  /**
   * Returns an array of months per year.
   *
   * With default calendar we use ISO 8601 and return [1, 2, ..., 12];
   */
  abstract getMonths(year?: number): number[];

  /**
   * Returns the number of weeks per month.
   */
  abstract getWeeksPerMonth(): number;

  /**
   * Returns the weekday number for a given day.
   *
   * With the default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
   */
  abstract getWeekday(date: NgbDate): number;

  /**
   * Adds a number of years, months or days to a given date.
   *
   * * `period` can be `y`, `m` or `d` and defaults to day.
   * * `number` defaults to 1.
   *
   * Always returns a new date.
   */
  abstract getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;

  /**
   * Subtracts a number of years, months or days from a given date.
   *
   * * `period` can be `y`, `m` or `d` and defaults to day.
   * * `number` defaults to 1.
   *
   * Always returns a new date.
   */
  abstract getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;

  /**
   * Returns the week number for a given week.
   */
  abstract getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;

  /**
   * Returns the today's date.
   */
  abstract getToday(): NgbDate;

  /**
   * Checks if a date is valid in the current calendar.
   */
  abstract isValid(date?: NgbDate | null): boolean;
}

@Injectable()
export class NgbCalendarGregorian extends NgbCalendar {
  getDaysPerWeek() { return 7; }

  getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }

  getWeeksPerMonth() { return 6; }

  getNext(date: NgbDate, period: NgbPeriod = 'd', number = 1) {
    let jsDate = toJSDate(date);
    let checkMonth = true;
    let expectedMonth = jsDate.getMonth();

    switch (period) {
      case 'y':
        jsDate.setFullYear(jsDate.getFullYear() + number);
        break;
      case 'm':
        expectedMonth += number;
        jsDate.setMonth(expectedMonth);
        expectedMonth = expectedMonth % 12;
        if (expectedMonth < 0) {
          expectedMonth = expectedMonth + 12;
        }
        break;
      case 'd':
        jsDate.setDate(jsDate.getDate() + number);
        checkMonth = false;
        break;
      default:
        return date;
    }

    if (checkMonth && jsDate.getMonth() !== expectedMonth) {
      // this means the destination month has less days than the initial month
      // let's go back to the end of the previous month:
      jsDate.setDate(0);
    }

    return fromJSDate(jsDate);
  }

  getPrev(date: NgbDate, period: NgbPeriod = 'd', number = 1) { return this.getNext(date, period, -number); }

  getWeekday(date: NgbDate) {
    let jsDate = toJSDate(date);
    let day = jsDate.getDay();
    // in JS Date Sun=0, in ISO 8601 Sun=7
    return day === 0 ? 7 : day;
  }

  getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number) {
    // in JS Date Sun=0, in ISO 8601 Sun=7
    if (firstDayOfWeek === 7) {
      firstDayOfWeek = 0;
    }

    const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
    let date = week[thursdayIndex];

    const jsDate = toJSDate(date);
    jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));  // Thursday
    const time = jsDate.getTime();
    jsDate.setMonth(0);  // Compare with Jan 1
    jsDate.setDate(1);
    return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
  }

  getToday(): NgbDate { return fromJSDate(new Date()); }

  isValid(date?: NgbDate | null): boolean {
    if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
      return false;
    }

    // year 0 doesn't exist in Gregorian calendar
    if (date.year === 0) {
      return false;
    }

    const jsDate = toJSDate(date);

    return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
        jsDate.getDate() === date.day;
  }
}
