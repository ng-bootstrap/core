import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerIslamicumalqura } from './datepicker-islamicumalqura';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerIslamicumalqura],
  exports: [NgbdDatepickerIslamicumalqura],
  bootstrap: [NgbdDatepickerIslamicumalqura]
})
export class NgbdDatepickerIslamicUmalquraModule {}
