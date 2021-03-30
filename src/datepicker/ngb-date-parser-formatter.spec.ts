import {NgbDateISOParserFormatter} from './ngb-date-parser-formatter';

describe('ngb-date parsing and formatting', () => {
  let pf: NgbDateISOParserFormatter;

  beforeEach(() => { pf = new NgbDateISOParserFormatter(); });

  describe('parsing', () => {

    it('should parse null undefined and empty string as null', () => {
      expect(pf.parse(<any>null)).toBeNull();
      expect(pf.parse(<any>undefined)).toBeNull();
      expect(pf.parse('')).toBeNull();
      expect(pf.parse('   ')).toBeNull();
    });

    it('should parse valid date', () => { expect(pf.parse('2016-05-12')).toEqual({year: 2016, month: 5, day: 12}); });

    it('should parse non-date as null', () => {
      expect(pf.parse('foo-bar-baz')).toBeNull();
      expect(pf.parse('2014-bar')).toBeNull();
      expect(pf.parse('2014-11-12-15')).toBeNull();
    });

    it('should do its best parsing incomplete dates',
       () => { expect(pf.parse('2011-5')).toEqual(<any>{year: 2011, month: 5, day: null}); });
  });

  describe('formatting', () => {

    it('should format null and undefined as an empty string', () => {
      expect(pf.format(null)).toBe('');
      expect(pf.format(<any>undefined)).toBe('');
    });

    it('should format a valid date', () => { expect(pf.format({year: 2016, month: 10, day: 15})).toBe('2016-10-15'); });

    it('should format a valid date with padding',
       () => { expect(pf.format({year: 2016, month: 10, day: 5})).toBe('2016-10-05'); });

    it('should try its best with invalid dates', () => {
      expect(pf.format(<any>{year: 2016, month: NaN, day: undefined})).toBe('2016--');
      expect(pf.format(<any>{year: 2016, month: null, day: 0})).toBe('2016--00');
    });
  });

});
