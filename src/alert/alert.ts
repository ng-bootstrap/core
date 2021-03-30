import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  NgZone
} from '@angular/core';

import {Observable} from 'rxjs';

import {NgbAlertConfig} from './alert-config';
import {ngbRunTransition} from '../util/transition/ngbTransition';
import {ngbAlertFadingTransition} from './alert-transition';

/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
@Component({
  selector: 'ngb-alert',
  exportAs: 'ngbAlert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host:
      {'role': 'alert', 'class': 'alert show', '[class.fade]': 'animation', '[class.alert-dismissible]': 'dismissible'},
  template: `
    <ng-content></ng-content>
    <button *ngIf="dismissible" type="button" class="close" aria-label="Close" i18n-aria-label="@@ngb.alert.close"
      (click)="close()">
      <span aria-hidden="true">&times;</span>
    </button>
    `,
  styleUrls: ['./alert.scss']
})
export class NgbAlert implements OnInit,
    OnChanges {
  /**
   * If `true`, alert closing will be animated.
   *
   * Animation is triggered only when clicked on the close button (×)
   * or via the `.close()` function
   *
   * @since 8.0.0
   */
  @Input() animation: boolean;

  /**
   * If `true`, alert can be dismissed by the user.
   *
   * The close button (×) will be displayed and you can be notified
   * of the event with the `(close)` output.
   */
  @Input() dismissible: boolean;

  /**
   * Type of the alert.
   *
   * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
   * `'secondary'`, `'light'` and `'dark'`.
   */
  @Input() type: string;

  /**
   * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
   *
   * @since 8.0.0
   */
  @Output() closed = new EventEmitter<void>();


  constructor(
      config: NgbAlertConfig, private _renderer: Renderer2, private _element: ElementRef, private _zone: NgZone) {
    this.dismissible = config.dismissible;
    this.type = config.type;
    this.animation = config.animation;
  }

  /**
   * Triggers alert closing programmatically (same as clicking on the close button (×)).
   *
   * The returned observable will emit and be completed once the closing transition has finished.
   * If the animations are turned off this happens synchronously.
   *
   * Alternatively you could listen or subscribe to the `(closed)` output
   *
   * @since 8.0.0
   */
  close(): Observable<void> {
    const transition = ngbRunTransition(
        this._zone, this._element.nativeElement, ngbAlertFadingTransition,
        {animation: this.animation, runningTransition: 'continue'});
    transition.subscribe(() => this.closed.emit());
    return transition;
  }

  ngOnChanges(changes: SimpleChanges) {
    const typeChange = changes['type'];
    if (typeChange && !typeChange.firstChange) {
      this._renderer.removeClass(this._element.nativeElement, `alert-${typeChange.previousValue}`);
      this._renderer.addClass(this._element.nativeElement, `alert-${typeChange.currentValue}`);
    }
  }

  ngOnInit() { this._renderer.addClass(this._element.nativeElement, `alert-${this.type}`); }
}
