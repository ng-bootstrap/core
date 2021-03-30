import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerI18n } from './datepicker-i18n';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerI18n],
  exports: [NgbdDatepickerI18n],
  bootstrap: [NgbdDatepickerI18n]
})
export class NgbdDatepickerI18nModule {}
