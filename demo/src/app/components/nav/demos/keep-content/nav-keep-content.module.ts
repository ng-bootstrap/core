import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdNavKeep } from './nav-keep-content';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdNavKeep],
  exports: [NgbdNavKeep],
  bootstrap: [NgbdNavKeep]
})
export class NgbdNavKeepModule {
}
