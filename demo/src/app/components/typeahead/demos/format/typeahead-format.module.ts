import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTypeaheadFormat } from './typeahead-format';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTypeaheadFormat],
  exports: [NgbdTypeaheadFormat],
  bootstrap: [NgbdTypeaheadFormat]
})
export class NgbdTypeaheadFormatModule {}
