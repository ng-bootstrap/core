import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  ApplicationRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {BehaviorSubject, fromEvent, Observable, of, OperatorFunction, Subject, Subscription} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

import {Live} from '../util/accessibility/live';
import {ngbAutoClose} from '../util/autoclose';
import {Key} from '../util/key';
import {PopupService} from '../util/popup';
import {PlacementArray, positionElements} from '../util/positioning';
import {isDefined, toString} from '../util/util';

import {NgbTypeaheadConfig} from './typeahead-config';
import {NgbTypeaheadWindow, ResultTemplateContext} from './typeahead-window';

/**
 * An event emitted right before an item is selected from the result list.
 */
export interface NgbTypeaheadSelectItemEvent<T = any> {
  /**
   * The item from the result list about to be selected.
   */
  item: T;

  /**
   * Calling this function will prevent item selection from happening.
   */
  preventDefault: () => void;
}

let nextWindowId = 0;

/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
@Directive({
  selector: 'input[ngbTypeahead]',
  exportAs: 'ngbTypeahead',
  host: {
    '(blur)': 'handleBlur()',
    '[class.open]': 'isPopupOpen()',
    '(keydown)': 'handleKeyDown($event)',
    '[autocomplete]': 'autocomplete',
    'autocapitalize': 'off',
    'autocorrect': 'off',
    'role': 'combobox',
    'aria-multiline': 'false',
    '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
    '[attr.aria-activedescendant]': 'activeDescendant',
    '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
    '[attr.aria-expanded]': 'isPopupOpen()'
  },
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true}]
})
export class NgbTypeahead implements ControlValueAccessor,
    OnInit, OnChanges, OnDestroy {
  private _popupService: PopupService<NgbTypeaheadWindow>;
  private _subscription: Subscription | null = null;
  private _closed$ = new Subject();
  private _inputValueBackup: string | null = null;
  private _valueChanges: Observable<string>;
  private _resubscribeTypeahead: BehaviorSubject<any>;
  private _windowRef: ComponentRef<NgbTypeaheadWindow>| null = null;
  private _zoneSubscription: any;

  /**
   * The value for the `autocomplete` attribute for the `<input>` element.
   *
   * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
   *
   * @since 2.1.0
   */
  @Input() autocomplete = 'off';

  /**
   * A selector specifying the element the typeahead popup will be appended to.
   *
   * Currently only supports `"body"`.
   */
  @Input() container: string;

  /**
   * If `true`, model values will not be restricted only to items selected from the popup.
   */
  @Input() editable: boolean;

  /**
   * If `true`, the first item in the result list will always stay focused while typing.
   */
  @Input() focusFirst: boolean;

  /**
   * The function that converts an item from the result list to a `string` to display in the `<input>` field.
   *
   * It is called when the user selects something in the popup or the model value changes, so the input needs to
   * be updated.
   */
  @Input() inputFormatter: (item: any) => string;

  /**
   * The function that converts a stream of text values from the `<input>` element to the stream of the array of items
   * to display in the typeahead popup.
   *
   * If the resulting observable emits a non-empty array - the popup will be shown. If it emits an empty array - the
   * popup will be closed.
   *
   * See the [basic example](#/components/typeahead/examples#basic) for more details.
   *
   * Note that the `this` argument is `undefined` so you need to explicitly bind it to a desired "this" target.
   */
  @Input() ngbTypeahead: OperatorFunction<string, readonly any[]>| null | undefined;

  /**
   * The function that converts an item from the result list to a `string` to display in the popup.
   *
   * Must be provided, if your `ngbTypeahead` returns something other than `Observable<string[]>`.
   *
   * Alternatively for more complex markup in the popup you should use `resultTemplate`.
   */
  @Input() resultFormatter: (item: any) => string;

  /**
   * The template to override the way resulting items are displayed in the popup.
   *
   * See the [ResultTemplateContext](#/components/typeahead/api#ResultTemplateContext) for the template context.
   *
   * Also see the [template for results demo](#/components/typeahead/examples#template) for more details.
   */
  @Input() resultTemplate: TemplateRef<ResultTemplateContext>;

  /**
   * If `true`, will show the hint in the `<input>` when an item in the result list matches.
   */
  @Input() showHint: boolean;

  /**
   * The preferred placement of the typeahead.
   *
   * Possible values are `"top"`, `"top-left"`, `"top-right"`, `"bottom"`, `"bottom-left"`,
   * `"bottom-right"`, `"left"`, `"left-top"`, `"left-bottom"`, `"right"`, `"right-top"`,
   * `"right-bottom"`
   *
   * Accepts an array of strings or a string with space separated possible values.
   *
   * The default order of preference is `"bottom-left bottom-right top-left top-right"`
   *
   * Please see the [positioning overview](#/positioning) for more details.
   */
  @Input() placement: PlacementArray = 'bottom-left';

  /**
  * A custom class to append to the typeahead popup window
  *
  * Accepts a string containing CSS class to be applied on the `ngb-typeahead-window`.
  *
  * This can be used to provide instance-specific styling, ex. you can override popup window `z-index`
  *
  * @since 9.1.0
  */
  @Input() popupClass: string;

  /**
   * An event emitted right before an item is selected from the result list.
   *
   * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
   */
  @Output() selectItem = new EventEmitter<NgbTypeaheadSelectItemEvent>();

  activeDescendant: string | null = null;
  popupId = `ngb-typeahead-${nextWindowId++}`;

  private _onTouched = () => {};
  private _onChange = (_: any) => {};

  constructor(
      private _elementRef: ElementRef<HTMLInputElement>, viewContainerRef: ViewContainerRef,
      private _renderer: Renderer2, injector: Injector, componentFactoryResolver: ComponentFactoryResolver,
      config: NgbTypeaheadConfig, ngZone: NgZone, private _live: Live, @Inject(DOCUMENT) private _document: any,
      private _ngZone: NgZone, private _changeDetector: ChangeDetectorRef, applicationRef: ApplicationRef) {
    this.container = config.container;
    this.editable = config.editable;
    this.focusFirst = config.focusFirst;
    this.showHint = config.showHint;
    this.placement = config.placement;

    this._valueChanges = fromEvent<Event>(_elementRef.nativeElement, 'input')
                             .pipe(map($event => ($event.target as HTMLInputElement).value));

    this._resubscribeTypeahead = new BehaviorSubject(null);

    this._popupService = new PopupService<NgbTypeaheadWindow>(
        NgbTypeaheadWindow, injector, viewContainerRef, _renderer, this._ngZone, componentFactoryResolver,
        applicationRef);

    this._zoneSubscription = ngZone.onStable.subscribe(() => {
      if (this.isPopupOpen()) {
        positionElements(
            this._elementRef.nativeElement, this._windowRef !.location.nativeElement, this.placement,
            this.container === 'body');
      }
    });
  }

  ngOnInit(): void { this._subscribeToUserInput(); }

  ngOnChanges({ngbTypeahead}: SimpleChanges): void {
    if (ngbTypeahead && !ngbTypeahead.firstChange) {
      this._unsubscribeFromUserInput();
      this._subscribeToUserInput();
    }
  }

  ngOnDestroy(): void {
    this._closePopup();
    this._unsubscribeFromUserInput();
    this._zoneSubscription.unsubscribe();
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  writeValue(value) {
    this._writeInputValue(this._formatItemForInput(value));
    if (this.showHint) {
      this._inputValueBackup = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  /**
   * Dismisses typeahead popup window
   */
  dismissPopup() {
    if (this.isPopupOpen()) {
      this._resubscribeTypeahead.next(null);
      this._closePopup();
      if (this.showHint && this._inputValueBackup !== null) {
        this._writeInputValue(this._inputValueBackup);
      }
      this._changeDetector.markForCheck();
    }
  }

  /**
   * Returns true if the typeahead popup window is displayed
   */
  isPopupOpen() { return this._windowRef != null; }

  handleBlur() {
    this._resubscribeTypeahead.next(null);
    this._onTouched();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (!this.isPopupOpen()) {
      return;
    }

    // tslint:disable-next-line:deprecation
    switch (event.which) {
      case Key.ArrowDown:
        event.preventDefault();
        this._windowRef !.instance.next();
        this._showHint();
        break;
      case Key.ArrowUp:
        event.preventDefault();
        this._windowRef !.instance.prev();
        this._showHint();
        break;
      case Key.Enter:
      case Key.Tab:
        const result = this._windowRef !.instance.getActive();
        if (isDefined(result)) {
          event.preventDefault();
          event.stopPropagation();
          this._selectResult(result);
        }
        this._closePopup();
        break;
    }
  }

  private _openPopup() {
    if (!this.isPopupOpen()) {
      this._inputValueBackup = this._elementRef.nativeElement.value;
      const {windowRef} = this._popupService.open();
      this._windowRef = windowRef;
      this._windowRef.instance.id = this.popupId;
      this._windowRef.instance.selectEvent.subscribe((result: any) => this._selectResultClosePopup(result));
      this._windowRef.instance.activeChangeEvent.subscribe((activeId: string) => this.activeDescendant = activeId);
      this._windowRef.instance.popupClass = this.popupClass;

      if (this.container === 'body') {
        this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
      }

      this._changeDetector.markForCheck();

      ngbAutoClose(
          this._ngZone, this._document, 'outside', () => this.dismissPopup(), this._closed$,
          [this._elementRef.nativeElement, this._windowRef.location.nativeElement]);
    }
  }

  private _closePopup() {
    this._popupService.close().subscribe(() => {
      this._closed$.next();
      this._windowRef = null;
      this.activeDescendant = null;
    });
  }

  private _selectResult(result: any) {
    let defaultPrevented = false;
    this.selectItem.emit({item: result, preventDefault: () => { defaultPrevented = true; }});
    this._resubscribeTypeahead.next(null);

    if (!defaultPrevented) {
      this.writeValue(result);
      this._onChange(result);
    }
  }

  private _selectResultClosePopup(result: any) {
    this._selectResult(result);
    this._closePopup();
  }

  private _showHint() {
    if (this.showHint && this._windowRef?.instance.hasActive() && this._inputValueBackup != null) {
      const userInputLowerCase = this._inputValueBackup.toLowerCase();
      const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());

      if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
        this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
        this._elementRef.nativeElement['setSelectionRange'].apply(
            this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
      } else {
        this._writeInputValue(formattedVal);
      }
    }
  }

  private _formatItemForInput(item: any): string {
    return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
  }

  private _writeInputValue(value: string): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
  }

  private _subscribeToUserInput(): void {
    const results$ = this._valueChanges.pipe(
        tap(value => {
          this._inputValueBackup = this.showHint ? value : null;
          this._onChange(this.editable ? value : undefined);
        }),
        this.ngbTypeahead ? this.ngbTypeahead : () => of([]));

    this._subscription = this._resubscribeTypeahead.pipe(switchMap(() => results$)).subscribe(results => {
      if (!results || results.length === 0) {
        this._closePopup();
      } else {
        this._openPopup();

        this._windowRef !.instance.focusFirst = this.focusFirst;
        this._windowRef !.instance.results = results;
        this._windowRef !.instance.term = this._elementRef.nativeElement.value;
        if (this.resultFormatter) {
          this._windowRef !.instance.formatter = this.resultFormatter;
        }
        if (this.resultTemplate) {
          this._windowRef !.instance.resultTemplate = this.resultTemplate;
        }
        this._windowRef !.instance.resetActive();

        // The observable stream we are subscribing to might have async steps
        // and if a component containing typeahead is using the OnPush strategy
        // the change detection turn wouldn't be invoked automatically.
        this._windowRef !.changeDetectorRef.detectChanges();

        this._showHint();
      }

      // live announcer
      const count = results ? results.length : 0;
      this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
    });
  }

  private _unsubscribeFromUserInput() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this._subscription = null;
  }
}
