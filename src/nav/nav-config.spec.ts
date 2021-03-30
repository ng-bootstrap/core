import {NgbNavConfig} from './nav-config';
import {NgbConfig} from '../ngb-config';

describe('ngb-nav-config', () => {
  it('should have sensible default values', () => {
    const ngbConfig = new NgbConfig();
    const config = new NgbNavConfig(ngbConfig);

    expect(config.animation).toBe(ngbConfig.animation);
    expect(config.destroyOnHide).toBe(true);
    expect(config.orientation).toBe('horizontal');
    expect(config.roles).toBe('tablist');
    expect(config.keyboard).toBe(false);
  });
});
