import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTooltipTplcontent } from './tooltip-tplcontent';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTooltipTplcontent],
  exports: [NgbdTooltipTplcontent],
  bootstrap: [NgbdTooltipTplcontent]
})
export class NgbdTooltipTplContentModule {}
