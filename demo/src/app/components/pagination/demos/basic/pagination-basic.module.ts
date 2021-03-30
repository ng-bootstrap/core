import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPaginationBasic } from './pagination-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPaginationBasic],
  exports: [NgbdPaginationBasic],
  bootstrap: [NgbdPaginationBasic]
})
export class NgbdPaginationBasicModule {}
