import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerConfig } from './datepicker-config';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerConfig],
  exports: [NgbdDatepickerConfig],
  bootstrap: [NgbdDatepickerConfig]
})
export class NgbdDatepickerConfigModule {}
