import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTooltipDelay } from './tooltip-delay';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTooltipDelay],
  exports: [NgbdTooltipDelay],
  bootstrap: [NgbdTooltipDelay]
})
export class NgbdTooltipDelayModule {}
