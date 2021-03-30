import {NgbAlertConfig} from './alert-config';
import {NgbConfig} from '../ngb-config';

describe('ngb-alert-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbAlertConfig(new NgbConfig());

    expect(config.dismissible).toBe(true);
    expect(config.type).toBe('warning');
  });
});
