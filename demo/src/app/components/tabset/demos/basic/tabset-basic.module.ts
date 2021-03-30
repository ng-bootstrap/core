import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTabsetBasic } from './tabset-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdTabsetBasic],
  exports: [NgbdTabsetBasic],
  bootstrap: [NgbdTabsetBasic]
})
export class NgbdTabsetBasicModule {}
