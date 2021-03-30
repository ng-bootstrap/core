import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPopoverBasic } from './popover-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPopoverBasic],
  exports: [NgbdPopoverBasic],
  bootstrap: [NgbdPopoverBasic]
})
export class NgbdPopoverBasicModule {}
