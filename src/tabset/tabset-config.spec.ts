// tslint:disable:deprecation
import {NgbTabsetConfig} from './tabset-config';

describe('ngb-tabset-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbTabsetConfig();

    expect(config.type).toBe('tabs');
    expect(config.justify).toBe('start');
    expect(config.orientation).toBe('horizontal');
  });
});
