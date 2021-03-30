import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTooltipTriggers } from './tooltip-triggers';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTooltipTriggers],
  exports: [NgbdTooltipTriggers],
  bootstrap: [NgbdTooltipTriggers]
})
export class NgbdTooltipTriggersModule {}
