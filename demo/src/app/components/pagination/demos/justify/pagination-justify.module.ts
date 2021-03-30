import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPaginationJustify } from './pagination-justify';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPaginationJustify],
  exports: [NgbdPaginationJustify],
  bootstrap: [NgbdPaginationJustify]
})
export class NgbdPaginationJustifyModule {}
