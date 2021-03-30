import {Injectable} from '@angular/core';
import {isInteger} from '../../util/util';
import {NgbCalendarGregorian, NgbPeriod} from '../ngb-calendar';
import {NgbDate} from '../ngb-date';
import {fromGregorian, toGregorian} from './buddhist';

/**
 * @since 9.1.0
 */
@Injectable()
export class NgbCalendarBuddhist extends NgbCalendarGregorian {
  getToday(): NgbDate { return fromGregorian(new Date()); }

  getNext(date: NgbDate, period: NgbPeriod = 'd', number = 1) {
    let jsDate = toGregorian(date);
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

    return fromGregorian(jsDate);
  }

  getPrev(date: NgbDate, period: NgbPeriod = 'd', number = 1) { return this.getNext(date, period, -number); }

  getWeekday(date: NgbDate) {
    let jsDate = toGregorian(date);
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

    const jsDate = toGregorian(date);
    jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));  // Thursday
    const time = jsDate.getTime();
    jsDate.setMonth(0);  // Compare with Jan 1
    jsDate.setDate(1);
    return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
  }

  isValid(date?: NgbDate | null): boolean {
    if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
      return false;
    }

    // year 0 doesn't exist in Gregorian calendar
    if (date.year === 0) {
      return false;
    }

    const jsDate = toGregorian(date);

    return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year - 543 &&
        jsDate.getMonth() + 1 === date.month && jsDate.getDate() === date.day;
  }
}
