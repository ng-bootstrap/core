import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTimepickerConfig } from './timepicker-config';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTimepickerConfig],
  exports: [NgbdTimepickerConfig],
  bootstrap: [NgbdTimepickerConfig]
})
export class NgbdTimepickerConfigModule {}
