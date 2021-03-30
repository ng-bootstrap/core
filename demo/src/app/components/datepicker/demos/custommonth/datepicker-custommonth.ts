import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbDatepicker, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-custommonth',
  templateUrl: './datepicker-custommonth.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .custom-datepicker .ngb-dp-header {
      padding: 0;
    }
    .custom-datepicker .ngb-dp-content {
      display: grid;
      grid-template-columns: auto auto;
      grid-column-gap: 1rem;
      grid-row-gap: 0.5rem;
    }
  `]
})
export class NgbdDatepickerCustommonth {

  @ViewChild(NgbDatepicker, {static: true}) datepicker: NgbDatepicker;

  constructor(public i18n: NgbDatepickerI18n) {}

  navigate(number: number) {
    const {state, calendar} = this.datepicker;
    this.datepicker.navigateTo(calendar.getNext(state.firstDate, 'm', number));
  }

  today() {
    const {calendar} = this.datepicker;
    this.datepicker.navigateTo(calendar.getToday());
  }
}
