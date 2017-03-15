import {
  Component,
  Input,
  OnChanges,
  TemplateRef,
  forwardRef,
  OnInit,
  SimpleChanges,
  EventEmitter,
  Output,
  ElementRef,
  NgZone,
  HostListener
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {NgbCalendar, NgbPeriod} from './ngb-calendar';
import {NgbDate} from './ngb-date';
import {NgbDatepickerService} from './datepicker-service';
import {MonthViewModel, NavigationEvent} from './datepicker-view-model';
import {toInteger} from '../util/util';
import {DayTemplateContext} from './datepicker-day-template-context';
import {NgbDatepickerConfig} from './datepicker-config';
import {NgbDateStruct} from './ngb-date-struct';
import {NgbDatepickerI18n} from './datepicker-i18n';

const NGB_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgbDatepicker),
  multi: true
};

/**
 * The payload of the datepicker navigation event
 */
export interface NgbDatepickerNavigateEvent {
  /**
   * Currently displayed month
   */
  current: {year: number, month: number};

  /**
   * Month we're navigating to
   */
  next: {year: number, month: number};
}

let nextId = 0;

/**
 * A lightweight and highly configurable datepicker directive
 */
@Component({
  exportAs: 'ngbDatepicker',
  selector: 'ngb-datepicker',
  host: {
    'class': 'd-inline-block rounded',
    '[attr.tabindex]': 'disabled ? undefined : "0"',
    '[id]': 'id',
    // The following update is done manually in updateActiveDescendant because some browsers
    // (such as Firefox and IE) do not accept in aria-activedescendant the id of an element which
    // has just been inserted in the DOM, so it is necessary to update aria-activedescendant
    // after a setTimeout.
    // '[attr.aria-activedescendant]': 'getActiveDescendant()',
    '[attr.aria-disabled]': 'disabled ? "true" : undefined',
    'role': 'application'
  },
  styles: [`
    :host {
      border: 1px solid rgba(0, 0, 0, 0.125);
    }
    .ngb-dp-header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    }
    .ngb-dp-month {
      pointer-events: none;
    }
    ngb-datepicker-month-view {
      pointer-events: auto;
    }
    .ngb-dp-month:first-child {
      margin-left: 0 !important;
    }    
    .ngb-dp-month-name {
      font-size: larger;
      height: 2rem;
      line-height: 2rem;
    }
  `],
  template: `
    <template #dt
      let-id="id"
      let-date="date"
      let-weekday="weekday"
      let-currentMonth="currentMonth"
      let-selected="selected"
      let-disabled="disabled"
      let-focused="focused">
      <div ngbDatepickerDayView
        [id]="id"
        [date]="date"
        [weekday]="weekday"
        [currentMonth]="currentMonth"
        [selected]="selected"
        [disabled]="disabled"
        [focused]="focused">
      </div>
    </template>
    
    <div class="ngb-dp-header bg-faded pt-1 rounded-top" [style.height.rem]="getHeaderHeight()" 
      [style.marginBottom.rem]="-getHeaderMargin()">
      <ngb-datepicker-navigation *ngIf="navigation !== 'none'"
        [date]="months[0]?.firstDate"
        [minDate]="_minDate"
        [maxDate]="_maxDate"
        [months]="months.length"
        [disabled]="disabled"
        [showWeekNumbers]="showWeekNumbers"
        [showSelect]="navigation === 'select'"
        (navigate)="onNavigateEvent($event)"
        (select)="onNavigateDateSelect($event)">
      </ngb-datepicker-navigation>
    </div>

    <div class="ngb-dp-months d-flex px-1 pb-1">
      <template ngFor let-month [ngForOf]="months" let-i="index">
        <div class="ngb-dp-month d-block ml-3">            
          <div *ngIf="navigation !== 'select' || displayMonths > 1" class="ngb-dp-month-name text-center">
            {{ i18n.getMonthFullName(month.number) }} {{ month.year }}
          </div>
          <ngb-datepicker-month-view
            [datepickerId]="id"
            [month]="month"
            [selectedDate]="model"
            [focusedDate]="focusedDate"
            [dayTemplate]="dayTemplate || dt"
            [showWeekdays]="showWeekdays"
            [showWeekNumbers]="showWeekNumbers"
            [disabled]="disabled"
            [outsideDays]="displayMonths === 1 ? outsideDays : 'hidden'"
            (select)="onDateSelect($event)">
          </ngb-datepicker-month-view>
        </div>
      </template>
    </div>
  `,
  providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService]
})
export class NgbDatepicker implements OnChanges,
    OnInit, ControlValueAccessor {
  _date: NgbDate;
  _maxDate: NgbDate;
  _minDate: NgbDate;

  model: NgbDate;
  months: MonthViewModel[] = [];
  focusedDate: NgbDate;

  /**
   *  An optional id for the datepicker. The id should be unique.
   *  If not provided, it will be auto-generated.
   */
  @Input() id = `ngb-datepicker-${nextId++}`;

  /**
   * Reference for the custom template for the day display
   */
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;

  /**
   * Number of months to display
   */
  @Input() displayMonths: number;

  /**
   * First day of the week. With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
   */
  @Input() firstDayOfWeek: number;

  /**
   * Callback to mark a given date as disabled.
   * 'Current' contains the month that will be displayed in the view
   */
  @Input() markDisabled: (date: NgbDateStruct, current: {year: number, month: number}) => boolean;

  /**
   * Min date for the navigation. If not provided will be 10 years before today or `startDate`
   */
  @Input() minDate: NgbDateStruct;

  /**
   * Max date for the navigation. If not provided will be 10 years from today or `startDate`
   */
  @Input() maxDate: NgbDateStruct;

  /**
   * Navigation type: `select` (default with select boxes for month and year), `arrows`
   * (without select boxes, only navigation arrows) or `none` (no navigation at all)
   */
  @Input() navigation: 'select' | 'arrows' | 'none';

  /**
   * The way to display days that don't belong to current month: `visible` (default),
   * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
   */
  @Input() outsideDays: 'visible' | 'collapsed' | 'hidden';

  /**
   * Whether to display days of the week
   */
  @Input() showWeekdays: boolean;

  /**
   * Whether to display week numbers
   */
  @Input() showWeekNumbers: boolean;

  /**
   * Date to open calendar with.
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided, calendar will open with current month.
   * Use 'navigateTo(date)' as an alternative
   */
  @Input() startDate: {year: number, month: number};

  /**
   * An event fired when navigation happens and currently displayed month changes.
   * See NgbDatepickerNavigateEvent for the payload info.
   */
  @Output() navigate = new EventEmitter<NgbDatepickerNavigateEvent>();

  disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
      private _service: NgbDatepickerService, private _calendar: NgbCalendar, public i18n: NgbDatepickerI18n,
      config: NgbDatepickerConfig, private _elementRef: ElementRef, private _zone: NgZone) {
    this.dayTemplate = config.dayTemplate;
    this.displayMonths = config.displayMonths;
    this.firstDayOfWeek = config.firstDayOfWeek;
    this.markDisabled = config.markDisabled;
    this.minDate = config.minDate;
    this.maxDate = config.maxDate;
    this.navigation = config.navigation;
    this.outsideDays = config.outsideDays;
    this.showWeekdays = config.showWeekdays;
    this.showWeekNumbers = config.showWeekNumbers;
    this.startDate = config.startDate;
  }

  getHeaderHeight() {
    const h = this.showWeekdays ? 6.25 : 4.25;
    return this.displayMonths === 1 || this.navigation !== 'select' ? h - 2 : h;
  }

  getHeaderMargin() {
    const m = this.showWeekdays ? 2 : 0;
    return this.displayMonths !== 1 || this.navigation !== 'select' ? m + 2 : m;
  }

  getActiveDescendant() {
    if (this.focusedDate) {
      return `${this.id}-${this.focusedDate.toString()}`;
    }
  }

  updateActiveDescendant() {
    const nativeElement = this._elementRef.nativeElement as HTMLElement;
    const activeDescendant = this.getActiveDescendant();
    if (activeDescendant) {
      nativeElement.setAttribute('aria-activedescendant', activeDescendant);
    } else {
      nativeElement.removeAttribute('aria-activedescendant');
    }
  }

  /**
   * Navigates current view to provided date.
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided calendar will open current month.
   * Use 'startDate' input as an alternative
   */
  navigateTo(date?: {year: number, month: number}) {
    this._setViewWithinLimits(this._service.toValidDate(date));
    this._updateData();
  }

  ngOnInit() {
    this._setDates();
    this.navigateTo(this._date);
  }

  ngOnChanges(changes: SimpleChanges) {
    this._setDates();
    this._setViewWithinLimits(this._date);

    if (changes['displayMonths']) {
      this.displayMonths = toInteger(this.displayMonths);
    }

    // we have to force rebuild all months only if any of these inputs changes
    if (['startDate', 'minDate', 'maxDate', 'navigation', 'firstDayOfWeek', 'markDisabled', 'displayMonths'].some(
            input => !!changes[input])) {
      this._updateData(true);
    }
  }

  isDisplayedDateSelectable(date: NgbDate) {
    let selectable = false;
    const month = this.months.find(curMonth => curMonth.year === date.year && curMonth.number === date.month);
    if (month) {
      month.weeks.find(week => {
        const day = week.days.find(day => date.equals(day.date));
        if (day && !day.disabled) {
          selectable = true;
        }
        return !!day;
      });
    }
    return selectable;
  }

  onDateSelect(date: NgbDate) {
    this._setFocusedDateWithinLimits(date);
    this.onTouched();
    this.writeValue(date);
    this.onChange({year: date.year, month: date.month, day: date.day});
  }

  onNavigateDateSelect(date: NgbDate) {
    this._setViewWithinLimits(date);
    this._updateData();
  }

  onNavigateEvent(event: NavigationEvent) {
    switch (event) {
      case NavigationEvent.PREV:
        this._setRelativeFocusedDate('m', -1);
        break;
      case NavigationEvent.NEXT:
        this._setRelativeFocusedDate('m', 1);
        break;
    }

    this._updateData();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let focusedDate = this.focusedDate;
    if (!focusedDate) {
      return;
    }
    switch (event.keyCode) {
      case 33 /* page up */:
        if (event.shiftKey) {
          this._setRelativeFocusedDate('y', -1);
        } else {
          this._setRelativeFocusedDate('m', -1);
        }
        break;
      case 34 /* page down */:
        if (event.shiftKey) {
          this._setRelativeFocusedDate('y', 1);
        } else {
          this._setRelativeFocusedDate('m', 1);
        }
        break;
      case 35 /* end */:
        if (event.shiftKey) {
          this._setFocusedDateWithinLimits(this._maxDate);
        } else {
          this._setFocusedDateWithinLimits(this.getLastDisplayedDate());
        }
        break;
      case 36 /* home */:
        if (event.shiftKey) {
          this._setFocusedDateWithinLimits(this._minDate);
        } else {
          this._setFocusedDateWithinLimits(this.getFirstDisplayedDate());
        }
        break;
      case 37 /* left arrow */:
        this._setRelativeFocusedDate('d', -1);
        break;
      case 38 /* up arrow */:
        this._setRelativeFocusedDate('d', -this._calendar.getDaysPerWeek());
        break;
      case 39 /* right arrow */:
        this._setRelativeFocusedDate('d', 1);
        break;
      case 40 /* down arrow */:
        this._setRelativeFocusedDate('d', this._calendar.getDaysPerWeek());
        break;
      case 13 /* enter */:
      case 32 /* space */:
        if (this.isDisplayedDateSelectable(focusedDate)) {
          this.onDateSelect(NgbDate.from(focusedDate));
        }
        break;
      default:
        return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent) {
    const firstDate = this.getFirstDisplayedDate();
    const lastDate = this.getLastDisplayedDate();
    const model = this.model;
    this.focusedDate = (!model || model.before(firstDate) || model.after(lastDate)) ? firstDate : model;
    this.updateActiveDescendant();
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    this.focusedDate = null;
    this.updateActiveDescendant();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    // Internet Explorer has some issues to give focus to the right element when clicking
    // so this method is here to make IE behave correctly!
    const target = <HTMLElement>event.target;
    const tagName = target.tagName.toLowerCase();
    if (tagName !== 'select' && tagName !== 'input' && tagName !== 'option') {
      if (!this.focusedDate) {
        this._elementRef.nativeElement.focus();
      }
      event.preventDefault();
    }
  }

  registerOnChange(fn: (value: any) => any): void { this.onChange = fn; }

  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

  writeValue(value) { this.model = this._service.toValidDate(value, null); }

  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }

  private _setDates() {
    this._maxDate = NgbDate.from(this.maxDate);
    this._minDate = NgbDate.from(this.minDate);
    this._date = this._service.toValidDate(this.startDate);

    if (!this._calendar.isValid(this._minDate)) {
      this._minDate = this._calendar.getPrev(this._date, 'y', 10);
      this.minDate = {year: this._minDate.year, month: this._minDate.month, day: this._minDate.day};
    }

    if (!this._calendar.isValid(this._maxDate)) {
      this._maxDate = this._calendar.getNext(this._date, 'y', 11);
      this._maxDate = this._calendar.getPrev(this._maxDate);
      this.maxDate = {year: this._maxDate.year, month: this._maxDate.month, day: this._maxDate.day};
    }

    if (this._minDate && this._maxDate && this._maxDate.before(this._minDate)) {
      throw new Error(`'maxDate' ${this._maxDate} should be greater than 'minDate' ${this._minDate}`);
    }
  }

  private getFirstDisplayedDate() { return this.months[0].firstDate; }

  private getLastDisplayedDate() {
    return this._calendar.getPrev(
        this._calendar.getNext(this.months[this.months.length - 1].firstDate, 'm', 1), 'd', 1);
  }

  private _setFocusedDateWithinLimits(date: NgbDate) {
    if (this._minDate && date.before(this._minDate)) {
      date = this._minDate;
    } else if (this._maxDate && date.after(this._maxDate)) {
      date = this._maxDate;
    }
    const firstDate = this.getFirstDisplayedDate();
    const lastDate = this.getLastDisplayedDate();
    let newViewDate;
    if (date.before(firstDate)) {
      newViewDate = date;
    } else if (date.after(lastDate)) {
      newViewDate = this._calendar.getPrev(date, 'm', this.displayMonths - 1);
    }
    this.focusedDate = date;
    if (newViewDate) {
      this._setViewWithinLimits(newViewDate);
      this._updateData();
      this._zone.runOutsideAngular(() => { setTimeout(() => this.updateActiveDescendant(), 1); });
    } else {
      this.updateActiveDescendant();
    }
  }

  private _setRelativeFocusedDate(period?: NgbPeriod, number?: number) {
    let focusedDate = this.focusedDate;
    let hasFocusedDate = !!focusedDate;
    if (!hasFocusedDate) {
      focusedDate = this._date;
    }
    this._setFocusedDateWithinLimits(this._calendar.getNext(focusedDate, period, number));
    if (!hasFocusedDate) {
      this.focusedDate = null;
    }
  }

  private _setViewWithinLimits(date: NgbDate) {
    if (this._minDate && date.before(this._minDate)) {
      this._date = new NgbDate(this._minDate.year, this._minDate.month, 1);
    } else if (this._maxDate && date.after(this._maxDate)) {
      this._date = new NgbDate(this._maxDate.year, this._maxDate.month, 1);
    } else {
      this._date = new NgbDate(date.year, date.month, 1);
    }
  }

  private _updateData(force = false) {
    const newMonths = [];
    for (let i = 0; i < this.displayMonths; i++) {
      const newDate = this._calendar.getNext(this._date, 'm', i);
      const index = this.months.findIndex(month => month.firstDate.equals(newDate));

      if (force || index === -1) {
        newMonths.push(
            this._service.generateMonthViewModel(
                newDate, this._minDate, this._maxDate, toInteger(this.firstDayOfWeek), this.markDisabled));
      } else {
        newMonths.push(this.months[index]);
      }
    }

    const newDate = newMonths[0].firstDate;
    const oldDate = this.months[0] ? this.months[0].firstDate : null;

    this.months = newMonths;

    // emitting navigation event if the first month changes
    if (!newDate.equals(oldDate)) {
      this.navigate.emit({
        current: oldDate ? {year: oldDate.year, month: oldDate.month} : null,
        next: {year: newDate.year, month: newDate.month}
      });
    }
  }
}
