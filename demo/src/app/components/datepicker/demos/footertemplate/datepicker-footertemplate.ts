import {Component} from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-footertemplate',
  templateUrl: './datepicker-footertemplate.html',
})
export class NgbdDatepickerFootertemplate {
  model: NgbDateStruct;
  today = this.calendar.getToday();

  constructor(private calendar: NgbCalendar) {}
}
