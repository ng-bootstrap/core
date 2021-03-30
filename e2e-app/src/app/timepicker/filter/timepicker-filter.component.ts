import {Component} from '@angular/core';

@Component({
  templateUrl: './timepicker-filter.component.html',
})
export class TimepickerFilterComponent {
  time = {hour: null, minute: null, second: null};
}
