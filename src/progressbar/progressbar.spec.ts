import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component} from '@angular/core';

import {NgbProgressbarModule} from './progressbar.module';
import {NgbProgressbar} from './progressbar';
import {NgbProgressbarConfig} from './progressbar-config';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getBarWidth(nativeEl): string {
  return getProgressbar(nativeEl).style.width;
}

function getBarHeight(nativeEl): string {
  return nativeEl.querySelector('.progress').style.height;
}

function getBarValue(nativeEl): number {
  return parseInt(getProgressbar(nativeEl).getAttribute('aria-valuenow') !, 10);
}

function getProgressbar(nativeEl: Element): HTMLElement {
  return nativeEl.querySelector('.progress-bar') as HTMLElement;
}

describe('ngb-progressbar', () => {
  describe('business logic', () => {
    let progressCmp: NgbProgressbar;

    beforeEach(() => { progressCmp = new NgbProgressbar(new NgbProgressbarConfig()); });

    it('should initialize inputs with default values', () => {
      const defaultConfig = new NgbProgressbarConfig();
      expect(progressCmp.max).toBe(defaultConfig.max);
      expect(progressCmp.animated).toBe(defaultConfig.animated);
      expect(progressCmp.striped).toBe(defaultConfig.striped);
      expect(progressCmp.textType).toBe(defaultConfig.textType);
      expect(progressCmp.type).toBe(defaultConfig.type);
    });

    it('should calculate the percentage (default max size)', () => {
      progressCmp.value = 50;
      expect(progressCmp.getPercentValue()).toBe(50);

      progressCmp.value = 25;
      expect(progressCmp.getPercentValue()).toBe(25);
    });

    it('should calculate the percentage (custom max size)', () => {
      progressCmp.max = 150;

      progressCmp.value = 75;
      expect(progressCmp.getPercentValue()).toBe(50);

      progressCmp.value = 30;
      expect(progressCmp.getPercentValue()).toBe(20);
    });

    it('should calculate the percentage (custom max size of null)', () => {
      progressCmp.max = <any>null;

      progressCmp.value = 25;
      expect(progressCmp.getPercentValue()).toBe(25);
    });

    it('should calculate the percentage (custom max size of undefined)', () => {
      progressCmp.max = <any>undefined;

      progressCmp.value = 25;
      expect(progressCmp.getPercentValue()).toBe(25);
    });

    it('should calculate the percentage (custom max size of zero)', () => {
      progressCmp.max = 0;

      progressCmp.value = 25;
      expect(progressCmp.getPercentValue()).toBe(25);
    });

    it('should calculate the percentage (custom negative max size)', () => {
      progressCmp.max = -10;

      progressCmp.value = 25;
      expect(progressCmp.getPercentValue()).toBe(25);
    });

    it('should calculate the percentage (custom max size of positive infinity)', () => {
      progressCmp.max = Number.POSITIVE_INFINITY;

      progressCmp.value = 25;
      expect(progressCmp.getPercentValue()).toBe(25);
    });

    it('should calculate the percentage (custom max size of negative infinity)', () => {
      progressCmp.max = Number.NEGATIVE_INFINITY;

      progressCmp.value = 25;
      expect(progressCmp.getPercentValue()).toBe(25);
    });

    it('should set the value to 0 for negative numbers', () => {
      progressCmp.value = -20;
      expect(progressCmp.getValue()).toBe(0);
    });

    it('should set the value to max if it is higher than max (default max size)', () => {
      progressCmp.value = 120;
      expect(progressCmp.getValue()).toBe(100);
    });

    it('should set the value to max if it is higher than max (custom max size)', () => {
      progressCmp.max = 150;
      progressCmp.value = 170;
      expect(progressCmp.getValue()).toBe(150);
    });

    it('should update the value if max updates to a smaller value', () => {
      progressCmp.value = 80;
      progressCmp.max = 70;
      expect(progressCmp.getValue()).toBe(70);
    });

    it('should not update the value if max updates to a larger value', () => {
      progressCmp.value = 120;
      progressCmp.max = 150;
      expect(progressCmp.getValue()).toBe(120);
    });
  });

  describe('UI logic', () => {

    beforeEach(
        () => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbProgressbarModule]}); });

    it('accepts a value and respond to value changes', () => {
      const html = '<ngb-progressbar [value]="value"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getBarWidth(fixture.nativeElement)).toBe('10%');

      // this might fail in IE11 if attribute binding order is not respected for the <progress> element:
      // <progress [value]="" [max]=""> will fail with value = 1
      // <progress [max]="" [value]=""> will work with value = 10
      expect(getBarValue(fixture.nativeElement)).toBe(10);

      fixture.componentInstance.value = 30;
      fixture.detectChanges();
      expect(getBarWidth(fixture.nativeElement)).toBe('30%');
      expect(getBarValue(fixture.nativeElement)).toBe(30);
    });

    it('accepts a max value and respond to max changes', () => {
      const html = '<ngb-progressbar [value]="value" [max]="max"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getBarWidth(fixture.nativeElement)).toBe('20%');

      fixture.componentInstance.max = 200;
      fixture.detectChanges();
      expect(getBarWidth(fixture.nativeElement)).toBe('5%');
    });


    it('accepts a value and max value above default values', () => {
      const html = '<ngb-progressbar [value]="150" [max]="150"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getBarWidth(fixture.nativeElement)).toBe('100%');
    });


    it('accepts a custom type', () => {
      const html = '<ngb-progressbar [value]="value" [type]="type"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('bg-warning');

      fixture.componentInstance.type = 'info';
      fixture.detectChanges();
      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('bg-info');

      fixture.componentInstance.type = 'dark';
      fixture.detectChanges();
      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('bg-dark');
    });

    it('accepts a custom text type', () => {
      const html = '<ngb-progressbar [value]="value" [textType]="textType"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('text-light');

      fixture.componentInstance.textType = 'info';
      fixture.detectChanges();
      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('text-info');
    });

    it('accepts animated as normal attr', () => {
      const html = '<ngb-progressbar [value]="value" [animated]="animated"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('progress-bar-animated');

      fixture.componentInstance.animated = false;
      fixture.detectChanges();
      expect(getProgressbar(fixture.nativeElement)).not.toHaveCssClass('progress-bar-animated');
    });


    it('accepts striped as normal attr', () => {
      const html = '<ngb-progressbar [value]="value" [striped]="striped"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('progress-bar-striped');

      fixture.componentInstance.striped = false;
      fixture.detectChanges();
      expect(getProgressbar(fixture.nativeElement)).not.toHaveCssClass('progress-bar-striped');
    });


    it('should not add "false" CSS class', () => {
      const html = '<ngb-progressbar [value]="value" [striped]="striped"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('progress-bar-striped');
      expect(getProgressbar(fixture.nativeElement)).not.toHaveCssClass('false');
    });

    it('should stay striped when the type changes', () => {
      const html = '<ngb-progressbar [value]="value" [type]="type" [striped]="true"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('bg-warning');
      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('progress-bar-striped');

      fixture.componentInstance.type = 'success';
      fixture.detectChanges();
      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('bg-success');
      expect(getProgressbar(fixture.nativeElement)).toHaveCssClass('progress-bar-striped');
    });

    it('sets the min and max values as aria attributes', () => {
      const html = '<ngb-progressbar [value]="130" [max]="150"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getProgressbar(fixture.nativeElement).getAttribute('aria-valuemin')).toBe('0');
      expect(getProgressbar(fixture.nativeElement).getAttribute('aria-valuemax')).toBe('150');
    });

    it('should display the progress-bar label', () => {
      const html = '<ngb-progressbar [value]="150" [max]="150">label goes here</ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(fixture.nativeElement.textContent).toContain('label goes here');
    });

    it('should display the current percentage value', () => {
      const html = '<ngb-progressbar [showValue]="true" [value]="150" [max]="150"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(fixture.nativeElement.textContent).toContain('100%');
    });

    it('should accepts height values', () => {
      const html = '<ngb-progressbar [value]="150" height="10px"></ngb-progressbar>';
      const fixture = createTestComponent(html);

      expect(getBarHeight(fixture.nativeElement)).toBe('10px');
    });
  });

  describe('Custom config', () => {
    let config: NgbProgressbarConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [NgbProgressbarModule]}); });

    beforeEach(inject([NgbProgressbarConfig], (c: NgbProgressbarConfig) => {
      config = c;
      config.max = 1000;
      config.striped = true;
      config.animated = true;
      config.textType = 'white';
      config.type = 'success';
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(NgbProgressbar);
      fixture.detectChanges();

      let progressbar = fixture.componentInstance;
      expect(progressbar.max).toBe(config.max);
      expect(progressbar.striped).toBe(config.striped);
      expect(progressbar.animated).toBe(config.animated);
      expect(progressbar.textType).toBe(config.textType);
      expect(progressbar.type).toBe(config.type);
    });
  });

  describe('Custom config as provider', () => {
    let config = new NgbProgressbarConfig();
    config.max = 1000;
    config.striped = true;
    config.animated = true;
    config.textType = 'light';
    config.type = 'success';

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbProgressbarModule], providers: [{provide: NgbProgressbarConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(NgbProgressbar);
      fixture.detectChanges();

      let progressbar = fixture.componentInstance;
      expect(progressbar.max).toBe(config.max);
      expect(progressbar.striped).toBe(config.striped);
      expect(progressbar.animated).toBe(config.animated);
      expect(progressbar.textType).toBe(config.textType);
      expect(progressbar.type).toBe(config.type);
    });
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  value = 10;
  max = 50;
  animated = true;
  striped = true;

  textType = 'light';
  type = 'warning';
}
