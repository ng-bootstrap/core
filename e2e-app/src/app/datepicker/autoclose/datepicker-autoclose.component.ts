import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({templateUrl: './datepicker-autoclose.component.html', changeDetection: ChangeDetectionStrategy.OnPush})
export class DatepickerAutoCloseComponent {
  autoClose: boolean | 'inside' | 'outside' = true;
  model = null;
  displayMonths = 1;
}
