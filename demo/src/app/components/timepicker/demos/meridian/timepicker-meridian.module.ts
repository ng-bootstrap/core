import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTimepickerMeridian } from './timepicker-meridian';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTimepickerMeridian],
  exports: [NgbdTimepickerMeridian],
  bootstrap: [NgbdTimepickerMeridian]
})
export class NgbdTimepickerMeridianModule {}
