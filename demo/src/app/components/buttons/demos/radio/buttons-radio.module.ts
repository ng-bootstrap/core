import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdButtonsRadio } from './buttons-radio';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdButtonsRadio],
  exports: [NgbdButtonsRadio],
  bootstrap: [NgbdButtonsRadio]
})
export class NgbdButtonsRadioModule {}
