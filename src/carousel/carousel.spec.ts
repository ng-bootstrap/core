import {fakeAsync, discardPeriodicTasks, tick, TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {createGenericTestComponent, isBrowserVisible} from '../test/common';

import {By} from '@angular/platform-browser';
import {ChangeDetectionStrategy, Component} from '@angular/core';

import {NgbCarouselModule} from './carousel.module';
import {NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbSingleSlideEvent} from './carousel';
import {NgbCarouselConfig} from './carousel-config';
import {NgbConfig} from '../ngb-config';
import {NgbConfigAnimation} from '../test/ngb-config-animation';
import {NgbSlideEventDirection} from './carousel-transition';

const createTestComponent = (html: string, detectChanges = true) =>
    createGenericTestComponent(html, TestComponent, detectChanges) as ComponentFixture<TestComponent>;

function expectActiveSlides(nativeEl: HTMLDivElement, active: boolean[]) {
  const slideElms = nativeEl.querySelectorAll('.carousel-item');
  const indicatorElms = nativeEl.querySelectorAll('ol.carousel-indicators > li');
  const carouselElm = nativeEl.querySelector('ngb-carousel');

  expect(slideElms.length).toBe(active.length);
  expect(indicatorElms.length).toBe(active.length);

  for (let i = 0; i < active.length; i++) {
    if (active[i]) {
      expect(slideElms[i]).toHaveCssClass('active');
      expect(indicatorElms[i]).toHaveCssClass('active');
      expect(indicatorElms[i].getAttribute('aria-selected')).toBe('true');
      expect(carouselElm !.getAttribute('aria-activedescendant')).toBe(slideElms[i].id);
    } else {
      expect(slideElms[i]).not.toHaveCssClass('active');
      expect(indicatorElms[i]).not.toHaveCssClass('active');
      expect(indicatorElms[i].getAttribute('aria-selected')).toBe('false');
    }
  }
}

describe('ngb-carousel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent, TestComponentOnPush], imports: [NgbCarouselModule]});
  });

  it('should initialize inputs with default values', () => {
    const defaultConfig = new NgbCarouselConfig(new NgbConfig());
    const carousel = new NgbCarousel(new NgbCarouselConfig(new NgbConfig()), null, <any>null, <any>null, <any>null);

    expect(carousel.interval).toBe(defaultConfig.interval);
    expect(carousel.wrap).toBe(defaultConfig.wrap);
    expect(carousel.keyboard).toBe(defaultConfig.keyboard);
    expect(carousel.pauseOnHover).toBe(defaultConfig.pauseOnHover);
    expect(carousel.pauseOnFocus).toBe(defaultConfig.pauseOnFocus);
    expect(carousel.showNavigationIndicators).toBe(defaultConfig.showNavigationIndicators);
    expect(carousel.showNavigationArrows).toBe(defaultConfig.showNavigationArrows);
  });

  it('should render slides and navigation indicators', fakeAsync(() => {
       const html = `
      <ngb-carousel>
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;
       const fixture = createTestComponent(html);

       const slideElms = fixture.nativeElement.querySelectorAll('.carousel-item');
       expect(slideElms.length).toBe(2);
       expect(slideElms[0].textContent).toMatch(/foo/);
       expect(slideElms[1].textContent).toMatch(/bar/);

       expect(fixture.nativeElement.querySelectorAll('ol.carousel-indicators > li').length).toBe(2);
       expect(fixture.nativeElement.querySelectorAll('[role="button"]').length).toBe(2);

       discardPeriodicTasks();
     }));


  it('should mark the first slide as active by default', fakeAsync(() => {
       const html = `
      <ngb-carousel>
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));

  it('should work without any slides', fakeAsync(() => {
       const fixture = createTestComponent(`<ngb-carousel [interval]="1000"></ngb-carousel>`);

       tick(1001);
       fixture.detectChanges();

       const carousel = fixture.nativeElement.querySelector('ngb-carousel');
       const slides = fixture.nativeElement.querySelectorAll('.carousel-item');

       expect(carousel).toBeTruthy();
       expect(slides.length).toBe(0);

       discardPeriodicTasks();
     }));


  it('should mark the requested slide as active', fakeAsync(() => {
       const html = `
       <ngb-carousel [activeId]="activeSlideId">
         <ng-template ngbSlide id="1">foo</ng-template>
         <ng-template ngbSlide id="2">bar</ng-template>
       </ngb-carousel>
     `;

       // set the second slide active (instead of the first one by default), before the first change detection
       const fixture = createTestComponent(html, false);

       fixture.componentInstance.activeSlideId = '2';
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should auto-correct when slide index is undefined', fakeAsync(() => {
       const html = `
            <ngb-carousel [activeId]="doesntExist">
              <ng-template ngbSlide>foo</ng-template>
              <ng-template ngbSlide>bar</ng-template>
            </ngb-carousel>
          `;

       const fixture = createTestComponent(html);
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));

  it('should change slide on prev/next API calls', fakeAsync(() => {
       const html = `
      <ngb-carousel #c [interval]="0">
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
        <ng-template ngbSlide id="s3">baz</ng-template>
      </ngb-carousel>
      <button id="next" (click)="c.next()">Next</button>
      <button id="prev" (click)="c.prev()">Prev</button>
      <button id="select" (click)="c.select('s3')">Select 3</button>
    `;

       const fixture = createTestComponent(html);
       const next = fixture.nativeElement.querySelector('#next');
       const prev = fixture.nativeElement.querySelector('#prev');
       const select = fixture.nativeElement.querySelector('#select');

       expectActiveSlides(fixture.nativeElement, [true, false, false]);

       next.click();
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true, false]);

       prev.click();
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false, false]);

       select.click();
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, false, true]);
     }));

  it('should pause/resume slide change on API calls', fakeAsync(() => {
       const html = `
     <ngb-carousel #c [interval]="1000">
       <ng-template ngbSlide>foo</ng-template>
       <ng-template ngbSlide>bar</ng-template>
     </ngb-carousel>
     <button id="pause" (click)="c.pause()">Next</button>
     <button id="cycle" (click)="c.cycle()">Prev</button>
   `;

       const fixture = createTestComponent(html);
       const pause = fixture.nativeElement.querySelector('#pause');
       const cycle = fixture.nativeElement.querySelector('#cycle');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(1000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       pause.click();
       tick(1000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       cycle.click();
       tick(1000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));

  it('should not resume without call to cycle()', fakeAsync(() => {
       const html = `
    <ngb-carousel #c [interval]="1000" [pauseOnFocus]="false" (slide)="carouselSlideCallBack($event)">
      <ng-template ngbSlide>foo</ng-template>
      <ng-template ngbSlide>bar</ng-template>
      <ng-template ngbSlide>third</ng-template>
    </ngb-carousel>
    <button id="next" (click)="c.next()">Next</button>
    <button id="pause" (click)="c.pause()">Pause</button>
    <button id="cycle" (click)="c.cycle()">Cycle</button>
  `;

       const fixture = createTestComponent(html);
       const spyCallBack = spyOn(fixture.componentInstance, 'carouselSlideCallBack');
       const carouselDebugEl = fixture.debugElement.query(By.directive(NgbCarousel));
       const indicatorElms = fixture.nativeElement.querySelectorAll('ol.carousel-indicators > li');
       const prevControlElm = fixture.nativeElement.querySelector('.carousel-control-prev');
       const nextControlElm = fixture.nativeElement.querySelector('.carousel-control-next');
       const next = fixture.nativeElement.querySelector('#next');
       const pause = fixture.nativeElement.querySelector('#pause');
       const cycle = fixture.nativeElement.querySelector('#cycle');

       expectActiveSlides(fixture.nativeElement, [true, false, false]);

       tick(1000);
       fixture.detectChanges();
       expect(spyCallBack)
           .toHaveBeenCalledWith(jasmine.objectContaining({paused: false, source: NgbSlideEventSource.TIMER}));
       spyCallBack.calls.reset();
       expectActiveSlides(fixture.nativeElement, [false, true, false]);

       pause.click();
       tick(1000);
       fixture.detectChanges();
       expect(spyCallBack).not.toHaveBeenCalled();
       expectActiveSlides(fixture.nativeElement, [false, true, false]);

       indicatorElms[0].click();
       fixture.detectChanges();
       expect(spyCallBack)
           .toHaveBeenCalledWith(jasmine.objectContaining({paused: true, source: NgbSlideEventSource.INDICATOR}));
       spyCallBack.calls.reset();
       expectActiveSlides(fixture.nativeElement, [true, false, false]);
       tick(1000);
       fixture.detectChanges();
       expect(spyCallBack).not.toHaveBeenCalled();
       expectActiveSlides(fixture.nativeElement, [true, false, false]);

       nextControlElm.click();
       fixture.detectChanges();
       expect(spyCallBack)
           .toHaveBeenCalledWith(jasmine.objectContaining({paused: true, source: NgbSlideEventSource.ARROW_RIGHT}));
       spyCallBack.calls.reset();
       expectActiveSlides(fixture.nativeElement, [false, true, false]);
       tick(1000);
       fixture.detectChanges();
       expect(spyCallBack).not.toHaveBeenCalled();
       expectActiveSlides(fixture.nativeElement, [false, true, false]);

       prevControlElm.click();
       fixture.detectChanges();
       expect(spyCallBack)
           .toHaveBeenCalledWith(jasmine.objectContaining({paused: true, source: NgbSlideEventSource.ARROW_LEFT}));
       spyCallBack.calls.reset();
       expectActiveSlides(fixture.nativeElement, [true, false, false]);
       tick(1000);
       fixture.detectChanges();
       expect(spyCallBack).not.toHaveBeenCalled();
       expectActiveSlides(fixture.nativeElement, [true, false, false]);

       next.click();
       fixture.detectChanges();
       expect(spyCallBack).toHaveBeenCalledWith(jasmine.objectContaining({paused: true}));
       spyCallBack.calls.reset();
       expectActiveSlides(fixture.nativeElement, [false, true, false]);
       tick(1000);
       fixture.detectChanges();
       expect(spyCallBack).not.toHaveBeenCalled();
       expectActiveSlides(fixture.nativeElement, [false, true, false]);

       carouselDebugEl.triggerEventHandler('mouseenter', {});
       fixture.detectChanges();
       carouselDebugEl.triggerEventHandler('mouseleave', {});
       fixture.detectChanges();
       tick(1000);
       fixture.detectChanges();
       expect(spyCallBack).not.toHaveBeenCalled();
       expectActiveSlides(fixture.nativeElement, [false, true, false]);

       cycle.click();
       tick(1000);
       fixture.detectChanges();
       expect(spyCallBack)
           .toHaveBeenCalledWith(jasmine.objectContaining({paused: false, source: NgbSlideEventSource.TIMER}));
       expectActiveSlides(fixture.nativeElement, [false, false, true]);

       discardPeriodicTasks();
     }));


  it('should mark component for check for API calls', () => {
    const html = `
      <ngb-carousel #c [interval]="0">
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
        <ng-template ngbSlide *ngIf="addNewSlide">baz</ng-template>
      </ngb-carousel>
      <button id="next" (click)="c.next(); addNewSlide = true">Next</button>
    `;

    const fixture = createTestComponent(html);
    const next = fixture.nativeElement.querySelector('#next');

    expectActiveSlides(fixture.nativeElement, [true, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(fixture.nativeElement, [false, true, false]);
  });

  it('should mark component for check when slides change', () => {
    const html = `
      <ngb-carousel #c [interval]="0">
        <ng-template ngbSlide *ngFor="let s of slides">
          <div class="slide">{{ s }}</div>
        </ng-template>
      </ngb-carousel>
    `;

    function getSlidesText(element: HTMLElement): string[] {
      return Array.from(element.querySelectorAll('.carousel-item .slide')).map((el: HTMLElement) => el.innerHTML);
    }

    const fixture = createTestComponent(html);
    expect(getSlidesText(fixture.nativeElement)).toEqual(['a', 'b']);

    fixture.componentInstance.slides = ['c', 'd'];
    fixture.detectChanges();
    expect(getSlidesText(fixture.nativeElement)).toEqual(['c', 'd']);
    expectActiveSlides(fixture.nativeElement, [true, false]);
  });

  it('should change slide on indicator click', fakeAsync(() => {
       const html = `
     <ngb-carousel>
       <ng-template ngbSlide>foo</ng-template>
       <ng-template ngbSlide>bar</ng-template>
     </ngb-carousel>
   `;

       const fixture = createTestComponent(html);
       const indicatorElms = fixture.nativeElement.querySelectorAll('ol.carousel-indicators > li');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       indicatorElms[1].click();
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should fire a slide event with correct direction and source on indicator click', fakeAsync(() => {
       const html = `
      <ngb-carousel (slide)="carouselSlideCallBack($event)">
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
        <ng-template ngbSlide>pluto</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);
       const indicatorElms = fixture.nativeElement.querySelectorAll('ol.carousel-indicators > li');
       const spyCallBack = spyOn(fixture.componentInstance, 'carouselSlideCallBack');

       indicatorElms[1].click();
       fixture.detectChanges();
       expect(fixture.componentInstance.carouselSlideCallBack).toHaveBeenCalledWith(jasmine.objectContaining({
         direction: NgbSlideEventDirection.LEFT,
         source: NgbSlideEventSource.INDICATOR
       }));

       spyCallBack.calls.reset();
       indicatorElms[0].click();
       fixture.detectChanges();
       expect(fixture.componentInstance.carouselSlideCallBack).toHaveBeenCalledWith(jasmine.objectContaining({
         direction: NgbSlideEventDirection.RIGHT,
         source: NgbSlideEventSource.INDICATOR,
       }));

       spyCallBack.calls.reset();
       indicatorElms[2].click();
       fixture.detectChanges();
       expect(fixture.componentInstance.carouselSlideCallBack).toHaveBeenCalledWith(jasmine.objectContaining({
         direction: NgbSlideEventDirection.LEFT,
         source: NgbSlideEventSource.INDICATOR
       }));

       discardPeriodicTasks();
     }));

  it('should change slide on carousel control click', fakeAsync(() => {
       const html = `
      <ngb-carousel>
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);

       const prevControlElm = fixture.nativeElement.querySelector('.carousel-control-prev');
       const nextControlElm = fixture.nativeElement.querySelector('.carousel-control-next');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       prevControlElm.click();  // prev
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));

  it('should fire a slide event with correct direction and source on carousel control click', fakeAsync(() => {
       const html = `
      <ngb-carousel (slide)="carouselSlideCallBack($event)">
        <ng-template ngbSlide (slid)="carouselSingleSlideCallBack($event, 'foo')">foo</ng-template>
        <ng-template ngbSlide (slid)="carouselSingleSlideCallBack($event, 'bar')">bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);
       const prevControlElm = fixture.nativeElement.querySelector('.carousel-control-prev');
       const nextControlElm = fixture.nativeElement.querySelector('.carousel-control-next');
       const spyCallBack = spyOn(fixture.componentInstance, 'carouselSlideCallBack');
       const spySingleCallBack = spyOn(fixture.componentInstance, 'carouselSingleSlideCallBack');

       prevControlElm.click();
       fixture.detectChanges();
       expect(fixture.componentInstance.carouselSlideCallBack).toHaveBeenCalledWith(jasmine.objectContaining({
         direction: NgbSlideEventDirection.RIGHT,
         source: NgbSlideEventSource.ARROW_LEFT
       }));
       expect(spySingleCallBack.calls.allArgs()).toEqual([
         [{isShown: false, direction: NgbSlideEventDirection.RIGHT, source: NgbSlideEventSource.ARROW_LEFT}, 'foo'],
         [{isShown: true, direction: NgbSlideEventDirection.RIGHT, source: NgbSlideEventSource.ARROW_LEFT}, 'bar'],
       ]);

       spyCallBack.calls.reset();
       spySingleCallBack.calls.reset();
       nextControlElm.click();
       fixture.detectChanges();
       expect(fixture.componentInstance.carouselSlideCallBack).toHaveBeenCalledWith(jasmine.objectContaining({
         direction: NgbSlideEventDirection.LEFT,
         source: NgbSlideEventSource.ARROW_RIGHT
       }));
       expect(spySingleCallBack.calls.allArgs()).toEqual([
         [{isShown: false, direction: NgbSlideEventDirection.LEFT, source: NgbSlideEventSource.ARROW_RIGHT}, 'bar'],
         [{isShown: true, direction: NgbSlideEventDirection.LEFT, source: NgbSlideEventSource.ARROW_RIGHT}, 'foo'],
       ]);

       spyCallBack.calls.reset();
       spySingleCallBack.calls.reset();
       prevControlElm.click();
       fixture.detectChanges();
       expect(fixture.componentInstance.carouselSlideCallBack).toHaveBeenCalledWith(jasmine.objectContaining({
         direction: NgbSlideEventDirection.RIGHT,
         source: NgbSlideEventSource.ARROW_LEFT
       }));
       expect(spySingleCallBack.calls.allArgs()).toEqual([
         [{isShown: false, direction: NgbSlideEventDirection.RIGHT, source: NgbSlideEventSource.ARROW_LEFT}, 'foo'],
         [{isShown: true, direction: NgbSlideEventDirection.RIGHT, source: NgbSlideEventSource.ARROW_LEFT}, 'bar'],
       ]);

       discardPeriodicTasks();
     }));

  it('should change slide on time passage (default interval value)', fakeAsync(() => {
       const html = `
      <ngb-carousel>
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);

       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should fire a slide event with correct direction and source on time passage', fakeAsync(() => {
       const html = `
     <ngb-carousel [interval]="2000" (slide)="carouselSlideCallBack($event)">
       <ng-template ngbSlide>foo</ng-template>
       <ng-template ngbSlide>bar</ng-template>
     </ngb-carousel>
   `;

       const fixture = createTestComponent(html);
       const spyCallBack = spyOn(fixture.componentInstance, 'carouselSlideCallBack');

       tick(1999);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);
       expect(spyCallBack).not.toHaveBeenCalled();

       tick(1);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);
       expect(spyCallBack).toHaveBeenCalledWith(jasmine.objectContaining({
         direction: NgbSlideEventDirection.LEFT,
         source: NgbSlideEventSource.TIMER
       }));

       discardPeriodicTasks();
     }));

  it('should change slide on time passage in OnPush component (default interval value)', fakeAsync(() => {
       const fixture = createTestComponent('<test-cmp-on-push></test-cmp-on-push>');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should change slide on time passage (custom interval value)', fakeAsync(() => {
       const html = `
      <ngb-carousel [interval]="2000">
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);

       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(1000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(1200);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should not change slide on time passage (custom interval value is zero)', fakeAsync(() => {
       const html = `
      <ngb-carousel [interval]="0">
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);

       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(1000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(1200);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));

  it('should change slide with different rate when interval value changed', fakeAsync(() => {
       const html = `
      <ngb-carousel [interval]="interval">
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
        <ng-template ngbSlide>zoo</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);
       fixture.componentInstance.interval = 5000;
       fixture.detectChanges();

       expectActiveSlides(fixture.nativeElement, [true, false, false]);

       tick(5001);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true, false]);

       fixture.componentInstance.interval = 1000;
       fixture.detectChanges();

       tick(1001);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, false, true]);

       discardPeriodicTasks();
     }));

  it('should listen to mouse events based on pauseOnHover attribute', fakeAsync(() => {

       const html = `
    <ngb-carousel [pauseOnHover]="pauseOnHover">
      <ng-template ngbSlide>foo</ng-template>
      <ng-template ngbSlide>bar</ng-template>
    </ngb-carousel>
  `;

       const fixture = createTestComponent(html);

       const carouselDebugEl = fixture.debugElement.query(By.directive(NgbCarousel));

       expectActiveSlides(fixture.nativeElement, [true, false]);

       carouselDebugEl.triggerEventHandler('mouseenter', {});
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       carouselDebugEl.triggerEventHandler('mouseleave', {});
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       fixture.componentInstance.pauseOnHover = false;
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       carouselDebugEl.triggerEventHandler('mouseenter', {});
       fixture.detectChanges();

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);
       discardPeriodicTasks();
     }));

  it('should pause / resume slide change with time passage on mouse enter / leave', fakeAsync(() => {
       const html = `
      <ngb-carousel>
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);

       const carouselDebugEl = fixture.debugElement.query(By.directive(NgbCarousel));

       expectActiveSlides(fixture.nativeElement, [true, false]);

       carouselDebugEl.triggerEventHandler('mouseenter', {});
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       carouselDebugEl.triggerEventHandler('mouseleave', {});
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should pause / resume slide change with time passage on focusin / focusout', fakeAsync(() => {
       const html = `
      <ngb-carousel>
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);

       const carouselDebugEl = fixture.debugElement.query(By.directive(NgbCarousel));

       expectActiveSlides(fixture.nativeElement, [true, false]);

       carouselDebugEl.triggerEventHandler('focusin', {});
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       carouselDebugEl.triggerEventHandler('focusout', {});
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));


  it('should wrap slide changes by default', fakeAsync(() => {
       const html = `
      <ngb-carousel>
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);

       const prevControlElm = fixture.nativeElement.querySelector('.carousel-control-prev');
       const nextControlElm = fixture.nativeElement.querySelector('.carousel-control-next');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       prevControlElm.click();  // prev
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should not wrap slide changes by when requested', fakeAsync(() => {
       const html = `
      <ngb-carousel [wrap]="false">
        <ng-template ngbSlide>foo</ng-template>
        <ng-template ngbSlide>bar</ng-template>
      </ngb-carousel>
    `;

       const fixture = createTestComponent(html);

       const prevControlElm = fixture.nativeElement.querySelector('.carousel-control-prev');
       const nextControlElm = fixture.nativeElement.querySelector('.carousel-control-next');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       prevControlElm.click();  // prev
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should change on key arrowRight and arrowLeft', fakeAsync(() => {
       const html = `
            <ngb-carousel [keyboard]="keyboard" [wrap]="false">
              <ng-template ngbSlide>foo</ng-template>
              <ng-template ngbSlide>bar</ng-template>
            </ngb-carousel>
          `;

       const fixture = createTestComponent(html);
       expectActiveSlides(fixture.nativeElement, [true, false]);

       fixture.debugElement.query(By.directive(NgbCarousel)).triggerEventHandler('keydown.arrowRight', {});  // next()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       fixture.debugElement.query(By.directive(NgbCarousel)).triggerEventHandler('keydown.arrowLeft', {});  // prev()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       fixture.componentInstance.keyboard = false;
       fixture.detectChanges();
       fixture.debugElement.query(By.directive(NgbCarousel)).triggerEventHandler('keydown.arrowRight', {});  // prev()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);


       discardPeriodicTasks();

     }));

  it('should listen to keyevents based on keyboard attribute', fakeAsync(() => {
       const html = `
               <ngb-carousel [keyboard]="keyboard" >
                 <ng-template ngbSlide>foo</ng-template>
                 <ng-template ngbSlide>bar</ng-template>
               </ngb-carousel>
             `;

       const fixture = createTestComponent(html);
       expectActiveSlides(fixture.nativeElement, [true, false]);

       fixture.componentInstance.keyboard = false;
       fixture.detectChanges();
       fixture.debugElement.query(By.directive(NgbCarousel)).triggerEventHandler('keydown.arrowRight', {});  // prev()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       fixture.componentInstance.keyboard = true;
       fixture.detectChanges();
       fixture.debugElement.query(By.directive(NgbCarousel)).triggerEventHandler('keydown.arrowRight', {});  // next()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();

     }));

  it('should render navigation indicators according to the flags', fakeAsync(() => {
       const html = `
    <ngb-carousel [showNavigationIndicators]="showNavigationIndicators">
      <ng-template ngbSlide>foo</ng-template>
    </ngb-carousel>
  `;
       const fixture = createTestComponent(html);

       const slideElms = fixture.nativeElement.querySelectorAll('.carousel-item');
       expect(slideElms.length).toBe(1);
       expect(slideElms[0].textContent).toMatch(/foo/);
       expect(fixture.nativeElement.querySelectorAll('ol.carousel-indicators.sr-only > li').length).toBe(0);
       expect(fixture.nativeElement.querySelectorAll('ol.carousel-indicators > li').length).toBe(1);

       fixture.componentInstance.showNavigationIndicators = false;
       fixture.detectChanges();
       expect(fixture.nativeElement.querySelectorAll('ol.carousel-indicators.sr-only > li').length).toBe(1);
       expect(fixture.nativeElement.querySelectorAll('ol.carousel-indicators > li').length).toBe(1);

       discardPeriodicTasks();
     }));

  it('should render navigation buttons according to the flags', fakeAsync(() => {
       const html = `
    <ngb-carousel [showNavigationArrows]="showNavigationArrows">
      <ng-template ngbSlide>foo</ng-template>
    </ngb-carousel>
  `;
       const fixture = createTestComponent(html);

       const slideElms = fixture.nativeElement.querySelectorAll('.carousel-item');
       expect(slideElms.length).toBe(1);
       expect(fixture.nativeElement.querySelectorAll('[role="button"]').length).toBe(2);

       fixture.componentInstance.showNavigationArrows = false;
       fixture.detectChanges();
       expect(fixture.nativeElement.querySelectorAll('[role="button"]').length).toBe(0);

       discardPeriodicTasks();
     }));

  describe('Custom config', () => {
    let config: NgbCarouselConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [NgbCarouselModule]}); });

    beforeEach(inject([NgbCarouselConfig], (c: NgbCarouselConfig) => {
      config = c;
      config.interval = 1000;
      config.wrap = false;
      config.keyboard = false;
      config.pauseOnHover = false;
      config.pauseOnFocus = false;
      config.showNavigationIndicators = true;
      config.showNavigationArrows = true;
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(NgbCarousel);
      fixture.detectChanges();

      const carousel = fixture.componentInstance;
      expect(carousel.interval).toBe(config.interval);
      expect(carousel.wrap).toBe(config.wrap);
      expect(carousel.keyboard).toBe(config.keyboard);
      expect(carousel.pauseOnHover).toBe(config.pauseOnHover);
      expect(carousel.pauseOnFocus).toBe(config.pauseOnFocus);
      expect(carousel.showNavigationIndicators).toBe(config.showNavigationIndicators);
      expect(carousel.showNavigationArrows).toBe(config.showNavigationArrows);
    });
  });

  describe('Custom config as provider', () => {
    const config = new NgbCarouselConfig(new NgbConfig());
    config.interval = 1000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.pauseOnFocus = false;
    config.showNavigationIndicators = true;
    config.showNavigationArrows = true;

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbCarouselModule], providers: [{provide: NgbCarouselConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(NgbCarousel);
      fixture.detectChanges();

      const carousel = fixture.componentInstance;
      expect(carousel.interval).toBe(config.interval);
      expect(carousel.wrap).toBe(config.wrap);
      expect(carousel.keyboard).toBe(config.keyboard);
      expect(carousel.pauseOnHover).toBe(config.pauseOnHover);
      expect(carousel.pauseOnFocus).toBe(config.pauseOnFocus);
      expect(carousel.showNavigationIndicators).toBe(config.showNavigationIndicators);
      expect(carousel.showNavigationArrows).toBe(config.showNavigationArrows);
    });
  });

});

if (isBrowserVisible('ngb-carousel animations')) {
  describe('ngb-carousel animations', () => {

    @Component({
      template: `
      <ngb-carousel (slid)="onSlid($event)" [interval]="-1">
        <ng-template ngbSlide id="one">One</ng-template>
        <ng-template ngbSlide id="two">Two</ng-template>
        <ng-template ngbSlide id="three">Three</ng-template>
      </ngb-carousel>
      `,
      host: {'[class.ngb-reduce-motion]': 'reduceMotion'}
    })
    class TestAnimationComponent {
      reduceMotion = true;
      onSlid = (payload) => payload;
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestAnimationComponent],
        imports: [NgbCarouselModule],
        providers: [{provide: NgbConfig, useClass: NgbConfigAnimation}]
      });
    });

    it(`should run slide transition (force-reduced-motion = false)`, (done) => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = false;
      fixture.detectChanges();

      const nativeEl = fixture.nativeElement;

      const onSlidSpy = spyOn(fixture.componentInstance, 'onSlid');

      const[slideOne, slideTwo] = nativeEl.querySelectorAll('.carousel-item');
      const indicators = nativeEl.querySelectorAll('ol.carousel-indicators > li');

      onSlidSpy.and.callFake((payload) => {
        expect(slideOne.className).toBe('carousel-item');
        expect(slideTwo.className).toBe('carousel-item active');

        expect(payload).toEqual({prev: 'one', current: 'two', direction: 'left', paused: false, source: 'indicator'});
        expect(onSlidSpy).toHaveBeenCalledTimes(1);
        done();
      });

      expect(slideOne.className).toBe('carousel-item active');
      expect(slideTwo.className).toBe('carousel-item');

      indicators[1].click();
      fixture.detectChanges();

      expect(slideOne.className).toBe('carousel-item active carousel-item-left');
      expect(slideTwo.className).toBe('carousel-item carousel-item-next carousel-item-left');
    });

    it(`should run slide transition (force-reduced-motion = true)`, () => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = true;
      fixture.detectChanges();

      const nativeEl = fixture.nativeElement;

      const onSlidSpy = spyOn(fixture.componentInstance, 'onSlid');

      const[slideOne, slideTwo] = nativeEl.querySelectorAll('.carousel-item');
      const indicators = nativeEl.querySelectorAll('ol.carousel-indicators > li');

      expect(slideOne.className).toBe('carousel-item active');
      expect(slideTwo.className).toBe('carousel-item');

      indicators[1].click();
      fixture.detectChanges();

      expect(slideOne.className).toBe('carousel-item');
      expect(slideTwo.className).toBe('carousel-item active');

      expect(onSlidSpy).toHaveBeenCalledWith(
          {prev: 'one', current: 'two', direction: 'left', paused: false, source: 'indicator'});
      expect(onSlidSpy).toHaveBeenCalledTimes(1);
    });

    it(`should revert slide transition (force-reduced-motion = false)`, (done) => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = false;
      fixture.detectChanges();

      const nativeEl = fixture.nativeElement;
      const[slideOne, slideTwo, slideThree] = nativeEl.querySelectorAll('.carousel-item');
      const indicators = nativeEl.querySelectorAll('ol.carousel-indicators > li');

      const onSlidSpy = spyOn(fixture.componentInstance, 'onSlid');
      onSlidSpy.and.callFake((payload) => {
        expect(slideOne.className).toBe('carousel-item active');
        expect(slideTwo.className).toBe('carousel-item');
        expect(slideThree.className).toBe('carousel-item');

        expect(payload).toEqual({prev: 'two', current: 'one', direction: 'right', paused: false, source: 'indicator'});
        expect(onSlidSpy).toHaveBeenCalledTimes(1);

        done();
      });

      expect(slideOne.className).toBe('carousel-item active');
      expect(slideTwo.className).toBe('carousel-item');

      indicators[1].click();
      fixture.detectChanges();

      expect(slideOne.className).toBe('carousel-item active carousel-item-left');
      expect(slideTwo.className).toBe('carousel-item carousel-item-next carousel-item-left');
      expect(slideThree.className).toBe('carousel-item');

      // Reverse only possible when clicking on previous one
      indicators[2].click();
      fixture.detectChanges();

      expect(slideOne.className).toBe('carousel-item active carousel-item-left');
      expect(slideTwo.className).toBe('carousel-item carousel-item-next carousel-item-left');
      expect(slideThree.className).toBe('carousel-item');

      // Reverse
      indicators[0].click();
      fixture.detectChanges();

      expect(slideOne.className).toBe('carousel-item active');
      expect(slideTwo.className).toBe('carousel-item carousel-item-next');
      expect(slideThree.className).toBe('carousel-item');
    });

    it(`should revert slide transition (force-reduced-motion = true)`, () => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      fixture.componentInstance.reduceMotion = true;
      fixture.detectChanges();

      const nativeEl = fixture.nativeElement;

      const onSlidSpy = spyOn(fixture.componentInstance, 'onSlid');

      const[slideOne, slideTwo, slideThree] = nativeEl.querySelectorAll('.carousel-item');
      const indicators = nativeEl.querySelectorAll('ol.carousel-indicators > li');

      expect(slideOne.className).toBe('carousel-item active');
      expect(slideTwo.className).toBe('carousel-item');
      expect(slideThree.className).toBe('carousel-item');

      indicators[1].click();
      fixture.detectChanges();

      expect(slideOne.className).toBe('carousel-item');
      expect(slideTwo.className).toBe('carousel-item active');
      expect(slideThree.className).toBe('carousel-item');

      indicators[2].click();
      fixture.detectChanges();

      expect(slideOne.className).toBe('carousel-item');
      expect(slideTwo.className).toBe('carousel-item');
      expect(slideThree.className).toBe('carousel-item active');

      indicators[0].click();
      fixture.detectChanges();

      expect(slideOne.className).toBe('carousel-item active');
      expect(slideTwo.className).toBe('carousel-item');
      expect(slideThree.className).toBe('carousel-item');

      expect(onSlidSpy.calls.allArgs()).toEqual([
        [{prev: 'one', current: 'two', direction: 'left', paused: false, source: 'indicator'}],
        [{prev: 'two', current: 'three', direction: 'left', paused: false, source: 'indicator'}],
        [{prev: 'three', current: 'one', direction: 'right', paused: false, source: 'indicator'}],
      ]);

      expect(onSlidSpy).toHaveBeenCalledTimes(3);
    });

  });
}

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  addNewSlide = false;
  interval;
  activeSlideId;
  keyboard = true;
  pauseOnHover = true;
  showNavigationArrows = true;
  showNavigationIndicators = true;
  slides = ['a', 'b'];
  carouselSlideCallBack = (event: NgbSlideEvent) => {};
  carouselSingleSlideCallBack = (event: NgbSingleSlideEvent, id: string) => {};
}

@Component({
  selector: 'test-cmp-on-push',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ngb-carousel>
      <ng-template ngbSlide>foo</ng-template>
      <ng-template ngbSlide>bar</ng-template>
    </ngb-carousel>
  `
})
class TestComponentOnPush {
}
