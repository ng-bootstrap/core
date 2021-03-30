import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerIslamiccivil } from './datepicker-islamiccivil';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerIslamiccivil],
  exports: [NgbdDatepickerIslamiccivil],
  bootstrap: [NgbdDatepickerIslamiccivil]
})
export class NgbdDatepickerIslamicCivilModule {}
