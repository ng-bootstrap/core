import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdNavVertical } from './nav-vertical';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdNavVertical],
  exports: [NgbdNavVertical],
  bootstrap: [NgbdNavVertical]
})
export class NgbdNavVerticalModule {
}
