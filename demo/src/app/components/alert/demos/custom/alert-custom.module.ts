import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAlertCustom } from './alert-custom';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAlertCustom],
  exports: [NgbdAlertCustom],
  bootstrap: [NgbdAlertCustom]
})
export class NgbdAlertCustomModule {}
