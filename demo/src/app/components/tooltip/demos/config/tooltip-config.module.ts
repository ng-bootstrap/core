import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTooltipConfig } from './tooltip-config';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTooltipConfig],
  exports: [NgbdTooltipConfig],
  bootstrap: [NgbdTooltipConfig]
})
export class NgbdTooltipConfigModule {}
