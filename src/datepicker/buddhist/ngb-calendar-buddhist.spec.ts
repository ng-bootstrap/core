
import {NgbDate} from '../ngb-date';
import {NgbCalendarBuddhist} from './ngb-calendar-buddhist';

describe('ngb-calendar-buddhist', () => {

  let calendar: NgbCalendarBuddhist;

  beforeEach(() => { calendar = new NgbCalendarBuddhist(); });

  it('should return number of days per week', () => { expect(calendar.getDaysPerWeek()).toBe(7); });

  it('should return number of weeks per month', () => { expect(calendar.getWeeksPerMonth()).toBe(6); });

  it('should return months of a year', () => {
    expect(calendar.getMonths()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('should return day of week', () => {
    expect(calendar.getWeekday(new NgbDate(2562, 12, 31))).toEqual(2);
    expect(calendar.getWeekday(new NgbDate(2563, 1, 1))).toEqual(3);
    expect(calendar.getWeekday(new NgbDate(2563, 2, 29))).toEqual(6);
  });

  it('should add days to date', () => {
    expect(calendar.getNext(new NgbDate(2562, 12, 30))).toEqual(new NgbDate(2562, 12, 31));
    expect(calendar.getNext(new NgbDate(2562, 12, 31))).toEqual(new NgbDate(2563, 1, 1));
    expect(calendar.getNext(new NgbDate(2563, 2, 28))).toEqual(new NgbDate(2563, 2, 29));
    expect(calendar.getNext(new NgbDate(2563, 2, 29))).toEqual(new NgbDate(2563, 3, 1));
  });

  it('should subtract days from date', () => {
    expect(calendar.getPrev(new NgbDate(2562, 12, 31))).toEqual(new NgbDate(2562, 12, 30));
    expect(calendar.getPrev(new NgbDate(2563, 1, 1))).toEqual(new NgbDate(2562, 12, 31));
    expect(calendar.getPrev(new NgbDate(2563, 2, 29))).toEqual(new NgbDate(2563, 2, 28));
    expect(calendar.getPrev(new NgbDate(2563, 3, 1))).toEqual(new NgbDate(2563, 2, 29));
  });

  it('should add months to date', () => {
    expect(calendar.getNext(new NgbDate(2562, 12, 31), 'm')).toEqual(new NgbDate(2563, 1, 31));
    expect(calendar.getNext(new NgbDate(2563, 1, 31), 'm')).toEqual(new NgbDate(2563, 2, 29));
  });

  it('should subtract months from date', () => {
    expect(calendar.getPrev(new NgbDate(2563, 1, 31), 'm')).toEqual(new NgbDate(2562, 12, 31));
    expect(calendar.getPrev(new NgbDate(2563, 2, 29), 'm')).toEqual(new NgbDate(2563, 1, 29));
  });

  it('should add years to date',
     () => { expect(calendar.getNext(new NgbDate(2562, 1, 31), 'y')).toEqual(new NgbDate(2563, 1, 31)); });

  it('should subtract years from date',
     () => { expect(calendar.getPrev(new NgbDate(2563, 1, 31), 'y')).toEqual(new NgbDate(2562, 1, 31)); });

  it('should return week number', () => {
    let week = [
      new NgbDate(2562, 12, 29), new NgbDate(2562, 12, 30), new NgbDate(2562, 12, 31), new NgbDate(2563, 1, 1),
      new NgbDate(2563, 1, 2), new NgbDate(2563, 1, 3), new NgbDate(2563, 1, 4)
    ];
    expect(calendar.getWeekNumber(week, 7)).toEqual(1);
  });

});
