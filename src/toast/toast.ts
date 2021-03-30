import {
  AfterContentInit,
  Attribute,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  ElementRef,
  NgZone,
} from '@angular/core';

import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {NgbToastConfig} from './toast-config';
import {ngbRunTransition} from '../util/transition/ngbTransition';
import {ngbToastFadeInTransition, ngbToastFadeOutTransition} from './toast-transition';


/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
@Directive({selector: '[ngbToastHeader]'})
export class NgbToastHeader {
}

/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
@Component({
  selector: 'ngb-toast',
  exportAs: 'ngbToast',
  encapsulation: ViewEncapsulation.None,
  host: {
    'role': 'alert',
    '[attr.aria-live]': 'ariaLive',
    'aria-atomic': 'true',
    'class': 'toast',
    '[class.fade]': 'animation',
  },
  template: `
    <ng-template #headerTpl>
      <strong class="mr-auto">{{header}}</strong>
    </ng-template>
    <ng-template [ngIf]="contentHeaderTpl || header">
      <div class="toast-header">
        <ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
        <button type="button" class="close" aria-label="Close" i18n-aria-label="@@ngb.toast.close-aria" (click)="hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </ng-template>
    <div class="toast-body">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./toast.scss']
})
export class NgbToast implements AfterContentInit,
    OnChanges {
  /**
   * If `true`, toast opening and closing will be animated.
   *
   * Animation is triggered only when the `.hide()` or `.show()` functions are called
   *
   * @since 8.0.0
   */
  @Input() animation: boolean;

  private _timeoutID;

  /**
   * Delay after which the toast will hide (ms).
   * default: `500` (ms) (inherited from NgbToastConfig)
   */
  @Input() delay: number;

  /**
   * Auto hide the toast after a delay in ms.
   * default: `true` (inherited from NgbToastConfig)
   */
  @Input() autohide: boolean;

  /**
   * Text to be used as toast's header.
   * Ignored if a ContentChild template is specified at the same time.
   */
  @Input() header: string;

  /**
   * A template like `<ng-template ngbToastHeader></ng-template>` can be
   * used in the projected content to allow markup usage.
   */
  @ContentChild(NgbToastHeader, {read: TemplateRef, static: true}) contentHeaderTpl: TemplateRef<any>| null = null;

  /**
   * An event fired after the animation triggered by calling `.show()` method has finished.
   *
   * @since 8.0.0
   */
  @Output() shown = new EventEmitter<void>();

  /**
   * An event fired after the animation triggered by calling `.hide()` method has finished.
   *
   * It can only occur in 2 different scenarios:
   * - `autohide` timeout fires
   * - user clicks on a closing cross
   *
   * Additionally this output is purely informative. The toast won't be removed from DOM automatically, it's up
   * to the user to take care of that.
   *
   * @since 8.0.0
   */
  @Output() hidden = new EventEmitter<void>();

  constructor(
      @Attribute('aria-live') public ariaLive: string, config: NgbToastConfig, private _zone: NgZone,
      private _element: ElementRef) {
    if (this.ariaLive == null) {
      this.ariaLive = config.ariaLive;
    }
    this.delay = config.delay;
    this.autohide = config.autohide;
    this.animation = config.animation;
  }

  ngAfterContentInit() {
    this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
      this._init();
      this.show();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('autohide' in changes) {
      this._clearTimeout();
      this._init();
    }
  }

  /**
   * Triggers toast closing programmatically.
   *
   * The returned observable will emit and be completed once the closing transition has finished.
   * If the animations are turned off this happens synchronously.
   *
   * Alternatively you could listen or subscribe to the `(hidden)` output
   *
   * @since 8.0.0
   */
  hide(): Observable<void> {
    this._clearTimeout();
    const transition = ngbRunTransition(
        this._zone, this._element.nativeElement, ngbToastFadeOutTransition,
        {animation: this.animation, runningTransition: 'stop'});
    transition.subscribe(() => { this.hidden.emit(); });
    return transition;
  }

  /**
   * Triggers toast opening programmatically.
   *
   * The returned observable will emit and be completed once the opening transition has finished.
   * If the animations are turned off this happens synchronously.
   *
   * Alternatively you could listen or subscribe to the `(shown)` output
   *
   * @since 8.0.0
   */
  show(): Observable<void> {
    const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeInTransition, {
      animation: this.animation,
      runningTransition: 'continue',
    });
    transition.subscribe(() => { this.shown.emit(); });
    return transition;
  }

  private _init() {
    if (this.autohide && !this._timeoutID) {
      this._timeoutID = setTimeout(() => this.hide(), this.delay);
    }
  }

  private _clearTimeout() {
    if (this._timeoutID) {
      clearTimeout(this._timeoutID);
      this._timeoutID = null;
    }
  }
}
