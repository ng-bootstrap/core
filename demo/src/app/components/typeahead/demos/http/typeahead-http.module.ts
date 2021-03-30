import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTypeaheadHttp } from './typeahead-http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule],
  declarations: [NgbdTypeaheadHttp],
  exports: [NgbdTypeaheadHttp],
  bootstrap: [NgbdTypeaheadHttp]
})
export class NgbdTypeaheadHttpModule {}
