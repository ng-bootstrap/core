import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Inject,
  Injector,
  Renderer2,
  ComponentRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  NgZone,
  ViewEncapsulation,
  ChangeDetectorRef,
  ApplicationRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {listenToTriggers} from '../util/triggers';
import {ngbAutoClose} from '../util/autoclose';
import {positionElements, PlacementArray} from '../util/positioning';
import {PopupService} from '../util/popup';

import {NgbTooltipConfig} from './tooltip-config';

let nextId = 0;

@Component({
  selector: 'ngb-tooltip-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"tooltip" + (tooltipClass ? " " + tooltipClass : "")',
    '[class.fade]': 'animation',
    'role': 'tooltip',
    '[id]': 'id'
  },
  template: `<div class="arrow"></div><div class="tooltip-inner"><ng-content></ng-content></div>`,
  styleUrls: ['./tooltip.scss']
})
export class NgbTooltipWindow {
  @Input() animation: boolean;
  @Input() id: string;
  @Input() tooltipClass: string;
}

/**
 * A lightweight and extensible directive for fancy tooltip creation.
 */
@Directive({selector: '[ngbTooltip]', exportAs: 'ngbTooltip'})
export class NgbTooltip implements OnInit, OnDestroy, OnChanges {
  static ngAcceptInputType_autoClose: boolean | string;

  /**
   * If `true`, tooltip opening and closing will be animated.
   *
   * @since 8.0.0
   */
  @Input() animation: boolean;

  /**
   * Indicates whether the tooltip should be closed on `Escape` key and inside/outside clicks:
   *
   * * `true` - closes on both outside and inside clicks as well as `Escape` presses
   * * `false` - disables the autoClose feature (NB: triggers still apply)
   * * `"inside"` - closes on inside clicks as well as Escape presses
   * * `"outside"` - closes on outside clicks (sometimes also achievable through triggers)
   * as well as `Escape` presses
   *
   * @since 3.0.0
   */
  @Input() autoClose: boolean | 'inside' | 'outside';

  /**
   * The preferred placement of the tooltip.
   *
   * Possible values are `"top"`, `"top-left"`, `"top-right"`, `"bottom"`, `"bottom-left"`,
   * `"bottom-right"`, `"left"`, `"left-top"`, `"left-bottom"`, `"right"`, `"right-top"`,
   * `"right-bottom"`
   *
   * Accepts an array of strings or a string with space separated possible values.
   *
   * The default order of preference is `"auto"` (same as the sequence above).
   *
   * Please see the [positioning overview](#/positioning) for more details.
   */
  @Input() placement: PlacementArray;

  /**
   * Specifies events that should trigger the tooltip.
   *
   * Supports a space separated list of event names.
   * For more details see the [triggers demo](#/components/tooltip/examples#triggers).
   */
  @Input() triggers: string;

  /**
   * A selector specifying the element the tooltip should be appended to.
   *
   * Currently only supports `"body"`.
   */
  @Input() container: string;

  /**
   * If `true`, tooltip is disabled and won't be displayed.
   *
   * @since 1.1.0
   */
  @Input() disableTooltip: boolean;

  /**
   * An optional class applied to the tooltip window element.
   *
   * @since 3.2.0
   */
  @Input() tooltipClass: string;

  /**
   * The opening delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
   *
   * @since 4.1.0
   */
  @Input() openDelay: number;

  /**
   * The closing delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
   *
   * @since 4.1.0
   */
  @Input() closeDelay: number;

  /**
   * An event emitted when the tooltip opening animation has finished. Contains no payload.
   */
  @Output() shown = new EventEmitter();

  /**
   * An event emitted when the tooltip closing animation has finished. Contains no payload.
   */
  @Output() hidden = new EventEmitter();

  private _ngbTooltip: string | TemplateRef<any>| null | undefined;
  private _ngbTooltipWindowId = `ngb-tooltip-${nextId++}`;
  private _popupService: PopupService<NgbTooltipWindow>;
  private _windowRef: ComponentRef<NgbTooltipWindow>| null = null;
  private _unregisterListenersFn;
  private _zoneSubscription: any;

  constructor(
      private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2, injector: Injector,
      componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, config: NgbTooltipConfig,
      private _ngZone: NgZone, @Inject(DOCUMENT) private _document: any, private _changeDetector: ChangeDetectorRef,
      applicationRef: ApplicationRef) {
    this.animation = config.animation;
    this.autoClose = config.autoClose;
    this.placement = config.placement;
    this.triggers = config.triggers;
    this.container = config.container;
    this.disableTooltip = config.disableTooltip;
    this.tooltipClass = config.tooltipClass;
    this.openDelay = config.openDelay;
    this.closeDelay = config.closeDelay;
    this._popupService = new PopupService<NgbTooltipWindow>(
        NgbTooltipWindow, injector, viewContainerRef, _renderer, this._ngZone, componentFactoryResolver,
        applicationRef);

    this._zoneSubscription = _ngZone.onStable.subscribe(() => {
      if (this._windowRef) {
        positionElements(
            this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
            this.container === 'body', 'bs-tooltip');
      }
    });
  }

  /**
   * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
   *
   * If the content if falsy, the tooltip won't open.
   */
  @Input()
  set ngbTooltip(value: string | TemplateRef<any>| null | undefined) {
    this._ngbTooltip = value;
    if (!value && this._windowRef) {
      this.close();
    }
  }

  get ngbTooltip() { return this._ngbTooltip; }

  /**
   * Opens the tooltip.
   *
   * This is considered to be a "manual" triggering.
   * The `context` is an optional value to be injected into the tooltip template when it is created.
   */
  open(context?: any) {
    if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
      const {windowRef, transition$} = this._popupService.open(this._ngbTooltip, context, this.animation);
      this._windowRef = windowRef;
      this._windowRef.instance.animation = this.animation;
      this._windowRef.instance.tooltipClass = this.tooltipClass;
      this._windowRef.instance.id = this._ngbTooltipWindowId;

      this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);

      if (this.container === 'body') {
        this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
      }

      // We need to detect changes, because we don't know where .open() might be called from.
      // Ex. opening tooltip from one of lifecycle hooks that run after the CD
      // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
      this._windowRef.changeDetectorRef.detectChanges();

      // We need to mark for check, because tooltip won't work inside the OnPush component.
      // Ex. when we use expression like `{{ tooltip.isOpen() : 'opened' : 'closed' }}`
      // inside the template of an OnPush component and we change the tooltip from
      // open -> closed, the expression in question won't be updated unless we explicitly
      // mark the parent component to be checked.
      this._windowRef.changeDetectorRef.markForCheck();

      ngbAutoClose(
          this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden,
          [this._windowRef.location.nativeElement]);

      transition$.subscribe(() => this.shown.emit());
    }
  }

  /**
   * Closes the tooltip.
   *
   * This is considered to be a "manual" triggering of the tooltip.
   */
  close(): void {
    if (this._windowRef != null) {
      this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
      this._popupService.close(this.animation).subscribe(() => {
        this._windowRef = null;
        this.hidden.emit();
        this._changeDetector.markForCheck();
      });
    }
  }

  /**
   * Toggles the tooltip.
   *
   * This is considered to be a "manual" triggering of the tooltip.
   */
  toggle(): void {
    if (this._windowRef) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Returns `true`, if the popover is currently shown.
   */
  isOpen(): boolean { return this._windowRef != null; }

  ngOnInit() {
    this._unregisterListenersFn = listenToTriggers(
        this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this),
        this.close.bind(this), +this.openDelay, +this.closeDelay);
  }

  ngOnChanges({tooltipClass}: SimpleChanges) {
    if (tooltipClass && this.isOpen()) {
      this._windowRef !.instance.tooltipClass = tooltipClass.currentValue;
    }
  }

  ngOnDestroy() {
    this.close();
    // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
    // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
    if (this._unregisterListenersFn) {
      this._unregisterListenersFn();
    }
    this._zoneSubscription.unsubscribe();
  }
}
