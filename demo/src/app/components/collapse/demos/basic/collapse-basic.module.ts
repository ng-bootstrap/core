import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdCollapseBasic } from './collapse-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdCollapseBasic],
  exports: [NgbdCollapseBasic],
  bootstrap: [NgbdCollapseBasic]
})
export class NgbdCollapseBasicModule {}
