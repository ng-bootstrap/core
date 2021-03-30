import {inject} from '@angular/core/testing';

import {NgbModalConfig} from './modal-config';
import {NgbConfig} from '../ngb-config';

describe('NgbModalConfig', () => {

  it('should have sensible default values',
     inject([NgbModalConfig, NgbConfig], (config: NgbModalConfig, ngbConfig: NgbConfig) => {

       expect(config.animation).toBe(ngbConfig.animation);
       expect(config.ariaLabelledBy).toBeUndefined();
       expect(config.ariaLabelledBy).toBeUndefined();
       expect(config.ariaDescribedBy).toBeUndefined();
       expect(config.backdrop).toBe(true);
       expect(config.backdropClass).toBeUndefined();
       expect(config.beforeDismiss).toBeUndefined();
       expect(config.centered).toBeUndefined();
       expect(config.container).toBeUndefined();
       expect(config.injector).toBeUndefined();
       expect(config.keyboard).toBe(true);
       expect(config.scrollable).toBeUndefined();
       expect(config.size).toBeUndefined();
       expect(config.windowClass).toBeUndefined();
     }));
});
