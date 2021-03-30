import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTabsetPreventchange } from './tabset-preventchange';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdTabsetPreventchange],
  exports: [NgbdTabsetPreventchange],
  bootstrap: [NgbdTabsetPreventchange]
})
export class NgbdTabsetPreventChangeModule {}
