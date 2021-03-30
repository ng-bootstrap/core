import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTypeaheadFocus } from './typeahead-focus';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTypeaheadFocus],
  exports: [NgbdTypeaheadFocus],
  bootstrap: [NgbdTypeaheadFocus]
})
export class NgbdTypeaheadFocusModule {}
