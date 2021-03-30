import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerJalali } from './datepicker-jalali';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerJalali],
  exports: [NgbdDatepickerJalali],
  bootstrap: [NgbdDatepickerJalali]
})
export class NgbdDatepickerJalaliModule {}
