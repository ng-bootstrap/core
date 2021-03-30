import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTooltipAutoclose } from './tooltip-autoclose';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTooltipAutoclose],
  exports: [NgbdTooltipAutoclose],
  bootstrap: [NgbdTooltipAutoclose]
})
export class NgbdTooltipAutocloseModule {}
