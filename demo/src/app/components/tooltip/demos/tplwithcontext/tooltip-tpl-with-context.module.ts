import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTooltipTplwithcontext } from './tooltip-tplwithcontext';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTooltipTplwithcontext],
  exports: [NgbdTooltipTplwithcontext],
  bootstrap: [NgbdTooltipTplwithcontext]
})
export class NgbdTooltipTplWithContextModule {}
