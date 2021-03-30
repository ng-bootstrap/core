import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTypeaheadTemplate } from './typeahead-template';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTypeaheadTemplate],
  exports: [NgbdTypeaheadTemplate],
  bootstrap: [NgbdTypeaheadTemplate]
})
export class NgbdTypeaheadTemplateModule {}
