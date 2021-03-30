import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDropdownBasic } from './dropdown-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdDropdownBasic],
  exports: [NgbdDropdownBasic],
  bootstrap: [NgbdDropdownBasic]
})
export class NgbdDropdownBasicModule {}
