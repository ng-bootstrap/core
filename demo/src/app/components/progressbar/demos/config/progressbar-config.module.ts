import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdProgressbarConfig } from './progressbar-config';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdProgressbarConfig],
  exports: [NgbdProgressbarConfig],
  bootstrap: [NgbdProgressbarConfig]
})
export class NgbdProgressbarConfigModule {}
