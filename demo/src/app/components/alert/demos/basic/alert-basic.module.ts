import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAlertBasic } from './alert-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAlertBasic],
  exports: [NgbdAlertBasic],
  bootstrap: [NgbdAlertBasic]
})
export class NgbdAlertBasicModule {}
