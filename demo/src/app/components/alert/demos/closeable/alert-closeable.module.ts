import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAlertCloseable } from './alert-closeable';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAlertCloseable],
  exports: [NgbdAlertCloseable],
  bootstrap: [NgbdAlertCloseable]
})
export class NgbdAlertCloseableModule {}
