import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdNavMarkup } from './nav-markup';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdNavMarkup],
  exports: [NgbdNavMarkup],
  bootstrap: [NgbdNavMarkup]
})
export class NgbdNavMarkupModule {}
