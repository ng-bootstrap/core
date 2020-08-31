import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  OnChanges,
  Inject,
  Injector,
  Renderer2,
  ComponentRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  NgZone,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectorRef,
  ApplicationRef,
  HostBinding
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Subscription, Subject} from 'rxjs';
import {switchMap, filter} from 'rxjs/operators';

import {parseTriggers, observeTriggers, triggerDelay} from '../util/triggers';
import {ngbAutoClose} from '../util/autoclose';
import {positionElements, PlacementArray} from '../util/positioning';
import {PopupService} from '../util/popup';

import {NgbPopoverConfig} from './popover-config';

let nextId = 0;

@Component({
  selector: 'ngb-popover-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {'[class]': '"popover" + (popoverClass ? " " + popoverClass : "")', 'role': 'tooltip', '[id]': 'id'},
  template: `
    <div class="arrow"></div>
    <h3 class="popover-header" *ngIf="title != null">
      <ng-template #simpleTitle>{{title}}</ng-template>
      <ng-template [ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle" [ngTemplateOutletContext]="context"></ng-template>
    </h3>
    <div class="popover-body"><ng-content></ng-content></div>`,
  styleUrls: ['./popover.scss']
})
export class NgbPopoverWindow implements OnInit {
  @Input() title: undefined | string | TemplateRef<any>;
  @Input() id: string;
  @Input() popoverClass: string;
  @Input() context: any;
  @HostBinding('attr.tabIndex') tabIndex = -1;
  @Output() inited = new EventEmitter<HTMLElement>();

  set focusable(value: boolean) { this.tabIndex = value ? 0 : -1; }

  get focusable() { return this.tabIndex !== -1; }

  constructor(private _elementRef: ElementRef) {}

  isTitleTemplate() { return this.title instanceof TemplateRef; }

  ngOnInit() { this.inited.next(this._elementRef.nativeElement); }
}

/**
 * A lightweight and extensible directive for fancy popover creation.
 */
@Directive({selector: '[ngbPopover]', exportAs: 'ngbPopover'})
export class NgbPopover implements OnInit, OnDestroy, OnChanges {
  static ngAcceptInputType_autoClose: boolean | string;

  /**
   * Indicates whether the popover should be closed on `Escape` key and inside/outside clicks:
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
   * The string content or a `TemplateRef` for the content to be displayed in the popover.
   *
   * If the title and the content are empty, the popover won't open.
   */
  @Input() ngbPopover: string | TemplateRef<any>;

  /**
   * The title of the popover.
   *
   * If the title and the content are empty, the popover won't open.
   */
  @Input() popoverTitle: string | TemplateRef<any>;

  /**
   * The preferred placement of the popover.
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
   * For more details see the [triggers demo](#/components/popover/examples#triggers).
   */
  @Input() triggers: string;

  /**
   * A selector specifying the element the popover should be appended to.
   *
   * Currently only supports `body`.
   */
  @Input() container: string;

  /**
   * If `true`, popover is disabled and won't be displayed.
   *
   * @since 1.1.0
   */
  @Input() disablePopover: boolean;

  /**
   * An optional class applied to the popover window element.
   *
   * @since 2.2.0
   */
  @Input() popoverClass: string;

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
   * The delay before the popover is closed on mouseleave.  Only takes effect if "mouseleave" is among the close
   * triggers.
   *
   * @since *Unreleased*
   */
  @Input() mouseleaveCloseDelay: number;

  /**
   * The delay before the popover is closed on focusout.  Only takes effect if "focusout" is among the close triggers.
   *
   * @since *Unreleased*
   */
  @Input() focusoutCloseDelay: number;

  /**
   * An event emitted when the popover is shown. Contains no payload.
   */
  @Output() shown = new EventEmitter<void>();

  /**
   * An event emitted when the popover is hidden. Contains no payload.
   */
  @Output() hidden = new EventEmitter<void>();

  private _ngbPopoverWindowId = `ngb-popover-${nextId++}`;
  private _popupService: PopupService<NgbPopoverWindow>;
  private _windowRef: ComponentRef<NgbPopoverWindow>| null = null;
  private _triggerEvents$$ = new Subject();
  private _subscriptions = new Subscription();
  private _isDisabled(): boolean {
    if (this.disablePopover) {
      return true;
    }
    if (!this.ngbPopover && !this.popoverTitle) {
      return true;
    }
    return false;
  }

  constructor(
      private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2, injector: Injector,
      componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, config: NgbPopoverConfig,
      private _ngZone: NgZone, @Inject(DOCUMENT) private _document: any, private _changeDetector: ChangeDetectorRef,
      applicationRef: ApplicationRef) {
    this.autoClose = config.autoClose;
    this.placement = config.placement;
    this.triggers = config.triggers;
    this.container = config.container;
    this.disablePopover = config.disablePopover;
    this.popoverClass = config.popoverClass;
    this.openDelay = config.openDelay;
    this.closeDelay = config.closeDelay;
    this.mouseleaveCloseDelay = config.mouseleaveCloseDelay;
    this.focusoutCloseDelay = config.focusoutCloseDelay;
    this._popupService = new PopupService<NgbPopoverWindow>(
        NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, applicationRef);

    this._subscriptions.add(_ngZone.onStable.subscribe(() => {
      if (this._windowRef) {
        positionElements(
            this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
            this.container === 'body', 'bs-popover');
      }
    }));
  }

  /**
   * Opens the popover.
   *
   * This is considered to be a "manual" triggering.
   * The `context` is an optional value to be injected into the popover template when it is created.
   */
  open(context?: any) {
    if (!this._windowRef && !this._isDisabled()) {
      this._windowRef = this._popupService.open(this.ngbPopover, context);
      this._windowRef.instance.title = this.popoverTitle;
      this._windowRef.instance.context = context;
      this._windowRef.instance.popoverClass = this.popoverClass;
      this._windowRef.instance.id = this._ngbPopoverWindowId;

      // Make the popover window focuseable to track focusin and focusout events
      const parsedTriggers = parseTriggers(this.triggers);
      if (parsedTriggers.some(trigger => trigger.close === 'focusout')) {
        this._windowRef.instance.focusable = true;
      }

      // Subscribe to trigger events on the popover
      this._subscriptions.add(
          this._windowRef.instance.inited.pipe(switchMap(nativeElement => this.observeTriggers(nativeElement, true)))
              .subscribe(this._triggerEvents$$));

      this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);

      if (this.container === 'body') {
        this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
      }

      // We need to detect changes, because we don't know where .open() might be called from.
      // Ex. opening popover from one of lifecycle hooks that run after the CD
      // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
      this._windowRef.changeDetectorRef.detectChanges();

      // We need to mark for check, because popover won't work inside the OnPush component.
      // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
      // inside the template of an OnPush component and we change the popover from
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
   * Closes the popover.
   *
   * This is considered to be a "manual" triggering of the popover.
   */
  close(): void {
    if (this._windowRef) {
      this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
      this._popupService.close();
      this._windowRef = null;
      this.hidden.emit();
      this._changeDetector.markForCheck();
    }
  }

  /**
   * Toggles the popover.
   *
   * This is considered to be a "manual" triggering of the popover.
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
    this._subscriptions.add(
        this.observeTriggers(this._elementRef.nativeElement, false).subscribe(this._triggerEvents$$));

    // React to trigger events by opening and closing the popover
    this._subscriptions.add(
        this._triggerEvents$$
            .pipe(
                triggerDelay(
                    +this.openDelay, +this.closeDelay, +this.mouseleaveCloseDelay, +this.focusoutCloseDelay,
                    this.isOpen.bind(this)))
            .subscribe(open => (open ? this.open() : this.close())));
  }

  ngOnChanges({ngbPopover, popoverTitle, disablePopover, popoverClass}: SimpleChanges) {
    if (popoverClass && this.isOpen()) {
      this._windowRef !.instance.popoverClass = popoverClass.currentValue;
    }
    // close popover if title and content become empty, or disablePopover set to true
    if ((ngbPopover || popoverTitle || disablePopover) && this._isDisabled()) {
      this.close();
    }
  }

  ngOnDestroy() {
    this.close();
    this._triggerEvents$$.complete();
    this._subscriptions.unsubscribe();
  }

  private observeTriggers(nativeElement: HTMLElement, isPopover: boolean) {
    const parsedTriggers = parseTriggers(this.triggers);
    return observeTriggers(this._renderer, nativeElement, parsedTriggers, this.isOpen.bind(this))
        .pipe(
            // Do not handle popover clicks here because it is the realm of [autoClose]
            isPopover ? filter(event => event.type !== 'click') : observable => observable);
  }
}
