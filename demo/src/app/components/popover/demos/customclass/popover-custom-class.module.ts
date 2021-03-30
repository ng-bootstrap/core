import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPopoverCustomclass } from './popover-customclass';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPopoverCustomclass],
  exports: [NgbdPopoverCustomclass],
  bootstrap: [NgbdPopoverCustomclass]
})
export class NgbdPopoverCustomClassModule {}
