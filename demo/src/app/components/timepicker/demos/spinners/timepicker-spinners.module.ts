import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTimepickerSpinners } from './timepicker-spinners';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTimepickerSpinners],
  exports: [NgbdTimepickerSpinners],
  bootstrap: [NgbdTimepickerSpinners]
})
export class NgbdTimepickerSpinnersModule {}
