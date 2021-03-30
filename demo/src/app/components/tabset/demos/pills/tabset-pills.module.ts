import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTabsetPills } from './tabset-pills';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdTabsetPills],
  exports: [NgbdTabsetPills],
  bootstrap: [NgbdTabsetPills]
})
export class NgbdTabsetPillsModule {}
