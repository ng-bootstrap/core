import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTabsetSelectbyid } from './tabset-selectbyid';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdTabsetSelectbyid],
  exports: [NgbdTabsetSelectbyid],
  bootstrap: [NgbdTabsetSelectbyid]
})
export class NgbdTabsetSelectbyidModule {}
