import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTabsetConfig } from './tabset-config';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdTabsetConfig],
  exports: [NgbdTabsetConfig],
  bootstrap: [NgbdTabsetConfig]
})
export class NgbdTabsetConfigModule {}
