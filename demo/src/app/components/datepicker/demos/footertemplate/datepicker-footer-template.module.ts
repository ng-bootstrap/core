import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerFootertemplate } from './datepicker-footertemplate';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerFootertemplate],
  exports: [NgbdDatepickerFootertemplate],
  bootstrap: [NgbdDatepickerFootertemplate]
})
export class NgbdDatepickerFooterTemplateModule {}
