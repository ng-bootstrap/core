import {NgbConfig} from '../ngb-config';
import {NgbCollapseConfig} from './collapse-config';

describe('ngb-collapse-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbConfig();
    const collapseConfig = new NgbCollapseConfig(config);

    expect(collapseConfig.animation).toBe(config.animation);
  });
});
