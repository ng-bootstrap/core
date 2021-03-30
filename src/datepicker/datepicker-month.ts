import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgbDatepicker} from './datepicker';
import {NgbDatepickerI18n} from './datepicker-i18n';
import {NgbDatepickerKeyboardService} from './datepicker-keyboard-service';
import {NgbDatepickerService} from './datepicker-service';
import {MonthViewModel, DayViewModel} from './datepicker-view-model';
import {NgbDateStruct} from './ngb-date-struct';

/**
 * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
 * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
 *
 * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
 *
 * @since 5.3.0
 */
@Component({
  selector: 'ngb-datepicker-month',
  host: {'role': 'grid', '(keydown)': 'onKeyDown($event)'},
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker-month.scss'],
  template: `
    <div *ngIf="viewModel.weekdays.length > 0" class="ngb-dp-week ngb-dp-weekdays" role="row">
      <div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek small">{{ i18n.getWeekLabel() }}</div>
      <div *ngFor="let weekday of viewModel.weekdays" class="ngb-dp-weekday small" role="columnheader">{{ weekday }}</div>
    </div>
    <ng-template ngFor let-week [ngForOf]="viewModel.weeks">
      <div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
        <div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
        <div *ngFor="let day of week.days" (click)="doSelect(day); $event.preventDefault()" class="ngb-dp-day" role="gridcell"
             [class.disabled]="day.context.disabled"
             [tabindex]="day.tabindex"
             [class.hidden]="day.hidden"
             [class.ngb-dp-today]="day.context.today"
             [attr.aria-label]="day.ariaLabel">
          <ng-template [ngIf]="!day.hidden">
            <ng-template [ngTemplateOutlet]="datepicker.dayTemplate" [ngTemplateOutletContext]="day.context"></ng-template>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `
})
export class NgbDatepickerMonth {
  /**
   * The first date of month to be rendered.
   *
   * This month must one of the months present in the
   * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
   */
  @Input()
  set month(month: NgbDateStruct) {
    this.viewModel = this._service.getMonth(month);
  }

  viewModel: MonthViewModel;

  constructor(
      public i18n: NgbDatepickerI18n, public datepicker: NgbDatepicker,
      private _keyboardService: NgbDatepickerKeyboardService, private _service: NgbDatepickerService) {}

  onKeyDown(event: KeyboardEvent) { this._keyboardService.processKey(event, this.datepicker); }

  doSelect(day: DayViewModel) {
    if (!day.context.disabled && !day.hidden) {
      this.datepicker.onDateSelect(day.date);
    }
  }
}
