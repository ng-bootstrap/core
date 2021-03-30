import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTooltipContainer } from './tooltip-container';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTooltipContainer],
  exports: [NgbdTooltipContainer],
  bootstrap: [NgbdTooltipContainer]
})
export class NgbdTooltipContainerModule {}
