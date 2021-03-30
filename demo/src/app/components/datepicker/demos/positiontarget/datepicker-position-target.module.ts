import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerPositiontarget } from './datepicker-positiontarget';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerPositiontarget],
  exports: [NgbdDatepickerPositiontarget],
  bootstrap: [NgbdDatepickerPositiontarget]
})
export class NgbdDatepickerPositiontargetModule {}
