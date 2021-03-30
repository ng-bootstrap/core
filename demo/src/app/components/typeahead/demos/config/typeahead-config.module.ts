import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTypeaheadConfig } from './typeahead-config';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTypeaheadConfig],
  exports: [NgbdTypeaheadConfig],
  bootstrap: [NgbdTypeaheadConfig]
})
export class NgbdTypeaheadConfigModule {}
