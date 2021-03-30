import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPopoverTriggers } from './popover-triggers';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPopoverTriggers],
  exports: [NgbdPopoverTriggers],
  bootstrap: [NgbdPopoverTriggers]
})
export class NgbdPopoverTriggersModule {}
