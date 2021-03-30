import {Component} from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarHebrew, NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerI18nHebrew,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-hebrew',
  templateUrl: './datepicker-hebrew.html',
  styles: [`
    .hebrew-day {
      text-align: right;
      padding: 0.25rem 0.65rem 0.25rem 0.25rem;
      border-radius: 0.25rem;
      display: inline-block;
      height: 2.75rem;
      width: 2.75rem;
    }
    .hebrew-day:hover, .hebrew-day.focused {
      background-color: #e6e6e6;
    }
    .hebrew-day.selected {
      background-color: #007bff;
      color: white;
    }
    .outside {
      color: lightgray;
    }
    .gregorian-num {
      font-size: 0.5rem;
      direction: ltr;
    }
  `],
  providers: [
    {provide: NgbCalendar, useClass: NgbCalendarHebrew},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}
  ]
})
export class NgbdDatepickerHebrew {

  model: NgbDateStruct;

  constructor(private calendar: NgbCalendar, public i18n: NgbDatepickerI18n) {
    this.dayTemplateData = this.dayTemplateData.bind(this);
  }

  dayTemplateData(date: NgbDate) {
    return {
      gregorian: (this.calendar as NgbCalendarHebrew).toGregorian(date)
    };
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
