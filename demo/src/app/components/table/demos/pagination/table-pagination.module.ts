import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTablePagination } from './table-pagination';

@NgModule({
  imports: [BrowserModule, CommonModule, FormsModule, NgbModule],
  declarations: [NgbdTablePagination],
  exports: [NgbdTablePagination],
  bootstrap: [NgbdTablePagination]
})
export class NgbdTablePaginationModule {}
