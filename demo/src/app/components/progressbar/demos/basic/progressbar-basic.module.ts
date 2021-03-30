import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdProgressbarBasic } from './progressbar-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdProgressbarBasic],
  exports: [NgbdProgressbarBasic],
  bootstrap: [NgbdProgressbarBasic]
})
export class NgbdProgressbarBasicModule {}
