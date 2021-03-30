import {NgbPopoverConfig} from './popover-config';
import {NgbConfig} from '../ngb-config';

describe('ngb-popover-config', () => {
  it('should have sensible default values', () => {
    const ngbConfig = new NgbConfig();
    const config = new NgbPopoverConfig(ngbConfig);

    expect(config.animation).toBe(ngbConfig.animation);
    expect(config.autoClose).toBe(true);
    expect(config.placement).toBe('auto');
    expect(config.triggers).toBe('click');
    expect(config.container).toBeUndefined();
    expect(config.disablePopover).toBe(false);
    expect(config.popoverClass).toBeUndefined();
    expect(config.openDelay).toBe(0);
    expect(config.closeDelay).toBe(0);
  });
});
