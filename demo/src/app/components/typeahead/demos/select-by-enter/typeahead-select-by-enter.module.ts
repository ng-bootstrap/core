import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdTypeaheadEnter} from './typeahead-select-by-enter';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTypeaheadEnter],
  exports: [NgbdTypeaheadEnter],
  bootstrap: [NgbdTypeaheadEnter]
})
export class NgbdTypeaheadEnterModule {
}
