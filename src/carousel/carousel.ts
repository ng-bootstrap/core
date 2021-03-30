import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Output,
  PLATFORM_ID,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {NgbCarouselConfig} from './carousel-config';

import {BehaviorSubject, combineLatest, NEVER, Observable, Subject, timer, zip} from 'rxjs';
import {distinctUntilChanged, map, startWith, switchMap, take, takeUntil} from 'rxjs/operators';
import {ngbCompleteTransition, ngbRunTransition, NgbTransitionOptions} from '../util/transition/ngbTransition';
import {
  ngbCarouselTransitionIn,
  ngbCarouselTransitionOut,
  NgbSlideEventDirection,
  NgbCarouselCtx
} from './carousel-transition';

let nextId = 0;

/**
 * A directive that wraps the individual carousel slide.
 */
@Directive({selector: 'ng-template[ngbSlide]'})
export class NgbSlide {
  /**
   * Slide id that must be unique for the entire document.
   *
   * If not provided, will be generated in the `ngb-slide-xx` format.
   */
  @Input() id = `ngb-slide-${nextId++}`;

  /**
   * An event emitted when the slide transition is finished
   *
   * @since 8.0.0
   */
  @Output() slid = new EventEmitter<NgbSingleSlideEvent>();

  constructor(public tplRef: TemplateRef<any>) {}
}

/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
@Component({
  selector: 'ngb-carousel',
  exportAs: 'ngbCarousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'carousel slide',
    '[style.display]': '"block"',
    'tabIndex': '0',
    '(keydown.arrowLeft)': 'keyboard && arrowLeft()',
    '(keydown.arrowRight)': 'keyboard && arrowRight()',
    '(mouseenter)': 'mouseHover = true',
    '(mouseleave)': 'mouseHover = false',
    '(focusin)': 'focused = true',
    '(focusout)': 'focused = false',
    '[attr.aria-activedescendant]': `'slide-' + activeId`
  },
  template: `
    <ol class="carousel-indicators" [class.sr-only]="!showNavigationIndicators" role="tablist">
      <li *ngFor="let slide of slides" [class.active]="slide.id === activeId"
          role="tab" [attr.aria-labelledby]="'slide-' + slide.id" [attr.aria-controls]="'slide-' + slide.id"
          [attr.aria-selected]="slide.id === activeId"
          (click)="focus();select(slide.id, NgbSlideEventSource.INDICATOR);"></li>
    </ol>
    <div class="carousel-inner">
      <div *ngFor="let slide of slides; index as i; count as c" class="carousel-item" [id]="'slide-' + slide.id" role="tabpanel">
        <span class="sr-only" i18n="Currently selected slide number read by screen reader@@ngb.carousel.slide-number">
          Slide {{i + 1}} of {{c}}
        </span>
        <ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" (click)="arrowLeft()" *ngIf="showNavigationArrows">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.previous">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" (click)="arrowRight()" *ngIf="showNavigationArrows">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.next">Next</span>
    </a>
  `
})
export class NgbCarousel implements AfterContentChecked,
    AfterContentInit, AfterViewInit, OnDestroy {
  @ContentChildren(NgbSlide) slides: QueryList<NgbSlide>;

  public NgbSlideEventSource = NgbSlideEventSource;

  private _destroy$ = new Subject<void>();
  private _interval$ = new BehaviorSubject(0);
  private _mouseHover$ = new BehaviorSubject(false);
  private _focused$ = new BehaviorSubject(false);
  private _pauseOnHover$ = new BehaviorSubject(false);
  private _pauseOnFocus$ = new BehaviorSubject(false);
  private _pause$ = new BehaviorSubject(false);
  private _wrap$ = new BehaviorSubject(false);

  /**
   * A flag to enable/disable the animations.
   *
   * @since 8.0.0
   */
  @Input() animation: boolean;

  /**
   * The slide id that should be displayed **initially**.
   *
   * For subsequent interactions use methods `select()`, `next()`, etc. and the `(slide)` output.
   */
  @Input() activeId: string;

  /**
   * Time in milliseconds before the next slide is shown.
   */
  @Input()
  set interval(value: number) {
    this._interval$.next(value);
  }

  get interval() { return this._interval$.value; }

  /**
   * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
   */
  @Input()
  set wrap(value: boolean) {
    this._wrap$.next(value);
  }

  get wrap() { return this._wrap$.value; }

  /**
   * If `true`, allows to interact with carousel using keyboard 'arrow left' and 'arrow right'.
   */
  @Input() keyboard: boolean;

  /**
   * If `true`, will pause slide switching when mouse cursor hovers the slide.
   *
   * @since 2.2.0
   */
  @Input()
  set pauseOnHover(value: boolean) {
    this._pauseOnHover$.next(value);
  }

  get pauseOnHover() { return this._pauseOnHover$.value; }

  /**
   * If `true`, will pause slide switching when the focus is inside the carousel.
   */
  @Input()
  set pauseOnFocus(value: boolean) {
    this._pauseOnFocus$.next(value);
  }

  get pauseOnFocus() { return this._pauseOnFocus$.value; }

  /**
   * If `true`, 'previous' and 'next' navigation arrows will be visible on the slide.
   *
   * @since 2.2.0
   */
  @Input() showNavigationArrows: boolean;

  /**
   * If `true`, navigation indicators at the bottom of the slide will be visible.
   *
   * @since 2.2.0
   */
  @Input() showNavigationIndicators: boolean;

  /**
   * An event emitted just before the slide transition starts.
   *
   * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
   */
  @Output() slide = new EventEmitter<NgbSlideEvent>();

  /**
   * An event emitted right after the slide transition is completed.
   *
   * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
   *
   * @since 8.0.0
   */
  @Output() slid = new EventEmitter<NgbSlideEvent>();

  /*
   * Keep the ids of the panels currently transitionning
   * in order to allow only the transition revertion
   */
  private _transitionIds: [string, string] | null = null;

  set mouseHover(value: boolean) { this._mouseHover$.next(value); }

  get mouseHover() { return this._mouseHover$.value; }

  set focused(value: boolean) { this._focused$.next(value); }

  get focused() { return this._focused$.value; }

  constructor(
      config: NgbCarouselConfig, @Inject(PLATFORM_ID) private _platformId, private _ngZone: NgZone,
      private _cd: ChangeDetectorRef, private _container: ElementRef) {
    this.animation = config.animation;
    this.interval = config.interval;
    this.wrap = config.wrap;
    this.keyboard = config.keyboard;
    this.pauseOnHover = config.pauseOnHover;
    this.pauseOnFocus = config.pauseOnFocus;
    this.showNavigationArrows = config.showNavigationArrows;
    this.showNavigationIndicators = config.showNavigationIndicators;
  }

  arrowLeft() {
    this.focus();
    this.prev(NgbSlideEventSource.ARROW_LEFT);
  }

  arrowRight() {
    this.focus();
    this.next(NgbSlideEventSource.ARROW_RIGHT);
  }

  ngAfterContentInit() {
    // setInterval() doesn't play well with SSR and protractor,
    // so we should run it in the browser and outside Angular
    if (isPlatformBrowser(this._platformId)) {
      this._ngZone.runOutsideAngular(() => {
        const hasNextSlide$ = combineLatest([
                                this.slide.pipe(map(slideEvent => slideEvent.current), startWith(this.activeId)),
                                this._wrap$, this.slides.changes.pipe(startWith(null))
                              ])
                                  .pipe(
                                      map(([currentSlideId, wrap]) => {
                                        const slideArr = this.slides.toArray();
                                        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
                                        return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                                      }),
                                      distinctUntilChanged());
        combineLatest([
          this._pause$, this._pauseOnHover$, this._mouseHover$, this._pauseOnFocus$, this._focused$, this._interval$,
          hasNextSlide$
        ])
            .pipe(
                map(([pause, pauseOnHover, mouseHover, pauseOnFocus, focused, interval,
                      hasNextSlide]: [boolean, boolean, boolean, boolean, boolean, number, boolean]) =>
                        ((pause || (pauseOnHover && mouseHover) || (pauseOnFocus && focused) || !hasNextSlide) ?
                             0 :
                             interval)),

                distinctUntilChanged(), switchMap(interval => interval > 0 ? timer(interval, interval) : NEVER),
                takeUntil(this._destroy$))
            .subscribe(() => this._ngZone.run(() => this.next(NgbSlideEventSource.TIMER)));
      });
    }

    this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._transitionIds ?.forEach(id => ngbCompleteTransition(this._getSlideElement(id)));
      this._transitionIds = null;

      this._cd.markForCheck();

      // The following code need to be done asynchronously, after the dom becomes stable,
      // otherwise all changes will be undone.
      this._ngZone.onStable.pipe(take(1)).subscribe(() => {
        for (const { id } of this.slides) {
          const element = this._getSlideElement(id);
          if (id === this.activeId) {
            element.classList.add('active');
          } else {
            element.classList.remove('active');
          }
        }
      });
    });
  }

  ngAfterContentChecked() {
    let activeSlide = this._getSlideById(this.activeId);
    this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : '');
  }

  ngAfterViewInit() {
    // Initialize the 'active' class (not managed by the template)
    if (this.activeId) {
      const element = this._getSlideElement(this.activeId);
      if (element) {
        element.classList.add('active');
      }
    }
  }

  ngOnDestroy() { this._destroy$.next(); }

  /**
   * Navigates to a slide with the specified identifier.
   */
  select(slideId: string, source?: NgbSlideEventSource) {
    this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
  }

  /**
   * Navigates to the previous slide.
   */
  prev(source?: NgbSlideEventSource) {
    this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT, source);
  }

  /**
   * Navigates to the next slide.
   */
  next(source?: NgbSlideEventSource) {
    this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT, source);
  }

  /**
   * Pauses cycling through the slides.
   */
  pause() { this._pause$.next(true); }

  /**
   * Restarts cycling through the slides from left to right.
   */
  cycle() { this._pause$.next(false); }

  /**
   * Set the focus on the carousel.
   */
  focus() { this._container.nativeElement.focus(); }

  private _cycleToSelected(slideIdx: string, direction: NgbSlideEventDirection, source?: NgbSlideEventSource) {
    const transitionIds = this._transitionIds;
    if (transitionIds && (transitionIds[0] !== slideIdx || transitionIds[1] !== this.activeId)) {
      // Revert prevented
      return;
    }

    let selectedSlide = this._getSlideById(slideIdx);
    if (selectedSlide && selectedSlide.id !== this.activeId) {
      this._transitionIds = [this.activeId, slideIdx];
      this.slide.emit(
          {prev: this.activeId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source});

      const options: NgbTransitionOptions<NgbCarouselCtx> = {
        animation: this.animation,
        runningTransition: 'stop',
        context: {direction},
      };

      const transitions: Array<Observable<any>> = [];
      const activeSlide = this._getSlideById(this.activeId);
      if (activeSlide) {
        const activeSlideTransition =
            ngbRunTransition(this._ngZone, this._getSlideElement(activeSlide.id), ngbCarouselTransitionOut, options);
        activeSlideTransition.subscribe(() => { activeSlide.slid.emit({isShown: false, direction, source}); });
        transitions.push(activeSlideTransition);
      }

      const previousId = this.activeId;
      this.activeId = selectedSlide.id;
      const nextSlide = this._getSlideById(this.activeId);
      const transition =
          ngbRunTransition(this._ngZone, this._getSlideElement(selectedSlide.id), ngbCarouselTransitionIn, options);
      transition.subscribe(() => { nextSlide ?.slid.emit({isShown: true, direction, source}); });
      transitions.push(transition);

      zip(...transitions).pipe(take(1)).subscribe(() => {
        this._transitionIds = null;
        this.slid.emit(
            {prev: previousId, current: selectedSlide !.id, direction: direction, paused: this._pause$.value, source});
      });
    }

    // we get here after the interval fires or any external API call like next(), prev() or select()
    this._cd.markForCheck();
  }

  private _getSlideEventDirection(currentActiveSlideId: string, nextActiveSlideId: string): NgbSlideEventDirection {
    const currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
    const nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);

    return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
  }

  private _getSlideById(slideId: string): NgbSlide | null {
    return this.slides.find(slide => slide.id === slideId) || null;
  }

  private _getSlideIdxById(slideId: string): number {
    const slide = this._getSlideById(slideId);
    return slide != null ? this.slides.toArray().indexOf(slide) : -1;
  }

  private _getNextSlide(currentSlideId: string): string {
    const slideArr = this.slides.toArray();
    const currentSlideIdx = this._getSlideIdxById(currentSlideId);
    const isLastSlide = currentSlideIdx === slideArr.length - 1;

    return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
                         slideArr[currentSlideIdx + 1].id;
  }

  private _getPrevSlide(currentSlideId: string): string {
    const slideArr = this.slides.toArray();
    const currentSlideIdx = this._getSlideIdxById(currentSlideId);
    const isFirstSlide = currentSlideIdx === 0;

    return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
                          slideArr[currentSlideIdx - 1].id;
  }

  private _getSlideElement(slideId: string): HTMLElement {
    return this._container.nativeElement.querySelector(`#slide-${slideId}`);
  }
}

/**
 * A slide change event emitted right after the slide transition is completed.
 */
export interface NgbSlideEvent {
  /**
   * The previous slide id.
   */
  prev: string;

  /**
   * The current slide id.
   */
  current: string;

  /**
   * The slide event direction.
   *
   * Possible values are `'left' | 'right'`.
   */
  direction: NgbSlideEventDirection;

  /**
   * Whether the pause() method was called (and no cycle() call was done afterwards).
   *
   * @since 5.1.0
   */
  paused: boolean;

  /**
   * Source triggering the slide change event.
   *
   * Possible values are `'timer' | 'arrowLeft' | 'arrowRight' | 'indicator'`
   *
   * @since 5.1.0
   */
  source?: NgbSlideEventSource;
}

/**
 * A slide change event emitted right after the slide transition is completed.
 *
 * @since 8.0.0
 */
export interface NgbSingleSlideEvent {
  /**
   * true if the slide is shown, false otherwise
   */
  isShown: boolean;

  /**
   * The slide event direction.
   *
   * Possible values are `'left' | 'right'`.
   */
  direction: NgbSlideEventDirection;

  /**
   * Source triggering the slide change event.
   *
   * Possible values are `'timer' | 'arrowLeft' | 'arrowRight' | 'indicator'`
   *
   */
  source?: NgbSlideEventSource;
}

export enum NgbSlideEventSource {
  TIMER = 'timer',
  ARROW_LEFT = 'arrowLeft',
  ARROW_RIGHT = 'arrowRight',
  INDICATOR = 'indicator'
}

export const NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
