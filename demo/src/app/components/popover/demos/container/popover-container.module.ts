import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPopoverContainer } from './popover-container';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPopoverContainer],
  exports: [NgbdPopoverContainer],
  bootstrap: [NgbdPopoverContainer]
})
export class NgbdPopoverContainerModule {}
