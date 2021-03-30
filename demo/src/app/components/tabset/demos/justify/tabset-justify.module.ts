import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTabsetJustify } from './tabset-justify';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdTabsetJustify],
  exports: [NgbdTabsetJustify],
  bootstrap: [NgbdTabsetJustify]
})
export class NgbdTabsetJustifyModule {}
