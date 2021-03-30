import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdDropdownContainer} from './dropdown-container';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdDropdownContainer],
  exports: [NgbdDropdownContainer],
  bootstrap: [NgbdDropdownContainer]
})
export class NgbdDropdownContainerModule {
}
