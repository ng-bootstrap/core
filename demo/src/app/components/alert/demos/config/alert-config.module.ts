import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAlertConfig } from './alert-config';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAlertConfig],
  exports: [NgbdAlertConfig],
  bootstrap: [NgbdAlertConfig]
})
export class NgbdAlertConfigModule {}
