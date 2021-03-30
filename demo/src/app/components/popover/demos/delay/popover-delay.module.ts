import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPopoverDelay } from './popover-delay';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPopoverDelay],
  exports: [NgbdPopoverDelay],
  bootstrap: [NgbdPopoverDelay]
})
export class NgbdPopoverDelayModule {}
