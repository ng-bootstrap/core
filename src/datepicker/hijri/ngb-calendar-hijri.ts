import {NgbDate} from '../ngb-date';
import {NgbPeriod, NgbCalendar} from '../ngb-calendar';
import {Injectable} from '@angular/core';
import {isNumber} from '../../util/util';

@Injectable()
export abstract class NgbCalendarHijri extends NgbCalendar {
  /**
   * Returns the number of days in a specific Hijri month.
   * `month` is 1 for Muharram, 2 for Safar, etc.
   * `year` is any Hijri year.
   */
  abstract getDaysPerMonth(month: number, year: number): number;

  /**
   * Returns the equivalent Hijri date value for a give input Gregorian date.
   * `gDate` is s JS Date to be converted to Hijri.
   */
  abstract fromGregorian(gDate: Date): NgbDate;

  /**
   * Converts the current Hijri date to Gregorian.
   */
  abstract toGregorian(hDate: NgbDate): Date;

  getDaysPerWeek() { return 7; }

  getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }

  getWeeksPerMonth() { return 6; }

  getNext(date: NgbDate, period: NgbPeriod = 'd', number = 1) {
    date = new NgbDate(date.year, date.month, date.day);

    switch (period) {
      case 'y':
        date = this._setYear(date, date.year + number);
        date.month = 1;
        date.day = 1;
        return date;
      case 'm':
        date = this._setMonth(date, date.month + number);
        date.day = 1;
        return date;
      case 'd':
        return this._setDay(date, date.day + number);
      default:
        return date;
    }
  }

  getPrev(date: NgbDate, period: NgbPeriod = 'd', number = 1) { return this.getNext(date, period, -number); }

  getWeekday(date: NgbDate) {
    const day = this.toGregorian(date).getDay();
    // in JS Date Sun=0, in ISO 8601 Sun=7
    return day === 0 ? 7 : day;
  }

  getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number) {
    // in JS Date Sun=0, in ISO 8601 Sun=7
    if (firstDayOfWeek === 7) {
      firstDayOfWeek = 0;
    }

    const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
    const date = week[thursdayIndex];

    const jsDate = this.toGregorian(date);
    jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));  // Thursday
    const time = jsDate.getTime();
    const MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1));  // Compare with Muharram 1
    return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
  }

  getToday(): NgbDate { return this.fromGregorian(new Date()); }


  isValid(date?: NgbDate | null): boolean {
    return date != null && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
        !isNaN(this.toGregorian(date).getTime());
  }

  private _setDay(date: NgbDate, day: number): NgbDate {
    day = +day;
    let mDays = this.getDaysPerMonth(date.month, date.year);
    if (day <= 0) {
      while (day <= 0) {
        date = this._setMonth(date, date.month - 1);
        mDays = this.getDaysPerMonth(date.month, date.year);
        day += mDays;
      }
    } else if (day > mDays) {
      while (day > mDays) {
        day -= mDays;
        date = this._setMonth(date, date.month + 1);
        mDays = this.getDaysPerMonth(date.month, date.year);
      }
    }
    date.day = day;
    return date;
  }

  private _setMonth(date: NgbDate, month: number): NgbDate {
    month = +month;
    date.year = date.year + Math.floor((month - 1) / 12);
    date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
    return date;
  }

  private _setYear(date: NgbDate, year: number): NgbDate {
    date.year = +year;
    return date;
  }
}
