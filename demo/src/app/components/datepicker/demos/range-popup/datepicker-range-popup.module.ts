import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerRangePopup } from './datepicker-range-popup';

@NgModule({
  imports: [BrowserModule, NgbModule, FormsModule],
  declarations: [NgbdDatepickerRangePopup],
  exports: [NgbdDatepickerRangePopup],
  bootstrap: [NgbdDatepickerRangePopup]
})
export class NgbdDatepickerRangePopupModule {}
