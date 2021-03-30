import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAccordionConfig } from './accordion-config';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAccordionConfig],
  exports: [NgbdAccordionConfig],
  bootstrap: [NgbdAccordionConfig]
})
export class NgbdAccordionConfigModule {}
