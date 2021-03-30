import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPopoverAutoclose } from './popover-autoclose';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPopoverAutoclose],
  exports: [NgbdPopoverAutoclose],
  bootstrap: [NgbdPopoverAutoclose]
})
export class NgbdPopoverAutocloseModule {}
