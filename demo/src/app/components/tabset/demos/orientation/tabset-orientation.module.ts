import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTabsetOrientation } from './tabset-orientation';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTabsetOrientation],
  exports: [NgbdTabsetOrientation],
  bootstrap: [NgbdTabsetOrientation]
})
export class NgbdTabsetOrientationModule {}
