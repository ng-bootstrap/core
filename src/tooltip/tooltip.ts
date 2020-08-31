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
  SimpleChanges,
  HostBinding
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Subject, Subscription} from 'rxjs';
import {switchMap, filter} from 'rxjs/operators';

import {parseTriggers, observeTriggers, triggerDelay} from '../util/triggers';
import {ngbAutoClose} from '../util/autoclose';
import {positionElements, PlacementArray} from '../util/positioning';
import {PopupService} from '../util/popup';

import {NgbTooltipConfig} from './tooltip-config';

let nextId = 0;

@Component({
  selector: 'ngb-tooltip-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {'[class]': '"tooltip show" + (tooltipClass ? " " + tooltipClass : "")', 'role': 'tooltip', '[id]': 'id'},
  template: `<div class="arrow"></div><div class="tooltip-inner"><ng-content></ng-content></div>`,
  styleUrls: ['./tooltip.scss']
})
export class NgbTooltipWindow implements OnInit {
  @Input() id: string;
  @Input() tooltipClass: string;
  @HostBinding('attr.tabIndex') tabIndex = -1;
  @Output() inited = new EventEmitter<HTMLElement>();

  set focusable(value: boolean) { this.tabIndex = value ? 0 : -1; }

  get focusable() { return this.tabIndex !== -1; }

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() { this.inited.next(this._elementRef.nativeElement); }
}

/**
 * A lightweight and extensible directive for fancy tooltip creation.
 */
@Directive({selector: '[ngbTooltip]', exportAs: 'ngbTooltip'})
export class NgbTooltip implements OnInit, OnDestroy, OnChanges {
  static ngAcceptInputType_autoClose: boolean | string;

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
   * The delay before the tooltip is closed on mouseleave.  Only takes effect if "mouseleave" is among the close
   * triggers.
   *
   * @since *Unreleased*
   */
  @Input() mouseleaveCloseDelay: number;

  /**
   * The delay before the tooltip is closed on focusout.  Only takes effect if "focusout" is among the close triggers.
   *
   * @since *Unreleased*
   */
  @Input() focusoutCloseDelay: number;

  /**
   * An event emitted when the tooltip is shown. Contains no payload.
   */
  @Output() shown = new EventEmitter();
  /**
   * An event emitted when the popover is hidden. Contains no payload.
   */
  @Output() hidden = new EventEmitter();

  private _ngbTooltip: string | TemplateRef<any>;
  private _ngbTooltipWindowId = `ngb-tooltip-${nextId++}`;
  private _popupService: PopupService<NgbTooltipWindow>;
  private _windowRef: ComponentRef<NgbTooltipWindow>| null = null;
  private _triggerEvents$$ = new Subject();
  private _subscriptions = new Subscription();

  constructor(
      private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2, injector: Injector,
      componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, config: NgbTooltipConfig,
      private _ngZone: NgZone, @Inject(DOCUMENT) private _document: any, private _changeDetector: ChangeDetectorRef,
      applicationRef: ApplicationRef) {
    this.autoClose = config.autoClose;
    this.placement = config.placement;
    this.triggers = config.triggers;
    this.container = config.container;
    this.disableTooltip = config.disableTooltip;
    this.tooltipClass = config.tooltipClass;
    this.openDelay = config.openDelay;
    this.closeDelay = config.closeDelay;
    this.mouseleaveCloseDelay = config.mouseleaveCloseDelay;
    this.focusoutCloseDelay = config.focusoutCloseDelay;
    this._popupService = new PopupService<NgbTooltipWindow>(
        NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, applicationRef);

    this._subscriptions.add(_ngZone.onStable.subscribe(() => {
      if (this._windowRef) {
        positionElements(
            this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
            this.container === 'body', 'bs-tooltip');
      }
    }));
  }

  /**
   * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
   *
   * If the content if falsy, the tooltip won't open.
   */
  @Input()
  set ngbTooltip(value: string | TemplateRef<any>) {
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
      this._windowRef = this._popupService.open(this._ngbTooltip, context);
      this._windowRef.instance.tooltipClass = this.tooltipClass;
      this._windowRef.instance.id = this._ngbTooltipWindowId;

      // Make the tooltip window focuseable to track focusin and focusout events
      const parsedTriggers = parseTriggers(this.triggers);
      if (parsedTriggers.some(trigger => trigger.close === 'focusout')) {
        this._windowRef.instance.focusable = true;
      }

      // Subscribe to trigger events on the popover
      this._subscriptions.add(
          this._windowRef.instance.inited.pipe(switchMap(nativeElement => this.observeEvents(nativeElement, true)))
              .subscribe(this._triggerEvents$$));

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

      this.shown.emit();
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
      this._popupService.close();
      this._windowRef = null;
      this.hidden.emit();
      this._changeDetector.markForCheck();
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
    // Subscribe to trigger events
    this._subscriptions.add(this.observeEvents(this._elementRef.nativeElement, false).subscribe(this._triggerEvents$$));

    // React to trigger events by opening and closing the popover
    this._subscriptions.add(
        this._triggerEvents$$
            .pipe(
                triggerDelay(
                    +this.openDelay, +this.closeDelay, +this.mouseleaveCloseDelay, +this.focusoutCloseDelay,
                    this.isOpen.bind(this)))
            .subscribe(open => (open ? this.open() : this.close())));
  }

  ngOnChanges({tooltipClass}: SimpleChanges) {
    if (tooltipClass && this.isOpen()) {
      this._windowRef !.instance.tooltipClass = tooltipClass.currentValue;
    }
  }

  ngOnDestroy() {
    this.close();
    this._triggerEvents$$.complete();
    this._subscriptions.unsubscribe();
  }

  private observeEvents(nativeElement: HTMLElement, isPopover: boolean) {
    const parsedTriggers = parseTriggers(this.triggers);
    return observeTriggers(this._renderer, nativeElement, parsedTriggers, this.isOpen.bind(this))
        .pipe(
            // Do not handle popover clicks here because it is the realm of [autoClose]
            isPopover ? filter(event => event.type !== 'click') : observable => observable);
  }
}
