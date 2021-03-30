import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDropdownConfig } from './dropdown-config';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdDropdownConfig],
  exports: [NgbdDropdownConfig],
  bootstrap: [NgbdDropdownConfig]
})
export class NgbdDropdownConfigModule {}
