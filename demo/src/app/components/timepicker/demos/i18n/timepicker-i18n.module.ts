import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdTimepickerI18n} from './timepicker-i18n';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTimepickerI18n],
  exports: [NgbdTimepickerI18n],
  bootstrap: [NgbdTimepickerI18n]
})
export class NgbdTimepickerI18nModule {
}
