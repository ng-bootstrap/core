import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTimepickerValidation } from './timepicker-validation';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, NgbModule],
  declarations: [NgbdTimepickerValidation],
  exports: [NgbdTimepickerValidation],
  bootstrap: [NgbdTimepickerValidation]
})
export class NgbdTimepickerValidationModule {}
