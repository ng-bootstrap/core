import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdCollapseNavbar} from './collapse-navbar';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [BrowserModule, NgbModule, RouterModule.forRoot([])],
  declarations: [NgbdCollapseNavbar],
  exports: [NgbdCollapseNavbar],
  bootstrap: [NgbdCollapseNavbar]
})
export class NgbdCollapseNavbarModule {
}
