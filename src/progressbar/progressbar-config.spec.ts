import {NgbProgressbarConfig} from './progressbar-config';

describe('ngb-progressbar-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbProgressbarConfig();

    expect(config.max).toBe(100);
    expect(config.striped).toBe(false);
    expect(config.animated).toBe(false);
    expect(config.textType).toBeUndefined();
    expect(config.type).toBeUndefined();
    expect(config.showValue).toBe(false);
    expect(config.height).toBeUndefined();
  });
});
