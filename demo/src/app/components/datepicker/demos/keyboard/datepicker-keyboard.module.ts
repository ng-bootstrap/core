import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdDatepickerKeyboard} from './datepicker-keyboard';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerKeyboard],
  exports: [NgbdDatepickerKeyboard],
  bootstrap: [NgbdDatepickerKeyboard]
})
export class NgbdDatepickerKeyboardModule {
}
