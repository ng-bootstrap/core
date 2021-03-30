import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerCustommonth } from './datepicker-custommonth';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdDatepickerCustommonth],
  exports: [NgbdDatepickerCustommonth],
  bootstrap: [NgbdDatepickerCustommonth]
})
export class NgbdDatepickerCustommonthModule {}
