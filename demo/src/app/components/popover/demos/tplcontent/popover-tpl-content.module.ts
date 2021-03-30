import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPopoverTplcontent } from './popover-tplcontent';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPopoverTplcontent],
  exports: [NgbdPopoverTplcontent],
  bootstrap: [NgbdPopoverTplcontent]
})
export class NgbdPopoverTplContentModule {}
