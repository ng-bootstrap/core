import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerBasic } from './datepicker-basic';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerBasic],
  exports: [NgbdDatepickerBasic],
  bootstrap: [NgbdDatepickerBasic]
})
export class NgbdDatepickerBasicModule {}
