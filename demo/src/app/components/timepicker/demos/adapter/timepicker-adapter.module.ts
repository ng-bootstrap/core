import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTimepickerAdapter } from './timepicker-adapter';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTimepickerAdapter],
  exports: [NgbdTimepickerAdapter],
  bootstrap: [NgbdTimepickerAdapter]
})
export class NgbdTimepickerAdapterModule {}
