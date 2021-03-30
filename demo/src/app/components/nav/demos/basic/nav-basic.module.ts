import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdNavBasic } from './nav-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdNavBasic],
  exports: [NgbdNavBasic],
  bootstrap: [NgbdNavBasic]
})
export class NgbdNavBasicModule {
}
