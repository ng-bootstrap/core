import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTooltipBasic } from './tooltip-basic';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTooltipBasic],
  exports: [NgbdTooltipBasic],
  bootstrap: [NgbdTooltipBasic]
})
export class NgbdTooltipBasicModule {}
