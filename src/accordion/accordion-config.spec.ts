import {NgbConfig} from '../ngb-config';
import {NgbAccordionConfig} from './accordion-config';

describe('ngb-accordion-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbAccordionConfig(new NgbConfig());

    expect(config.closeOthers).toBe(false);
    expect(config.type).toBeUndefined();
  });
});
