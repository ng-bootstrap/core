import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdAccordionPreventchange } from './accordion-preventchange';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdAccordionPreventchange],
  exports: [NgbdAccordionPreventchange],
  bootstrap: [NgbdAccordionPreventchange]
})
export class NgbdAccordionPreventchangeModule {}
