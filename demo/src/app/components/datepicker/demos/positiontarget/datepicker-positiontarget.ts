import {Component} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-positiontarget',
  templateUrl: './datepicker-positiontarget.html',
})
export class NgbdDatepickerPositiontarget {
  model: NgbDateStruct;
  placement = 'bottom';
}
