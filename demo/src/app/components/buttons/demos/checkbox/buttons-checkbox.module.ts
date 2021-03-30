import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdButtonsCheckbox } from './buttons-checkbox';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdButtonsCheckbox],
  exports: [NgbdButtonsCheckbox],
  bootstrap: [NgbdButtonsCheckbox]
})
export class NgbdButtonsCheckboxModule {}
