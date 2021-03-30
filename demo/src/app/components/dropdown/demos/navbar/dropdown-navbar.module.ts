import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDropdownNavbar } from './dropdown-navbar';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, NgbModule, RouterModule],
  declarations: [NgbdDropdownNavbar],
  exports: [NgbdDropdownNavbar],
  bootstrap: [NgbdDropdownNavbar]
})
export class NgbdDropdownNavbarModule {}
