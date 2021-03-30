import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPaginationDisabled } from './pagination-disabled';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPaginationDisabled],
  exports: [NgbdPaginationDisabled],
  bootstrap: [NgbdPaginationDisabled]
})
export class NgbdPaginationDisabledModule {}
