import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalOptions } from './modal-options';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdModalOptions],
  exports: [NgbdModalOptions],
  bootstrap: [NgbdModalOptions]
})
export class NgbdModalOptionsModule {}
