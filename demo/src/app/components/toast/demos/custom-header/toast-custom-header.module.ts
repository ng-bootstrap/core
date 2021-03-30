import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdToastCustomHeader } from './toast-custom-header';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdToastCustomHeader],
  bootstrap: [NgbdToastCustomHeader]
})
export class NgbdToastCustomHeaderModule {}
