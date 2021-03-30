import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPaginationSize } from './pagination-size';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPaginationSize],
  exports: [NgbdPaginationSize],
  bootstrap: [NgbdPaginationSize]
})
export class NgbdPaginationSizeModule {}
