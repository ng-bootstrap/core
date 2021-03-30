import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdTypeaheadPreventManualEntry} from './typeahead-prevent-manual-entry';


@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTypeaheadPreventManualEntry],
  exports: [NgbdTypeaheadPreventManualEntry],
  bootstrap: [NgbdTypeaheadPreventManualEntry]
})
export class NgbdTypeaheadPreventManualEntryModule {
}
