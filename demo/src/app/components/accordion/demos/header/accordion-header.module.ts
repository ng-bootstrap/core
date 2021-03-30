import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAccordionHeader } from './accordion-header';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAccordionHeader],
  exports: [NgbdAccordionHeader],
  bootstrap: [NgbdAccordionHeader]
})
export class NgbdAccordionHeaderModule {}
