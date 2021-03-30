import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {ngbRunTransition} from '../util/transition/ngbTransition';
import {ngbCollapsingTransition} from '../util/transition/ngbCollapseTransition';
import {NgbCollapseConfig} from './collapse-config';

/**
 * A directive to provide a simple way of hiding and showing elements on the page.
 */
@Directive({selector: '[ngbCollapse]', exportAs: 'ngbCollapse'})
export class NgbCollapse implements OnInit, OnChanges {
  /**
   * If `true`, collapse will be animated.
   *
   * Animation is triggered only when clicked on triggering element
   * or via the `.toggle()` function
   *
   * @since 8.0.0
   */
  @Input() animation;

  /**
   * If `true`, will collapse the element or show it otherwise.
   */
  @Input('ngbCollapse') collapsed = false;

  @Output() ngbCollapseChange = new EventEmitter<boolean>();

  /**
   * An event emitted when the collapse element is shown, after the transition. It has no payload.
   *
   * @since 8.0.0
   */
  @Output() shown = new EventEmitter<void>();

  /**
   * An event emitted when the collapse element is hidden, after the transition. It has no payload.
   *
   * @since 8.0.0
   */
  @Output() hidden = new EventEmitter<void>();


  constructor(private _element: ElementRef, config: NgbCollapseConfig, private _zone: NgZone) {
    this.animation = config.animation;
  }

  ngOnInit() { this._runTransition(this.collapsed, false); }

  ngOnChanges({collapsed}: SimpleChanges) {
    if (!collapsed.firstChange) {
      this._runTransitionWithEvents(this.collapsed, this.animation);
    }
  }

  /**
   * Triggers collapsing programmatically.
   *
   * If there is a collapsing transition running already, it will be reversed.
   * If the animations are turned off this happens synchronously.
   *
   * @since 8.0.0
   */
  toggle(open: boolean = this.collapsed) {
    this.collapsed = !open;
    this.ngbCollapseChange.next(this.collapsed);
    this._runTransitionWithEvents(this.collapsed, this.animation);
  }

  private _runTransition(collapsed: boolean, animation: boolean) {
    return ngbRunTransition(
        this._zone, this._element.nativeElement, ngbCollapsingTransition,
        {animation, runningTransition: 'stop', context: {direction: collapsed ? 'hide' : 'show'}});
  }

  private _runTransitionWithEvents(collapsed: boolean, animation: boolean) {
    this._runTransition(collapsed, animation).subscribe(() => {
      if (collapsed) {
        this.hidden.emit();
      } else {
        this.shown.emit();
      }
    });
  }
}
