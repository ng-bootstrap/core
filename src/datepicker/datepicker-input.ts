import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {DOCUMENT, TranslationWidth} from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import {ngbAutoClose} from '../util/autoclose';
import {ngbFocusTrap} from '../util/focus-trap';
import {PlacementArray, positionElements} from '../util/positioning';

import {NgbDateAdapter} from './adapters/ngb-date-adapter';
import {NgbDatepicker, NgbDatepickerNavigateEvent} from './datepicker';
import {DayTemplateContext} from './datepicker-day-template-context';
import {NgbCalendar} from './ngb-calendar';
import {NgbDate} from './ngb-date';
import {NgbDateParserFormatter} from './ngb-date-parser-formatter';
import {NgbDateStruct} from './ngb-date-struct';
import {NgbInputDatepickerConfig} from './datepicker-input-config';
import {NgbDatepickerConfig} from './datepicker-config';
import {isString} from '../util/util';

/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
@Directive({
  selector: 'input[ngbDatepicker]',
  exportAs: 'ngbDatepicker',
  host: {
    '(input)': 'manualDateChange($event.target.value)',
    '(change)': 'manualDateChange($event.target.value, true)',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '[disabled]': 'disabled'
  },
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbInputDatepicker), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => NgbInputDatepicker), multi: true},
    {provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig}
  ],
})
export class NgbInputDatepicker implements OnChanges,
    OnDestroy, ControlValueAccessor, Validator {
  static ngAcceptInputType_autoClose: boolean | string;
  static ngAcceptInputType_disabled: boolean | '';
  static ngAcceptInputType_navigation: string;
  static ngAcceptInputType_outsideDays: string;
  static ngAcceptInputType_weekdays: boolean | number;

  private _cRef: ComponentRef<NgbDatepicker>| null = null;
  private _disabled = false;
  private _elWithFocus: HTMLElement | null = null;
  private _model: NgbDate | null = null;
  private _inputValue: string;
  private _showWeekdays: boolean;
  private _zoneSubscription: any;

  /**
   * Indicates whether the datepicker popup should be closed automatically after date selection / outside click or not.
   *
   * * `true` - the popup will close on both date selection and outside click.
   * * `false` - the popup can only be closed manually via `close()` or `toggle()` methods.
   * * `"inside"` - the popup will close on date selection, but not outside clicks.
   * * `"outside"` - the popup will close only on the outside click and not on date selection/inside clicks.
   *
   * @since 3.0.0
   */
  @Input() autoClose: boolean | 'inside' | 'outside';

  /**
   * An optional class applied to the datepicker popup element.
   *
   * @since 9.1.0
   */
  @Input() datepickerClass: string;

  /**
   * The reference to a custom template for the day.
   *
   * Allows to completely override the way a day 'cell' in the calendar is displayed.
   *
   * See [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext) for the data you get inside.
   */
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;

  /**
   * The callback to pass any arbitrary data to the template cell via the
   * [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext)'s `data` parameter.
   *
   * `current` is the month that is currently displayed by the datepicker.
   *
   * @since 3.3.0
   */
  @Input() dayTemplateData: (date: NgbDate, current?: {year: number, month: number}) => any;

  /**
   * The number of months to display.
   */
  @Input() displayMonths: number;

  /**
   * The first day of the week.
   *
   * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
   */
  @Input() firstDayOfWeek: number;

  /**
   * The reference to the custom template for the datepicker footer.
   *
   * @since 3.3.0
   */
  @Input() footerTemplate: TemplateRef<any>;

  /**
   * The callback to mark some dates as disabled.
   *
   * It is called for each new date when navigating to a different month.
   *
   * `current` is the month that is currently displayed by the datepicker.
   */
  @Input() markDisabled: (date: NgbDate, current?: {year: number, month: number}) => boolean;

  /**
   * The earliest date that can be displayed or selected. Also used for form validation.
   *
   * If not provided, 'year' select box will display 10 years before the current month.
   */
  @Input() minDate: NgbDateStruct;

  /**
   * The latest date that can be displayed or selected. Also used for form validation.
   *
   * If not provided, 'year' select box will display 10 years after the current month.
   */
  @Input() maxDate: NgbDateStruct;

  /**
   * Navigation type.
   *
   * * `"select"` - select boxes for month and navigation arrows
   * * `"arrows"` - only navigation arrows
   * * `"none"` - no navigation visible at all
   */
  @Input() navigation: 'select' | 'arrows' | 'none';

  /**
   * The way of displaying days that don't belong to the current month.
   *
   * * `"visible"` - days are visible
   * * `"hidden"` - days are hidden, white space preserved
   * * `"collapsed"` - days are collapsed, so the datepicker height might change between months
   *
   * For the 2+ months view, days in between months are never shown.
   */
  @Input() outsideDays: 'visible' | 'collapsed' | 'hidden';

  /**
   * The preferred placement of the datepicker popup.
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
  @Input() placement: PlacementArray;

  /**
   * If `true`, when closing datepicker will focus element that was focused before datepicker was opened.
   *
   * Alternatively you could provide a selector or an `HTMLElement` to focus. If the element doesn't exist or invalid,
   * we'll fallback to focus document body.
   *
   * @since 5.2.0
   */
  @Input() restoreFocus: true | string | HTMLElement;

  /**
   * If `true`, weekdays will be displayed.
   *
   * @deprecated 9.1.0, please use 'weekdays' instead
   */
  @Input()
  set showWeekdays(weekdays: boolean) {
    this.weekdays = weekdays;
    this._showWeekdays = weekdays;
  }

  get showWeekdays(): boolean { return this._showWeekdays; }

  /**
   * If `true`, week numbers will be displayed.
   */
  @Input() showWeekNumbers: boolean;

  /**
   * The date to open calendar with.
   *
   * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date is provided, calendar will open with current month.
   *
   * You could use `navigateTo(date)` method as an alternative.
   */
  @Input() startDate: {year: number, month: number, day?: number};

  /**
   * A selector specifying the element the datepicker popup should be appended to.
   *
   * Currently only supports `"body"`.
   */
  @Input() container: string;

  /**
   * A css selector or html element specifying the element the datepicker popup should be positioned against.
   *
   * By default the input is used as a target.
   *
   * @since 4.2.0
   */
  @Input() positionTarget: string | HTMLElement;

  /**
   * The way weekdays should be displayed.
   *
   * * `true` - weekdays are displayed using default width
   * * `false` - weekdays are not displayed
   * * `TranslationWidth` - weekdays are displayed using specified width
   *
   * @since 9.1.0
   */
  @Input() weekdays: TranslationWidth | boolean;

  /**
   * An event emitted when user selects a date using keyboard or mouse.
   *
   * The payload of the event is currently selected `NgbDate`.
   *
   * @since 1.1.1
   */
  @Output() dateSelect = new EventEmitter<NgbDate>();

  /**
   * Event emitted right after the navigation happens and displayed month changes.
   *
   * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
   */
  @Output() navigate = new EventEmitter<NgbDatepickerNavigateEvent>();

  /**
   * An event fired after closing datepicker window.
   *
   * @since 4.2.0
   */
  @Output() closed = new EventEmitter<void>();

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: any) {
    this._disabled = value === '' || (value && value !== 'false');

    if (this.isOpen()) {
      this._cRef !.instance.setDisabledState(this._disabled);
    }
  }

  private _onChange = (_: any) => {};
  private _onTouched = () => {};
  private _validatorChange = () => {};


  constructor(
      private _parserFormatter: NgbDateParserFormatter, private _elRef: ElementRef<HTMLInputElement>,
      private _vcRef: ViewContainerRef, private _renderer: Renderer2, private _cfr: ComponentFactoryResolver,
      private _ngZone: NgZone, private _calendar: NgbCalendar, private _dateAdapter: NgbDateAdapter<any>,
      @Inject(DOCUMENT) private _document: any, private _changeDetector: ChangeDetectorRef,
      config: NgbInputDatepickerConfig) {
    ['autoClose', 'container', 'positionTarget', 'placement'].forEach(input => this[input] = config[input]);
    this._zoneSubscription = _ngZone.onStable.subscribe(() => this._updatePopupPosition());
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  registerOnValidatorChange(fn: () => void): void { this._validatorChange = fn; }

  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  validate(c: AbstractControl): ValidationErrors | null {
    const {value} = c;

    if (value != null) {
      const ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));

      if (!ngbDate) {
        return {'ngbDate': {invalid: value}};
      }

      if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
        return {'ngbDate': {minDate: {minDate: this.minDate, actual: value}}};
      }

      if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
        return {'ngbDate': {maxDate: {maxDate: this.maxDate, actual: value}}};
      }
    }

    return null;
  }

  writeValue(value) {
    this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
    this._writeModelValue(this._model);
  }

  manualDateChange(value: string, updateView = false) {
    const inputValueChanged = value !== this._inputValue;
    if (inputValueChanged) {
      this._inputValue = value;
      this._model = this._fromDateStruct(this._parserFormatter.parse(value));
    }
    if (inputValueChanged || !updateView) {
      this._onChange(this._model ? this._dateAdapter.toModel(this._model) : (value === '' ? null : value));
    }
    if (updateView && this._model) {
      this._writeModelValue(this._model);
    }
  }

  isOpen() { return !!this._cRef; }

  /**
   * Opens the datepicker popup.
   *
   * If the related form control contains a valid date, the corresponding month will be opened.
   */
  open() {
    if (!this.isOpen()) {
      const cf = this._cfr.resolveComponentFactory(NgbDatepicker);
      this._cRef = this._vcRef.createComponent(cf);

      this._applyPopupStyling(this._cRef.location.nativeElement);
      this._applyDatepickerInputs(this._cRef.instance);
      this._subscribeForDatepickerOutputs(this._cRef.instance);
      this._cRef.instance.ngOnInit();
      this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));

      // date selection event handling
      this._cRef.instance.registerOnChange((selectedDate) => {
        this.writeValue(selectedDate);
        this._onChange(selectedDate);
        this._onTouched();
      });

      this._cRef.changeDetectorRef.detectChanges();

      this._cRef.instance.setDisabledState(this.disabled);

      if (this.container === 'body') {
        this._document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
      }

      // focus handling
      this._elWithFocus = this._document.activeElement;
      ngbFocusTrap(this._ngZone, this._cRef.location.nativeElement, this.closed, true);
      this._cRef.instance.focus();

      ngbAutoClose(
          this._ngZone, this._document, this.autoClose, () => this.close(), this.closed, [],
          [this._elRef.nativeElement, this._cRef.location.nativeElement]);
    }
  }

  /**
   * Closes the datepicker popup.
   */
  close() {
    if (this.isOpen()) {
      this._vcRef.remove(this._vcRef.indexOf(this._cRef !.hostView));
      this._cRef = null;
      this.closed.emit();
      this._changeDetector.markForCheck();

      // restore focus
      let elementToFocus: HTMLElement | null = this._elWithFocus;
      if (isString(this.restoreFocus)) {
        elementToFocus = this._document.querySelector(this.restoreFocus);
      } else if (this.restoreFocus !== undefined) {
        elementToFocus = this.restoreFocus as HTMLElement;
      }

      // in IE document.activeElement can contain an object without 'focus()' sometimes
      if (elementToFocus && elementToFocus['focus']) {
        elementToFocus.focus();
      } else {
        this._document.body.focus();
      }
    }
  }

  /**
   * Toggles the datepicker popup.
   */
  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Navigates to the provided date.
   *
   * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided calendar will open current month.
   *
   * Use the `[startDate]` input as an alternative.
   */
  navigateTo(date?: {year: number, month: number, day?: number}) {
    if (this.isOpen()) {
      this._cRef !.instance.navigateTo(date);
    }
  }

  onBlur() { this._onTouched(); }

  onFocus() { this._elWithFocus = this._elRef.nativeElement; }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minDate'] || changes['maxDate']) {
      this._validatorChange();

      if (this.isOpen()) {
        if (changes['minDate']) {
          this._cRef !.instance.minDate = this.minDate;
        }
        if (changes['maxDate']) {
          this._cRef !.instance.maxDate = this.maxDate;
        }
        this._cRef !.instance.ngOnChanges(changes);
      }
    }

    if (changes['datepickerClass']) {
      const {currentValue, previousValue} = changes['datepickerClass'];
      this._applyPopupClass(currentValue, previousValue);
    }
  }

  ngOnDestroy() {
    this.close();
    this._zoneSubscription.unsubscribe();
  }

  private _applyDatepickerInputs(datepickerInstance: NgbDatepicker): void {
    ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
     'maxDate', 'navigation', 'outsideDays', 'showNavigation', 'showWeekNumbers', 'weekdays']
        .forEach((optionName: string) => {
          if (this[optionName] !== undefined) {
            datepickerInstance[optionName] = this[optionName];
          }
        });
    datepickerInstance.startDate = this.startDate || this._model;
  }

  private _applyPopupClass(newClass: string, oldClass?: string) {
    const popupEl = this._cRef ?.location.nativeElement;
    if (popupEl) {
      if (newClass) {
        this._renderer.addClass(popupEl, newClass);
      }
      if (oldClass) {
        this._renderer.removeClass(popupEl, oldClass);
      }
    }
  }

  private _applyPopupStyling(nativeElement: any) {
    this._renderer.addClass(nativeElement, 'dropdown-menu');
    this._renderer.addClass(nativeElement, 'show');

    if (this.container === 'body') {
      this._renderer.addClass(nativeElement, 'ngb-dp-body');
    }

    this._applyPopupClass(this.datepickerClass);
  }

  private _subscribeForDatepickerOutputs(datepickerInstance: NgbDatepicker) {
    datepickerInstance.navigate.subscribe(navigateEvent => this.navigate.emit(navigateEvent));
    datepickerInstance.dateSelect.subscribe(date => {
      this.dateSelect.emit(date);
      if (this.autoClose === true || this.autoClose === 'inside') {
        this.close();
      }
    });
  }

  private _writeModelValue(model: NgbDate | null) {
    const value = this._parserFormatter.format(model);
    this._inputValue = value;
    this._renderer.setProperty(this._elRef.nativeElement, 'value', value);
    if (this.isOpen()) {
      this._cRef !.instance.writeValue(this._dateAdapter.toModel(model));
      this._onTouched();
    }
  }

  private _fromDateStruct(date: NgbDateStruct | null): NgbDate | null {
    const ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
    return this._calendar.isValid(ngbDate) ? ngbDate : null;
  }

  private _updatePopupPosition() {
    if (!this._cRef) {
      return;
    }

    let hostElement: HTMLElement;
    if (isString(this.positionTarget)) {
      hostElement = this._document.querySelector(this.positionTarget);
    } else if (this.positionTarget instanceof HTMLElement) {
      hostElement = this.positionTarget;
    } else {
      hostElement = this._elRef.nativeElement;
    }

    if (this.positionTarget && !hostElement) {
      throw new Error('ngbDatepicker could not find element declared in [positionTarget] to position against.');
    }

    positionElements(hostElement, this._cRef.location.nativeElement, this.placement, this.container === 'body');
  }
}
