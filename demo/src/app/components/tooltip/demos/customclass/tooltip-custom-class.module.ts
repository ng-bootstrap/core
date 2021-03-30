import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTooltipCustomclass } from './tooltip-customclass';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTooltipCustomclass],
  exports: [NgbdTooltipCustomclass],
  bootstrap: [NgbdTooltipCustomclass]
})
export class NgbdTooltipCustomClassModule {}
