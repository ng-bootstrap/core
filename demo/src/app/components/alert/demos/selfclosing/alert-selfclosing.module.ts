import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAlertSelfclosing } from './alert-selfclosing';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAlertSelfclosing],
  exports: [NgbdAlertSelfclosing],
  bootstrap: [NgbdAlertSelfclosing]
})
export class NgbdAlertSelfclosingModule {}
