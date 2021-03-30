import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPopoverTplwithcontext } from './popover-tplwithcontext';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPopoverTplwithcontext],
  exports: [NgbdPopoverTplwithcontext],
  bootstrap: [NgbdPopoverTplwithcontext]
})
export class NgbdPopoverTplWithContextModule {}
