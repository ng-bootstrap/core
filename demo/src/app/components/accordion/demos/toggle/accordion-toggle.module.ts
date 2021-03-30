import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAccordionToggle } from './accordion-toggle';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAccordionToggle],
  exports: [NgbdAccordionToggle],
  bootstrap: [NgbdAccordionToggle]
})
export class NgbdAccordionToggleModule {}
