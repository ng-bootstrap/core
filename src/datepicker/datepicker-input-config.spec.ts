import {NgbInputDatepickerConfig} from './datepicker-input-config';

describe('NgbInputDatepickerConfig', () => {
  it('should have sensible default values', () => {
    const config = new NgbInputDatepickerConfig();

    expect(config.autoClose).toBe(true);
    expect(config.container).toBeUndefined();
    expect(config.positionTarget).toBeUndefined();
    expect(config.placement).toEqual(['bottom-left', 'bottom-right', 'top-left', 'top-right']);
    expect(config.restoreFocus).toBe(true);
  });
});
