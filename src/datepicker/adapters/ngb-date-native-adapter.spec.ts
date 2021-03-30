import {NgbDateNativeAdapter} from './ngb-date-native-adapter';

describe('ngb-date-native model adapter', () => {
  let adapter: NgbDateNativeAdapter;

  beforeEach(() => { adapter = new NgbDateNativeAdapter(); });

  describe('fromModel', () => {

    it('should convert invalid and incomplete values to null', () => {
      expect(adapter.fromModel(null)).toBeNull();
      expect(adapter.fromModel(<any>undefined)).toBeNull();
      expect(adapter.fromModel(<any>'')).toBeNull();
      expect(adapter.fromModel(<any>'s')).toBeNull();
      expect(adapter.fromModel(<any>2)).toBeNull();
      expect(adapter.fromModel(<any>{})).toBeNull();
      expect(adapter.fromModel(<any>{year: 2017, month: 10})).toBeNull();
      expect(adapter.fromModel(new Date('boom'))).toBeNull();
    });

    it('should convert valid date',
       () => { expect(adapter.fromModel(new Date(2016, 4, 1))).toEqual({year: 2016, month: 5, day: 1}); });
  });

  describe('toModel', () => {

    it('should convert invalid and incomplete values to null', () => {
      expect(adapter.toModel(null)).toBeNull();
      expect(adapter.toModel(<any>undefined)).toBeNull();
      expect(adapter.toModel(<any>'')).toBeNull();
      expect(adapter.toModel(<any>'s')).toBeNull();
      expect(adapter.toModel(<any>2)).toBeNull();
      expect(adapter.toModel(<any>{})).toBeNull();
      expect(adapter.toModel(<any>new Date())).toBeNull();
    });

    it('should convert a valid date',
       () => { expect(adapter.toModel({year: 2016, month: 10, day: 15})).toEqual(new Date(2016, 9, 15, 12)); });

    it('should convert years between 0 and 99 correctly', () => {

      function jsDate(jsYear: number, jsMonth: number, jsDay: number): Date {
        const date = new Date(jsYear, jsMonth, jsDay, 12);
        if (jsYear >= 0 && jsYear <= 99) {
          date.setFullYear(jsYear);
        }
        return date;
      }

      expect(adapter.toModel({year: 0, month: 1, day: 1})).toEqual(jsDate(0, 0, 1));
      expect(adapter.toModel({year: 1, month: 1, day: 1})).toEqual(jsDate(1, 0, 1));
      expect(adapter.toModel({year: 99, month: 1, day: 1})).toEqual(jsDate(99, 0, 1));
      expect(adapter.toModel({year: 1900, month: 1, day: 1})).toEqual(jsDate(1900, 0, 1));
    });
  });

});
