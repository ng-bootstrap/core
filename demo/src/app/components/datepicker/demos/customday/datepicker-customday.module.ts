import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerCustomday } from './datepicker-customday';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerCustomday],
  exports: [NgbdDatepickerCustomday],
  bootstrap: [NgbdDatepickerCustomday]
})
export class NgbdDatepickerCustomdayModule {}
