import {NgbTimeStructAdapter} from './ngb-time-adapter';

describe('ngb-time model adapter', () => {
  let adapter: NgbTimeStructAdapter;

  beforeEach(() => { adapter = new NgbTimeStructAdapter(); });

  describe('fromModel', () => {

    it('should convert invalid and incomplete values to null', () => {
      expect(adapter.fromModel(null)).toBeNull();
      expect(adapter.fromModel(<any>undefined)).toBeNull();
      expect(adapter.fromModel(<any>'')).toBeNull();
      expect(adapter.fromModel(<any>'s')).toBeNull();
      expect(adapter.fromModel(<any>2)).toBeNull();
      expect(adapter.fromModel(<any>{})).toBeNull();
      expect(adapter.fromModel(<any>new Date())).toBeNull();
      expect(adapter.fromModel(<any>{hour: 20})).toBeNull();
    });

    it('should convert valid time', () => {
      expect(adapter.fromModel({hour: 19, minute: 5, second: 1})).toEqual({hour: 19, minute: 5, second: 1});
      expect(adapter.fromModel(<any>{hour: 19, minute: 5})).toEqual(<any>{hour: 19, minute: 5, second: null});
      expect(adapter.fromModel(<any>{hour: 19, minute: 5, second: null}))
          .toEqual(<any>{hour: 19, minute: 5, second: null});
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
      expect(adapter.toModel(<any>{hour: 20})).toBeNull();
    });

    it('should convert a valid time', () => {
      expect(adapter.toModel({hour: 19, minute: 5, second: 1})).toEqual({hour: 19, minute: 5, second: 1});
      expect(adapter.toModel(<any>{hour: 19, minute: 5})).toEqual(<any>{hour: 19, minute: 5, second: null});
      expect(adapter.toModel(<any>{hour: 19, minute: 5, second: null}))
          .toEqual(<any>{hour: 19, minute: 5, second: null});
    });
  });

});
