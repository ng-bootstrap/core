import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalConfig } from './modal-config';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdModalConfig],
  exports: [NgbdModalConfig],
  bootstrap: [NgbdModalConfig]
})
export class NgbdModalConfigModule {}
