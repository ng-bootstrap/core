import {NgbDateStructAdapter} from './ngb-date-adapter';

describe('ngb-date model adapter', () => {
  let adapter: NgbDateStructAdapter;

  beforeEach(() => { adapter = new NgbDateStructAdapter(); });

  describe('fromModel', () => {

    it('should convert invalid and incomplete values to null', () => {
      expect(adapter.fromModel(null)).toBeNull();
      expect(adapter.fromModel(<any>undefined)).toBeNull();
      expect(adapter.fromModel(<any>'')).toBeNull();
      expect(adapter.fromModel(<any>'s')).toBeNull();
      expect(adapter.fromModel(<any>2)).toBeNull();
      expect(adapter.fromModel(<any>{})).toBeNull();
      expect(adapter.fromModel(<any>new Date())).toBeNull();
      expect(adapter.fromModel(<any>{year: 2017, month: 10})).toBeNull();
      expect(adapter.fromModel(<any>{month: 10, day: 10})).toBeNull();
      expect(adapter.fromModel(<any>{year: 2017, day: 10})).toBeNull();
      expect(adapter.fromModel(<any>{year: '2017', month: 10, day: 10})).toBeNull();
      expect(adapter.fromModel(<any>{year: 2017, month: '10', day: 10})).toBeNull();
      expect(adapter.fromModel(<any>{year: 2017, month: 10, day: '10'})).toBeNull();
    });

    it('should bypass numeric date', () => {
      expect(adapter.fromModel({year: 0, month: 0, day: 0})).toEqual({year: 0, month: 0, day: 0});
      expect(adapter.fromModel({year: 2016, month: 5, day: 1})).toEqual({year: 2016, month: 5, day: 1});
    });
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
      expect(adapter.toModel(<any>{year: 2017, month: 10})).toBeNull();
      expect(adapter.toModel(<any>{month: 10, day: 10})).toBeNull();
      expect(adapter.toModel(<any>{year: 2017, day: 10})).toBeNull();
      expect(adapter.toModel(<any>{year: '2017', month: 10, day: 10})).toBeNull();
      expect(adapter.toModel(<any>{year: 2017, month: '10', day: 10})).toBeNull();
      expect(adapter.toModel(<any>{year: 2017, month: 10, day: '10'})).toBeNull();
    });

    it('should bypass numeric date', () => {
      expect(adapter.toModel({year: 0, month: 0, day: 0})).toEqual({year: 0, month: 0, day: 0});
      expect(adapter.toModel({year: 2016, month: 10, day: 15})).toEqual({year: 2016, month: 10, day: 15});
    });
  });

});
