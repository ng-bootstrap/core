import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAccordionStatic } from './accordion-static';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAccordionStatic],
  exports: [NgbdAccordionStatic],
  bootstrap: [NgbdAccordionStatic]
})
export class NgbdAccordionStaticModule {}
