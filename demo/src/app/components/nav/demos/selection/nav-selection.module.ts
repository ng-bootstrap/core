import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdNavSelection } from './nav-selection';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdNavSelection],
  exports: [NgbdNavSelection],
  bootstrap: [NgbdNavSelection]
})
export class NgbdNavSelectionModule {
}
