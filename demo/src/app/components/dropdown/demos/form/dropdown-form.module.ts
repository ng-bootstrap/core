import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDropdownForm } from './dropdown-form';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdDropdownForm],
  exports: [NgbdDropdownForm],
  bootstrap: [NgbdDropdownForm]
})
export class NgbdDropdownFormModule {}
