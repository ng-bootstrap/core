import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDropdownManual } from './dropdown-manual';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdDropdownManual],
  exports: [NgbdDropdownManual],
  bootstrap: [NgbdDropdownManual]
})
export class NgbdDropdownManualModule {}
