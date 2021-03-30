import { Component } from '@angular/core';

@Component({
  selector: 'timepicker-component',
  template: `
    <ngb-timepicker [(ngModel)]="time"></ngb-timepicker>
  `
})
export class TimepickerComponent {
  time = {hour: 6, minute: 5};
}
