import {ComponentFixture, TestBed} from '@angular/core/testing';
import {createGenericTestComponent, isBrowserVisible} from '../test/common';

import {Component} from '@angular/core';

import {NgbCollapseModule} from './collapse.module';
import {NgbConfig} from '../ngb-config';
import {NgbConfigAnimation} from '../test/ngb-config-animation';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getCollapsibleContent(element: HTMLElement): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.collapse');
}

describe('ngb-collapse', () => {
  beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbCollapseModule]}); });

  it('should have content open', () => {
    const fixture = createTestComponent(`<div [ngbCollapse]="collapsed">Some content</div>`);

    const collapseEl = getCollapsibleContent(fixture.nativeElement);

    expect(collapseEl).toHaveCssClass('show');
  });

  it('should have content closed', () => {
    const fixture = createTestComponent(`<div [ngbCollapse]="collapsed">Some content</div>`);
    const tc = fixture.componentInstance;
    tc.collapsed = true;
    fixture.detectChanges();

    const collapseEl = getCollapsibleContent(fixture.nativeElement);

    expect(collapseEl).not.toHaveCssClass('show');
  });

  it('should toggle collapsed content based on bound model change', () => {
    const fixture = createTestComponent(`<div [ngbCollapse]="collapsed">Some content</div>`);
    fixture.detectChanges();

    const tc = fixture.componentInstance;
    const collapseEl = getCollapsibleContent(fixture.nativeElement);
    expect(collapseEl).toHaveCssClass('show');

    tc.collapsed = true;
    fixture.detectChanges();
    expect(collapseEl).not.toHaveCssClass('show');

    tc.collapsed = false;
    fixture.detectChanges();
    expect(collapseEl).toHaveCssClass('show');
  });

  it('should allow toggling collapse from outside', () => {
    const fixture = createTestComponent(`
      <button (click)="collapse.toggle()">Collapse</button>
      <div [ngbCollapse]="collapsed" #collapse="ngbCollapse"></div>`);

    const compiled = fixture.nativeElement;
    const collapseEl = getCollapsibleContent(compiled);
    const buttonEl = compiled.querySelector('button');

    buttonEl.click();
    fixture.detectChanges();
    expect(collapseEl).not.toHaveCssClass('show');

    buttonEl.click();
    fixture.detectChanges();
    expect(collapseEl).toHaveCssClass('show');
  });

  it('should work with no binding', () => {
    const fixture = createTestComponent(`
      <button (click)="collapse.toggle()">Collapse</button>
      <div ngbCollapse #collapse="ngbCollapse"></div>`);

    const compiled = fixture.nativeElement;
    const collapseEl = getCollapsibleContent(compiled);
    const buttonEl = compiled.querySelector('button');

    buttonEl.click();
    fixture.detectChanges();
    expect(collapseEl).not.toHaveCssClass('show');

    buttonEl.click();
    fixture.detectChanges();
    expect(collapseEl).toHaveCssClass('show');
  });
});

if (isBrowserVisible('ngb-collapse animations')) {
  describe('ngb-collapse animations', () => {

    @Component({
      template: `
        <button (click)="c.toggle()">Collapse!</button>
        <div [(ngbCollapse)]="collapsed" #c="ngbCollapse" (ngbCollapseChange)="onCollapse()"
          (shown)="onShown()" (hidden)="onHidden()"></div>
      `,
      host: {'[class.ngb-reduce-motion]': 'reduceMotion'}
    })
    class TestAnimationComponent {
      collapsed = false;
      reduceMotion = true;
      onCollapse = () => {};
      onShown = () => {};
      onHidden = () => {};
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestAnimationComponent],
        imports: [NgbCollapseModule],
        providers: [{provide: NgbConfig, useClass: NgbConfigAnimation}]
      });
    });

    it(`should run collapsing transition (force-reduced-motion = false)`, (done) => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = false;
      fixture.detectChanges();

      const buttonEl = fixture.nativeElement.querySelector('button');
      const content = getCollapsibleContent(fixture.nativeElement);

      const onCollapseSpy = spyOn(fixture.componentInstance, 'onCollapse');
      const onShownSpy = spyOn(fixture.componentInstance, 'onShown');
      const onHiddenSpy = spyOn(fixture.componentInstance, 'onHidden');

      // First we're going to collapse, then expand
      onHiddenSpy.and.callFake(() => {
        expect(content).toHaveClass('collapse');
        expect(content).not.toHaveClass('show');
        expect(content).not.toHaveClass('collapsing');

        // Expanding
        buttonEl.click();
        fixture.detectChanges();
        expect(onShownSpy).not.toHaveBeenCalled();
        expect(content).not.toHaveClass('collapse');
        expect(content).not.toHaveClass('show');
        expect(content).toHaveClass('collapsing');
      });

      onShownSpy.and.callFake(() => {
        expect(onCollapseSpy).toHaveBeenCalledTimes(2);
        expect(content).toHaveClass('collapse');
        expect(content).toHaveClass('show');
        expect(content).not.toHaveClass('collapsing');

        done();
      });

      expect(content).toHaveClass('collapse');
      expect(content).toHaveClass('show');
      expect(content).not.toHaveClass('collapsing');
      expect(fixture.componentInstance.collapsed).toBe(false);

      // Collapsing
      buttonEl.click();
      fixture.detectChanges();
      expect(onHiddenSpy).not.toHaveBeenCalled();
      expect(onCollapseSpy).toHaveBeenCalledTimes(1);
      expect(content).not.toHaveClass('collapse');
      expect(content).not.toHaveClass('show');
      expect(content).toHaveClass('collapsing');
    });

    it(`should run collapsing transition (force-reduced-motion = true)`, () => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = true;
      fixture.detectChanges();

      const buttonEl = fixture.nativeElement.querySelector('button');
      const content = getCollapsibleContent(fixture.nativeElement);

      const onCollapseSpy = spyOn(fixture.componentInstance, 'onCollapse');
      const onShownSpy = spyOn(fixture.componentInstance, 'onShown');
      const onHiddenSpy = spyOn(fixture.componentInstance, 'onHidden');

      expect(content).toHaveClass('collapse');
      expect(content).toHaveClass('show');
      expect(content).not.toHaveClass('collapsing');
      expect(fixture.componentInstance.collapsed).toBe(false);

      // Collapsing
      buttonEl.click();
      fixture.detectChanges();
      expect(onHiddenSpy).toHaveBeenCalled();
      expect(onCollapseSpy).toHaveBeenCalledTimes(1);
      expect(content).toHaveClass('collapse');
      expect(content).not.toHaveClass('show');
      expect(content).not.toHaveClass('collapsing');

      // Expanding
      buttonEl.click();
      fixture.detectChanges();
      expect(onShownSpy).toHaveBeenCalled();
      expect(onCollapseSpy).toHaveBeenCalledTimes(2);
      expect(content).toHaveClass('collapse');
      expect(content).toHaveClass('show');
      expect(content).not.toHaveClass('collapsing');
    });

    it(`should run revert collapsing transition (force-reduced-motion = false)`, (done) => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = false;
      fixture.detectChanges();

      const buttonEl = fixture.nativeElement.querySelector('button');
      const content = getCollapsibleContent(fixture.nativeElement);

      const onCollapseSpy = spyOn(fixture.componentInstance, 'onCollapse');
      const onShownSpy = spyOn(fixture.componentInstance, 'onShown');
      const onHiddenSpy = spyOn(fixture.componentInstance, 'onHidden');

      onShownSpy.and.callFake(() => {
        expect(onHiddenSpy).not.toHaveBeenCalled();
        expect(fixture.componentInstance.collapsed).toBe(false);
        expect(content).toHaveClass('collapse');
        expect(content).toHaveClass('show');
        expect(content).not.toHaveClass('collapsing');
        done();
      });

      expect(content).toHaveClass('collapse');
      expect(content).toHaveClass('show');
      expect(content).not.toHaveClass('collapsing');
      expect(fixture.componentInstance.collapsed).toBe(false);

      // Collapsing
      buttonEl.click();
      fixture.detectChanges();
      expect(onCollapseSpy).toHaveBeenCalledTimes(1);
      expect(content).not.toHaveClass('collapse');
      expect(content).not.toHaveClass('show');
      expect(content).toHaveClass('collapsing');

      // Expanding before hidden
      buttonEl.click();
      fixture.detectChanges();
      expect(onCollapseSpy).toHaveBeenCalledTimes(2);
      expect(content).not.toHaveClass('collapse');
      expect(content).not.toHaveClass('show');
      expect(content).toHaveClass('collapsing');
    });

  });
}

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  collapsed = false;
}
