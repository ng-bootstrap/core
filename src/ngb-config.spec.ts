import {
  NgbAccordionConfig,
  NgbAlertConfig,
  NgbCarouselConfig,
  NgbCollapseConfig,
  NgbConfig,
  NgbModalConfig,
  NgbModule,
  NgbNavConfig,
  NgbPopoverConfig,
  NgbToastConfig,
  NgbTooltipConfig
} from './index';
import {NgModule} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

describe('ngb-config', () => {
  it('should have animation disabled', () => {
    const config = new NgbConfig();

    expect(config.animation).toBe(false);
  });
});

describe('ngb-config animation override', () => {

  @NgModule({imports: [NgbModule]})
  class SharedModule {
    // These will be injected first and will use 'NgbConfig' with 'animation' set to 'false'
    constructor(
        _0: NgbAccordionConfig, _1: NgbAlertConfig, _2: NgbCarouselConfig, _3: NgbCollapseConfig, _4: NgbModalConfig,
        _5: NgbNavConfig, _6: NgbPopoverConfig, _7: NgbToastConfig, _8: NgbTooltipConfig) {}
  }

  @NgModule({imports: [NgbModule]})
  class MainModule {
    constructor(config: NgbConfig) {
      // this will be set AFTER the 'NgbXXXConfig's were instantiated
      // default value for 'animation' during unit tests is 'false'
      config.animation = true;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Note that 'Shared' is before 'Main'
      imports: [SharedModule, MainModule]
    });
  });

  it(`should use delegation to 'ngbConfig' regardless of injection order`,
     inject(
         [
           NgbAccordionConfig, NgbAlertConfig, NgbCarouselConfig, NgbCollapseConfig, NgbModalConfig, NgbNavConfig,
           NgbPopoverConfig, NgbToastConfig, NgbTooltipConfig
         ],
         (accordionConfig: NgbAccordionConfig, alertConfig: NgbAlertConfig, carouselConfig: NgbCarouselConfig,
          collapseConfig: NgbCollapseConfig, modalConfig: NgbModalConfig, navConfig: NgbNavConfig,
          popoverConfig: NgbPopoverConfig, toastConfig: NgbToastConfig, tooltipConfig: NgbTooltipConfig) => {
           expect(accordionConfig.animation).toBe(true, 'accordion');
           expect(alertConfig.animation).toBe(true, 'alert');
           expect(carouselConfig.animation).toBe(true, 'carousel');
           expect(collapseConfig.animation).toBe(true, 'collapse');
           expect(modalConfig.animation).toBe(true, 'modal');
           expect(navConfig.animation).toBe(true, 'nav');
           expect(popoverConfig.animation).toBe(true, 'popover');
           expect(toastConfig.animation).toBe(true, 'toast');
           expect(tooltipConfig.animation).toBe(true, 'tooltip');
         }));
});
