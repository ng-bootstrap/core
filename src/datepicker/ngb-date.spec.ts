import {NgbDate} from './ngb-date';

describe('ngb-date', () => {

  describe('from', () => {

    it('should create a date from a structure',
       () => { expect(NgbDate.from({year: 2010, month: 10, day: 2})).toEqual(new NgbDate(2010, 10, 2)); });

    it('should work with non-numeric values', () => {
      expect(NgbDate.from(<any>{year: null, month: null, day: null}))
          .toEqual(new NgbDate(<any>null, <any>null, <any>null));
      expect(NgbDate.from(<any>{year: undefined, month: undefined, day: undefined}))
          .toEqual(new NgbDate(<any>null, <any>null, <any>null));
      expect(NgbDate.from({year: <any>'2010', month: <any>'10', day: <any>'2'}))
          .toEqual(new NgbDate(<any>null, <any>null, <any>null));
    });

    it('should return the same NgbDate object', () => {
      const date = new NgbDate(2010, 10, 10);
      expect(NgbDate.from(date)).toBe(date);
    });
  });

  describe('equals', () => {
    const date = new NgbDate(2016, 8, 18);

    it('should return true for the same dates', () => { expect(date.equals(new NgbDate(2016, 8, 18))).toBeTruthy(); });

    it('should work with structures', () => { expect(date.equals({day: 18, month: 8, year: 2016})).toBeTruthy(); });

    it('should return false different dates', () => {
      expect(date.equals(new NgbDate(0, 8, 18))).toBeFalsy();
      expect(date.equals(new NgbDate(2016, 0, 18))).toBeFalsy();
      expect(date.equals(new NgbDate(2016, 8, 0))).toBeFalsy();
    });

    it('should return false undefined and null values', () => {
      expect(date.equals(null)).toBeFalsy();
      expect(date.equals(undefined)).toBeFalsy();
    });
  });

  describe('before', () => {
    const date = new NgbDate(2016, 8, 18);

    it('should return false undefined and null values', () => {
      expect(date.before(null)).toBeFalsy();
      expect(date.before(undefined)).toBeFalsy();
    });

    it('should work with structures', () => { expect(date.before({day: 18, month: 9, year: 2016})).toBeTruthy(); });

    it('should return true if current date is before the other one', () => {
      expect(date.before(new NgbDate(2016, 8, 19))).toBeTruthy();
      expect(date.before(new NgbDate(2016, 9, 18))).toBeTruthy();
      expect(date.before(new NgbDate(2017, 8, 18))).toBeTruthy();
    });

    it('should return false if current date is after the other one', () => {
      expect(date.before(new NgbDate(2016, 8, 17))).toBeFalsy();
      expect(date.before(new NgbDate(2016, 7, 18))).toBeFalsy();
      expect(date.before(new NgbDate(2015, 8, 18))).toBeFalsy();
    });
  });

  describe('after', () => {
    const date = new NgbDate(2016, 8, 18);

    it('should return false undefined and null values', () => {
      expect(date.after(null)).toBeFalsy();
      expect(date.after(undefined)).toBeFalsy();
    });

    it('should work with structures', () => { expect(date.after({day: 17, month: 8, year: 2016})).toBeTruthy(); });

    it('should return true if current date is after the other one', () => {
      expect(date.after(new NgbDate(2016, 8, 17))).toBeTruthy();
      expect(date.after(new NgbDate(2016, 7, 18))).toBeTruthy();
      expect(date.after(new NgbDate(2015, 8, 18))).toBeTruthy();
    });

    it('should return false if current date is before the other one', () => {
      expect(date.after(new NgbDate(2016, 8, 19))).toBeFalsy();
      expect(date.after(new NgbDate(2016, 9, 18))).toBeFalsy();
      expect(date.after(new NgbDate(2017, 8, 18))).toBeFalsy();
    });
  });
});
