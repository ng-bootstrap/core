import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPaginationCustomization } from './pagination-customization';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPaginationCustomization],
  exports: [NgbdPaginationCustomization],
  bootstrap: [NgbdPaginationCustomization]
})
export class NgbdPaginationCustomizationModule {}
