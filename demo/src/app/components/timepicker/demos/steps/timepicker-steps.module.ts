import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTimepickerSteps } from './timepicker-steps';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTimepickerSteps],
  exports: [NgbdTimepickerSteps],
  bootstrap: [NgbdTimepickerSteps]
})
export class NgbdTimepickerStepsModule {}
